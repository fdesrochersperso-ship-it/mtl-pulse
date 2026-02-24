# MTL Pulse — Merged Feature Roadmap

The single source of truth for what to build, in what order, and why. Merges the **Builder Plan** (86 ideas from 10 active datasets) with the **Catalog Plan** (200+ ideas from 396 datasets) into a phased, actionable roadmap.

**How to use this document:**
- Phases 1–3 = build NOW (weeks 1–8). Every idea here maps to data already being ingested.
- Phase 4 = build NEXT (weeks 9–16). Requires new pipelines but high-value payoff.
- Phase 5 = feature backlog. Pull from here when capacity opens or user demand signals priority.
- Each idea has an **Impact** rating (🔴 High / 🟡 Medium / 🟢 Nice-to-have) and **Effort** estimate (S/M/L).

---

## Phase 1 — Daily Civic Pulse (Weeks 1–3)

*Goal: Launch with a working homepage that gives citizens a reason to check MTL Pulse every morning. One page, all the key numbers, AI summary on top.*

### 1.1 Homepage: Today's Montreal

| # | Feature | Datasets | Impact | Effort | Notes |
|---|---------|----------|--------|--------|-------|
| 1 | **Daily pulse page** — single-screen snapshot of all key numbers | All Tier 1 | 🔴 | M | The product. One page = city heartbeat. |
| 2 | **AI daily digest** — 3–5 paragraph summary of yesterday's data | All Tier 1 + Claude API | 🔴 | M | FR primary, EN toggle. Collapsible on mobile. |
| 3 | **Topic cards grid** — one card per category with primary metric + delta + sparkline | computed_metrics | 🔴 | S | 🚧 Travaux, 🔒 Sécurité, 🏗️ Permis, 📞 311, 🚗 Entraves, 🚒 Pompiers, 🕳️ Nids-de-poule, 🐛 Punaises |
| 4 | **Data freshness indicators** — green/yellow/red per source | pipeline_runs | 🔴 | S | Trust = transparency. Show when each source was last updated. |
| 5 | **Week-over-week deltas** — ↑↓ badges with % change on every card | computed_metrics | 🔴 | S | Instant context: is this normal or unusual? |
| 6 | **Borough selector** — dropdown filters all cards to one arrondissement | boroughs | 🟡 | S | URL param persistence: `/` vs `/?borough=VMA` |

### 1.2 Core Metrics Engine

| # | Metric | Computation | Source Table |
|---|--------|-------------|-------------|
| 7 | Active construction sites | COUNT WHERE end_date >= today OR status = active | travaux |
| 8 | New construction today | COUNT WHERE first_seen_at >= today | travaux |
| 9 | Crime count (7-day) | COUNT WHERE incident_date >= 7d ago | crimes |
| 10 | Crime delta vs previous 7 days | (current_7d - prev_7d) / prev_7d × 100 | crimes |
| 11 | Crime vs 30-day average | current_week / (30d_avg × 7) | crimes |
| 12 | New permits this week | COUNT WHERE issue_date in current week | permits |
| 13 | Permit value this week | SUM(estimated_cost) current week | permits |
| 14 | Open 311 requests | COUNT WHERE status NOT IN (Terminée, Annulée, Refusée) | requests_311 |
| 15 | 311 avg resolution days | AVG(closed_date - created_date) | requests_311 |
| 16 | Active road obstructions | COUNT(*) | road_obstructions |
| 17 | Fire interventions today | COUNT WHERE date >= today | fire_interventions |
| 18 | False alarm rate | fausses_alertes / total × 100 | fire_interventions |
| 19 | Potholes repaired YTD | COUNT WHERE repair_date >= Jan 1 | pothole_repairs |
| 20 | Towings today | COUNT WHERE date >= today | towings |

All metrics computed city-wide AND per-borough. Stored in `computed_metrics` table with previous_value for delta calculation.

---

## Phase 2 — Topic Dashboards (Weeks 3–6)

