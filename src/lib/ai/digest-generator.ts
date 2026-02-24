/**
 * DigestGenerator — orchestrates metric fetch, prompt build, Claude call, and storage.
 * Generates daily, weekly, and borough digests in both FR and EN.
 */

import { runMetricComputations } from '@/lib/pipeline/metrics-computer';
import {
  getAllMetricsForDate,
  getBoroughComparison,
  type ComputedMetricRow,
} from '@/lib/db/queries/metrics';
import { getDigestByPeriod, insertDigest } from '@/lib/db/queries/digests';
import { generateDigest } from './claude-client';
import { buildDailyDigestPrompt } from './prompts/daily-digest';
import { buildWeeklyDigestPrompt } from './prompts/weekly-digest';
import { buildBoroughDigestPrompt } from './prompts/borough-digest';
import type { DigestLanguage } from './types';
import { BOROUGHS } from '@/lib/constants/boroughs';
import { startOfWeek, endOfWeek, subDays } from 'date-fns';

const MODEL_ID = 'claude-sonnet-4-20250514';

function getMetricValue(
  rows: ComputedMetricRow[],
  name: string,
  boroughCode?: string | null,
): number {
  const row = rows.find(
    (r) =>
      r.metricName === name &&
      ((boroughCode == null && r.boroughCode == null) || r.boroughCode === boroughCode),
  );
  return row?.value ?? 0;
}

function getMetricPrevValue(
  rows: ComputedMetricRow[],
  name: string,
  boroughCode?: string | null,
): number | null {
  const row = rows.find(
    (r) =>
      r.metricName === name &&
      ((boroughCode == null && r.boroughCode == null) || r.boroughCode === boroughCode),
  );
  return row?.previousValue ?? null;
}

export class DigestGenerator {
  /**
   * Generate daily digest for a date.
   * Runs metrics for that date if needed, then generates FR + EN digests.
   */
  async generateDaily(
    date: string,
    language?: DigestLanguage,
  ): Promise<{ fr?: { id: number }; en?: { id: number } }> {
    await runMetricComputations(new Date(date));
    const targetDate = date.slice(0, 10);
    const result: { fr?: { id: number }; en?: { id: number } } = {};

    const langs: DigestLanguage[] = language ? [language] : ['fr', 'en'];
    for (const lang of langs) {
      const existing = await getDigestByPeriod('daily', targetDate, lang);
      if (existing) {
        continue;
      }

      const digest = await this.buildAndGenerateDaily(targetDate, lang);
      if (digest) {
        result[lang] = await insertDigest({
          digestType: 'daily',
          periodDate: targetDate,
          boroughCode: null,
          language: lang,
          ...digest,
        });
      }
    }
    return result;
  }

  private async buildAndGenerateDaily(
    dateStr: string,
    language: DigestLanguage,
  ): Promise<{
    title: string;
    summary: string;
    highlights: unknown;
    stats: unknown;
    modelUsed: string;
    promptTokens: number;
    completionTokens: number;
  } | null> {
    const rows = await getAllMetricsForDate(dateStr, null);
    const crimeTop = await getBoroughComparison('crime_count_7d', dateStr);
    const travauxTop = await getBoroughComparison('active_travaux_count', dateStr);

    const metrics = {
      date: dateStr,
      crime: {
        count24h: getMetricValue(rows, 'crime_count_daily'),
        count7d: getMetricValue(rows, 'crime_count_7d'),
        deltaVsPrev7d: (() => {
          const r = rows.find((x) => x.metricName === 'crime_delta_vs_prev_7d');
          return r ? (r.value as number) : null;
        })(),
        vs30dAvg: getMetricValue(rows, 'crime_vs_30d_avg'),
        topBoroughs: crimeTop.map((b) => ({
          boroughCode: b.boroughCode,
          name: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
          value: b.value,
        })),
      },
      travaux: {
        activeCount: getMetricValue(rows, 'active_travaux_count'),
        prevActiveCount: getMetricPrevValue(rows, 'active_travaux_count'),
        newToday: getMetricValue(rows, 'new_travaux_today'),
        closedToday: null as number | null,
        topBoroughs: travauxTop.map((b) => ({
          boroughCode: b.boroughCode,
          name: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
          value: b.value,
        })),
      },
      obstructions: {
        activeCount: getMetricValue(rows, 'active_obstructions'),
      },
      requests311: {
        newToday: getMetricValue(rows, 'requests_311_new_today'),
        openTotal: getMetricValue(rows, 'requests_311_open'),
        avgResolutionDays: getMetricValue(rows, 'requests_311_avg_resolution_days') || null,
        topTypes: [] as string[],
      },
      fire: {
        count7d: getMetricValue(rows, 'fire_interventions_7d'),
      },
      potholes: {
        repaired7d: getMetricValue(rows, 'potholes_repaired_7d'),
      },
    };

    const { systemPrompt, userPrompt } = buildDailyDigestPrompt(metrics, language);
    const gen = await generateDigest(systemPrompt, userPrompt, language);
    return {
      title: gen.title,
      summary: gen.summary,
      highlights: gen.highlights,
      stats: metrics,
      modelUsed: MODEL_ID,
      promptTokens: gen.tokensUsed.promptTokens,
      completionTokens: gen.tokensUsed.completionTokens,
    };
  }

