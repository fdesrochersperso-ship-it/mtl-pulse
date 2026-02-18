import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as s from '../src/lib/db/schema';
import { sql, eq, and, desc } from 'drizzle-orm';

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema: s });

  const rows = await db
    .select()
    .from(s.dailyMetrics)
    .where(
      and(
        eq(s.dailyMetrics.boroughCode, 'MTL'),
        eq(s.dailyMetrics.metricKey, 'total_incidents'),
      ),
    )
    .orderBy(desc(s.dailyMetrics.date));

  console.log('City-wide crime totals by date:');
  for (const r of rows) {
    console.log(`  ${r.date} | ${r.metricValue} incidents`);
  }

  const totalRows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(s.dailyMetrics);
  console.log(`\nTotal rows in daily_metrics: ${totalRows[0].count}`);

  await pool.end();
}

main();