*Goal: Deep-dive pages for each category. Every dashboard follows the same template: stats row → trend chart → borough breakdown → map → data table → AI insight card.*

### 2.1 Construction & Road Work (`/travaux`) — BUILD FIRST AS TEMPLATE

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 21 | **Key stats row** — active sites, new today, closing this week, most affected borough | 🔴 | S | |
| 22 | **Trend chart** — active count over time, daily/weekly/monthly granularity | 🔴 | M | Recharts. Previous year comparison line. |
| 23 | **Borough bar chart** — horizontal bars ranking all 19 boroughs | 🔴 | S | Highlight selected borough if filtered. |
| 24 | **Active obstructions map** — clustered markers, click for details | 🔴 | M | Leaflet. Popup: permit ID, org, dates, category. |
| 25 | **Data table** — searchable, sortable, filterable, paginated, CSV export | 🟡 | M | Server-side pagination. Filter by borough/category/status. |
| 26 | **Obstruction duration analysis** — avg/median duration, long-runners (>30d) | 🟡 | S | Flag chronic sites. |
| 27 | **Streets most affected** — rank streets by obstruction count/duration | 🟡 | S | Journalist gold. |
| 28 | **AI insight card** — construction excerpt from daily digest | 🟡 | S | |

### 2.2 Crime & Safety (`/securite`)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 29 | **Crime by category** — Vol qualifié, Méfait, Vol véhicule, Introduction, Infraction mort | 🔴 | S | Stacked bar or donut chart. |
| 30 | **Crime by shift** — jour/soir/nuit breakdown | 🔴 | S | Helps citizens understand safer/riskier times. |
| 31 | **Crime trend chart** — 7-day rolling average, seasonal patterns | 🔴 | M | Summer peak visible. Year-over-year comparison. |
| 32 | **Crime by PDQ** — police district heatmap | 🟡 | M | Note: PDQ 50 = metro system, not a borough. |
| 33 | **Crime map** — intersection-level points, filter by category/date | 🔴 | M | Disclosure: locations obfuscated to nearest intersection. |
| 34 | **Weekly crime digest** — top categories up/down vs last week | 🟡 | S | |
| 35 | **Borough comparison** — per capita crime rates using borough population | 🔴 | S | From boroughs.ts population constants. |

### 2.3 Building Permits (`/permis`)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 36 | **Permits by type** — CO (construction), TR (transformation), DE (demolition), CA (certificate) | 🔴 | S | |
| 37 | **Construction activity index** — permit count + estimated cost trend over time | 🔴 | M | 35 years of data available. Show housing boom/bust cycles. |
| 38 | **Demolition vs construction ratio** — identify neighborhoods in transformation | 🟡 | S | Gentrification signal. |
| 39 | **Permit value by borough** — estimated cost aggregated by arrondissement | 🔴 | S | Caveat: costs are "sans valeur légale", methodology varies by borough. |
| 40 | **Permit map** — locations, filter by type/borough/year | 🟡 | M | 73% centroid, 24% street segment, 3% missing. |
| 41 | **Lachine/Saint-Léonard gap flag** — visible warning that these boroughs have missing data | 🟡 | S | System migration ongoing. |

### 2.4 Citizen Requests (`/311`)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 42 | **Requests by nature** — Information, Requête, Plainte, Commentaire | 🔴 | S | |
| 43 | **Top ACTI_NOM categories** — most requested service types | 🔴 | S | Travaux publics, déneigement, etc. |
| 44 | **Request status tracking** — Urgente, Terminée, Transmise flow | 🟡 | M | |
| 45 | **Response time by borough** — created → closed duration | 🔴 | M | ⚠️ Cross-borough comparison unreliable (different processes). Display caveat. |
| 46 | **311 backlog** — open requests trend, is the city keeping up? | 🔴 | S | Journalists care deeply about this. |
| 47 | **311 map** — request locations, filter by nature/status/date | 🟡 | M | Information requests are NOT georeferenced. |

