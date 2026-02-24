import { NextResponse } from 'next/server';
import { getPipelineStatuses } from '@/lib/db/queries/pipeline-status';
import { PIPELINE_SCHEDULES, getScheduleConfig } from '@/lib/pipeline/schedule-config';

/**
 * GET /api/health
 * Returns JSON status of all pipelines for external monitoring (UptimeRobot, etc.).
 * No auth required - use for public health checks.
 */
export async function GET() {
  try {
    const statuses = await getPipelineStatuses();

    // Merge with schedule config for pipelines in our cron schedule
    const pipelineNames = new Set([
      ...PIPELINE_SCHEDULES.map((s) => s.name),
      ...statuses.map((s) => s.pipelineName),
    ]);

    const pipelines = Array.from(pipelineNames).map((name) => {
      const status = statuses.find((s) => s.pipelineName === name);
      const schedule = getScheduleConfig(name);

      return {
        name,
        status: status?.freshnessStatus ?? 'unknown',
        lastRun: status?.lastSuccessAt ?? null,
        lastStatus: status?.lastStatus ?? null,
        scheduleType: status?.scheduleType ?? schedule?.scheduleType ?? 'daily',
        hoursSinceSuccess: status?.hoursSinceSuccess ?? null,
      };
    });

    const healthy = pipelines.filter((p) => p.status === 'green').length;
    const total = pipelines.length;
    const overallStatus = healthy === total ? 'healthy' : healthy > 0 ? 'degraded' : 'unhealthy';

    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      pipelines,
      summary: {
        total,
        healthy,
        degraded: pipelines.filter((p) => p.status === 'yellow').length,
        unhealthy: pipelines.filter((p) => p.status === 'red').length,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[health] Error:', msg);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: msg,
      },
      { status: 500 },
    );
  }
}
