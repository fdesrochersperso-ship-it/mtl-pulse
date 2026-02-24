#!/usr/bin/env npx tsx
/**
 * Phase 0: Dataset cataloging script.
 * Crawls Montreal CKAN datasets, classifies them, and saves to dataset_registry + docs.
 *
 * Usage: npm run catalog
 *
 * Tries data.montreal.ca first, falls back to donneesquebec.ca if needed.
 * Some datasets may be at donnees.montreal.ca — both are attempted.
 */

import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { CKANClient, type DatastoreSQLResponse } from '../src/lib/api-clients/ckan-client';
import { db } from '../src/lib/db/connection';
import { datasetRegistry } from '../src/lib/db/schema';

// CKAN API bases to try (in order)
const CKAN_BASES = [
  'https://data.montreal.ca/api/3/action',
  'https://donnees.montreal.ca/api/3/action',
  'https://donneesquebec.ca/recherche/api/3/action',
];

const PACKAGE_SEARCH_QUERY = 'organization:ville-de-montreal';
const ROWS_PER_PAGE = 100;
const DELAY_BETWEEN_REQUESTS_MS = 500;

interface ResourceInfo {
  id: string;
  format: string;
  datastore_active: boolean;
  size?: number;
  last_modified?: string;
}

interface CatalogEntry {
  slug: string;
  title: string;
  description?: string;
  organization?: string;
  update_frequency?: string;
  last_modified?: string;
  resources: ResourceInfo[];
  primary_resource_id?: string;
  has_datastore: boolean;
  has_temporal: boolean;
  has_geospatial: boolean;
  has_borough?: boolean;
  category?: string;
  priority_tier: number;
  estimated_rows?: number;
  pipeline_status: string;
  error_message?: string;
  fields?: Array<{ id: string; type: string }>;
  raw_metadata?: Record<string, unknown>;
}

const DATE_FIELD_PATTERNS = [
  /date/i,
  /DATE/i,
  /time/i,
  /TIME/i,
  /jour/i,
  /annee/i,
  /year/i,
  /created/i,
  /modified/i,
];

const GEO_FIELD_PATTERNS = [
  /lat/i,
  /long/i,
  /latitude/i,
  /longitude/i,
  /LOC_X/i,
  /LOC_Y/i,
  /\b_x\b/i,
  /\b_y\b/i,
  /coord/i,
  /geometry/i,
];

const BOROUGH_FIELD_PATTERNS = [
  /arrondissement/i,
  /borough/i,
  /ARROND/i,
  /arros/i,
  /arrond/i,
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  infrastructure: ['infrastructure', 'travaux', 'construction', 'voirie', 'chaussée'],
  safety: ['sécurité', 'safety', 'criminal', 'crime', 'incendie', 'fire'],
  environment: ['environnement', 'air', 'eau', 'water', 'arbres', 'arbor'],
  politics: ['politique', 'élu', 'electoral', 'contrat', 'budget'],
  transport: ['transport', 'vélo', 'cycliste', 'stationnement', 'parking', 'circulation'],
  reference: ['référence', 'limite', 'boundary', 'liste', 'list'],
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeFrequency(freq: string | undefined): string {
  if (!freq) return 'unknown';
  const lower = freq.toLowerCase();
  if (lower.includes('quotidien') || lower.includes('daily') || lower.includes('jour')) return 'daily';
  if (lower.includes('horaire') || lower.includes('hourly') || lower.includes('heure')) return 'hourly';
  if (lower.includes('hebdomadaire') || lower.includes('weekly') || lower.includes('semaine')) return 'weekly';
  if (lower.includes('mensuel') || lower.includes('monthly') || lower.includes('mois')) return 'monthly';
  if (lower.includes('annuel') || lower.includes('annual') || lower.includes('yearly') || lower.includes('an')) return 'yearly';
  if (lower.includes('statique') || lower.includes('static') || lower.includes('reference')) return 'static';
  return freq;
}

function inferCategory(metadata: Record<string, unknown>): string | undefined {
  const tags = (metadata.tags as Array<{ name?: string }>) ?? [];
  const groups = (metadata.groups as Array<{ name?: string }>) ?? [];
  const description = String(metadata.description ?? metadata.notes ?? '');
  const title = String(metadata.title ?? metadata.name ?? '');

  const searchText = [
    ...tags.map((t) => t.name ?? ''),
    ...groups.map((g) => g.name ?? ''),
    description,
    title,
  ].join(' ').toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => searchText.includes(kw))) return category;
  }
  return undefined;
}

