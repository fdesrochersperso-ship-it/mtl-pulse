import { NextRequest, NextResponse } from 'next/server';
import { PipelineRunner } from '@/lib/pipeline/runner';

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // No secret configured = allow all (dev mode)
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

/** POST — run a pipeline by name */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await params;
  const runner = new PipelineRunner();

  try {
    const result = await runner.runByName(name);
    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: msg, name, status: 'failed' },
      { status: 400 }
    );
  }
}
