# MTL Pulse — Cursor Rules & Product Specification

> **Purpose**: This document is the single source of truth for building MTL Pulse in Cursor. It covers product vision, data sources, insight hypotheses, technical architecture, and implementation instructions. Read it fully before writing any code.

---

## 1. PRODUCT VISION

### What is MTL Pulse?

MTL Pulse is a **civic intelligence platform for Montréal** that aggregates 300+ open datasets from the city, normalizes and enriches them, computes trends and anomalies, and presents them through two interfaces:

1. **Free Dashboard** (MVP): A mobile-first, live-updating civic dashboard where anyone can browse trending city data — construction, crime, permits, 311 requests, snow removal, air quality, cycling, water infrastructure, contracts, and more. Think of it as a "Bloomberg Terminal for your city" designed for regular citizens.

2. **Paid AI Chat** (Phase 2): A conversational interface where users ask questions in natural language ("How many building permits were issued in Rosemont last quarter?") and the AI queries the database, generates charts, and delivers analysis. Annual subscription or donation-based.

### Who is it for?

- **Primary (free tier)**: Regular Montréalers who want to know what's happening in their city and borough
- **Secondary (free tier)**: Journalists, urbanists, activists who need fast access to civic data with trends
- **Tertiary (paid tier)**: Researchers, political analysts, real estate professionals who need deep ad-hoc queries

### Competitive landscape

| Competitor | Weakness | MTL Pulse advantage |
|-----------|----------|-------------------|
| donnees.montreal.ca (official portal) | Raw data dumps, siloed PowerBI dashboards, no cross-dataset analysis | Unified dashboard, trend analysis, AI summaries |
| OpenDataMontreal.ca | Only 9 datasets, static pages, no real-time data, no trends | Comprehensive (all datasets), live updates, computed insights |
| Vue sur la sécurité publique | Crime only, PowerBI embed, slow, no mobile experience | Multi-domain, mobile-first, fast, contextual |
| Vue sur les contrats | Contracts only, no correlation with other data | Cross-referencing contracts with infrastructure outcomes |

### Key decisions

- **Dataset scope**: Ingest EVERYTHING from donnees.montreal.ca. All 300+ datasets. Build a universal pipeline engine that can handle any CKAN dataset. Phase 0 is cataloging all of them programmatically.
- **Historical depth**: Last 5 years minimum wherever data is available. Some datasets go back much further (water breaks since 1972, permits since 1990) — ingest all available history for those.
- **Dashboard types**: Both pre-built topic dashboards (always available, editorially curated) AND dynamically generated trending dashboards (auto-surfaced based on data anomalies/spikes).
- **Political accountability**: Include in MVP. Map elected officials to boroughs, correlate with infrastructure data.
- **Monetization timeline**: Free platform first, prove traction, then add paid AI chat tier. No auth needed for MVP.

### Product principles

1. **Data freshness above all** — Show when data was last updated. Never show stale data without flagging it. If a pipeline is broken, say so.
2. **Mobile-first for masses** — The free dashboard must be usable on a phone in portrait mode. Charts must be touch-friendly.
3. **Dashboard-of-dashboards** — The homepage is a directory of "topic dashboards" (construction, safety, transit, environment, etc.), each one a focused analysis page. The homepage highlights what's trending.
4. **Show the data early** — Within 2 seconds of landing, users should see actual numbers, charts, or maps. No landing page fluff.
5. **Bilingual FR/EN** — French primary, English secondary. UI strings via i18n. AI digests generated in both languages.
6. **Transparency builds trust** — Always show methodology, data source links, caveats, and limitations.
7. **Ingest everything** — Don't cherry-pick datasets. Build a generic pipeline engine and systematically ingest every dataset on the portal. More data = more insight potential for the future AI chat tier.

---

## 2. INFORMATION ARCHITECTURE

### Homepage: "Le Pouls de Montréal"

The homepage is a **trending topics directory** — a grid/list of topic dashboards, each showing a mini-summary of current state + trend indicator. Think of it as a news front page made of data cards.

```
┌─────────────────────────────────────────────────────────┐
│  MTL Pulse — Le pouls de Montréal        [FR|EN] 🔍    │
├─────────────────────────────────────────────────────────┤
│  AI Daily Digest (collapsible summary)                  │
│  "Hier à Montréal: 23 nouveaux chantiers, criminalité  │
│   en baisse de 12% vs semaine dernière..."              │
├─────────────────────────────────────────────────────────┤
│  📊 TRENDING TOPIC CARDS (2-column grid on mobile)      │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ 🚧 Travaux    │  │ 🔒 Sécurité  │                    │
│  │ 847 actifs    │  │ -12% vs sem. │                    │
│  │ ▲ +23 auj.   │  │  dernière    │                    │
│  │ [sparkline]   │  │ [sparkline]  │                    │
│  └──────────────┘  └──────────────┘                     │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ 🏗️ Permis     │  │ 📞 311       │                    │
│  │ 142 cette sem│  │ 3,201 ouvert │                    │
│  │ $47M valeur  │  │ délai moy: 8j│                    │
│  │ [sparkline]   │  │ [sparkline]  │                    │
│  └──────────────┘  └──────────────┘                     │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ ❄️ Déneigement│  │ 🌡️ Air/Météo │                    │
│  │ 67% complété │  │ IQA: 28 Bon  │                    │
│  │ 14 remorquage│  │ -8°C couvert │                    │
│  └──────────────┘  └──────────────┘                     │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ 🚲 Vélo       │  │ 💧 Eau       │                    │
│  │ Saison fermée│  │ 3 bris actifs│                    │
│  │ 12M passages │  │ 147 surverses│                    │
│  │ en 2025      │  │ cette année  │                    │
│  └──────────────┘  └──────────────┘                     │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ 🏛️ Contrats   │  │ 🗳️ Politique │                    │
│  │ $2.1B en 2025│  │ Proch. séance│                    │
│  │ Top: Infra   │  │ 24 fév 2026  │                    │
│  └──────────────┘  └──────────────┘                     │
├─────────────────────────────────────────────────────────┤
│  Borough selector → filter all cards by arrondissement  │
└─────────────────────────────────────────────────────────┘
```

### Topic dashboards (each card links to a full page)

