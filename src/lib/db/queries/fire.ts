/**
 * Data access layer for fire department interventions.
 * Supports interventions by DESCRIPTION_GROUPE, false alarm rate,
 * units deployed distribution, and map (location obfuscated to intersection).
 */

import { db } from '@/lib/db';
import { fireInterventions } from '@/lib/db/schema';
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

export type FireInterventionRow = {
  id: number;
  externalId: string | null;
  incidentType: string | null;
  incidentDate: string | null;
  station: string | null;
  boroughCode: string | null;
  numUnits: number | null;
  lat: number | null;
  lng: number | null;
};

export type FireByTypeRow = {
  incidentType: string;
  count: number;
};

export type FireFalseAlarmByBoroughRow = {
  boroughCode: string;
  totalCount: number;
  falseAlarmCount: number;
  falseAlarmRate: number;
};

export type FireTimeSeriesPoint = {
  period: string;
  count: number;
  falseAlarmCount: number;
  falseAlarmRate: number;
};

export type FireUnitsDistributionRow = {
  numUnits: number;
  count: number;
};

export type FireStats = {
  todayCount: number;
  total7d: number;
  falseAlarmRate: number | null;
  topType: string | null;
};

const latExpr = sql<string | null>`(${fireInterventions.lat})::numeric`;
const lngExpr = sql<string | null>`(${fireInterventions.lng})::numeric`;

/** 6 DESCRIPTION_GROUPE categories */
const FIRE_TYPE_LABELS: Record<string, { fr: string; en: string }> = {
  'Incendies bâtiments': { fr: 'Incendies bâtiments', en: 'Building fires' },
  'Autres incendies': { fr: 'Autres incendies', en: 'Other fires' },
  'Alarmes-incendie': { fr: 'Alarmes-incendie', en: 'Fire alarms' },
  'Sans incendie': { fr: 'Sans incendie', en: 'No fire' },
  'Premiers répondants': { fr: 'Premiers répondants', en: 'First responders' },
  'Fausses alertes': { fr: 'Fausses alertes', en: 'False alarms' },
};

export function getFireTypeLabel(type: string, locale: 'fr' | 'en'): string {
  return FIRE_TYPE_LABELS[type]?.[locale] ?? type;
}

/** Interventions by DESCRIPTION_GROUPE */
export async function getFireInterventionsByType(
  startDate: string,
  endDate: string,
  boroughCode?: string | null
): Promise<FireByTypeRow[]> {
  const conds = [
    gte(fireInterventions.incidentDate, startDate),
    lte(fireInterventions.incidentDate, endDate),
    isNotNull(fireInterventions.incidentType),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(fireInterventions.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      incidentType: fireInterventions.incidentType,
      count: count(),
    })
    .from(fireInterventions)
    .where(and(...conds))
    .groupBy(fireInterventions.incidentType)
    .orderBy(sql`count(*) DESC`);

  return result.map((r) => ({
    incidentType: r.incidentType!,
    count: Number(r.count),
  }));
}

/** False alarm rate by borough */
export async function getFireFalseAlarmRateByBorough(
  startDate: string,
  endDate: string
): Promise<FireFalseAlarmByBoroughRow[]> {
  const result = await db.execute(
    sql.raw(
      `SELECT borough_code,
        COUNT(*)::int AS total_count,
        COUNT(*) FILTER (WHERE incident_type ILIKE '%Fausse%')::int AS false_count
      FROM fire_interventions
      WHERE incident_date >= '${startDate}' AND incident_date <= '${endDate}'
        AND borough_code IS NOT NULL
      GROUP BY borough_code
      ORDER BY total_count DESC`
    )
  );

  const rows = (result.rows || []) as {
    borough_code: string;
    total_count: number;
    false_count: number;
  }[];

  return rows.map((r) => {
    const total = Number(r.total_count);
    const falseCount = Number(r.false_count);
    return {
      boroughCode: r.borough_code,
      totalCount: total,
      falseAlarmCount: falseCount,
      falseAlarmRate: total > 0 ? Math.round((falseCount / total) * 1000) / 10 : 0,
    };
  });
}

