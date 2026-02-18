import type { BoroughCode } from '@/lib/constants/boroughs';

/** Metric categories tracked by the dashboard */
export type MetricCategory =
  | 'crime'
  | 'construction'
  | 'permits'
  | 'requests_311'
  | 'fire'
  | 'potholes'
  | 'snow_towings';

/** A single metric value with optional comparison */
export interface MetricValue {
  key: string;
  value: number;
  previousValue?: number;
  delta?: number;
  deltaPercent?: number;
}

/** Daily metrics for one category in one borough */
export interface DailyMetricGroup {
  date: string;
  boroughCode: BoroughCode | 'MTL';
  category: MetricCategory;
  metrics: MetricValue[];
}

/** A day's complete snapshot across all categories */
export interface DailySnapshot {
  date: string;
  metrics: DailyMetricGroup[];
  digest?: DailyDigest;
}

/** AI-generated daily digest */
export interface DailyDigest {
  date: string;
  summaryFr: string;
  summaryEn: string;
  highlights: string[];
  generatedAt: string;
}

/** Weekly trend comparison */
export interface WeeklyTrend {
  category: MetricCategory;
  metricKey: string;
  thisWeek: number;
  lastWeek: number;
  delta: number;
  deltaPercent: number;
}

/** Fetcher execution result */
export interface FetchResult {
  sourceKey: string;
  success: boolean;
  recordCount: number;
  dataHash: string;
  errorMessage?: string;
  skipped?: boolean;
}

/** CKAN DataStore API response shape */
export interface CKANDataStoreResponse {
  success: boolean;
  result: {
    records: Record<string, unknown>[];
    total: number;
    offset: number;
    limit: number;
    fields: { id: string; type: string }[];
  };
}

/** CKAN package_show response (simplified) */
export interface CKANPackageResponse {
  success: boolean;
  result: {
    id: string;
    name: string;
    resources: {
      id: string;
      name: string;
      url: string;
      format: string;
      last_modified: string;
    }[];
  };
}
