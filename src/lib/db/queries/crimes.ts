/**
 * Data access layer for crime incidents.
 * Supports time series, category/shift/PDQ breakdowns, borough comparison, stats, and map points.
 * PDQ 50 = metro system — excluded from borough comparisons.
 */

import { db } from '@/lib/db';
import { crimeIncidents } from '@/lib/db/schema';
import { eq, and, gte, lte, sql, desc, asc, count } from 'drizzle-orm';
import { BOROUGHS } from '@/lib/constants/boroughs';

/** PDQ 50 = métro system, not a borough. Exclude from borough comparisons. */
export const PDQ_METRO = 50;

export type CrimeTimeSeriesPoint = {
  period: string;
  count: number;
  rolling7d?: number;
  previousYearCount?: number;
};

export type CrimeByCategoryRow = {
  category: string;
  count: number;
};

export type CrimeByShiftRow = {
  shift: string;
  count: number;
};

export type CrimeByShiftPerCategoryRow = {
  category: string;
  jour: number;
  soir: number;
  nuit: number;
};

export type CrimeByPDQRow = {
  pdq: number;
  count: number;
  label?: string; // "PDQ 50 (Métro)" when pdq === 50
};

export type CrimeByBoroughRow = {
  boroughCode: string;
  count: number;
  perCapita?: number;
};

export type CrimeStats = {
  total7d: number;
  total30d: number;
  delta7dVsPrev7d: number | null;
  mostAffectedBorough: string | null;
  topCategory: string | null;
};

export type CrimeTableRow = {
  id: number;
  externalId: string | null;
  category: string;
  incidentDate: string;
  shift: string | null;
  pdq: number | null;
  boroughCode: string | null;
  lat: number | null;
  lng: number | null;
};

export type CrimeTableResult = {
  rows: CrimeTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type CrimeMapPoint = {
  id: number;
  externalId: string | null;
  category: string;
  incidentDate: string;
  shift: string | null;
  lat: number | null;
  lng: number | null;
};

function boroughCondition(boroughCode?: string | null) {
  if (boroughCode != null && boroughCode !== '') {
    return eq(crimeIncidents.boroughCode, boroughCode);
  }
  return undefined;
}

function dateRangeCondition(startDate: string, endDate: string) {
  return and(
    gte(crimeIncidents.incidentDate, startDate),
    lte(crimeIncidents.incidentDate, endDate)
  )!;
}

/** Get crime time series with optional 7-day rolling average and year-over-year comparison */
export async function getCrimeTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly',
  options?: { includeRolling7d?: boolean; includePreviousYear?: boolean }
): Promise<CrimeTimeSeriesPoint[]> {
  const { includeRolling7d = true, includePreviousYear = true } = options ?? {};
  const intervalStr =
    granularity === 'daily'
      ? "'1 day'::interval"
      : granularity === 'weekly'
        ? "'1 week'::interval"
        : "'1 month'::interval";

  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND c.borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(`
      WITH periods AS (
        SELECT d::date AS period
        FROM generate_series('${startDate}'::date, '${endDate}'::date, ${intervalStr}) d
      ),
      counts AS (
        SELECT p.period, COUNT(c.id)::int AS cnt
        FROM periods p
        LEFT JOIN crime_incidents c ON c.incident_date = p.period ${boroughFilter}
        GROUP BY p.period
      )
      SELECT to_char(period, 'YYYY-MM-DD') AS period, cnt AS count
      FROM counts
      ORDER BY period
    `)
  );

  const rows = (result.rows || []) as { period: string; count: number }[];
  let points: CrimeTimeSeriesPoint[] = rows.map((r) => ({
    period: r.period,
    count: Number(r.count),
  }));

  if (includeRolling7d && granularity === 'daily') {
    const withRolling = points.map((p, i) => {
      const start = Math.max(0, i - 6);
      const slice = points.slice(start, i + 1);
      const rolling =
        slice.reduce((s, x) => s + x.count, 0) / slice.length;
      return { ...p, rolling7d: Math.round(rolling * 10) / 10 };
    });
    points = withRolling;
  }

  if (includePreviousYear) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const prevStart = new Date(
      start.getFullYear() - 1,
      start.getMonth(),
      start.getDate()
    )
      .toISOString()
      .slice(0, 10);
    const prevEnd = new Date(
      end.getFullYear() - 1,
      end.getMonth(),
      end.getDate()
    )
      .toISOString()
      .slice(0, 10);

    const prevResult = await db.execute(
      sql.raw(`
        WITH periods AS (
          SELECT d::date AS period
          FROM generate_series('${prevStart}'::date, '${prevEnd}'::date, ${intervalStr}) d
        ),
        counts AS (
          SELECT p.period, COUNT(c.id)::int AS cnt
          FROM periods p
          LEFT JOIN crime_incidents c ON c.incident_date = p.period ${boroughFilter}
          GROUP BY p.period
        )
        SELECT to_char(period, 'YYYY-MM-DD') AS period, cnt AS count
        FROM counts
        ORDER BY period
      `)
    );

    const prevRows = (prevResult.rows || []) as { period: string; count: number }[];
    const prevMap = new Map(prevRows.map((r) => [r.period, Number(r.count)]));

    points = points.map((r) => {
      const prevYearPeriod = r.period.replace(
        /^(\d{4})/,
        (_, y) => String(parseInt(y, 10) - 1)
      );
      return {
        ...r,
        previousYearCount: prevMap.get(prevYearPeriod) ?? undefined,
      };
    });
  }

  return points;
}

