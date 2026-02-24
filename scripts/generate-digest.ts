#!/usr/bin/env npx tsx
/**
 * Generate AI digests via Claude.
 * Usage:
 *   npm run digest -- --type daily --date 2026-02-18
 *   npm run digest -- --type weekly --week 2026-W07
 *   npm run digest -- --type borough --borough VMA --date 2026-02-18
 *   npm run digest -- --type daily --date 2026-02-18 --lang fr
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { DigestGenerator } from '../src/lib/ai/digest-generator';
import { startOfWeek, addWeeks } from 'date-fns';

function parseWeek(weekStr: string): string {
  // Format: 2026-W07 (ISO week)
  const m = weekStr.match(/^(\d{4})-W(\d{2})$/);
  if (!m) throw new Error(`Invalid week format: ${weekStr}. Use YYYY-Www (e.g. 2026-W07)`);
  const year = parseInt(m[1]!, 10);
  const weekNum = parseInt(m[2]!, 10);
  // Jan 4 is always in ISO week 1
  const jan4 = new Date(year, 0, 4);
  const week1Monday = startOfWeek(jan4, { weekStartsOn: 1 });
  const targetMonday = addWeeks(week1Monday, weekNum - 1);
  return targetMonday.toISOString().slice(0, 10);
}

function parseArgs(): {
  type: 'daily' | 'weekly' | 'borough';
  date?: string;
  week?: string;
  borough?: string;
  lang?: 'fr' | 'en';
} {
  const args = process.argv.slice(2);
  const out: {
    type: 'daily' | 'weekly' | 'borough';
    date?: string;
    week?: string;
    borough?: string;
    lang?: 'fr' | 'en';
  } = { type: 'daily' };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      const t = args[++i];
      if (t === 'daily' || t === 'weekly' || t === 'borough') out.type = t;
    } else if (args[i] === '--date' && args[i + 1]) {
      out.date = args[++i];
    } else if (args[i] === '--week' && args[i + 1]) {
      out.week = args[++i];
    } else if (args[i] === '--borough' && args[i + 1]) {
      out.borough = args[++i];
    } else if (args[i] === '--lang' && args[i + 1]) {
      const l = args[++i];
      if (l === 'fr' || l === 'en') out.lang = l;
    }
  }
  return out;
}

async function main() {
  const { type, date, week, borough, lang } = parseArgs();

  if (type === 'daily' && !date) {
    console.error('Usage: npm run digest -- --type daily --date YYYY-MM-DD');
    console.error('       npm run digest -- --type weekly --week YYYY-Www');
    console.error('       npm run digest -- --type borough --borough CODE --date YYYY-MM-DD');
    process.exit(1);
  }
  if (type === 'weekly' && !week && !date) {
    console.error('--type weekly requires --week YYYY-Www or --date YYYY-MM-DD (Monday)');
    process.exit(1);
  }
  if (type === 'borough' && (!borough || !date)) {
    console.error('--type borough requires --borough CODE and --date YYYY-MM-DD');
    process.exit(1);
  }

  let periodDate: string;
  if (type === 'weekly') {
    periodDate = week ? parseWeek(week) : startOfWeek(new Date(date!), { weekStartsOn: 1 }).toISOString().slice(0, 10);
  } else {
    const d = date!.toLowerCase() === 'today' ? new Date() : new Date(date!);
    periodDate = d.toISOString().slice(0, 10);
  }

  const gen = new DigestGenerator();
  console.log(`Generating ${type} digest for ${periodDate}${borough ? ` (${borough})` : ''}...`);

  try {
    let result: { fr?: { id: number }; en?: { id: number } };
    if (type === 'daily') {
      result = await gen.generateDaily(periodDate, lang);
    } else if (type === 'weekly') {
      result = await gen.generateWeekly(periodDate, lang);
    } else {
      result = await gen.generateBoroughDaily(borough!, periodDate, lang);
    }

    const ids = [result.fr?.id, result.en?.id].filter(Boolean);
    if (ids.length > 0) {
      console.log(`Created digest(s) with id(s): ${ids.join(', ')}`);
    } else {
      console.log('Digest(s) already existed — skipped (idempotent)');
    }
  } catch (err) {
    console.error('Digest generation failed:', err);
    process.exit(1);
  }
}

main();
