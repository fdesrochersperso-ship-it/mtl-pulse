/**
 * Dataset registry queries — for About page and catalog stats.
 */

import { db } from '@/lib/db';
import { datasetRegistry } from '@/lib/db/schema';
import { count } from 'drizzle-orm';

/** Get total count of datasets in the registry */
export async function getDatasetCount(): Promise<number> {
  const [row] = await db
    .select({ count: count() })
    .from(datasetRegistry);
  return Number(row?.count ?? 0);
}