function extractFrequency(metadata: Record<string, unknown>): string | undefined {
  const extras = metadata.extras as Array<{ key: string; value: string }> | undefined;
  if (extras) {
    const freq = extras.find((e) => e.key === 'frequency' || e.key === 'update_frequency' || e.key === 'updatefrequency');
    if (freq?.value) return freq.value;
  }
  const freq = metadata.frequency as string | undefined;
  if (freq) return freq;
  return undefined;
}

function computePriorityTier(
  frequency: string,
  hasTemporal: boolean,
  hasGeospatial: boolean,
  hasDatastore: boolean,
  pipelineStatus: string
): number {
  if (pipelineStatus === 'error' || !hasDatastore) return 5; // archive/broken
  const norm = normalizeFrequency(frequency);
  if (norm === 'static' || norm === 'yearly') return 4; // reference
  if (norm === 'monthly') return 3;
  if (norm === 'weekly' && hasTemporal) return 2;
  if ((norm === 'daily' || norm === 'hourly') && hasTemporal && hasGeospatial) return 1;
  if ((norm === 'daily' || norm === 'hourly') && hasTemporal) return 2;
  if (norm === 'weekly') return 3;
  if (norm === 'unknown') return 4;
  return 4;
}

async function crawlPackageSearch(client: CKANClient): Promise<Array<{ id: string; name: string; title?: string; organization?: string }>> {
  const all: Array<{ id: string; name: string; title?: string; organization?: string }> = [];
  let start = 0;
  let hasMore = true;

  while (hasMore) {
    const res = await client.packageSearch(PACKAGE_SEARCH_QUERY, ROWS_PER_PAGE, start);
    const results = res.result.results;
    for (const r of results) {
      all.push({
        id: r.id,
        name: r.name,
        title: r.title,
        organization: r.organization?.name,
      });
    }
    hasMore = results.length === ROWS_PER_PAGE;
    start += ROWS_PER_PAGE;
    if (hasMore) await sleep(DELAY_BETWEEN_REQUESTS_MS);
  }
  return all;
}

