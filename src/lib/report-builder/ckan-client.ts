import type { ReportResult } from './types';

const CKAN_SQL_URL = 'https://data.montreal.ca/api/3/action/datastore_search_sql';

interface CKANSQLResponse {
  success: boolean;
  result: {
    records: Record<string, unknown>[];
    fields: Array<{ id: string; type: string }>;
  };
}

/** In-memory cache with 5-minute TTL */
const cache = new Map<string, { data: ReportResult; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function getCached(sql: string): ReportResult | null {
  const entry = cache.get(sql);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(sql);
    return null;
  }
  return entry.data;
}

function setCache(sql: string, data: ReportResult): void {
  // Cap cache size to prevent memory leaks
  if (cache.size > 100) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(sql, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchReport(sql: string): Promise<ReportResult> {
  // Check cache
  const cached = getCached(sql);
  if (cached) return cached;

  const RETRY_DELAYS = [1000, 2000, 4000];
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    const start = Date.now();
    try {
      const url = `${CKAN_SQL_URL}?sql=${encodeURIComponent(sql)}`;
      const response = await fetch(url, {
        next: { revalidate: 300 }, // Next.js cache: 5 min
      });

      if (!response.ok) {
        throw new Error(`CKAN API error: ${response.status} ${response.statusText}`);
      }

      const json = (await response.json()) as CKANSQLResponse;

      if (!json.success) {
        throw new Error('CKAN API returned success=false');
      }

      const queryTimeMs = Date.now() - start;
      const result: ReportResult = {
        records: json.result.records,
        fields: json.result.fields,
        total: json.result.records.length,
        sql,
        queryTimeMs,
      };

      setCache(sql, result);
      return result;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < 2) {
        await sleep(RETRY_DELAYS[attempt]!);
      }
    }
  }

  throw lastError ?? new Error('Failed to fetch report');
}
