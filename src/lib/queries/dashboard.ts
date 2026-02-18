import { db } from '@/lib/db';
import { dailyMetrics } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { CITY_CODE } from '@/lib/constants/boroughs';

export interface DashboardMetric {
  category: string;
  metricKey: string;
  value: number;
  previousValue: number | null;
}

/** Find the most recent date that has aggregated metrics */
export async function getLatestDateWithData(): Promise<string | null> {
  try {
    const result = await db
      .select({ date: dailyMetrics.date })
      .from(dailyMetrics)
      .where(eq(dailyMetrics.boroughCode, CITY_CODE))
      .orderBy(desc(dailyMetrics.date))
      .limit(1);

    return result[0]?.date ?? null;
  } catch {
    return null;
  }
}

/** Get city-wide metrics for a date, with previous day comparison */
export async function getDashboardMetrics(date: string): Promise<DashboardMetric[]> {
  try {
    // Get metrics for this date
    const todayRows = await db
      .select()
      .from(dailyMetrics)
      .where(
        and(
          eq(dailyMetrics.date, date),
          eq(dailyMetrics.boroughCode, CITY_CODE),
          eq(dailyMetrics.metricKey, 'total_incidents'),
        ),
      );

    // Find the previous date that has data
    const prevDateResult = await db
      .select({ date: dailyMetrics.date })
      .from(dailyMetrics)
      .where(
        and(
          eq(dailyMetrics.boroughCode, CITY_CODE),
          eq(dailyMetrics.metricKey, 'total_incidents'),
          sql`${dailyMetrics.date} < ${date}`,
        ),
      )
      .orderBy(desc(dailyMetrics.date))
      .limit(1);

    const prevDate = prevDateResult[0]?.date ?? null;

    let prevRows: typeof todayRows = [];
    if (prevDate) {
      prevRows = await db
        .select()
        .from(dailyMetrics)
        .where(
          and(
            eq(dailyMetrics.date, prevDate),
            eq(dailyMetrics.boroughCode, CITY_CODE),
            eq(dailyMetrics.metricKey, 'total_incidents'),
          ),
        );
    }

    // Build lookup for previous values
    const prevMap = new Map(
      prevRows.map((r) => [`${r.category}:${r.metricKey}`, Number(r.metricValue)]),
    );

    return todayRows.map((r) => ({
      category: r.category,
      metricKey: r.metricKey,
      value: Number(r.metricValue),
      previousValue: prevMap.get(`${r.category}:${r.metricKey}`) ?? null,
    }));
  } catch {
    return [];
  }
}

/** Get all city-wide metrics for a date (all keys, not just totals) */
export async function getAllMetricsForDate(date: string): Promise<DashboardMetric[]> {
  try {
    const rows = await db
      .select()
      .from(dailyMetrics)
      .where(
        and(
          eq(dailyMetrics.date, date),
          eq(dailyMetrics.boroughCode, CITY_CODE),
        ),
      );

    return rows.map((r) => ({
      category: r.category,
      metricKey: r.metricKey,
      value: Number(r.metricValue),
      previousValue: null,
    }));
  } catch {
    return [];
  }
}
