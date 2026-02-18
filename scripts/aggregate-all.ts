import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as s from '../src/lib/db/schema';
import { sql, eq } from 'drizzle-orm';

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema: s });

  // Get all distinct dates with crime data
  const dates = await db
    .selectDistinct({ date: s.crimeIncidents.incidentDate })
    .from(s.crimeIncidents)
    .orderBy(s.crimeIncidents.incidentDate);

  console.log(`Found ${dates.length} dates with crime data`);

  for (const { date } of dates) {
    // Per borough
    const byBorough = await db
      .select({
        boroughCode: s.crimeIncidents.boroughCode,
        count: sql<number>`count(*)::int`,
      })
      .from(s.crimeIncidents)
      .where(eq(s.crimeIncidents.incidentDate, date))
      .groupBy(s.crimeIncidents.boroughCode);

    let total = 0;
    for (const row of byBorough) {
      total += row.count;
      if (row.boroughCode) {
        await db
          .insert(s.dailyMetrics)
          .values({ date, boroughCode: row.boroughCode, category: 'crime', metricKey: 'total_incidents', metricValue: String(row.count) })
          .onConflictDoUpdate({
            target: [s.dailyMetrics.date, s.dailyMetrics.boroughCode, s.dailyMetrics.category, s.dailyMetrics.metricKey],
            set: { metricValue: String(row.count), updatedAt: sql`now()` },
          });
      }
    }

    // City-wide
    await db
      .insert(s.dailyMetrics)
      .values({ date, boroughCode: 'MTL', category: 'crime', metricKey: 'total_incidents', metricValue: String(total) })
      .onConflictDoUpdate({
        target: [s.dailyMetrics.date, s.dailyMetrics.boroughCode, s.dailyMetrics.category, s.dailyMetrics.metricKey],
        set: { metricValue: String(total), updatedAt: sql`now()` },
      });

    // By category
    const byCat = await db
      .select({ category: s.crimeIncidents.category, count: sql<number>`count(*)::int` })
      .from(s.crimeIncidents)
      .where(eq(s.crimeIncidents.incidentDate, date))
      .groupBy(s.crimeIncidents.category);

    for (const row of byCat) {
      const key = `by_category_${row.category.toLowerCase().replace(/\s+/g, '_')}`;
      await db
        .insert(s.dailyMetrics)
        .values({ date, boroughCode: 'MTL', category: 'crime', metricKey: key, metricValue: String(row.count) })
        .onConflictDoUpdate({
          target: [s.dailyMetrics.date, s.dailyMetrics.boroughCode, s.dailyMetrics.category, s.dailyMetrics.metricKey],
          set: { metricValue: String(row.count), updatedAt: sql`now()` },
        });
    }

    console.log(`  ${date}: ${total} crimes`);
  }

  const totalRows = await db.select({ count: sql<number>`count(*)::int` }).from(s.dailyMetrics);
  console.log(`\nTotal daily_metrics rows: ${totalRows[0].count}`);
  await pool.end();
}

main();