  /**
   * Generate weekly digest for a week (Monday as week start).
   */
  async generateWeekly(
    weekStart: string,
    language?: DigestLanguage,
  ): Promise<{ fr?: { id: number }; en?: { id: number } }> {
    const start = weekStart.slice(0, 10);
    const end = endOfWeek(new Date(start), { weekStartsOn: 1 }).toISOString().slice(0, 10);
    await runMetricComputations(new Date(start));
    const prevStart = subDays(new Date(start), 7).toISOString().slice(0, 10);
    await runMetricComputations(new Date(prevStart));

    const result: { fr?: { id: number }; en?: { id: number } } = {};
    const langs: DigestLanguage[] = language ? [language] : ['fr', 'en'];

    for (const lang of langs) {
      const existing = await getDigestByPeriod('weekly', start, lang);
      if (existing) continue;

      const digest = await this.buildAndGenerateWeekly(start, end, prevStart, lang);
      if (digest) {
        result[lang] = await insertDigest({
          digestType: 'weekly',
          periodDate: start,
          boroughCode: null,
          language: lang,
          ...digest,
        });
      }
    }
    return result;
  }

  private async buildAndGenerateWeekly(
    weekStart: string,
    weekEnd: string,
    prevWeekStart: string,
    language: DigestLanguage,
  ): Promise<{
    title: string;
    summary: string;
    highlights: unknown;
    stats: unknown;
    modelUsed: string;
    promptTokens: number;
    completionTokens: number;
  } | null> {
    const currRows = await getAllMetricsForDate(weekStart, null);
    const prevRows = await getAllMetricsForDate(prevWeekStart, null);
    const crimeTop = await getBoroughComparison('crime_count_7d', weekStart);
    const travauxTop = await getBoroughComparison('active_travaux_count', weekStart);

    const crimeCount = getMetricValue(currRows, 'crime_count_7d');
    const crimePrev = getMetricPrevValue(currRows, 'crime_count_7d') ?? getMetricValue(prevRows, 'crime_count_7d');
    const deltaPct = crimePrev > 0 ? ((crimeCount - crimePrev) / crimePrev) * 100 : null;

    const metrics = {
      weekStart,
      weekEnd,
      crime: {
        count7d: crimeCount,
        prev7d: crimePrev || null,
        deltaPct,
        topBoroughs: crimeTop.map((b) => ({
          boroughCode: b.boroughCode,
          name: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
          value: b.value,
        })),
      },
      travaux: {
        activeCount: getMetricValue(currRows, 'active_travaux_count'),
        prevWeek: getMetricPrevValue(currRows, 'active_travaux_count') ?? getMetricValue(prevRows, 'active_travaux_count'),
        newThisWeek: null as number | null,
        topBoroughs: travauxTop.map((b) => ({
          boroughCode: b.boroughCode,
          name: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
          value: b.value,
        })),
      },
      permits: {
        count: getMetricValue(currRows, 'permits_count_week'),
        totalValue: getMetricValue(currRows, 'permits_total_value_week'),
        prevCount: getMetricPrevValue(currRows, 'permits_count_week') ?? getMetricValue(prevRows, 'permits_count_week'),
        prevValue: getMetricPrevValue(currRows, 'permits_total_value_week') ?? getMetricValue(prevRows, 'permits_total_value_week'),
      },
      requests311: {
        openTotal: getMetricValue(currRows, 'requests_311_open'),
        newThisWeek: null,
        avgResolutionDays: getMetricValue(currRows, 'requests_311_avg_resolution_days') || null,
      },
      fire: {
        count7d: getMetricValue(currRows, 'fire_interventions_7d'),
        prev7d: getMetricValue(prevRows, 'fire_interventions_7d') || null,
      },
      potholes: {
        repaired7d: getMetricValue(currRows, 'potholes_repaired_7d'),
      },
    };

    const { systemPrompt, userPrompt } = buildWeeklyDigestPrompt(metrics, language);
    const gen = await generateDigest(systemPrompt, userPrompt, language);
    return {
      title: gen.title,
      summary: gen.summary,
      highlights: gen.highlights,
      stats: metrics,
      modelUsed: MODEL_ID,
      promptTokens: gen.tokensUsed.promptTokens,
      completionTokens: gen.tokensUsed.completionTokens,
    };
  }

