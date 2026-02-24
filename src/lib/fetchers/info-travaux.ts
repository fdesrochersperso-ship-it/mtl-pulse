import { parse } from 'csv-parse/sync';
import { BaseFetcher } from './base-fetcher';
import { db } from '@/lib/db';
import { travaux } from '@/lib/db/schema';
import { findBoroughCode } from '@/lib/constants/boroughs';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { sql } from 'drizzle-orm';

interface InfoTravauxRecord {
  id: string;
  permit_permit_id: string;
  boroughid: string;
  permitcategory: string;
  currentstatus: string;
  duration_start_date: string;
  duration_end_date: string;
  occupancy_name: string;
  reason_category: string;
  submittercategory: string;
  organizationname: string;
  longitude: string;
  latitude: string;
}

export class InfoTravauxFetcher extends BaseFetcher {
  readonly sourceKey = 'info_travaux';
  readonly description = 'Road obstructions and construction work';

  protected async fetch(): Promise<string> {
    const client = new CKANClient();
    const packageResult = await client.packageShow('info-travaux');
    const csvResource = packageResult.result.resources.find(
      (r) =>
        r.format?.toUpperCase() === 'CSV' &&
        r.name.includes('Entraves et travaux en cours'),
    );

    if (!csvResource?.url) {
      throw new Error('Could not find entraves CSV resource in package metadata');
    }

    console.log(`[info_travaux] Downloading CSV from ${csvResource.url}`);
    const buffer = await client.downloadResource(csvResource.url);
    return buffer.toString('utf-8');
  }

  protected async parse(raw: unknown): Promise<Record<string, unknown>[]> {
    const csvText = raw as string;

    const records: InfoTravauxRecord[] = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
    });

    console.log(`[info_travaux] Parsed ${records.length} records from CSV`);

    return records.map((r) => ({
      externalId: r.permit_permit_id || r.id || null,
      boroughCode: findBoroughCode(r.boroughid),
      category: r.permitcategory || null,
      status: r.currentstatus || null,
      startDate: r.duration_start_date || null,
      endDate: r.duration_end_date || null,
      street: r.occupancy_name || null,
      organizationName: r.organizationname || null,
    }));
  }

  protected async save(records: Record<string, unknown>[]): Promise<number> {
    if (records.length === 0) return 0;

    const validRecords = records.filter((r) => r.externalId);
    const BATCH_SIZE = 50;
    let totalSaved = 0;

    for (let i = 0; i < validRecords.length; i += BATCH_SIZE) {
      const batch = validRecords.slice(i, i + BATCH_SIZE);

      await db
        .insert(travaux)
        .values(
          batch.map((r) => ({
            externalId: r.externalId as string,
            boroughCode: r.boroughCode as string | null,
            category: r.category as string | null,
            status: r.status as string | null,
            startDate: (r.startDate as string | null) ?? null,
            endDate: (r.endDate as string | null) ?? null,
            street: r.street as string | null,
            organizationName: r.organizationName as string | null,
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
            lastSeenAt: sql`now()`,
            updatedAt: sql`now()`,
          },
        });

      totalSaved += batch.length;
    }

    return totalSaved;
  }
}
