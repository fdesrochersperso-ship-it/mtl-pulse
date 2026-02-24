/**
 * Metrics computation engine — bridge between raw pipeline data and dashboard UI.
 * Frontend should ONLY read from computed_metrics, never query raw tables directly.
 */

import { db } from '@/lib/db';
import {
  travaux,
  crimeIncidents,
  constructionPermits,
  requests311,
  roadObstructions,
  fireInterventions,
  potholeRepairs,
  snowTowings,
  bedbugReports,
  airQuality,
  cyclingCounts,
  waterBreaks,
  contracts,
  electedOfficials,
  computedMetrics,
} from '@/lib/db/schema';
import { BOROUGHS } from '@/lib/constants/boroughs';
import {
  sql,
  and,
  eq,
  gte,
  lte,
  isNull,
  or,
  notInArray,
  type SQL,
} from 'drizzle-orm';
import { subDays, startOfWeek, endOfWeek, startOfYear } from 'date-fns';
import type { Database } from '@/lib/db/connection';

export type PeriodType = 'daily' | 'weekly' | 'ytd';

export interface MetricResult {
  value: number;
  previousValue?: number;
  metadata?: Record<string, unknown>;
}

export interface MetricContext {
  today: string; // YYYY-MM-DD
  boroughCode?: string | null;
}

export interface MetricDefinition {
  name: string;
  computeQuery: (
    db: Database,
    ctx: MetricContext,
  ) => Promise<MetricResult>;
  boroughAware: boolean;
  periods: PeriodType[];
}

/** Statuses considered "closed" for 311 requests */
const CLOSED_311_STATUSES = ['Terminée', 'Annulée', 'Refusée'];

