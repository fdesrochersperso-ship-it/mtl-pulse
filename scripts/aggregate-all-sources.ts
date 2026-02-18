import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as s from '../src/lib/db/schema';
import { sql, eq, and } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: s });

async function main() {
  console.log('=== Aggregating all sources ===\n');

  // Get distinct dates from all sources
  const crimeDates = await db.selectDistinct({ date: s.crimeIncidents.incidentDate }).from(s.crimeIncidents);
  const requestDates = await db.selectDistinct({ date: sql<string>`${s.requests311.createdAt}::date` }).from(s.requests311);

  const allDates = new Set([
    ...crimeDates.map((d) => d.date),
    ...requestDates.map((d) => d.date),
  ]);
  const sortedDates = [...allDates].sort();
  console.log(`Found ${sortedDates.length} distinct dates across all sources`);

  for (const date of sortedDates) {
    // Crime
    const crimeByBorough = await db.select({ boroughCode: s.crimeIncidents.boroughCode, count: sql<number>`count(*)::int` }).from(s.crimeIncidents).where(eq(s.crimeIncidents.incidentDate, date)).groupBy(s.crimeIncidents.boroughCode);
    let crimeTotal = 0;
    for (const row of crimeByBorough) {
      crimeTotal += row.count;
      if (row.boroughCode) {
        await upsert(date, row.boroughCode, 'crime', 'total_incidents', row.count);
      }
    }
    await upsert(date, 'MTL', 'crime', 'total_incidents', crimeTotal);

    // 311
    const r311ByBorough = await db.select({ boroughCode: s.requests311.boroughCode, count: sql<number>`count(*)::int` }).from(s.requests311).where(sql`${s.requests311.createdAt}::date = ${date}::date`).groupBy(s.requests311.boroughCode);
    let r311Total = 0;
    for (const row of r311ByBorough) {
      r311Total += row.count;
      if (row.boroughCode) {
        await upsert(date, row.boroughCode, 'requests_311', 'new_requests', row.count);
      }
    }
    await upsert(date, 'MTL', 'requests_311', 'new_requests', r311Total);

    // Road obstructions (active on this date)
    const obsActive = await db.select({ boroughCode: s.roadObstructions.boroughCode, count: sql<number>`count(*)::int` }).from(s.roadObstructions).where(and(sql`${s.roadObstructions.startTime}::date <= ${date}::date`, sql`(${s.roadObstructions.endTime} IS NULL OR ${s.roadObstructions.endTime}::date >= ${date}::date)`)).groupBy(s.roadObstructions.boroughCode);
    let obsTotal = 0;
    for (const row of obsActive) {
      obsTotal += row.count;
      if (row.boroughCode) {
        await upsert(date, row.boroughCode, 'construction', 'active_obstructions', row.count);
      }
    }
    await upsert(date, 'MTL', 'construction', 'active_obstructions', obsTotal);

    const anyData = crimeTotal > 0 || r311Total > 0 || obsTotal > 0;
    if (anyData) {
      console.log(`  ${date}: crime=${crimeTotal}, 311=${r311Total}, obstructions=${obsTotal}`);
    }
  }

  const total = await db.select({ count: sql<number>`count(*)::int` }).from(s.dailyMetrics);
  console.log(`\nTotal daily_metrics rows: ${total[0].count}`);
  console.log('=== Done! ===');
  await pool.end();
}

async function upsert(date: string, boroughCode: string, category: string, metricKey: string, value: number) {
  await db.insert(s.dailyMetrics).values({ date, boroughCode, category, metricKey, metricValue: String(value) }).onConflictDoUpdate({
    target: [s.dailyMetrics.date, s.dailyMetrics.boroughCode, s.dailyMetrics.category, s.dailyMetrics.metricKey],
    set: { metricValue: String(value), updatedAt: sql`now()` },
  });
}

main();
