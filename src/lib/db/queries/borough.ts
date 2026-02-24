/**
 * Borough-specific data access layer.
 * Used by /borough/[code] and /borough/ pages.
 */

import { db } from '@/lib/db';
import {
  computedMetrics,
  electedOfficials,
  boroughs,
} from '@/lib/db/schema';
import {
  eq,
  and,
  asc,
  isNull,
  isNotNull,
  or,
  inArray,
} from 'drizzle-orm';
import { subDays } from 'date-fns';
import { BOROUGHS } from '@/lib/constants/boroughs';
import { getBoroughComparison } from './metrics';

export interface BoroughMetricWithComparison {
  metricName: string;
  value: number;
  cityAvg: number;
  vsAvg: 'better' | 'worse' | 'neutral';
  deltaPct: number | null;
  labelKey: { fr: string; en: string };
  format: (n: number) => string;
}

/** Metric definitions for borough scorecard. Lower-is-better = green when below avg */
const SCORECARD_METRICS = [
  {
    metricName: 'crime_count_7d',
    labelKey: { fr: 'Criminalité (7j)', en: 'Crime (7d)' },
    lowerIsBetter: true,
    format: (n: number) => n.toLocaleString('fr-CA'),
  },
  {
    metricName: 'active_travaux_count',
    labelKey: { fr: 'Chantiers actifs', en: 'Active construction' },
    lowerIsBetter: true,
    format: (n: number) => n.toLocaleString('fr-CA'),
  },
  {
    metricName: 'requests_311_avg_resolution_days',
    labelKey: { fr: 'Délai 311 (jours)', en: '311 response (days)' },
    lowerIsBetter: true,
    format: (n: number) => n.toFixed(1),
  },
  {
    metricName: 'permits_count_week',
    labelKey: { fr: 'Permis cette semaine', en: 'Permits this week' },
    lowerIsBetter: false,
    format: (n: number) => n.toLocaleString('fr-CA'),
  },
  {
    metricName: 'fire_interventions_7d',
    labelKey: { fr: 'Interventions pompiers (7j)', en: 'Fire interventions (7d)' },
    lowerIsBetter: true,
    format: (n: number) => n.toLocaleString('fr-CA'),
  },
  {
    metricName: 'potholes_repaired_ytd',
    labelKey: { fr: 'Nids-de-poule réparés (YTD)', en: 'Potholes repaired (YTD)' },
    lowerIsBetter: false,
    format: (n: number) => n.toLocaleString('fr-CA'),
  },
] as const;

/** Get all scorecard metrics for one borough with city average comparison */
export async function getBoroughMetrics(
  boroughCode: string
): Promise<BoroughMetricWithComparison[]> {
  const today = new Date().toISOString().slice(0, 10);
  const metricNames = SCORECARD_METRICS.map((m) => m.metricName);

  // Borough metrics
  const boroughRows = await db
    .select()
    .from(computedMetrics)
    .where(
      and(
        eq(computedMetrics.periodType, 'current'),
        eq(computedMetrics.periodDate, today),
        eq(computedMetrics.boroughCode, boroughCode),
        inArray(computedMetrics.metricName, [...metricNames])
      )
    );

  // City-wide metrics (boroughCode IS NULL)
  const cityRows = await db
    .select()
    .from(computedMetrics)
    .where(
      and(
        eq(computedMetrics.periodType, 'current'),
        eq(computedMetrics.periodDate, today),
        isNull(computedMetrics.boroughCode),
        inArray(computedMetrics.metricName, [...metricNames])
      )
    );

  const boroughMap = new Map(
    boroughRows.map((r) => [r.metricName, Number(r.value)])
  );
  const cityMap = new Map(
    cityRows.map((r) => [r.metricName, Number(r.value)])
  );

  return SCORECARD_METRICS.map((def) => {
    const value = boroughMap.get(def.metricName) ?? 0;
    const cityAvg = cityMap.get(def.metricName) ?? 0;
    let vsAvg: 'better' | 'worse' | 'neutral' = 'neutral';
    let deltaPct: number | null = null;

    if (cityAvg > 0) {
      const pct = ((value - cityAvg) / cityAvg) * 100;
      deltaPct = Math.round(pct * 10) / 10;
      if (def.lowerIsBetter) {
        vsAvg = value < cityAvg ? 'better' : value > cityAvg ? 'worse' : 'neutral';
      } else {
        vsAvg = value > cityAvg ? 'better' : value < cityAvg ? 'worse' : 'neutral';
      }
    }

    return {
      ...def,
      value,
      cityAvg,
      vsAvg,
      deltaPct,
    };
  });
}

export interface BoroughRanking {
  metricName: string;
  rank: number;
  totalBoroughs: number;
  /** Human-readable: "safest", "fastest 311", etc. */
  labelKey: { fr: string; en: string };
}