### 2.5 Fire Department (`/pompiers`)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 48 | **Interventions by DESCRIPTION_GROUPE** — 6 groups: Incendies bâtiments, Autres incendies, Alarmes-incendie, Sans incendie, Premiers répondants, Fausses alertes | 🔴 | S | |
| 49 | **False alarm rate** — % fausses alertes by borough, trend over time | 🟡 | S | Resource waste indicator. |
| 50 | **Units deployed distribution** — NOMBRE_UNITES per intervention | 🟡 | S | Heavy vs light response pattern. |
| 51 | **Fire intervention map** — points by type/date | 🟡 | M | Location obfuscated to intersection. |

### 2.6 Other Topic Dashboards (same template, lighter)

| # | Dashboard | Key metrics | Impact | Effort |
|---|-----------|-------------|--------|--------|
| 52 | **Potholes** (`/nids-de-poule`) | Repairs by borough/date, seasonal pattern (spring peak), hotspot map | 🟡 | S | 
| 53 | **Towings** (`/remorquages`) | By borough/motive (déneigement, constat, événement), seasonal Nov–Mar | 🟡 | S |
| 54 | **Bedbugs** (`/punaises`) | Reports by borough since 2011, trend, map | 🟡 | S |
| 55 | **Road obstructions** (`/entraves`) | Real-time snapshot, type/subtype, street/direction | 🟡 | S |

---

## Phase 3 — Maps, Borough Views & Cross-Source (Weeks 6–8)

*Goal: Geographic layer that ties everything together. Borough profiles. Cross-dataset insights that create "aha" moments.*

### 3.1 Full-Screen Map (`/map`)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 56 | **Multi-layer map** — toggles for each data category | 🔴 | L | Leaflet. Layer: crime, travaux, 311, permits, fire, potholes, obstructions. |
| 57 | **Cluster markers** — aggregate at zoom levels | 🔴 | M | Leaflet.markercluster. |
| 58 | **Borough boundary overlay** — 19 arrondissements as polygons | 🔴 | S | From boroughs PostGIS data. Choropleth by metric. |
| 59 | **Click-to-detail popups** — contextual info per marker | 🟡 | S | |
| 60 | **"What's near me?" radius search** — show all data within X meters of a point | 🟡 | M | PostGIS ST_DWithin. Citizen-friendly feature. |

### 3.2 Borough Profile (`/borough/[code]`)

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 61 | **Borough scorecard** — all metrics for one borough, compared to city average | 🔴 | M | The single most shareable page. |
| 62 | **Borough AI digest** — AI-generated borough-specific summary | 🔴 | M | "This week in Rosemont-La Petite-Patrie..." |
| 63 | **Borough elected officials** — who represents this borough | 🔴 | S | From elected_officials table. Name, role, party. |
| 64 | **Borough ranking position** — "Ranked #3 safest, #7 for 311 response time" | 🟡 | S | Comparative context. |
| 65 | **Borough trend charts** — mini versions of each topic's trend, scoped to borough | 🟡 | M | |

### 3.3 Cross-Source Analysis

| # | Analysis | Datasets | Impact | Effort | Notes |
|---|----------|----------|--------|--------|-------|
| 66 | **Construction + 311 complaints** — do more construction sites → more noise/dust complaints? | info-travaux + requete-311 | 🔴 | M | Filter 311 by construction-related ACTI_NOM. Spatial join within 500m of active sites. |
| 67 | **Potholes + 311 correlation** — pothole 311 complaints vs actual repairs | pothole_repairs + requete-311 | 🟡 | M | Gap = complaint backlog. |
| 68 | **Crime + fire joint safety index** — combined safety score by borough | crimes + fire_interventions | 🟡 | M | Normalize per capita. Weight by severity. |
| 69 | **Winter operations dashboard** — towings + snow-related 311 + potholes (spring thaw) | towings + requete-311 + pothole_repairs | 🟡 | M | Seasonal composite. Active Nov–Apr. |
| 70 | **Permits in active construction zones** — permits issued in areas with current obstructions | permits + info-travaux | 🟢 | S | Coordination question: is the city planning ahead? |

