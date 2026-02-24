/**
 * Elected officials pipeline — listes des élus de la Ville de Montréal.
 * Dataset: listes-des-elus-de-la-ville-de-montreal
 * Fetch: CSV via package_show + download. Full replace on each run.
 * Schedule: monthly (updates after elections).
 */

import { parse } from 'csv-parse/sync';
import { db } from '@/lib/db';
import { electedOfficials } from '@/lib/db/schema';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { findBoroughCode } from '@/lib/constants/boroughs';
import type { Pipeline, RawRecord, NormalizedRecord, StoreResult } from '../types';

const PACKAGE_ID = 'listes-des-elus-de-la-ville-de-montreal';

function trim(val: unknown): string {
  if (val == null) return '';
  return String(val).trim();
}

export class ElectedOfficialsPipeline implements Pipeline {
  readonly name = 'elected_officials';
  readonly schedule = '0 0 1 * *'; // monthly, 1st of month

  async fetch(): Promise<RawRecord[]> {
    const client = new CKANClient();
    const packageResult = await client.packageShow(PACKAGE_ID);

    const csvResources = packageResult.result.resources
      .filter((r) => r.format?.toUpperCase() === 'CSV')
      .sort((a, b) => {
        const aName = a.name ?? '';
        const bName = b.name ?? '';
        return bName.localeCompare(aName);
      });

    const csvResource = csvResources[0];
    if (!csvResource?.url) {
      throw new Error('Could not find CSV resource in listes-des-elus-de-la-ville-de-montreal package');
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
      const prenom = trim(r.Prénom ?? r.prenom ?? r.Prenom ?? '');
      const nom = trim(r.Nom ?? r.nom ?? '');
      const name = [prenom, nom].filter(Boolean).join(' ').trim();
      if (!name) continue;

      const boroughCode = findBoroughCode(
        (r.Arrondissement ?? r.arrondissement ?? r.NOM_ARROND) as string,
      );

      const functionType = trim(
        r['Poste électif'] ?? r.Poste_electif ?? r.Rôles ?? r.Roles ?? r.fonction ?? '',
      ) || null;

      const party = trim(r['Nom du parti'] ?? r.Nom_du_parti ?? r.party ?? '') || null;

      const externalId = `${name}|${boroughCode ?? 'city'}|${functionType ?? ''}|${party ?? ''}`;

      result.push({
        externalId,
        name,
        functionType,
        boroughCode,
        party,
        mandateStart: null,
        mandateEnd: null,
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
    if (records.length === 0) {
      await db.delete(electedOfficials);
      return { inserted: 0, updated: 0 };
    }

    await db.delete(electedOfficials);

    const BATCH = 100;
    let inserted = 0;

    for (let i = 0; i < records.length; i += BATCH) {
      const batch = records.slice(i, i + BATCH);

      await db.insert(electedOfficials).values(
        batch.map((r) => ({
          name: r.name as string,
          functionType: (r.functionType as string | null) ?? null,
          boroughCode: (r.boroughCode as string | null) ?? null,
          party: (r.party as string | null) ?? null,
          mandateStart: (r.mandateStart as string | null) ?? null,
          mandateEnd: (r.mandateEnd as string | null) ?? null,
        })),
      );

      inserted += batch.length;
    }

    return { inserted, updated: 0 };
  }
}
