/**
 * Permis construction pipeline — building permits.
 * Resource ID: 5232a72d-235a-48eb-ae20-bb9d501300ad (from packageShow)
 * Fetch: DataStore SQL with date_emission filter. NEVER download 172MB CSV.
 * Backfill 5 years on first run.
 */

import { db } from '@/lib/db';
import { constructionPermits, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { eq, and, sql } from 'drizzle-orm';

const RESOURCE_ID = '5232a72d-235a-48eb-ae20-bb9d501300ad';
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

export class PermisConstructionPipeline implements Pipeline {
  readonly name = 'permis_construction';
  readonly schedule = '0 0 * * 0'; // weekly Sun

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
        d.setDate(d.getDate() - 7);
        sinceDate = d.toISOString().slice(0, 10);
      }
      console.log(`Fetching ${this.name}: records since ${sinceDate}...`);
    }

    const allRecords: RawRecord[] = [];
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "date_emission" >= '${sinceDate}'`;
    for await (const batch of client.datastoreSQLPaginated(baseSql, 32000)) {
      allRecords.push(...batch);
    }

    console.log(
      `Fetching ${this.name}: ${allRecords.length} records since ${sinceDate}...`,
    );
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    const result: NormalizedRecord[] = [];
    for (const r of raw) {
      const externalId = String(
        r.no_demande ?? r.id_permis ?? r._id ?? '',
      ).trim();
      if (!externalId) continue;

      const dateIssued = parseDate(r.date_emission ?? r.date_emission);
      if (!dateIssued) continue;

      const lat = safeNum(r.latitude ?? r.LATITUDE);
      const lng = safeNum(r.longitude ?? r.LONGITUDE);

      result.push({
        permitNumber: externalId,
        dateIssued,
        boroughCode: findBoroughCode(
          (r.arrondissement ?? r.ARRONDISSEMENT) as string,
        ),
        permitType: (r.code_type_base_demande ?? r.code_type) as string | null,
        buildingType: (r.description_type_batiment) as string | null,
        natureTravaux: (r.nature_travaux) as string | null,
        numUnits: safeNum(r.nb_logements ?? r.nb_logements),
        estimatedCost: safeNum(r.cout_travaux_estimes ?? r.cout_permis_emis),
        lat: lat != null && lng != null ? lat : null,
        lng: lat != null && lng != null ? lng : null,
        rawData: r as Record<string, unknown>,
      });
    }
    return result;
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = r.permitNumber as string;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    if (records.length === 0) return { inserted: 0, updated: 0 };

    const BATCH = 200;
    let inserted = 0;

    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);
      const values = batch.map((r) => {
        const lat = r.lat as number | string | null;
        const lng = r.lng as number | string | null;
        const cost = r.estimatedCost as number | string | null;
        return {
          permitNumber: r.permitNumber as string,
          dateIssued: r.dateIssued as string,
          boroughCode: (r.boroughCode as string | null) ?? null,
          permitType: (r.permitType as string | null) ?? null,
          buildingType: (r.buildingType as string | null) ?? null,
          natureTravaux: (r.natureTravaux as string | null) ?? null,
          numUnits: (r.numUnits as number | null) ?? null,
          estimatedCost: cost != null ? String(cost) : null,
          lat: lat != null ? String(lat) : null,
          lng: lng != null ? String(lng) : null,
          rawData: (r.rawData as object) ?? null,
        };
      });

      await db
        .insert(constructionPermits)
        .values(values)
        .onConflictDoUpdate({
          target: constructionPermits.permitNumber,
          set: {
            dateIssued: sql`excluded.date_issued`,
            boroughCode: sql`excluded.borough_code`,
            permitType: sql`excluded.permit_type`,
            buildingType: sql`excluded.building_type`,
            natureTravaux: sql`excluded.nature_travaux`,
            numUnits: sql`excluded.num_units`,
            estimatedCost: sql`excluded.estimated_cost`,
            lat: sql`excluded.lat`,
            lng: sql`excluded.lng`,
            rawData: sql`excluded.raw_data`,
            updatedAt: sql`now()`,
          },
        });

      inserted += batch.length;
    }

    return { inserted, updated: 0 };
  }
}