/** Get crime count by category */
export async function getCrimeByCategory(
  boroughCode?: string | null,
  startDate?: string,
  endDate?: string
): Promise<CrimeByCategoryRow[]> {
  const conds = [];
  if (boroughCondition(boroughCode)) conds.push(boroughCondition(boroughCode)!);
  if (startDate && endDate) conds.push(dateRangeCondition(startDate, endDate));

  const result = await db
    .select({
      category: crimeIncidents.category,
      count: count(),
    })
    .from(crimeIncidents)
    .where(conds.length > 0 ? and(...conds) : undefined)
    .groupBy(crimeIncidents.category)
    .orderBy(sql`count(*) DESC`);

  return result.map((r) => ({
    category: r.category,
    count: Number(r.count),
  }));
}

/** Get crime count by shift (jour/soir/nuit) */
export async function getCrimeByShift(
  boroughCode?: string | null,
  startDate?: string,
  endDate?: string
): Promise<CrimeByShiftRow[]> {
  const conds = [sql`${crimeIncidents.shift} IS NOT NULL AND ${crimeIncidents.shift} != ''`];
  if (boroughCondition(boroughCode)) conds.push(boroughCondition(boroughCode)!);
  if (startDate && endDate) conds.push(dateRangeCondition(startDate, endDate));

  const result = await db
    .select({
      shift: crimeIncidents.shift,
      count: count(),
    })
    .from(crimeIncidents)
    .where(and(...conds))
    .groupBy(crimeIncidents.shift)
    .orderBy(sql`count(*) DESC`);

  return (result as { shift: string; count: number }[]).map((r) => ({
    shift: r.shift!,
    count: Number(r.count),
  }));
}

/** Get crime by shift per category — horizontal stacked bars */
export async function getCrimeByShiftPerCategory(
  boroughCode?: string | null,
  startDate?: string,
  endDate?: string
): Promise<CrimeByShiftPerCategoryRow[]> {
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';
  const dateFilter =
    startDate && endDate
      ? `AND incident_date >= '${startDate.replace(/'/g, "''")}' AND incident_date <= '${endDate.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(`
      SELECT category,
        COALESCE(SUM(CASE WHEN LOWER(TRIM(shift)) LIKE 'jour%' OR LOWER(TRIM(shift)) = 'day' THEN 1 ELSE 0 END), 0)::int AS jour,
        COALESCE(SUM(CASE WHEN LOWER(TRIM(shift)) LIKE 'soir%' OR LOWER(TRIM(shift)) = 'evening' THEN 1 ELSE 0 END), 0)::int AS soir,
        COALESCE(SUM(CASE WHEN LOWER(TRIM(shift)) LIKE 'nuit%' OR LOWER(TRIM(shift)) = 'night' THEN 1 ELSE 0 END), 0)::int AS nuit
      FROM crime_incidents
      WHERE shift IS NOT NULL AND shift != '' ${boroughFilter} ${dateFilter}
      GROUP BY category
      ORDER BY (jour + soir + nuit) DESC
      LIMIT 10
    `)
  );

  const rows = (result.rows || []) as { category: string; jour: number; soir: number; nuit: number }[];
  return rows.map((r) => ({
    category: r.category,
    jour: Number(r.jour),
    soir: Number(r.soir),
    nuit: Number(r.nuit),
  }));
}

/** Get crime count by PDQ. PDQ 50 = metro (Réseau du métro), label clearly. */
export async function getCrimeByPDQ(
  startDate?: string,
  endDate?: string,
  locale: 'fr' | 'en' = 'fr'
): Promise<CrimeByPDQRow[]> {
  const dateFilter =
    startDate && endDate
      ? `AND incident_date >= '${startDate.replace(/'/g, "''")}' AND incident_date <= '${endDate.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(`
      SELECT pdq, COUNT(*)::int AS count
      FROM crime_incidents
      WHERE pdq IS NOT NULL ${dateFilter}
      GROUP BY pdq
      ORDER BY count DESC
    `)
  );

  const rows = (result.rows || []) as { pdq: number; count: number }[];
  return rows.map((r) => ({
    pdq: Number(r.pdq),
    count: Number(r.count),
    label:
      r.pdq === PDQ_METRO
        ? locale === 'fr'
          ? `PDQ ${r.pdq} (Réseau du métro)`
          : `PDQ ${r.pdq} (Metro network)`
        : `PDQ ${r.pdq}`,
  }));
}

