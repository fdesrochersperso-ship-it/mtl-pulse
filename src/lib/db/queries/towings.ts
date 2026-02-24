/**
 * Data access layer for snow towings (remorquages).
 * Caveat: Pre-Nov 2015 data has no GPS coordinates — exclude from map.
 * By borough/motive (déneigement, constat, événement), seasonal Nov–Mar pattern.
 */

import { db } from '@/lib/db';
import { snowTowings } from '@/lib/db/schema';
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

const GPS_CUTOFF = '2015-11-01';

export type TowingRow = {
  id: number;
  towingDate: Date;
  reason: string | null;
  boroughCode: string | null;
  sector: string | null;
  lat: number | null;
  lng: number | null;
};

export type TowingByBoroughRow = {
  boroughCode: string;
  count: number;
};

export type TowingByReasonRow = {
  reason: string;
  count: number;
};

export type TowingTimeSeriesPoint = {
  period: string;
  count: number;
  previousYearCount?: number;
};

export type TowingStats = {
  todayCount: number;
  seasonCount: number;
  topBorough: string | null;
  topReason: string | null;
};

const latExpr = sql<string | null>`(${snowTowings.lat})::numeric`;
const lngExpr = sql<string | null>`(${snowTowings.lng})::numeric`;

/** By borough */
export async function getTowingsByBorough(
  startDate: string,
  endDate: string
): Promise<TowingByBoroughRow[]> {
  const result = await db
    .select({
      boroughCode: snowTowings.boroughCode,
      count: count(),
    })
    .from(snowTowings)
    .where(
      and(
        gte(snowTowings.towingDate, new Date(startDate)),
        lte(snowTowings.towingDate, new Date(endDate + 'T23:59:59'))
      )
    )
    .groupBy(snowTowings.boroughCode);

  const withBorough = result.filter(
    (r): r is typeof r & { boroughCode: string } => r.boroughCode != null
  );
  return withBorough
    .map((r) => ({ boroughCode: r.boroughCode, count: Number(r.count) }))
    .sort((a, b) => b.count - a.count);
}

/** By motive */
export async function getTowingsByReason(
  startDate: string,
  endDate: string,
  boroughCode?: string | null
): Promise<TowingByReasonRow[]> {
  const conds = [
    gte(snowTowings.towingDate, new Date(startDate)),
    lte(snowTowings.towingDate, new Date(endDate + 'T23:59:59')),
    isNotNull(snowTowings.reason),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(snowTowings.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      reason: snowTowings.reason,
      count: count(),
    })
    .from(snowTowings)
    .where(and(...conds))
    .groupBy(snowTowings.reason)
    .orderBy(sql`count(*) DESC`);

  return result.map((r) => ({
    reason: r.reason!,
    count: Number(r.count),
  }));
}

/** Seasonal time series */
export async function getTowingsTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly',
  includePreviousYear = true
): Promise<TowingTimeSeriesPoint[]> {
  const dateTrunc =
    granularity === 'daily' ? 'day' : granularity === 'weekly' ? 'week' : 'month';
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `SELECT date_trunc('${dateTrunc}', towing_date)::date AS period,
        COUNT(*)::int AS cnt
      FROM snow_towings
      WHERE towing_date >= '${startDate}' AND towing_date <= '${endDate}T23:59:59' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', towing_date)
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
      `SELECT date_trunc('${dateTrunc}', towing_date)::date AS period,
        COUNT(*)::int AS cnt
      FROM snow_towings
      WHERE towing_date >= '${prevStart}' AND towing_date <= '${prevEnd}T23:59:59' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', towing_date)
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
export async function getTowingsStats(
  boroughCode?: string | null
): Promise<TowingStats> {
  const now = new Date();
  const seasonStart = new Date(now.getFullYear(), 10, 1);
  if (now < seasonStart) {
    seasonStart.setFullYear(seasonStart.getFullYear() - 1);
  }
  const seasonEnd = new Date(seasonStart.getFullYear(), 2, 28);
  if (now > seasonEnd) {
    seasonEnd.setFullYear(seasonEnd.getFullYear() + 1);
  }
  const todayStr = now.toISOString().slice(0, 10);
  const seasonStartStr = seasonStart.toISOString().slice(0, 10);
  const seasonEndStr = seasonEnd.toISOString().slice(0, 10);

  const conds = [
    gte(snowTowings.towingDate, new Date(seasonStartStr)),
    lte(snowTowings.towingDate, new Date(seasonEndStr + 'T23:59:59')),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(snowTowings.boroughCode, boroughCode));
  }

  const [todayRes, seasonRes, boroughRes, reasonRes] = await Promise.all([
    db
      .select({ count: count() })
      .from(snowTowings)
      .where(
        boroughCode
          ? and(
              gte(snowTowings.towingDate, new Date(todayStr)),
              lte(snowTowings.towingDate, new Date(todayStr + 'T23:59:59')),
              eq(snowTowings.boroughCode, boroughCode)
            )
          : and(
              gte(snowTowings.towingDate, new Date(todayStr)),
              lte(snowTowings.towingDate, new Date(todayStr + 'T23:59:59'))
            )
      ),
    db.select({ count: count() }).from(snowTowings).where(and(...conds)),
    db
      .select({ boroughCode: snowTowings.boroughCode, count: count() })
      .from(snowTowings)
      .where(and(...conds))
      .groupBy(snowTowings.boroughCode)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
    db
      .select({ reason: snowTowings.reason, count: count() })
      .from(snowTowings)
      .where(and(...conds))
      .groupBy(snowTowings.reason)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
  ]);

  return {
    todayCount: Number(todayRes[0]?.count ?? 0),
    seasonCount: Number(seasonRes[0]?.count ?? 0),
    topBorough: boroughRes[0]?.boroughCode ?? null,
    topReason: reasonRes[0]?.reason ?? null,
  };
}

/** Towings for map — only records with GPS (post Nov 2015) */
export async function getTowingsForMap(
  filters: {
    boroughCode?: string | null;
    reason?: string | null;
    startDate?: string;
    endDate?: string;
  },
  limit = 500
): Promise<
  {
    id: number;
    towingDate: Date;
    reason: string | null;
    boroughCode: string | null;
    lat: number | null;
    lng: number | null;
  }[]
> {
  const conds = [
    isNotNull(snowTowings.lat),
    isNotNull(snowTowings.lng),
    gte(snowTowings.towingDate, new Date(GPS_CUTOFF)),
  ];
  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(snowTowings.boroughCode, filters.boroughCode));
  }
  if (filters.reason != null && filters.reason !== '') {
    conds.push(eq(snowTowings.reason, filters.reason));
  }
  if (filters.startDate) {
    conds.push(gte(snowTowings.towingDate, new Date(filters.startDate)));
  }
  if (filters.endDate) {
    conds.push(lte(snowTowings.towingDate, new Date(filters.endDate + 'T23:59:59')));
  }

  const rows = await db
    .select({
      id: snowTowings.id,
      towingDate: snowTowings.towingDate,
      reason: snowTowings.reason,
      boroughCode: snowTowings.boroughCode,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(snowTowings)
    .where(and(...conds))
    .orderBy(desc(snowTowings.towingDate))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}
