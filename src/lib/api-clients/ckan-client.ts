import { z } from 'zod';

/** Custom error for CKAN API failures */
export class CKANError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'CKANError';
    Object.setPrototypeOf(this, CKANError.prototype);
  }
}

/** Zod schemas for CKAN API responses */

const DatastoreFieldSchema = z.object({
  id: z.string(),
  type: z.string(),
});

export const DatastoreSearchResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    records: z.array(z.record(z.string(), z.any())),
    fields: z.array(DatastoreFieldSchema),
    total: z.number(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }),
});
export type DatastoreSearchResponse = z.infer<typeof DatastoreSearchResponseSchema>;

export const DatastoreSQLResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    records: z.array(z.record(z.string(), z.any())),
    fields: z.array(DatastoreFieldSchema),
    total: z.number().optional(),
  }),
});
export type DatastoreSQLResponse = z.infer<typeof DatastoreSQLResponseSchema>;

const PackageResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  format: z.string(),
  last_modified: z.union([z.string(), z.number(), z.null()]).optional(),
  datastore_active: z.boolean().optional(),
}).passthrough();

export const PackageShowResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    id: z.string(),
    name: z.string(),
    title: z.string().optional(),
    resources: z.array(PackageResourceSchema),
  }).passthrough(),
});
export type PackageShowResponse = z.infer<typeof PackageShowResponseSchema>;

const PackageSearchResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string().optional(),
  organization: z
    .object({
      name: z.string(),
      title: z.string().optional(),
    })
    .optional(),
}).passthrough();

export const PackageSearchResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    count: z.number(),
    results: z.array(PackageSearchResultSchema),
  }),
});
export type PackageSearchResponse = z.infer<typeof PackageSearchResponseSchema>;

/** Retry delays in ms: 1000, 2000, 4000 */
const RETRY_DELAYS = [1000, 2000, 4000];
const MAX_ATTEMPTS = 3;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Generic fetch with retry and exponential backoff */
async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  label = 'request',
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const start = Date.now();
    console.log(`[CKAN] ${label} → ${url}`);

    try {
      const response = await fetch(url, options);
      const duration = Date.now() - start;
      console.log(`[CKAN] ${label} completed in ${duration}ms (status: ${response.status})`);

      if (!response.ok && attempt < MAX_ATTEMPTS) {
        console.log(
          `[CKAN] Retry ${attempt}/${MAX_ATTEMPTS} in ${RETRY_DELAYS[attempt - 1]}ms (status: ${response.status})`,
        );
        await sleep(RETRY_DELAYS[attempt - 1]!);
        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        continue;
      }

      return response;
    } catch (error) {
      const duration = Date.now() - start;
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(`[CKAN] ${label} failed after ${duration}ms: ${lastError.message}`);

      if (attempt < MAX_ATTEMPTS) {
        console.log(
          `[CKAN] Retry ${attempt}/${MAX_ATTEMPTS} in ${RETRY_DELAYS[attempt - 1]}ms`,
        );
        await sleep(RETRY_DELAYS[attempt - 1]!);
      }
    }
  }

  throw new CKANError(
    lastError?.message ?? 'Request failed after retries',
    undefined,
    lastError,
  );
}

/** Options for datastore_search */
export interface DatastoreSearchOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, string | number>;
  sort?: string;
  fields?: string[];
}

/** Delay between paginated requests (ms) — be respectful of CKAN API */
const PAGINATION_DELAY_MS = 500;

export class CKANClient {
  private readonly baseUrl: string;