/** Get crime by borough with optional per-capita (excludes PDQ 50 from borough mapping; boroughCode comes from PDQ_TO_BOROUGH) */
export async function getCrimeByBorough(
  startDate: string,
  endDate: string,
  perCapita = false
): Promise<CrimeByBoroughRow[]> {
  const result = await db
    .select({
      boroughCode: crimeIncidents.boroughCode,
      count: count(),
    })
    .from(crimeIncidents)
    .where(
      and(
        dateRangeCondition(startDate, endDate),
        sql`${crimeIncidents.boroughCode} IS NOT NULL`
      )
    )
    .groupBy(crimeIncidents.boroughCode)
    .orderBy(sql`count(*) DESC`);

  const populated = result.filter(
    (r): r is { boroughCode: string; count: number } => r.boroughCode != null
  );

  if (!perCapita) {
    return populated.map((r) => ({
      boroughCode: r.boroughCode,
      count: Number(r.count),
    }));
  }

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

/** Get aggregate crime stats for header */
export async function getCrimeStats(
  boroughCode?: string | null
): Promise<CrimeStats> {
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().slice(0, 10);
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  const fourteenDaysAgoStr = fourteenDaysAgo.toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);

  const boroughCond = boroughCondition(boroughCode);
  const baseConds: ReturnType<typeof eq>[] = boroughCond ? [boroughCond] : [];

  const [total7dRes, totalPrev7dRes, total30dRes, topBoroughRes, topCatRes] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(crimeIncidents)
        .where(
          baseConds.length > 0
            ? and(dateRangeCondition(sevenDaysAgoStr, today), ...baseConds)
            : dateRangeCondition(sevenDaysAgoStr, today)
        ),
      db
        .select({ count: count() })
        .from(crimeIncidents)
        .where(
          baseConds.length > 0
            ? and(dateRangeCondition(fourteenDaysAgoStr, sevenDaysAgoStr), ...baseConds)
            : dateRangeCondition(fourteenDaysAgoStr, sevenDaysAgoStr)
        ),
      db
        .select({ count: count() })
        .from(crimeIncidents)
        .where(
          baseConds.length > 0
            ? and(dateRangeCondition(thirtyDaysAgoStr, today), ...baseConds)
            : dateRangeCondition(thirtyDaysAgoStr, today)
        ),
      db
        .select({
          boroughCode: crimeIncidents.boroughCode,
          count: count(),
        })
        .from(crimeIncidents)
        .where(
          and(
            dateRangeCondition(sevenDaysAgoStr, today),
            sql`${crimeIncidents.boroughCode} IS NOT NULL`
          )
        )
        .groupBy(crimeIncidents.boroughCode)
        .orderBy(sql`count(*) DESC`)
        .limit(1),
      db
        .select({
          category: crimeIncidents.category,
          count: count(),
        })
        .from(crimeIncidents)
        .where(dateRangeCondition(sevenDaysAgoStr, today))
        .groupBy(crimeIncidents.category)
        .orderBy(sql`count(*) DESC`)
        .limit(1),
    ]);

  const total7d = Number(total7dRes[0]?.count ?? 0);
  const totalPrev7d = Number(totalPrev7dRes[0]?.count ?? 0);
  const total30d = Number(total30dRes[0]?.count ?? 0);
  const delta = totalPrev7d > 0 ? ((total7d - totalPrev7d) / totalPrev7d) * 100 : null;
  const mostAffected =
    topBoroughRes.find((r) => r.boroughCode != null)?.boroughCode ?? null;
  const topCategory = topCatRes[0]?.category ?? null;

  return {
    total7d,
    total30d,
    delta7dVsPrev7d: delta,
    mostAffectedBorough: mostAffected,
    topCategory: topCategory ?? null,
  };
}

