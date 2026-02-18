import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/lib/db/schema';
import { sql } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

const RESOURCE_ID = '2cfa0e06-9be4-49a6-b7f1-ee9f2363a872';
const SQL_BASE = 'https://donnees.montreal.ca/api/3/action/datastore_search_sql';
const PAGE_SIZE = 1000;
const DELAY_MS = 500;

const BOROUGHS: Record<string, string> = {
  'Ahuntsic-Cartierville': 'AHU', 'Anjou': 'ANJ',
  'Côte-des-Neiges–Notre-Dame-de-Grâce': 'CDN', 'Côte-des-Neiges-Notre-Dame-de-Grâce': 'CDN',
  "L'Île-Bizard–Sainte-Geneviève": 'IBI', "L'Île-Bizard-Sainte-Geneviève": 'IBI',
  'Lachine': 'LAC', 'LaSalle': 'LSL', 'Le Plateau-Mont-Royal': 'PLA',
  'Le Sud-Ouest': 'LSO', 'Mercier–Hochelaga-Maisonneuve': 'MHM',
  'Mercier-Hochelaga-Maisonneuve': 'MHM', 'Montréal-Nord': 'MTN',
  'Outremont': 'OUT', 'Pierrefonds-Roxboro': 'PFD',
  'Rivière-des-Prairies–Pointe-aux-Trembles': 'RPP',
  'Rivière-des-Prairies-Pointe-aux-Trembles': 'RPP',
  'Rosemont–La Petite-Patrie': 'RDP', 'Rosemont-La Petite-Patrie': 'RDP',
  'Saint-Laurent': 'SLR', 'Saint-Léonard': 'SLE', 'Verdun': 'VER',
  'Villeray–Saint-Michel–Parc-Extension': 'VSP',
  'Villeray-Saint-Michel-Parc-Extension': 'VSP', 'Ville-Marie': 'VMA',
};

function findCode(name: string | null): string | null {
  if (!name || name.trim() === '') return null;
  const t = name.trim();
  if (BOROUGHS[t]) return BOROUGHS[t];
  const lower = t.toLowerCase();
  for (const [k, v] of Object.entries(BOROUGHS)) {
    if (k.toLowerCase() === lower) return v;
  }
  return null;
}

async function main() {
  console.log('=== 311 Requests Fetcher Test ===\n');

  // Fetch last 7 days only for test
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 7);
  const sinceDateStr = sinceDate.toISOString().slice(0, 10);
  console.log(`Fetching records since ${sinceDateStr}...`);

  const allRecords: any[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const sqlQuery = `SELECT * FROM "${RESOURCE_ID}" WHERE "DDS_DATE_CREATION" >= '${sinceDateStr}' ORDER BY "DDS_DATE_CREATION" DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
    const url = `${SQL_BASE}?sql=${encodeURIComponent(sqlQuery)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(`API error: ${JSON.stringify(data.error)}`);

    const records = data.result.records;
    allRecords.push(...records);
    console.log(`  Fetched ${allRecords.length} records (offset=${offset})`);

    hasMore = records.length === PAGE_SIZE;
    offset += PAGE_SIZE;
    if (hasMore) await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  console.log(`\nTotal fetched: ${allRecords.length}`);
  if (allRecords.length > 0) {
    console.log('Sample columns:', Object.keys(allRecords[0]).join(', '));
  }

  // Insert
  console.log('\nInserting...');
  let saved = 0;
  let errors = 0;

  for (const r of allRecords) {
    if (!r.DDS_DATE_CREATION) continue;
    try {
      await db
        .insert(schema.requests311)
        .values({
          requestId: r.ID_UNIQUE || String(r._id),
          nature: r.NATURE || null,
          requestType: r.ACTI_NOM || null,
          boroughCode: findCode(r.ARRONDISSEMENT_GEO || r.ARRONDISSEMENT),
          status: r.DERNIER_STATUT || null,
          createdAt: new Date(r.DDS_DATE_CREATION),
          closedAt: r.DERNIER_STATUT === 'Fermé' && r.DATE_DERNIER_STATUT ? new Date(r.DATE_DERNIER_STATUT) : null,
          lat: r.LOC_LAT && r.LOC_LAT !== '' ? r.LOC_LAT : null,
          lng: r.LOC_LONG && r.LOC_LONG !== '' ? r.LOC_LONG : null,
        })
        .onConflictDoUpdate({
          target: schema.requests311.requestId,
          set: {
            nature: sql`excluded.nature`,
            status: sql`excluded.status`,
            closedAt: sql`excluded.closed_at`,
            updatedAt: sql`now()`,
          },
        });
      saved++;
    } catch (err: any) {
      errors++;
      if (errors <= 3) console.error(`  Error: ${err.cause?.message || err.message?.slice(0, 100)}`);
    }
    if (saved % 500 === 0 && saved > 0) console.log(`  ${saved} saved...`);
  }

  const count = await db.select({ count: sql<number>`count(*)::int` }).from(schema.requests311);
  console.log(`\nSaved: ${saved}, Errors: ${errors}`);
  console.log(`Total requests_311 in DB: ${count[0].count}`);

  await db.insert(schema.snapshots).values({ sourceKey: 'requests_311', dataHash: 'test-run', recordCount: saved, status: 'success' });
  console.log('=== Done! ===');
  await pool.end();
}

main().catch(async (err) => { console.error('FATAL:', err.message?.slice(0, 300)); await pool.end(); process.exit(1); });