Each topic dashboard is a dedicated page with:
- **Header stats**: Key metrics for this topic, with period comparison
- **Trend chart**: Time series (daily/weekly/monthly toggle)
- **Map view**: Geospatial visualization where applicable
- **Borough breakdown**: Comparative table/chart across arrondissements
- **Data table**: Searchable, filterable, paginated raw data
- **AI insight**: Auto-generated observation about current trends

### Route structure

```
/                                → Homepage (trending topic cards)
/travaux                         → Construction & road work dashboard
/securite                        → Crime & public safety dashboard
/permis                          → Building permits dashboard
/311                             → Citizen service requests dashboard
/entraves                        → Real-time road obstructions
/deneigement                     → Snow removal dashboard (seasonal)
/velo                            → Cycling infrastructure & counts
/air                             → Air quality dashboard
/eau                             → Water infrastructure dashboard
/contrats                        → Contracts & spending dashboard
/politique                       → Political accountability
/nids-de-poule                   → Pothole tracker (seasonal)
/pompiers                        → Fire department interventions
/arbres                          → Urban tree canopy
/stationnement                   → Parking data
/borough/{code}                  → Borough-specific overview
/borough/{code}/{topic}          → Borough + topic intersection
/digest/daily/{date}             → Daily AI digest
/digest/weekly/{week}            → Weekly AI digest
/map                             → Full-screen multi-layer map
/about                           → About, methodology, data sources
/api/...                         → Public API endpoints
```

---

## 3. COMPLETE DATA SOURCE INVENTORY

### Platform fundamentals

- **Primary API**: CKAN at `data.montreal.ca` — no auth required (except déneigement)
- **Federation mirror**: `donneesquebec.ca` (CKAN 2.10) — same data, alternative endpoint
- **License**: CC BY 4.0 for all datasets
- **Rate limits**: None documented — be respectful, cache aggressively
- **Encoding**: UTF-8 with French accents everywhere

### Key API patterns

```
# DataStore search (paginated)
GET data.montreal.ca/api/3/action/datastore_search
  ?resource_id={ID}&limit=100&offset=0&filters={"field":"value"}&sort=DATE desc

# DataStore SQL (date filtering — CRITICAL for large datasets)
GET data.montreal.ca/api/3/action/datastore_search_sql
  ?sql=SELECT * FROM "{ID}" WHERE "DATE" >= '2025-01-01' LIMIT 1000

# Dataset metadata (get resource IDs)
GET donneesquebec.ca/recherche/api/3/action/package_show?id={dataset-slug}
```

### Tier 1: Real-time & Daily datasets (highest priority)

| Dataset | Slug | Update freq | Key insight potential | History |
|---------|------|-------------|----------------------|---------|
| **Actes criminels** | actes-criminels | Daily | Crime trends by borough, category, time-of-day. YoY comparison. Seasonal patterns. | 2015–present |
| **Info-Travaux** | info-travaux | Daily | Active construction count, new/closed detection, borough disruption scoring | ~2014–present |
| **Entraves circulation** | entraves-circulation | Real-time | Live road obstruction map, count trends, impact scoring | Snapshot (archive for history) |
| **Remorquages** | remorquages-de-vehicules-genants | Daily | Towing hotspots, snow-op correlation, borough comparison | Nov 2015–present |
| **IQA Air Quality** | rsqa-indice-qualite-air | Hourly | Real-time air quality by sector, historical trends, alert days count | Continuous |
| **Compteurs cyclistes** | cyclistes | Daily | Bike traffic by location, seasonal patterns, infrastructure impact | Multi-year |
| **Requêtes 311** | requete-311 | Daily | Service request volume, type trends, response times, borough comparison | Multi-year |

### Tier 2: Weekly datasets

| Dataset | Slug | Update freq | Key insight potential | History |
|---------|------|-------------|----------------------|---------|
| **Permis construction** | permis-construction | Weekly | Permit volume, estimated costs, type breakdown, development hotspots | 1990–present |
| **Interventions pompiers** | interventions-service-securite-incendie-montreal | ~Monthly | Fire types, response patterns, borough comparison | 2005–present |
| **Collisions routières** | collisions-routieres | Historical | Crash hotspots, severity trends (limited: 2012–2021 on MTL portal) | 2012–2021 |

### Tier 3: Reference & Context datasets

| Dataset | Slug | Purpose |
|---------|------|---------|
| **Limites administratives** | limites-administratives-agglomeration | Borough boundary polygons |
| **Arrondissements liste** | arros-liste | Borough reference codes |
| **Districts électoraux** | districts-electoraux | 58 electoral districts (2025) |
| **Liste des élus** | listes-des-elus-de-la-ville-de-montreal | Current elected officials |
| **Rémunération des élus** | remuneration-elus | Official compensation data |
| **Résultats électoraux** | resultats-sommaires | 2021 election + by-elections |
| **Calendrier séances** | calendrier-seances-comite-executif-conseil-municipal-conseil-agglomeration | Council meeting schedule |
| **Vidéos des séances** | videodiffusion-seances-instances-politiques | YouTube links to council recordings since 2012 |
| **Budget fonctionnement** | budget | Annual operating budget |
| **Contrats API** | ville.montreal.qc.ca/vuesurlescontrats/api/ | All contracts since 2012 (REST API) |
| **Géobase** | geobase | Road network (weekly updates) |
| **Structures routières** | structure-routiere | Bridge/tunnel condition (ICG index, 2021 snapshot) |
| **Condition chaussées** | condition-chaussees-reseau-routier | Pavement Condition Index, IRI |
| **Actifs de voirie** | voirie-actif | Complete road asset DB |
| **Réseau cyclable** | pistes-cyclables | Cycling infrastructure geometry |
| **Arbres publics** | arbres | Municipal tree inventory |
| **Bâtiments municipaux** | batiments-municipaux | Municipal building locations |
| **Lieux publics** | lieux-publics | Parks, libraries, community centers |
| **Établissements alimentaires** | etablissements-alimentaires | Food safety inspections |
| **Punaises de lit** | declarations-exterminations-punaises-de-lit | Bedbug reports since 2011 |
| **Dépistage plomb** | depistage-plomb-eau-potable | Lead in water testing |

### Tier 4: Seasonal datasets