### 3.4 Temporal Analysis Framework

| # | Feature | Applies to | Impact | Effort |
|---|---------|------------|--------|--------|
| 71 | **7-day rolling average** — smooth out daily noise | Crime, 311, fire, potholes | 🔴 | S |
| 72 | **Day-of-week patterns** — heatmap showing which days are busiest | All daily sources | 🟡 | S |
| 73 | **Holiday effect** — are stat holidays lower for crime/permits? | Crime, permits, 311 | 🟢 | S |
| 74 | **Seasonal decomposition** — separate trend from seasonal signal | Crime (summer peak), potholes (spring), towings (winter) | 🟡 | M |
| 75 | **5-year trend lines** — long-term direction per metric | All sources with 5yr history | 🔴 | S |
| 76 | **Year-over-year same-period comparison** — "vs same week last year" | All sources | 🔴 | S |
| 77 | **Anomaly detection** — flag metrics >2× weekly average | All metrics | 🟡 | M | "Crime up 40% — mostly méfaits in borough X" |

---

## Phase 4 — Political Accountability & New Pipelines (Weeks 9–16)

*Goal: The features that make journalists and activists share the platform. New data pipelines that unlock 10× more content from the portal.*

### 4.1 Political Accountability (`/politique`)

| # | Feature | Datasets | Impact | Effort | Notes |
|---|---------|----------|--------|--------|-------|
| 78 | **Elected officials directory** — all officials by borough/district/party | listes-des-elus | 🔴 | S | |
| 79 | **Party composition** — council breakdown by party | listes-des-elus | 🟡 | S | |
| 80 | **Officials compensation** — salary + allowances + authorized expenses | remuneration-elus, depenses-des-elus | 🔴 | M | Transparency killer feature. |
| 81 | **Contract spending by borough** — which boroughs get the most investment | Contrats API | 🔴 | M | |
| 82 | **Top vendors** — supplier ranking by contract count + amount | Contrats API, liste-des-fournisseurs | 🔴 | M | Supplier concentration flag. |
| 83 | **Borough scorecard: accountability edition** — 311 response time + infrastructure investment + crime trend + permit activity per elected official's territory | Multiple | 🔴 | L | The "is my councillor delivering?" view. |
| 84 | **Council meeting calendar + video index** — next sessions, links to recordings | calendrier-seances, videodiffusion-seances | 🟡 | S | Democracy participation tool. |
| 85 | **Election results by district** — vote share, turnout, candidate performance (2013–2025) | resultats-detailles, resultats-sommaires | 🟡 | M | Historical context. |
| 86 | **Research expense reimbursements** — councillor research/support costs | remboursement-frais-recherches | 🟡 | S | |

### 4.2 Contracts Deep-Dive (`/contrats`)

| # | Feature | Datasets | Impact | Effort |
|---|---------|----------|--------|--------|
| 87 | **Contract explorer** — searchable table by vendor, amount, date, sector, awarding body | Contrats API | 🔴 | M |
| 88 | **Spending trends** — monthly/yearly totals by source (Conseil, CE, Arrondissement) | Contrats API | 🔴 | M |
| 89 | **Sole-source flags** — contracts awarded without competitive process | Contrats API | 🔴 | S |
| 90 | **Contract cycle correlation** — spending spikes aligned with council meeting cycles | Contrats API + calendrier-seances | 🟡 | M |
| 91 | **10-year capital program (PDI)** — investment priorities by sector/borough | programme-decennal-immobilisations | 🟡 | M |
| 92 | **3-year project tracker** — project budgets, status, completion rates | programme-triennal-fiches-projets | 🟡 | M |

### 4.3 New Pipelines — High-Value Additions

These require building new ingestion pipelines but unlock major content:

