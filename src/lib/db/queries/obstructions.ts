/**
 * Data access layer for road obstructions (entraves circulation).
 * Real-time snapshot, type/subtype, street/direction.
 */

import { db } from '@/lib/db';
import { roadObstructions } from '@/lib/db/schema';
import {
  eq,
  and,
  sql,
  desc,
  count,
  isNotNull,
} from 'drizzle-orm';

export type ObstructionRow = {
  id: number;
  sourceId: string | null;
  startTime: Date | null;
  endTime: Date | null;
  street: string | null;
  direction: string | null;
  boroughCode: string | null;
  obstructionType: string | null;
  subtype: string | null;
  description: string | null;
  status: string | null;
  lat: number | null;
  lng: number | null;
};

export type ObstructionByTypeRow = {
  obstructionType: string;
  count: number;
};

export type ObstructionStats = {
  activeCount: number;
  topStreet: string | null;
  topBorough: string | null;
  topType: string | null;
};

const latExpr = sql<string | null>`(${roadObstructions.lat})::numeric`;
const lngExpr = sql<string | null>`(${roadObstructions.lng})::numeric`;

/** Real-time snapshot: all active obstructions */
export async function getObstructionsSnapshot(
  filters?: {
    boroughCode?: string | null;
    obstructionType?: string | null;
  }
): Promise<ObstructionRow[]> {
  const conds = [];
  if (filters?.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(roadObstructions.boroughCode, filters.boroughCode));
  }
  if (filters?.obstructionType != null && filters.obstructionType !== '') {
    conds.push(eq(roadObstructions.obstructionType, filters.obstructionType));
  }

  const rows = await db
    .select({
      id: roadObstructions.id,
      sourceId: roadObstructions.sourceId,
      startTime: roadObstructions.startTime,
      endTime: roadObstructions.endTime,
      street: roadObstructions.street,
      direction: roadObstructions.direction,
      boroughCode: roadObstructions.boroughCode,
      obstructionType: roadObstructions.obstructionType,
      subtype: roadObstructions.subtype,
      description: roadObstructions.description,
      status: roadObstructions.status,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(roadObstructions)
    .where(conds.length > 0 ? and(...conds) : sql`true`)
    .orderBy(desc(roadObstructions.startTime));

  return rows.map(toObstructionRow);
}

/** By type/subtype */
export async function getObstructionsByType(): Promise<ObstructionByTypeRow[]> {
  const result = await db
    .select({
      obstructionType: roadObstructions.obstructionType,
      count: count(),
    })
    .from(roadObstructions)
    .where(isNotNull(roadObstructions.obstructionType))
    .groupBy(roadObstructions.obstructionType)
    .orderBy(sql`count(*) DESC`);

  return result.map((r) => ({
    obstructionType: r.obstructionType!,
    count: Number(r.count),
  }));
}

/** Key stats */
export async function getObstructionsStats(
  boroughCode?: string | null
): Promise<ObstructionStats> {
  const conds: ReturnType<typeof eq>[] = [];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(roadObstructions.boroughCode, boroughCode));
  }

  const whereClause = conds.length > 0 ? and(...conds) : sql`true`;
  const streetWhere = conds.length > 0
    ? and(...conds, isNotNull(roadObstructions.street))
    : isNotNull(roadObstructions.street);
  const boroughWhere = conds.length > 0
    ? and(...conds, isNotNull(roadObstructions.boroughCode))
    : isNotNull(roadObstructions.boroughCode);
  const typeWhere = conds.length > 0
    ? and(...conds, isNotNull(roadObstructions.obstructionType))
    : isNotNull(roadObstructions.obstructionType);

  const [countRes, streetRes, boroughRes, typeRes] = await Promise.all([
    db.select({ count: count() }).from(roadObstructions).where(whereClause),
    db
      .select({ street: roadObstructions.street, count: count() })
      .from(roadObstructions)
      .where(streetWhere)
      .groupBy(roadObstructions.street)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
    db
      .select({ boroughCode: roadObstructions.boroughCode, count: count() })
      .from(roadObstructions)
      .where(boroughWhere)
      .groupBy(roadObstructions.boroughCode)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
    db
      .select({ obstructionType: roadObstructions.obstructionType, count: count() })
      .from(roadObstructions)
      .where(typeWhere)
      .groupBy(roadObstructions.obstructionType)
      .orderBy(sql`count(*) DESC`)
      .limit(1),
  ]);

  return {
    activeCount: Number(countRes[0]?.count ?? 0),
    topStreet: streetRes[0]?.street ?? null,
    topBorough: boroughRes[0]?.boroughCode ?? null,
    topType: typeRes[0]?.obstructionType ?? null,
  };
}

/** Obstructions for map */
export async function getObstructionsForMap(
  filters?: { boroughCode?: string | null; obstructionType?: string | null },
  limit = 500
): Promise<
  {
    id: number;
    sourceId: string | null;
    street: string | null;
    direction: string | null;
    obstructionType: string | null;
    boroughCode: string | null;
    lat: number | null;
    lng: number | null;
  }[]
> {
  const conds = [
    isNotNull(roadObstructions.lat),
    isNotNull(roadObstructions.lng),
  ];
  if (filters?.boroughCode != null && filters.boroughCode !== '') {
    conds.push(eq(roadObstructions.boroughCode, filters.boroughCode));
  }
  if (filters?.obstructionType != null && filters.obstructionType !== '') {
    conds.push(eq(roadObstructions.obstructionType, filters.obstructionType));
  }

  const rows = await db
    .select({
      id: roadObstructions.id,
      sourceId: roadObstructions.sourceId,
      street: roadObstructions.street,
      direction: roadObstructions.direction,
      obstructionType: roadObstructions.obstructionType,
      boroughCode: roadObstructions.boroughCode,
      lat: latExpr,
      lng: lngExpr,
    })
    .from(roadObstructions)
    .where(and(...conds))
    .orderBy(desc(roadObstructions.startTime))
    .limit(limit);

  return rows.map((r) => ({
    ...r,
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
  }));
}

function toObstructionRow(row: {
  id: number;
  sourceId: string | null;
  startTime: Date | null;
  endTime: Date | null;
  street: string | null;
  direction: string | null;
  boroughCode: string | null;
  obstructionType: string | null;
  subtype: string | null;
  description: string | null;
  status: string | null;
  lat: unknown;
  lng: unknown;
}): ObstructionRow {
  const parseNum = (v: unknown): number | null => {
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    ...row,
    lat: parseNum(row.lat),
    lng: parseNum(row.lng),
  };
}
