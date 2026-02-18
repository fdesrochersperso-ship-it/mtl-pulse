import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/lib/db/schema';
import { sql, eq, desc } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function main() {
  console.log('=== MTL Pulse: Aggregation Test ===\n');

  // Find the most recent date with crime data
  const latest = await db
    .select({ date: schema.crimeIncidents.incidentDate })
    .from(schema.crimeIncidents)
    .orderBy(desc(schema.crimeIncidents.incidentDate))
    .limit(1);

  if (latest.length === 0) {
    console.log('No crime data found. Run test-crime-fetcher.ts first.');
    await pool.end();
    return;
  }

  const targetDate = latest[0].date;
  console.log(`Most recent crime data date: ${targetDate}`);

  // Count crimes on that date
  const crimeCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.crimeIncidents)
    .where(eq(schema.crimeIncidents.incidentDate, targetDate));
  console.log(`Crime records on ${targetDate}: ${crimeCount[0].count}`);

  // Run aggregation (inline since we can't use @/ aliases)
  console.log(`\nAggregating metrics for ${targetDate}...`);

  // Crime: total per borough
  const byBorough = await db
    .select({
      boroughCode: schema.crimeIncidents.boroughCode,
      count: sql<number>`count(*)::int`,
    })
    .from(schema.crimeIncidents)
    .where(eq(schema.crimeIncidents.incidentDate, targetDate))
    .groupBy(schema.crimeIncidents.boroughCode);

  let cityTotal = 0;
  let metricsInserted = 0;

  for (const row of byBorough) {
    cityTotal += row.count;
    if (row.boroughCode) {
      await db
        .insert(schema.dailyMetrics)
        .values({
          date: targetDate,
          boroughCode: row.boroughCode,
          category: 'crime',
          metricKey: 'total_incidents',
          metricValue: String(row.count),
        })
        .onConflictDoUpdate({
          target: [schema.dailyMetrics.date, schema.dailyMetrics.boroughCode, schema.dailyMetrics.category, schema.dailyMetrics.metricKey],
          set: { metricValue: String(row.count), updatedAt: sql`now()` },
        });
      metricsInserted++;
      console.log(`  ${row.boroughCode}: ${row.count} incidents`);
    }
  }

  // City-wide total
  await db
    .insert(schema.dailyMetrics)
    .values({
      date: targetDate,
      boroughCode: 'MTL',
      category: 'crime',
      metricKey: 'total_incidents',
      metricValue: String(cityTotal),
    })
    .onConflictDoUpdate({
      target: [schema.dailyMetrics.date, schema.dailyMetrics.boroughCode, schema.dailyMetrics.category, schema.dailyMetrics.metricKey],
      set: { metricValue: String(cityTotal), updatedAt: sql`now()` },
    });
  metricsInserted++;

  // Crime by category
  const byCategory = await db
    .select({
      category: schema.crimeIncidents.category,
      count: sql<number>`count(*)::int`,
    })
    .from(schema.crimeIncidents)
    .where(eq(schema.crimeIncidents.incidentDate, targetDate))
    .groupBy(schema.crimeIncidents.category);

  for (const row of byCategory) {
    const key = `by_category_${row.category.toLowerCase().replace(/\s+/g, '_')}`;
    await db
      .insert(schema.dailyMetrics)
      .values({
        date: targetDate,
        boroughCode: 'MTL',
        category: 'crime',
        metricKey: key,
        metricValue: String(row.count),
      })
      .onConflictDoUpdate({
        target: [schema.dailyMetrics.date, schema.dailyMetrics.boroughCode, schema.dailyMetrics.category, schema.dailyMetrics.metricKey],
        set: { metricValue: String(row.count), updatedAt: sql`now()` },
      });
    metricsInserted++;
    console.log(`  Category "${row.category}": ${row.count}`);
  }

  console.log(`\nTotal: ${metricsInserted} metrics upserted for ${targetDate}`);
  console.log(`City-wide crime total: ${cityTotal}`);

  // Verify
  const metricCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.dailyMetrics);
  console.log(`\nTotal rows in daily_metrics table: ${metricCount[0].count}`);

  console.log('\n=== Done! ===');
  await pool.end();
}

main().catch(async (err) => {
  console.error('\nFATAL ERROR:', err);
  await pool.end();
  process.exit(1);
});
