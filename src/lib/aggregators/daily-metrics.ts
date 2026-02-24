import { db } from '@/lib/db';
import { dailyMetrics, crimeIncidents, travaux, requests311 } from '@/lib/db/schema';
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
  results.push(await aggregateTravaux(targetDate));
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

// ─── Travaux (Info-Travaux construction) ────────────────────────────────────

async function aggregateTravaux(targetDate: string): Promise<AggregationResult> {
  let metricsGenerated = 0;

  const active = await db
    .select({
      boroughCode: travaux.boroughCode,
      count: sql<number>`count(*)::int`,
    })
    .from(travaux)
    .where(
      and(
        sql`(${travaux.startDate} IS NULL OR ${travaux.startDate}::date <= ${targetDate}::date)`,
        sql`(${travaux.endDate} IS NULL OR ${travaux.endDate}::date >= ${targetDate}::date)`,
      ),
    )
    .groupBy(travaux.boroughCode);

  let cityTotal = 0;
  for (const row of active) {
    cityTotal += row.count;
    if (row.boroughCode) {
      await upsertMetric(targetDate, row.boroughCode, 'construction', 'active_travaux', row.count);
      metricsGenerated++;
    }
  }

  await upsertMetric(targetDate, CITY_CODE, 'construction', 'active_travaux', cityTotal);
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
