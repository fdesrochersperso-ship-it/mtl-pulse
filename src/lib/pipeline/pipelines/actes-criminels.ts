/**
 * Actes criminels pipeline — criminal acts from SPVM.
 * Resource ID: c6f482bf-bf0f-4960-8b2f-9982c211addd
 * Fetch: DataStore SQL with date filter. Backfill 5 years on first run.
 */

import { db } from '@/lib/db';
import { crimeIncidents, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import { PDQ_TO_BOROUGH } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { eq, and, sql } from 'drizzle-orm';

const RESOURCE_ID = 'c6f482bf-bf0f-4960-8b2f-9982c211addd';
const FIVE_YEARS_AGO = new Date();
FIVE_YEARS_AGO.setFullYear(FIVE_YEARS_AGO.getFullYear() - 5);

function parseDate(val: unknown): string | null {
  if (val == null) return null;
  const s = String(val).trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function safeNum(val: unknown): number | null {
  if (val == null) return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

/** Generate external_id from DATE+CATEGORIE+PDQ+LAT+LONG (no unique ID in data) */
function makeExternalId(r: RawRecord): string {
  const date = parseDate(r.DATE ?? r.date) ?? '';
  const cat = String(r.CATEGORIE ?? r.categorie ?? '').trim();
  const pdq = String(r.PDQ ?? r.pdq ?? '').trim();
  const lat = String(r.LATITUDE ?? r.latitude ?? '').trim();
  const lng = String(r.LONGITUDE ?? r.longitude ?? '').trim();
  return [date, cat, pdq, lat, lng].filter(Boolean).join('|');
}

export class ActesCriminelsPipeline implements Pipeline {
  readonly name = 'actes_criminels';
  readonly schedule = '0 6 * * *'; // daily 6AM

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();

    let sinceDate: string;
    const lastRun = await db
      .select()
      .from(pipelineRuns)
      .where(
        and(
          eq(pipelineRuns.pipelineName, this.name),
          eq(pipelineRuns.status, 'success'),
        ),
      )
      .orderBy(sql`${pipelineRuns.completedAt} DESC`)
      .limit(1);

    if (lastRun.length === 0) {
      sinceDate = FIVE_YEARS_AGO.toISOString().slice(0, 10);
      console.log(
        `Fetching ${this.name}: backfill since ${sinceDate} (no previous successful run)...`,
      );
    } else {
      const lastCompleted = lastRun[0]!.completedAt;
      if (!lastCompleted) {
        sinceDate = FIVE_YEARS_AGO.toISOString().slice(0, 10);
      } else {
        const d = new Date(lastCompleted);
        d.setDate(d.getDate() - 1);
        sinceDate = d.toISOString().slice(0, 10);
      }
      console.log(`Fetching ${this.name}: records since ${sinceDate}...`);
    }

    const allRecords: RawRecord[] = [];
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "DATE" >= '${sinceDate}'`;
    for await (const batch of client.datastoreSQLPaginated(baseSql, 32000)) {
      allRecords.push(...batch);
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records since ${sinceDate}...`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const dateStr = parseDate(r.DATE ?? r.date);
      const lat = safeNum(r.LATITUDE ?? r.latitude);
      const lng = safeNum(r.LONGITUDE ?? r.longitude);
      const pdq = safeNum(r.PDQ ?? r.pdq);

      let boroughCode: string | null = null;
      if (pdq != null && PDQ_TO_BOROUGH[pdq as keyof typeof PDQ_TO_BOROUGH]) {
        boroughCode = PDQ_TO_BOROUGH[pdq as keyof typeof PDQ_TO_BOROUGH] ?? null;
      }
      if (!boroughCode) {
        boroughCode = findBoroughCode((r.QUARTIER ?? r.arrondissement ?? r.borough) as string);
      }

      const externalId = makeExternalId(r);

      return {
        externalId,
        category: String(r.CATEGORIE ?? r.categorie ?? '').trim() || 'Inconnu',
        incidentDate: dateStr ?? '1970-01-01',
        shift: (r.QUART ?? r.shift) ? String(r.QUART ?? r.shift).trim() : null,
        pdq,
        boroughCode,
        lat: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lat : null,
        lng: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lng : null,
        rawData: r as Record<string, unknown>,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = r.externalId as string;
      if (!id) return false;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    if (records.length === 0) return { inserted: 0, updated: 0 };

    const BATCH = 500;
    let inserted = 0;
    let updated = 0;

    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);
      const values = batch.map((r) => ({
        externalId: r.externalId as string,
        category: r.category as string,
        incidentDate: (r.incidentDate as string).slice(0, 10),
        shift: (r.shift as string | null) ?? null,
        pdq: (r.pdq as number | null) ?? null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        lat: (r.lat != null ? String(r.lat) : null) as string | null,
        lng: (r.lng != null ? String(r.lng) : null) as string | null,
        rawData: (r.rawData as object) ?? null,
      }));

      await db
        .insert(crimeIncidents)
        .values(values)
        .onConflictDoUpdate({
          target: crimeIncidents.externalId,
          set: {
            category: sql`excluded.category`,
            incidentDate: sql`excluded.incident_date`,
            shift: sql`excluded.shift`,
            pdq: sql`excluded.pdq`,
            boroughCode: sql`excluded.borough_code`,
            lat: sql`excluded.lat`,
            lng: sql`excluded.lng`,
            rawData: sql`excluded.raw_data`,
            updatedAt: sql`now()`,
          },
        });

      inserted += values.length;
    }

    return { inserted, updated };
  }
}
