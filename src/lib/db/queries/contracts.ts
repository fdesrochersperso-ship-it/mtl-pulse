/**
 * Data access layer for contracts (Vue sur les contrats).
 * Contract explorer, spending trends, top vendors, sole-source flags.
 */

import { db } from '@/lib/db';
import { contracts } from '@/lib/db/schema';
import {
  eq,
  and,
  gte,
  lte,
  sql,
  desc,
  count,
  like,
  or,
  isNotNull,
} from 'drizzle-orm';
import { BOROUGHS } from '@/lib/constants/boroughs';

export type ContractRow = {
  id: number;
  externalId: string | null;
  contractType: string | null;
  title: string | null;
  supplierName: string | null;
  amount: number | null;
  awardDate: string | null;
  boroughCode: string | null;
  sector: string | null;
  awardingBody: string | null;
  soleSource: boolean;
};

/** Sole-source indicators in raw data (French procurement terms) */
const SOLE_SOURCE_INDICATORS = [
  'gré à gré',
  'gre a gre',
  'appel d\'offres sur invitation',
  'négociation',
  'negociation',
  'de gré à gré',
  'sans concurrence',
  'concurrence restreinte',
];

function isSoleSource(rawData: unknown): boolean {
  if (!rawData || typeof rawData !== 'object') return false;
  const str = JSON.stringify(rawData).toLowerCase();
  return SOLE_SOURCE_INDICATORS.some((term) => str.includes(term));
}

export type ContractSearchFilters = {
  search?: string;
  vendor?: string;
  sector?: string;
  awardingBody?: string;
  boroughCode?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  soleSourceOnly?: boolean;
};

export type ContractSearchResult = {
  rows: ContractRow[];
  total: number;
  page: number;
  pageSize: number;
};

/** Searchable, filterable contract table with pagination */
export async function searchContracts(
  filters: ContractSearchFilters,
  options: { page?: number; pageSize?: number } = {}
): Promise<ContractSearchResult> {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(100, Math.max(10, options.pageSize ?? 25));
  const offset = (page - 1) * pageSize;

  const conds: ReturnType<typeof sql>[] = [];

  if (filters.search && filters.search.trim()) {
    const term = `%${filters.search.trim()}%`;
    conds.push(
      or(
        sql`${contracts.title} ILIKE ${term}`,
        sql`${contracts.supplierName} ILIKE ${term}`,
        sql`${contracts.sector} ILIKE ${term}`
      )!
    );
  }
  if (filters.vendor) {
    conds.push(sql`${contracts.supplierName} ILIKE ${'%' + filters.vendor + '%'}`);
  }
  if (filters.sector) {
    conds.push(eq(contracts.sector, filters.sector));
  }
  if (filters.awardingBody) {
    conds.push(eq(contracts.awardingBody, filters.awardingBody));
  }
  if (filters.boroughCode) {
    conds.push(eq(contracts.boroughCode, filters.boroughCode));
  }
  if (filters.startDate) {
    conds.push(gte(contracts.awardDate, filters.startDate));
  }
  if (filters.endDate) {
    conds.push(lte(contracts.awardDate, filters.endDate));
  }
  if (filters.minAmount != null && filters.minAmount > 0) {
    conds.push(sql`(${contracts.amount})::numeric >= ${filters.minAmount}`);
  }

  const whereClause = conds.length > 0 ? and(...conds) : undefined;

  const [countRes, rowsRes] = await Promise.all([
    db
      .select({ total: count() })
      .from(contracts)
      .where(whereClause),
    db
      .select()
      .from(contracts)
      .where(whereClause)
      .orderBy(desc(contracts.awardDate), desc(contracts.id))
      .limit(pageSize)
      .offset(offset),
  ]);

  const total = Number(countRes[0]?.total ?? 0);
  const rows = rowsRes.map((r) => ({
    id: r.id,
    externalId: r.externalId,
    contractType: r.contractType,
    title: r.title,
    supplierName: r.supplierName,
    amount: r.amount != null ? Number(r.amount) : null,
    awardDate: r.awardDate != null ? String(r.awardDate).slice(0, 10) : null,
    boroughCode: r.boroughCode,
    sector: r.sector,
    awardingBody: r.awardingBody,
    soleSource: isSoleSource(r.rawData),
  }));

  return {
    rows,
    total,
    page,
    pageSize,
  };
}

export type SpendingTrendPoint = {
  period: string;
  totalValue: number;
  count: number;
  bySource: Record<string, { value: number; count: number }>;
};

