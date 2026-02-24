/**
 * Data access layer for pothole repairs (nids-de-poule).
 * Caveat: SIRR network only — excludes borough manual repairs.
 * Repairs by borough/date, seasonal pattern (spring peak), hotspot map.
 */

import { db } from '@/lib/db';
import { potholeRepairs } from '@/lib/db/schema';
import {
  eq,
  and,
  gte,
  lte,
  sql,
  desc,
  count,
  isNotNull,
} from 'drizzle-orm';

export type PotholeRow = {
  id: number;
  repairDate: string | null;
  vehicleId: string | null;
  boroughCode: string | null;
  lat: number | null;
  lng: number | null;
};

export type PotholeByBoroughRow = {
  boroughCode: string;
  count: number;
};

export type PotholeTimeSeriesPoint = {
  period: string;
  count: number;
  previousYearCount?: number;
};

export type PotholeStats = {
  ytdCount: number;
  thisMonthCount: number;
  peakMonth: string | null;
};

const latExpr = sql<string | null>`(${potholeRepairs.lat})::numeric`;
const lngExpr = sql<string | null>`(${potholeRepairs.lng})::numeric`;

/** Repairs by borough and date range */
export async function getPotholesByBorough(
  startDate: string,
  endDate: string
): Promise<PotholeByBoroughRow[]> {
  const result = await db
    .select({
      boroughCode: potholeRepairs.boroughCode,
      count: count(),
    })
    .from(potholeRepairs)
    .where(
      and(
        gte(potholeRepairs.repairDate, startDate),
        lte(potholeRepairs.repairDate, endDate)
      )
    )
    .groupBy(potholeRepairs.boroughCode);

  const withBorough = result.filter(
    (r): r is typeof r & { boroughCode: string } => r.boroughCode != null
  );
  return withBorough
    .map((r) => ({ boroughCode: r.boroughCode, count: Number(r.count) }))
    .sort((a, b) => b.count - a.count);
}

/** Seasonal pattern: repairs by month (spring peak) */
export async function getPotholesTimeSeries(
  startDate: string,
  endDate: string,
  granularity: 'weekly' | 'monthly',
  includePreviousYear = true
): Promise<PotholeTimeSeriesPoint[]> {
  const dateTrunc = granularity === 'weekly' ? 'week' : 'month';

  const result = await db.execute(
    sql.raw(
      `SELECT date_trunc('${dateTrunc}', repair_date)::date AS period,
        COUNT(*)::int AS cnt
      FROM pothole_repairs
      WHERE repair_date >= '${startDate}' AND repair_date <= '${endDate}'
      GROUP BY date_trunc('${dateTrunc}', repair_date)
      ORDER BY period`
    )
  );

  const rows = (result.rows || []) as { period: Date | string; cnt: number }[];
  const points = rows.map((r) => ({
    period: typeof r.period === 'string' ? r.period : r.period.toISOString().slice(0, 10),
    count: Number(r.cnt),
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

  const prevResult = await db.execute(
    sql.raw(
      `SELECT date_trunc('${dateTrunc}', repair_date)::date AS period,
        COUNT(*)::int AS cnt
      FROM pothole_repairs
      WHERE repair_date >= '${prevStart}' AND repair_date <= '${prevEnd}'
      GROUP BY date_trunc('${dateTrunc}', repair_date)
      ORDER BY period`
    )
  );

  const prevRows = (prevResult.rows || []) as { period: Date | string; cnt: number }[];
  const prevMap = new Map(
    prevRows.map((r) => [
      typeof r.period === 'string' ? r.period : r.period.toISOString().slice(0, 10),
      Number(r.cnt),
    ])
  );

  return points.map((p) => {
    const prevYearPeriod = p.period.replace(
      /^(\d{4})/,
      (_, y) => String(parseInt(y, 10) - 1)
    );
    return {
      ...p,
      previousYearCount: prevMap.get(prevYearPeriod) ?? undefined,
    };
  });
}

/** Key stats */
export async function getPotholesStats(): Promise<PotholeStats> {
  const today = new Date();
  const yearStart = `${today.getFullYear()}-01-01`;
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .slice(0, 10);

  const [ytdRes, monthRes, peakRes] = await Promise.all([
    db
      .select({ count: count() })
      .from(potholeRepairs)
      .where(gte(potholeRepairs.repairDate, yearStart)),
    db
      .select({ count: count() })
      .from(potholeRepairs)
      .where(gte(potholeRepairs.repairDate, monthStart)),
    db.execute(
      sql.raw(
        `SELECT to_char(repair_date, 'YYYY-MM') AS peak_month
        FROM pothole_repairs
        WHERE repair_date >= '${yearStart}'
        GROUP BY to_char(repair_date, 'YYYY-MM')
        ORDER BY COUNT(*) DESC
        LIMIT 1`
      )
    ),
  ]);

  const peakRow = (peakRes.rows || [])[0] as { peak_month: string } | undefined;

  return {
    ytdCount: Number(ytdRes[0]?.count ?? 0),
    thisMonthCount: Number(monthRes[0]?.count ?? 0),
    peakMonth: peakRow?.peak_month ?? null,
  };
}

/** Potholes for map (hotspot) */
export async function getPotholesForMap(
  filters: {
    startDate?: string;
    endDate?: string;
    boroughCode?: string | null;
  },
  limit = 500
): Promise<
  {
    id: number;
    repairDate: string | null;
    boroughCode: string | null;
    lat: number | null;
    lng: number | null;
  }[]
> {
  const conds = [
    isNotNull(potholeRepairs.lat),
    isNotNull(potholeRepairs.lng),
  ];
  if (filters.startDate) {
    conds.push(gte(potholeRepairs.repairDate, filters.startDate));
  }
  if (filters.endDate) {
    conds.push(lte(potholeRepairs.repairDate, filters.endDate));
  }
  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(potholeRepairs.boroughCode, filters.boroughCode));
  }

  const rows = await db
    .select({
      id: potholeRepairs.id,
      repairDate: potholeRepairs.repairDate,
      boroughCode: potholeRepairs.boroughCode,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(potholeRepairs)
    .where(and(...conds))
    .orderBy(desc(potholeRepairs.repairDate))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    repairDate: r.repairDate != null ? String(r.repairDate).slice(0, 10) : null,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}
