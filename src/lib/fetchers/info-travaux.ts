import { parse } from 'csv-parse/sync';
import { BaseFetcher } from './base-fetcher';
import { db } from '@/lib/db';
import { roadObstructions } from '@/lib/db/schema';
import { DONNEES_BASE } from '@/lib/constants/data-sources';
import { findBoroughCode } from '@/lib/constants/boroughs';
import { sql, notInArray } from 'drizzle-orm';

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
    // Get the current CSV download URL from the CKAN package metadata
    const packageUrl = `${DONNEES_BASE}/package_show?id=info-travaux`;
    const response = await globalThis.fetch(packageUrl);

    if (!response.ok) {
      throw new Error(`CKAN package_show error: ${response.status}`);
    }

    const pkg = await response.json();
    const csvResource = pkg.result.resources.find(
      (r: { format: string; name: string }) =>
        r.format === 'CSV' && r.name.includes('Entraves et travaux en cours'),
    );

    if (!csvResource?.url) {
      throw new Error('Could not find entraves CSV resource in package metadata');
    }

    console.log(`[info_travaux] Downloading CSV from ${csvResource.url}`);
    const csvResponse = await globalThis.fetch(csvResource.url);

    if (!csvResponse.ok) {
      throw new Error(`CSV download error: ${csvResponse.status}`);
    }

    return csvResponse.text();
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
      sourceId: r.id || r.permit_permit_id || null,
      startTime: r.duration_start_date || null,
      endTime: r.duration_end_date || null,
      street: r.occupancy_name || null,
      boroughCode: findBoroughCode(r.boroughid),
      obstructionType: r.permitcategory || null,
      subtype: r.reason_category || null,
      status: r.currentstatus || null,
      lat: r.latitude && r.latitude !== '' ? r.latitude : null,
      lng: r.longitude && r.longitude !== '' ? r.longitude : null,
      isActive: true, // All records in the feed are currently active
    }));
  }

  protected async save(records: Record<string, unknown>[]): Promise<number> {
    if (records.length === 0) return 0;

    // Filter out records without a sourceId
    const validRecords = records.filter((r) => r.sourceId);

    // Batch upsert in chunks (small batches for Neon free tier compatibility)
    const BATCH_SIZE = 50;
    let totalSaved = 0;

    for (let i = 0; i < validRecords.length; i += BATCH_SIZE) {
      const batch = validRecords.slice(i, i + BATCH_SIZE);

      await db
        .insert(roadObstructions)
        .values(
          batch.map((r) => ({
            sourceId: r.sourceId as string,
            startTime: r.startTime ? new Date(r.startTime as string) : null,
            endTime: r.endTime ? new Date(r.endTime as string) : null,
            street: r.street as string | null,
            boroughCode: r.boroughCode as string | null,
            obstructionType: r.obstructionType as string | null,
            subtype: r.subtype as string | null,
            status: r.status as string | null,
            lat: r.lat as string | null,
            lng: r.lng as string | null,
            isActive: true,
          })),
        )
        .onConflictDoUpdate({
          target: roadObstructions.sourceId,
          set: {
            startTime: sql`excluded.start_time`,
            endTime: sql`excluded.end_time`,
            street: sql`excluded.street`,
            boroughCode: sql`excluded.borough_code`,
            obstructionType: sql`excluded.obstruction_type`,
            subtype: sql`excluded.subtype`,
            status: sql`excluded.status`,
            lat: sql`excluded.lat`,
            lng: sql`excluded.lng`,
            isActive: sql`true`,
            updatedAt: sql`now()`,
          },
        });

      totalSaved += batch.length;
    }

    // Mark obstructions that are no longer in the feed as inactive
    const activeIds = validRecords.map((r) => r.sourceId as string);
    if (activeIds.length > 0) {
      await db
        .update(roadObstructions)
        .set({ isActive: false, updatedAt: new Date() })
        .where(notInArray(roadObstructions.sourceId, activeIds));
    }

    return totalSaved;
  }
}
