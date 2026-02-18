import { NextRequest, NextResponse } from 'next/server';
import { CrimeFetcher } from '@/lib/fetchers/crime';
import { InfoTravauxFetcher } from '@/lib/fetchers/info-travaux';
import { Requests311Fetcher } from '@/lib/fetchers/requests-311';
import { aggregateDailyMetrics } from '@/lib/aggregators/daily-metrics';
import type { FetchResult } from '@/types';

export const maxDuration = 300; // Allow up to 5 minutes

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

  return NextResponse.json({
    success: errors.length === 0,
    timestamp: new Date().toISOString(),
    results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
