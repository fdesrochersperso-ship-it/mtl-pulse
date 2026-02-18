import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') ?? new Date().toISOString().slice(0, 10);
  const borough = searchParams.get('borough');

  // TODO: Query daily_metrics table once DB is connected
  // const metrics = await db.select().from(dailyMetrics).where(...)

  return NextResponse.json({
    date,
    borough: borough ?? 'MTL',
    metrics: [],
    message: 'Connect DB to return real metrics',
  });
}
