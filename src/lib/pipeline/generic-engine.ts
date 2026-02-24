/**
 * GenericDataStorePipeline — auto-ingest any CKAN DataStore dataset into dataset_records.
 */

import { CKANClient } from '@/lib/api-clients/ckan-client';
import { db } from '@/lib/db';
import { datasetRecords } from '@/lib/db/schema';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from './types';
import { sql } from 'drizzle-orm';

export interface GeoFields {
  lat: string;
  lng: string;
}

export interface GenericDataStorePipelineOptions {
  datasetSlug: string;
  resourceId: string;
  dateField?: string;
  geoFields?: GeoFields;
  boroughField?: string;
  externalIdField?: string;
  /** Days to fetch when dateField provided (default: 7) */
  daysBack?: number;
}

export class GenericDataStorePipeline implements Pipeline {
  readonly name: string;
  readonly schedule: string;
  private readonly options: Required<
    Omit<GenericDataStorePipelineOptions, 'dateField' | 'geoFields' | 'boroughField' | 'externalIdField'>
  > & GenericDataStorePipelineOptions;

  constructor(options: GenericDataStorePipelineOptions) {
    this.options = { daysBack: 7, ...options };
    this.name = `generic_${options.datasetSlug}`;
    this.schedule = '0 6 * * *'; // daily 6AM default
  }

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();
    const { resourceId, dateField, daysBack } = this.options;

    let sqlQuery: string;
    if (dateField) {
      const since = new Date();
      since.setDate(since.getDate() - (daysBack ?? 7));
      const sinceStr = since.toISOString().slice(0, 10);
      sqlQuery = `SELECT * FROM "${resourceId}" WHERE "${dateField}" >= '${sinceStr}'`;
    } else {
      sqlQuery = `SELECT * FROM "${resourceId}" LIMIT 1000`;
    }

    const allRecords: RawRecord[] = [];
    for await (const page of client.datastoreSQLPaginated(sqlQuery)) {
      allRecords.push(...(page as RawRecord[]));
    }
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    const { dateField, geoFields, boroughField, externalIdField } = this.options;

    return raw.map((r) => {
      let recordDate: Date | null = null;
      if (dateField && r[dateField]) {
        const val = r[dateField];
        if (typeof val === 'string') {
          const parsed = new Date(val);
          recordDate = isNaN(parsed.getTime()) ? null : parsed;
        }
      }

      let latitude: string | number | null = null;
      let longitude: string | number | null = null;
      if (geoFields && r[geoFields.lat] != null && r[geoFields.lng] != null) {
        latitude = r[geoFields.lat] as string | number;
        longitude = r[geoFields.lng] as string | number;
      }

      const boroughName = boroughField ? (r[boroughField] as string | null) : null;
      const externalId = externalIdField
        ? (r[externalIdField] as string | null) ?? (r._id != null ? String(r._id) : null)
        : r._id != null
          ? String(r._id)
          : null;

      return {
        datasetSlug: this.options.datasetSlug,
        resourceId: this.options.resourceId,
        externalId,
        recordDate: recordDate?.toISOString().slice(0, 10) ?? null,
        boroughName,
        latitude,
        longitude,
        data: r,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const key = `${r.datasetSlug}:${r.externalId ?? ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    if (records.length === 0) return { inserted: 0, updated: 0 };

    const BATCH_SIZE = 500;
    let totalInserted = 0;

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const values = batch.map((r, j) => ({
        datasetSlug: this.options.datasetSlug,
        resourceId: this.options.resourceId,
        externalId:
          (r.externalId as string | null) ??
          `row_${i + j}_${Math.random().toString(36).slice(2, 10)}`,
        recordDate: r.recordDate as string | null,
        boroughName: r.boroughName as string | null,
        latitude: r.latitude as string | null,
        longitude: r.longitude as string | null,
        data: r.data as Record<string, unknown>,
      }));

      await db
        .insert(datasetRecords)
        .values(values)
        .onConflictDoUpdate({
          target: [datasetRecords.datasetSlug, datasetRecords.externalId],
          set: {
            recordDate: sql`excluded.record_date`,
            boroughName: sql`excluded.borough_name`,
            latitude: sql`excluded.latitude`,
            longitude: sql`excluded.longitude`,
            data: sql`excluded.data`,
          },
        });

      totalInserted += batch.length;
    }

    return { inserted: totalInserted, updated: 0 };
  }
}
