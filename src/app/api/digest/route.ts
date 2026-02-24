import { NextRequest, NextResponse } from 'next/server';
import { DigestGenerator } from '@/lib/ai/digest-generator';
import { startOfWeek } from 'date-fns';

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // No secret configured = allow all (dev mode)
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

function parseDate(dateParam: string | null): string {
  if (!dateParam) return new Date().toISOString().slice(0, 10);
  if (dateParam.toLowerCase() === 'today') {
    return new Date().toISOString().slice(0, 10);
  }
  const d = new Date(dateParam);
  if (isNaN(d.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return d.toISOString().slice(0, 10);
}

/** GET — return latest digest info (kept for backward compat, returns stub) */
export async function GET() {
  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    message: 'Use POST to generate digests. Use homepage to view latest.',
  });
}

/** POST — generate digest. Body: { type, date?, language?, boroughCode? } */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { type?: string; date?: string; language?: 'fr' | 'en'; boroughCode?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { type = 'daily', date: dateParam, language, boroughCode } = body;
  const dateStr = parseDate(dateParam ?? null);

  if (type === 'borough' && !boroughCode) {
    return NextResponse.json(
      { error: 'boroughCode required for type=borough' },
      { status: 400 }
    );
  }

  const gen = new DigestGenerator();

  try {
    let result: { fr?: { id: number }; en?: { id: number } };

    if (type === 'daily') {
      result = await gen.generateDaily(dateStr, language);
    } else if (type === 'weekly') {
      const weekStart = startOfWeek(new Date(dateStr), { weekStartsOn: 1 }).toISOString().slice(0, 10);
      result = await gen.generateWeekly(weekStart, language);
    } else if (type === 'borough' && boroughCode) {
      result = await gen.generateBoroughDaily(boroughCode, dateStr, language);
    } else {
      return NextResponse.json(
        { error: `Unknown type: ${type}. Use daily, weekly, or borough.` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      type,
      date: dateStr,
      boroughCode: type === 'borough' ? boroughCode : undefined,
      result,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[digest API] Generation failed:', msg);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
