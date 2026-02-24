/**
 * Data access layer for bedbug reports (punaises de lit).
 * Reports by borough since 2011, trend, map.
 */

import { db } from '@/lib/db';
import { bedbugReports } from '@/lib/db/schema';
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

export type BedbugRow = {
  id: number;
  externalId: string | null;
  reportDate: string | null;
  boroughCode: string | null;
  numExterminations: number | null;
  lat: number | null;
  lng: number | null;
};

export type BedbugByBoroughRow = {
  boroughCode: string;
  count: number;
  numExterminations: number | null;
};

export type BedbugTimeSeriesPoint = {
  period: string;
  count: number;
  previousYearCount?: number;
};

export type BedbugStats = {
  totalReports: number;
  ytdCount: number;
  topBorough: string | null;
};

const latExpr = sql<string | null>`(${bedbugReports.lat})::numeric`;
const lngExpr = sql<string | null>`(${bedbugReports.lng})::numeric`;

/** Reports by borough */
export async function getBedbugsByBorough(
  startDate: string,
  endDate: string
): Promise<BedbugByBoroughRow[]> {
  const result = await db
    .select({
      boroughCode: bedbugReports.boroughCode,
      count: count(),
      numExterminations: sql<number>`COALESCE(SUM(${bedbugReports.numExterminations}), 0)`,
    })
    .from(bedbugReports)
    .where(
      and(
        gte(bedbugReports.reportDate, startDate),
        lte(bedbugReports.reportDate, endDate),
        isNotNull(bedbugReports.boroughCode)
      )
    )
    .groupBy(bedbugReports.boroughCode)
    .orderBy(sql`count(*) DESC`);

  return result.map((r) => ({
    boroughCode: r.boroughCode!,
    count: Number(r.count),
    numExterminations: Number(r.numExterminations),
  }));
}

/** Trend over time */
export async function getBedbugsTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'monthly' | 'yearly',
  includePreviousYear = true
): Promise<BedbugTimeSeriesPoint[]> {
  const dateTrunc = granularity === 'monthly' ? 'month' : 'year';
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `SELECT date_trunc('${dateTrunc}', report_date)::date AS period,
        COUNT(*)::int AS cnt
      FROM bedbug_reports
      WHERE report_date >= '${startDate}' AND report_date <= '${endDate}' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', report_date)
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
      `SELECT date_trunc('${dateTrunc}', report_date)::date AS period,
        COUNT(*)::int AS cnt
      FROM bedbug_reports
      WHERE report_date >= '${prevStart}' AND report_date <= '${prevEnd}' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', report_date)
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
export async function getBedbugsStats(
  boroughCode?: string | null
): Promise<BedbugStats> {
  const yearStart = `${new Date().getFullYear()}-01-01`;

  const conds = [gte(bedbugReports.reportDate, yearStart)];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(bedbugReports.boroughCode, boroughCode));
  }

  const [totalRes, ytdRes, boroughRes] = await Promise.all([
    db.select({ count: count() }).from(bedbugReports),
    db.select({ count: count() }).from(bedbugReports).where(and(...conds)),
    db
      .select({ boroughCode: bedbugReports.boroughCode, count: count() })
      .from(bedbugReports)
      .where(and(...conds))
      .groupBy(bedbugReports.boroughCode)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
  ]);

  return {
    totalReports: Number(totalRes[0]?.count ?? 0),
    ytdCount: Number(ytdRes[0]?.count ?? 0),
    topBorough: boroughRes[0]?.boroughCode ?? null,
  };
}

/** Bedbugs for map */
export async function getBedbugsForMap(
  filters: {
    boroughCode?: string | null;
    startDate?: string;
    endDate?: string;
  },
  limit = 500
): Promise<
  {
    id: number;
    externalId: string | null;
    reportDate: string | null;
    boroughCode: string | null;
    lat: number | null;
    lng: number | null;
  }[]
> {
  const conds = [
    isNotNull(bedbugReports.lat),
    isNotNull(bedbugReports.lng),
  ];
  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(bedbugReports.boroughCode, filters.boroughCode));
  }
  if (filters.startDate) {
    conds.push(gte(bedbugReports.reportDate, filters.startDate));
  }
  if (filters.endDate) {
    conds.push(lte(bedbugReports.reportDate, filters.endDate));
  }

  const rows = await db
    .select({
      id: bedbugReports.id,
      externalId: bedbugReports.externalId,
      reportDate: bedbugReports.reportDate,
      boroughCode: bedbugReports.boroughCode,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(bedbugReports)
    .where(and(...conds))
    .orderBy(desc(bedbugReports.reportDate))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    reportDate: r.reportDate != null ? String(r.reportDate).slice(0, 10) : null,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}