/** False alarm rate trend over time */
export async function getFireFalseAlarmTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly'
): Promise<FireTimeSeriesPoint[]> {
  const dateTrunc =
    granularity === 'daily' ? 'day' : granularity === 'weekly' ? 'week' : 'month';
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `SELECT date_trunc('${dateTrunc}', incident_date::date)::date AS period,
        COUNT(*)::int AS cnt,
        COUNT(*) FILTER (WHERE incident_type ILIKE '%Fausse%')::int AS false_cnt
      FROM fire_interventions
      WHERE incident_date >= '${startDate}' AND incident_date <= '${endDate}' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', incident_date)
      ORDER BY period`
    )
  );

  const rows = (result.rows || []) as {
    period: Date | string;
    cnt: number;
    false_cnt: number;
  }[];

  return rows.map((r) => {
    const period = typeof r.period === 'string' ? r.period : r.period.toISOString().slice(0, 10);
    const total = Number(r.cnt);
    const falseCount = Number(r.false_cnt);
    return {
      period,
      count: total,
      falseAlarmCount: falseCount,
      falseAlarmRate: total > 0 ? Math.round((falseCount / total) * 1000) / 10 : 0,
    };
  });
}

/** Units deployed distribution (NOMBRE_UNITES per intervention) */
export async function getFireUnitsDistribution(
  startDate: string,
  endDate: string,
  boroughCode?: string | null
): Promise<FireUnitsDistributionRow[]> {
  const conds = [
    gte(fireInterventions.incidentDate, startDate),
    lte(fireInterventions.incidentDate, endDate),
    isNotNull(fireInterventions.numUnits),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(fireInterventions.boroughCode, boroughCode));
  }

  const result = await db
    .select({
      numUnits: fireInterventions.numUnits,
      count: count(),
    })
    .from(fireInterventions)
    .where(and(...conds))
    .groupBy(fireInterventions.numUnits)
    .orderBy(fireInterventions.numUnits);

  return result.map((r) => ({
    numUnits: Number(r.numUnits),
    count: Number(r.count),
  }));
}

/** Key stats */
export async function getFireStats(
  boroughCode?: string | null
): Promise<FireStats> {
  const todayStr = new Date().toISOString().slice(0, 10);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekStartStr = weekStart.toISOString().slice(0, 10);

  const conds = [gte(fireInterventions.incidentDate, weekStartStr)];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(fireInterventions.boroughCode, boroughCode));
  }

  const [todayRes, totalRes, typeRes, falseRes] = await Promise.all([
    db
      .select({ count: count() })
      .from(fireInterventions)
      .where(
        boroughCode
          ? and(eq(fireInterventions.incidentDate, todayStr), eq(fireInterventions.boroughCode, boroughCode))
          : eq(fireInterventions.incidentDate, todayStr)
      ),
    db.select({ count: count() }).from(fireInterventions).where(and(...conds)),
    db
      .select({ incidentType: fireInterventions.incidentType, count: count() })
      .from(fireInterventions)
      .where(and(...conds))
      .groupBy(fireInterventions.incidentType)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
    db
      .select({
        total: count(),
        falseCount: sql<number>`COUNT(*) FILTER (WHERE incident_type ILIKE '%Fausse%')`,
      })
      .from(fireInterventions)
      .where(and(...conds)),
  ]);

  const total = Number(totalRes[0]?.count ?? 0);
  const falseCount = Number(falseRes[0]?.falseCount ?? 0);

  return {
    todayCount: Number(todayRes[0]?.count ?? 0),
    total7d: total,
    falseAlarmRate: total > 0 ? Math.round((falseCount / total) * 1000) / 10 : null,
    topType: typeRes[0]?.incidentType ?? null,
  };
}