  constructor(
    baseUrl = process.env.CKAN_BASE_URL ?? 'https://data.montreal.ca/api/3/action',
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async datastoreSearch(
    resourceId: string,
    options: DatastoreSearchOptions = {},
  ): Promise<DatastoreSearchResponse> {
    const params = new URLSearchParams();
    params.set('resource_id', resourceId);

    if (options.limit != null) params.set('limit', String(options.limit));
    if (options.offset != null) params.set('offset', String(options.offset));
    if (options.filters && Object.keys(options.filters).length > 0) {
      params.set('filters', JSON.stringify(options.filters));
    }
    if (options.sort) params.set('sort', options.sort);
    if (options.fields && options.fields.length > 0) {
      params.set('fields', JSON.stringify(options.fields));
    }

    const url = `${this.baseUrl}/datastore_search?${params.toString()}`;
    const response = await fetchWithRetry(url, undefined, 'datastore_search');

    if (!response.ok) {
      throw new CKANError(
        `datastore_search failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const json = (await response.json()) as unknown;
    const parsed = DatastoreSearchResponseSchema.safeParse(json);

    if (!parsed.success) {
      throw new CKANError(
        `Invalid datastore_search response: ${parsed.error.message}`,
        response.status,
        parsed.error,
      );
    }

    if (!parsed.data.success) {
      throw new CKANError('CKAN API returned success=false', response.status);
    }

    return parsed.data;
  }

  async datastoreSQL(sql: string): Promise<DatastoreSQLResponse> {
    const url = `${this.baseUrl}/datastore_search_sql?sql=${encodeURIComponent(sql)}`;
    const response = await fetchWithRetry(url, undefined, 'datastore_search_sql');

    if (!response.ok) {
      throw new CKANError(
        `datastore_search_sql failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const json = (await response.json()) as unknown;
    const parsed = DatastoreSQLResponseSchema.safeParse(json);

    if (!parsed.success) {
      throw new CKANError(
        `Invalid datastore_search_sql response: ${parsed.error.message}`,
        response.status,
        parsed.error,
      );
    }

    if (!parsed.data.success) {
      throw new CKANError('CKAN API returned success=false', response.status);
    }

    return parsed.data;
  }

  async packageShow(datasetSlug: string): Promise<PackageShowResponse> {
    const params = new URLSearchParams({ id: datasetSlug });
    const url = `${this.baseUrl}/package_show?${params.toString()}`;
    const response = await fetchWithRetry(url, undefined, 'package_show');

    if (!response.ok) {
      throw new CKANError(
        `package_show failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const json = (await response.json()) as unknown;
    const parsed = PackageShowResponseSchema.safeParse(json);

    if (!parsed.success) {
      throw new CKANError(
        `Invalid package_show response: ${parsed.error.message}`,
        response.status,
        parsed.error,
      );
    }

    if (!parsed.data.success) {
      throw new CKANError('CKAN API returned success=false', response.status);
    }

    return parsed.data;
  }

  async packageSearch(
    query: string,
    rows: number,
    start: number,
  ): Promise<PackageSearchResponse> {
    const params = new URLSearchParams({
      q: query,
      rows: String(rows),
      start: String(start),
    });
    const url = `${this.baseUrl}/package_search?${params.toString()}`;
    const response = await fetchWithRetry(url, undefined, 'package_search');

    if (!response.ok) {
      throw new CKANError(
        `package_search failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const json = (await response.json()) as unknown;
    const parsed = PackageSearchResponseSchema.safeParse(json);

    if (!parsed.success) {
      throw new CKANError(
        `Invalid package_search response: ${parsed.error.message}`,
        response.status,
        parsed.error,
      );
    }

    if (!parsed.data.success) {
      throw new CKANError('CKAN API returned success=false', response.status);
    }

    return parsed.data;
  }

  async downloadResource(url: string): Promise<Buffer> {
    const response = await fetchWithRetry(url, undefined, 'download_resource');

    if (!response.ok) {
      throw new CKANError(
        `download_resource failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Paginate through datastore SQL results with LIMIT/OFFSET.
   * Yields all rows by auto-incrementing OFFSET until no more rows.
   * Strips any existing LIMIT/OFFSET from the SQL and appends pagination.
   */
  async *datastoreSQLPaginated(
    sql: string,
    pageSize = 32000,
  ): AsyncGenerator<Record<string, unknown>[], void, undefined> {
    const baseSql = sql
      .replace(/\s+LIMIT\s+\d+/gi, '')
      .replace(/\s+OFFSET\s+\d+/gi, '')
      .trim();

    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const paginatedSql = `${baseSql} LIMIT ${pageSize} OFFSET ${offset}`;
      const result = await this.datastoreSQL(paginatedSql);
      const records = result.result.records;

      if (records.length > 0) {
        yield records;
      }

      hasMore = records.length === pageSize;
      offset += pageSize;

      if (hasMore) {
        await sleep(PAGINATION_DELAY_MS);
      }
    }
  }
}