| Dataset | Slug | Season | Key insight |
|---------|------|--------|-------------|
| **Déneigement rues** | deneigement | Winter | Real-time snow loading (REQUIRES API TOKEN) |
| **Secteurs déneigement** | secteur-deneigement | Winter | Sector boundaries |
| **Sites élimination neige** | depot-neige | Winter | Disposal volumes |
| **Contrats déneigement** | contrats-transaction-deneigement | Winter | Every truck passage at disposal gates |
| **Stationnements déneigement** | stationnements-deneigement | Winter | Parking during snow ops |
| **Nids-de-poule** | refection-de-chaussee-par-remplissage-mecanise-de-nid-de-poule | Spring | GPS of every pothole repair since Dec 2016 |
| **Bris eau potable** | reparation-reseau-eau-potable | Year-round | Water main breaks since April 1972 (!!) |
| **Débordements** | debordement | Year-round | Sewer overflow duration |
| **Ouvrages surverse** | ouvrage-surverse | Year-round | 170 combined sewer overflow structures |

### Tier 5: External (non-CKAN) sources

| Source | Endpoint | Auth | Update |
|--------|----------|------|--------|
| **Hydro-Québec pannes** | pannes.hydroquebec.com/pannes/donnees/v3_0/ | None | Real-time (15 min) |
| **Environment Canada** | api.weather.gc.ca (OGC API) | None | Real-time |
| **STM transit** | stm.info developer portal | Free API key | GTFS-RT real-time |
| **Contrats Ville** | ville.montreal.qc.ca/vuesurlescontrats/api/ | None | Continuous |
| **Statistics Canada** | CensusMapper API | Free registration | Census 2021 |
| **Agence mobilité durable** | agencemobilitedurable.ca/en/information/open-data | None | Parking data |

---

## 4. DATA INSIGHT HYPOTHESES & DASHBOARD IDEAS

These are the "stories" MTL Pulse should surface. Each one is a potential trending card, dashboard analysis, or AI chat query. **Prioritized by public interest and data availability.**

### 🔥 High-impact insights (build first)

#### Construction Season Intensity Index
- **Metric**: Active construction sites per km² of road, by borough
- **Trend**: Week-over-week change in active sites
- **Historical**: Compare this month to same month last 5 years → "Is construction season getting worse?"
- **Cross-reference**: Correlate with 311 complaints about noise/dust
- **Data**: info-travaux + requete-311

#### Crime Pulse
- **Metrics**: Daily/weekly crime count by category, by borough, by time-of-day
- **Trend**: Rolling 30-day average vs current → "Breakins are up 34% in Villeray this month"
- **Seasonal**: Summer vs winter crime patterns
- **Political angle**: Crime rates mapped against police station (PDQ) territories
- **Data**: actes-criminels

#### 311 Response Scorecard
- **Metric**: Average days from creation to "Terminée" status, by borough
- **Trend**: Which boroughs are improving/declining in responsiveness?
- **Top complaints**: Most frequent request types, changing over time
- **Cross-reference**: Are 311 volumes higher during construction season?
- **Data**: requete-311

#### Building Permit Value Tracker
- **Metrics**: Total estimated construction value per month, by borough
- **Trend**: Investment flowing into which neighborhoods? Gentrification proxy?
- **Breakdown**: New construction (CO) vs renovation (TR) vs demolition (DE)
- **Historical**: 35 years of permit data → massive trend analysis
- **Data**: permis-construction

#### Snow Removal Live Tracker (Winter)
- **Metrics**: % of sectors completed, towing count, snow disposal volume
- **Trend**: Speed comparison to previous seasons
- **Political**: Borough-by-borough completion speed ranking
- **Data**: deneigement + remorquages + contrats-transaction-deneigement + depot-neige

### 📊 Medium-impact insights

#### Water Infrastructure Aging
- **Insight**: Water main breaks since 1972 — 50+ years of data!
- **Trend**: Are breaks increasing? (aging infrastructure hypothesis)
- **Map**: Heatmap of break locations → where are the oldest pipes?
- **Borough comparison**: Which boroughs have worst water infrastructure?
- **Data**: reparation-reseau-eau-potable

#### Pothole Season Predictor
- **Map**: Heatmap of pothole repairs by year
- **Trend**: Year-over-year comparison of pothole volume
- **Correlation**: Does a harsh winter → worse pothole season? (cross with weather data)
- **Borough scorecard**: Repair response time by borough
- **Data**: refection-de-chaussee-par-remplissage-mecanise-de-nid-de-poule

#### Cycling City Tracker
- **Metrics**: Daily cyclist count across permanent counters
- **Trend**: Year-over-year growth in cycling
- **Seasonal**: When do cyclists disappear? When do they return?
- **Infrastructure**: New bike lanes vs cycling volume correlation
- **Data**: cyclistes + pistes-cyclables

#### Air Quality Patterns
- **Metrics**: IQA index by sector, hourly
- **Trend**: Number of "Mauvais" (bad air) days per year — getting better or worse?
- **Correlation**: Air quality vs construction activity, vs traffic
- **Data**: rsqa-indice-qualite-air

#### Fire Department Response Patterns
- **Metrics**: Intervention count by type, by borough
- **Trend**: Are fire incidents increasing in certain areas?
- **Cross-reference**: Building age/type in areas with most fires
- **Data**: interventions-service-securite-incendie-montreal

#### Contract Spending Transparency
- **Metrics**: Total contract value by sector, by supplier
- **Trend**: Spending by borough over time
- **Flags**: Largest contracts, sole-source contracts, supplier concentration
- **Political**: Contract patterns aligned with election cycles
- **Data**: Contrats API + budget

### 💡 Novel / unique insights (differentiators)

#### Bedbug Epidemic Tracker
- **Map**: Bedbug extermination reports by neighborhood since 2011
- **Trend**: Is the problem getting worse? Seasonal patterns?
- **Borough comparison**: Which neighborhoods are most affected?
- **Data**: declarations-exterminations-punaises-de-lit

#### Lead in Water Monitor
- **Map**: Lead detection results across the city
- **Trend**: Is the city making progress on lead pipe replacement?
- **Data**: depistage-plomb-eau-potable