/** Search crimes with pagination and filters */
export async function searchCrimes(
  filters: {
    boroughCode?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  },
  pagination: { page: number; pageSize: number }
): Promise<CrimeTableResult> {
  const { page = 1, pageSize = 25 } = pagination;
  const offset = (page - 1) * pageSize;

  const conds = [];
  if (filters.boroughCode) conds.push(eq(crimeIncidents.boroughCode, filters.boroughCode));
  if (filters.category) conds.push(eq(crimeIncidents.category, filters.category));
  if (filters.startDate && filters.endDate) {
    conds.push(dateRangeCondition(filters.startDate, filters.endDate));
  }

  const [rows, totalRes] = await Promise.all([
    db
      .select({
        id: crimeIncidents.id,
        externalId: crimeIncidents.externalId,
        category: crimeIncidents.category,
        incidentDate: crimeIncidents.incidentDate,
        shift: crimeIncidents.shift,
        pdq: crimeIncidents.pdq,
        boroughCode: crimeIncidents.boroughCode,
        lat: crimeIncidents.lat,
        lng: crimeIncidents.lng,
      })
      .from(crimeIncidents)
      .where(conds.length > 0 ? and(...conds) : undefined)
      .orderBy(desc(crimeIncidents.incidentDate))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: count() })
      .from(crimeIncidents)
      .where(conds.length > 0 ? and(...conds) : undefined),
  ]);

  const parseNum = (v: unknown): number | null => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  return {
    rows: rows.map((r) => ({
      id: r.id,
      externalId: r.externalId,
      category: r.category,
      incidentDate: String(r.incidentDate).slice(0, 10),
      shift: r.shift,
      pdq: r.pdq != null ? Number(r.pdq) : null,
      boroughCode: r.boroughCode,
      lat: parseNum(r.lat),
      lng: parseNum(r.lng),
    })),
    total: Number(totalRes[0]?.count ?? 0),
    page,
    pageSize,
  };
}

/** Get crime filter options (distinct categories, boroughs) */
export async function getCrimeFilterOptions(): Promise<{
  categories: string[];
  boroughCodes: string[];
}> {
  const [catRes, boroughRes] = await Promise.all([
    db
      .selectDistinct({ category: crimeIncidents.category })
      .from(crimeIncidents)
      .where(sql`${crimeIncidents.category} IS NOT NULL`),
    db
      .selectDistinct({ boroughCode: crimeIncidents.boroughCode })
      .from(crimeIncidents)
      .where(sql`${crimeIncidents.boroughCode} IS NOT NULL`),
  ]);

  return {
    categories: catRes.map((r) => r.category!).filter(Boolean).sort(),
    boroughCodes: boroughRes.map((r) => r.boroughCode!).filter(Boolean).sort(),
  };
}

/** Get crime incidents for map (intersection-level, with lat/lng) */
export async function getCrimesForMap(
  filters: {
    boroughCode?: string | null;
    category?: string | null;
    startDate?: string;
    endDate?: string;
  },
  limit = 500
): Promise<CrimeMapPoint[]> {
  const conds = [
    sql`${crimeIncidents.lat} IS NOT NULL`,
    sql`${crimeIncidents.lng} IS NOT NULL`,
  ];
  if (filters.boroughCode) conds.push(eq(crimeIncidents.boroughCode, filters.boroughCode));
  if (filters.category) conds.push(eq(crimeIncidents.category, filters.category));
  if (filters.startDate && filters.endDate) {
    conds.push(dateRangeCondition(filters.startDate, filters.endDate));
  }

  const rows = await db
    .select({
      id: crimeIncidents.id,
      externalId: crimeIncidents.externalId,
      category: crimeIncidents.category,
      incidentDate: crimeIncidents.incidentDate,
      shift: crimeIncidents.shift,
      lat: crimeIncidents.lat,
      lng: crimeIncidents.lng,
    })
    .from(crimeIncidents)
    .where(and(...conds))
    .orderBy(desc(crimeIncidents.incidentDate))
    .limit(limit);

  const parseNum = (v: unknown): number | null => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  return rows.map((r) => ({
    id: r.id,
    externalId: r.externalId,
    category: r.category,
    incidentDate: String(r.incidentDate).slice(0, 10),
    shift: r.shift,
    lat: parseNum(r.lat),
    lng: parseNum(r.lng),
  }));
}
