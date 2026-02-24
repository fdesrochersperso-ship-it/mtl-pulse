/**
 * Map data queries — bbox viewport filtering and radius search.
 * All layers support bounding box for efficient loading. Radius search uses Haversine formula.
 */

import { db } from '@/lib/db';
import {
  crimeIncidents,
  travaux,
  constructionPermits,
  roadObstructions,
  requests311,
  fireInterventions,
  potholeRepairs,
  boroughs,
} from '@/lib/db/schema';
import {
  and,
  sql,
  desc,
  isNotNull,
  eq,
  gte,
  lte,
  or,
  isNull,
} from 'drizzle-orm';
import { BOROUGH_CENTROIDS } from '@/lib/constants/boroughs';

export type Bbox = { minLat: number; maxLat: number; minLng: number; maxLng: number };
export type RadiusParams = { lat: number; lng: number; radiusM: number };

/** Haversine distance in meters — use in raw SQL for radius filter */
function haversineWhere(
  latCol: string,
  lngCol: string,
  centerLat: number,
  centerLng: number,
  radiusM: number
): string {
  return `(6371000 * 2 * asin(sqrt(
    power(sin(radians((${latCol})::float - ${centerLat}) / 2), 2) +
    cos(radians(${centerLat})) * cos(radians((${latCol})::float)) *
    power(sin(radians((${lngCol})::float - ${centerLng}) / 2), 2)
  ))) <= ${radiusM}`;
}

/** Bbox WHERE fragment — pass table.column for lat/lng */
function bboxWhere(tableLat: string, tableLng: string, bbox: Bbox) {
  return sql.raw(
    `(${tableLat})::float >= ${bbox.minLat} AND (${tableLat})::float <= ${bbox.maxLat} AND (${tableLng})::float >= ${bbox.minLng} AND (${tableLng})::float <= ${bbox.maxLng}`
  );
}

export type MapPoint = {
  id: number;
  lat: number;
  lng: number;
  layer: string;
  props: Record<string, unknown>;
};

// ─── Crime ───────────────────────────────────────────────────────────────────

export async function getCrimeMapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 1000;
  let conds = [
    isNotNull(crimeIncidents.lat),
    isNotNull(crimeIncidents.lng),
    sql`(${crimeIncidents.lat})::float != 0 OR (${crimeIncidents.lng})::float != 0`,
  ];
  if (opts.bbox) {
    conds.push(bboxWhere('crime_incidents.lat', 'crime_incidents.lng', opts.bbox));
  }
  if (opts.radius) {
    conds.push(
      sql.raw(
        haversineWhere(
          'crime_incidents.lat',
          'crime_incidents.lng',
          opts.radius.lat,
          opts.radius.lng,
          opts.radius.radiusM
        )
      )
    );
  }

  const rows = await db
    .select({
      id: crimeIncidents.id,
      lat: crimeIncidents.lat,
      lng: crimeIncidents.lng,
      category: crimeIncidents.category,
      incidentDate: crimeIncidents.incidentDate,
      shift: crimeIncidents.shift,
    })
    .from(crimeIncidents)
    .where(and(...conds))
    .orderBy(desc(crimeIncidents.incidentDate))
    .limit(limit);

  return rows
    .filter((r) => {
      const lat = parseFloat(String(r.lat));
      const lng = parseFloat(String(r.lng));
      return Number.isFinite(lat) && Number.isFinite(lng);
    })
    .map((r) => ({
      id: r.id,
      lat: parseFloat(String(r.lat)),
      lng: parseFloat(String(r.lng)),
      layer: 'crime',
      props: {
        category: r.category,
        incidentDate: String(r.incidentDate).slice(0, 10),
        shift: r.shift,
      },
    }));
}

// ─── Travaux (construction) — uses rawData lat/lng or borough centroid ───────

const todayStr = () => new Date().toISOString().slice(0, 10);