| # | Pipeline | Dataset | Impact | Effort | Why now |
|---|----------|---------|--------|--------|---------|
| 93 | **Air quality (IQA)** | rsqa-indice-qualite-air | 🔴 | M | Real-time health relevance. "Should I go for a run today?" |
| 94 | **Cycling counters** | cyclistes, velos-comptage | 🔴 | M | Montreal cycling culture is massive. Easy audience. |
| 95 | **Water main breaks** | reparation-reseau-eau-potable | 🟡 | M | Data since 1972. Aging infrastructure narrative. |
| 96 | **Lead service lines** | depistage-entrees-service-plomb | 🔴 | S | Public health. Simple map. High citizen concern. |
| 97 | **Sewer overflows** | debordement, ouvrage-surverse | 🟡 | M | Connect to precipitation for cause analysis. |
| 98 | **Road condition index** | condition-chaussees-reseau-routier | 🔴 | M | PCI/IRI scores. "Which borough has the worst roads?" |
| 99 | **BIXI station status** | GBFS API (external) | 🟡 | M | Real-time bike/dock availability. |
| 100 | **Hydro-Québec outages** | pannes.hydroquebec.com API | 🟡 | M | Real-time. Citizens check during storms. |

### 4.4 New Dashboards from Phase 4 Pipelines

| # | Dashboard | Key features | Impact | Effort |
|---|-----------|-------------|--------|--------|
| 101 | **Air Quality** (`/air`) | Current IQA by sector, "bad air days" per year, pollutant trend, station map | 🔴 | M |
| 102 | **Cycling City** (`/velo`) | Counter volumes by day/season, infrastructure map (REV, pistes), BIXI availability | 🔴 | M |
| 103 | **Water Infrastructure** (`/eau`) | Breaks since 1972, aging pipe heatmap, borough comparison, lead detection progress | 🟡 | M |
| 104 | **Road Condition** (`/routes`) | PCI/IRI by borough, worst roads ranked, condition vs contract spending correlation | 🔴 | M |
| 105 | **Power Outages** (`/pannes`) | Live outage map, historical frequency by area, cause breakdown | 🟡 | M |

---

## Phase 5 — Feature Backlog (Pull When Ready)

*These ideas are organized by theme. Each requires new pipeline work. Pull into active development based on user demand, seasonal relevance, or partnership opportunities.*

### 5.1 Environment & Climate

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 106 | **Heat island map** | ilots-de-chaleur, thermographie-surface | Summer readiness; vulnerable populations |
| 107 | **Priority greening zones** | zones-prioritaires-verdir + canopee | Where should trees be planted? |
| 108 | **Urban canopy tracker** | arbres (300K+ trees), canopee, abattage-arbres-publics | Net tree gain/loss by borough; species diversity |
| 109 | **Greening project impact** | mesure-impact-projets-verdissement | Do greening projects actually lower temperatures? |
| 110 | **Climate vulnerability map** | vulnerabilite-changements-climatiques | Heat, flood, storm risk overlay |
| 111 | **Shore water quality (QUALO)** | rsma-qualite-de-l-eau-en-rive-qualo | Summer bathing safety — "can I swim in the St. Lawrence?" |
| 112 | **Sewer overflow + precipitation** | debordement + pluviometrie | Rainfall → overflow correlation |
| 113 | **Community GHG emissions** | emissions-ges-collectivite-montrealaise | By sector; annual trend |
| 114 | **Coyote sighting tracker** | signalements-de-coyotes | Fun/viral potential; behavior/risk classification |

### 5.2 Housing & Social Policy

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 115 | **Social housing inventory** | logements-sociaux | HLM, coops, OBNL by neighborhood |
| 116 | **Housing subsidies** | subvention-habitation | Since 2012; volume; programs |
| 117 | **Right of preemption map** | droit-preemption | Properties subject to city first refusal |
| 118 | **Gentrification index** | permis (value) + logements-sociaux + droit-preemption | Investment vs displacement risk |
| 119 | **Housing inspection priority** | indicateur-priorite-inspection, inspections-salubrite | Building decay; inspection backlog |
| 120 | **Bedbugs + social housing overlap** | punaises-de-lit + logements-sociaux + inspections | Intersection analysis; inspection effectiveness |
| 121 | **Deterioration notices** | avis-deterioration | Building decay trend |

