/**
 * Air quality pipeline — RSQA IQA by station.
 * Dataset: rsqa-indice-qualite-air
 * Resource: IQA par station (6554355e-63d1-4a01-a268-91e0763c3606)
 * Fetch: DataStore search for latest + backfill.
 * NOTE: System uses EST year-round (no daylight saving). Timestamps are stored as-is.
 */

import { db } from '@/lib/db';
import { airQuality, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { and, eq, sql } from 'drizzle-orm';

const RESOURCE_ID = '6554355e-63d1-4a01-a268-91e0763c3606';

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

export class AirQualityPipeline implements Pipeline {
  readonly name = 'air_quality';
  readonly schedule = '50 * * * *'; // hourly at :50 (data available ~50min after hour)

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
      sinceDate = '2020-01-01';
      console.log(
        `Fetching ${this.name}: backfill since ${sinceDate} (no previous successful run)...`,
      );
    } else {
      const lastCompleted = lastRun[0]!.completedAt;
      if (!lastCompleted) {
        sinceDate = '2020-01-01';
      } else {
        const d = new Date(lastCompleted);
        d.setDate(d.getDate() - 7);
        sinceDate = d.toISOString().slice(0, 10);
      }
      console.log(`Fetching ${this.name}: records since ${sinceDate}...`);
    }

    const allRecords: RawRecord[] = [];
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "date" >= '${sinceDate}'`;
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
      const dateStr = parseDate(r.date ?? r.DATE);
      const heureVal = r.heure ?? r.Heure;
      let hour: number | null = null;
      if (heureVal != null) {
        const hStr = String(heureVal).trim();
        if (/^\d+$/.test(hStr)) {
          hour = parseInt(hStr, 10);
        } else if (hStr.includes(':')) {
          hour = parseInt(hStr.split(':')[0] ?? '0', 10);
        }
      }

      return {
        stationId: String(r.stationId ?? r.Id ?? '').trim(),
        readingDate: dateStr ?? '1970-01-01',
        readingHour: hour,
        pollutant: String(r.pollutant ?? '').trim() || 'unknown',
        value: safeNum(r.valeur ?? r.value),
        lat: safeNum(r.latitude ?? r.Latitude),
        lng: safeNum(r.longitude ?? r.Longitude),
        sectorName: (r.secteur ?? r.Secteur) ? String(r.secteur ?? r.Secteur).trim() : null,
        rawData: r as Record<string, unknown>,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = `${r.stationId}|${r.readingDate}|${r.readingHour}|${r.pollutant}`;
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
        stationId: r.stationId as string,
        readingDate: (r.readingDate as string).slice(0, 10),
        readingHour: (r.readingHour as number | null) ?? null,
        pollutant: r.pollutant as string,
        value: r.value != null ? String(r.value) : null,
        lat: r.lat != null ? String(r.lat) : null,
        lng: r.lng != null ? String(r.lng) : null,
        sectorName: (r.sectorName as string | null) ?? null,
        rawData: (r.rawData as object) ?? null,
      }));

      await db.insert(airQuality).values(values).onConflictDoNothing();
      inserted += values.length;
    }

    return { inserted, updated: 0 };
  }
}