export async function getTravauxMapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 500;
  const activeCond = or(
    isNull(travaux.endDate),
    gte(travaux.endDate, todayStr())
  )!;

  const rows = await db
    .select({
      id: travaux.id,
      externalId: travaux.externalId,
      boroughCode: travaux.boroughCode,
      category: travaux.category,
      status: travaux.status,
      street: travaux.street,
      startDate: travaux.startDate,
      endDate: travaux.endDate,
      rawData: travaux.rawData,
    })
    .from(travaux)
    .where(activeCond)
    .orderBy(desc(travaux.startDate))
    .limit(limit * 2);

  const points: MapPoint[] = [];
  for (const r of rows) {
    let lat: number;
    let lng: number;
    const raw = r.rawData as Record<string, unknown> | null;
    const rawLat = raw?.latitude ?? raw?.LATITUDE;
    const rawLng = raw?.longitude ?? raw?.LONGITUDE;
    if (
      rawLat != null &&
      rawLng != null &&
      Number.isFinite(Number(rawLat)) &&
      Number.isFinite(Number(rawLng))
    ) {
      lat = Number(rawLat);
      lng = Number(rawLng);
    } else {
      const centroid = r.boroughCode
        ? BOROUGH_CENTROIDS[r.boroughCode as keyof typeof BOROUGH_CENTROIDS]
        : [45.5017, -73.5673] as [number, number];
      lat = centroid[0];
      lng = centroid[1];
    }

    if (opts.bbox && (lat < opts.bbox.minLat || lat > opts.bbox.maxLat || lng < opts.bbox.minLng || lng > opts.bbox.maxLng)) {
      continue;
    }
    if (opts.radius) {
      const R = 6371000;
      const dLat = ((opts.radius.lat - lat) * Math.PI) / 180;
      const dLng = ((opts.radius.lng - lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((opts.radius.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      if (R * c > opts.radius.radiusM) continue;
    }

    points.push({
      id: r.id,
      lat,
      lng,
      layer: 'travaux',
      props: {
        externalId: r.externalId,
        category: r.category,
        status: r.status,
        street: r.street,
        startDate: r.startDate,
        endDate: r.endDate,
      },
    });
    if (points.length >= limit) break;
  }
  return points;
}

// ─── 311 ────────────────────────────────────────────────────────────────────

export async function get311MapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 500;
  let conds = [
    isNotNull(requests311.lat),
    isNotNull(requests311.lng),
    sql`(${requests311.nature} IS NULL OR ${requests311.nature}::text NOT ILIKE 'Information')`,
  ];
  if (opts.bbox) {
    conds.push(bboxWhere('requests_311.lat', 'requests_311.lng', opts.bbox));
  }
  if (opts.radius) {
    conds.push(
      sql.raw(
        haversineWhere(
          'requests_311.lat',
          'requests_311.lng',
          opts.radius.lat,
          opts.radius.lng,
          opts.radius.radiusM
        )
      )
    );
  }

  const rows = await db
    .select({
      id: requests311.id,
      requestId: requests311.requestId,
      nature: requests311.nature,
      requestType: requests311.requestType,
      status: requests311.status,
      lat: requests311.lat,
      lng: requests311.lng,
      createdAt: requests311.createdAt,
    })
    .from(requests311)
    .where(and(...conds))
    .orderBy(desc(requests311.createdAt))
    .limit(limit);

  return rows
    .filter((r) => {
      const lat = parseFloat(String(r.lat));
      const lng = parseFloat(String(r.lng));
      return Number.isFinite(lat) && Number.isFinite(lng);
    })
    .map((r) => ({
      id: r.id,
      lat: parseFloat(String(r.lat)),
      lng: parseFloat(String(r.lng)),
      layer: '311',
      props: {
        requestId: r.requestId,
        nature: r.nature,
        requestType: r.requestType,
        status: r.status,
        createdAt: r.createdAt,
      },
    }));
}

// ─── Permits ──────────────────────────────────────────────────────────────────

export async function getPermitsMapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 500;
  let conds = [
    isNotNull(constructionPermits.lat),
    isNotNull(constructionPermits.lng),
  ];
  if (opts.bbox) {
    conds.push(bboxWhere('construction_permits.lat', 'construction_permits.lng', opts.bbox));
  }
  if (opts.radius) {
    conds.push(
      sql.raw(
        haversineWhere(
          'construction_permits.lat',
          'construction_permits.lng',
          opts.radius.lat,
          opts.radius.lng,
          opts.radius.radiusM
        )
      )
    );
  }

  const rows = await db
    .select({
      id: constructionPermits.id,
      permitNumber: constructionPermits.permitNumber,
      permitType: constructionPermits.permitType,
      dateIssued: constructionPermits.dateIssued,
      estimatedCost: constructionPermits.estimatedCost,
      lat: constructionPermits.lat,
      lng: constructionPermits.lng,
    })
    .from(constructionPermits)
    .where(and(...conds))
    .orderBy(desc(constructionPermits.dateIssued))
    .limit(limit);

  return rows
    .filter((r) => {
      const lat = parseFloat(String(r.lat));
      const lng = parseFloat(String(r.lng));
      return Number.isFinite(lat) && Number.isFinite(lng);
    })
    .map((r) => ({
      id: r.id,
      lat: parseFloat(String(r.lat)),
      lng: parseFloat(String(r.lng)),
      layer: 'permits',
      props: {
        permitNumber: r.permitNumber,
        permitType: r.permitType,
        dateIssued: String(r.dateIssued).slice(0, 10),
        estimatedCost: r.estimatedCost,
      },
    }));
}

// ─── Fire ────────────────────────────────────────────────────────────────────

export async function getFireMapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 500;
  let conds = [
    isNotNull(fireInterventions.lat),
    isNotNull(fireInterventions.lng),
  ];
  if (opts.bbox) {
    conds.push(bboxWhere('fire_interventions.lat', 'fire_interventions.lng', opts.bbox));
  }
  if (opts.radius) {
    conds.push(
      sql.raw(
        haversineWhere(
          'fire_interventions.lat',
          'fire_interventions.lng',
          opts.radius.lat,
          opts.radius.lng,
          opts.radius.radiusM
        )
      )
    );
  }

  const rows = await db
    .select({
      id: fireInterventions.id,
      incidentType: fireInterventions.incidentType,
      incidentDate: fireInterventions.incidentDate,
      numUnits: fireInterventions.numUnits,
      lat: fireInterventions.lat,
      lng: fireInterventions.lng,
    })
    .from(fireInterventions)
    .where(and(...conds))
    .orderBy(desc(fireInterventions.incidentDate))
    .limit(limit);

  return rows
    .filter((r) => {
      const lat = parseFloat(String(r.lat));
      const lng = parseFloat(String(r.lng));
      return Number.isFinite(lat) && Number.isFinite(lng);
    })
    .map((r) => ({
      id: r.id,
      lat: parseFloat(String(r.lat)),
      lng: parseFloat(String(r.lng)),
      layer: 'fire',
      props: {
        incidentType: r.incidentType,
        incidentDate: String(r.incidentDate).slice(0, 10),
        numUnits: r.numUnits,
      },
    }));
}

