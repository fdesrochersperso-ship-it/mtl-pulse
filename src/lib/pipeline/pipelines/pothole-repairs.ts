/**
 * Pothole repairs pipeline — mechanized pothole filling (SIRR).
 * Resources: CSV with datastore 2016-2020 (b41845e8 etc. are GPKG-only for 2021+).
 * Fetch: DataStore SQL from each datastore-enabled resource. Backfill all on first run.
 * Data: donnees.montreal.ca
 */

import { db } from '@/lib/db';
import { potholeRepairs } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';

const CKAN_BASE = 'https://donnees.montreal.ca/api/3/action';

/** Datastore-enabled CSV resources (2016-2020). 2021+ are GPKG-only. */
const POTHOLE_RESOURCE_IDS = [
  '1fd93da8-08bc-4ff3-a233-2917eaeab6c6', // 2020
  'c3d11c03-17d2-4909-9c45-a4d5e0050816', // 2019
  'b6dbc325-bec5-4d51-876e-4a54fd6bd563', // 2018
  'db9f7ad5-63fb-48a8-a282-8276367383e9', // 2017
  'bfb60be3-22d0-43db-8795-19d28dab1d76', // 2016
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

function makeExternalId(r: RawRecord, resourceId: string): string {
  const appareil = String(r.Appareil ?? r.appareil ?? '').trim();
  const dateJour = String(r.DateJour ?? r.date_jour ?? r.Date ?? r.date ?? '').trim();
  const lat = String(r.Latitude ?? r.latitude ?? '').trim();
  const lng = String(r.Longitude ?? r.longitude ?? '').trim();
  const id = r._id != null ? String(r._id) : '';
  return `pothole-${resourceId}-${id}-${appareil}-${dateJour}-${lat}-${lng}`;
}

export class PotholeRepairsPipeline implements Pipeline {
  readonly name = 'pothole_repairs';
  readonly schedule = '0 0 * * 1'; // weekly Mon (seasonal spring focus)

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient(CKAN_BASE);
    const allRecords: RawRecord[] = [];

    for (const resourceId of POTHOLE_RESOURCE_IDS) {
      console.log(`Fetching ${this.name}: resource ${resourceId}...`);
      for await (const batch of client.datastoreSQLPaginated(
        `SELECT * FROM "${resourceId}"`,
        32000,
      )) {
        for (const r of batch) {
          (r as RawRecord & { _resourceId?: string })._resourceId = resourceId;
          allRecords.push(r as RawRecord);
        }
      }
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} total records...`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const resourceId = (r as RawRecord & { _resourceId?: string })._resourceId ?? '';
      const dateVal = r.DateJour ?? r.date_jour ?? r.Date ?? r.date;
      const repairDate = parseDate(dateVal);

      const lat = safeNum(r.Latitude ?? r.latitude);
      const lng = safeNum(r.Longitude ?? r.longitude);

      return {
        externalId: makeExternalId(r, resourceId),
        repairDate: repairDate ?? '1970-01-01',
        vehicleId: (r.Appareil ?? r.appareil) ? String(r.Appareil ?? r.appareil).trim() : null,
        lat: lat != null && lng != null ? lat : null,
        lng: lat != null && lng != null ? lng : null,
        boroughCode: null, // CSV has no borough; would need geocoding
        rawData: r as Record<string, unknown>,
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
        repairDate: (r.repairDate as string).slice(0, 10),
        vehicleId: (r.vehicleId as string | null) ?? null,
        lat: (r.lat != null ? String(r.lat) : null) as string | null,
        lng: (r.lng != null ? String(r.lng) : null) as string | null,
        boroughCode: (r.boroughCode as string | null) ?? null,
      }));

      await db.insert(potholeRepairs).values(values);
      inserted += values.length;
    }

    return { inserted, updated: 0 };
  }
}
