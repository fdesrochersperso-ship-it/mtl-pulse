#!/usr/bin/env npx tsx
/**
 * Backfill script — runs all Tier 1 pipelines in sequence for initial data load.
 * Usage: npm run backfill
 */

import 'dotenv/config';
import { PipelineRunner } from '../src/lib/pipeline/runner';
import { pipelineRegistry } from '../src/lib/pipeline/registry';

const TIER1_PIPELINES = [
  'actes_criminels',
  'info_travaux',
  'entraves_circulation',
  'requetes_311',
  'permis_construction',
  'fire_interventions',
  'pothole_repairs',
  'remorquages',
  'bedbug_reports',
  'elected_officials',
  'boroughs',
];

const PHASE4_PIPELINES = [
  'air_quality',
  'cycling_counts',
  'water_breaks',
  'road_condition',
  'contracts',
];

const ALL_BACKFILL_PIPELINES = [...TIER1_PIPELINES, ...PHASE4_PIPELINES];

async function main() {
  const runner = new PipelineRunner();
  const results: Array<{ name: string; status: string; error?: string }> = [];

  console.log(
    `\n[backfill] Running ${ALL_BACKFILL_PIPELINES.length} pipelines in sequence...\n`,
  );

  for (const name of ALL_BACKFILL_PIPELINES) {
    const pipeline = pipelineRegistry.get(name);
    if (!pipeline) {
      console.error(`[backfill] Pipeline "${name}" not found, skipping`);
      results.push({ name, status: 'skipped' });
      continue;
    }

    try {
      const result = await runner.run(pipeline);
      results.push({
        name,
        status: result.status,
        error: result.errorMessage,
      });
      if (result.status === 'success') {
        console.log(
          `[backfill] ${name}: OK — ${result.recordsFetched} fetched, ${result.recordsInserted} inserted, ${result.recordsUpdated} updated\n`,
        );
      } else {
        console.error(`[backfill] ${name}: FAILED — ${result.errorMessage}\n`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[backfill] ${name}: ERROR — ${msg}\n`);
      results.push({ name, status: 'error', error: msg });
    }
  }

  const succeeded = results.filter((r) => r.status === 'success');
  const failed = results.filter((r) => r.status !== 'success');

  console.log('\n[backfill] Summary:');
  console.log(`  Success: ${succeeded.length}/${ALL_BACKFILL_PIPELINES.length}`);
  if (failed.length > 0) {
    console.log(`  Failed: ${failed.map((f) => f.name).join(', ')}`);
    process.exit(1);
  }
}

main();
