/**
 * Info-Travaux pipeline — construction permits & obstructions.
 * Fetch: Two CSV files from donnees.montreal.ca (obstructions + impacts).
 * Store: travaux table with first_seen_at / last_seen_at tracking.
 */

import { parse } from 'csv-parse/sync';
import { db } from '@/lib/db';
import { travaux } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { sql } from 'drizzle-orm';

function parseDate(val: unknown): string | null {
  if (val == null) return null;
  const s = String(val).trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function emptyToNull<T>(val: T): T | null {
  if (val == null) return null;
  if (typeof val === 'string' && val.trim() === '') return null;
  return val;
}

export class InfoTravauxPipeline implements Pipeline {
  readonly name = 'info_travaux';
  readonly schedule = '0 */6 * * *'; // every 6h

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();
    const packageResult = await client.packageShow('info-travaux');

    const csvResources = packageResult.result.resources.filter(
      (r) => r.format?.toUpperCase() === 'CSV',
    );

    if (csvResources.length === 0) {
      throw new Error('Could not find CSV resources in info-travaux package');
    }

    const allRecords: RawRecord[] = [];

    for (const res of csvResources) {
      if (!res.url) continue;
      console.log(`Fetching ${this.name}: ${res.name}...`);
      const buffer = await client.downloadResource(res.url);
      const records = parse(buffer.toString('utf-8'), {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true,
        relax_quotes: true,
      }) as RawRecord[];

      for (const r of records) {
        r._source = res.name;
      }
      allRecords.push(...records);
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records...`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    const result: NormalizedRecord[] = [];
    for (const r of raw) {
      const externalId = String(
        r.permit_permitid ?? r.permit_permit_id ?? r.id ?? '',
      ).trim();
      if (!externalId) continue;

      const boroughCode = findBoroughCode(
        (r.boroughid ?? r.borough_id ?? r.arrondissement) as string,
      );

      const startDate = parseDate(
        r.duration_startdate ?? r.duration_start_date ?? r.start_date,
      );
      const endDate = parseDate(
        r.duration_enddate ?? r.duration_end_date ?? r.end_date,
      );

      result.push({
        externalId,
        boroughCode,
        category: emptyToNull(r.permitcategory ?? r.permit_category) as string | null,
        status: emptyToNull(r.currentstatus ?? r.current_status) as string | null,
        startDate,
        endDate,
        street: emptyToNull(r.occupancyname ?? r.occupancy_name ?? r.street) as string | null,
        organizationName: emptyToNull(
          r.organizationname ?? r.organization_name,
        ) as string | null,
        rawData: r as Record<string, unknown>,
      });
    }
    return result;
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const byId = new Map<string, NormalizedRecord>();
    for (const r of records) {
      const id = r.externalId as string;
      if (!id) continue;
      byId.set(id, r);
    }
    return Array.from(byId.values());
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    if (records.length === 0) return { inserted: 0, updated: 0 };

    const now = new Date();
    let inserted = 0;

    const BATCH = 100;
    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);

      await db
        .insert(travaux)
        .values(
          batch.map((r) => ({
            externalId: r.externalId as string,
            boroughCode: (r.boroughCode as string | null) ?? null,
            category: (r.category as string | null) ?? null,
            status: (r.status as string | null) ?? null,
            startDate: (r.startDate as string | null) ?? null,
            endDate: (r.endDate as string | null) ?? null,
            street: (r.street as string | null) ?? null,
            organizationName: (r.organizationName as string | null) ?? null,
            rawData: (r.rawData as object) ?? null,
          })),
        )
        .onConflictDoUpdate({
          target: travaux.externalId,
          set: {
            boroughCode: sql`excluded.borough_code`,
            category: sql`excluded.category`,
            status: sql`excluded.status`,
            startDate: sql`excluded.start_date`,
            endDate: sql`excluded.end_date`,
            street: sql`excluded.street`,
            organizationName: sql`excluded.organization_name`,
            rawData: sql`excluded.raw_data`,
            lastSeenAt: sql`now()`,
            updatedAt: sql`now()`,
          },
        });

      inserted += batch.length;
    }

    return { inserted, updated: 0 };
  }
}
