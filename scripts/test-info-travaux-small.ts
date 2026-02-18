import 'dotenv/config';
import { parse } from 'csv-parse/sync';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/lib/db/schema';
import { sql } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

function safeDate(val: string | null | undefined): Date | null {
  if (!val || val === '') return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

async function main() {
  // Download and parse
  const pkgRes = await fetch('https://donnees.montreal.ca/api/3/action/package_show?id=info-travaux');
  const pkg = await pkgRes.json();
  const csvResource = pkg.result.resources.find(
    (r: any) => r.format === 'CSV' && r.name.includes('Entraves et travaux en cours'),
  );
  const csvRes = await fetch(csvResource.url);
  const csvText = await csvRes.text();
  const records = parse(csvText, { columns: true, skip_empty_lines: true, relax_column_count: true });
  console.log(`Parsed ${records.length} records`);

  // Try inserting just 3 records to see the error
  const first3 = records.slice(0, 3).filter((r: any) => r.id);
  console.log('First record keys:', Object.keys(first3[0]).join(', '));
  console.log('First record sample:', {
    id: first3[0].id,
    boroughid: first3[0].boroughid,
    start: first3[0].duration_start_date,
    end: first3[0].duration_end_date,
    street: first3[0].occupancy_name,
  });

  try {
    for (const r of first3) {
      await db
        .insert(schema.roadObstructions)
        .values({
          sourceId: r.id,
          startTime: safeDate(r.duration_start_date),
          endTime: safeDate(r.duration_end_date),
          street: r.occupancy_name || null,
          boroughCode: null,
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
            status: sql`excluded.status`,
            updatedAt: sql`now()`,
          },
        });
      console.log(`  Inserted ${r.id}`);
    }
    console.log('SUCCESS!');
  } catch (err: any) {
    console.error('ERROR:', err.message);
  }

  await pool.end();
}

main();
