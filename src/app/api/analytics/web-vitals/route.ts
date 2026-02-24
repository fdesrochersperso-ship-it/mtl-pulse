/**
 * Web Vitals receiver.
 * POST body: { name, value, rating, id, navigationType }
 * In production, forward to your analytics (e.g. Vercel Analytics, custom).
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, value, rating } = body;

    if (!name || value === undefined) {
      return NextResponse.json({ error: "Missing name or value" }, { status: 400 });
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Web Vitals]", name, value, rating);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
