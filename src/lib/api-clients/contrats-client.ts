import { z } from 'zod';

/** Custom error for Contrats API failures */
export class ContratsError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'ContratsError';
    Object.setPrototypeOf(this, ContratsError.prototype);
  }
}

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
    console.log(`[Contrats] ${label} → ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: 'application/json',
          ...options?.headers,
        },
      });
      const duration = Date.now() - start;
      console.log(
        `[Contrats] ${label} completed in ${duration}ms (status: ${response.status})`,
      );

      if (!response.ok && attempt < MAX_ATTEMPTS) {
        console.log(
          `[Contrats] Retry ${attempt}/${MAX_ATTEMPTS} in ${RETRY_DELAYS[attempt - 1]}ms (status: ${response.status})`,
        );
        await sleep(RETRY_DELAYS[attempt - 1]!);
        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        continue;
      }

      return response;
    } catch (error) {
      const duration = Date.now() - start;
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(
        `[Contrats] ${label} failed after ${duration}ms: ${lastError.message}`,
      );

      if (attempt < MAX_ATTEMPTS) {
        console.log(
          `[Contrats] Retry ${attempt}/${MAX_ATTEMPTS} in ${RETRY_DELAYS[attempt - 1]}ms`,
        );
        await sleep(RETRY_DELAYS[attempt - 1]!);
      }
    }
  }

  throw new ContratsError(
    lastError?.message ?? 'Request failed after retries',
    undefined,
    lastError,
  );
}

/** OCDS release schema (simplified for contract data) */
const OCDSReleaseSchema = z
  .object({
    ocid: z.string().optional(),
    id: z.string().optional(),
    date: z.string().optional(),
    tag: z.array(z.string()).optional(),
    initiationType: z.string().optional(),
    parties: z.array(z.record(z.string(), z.unknown())).optional(),
    awards: z.array(z.record(z.string(), z.unknown())).optional(),
    contracts: z.array(z.record(z.string(), z.unknown())).optional(),
  })
  .passthrough();

/** Response from /releases endpoint (OCDS-style) */
export const ContratsReleasesResponseSchema = z.object({
  releases: z.array(OCDSReleaseSchema).optional(),
  meta: z
    .object({
      total: z.number().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
    .optional(),
}).passthrough();

export type ContratsReleasesResponse = z.infer<
  typeof ContratsReleasesResponseSchema
>;

export interface ContratsClientOptions {
  baseUrl?: string;
}

export class ContratsClient {
  private readonly baseUrl: string;

  constructor(options: ContratsClientOptions = {}) {
    this.baseUrl = (
      options.baseUrl ??
      process.env.CONTRATS_API_URL ??
      'https://ville.montreal.qc.ca/vuesurlescontrats/api'
    ).replace(/\/$/, '');
  }

  /**
   * Fetch contract releases from the Vue sur les contrats API.
   * Supports pagination via limit and offset query params if the API supports them.
   */
  async getReleases(
    options: { limit?: number; offset?: number } = {},
  ): Promise<ContratsReleasesResponse> {
    const params = new URLSearchParams();
    if (options.limit != null) params.set('limit', String(options.limit));
    if (options.offset != null) params.set('offset', String(options.offset));

    const query = params.toString();
    const url = query
      ? `${this.baseUrl}/releases?${query}`
      : `${this.baseUrl}/releases`;

    const response = await fetchWithRetry(url, undefined, 'releases');

    if (!response.ok) {
      throw new ContratsError(
        `getReleases failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new ContratsError(
        `Expected JSON response, got ${contentType}. The API may have changed or require different parameters.`,
        response.status,
      );
    }

    const json = (await response.json()) as unknown;
    const parsed = ContratsReleasesResponseSchema.safeParse(json);

    if (!parsed.success) {
      throw new ContratsError(
        `Invalid releases response: ${parsed.error.message}`,
        response.status,
        parsed.error,
      );
    }

    return parsed.data;
  }

  /**
   * Download a resource URL and return as Buffer.
   * Useful for CSV/Excel exports linked from the API.
   */
  async downloadResource(url: string): Promise<Buffer> {
    const response = await fetchWithRetry(url, undefined, 'download_resource');

    if (!response.ok) {
      throw new ContratsError(
        `download_resource failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