#### Road Condition Decay Index
- **Metrics**: Pavement Condition Index (PCI) by borough
- **Trend**: Road quality declining or improving?
- **Cross-reference**: Road condition vs construction investment → is money being spent where roads are worst?
- **Data**: condition-chaussees-reseau-routier + contrats API

#### Bridge Safety Monitor
- **Insight**: ICG condition index for all Montreal bridges/structures
- **Flags**: Structures below safety thresholds
- **Note**: Data is 2021 snapshot — flag staleness
- **Data**: structure-routiere

#### Urban Canopy Tracker
- **Metrics**: Tree count by borough, species diversity
- **Trend**: Is the city gaining or losing trees? (if historical data permits)
- **Data**: arbres

#### Sewer Overflow Tracker
- **Metrics**: Overflow events, duration, locations
- **Environmental impact**: Correlated with rainfall data
- **Data**: debordement + ouvrage-surverse

#### Power Outage Map (External)
- **Real-time**: Live Hydro-Québec outage map for island of Montreal
- **Historical**: Track and archive outages for trend analysis
- **Data**: Hydro-Québec pannes API

#### Political Accountability Dashboard
- **Officials directory**: Who represents each borough
- **Compensation**: Public salary data for every elected official
- **Council activity**: Meeting calendar, video links
- **Correlation**: Borough infrastructure investment vs elected official tenure
- **Data**: listes-des-elus + remuneration-elus + calendrier-seances + resultats-sommaires + contrats API

---

## 5. TECHNICAL ARCHITECTURE

### Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14+ (App Router) | SSR for SEO, API routes for pipeline triggers, RSC |
| Language | TypeScript (strict mode) | Type safety across data models |
| Database | PostgreSQL via Supabase | PostGIS for geospatial, JSONB for raw API responses, existing account |
| ORM | Drizzle ORM | Type-safe, lightweight, great PostGIS support |
| Styling | Tailwind CSS + shadcn/ui | Consistent UI, accessible components, mobile-first |
| Charts | Recharts | Lightweight, React-native, responsive |
| Maps | Mapbox GL JS (fallback: Leaflet) | Vector tiles, clustering, choropleth |
| AI | Anthropic Claude API (Sonnet) | Summarization, trend analysis, bilingual |
| Scheduling | Vercel Cron (or pg_cron) | Pipeline triggers |
| Hosting | Vercel (frontend) + Supabase (DB) | Francis has Supabase account |
| Auth (Phase 2) | Supabase Auth | Already in ecosystem |

### Database schema

See `02-ARCHITECTURE.md` for the full SQL schema. Key tables:

- `pipeline_runs` — tracks every pipeline execution
- `travaux` — normalized construction/road work records
- `crimes` — criminal acts
- `permits` — building permits
- `requests_311` — citizen service requests
- `road_obstructions` — real-time road obstructions (ephemeral)
- `boroughs` — borough reference data with PostGIS polygons
- `elected_officials` — current and historical officials
- `digests` — AI-generated summaries

**Additional tables needed for expanded scope:**

```sql
-- Air quality readings
CREATE TABLE air_quality (
  id SERIAL PRIMARY KEY,
  station_id INTEGER NOT NULL,
  pollutant VARCHAR(10) NOT NULL,
  value NUMERIC(8, 2),
  reading_date DATE NOT NULL,
  reading_hour INTEGER,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  sector_name VARCHAR(100),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Cycling counter readings
CREATE TABLE cycling_counts (
  id SERIAL PRIMARY KEY,
  counter_id VARCHAR(100) NOT NULL,
  period TIMESTAMPTZ NOT NULL,
  aggregation VARCHAR(10) NOT NULL, -- '15min','hour','day','month','year'
  volume INTEGER NOT NULL,
  speed NUMERIC(5,2),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  borough VARCHAR(100),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vehicle towings
CREATE TABLE towings (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100),
  towing_date TIMESTAMPTZ,
  borough_name VARCHAR(100),
  street_name VARCHAR(200),
  reason VARCHAR(200),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Water main breaks
CREATE TABLE water_breaks (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100),
  break_date DATE,
  borough_name VARCHAR(100),
  street_name VARCHAR(200),
  break_type VARCHAR(100),
  pipe_material VARCHAR(100),
  pipe_diameter NUMERIC,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pothole repairs
CREATE TABLE pothole_repairs (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100),
  repair_date DATE,
  borough_name VARCHAR(100),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fire department interventions
CREATE TABLE fire_interventions (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100),
  incident_type VARCHAR(200),
  incident_date TIMESTAMPTZ,
  station_number INTEGER,
  borough_name VARCHAR(100),
  num_units INTEGER,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bedbug reports
CREATE TABLE bedbug_reports (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100),
  report_date DATE,
  borough_name VARCHAR(100),
  num_dwellings INTEGER,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contracts (from Ville de Montreal API)
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100) UNIQUE,
  contract_type VARCHAR(100),
  title TEXT,
  supplier_name VARCHAR(300),
  amount NUMERIC(15, 2),
  award_date DATE,
  borough_name VARCHAR(100),
  sector VARCHAR(200),
  buyer_name VARCHAR(200),
  raw_data JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generic computed metrics (for dashboard cards)
CREATE TABLE computed_metrics (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,  -- 'active_travaux_count', 'crime_7day_avg', etc.
  borough_code VARCHAR(10),           -- NULL = city-wide
  period_type VARCHAR(20) NOT NULL,   -- 'current', 'daily', 'weekly', 'monthly', 'yearly'
  period_date DATE NOT NULL,
  value NUMERIC(15, 2) NOT NULL,
  previous_value NUMERIC(15, 2),      -- for delta calculation
  metadata JSONB,                     -- additional context
  computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(metric_name, borough_code, period_type, period_date)
);
```

### Pipeline architecture

Every pipeline follows this interface:

```typescript
interface Pipeline {
  name: string;
  schedule: string; // cron expression
  fetch(): Promise<RawRecord[]>;
  normalize(raw: RawRecord[]): NormalizedRecord[];
  deduplicate(records: NormalizedRecord[]): NormalizedRecord[];
  store(records: NormalizedRecord[]): Promise<StoreResult>;
  run(): Promise<PipelineResult>;
}
```

