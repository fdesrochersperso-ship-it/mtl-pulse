import { NextRequest, NextResponse } from 'next/server';
import { CrimeFetcher } from '@/lib/fetchers/crime';
import { InfoTravauxFetcher } from '@/lib/fetchers/info-travaux';
import { Requests311Fetcher } from '@/lib/fetchers/requests-311';
import { aggregateDailyMetrics } from '@/lib/aggregators/daily-metrics';
import type { FetchResult } from '@/types';

export const maxDuration = 60; // Vercel Hobby plan limit

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // No secret configured = allow all (dev mode)
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

async function runCron() {
  const results: FetchResult[] = [];
  const errors: string[] = [];

  // Run fetchers sequentially to be respectful of external APIs
  const fetchers = [
    new CrimeFetcher(),
    new InfoTravauxFetcher(),
    new Requests311Fetcher(),
  ];

  for (const fetcher of fetchers) {
    try {
      const result = await fetcher.run();
      results.push(result);
      if (!result.success) {
        errors.push(`${result.sourceKey}: ${result.errorMessage}`);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      errors.push(`${fetcher.sourceKey}: ${msg}`);
    }
  }

  // Run daily aggregation for yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const targetDate = yesterday.toISOString().slice(0, 10);

  try {
    const aggResults = await aggregateDailyMetrics(targetDate);
    console.log('[cron] Aggregation results:', aggResults);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    errors.push(`aggregation: ${msg}`);
  }

  return {
    success: errors.length === 0,
    timestamp: new Date().toISOString(),
    results,
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
