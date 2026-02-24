#!/usr/bin/env npx tsx
/**
 * Apply Phase 4 migration (new tables) directly.
 * Use when db:migrate fails due to migration state.
 * Usage: npx tsx scripts/apply-phase4-migration.ts
 */

import 'dotenv/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: url });
  const sqlPath = join(process.cwd(), 'migrations', '0004_living_shockwave.sql');
  const sql = readFileSync(sqlPath, 'utf-8');

  const statements = sql
    .split('--> statement-breakpoint')
    .map((s) => s.trim())
    .filter(Boolean);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i]!;
    try {
      await pool.query(stmt);
      console.log(`[OK] Statement ${i + 1}/${statements.length}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('already exists')) {
        console.log(`[SKIP] Statement ${i + 1} (already exists)`);
      } else {
        console.error(`[FAIL] Statement ${i + 1}:`, msg);
        throw err;
      }
    }
  }

  await pool.end();
  console.log('\n[apply-phase4-migration] Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
