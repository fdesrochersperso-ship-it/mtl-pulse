/**
 * Water breaks pipeline — Réparations réseau eau potable.
 * Dataset: reparation-reseau-eau-potable
 * Resource: 0828c687-a459-4c82-a5cf-3d8f9c314697
 * Fetch: DataStore SQL. Data since 1972 — backfill 5+ years, ideally all.
 */

import { db } from '@/lib/db';
import { waterBreaks, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { and, eq, sql } from 'drizzle-orm';

const RESOURCE_ID = '0828c687-a459-4c82-a5cf-3d8f9c314697';
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

export class WaterBreaksPipeline implements Pipeline {
  readonly name = 'water_breaks';
  readonly schedule = '0 0 * * 1'; // weekly Monday

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
      sinceDate = '1972-01-01';
      console.log(
        `Fetching ${this.name}: full backfill since ${sinceDate} (no previous successful run)...`,
      );
    } else {
      const lastCompleted = lastRun[0]!.completedAt;
      if (!lastCompleted) {
        sinceDate = FIVE_YEARS_AGO.toISOString().slice(0, 10);
      } else {
        const d = new Date(lastCompleted);
        d.setDate(d.getDate() - 30);
        sinceDate = d.toISOString().slice(0, 10);
      }
      console.log(`Fetching ${this.name}: records since ${sinceDate}...`);
    }

    const allRecords: RawRecord[] = [];
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "DATE" >= '${sinceDate}'`;
    for await (const batch of client.datastoreSQLPaginated(baseSql, 32000)) {
      allRecords.push(...batch);
    }

    console.log(
      `Fetching ${this.name}: ${allRecords.length} records since ${sinceDate}...`,
    );
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const dateStr = parseDate(r.DATE ?? r.date);
      const externalId = String(r.ID_AQU_BRIS ?? r.id ?? '').trim();
      const arrName = r.ARRONDISSEMENT ?? r.Arrondissement ?? r.arrondissement;
      const boroughCode = arrName ? findBoroughCode(String(arrName)) : null;

      return {
        externalId: externalId || null,
        breakDate: dateStr ?? '1972-01-01',
        boroughCode,
        streetName: (r.Rue ?? r.rue ?? r.Street) ? String(r.Rue ?? r.rue ?? r.Street).trim() : null,
        breakType: (r.TypeBris ?? r.type_bris) ? String(r.TypeBris ?? r.type_bris).trim() : null,
        pipeMaterial: (r.Materiau ?? r.materiau) ? String(r.Materiau ?? r.materiau).trim() : null,
        pipeDiameter: safeNum(r.Diametre ?? r.diametre),
        lat: safeNum(r.Latitude ?? r.latitude),
        lng: safeNum(r.Longitude ?? r.longitude),
        rawData: r as Record<string, unknown>,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = String(r.externalId ?? `${r.breakDate}|${r.lat}|${r.lng}`);
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
        externalId: (r.externalId as string | null) ?? null,
        breakDate: (r.breakDate as string).slice(0, 10),
        boroughCode: (r.boroughCode as string | null) ?? null,
        streetName: (r.streetName as string | null) ?? null,
        breakType: (r.breakType as string | null) ?? null,
        pipeMaterial: (r.pipeMaterial as string | null) ?? null,
        pipeDiameter: r.pipeDiameter != null ? String(r.pipeDiameter) : null,
        lat: r.lat != null ? String(r.lat) : null,
        lng: r.lng != null ? String(r.lng) : null,
        rawData: (r.rawData as object) ?? null,
      }));

      const withExternalId = values.filter((v) => v.externalId);
      const withoutExternalId = values.filter((v) => !v.externalId);

      if (withExternalId.length > 0) {
        await db
          .insert(waterBreaks)
          .values(withExternalId)
          .onConflictDoUpdate({
            target: waterBreaks.externalId,
            set: {
              breakDate: sql`excluded.break_date`,
              boroughCode: sql`excluded.borough_code`,
              streetName: sql`excluded.street_name`,
              breakType: sql`excluded.break_type`,
              pipeMaterial: sql`excluded.pipe_material`,
              pipeDiameter: sql`excluded.pipe_diameter`,
              lat: sql`excluded.lat`,
              lng: sql`excluded.lng`,
              rawData: sql`excluded.raw_data`,
            },
          });
        inserted += withExternalId.length;
      }

      if (withoutExternalId.length > 0) {
        await db.insert(waterBreaks).values(
          withoutExternalId.map(({ externalId: _, ...v }) => ({ ...v, externalId: null })),
        );
        inserted += withoutExternalId.length;
      }
    }

    return { inserted, updated };
  }
}