/** Spending trends by month/year, by awarding body */
export async function getContractSpendingTrends(
  startDate: string,
  endDate: string,
  granularity: 'monthly' | 'yearly'
): Promise<SpendingTrendPoint[]> {
  const dateTrunc = granularity === 'monthly' ? 'month' : 'year';

  const result = await db.execute(sql.raw(`
    SELECT
      date_trunc('${dateTrunc}', award_date)::date AS period,
      COALESCE(SUM((amount)::numeric), 0) AS total_value,
      COUNT(*)::int AS cnt,
      awarding_body
    FROM contracts
    WHERE award_date >= '${startDate}' AND award_date <= '${endDate}'
    GROUP BY date_trunc('${dateTrunc}', award_date), awarding_body
    ORDER BY period, awarding_body
  `));

  const rows = (result.rows || []) as {
    period: Date | string;
    total_value: string;
    cnt: number;
    awarding_body: string | null;
  }[];

  const byPeriod = new Map<
    string,
    { totalValue: number; count: number; bySource: Record<string, { value: number; count: number }> }
  >();

  for (const r of rows) {
    const period =
      typeof r.period === 'string'
        ? r.period.slice(0, 10)
        : (r.period as Date).toISOString().slice(0, 10);
    const value = Number(r.total_value ?? 0);
    const cnt = Number(r.cnt ?? 0);
    const source = r.awarding_body ?? 'Autre';

    if (!byPeriod.has(period)) {
      byPeriod.set(period, { totalValue: 0, count: 0, bySource: {} });
    }
    const entry = byPeriod.get(period)!;
    entry.totalValue += value;
    entry.count += cnt;
    if (!entry.bySource[source]) {
      entry.bySource[source] = { value: 0, count: 0 };
    }
    entry.bySource[source].value += value;
    entry.bySource[source].count += cnt;
  }

  return [...byPeriod.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([period, data]) => ({
      period,
      totalValue: data.totalValue,
      count: data.count,
      bySource: data.bySource,
    }));
}

/** Top vendors by contract count and total amount */
export type TopVendorRow = {
  supplierName: string;
  count: number;
  totalAmount: number;
};

export async function getTopVendors(
  startDate: string,
  endDate: string,
  limit = 20
): Promise<TopVendorRow[]> {
  const result = await db.execute(sql.raw(`
    SELECT
      supplier_name AS supplier_name,
      COUNT(*)::int AS cnt,
      COALESCE(SUM((amount)::numeric), 0) AS total_amount
    FROM contracts
    WHERE award_date >= '${startDate}' AND award_date <= '${endDate}'
      AND supplier_name IS NOT NULL AND supplier_name != ''
    GROUP BY supplier_name
    ORDER BY total_amount DESC
    LIMIT ${limit}
  `));

  const rows = (result.rows || []) as {
    supplier_name: string;
    cnt: number;
    total_amount: string;
  }[];

  return rows.map((r) => ({
    supplierName: r.supplier_name,
    count: Number(r.cnt),
    totalAmount: Number(r.total_amount ?? 0),
  }));
}

/** Sole-source contract count and total value */
export async function getSoleSourceStats(
  startDate: string,
  endDate: string
): Promise<{ count: number; totalValue: number }> {
  const rows = await db
    .select()
    .from(contracts)
    .where(
      and(
        gte(contracts.awardDate, startDate),
        lte(contracts.awardDate, endDate)
      )
    );

  let count = 0;
  let totalValue = 0;
  for (const r of rows) {
    if (isSoleSource(r.rawData)) {
      count++;
      totalValue += r.amount != null ? Number(r.amount) : 0;
    }
  }

  return { count, totalValue };
}

/** Contract value YTD (for metrics) */
export async function getContractsValueYtd(boroughCode?: string | null): Promise<number> {
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const conds = [gte(contracts.awardDate, yearStart)];
  if (boroughCode) {
    conds.push(eq(contracts.boroughCode, boroughCode));
  }
  const [row] = await db
    .select({
      total: sql<number>`COALESCE(SUM((${contracts.amount})::numeric), 0)`,
    })
    .from(contracts)
    .where(and(...conds));
  return Number(row?.total ?? 0);
}

/** Unique values for filter dropdowns */
export async function getContractFilterOptions(): Promise<{
  sectors: string[];
  awardingBodies: string[];
  boroughCodes: string[];
}> {
  const [sectors, bodies, boroughs] = await Promise.all([
    db
      .selectDistinct({ sector: contracts.sector })
      .from(contracts)
      .where(isNotNull(contracts.sector)),
    db
      .selectDistinct({ awardingBody: contracts.awardingBody })
      .from(contracts)
      .where(isNotNull(contracts.awardingBody)),
    db
      .selectDistinct({ boroughCode: contracts.boroughCode })
      .from(contracts)
      .where(isNotNull(contracts.boroughCode)),
  ]);

  return {
    sectors: sectors
      .map((r) => r.sector)
      .filter(Boolean)
      .sort() as string[],
    awardingBodies: bodies
      .map((r) => r.awardingBody)
      .filter(Boolean)
      .sort() as string[],
    boroughCodes: boroughs
      .map((r) => r.boroughCode)
      .filter(Boolean)
      .sort() as string[],
  };
}
