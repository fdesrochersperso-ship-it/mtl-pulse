import { BaseFetcher } from './base-fetcher';
import { db } from '@/lib/db';
import { requests311 } from '@/lib/db/schema';
import { DATA_SOURCES, CKAN_REQUEST_DELAY } from '@/lib/constants/data-sources';
import { findBoroughCode } from '@/lib/constants/boroughs';
import { sql } from 'drizzle-orm';

const DONNEES_SQL_BASE = 'https://donnees.montreal.ca/api/3/action/datastore_search_sql';
const PAGE_SIZE = 1000;

interface Request311Record {
  _id: number;
  ID_UNIQUE: string | null;
  NATURE: string | null;
  ACTI_NOM: string | null;
  ARRONDISSEMENT: string | null;
  ARRONDISSEMENT_GEO: string | null;
  DDS_DATE_CREATION: string | null;
  DERNIER_STATUT: string | null;
  DATE_DERNIER_STATUT: string | null;
  LOC_LONG: string | null;
  LOC_LAT: string | null;
}

export class Requests311Fetcher extends BaseFetcher {
  readonly sourceKey = 'requests_311';
  readonly description = '311 service requests from citizens';

  private readonly resourceId = DATA_SOURCES.REQUESTS_311.resourceId;

  protected async fetch(): Promise<Request311Record[]> {
    // Always use incremental approach — the full dataset is 2.7M records
    // Fetch last 90 days on first run, last 7 days on subsequent runs
    const lastSnapshot = await this.getLastSnapshot();
    const daysBack = lastSnapshot?.status === 'success' ? 7 : 90;

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - daysBack);
    const sinceDateStr = sinceDate.toISOString().slice(0, 10);

    console.log(`[requests_311] Fetching records since ${sinceDateStr} (${daysBack} days back)...`);

    const allRecords: Request311Record[] = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const sqlQuery = `SELECT * FROM "${this.resourceId}" WHERE "DDS_DATE_CREATION" >= '${sinceDateStr}' ORDER BY "DDS_DATE_CREATION" DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
      const url = `${DONNEES_SQL_BASE}?sql=${encodeURIComponent(sqlQuery)}`;

      const response = await globalThis.fetch(url);

      if (!response.ok) {
        throw new Error(`CKAN SQL API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(`CKAN SQL API error: ${JSON.stringify(data.error)}`);
      }

      const records = data.result.records as Request311Record[];
      allRecords.push(...records);

      console.log(`[requests_311] Fetched ${allRecords.length} records (offset=${offset})...`);

      hasMore = records.length === PAGE_SIZE;
      offset += PAGE_SIZE;

      if (hasMore) {
        await this.sleep(CKAN_REQUEST_DELAY);
      }
    }

    return allRecords;
  }

  protected async parse(raw: unknown): Promise<Record<string, unknown>[]> {
    const records = raw as Request311Record[];

    return records
      .filter((r) => r.DDS_DATE_CREATION) // Skip records with no creation date
      .map((r) => ({
        requestId: r.ID_UNIQUE || String(r._id),
        nature: r.NATURE || null,
        requestType: r.ACTI_NOM || null,
        boroughCode: findBoroughCode(r.ARRONDISSEMENT_GEO || r.ARRONDISSEMENT),
        status: r.DERNIER_STATUT || null,
        createdAt: r.DDS_DATE_CREATION ? new Date(r.DDS_DATE_CREATION) : new Date(),
        closedAt: r.DERNIER_STATUT === 'Fermé' && r.DATE_DERNIER_STATUT
          ? new Date(r.DATE_DERNIER_STATUT)
          : null,
        lat: r.LOC_LAT && r.LOC_LAT !== '' ? r.LOC_LAT : null,
        lng: r.LOC_LONG && r.LOC_LONG !== '' ? r.LOC_LONG : null,
      }));
  }

  protected async save(records: Record<string, unknown>[]): Promise<number> {
    if (records.length === 0) return 0;

    const BATCH_SIZE = 50;
    let totalSaved = 0;

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);

      await db
        .insert(requests311)
        .values(
          batch.map((r) => ({
            requestId: r.requestId as string,
            nature: r.nature as string | null,
            requestType: r.requestType as string | null,
            boroughCode: r.boroughCode as string | null,
            status: r.status as string | null,
            createdAt: r.createdAt as Date,
            closedAt: r.closedAt as Date | null,
            lat: r.lat as string | null,
            lng: r.lng as string | null,
          })),
        )
        .onConflictDoUpdate({
          target: requests311.requestId,
          set: {
            nature: sql`excluded.nature`,
            requestType: sql`excluded.request_type`,
            boroughCode: sql`excluded.borough_code`,
            status: sql`excluded.status`,
            closedAt: sql`excluded.closed_at`,
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
