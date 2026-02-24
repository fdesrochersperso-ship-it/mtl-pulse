import { NextRequest, NextResponse } from 'next/server';
import { PipelineRunner } from '@/lib/pipeline/runner';
import { pipelineRegistry } from '@/lib/pipeline/registry';
import { runComputeMetrics, runGenerateDailyDigest } from '@/lib/pipeline/special-jobs';
import { isSpecialJob } from '@/lib/pipeline/schedule-config';
import { notifyPipelineFailure } from '@/lib/alerting';

export const maxDuration = 300; // 5 min for long-running pipelines

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // No secret configured = allow all (dev mode)
  const authHeader = request.headers.get('authorization');
  const cronSecretHeader = request.headers.get('x-cron-secret');
  return (
    authHeader === `Bearer ${cronSecret}` ||
    cronSecretHeader === cronSecret
  );
}

/** All runnable pipeline names (registry + special jobs) */
const RUNNABLE_PIPELINES = new Set([
  ...pipelineRegistry.keys(),
  'compute_metrics',
  'generate_daily_digest',
]);

/**
 * GET/POST — Trigger a single pipeline by name.
 * Secured with CRON_SECRET (Authorization: Bearer <secret> or x-cron-secret header).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pipeline: string }> },
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pipeline: pipelineName } = await params;
  if (!pipelineName || !RUNNABLE_PIPELINES.has(pipelineName)) {
    const available = Array.from(RUNNABLE_PIPELINES).join(', ');
    return NextResponse.json(
      { error: `Unknown pipeline: "${pipelineName}". Available: ${available}` },
      { status: 404 },
    );
  }

  const startTime = Date.now();

  try {
    let result;

    if (isSpecialJob(pipelineName)) {
      if (pipelineName === 'compute_metrics') {
        result = await runComputeMetrics();
      } else if (pipelineName === 'generate_daily_digest') {
        result = await runGenerateDailyDigest();
      } else {
        return NextResponse.json({ error: 'Unknown special job' }, { status: 404 });
      }
    } else {
      const runner = new PipelineRunner();
      result = await runner.runByName(pipelineName);
    }

    if (result?.status === 'failed' && (result as { errorMessage?: string }).errorMessage) {
      notifyPipelineFailure({
        pipeline: pipelineName,
        error: (result as { errorMessage: string }).errorMessage,
        timestamp: new Date().toISOString(),
        durationMs: Date.now() - startTime,
        environment: process.env.NODE_ENV,
      }).catch(() => {});
    }

    return NextResponse.json({
      success: result.status === 'success',
      pipeline: pipelineName,
      result,
      timestamp: new Date().toISOString(),
      totalDurationMs: Date.now() - startTime,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const durationMs = Date.now() - startTime;
    console.error(`[cron/${pipelineName}] FAILED:`, msg);

    notifyPipelineFailure({
      pipeline: pipelineName,
      error: msg,
      timestamp: new Date().toISOString(),
      durationMs,
      environment: process.env.NODE_ENV,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: false,
        pipeline: pipelineName,
        error: msg,
        timestamp: new Date().toISOString(),
        totalDurationMs: durationMs,
      },
      { status: 500 },
    );
  }
}

/** POST — Same as GET, for manual triggering via curl/fetch */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ pipeline: string }> },
) {
  return GET(request, { params });
}
