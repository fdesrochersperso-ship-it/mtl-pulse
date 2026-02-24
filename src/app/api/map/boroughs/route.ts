/**
 * Borough boundaries GeoJSON API for map overlay.
 * GET /api/map/boroughs
 * Returns 19 arrondissements as polygon outlines.
 */

import { NextResponse } from 'next/server';
import { getBoroughBoundaries } from '@/lib/db/queries/map';

export async function GET() {
  try {
    const boundaries = await getBoroughBoundaries();

    const features = boundaries
      .filter((b) => b.geometry != null)
      .map((b) => {
        const geom = b.geometry as { type?: string; coordinates?: unknown };
        return {
          type: 'Feature' as const,
          properties: { code: b.code, name: b.name },
          geometry: geom,
        };
      });

    const geojson = {
      type: 'FeatureCollection' as const,
      features,
    };

    return NextResponse.json(geojson, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    console.error('Borough boundaries error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch borough boundaries' },
      { status: 500 }
    );
  }
}