/** Get rank position for each scorecard metric. Rank 1 = best. */
export async function getBoroughRankings(
  boroughCode: string
): Promise<BoroughRanking[]> {
  const today = new Date().toISOString().slice(0, 10);
  const results: BoroughRanking[] = [];

  const rankLabels: Record<
    string,
    { fr: string; en: string; lowerIsBetter: boolean }
  > = {
    crime_count_7d: { fr: 'sécuritaire', en: 'safest', lowerIsBetter: true },
    active_travaux_count: {
      fr: 'moins de chantiers',
      en: 'least construction',
      lowerIsBetter: true,
    },
    requests_311_avg_resolution_days: {
      fr: 'délai 311',
      en: '311 response time',
      lowerIsBetter: true,
    },
    permits_count_week: {
      fr: 'permis',
      en: 'permits',
      lowerIsBetter: false,
    },
    fire_interventions_7d: {
      fr: 'interventions pompiers',
      en: 'fire interventions',
      lowerIsBetter: true,
    },
    potholes_repaired_ytd: {
      fr: 'réparations nids-de-poule',
      en: 'pothole repairs',
      lowerIsBetter: false,
    },
  };

  for (const def of SCORECARD_METRICS) {
    const ranking = await getBoroughComparison(def.metricName, today);
    const totalBoroughs = ranking.length;
    if (totalBoroughs === 0) continue;

    let ordered = ranking;
    if (def.lowerIsBetter) {
      ordered = [...ranking].sort((a, b) => a.value - b.value);
    }

    const idx = ordered.findIndex((r) => r.boroughCode === boroughCode);
    const rank = idx >= 0 ? idx + 1 : 0;
    const labels = rankLabels[def.metricName] ?? {
      fr: def.metricName,
      en: def.metricName,
      lowerIsBetter: false,
    };

    if (rank > 0) {
      results.push({
        metricName: def.metricName,
        rank,
        totalBoroughs,
        labelKey: { fr: labels.fr, en: labels.en },
      });
    }
  }

  return results;
}

export interface BoroughSummary {
  code: string;
  name: string;
  population: number;
  crimeCount7d: number;
  activeTravaux: number;
  permitsWeek: number;
}

/** Get overview data for borough index page. Supports sort. */
export async function getAllBoroughsSummary(
  sortBy: 'name' | 'population' | 'crime' | 'construction' = 'name'
): Promise<BoroughSummary[]> {
  const today = new Date().toISOString().slice(0, 10);

  const boroughRows = await db
    .select()
    .from(boroughs)
    .where(isNotNull(boroughs.code));

  const metricRows = await db
    .select()
    .from(computedMetrics)
    .where(
      and(
        eq(computedMetrics.periodType, 'current'),
        eq(computedMetrics.periodDate, today),
        isNotNull(computedMetrics.boroughCode),
        or(
          eq(computedMetrics.metricName, 'crime_count_7d'),
          eq(computedMetrics.metricName, 'active_travaux_count'),
          eq(computedMetrics.metricName, 'permits_count_week')
        )!
      )
    );

  const crimeMap = new Map<string, number>();
  const travauxMap = new Map<string, number>();
  const permitsMap = new Map<string, number>();
  for (const r of metricRows) {
    if (!r.boroughCode) continue;
    const v = Number(r.value);
    if (r.metricName === 'crime_count_7d') crimeMap.set(r.boroughCode, v);
    else if (r.metricName === 'active_travaux_count')
      travauxMap.set(r.boroughCode, v);
    else if (r.metricName === 'permits_count_week')
      permitsMap.set(r.boroughCode, v);
  }

  const summaries: BoroughSummary[] = boroughRows.map((r) => {
    const code = r.code;
    const info = BOROUGHS[code as keyof typeof BOROUGHS];
    return {
      code,
      name: info?.name ?? r.name,
      population: info?.population ?? r.population ?? 0,
      crimeCount7d: crimeMap.get(code) ?? 0,
      activeTravaux: travauxMap.get(code) ?? 0,
      permitsWeek: permitsMap.get(code) ?? 0,
    };
  });

  if (sortBy === 'name') {
    summaries.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'population') {
    summaries.sort((a, b) => b.population - a.population);
  } else if (sortBy === 'crime') {
    summaries.sort((a, b) => a.crimeCount7d - b.crimeCount7d);
  } else if (sortBy === 'construction') {
    summaries.sort((a, b) => b.activeTravaux - a.activeTravaux);
  }

  return summaries;
}

export interface ElectedOfficialRow {
  name: string;
  functionType: string | null;
  party: string | null;
}

/** Get elected officials for a borough. Maire d'arrondissement, Conseiller, etc. */
export async function getElectedOfficialsByBorough(
  boroughCode: string
): Promise<ElectedOfficialRow[]> {
  const today = new Date().toISOString().slice(0, 10);
  const rows = await db
    .select({
      name: electedOfficials.name,
      functionType: electedOfficials.functionType,
      party: electedOfficials.party,
    })
    .from(electedOfficials)
    .where(eq(electedOfficials.boroughCode, boroughCode))
    .orderBy(asc(electedOfficials.functionType));

  return rows.map((r) => ({
    name: r.name,
    functionType: r.functionType ?? null,
    party: r.party ?? null,
  }));
}

/** Get borough by code (from DB or fallback to constants) */
export async function getBoroughByCode(
  code: string
): Promise<{ code: string; name: string; population: number } | null> {
  const info = BOROUGHS[code as keyof typeof BOROUGHS];
  if (info) {
    return {
      code,
      name: info.name,
      population: info.population,
    };
  }
  const [row] = await db
    .select()
    .from(boroughs)
    .where(eq(boroughs.code, code))
    .limit(1);
  if (!row) return null;
  return {
    code: row.code,
    name: row.name,
    population: row.population ?? 0,
  };
}

/** Metric names used for borough trend mini-charts */
export const BOROUGH_TREND_METRICS = [
  'crime_count_7d',
  'active_travaux_count',
  'permits_count_week',
  'requests_311_open',
  'fire_interventions_7d',
  'potholes_repaired_ytd',
] as const;
