/**
 * Road condition pipeline — Indicateurs de condition des chaussées.
 * Dataset: condition-chaussees-reseau-routier
 * Resources: multiple (2024, 2022, 2020, 2018, 2015, 2010). PCI and IRI indices.
 */

import { db } from '@/lib/db';
import { roadConditions, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { and, eq, sql } from 'drizzle-orm';

const RESOURCES: { id: string; surveyYear: number }[] = [
  { id: '2aae14e0-62c0-40b3-89f6-d865cda158e2', surveyYear: 2024 },
  { id: '832ffd3b-edc9-4354-a43e-4d696de9d3c5', surveyYear: 2022 },
  { id: 'b9061b12-af1f-487c-9df8-11f3fb4e93a7', surveyYear: 2020 },
  { id: '85085655-4ac0-4114-9793-715c0b63e2a0', surveyYear: 2018 },
  { id: 'c5c3b97e-83ec-468b-a62f-992a2d29e75b', surveyYear: 2015 },
  { id: 'd714c4b1-fe1a-4f9e-aa76-3fe45076c830', surveyYear: 2010 },
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

export class RoadConditionPipeline implements Pipeline {
  readonly name = 'road_condition';
  readonly schedule = '0 0 1 * *'; // monthly

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();

    const allRecords: RawRecord[] = [];

    for (const res of RESOURCES) {
      const sqlQuery = `SELECT * FROM "${res.id}"`;
      try {
        for await (const batch of client.datastoreSQLPaginated(sqlQuery, 32000)) {
          allRecords.push(...batch.map((r) => ({ ...r, _surveyYear: res.surveyYear })));
        }
      } catch (err) {
        console.warn(
          `[road_condition] Resource ${res.id} (${res.surveyYear}) failed: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const segmentId = String(r.ID_TRC ?? r.id_trc ?? '').trim();
      const surveyYear = (r as RawRecord & { _surveyYear?: number })._surveyYear;
      const dateStr = parseDate(r.DateReleve ?? r.date_releve ?? r.date);
      const boroughCode = (r.Arrondissement ?? r.arrondissement)
        ? findBoroughCode(String(r.Arrondissement ?? r.arrondissement))
        : null;

      return {
        segmentId: segmentId || `unknown-${Math.random().toString(36).slice(2)}`,
        streetName: String(r.Rue ?? r.rue ?? '').trim() || null,
        boroughCode,
        surveyDate: dateStr,
        pciScore: safeNum(r.Indice_PCI ?? r.indice_pci),
        pciState: (r.Etat_PCI ?? r.etat_pci) ? String(r.Etat_PCI ?? r.etat_pci).trim() : null,
        iriScore: safeNum(r.Indice_IRI ?? r.indice_iri),
        iriState: (r.Etat_IRI ?? r.etat_iri) ? String(r.Etat_IRI ?? r.etat_iri).trim() : null,
        lengthM: safeNum(r.Longueur ?? r.longueur),
        surveyYear,
        rawData: r as Record<string, unknown>,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = `${r.segmentId}|${r.surveyYear}`;
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
        segmentId: r.segmentId as string,
        streetName: (r.streetName as string | null) ?? null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        surveyDate: r.surveyDate ? (r.surveyDate as string).slice(0, 10) : null,
        pciScore: r.pciScore != null ? String(r.pciScore) : null,
        pciState: (r.pciState as string | null) ?? null,
        iriScore: r.iriScore != null ? String(r.iriScore) : null,
        iriState: (r.iriState as string | null) ?? null,
        lengthM: r.lengthM != null ? String(r.lengthM) : null,
        rawData: (r.rawData as object) ?? null,
      }));

      await db.insert(roadConditions).values(values).onConflictDoNothing();
      inserted += values.length;
    }

    return { inserted, updated: 0 };
  }
}
