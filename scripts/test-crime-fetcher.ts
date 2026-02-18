import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/lib/db/schema';
import { sql } from 'drizzle-orm';

// We can't use @/ aliases in scripts, so set up DB directly
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

const RESOURCE_ID = 'c6f482bf-bf0f-4960-8b2f-9982c211addd';
const API_BASE = 'https://donnees.montreal.ca/api/3/action/datastore_search';
const PAGE_SIZE = 1000;
const DELAY_MS = 500;

const PDQ_TO_BOROUGH: Record<number, string> = {
  10: 'VMA', 12: 'VMA', 20: 'LSO', 21: 'LSO', 22: 'VER',
  23: 'LSL', 24: 'LAC', 26: 'CDN', 11: 'CDN', 27: 'PLA',
  31: 'OUT', 33: 'VSP', 35: 'VSP', 30: 'AHU', 38: 'MTN',
  39: 'RDP', 44: 'MHM', 46: 'MHM', 48: 'RPP', 49: 'RPP',
  42: 'ANJ', 43: 'SLE', 45: 'SLR', 5: 'IBI', 4: 'PFD',
  7: 'PFD', 9: 'PFD',
};

async function main() {
  console.log('=== MTL Pulse: Crime Fetcher Test ===');
  console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);

  // Step 1: Test CKAN API connectivity
  console.log('\n[1] Testing CKAN API...');
  const testUrl = `${API_BASE}?resource_id=${RESOURCE_ID}&limit=2`;
  const testRes = await fetch(testUrl);
  if (!testRes.ok) {
    throw new Error(`CKAN API returned ${testRes.status}: ${testRes.statusText}`);
  }
  const testData = await testRes.json();
  console.log(`    API works! Total records in dataset: ${testData.result.total}`);
  console.log(`    Sample record:`, JSON.stringify(testData.result.records[0], null, 2));

  // Step 2: Fetch last 30 days of data (manageable size for testing)
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 30);
  const sinceDateStr = sinceDate.toISOString().slice(0, 10);
  console.log(`\n[2] Fetching crime data since ${sinceDateStr}...`);

  const allRecords: Record<string, unknown>[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const url = `${API_BASE}?resource_id=${RESOURCE_ID}&limit=${PAGE_SIZE}&offset=${offset}&filters={"DATE":["${sinceDateStr}"]}`;
    // Use the SQL endpoint for date range filtering instead
    const sqlUrl = `https://donnees.montreal.ca/api/3/action/datastore_search_sql?sql=${encodeURIComponent(
      `SELECT * FROM "${RESOURCE_ID}" WHERE "DATE" >= '${sinceDateStr}' ORDER BY "DATE" DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`
    )}`;

    const res = await fetch(sqlUrl);
    if (!res.ok) {
      throw new Error(`CKAN SQL API returned ${res.status}`);
    }
    const data = await res.json();

    if (!data.success) {
      console.error('CKAN error:', data.error);
      throw new Error('CKAN SQL API returned success=false');
    }

    const records = data.result.records;
    allRecords.push(...records);
    console.log(`    Fetched ${allRecords.length} records so far (page offset=${offset})...`);

    hasMore = records.length === PAGE_SIZE;
    offset += PAGE_SIZE;

    if (hasMore) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log(`\n[3] Total records fetched: ${allRecords.length}`);

  if (allRecords.length === 0) {
    console.log('    No records found for the date range. This might be normal if data is delayed.');
    await pool.end();
    return;
  }

  // Step 3: Parse and insert into DB
  console.log('\n[4] Inserting into database...');
  const BATCH_SIZE = 500;
  let totalSaved = 0;

  for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
    const batch = allRecords.slice(i, i + BATCH_SIZE);

    const values = batch.map((r: any) => ({
      externalId: String(r._id),
      category: r.CATEGORIE ?? 'Unknown',
      incidentDate: r.DATE,
      shift: r.QUART ?? null,
      pdq: r.PDQ ? Number(r.PDQ) : null,
      boroughCode: r.PDQ ? (PDQ_TO_BOROUGH[Number(r.PDQ)] ?? null) : null,
      lat: r.LATITUDE ? String(r.LATITUDE) : null,
      lng: r.LONGITUDE ? String(r.LONGITUDE) : null,
    }));

    await db
      .insert(schema.crimeIncidents)
      .values(values)
      .onConflictDoUpdate({
        target: schema.crimeIncidents.externalId,
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
    console.log(`    Saved ${totalSaved}/${allRecords.length}...`);
  }

  // Step 4: Verify
  console.log('\n[5] Verifying...');
  const count = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.crimeIncidents);
  console.log(`    Total records in crime_incidents table: ${count[0].count}`);

  // Log to snapshots
  await db.insert(schema.snapshots).values({
    sourceKey: 'crime',
    dataHash: 'test-run',
    recordCount: totalSaved,
    status: 'success',
  });
  console.log('    Snapshot logged.');

  console.log('\n=== Done! ===');
  await pool.end();
}

main().catch(async (err) => {
  console.error('\nFATAL ERROR:', err);
  await pool.end();
  process.exit(1);
});
