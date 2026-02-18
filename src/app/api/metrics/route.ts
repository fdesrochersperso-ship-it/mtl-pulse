import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dailyMetrics } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') ?? new Date().toISOString().slice(0, 10);
  const borough = searchParams.get('borough') ?? 'MTL';

  try {
    const metrics = await db
      .select()
      .from(dailyMetrics)
      .where(
        and(
          eq(dailyMetrics.date, date),
          eq(dailyMetrics.boroughCode, borough),
        ),
      );

    return NextResponse.json({
      date,
      borough,
      count: metrics.length,
      metrics: metrics.map((m) => ({
        category: m.category,
        metricKey: m.metricKey,
        value: Number(m.metricValue),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch metrics', date, borough },
      { status: 500 },
    );
  }
}