**CRITICAL RULES:**
- NEVER download full CSV files for large datasets (permits=172MB, crimes=27MB). Always use DataStore SQL API with date filters.
- Every API call must have retry logic (3 attempts, exponential backoff).
- Every pipeline run must be logged to `pipeline_runs` table.
- Store raw API response in JSONB columns for debugging/reprocessing.
- All dates stored as UTC, displayed in America/Montreal timezone.
- French field names → English column names (maintain a mapping).

### Generic Pipeline Engine

Since the goal is to ingest ALL 300+ datasets, we need both **specialized pipelines** (hand-crafted for high-value datasets with custom normalization) and a **generic pipeline engine** (auto-ingest any CKAN DataStore dataset with minimal config).

```typescript
// Specialized pipeline: hand-crafted normalization, custom schema
class ActesCriminelsPipeline implements Pipeline { ... }

// Generic pipeline: auto-ingest any DataStore dataset into a generic table
class GenericDataStorePipeline implements Pipeline {
  constructor(
    private datasetSlug: string,
    private resourceId: string,
    private dateField?: string,        // field name for incremental fetch
    private geoFields?: { lat: string; lng: string }, // for PostGIS
  ) {}
  // Fetches via DataStore SQL, stores in a generic `dataset_records` table
  // with JSONB data column + extracted date + extracted geo point
}
```

```sql
-- Generic storage for datasets without specialized pipelines
CREATE TABLE dataset_records (
  id BIGSERIAL PRIMARY KEY,
  dataset_slug VARCHAR(200) NOT NULL,
  resource_id VARCHAR(100) NOT NULL,
  external_id VARCHAR(500),             -- best-guess unique ID from data
  record_date DATE,                     -- extracted from date field if available
  borough_name VARCHAR(100),            -- extracted if available
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326),
  data JSONB NOT NULL,                  -- full record
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(dataset_slug, external_id)
);
CREATE INDEX idx_dataset_records_slug ON dataset_records(dataset_slug);
CREATE INDEX idx_dataset_records_date ON dataset_records(record_date);
CREATE INDEX idx_dataset_records_geom ON dataset_records USING GIST(geom);
```

This means:
- **Tier 1-2 datasets** (crime, travaux, permits, 311, etc.) get specialized pipelines with typed tables
- **Tier 3-5 datasets** (everything else) get auto-ingested via the generic engine into `dataset_records`
- The AI chat (Phase 2) can query BOTH specialized tables AND the generic table
- Over time, we can "promote" generic datasets to specialized ones if they prove valuable

### Pipeline schedule

| Pipeline | Cron | Method | Notes |
|----------|------|--------|-------|
| actes_criminels | `0 6 * * *` (daily 6AM) | DataStore SQL date filter | Resource ID: `c6f482bf-bf0f-4960-8b2f-9982c211addd` |
| info_travaux | `0 */6 * * *` (every 6h) | Full CSV download (small file ~400KB) | Two files: obstructions + impacts |
| entraves_circulation | `0 * * * *` (hourly) | Full JSON/XML feed (CIFS) | Full replace strategy |
| requetes_311 | `0 0 * * 0` (weekly Sun) | DataStore SQL date filter | Track status changes |
| permis_construction | `0 0 * * 0` (weekly Sun) | DataStore SQL date filter | NEVER download 172MB CSV |
| remorquages | `0 7 * * *` (daily 7AM) | DataStore SQL date filter | |
| air_quality | `50 * * * *` (hourly at :50) | DataStore/CSV | Data available ~50min after hour |
| cycling_counts | `0 8 * * *` (daily 8AM) | DataStore SQL | |
| fire_interventions | `0 0 1 * *` (monthly) | DataStore SQL | |
| water_breaks | `0 0 * * 1` (weekly Mon) | DataStore SQL | |
| pothole_repairs | `0 0 * * 1` (weekly Mon) | DataStore SQL | Seasonal (spring focus) |
| bedbug_reports | `0 0 1 * *` (monthly) | DataStore SQL | |
| contracts | `0 0 * * 1` (weekly Mon) | Contrats REST API | |
| elected_officials | `0 0 1 * *` (monthly) | Full CSV download | |
| boroughs | On deploy only | Full GeoJSON download | |
| metrics_computation | `0 9 * * *` (daily 9AM) | Internal: compute from stored data | After all daily pipelines |
| ai_digest | `0 10 * * *` (daily 10AM) | Internal: Claude API | After metrics computation |

### Metrics computation layer

After raw data is ingested, a `MetricsComputer` class runs queries to compute dashboard-ready numbers:

```typescript
interface MetricDefinition {
  name: string;               // 'active_travaux_count'
  query: string;              // SQL to compute current value
  previousQuery: string;      // SQL to compute comparison value
  boroughAware: boolean;      // compute per-borough too?
  periods: ('daily' | 'weekly' | 'monthly' | 'yearly')[];
}
```

**Key metrics to compute:**

| Metric name | Description | Source table |
|------------|-------------|-------------|
| `active_travaux_count` | Currently active construction sites | travaux |
| `new_travaux_today` | New sites opened today | travaux |
| `crime_count_7d` | Crimes in last 7 days | crimes |
| `crime_delta_vs_prev_7d` | % change vs previous 7 days | crimes |
| `crime_vs_30d_avg` | Current week vs 30-day average | crimes |
| `permits_count_week` | Permits issued this week | permits |
| `permits_total_value_week` | Total estimated value this week | permits |
| `requests_311_open` | Currently open 311 requests | requests_311 |
| `requests_311_avg_resolution_days` | Avg days to close, by borough | requests_311 |
| `towing_count_today` | Towings today | towings |
| `air_quality_current` | Latest IQA reading by sector | air_quality |
| `cycling_volume_today` | Today's bike count (all counters) | cycling_counts |
| `water_breaks_ytd` | Water breaks year-to-date | water_breaks |
| `potholes_repaired_ytd` | Potholes repaired YTD | pothole_repairs |
| `contracts_value_ytd` | Total contract value YTD | contracts |

### AI Digest Engine

The digest engine runs after metrics computation and generates human-readable summaries.

**Prompt template structure:**
1. System prompt establishes the role (municipal analyst writing for citizens)
2. Data context includes: all computed metrics for the period, notable deltas, top boroughs
3. Output format: structured JSON with `title`, `summary` (3-5 paragraphs), `highlights` (3-5 notable facts)
4. Generate in both FR and EN

