#!/usr/bin/env npx tsx
/**
 * CLI to run a pipeline by name.
 * Usage: npm run pipeline -- --name info_travaux
 */

import 'dotenv/config';
import { PipelineRunner } from '../src/lib/pipeline/runner';

function parseArgs(): { name: string } {
  const args = process.argv.slice(2);
  const nameIndex = args.indexOf('--name');
  if (nameIndex === -1 || !args[nameIndex + 1]) {
    console.error('Usage: npm run pipeline -- --name <pipeline_name>');
    console.error('Example: npm run pipeline -- --name info_travaux');
    process.exit(1);
  }
  return { name: args[nameIndex + 1]! };
}

async function main() {
  const { name } = parseArgs();
  const runner = new PipelineRunner();

  try {
    const result = await runner.runByName(name);
    if (result.status === 'success') {
      console.log(
        `\n[pipeline] Done. ${result.recordsFetched} fetched, ${result.recordsInserted} inserted, ${result.recordsUpdated} updated in ${result.durationMs}ms`,
      );
    } else {
      console.error(`\n[pipeline] Failed: ${result.errorMessage}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('[pipeline] Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