// ─── Potholes ────────────────────────────────────────────────────────────────

export async function getPotholesMapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 500;
  let conds = [
    isNotNull(potholeRepairs.lat),
    isNotNull(potholeRepairs.lng),
  ];
  if (opts.bbox) {
    conds.push(bboxWhere('pothole_repairs.lat', 'pothole_repairs.lng', opts.bbox));
  }
  if (opts.radius) {
    conds.push(
      sql.raw(
        haversineWhere(
          'pothole_repairs.lat',
          'pothole_repairs.lng',
          opts.radius.lat,
          opts.radius.lng,
          opts.radius.radiusM
        )
      )
    );
  }

  const rows = await db
    .select({
      id: potholeRepairs.id,
      repairDate: potholeRepairs.repairDate,
      boroughCode: potholeRepairs.boroughCode,
      lat: potholeRepairs.lat,
      lng: potholeRepairs.lng,
    })
    .from(potholeRepairs)
    .where(and(...conds))
    .orderBy(desc(potholeRepairs.repairDate))
    .limit(limit);

  return rows
    .filter((r) => {
      const lat = parseFloat(String(r.lat));
      const lng = parseFloat(String(r.lng));
      return Number.isFinite(lat) && Number.isFinite(lng);
    })
    .map((r) => ({
      id: r.id,
      lat: parseFloat(String(r.lat)),
      lng: parseFloat(String(r.lng)),
      layer: 'potholes',
      props: {
        repairDate: String(r.repairDate).slice(0, 10),
        boroughCode: r.boroughCode,
      },
    }));
}

