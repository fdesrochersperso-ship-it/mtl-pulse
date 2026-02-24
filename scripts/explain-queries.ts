/**
 * Run EXPLAIN ANALYZE on key dashboard queries.
 * Usage: npx tsx scripts/explain-queries.ts
 * Requires: DATABASE_URL
 */

import { db } from '../src/lib/db';
import { sql } from 'drizzle-orm';

async function explain(query: string, label: string) {
  console.log('\n' + '='.repeat(60));
  console.log(label);
  console.log('='.repeat(60));
  try {
    const rows = await db.execute(sql.raw(`EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) ${query}`));
    const lines = (rows as { 'Query Plan': string }[]).map((r) => r['Query Plan']);
    console.log(lines.join('\n'));
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);

  await explain(
    `SELECT * FROM computed_metrics WHERE period_type = 'current' AND period_date = '${today}' AND borough_code IS NULL`,
    'getAllCurrentMetrics (city-wide)',
  );

  await explain(
    `SELECT period_date, value FROM computed_metrics WHERE metric_name = 'crime_count_7d' AND period_date >= '${today}'::date - interval '30 days' AND borough_code IS NULL ORDER BY period_date`,
    'getMetricHistory (crime_count_7d, 30d)',
  );

  await explain(
    `SELECT * FROM computed_metrics WHERE period_type = 'current' AND period_date = '${today}' AND borough_code = 'VMA'`,
    'getBoroughMetrics (Ville-Marie)',
  );

  await explain(
    `SELECT * FROM digests WHERE digest_type = 'daily' AND language = 'fr' AND borough_code IS NULL ORDER BY period_date DESC, generated_at DESC LIMIT 1`,
    'getLatestDigest (daily, fr)',
  );

  process.exit(0);
}

main();
