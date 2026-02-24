/**
 * Data access layer for construction/travaux (Info-Travaux).
 * Supports active sites, time series, borough breakdown, stats, and search.
 */

import { db } from '@/lib/db';
import { travaux } from '@/lib/db/schema';
import {
  eq,
  and,
  gte,
  lte,
  sql,
  desc,
  asc,
  or,
  isNull,
  count,
} from 'drizzle-orm';

export type TravauxRow = {
  id: number;
  externalId: string;
  boroughCode: string | null;
  category: string | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
  street: string | null;
  organizationName: string | null;
  lat: number | null;
  lng: number | null;
  firstSeenAt: Date;
  lastSeenAt: Date;
};

export type TravauxTimeSeriesPoint = {
  period: string;
  count: number;
  previousYearCount?: number;
};

export type TravauxByBoroughRow = {
  boroughCode: string;
  count: number;
  perCapita?: number;
};

export type TravauxStats = {
  activeCount: number;
  newToday: number;
  closingThisWeek: number;
  mostAffectedBorough: string | null;
  avgDurationDays: number | null;
  medianDurationDays: number | null;
  longRunnersCount: number;
};

export type TravauxSearchFilters = {
  boroughCode?: string | null;
  category?: string | null;
  status?: string | null;
};

export type TravauxSearchResult = {
  rows: TravauxRow[];
  total: number;
  page: number;
  pageSize: number;
};

const today = () => new Date().toISOString().slice(0, 10);

/** Active = end_date is null or >= today */
function activeCondition() {
  return or(
    isNull(travaux.endDate),
    gte(travaux.endDate, today())
  )!;
}

/** Extract lat/lng from rawData JSONB */
const latExpr = sql<string | null>`(${travaux.rawData}->>'latitude')::numeric`;
const lngExpr = sql<string | null>`(${travaux.rawData}->>'longitude')::numeric`;

/** Get active construction sites, optionally filtered by borough */
export async function getActiveTravaux(
  boroughCode?: string | null,
  limit = 100,
  offset = 0
): Promise<TravauxRow[]> {
  const conds = [activeCondition()];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(travaux.boroughCode, boroughCode));
  }

  const rows = await db
    .select({
      id: travaux.id,
      externalId: travaux.externalId,
      boroughCode: travaux.boroughCode,
      category: travaux.category,
      status: travaux.status,
      startDate: travaux.startDate,
      endDate: travaux.endDate,
      street: travaux.street,
      organizationName: travaux.organizationName,
      lat: latExpr,
      lng: lngExpr,
      firstSeenAt: travaux.firstSeenAt,
      lastSeenAt: travaux.lastSeenAt,
    })
    .from(travaux)
    .where(and(...conds))
    .orderBy(desc(travaux.startDate))
    .limit(limit)
    .offset(offset);

  return rows.map(toTravauxRow);
}

/** Get time series of active construction count over time */
export async function getTravauxTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly',
  includePreviousYear = true
): Promise<TravauxTimeSeriesPoint[]> {
  const intervalStr =
    granularity === 'daily' ? "'1 day'::interval" : granularity === 'weekly' ? "'1 week'::interval" : "'1 month'::interval";
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND t.borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `WITH periods AS (
        SELECT d::date as period
        FROM generate_series('${startDate}'::date, '${endDate}'::date, ${intervalStr}) d
      ),
      active_per_period AS (
        SELECT p.period, COUNT(t.id)::int as cnt
        FROM periods p
        LEFT JOIN travaux t ON t.start_date <= p.period
          AND (t.end_date IS NULL OR t.end_date >= p.period)
          ${boroughFilter}
        GROUP BY p.period
      )
      SELECT to_char(period, 'YYYY-MM-DD') as period, cnt as count
      FROM active_per_period
      ORDER BY period`
    )
  );

  const rows = (result.rows || []) as { period: string; count: number }[];

  if (!includePreviousYear) {
    return rows.map((r) => ({ period: r.period, count: Number(r.count) }));
  }

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
      `WITH periods AS (
        SELECT d::date as period
        FROM generate_series('${prevStart}'::date, '${prevEnd}'::date, ${intervalStr}) d
      ),
      active_per_period AS (
        SELECT p.period, COUNT(t.id)::int as cnt
        FROM periods p
        LEFT JOIN travaux t ON t.start_date <= p.period
          AND (t.end_date IS NULL OR t.end_date >= p.period)
          ${boroughFilter}
        GROUP BY p.period
      )
      SELECT to_char(period, 'YYYY-MM-DD') as period, cnt as count
      FROM active_per_period
      ORDER BY period`
    )
  );

  const prevRows = (prevResult.rows || []) as { period: string; count: number }[];
  const prevMap = new Map(prevRows.map((r) => [r.period, Number(r.count)]));

  return rows.map((r) => {
    const prevYearPeriod = r.period.replace(
      /^(\d{4})/,
      (_, y) => String(parseInt(y, 10) - 1)
    );
    return {
      period: r.period,
      count: Number(r.count),
      previousYearCount: prevMap.get(prevYearPeriod) ?? undefined,
    };
  });
}

