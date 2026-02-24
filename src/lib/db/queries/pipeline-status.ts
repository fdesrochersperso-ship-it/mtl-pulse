/**
 * Query pipeline_runs for per-source data freshness.
 * Used by DataFreshness component and admin pipeline dashboard.
 */

import { db } from '@/lib/db';
import { pipelineRuns } from '@/lib/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { pipelineRegistry } from '@/lib/pipeline/registry';
import {
  PIPELINE_SCHEDULES as SCHEDULE_CONFIG,
  type ScheduleType,
} from '@/lib/pipeline/schedule-config';

/** All pipeline names we track (registry + special jobs) */
const ALL_PIPELINE_NAMES = new Set([
  ...pipelineRegistry.keys(),
  'compute_metrics',
  'generate_daily_digest',
]);

export type PipelineStatusRow = {
  pipelineName: string;
  lastSuccessAt: Date | null;
  lastStatus: 'success' | 'failed' | null;
  scheduleType: ScheduleType;
  freshnessStatus: 'green' | 'yellow' | 'red';
  hoursSinceSuccess: number | null;
};

export type PipelineRunRow = {
  id: number;
  pipelineName: string;
  status: 'running' | 'success' | 'failed';
  recordsFetched: number | null;
  recordsInserted: number | null;
  recordsUpdated: number | null;
  errorMessage: string | null;
  startedAt: Date;
  completedAt: Date | null;
  durationMs: number | null;
};

export type FreshnessStatus = 'green' | 'yellow' | 'red';

/**
 * Get expected hours for a pipeline from schedule config, fallback by type.
 */
function getExpectedHours(pipelineName: string, scheduleType: ScheduleType): number {
  const config = SCHEDULE_CONFIG.find((s) => s.name === pipelineName);
  if (config) return config.expectedHours;
  const defaults: Record<ScheduleType, number> = {
    hourly: 2,
    every_6h: 6,
    daily: 24,
    weekly: 24 * 7,
    monthly: 24 * 31,
  };
  return defaults[scheduleType] ?? 24;
}

/**
 * Compute freshness for a single pipeline's last successful run.
 * Green: within expected window
 * Yellow: 1.5x expected
 * Red: 2x expected or last run failed
 */
function getFreshnessStatus(
  lastSuccessAt: Date | null,
  lastStatus: string | null,
  pipelineName: string,
  scheduleType: ScheduleType,
): { status: FreshnessStatus; hoursSinceSuccess: number | null } {
  const expectedHours = getExpectedHours(pipelineName, scheduleType);
  const greenThreshold = Math.min(expectedHours * 1.1, expectedHours + 2);
  const yellowThreshold = expectedHours * 1.5;

  if (lastStatus === 'failed') {
    return { status: 'red', hoursSinceSuccess: null };
  }
  if (!lastSuccessAt) {
    return { status: 'red', hoursSinceSuccess: null };
  }

  const now = new Date();
  const diffMs = now.getTime() - lastSuccessAt.getTime();
  const hoursSince = diffMs / (1000 * 60 * 60);

  let status: FreshnessStatus = 'red';
  if (hoursSince <= greenThreshold) status = 'green';
  else if (hoursSince <= yellowThreshold) status = 'yellow';

  return { status, hoursSinceSuccess: hoursSince };
}

/** Get last successful run time for a single pipeline (for dashboard freshness) */
export async function getPipelineLastSuccess(
  pipelineName: string,
): Promise<Date | null> {
  const [row] = await db
    .select({ completedAt: pipelineRuns.completedAt })
    .from(pipelineRuns)
    .where(
      and(
        eq(pipelineRuns.pipelineName, pipelineName),
        eq(pipelineRuns.status, 'success'),
      ),
    )
    .orderBy(desc(pipelineRuns.completedAt))
    .limit(1);
  return row?.completedAt ?? null;
}

/**
 * Get status for each pipeline (registry + special jobs).
 * Returns last successful run time, last status, and computed freshness.
 */
