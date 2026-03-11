import type { ReportConfig } from './types';

const MAX_LIMIT = 10000;
const DEFAULT_LIMIT = 1000;

/** Characters allowed in CKAN SQL identifiers (field/resource names) */
const SAFE_IDENTIFIER = /^[a-zA-Z0-9_\-]+$/;

function quoteIdentifier(name: string): string {
  if (!SAFE_IDENTIFIER.test(name)) {
    throw new Error(`Unsafe identifier: ${name}`);
  }
  return `"${name}"`;
}

function escapeString(value: string): string {
  // Prevent SQL injection: escape single quotes
  return value.replace(/'/g, "''");
}

export function buildCKANQuery(config: ReportConfig): string {
  const limit = Math.min(config.limit || DEFAULT_LIMIT, MAX_LIMIT);
  const resourceRef = quoteIdentifier(config.resourceId);

  // ── SELECT clause ──
  const selectParts: string[] = [];

  for (const dim of config.dimensions) {
    selectParts.push(quoteIdentifier(dim));
  }

  if (config.dateField) {
    selectParts.push(quoteIdentifier(config.dateField));
  }

  if (config.measures.length > 0) {
    for (const measure of config.measures) {
      const agg = config.aggregation.toUpperCase();
      selectParts.push(`${agg}(${quoteIdentifier(measure)}) as "${measure}_${config.aggregation}"`);
    }
  }

  // Always include COUNT
  if (config.dimensions.length > 0 || config.dateField) {
    selectParts.push('COUNT(*) as "count"');
  }

  // If no dimensions, no dates, no measures: just SELECT *
  const isRawQuery = selectParts.length === 0;
  const selectClause = isRawQuery ? '*' : selectParts.join(', ');

  // ── WHERE clause ──
  const whereParts: string[] = [];

  if (config.dateField && config.dateRange) {
    const dateCol = quoteIdentifier(config.dateField);
    if (config.dateRange.from) {
      whereParts.push(`${dateCol} >= '${escapeString(config.dateRange.from)}'`);
    }
    if (config.dateRange.to) {
      whereParts.push(`${dateCol} <= '${escapeString(config.dateRange.to)}'`);
    }
  }

  for (const filter of config.filters) {
    const col = quoteIdentifier(filter.field);
    const val = escapeString(filter.value);

    switch (filter.operator) {
      case 'eq':
        whereParts.push(`${col} = '${val}'`);
        break;
      case 'neq':
        whereParts.push(`${col} != '${val}'`);
        break;
      case 'contains':
        whereParts.push(`${col} LIKE '%${val}%'`);
        break;
      case 'gte':
        whereParts.push(`${col} >= '${val}'`);
        break;
      case 'lte':
        whereParts.push(`${col} <= '${val}'`);
        break;
    }
  }

  const whereClause = whereParts.length > 0
    ? `WHERE ${whereParts.join(' AND ')}`
    : '';

  // ── GROUP BY clause ──
  const groupByFields: string[] = [];

  if (!isRawQuery) {
    for (const dim of config.dimensions) {
      groupByFields.push(quoteIdentifier(dim));
    }
    if (config.dateField) {
      groupByFields.push(quoteIdentifier(config.dateField));
    }
  }

  const groupByClause = groupByFields.length > 0
    ? `GROUP BY ${groupByFields.join(', ')}`
    : '';

  // ── ORDER BY clause ──
  let orderByClause = '';
  if (!isRawQuery) {
    if (config.orderBy) {
      const dir = config.orderDir ?? 'DESC';
      orderByClause = `ORDER BY ${quoteIdentifier(config.orderBy)} ${dir}`;
    } else if (config.dateField && !config.dimensions.length) {
      orderByClause = `ORDER BY ${quoteIdentifier(config.dateField)} ASC`;
    } else {
      orderByClause = 'ORDER BY "count" DESC';
    }
  }

  const sql = [
    `SELECT ${selectClause}`,
    `FROM ${resourceRef}`,
    whereClause,
    groupByClause,
    orderByClause,
    `LIMIT ${limit}`,
  ]
    .filter(Boolean)
    .join(' ');

  return sql;
}
