/**
 * Requêtes 311 pipeline — citizen service requests.
 * Resource ID: 2cfa0e06-9be4-49a6-b7f1-ee9f2363a872
 * Fetch: DataStore SQL with date filter on DDS_DATE_CREATION. Backfill 5 years.
 */

import { db } from '@/lib/db';
import { requests311, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { eq, and, sql } from 'drizzle-orm';

const RESOURCE_ID = '2cfa0e06-9be4-49a6-b7f1-ee9f2363a872';
const FIVE_YEARS_AGO = new Date();
FIVE_YEARS_AGO.setFullYear(FIVE_YEARS_AGO.getFullYear() - 5);

function parseDate(val: unknown): string | null {
  if (val == null) return null;
  const s = String(val).trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

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

export class Requetes311Pipeline implements Pipeline {
  readonly name = 'requetes_311';
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
        d.setDate(d.getDate() - 1);
        sinceDate = d.toISOString().slice(0, 10);
      }
      console.log(`Fetching ${this.name}: records since ${sinceDate}...`);
    }

    const allRecords: RawRecord[] = [];
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "DDS_DATE_CREATION" >= '${sinceDate}'`;
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
      const idUnique = r.ID_UNIQUE ?? r.id_unique;
      const fallbackId = r._id != null ? `311-${r._id}` : '';
      const externalId = String(idUnique ?? fallbackId).trim();
      if (!externalId) continue;

      const status = (r.DERNIER_STATUT ?? r.dernier_statut ?? r.status) as string | null;
      const isClosed = status?.toLowerCase().includes('terminée') ?? false;

      const loc = r.LOCATION as Record<string, unknown> | undefined;
      const lat = safeNum(r.LOC_LAT ?? r.loc_lat ?? loc?.latitude);
      const lng = safeNum(r.LOC_LONG ?? r.loc_long ?? loc?.longitude);
      const locX = safeNum(r.LOC_X ?? r.loc_x);
      const locY = safeNum(r.LOC_Y ?? r.loc_y);

      let finalLat: number | null = lat;
      let finalLng: number | null = lng;
      if ((finalLat == null || finalLng == null) && locX != null && locY != null) {
        finalLat = locY;
        finalLng = locX;
      }

      result.push({
        requestId: externalId,
        nature: (r.NATURE ?? r.nature) as string | null,
        requestType: (r.ACTI_NOM ?? r.acti_nom ?? r.type_demande) as string | null,
        boroughCode: findBoroughCode(
          (r.ARRONDISSEMENT_GEO ?? r.arrondissement_geo ?? r.arrondissement) as string,
        ),
        status: status ?? null,
        createdAt: parseTimestamp(r.DDS_DATE_CREATION ?? r.dds_date_creation),
        closedAt: isClosed
          ? parseTimestamp(r.DATE_DERNIER_STATUT ?? r.date_dernier_statut)
          : null,
        lat: finalLat,
        lng: finalLng,
        rawData: r as Record<string, unknown>,
      });
    }
    return result;
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = r.requestId as string;
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
        return {
          requestId: r.requestId as string,
          nature: (r.nature as string | null) ?? null,
          requestType: (r.requestType as string | null) ?? null,
          boroughCode: (r.boroughCode as string | null) ?? null,
          status: (r.status as string | null) ?? null,
          createdAt: (r.createdAt as Date) ?? new Date(),
          closedAt: (r.closedAt as Date | null) ?? null,
          lat: lat != null ? String(lat) : null,
          lng: lng != null ? String(lng) : null,
          rawData: (r.rawData as object) ?? null,
        };
      });

      await db
        .insert(requests311)
        .values(values)
        .onConflictDoUpdate({
          target: requests311.requestId,
          set: {
            nature: sql`excluded.nature`,
            requestType: sql`excluded.request_type`,
            boroughCode: sql`excluded.borough_code`,
            status: sql`excluded.status`,
            closedAt: sql`excluded.closed_at`,
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