/** Statuses considered "active" for travaux (flexible for FR/EN data) */
/** All metric definitions for datasets we currently ingest */
export const METRIC_DEFINITIONS: MetricDefinition[] = [
  // ─── CONSTRUCTION ─────────────────────────────────────────────────────────
  {
    name: 'active_travaux_count',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const today = ctx.today;
      const conds: SQL[] = [
        or(
          gte(travaux.endDate, today),
          isNull(travaux.endDate),
        ) as SQL,
      ];
      if (ctx.boroughCode) {
        conds.push(eq(travaux.boroughCode, ctx.boroughCode));
      }
      const statusCond = sql`(${travaux.status} IS NULL OR LOWER(${travaux.status}) LIKE '%actif%' OR LOWER(${travaux.status}) LIKE '%active%' OR LOWER(${travaux.status}) LIKE '%en cours%' OR LOWER(${travaux.status}) LIKE '%ouvert%')`;
      conds.push(statusCond);

      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(travaux)
        .where(and(...conds));

      const value = Number(row?.count ?? 0);

      return { value };
    },
  },
  {
    name: 'new_travaux_today',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [sql`${travaux.firstSeenAt}::date >= ${ctx.today}::date`];
      if (ctx.boroughCode) {
        conds.push(eq(travaux.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(travaux)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },

  // ─── CRIME ───────────────────────────────────────────────────────────────
  {
    name: 'crime_count_daily',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [eq(crimeIncidents.incidentDate, ctx.today)];
      if (ctx.boroughCode) {
        conds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },
  {
    name: 'crime_count_7d',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(crimeIncidents.incidentDate, sevenDaysAgo)];
      if (ctx.boroughCode) {
        conds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...conds));
      const value = Number(row?.count ?? 0);

      const prevSevenStart = subDays(new Date(ctx.today), 14).toISOString().slice(0, 10);
      const prevConds: SQL[] = [
        gte(crimeIncidents.incidentDate, prevSevenStart),
        lte(crimeIncidents.incidentDate, sevenDaysAgo),
      ];
      if (ctx.boroughCode) {
        prevConds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [prevRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...prevConds));
      const previousValue = Number(prevRow?.count ?? 0);

      return { value, previousValue };
    },
  },
  {
    name: 'crime_delta_vs_prev_7d',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(crimeIncidents.incidentDate, sevenDaysAgo)];
      if (ctx.boroughCode) {
        conds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [currRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...conds));
      const current7d = Number(currRow?.count ?? 0);

      const prevSevenStart = subDays(new Date(ctx.today), 14).toISOString().slice(0, 10);
      const prevConds: SQL[] = [
        gte(crimeIncidents.incidentDate, prevSevenStart),
        lte(crimeIncidents.incidentDate, sevenDaysAgo),
      ];
      if (ctx.boroughCode) {
        prevConds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [prevRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...prevConds));
      const prev7d = Number(prevRow?.count ?? 0);

      const deltaPct = prev7d > 0 ? ((current7d - prev7d) / prev7d) * 100 : 0;
      return {
        value: Math.round(deltaPct * 100) / 100,
        previousValue: prev7d,
        metadata: { current7d, prev7d },
      };
    },
  },
  {
    name: 'crime_vs_30d_avg',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const thirtyDaysAgo = subDays(new Date(ctx.today), 30).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(crimeIncidents.incidentDate, thirtyDaysAgo)];
      if (ctx.boroughCode) {
        conds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...conds));
      const total30d = Number(row?.count ?? 0);
      const avgPerDay = total30d / 30;
      const expectedWeek = avgPerDay * 7;

      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const currConds: SQL[] = [gte(crimeIncidents.incidentDate, sevenDaysAgo)];
      if (ctx.boroughCode) {
        currConds.push(eq(crimeIncidents.boroughCode, ctx.boroughCode));
      }
      const [currRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(crimeIncidents)
        .where(and(...currConds));
      const currentWeek = Number(currRow?.count ?? 0);

      const ratio = expectedWeek > 0 ? currentWeek / expectedWeek : 0;
      return {
        value: Math.round(ratio * 1000) / 1000,
        previousValue: expectedWeek,
        metadata: { currentWeek, expectedWeek, total30d },
      };
    },
  },

  // ─── PERMITS ─────────────────────────────────────────────────────────────
  {
    name: 'permits_count_week',
    boroughAware: true,
    periods: ['weekly'],
    computeQuery: async (d, ctx) => {
      const weekStart = startOfWeek(new Date(ctx.today), { weekStartsOn: 1 }).toISOString().slice(0, 10);
      const weekEnd = endOfWeek(new Date(ctx.today), { weekStartsOn: 1 }).toISOString().slice(0, 10);
      const conds: SQL[] = [
        gte(constructionPermits.dateIssued, weekStart),
        lte(constructionPermits.dateIssued, weekEnd),
      ];
      if (ctx.boroughCode) {
        conds.push(eq(constructionPermits.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(constructionPermits)
        .where(and(...conds));
      const value = Number(row?.count ?? 0);

      const prevWeekStart = subDays(new Date(weekStart), 7).toISOString().slice(0, 10);
      const prevWeekEnd = subDays(new Date(weekEnd), 7).toISOString().slice(0, 10);
      const prevConds: SQL[] = [
        gte(constructionPermits.dateIssued, prevWeekStart),
        lte(constructionPermits.dateIssued, prevWeekEnd),
      ];
      if (ctx.boroughCode) {
        prevConds.push(eq(constructionPermits.boroughCode, ctx.boroughCode));
      }
      const [prevRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(constructionPermits)
        .where(and(...prevConds));
      const previousValue = Number(prevRow?.count ?? 0);

      return { value, previousValue };
    },
  },
  {
    name: 'permits_total_value_week',
    boroughAware: true,
    periods: ['weekly'],
    computeQuery: async (d, ctx) => {
      const weekStart = startOfWeek(new Date(ctx.today), { weekStartsOn: 1 }).toISOString().slice(0, 10);
      const weekEnd = endOfWeek(new Date(ctx.today), { weekStartsOn: 1 }).toISOString().slice(0, 10);
      const conds: SQL[] = [
        gte(constructionPermits.dateIssued, weekStart),
        lte(constructionPermits.dateIssued, weekEnd),
      ];
      if (ctx.boroughCode) {
        conds.push(eq(constructionPermits.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ total: sql<number>`coalesce(sum(${constructionPermits.estimatedCost}), 0)` })
        .from(constructionPermits)
        .where(and(...conds));
      const value = Number(row?.total ?? 0);

      const prevWeekStart = subDays(new Date(weekStart), 7).toISOString().slice(0, 10);
      const prevWeekEnd = subDays(new Date(weekEnd), 7).toISOString().slice(0, 10);
      const prevConds: SQL[] = [
        gte(constructionPermits.dateIssued, prevWeekStart),
        lte(constructionPermits.dateIssued, prevWeekEnd),
      ];
      if (ctx.boroughCode) {
        prevConds.push(eq(constructionPermits.boroughCode, ctx.boroughCode));
      }
      const [prevRow] = await d
        .select({ total: sql<number>`coalesce(sum(${constructionPermits.estimatedCost}), 0)` })
        .from(constructionPermits)
        .where(and(...prevConds));
      const previousValue = Number(prevRow?.total ?? 0);

      return { value, previousValue };
    },
  },

  // ─── 311 REQUESTS ─────────────────────────────────────────────────────────
  {
    name: 'requests_311_new_today',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [sql`${requests311.createdAt}::date = ${ctx.today}::date`];
      if (ctx.boroughCode) {
        conds.push(eq(requests311.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(requests311)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },
  {
    name: 'requests_311_open',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [
        or(
          isNull(requests311.status),
          notInArray(requests311.status, CLOSED_311_STATUSES),
        ) as SQL,
      ];
      if (ctx.boroughCode) {
        conds.push(eq(requests311.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(requests311)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },
  {
    name: 'requests_311_avg_resolution_days',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [
        sql`${requests311.closedAt} IS NOT NULL`,
        sql`${requests311.createdAt} IS NOT NULL`,
      ];
      if (ctx.boroughCode) {
        conds.push(eq(requests311.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({
          avgDays: sql<number>`extract(epoch from avg(${requests311.closedAt} - ${requests311.createdAt}))/86400`,
        })
        .from(requests311)
        .where(and(...conds));
      const value = Number(row?.avgDays ?? 0);
      return { value: Math.round(value * 10) / 10 };
    },
  },

  // ─── ROAD OBSTRUCTIONS ─────────────────────────────────────────────────────
  {
    name: 'active_obstructions',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [];
      if (ctx.boroughCode) {
        conds.push(eq(roadObstructions.boroughCode, ctx.boroughCode));
      }
      const q = conds.length > 0
        ? d.select({ count: sql<number>`count(*)::int` }).from(roadObstructions).where(and(...conds))
        : d.select({ count: sql<number>`count(*)::int` }).from(roadObstructions);
      const [row] = await q;
      return { value: Number(row?.count ?? 0) };
    },
  },

  // ─── FIRE ─────────────────────────────────────────────────────────────────
  {
    name: 'fire_interventions_7d',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(fireInterventions.incidentDate, sevenDaysAgo)];
      if (ctx.boroughCode) {
        conds.push(eq(fireInterventions.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(fireInterventions)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },
  {
    name: 'fire_false_alarm_rate',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [];
      if (ctx.boroughCode) {
        conds.push(eq(fireInterventions.boroughCode, ctx.boroughCode));
      }
      const baseWhere = conds.length > 0 ? and(...conds) : undefined;

      const [totalRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(fireInterventions)
        .where(baseWhere);
      const total = Number(totalRow?.count ?? 0);

      const falseAlarmCond = sql`LOWER(${fireInterventions.incidentType}) LIKE '%fausses alertes%'`;
      const faConds = [...conds, falseAlarmCond];
      const [faRow] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(fireInterventions)
        .where(and(...faConds));
      const falseAlarms = Number(faRow?.count ?? 0);

      const rate = total > 0 ? (falseAlarms / total) * 100 : 0;
      return {
        value: Math.round(rate * 10) / 10,
        metadata: { total, falseAlarms },
      };
    },
  },

  // ─── POTHOLES ─────────────────────────────────────────────────────────────
  {
    name: 'potholes_repaired_ytd',
    boroughAware: true,
    periods: ['ytd'],
    computeQuery: async (d, ctx) => {
      const jan1 = startOfYear(new Date(ctx.today)).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(potholeRepairs.repairDate, jan1)];
      if (ctx.boroughCode) {
        conds.push(eq(potholeRepairs.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(potholeRepairs)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },
  {
    name: 'potholes_repaired_7d',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(potholeRepairs.repairDate, sevenDaysAgo)];
      if (ctx.boroughCode) {
        conds.push(eq(potholeRepairs.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(potholeRepairs)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },

  // ─── TOWINGS ───────────────────────────────────────────────────────────────
  {
    name: 'towing_count_today',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [sql`date(${snowTowings.towingDate}) >= ${ctx.today}`];
      if (ctx.boroughCode) {
        conds.push(eq(snowTowings.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(snowTowings)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },
  {
    name: 'towing_count_7d',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const conds: SQL[] = [sql`date(${snowTowings.towingDate}) >= ${sevenDaysAgo}`];
      if (ctx.boroughCode) {
        conds.push(eq(snowTowings.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(snowTowings)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },

  // ─── BEDBUGS ───────────────────────────────────────────────────────────────
  {
    name: 'bedbug_reports_ytd',
    boroughAware: true,
    periods: ['ytd'],
    computeQuery: async (d, ctx) => {
      const jan1 = startOfYear(new Date(ctx.today)).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(bedbugReports.reportDate, jan1)];
      if (ctx.boroughCode) {
        conds.push(eq(bedbugReports.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(bedbugReports)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },

  // ─── AIR QUALITY ───────────────────────────────────────────────────────────
  {
    name: 'air_quality_current',
    boroughAware: false,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const sevenDaysAgo = subDays(new Date(ctx.today), 7).toISOString().slice(0, 10);
      const [row] = await d
        .select({
          maxVal: sql<number>`MAX((${airQuality.value})::numeric)`,
        })
        .from(airQuality)
        .where(
          and(
            gte(airQuality.readingDate, sevenDaysAgo),
            lte(airQuality.readingDate, ctx.today)
          )
        );
      const value = Number(row?.maxVal ?? 0);
      return { value };
    },
  },

  // ─── CYCLING ────────────────────────────────────────────────────────────────
  {
    name: 'cycling_volume_today',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [eq(cyclingCounts.periodDate, ctx.today)];
      if (ctx.boroughCode) {
        conds.push(eq(cyclingCounts.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({
          total: sql<number>`COALESCE(SUM(${cyclingCounts.volume}), 0)`,
        })
        .from(cyclingCounts)
        .where(and(...conds));
      return { value: Number(row?.total ?? 0) };
    },
  },

  // ─── WATER BREAKS ──────────────────────────────────────────────────────────
  {
    name: 'water_breaks_ytd',
    boroughAware: true,
    periods: ['ytd'],
    computeQuery: async (d, ctx) => {
      const jan1 = startOfYear(new Date(ctx.today)).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(waterBreaks.breakDate, jan1)];
      if (ctx.boroughCode) {
        conds.push(eq(waterBreaks.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({ count: sql<number>`count(*)::int` })
        .from(waterBreaks)
        .where(and(...conds));
      return { value: Number(row?.count ?? 0) };
    },
  },

  // ─── CONTRACTS ──────────────────────────────────────────────────────────────
  {
    name: 'contracts_value_ytd',
    boroughAware: true,
    periods: ['ytd'],
    computeQuery: async (d, ctx) => {
      const jan1 = startOfYear(new Date(ctx.today)).toISOString().slice(0, 10);
      const conds: SQL[] = [gte(contracts.awardDate, jan1)];
      if (ctx.boroughCode) {
        conds.push(eq(contracts.boroughCode, ctx.boroughCode));
      }
      const [row] = await d
        .select({
          total: sql<number>`COALESCE(SUM((${contracts.amount})::numeric), 0)`,
        })
        .from(contracts)
        .where(and(...conds));
      return { value: Number(row?.total ?? 0) };
    },
  },

  // ─── ELECTED OFFICIALS ───────────────────────────────────────────────────────
  {
    name: 'elected_officials_count',
    boroughAware: true,
    periods: ['daily'],
    computeQuery: async (d, ctx) => {
      const conds: SQL[] = [];
      if (ctx.boroughCode) {
        conds.push(eq(electedOfficials.boroughCode, ctx.boroughCode));
      }
      const q =
        conds.length > 0
          ? d.select({ count: sql<number>`count(*)::int` }).from(electedOfficials).where(and(...conds))
          : d.select({ count: sql<number>`count(*)::int` }).from(electedOfficials);
      const [row] = await q;
      return { value: Number(row?.count ?? 0) };
    },
  },
];

/** Upsert a computed metric into the database */
async function upsertMetric(
  metricName: string,
  boroughCode: string | null,
  periodType: string,
  periodDate: string,
  value: number,
  previousValue: number | undefined,
  metadata: Record<string, unknown> | undefined,
): Promise<void> {
  await db
    .insert(computedMetrics)
    .values({
      metricName,
      boroughCode,
      periodType,
      periodDate,
      value: String(value),
      previousValue: previousValue != null ? String(previousValue) : null,
      metadata: metadata ?? null,
    })
    .onConflictDoUpdate({
      target: [
        computedMetrics.metricName,
        computedMetrics.boroughCode,
        computedMetrics.periodType,
        computedMetrics.periodDate,
      ],
      set: {
        value: String(value),
        previousValue: previousValue != null ? String(previousValue) : null,
        metadata: metadata ?? null,
        computedAt: sql`now()`,
      },
    });
}

/** Run all metric computations and upsert into computed_metrics */
export async function runMetricComputations(today?: Date): Promise<void> {
  const refDate = today ?? new Date();
  const todayStr = refDate.toISOString().slice(0, 10);
  const periodType = 'current';

  for (const def of METRIC_DEFINITIONS) {
    const boroughCodes = def.boroughAware
      ? [null, ...(Object.keys(BOROUGHS) as (keyof typeof BOROUGHS)[])]
      : [null];

    for (const boroughCode of boroughCodes) {
      const ctx: MetricContext = {
        today: todayStr,
        boroughCode: boroughCode ?? undefined,
      };
      const result = await def.computeQuery(db, ctx);
      await upsertMetric(
        def.name,
        boroughCode,
        periodType,
        todayStr,
        result.value,
        result.previousValue,
        result.metadata,
      );
    }
  }
}
