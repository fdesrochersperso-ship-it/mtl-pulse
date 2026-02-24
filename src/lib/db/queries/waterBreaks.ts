/**
 * Data access layer for water main breaks (Réparations réseau eau potable).
 * Breaks since 1972, aging pipe heatmap, borough comparison.
 */

import { db } from '@/lib/db';
import { waterBreaks } from '@/lib/db/schema';
import { eq, gte, lte, and, sql, desc } from 'drizzle-orm';

export type WaterBreakRow = {
  id: number;
  breakDate: string;
  boroughCode: string | null;
  streetName: string | null;
  breakType: string | null;
  pipeMaterial: string | null;
  pipeDiameter: number | null;
  lat: number | null;
  lng: number | null;
};

export type WaterBreakByBorough = {
  boroughCode: string;
  count: number;
  ytdCount: number;
};

/** Breaks YTD */
export async function getWaterBreaksYtd(boroughCode?: string | null): Promise<number> {
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const conds = [gte(waterBreaks.breakDate, yearStart)];
  if (boroughCode) {
    conds.push(eq(waterBreaks.boroughCode, boroughCode));
  }
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(waterBreaks)
    .where(and(...conds));
  return Number(row?.count ?? 0);
}

/** Breaks by borough for comparison */
export async function getWaterBreaksByBorough(
  startDate: string,
  endDate: string
): Promise<WaterBreakByBorough[]> {
  const result = await db.execute(sql.raw(`
    SELECT
      borough_code AS borough_code,
      COUNT(*)::int AS cnt,
      SUM(CASE WHEN break_date >= '${new Date().getFullYear()}-01-01' THEN 1 ELSE 0 END)::int AS ytd
    FROM water_breaks
    WHERE break_date >= '${startDate}' AND break_date <= '${endDate}'
      AND borough_code IS NOT NULL
    GROUP BY borough_code
    ORDER BY cnt DESC
  `));

  const rows = (result.rows || []) as {
    borough_code: string;
    cnt: number;
    ytd: number;
  }[];

  return rows.map((r) => ({
    boroughCode: r.borough_code,
    count: Number(r.cnt),
    ytdCount: Number(r.ytd ?? 0),
  }));
}

/** Time series of breaks (by year since 1972) */
export type WaterBreakTimeSeriesPoint = {
  period: string;
  count: number;
  previousYearCount?: number;
};

export async function getWaterBreaksTimeSeries(
  startDate: string,
  endDate: string,
  granularity: 'yearly' | 'monthly'
): Promise<WaterBreakTimeSeriesPoint[]> {
  const dateTrunc = granularity === 'yearly' ? 'year' : 'month';

  const result = await db.execute(sql.raw(`
    SELECT
      date_trunc('${dateTrunc}', break_date)::date AS period,
      COUNT(*)::int AS cnt
    FROM water_breaks
    WHERE break_date >= '${startDate}' AND break_date <= '${endDate}'
    GROUP BY date_trunc('${dateTrunc}', break_date)
    ORDER BY period
  `));

  const rows = (result.rows || []) as { period: Date | string; cnt: number }[];
  const points = rows.map((r) => ({
    period:
      typeof r.period === 'string'
        ? r.period.slice(0, 10)
        : (r.period as Date).toISOString().slice(0, 10),
    count: Number(r.cnt),
  }));

  return points;
}

/** Breaks for map (heatmap) */
export async function getWaterBreaksForMap(
  filters: {
    startDate?: string;
    endDate?: string;
    boroughCode?: string | null;
  },
  limit = 1000
): Promise<{
  id: number;
  breakDate: string;
  boroughCode: string | null;
  streetName: string | null;
  breakType: string | null;
  lat: number | null;
  lng: number | null;
}[]> {
  const conds = [sql`${waterBreaks.lat} IS NOT NULL`, sql`${waterBreaks.lng} IS NOT NULL`];
  if (filters.startDate) conds.push(gte(waterBreaks.breakDate, filters.startDate));
  if (filters.endDate) conds.push(lte(waterBreaks.breakDate, filters.endDate));
  if (filters.boroughCode) conds.push(eq(waterBreaks.boroughCode, filters.boroughCode));

  const rows = await db
    .select({
      id: waterBreaks.id,
      breakDate: waterBreaks.breakDate,
      boroughCode: waterBreaks.boroughCode,
      streetName: waterBreaks.streetName,
      breakType: waterBreaks.breakType,
      lat: waterBreaks.lat,
      lng: waterBreaks.lng,
    })
    .from(waterBreaks)
    .where(and(...conds))
    .orderBy(desc(waterBreaks.breakDate))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    breakDate: String(r.breakDate).slice(0, 10),
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}
