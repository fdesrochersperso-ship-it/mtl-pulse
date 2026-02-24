/**
 * Cross-source analysis queries.
 * Creates "aha" moments: construction+311, potholes+311, crime+fire safety index,
 * winter ops composite, permits in construction zones.
 */

import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { BOROUGHS } from '@/lib/constants/boroughs';

const todayStr = () => new Date().toISOString().slice(0, 10);

export type ConstructionComplaintsResult = {
  nearSitesCount: number;
  farSitesCount: number;
  nearComplaints: number;
  farComplaints: number;
  pctMoreNear: number | null;
  message: string;
};

/**
 * Construction + 311 complaints correlation.
 * 311 construction-related requests within 500m of active travaux vs elsewhere.
 */
export async function getConstructionComplaintsCorrelation(): Promise<ConstructionComplaintsResult> {
  const today = todayStr();

  const result = await db.execute(
    sql.raw(`
      WITH active_travaux AS (
        SELECT id, 
          COALESCE((raw_data->>'latitude')::numeric, (raw_data->>'LATITUDE')::numeric) AS lat,
          COALESCE((raw_data->>'longitude')::numeric, (raw_data->>'LONGITUDE')::numeric) AS lng
        FROM travaux
        WHERE (end_date IS NULL OR end_date >= '${today}')
          AND raw_data IS NOT NULL
          AND (
            (raw_data->>'latitude') IS NOT NULL OR (raw_data->>'LATITUDE') IS NOT NULL
          )
          AND (
            (raw_data->>'longitude') IS NOT NULL OR (raw_data->>'LONGITUDE') IS NOT NULL
          )
      ),
      construction_311 AS (
        SELECT id, (lat)::numeric AS lat, (lng)::numeric AS lng
        FROM requests_311
        WHERE lat IS NOT NULL AND lng IS NOT NULL
          AND (
            request_type ILIKE '%travaux%' OR request_type ILIKE '%chantier%'
            OR request_type ILIKE '%construction%' OR request_type ILIKE '%bruit%'
            OR request_type ILIKE '%voirie%' OR request_type ILIKE '%excavation%'
            OR request_type ILIKE '%entrave%' OR request_type ILIKE '%obstruction%'
          )
          AND created_at >= NOW() - INTERVAL '90 days'
      ),
      near AS (
        SELECT r.id
        FROM construction_311 r
        WHERE EXISTS (
          SELECT 1 FROM active_travaux t
          WHERE (6371000 * 2 * asin(sqrt(
            power(sin(radians((r.lat)::float - (t.lat)::float) / 2), 2) +
            cos(radians((t.lat)::float)) * cos(radians((r.lat)::float)) *
            power(sin(radians((r.lng)::float - (t.lng)::float) / 2), 2)
          ))) <= 500
        )
      ),
      far AS (
        SELECT r.id
        FROM construction_311 r
        WHERE NOT EXISTS (
          SELECT 1 FROM active_travaux t
          WHERE (6371000 * 2 * asin(sqrt(
            power(sin(radians((r.lat)::float - (t.lat)::float) / 2), 2) +
            cos(radians((t.lat)::float)) * cos(radians((r.lat)::float)) *
            power(sin(radians((r.lng)::float - (t.lng)::float) / 2), 2)
          ))) <= 500
        )
      )
      SELECT
        (SELECT COUNT(*) FROM near)::int AS near_complaints,
        (SELECT COUNT(*) FROM far)::int AS far_complaints,
        (SELECT COUNT(*) FROM active_travaux)::int AS active_sites
    `)
  );

  const row = (result.rows?.[0] || {}) as {
    near_complaints: number;
    far_complaints: number;
    active_sites: number;
  };
  const nearComplaints = Number(row.near_complaints ?? 0);
  const farComplaints = Number(row.far_complaints ?? 0);
  const activeSites = Number(row.active_sites ?? 0);

  let pctMoreNear: number | null = null;
  if (farComplaints > 0) {
    pctMoreNear = Math.round(((nearComplaints - farComplaints) / farComplaints) * 100);
  }

  const message =
    pctMoreNear != null && pctMoreNear > 0
      ? `Les chantiers actifs génèrent environ ${pctMoreNear}% plus de plaintes 311 dans les 500 m environnants.`
      : nearComplaints > 0
        ? 'Des plaintes 311 liées aux travaux sont concentrées près des chantiers actifs.'
        : 'Pas assez de données pour établir une corrélation.';

  return {
    nearSitesCount: activeSites,
    farSitesCount: 0,
    nearComplaints,
    farComplaints,
    pctMoreNear,
    message,
  };
}

export type Potholes311CorrelationRow = {
  boroughCode: string;
  boroughName: string;
  repairsCount: number;
  complaints311: number;
  gap: number;
  backlogRatio: number | null;
};

/**
 * Potholes + 311 correlation — repairs vs complaints by borough.
 * Gap = complaint backlog. Positive gap = more complaints than repairs.
 */
