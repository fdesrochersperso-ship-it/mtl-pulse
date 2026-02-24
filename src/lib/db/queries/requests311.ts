/**
 * Data access layer for 311 citizen service requests.
 * Supports requests by nature, ACTI_NOM categories, status flow,
 * response time by borough (with caveat), backlog trend, and search.
 * Note: Information requests are NOT georeferenced — exclude from map.
 */

import { db } from '@/lib/db';
import { requests311 } from '@/lib/db/schema';
import {
  eq,
  and,
  gte,
  lte,
  sql,
  desc,
  count,
  isNotNull,
  isNull,
  or,
} from 'drizzle-orm';

export type Request311Row = {
  id: number;
  requestId: string | null;
  nature: string | null;
  requestType: string | null;
  boroughCode: string | null;
  status: string | null;
  createdAt: Date;
  closedAt: Date | null;
  lat: number | null;
  lng: number | null;
};

export type Request311ByNatureRow = {
  nature: string;
  count: number;
};

export type Request311ByTypeRow = {
  requestType: string;
  count: number;
};

export type Request311ByStatusRow = {
  status: string;
  count: number;
};

export type Request311TimeSeriesPoint = {
  period: string;
  openCount: number;
  closedCount: number;
  createdCount: number;
};

export type Request311ByBoroughRow = {
  boroughCode: string;
  count: number;
  avgResolutionDays: number | null;
  openCount: number;
};

export type Request311Stats = {
  openCount: number;
  avgResolutionDays: number | null;
  topType: string | null;
  topNature: string | null;
};

const closedStatuses = ['Terminée', 'Annulée', 'Refusée'];

function isClosed(status: string | null): boolean {
  if (!status) return false;
  return closedStatuses.some(
    (s) => status.toLowerCase().includes(s.toLowerCase())
  );
}

const latExpr = sql<string | null>`(${requests311.lat})::numeric`;
const lngExpr = sql<string | null>`(${requests311.lng})::numeric`;

/** Requests by nature: Information, Requête, Plainte, Commentaire */
export async function getRequests311ByNature(
  startDate: string,
  endDate: string,
  boroughCode?: string | null
): Promise<Request311ByNatureRow[]> {
  const conds = [
    gte(requests311.createdAt, new Date(startDate)),
    lte(requests311.createdAt, new Date(endDate + 'T23:59:59')),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(requests311.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      nature: requests311.nature,
      count: count(),
    })
    .from(requests311)
    .where(and(...conds))
    .groupBy(requests311.nature);

  return result
    .filter((r) => r.nature != null)
    .map((r) => ({
      nature: r.nature!,
      count: Number(r.count),
    }))
    .sort((a, b) => b.count - a.count);
}

/** Top ACTI_NOM categories (request_type) */
export async function getRequests311ByType(
  startDate: string,
  endDate: string,
  boroughCode?: string | null,
  limit = 15
): Promise<Request311ByTypeRow[]> {
  const conds = [
    gte(requests311.createdAt, new Date(startDate)),
    lte(requests311.createdAt, new Date(endDate + 'T23:59:59')),
    isNotNull(requests311.requestType),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(requests311.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      requestType: requests311.requestType,
      count: count(),
    })
    .from(requests311)
    .where(and(...conds))
    .groupBy(requests311.requestType)
    .orderBy(sql`count(*) DESC`)
    .limit(limit);

  return result.map((r) => ({
    requestType: r.requestType!,
    count: Number(r.count),
  }));
}

/** Status flow: Urgente → Transmise → Terminée */
export async function getRequests311ByStatus(
  boroughCode?: string | null
): Promise<Request311ByStatusRow[]> {
  const conds = [];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(requests311.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      status: requests311.status,
      count: count(),
    })
    .from(requests311)
    .where(conds.length > 0 ? and(...conds) : sql`true`)
    .groupBy(requests311.status);

  return result
    .filter((r) => r.status != null)
    .map((r) => ({
      status: r.status!,
      count: Number(r.count),
    }))
    .sort((a, b) => b.count - a.count);
}

