/**
 * Data access layer for building permits (permis construction).
 * Supports stats by type, construction activity index, borough breakdown,
 * demolition vs construction ratio, and search.
 */

import { db } from '@/lib/db';
import { constructionPermits } from '@/lib/db/schema';
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

export type PermitRow = {
  id: number;
  permitNumber: string | null;
  dateIssued: string | null;
  boroughCode: string | null;
  permitType: string | null;
  buildingType: string | null;
  natureTravaux: string | null;
  numUnits: number | null;
  estimatedCost: number | null;
  lat: number | null;
  lng: number | null;
};

export type PermitByTypeRow = {
  permitType: string;
  count: number;
};

export type PermitTimeSeriesPoint = {
  period: string;
  count: number;
  totalCost: number | null;
  previousYearCount?: number;
};

export type PermitByBoroughRow = {
  boroughCode: string;
  count: number;
  totalCost: number | null;
  constructionCount: number;
  demolitionCount: number;
  ratio: number | null;
};

export type PermitStats = {
  thisWeekCount: number;
  thisWeekValue: number | null;
  demolitionCount: number;
  constructionCount: number;
};

const today = () => new Date().toISOString().slice(0, 10);

const latExpr = sql<string | null>`(${constructionPermits.lat})::numeric`;
const lngExpr = sql<string | null>`(${constructionPermits.lng})::numeric`;

/** Permit type codes: CO=construction, TR=transformation, DE=demolition, CA=certificate */
const PERMIT_TYPE_LABELS: Record<string, { fr: string; en: string }> = {
  CO: { fr: 'Construction', en: 'Construction' },
  TR: { fr: 'Transformation', en: 'Transformation' },
  DE: { fr: 'Démolition', en: 'Demolition' },
  CA: { fr: 'Certificat', en: 'Certificate' },
};

export function getPermitTypeLabel(code: string, locale: 'fr' | 'en'): string {
  return PERMIT_TYPE_LABELS[code]?.[locale] ?? code;
}

/** Permits by type breakdown */
export async function getPermitsByType(
  startDate: string,
  endDate: string,
  boroughCode?: string | null
): Promise<PermitByTypeRow[]> {
  const conds = [
    gte(constructionPermits.dateIssued, startDate),
    lte(constructionPermits.dateIssued, endDate),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(constructionPermits.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      permitType: constructionPermits.permitType,
      count: count(),
    })
    .from(constructionPermits)
    .where(and(...conds))
    .groupBy(constructionPermits.permitType);

  return result
    .filter((r) => r.permitType != null)
    .map((r) => ({
      permitType: r.permitType!,
      count: Number(r.count),
    }))
    .sort((a, b) => b.count - a.count);
}