/** Fire interventions for map (location obfuscated to intersection per caveat) */
export async function getFireInterventionsForMap(
  filters: {
    boroughCode?: string | null;
    incidentType?: string | null;
    startDate?: string;
    endDate?: string;
  },
  limit = 500
): Promise<
  {
    id: number;
    externalId: string | null;
    incidentType: string | null;
    incidentDate: string | null;
    boroughCode: string | null;
    numUnits: number | null;
    lat: number | null;
    lng: number | null;
  }[]
> {
  const conds = [
    isNotNull(fireInterventions.lat),
    isNotNull(fireInterventions.lng),
  ];
  if (filters.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(fireInterventions.boroughCode, filters.boroughCode));
  }
  if (filters.incidentType != null && filters.incidentType !== '') {
    conds.push(eq(fireInterventions.incidentType, filters.incidentType));
  }
  if (filters.startDate) {
    conds.push(gte(fireInterventions.incidentDate, filters.startDate));
  }
  if (filters.endDate) {
    conds.push(lte(fireInterventions.incidentDate, filters.endDate));
  }

  const rows = await db
    .select({
      id: fireInterventions.id,
      externalId: fireInterventions.externalId,
      incidentType: fireInterventions.incidentType,
      incidentDate: fireInterventions.incidentDate,
      boroughCode: fireInterventions.boroughCode,
      numUnits: fireInterventions.numUnits,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(fireInterventions)
    .where(and(...conds))
    .orderBy(desc(fireInterventions.incidentDate))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    incidentDate: r.incidentDate != null ? String(r.incidentDate).slice(0, 10) : null,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}

/** Time series for trend chart */
export async function getFireInterventionsTimeSeries(
  boroughCode: string | null | undefined,
  startDate: string,
  endDate: string,
  granularity: 'daily' | 'weekly' | 'monthly'
): Promise<{ period: string; count: number; previousYearCount?: number }[]> {
  const dateTrunc =
    granularity === 'daily' ? 'day' : granularity === 'weekly' ? 'week' : 'month';
  const boroughFilter =
    boroughCode != null && boroughCode !== ''
      ? `AND borough_code = '${boroughCode.replace(/'/g, "''")}'`
      : '';

  const result = await db.execute(
    sql.raw(
      `SELECT date_trunc('${dateTrunc}', incident_date::date)::date AS period,
        COUNT(*)::int AS cnt
      FROM fire_interventions
      WHERE incident_date >= '${startDate}' AND incident_date <= '${endDate}' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', incident_date)
      ORDER BY period`
    )
  );

  const rows = (result.rows || []) as { period: Date | string; cnt: number }[];
  const points = rows.map((r) => ({
    period: typeof r.period === 'string' ? r.period : r.period.toISOString().slice(0, 10),
    count: Number(r.cnt),
  }));

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
      `SELECT date_trunc('${dateTrunc}', incident_date::date)::date AS period,
        COUNT(*)::int AS cnt
      FROM fire_interventions
      WHERE incident_date >= '${prevStart}' AND incident_date <= '${prevEnd}' ${boroughFilter}
      GROUP BY date_trunc('${dateTrunc}', incident_date)
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

/** By borough for comparison */
export async function getFireInterventionsByBorough(
  startDate: string,
  endDate: string
): Promise<{ boroughCode: string; count: number }[]> {
  const result = await db
    .select({
      boroughCode: fireInterventions.boroughCode,
      count: count(),
    })
    .from(fireInterventions)
    .where(
      and(
        gte(fireInterventions.incidentDate, startDate),
        lte(fireInterventions.incidentDate, endDate),
        isNotNull(fireInterventions.boroughCode)
      )
    )
    .groupBy(fireInterventions.boroughCode)
    .orderBy(sql`count(*) DESC`);

  return result
    .filter((r): r is typeof r & { boroughCode: string } => r.boroughCode != null)
    .map((r) => ({
      boroughCode: r.boroughCode,
      count: Number(r.count),
    }));
}