### 5.3 Transport & Mobility

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 122 | **Collision hotspot map** | collisions-routieres | 2012–2021 on MTL portal; post-2021 via SAAQ |
| 123 | **Traffic count trends** | comptage-vehicules-pietons | Intersection volumes; mode split |
| 124 | **STM metro incidents** | incidents-du-reseau-du-metro | Causes; frequency; delay trends |
| 125 | **STM service delivery** | stm-kilometrage (budget vs actual vs planned) | Are they running the planned service? |
| 126 | **BIXI trip history analysis** | bixi-historique-deplacements | Origin-destination patterns; e-bike share; 2014–present |
| 127 | **REV (express bike network)** | reseau-express-velo | 184 km, 17 axes; impact on cycling volumes |
| 128 | **EV charging station map** | bornes-recharge-publiques | Coverage; growth; gaps |
| 129 | **Taxi stand map** | postes-d-attente-de-taxi | Locations |

### 5.4 Culture & Community

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 130 | **Toponymy explorer** | toponymes, toponym-elles | Origin of 6,000+ street names; women's representation |
| 131 | **Public art map** | art-public, murales | Collection + funded murals since 2007 |
| 132 | **Heritage buildings** | edifices-patrimoniaux, sites-immeubles-proteges-lpc | Protected sites; heritage mapping |
| 133 | **Film/TV shoot permits** | permis-tournage | Volume; locations; "where are they filming today?" |
| 134 | **Library statistics** | bibliotheques-montreal-statistiques | Lending; attendance by branch |
| 135 | **Parks & outdoor facilities** | grands-parcs, installations-recreatives | 1,495 parks, 3,396 facilities |
| 136 | **Outdoor rink conditions** | patinoires | Since 2002; real-time winter conditions |

### 5.5 Economy & Business

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 137 | **Downtown pulse** | etat-centre-ville | Quarterly socioeconomic barometer |
| 138 | **Commercial vacancy** | locaux-commerciaux | Retail portrait; vacancy rates |
| 139 | **SDC + commercial poles map** | limite-societes-developpement-commercial, poles-commerciaux | Commercial zones overlay |
| 140 | **Business permits** | registre-entreprises | Annual permit volume; sector trends |

### 5.6 Infrastructure Deep-Dives

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 141 | **Bridge/tunnel safety** | structures-routieres | ICG condition index; 2021 snapshot (flag staleness) |
| 142 | **Road asset inventory** | voirie-actif (complete DB) | Construction dates; materials; condition by segment |
| 143 | **Traffic signal inventory** | feux-tous, feux-pietons, feux-sonores | All lights; pedestrian; accessible signals |
| 144 | **Parking regulation map** | signalisation-stationnement | Rules by block face |
| 145 | **Fire hydrant coverage** | bornes-fontaines | Spatial gaps |
| 146 | **Water intervention plan** | resultats-plan-intervention-actifs-eau-voirie-2023 | 2023–2027 integrated water/sewer/road plan |

### 5.7 Seasonal Features

| # | Feature | Season | Datasets | Notes |
|---|---------|--------|----------|-------|
| 147 | **Snow removal live tracker** | Winter (Nov–Mar) | deneigement API (requires token), secteur-deneigement | % complete by sector; borough ranking |
| 148 | **Snow disposal volumes** | Winter | depot-neige, contrats-transaction-deneigement | Truck passages; disposal site volumes |
| 149 | **Parking during snow ops** | Winter | stationnements-deneigement | Where to park |
| 150 | **Pothole season predictor** | Spring (Mar–May) | pothole_repairs + weather data | Correlate freeze-thaw with repair spikes |
| 151 | **Construction season intensity** | Summer (May–Sep) | info-travaux | Active sites per km²; disruption score |
| 152 | **Air-conditioned spaces** | Summer heat events | lieux-publics-climatises | Cooling centres during heat waves |
| 153 | **Bathing water quality** | Summer (Jun–Aug) | rsma-qualite-de-l-eau-en-rive-qualo | Weekly beach safety updates |

