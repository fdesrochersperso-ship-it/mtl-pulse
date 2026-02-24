/**
 * Data access layer for computed metrics.
 * Frontend should ONLY use these queries — never query raw tables for dashboard cards.
 */

import { db } from '@/lib/db';
import { computedMetrics } from '@/lib/db/schema';
import { eq, and, gte, desc, sql, isNull } from 'drizzle-orm';
import { subDays } from 'date-fns';

export interface ComputedMetricRow {
  metricName: string;
  boroughCode: string | null;
  periodType: string;
  periodDate: string;
  value: number;
  previousValue: number | null;
  metadata: Record<string, unknown> | null;
  computedAt: Date;
}

/** Get latest computed value for a metric, optionally filtered by borough */
export async function getMetric(
  name: string,
  boroughCode?: string | null,
): Promise<ComputedMetricRow | null> {
  const today = new Date().toISOString().slice(0, 10);
  const conds = [eq(computedMetrics.metricName, name)];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(computedMetrics.boroughCode, boroughCode));
  } else {
    conds.push(isNull(computedMetrics.boroughCode));
  }
  const [row] = await db
    .select()
    .from(computedMetrics)
    .where(and(...conds))
    .orderBy(desc(computedMetrics.periodDate))
    .limit(1);

  if (!row) return null;
  return {
    ...row,
    value: Number(row.value),
    previousValue: row.previousValue != null ? Number(row.previousValue) : null,
  } as ComputedMetricRow;
}

/** Get time series history for sparklines */
export async function getMetricHistory(
  name: string,
  boroughCode?: string | null,
  days: number = 30,
): Promise<{ periodDate: string; value: number }[]> {
  const since = subDays(new Date(), days).toISOString().slice(0, 10);
  const conds = [
    eq(computedMetrics.metricName, name),
    gte(computedMetrics.periodDate, since),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(computedMetrics.boroughCode, boroughCode));
  } else {
    conds.push(isNull(computedMetrics.boroughCode));
  }
  const rows = await db
    .select({
      periodDate: computedMetrics.periodDate,
      value: computedMetrics.value,
    })
    .from(computedMetrics)
    .where(and(...conds))
    .orderBy(computedMetrics.periodDate);

  return rows.map((r) => ({
    periodDate: r.periodDate,
    value: Number(r.value),
  }));
}

/** Get all current metrics for homepage cards, optionally filtered by borough */
export async function getAllCurrentMetrics(
  boroughCode?: string | null,
): Promise<ComputedMetricRow[]> {
  const today = new Date().toISOString().slice(0, 10);
  return getAllMetricsForDate(today, boroughCode);
}

/** Get all metrics for a specific date (for digest generation). Run metrics first for that date. */
export async function getAllMetricsForDate(
  dateStr: string,
  boroughCode?: string | null,
): Promise<ComputedMetricRow[]> {
  const conds = [
    eq(computedMetrics.periodType, 'current'),
    eq(computedMetrics.periodDate, dateStr),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(computedMetrics.boroughCode, boroughCode));
  } else {
    conds.push(isNull(computedMetrics.boroughCode));
  }
  const rows = await db
    .select()
    .from(computedMetrics)
    .where(and(...conds));

  return rows.map((r) => ({
    ...r,
    value: Number(r.value),
    previousValue: r.previousValue != null ? Number(r.previousValue) : null,
  })) as ComputedMetricRow[];
}

/** Get the most recent computedAt timestamp for data freshness indicator */
export async function getLastMetricsUpdate(): Promise<Date | null> {
  const [row] = await db
    .select({ computedAt: computedMetrics.computedAt })
    .from(computedMetrics)
    .orderBy(desc(computedMetrics.computedAt))
    .limit(1);
  return row?.computedAt ?? null;
}

/** Get all boroughs ranked by a given metric (city-wide row excluded) */
export async function getBoroughComparison(
  metricName: string,
  dateStr?: string,
): Promise<{ boroughCode: string; value: number; previousValue: number | null; rank: number }[]> {
  const targetDate = dateStr ?? new Date().toISOString().slice(0, 10);
  const rows = await db
    .select()
    .from(computedMetrics)
    .where(
      and(
        eq(computedMetrics.metricName, metricName),
        eq(computedMetrics.periodType, 'current'),
        eq(computedMetrics.periodDate, targetDate),
        sql`${computedMetrics.boroughCode} IS NOT NULL`,
      ),
    )
    .orderBy(desc(computedMetrics.value));

  return rows.map((r, i) => ({
    boroughCode: r.boroughCode!,
    value: Number(r.value),
    previousValue: r.previousValue != null ? Number(r.previousValue) : null,
    rank: i + 1,
  }));
}
