import { db } from '@/lib/db';
import { dailyMetrics, crimeIncidents, roadObstructions, requests311 } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { CITY_CODE } from '@/lib/constants/boroughs';

interface AggregationResult {
  category: string;
  metricsGenerated: number;
}

/**
 * Aggregate raw data into daily_metrics for a given date.
 * Idempotent — safe to re-run via upsert on unique constraint.
 */
export async function aggregateDailyMetrics(targetDate: string): Promise<AggregationResult[]> {
  const results: AggregationResult[] = [];

  results.push(await aggregateCrime(targetDate));
  results.push(await aggregateObstructions(targetDate));
  results.push(await aggregate311(targetDate));

  return results;
}

async function upsertMetric(
  date: string,
  boroughCode: string,
  category: string,
  metricKey: string,
  metricValue: number,
) {
  await db
    .insert(dailyMetrics)
    .values({
      date,
      boroughCode,
      category,
      metricKey,
      metricValue: String(metricValue),
    })
    .onConflictDoUpdate({
      target: [dailyMetrics.date, dailyMetrics.boroughCode, dailyMetrics.category, dailyMetrics.metricKey],
      set: {
        metricValue: String(metricValue),
        updatedAt: sql`now()`,
      },
    });
}

// ─── Crime ──────────────────────────────────────────────────────────────────

async function aggregateCrime(targetDate: string): Promise<AggregationResult> {
  let metricsGenerated = 0;

  // Total per borough
  const byBorough = await db
    .select({
      boroughCode: crimeIncidents.boroughCode,
      count: sql<number>`count(*)::int`,
    })
    .from(crimeIncidents)
    .where(eq(crimeIncidents.incidentDate, targetDate))
    .groupBy(crimeIncidents.boroughCode);

  let cityTotal = 0;
  for (const row of byBorough) {
    cityTotal += row.count;
    if (row.boroughCode) {
      await upsertMetric(targetDate, row.boroughCode, 'crime', 'total_incidents', row.count);
      metricsGenerated++;
    }
  }

  // City-wide total
  await upsertMetric(targetDate, CITY_CODE, 'crime', 'total_incidents', cityTotal);
  metricsGenerated++;

  // By category (city-wide)
  const byCategory = await db
    .select({
      category: crimeIncidents.category,
      count: sql<number>`count(*)::int`,
    })
    .from(crimeIncidents)
    .where(eq(crimeIncidents.incidentDate, targetDate))
    .groupBy(crimeIncidents.category);

  for (const row of byCategory) {
    const key = `by_category_${row.category.toLowerCase().replace(/\s+/g, '_')}`;
    await upsertMetric(targetDate, CITY_CODE, 'crime', key, row.count);
    metricsGenerated++;
  }

  return { category: 'crime', metricsGenerated };
}

// ─── Road Obstructions ──────────────────────────────────────────────────────

async function aggregateObstructions(targetDate: string): Promise<AggregationResult> {
  let metricsGenerated = 0;

  // Active obstructions on this date
  const active = await db
    .select({
      boroughCode: roadObstructions.boroughCode,
      count: sql<number>`count(*)::int`,
    })
    .from(roadObstructions)
    .where(
      and(
        eq(roadObstructions.isActive, true),
        sql`${roadObstructions.startTime}::date <= ${targetDate}::date`,
        sql`(${roadObstructions.endTime} IS NULL OR ${roadObstructions.endTime}::date >= ${targetDate}::date)`,
      ),
    )
    .groupBy(roadObstructions.boroughCode);

  let cityTotal = 0;
  for (const row of active) {
    cityTotal += row.count;
    if (row.boroughCode) {
      await upsertMetric(targetDate, row.boroughCode, 'construction', 'active_obstructions', row.count);
      metricsGenerated++;
    }
  }

  await upsertMetric(targetDate, CITY_CODE, 'construction', 'active_obstructions', cityTotal);
  metricsGenerated++;

  return { category: 'construction', metricsGenerated };
}

// ─── 311 Requests ───────────────────────────────────────────────────────────

async function aggregate311(targetDate: string): Promise<AggregationResult> {
  let metricsGenerated = 0;

  // New requests created on this date
  const byBorough = await db
    .select({
      boroughCode: requests311.boroughCode,
      count: sql<number>`count(*)::int`,
    })
    .from(requests311)
    .where(sql`${requests311.createdAt}::date = ${targetDate}::date`)
    .groupBy(requests311.boroughCode);

  let cityTotal = 0;
  for (const row of byBorough) {
    cityTotal += row.count;
    if (row.boroughCode) {
      await upsertMetric(targetDate, row.boroughCode, 'requests_311', 'new_requests', row.count);
      metricsGenerated++;
    }
  }

  await upsertMetric(targetDate, CITY_CODE, 'requests_311', 'new_requests', cityTotal);
  metricsGenerated++;

  return { category: 'requests_311', metricsGenerated };
}