### 5.8 Demographics & Equity (Census + Portraits)

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 154 | **Borough demographic portraits** | portrait-thematique (aines, enfants, immigration, pauvrete, jeunes) | Context for all per-capita metrics |
| 155 | **Equity index map** | indice-equite-milieux-vie | Vulnerability × service investment cross-ref |
| 156 | **Service equity analysis** | equity index + 311 + crime + contracts | Are vulnerable neighborhoods getting equitable service? |
| 157 | **Workforce diversity** | diversite-emploi | City workforce vs population |

### 5.9 Portal & Meta

| # | Feature | Datasets | Why it matters |
|---|---------|----------|----------------|
| 158 | **Open data portal usage** | frequentation-portail, nombre-telechargement | Which datasets get used? |
| 159 | **Dataset health monitor** | All pipeline_runs | Internal: are all our ingestions working? |
| 160 | **Programs & subsidies directory** | programmes-subventions-destines-population | Citizen utility: "what can I apply for?" |

---

## Cross-Dataset Correlation Library

These are the highest-value analytical combinations. Implement when both underlying datasets are ingested.

| # | Correlation | Datasets | Question Answered | Priority |
|---|-------------|----------|-------------------|----------|
| C1 | Road condition × contract spending | condition-chaussees + Contrats API | Is money going where roads are worst? | 🔴 |
| C2 | Construction × 311 complaints | info-travaux + requete-311 | Do active sites generate more complaints? | 🔴 |
| C3 | Permit value × social housing × preemption | permis + logements-sociaux + droit-preemption | Gentrification pressure mapping | 🔴 |
| C4 | Sewer overflow × precipitation | debordement + pluviometrie | How much rain triggers overflows? | 🟡 |
| C5 | Heat island × canopy × greening | ilots-de-chaleur + canopee + zones-verdir | Are greening efforts targeting the hottest areas? | 🟡 |
| C6 | Crime × police territory × demographics | actes-criminels + territoire-PDQ + portraits | Crime patterns in demographic context | 🟡 |
| C7 | Air quality × construction × traffic | rsqa + info-travaux + comptage-vehicules | Pollution source identification | 🟡 |
| C8 | BIXI + cycling counters × REV infrastructure | bixi + cyclistes + reseau-express-velo | Does new cycling infrastructure increase ridership? | 🟡 |
| C9 | Elected officials × contracts × borough outcomes | listes-elus + Contrats API + metrics | Accountability: spending vs results by representative | 🔴 |
| C10 | Bedbugs × social housing × inspections | punaises + logements-sociaux + inspections-salubrite | Are problem buildings getting inspected? | 🟢 |
| C11 | Fire false alarms × building permits | fire_interventions + permits | Do new construction zones have more false alarms? | 🟢 |

---

## Data Caveats Registry

Display these warnings in the UI wherever the affected data appears. Transparency = trust.

| Dataset | Caveat | Display strategy |
|---------|--------|------------------|
| Crime | Locations obfuscated to nearest intersection | Tooltip on every map marker |
| Crime | PDQ 50 = metro system, not a borough | Exclude from borough comparisons or label clearly |
| Crime | Status can change post-investigation (reclassification) | Note on historical data |
| 311 | Processes vary by borough — cross-borough comparison unreliable | ⚠️ banner on comparison views |
| 311 | Information requests are NOT georeferenced | Exclude from map, note in counts |
| 311 | Internal tasks mixed with citizen requests | Note in methodology |
| Permits | Lachine and Saint-Léonard data incomplete (system migration) | ⚠️ flag on those boroughs |
| Permits | Cost estimates are "sans valeur légale", methodology varies | Tooltip on cost figures |
| Permits | 73% centroid, 24% street segment, 3% not geolocated | Note on map |
| Fire | Location obfuscated to intersection | Tooltip on map |
| Potholes | SIRR network only (arterial roads); excludes borough manual repairs | Note in methodology |
| Towings | Pre-Nov 2015 data has no GPS coordinates | Exclude from map before that date |
| Contracts | Need to parse ville.montreal.qc.ca API structure | Technical note |
| Bridge condition | 2021 snapshot only — flag staleness | ⚠️ "Data from 2021" label |
| Collisions | Stops at 2021 on MTL portal; post-2021 via SAAQ on Données Québec | Note + link to SAAQ |
| Air quality (IQA) | Uses EST year-round (no daylight saving) | Handle in timezone conversion |