/** 311 backlog: open requests trend over time */
export async function getRequests311BacklogTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly'
): Promise<Request311TimeSeriesPoint[]> {
  const dateTrunc =
    granularity === 'daily' ? 'day' : granularity === 'weekly' ? 'week' : 'month';
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `WITH period_series AS (
        SELECT generate_series(
          date_trunc('${dateTrunc}', '${startDate}'::date),
          '${endDate}'::date,
          CASE WHEN '${dateTrunc}' = 'day' THEN '1 day'::interval
               WHEN '${dateTrunc}' = 'week' THEN '1 week'::interval
               ELSE '1 month'::interval END
        )::date AS period
      ),
      created_per_period AS (
        SELECT date_trunc('${dateTrunc}', created_at)::date AS period,
          COUNT(*)::int AS created_cnt
        FROM requests_311
        WHERE created_at >= '${startDate}' AND created_at <= '${endDate}T23:59:59' ${boroughFilter}
        GROUP BY date_trunc('${dateTrunc}', created_at)
      ),
      closed_per_period AS (
        SELECT date_trunc('${dateTrunc}', closed_at)::date AS period,
          COUNT(*)::int AS closed_cnt
        FROM requests_311
        WHERE closed_at IS NOT NULL
          AND closed_at >= '${startDate}' AND closed_at <= '${endDate}T23:59:59' ${boroughFilter}
        GROUP BY date_trunc('${dateTrunc}', closed_at)
      )
      SELECT to_char(p.period, 'YYYY-MM-DD') AS period,
        COALESCE(cp.created_cnt, 0) AS created_count,
        COALESCE(cl.closed_cnt, 0) AS closed_count
      FROM period_series p
      LEFT JOIN created_per_period cp ON cp.period = p.period
      LEFT JOIN closed_per_period cl ON cl.period = p.period
      ORDER BY p.period`
    )
  );

  const rows = (result.rows || []) as {
    period: string;
    created_count: number;
    closed_count: number;
  }[];

  return rows.map((r) => ({
    period: r.period,
    openCount: 0,
    closedCount: Number(r.closed_count),
    createdCount: Number(r.created_count),
  }));
}

/** Response time by borough (⚠️ cross-borough comparison unreliable) */
export async function getRequests311ResponseTimeByBorough(
  startDate: string,
  endDate: string
): Promise<Request311ByBoroughRow[]> {
  const result = await db.execute(
    sql.raw(
      `SELECT borough_code,
        COUNT(*)::int AS count,
        COUNT(*) FILTER (WHERE closed_at IS NOT NULL)::int AS closed_count,
        ROUND(AVG(EXTRACT(EPOCH FROM (closed_at - created_at)) / 86400)::numeric, 1) 
          FILTER (WHERE closed_at IS NOT NULL) AS avg_resolution_days
      FROM requests_311
      WHERE created_at >= '${startDate}' AND created_at <= '${endDate}T23:59:59'
        AND borough_code IS NOT NULL
      GROUP BY borough_code
      ORDER BY count DESC`
    )
  );

  const openResult = await db.execute(
    sql.raw(
      `SELECT borough_code, COUNT(*)::int AS open_count
      FROM requests_311
      WHERE (closed_at IS NULL OR closed_at > '${endDate}'::timestamp)
        AND created_at <= '${endDate}T23:59:59'
        AND borough_code IS NOT NULL
      GROUP BY borough_code`
    )
  );

  const rows = (result.rows || []) as {
    borough_code: string;
    count: number;
    closed_count: number;
    avg_resolution_days: number | null;
  }[];
  const openRows = (openResult.rows || []) as { borough_code: string; open_count: number }[];
  const openMap = new Map(openRows.map((r) => [r.borough_code, Number(r.open_count)]));

  return rows.map((r) => ({
    boroughCode: r.borough_code,
    count: Number(r.count),
    avgResolutionDays: r.avg_resolution_days != null ? Number(r.avg_resolution_days) : null,
    openCount: openMap.get(r.borough_code) ?? 0,
  }));
}

/** Key stats */
export async function getRequests311Stats(
  boroughCode?: string | null
): Promise<Request311Stats> {
  const conds = [or(isNull(requests311.closedAt), sql`${requests311.closedAt} > now()`)];

  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(requests311.boroughCode, boroughCode));
  }

  const [openRes, typeRes, natureRes, resolutionRes] = await Promise.all([
    db.select({ count: count() }).from(requests311).where(and(...conds)),
    db
      .select({ requestType: requests311.requestType, count: count() })
      .from(requests311)
      .where(boroughCode ? eq(requests311.boroughCode, boroughCode) : sql`true`)
      .groupBy(requests311.requestType)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
    db
      .select({ nature: requests311.nature, count: count() })
      .from(requests311)
      .where(boroughCode ? eq(requests311.boroughCode, boroughCode) : sql`true`)
      .groupBy(requests311.nature)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
    db
      .select({
        avg: sql<number>`AVG(EXTRACT(EPOCH FROM (closed_at - created_at)) / 86400)`,
      })
      .from(requests311)
      .where(
        and(
          isNotNull(requests311.closedAt),
          boroughCode ? eq(requests311.boroughCode, boroughCode) : sql`true`
        )
      ),
  ]);

  return {
    openCount: Number(openRes[0]?.count ?? 0),
    avgResolutionDays:
      resolutionRes[0]?.avg != null ? Math.round(Number(resolutionRes[0].avg)) : null,
    topType: typeRes[0]?.requestType ?? null,
    topNature: natureRes[0]?.nature ?? null,
  };
}