export async function getPipelineStatuses(): Promise<PipelineStatusRow[]> {
  const pipelineNames = Array.from(ALL_PIPELINE_NAMES);
  const results: PipelineStatusRow[] = [];

  for (const name of pipelineNames) {
    const config = SCHEDULE_CONFIG.find((s) => s.name === name);
    const scheduleType = config?.scheduleType ?? 'daily';

    const [lastRun] = await db
      .select({
        status: pipelineRuns.status,
        completedAt: pipelineRuns.completedAt,
      })
      .from(pipelineRuns)
      .where(eq(pipelineRuns.pipelineName, name))
      .orderBy(desc(pipelineRuns.startedAt))
      .limit(1);

    const [lastSuccessRun] = await db
      .select({ completedAt: pipelineRuns.completedAt })
      .from(pipelineRuns)
      .where(and(eq(pipelineRuns.pipelineName, name), eq(pipelineRuns.status, 'success')))
      .orderBy(desc(pipelineRuns.completedAt))
      .limit(1);

    const lastSuccessAt = lastSuccessRun?.completedAt ?? null;
    const { status: freshnessStatus, hoursSinceSuccess } = getFreshnessStatus(
      lastSuccessAt,
      lastRun?.status ?? null,
      name,
      scheduleType,
    );

    results.push({
      pipelineName: name,
      lastSuccessAt,
      lastStatus:
        lastRun?.status === 'success' || lastRun?.status === 'failed'
          ? lastRun.status
          : null,
      scheduleType,
      freshnessStatus,
      hoursSinceSuccess,
    });
  }

  return results;
}

/**
 * Get recent pipeline runs, optionally filtered by pipeline name.
 * Used for admin error log viewer.
 */
export async function getPipelineRuns(
  pipelineName?: string,
  limit = 50,
): Promise<PipelineRunRow[]> {
  const conditions = pipelineName
    ? eq(pipelineRuns.pipelineName, pipelineName)
    : undefined;

  const rows = await db
    .select({
      id: pipelineRuns.id,
      pipelineName: pipelineRuns.pipelineName,
      status: pipelineRuns.status,
      recordsFetched: pipelineRuns.recordsFetched,
      recordsInserted: pipelineRuns.recordsInserted,
      recordsUpdated: pipelineRuns.recordsUpdated,
      errorMessage: pipelineRuns.errorMessage,
      startedAt: pipelineRuns.startedAt,
      completedAt: pipelineRuns.completedAt,
      durationMs: pipelineRuns.durationMs,
    })
    .from(pipelineRuns)
    .where(conditions)
    .orderBy(desc(pipelineRuns.startedAt))
    .limit(limit);

  return rows as PipelineRunRow[];
}

export type ExtendedPipelineStatusRow = PipelineStatusRow & {
  lastRunAt: Date | null;
  recordsProcessed: number;
  durationMs: number | null;
};

/**
 * Get pipeline statuses with last run details (records, duration).
 */
export async function getExtendedPipelineStatuses(): Promise<ExtendedPipelineStatusRow[]> {
  const base = await getPipelineStatuses();
  const extended: ExtendedPipelineStatusRow[] = [];

  for (const row of base) {
    const [lastRun] = await db
      .select({
        startedAt: pipelineRuns.startedAt,
        recordsFetched: pipelineRuns.recordsFetched,
        recordsInserted: pipelineRuns.recordsInserted,
        recordsUpdated: pipelineRuns.recordsUpdated,
        durationMs: pipelineRuns.durationMs,
      })
      .from(pipelineRuns)
      .where(eq(pipelineRuns.pipelineName, row.pipelineName))
      .orderBy(desc(pipelineRuns.startedAt))
      .limit(1);

    const recordsProcessed =
      (lastRun?.recordsInserted ?? 0) + (lastRun?.recordsUpdated ?? 0);

    extended.push({
      ...row,
      lastRunAt: lastRun?.startedAt ?? null,
      recordsProcessed,
      durationMs: lastRun?.durationMs ?? null,
    });
  }

  return extended;
}

/** Display labels for pipeline names (for UI) */
export const PIPELINE_LABELS: Record<string, { fr: string; en: string }> = {
  actes_criminels: { fr: 'Crimes', en: 'Crime' },
  info_travaux: { fr: 'Travaux', en: 'Construction' },
  entraves_circulation: { fr: 'Entraves', en: 'Obstructions' },
  requetes_311: { fr: 'Requêtes 311', en: '311 Requests' },
  permis_construction: { fr: 'Permis', en: 'Permits' },
  fire_interventions: { fr: 'Pompiers', en: 'Fire' },
  pothole_repairs: { fr: 'Nids-de-poule', en: 'Potholes' },
  remorquages: { fr: 'Remorquages', en: 'Towings' },
  bedbug_reports: { fr: 'Punaises', en: 'Bedbugs' },
  elected_officials: { fr: 'Élus', en: 'Officials' },
  boroughs: { fr: 'Arrondissements', en: 'Boroughs' },
  compute_metrics: { fr: 'Métriques', en: 'Metrics' },
  generate_daily_digest: { fr: 'Résumé quotidien', en: 'Daily Digest' },
};
