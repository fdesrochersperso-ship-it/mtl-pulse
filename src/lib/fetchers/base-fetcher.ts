import { createHash } from 'crypto';
import { db } from '@/lib/db';
import { snapshots } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { FetchResult } from '@/types';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

export abstract class BaseFetcher {
  abstract readonly sourceKey: string;
  abstract readonly description: string;

  /** Download raw data from the source */
  protected abstract fetch(): Promise<unknown>;

  /** Transform raw data into records ready for DB insertion */
  protected abstract parse(raw: unknown): Promise<Record<string, unknown>[]>;

  /** Insert/upsert parsed records into the database */
  protected abstract save(records: Record<string, unknown>[]): Promise<number>;

  /** Compute a hash of the data to detect changes */
  protected computeHash(data: unknown): string {
    const json = JSON.stringify(data);
    return createHash('sha256').update(json).digest('hex');
  }

  /** Get the last successful snapshot for this source */
  protected async getLastSnapshot() {
    const result = await db
      .select()
      .from(snapshots)
      .where(eq(snapshots.sourceKey, this.sourceKey))
      .orderBy(desc(snapshots.fetchedAt))
      .limit(1);
    return result[0] ?? null;
  }

  /** Log a fetch attempt to the snapshots table */
  private async logSnapshot(
    dataHash: string | null,
    recordCount: number,
    status: 'success' | 'error',
    errorMessage?: string,
  ) {
    await db.insert(snapshots).values({
      sourceKey: this.sourceKey,
      dataHash,
      recordCount,
      status,
      errorMessage: errorMessage ?? null,
    });
  }

  /** Sleep utility */
  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /** Run the full fetch→parse→save pipeline with retry logic */
  async run(): Promise<FetchResult> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[${this.sourceKey}] Fetching (attempt ${attempt}/${MAX_RETRIES})...`);

        // Fetch raw data
        const raw = await this.fetch();

        // Compute hash to detect unchanged data
        const dataHash = this.computeHash(raw);
        const lastSnapshot = await this.getLastSnapshot();

        if (lastSnapshot?.dataHash === dataHash) {
          console.log(`[${this.sourceKey}] Data unchanged, skipping.`);
          await this.logSnapshot(dataHash, 0, 'success');
          return {
            sourceKey: this.sourceKey,
            success: true,
            recordCount: 0,
            dataHash,
            skipped: true,
          };
        }

        // Parse and save
        const records = await this.parse(raw);
        const savedCount = await this.save(records);

        console.log(`[${this.sourceKey}] Saved ${savedCount} records.`);
        await this.logSnapshot(dataHash, savedCount, 'success');

        return {
          sourceKey: this.sourceKey,
          success: true,
          recordCount: savedCount,
          dataHash,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.error(`[${this.sourceKey}] Attempt ${attempt} failed:`, lastError.message);

        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
          console.log(`[${this.sourceKey}] Retrying in ${delay}ms...`);
          await this.sleep(delay);
        }
      }
    }

    // All retries exhausted
    const errorMsg = lastError?.message ?? 'Unknown error';
    console.error(`[${this.sourceKey}] All retries failed: ${errorMsg}`);
    await this.logSnapshot(null, 0, 'error', errorMsg);

    return {
      sourceKey: this.sourceKey,
      success: false,
      recordCount: 0,
      dataHash: '',
      errorMessage: errorMsg,
    };
  }
}
