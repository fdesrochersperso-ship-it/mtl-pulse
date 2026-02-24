import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { PipelineRunner } from '@/lib/pipeline/runner';
import { pipelineRegistry } from '@/lib/pipeline/registry';
import { runComputeMetrics, runGenerateDailyDigest } from '@/lib/pipeline/special-jobs';
import { isSpecialJob } from '@/lib/pipeline/schedule-config';

const RUNNABLE_PIPELINES = new Set([
  ...pipelineRegistry.keys(),
  'compute_metrics',
  'generate_daily_digest',
]);

export const maxDuration = 300;

/**
 * POST — Manually trigger a pipeline. Requires admin authentication.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ pipeline: string }> },
) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
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

    return NextResponse.json({
      success: result.status === 'success',
      pipeline: pipelineName,
      result,
      timestamp: new Date().toISOString(),
      totalDurationMs: Date.now() - startTime,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[admin/run/${pipelineName}] FAILED:`, msg);
    return NextResponse.json(
      {
        success: false,
        pipeline: pipelineName,
        error: msg,
        timestamp: new Date().toISOString(),
        totalDurationMs: Date.now() - startTime,
      },
      { status: 500 },
    );
  }
}