export async function getPotholes311Correlation(
  startDate: string,
  endDate: string
): Promise<Potholes311CorrelationRow[]> {
  const result = await db.execute(
    sql.raw(`
      WITH repairs AS (
        SELECT borough_code, COUNT(*)::int AS cnt
        FROM pothole_repairs
        WHERE repair_date >= '${startDate}' AND repair_date <= '${endDate}'
          AND borough_code IS NOT NULL
        GROUP BY borough_code
      ),
      complaints AS (
        SELECT borough_code, COUNT(*)::int AS cnt
        FROM requests_311
        WHERE created_at >= '${startDate}' AND created_at <= '${endDate}T23:59:59'
          AND borough_code IS NOT NULL
          AND (
            request_type ILIKE '%nid%' OR request_type ILIKE '%poule%'
            OR request_type ILIKE '%chaussée%' OR request_type ILIKE '%asphalt%'
            OR request_type ILIKE '%pothole%' OR request_type ILIKE '%trou%'
          )
        GROUP BY borough_code
      )
      SELECT
        COALESCE(r.borough_code, c.borough_code) AS borough_code,
        COALESCE(r.cnt, 0)::int AS repairs,
        COALESCE(c.cnt, 0)::int AS complaints
      FROM repairs r
      FULL OUTER JOIN complaints c ON r.borough_code = c.borough_code
    `)
  );

  const rows = (result.rows || []) as { borough_code: string; repairs: number; complaints: number }[];
  return rows
    .map((r) => {
      const repairs = Number(r.repairs);
      const complaints = Number(r.complaints);
      const gap = complaints - repairs;
      const backlogRatio = repairs > 0 ? Math.round((gap / repairs) * 100) / 100 : null;
      const boroughName = BOROUGHS[r.borough_code as keyof typeof BOROUGHS]?.name ?? r.borough_code;
      return {
        boroughCode: r.borough_code,
        boroughName,
        repairsCount: repairs,
        complaints311: complaints,
        gap,
        backlogRatio,
      };
    })
    .sort((a, b) => b.complaints311 - a.complaints311);
}

export type SafetyIndexRow = {
  boroughCode: string;
  boroughName: string;
  crimeCount: number;
  fireCount: number;
  population: number;
  crimePerCapita: number;
  firePerCapita: number;
  safetyScore: number; // 0-100, higher = safer (inverse of incidents)
};

/** Crime severity weights — méfaits lower than violent crimes */
const CRIME_WEIGHTS: Record<string, number> = {
  'Infraction mort': 5,
  'Vol qualifié': 4,
  'Introduction': 2,
  'Méfait': 1,
  'Vol de véhicule': 2,
  default: 1.5,
};

/**
 * Crime + fire joint safety index by borough.
 * Normalize per capita, weight by severity.
 */
export async function getCrimeFireSafetyIndex(
  startDate: string,
  endDate: string
): Promise<SafetyIndexRow[]> {
  const crimeResult = await db.execute(
    sql.raw(`
      SELECT borough_code, category, COUNT(*)::int AS cnt
      FROM crime_incidents
      WHERE incident_date >= '${startDate}' AND incident_date <= '${endDate}'
        AND borough_code IS NOT NULL
      GROUP BY borough_code, category
    `)
  );

  const fireResult = await db.execute(
    sql.raw(`
      SELECT borough_code, COUNT(*)::int AS cnt
      FROM fire_interventions
      WHERE incident_date >= '${startDate}' AND incident_date <= '${endDate}'
        AND borough_code IS NOT NULL
      GROUP BY borough_code
    `)
  );

  const crimeByBorough: Record<string, number> = {};
  for (const r of (crimeResult.rows || []) as { borough_code: string; category: string; cnt: number }[]) {
    const w = CRIME_WEIGHTS[r.category] ?? CRIME_WEIGHTS.default;
    crimeByBorough[r.borough_code] = (crimeByBorough[r.borough_code] ?? 0) + Number(r.cnt) * w;
  }

  const fireByBorough: Record<string, number> = {};
  for (const r of (fireResult.rows || []) as { borough_code: string; cnt: number }[]) {
    fireByBorough[r.borough_code] = Number(r.cnt);
  }

  const allCodes = new Set([...Object.keys(crimeByBorough), ...Object.keys(fireByBorough)]);
  const maxCrime = Math.max(...Object.values(crimeByBorough), 1);
  const maxFire = Math.max(...Object.values(fireByBorough), 1);

  const rows: SafetyIndexRow[] = [];
  for (const code of allCodes) {
    const pop = BOROUGHS[code as keyof typeof BOROUGHS]?.population ?? 10000;
    const crime = crimeByBorough[code] ?? 0;
    const fire = fireByBorough[code] ?? 0;
    const crimePerCapita = pop > 0 ? crime / (pop / 10000) : 0;
    const firePerCapita = pop > 0 ? fire / (pop / 10000) : 0;
    const crimeNorm = crime / maxCrime;
    const fireNorm = fire / maxFire;
    const safetyScore = Math.max(0, Math.round(100 - (crimeNorm * 60 + fireNorm * 40)));
    rows.push({
      boroughCode: code,
      boroughName: BOROUGHS[code as keyof typeof BOROUGHS]?.name ?? code,
      crimeCount: crime,
      fireCount: fire,
      population: pop,
      crimePerCapita: Math.round(crimePerCapita * 100) / 100,
      firePerCapita: Math.round(firePerCapita * 100) / 100,
      safetyScore,
    });
  }
  rows.sort((a, b) => b.safetyScore - a.safetyScore);
  return rows;
}