  /**
   * Generate borough-specific daily digest.
   */
  async generateBoroughDaily(
    boroughCode: string,
    date: string,
    language?: DigestLanguage,
  ): Promise<{ fr?: { id: number }; en?: { id: number } }> {
    const dateStr = date.slice(0, 10);
    await runMetricComputations(new Date(dateStr));

    const result: { fr?: { id: number }; en?: { id: number } } = {};
    const langs: DigestLanguage[] = language ? [language] : ['fr', 'en'];

    for (const lang of langs) {
      const existing = await getDigestByPeriod('borough', dateStr, lang, boroughCode);
      if (existing) continue;

      const digest = await this.buildAndGenerateBorough(boroughCode, dateStr, lang);
      if (digest) {
        result[lang] = await insertDigest({
          digestType: 'borough',
          periodDate: dateStr,
          boroughCode,
          language: lang,
          ...digest,
        });
      }
    }
    return result;
  }

  private async buildAndGenerateBorough(
    boroughCode: string,
    dateStr: string,
    language: DigestLanguage,
  ): Promise<{
    title: string;
    summary: string;
    highlights: unknown;
    stats: unknown;
    modelUsed: string;
    promptTokens: number;
    completionTokens: number;
  } | null> {
    const boroughRows = await getAllMetricsForDate(dateStr, boroughCode);
    const cityRows = await getAllMetricsForDate(dateStr, null);

    const boroughName = BOROUGHS[boroughCode as keyof typeof BOROUGHS]?.name ?? boroughCode;

    const crimeB = getMetricValue(boroughRows, 'crime_count_7d');
    const crimeCity = getMetricValue(cityRows, 'crime_count_7d');
    const crimeVsCity = crimeCity > 0 ? ((crimeB / crimeCity) * 100 - 100 / 19) : 0; // rough share vs equal split

    const travauxB = getMetricValue(boroughRows, 'active_travaux_count');
    const travauxCity = getMetricValue(cityRows, 'active_travaux_count');
    const travauxVsCity = travauxCity > 0 ? (travauxB / travauxCity) * 100 : 0;

    const metrics = {
      date: dateStr,
      boroughCode,
      boroughName,
      crime: {
        count7d: crimeB,
        cityAvg: Math.round(crimeCity / 19),
        vsCityPct: crimeCity > 0 ? ((crimeB / (crimeCity / 19)) - 1) * 100 : 0,
        deltaVsPrev7d: getMetricPrevValue(boroughRows, 'crime_count_7d')
          ? ((crimeB - (getMetricPrevValue(boroughRows, 'crime_count_7d') ?? 0)) /
              (getMetricPrevValue(boroughRows, 'crime_count_7d') ?? 1)) *
            100
          : null,
      },
      travaux: {
        activeCount: travauxB,
        cityTotal: travauxCity,
        vsCityPct: travauxVsCity,
        newToday: getMetricValue(boroughRows, 'new_travaux_today'),
      },
      requests311: {
        openCount: getMetricValue(boroughRows, 'requests_311_open'),
        cityTotal: getMetricValue(cityRows, 'requests_311_open'),
        avgResolutionDays: getMetricValue(boroughRows, 'requests_311_avg_resolution_days'),
        cityAvgDays: getMetricValue(cityRows, 'requests_311_avg_resolution_days'),
      },
      fire: {
        count7d: getMetricValue(boroughRows, 'fire_interventions_7d'),
        cityTotal: getMetricValue(cityRows, 'fire_interventions_7d'),
      },
      potholes: {
        repaired7d: getMetricValue(boroughRows, 'potholes_repaired_7d'),
        cityTotal: getMetricValue(cityRows, 'potholes_repaired_7d'),
      },
    };

    const { systemPrompt, userPrompt } = buildBoroughDigestPrompt(metrics, language);
    const gen = await generateDigest(systemPrompt, userPrompt, language);
    return {
      title: gen.title,
      summary: gen.summary,
      highlights: gen.highlights,
      stats: metrics,
      modelUsed: MODEL_ID,
      promptTokens: gen.tokensUsed.promptTokens,
      completionTokens: gen.tokensUsed.completionTokens,
    };
  }
}