async function main(): Promise<void> {
  console.log('[catalog] Phase 0: Montreal dataset cataloging\n');

  let client: CKANClient | null = null;
  let baseUrl: string | null = null;

  for (const base of CKAN_BASES) {
    console.log(`[catalog] Trying CKAN base: ${base}`);
    const c = new CKANClient(base);
    try {
      const res = await c.packageSearch(PACKAGE_SEARCH_QUERY, 1, 0);
      if (res.success && res.result.count >= 0) {
        client = c;
        baseUrl = base;
        console.log(`[catalog] Using ${base} (${res.result.count} total datasets)\n`);
        break;
      }
    } catch (err) {
      console.log(`[catalog] Failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (!client || !baseUrl) {
    console.error('[catalog] All CKAN bases failed. Cannot proceed.');
    process.exit(1);
  }

  const packageList = await crawlPackageSearch(client);
  const total = packageList.length;
  console.log(`[catalog] Found ${total} datasets. Processing each...\n`);

  const catalog: CatalogEntry[] = [];
  let index = 0;

  for (const pkg of packageList) {
    index++;
    const slug = pkg.name;
    console.log(`Processing dataset ${index} of ${total}: ${slug}...`);

    try {
      await sleep(DELAY_BETWEEN_REQUESTS_MS);
      const showRes = await client.packageShow(slug);
      const result = showRes.result as Record<string, unknown>;

      const description = result.description as string | undefined;
      const title = (result.title as string) ?? slug;
      const organization = (result.organization as { name?: string })?.name ?? pkg.organization;
      const updateFrequency = extractFrequency(result);
      const lastModified = result.metadata_modified as string | undefined;

      const resources = (result.resources as Array<Record<string, unknown>>) ?? [];
      const resourceInfos: ResourceInfo[] = resources.map((r) => ({
        id: r.id as string,
        format: String(r.format ?? ''),
        datastore_active: Boolean(r.datastore_active),
        size: typeof r.size === 'number' ? r.size : undefined,
        last_modified: r.last_modified as string | undefined,
      }));

      const datastoreResources = resourceInfos.filter((r) => r.datastore_active);
      const csvDatastore = datastoreResources.find((r) => /csv|geojson|json/i.test(r.format));
      const primaryResourceId = (csvDatastore ?? datastoreResources[0])?.id;
      const hasDatastore = datastoreResources.length > 0;

      let hasTemporal = false;
      let hasGeospatial = false;
      let hasBorough = false;
      let estimatedRows: number | undefined;
      let fields: Array<{ id: string; type: string }> = [];
      let pipelineStatus: 'pending' | 'error' = 'pending';
      let errorMessage: string | undefined;

      if (primaryResourceId) {
        try {
          const sql = `SELECT * FROM "${primaryResourceId}" LIMIT 1`;
          const sqlRes = await client.datastoreSQL(sql) as DatastoreSQLResponse;
          const records = sqlRes.result.records;
          fields = (sqlRes.result.fields ?? []).map((f: { id: string; type: string }) => ({ id: f.id, type: f.type }));

          for (const f of fields) {
            if (DATE_FIELD_PATTERNS.some((p) => p.test(f.id))) hasTemporal = true;
            if (GEO_FIELD_PATTERNS.some((p) => p.test(f.id))) hasGeospatial = true;
            if (BOROUGH_FIELD_PATTERNS.some((p) => p.test(f.id))) hasBorough = true;
          }

          try {
            const searchRes = await client.datastoreSearch(primaryResourceId, { limit: 1 });
            estimatedRows = searchRes.result.total;
          } catch {
            // total not always available
          }

          if (records.length > 0 && !hasTemporal) {
            const sample = records[0] as Record<string, unknown>;
            for (const key of Object.keys(sample)) {
              if (DATE_FIELD_PATTERNS.some((p) => p.test(key))) hasTemporal = true;
              if (GEO_FIELD_PATTERNS.some((p) => p.test(key))) hasGeospatial = true;
              if (BOROUGH_FIELD_PATTERNS.some((p) => p.test(key))) hasBorough = true;
            }
          }
        } catch (err) {
          pipelineStatus = 'error';
          errorMessage = err instanceof Error ? err.message : String(err);
          console.log(`  [catalog]   Test query failed for ${slug}: ${errorMessage}`);
        }
      }

      const category = inferCategory(result);
      const normFreq = normalizeFrequency(updateFrequency);
      const priorityTier = computePriorityTier(
        updateFrequency ?? 'unknown',
        hasTemporal,
        hasGeospatial,
        hasDatastore,
        pipelineStatus
      );

      const entry: CatalogEntry = {
        slug,
        title,
        description,
        organization,
        update_frequency: normFreq !== 'unknown' ? normFreq : updateFrequency,
        last_modified: lastModified,
        resources: resourceInfos,
        primary_resource_id: primaryResourceId,
        has_datastore: hasDatastore,
        has_temporal: hasTemporal,
        has_geospatial: hasGeospatial,
        has_borough: hasBorough,
        category,
        priority_tier: priorityTier,
        estimated_rows: estimatedRows,
        pipeline_status: pipelineStatus,
        error_message: errorMessage,
        fields: fields.length > 0 ? fields : undefined,
      };

      const totalSize = resourceInfos.reduce((sum, r) => sum + (r.size ?? 0), 0);
      const fileSizeBytes = totalSize > 0 ? Math.min(totalSize, 2147483647) : null;

      const rawMetadata = (() => {
        try {
          const s = JSON.stringify(result);
          if (s.length > 500_000) {
            const pruned = {
              id: result.id,
              name: result.name,
              title: result.title,
              organization: result.organization,
              resources: resourceInfos,
              tags: result.tags,
              groups: result.groups,
              extras: result.extras,
              metadata_modified: result.metadata_modified,
              _truncated: true,
            };
            return pruned as Record<string, unknown>;
          }
          return JSON.parse(s) as Record<string, unknown>;
        } catch {
          return { id: result.id, name: result.name, title: result.title };
        }
      })();

      entry.raw_metadata = rawMetadata;
      catalog.push(entry);

      await db
        .insert(datasetRegistry)
        .values({
          slug: entry.slug,
          title: entry.title,
          description: entry.description ?? null,
          organization: entry.organization ?? null,
          updateFrequency: entry.update_frequency ?? null,
          lastModified: lastModified ? new Date(lastModified) : null,
          resourceCount: resources.length,
          primaryResourceId: entry.primary_resource_id ?? null,
          hasDatastore: entry.has_datastore,
          hasGeospatial: entry.has_geospatial,
          hasTemporal: entry.has_temporal,
          estimatedRows: entry.estimated_rows ?? null,
          fileSizeBytes,
          category: entry.category ?? null,
          priorityTier: entry.priority_tier,
          pipelineStatus: entry.pipeline_status,
          notes: entry.error_message ?? null,
          rawMetadata,
        })
        .onConflictDoUpdate({
          target: datasetRegistry.slug,
          set: {
            title: entry.title,
            description: entry.description ?? null,
            organization: entry.organization ?? null,
            updateFrequency: entry.update_frequency ?? null,
            lastModified: lastModified ? new Date(lastModified) : null,
            resourceCount: resources.length,
            primaryResourceId: entry.primary_resource_id ?? null,
            hasDatastore: entry.has_datastore,
            hasGeospatial: entry.has_geospatial,
            hasTemporal: entry.has_temporal,
            estimatedRows: entry.estimated_rows ?? null,
            fileSizeBytes,
            category: entry.category ?? null,
            priorityTier: entry.priority_tier,
            pipelineStatus: entry.pipeline_status,
            notes: entry.error_message ?? null,
            rawMetadata,
          },
        });
    } catch (err) {
      console.log(`  [catalog]   ERROR for ${slug}: ${err instanceof Error ? err.message : String(err)}`);
      catalog.push({
        slug,
        title: pkg.title ?? slug,
        description: undefined,
        organization: pkg.organization,
        resources: [],
        has_datastore: false,
        has_temporal: false,
        has_geospatial: false,
        priority_tier: 5,
        pipeline_status: 'error',
        error_message: err instanceof Error ? err.message : String(err),
      });

      await db
        .insert(datasetRegistry)
        .values({
          slug,
          title: pkg.title ?? slug,
          description: null,
          organization: pkg.organization ?? null,
          resourceCount: 0,
          hasDatastore: false,
          hasGeospatial: false,
          hasTemporal: false,
          priorityTier: 5,
          pipelineStatus: 'error',
          notes: err instanceof Error ? err.message : String(err),
        })
        .onConflictDoUpdate({
          target: datasetRegistry.slug,
          set: {
            title: pkg.title ?? slug,
            pipelineStatus: 'error',
            notes: err instanceof Error ? err.message : String(err),
          },
        });
    }
  }

  catalog.sort((a, b) => {
    if (a.priority_tier !== b.priority_tier) return a.priority_tier - b.priority_tier;
    return (a.title ?? a.slug).localeCompare(b.title ?? b.slug);
  });

  await mkdir(dirname('docs/datasets-catalog.json'), { recursive: true });
  await writeFile(
    'docs/datasets-catalog.json',
    JSON.stringify({ source: baseUrl, count: catalog.length, datasets: catalog }, null, 2),
    'utf-8'
  );
  console.log('\n[catalog] Wrote docs/datasets-catalog.json');

  const mdRows = catalog.map(
    (d) =>
      `| ${d.slug} | ${(d.title ?? '').replace(/\|/g, '\\|').slice(0, 60)} | ${d.update_frequency ?? '-'} | ${d.has_datastore ? '✓' : ''} | ${d.has_temporal ? '✓' : ''} | ${d.has_geospatial ? '✓' : ''} | ${d.estimated_rows?.toLocaleString() ?? '-'} | ${d.category ?? '-'} |`
  );

  const md = `# Montreal Datasets — Priority Catalog

Generated by \`npm run catalog\`. Sorted by priority tier (1=best for pipelines, 5=archive/broken).

| slug | title | frequency | has_datastore | has_temporal | has_geo | estimated rows | category |
|------|-------|-----------|---------------|--------------|---------|----------------|----------|
${mdRows.join('\n')}
`;

  await writeFile('docs/datasets-priority.md', md, 'utf-8');
  console.log('[catalog] Wrote docs/datasets-priority.md');

  const ok = catalog.filter((c) => c.pipeline_status !== 'error').length;
  const err = catalog.filter((c) => c.pipeline_status === 'error').length;
  console.log(`\n[catalog] Done. ${catalog.length} datasets (${ok} OK, ${err} errors)`);
}

main().catch((err) => {
  console.error('[catalog] Fatal:', err);
  process.exit(1);
});
