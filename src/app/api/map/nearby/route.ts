/**
 * "What's near me?" radius search API.
 * GET /api/map/nearby?lat=45.5&lng=-73.57&radius=500&layers=crime,311,permits
 * Uses Haversine formula (no PostGIS required). Radius in meters: 100, 250, 500, 1000.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getNearbyMapPoints } from '@/lib/db/queries/map';

const ALLOWED_RADII = [100, 250, 500, 1000];

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
  const radiusParam = req.nextUrl.searchParams.get('radius');
  const layersParam = req.nextUrl.searchParams.get('layers');

  const latNum = lat != null ? parseFloat(lat) : NaN;
  const lngNum = lng != null ? parseFloat(lng) : NaN;

  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
    return NextResponse.json(
      { error: 'Missing or invalid lat/lng parameters' },
      { status: 400 }
    );
  }

  let radiusM = 500;
  if (radiusParam) {
    const r = parseInt(radiusParam, 10);
    if (ALLOWED_RADII.includes(r)) {
      radiusM = r;
    }
  }

  const layers =
    layersParam?.split(',').map((s) => s.trim()).filter(Boolean) ?? undefined;

  try {
    const results = await getNearbyMapPoints(latNum, lngNum, radiusM, layers);

    const geojson = {
      type: 'FeatureCollection' as const,
      features: results.flatMap(({ layer, features }) =>
        features.map((p) => ({
          type: 'Feature' as const,
          id: `${layer}-${p.id}`,
          geometry: {
            type: 'Point' as const,
            coordinates: [p.lng, p.lat],
          },
          properties: {
            layer,
            ...p.props,
          },
        }))
      ),
      meta: {
        center: [latNum, lngNum],
        radiusM,
        layers: results.map((r) => r.layer),
        counts: Object.fromEntries(
          results.map((r) => [r.layer, r.features.length])
        ),
      },
    };

    return NextResponse.json(geojson, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    console.error('Nearby search error:', err);
    return NextResponse.json(
      { error: 'Failed to search nearby' },
      { status: 500 }
    );
  }
}