export type WinterOpsSummary = {
  towingsCount: number;
  snow311Count: number;
  potholesYtd: number;
  seasonStart: string;
  seasonEnd: string;
  isActive: boolean;
};

/**
 * Winter operations dashboard — composite: towings + snow 311 + potholes (spring thaw).
 */
export async function getWinterOperationsSummary(): Promise<WinterOpsSummary> {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const seasonStart = new Date(year, 10, 1); // Nov 1
  if (now < seasonStart) seasonStart.setFullYear(year - 1);
  const seasonEnd = new Date(seasonStart.getFullYear(), 3, 30); // Apr 30
  const startStr = seasonStart.toISOString().slice(0, 10);
  const endStr = seasonEnd.toISOString().slice(0, 10);

  const isActive = month >= 10 || month <= 3; // Nov-Apr

  const [towingRes, snow311Res, potholeRes] = await Promise.all([
    db.execute(
      sql.raw(`
        SELECT COUNT(*)::int AS cnt FROM snow_towings
        WHERE towing_date >= '${startStr}' AND towing_date <= '${endStr}T23:59:59'
      `)
    ),
    db.execute(
      sql.raw(`
        SELECT COUNT(*)::int AS cnt FROM requests_311
        WHERE created_at >= '${startStr}' AND created_at <= '${endStr}T23:59:59'
          AND (
            request_type ILIKE '%déneigement%' OR request_type ILIKE '%neige%'
            OR request_type ILIKE '%snow%' OR request_type ILIKE '%remorquage%'
          )
      `)
    ),
    db.execute(
      sql.raw(`
        SELECT COUNT(*)::int AS cnt FROM pothole_repairs
        WHERE repair_date >= '${String(seasonStart.getFullYear())}-01-01'
          AND repair_date <= '${endStr}'
      `)
    ),
  ]);

  const towingsCount = Number((towingRes.rows?.[0] as { cnt: number })?.cnt ?? 0);
  const snow311Count = Number((snow311Res.rows?.[0] as { cnt: number })?.cnt ?? 0);
  const potholesYtd = Number((potholeRes.rows?.[0] as { cnt: number })?.cnt ?? 0);

  return {
    towingsCount,
    snow311Count,
    potholesYtd,
    seasonStart: startStr,
    seasonEnd: endStr,
    isActive,
  };
}

export type PermitsInConstructionZonesRow = {
  permitId: number;
  permitNumber: string | null;
  boroughCode: string | null;
  dateIssued: string;
  obstructionCount: number;
};

/**
 * Permits issued in areas with current obstructions.
 * Coordination question: is the city planning ahead?
 */
export async function getPermitsInConstructionZones(
  limit = 20
): Promise<PermitsInConstructionZonesRow[]> {
  const today = todayStr();

  const result = await db.execute(
    sql.raw(`
      WITH active_obstructions AS (
        SELECT id, (lat)::numeric AS lat, (lng)::numeric AS lng
        FROM road_obstructions
        WHERE lat IS NOT NULL AND lng IS NOT NULL
          AND fetched_at >= NOW() - INTERVAL '7 days'
      ),
      permits_with_geo AS (
        SELECT id, permit_number, borough_code, date_issued, (lat)::numeric AS lat, (lng)::numeric AS lng
        FROM construction_permits
        WHERE lat IS NOT NULL AND lng IS NOT NULL
          AND date_issued >= '${today}'::date - INTERVAL '90 days'
      ),
      permits_obstruction_count AS (
        SELECT p.id, p.permit_number, p.borough_code, p.date_issued,
          (SELECT COUNT(*)::int FROM active_obstructions o
           WHERE (6371000 * 2 * asin(sqrt(
             power(sin(radians((p.lat)::float - (o.lat)::float) / 2), 2) +
             cos(radians((o.lat)::float)) * cos(radians((p.lat)::float)) *
             power(sin(radians((p.lng)::float - (o.lng)::float) / 2), 2)
           ))) <= 500
          ) AS obstruction_count
        FROM permits_with_geo p
      )
      SELECT id, permit_number, borough_code, date_issued::text, obstruction_count
      FROM permits_obstruction_count
      WHERE obstruction_count > 0
      ORDER BY obstruction_count DESC
      LIMIT ${limit}
    `)
  );

  const rows = (result.rows || []) as {
    id: number;
    permit_number: string;
    borough_code: string;
    date_issued: string;
    obstruction_count: number;
  }[];

  return rows.map((r) => ({
    permitId: r.id,
    permitNumber: r.permit_number ?? null,
    boroughCode: r.borough_code ?? null,
    dateIssued: r.date_issued,
    obstructionCount: Number(r.obstruction_count),
  }));
}
