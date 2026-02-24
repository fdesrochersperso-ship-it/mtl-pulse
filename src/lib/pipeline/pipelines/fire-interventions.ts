/**
 * Fire interventions pipeline — SIM fire department interventions.
 * Resource ID: 71e86320-e35c-4b4c-878a-e52124294355 (2 years rolling)
 * Fetch: DataStore SQL with CREATION_DATE_TIME filter. Backfill 5 years on first run.
 * Data: donnees.montreal.ca
 */

import { db } from '@/lib/db';
import { fireInterventions, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { eq, and, sql } from 'drizzle-orm';

const RESOURCE_ID = '71e86320-e35c-4b4c-878a-e52124294355';
const CKAN_BASE = 'https://donnees.montreal.ca/api/3/action';
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

function makeExternalId(r: RawRecord): string {
  const incidentNbr = String(r.INCIDENT_NBR ?? r.incident_nbr ?? '').trim();
  const creationTime = String(r.CREATION_DATE_TIME ?? r.creation_date_time ?? '').trim();
  const lat = String(r.LATITUDE ?? r.latitude ?? '').trim();
  const lng = String(r.LONGITUDE ?? r.longitude ?? '').trim();
  return [incidentNbr, creationTime, lat, lng].filter(Boolean).join('|') || `fire-${r._id}`;
}

export class FireInterventionsPipeline implements Pipeline {
  readonly name = 'fire_interventions';
  readonly schedule = '0 0 1 * *'; // monthly 1st

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient(CKAN_BASE);

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
    const baseSql = `SELECT * FROM "${RESOURCE_ID}" WHERE "CREATION_DATE_TIME" >= '${sinceDate}'`;
    for await (const batch of client.datastoreSQLPaginated(baseSql, 32000)) {
      allRecords.push(...batch);
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records since ${sinceDate}...`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const incidentDate = parseDate(r.CREATION_DATE_TIME ?? r.creation_date_time);
      const lat = safeNum(r.LATITUDE ?? r.latitude);
      const lng = safeNum(r.LONGITUDE ?? r.longitude);

      return {
        externalId: makeExternalId(r),
        incidentType: String(
          r.DESCRIPTION_GROUPE ?? r.description_groupe ?? r.INCIDENT_TYPE_DESC ?? r.incident_type_desc ?? '',
        ).trim() || null,
        incidentDate: incidentDate ?? '1970-01-01',
        station: (r.CASERNE ?? r.caserne) ? String(r.CASERNE ?? r.caserne).trim() : null,
        boroughCode: findBoroughCode((r.NOM_ARROND ?? r.nom_arrond ?? r.arrondissement) as string),
        numUnits: safeNum(r.NOMBRE_UNITES ?? r.nombre_unites),
        lat: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lat : null,
        lng: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lng : null,
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
    let updated = 0;

    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);
      const values = batch.map((r) => ({
        externalId: r.externalId as string,
        incidentType: (r.incidentType as string | null) ?? null,
        incidentDate: (r.incidentDate as string).slice(0, 10),
        station: (r.station as string | null) ?? null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        numUnits: (r.numUnits as number | null) ?? null,
        lat: (r.lat != null ? String(r.lat) : null) as string | null,
        lng: (r.lng != null ? String(r.lng) : null) as string | null,
      }));

      await db
        .insert(fireInterventions)
        .values(values)
        .onConflictDoUpdate({
          target: fireInterventions.externalId,
          set: {
            incidentType: sql`excluded.incident_type`,
            incidentDate: sql`excluded.incident_date`,
            station: sql`excluded.station`,
            boroughCode: sql`excluded.borough_code`,
            numUnits: sql`excluded.num_units`,
            lat: sql`excluded.lat`,
            lng: sql`excluded.lng`,
            updatedAt: sql`now()`,
          },
        });

      inserted += values.length;
    }

    return { inserted, updated };
  }
}