/** Get construction count by borough */
export async function getTravauxByBorough(
  perCapita = false
): Promise<TravauxByBoroughRow[]> {
  const result = await db
    .select({
      boroughCode: travaux.boroughCode,
      count: count(),
    })
    .from(travaux)
    .where(activeCondition())
    .groupBy(travaux.boroughCode);

  const populated = result.filter(
    (r): r is { boroughCode: string; count: number } => r.boroughCode != null
  );

  if (!perCapita) {
    return populated
      .map((r) => ({ boroughCode: r.boroughCode, count: Number(r.count) }))
      .sort((a, b) => b.count - a.count);
  }

  const { BOROUGHS } = await import('@/lib/constants/boroughs');
  return populated
    .map((r) => {
      const pop = BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.population;
      const perCapitaVal = pop ? Number(r.count) / pop : null;
      return {
        boroughCode: r.boroughCode,
        count: Number(r.count),
        perCapita: perCapitaVal ?? undefined,
      };
    })
    .sort((a, b) => (b.perCapita ?? 0) - (a.perCapita ?? 0));
}

/** Get aggregate stats for header */
export async function getTravauxStats(
  boroughCode?: string | null
): Promise<TravauxStats> {
  const baseConds = [activeCondition()];
  if (boroughCode != null && boroughCode !== '') {
    baseConds.push(eq(travaux.boroughCode, boroughCode));
  }

  const todayStr = today();
  const weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + 7);
  const weekEndStr = weekEnd.toISOString().slice(0, 10);

  const [activeRes, newTodayRes, closingRes, mostBoroughRes, durationRes, longRes] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(travaux)
        .where(and(...baseConds)),
      db
        .select({ count: count() })
        .from(travaux)
        .where(
          and(...baseConds, eq(travaux.startDate, todayStr))
        ),
      db
        .select({ count: count() })
        .from(travaux)
        .where(
          and(
            ...baseConds,
            sql`${travaux.endDate} IS NOT NULL`,
            gte(travaux.endDate, todayStr),
            lte(travaux.endDate, weekEndStr)
          )
        ),
      db
        .select({
          boroughCode: travaux.boroughCode,
          count: count(),
        })
        .from(travaux)
        .where(activeCondition())
        .groupBy(travaux.boroughCode)
        .orderBy(sql`count(*) DESC`),
      db
        .select({
          avg: sql<number>`AVG(
            (CASE WHEN end_date IS NOT NULL AND start_date IS NOT NULL
              THEN (end_date::date - start_date::date)
              ELSE NULL END)
          )`,
          median: sql<number>`PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY
            (CASE WHEN end_date IS NOT NULL AND start_date IS NOT NULL
              THEN (end_date::date - start_date::date)
              ELSE NULL END)
          )`,
        })
        .from(travaux)
        .where(and(...baseConds)),
      db
        .select({ count: count() })
        .from(travaux)
        .where(
          and(
            ...baseConds,
            sql`end_date IS NOT NULL`,
            sql`start_date IS NOT NULL`,
            sql`(end_date::date - start_date::date) > 30`
          )
        ),
    ]);

  const mostBorough =
    mostBoroughRes.find((r) => r.boroughCode != null)?.boroughCode ?? null;

  return {
    activeCount: Number(activeRes[0]?.count ?? 0),
    newToday: Number(newTodayRes[0]?.count ?? 0),
    closingThisWeek: Number(closingRes[0]?.count ?? 0),
    mostAffectedBorough: mostBorough,
    avgDurationDays: durationRes[0]?.avg != null ? Number(durationRes[0].avg) : null,
    medianDurationDays:
      durationRes[0]?.median != null ? Number(durationRes[0].median) : null,
    longRunnersCount: Number(longRes[0]?.count ?? 0),
  };
}

