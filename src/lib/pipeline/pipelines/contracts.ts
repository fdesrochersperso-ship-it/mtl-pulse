/**
 * Contracts pipeline — Contrats Ville de Montréal.
 * Uses CKAN DataStore (contrats-conseil-municipal-et-conseil-d-agglomeration).
 * Resources: Conseil municipal + Conseil d'agglomération.
 * Fetch: DataStore SQL. Backfill 5 years.
 */

import { db } from '@/lib/db';
import { contracts, pipelineRuns } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { and, eq, sql } from 'drizzle-orm';

const CONTRACT_RESOURCES: { id: string; awardingBody: string }[] = [
  { id: '1e5ab066-f560-4b4f-8f12-991de39df134', awardingBody: 'Conseil municipal' },
  { id: '7cf955d0-a3e6-4e94-8c24-9b0a4f7c0408', awardingBody: 'Conseil d\'agglomération' },
];

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

export class ContractsPipeline implements Pipeline {
  readonly name = 'contracts';
  readonly schedule = '0 0 * * 1'; // weekly Monday

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

    let sinceDate: string;
    if (lastRun.length === 0) {
      sinceDate = FIVE_YEARS_AGO.toISOString().slice(0, 10);
      console.log(
        `Fetching ${this.name}: backfill since ${sinceDate} (no previous successful run)...`,
      );
    } else {
      const lastCompleted = lastRun[0]!.completedAt;
      sinceDate = lastCompleted
        ? (() => {
            const d = new Date(lastCompleted);
            d.setDate(d.getDate() - 90);
            return d.toISOString().slice(0, 10);
          })()
        : FIVE_YEARS_AGO.toISOString().slice(0, 10);
      console.log(`Fetching ${this.name}: records since ${sinceDate}...`);
    }

    const allRecords: RawRecord[] = [];

    for (const res of CONTRACT_RESOURCES) {
      const dateField = '"DATE SIGNATURE"';
      const baseSql = `SELECT * FROM "${res.id}" WHERE ${dateField} >= '${sinceDate}'`;
      try {
        for await (const batch of client.datastoreSQLPaginated(baseSql, 32000)) {
          allRecords.push(
            ...batch.map((r) => ({ ...r, _awardingBody: res.awardingBody })),
          );
        }
      } catch (err) {
        console.warn(
          `[contracts] Resource ${res.id} failed: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }

    console.log(`Fetching ${this.name}: ${allRecords.length} records`);
    return allRecords;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const awardingBody = (r as RawRecord & { _awardingBody?: string })._awardingBody;
      const noDossier = r['NO DE DOSSIER'] ?? r.no_dossier ?? r.id;
      const externalId = `${awardingBody}|${noDossier}`;

      const dateStr = parseDate(r['DATE SIGNATURE'] ?? r.date_signature ?? r.date);
      const supplier = r.FOURNISSEUR ?? r.fournisseur ?? r.supplier;
      const objet = r.OBJET ?? r.objet ?? r.title;
      const montant = safeNum(r.MONTANT ?? r.montant ?? r.amount);
      const service = r.SERVICE ?? r.service;
      const direction = r.DIRECTION ?? r.direction;

      let boroughCode: string | null = null;
      const arr = r.ARRONDISSEMENT ?? r.arrondissement ?? r.borough ?? r.Repartition;
      if (arr) boroughCode = findBoroughCode(String(arr));

      return {
        externalId,
        contractType: (r['TYPE CONTRAT'] ?? r.type ?? r.contract_type)
          ? String(r['TYPE CONTRAT'] ?? r.type ?? r.contract_type).trim()
          : null,
        title: objet ? String(objet).trim() : null,
        supplierName: supplier ? String(supplier).trim() : null,
        amount: montant,
        awardDate: dateStr,
        boroughCode,
        sector: service ?? direction ? String(service ?? direction).trim() : null,
        awardingBody: awardingBody ?? null,
        rawData: r as Record<string, unknown>,
      };
    });
  }

  deduplicate(records: NormalizedRecord[]): NormalizedRecord[] {
    const seen = new Set<string>();
    return records.filter((r) => {
      const id = r.externalId as string;
      if (seen.has(id)) return false;
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
        contractType: (r.contractType as string | null) ?? null,
        title: (r.title as string | null) ?? null,
        supplierName: (r.supplierName as string | null) ?? null,
        amount: r.amount != null ? String(r.amount) : null,
        awardDate: r.awardDate ? (r.awardDate as string).slice(0, 10) : null,
        boroughCode: (r.boroughCode as string | null) ?? null,
        sector: (r.sector as string | null) ?? null,
        awardingBody: (r.awardingBody as string | null) ?? null,
        rawData: (r.rawData as object) ?? null,
      }));

      const result = await db
        .insert(contracts)
        .values(values)
        .onConflictDoUpdate({
          target: contracts.externalId,
          set: {
            contractType: sql`excluded.contract_type`,
            title: sql`excluded.title`,
            supplierName: sql`excluded.supplier_name`,
            amount: sql`excluded.amount`,
            awardDate: sql`excluded.award_date`,
            boroughCode: sql`excluded.borough_code`,
            sector: sql`excluded.sector`,
            awardingBody: sql`excluded.awarding_body`,
            rawData: sql`excluded.raw_data`,
          },
        });
      inserted += values.length;
    }

    return { inserted, updated };
  }
}
