/**
 * PipelineRunner — orchestrates pipeline execution and logs to pipeline_runs.
 */

import { db } from '@/lib/db';
import { pipelineRuns } from '@/lib/db/schema';
import type { Pipeline, PipelineResult, StoreResult } from './types';
import { pipelineRegistry } from './registry';
import { eq } from 'drizzle-orm';

export class PipelineRunner {
  /**
   * Run a pipeline: fetch → normalize → deduplicate → store.
   * Logs to pipeline_runs and returns PipelineResult.
   */
  async run(pipeline: Pipeline): Promise<PipelineResult> {
    const startTime = new Date();
    const startMs = startTime.getTime();

    console.log(`[pipeline] Starting: ${pipeline.name} at ${startTime.toISOString()}`);

    // Insert pipeline_runs row with status='running'
    const [runRow] = await db
      .insert(pipelineRuns)
      .values({
        pipelineName: pipeline.name,
        status: 'running',
        startedAt: startTime,
      })
      .returning({ id: pipelineRuns.id });

    if (!runRow) {
      throw new Error(`Failed to create pipeline_runs row for ${pipeline.name}`);
    }

    const runId = runRow.id;

    try {
      // 1. Fetch
      const raw = await pipeline.fetch();
      const recordsFetched = raw.length;
      console.log(`[pipeline] ${pipeline.name}: fetched ${recordsFetched} records`);

      // 2. Normalize
      const normalized = pipeline.normalize(raw);
      console.log(`[pipeline] ${pipeline.name}: normalized to ${normalized.length} records`);

      // 3. Deduplicate
      const deduped = pipeline.deduplicate(normalized);
      console.log(`[pipeline] ${pipeline.name}: deduplicated to ${deduped.length} records`);

      // 4. Store
      const storeResult: StoreResult = await pipeline.store(deduped);
      const { inserted, updated } = storeResult;
      console.log(
        `[pipeline] ${pipeline.name}: stored ${inserted} inserted, ${updated} updated`,
      );

      const completedAt = new Date();
      const durationMs = completedAt.getTime() - startMs;

      await db
        .update(pipelineRuns)
        .set({
          status: 'success',
          recordsFetched,
          recordsInserted: inserted,
          recordsUpdated: updated,
          completedAt,
          durationMs,
        })
        .where(eq(pipelineRuns.id, runId));

      console.log(
        `[pipeline] ${pipeline.name}: SUCCESS — ${recordsFetched} fetched, ${inserted} inserted, ${updated} updated — ${durationMs}ms`,
      );

      return {
        name: pipeline.name,
        status: 'success',
        recordsFetched,
        recordsInserted: inserted,
        recordsUpdated: updated,
        durationMs,
      };
    } catch (error) {
      const completedAt = new Date();
      const durationMs = completedAt.getTime() - startMs;
      const errorMessage = error instanceof Error ? error.message : String(error);

      await db
        .update(pipelineRuns)
        .set({
          status: 'failed',
          errorMessage,
          completedAt,
          durationMs,
        })
        .where(eq(pipelineRuns.id, runId));

      console.error(
        `[pipeline] ${pipeline.name}: FAILED — ${errorMessage} — ${durationMs}ms`,
      );
      if (error instanceof Error && error.stack) {
        console.error(error.stack);
      }

      return {
        name: pipeline.name,
        status: 'failed',
        recordsFetched: 0,
        recordsInserted: 0,
        recordsUpdated: 0,
        errorMessage,
        durationMs,
      };
    }
  }

  /**
   * Look up pipeline by name from registry and run it.
   */
  async runByName(name: string): Promise<PipelineResult> {
    const pipeline = pipelineRegistry.get(name);
    if (!pipeline) {
      const available = Array.from(pipelineRegistry.keys()).join(', ');
      throw new Error(`Unknown pipeline: "${name}". Available: ${available || '(none)'}`);
    }
    return this.run(pipeline);
  }
}
