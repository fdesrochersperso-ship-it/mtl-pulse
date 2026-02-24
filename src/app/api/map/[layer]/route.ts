/**
 * Map layer GeoJSON API — bounding box queries for efficient viewport loading.
 * GET /api/map/crime?minLat=45.4&maxLat=45.6&minLng=-73.7&maxLng=-73.4&limit=500
 * Cache: data updates daily for most layers — use stale-while-revalidate.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getCrimeMapPoints,
  getTravauxMapPoints,
  get311MapPoints,
  getPermitsMapPoints,
  getFireMapPoints,
  getPotholesMapPoints,
  getObstructionsMapPoints,
} from '@/lib/db/queries/map';

const LAYER_HANDLERS: Record<
  string,
  (opts: { bbox?: Bbox; limit?: number }) => Promise<{ id: number; lat: number; lng: number; layer: string; props: Record<string, unknown> }[]>
> = {
  crime: getCrimeMapPoints,
  travaux: getTravauxMapPoints,
  '311': get311MapPoints,
  permits: getPermitsMapPoints,
  fire: getFireMapPoints,
  potholes: getPotholesMapPoints,
  obstructions: getObstructionsMapPoints,
};

type Bbox = { minLat: number; maxLat: number; minLng: number; maxLng: number };

function parseBbox(req: NextRequest): Bbox | undefined {
  const minLat = req.nextUrl.searchParams.get('minLat');
  const maxLat = req.nextUrl.searchParams.get('maxLat');
  const minLng = req.nextUrl.searchParams.get('minLng');
  const maxLng = req.nextUrl.searchParams.get('maxLng');
  if (!minLat || !maxLat || !minLng || !maxLng) return undefined;
  const bbox = {
    minLat: parseFloat(minLat),
    maxLat: parseFloat(maxLat),
    minLng: parseFloat(minLng),
    maxLng: parseFloat(maxLng),
  };
  if (
    !Number.isFinite(bbox.minLat) ||
    !Number.isFinite(bbox.maxLat) ||
    !Number.isFinite(bbox.minLng) ||
    !Number.isFinite(bbox.maxLng)
  ) {
    return undefined;
  }
  return bbox;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ layer: string }> }
) {
  const { layer } = await params;
  const handler = LAYER_HANDLERS[layer];
  if (!handler) {
    return NextResponse.json(
      { error: `Unknown layer: ${layer}. Valid: crime, travaux, 311, permits, fire, potholes, obstructions` },
      { status: 400 }
    );
  }

  const bbox = parseBbox(req);
  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 500, 2000) : 500;

  try {
    const points = await handler({ bbox, limit });

    const geojson = {
      type: 'FeatureCollection' as const,
      features: points.map((p) => ({
        type: 'Feature' as const,
        id: p.id,
        geometry: {
          type: 'Point' as const,
          coordinates: [p.lng, p.lat],
        },
        properties: {
          layer: p.layer,
          ...p.props,
        },
      })),
    };

    return NextResponse.json(geojson, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error(`Map layer ${layer} error:`, err);
    return NextResponse.json(
      { error: 'Failed to fetch map data' },
      { status: 500 }
    );
  }
}
