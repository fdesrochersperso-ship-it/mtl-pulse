/**
 * Special pipeline jobs: compute_metrics and generate_daily_digest.
 * These run outside the pipeline registry but log to pipeline_runs.
 */

import { db } from '@/lib/db';
import { pipelineRuns } from '@/lib/db/schema';
import { runMetricComputations } from './metrics-computer';
import { DigestGenerator } from '@/lib/ai/digest-generator';
import { eq } from 'drizzle-orm';

export interface SpecialJobResult {
  name: string;
  status: 'success' | 'failed';
  recordsFetched: number;
  recordsInserted: number;
  recordsUpdated: number;
  errorMessage?: string;
  durationMs: number;
}

/** Run compute_metrics and log to pipeline_runs */
export async function runComputeMetrics(): Promise<SpecialJobResult> {
  const startTime = new Date();
  const startMs = startTime.getTime();

  const [runRow] = await db
    .insert(pipelineRuns)
    .values({
      pipelineName: 'compute_metrics',
      status: 'running',
      startedAt: startTime,
    })
    .returning({ id: pipelineRuns.id });

  if (!runRow) {
    throw new Error('Failed to create pipeline_runs row for compute_metrics');
  }

  try {
    await runMetricComputations();
    const completedAt = new Date();
    const durationMs = completedAt.getTime() - startMs;

    await db
      .update(pipelineRuns)
      .set({
        status: 'success',
        recordsFetched: 0,
        recordsInserted: 0,
        recordsUpdated: 0,
        completedAt,
        durationMs,
      })
      .where(eq(pipelineRuns.id, runRow.id));

    return {
      name: 'compute_metrics',
      status: 'success',
      recordsFetched: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
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
      .where(eq(pipelineRuns.id, runRow.id));

    return {
      name: 'compute_metrics',
      status: 'failed',
      recordsFetched: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      errorMessage,
      durationMs,
    };
  }
}

/** Run generate_daily_digest and log to pipeline_runs */
export async function runGenerateDailyDigest(): Promise<SpecialJobResult> {
  const startTime = new Date();
  const startMs = startTime.getTime();
  const todayStr = startTime.toISOString().slice(0, 10);

  const [runRow] = await db
    .insert(pipelineRuns)
    .values({
      pipelineName: 'generate_daily_digest',
      status: 'running',
      startedAt: startTime,
    })
    .returning({ id: pipelineRuns.id });

  if (!runRow) {
    throw new Error('Failed to create pipeline_runs row for generate_daily_digest');
  }

  try {
    const digestGen = new DigestGenerator();
    const result = await digestGen.generateDaily(todayStr);
    const digestCount = (result.fr ? 1 : 0) + (result.en ? 1 : 0);
    const completedAt = new Date();
    const durationMs = completedAt.getTime() - startMs;

    await db
      .update(pipelineRuns)
      .set({
        status: 'success',
        recordsFetched: digestCount,
        recordsInserted: digestCount,
        recordsUpdated: 0,
        completedAt,
        durationMs,
      })
      .where(eq(pipelineRuns.id, runRow.id));

    return {
      name: 'generate_daily_digest',
      status: 'success',
      recordsFetched: digestCount,
      recordsInserted: digestCount,
      recordsUpdated: 0,
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
      .where(eq(pipelineRuns.id, runRow.id));

    return {
      name: 'generate_daily_digest',
      status: 'failed',
      recordsFetched: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      errorMessage,
      durationMs,
    };
  }
}
