/**
 * Cycling counts pipeline — Compteurs cyclistes permanents.
 * Dataset: velos-comptage (Comptages des vélos sur les pistes cyclables)
 * Resources: yearly (2020–2026). Daily aggregation by date + counter.
 * Fetch: DataStore SQL per resource. Filter heure='00:00:00' for daily.
 */

import { db } from '@/lib/db';
import { cyclingCounts, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { and, eq, sql } from 'drizzle-orm';

const RESOURCES: { id: string; year: number }[] = [
  { id: '607715d2-4bb9-4f8e-bd05-13365e241dc6', year: 2025 },
  { id: 'f3eab3d7-f313-42f1-a5f1-353e26fe5ff9', year: 2026 },
  { id: '59ce7ec4-f398-43b5-9311-ebad77b782c3', year: 2024 },
  { id: '65a37da8-a7cf-4812-a3b5-5edff31c45f6', year: 2023 },
  { id: 'fd3da18e-8f87-44e4-890b-30dff05c12b8', year: 2022 },
  { id: 'b463fa29-8549-4664-ae68-b17ab604e0a5', year: 2021 },
  { id: 'eec17749-1a50-47b2-bc4e-1960ddc09eff', year: 2020 },
];

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

export class CyclingCountsPipeline implements Pipeline {
  readonly name = 'cycling_counts';
  readonly schedule = '0 8 * * *'; // daily 8AM

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();

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

    let minYear = 2020;
    if (lastRun.length > 0 && lastRun[0]!.completedAt) {
      minYear = Math.max(2020, new Date(lastRun[0]!.completedAt).getFullYear() - 1);
    }

    const allRecords: RawRecord[] = [];

    for (const res of RESOURCES) {
      if (res.year < minYear) continue;

      const sqlQuery = `SELECT * FROM "${res.id}" WHERE "heure" = '00:00:00' OR "heure" IS NULL`;
      for await (const batch of client.datastoreSQLPaginated(sqlQuery, 32000)) {
        allRecords.push(...batch);
      }
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const dateStr = parseDate(r.date ?? r.Date);
      const counterId = String(r.id_compteur ?? r.id ?? r.Id ?? '').trim();
      const volume = safeNum(r.nb_passages ?? r.Comptage ?? r.nb_passages) ?? 0;
      const lat = safeNum(r.latitude ?? r.Latitude);
      const lng = safeNum(r.longitude ?? r.Longitude);

      let boroughCode: string | null = null;
      const arrName = r.Arrondissement ?? r.arrondissement ?? r.borough;
      if (arrName) boroughCode = findBoroughCode(String(arrName));

      return {
        counterId,
        periodDate: dateStr ?? '1970-01-01',
        volume,
        lat,
        lng,
        boroughCode,
        rawData: r as Record<string, unknown>,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = `${r.counterId}|${r.periodDate}`;
      if (seen.has(id)) return false;
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
        counterId: r.counterId as string,
        periodDate: (r.periodDate as string).slice(0, 10),
        volume: (r.volume as number) ?? 0,
        lat: r.lat != null ? String(r.lat) : null,
        lng: r.lng != null ? String(r.lng) : null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        rawData: (r.rawData as object) ?? null,
      }));

      await db
        .insert(cyclingCounts)
        .values(values)
        .onConflictDoUpdate({
          target: [cyclingCounts.counterId, cyclingCounts.periodDate],
          set: {
            volume: sql`excluded.volume`,
            lat: sql`excluded.lat`,
            lng: sql`excluded.lng`,
            boroughCode: sql`excluded.borough_code`,
            rawData: sql`excluded.raw_data`,
          },
        });
      inserted += values.length;
    }

    return { inserted, updated: 0 };
  }
}
