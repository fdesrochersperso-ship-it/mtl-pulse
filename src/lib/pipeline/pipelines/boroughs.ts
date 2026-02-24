/**
 * Boroughs pipeline — limites administratives de l'agglomération de Montréal.
 * Dataset: limites-administratives-agglomeration
 * Fetch: GeoJSON via package_show + download. Borough boundaries + reference data.
 * Schedule: on deploy only (run manually or via backfill).
 */

import { db } from '@/lib/db';
import { boroughs } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { BOROUGHS, findBoroughCode, type BoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { sql } from 'drizzle-orm';

const PACKAGE_ID = 'limites-administratives-agglomeration';

interface GeoJSONFeature {
  type: string;
  properties?: Record<string, unknown>;
  geometry?: unknown;
}

interface GeoJSON {
  type: string;
  features?: GeoJSONFeature[];
}

export class BoroughsPipeline implements Pipeline {
  readonly name = 'boroughs';
  readonly schedule = '0 0 1 1 *'; // yearly, Jan 1 (on deploy = run manually)

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();
    const packageResult = await client.packageShow(PACKAGE_ID);

    const geojsonResource = packageResult.result.resources.find(
      (r) =>
        r.format?.toUpperCase() === 'GEOJSON' &&
        (r.name?.toLowerCase().includes('wgs') || r.url?.toLowerCase().includes('agglomeration')),
    );

    if (!geojsonResource?.url) {
      throw new Error('Could not find GeoJSON resource in limites-administratives-agglomeration package');
    }

    console.log(`Fetching ${this.name}: ${geojsonResource.name}...`);
    const buffer = await client.downloadResource(geojsonResource.url);
    const geojson = JSON.parse(buffer.toString('utf-8')) as GeoJSON;

    if (!geojson.features || !Array.isArray(geojson.features)) {
      throw new Error('Invalid GeoJSON: missing features array');
    }

    const records: RawRecord[] = geojson.features.map((f) => ({
      properties: f.properties ?? {},
      geometry: f.geometry,
    }));

    console.log(`Fetching ${this.name}: ${records.length} features...`);
    return records;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    const result: NormalizedRecord[] = [];
    for (const r of raw) {
      const props = (r.properties as Record<string, unknown>) ?? {};
      const nom = String(props.NOM ?? props.nom ?? props.NOM_ARROND ?? '').trim();

      if (!nom) continue;

      const boroughCode = findBoroughCode(nom);
      if (!boroughCode) continue;

      const population = BOROUGHS[boroughCode as BoroughCode]?.population ?? null;
      const name = BOROUGHS[boroughCode as BoroughCode]?.name ?? nom;

      result.push({
        code: boroughCode,
        name,
        population,
        geometry: (r.geometry as object) ?? null,
        rawData: r as Record<string, unknown>,
      });
    }
    return result;
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const byCode = new Map<string, NormalizedRecord>();
    for (const r of records) {
      const code = r.code as string;
      if (!code) continue;
      const existing = byCode.get(code);
      if (!existing || (r.geometry && !existing.geometry)) {
        byCode.set(code, r);
      }
    }
    return Array.from(byCode.values());
  }

  async store(records: NormalizedRecord[]): Promise<StoreResult> {
    if (records.length === 0) return { inserted: 0, updated: 0 };

    await db.insert(boroughs).values(
      records.map((r) => ({
        code: r.code as string,
        name: r.name as string,
        population: (r.population as number | null) ?? null,
        geometry: (r.geometry as object) ?? null,
      })),
    ).onConflictDoUpdate({
      target: boroughs.code,
      set: {
        name: sql`excluded.name`,
        population: sql`excluded.population`,
        geometry: sql`excluded.geometry`,
        updatedAt: sql`now()`,
      },
    });

    return { inserted: records.length, updated: 0 };
  }
}