See `02-ARCHITECTURE.md` for the full prompt template.

---

## 6. FILE STRUCTURE

```
mtl-pulse/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (mobile-first)
│   │   ├── page.tsx                  # Homepage (trending topic cards)
│   │   ├── travaux/page.tsx          # Construction dashboard
│   │   ├── securite/page.tsx         # Crime dashboard
│   │   ├── permis/page.tsx           # Permits dashboard
│   │   ├── 311/page.tsx              # 311 dashboard
│   │   ├── entraves/page.tsx         # Road obstructions
│   │   ├── deneigement/page.tsx      # Snow removal
│   │   ├── velo/page.tsx             # Cycling
│   │   ├── air/page.tsx              # Air quality
│   │   ├── eau/page.tsx              # Water infrastructure
│   │   ├── contrats/page.tsx         # Contracts
│   │   ├── politique/page.tsx        # Political accountability
│   │   ├── nids-de-poule/page.tsx    # Potholes
│   │   ├── borough/[code]/page.tsx   # Borough view
│   │   ├── digest/
│   │   │   ├── daily/[date]/page.tsx
│   │   │   └── weekly/[week]/page.tsx
│   │   ├── map/page.tsx              # Full-screen map
│   │   ├── about/page.tsx            # About & methodology
│   │   └── api/                      # API routes
│   │       ├── pipeline/[name]/route.ts   # Trigger pipeline
│   │       ├── metrics/route.ts           # Computed metrics API
│   │       └── digest/route.ts            # Digest API
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── dashboard/
│   │   │   ├── TopicCard.tsx         # Homepage topic card
│   │   │   ├── MetricCard.tsx        # Key stat with delta
│   │   │   ├── TrendSparkline.tsx    # Mini inline chart
│   │   │   ├── TrendChart.tsx        # Full time series
│   │   │   ├── BoroughComparison.tsx # Bar chart comparing boroughs
│   │   │   ├── DataTable.tsx         # Searchable paginated table
│   │   │   └── DataFreshness.tsx     # "Last updated X ago" indicator
│   │   ├── map/
│   │   │   ├── CityMap.tsx           # Main Mapbox/Leaflet component
│   │   │   ├── LayerToggle.tsx       # Layer visibility controls
│   │   │   └── MarkerCluster.tsx     # Clustered markers
│   │   ├── digest/
│   │   │   ├── DigestCard.tsx        # AI summary renderer
│   │   │   └── HighlightBadge.tsx    # Notable fact badge
│   │   ├── layout/
│   │   │   ├── Header.tsx            # App header with nav
│   │   │   ├── BoroughSelector.tsx   # Borough filter dropdown
│   │   │   ├── LanguageToggle.tsx    # FR/EN switch
│   │   │   └── PeriodSelector.tsx    # Daily/weekly/monthly toggle
│   │   └── shared/
│   │       ├── LoadingSkeleton.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts            # Drizzle ORM schema (ALL tables)
│   │   │   ├── connection.ts         # Database connection
│   │   │   ├── queries/              # Data access layer
│   │   │   │   ├── travaux.ts
│   │   │   │   ├── crimes.ts
│   │   │   │   ├── permits.ts
│   │   │   │   ├── requests311.ts
│   │   │   │   ├── airQuality.ts
│   │   │   │   ├── cycling.ts
│   │   │   │   ├── towings.ts
│   │   │   │   ├── waterBreaks.ts
│   │   │   │   ├── potholes.ts
│   │   │   │   ├── fireInterventions.ts
│   │   │   │   ├── contracts.ts
│   │   │   │   ├── metrics.ts
│   │   │   │   └── digests.ts
│   │   │   └── migrations/
│   │   ├── pipeline/
│   │   │   ├── runner.ts             # PipelineRunner class
│   │   │   ├── types.ts              # Pipeline interfaces
│   │   │   ├── pipelines/
│   │   │   │   ├── actes-criminels.ts
│   │   │   │   ├── info-travaux.ts
│   │   │   │   ├── entraves-circulation.ts
│   │   │   │   ├── requetes-311.ts
│   │   │   │   ├── permis-construction.ts
│   │   │   │   ├── remorquages.ts
│   │   │   │   ├── air-quality.ts
│   │   │   │   ├── cycling-counts.ts
│   │   │   │   ├── fire-interventions.ts
│   │   │   │   ├── water-breaks.ts
│   │   │   │   ├── pothole-repairs.ts
│   │   │   │   ├── bedbug-reports.ts
│   │   │   │   ├── contracts.ts
│   │   │   │   ├── elected-officials.ts
│   │   │   │   └── boroughs.ts
│   │   │   └── metrics-computer.ts   # Compute dashboard metrics
│   │   ├── ai/
│   │   │   ├── claude-client.ts      # Anthropic SDK wrapper
│   │   │   ├── digest-generator.ts   # Digest generation logic
│   │   │   ├── prompts/
│   │   │   │   ├── daily-digest.ts
│   │   │   │   ├── weekly-digest.ts
│   │   │   │   └── borough-digest.ts
│   │   │   └── types.ts
│   │   ├── api-clients/
│   │   │   ├── ckan-client.ts        # CKAN API (data.montreal.ca)
│   │   │   ├── contrats-client.ts    # Vue sur les contrats API
│   │   │   ├── hydro-client.ts       # Hydro-Québec outages
│   │   │   └── weather-client.ts     # Environment Canada
│   │   └── utils/
│   │       ├── dates.ts              # UTC/Montreal timezone handling
│   │       ├── geo.ts                # Coordinate conversion (NAD83→WGS84)
│   │       ├── formatting.ts         # Number/currency formatting (FR/EN)
│   │       └── field-mapping.ts      # French→English field name mapping
│   └── types/
│       ├── datasets.ts               # Raw API response types
│       ├── normalized.ts             # Normalized record types
│       ├── metrics.ts                # Computed metric types
│       └── digest.ts                 # Digest types
├── scripts/
│   ├── run-pipeline.ts               # CLI: npm run pipeline -- --name info_travaux
│   ├── seed-boroughs.ts              # Load borough boundaries
│   ├── seed-officials.ts             # Load elected officials
│   ├── backfill.ts                   # Historical data backfill
│   └── compute-metrics.ts            # Manual metrics computation
├── migrations/                        # SQL migration files
├── public/
│   └── icons/                         # Topic dashboard icons
├── docs/
│   ├── data-catalog.md
│   ├── architecture.md
│   └── methodology.md
├── .env.local                         # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── drizzle.config.ts
└── next.config.ts
```

