/**
 * Remorquages pipeline — vehicle towings during city operations (snow removal, etc).
 * Resource ID: 65dd096f-7296-40e8-8cfe-e26b928bcce5
 * Fetch: DataStore SQL with DATE_ORIGINE filter. Backfill 5 years on first run.
 * Note: Pre-Nov 2015 data has no GPS coordinates.
 * Data: donnees.montreal.ca
 */

import { db } from '@/lib/db';
import { snowTowings, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { eq, and, sql } from 'drizzle-orm';

const RESOURCE_ID = '65dd096f-7296-40e8-8cfe-e26b928bcce5';
const CKAN_BASE = 'https://donnees.montreal.ca/api/3/action';
const FIVE_YEARS_AGO = new Date();
FIVE_YEARS_AGO.setFullYear(FIVE_YEARS_AGO.getFullYear() - 5);

function parseTimestamp(val: unknown): Date | null {
  if (val == null) return null;
  const s = String(val).trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function safeNum(val: unknown): number | null {
  if (val == null) return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

function makeExternalId(r: RawRecord): string {
  const dateOrigine = String(r.DATE_ORIGINE ?? r.date_origine ?? '').trim();
  const lat = String(r.LATITUDE_ORIGINE ?? r.latitude_origine ?? '').trim();
  const lng = String(r.LONGITUDE_ORIGINE ?? r.longitude_origine ?? '').trim();
  const rue = String(r.RUE_ORIGINE ?? r.rue_origine ?? '').trim();
  const arrond = String(r.ARRONDISSEMENT_ORIGINE ?? r.arrondissement_origine ?? '').trim();
  const motif = String(r.MOTIF_REMORQUAGE ?? r.motif_remorquage ?? '').trim();
  const id = r._id != null ? String(r._id) : '';
  return [id, dateOrigine, lat, lng, rue, arrond, motif].filter(Boolean).join('|') || `tow-${r._id}`;
}

export class RemorquagesPipeline implements Pipeline {
  readonly name = 'remorquages';
  readonly schedule = '0 7 * * *'; // daily 7AM

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient(CKAN_BASE);

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
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "DATE_ORIGINE" >= '${sinceDate}'`;
    for await (const batch of client.datastoreSQLPaginated(baseSql, 32000)) {
      allRecords.push(...batch);
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records since ${sinceDate}...`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const towingDate = parseTimestamp(r.DATE_ORIGINE ?? r.date_origine);
      const lat = safeNum(r.LATITUDE_ORIGINE ?? r.latitude_origine);
      const lng = safeNum(r.LONGITUDE_ORIGINE ?? r.longitude_origine);

      return {
        externalId: makeExternalId(r),
        towingDate: towingDate ?? new Date(),
        lat: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lat : null,
        lng: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lng : null,
        reason: (r.MOTIF_REMORQUAGE ?? r.motif_remorquage)
          ? String(r.MOTIF_REMORQUAGE ?? r.motif_remorquage).trim()
          : null,
        boroughCode: findBoroughCode(
          (r.ARRONDISSEMENT_ORIGINE ?? r.arrondissement_origine) as string,
        ),
        sector: (r.SECTEUR_ORIGINE ?? r.secteur_origine)
          ? String(r.SECTEUR_ORIGINE ?? r.secteur_origine).trim()
          : null,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = r.externalId as string;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    if (records.length === 0) return { inserted: 0, updated: 0 };

    const BATCH = 500;
    let inserted = 0;

    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);
      const values = batch.map((r) => ({
        towingDate: r.towingDate as Date,
        lat: (r.lat != null ? String(r.lat) : null) as string | null,
        lng: (r.lng != null ? String(r.lng) : null) as string | null,
        reason: (r.reason as string | null) ?? null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        sector: (r.sector as string | null) ?? null,
      }));

      await db.insert(snowTowings).values(values);
      inserted += values.length;
    }

    return { inserted, updated: 0 };
  }
}
