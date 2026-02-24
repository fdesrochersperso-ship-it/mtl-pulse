import { BaseFetcher } from './base-fetcher';
import { db } from '@/lib/db';
import { crimeIncidents } from '@/lib/db/schema';
import { DATA_SOURCES, CKAN_PAGE_SIZE, CKAN_REQUEST_DELAY } from '@/lib/constants/data-sources';
import { PDQ_TO_BOROUGH } from '@/lib/constants/boroughs';
import { CKANClient } from '@/lib/api-clients/ckan-client';
import { sql } from 'drizzle-orm';

interface CrimeRecord {
  _id: number;
  CATEGORIE: string;
  DATE: string;
  QUART: string;
  PDQ: number;
  X: string;
  Y: string;
  LONGITUDE: string;
  LATITUDE: string;
}

export class CrimeFetcher extends BaseFetcher {
  readonly sourceKey = 'crime';
  readonly description = 'Criminal acts reported to SPVM';

  private readonly resourceId = DATA_SOURCES.CRIME.resourceId;

  protected async fetch(): Promise<CrimeRecord[]> {
    const client = new CKANClient();
    const allRecords: CrimeRecord[] = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const result = await client.datastoreSearch(this.resourceId, {
        limit: CKAN_PAGE_SIZE,
        offset,
      });

      const records = result.result.records as unknown as CrimeRecord[];
      allRecords.push(...records);

      hasMore = records.length === CKAN_PAGE_SIZE;
      offset += CKAN_PAGE_SIZE;

      if (hasMore) {
        await this.sleep(CKAN_REQUEST_DELAY);
      }

      console.log(`[crime] Fetched ${allRecords.length}/${result.result.total} records...`);
    }

    return allRecords;
  }

  protected async parse(raw: unknown): Promise<Record<string, unknown>[]> {
    const records = raw as CrimeRecord[];

    return records.map((r) => ({
      externalId: String(r._id),
      category: r.CATEGORIE ?? 'Unknown',
      incidentDate: r.DATE,
      shift: r.QUART ?? null,
      pdq: r.PDQ ? Number(r.PDQ) : null,
      boroughCode: r.PDQ ? (PDQ_TO_BOROUGH[Number(r.PDQ)] ?? null) : null,
      lat: r.LATITUDE ? String(r.LATITUDE) : null,
      lng: r.LONGITUDE ? String(r.LONGITUDE) : null,
    }));
  }

  protected async save(records: Record<string, unknown>[]): Promise<number> {
    if (records.length === 0) return 0;

    // Batch upsert in chunks (small for Neon free tier compatibility)
    const BATCH_SIZE = 50;
    let totalSaved = 0;

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);

      await db
        .insert(crimeIncidents)
        .values(
          batch.map((r) => ({
            externalId: r.externalId as string,
            category: r.category as string,
            incidentDate: r.incidentDate as string,
            shift: r.shift as string | null,
            pdq: r.pdq as number | null,
            boroughCode: r.boroughCode as string | null,
            lat: r.lat as string | null,
            lng: r.lng as string | null,
          })),
        )
        .onConflictDoUpdate({
          target: crimeIncidents.externalId,
          set: {
            category: sql`excluded.category`,
            incidentDate: sql`excluded.incident_date`,
            shift: sql`excluded.shift`,
            pdq: sql`excluded.pdq`,
            boroughCode: sql`excluded.borough_code`,
            lat: sql`excluded.lat`,
            lng: sql`excluded.lng`,
            updatedAt: sql`now()`,
          },
        });

      totalSaved += batch.length;
    }

    return totalSaved;
  }
}
