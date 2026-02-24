/**
 * Smoke test for the CKAN API client.
 * Run with: npm run test:ckan
 *
 * Verifies: datastore_search, datastore_search_sql, package_show, package_search.
 */

const ACTES_CRIMINELS_RESOURCE = 'c6f482bf-bf0f-4960-8b2f-9982c211addd';
const ACTES_CRIMINELS_SLUG = 'actes-criminels';

async function main() {
  const { CKANClient } = await import('../src/lib/api-clients/ckan-client');
  const client = new CKANClient();

  console.log('=== CKAN API Smoke Test ===\n');
  console.log(`Base URL: ${process.env.CKAN_BASE_URL ?? 'https://data.montreal.ca/api/3/action'}\n`);

  try {
    // 1. Fetch 5 rows from actes-criminels via datastore_search
    console.log('1. datastore_search — 5 rows from actes-criminels...');
    const searchResult = await client.datastoreSearch(ACTES_CRIMINELS_RESOURCE, {
      limit: 5,
      offset: 0,
    });
    console.log(`   Total records: ${searchResult.result.total}`);
    console.log(`   Fetched: ${searchResult.result.records.length}`);
    console.log('   Sample:', JSON.stringify(searchResult.result.records[0], null, 2));
    console.log('');

    // 2. Fetch 3 rows via datastore_search_sql (date filter — critical for large datasets)
    console.log('2. datastore_search_sql — 3 rows with date filter...');
    const sql = `SELECT * FROM "${ACTES_CRIMINELS_RESOURCE}" WHERE "DATE" >= '2025-01-01' LIMIT 3`;
    const sqlResult = await client.datastoreSQL(sql);
    console.log(`   Fetched: ${sqlResult.result.records.length} records`);
    if (sqlResult.result.records.length > 0) {
      console.log('   Sample:', JSON.stringify(sqlResult.result.records[0], null, 2));
    }
    console.log('');

    // 3. Fetch dataset metadata (package_show)
    console.log('3. package_show — metadata for actes-criminels...');
    const packageResult = await client.packageShow(ACTES_CRIMINELS_SLUG);
    const pkg = packageResult.result;
    console.log(`   ID: ${pkg.id}`);
    console.log(`   Name: ${pkg.name}`);
    console.log(`   Title: ${pkg.title ?? '(not set)'}`);
    console.log(`   Resources: ${pkg.resources.length}`);
    pkg.resources.slice(0, 3).forEach((r, i) => {
      console.log(`     [${i}] ${r.name} (${r.format}) datastore_active=${r.datastore_active ?? false}`);
    });
    console.log('');

    // 4. Package search (Phase 0 cataloging)
    console.log('4. package_search — Ville de Montréal datasets (rows=3)...');
    const searchPkg = await client.packageSearch(
      'organization:ville-de-montreal',
      3,
      0,
    );
    console.log(`   Total packages: ${searchPkg.result.count}`);
    searchPkg.result.results.forEach((r, i) => {
      console.log(`     [${i}] ${r.name} - ${r.title ?? r.id}`);
    });
    console.log('');

    console.log('=== CKAN smoke test passed ===');
  } catch (error) {
    console.error('=== CKAN smoke test failed ===');
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) console.error(error.stack);
    } else {
      console.error(String(error));
    }
    process.exit(1);
  }
}

main();
