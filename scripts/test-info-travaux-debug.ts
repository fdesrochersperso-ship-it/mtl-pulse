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
  const pkgRes = await fetch('https://donnees.montreal.ca/api/3/action/package_show?id=info-travaux');
  const pkg = await pkgRes.json();
  const csvResource = pkg.result.resources.find(
    (r: any) => r.format === 'CSV' && r.name.includes('Entraves et travaux en cours'),
  );
  const csvRes = await fetch(csvResource.url);
  const csvText = await csvRes.text();
  const records = parse(csvText, { columns: true, skip_empty_lines: true, relax_column_count: true });
  const valid = records.filter((r: any) => r.id);
  console.log(`${valid.length} valid records`);

  // Check for duplicate IDs
  const ids = valid.map((r: any) => r.id);
  const uniqueIds = new Set(ids);
  console.log(`Unique IDs: ${uniqueIds.size} (duplicates: ${ids.length - uniqueIds.size})`);

  // Try batch of 5 with error details
  const batch = valid.slice(3, 8); // skip the 3 we already inserted
  try {
    await db
      .insert(schema.roadObstructions)
      .values(
        batch.map((r: any) => ({
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
        })),
      )
      .onConflictDoUpdate({
        target: schema.roadObstructions.sourceId,
        set: {
          status: sql`excluded.status`,
          updatedAt: sql`now()`,
        },
      });
    console.log('Batch of 5 succeeded!');
  } catch (err: any) {
    console.error('ERROR type:', err.constructor.name);
    console.error('ERROR cause:', err.cause?.message || err.cause || 'no cause');
    console.error('ERROR code:', err.cause?.code || 'no code');
    console.error('ERROR detail:', err.cause?.detail || 'no detail');
  }

  await pool.end();
}

main();