---

## AI Digest Expansion Plan

The digest system grows with the data:

| Phase | Digest scope | Content |
|-------|-------------|---------|
| Phase 1 | Daily city-wide | Crime + travaux + 311 + obstructions + fire + potholes |
| Phase 2 | Daily per-borough | Same metrics, scoped to one arrondissement |
| Phase 2 | Weekly city-wide | Week in review with trends + anomaly callouts |
| Phase 3 | Weekly per-borough | Borough week in review |
| Phase 4 | Monthly analysis | Deeper trends, contract spending, permit patterns | 
| Phase 4 | Anomaly explanations | "Crime up 40% — mostly méfaits in Ville-Marie" |
| Phase 5 | Seasonal digests | Winter ops summary, spring pothole report, summer construction intensity |
| Phase 5 | Borough spotlight | Deep AI narrative for one borough, rotating |

All digests generated in FR and EN. Stored in `digests` table with idempotency check.

---

## Audience-Specific Views

| Audience | What they need | How we deliver it |
|----------|---------------|-------------------|
| **Citizens** | "What's happening near me?" + "Is my borough getting fair treatment?" | Homepage pulse + borough scorecard + map radius search |
| **Journalists** | Investigation starters, anomaly alerts, downloadable data | Anomaly flags + data tables with CSV export + cross-source analyses |
| **Urbanists/researchers** | Long-term trends, per-capita metrics, geographic analysis | 5-year trends + temporal decomposition + heatmaps + correlation library |
| **City staff** | Operational dashboards, performance tracking | 311 backlog + resolution rates + resource allocation views |
| **Politicians/activists** | Accountability metrics, spending transparency | Contract deep-dive + borough scorecards + elected officials mapping |

---

## Summary

| Category | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Total |
|----------|---------|---------|---------|---------|---------|-------|
| Homepage & metrics | 6 | — | — | — | — | 6 |
| Metrics engine | 14 | — | — | — | — | 14 |
| Topic dashboards | — | 34 | — | — | — | 34 |
| Maps & geography | — | — | 5 | — | — | 5 |
| Borough views | — | — | 5 | — | — | 5 |
| Cross-source | — | — | 5 | — | 11 | 16 |
| Temporal analysis | — | — | 7 | — | — | 7 |
| Political accountability | — | — | — | 9 | — | 9 |
| Contracts | — | — | — | 6 | — | 6 |
| New pipelines | — | — | — | 8 | — | 8 |
| New dashboards | — | — | — | 5 | — | 5 |
| Environment & climate | — | — | — | — | 9 | 9 |
| Housing & social | — | — | — | — | 7 | 7 |
| Transport & mobility | — | — | — | — | 8 | 8 |
| Culture & community | — | — | — | — | 7 | 7 |
| Economy | — | — | — | — | 4 | 4 |
| Infrastructure deep | — | — | — | — | 6 | 6 |
| Seasonal | — | — | — | — | 7 | 7 |
| Demographics & equity | — | — | — | — | 4 | 4 |
| Portal & meta | — | — | — | — | 3 | 3 |
| **Totals** | **20** | **34** | **22** | **28** | **55** | **160** |

160 distinct features, organized into 5 phases, covering 396 datasets, targeting 5 audience segments, with 11 cross-dataset correlations and a progressive AI digest system.

**Build Phases 1–3 (76 features) to launch. That's the MVP.**