---

## 7. CODING STANDARDS FOR CURSOR

### TypeScript
- **Strict mode**: No `any` types. Use Zod for runtime validation of API responses.
- **No raw SQL in route handlers**: All queries through the data access layer (`lib/db/queries/`).
- **Explicit return types** on all functions.

### Data pipeline rules
- Every API fetch: 3 retries, exponential backoff (1s, 2s, 4s).
- Every pipeline run: log to `pipeline_runs` with timestamps, counts, errors.
- Store raw API response in JSONB column on every record.
- French field names from APIs → English column names in DB (mapping file at `lib/utils/field-mapping.ts`).
- Dates: store UTC, display in America/Montreal timezone using date-fns-tz.
- Coordinates: store WGS84 (EPSG:4326). Convert from NAD83 MTM Zone 8 (EPSG:32188) on ingest when needed.
- Handle UTF-8 French accents properly throughout.
- Normalize empty strings to NULL on ingest.

### Frontend rules
- **Mobile-first**: All layouts start from mobile, scale up.
- **Data visible immediately**: Use React Server Components for initial data load. No loading spinner for above-the-fold content.
- **Skeleton loading**: Use skeleton screens for below-the-fold content.
- **Charts**: Recharts with responsive container. Touch-friendly on mobile.
- **Data freshness**: Every data section must show "Last updated: X" with a status indicator (green/yellow/red).
- **Bilingual**: Use next-intl or similar. French as default locale.

### Error handling
- Failed pipeline → log error, send notification, show "data unavailable" in UI with last-good timestamp.
- API timeout → retry with backoff, then gracefully degrade.
- Empty dataset → show "No data for this period" rather than empty chart.

---

## 8. IMPLEMENTATION PHASES

### Phase 0: Dataset Cataloging (Day 1)
**Cursor should do this FIRST before writing any pipeline code.**
1. Write a script that crawls the CKAN API: `package_search?q=organization:ville-de-montreal&rows=100&start=0` (paginate through all results)
2. For each dataset, fetch `package_show?id={slug}` to get resource metadata
3. Classify each dataset:
   - Has DataStore active resources? (queryable via SQL API)
   - Update frequency (from metadata + last_modified date)
   - Has geospatial data? (lat/long fields or GeoJSON format)
   - Has temporal data? (date fields that enable trending)
   - Estimated row count / file size
   - Data category (infrastructure, safety, environment, politics, transport, etc.)
4. Output a `datasets-catalog.json` file with all metadata
5. Output a `datasets-priority.md` file ranking datasets by: (a) update frequency, (b) temporal richness, (c) geospatial richness, (d) public interest
6. For each dataset with DataStore, test the SQL API with a small query to confirm it works
7. Save this catalog to the database in a `dataset_registry` table for the pipeline engine to reference

```sql
CREATE TABLE dataset_registry (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  organization VARCHAR(200),
  update_frequency VARCHAR(50),
  last_modified TIMESTAMPTZ,
  resource_count INTEGER,
  primary_resource_id VARCHAR(100),     -- main DataStore resource
  has_datastore BOOLEAN DEFAULT FALSE,
  has_geospatial BOOLEAN DEFAULT FALSE,
  has_temporal BOOLEAN DEFAULT FALSE,
  estimated_rows INTEGER,
  file_size_bytes BIGINT,
  category VARCHAR(100),                -- infrastructure, safety, environment, etc.
  priority_tier INTEGER,                -- 1=daily, 2=weekly, 3=monthly, 4=on-deploy, 5=archive
  pipeline_status VARCHAR(20) DEFAULT 'pending', -- pending, active, disabled, error
  last_pipeline_run TIMESTAMPTZ,
  notes TEXT,
  raw_metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

This gives the pipeline engine a registry to iterate over, and gives the UI a way to show "X datasets ingested, Y updated today" on the about page.

### Phase 1: Foundation (Week 1-2)
1. Project scaffolding (Next.js 14+, TypeScript, Tailwind, Drizzle)
2. Database setup (Supabase PostgreSQL + PostGIS)
3. All table migrations (core + expanded + generic + dataset_registry)
4. CKAN API client with retry logic
5. Pipeline runner framework (specialized + generic engine)
6. Borough boundaries + elected officials seed
7. **First 5 specialized pipelines**: actes-criminels, info-travaux, entraves-circulation, requetes-311, permis-construction
8. **Historical backfill**: 5 years minimum for all datasets. Use DataStore SQL with pagination (LIMIT 32000 + OFFSET). For datasets with longer history (water breaks, permits), ingest all available.
9. Basic metrics computation

### Phase 2: Expanded pipelines + Generic Engine (Week 2-3)
9. **Remaining specialized pipelines**: remorquages, air-quality, cycling-counts, water-breaks, pothole-repairs, fire-interventions, bedbug-reports, contracts
10. **Generic pipeline engine**: Deploy against ALL remaining DataStore datasets from the catalog. Auto-ingest into `dataset_records`.
11. Historical backfill for all datasets (5 years, or full history where available)
12. Full metrics computation layer
13. AI digest engine (daily + weekly)
14. Political accountability data: elected officials + compensation + contracts by borough

### Phase 3: Frontend MVP (Week 3-5)
15. Homepage with topic cards + sparklines
16. Topic dashboards (one by one, starting with travaux + securite)
17. Borough selector + filtering
18. Map view with multi-layer support
19. Trend charts (5-year history enabled)
20. Data tables
21. **Political accountability dashboard**: officials directory, borough scorecards, contract spending
22. FR/EN language toggle
23. Mobile optimization pass

### Phase 4: Polish & Launch (Week 5-6)
24. AI digest display on homepage
25. Data freshness indicators everywhere
26. About/methodology page (including "X datasets ingested" counter from registry)
27. Pipeline monitoring dashboard (internal)
28. Error alerting
29. Performance optimization
30. Deploy to production

### Phase 5: Paid AI Chat (Future — after traction)
31. Supabase Auth integration
32. Chat UI component
33. Natural language → SQL query engine (queries BOTH specialized tables AND generic `dataset_records`)
34. Dynamic chart generation from query results
35. Multi-turn conversation support
36. Subscription/payment integration (annual or donation-based)

---

## 9. DATA QUALITY GOTCHAS

**MUST READ before writing any pipeline code:**

1. **Encoding**: All data is UTF-8 with French accents. Test with: é, è, ê, ë, à, â, ç, ù, û, ü, ô, î, ï.
2. **Coordinate systems**: Most data is WGS84 (EPSG:4326), but some older datasets use NAD83 MTM Zone 8 (EPSG:32188). Check `LOC_X`/`LOC_Y` vs `LATITUDE`/`LONGITUDE` columns. Always verify and convert on ingest.
3. **Date formats**: Mix of ISO 8601, DD/MM/YYYY, and YYYY-MM-DD. Normalize to ISO 8601 on ingest.
4. **Borough codes**: Standardize via `arros-liste` dataset. Use the 3-letter code as the foreign key.
5. **Null handling**: Many fields use empty strings instead of null. Normalize on ingest.
6. **Large files**: Permis (172MB CSV), Actes criminels (91MB GeoJSON) — ALWAYS use DataStore SQL API with date filters. NEVER download full files in production.
7. **Data lag**: Most "daily" datasets update with 1-2 day delay. Always show actual last-update timestamp.
8. **DataStore SQL row limit**: Max ~32,000 rows per query. Paginate with LIMIT/OFFSET for large result sets.
9. **311 cross-borough comparison**: Unreliable due to inconsistent categorization processes. Caveat in UI.
10. **Crime locations**: Rounded to nearest intersection for privacy. Display as area, not precise point.
11. **Collision data gap**: Stops at 2021 on Montreal portal. Post-2021 on Données Québec via SAAQ.
12. **Bridge data staleness**: ICG condition from 2021 snapshot. Flag prominently.
13. **Lachine + Saint-Léonard**: Building permit data currently unavailable (system migration). Handle gracefully.
14. **IQA timezone**: Air quality system uses EST year-round (no daylight saving). Adjust accordingly.
15. **PDQ to borough mapping**: Police station numbers don't directly map to boroughs. Build a reference mapping. PDQ 50 = metro system.

---

## 10. ENVIRONMENT VARIABLES

```env
# Database (Supabase)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...          # For migrations

