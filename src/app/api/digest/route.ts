import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch latest digest from daily_digests table
  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    summaryFr: 'Résumé en cours de génération...',
    summaryEn: 'Summary being generated...',
    message: 'Connect DB and Anthropic API to generate real digests',
  });
}

export async function POST() {
  // TODO: Generate digest via Claude API and store in DB
  return NextResponse.json({
    success: false,
    message: 'Connect ANTHROPIC_API_KEY to generate digests',
  });
}
