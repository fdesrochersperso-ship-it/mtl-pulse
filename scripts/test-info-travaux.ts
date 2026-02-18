import 'dotenv/config';
import { parse } from 'csv-parse/sync';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/lib/db/schema';
import { sql } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

const BOROUGHS: Record<string, string> = {
  'Ahuntsic-Cartierville': 'AHU', 'Anjou': 'ANJ',
  'Côte-des-Neiges–Notre-Dame-de-Grâce': 'CDN',
  "L'Île-Bizard–Sainte-Geneviève": 'IBI', 'Lachine': 'LAC',
  'LaSalle': 'LSL', 'Le Plateau-Mont-Royal': 'PLA', 'Le Sud-Ouest': 'LSO',
  'Mercier–Hochelaga-Maisonneuve': 'MHM', 'Montréal-Nord': 'MTN',
  'Outremont': 'OUT', 'Pierrefonds-Roxboro': 'PFD',
  'Rivière-des-Prairies–Pointe-aux-Trembles': 'RPP',
  'Rosemont–La Petite-Patrie': 'RDP', 'Saint-Laurent': 'SLR',
  'Saint-Léonard': 'SLE', 'Verdun': 'VER',
  'Villeray–Saint-Michel–Parc-Extension': 'VSP', 'Ville-Marie': 'VMA',
};

function findCode(name: string | null): string | null {
  if (!name || name.trim() === '') return null;
  const t = name.trim();
  if (BOROUGHS[t]) return BOROUGHS[t];
  const lower = t.toLowerCase();
  for (const [k, v] of Object.entries(BOROUGHS)) {
    if (k.toLowerCase() === lower || k.toLowerCase().includes(lower) || lower.includes(k.toLowerCase())) return v;
  }
  return null;
}

function safeDate(val: string | null | undefined): Date | null {
  if (!val || val === '') return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

async function main() {
  console.log('=== Info-Travaux Fetcher Test ===\n');

  const pkgRes = await fetch('https://donnees.montreal.ca/api/3/action/package_show?id=info-travaux');
  const pkg = await pkgRes.json();
  const csvResource = pkg.result.resources.find(
    (r: any) => r.format === 'CSV' && r.name.includes('Entraves et travaux en cours'),
  );

  console.log(`[1] Downloading CSV...`);
  const csvRes = await fetch(csvResource.url);
  const csvText = await csvRes.text();
  console.log(`    ${(csvText.length / 1024).toFixed(0)} KB downloaded`);

  const records = parse(csvText, { columns: true, skip_empty_lines: true, relax_column_count: true });
  const validRecords = records.filter((r: any) => r.id);
  console.log(`[2] Parsed ${validRecords.length} valid records\n`);

  console.log('[3] Inserting one-at-a-time...');
  let saved = 0;
  let errors = 0;

  for (const r of validRecords as any[]) {
    try {
      await db
        .insert(schema.roadObstructions)
        .values({
          sourceId: r.id,
          startTime: safeDate(r.duration_start_date),
          endTime: safeDate(r.duration_end_date),
          street: r.occupancy_name || null,
          boroughCode: findCode(r.boroughid),
          obstructionType: r.permitcategory || null,
          subtype: r.reason_category || null,
          status: r.currentstatus || null,
          lat: r.latitude && r.latitude !== '' ? r.latitude : null,
          lng: r.longitude && r.longitude !== '' ? r.longitude : null,
          isActive: true,
        })
        .onConflictDoUpdate({
          target: schema.roadObstructions.sourceId,
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
      saved++;
    } catch (err: any) {
      errors++;
      if (errors <= 3) console.error(`  Error on ${r.id}: ${err.cause?.message || err.message?.slice(0, 100)}`);
    }
    if (saved % 200 === 0) console.log(`    ${saved} saved...`);
  }

  const count = await db.select({ count: sql<number>`count(*)::int` }).from(schema.roadObstructions);
  console.log(`\n[4] Saved: ${saved}, Errors: ${errors}`);
  console.log(`    Total road_obstructions in DB: ${count[0].count}`);

  await db.insert(schema.snapshots).values({ sourceKey: 'info_travaux', dataHash: 'test-run', recordCount: saved, status: 'success' });
  console.log('=== Done! ===');
  await pool.end();
}

main().catch(async (err) => { console.error('FATAL:', err.message?.slice(0, 200)); await pool.end(); process.exit(1); });