/** Search 311 with pagination. Information requests excluded from geo queries. */
export type Request311SearchFilters = {
  boroughCode?: string | null;
  nature?: string | null;
  status?: string | null;
};

export type Request311SearchResult = {
  rows: Request311Row[];
  total: number;
  page: number;
  pageSize: number;
};

export async function searchRequests311(
  query: string,
  filters: Request311SearchFilters,
  pagination: { page: number; pageSize: number }
): Promise<Request311SearchResult> {
  const { page = 1, pageSize = 25 } = pagination;
  const offset = (page - 1) * pageSize;

  const conds = [];

  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(requests311.boroughCode, filters.boroughCode));
  }
  if (filters.nature != null && filters.nature !== '') {
    conds.push(eq(requests311.nature, filters.nature));
  }
  if (filters.status != null && filters.status !== '') {
    conds.push(eq(requests311.status, filters.status));
  }

  if (query.trim()) {
    const q = `%${query.trim()}%`;
    conds.push(
      sql`(
        ${requests311.requestId} ILIKE ${q} OR
        ${requests311.requestType} ILIKE ${q} OR
        ${requests311.nature} ILIKE ${q}
      )`
    );
  }

  const whereClause = conds.length > 0 ? and(...conds) : sql`true`;

  const [rows, totalRes] = await Promise.all([
    db
      .select({
        id: requests311.id,
        requestId: requests311.requestId,
        nature: requests311.nature,
        requestType: requests311.requestType,
        boroughCode: requests311.boroughCode,
        status: requests311.status,
        createdAt: requests311.createdAt,
        closedAt: requests311.closedAt,
        lat: latExpr,
        lng: lngExpr,
      })
      .from(requests311)
      .where(whereClause)
      .orderBy(desc(requests311.createdAt))
      .limit(pageSize)
      .offset(offset),
    db.select({ count: count() }).from(requests311).where(whereClause),
  ]);

  return {
    rows: rows.map(toRequest311Row),
    total: Number(totalRes[0]?.count ?? 0),
    page,
    pageSize,
  };
}

/** 311 map: exclude Information requests (not georeferenced) */
export async function getRequests311ForMap(
  filters: {
    boroughCode?: string | null;
    nature?: string | null;
    status?: string | null;
    startDate?: string;
    endDate?: string;
  },
  limit = 500
): Promise<
  {
    id: number;
    requestId: string | null;
    nature: string | null;
    requestType: string | null;
    status: string | null;
    boroughCode: string | null;
    createdAt: Date;
    lat: number | null;
    lng: number | null;
  }[]
> {
  const conds = [
    isNotNull(requests311.lat),
    isNotNull(requests311.lng),
    sql`(${requests311.nature} IS NULL OR ${requests311.nature}::text NOT ILIKE 'Information')`,
  ];
  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(requests311.boroughCode, filters.boroughCode));
  }
  if (filters.nature != null && filters.nature !== '') {
    conds.push(eq(requests311.nature, filters.nature));
  }
  if (filters.status != null && filters.status !== '') {
    conds.push(eq(requests311.status, filters.status));
  }
  if (filters.startDate) {
    conds.push(gte(requests311.createdAt, new Date(filters.startDate)));
  }
  if (filters.endDate) {
    conds.push(lte(requests311.createdAt, new Date(filters.endDate + 'T23:59:59')));
  }

  const rows = await db
    .select({
      id: requests311.id,
      requestId: requests311.requestId,
      nature: requests311.nature,
      requestType: requests311.requestType,
      status: requests311.status,
      boroughCode: requests311.boroughCode,
      createdAt: requests311.createdAt,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(requests311)
    .where(and(...conds))
    .orderBy(desc(requests311.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}

export async function getRequest311FilterOptions(): Promise<{
  natures: string[];
  statuses: string[];
  boroughCodes: string[];
}> {
  const [natureRes, statusRes, boroughRes] = await Promise.all([
    db
      .selectDistinct({ nature: requests311.nature })
      .from(requests311)
      .where(isNotNull(requests311.nature)),
    db
      .selectDistinct({ status: requests311.status })
      .from(requests311)
      .where(isNotNull(requests311.status)),
    db
      .selectDistinct({ boroughCode: requests311.boroughCode })
      .from(requests311)
      .where(isNotNull(requests311.boroughCode)),
  ]);

  return {
    natures: natureRes.map((r) => r.nature!).filter(Boolean).sort(),
    statuses: statusRes.map((r) => r.status!).filter(Boolean).sort(),
    boroughCodes: boroughRes.map((r) => r.boroughCode!).filter(Boolean).sort(),
  };
}

function toRequest311Row(row: {
  id: number;
  requestId: string | null;
  nature: string | null;
  requestType: string | null;
  boroughCode: string | null;
  status: string | null;
  createdAt: Date;
  closedAt: Date | null;
  lat: unknown;
  lng: unknown;
}): Request311Row {
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
