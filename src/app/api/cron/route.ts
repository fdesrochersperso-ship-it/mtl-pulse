import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify cron secret to prevent unauthorized triggers
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // TODO: Run fetchers and aggregation once DB is connected
  // const crimeFetcher = new CrimeFetcher();
  // const result = await crimeFetcher.run();

  return NextResponse.json({
    success: true,
    message: 'Cron job placeholder — connect DB to activate fetchers',
    timestamp: new Date().toISOString(),
  });
}
