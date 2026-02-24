/**
 * Data access layer for road conditions (Condition chaussées réseau routier).
 * PCI/IRI by borough, worst roads ranked, condition vs contract spending.
 */

import { db } from '@/lib/db';
import { roadConditions } from '@/lib/db/schema';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';

export type RoadConditionByBorough = {
  boroughCode: string;
  avgPci: number;
  avgIri: number;
  segmentCount: number;
  totalLengthM: number;
};

/** PCI/IRI by borough (latest survey) */
export async function getRoadConditionByBorough(): Promise<RoadConditionByBorough[]> {
  const result = await db.execute(sql.raw(`
    SELECT
      borough_code AS borough_code,
      AVG((pci_score)::numeric) AS avg_pci,
      AVG((iri_score)::numeric) AS avg_iri,
      COUNT(*)::int AS segment_cnt,
      COALESCE(SUM((length_m)::numeric), 0) AS total_len
    FROM road_conditions
    WHERE borough_code IS NOT NULL AND borough_code != ''
    GROUP BY borough_code
    ORDER BY avg_pci ASC
  `));

  const rows = (result.rows || []) as {
    borough_code: string;
    avg_pci: string;
    avg_iri: string;
    segment_cnt: number;
    total_len: string;
  }[];

  return rows.map((r) => ({
    boroughCode: r.borough_code,
    avgPci: Number(r.avg_pci ?? 0),
    avgIri: Number(r.avg_iri ?? 0),
    segmentCount: Number(r.segment_cnt ?? 0),
    totalLengthM: Number(r.total_len ?? 0),
  }));
}

/** Worst roads by PCI (lowest score = worst) */
export type WorstRoadRow = {
  segmentId: string;
  streetName: string | null;
  boroughCode: string | null;
  pciScore: number | null;
  pciState: string | null;
  iriScore: number | null;
  lengthM: number | null;
};

export async function getWorstRoads(limit = 50): Promise<WorstRoadRow[]> {
  const rows = await db
    .select({
      segmentId: roadConditions.segmentId,
      streetName: roadConditions.streetName,
      boroughCode: roadConditions.boroughCode,
      pciScore: roadConditions.pciScore,
      pciState: roadConditions.pciState,
      iriScore: roadConditions.iriScore,
      lengthM: roadConditions.lengthM,
    })
    .from(roadConditions)
    .where(sql`(${roadConditions.pciScore})::numeric IS NOT NULL`)
    .orderBy(sql`(${roadConditions.pciScore})::numeric ASC`)
    .limit(limit);

  return rows.map((r) => ({
    segmentId: r.segmentId,
    streetName: r.streetName,
    boroughCode: r.boroughCode,
    pciScore: r.pciScore != null ? Number(r.pciScore) : null,
    pciState: r.pciState,
    iriScore: r.iriScore != null ? Number(r.iriScore) : null,
    lengthM: r.lengthM != null ? Number(r.lengthM) : null,
  }));
}
