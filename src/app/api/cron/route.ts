import { NextRequest, NextResponse } from 'next/server';
import { PipelineRunner } from '@/lib/pipeline/runner';
import { pipelineRegistry } from '@/lib/pipeline/registry';
import { runMetricComputations } from '@/lib/pipeline/metrics-computer';
import { DigestGenerator } from '@/lib/ai/digest-generator';

export const maxDuration = 300; // 5 min for pipelines + metrics + digests

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // No secret configured = allow all (dev mode)
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

async function runCron() {
  const startTotal = Date.now();
  const errors: string[] = [];
  const log: { step: string; durationMs: number; details?: unknown }[] = [];

  const runner = new PipelineRunner();
  const pipelineNames = Array.from(pipelineRegistry.keys());

  // ─── Step 1: Run all pipelines ───────────────────────────────────────────
  const pipelineStart = Date.now();
  console.log(`[cron] Step 1: Running ${pipelineNames.length} pipelines...`);

  const pipelineResults: { name: string; status: string; durationMs: number }[] = [];

  for (const name of pipelineNames) {
    const stepStart = Date.now();
    try {
      const result = await runner.runByName(name);
      pipelineResults.push({
        name,
        status: result.status,
        durationMs: result.durationMs ?? Date.now() - stepStart,
      });
      if (result.status === 'failed' && result.errorMessage) {
        errors.push(`${name}: ${result.errorMessage}`);
      }
      console.log(`[cron] ${name}: ${result.status} — ${result.durationMs}ms`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      errors.push(`pipeline ${name}: ${msg}`);
      pipelineResults.push({ name, status: 'failed', durationMs: Date.now() - stepStart });
      console.error(`[cron] ${name}: FAILED — ${msg}`);
    }
  }

  const pipelineDuration = Date.now() - pipelineStart;
  log.push({ step: 'pipelines', durationMs: pipelineDuration, details: pipelineResults });
  console.log(`[cron] Step 1 complete: ${pipelineNames.length} pipelines in ${pipelineDuration}ms`);

  // ─── Step 2: Compute metrics ───────────────────────────────────────────────
  const metricsStart = Date.now();
  console.log('[cron] Step 2: Computing metrics...');

  try {
    await runMetricComputations();
    const metricsDuration = Date.now() - metricsStart;
    log.push({ step: 'metrics', durationMs: metricsDuration });
    console.log(`[cron] Step 2 complete: metrics computed in ${metricsDuration}ms`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    errors.push(`metrics: ${msg}`);
    console.error('[cron] Step 2 FAILED:', msg);
  }

  // ─── Step 3: Generate digests ─────────────────────────────────────────────
  const todayStr = new Date().toISOString().slice(0, 10);
  const digestStart = Date.now();
  console.log('[cron] Step 3: Generating daily digests (FR + EN)...');

  const digestGen = new DigestGenerator();
  try {
    await digestGen.generateDaily(todayStr); // Generates FR + EN
    const digestDuration = Date.now() - digestStart;
    log.push({ step: 'digests', durationMs: digestDuration });
    console.log(`[cron] Step 3 complete: digests generated in ${digestDuration}ms`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    errors.push(`digests: ${msg}`);
    console.error('[cron] Step 3 FAILED:', msg);
  }

  const totalDuration = Date.now() - startTotal;
  console.log(`[cron] Full cron complete in ${totalDuration}ms. Errors: ${errors.length}`);

  return {
    success: errors.length === 0,
    timestamp: new Date().toISOString(),
    totalDurationMs: totalDuration,
    log,
    pipelineResults,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/** GET — called by Vercel Cron Jobs */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const result = await runCron();
  return NextResponse.json(result);
}

/** POST — kept for manual triggering via curl */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const result = await runCron();
  return NextResponse.json(result);
}
