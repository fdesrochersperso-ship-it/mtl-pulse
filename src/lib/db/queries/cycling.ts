/**
 * Data access layer for cycling counts (Compteurs cyclistes).
 * Counter volumes by day/season, infrastructure map, BIXI availability.
 */

import { db } from '@/lib/db';
import { cyclingCounts } from '@/lib/db/schema';
import { eq, gte, lte, and, sql, desc } from 'drizzle-orm';
import { BOROUGHS } from '@/lib/constants/boroughs';

export type CyclingTimeSeriesPoint = {
  period: string;
  volume: number;
  counterCount: number;
  previousYearVolume?: number;
};

/** Daily/weekly/monthly volume aggregated across all counters */
export async function getCyclingTimeSeries(
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly',
  boroughCode?: string | null,
  includePreviousYear = true
): Promise<CyclingTimeSeriesPoint[]> {
  const dateTrunc = granularity === 'daily' ? 'day' : granularity === 'weekly' ? 'week' : 'month';

  const result = await db.execute(sql.raw(`
    SELECT
      date_trunc('${dateTrunc}', period_date)::date AS period,
      SUM(volume)::bigint AS vol,
      COUNT(DISTINCT counter_id)::int AS cnt
    FROM cycling_counts
    WHERE period_date >= '${startDate}' AND period_date <= '${endDate}'
    ${boroughCode ? `AND borough_code = '${boroughCode}'` : ''}
    GROUP BY date_trunc('${dateTrunc}', period_date)
    ORDER BY period
  `));

  const rows = (result.rows || []) as {
    period: Date | string;
    vol: string;
    cnt: number;
  }[];

  const points = rows.map((r) => ({
    period:
      typeof r.period === 'string'
        ? r.period.slice(0, 10)
        : (r.period as Date).toISOString().slice(0, 10),
    volume: Number(r.vol ?? 0),
    counterCount: Number(r.cnt ?? 0),
  }));

  if (!includePreviousYear) return points;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const prevStart = new Date(start.getFullYear() - 1, start.getMonth(), start.getDate())
    .toISOString()
    .slice(0, 10);
  const prevEnd = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate())
    .toISOString()
    .slice(0, 10);

  const prevResult = await db.execute(sql.raw(`
    SELECT
      date_trunc('${dateTrunc}', period_date)::date AS period,
      SUM(volume)::bigint AS vol
    FROM cycling_counts
    WHERE period_date >= '${prevStart}' AND period_date <= '${prevEnd}'
    ${boroughCode ? `AND borough_code = '${boroughCode}'` : ''}
    GROUP BY date_trunc('${dateTrunc}', period_date)
    ORDER BY period
  `));

  const prevRows = (prevResult.rows || []) as { period: Date | string; vol: string }[];
  const prevMap = new Map(
    prevRows.map((r) => {
      const p =
        typeof r.period === 'string'
          ? r.period.slice(0, 10)
          : (r.period as Date).toISOString().slice(0, 10);
      const prevYearP = p.replace(/^(\d{4})/, (_, y) => String(parseInt(y, 10) - 1));
      return [prevYearP, Number(r.vol ?? 0)];
    })
  );

  return points.map((p) => ({
    ...p,
    previousYearVolume: prevMap.get(p.period),
  }));
}

/** Today's total volume across all counters */
export async function getCyclingVolumeToday(boroughCode?: string | null): Promise<number> {
  const today = new Date().toISOString().slice(0, 10);
  const conds = [eq(cyclingCounts.periodDate, today)];
  if (boroughCode) {
    conds.push(eq(cyclingCounts.boroughCode, boroughCode));
  }

  const [row] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${cyclingCounts.volume}), 0)`,
    })
    .from(cyclingCounts)
    .where(and(...conds));

  return Number(row?.total ?? 0);
}

/** Volume by borough (for borough comparison) */
export type CyclingByBoroughRow = {
  boroughCode: string;
  volume: number;
  counterCount: number;
};

export async function getCyclingByBorough(
  startDate: string,
  endDate: string
): Promise<CyclingByBoroughRow[]> {
  const result = await db.execute(sql.raw(`
    SELECT
      borough_code AS borough_code,
      SUM(volume)::bigint AS vol,
      COUNT(DISTINCT counter_id)::int AS cnt
    FROM cycling_counts
    WHERE period_date >= '${startDate}' AND period_date <= '${endDate}'
      AND borough_code IS NOT NULL
    GROUP BY borough_code
    ORDER BY vol DESC
  `));

  const rows = (result.rows || []) as {
    borough_code: string;
    vol: string;
    cnt: number;
  }[];

  return rows.map((r) => ({
    boroughCode: r.borough_code,
    volume: Number(r.vol ?? 0),
    counterCount: Number(r.cnt ?? 0),
  }));
}

/** Counter locations for map */
export async function getCyclingCountersForMap(
  startDate?: string,
  endDate?: string
): Promise<{
  counterId: string;
  boroughCode: string | null;
  lat: number | null;
  lng: number | null;
  volume: number;
}[]> {
  const conds = [];
  if (startDate) conds.push(`period_date >= '${startDate}'`);
  if (endDate) conds.push(`period_date <= '${endDate}'`);
  const whereClause = conds.length > 0 ? `WHERE ${conds.join(' AND ')}` : '';

  const result = await db.execute(sql.raw(`
    SELECT
      counter_id,
      borough_code,
      (lat)::numeric AS lat,
      (lng)::numeric AS lng,
      SUM(volume)::bigint AS vol
    FROM cycling_counts
    ${whereClause}
    GROUP BY counter_id, borough_code, lat, lng
    HAVING COUNT(*) > 0
    ORDER BY vol DESC
    LIMIT 100
  `));

  const rows = (result.rows || []) as {
    counter_id: string;
    borough_code: string | null;
    lat: string | null;
    lng: string | null;
    vol: string;
  }[];

  return rows
    .filter((r) => r.lat != null && r.lng != null)
    .map((r) => ({
      counterId: r.counter_id,
      boroughCode: r.borough_code,
      lat: r.lat != null ? Number(r.lat) : null,
      lng: r.lng != null ? Number(r.lng) : null,
      volume: Number(r.vol ?? 0),
    }));
}