/** Construction activity index: permit count + estimated cost trend */
export async function getPermitsTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly',
  includePreviousYear = true
): Promise<PermitTimeSeriesPoint[]> {
  const dateTrunc =
    granularity === 'daily'
      ? 'date'
      : granularity === 'weekly'
        ? 'week'
        : 'month';
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `WITH permit_buckets AS (
        SELECT date_trunc('${dateTrunc}', date_issued::date)::date AS period,
          COUNT(*)::int AS cnt,
          COALESCE(SUM((estimated_cost)::numeric), 0)::numeric AS tot_cost
        FROM construction_permits
        WHERE date_issued >= '${startDate}' AND date_issued <= '${endDate}' ${boroughFilter}
        GROUP BY date_trunc('${dateTrunc}', date_issued::date)
      )
      SELECT to_char(period, 'YYYY-MM-DD') AS period, cnt AS count, tot_cost AS total_cost
      FROM permit_buckets
      ORDER BY period`
    )
  );

  const rows = (result.rows || []) as {
    period: string;
    count: number;
    total_cost: number;
  }[];

  if (!includePreviousYear) {
    return rows.map((r) => ({
      period: r.period,
      count: Number(r.count),
      totalCost: Number(r.total_cost) || null,
    }));
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
      `SELECT date_trunc('${dateTrunc}', date_issued::date)::date AS period,
        COUNT(*)::int AS cnt
      FROM construction_permits
      WHERE date_issued >= '${prevStart}' AND date_issued <= '${prevEnd}' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', date_issued::date)
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

  return rows.map((r) => {
    const prevYearPeriod = r.period.replace(
      /^(\d{4})/,
      (_, y) => String(parseInt(y, 10) - 1)
    );
    return {
      period: r.period,
      count: Number(r.count),
      totalCost: Number(r.total_cost) || null,
      previousYearCount: prevMap.get(prevYearPeriod) ?? undefined,
    };
  });
}

/** Demolition vs construction ratio per borough */
export async function getDemolitionVsConstructionByBorough(
  startDate: string,
  endDate: string
): Promise<PermitByBoroughRow[]> {
  const result = await db.execute(
    sql.raw(
      `SELECT borough_code AS borough_code,
        COUNT(*)::int AS count,
        COALESCE(SUM((estimated_cost)::numeric), 0)::numeric AS total_cost,
        COUNT(*) FILTER (WHERE permit_type IN ('CO','TR'))::int AS construction_count,
        COUNT(*) FILTER (WHERE permit_type = 'DE')::int AS demolition_count,
        CASE WHEN COUNT(*) FILTER (WHERE permit_type IN ('CO','TR')) > 0
          THEN ROUND((COUNT(*) FILTER (WHERE permit_type = 'DE')::numeric / 
            NULLIF(COUNT(*) FILTER (WHERE permit_type IN ('CO','TR')), 0)), 2)
          ELSE NULL END AS ratio
      FROM construction_permits
      WHERE date_issued >= '${startDate}' AND date_issued <= '${endDate}'
        AND borough_code IS NOT NULL
      GROUP BY borough_code
      ORDER BY count DESC`
    )
  );

  const rows = (result.rows || []) as {
    borough_code: string;
    count: number;
    total_cost: number;
    construction_count: number;
    demolition_count: number;
    ratio: number | null;
  }[];

  return rows.map((r) => ({
    boroughCode: r.borough_code,
    count: Number(r.count),
    totalCost: Number(r.total_cost) || null,
    constructionCount: Number(r.construction_count),
    demolitionCount: Number(r.demolition_count),
    ratio: r.ratio != null ? Number(r.ratio) : null,
  }));
}

/** Permit value by borough (caveat: sans valeur légale) */
export async function getPermitValueByBorough(
  startDate: string,
  endDate: string,
  boroughCode?: string | null
): Promise<PermitByBoroughRow[]> {
  const conds = [
    gte(constructionPermits.dateIssued, startDate),
    lte(constructionPermits.dateIssued, endDate),
    isNotNull(constructionPermits.boroughCode),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(constructionPermits.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      boroughCode: constructionPermits.boroughCode,
      count: count(),
      totalCost: sql<number>`COALESCE(SUM((${constructionPermits.estimatedCost})::numeric), 0)`,
    })
    .from(constructionPermits)
    .where(and(...conds))
    .groupBy(constructionPermits.boroughCode);

  return result
    .filter((r): r is typeof r & { boroughCode: string } => r.boroughCode != null)
    .map((r) => ({
      boroughCode: r.boroughCode,
      count: Number(r.count),
      totalCost: Number(r.totalCost),
      constructionCount: 0,
      demolitionCount: 0,
      ratio: null,
    }))
    .sort((a, b) => b.count - a.count);
}

/** Lachine/Saint-Léonard gap: boroughs with missing/incomplete data */
export const PERMIT_GAP_BOROUGHS = ['LAC', 'SLE'] as const;

export function getPermitGapBoroughs(): typeof PERMIT_GAP_BOROUGHS {
  return [...PERMIT_GAP_BOROUGHS];
}

/** Key stats for header */
export async function getPermitsStats(
  boroughCode?: string | null
): Promise<PermitStats> {
  const todayStr = today();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() - (weekStart.getDay() === 0 ? 7 : 0));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const weekStartStr = weekStart.toISOString().slice(0, 10);
  const weekEndStr = weekEnd.toISOString().slice(0, 10);

  const conds = [
    gte(constructionPermits.dateIssued, weekStartStr),
    lte(constructionPermits.dateIssued, weekEndStr),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(constructionPermits.boroughCode, boroughCode));
  }

  const [countRes, valueRes] = await Promise.all([
    db
      .select({ count: count() })
      .from(constructionPermits)
      .where(and(...conds)),
    db
      .select({
        total: sql<number>`COALESCE(SUM((${constructionPermits.estimatedCost})::numeric), 0)`,
      })
      .from(constructionPermits)
      .where(and(...conds)),
  ]);

  const constructionConds = [
    ...conds,
    sql`${constructionPermits.permitType} IN ('CO', 'TR')`,
  ];
  const demolitionConds = [...conds, eq(constructionPermits.permitType, 'DE')];

  const [constructionRes, demolitionRes] = await Promise.all([
    db.select({ count: count() }).from(constructionPermits).where(and(...constructionConds)),
    db.select({ count: count() }).from(constructionPermits).where(and(...demolitionConds)),
  ]);

  return {
    thisWeekCount: Number(countRes[0]?.count ?? 0),
    thisWeekValue: Number(valueRes[0]?.total ?? 0) || null,
    constructionCount: Number(constructionRes[0]?.count ?? 0),
    demolitionCount: Number(demolitionRes[0]?.count ?? 0),
  };
}

/** Search permits with pagination */
export type PermitSearchFilters = {
  boroughCode?: string | null;
  permitType?: string | null;
};

export type PermitSearchResult = {
  rows: PermitRow[];
  total: number;
  page: number;
  pageSize: number;
};

export async function searchPermits(
  query: string,
  filters: PermitSearchFilters,
  pagination: { page: number; pageSize: number }
): Promise<PermitSearchResult> {
  const { page = 1, pageSize = 25 } = pagination;
  const offset = (page - 1) * pageSize;

  const conds = [];

  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(constructionPermits.boroughCode, filters.boroughCode));
  }
  if (filters.permitType != null && filters.permitType !== '') {
    conds.push(eq(constructionPermits.permitType, filters.permitType));
  }

  if (query.trim()) {
    const q = `%${query.trim()}%`;
    conds.push(
      sql`(
        ${constructionPermits.permitNumber} ILIKE ${q} OR
        ${constructionPermits.natureTravaux} ILIKE ${q} OR
        ${constructionPermits.buildingType} ILIKE ${q}
      )`
    );
  }

  const whereClause = conds.length > 0 ? and(...conds) : sql`true`;

  const [rows, totalRes] = await Promise.all([
    db
      .select({
        id: constructionPermits.id,
        permitNumber: constructionPermits.permitNumber,
        dateIssued: constructionPermits.dateIssued,
        boroughCode: constructionPermits.boroughCode,
        permitType: constructionPermits.permitType,
        buildingType: constructionPermits.buildingType,
        natureTravaux: constructionPermits.natureTravaux,
        numUnits: constructionPermits.numUnits,
        estimatedCost: constructionPermits.estimatedCost,
        lat: latExpr,
        lng: lngExpr,
      })
      .from(constructionPermits)
      .where(whereClause)
      .orderBy(desc(constructionPermits.dateIssued))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: count() })
      .from(constructionPermits)
      .where(whereClause),
  ]);

  return {
    rows: rows.map(toPermitRow),
    total: Number(totalRes[0]?.count ?? 0),
    page,
    pageSize,
  };
}

/** Permits with geolocation for map (73% centroid, 24% street segment) */
export async function getPermitsForMap(
  filters: { boroughCode?: string | null; permitType?: string | null; year?: number },
  limit = 500
): Promise<{ id: number; permitNumber: string | null; permitType: string | null; boroughCode: string | null; dateIssued: string | null; lat: number | null; lng: number | null }[]> {
  const conds = [
    isNotNull(constructionPermits.lat),
    isNotNull(constructionPermits.lng),
  ];
  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(constructionPermits.boroughCode, filters.boroughCode));
  }
  if (filters.permitType != null && filters.permitType !== '') {
    conds.push(eq(constructionPermits.permitType, filters.permitType));
  }
  if (filters.year != null) {
    conds.push(
      sql`EXTRACT(YEAR FROM ${constructionPermits.dateIssued}::date) = ${filters.year}`
    );
  }

  const rows = await db
    .select({
      id: constructionPermits.id,
      permitNumber: constructionPermits.permitNumber,
      permitType: constructionPermits.permitType,
      boroughCode: constructionPermits.boroughCode,
      dateIssued: constructionPermits.dateIssued,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(constructionPermits)
    .where(and(...conds))
    .orderBy(desc(constructionPermits.dateIssued))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}

/** Filter options */
export async function getPermitFilterOptions(): Promise<{
  permitTypes: string[];
  boroughCodes: string[];
}> {
  const [typeRes, boroughRes] = await Promise.all([
    db
      .selectDistinct({ permitType: constructionPermits.permitType })
      .from(constructionPermits)
      .where(isNotNull(constructionPermits.permitType)),
    db
      .selectDistinct({ boroughCode: constructionPermits.boroughCode })
      .from(constructionPermits)
      .where(isNotNull(constructionPermits.boroughCode)),
  ]);

  return {
    permitTypes: typeRes
      .map((r) => r.permitType!)
      .filter(Boolean)
      .sort(),
    boroughCodes: boroughRes
      .map((r) => r.boroughCode!)
      .filter(Boolean)
      .sort(),
  };
}

function toPermitRow(row: {
  id: number;
  permitNumber: string | null;
  dateIssued: Date | string | null;
  boroughCode: string | null;
  permitType: string | null;
  buildingType: string | null;
  natureTravaux: string | null;
  numUnits: number | null;
  estimatedCost: unknown;
  lat: unknown;
  lng: unknown;
}): PermitRow {
  const parseNum = (v: unknown): number | null => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    ...row,
    dateIssued: row.dateIssued != null ? String(row.dateIssued).slice(0, 10) : null,
    estimatedCost: parseNum(row.estimatedCost),
    lat: parseNum(row.lat),
    lng: parseNum(row.lng),
  };
}
