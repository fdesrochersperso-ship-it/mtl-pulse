#!/usr/bin/env npx tsx
/**
 * Compute all metrics and upsert into computed_metrics table.
 * Run after pipeline ingest. Call via: npm run metrics
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { runMetricComputations } from '../src/lib/pipeline/metrics-computer';

async function main() {
  console.log('Starting metrics computation...');
  const start = Date.now();
  await runMetricComputations();
  const elapsed = Date.now() - start;
  console.log(`Metrics computed in ${elapsed}ms`);
}

main().catch((err) => {
  console.error('Metrics computation failed:', err);
  process.exit(1);
});