# Montreal Open Data
CKAN_BASE_URL=https://data.montreal.ca/api/3/action
DENEIGEMENT_API_TOKEN=               # Request from donneesouvertes@montreal.ca

# Contracts API
CONTRATS_API_URL=https://ville.montreal.qc.ca/vuesurlescontrats/api

# AI
ANTHROPIC_API_KEY=

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=            # Or use Leaflet (no token)

# App
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_DEFAULT_LOCALE=fr
CRON_SECRET=                         # Secure cron endpoint triggers
TZ=America/Montreal
```

---

## 11. PROMPT SET FOR AI DIGEST ENGINE

### System prompt (reusable)

```
Tu es un analyste municipal expert qui rédige des résumés de données pour les citoyens de Montréal. Tu analyses les données ouvertes de la Ville et produis des résumés clairs, factuels et accessibles.

Règles:
- Toujours factuel et neutre — pas d'opinion politique
- Signaler les changements notables avec des comparaisons chiffrées
- Utiliser un ton journalistique accessible (ni trop formel, ni trop familier)
- Mentionner les arrondissements par leur nom complet
- Arrondir les pourcentages à l'entier le plus proche
- Quand un chiffre est inhabituel, le mettre en contexte (vs moyenne, vs même période l'an dernier)
- Ne jamais inventer de données — si une info manque, le dire
- Produire le résumé dans la langue demandée (fr ou en)
```

### Daily digest prompt

```
Voici les données municipales de Montréal pour la journée du {date}:

## Construction et travaux
- Chantiers actifs: {active_travaux} (hier: {prev_active_travaux})
- Nouveaux chantiers: {new_travaux}
- Chantiers terminés: {closed_travaux}
- Arrondissements les plus touchés: {top_boroughs_travaux}
- Entraves routières actives: {active_obstructions}

## Sécurité publique
- Actes criminels rapportés (dernières 24h): {crime_count}
- Répartition: {crime_breakdown}
- Variation vs moy. 30 jours: {crime_vs_avg}%
- Arrondissements notables: {top_boroughs_crimes}

## Permis de construction (cette semaine)
- Nouveaux permis: {new_permits}
- Valeur estimée: {permits_value}$
- Types: {permits_by_type}

## Demandes 311
- Nouvelles demandes: {new_311}
- Demandes ouvertes total: {open_311}
- Délai moyen de résolution: {avg_resolution_days} jours
- Types les plus fréquents: {top_311_types}

## Qualité de l'air
- IQA actuel: {current_iqa} ({iqa_label})
- Polluant dominant: {dominant_pollutant}

## Données saisonnières
{seasonal_section}

Rédige un résumé de 3-5 paragraphes. Commence par le fait le plus marquant. Fournis aussi un JSON "highlights" avec les 3-5 faits les plus notables, format:
[{"emoji": "🚧", "text_fr": "...", "text_en": "...", "metric": "...", "delta": "..."}]
```

---

## FINAL NOTES FOR CURSOR

- **Start with pipelines, not UI.** The data foundation must be solid before any frontend work.
- **Test each pipeline independently** against the live CKAN API before moving to the next.
- **Historical backfill is critical.** The value of this platform is trends over time. Ingest as much history as each dataset allows.
- **Don't block on missing data.** If a dataset is broken or stale, skip it and move to the next. Show "data unavailable" in the UI.
- **The homepage topic cards are the product.** Each card = one dataset family = one insight. The cards must load fast, show real numbers, and link to deep dashboards.
- **Mobile-first means mobile-first.** Every chart, table, and map must work on a 375px wide screen.
- **The `computed_metrics` table is the bridge** between raw pipeline data and the dashboard UI. The frontend should never query raw tables directly for dashboard cards — always go through pre-computed metrics.
