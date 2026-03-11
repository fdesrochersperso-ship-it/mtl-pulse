import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDataset } from '@/lib/report-builder/config';
import { buildCKANQuery } from '@/lib/report-builder/query-builder';
import { fetchReport } from '@/lib/report-builder/ckan-client';

const ReportRequestSchema = z.object({
  datasetSlug: z.string().min(1),
  dimensions: z.array(z.string()).max(3).default([]),
  measures: z.array(z.string()).max(3).default([]),
  aggregation: z.enum(['count', 'sum', 'avg', 'min', 'max']).default('count'),
  dateField: z.string().optional(),
  dateRange: z
    .object({ from: z.string(), to: z.string() })
    .optional(),
  filters: z
    .array(
      z.object({
        field: z.string(),
        operator: z.enum(['eq', 'neq', 'contains', 'gte', 'lte']),
        value: z.string(),
      }),
    )
    .max(10)
    .default([]),
  limit: z.number().int().min(1).max(10000).default(1000),
  orderBy: z.string().optional(),
  orderDir: z.enum(['ASC', 'DESC']).optional(),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = ReportRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const config = parsed.data;

    // Validate dataset exists in semantic layer
    const dataset = getDataset(config.datasetSlug);
    if (!dataset) {
      return NextResponse.json(
        { error: `Dataset not found: ${config.datasetSlug}` },
        { status: 404 },
      );
    }

    // Validate requested fields exist and aren't excluded
    const validFieldNames = new Set(
      dataset.fields.map((f) => f.raw_name),
    );

    for (const dim of config.dimensions) {
      if (!validFieldNames.has(dim)) {
        return NextResponse.json(
          { error: `Invalid dimension field: ${dim}` },
          { status: 400 },
        );
      }
    }

    for (const measure of config.measures) {
      if (!validFieldNames.has(measure)) {
        return NextResponse.json(
          { error: `Invalid measure field: ${measure}` },
          { status: 400 },
        );
      }
    }

    if (config.dateField && !validFieldNames.has(config.dateField)) {
      return NextResponse.json(
        { error: `Invalid date field: ${config.dateField}` },
        { status: 400 },
      );
    }

    for (const filter of config.filters) {
      if (!validFieldNames.has(filter.field)) {
        return NextResponse.json(
          { error: `Invalid filter field: ${filter.field}` },
          { status: 400 },
        );
      }
    }

    // Build CKAN SQL query
    const sql = buildCKANQuery({
      ...config,
      resourceId: dataset.resource_id,
    });

    // Execute query
    const result = await fetchReport(sql);

    return NextResponse.json(result);
  } catch (err) {
    console.error('[Report API]', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
