/**
 * Entraves circulation pipeline — real-time road obstructions (CIFS feed).
 * Strategy: FULL REPLACE. Delete all existing rows, insert new ones.
 * Archive: Store full feed as JSONB in obstruction_snapshots.
 */

import { db } from '@/lib/db';
import { roadObstructions, obstructionSnapshots } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';

const CIFS_FEED_URL =
  'https://api.montreal.ca/api/transportation/traffic-events-api/v1/export-cifs?type=json';

function parseLatLngFromPolyline(polyline: string): { lat: number; lng: number } | null {
  if (!polyline || typeof polyline !== 'string') return null;
  const parts = polyline.split(',');
  if (parts.length >= 2) {
    const lat = parseFloat(parts[0]!);
    const lng = parseFloat(parts[1]!);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  return null;
}

export class EntravesCirculationPipeline implements Pipeline {
  readonly name = 'entraves_circulation';
  readonly schedule = '0 * * * *'; // hourly

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();
    let body: string;

    try {
      const buffer = await client.downloadResource(CIFS_FEED_URL);
      body = buffer.toString('utf-8');
    } catch (err) {
      console.warn(
        `[${this.name}] CIFS feed fetch failed (URL may have changed):`,
        err,
      );
      return [];
    }

    let data: unknown;
    try {
      data = JSON.parse(body) as unknown;
    } catch {
      console.warn(`[${this.name}] Invalid JSON from CIFS feed`);
      return [];
    }

    const items = Array.isArray(data)
      ? data
      : (data as { events?: unknown[] })?.events ?? (data as { features?: unknown[] })?.features ?? [];

    const records: RawRecord[] = (items as unknown[]).map((item, i) => ({
      ...(typeof item === 'object' && item != null ? (item as Record<string, unknown>) : {}),
      _index: i,
    }));

    console.log(`Fetching ${this.name}: ${records.length} records (full replace)...`);
    return records;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    const result: NormalizedRecord[] = [];
    for (const r of raw) {
      const id = r.id ?? r._id ?? r.uuid ?? `entrave-${r._index ?? 0}`;
      const externalId = String(id).trim() || null;
      if (!externalId) continue;

      const loc = r.location as Record<string, unknown> | undefined;
      const street = (loc?.street ?? r.street ?? r.road) as string | null;
      const direction = (loc?.direction ?? r.direction) as string | null;
      const polyline = (loc?.polyline ?? r.polyline ?? r.geometry) as string | null;

      const coords = polyline
        ? parseLatLngFromPolyline(
            typeof polyline === 'string'
              ? polyline
              : JSON.stringify(polyline),
          )
        : null;

      result.push({
        sourceId: externalId,
        startTime: r.starttime ?? r.start_time ?? r.startTime ?? null,
        endTime: r.endtime ?? r.end_time ?? r.endTime ?? null,
        street: street ?? null,
        direction: direction ?? null,
        boroughCode: findBoroughCode(
          (r.arrondissement ?? r.borough ?? loc?.borough) as string,
        ),
        obstructionType: (r.type ?? r.obstruction_type) as string | null,
        subtype: (r.subtype ?? r.sub_type) as string | null,
        description: (r.description ?? r.desc) as string | null,
        lat: coords?.lat ?? null,
        lng: coords?.lng ?? null,
        rawData: r as Record<string, unknown>,
      });
    }
    return result;
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = r.sourceId as string;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    const now = new Date();

    await db.delete(roadObstructions);

    const rawFeedForArchive = records.map((r) => r.rawData);

    await db.insert(obstructionSnapshots).values({
      snapshotData: rawFeedForArchive as object,
      recordCount: records.length,
      fetchedAt: now,
    });

    if (records.length === 0) {
      return { inserted: 0, updated: 0 };
    }

    const values = records.map((r) => {
      const lat = r.lat as number | string | null;
      const lng = r.lng as number | string | null;
      return {
        sourceId: r.sourceId as string,
        startTime: r.startTime
          ? new Date(r.startTime as string)
          : null,
        endTime: r.endTime ? new Date(r.endTime as string) : null,
        street: (r.street as string | null) ?? null,
        direction: (r.direction as string | null) ?? null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        obstructionType: (r.obstructionType as string | null) ?? null,
        subtype: (r.subtype as string | null) ?? null,
        description: (r.description as string | null) ?? null,
        lat: lat != null ? String(lat) : null,
        lng: lng != null ? String(lng) : null,
        rawData: (r.rawData as object) ?? null,
        fetchedAt: now,
      };
    });

    const BATCH = 200;
    for (let i = 0; i < values.length; i += BATCH) {
      await db.insert(roadObstructions).values(values.slice(i, i + BATCH));
    }

    return { inserted: records.length, updated: 0 };
  }
}
