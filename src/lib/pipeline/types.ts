/**
 * Pipeline framework types.
 * Every pipeline follows the fetch → normalize → deduplicate → store flow.
 */

/** Raw record from API/fetch — untyped key-value */
export type RawRecord = Record<string, unknown>;

/** Normalized record ready for DB — may extend RawRecord with typed fields */
export type NormalizedRecord = Record<string, unknown>;

/** Result of a store() call */
export interface StoreResult {
  inserted: number;
  updated: number;
}

/** Result of a pipeline run */
export interface PipelineResult {
  name: string;
  status: 'success' | 'failed';
  recordsFetched: number;
  recordsInserted: number;
  recordsUpdated: number;
  errorMessage?: string;
  durationMs: number;
}

/** Pipeline interface — every pipeline implements this. Runner orchestrates fetch → normalize → deduplicate → store. */
export interface Pipeline {
  name: string;
  schedule: string; // cron expression
  fetch(): Promise<RawRecord[]>;
  normalize(raw: RawRecord[]): NormalizedRecord[];
  deduplicate(records: NormalizedRecord[]): NormalizedRecord[];
  store(records: NormalizedRecord[]): Promise<StoreResult>;
}
