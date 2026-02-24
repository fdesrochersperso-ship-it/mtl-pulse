/**
 * Data access layer for AI-generated digests.
 */

import { db } from '@/lib/db';
import { digests } from '@/lib/db/schema';
import { eq, and, desc, isNull } from 'drizzle-orm';

export type DigestType = 'daily' | 'weekly' | 'borough';
export type DigestLang = 'fr' | 'en';

export interface DigestRow {
  id: number;
  digestType: DigestType;
  periodDate: string;
  boroughCode: string | null;
  language: DigestLang;
  title: string;
  summary: string;
  highlights: unknown;
  stats: unknown;
  modelUsed: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  generatedAt: Date;
  createdAt: Date;
}

/** Get the most recent digest of a given type and language, optionally for a borough */
export async function getLatestDigest(
  type: DigestType,
  language: DigestLang,
  boroughCode?: string | null,
): Promise<DigestRow | null> {
  const conds = [
    eq(digests.digestType, type),
    eq(digests.language, language),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(digests.boroughCode, boroughCode));
  } else {
    conds.push(isNull(digests.boroughCode));
  }
  const [row] = await db
    .select()
    .from(digests)
    .where(and(...conds))
    .orderBy(desc(digests.periodDate), desc(digests.generatedAt))
    .limit(1);

  return row ? toDigestRow(row) : null;
}

/** Get digest for a specific period (date or week start) */
export async function getDigestByDate(
  type: DigestType,
  dateStr: string,
  language: DigestLang,
  boroughCode?: string | null,
): Promise<DigestRow | null> {
  return getDigestByPeriod(type, dateStr, language, boroughCode);
}

/** Alias for getDigestByDate — fetch digest by period */
export async function getDigestByPeriod(
  type: DigestType,
  periodDate: string,
  language: DigestLang,
  boroughCode?: string | null,
): Promise<DigestRow | null> {
  const conds = [
    eq(digests.digestType, type),
    eq(digests.periodDate, periodDate),
    eq(digests.language, language),
  ];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(digests.boroughCode, boroughCode));
  } else {
    conds.push(isNull(digests.boroughCode));
  }
  const [row] = await db.select().from(digests).where(and(...conds));
  return row ? toDigestRow(row) : null;
}

/** Get recent digest history (list of digests) */
export async function getDigestHistory(
  type: DigestType,
  language: DigestLang,
  limit: number = 30,
  boroughCode?: string | null,
): Promise<DigestRow[]> {
  const conds = [eq(digests.digestType, type), eq(digests.language, language)];
  if (boroughCode != null && boroughCode !== '') {
    conds.push(eq(digests.boroughCode, boroughCode));
  } else {
    conds.push(isNull(digests.boroughCode));
  }
  const rows = await db
    .select()
    .from(digests)
    .where(and(...conds))
    .orderBy(desc(digests.periodDate))
    .limit(limit);

  return rows.map(toDigestRow);
}

export interface InsertDigestInput {
  digestType: DigestType;
  periodDate: string;
  boroughCode: string | null;
  language: DigestLang;
  title: string;
  summary: string;
  highlights: unknown;
  stats?: unknown;
  modelUsed?: string;
  promptTokens?: number;
  completionTokens?: number;
}

/** Insert a new digest. Returns the created row id. */
export async function insertDigest(input: InsertDigestInput): Promise<{ id: number }> {
  const [row] = await db
    .insert(digests)
    .values({
      digestType: input.digestType,
      periodDate: input.periodDate,
      boroughCode: input.boroughCode,
      language: input.language,
      title: input.title,
      summary: input.summary,
      highlights: input.highlights as object,
      stats: (input.stats as object) ?? null,
      modelUsed: input.modelUsed ?? null,
      promptTokens: input.promptTokens ?? null,
      completionTokens: input.completionTokens ?? null,
    })
    .returning({ id: digests.id });

  if (!row) throw new Error('Failed to insert digest');
  return { id: row.id };
}

function toDigestRow(row: {
  id: number;
  digestType: 'daily' | 'weekly' | 'borough';
  periodDate: Date | string;
  boroughCode: string | null;
  language: 'fr' | 'en';
  title: string;
  summary: string;
  highlights: unknown;
  stats: unknown;
  modelUsed: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  generatedAt: Date;
  createdAt: Date;
}): DigestRow {
  return {
    id: row.id,
    digestType: row.digestType,
    periodDate: typeof row.periodDate === 'string' ? row.periodDate : row.periodDate.toISOString().slice(0, 10),
    boroughCode: row.boroughCode,
    language: row.language,
    title: row.title,
    summary: row.summary,
    highlights: row.highlights,
    stats: row.stats,
    modelUsed: row.modelUsed,
    promptTokens: row.promptTokens,
    completionTokens: row.completionTokens,
    generatedAt: row.generatedAt,
    createdAt: row.createdAt,
  };
}