// ─── Obstructions ────────────────────────────────────────────────────────────

export async function getObstructionsMapPoints(
  opts: { bbox?: Bbox; radius?: RadiusParams; limit?: number } = {}
): Promise<MapPoint[]> {
  const limit = opts.limit ?? 500;
  let conds = [
    isNotNull(roadObstructions.lat),
    isNotNull(roadObstructions.lng),
  ];
  if (opts.bbox) {
    conds.push(bboxWhere('road_obstructions.lat', 'road_obstructions.lng', opts.bbox));
  }
  if (opts.radius) {
    conds.push(
      sql.raw(
        haversineWhere(
          'road_obstructions.lat',
          'road_obstructions.lng',
          opts.radius.lat,
          opts.radius.lng,
          opts.radius.radiusM
        )
      )
    );
  }

  const rows = await db
    .select({
      id: roadObstructions.id,
      sourceId: roadObstructions.sourceId,
      street: roadObstructions.street,
      direction: roadObstructions.direction,
      obstructionType: roadObstructions.obstructionType,
      status: roadObstructions.status,
      lat: roadObstructions.lat,
      lng: roadObstructions.lng,
    })
    .from(roadObstructions)
    .where(and(...conds))
    .orderBy(desc(roadObstructions.startTime))
    .limit(limit);

  return rows
    .filter((r) => {
      const lat = parseFloat(String(r.lat));
      const lng = parseFloat(String(r.lng));
      return Number.isFinite(lat) && Number.isFinite(lng);
    })
    .map((r) => ({
      id: r.id,
      lat: parseFloat(String(r.lat)),
      lng: parseFloat(String(r.lng)),
      layer: 'obstructions',
      props: {
        sourceId: r.sourceId,
        street: r.street,
        direction: r.direction,
        obstructionType: r.obstructionType,
        status: r.status,
      },
    }));
}

// ─── Borough Boundaries ────────────────────────────────────────────────────

export type BoroughBoundary = { code: string; name: string; geometry: unknown };

export async function getBoroughBoundaries(): Promise<BoroughBoundary[]> {
  const rows = await db
    .select({
      code: boroughs.code,
      name: boroughs.name,
      geometry: boroughs.geometry,
    })
    .from(boroughs);

  return rows
    .filter((r) => r.geometry != null)
    .map((r) => ({
      code: r.code,
      name: r.name,
      geometry: r.geometry,
    }));
}

// ─── Nearby (radius search across all layers) ────────────────────────────────

export async function getNearbyMapPoints(
  lat: number,
  lng: number,
  radiusM: number,
  layers?: string[]
): Promise<{ layer: string; features: MapPoint[] }[]> {
  const radius: RadiusParams = { lat, lng, radiusM };
  const allLayers = layers ?? [
    'crime',
    'travaux',
    '311',
    'permits',
    'fire',
    'potholes',
    'obstructions',
  ];

  const results: { layer: string; features: MapPoint[] }[] = [];

  const fetchers: Record<string, () => Promise<MapPoint[]>> = {
    crime: () => getCrimeMapPoints({ radius, limit: 200 }),
    travaux: () => getTravauxMapPoints({ radius, limit: 200 }),
    '311': () => get311MapPoints({ radius, limit: 200 }),
    permits: () => getPermitsMapPoints({ radius, limit: 200 }),
    fire: () => getFireMapPoints({ radius, limit: 200 }),
    potholes: () => getPotholesMapPoints({ radius, limit: 200 }),
    obstructions: () => getObstructionsMapPoints({ radius, limit: 200 }),
  };

  for (const layer of allLayers) {
    const fn = fetchers[layer];
    if (!fn) continue;
    const features = await fn();
    if (features.length > 0) {
      results.push({ layer, features });
    }
  }

  return results;
}
