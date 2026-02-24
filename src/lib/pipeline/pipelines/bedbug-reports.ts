/**
 * Bedbug reports pipeline — déclarations d'exterminations de punaises de lit.
 * Dataset: declarations-exterminations-punaises-de-lit
 * Fetch: CSV via package_show + download. Reports by borough since 2011.
 * Schedule: monthly (data updates quarterly).
 */

import { parse } from 'csv-parse/sync';
import { db } from '@/lib/db';
import { bedbugReports } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';
import { sql } from 'drizzle-orm';

const PACKAGE_ID = 'declarations-exterminations-punaises-de-lit';

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

export class BedbugReportsPipeline implements Pipeline {
  readonly name = 'bedbug_reports';
  readonly schedule = '0 0 1 * *'; // monthly, 1st of month

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();
    const packageResult = await client.packageShow(PACKAGE_ID);

    const csvResource = packageResult.result.resources.find(
      (r) => r.format?.toUpperCase() === 'CSV' && r.name?.toLowerCase().includes('déclarations'),
    );

    if (!csvResource?.url) {
      throw new Error('Could not find CSV resource in declarations-exterminations-punaises-de-lit package');
    }

    console.log(`Fetching ${this.name}: ${csvResource.name}...`);
    const buffer = await client.downloadResource(csvResource.url);
    const records = parse(buffer.toString('utf-8'), {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      relax_quotes: true,
    }) as RawRecord[];

    console.log(`Fetching ${this.name}: ${records.length} records...`);
    return records;
  }

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    const result: NormalizedRecord[] = [];
    for (const r of raw) {
      const externalId = String(r.NO_DECLARATION ?? r.no_declaration ?? r._id ?? '').trim();
      if (!externalId) continue;

      const reportDate = parseDate(r.DATE_DECLARATION ?? r.date_declaration);
      const boroughCode = findBoroughCode(
        (r.NOM_ARROND ?? r.nom_arrond ?? r.arrondissement ?? r.ARRONDISSEMENT) as string,
      );

      const lat = safeNum(r.LATITUDE ?? r.latitude);
      const lng = safeNum(r.LONGITUDE ?? r.longitude);
      const numExterminations = safeNum(r.NBR_EXTERMIN ?? r.nbr_extermin);

      result.push({
        externalId,
        reportDate,
        boroughCode,
        numExterminations,
        lat: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lat : null,
        lng: lat != null && lng != null && (lat !== 0 || lng !== 0) ? lng : null,
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

    const BATCH = 200;
    let inserted = 0;

    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);

      await db
        .insert(bedbugReports)
        .values(
          batch.map((r) => ({
            externalId: r.externalId as string,
            reportDate: (r.reportDate as string | null) ?? null,
            boroughCode: (r.boroughCode as string | null) ?? null,
            numExterminations: (r.numExterminations as number | null) ?? null,
            lat: (r.lat != null ? String(r.lat) : null) as string | null,
            lng: (r.lng != null ? String(r.lng) : null) as string | null,
            rawData: (r.rawData as object) ?? null,
          })),
        )
        .onConflictDoUpdate({
          target: bedbugReports.externalId,
          set: {
            reportDate: sql`excluded.report_date`,
            boroughCode: sql`excluded.borough_code`,
            numExterminations: sql`excluded.num_exterminations`,
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
