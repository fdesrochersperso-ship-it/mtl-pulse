/**
 * Pipeline schedule configuration for cron jobs.
 * All times in cron expressions are UTC (Vercel runs in UTC).
 * ET offset: 6 AM ET = 11:00 UTC, 7 AM ET = 12:00 UTC, 8 AM ET = 13:00 UTC,
 * Sunday midnight ET ≈ 05:00 UTC Monday (cron: 0 5 * * 0).
 */

export type ScheduleType = 'hourly' | 'every_6h' | 'daily' | 'weekly' | 'monthly';

export interface PipelineScheduleConfig {
  /** Pipeline name (matches registry or special job) */
  name: string;
  /** Vercel cron expression: "minute hour day month weekday" */
  cronExpression: string;
  /** Human-readable schedule description */
  scheduleType: ScheduleType;
  /** Expected run interval in hours (for freshness thresholds) */
  expectedHours: number;
}

/** All pipelines and special jobs with their cron schedules */
export const PIPELINE_SCHEDULES: PipelineScheduleConfig[] = [
  {
    name: 'info_travaux',
    cronExpression: '0 */6 * * *',
    scheduleType: 'every_6h',
    expectedHours: 6,
  },
  {
    name: 'actes_criminels',
    cronExpression: '0 11 * * *',
    scheduleType: 'daily',
    expectedHours: 24,
  },
  {
    name: 'permis_construction',
    cronExpression: '0 5 * * 0',
    scheduleType: 'weekly',
    expectedHours: 24 * 7,
  },
  {
    name: 'requetes_311',
    cronExpression: '0 5 * * 0',
    scheduleType: 'weekly',
    expectedHours: 24 * 7,
  },
  {
    name: 'entraves_circulation',
    cronExpression: '0 * * * *',
    scheduleType: 'hourly',
    expectedHours: 2,
  },
  {
    name: 'fire_interventions',
    cronExpression: '0 11 * * *',
    scheduleType: 'daily',
    expectedHours: 24,
  },
  {
    name: 'pothole_repairs',
    cronExpression: '0 11 * * *',
    scheduleType: 'daily',
    expectedHours: 24,
  },
  {
    name: 'remorquages',
    cronExpression: '0 11 * * *',
    scheduleType: 'daily',
    expectedHours: 24,
  },
  {
    name: 'bedbug_reports',
    cronExpression: '0 5 * * 0',
    scheduleType: 'weekly',
    expectedHours: 24 * 7,
  },
  {
    name: 'elected_officials',
    cronExpression: '0 11 1 * *',
    scheduleType: 'monthly',
    expectedHours: 24 * 30,
  },
  {
    name: 'compute_metrics',
    cronExpression: '0 12 * * *',
    scheduleType: 'daily',
    expectedHours: 24,
  },
  {
    name: 'generate_daily_digest',
    cronExpression: '0 13 * * *',
    scheduleType: 'daily',
    expectedHours: 24,
  },
];

/** Pipeline names that are special jobs (not in pipeline registry) */
export const SPECIAL_JOBS = ['compute_metrics', 'generate_daily_digest'];

export function isSpecialJob(name: string): boolean {
  return SPECIAL_JOBS.includes(name);
}

export function getScheduleConfig(name: string): PipelineScheduleConfig | undefined {
  return PIPELINE_SCHEDULES.find((s) => s.name === name);
}
