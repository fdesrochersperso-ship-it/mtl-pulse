# MTL Pulse — Montreal Civic Dashboard

## Project Overview
MTL Pulse is a civic dashboard that ingests Montreal open data daily, computes metrics, generates AI summaries, and displays trends via charts. It answers: "What happened in Montreal today/this week?"

## Tech Stack
- **Framework**: Next.js 14 (App Router, TypeScript, src/ directory)
- **Database**: PostgreSQL + Drizzle ORM (no PostGIS — use numeric lat/lng)
- **Charts**: Recharts
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: Anthropic Claude API (Sonnet) for daily/weekly digests
- **Data**: Montreal open data (CKAN API at data.montreal.ca + CSV downloads from donnees.montreal.ca)

## Key Architecture Decisions
- All data fetchers live in `src/lib/fetchers/` and extend a base class with fetch→parse→save→log pattern
- Daily metrics are pre-aggregated into `daily_metrics` table for fast dashboard queries
- Every fetch is logged in `snapshots` table with data hash to skip unchanged data
- Borough codes are 3-letter codes (PLT, VMA, MHM, etc.) used consistently everywhere
- AI digests are generated at 7AM after all fetchers complete, stored in `daily_digests`
- Frontend uses server components for data fetching, client components only for interactive charts

## Data Sources (Priority Order)
1. **Crime** (daily) — CKAN DataStore API, resource c6f482bf-bf0f-4960-8b2f-9982c211addd
2. **Info-Travaux** (4h) — CSV from donnees.montreal.ca/dataset/info-travaux
3. **311 Requests** (daily) — CKAN DataStore API
4. **Building Permits** (weekly) — CSV from donnees.montreal.ca/dataset/permis-construction (172MB full, 89KB stats)
5. **Fire Interventions** (daily) — CSV download
6. **Potholes** (daily) — CSV from donnees.montreal.ca/dataset/refection-de-chaussee-par-remplissage-mecanise-de-nid-de-poule
7. **Snow Towings** (daily, winter) — CSV from donnees.montreal.ca/dataset/remorquages-de-vehicules-genants
8. **Contracts** (weekly) — REST API at ville.montreal.qc.ca/vuesurlescontrats/api/releases

## CKAN API Pattern
```typescript
// DataStore search (structured data with pagination)
const url = `https://data.montreal.ca/api/3/action/datastore_search?resource_id=${RESOURCE_ID}&limit=1000&offset=${offset}`;

// DataStore SQL (filtered queries)
const url = `https://data.montreal.ca/api/3/action/datastore_search_sql?sql=SELECT * FROM "${RESOURCE_ID}" WHERE "DATE" > '${lastFetch}'`;

// Package metadata (to find resource URLs)
const url = `https://donnees.montreal.ca/api/3/action/package_show?id=${datasetSlug}`;
```

## Design System
- Colors: Navy (#1B365D), White, Accent Orange (#FF6B35), Light Gray (#F5F5F5)
- Typography: System font stack, clean and newspaper-like
- Cards with subtle shadows, delta badges showing ↑↓ with green/red
- Charts: consistent blue palette with orange highlights for current period
- Bilingual: FR primary, EN secondary — all UI text and AI digests in both languages

## File Naming Conventions
- Components: PascalCase (MetricCard.tsx)
- Utilities/lib: kebab-case (daily-metrics.ts)
- Types: PascalCase in types/index.ts
- API routes: route.ts in directory matching endpoint path

## Environment Variables
- DATABASE_URL — PostgreSQL connection string
- ANTHROPIC_API_KEY — For Claude API digest generation
- SNOW_API_TOKEN — Secured API token for snow removal data (request from donneesouvertes@montreal.ca)
- CRON_SECRET — Protects cron trigger endpoint from unauthorized calls

## Testing Notes
- Start with the crime fetcher as proof-of-concept (cleanest API, smallest data)
- For development, use a local Postgres via Docker: `docker run --name mtl-pulse-db -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=mtl_pulse -p 5432:5432 -d postgres:16`
- The CKAN API has no documented rate limits but be respectful — add 500ms delays between paginated requests
- CSV downloads can be large (permits = 172MB) — always use streaming parsers
