/**
 * Data access layer for elected officials and political data.
 * Officials directory, party composition, council info.
 */

import { db } from '@/lib/db';
import { electedOfficials, datasetRecords } from '@/lib/db/schema';
import { eq, desc, sql, and, asc } from 'drizzle-orm';
import { BOROUGHS } from '@/lib/constants/boroughs';

export type OfficialRow = {
  id: number;
  name: string;
  functionType: string | null;
  boroughCode: string | null;
  party: string | null;
  mandateStart: string | null;
  mandateEnd: string | null;
};

/** All elected officials, optionally by borough/party */
export async function getOfficials(filters?: {
  boroughCode?: string;
  party?: string;
}): Promise<OfficialRow[]> {
  const conds = [];
  if (filters?.boroughCode) {
    conds.push(eq(electedOfficials.boroughCode, filters.boroughCode));
  }
  if (filters?.party) {
    conds.push(eq(electedOfficials.party, filters.party));
  }

  const rows = await db
    .select()
    .from(electedOfficials)
    .where(conds.length > 0 ? and(...conds) : undefined)
    .orderBy(asc(electedOfficials.functionType), asc(electedOfficials.boroughCode), asc(electedOfficials.name));

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    functionType: r.functionType ?? null,
    boroughCode: r.boroughCode ?? null,
    party: r.party ?? null,
    mandateStart: r.mandateStart != null ? String(r.mandateStart).slice(0, 10) : null,
    mandateEnd: r.mandateEnd != null ? String(r.mandateEnd).slice(0, 10) : null,
  }));
}

/** Party composition: count by party */
export type PartyCompositionRow = {
  party: string;
  count: number;
};

export async function getPartyComposition(): Promise<PartyCompositionRow[]> {
  const result = await db
    .select({
      party: electedOfficials.party,
      count: sql<number>`count(*)::int`,
    })
    .from(electedOfficials)
    .where(sql`${electedOfficials.party} IS NOT NULL AND ${electedOfficials.party} != ''`)
    .groupBy(electedOfficials.party)
    .orderBy(desc(sql`count(*)`));

  return result.map((r) => ({
    party: r.party ?? 'Inconnu',
    count: Number(r.count),
  }));
}

/** Council meeting calendar / upcoming sessions (from dataset_records if ingested) */
export type CouncilMeetingRow = {
  date: string;
  type: string;
  title: string;
  videoUrl: string | null;
  data: Record<string, unknown>;
};

export async function getCouncilMeetings(limit = 20): Promise<CouncilMeetingRow[]> {
  const rows = await db
    .select()
    .from(datasetRecords)
    .where(
      sql`${datasetRecords.datasetSlug} LIKE 'calendrier-seances%'`
    )
    .orderBy(desc(datasetRecords.recordDate))
    .limit(limit);

  return rows
    .filter((r) => r.data && typeof r.data === 'object')
    .map((r) => {
      const d = r.data as Record<string, unknown>;
      const dateVal = d.date ?? d.DATE ?? r.recordDate;
      return {
        date: dateVal != null ? String(dateVal).slice(0, 10) : '',
        type: String(d.type ?? d.TYPE ?? d.nom ?? ''),
        title: String(d.title ?? d.TITRE ?? d.description ?? ''),
        videoUrl: (d.video_url ?? d.url) as string | null,
        data: d,
      };
    });
}

/** Get distinct parties for filter */
export async function getParties(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ party: electedOfficials.party })
    .from(electedOfficials)
    .where(sql`${electedOfficials.party} IS NOT NULL AND ${electedOfficials.party} != ''`);
  return rows.map((r) => r.party!).sort();
}