/** Search/filter travaux with pagination */
export async function searchTravaux(
  query: string,
  filters: TravauxSearchFilters,
  pagination: { page: number; pageSize: number }
): Promise<TravauxSearchResult> {
  const { page = 1, pageSize = 25 } = pagination;
  const offset = (page - 1) * pageSize;

  const conds = [activeCondition()];

  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(travaux.boroughCode, filters.boroughCode));
  }
  if (filters.category != null && filters.category !== '') {
    conds.push(eq(travaux.category, filters.category));
  }
  if (filters.status != null && filters.status !== '') {
    conds.push(eq(travaux.status, filters.status));
  }

  if (query.trim()) {
    const q = `%${query.trim()}%`;
    conds.push(
      sql`(
        ${travaux.externalId} ILIKE ${q} OR
        ${travaux.street} ILIKE ${q} OR
        ${travaux.organizationName} ILIKE ${q} OR
        ${travaux.category} ILIKE ${q}
      )`
    );
  }

  const [rows, totalRes] = await Promise.all([
    db
      .select({
        id: travaux.id,
        externalId: travaux.externalId,
        boroughCode: travaux.boroughCode,
        category: travaux.category,
        status: travaux.status,
        startDate: travaux.startDate,
        endDate: travaux.endDate,
        street: travaux.street,
        organizationName: travaux.organizationName,
        lat: latExpr,
        lng: lngExpr,
        firstSeenAt: travaux.firstSeenAt,
        lastSeenAt: travaux.lastSeenAt,
      })
      .from(travaux)
      .where(and(...conds))
      .orderBy(desc(travaux.startDate))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: count() })
      .from(travaux)
      .where(and(...conds)),
  ]);

  return {
    rows: rows.map(toTravauxRow),
    total: Number(totalRes[0]?.count ?? 0),
    page,
    pageSize,
  };
}

/** Streets most affected by construction (by count and total duration) */
export async function getStreetsMostAffected(
  boroughCode?: string | null,
  limit = 20
): Promise<{ street: string; count: number; totalDurationDays: number }[]> {
  const conds = [activeCondition(), sql`${travaux.street} IS NOT NULL AND ${travaux.street} != ''`];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(travaux.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      street: travaux.street,
      count: count(),
      totalDuration: sql<number>`SUM(
        CASE WHEN end_date IS NOT NULL AND start_date IS NOT NULL
          THEN (end_date::date - start_date::date)
          ELSE 0
        END
      )`,
    })
    .from(travaux)
    .where(and(...conds))
    .groupBy(travaux.street)
    .orderBy(sql`count(*) DESC`)
    .limit(limit);

  return (result as { street: string; count: number; totalDuration: number }[]).map(
    (r) => ({
      street: r.street!,
      count: Number(r.count),
      totalDurationDays: Number(r.totalDuration ?? 0),
    })
  );
}

/** Get distinct categories and statuses for filter dropdowns */
export async function getTravauxFilterOptions(): Promise<{
  categories: string[];
  statuses: string[];
  boroughCodes: string[];
}> {
  const [catRes, statusRes, boroughRes] = await Promise.all([
    db
      .selectDistinct({ category: travaux.category })
      .from(travaux)
      .where(and(activeCondition(), sql`${travaux.category} IS NOT NULL`)),
    db
      .selectDistinct({ status: travaux.status })
      .from(travaux)
      .where(and(activeCondition(), sql`${travaux.status} IS NOT NULL`)),
    db
      .selectDistinct({ boroughCode: travaux.boroughCode })
      .from(travaux)
      .where(and(activeCondition(), sql`${travaux.boroughCode} IS NOT NULL`)),
  ]);

  return {
    categories: catRes
      .map((r) => r.category!)
      .filter(Boolean)
      .sort(),
    statuses: statusRes
      .map((r) => r.status!)
      .filter(Boolean)
      .sort(),
    boroughCodes: boroughRes
      .map((r) => r.boroughCode!)
      .filter(Boolean)
      .sort(),
  };
}

function toTravauxRow(row: {
  id: number;
  externalId: string;
  boroughCode: string | null;
  category: string | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
  street: string | null;
  organizationName: string | null;
  lat: unknown;
  lng: unknown;
  firstSeenAt: Date;
  lastSeenAt: Date;
}): TravauxRow {
  const parseNum = (v: unknown): number | null => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    ...row,
    lat: parseNum(row.lat),
    lng: parseNum(row.lng),
  };
}
