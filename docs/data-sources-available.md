# Every dataset on Montréal's open data portal — and beyond

The Ville de Montréal open data portal (**donnees.montreal.ca**) hosts **396 datasets** from six organizations, making it one of the richest municipal open data ecosystems in North America. The portal runs on CKAN (via Données Québec) and is supplemented by at least **14 external real-time APIs** from transit, energy, weather, and provincial agencies. **382 datasets come directly from the Ville de Montréal**, with the remainder from STM (7), Agence de mobilité durable (2), BIXI Montréal (2), Regroupement des éco-quartiers (2), and Communauté métropolitaine de Montréal (1). Nearly all datasets are published under **Creative Commons Attribution 4.0** (394 of 396). Below is the exhaustive inventory organized by category, followed by external sources.

---

## Portal-wide statistics and access points

| Metric | Value |
|---|---|
| Total datasets | **396** (382 Ville de Montréal + 14 partner orgs) |
| Categories | 12 |
| Formats available | CSV (281), GeoJSON (119), SHP (114), WEB (52), PDF (45), ZIP (33), XLSX (31), XLS (29), JSON (25), ODS (18) |
| License | CC-BY 4.0 (394), OGL-Canada 2.0 (2) |
| Portal since | October 2011 (current platform since October 2013) |
| Backend | CKAN 2.10 on donneesquebec.ca |

**Key access points:**

- **Portal**: https://donnees.montreal.ca
- **CKAN API**: `donneesquebec.ca/recherche/api/3/action/package_search?q=organization:ville-de-montreal&rows=100&start=0` (paginate with start=100, 200, 300)
- **CSV master list of all datasets**: `donnees.montreal.ca/dataset/dc7aca8a-9c11-419b-8094-f0d6f359fdc0/resource/bcc0b608-2d54-4746-88b6-521023524f6e/download/do.csv`
- **Full data inventory CSV** (includes unpublished/planned datasets): `donnees.montreal.ca/dataset/ecd2af68-731c-4896-be5f-55e58adaad0e/resource/634b2c58-a7a6-470e-8c97-a38d0d5e7fdd/download/inventaire-des-ensembles-de-donnees-de-la-ville-de-montreal.csv`
- **Power BI inventory dashboard**: linked from the inventory dataset page
- **Atom feed** (recent additions): `donnees.montreal.ca/feeds/dataset.atom`

---

## Category 1: Gouvernement et finances (115 datasets)

This is the largest category, covering contracts, budgets, council operations, democratic processes, performance metrics, and portal metadata.

### Contracts and spending

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Contrats – Conseil municipal et conseil d'agglomération | `contrats-conseil-municipal-et-conseil-d-agglomeration` | CSV, HTML | Contracts awarded by municipal and agglomeration councils |
| Contrats – Conseils d'arrondissement | `contrats-conseils-d-arrondissement` | CSV, HTML | Contracts awarded by the 19 borough councils |
| Contrats – Comité exécutif | `contrats-comite-executif` | CSV, HTML | Contracts awarded by the executive committee |
| Contrats – Fonctionnaires (pouvoirs délégués) | `contrats-octroyes-par-les-fonctionnaires-ville-centrale` | CSV | Contracts under delegated authority, monthly since 2011 |
| Contrats et subventions – API | `contrats-et-subventions-api` | JSON, ODT | REST API at ville.montreal.qc.ca/vuesurlescontrats/api/ |
| Liste des fournisseurs | `liste-des-fournisseurs` | CSV | Suppliers with contracts >$2,000 |
| Bilan des contingences | `bilan-des-contingences` | CSV, XLS | Contract contingency reports (Water Service, Infrastructure Service) since 2008 |
| Bilan de la consommation des ententes-cadres | `bilan-de-la-consommation-des-ententes-cadres` | CSV | Framework agreement consumption data 2008-2015 |
| Bilan des estimations – Infrastructures (archives) | `bilan-des-estimations-infrastructures` | XLS, CSV | 2014 infrastructure cost estimates |

### Budgets, finance, and elected officials

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Budget de fonctionnement | `budget` | XLSX, ZIP, XLS, PDF | Annual operating budgets (city + agglomeration) |
| Programme décennal d'immobilisations (PDI) | `programme-decennal-immobilisations` | XLSX | 10-year capital investment program |
| Programme triennal d'immobilisation – fiches de projets | `programme-triennal-d-immobilisation-fiches-de-projets-et-programmes` | CSV | 3-year capital project details with budgets |
| Dépenses des élus autorisées par le comité exécutif | `depenses-des-elus-autorisees-par-le-comite-executif` | CSV, ODS, XLS | Elected officials' authorized expenses |
| Tableau de la rémunération des personnes élues | `remuneration-elus` | CSV, ODS, XLS | Elected officials' remuneration and allowances |
| Remboursement des allocations aux partis autorisés (archives) | `allocation-aux-partis-autorises` | CSV | Political party allocation reimbursements |
| Remboursement des frais de recherches et de soutien | `remboursement-des-frais-de-recherches-et-de-soutien` | CSV | Councillor research expense reimbursements |

### Council operations and democratic processes

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Calendrier des séances (CE, CM, CA) | `calendrier-seances-comite-executif-conseil-municipal-conseil-agglomeration` | CSV | Meeting schedule of executive committee, municipal council, agglomeration council |
| Vidéos des séances des instances décisionnelles | `videodiffusion-seances-instances-politiques` | CSV | Index of recorded council session videos |
| Sous-titrage du conseil municipal (archives) | `sous-titrage-conseil-municipal` | SCC, SRT, CSV | Real-time subtitling files from council webcasts |
| Communiqués de presse | `communique-presse` | CSV | City press releases |
| Événements publics | `evenements-publics` | CSV | Public events on the city calendar |
| Avis et alertes | `avis-alertes` | CSV | Public notices and alerts from montreal.ca |
| Règlements municipaux | `reglements-municipaux` | CSV | Municipal bylaws repertoire |
| Nominations (conseil d'agglomération, CM, CE) | `nominations` | CSV | Appointments by council bodies |
| Diffusion proactive – Documents d'accès à l'information | `diffusion-proactive-acces-information` | CSV | Proactive disclosure of ATIP documents, monthly updates |
| Listes des élus de la Ville de Montréal | `listes-elus` | CSV | Elected officials directory |

### Elections (7+ datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Élections municipales – Districts électoraux | `districts-electoraux` | CSV, GeoJSON, SHP | Electoral district boundaries (2013, 2017, 2021, 2025) |
| Élections municipales – Sections de vote | `sections-de-vote` | CSV, GeoJSON, SHP | Polling division boundaries |
| Élections municipales – Résultats détaillés | `resultats-detailles` | CSV | Vote-by-vote detailed results |
| Élections municipales – Résultats sommaires | `resultats-sommaires` | XML, CSV | Summary election results |
| Élections municipales partielles – Résultats détaillés | `elections-municipales-partielles-resultats-detailles` | CSV | By-election detailed results |
| Élections municipales – Candidatures | `candidatures` | CSV | Candidate information |
| Élections municipales – Bureaux de vote | `bureaux-de-vote` | CSV, GeoJSON | Polling station locations |
| Élections municipales – Bassins électoraux | `bassins-electoraux` | GeoJSON, SHP | Electoral basins |

### Portal metadata and performance

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Fréquentation du portail de données ouvertes | `frequentation-du-portail-de-donnees-ouvertes` | CSV | Daily visitors/page views on open data portal |
| Téléchargement quotidien des ressources | `nombre-telechargment-donnees` | CSV | Daily download counts per resource |
| Statistiques d'utilisation du site web montreal.ca | `statistiques-utilisation-site-web-ville-de-montreal` | CSV | Daily visitors/page views on montreal.ca |
| Liste des ensembles automatisés | `ressources-automatisees-donnees-ouvertes` | CSV | Automated datasets on the open data site |
| Liste des ensembles disponibles en données ouvertes | `ensembles-de-donnees-du-portail-de-donnees-ouvertes` | CSV, XLSX | Master list of all open datasets with attributes |
| Inventaire de données | `inventaire-donnees-ouvertes` | CSV, XLSX, HTML | Complete data inventory under Open Data Policy |
| Indicateurs de performance de la Ville | `indicateurs-de-performance-de-la-ville-de-montreal` | CSV | Municipal benchmarking indicators (MAMH/REMC) |
| Performance du service du 311 | `performance-311` | CSV | 311 service performance metrics |
| Solutions en logiciels libres | `solutions-en-logiciels-libres` | CSV | Open source software inventory |
| Programmes et subventions destinés à la population | `programmes-subventions-destines-population` | CSV | City programs and subsidies directory |
| Offres d'emploi et postulation | `offres-emploi` | CSV | Job postings and applications |
| Demandes de services citoyennes (Requêtes 311) | `requete-311` | WEB, CSV | 311 citizen service requests |
| Vignettes de stationnement | `vignettes-stationnement` | WEB, CSV | Residential parking permits issued by BAM offices |
| Événements protocolaires assistés par les personnes élues | `evenements-protocolaires` | CSV | Protocol events attended by elected officials |

### Demographic portraits (~10 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Portrait des arrondissements sur les personnes aînées, 2021 | `portrait-thematique-aines-2021` | CSV, HTML | Borough-level senior demographics |
| Portrait des arrondissements sur les enfants, 2021 | `portrait-thematique-sur-les-enfants-2021` | CSV, HTML | Borough-level child demographics |
| Portrait des arrondissements sur l'immigration, 2021 | `portrait-thematique-sur-l-immigration` | CSV, HTML | Borough-level immigration portrait |
| Portrait des arrondissements sur la pauvreté, 2021 | `portrait-thematique-sur-la-pauvrete-2021` | CSV, HTML | Borough-level poverty portrait |
| Portrait des arrondissements sur les personnes jeunes, 2021 | `portrait-thematique-jeunes-2021` | CSV, HTML | Borough-level youth demographics |
| Commande personnalisée du recensement 2021 | `commande-personnalisee-recensement-2021` | IVT, XLSX | Custom census 2021 data from Statistics Canada |
| Profils des ménages et des logements 2021 | `profils-menages-logements-2021` | HTML | Household and housing profiles |
| Diversité en emploi à la Ville de Montréal | `diversite-emploi` | CSV | Workforce diversity data |
| Rapport Écho – Baromètre de l'inclusion des personnes immigrantes | `rapport-echo` | CSV | Immigrant inclusion barometer |
| Indice d'équité des milieux de vie | `indice-equite-milieux-vie` | CSV, GeoJSON, SHP, PDF | Neighborhood vulnerability equity index |

---

## Category 2: Infrastructures (95 datasets)

Covers roads, water networks, sewers, buildings, signage, snow removal, and physical city infrastructure.

### Road network and pavement

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Actifs de voirie (base complète – Chaussée, Îlot, Intersection, Trottoir, Zone) | `voirie-actif` | SHP, CSV | Complete road asset inventory with construction dates, materials, conditions |
| Chaussée agrégée et intersection | `voirie-chaussee-intersection` | SHP, CSV | Roadway and intersection polygons |
| Trottoir et îlot | `voirie-trottoir-ilot` | SHP, CSV | Sidewalk, curb, and median polygons |
| Zone hors voirie | `voirie-zone` | SHP, CSV | Non-road zones between road assets |
| Indicateurs de condition des chaussées – réseau routier | `condition-chaussees-reseau-routier` | CSV | PCI and IRI pavement condition indices |
| Indicateurs de condition des chaussées – réseau cyclable | `condition-chaussees-reseau-cyclable` | CSV | Cycling network pavement condition |
| Structures routières (inventaire) | `structures-routieres` | CSV, GeoJSON | Bridges, tunnels, retaining walls, overpasses |
| Glissières de sécurité et atténuateurs d'impact | `glissieres-securite` | CSV | Safety barriers and impact attenuators |
| Géobase – réseau routier | `geobase` | GeoJSON, SHP, CSV | Filamentary road center-line network with addressing |
| Géobase – pôles | `geobase-pole` | GeoJSON, SHP | Left/right side points of road segments |
| Géobase double – côtés de rue | `geobase-double` | GeoJSON, SHP | Simulated sidewalk/curb-line projections |

### Water and sewer networks

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Résultats du dépistage des entrées de service en plomb | `depistage-entrees-service-plomb` | WEB, CSV | Lead service line detection results |
| Réparations de bris sur le réseau d'eau potable | `reparation-reseau-eau-potable` | CSV | Repair data for drinking water network breaks |
| Regards d'égouts | `regards-egouts` | SHP, CSV, GeoJSON | Sewer manholes on the island |
| Puisards d'égouts | `puisards-egouts` | SHP, CSV, GeoJSON | Storm drain catch basins |
| Ouvrages de surverse | `ouvrage-surverse` | CSV, SHP | 170 sewer overflow structures |
| Débordements | `debordement` | XLSX | Sewer overflow duration data |
| Volumes et durées des débordements de l'intercepteur sud-est | `donnees-debordements-intercepteur-ete2015` | CSV, PDF | Southeast interceptor overflow data (summer 2015) |
| Résultats du Plan d'intervention eau/égouts/voirie 2016-2021 | `resultats-plan-intervention-actifs-eau-voirie` | SHP, CSV | Integrated intervention classes for water/sewer/road assets |
| Résultats du Plan d'intervention eau/égouts/voirie 2023-2027 | `resultats-plan-intervention-actifs-eau-voirie-2023` | SHP | Current intervention plan results |
| Bornes d'incendie | `bornes-fontaines` | CSV, GeoJSON, SHP | Fire hydrant locations |

### Signage and traffic control

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Signalisation routière (excluant stationnement) | `signalisation-routiere` | GeoJSON, SHP | Road signs (regulatory, warning, information) |
| Signalisation – stationnement sur rue | `signalisation-stationnement` | GeoJSON, SHP | Parking regulation signs |
| Poteaux de signalisation | `poteaux-signalisation` | GeoJSON, SHP | Sign posts/poles |
| Ordres de travail émis pour la signalisation routière | `ordres-travail-signalisation` | CSV | Work orders for sign installation/maintenance |
| Feux de circulation – emplacements toutes intersections | `feux-tous` | CSV, GeoJSON, SHP | All traffic lights managed by the city |
| Feux de circulation – feux pour piétons | `feux-pietons` | CSV, GeoJSON, SHP | Pedestrian signal locations |
| Feux de circulation – signaux sonores pour malvoyants | `feux-sonores` | CSV | Audible traffic signals for visually impaired |

### Snow removal

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Déneigement des rues en arrondissements | `deneigement` | API | Snow removal planning API |
| Secteurs de déneigement | `secteur-deneigement` | GeoJSON, SHP | Snow removal sector boundaries |
| Contrats et transactions de déneigement | `contrats-transaction-deneigement` | CSV | Snow removal contracts and truck transaction data |
| Sites d'élimination de la neige | `depot-neige` | CSV, GeoJSON, SHP | Snow dump site locations |
| Stationnements gratuits/payants (déneigement) | `stationnements-deneigement` | CSV | Parking locations during snow operations |

### Buildings and facilities

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Lieux et bâtiments à vocation publique | `lieux-batiments-vocation-publique` | CSV, SHP, GeoJSON | Public venues with addresses, hours, facilities, accessibility |
| Bâtiments municipaux | `batiments-municipaux` | CSV, SHP | Municipal building inventory (75+ usage types) |
| Bâtiment 2D | `batiment-2d` | GeoJSON, SHP | Building footprints across the territory |
| Lieux publics climatisés | `lieux-publics-climatises` | CSV | Air-conditioned public spaces |
| Bâtiments certifiés « qualité famille » | `batiments-certifies-qualite-famille` | CSV | Family-certified municipal buildings |
| Inventaire des bâtiments vacants de Ville-Marie | `batiments-vacants-ville-marie` | CSV | Vacant buildings in Ville-Marie borough |
| Casernes de pompiers sur l'île de Montréal | `casernes-pompiers` | CSV | Fire station addresses and coordinates |
| Stationnements municipaux tarifés, sur rue et hors rue | `stationnements-municipaux` | CSV, GeoJSON | Municipal paid parking locations |

### Construction permits and inspection

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Permis de construction, transformation et démolition | `permis-construction` | WEB, CSV, GeoJSON, SHP | All building permits issued by boroughs |
| Entraves et travaux en cours (Info-travaux) | `info-travaux` | CSV, JSON | Road work and obstructions, real-time |
| Remorquages de véhicules entravant les opérations | `remorquages-de-vehicules-genants` | WEB, CSV | Vehicle towing during city operations |

---

## Category 3: Environnement, ressources naturelles et énergie (87 datasets)

### Air quality (RSQA)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| RSQA – indice de la qualité de l'air temps réel | `rsqa-indice-qualite-air` | WEB, CSV | Real-time air quality index (IQA), daily |
| RSQA – liste des stations | `rsqa-liste-des-stations` | CSV | Air quality monitoring station locations |
| RSQA – Station Nomade | `rsqa-station-nomade` | CSV | Mobile air quality monitoring project |
| Historique des bilans annuels de la qualité de l'air | `historique-bilans-qualite-air` | CSV | Annual air quality summary reports |
| Concentrations atmosphériques de polluants métaux | `concentrations-polluants-metaux` | CSV | Atmospheric metal pollutant concentrations |

### Trees and vegetation

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Arbres publics sur le territoire de la Ville | `arbres` | CSV, PDF | 300,000+ public trees with species, diameter, location |
| Abattage – Arbres publics | `abattage-arbres-publics` | WEB, CSV | Public tree felling records |
| Emplacements réservés à la plantation | `emplacements-plantation` | CSV | Locations reserved for new tree planting |
| Canopée | `canopee` | SHP | Tree canopy cover extent (crowns >3m) |
| Modèle numérique de canopée (MNC) | `modele-numerique-de-canopee-mnc` | GeoTIFF | 3D canopy altitude model |

### Natural environments and biodiversity

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Milieu naturel intérieur protégé ou en voie de protection | `milieu-naturel-protege` | SHP, GeoJSON, KML | Protected natural areas |
| Milieux humides | `milieux-humides` | SHP | Wetlands inventory |
| Écoterritoires | `ecoterritoires` | SHP | 10 eco-territories identified for ecological protection |
| Friches naturelles | `frichenaturelle` | SHP, GeoJSON, KML | Natural fallow land polygons |
| Cours d'eau et fossés | `cours-d-eau-et-fosse` | GeoJSON, SHP | Waterway traces and major ditches |
| Bilan du Répertoire des milieux naturels protégés et contributifs à la biodiversité | `bilan-milieux-naturels` | CSV | Natural environments contributing to biodiversity |
| Signalements de coyotes | `signalements-de-coyotes` | CSV, GeoJSON | Coyote sighting reports with behavior/risk classification |

### Water quality (RSMA programs)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Qualité de l'eau en rive (QUALO) | `rsma-qualite-de-l-eau-en-rive-qualo` | CSV | Shore water quality, 20-week summer sampling |
| Points d'échantillonnage QUALO | `rsma-points-d-echantillonnage-qualo` | CSV, GeoJSON | QUALO sampling point locations |
| Qualité des ruisseaux et plans d'eau (RUISSO) | `rsma-donnees-ruisso-annuelle` | CSV | Stream and inland water body quality |
| Points d'échantillonnage RUISSO | `rsma-points-d-echantillonnage-ruisso` | CSV, GeoJSON | RUISSO sampling point locations |
| Points d'échantillonnage COURDO | `rsma-points-d-echantillonnage-courdo` | CSV, GeoJSON | Major waterway sampling points |
| Données COURDO spéciales | `rsma-donnees-courdo-speciales` | CSV | Special waterway quality data |
| RSMA – Bilan annuel de la qualité des plans d'eau | `rsma-bilan-annuel-de-la-qualite-des-plans-d-eau` | CSV | Annual water body quality reports |

### Climate, heat, and precipitation

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Îlots de chaleur | `ilots-de-chaleur` | SHP, GeoTIFF | Urban heat island polygons |
| Thermographie de surface | `thermographie-surface` | GeoTIFF | Day/night thermal infrared surface temperature imagery |
| Zones prioritaires à verdir | `zones-prioritaires-verdir-diminuer-impacts-vagues-chaleur` | GeoJSON, SHP | Priority greening zones to reduce heat impacts |
| Mesure de l'impact des projets de verdissement | `mesure-impact-projets-verdissement` | CSV | Air temperature/humidity monitoring near greening projects |
| Vulnérabilité aux changements climatiques | `vulnerabilite-changements-climatiques` | SHP, GeoJSON | Climate hazard vulnerability analysis (heat, flooding, storms) |
| Pluviométrie – mesure de la quantité de précipitation | `pluviometrie-quantite-precipitation` | CSV | Rain gauge precipitation measurements |
| Pluviomètres – localisation | `pluviometre-localisation` | CSV, SHP | Rain gauge locations |

### Hydrography and geology

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Hydrographie de l'agglomération de Montréal | `hydrographie` | SHP | Hydrographic network (rivers, lakes, streams) |
| Hydrographie de la Communauté métropolitaine de Montréal | `hydrographie-communaute-metropolitaine-montreal` | SHP | Metropolitan-area hydrography |
| Anciennes carrières et dépôts de surface | `anciennes-carrieres-depots-surface` | SHP, CSV, GeoJSON | Historical quarries and surface deposits |
| Géologie et épaisseur des dépôts meubles | `geologie-des-depots-meubles` | SHP | Surface geology and soil thickness map |
| Liste des terrains contaminés | `liste-des-terrains-contamines` | CSV | Contaminated land inventory |

### GHG and energy

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Émissions de GES de la collectivité montréalaise | `emissions-ges-collectivite-montrealaise` | CSV | Community-wide GHG emissions by sector |
| Consommation d'énergie et émissions de GES des bâtiments municipaux ≥2000m² | `consommation-emissions-batiments-municipaux` | CSV | Energy consumption and GHG for large municipal buildings |
| Signalements des événements nuisibles à l'environnement | `signalements-evenements-nuisibles-environnement` | CSV | Environmental incident reports |
| Contrevenants – émissions air et rejets eau | `contrevenants-aux-reglements-relatifs-aux-emissions-air-rejets-eau` | CSV | Offenders against air/water pollution bylaws |

### Waste management

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Secteurs Info-collectes | `info-collectes` | GeoJSON | Waste collection sectors (organics, recyclables, household) |
| Matières résiduelles – bilan massique | `matieres-residuelles-bilan-massique` | CSV | Waste management mass balance data |
| Déclarations des gestionnaires de parasites | `declarations-gestionnaires-parasites` | CSV | Pest management declarations |

---

## Category 4: Transport (45 datasets)

### Cycling infrastructure and data

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Compteurs cyclistes permanents | `cyclistes` | CSV | Permanent bike counter data from magnetic sensors |
| Comptages des vélos sur les pistes cyclables | `velos-comptage` | CSV | Multi-year cycling path counter data |
| Réseau cyclable | `pistes-cyclables` | GeoJSON, SHP, PDF | Complete cycling network with infrastructure types, 4-season accessibility |
| Réseau express vélo (REV) | `reseau-express-velo` | GeoJSON, SHP | 184 km express bike network, 17 axes |
| Voies actives sécuritaires (VAS) | `voies-actives-securitaires` | GeoJSON, SHP | COVID-era safe active routes |
| Trajets individuels à vélo (Mon RésoVélo) | `trajets-individuels-velo-enregistre-mon-resovelo` | CSV | GPS-traced cycling trips from Mon RésoVélo app |
| Cyclovia | `cyclovia` | CSV | Cyclovia open-streets event data |

### Traffic and vehicle data

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Comptages véhicules, cyclistes et piétons aux intersections | `comptage-vehicules-pietons` | CSV | Intersection traffic counts |
| Données de circulation – Bluetooth (capteurs) | `bluetooth-capteurs` | CSV | Bluetooth sensor traffic flow data |
| Images annotées des caméras de circulation (archives) | `images-annotees-cameras-circulation` | various | Annotated traffic camera images for ML training |
| Collisions routières | `collisions-routieres` | CSV, GeoJSON, SHP, PDF | Road collisions since 2012 |
| Véhicules électriques et hybrides | `vehicules-electriques-et-hybrides` | CSV | Municipal fleet EV/hybrid inventory |
| Bornes de recharge publiques pour voitures électriques | `bornes-recharge-publiques` | CSV | Public EV charging station locations |
| Données de transport (Schéma d'aménagement) | `schema-transport` | GeoJSON, SHP | Transport infrastructure plan data |

### Parking and mobility

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Postes d'attente de taxi | `postes-d-attente-de-taxi` | CSV, SHP, GeoJSON | Taxi stand locations (Agence de mobilité durable) |
| Stationnement tarifé sur rue (mobilier urbain) | `stationnement-tarife-mobilier` | CSV, GeoJSON | Payment terminals, regulations, rates (Agence de mobilité durable) |
| Espaces VNILSSA (trottinettes/vélos en libre-service) | `vnilssa` | GeoJSON, CSV | Authorized free-floating micromobility parking zones |

### STM public transit (7 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Horaires planifiés et trajets des bus et du métro | `stm-horaires-planifies-et-trajets-des-bus-et-du-metro` | GTFS | GTFS static feed (219 routes, 9,090 stops) |
| Horaires en temps réel et positionnement des bus (GTFS-RT) | `stm-gtfs-realtime` | GTFS-RT | Real-time vehicle positions, trip updates, alerts, occupancy |
| Tracés des lignes de bus et de métro | `stm-traces-des-lignes-de-bus-et-de-metro` | SHP | Route and stop geospatial data |
| Incidents du réseau du métro | `incidents-du-reseau-du-metro` | CSV | Metro service incidents with timestamps, causes |
| Kilométrage métro – budget d'exploitation | `stm-kilometrage-budget` | CSV | Budgeted metro vehicle-kilometers |
| Kilométrage métro – parcouru | `stm-kilometrage-parcouru` | CSV | Actual metro vehicle-kilometers traveled |
| Kilométrage métro – planifié | `stm-kilometrage-planifie` | CSV | Planned metro vehicle-kilometers by service period |

### BIXI bike-sharing (2 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| État des stations BIXI | `bixi-etat-des-stations` | GBFS, CSV | Real-time station status (bikes available, docks, e-bikes) |
| Historique des déplacements BIXI | `bixi-historique-deplacements` | CSV | Trip history (monthly/annual CSV downloads, 2014–present) |

---

## Category 5: Société et culture (29 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Répertoire historique des toponymes | `toponymes` | CSV, JSON | Origin of 6,000+ street names and public places |
| Banque de nom Toponym'Elles | `toponym-elles` | CSV, JSON | Women's representation name bank |
| Art public – Oeuvres de la collection municipale | `art-public-information-sur-les-oeuvres-de-la-collection-municipale` | JSON, CSV | Public art collection (title, artist, materials, location) |
| Murales subventionnées | `murales` | CSV, GeoJSON | City-funded murals since 2007 |
| Les édifices patrimoniaux de Montréal | `les-edifices-patrimoniaux-de-montreal` | CSV | Heritage buildings from Grand répertoire |
| Sites et immeubles protégés (Loi patrimoine culturel) | `sites-immeubles-proteges-lpc` | SHP | Nationally protected heritage sites |
| Patrimoine architectural d'Outremont (inventaire Bisson) | `patrimoine-outremont-bisson` | CSV | Outremont architectural heritage (NEW Feb 2026) |
| Permis de tournage (Bureau du cinéma) | `permis-tournage` | CSV | Film/TV shoot permits |
| Activités en pratique artistique amateur | `activites-pratique-artistique` | CSV | Amateur arts participation statistics |
| Organismes du Réseau du loisir culturel | `organismes-loisir-culturel` | CSV | Cultural leisure network organizations |
| Statistiques Inclusion et Innovation | `inclusion-innovation` | CSV | Cultural inclusion program participation |
| Œuvres du Musée d'art contemporain de Montréal | `oeuvres-mac` | CSV | MAC collection metadata |
| Bibliothèques de Montréal – statistiques | `bibliotheques-montreal-statistiques` | XLSX, XLS | Lending, collection, attendance for 45 libraries |
| Montant des amendes payées et impayées par bibliothèque | `montant-des-amendes-payees-et-impayees-par-bibliotheque` | XLS, CSV, ODS | Library fine amounts |
| Coups de coeur et projets culturels | `coups-de-coeur-et-projets-culturels-de-l-evenement-montreal-engagee-pour-la-culture` | XLS, ODS, CSV, KML | 252 cultural projects "Montréal engagée pour la culture" |
| Points de rencontre pour Livres dans la rue | `points-rencontres-livres-dans-la-rue` | XLS, CSV, ODS | Children's street reading program meeting points |
| Médias communautaires reconnus ou soutenus | `medias-communautaires` | CSV | Recognized community media organizations |

---

## Category 6: Loi, justice et sécurité publique (22 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Actes criminels | `actes-criminels` | CSV, GeoJSON, ZIP | SPVM criminal incident records |
| Postes de police de quartier | `carte-postes-quartier` | CSV, GeoJSON, SHP | SPVM police station locations |
| Territoires des postes de quartier du SPVM | `territoire-postes-quartier-spvm` | GeoJSON, SHP | Police district boundaries |
| Interventions des pompiers de Montréal | `interventions-service-securite-incendie-montreal` | CSV, GeoJSON, SHP | SIM fire department intervention records |
| Casernes de pompiers | `casernes-pompiers` | CSV | Fire station directory |
| Territoires administratifs des casernes | `territoires-casernes` | GeoJSON, SHP | Fire station administrative boundaries |
| Contrevenants condamnés – salubrité des logements | `liste-central-condamnations-salubrite-logements` | CSV | Convicted housing safety offenders |
| Avis de détérioration | `avis-deterioration` | CSV | Building deterioration notices |
| Inspections préventives en salubrité | `inspections-salubrite-habitation` | CSV, GeoJSON | Preventive housing health inspections |

---

## Category 7: Tourisme, sports et loisirs (20 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Installations récréatives, sportives et culturelles extérieures | `installations-recreatives-sportives-et-culturelles` | CSV, GeoJSON | 3,396+ outdoor facilities (pools, courts, playgrounds) |
| Grands parcs, parcs d'arrondissements et espaces publics | `grands-parcs-parcs-d-arrondissements-et-espaces-publics` | CSV, GeoJSON, SHP | 1,495+ park and public space polygons |
| Piscines municipales | `piscines-municipales` | CSV, GeoJSON | Municipal pools and water features |
| Historique des conditions des patinoires extérieures | `patinoires` | CSV | Outdoor rink conditions since 2002 |
| Conditions de ski (sites hivernaux) | `conditions-ski` | CSV | Winter ski site conditions |
| Parcours riverain | `parcours-riverain` | GeoJSON | Waterfront trail network |
| Lieux d'intérêt (Montréal à pied) | `lieux-interet` | CSV, GeoJSON | Points of interest from the walking initiative |
| Organismes reconnus PANAM | `organismes-panam` | CSV | Pan-Montreal recognized organizations |
| Activités 375e anniversaire de Montréal (2017) | `activites-375e` | CSV | 375th anniversary event programming |

---

## Category 8: Politiques sociales (16 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Logements hors marché (sociaux et communautaires) | `logements-sociaux` | CSV, GeoJSON | Social/community housing inventory (HLM, coops, OBNL) |
| Subventions en habitation destinées aux citoyens | `subvention-habitation` | CSV | Housing subsidy programs since 2012 |
| Ententes – Règlement pour une métropole mixte | `ententes-metropole-mixte` | CSV | Affordable/social housing contribution agreements |
| Inventaire immeubles/terrains assujettis au droit de préemption | `droit-preemption` | CSV, GeoJSON | Properties subject to right of first refusal |
| Quartiers de référence en habitation | `quartiers` | CSV, GeoJSON | Housing analysis reference neighborhoods |
| Indicateur de priorité d'inspection 2018 | `indicateur-priorite-inspection` | CSV | Building inspection prioritization model |
| Déclarations des exterminations de punaises de lit | `declarations-exterminations-punaises-de-lit` | CSV, GeoJSON | Bed bug extermination reports with geolocation |
| Sondage de satisfaction auprès des résidents, 2013 (archives) | `sondage-satisfaction-citoyens-2013` | PDF, XLS, CSV | Resident satisfaction survey |
| Sondage du Défi des villes intelligentes | `sondage-defi-villes-intelligentes` | CSV | Smart cities challenge survey |
| Accès aux services entrepreneuriaux (populations vulnérables) | `acces-services-entrepreneuriaux` | CSV | Entrepreneurship access study for vulnerable populations |

---

## Category 9: Économie et entreprises (9 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Locaux commerciaux et statuts d'occupation | `locaux-commerciaux` | CSV, SHP | Commercial premises survey – retail portrait |
| Limite des sociétés de développement commercial (SDC) | `limite-des-societes-de-developpement-commercial-sdc` | SHP | SDC boundary polygons |
| Pôles commerciaux | `poles-commerciaux` | SHP | Commercial concentration zones |
| Registre des entreprises détentrices d'un permis annuel | `registre-entreprises` | CSV | Businesses with annual permits |
| État du centre-ville | `etat-centre-ville` | CSV | Quarterly downtown socioeconomic pulse |
| Soutien aux entreprises (COVID-19) | `soutien-entreprises-covid` | CSV | Business support during COVID |

---

## Category 10: Agriculture et alimentation (6 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Jardins communautaires | `jardins-communautaires` | CSV, GeoJSON, SHP | Community garden locations |
| Établissements alimentaires | `etablissements-alimentaires` | CSV | Food establishment inspection registry |
| Agriculture urbaine – sondage | `agriculture-urbaine-sondage` | CSV | Urban agriculture survey |
| Apports anthropiques d'azote et de phosphore (NANI/NAPI) | `nani-napi` | CSV | Nitrogen and phosphorus input data |

---

## Categories 11 & 12: Éducation et recherche / Santé (few datasets)

These categories have very few direct Ville de Montréal datasets; most entries appear through cross-categorization. Notable datasets:

| Dataset | Slug | Category | Description |
|---|---|---|---|
| Lieux publics climatisés | `lieux-publics-climatises` | Santé | Air-conditioned public spaces during heat events |
| Inspections préventives en salubrité | `inspections-salubrite-habitation` | Santé | Housing health inspections |

---

## Urbanisme and planning (cross-categorized, ~15 datasets)

### Schéma d'aménagement et de développement (6 separate datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Schéma – Affectation du sol et densité | `schema-affectation-densite` | SHP | Land use designation and occupancy density |
| Schéma – Environnement et milieux naturels | `schema-environnement-milieux-naturels` | SHP | Ecological territories, Green and Blue Network |
| Schéma – Équipements collectifs | `schema-equipements-collectifs` | SHP | Metropolitan collective facilities |
| Schéma – Transport | `schema-transport` | SHP | Transport infrastructure plan |
| Schéma – Patrimoine et paysage | `schema-patrimoine-paysage` | SHP | Heritage sites, landscapes, viewpoints |
| Schéma – Économie | `schema-economie` | SHP | Commercial/employment zones |

### Plan d'urbanisme et de mobilité 2050 (PUM)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| PUM 2050 – Secteurs d'opportunité | `pum-secteurs-opportunite` | GeoJSON, SHP | Opportunity sectors |
| PUM 2050 – Patrimoine et paysages | `pum-patrimoine-paysages` | GeoJSON, SHP | Heritage and landscape data |
| PUM 2050 – Niveaux d'intensification urbaine | `pum-intensification` | GeoJSON, SHP | Urban intensification levels |
| PUM 2050 – Réseau transport collectif structurant 2050 | `pum-transport-collectif` | GeoJSON, SHP | Planned 2050 structured transit network |
| Plan d'urbanisme – Affectation du sol | `affectation-du-sol` | SHP, GeoJSON | 10-category land use map |
| Plan d'urbanisme – Limites de hauteurs | `limites-hauteurs` | GeoJSON | Height limits |
| Limites administratives agglomération | `limites-administratives-agglomeration` | GeoJSON, SHP | Borough and linked-city boundaries |
| Unités d'évaluation foncière | `unites-evaluation-fonciere` | GeoJSON, SHP | Property assessment roll data |

---

## 3D, LiDAR, and aerial imagery (10+ datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| LiDAR aérien 2015 | `lidar-aerien-2015` | LAS/LAZ | 10 pts/m² airborne point cloud |
| Modèle numérique de terrain (MNT) | `modele-numerique-de-terrain-mnt` | GeoTIFF, CityGML | Bare-ground elevation model |
| Modèle numérique de surface (MNS) | `modele-numerique-de-surface-mns` | GeoTIFF | Ground + buildings elevation model |
| Bâtiments 3D 2016 (LOD2 avec textures) | `batiments-3d-2016` | CityGML, 3DM, GDB | Textured 3D building maquette |
| Bâtiments 3D 2013 (LOD2 avec textures) | `batiments-3d-2013` | CityGML, 3DM | 3D building maquette |
| Bâtiments 3D 2009 (LOD2 avec textures) | `batiments-3d-2009` | CityGML, 3DM | Le Sud-Ouest and Ville-Marie 3D |
| Maquette 3D non géoréférencée centre-ville (2011) | `maquette-3d-2011-centre-ville` | 3DM, DWG | Downtown 3D model |
| Voies ferrées 3D | `voies-ferrees-3d` | various | 3D railway infrastructure |
| Cartographie de base | `cartographie-de-base` | WEB | Base mapping (1:1000, 1:5000) |
| Photographies aériennes – Photothèque | `phototheque` | various | Multi-year aerial photo archive with interactive download |
| Vues aériennes 1947-1949 | `vues-aeriennes-archives` | ZIP, XLS, CSV | 3,920 historical aerial photos |
| Vues aériennes 1958-1975 | `vues-aeriennes-de-montreal-1958-1975` | XLS, CSV | 2,096 aerial photos |
| Vues aériennes 1925-1935 | `vues-aeriennes-de-l-ile-de-montreal-1925-1935` | CSV, XLS | 43 early aerial photos |

### Historical maps and archives

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Plans détaillés d'occupation du sol, 1949 | `plans-detailles-d-occupation-du-sol-de-la-ville-de-montreal-1949` | CSV, XLS | 548 detailed 1949 land use plans |
| Plans généraux d'occupation du sol, 1949 | `plans-generaux-d-occupation-du-sol-de-la-ville-de-montreal-1949` | ZIP, XLS, CSV | 70 general 1949 land use plans |
| Registre de plans des propriétés 1900-2000 | `registres-de-plans-des-proprietes-de-la-ville-de-montreal-1900-2000` | XLS, CSV | 1,984 plan sheets across 22 volumes |
| Archives photographiques (sélection) | `phototheque-archives` | CSV, XLS | 110 historic photographs |

---

## Éco-quartiers (Regroupement des éco-quartiers, 2 datasets)

| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Liste des éco-quartiers | `liste-des-eco-quartiers` | CSV | Éco-quartier offices by borough |
| Corvées de propreté citoyennes | `corvees-de-proprete-citoyennes` | CSV | Citizen cleanup events |

### Also from Ville de Montréal:
| Dataset | Slug | Formats | Description |
|---|---|---|---|
| Ruelles vertes | `ruelles-vertes` | GeoJSON | 350+ green alleys with characteristics |

---

## Datasets from other Québec organizations covering Montréal

Beyond the portal, these organizations on **Données Québec** publish Montreal-relevant data:

| Organization | Key Datasets | Formats | Notes |
|---|---|---|---|
| **SAAQ** (auto insurance) | Rapports d'accident province-wide (filterable to Montréal, 2011–2022); registered vehicles; driver permits; injury data | CSV, PDF | Annual updates. The authoritative post-2021 collision source |
| **MTMD** (transport ministry) | Provincial road works in MTL region; bridges/structures; speed cameras; road drainage | CSV, GeoJSON, WFS | WFS service at ws.mapserver.transports.gouv.qc.ca |
| **MSSS** (health ministry) | Hospital stays (MED-ÉCHO); ER wait times; population by health territory; hospital permits | CSV, XLSX | Filterable to Montréal health regions |
| **ISQ** (statistics institute) | Population estimates/projections by municipality; economic indicators by region | CSV | Custom tables for Montréal available |
| **INSPQ** (public health) | Deprivation index; West Nile virus zones; environmental health indicators | CSV, PDF | Provincial but includes Montréal |
| **MELCCFP** (environment) | Water quality; air monitoring stations; climate change data; heat islands | CSV, GeoJSON | Complements city RSQA data |
| **Exo** (regional transit) | Commuter train GTFS + GTFS-RT; suburban bus GTFS; facility geospatial data | GTFS, GeoJSON, CSV | CC-BY 4.0 license |
| **Revenu Québec** | Tax statistics by region | CSV | Regional-level aggregates |
| **CMM** (metropolitan community) | Metropolitan-level geographic/planning data | SHP | Includes Montréal metro area |

---

## External real-time APIs not on the CKAN portal

These are the highest-value external data sources for Montreal integration projects:

### STM (transit) — registration required
- **GTFS Static**: `stm.info/sites/default/files/gtfs/gtfs_stm.zip` — bus/metro schedules
- **GTFS-RT v2**: Vehicle Positions, Trip Updates, Alerts, Bus Occupancy — Protocol Buffers format
- **Developer portal**: stm.info/en/about/developers (API key required via dev@stm.info)
- **Update frequency**: Static periodic (~monthly); Real-time continuous (seconds)

### BIXI (bike-share) — open, no registration
- **GBFS Feed**: `api-core.bixi.com/gbfs/gbfs.json` (newer) or `gbfs.velobixi.com/gbfs/gbfs.json` (legacy)
- **Content**: Station locations, bike/dock availability (classic + e-bikes), station status
- **Historical trips**: Annual ZIP downloads at bixi.com/en/open-data/ (2014–present)
- **Update frequency**: Real-time (~30 sec refresh)

### Hydro-Québec (power outages) — open, no registration
- **Current outages**: 3-step REST — (1) version: `pannes.hydroquebec.com/pannes/donnees/v3_0/bisversion.json` → (2) markers: `pannes.hydroquebec.com/pannes/donnees/v3_0/bismarkers{VERSION}.json` → (3) KMZ spatial data
- **Planned interruptions**: Similar pattern with AIP version + KMZ polygons
- **Additional**: OpenDataSoft platform at donnees.hydroquebec.com (consumption, GHG data)
- **Update frequency**: ~10 minutes for outage updates

### Environment Canada (weather + air quality) — open, no registration
- **GeoMet OGC API**: `api.weather.gc.ca/` — thousands of weather/climate datasets via OGC standards
- **MSC Datamart**: `dd.weather.gc.ca/` — raw file downloads (XML, GRIB2, NetCDF)
- **Montreal weather**: City page XML for station s0000635
- **Air quality**: AQHI via OGC API; RAQDPS predictions
- **Radar**: Weather radar for Montreal region
- **Historical climate**: Hourly/daily/monthly CSV by station
- **Formats**: XML, JSON, GeoJSON, GRIB2, WMS, WFS, WCS
- **Python library**: `env-canada` on PyPI

### Exo (regional transit) — registration required
- **GTFS-RT**: `opendata.exo.quebec/ServiceGTFSR/VehiclePosition.pb` (+ TripUpdate.pb, Alert.pb)
- **GTFS Static**: Multiple feeds for commuter trains + ~15 suburban bus networks
- **Access**: Token-based auth via access request form

### Ville de Montréal — Contrats et subventions REST API
- **Base URL**: `ville.montreal.qc.ca/vuesurlescontrats/api/`
- **Endpoints**: `releases.json` with params: `date_gt`, `date_lt`, `value_gt`, `value_lt`, `type` (contrat/subvention), `procuring_entity`, `activity`, `format` (json/xlsx/csv), `limit`, `offset`
- **Content**: All contracts and grants awarded by council, executive committee, boroughs, delegated authorities
- **Open API, no registration**, monthly updates

### Info-Neige (snow removal) — open, no registration
- **URL**: `servicesenligne2.ville.montreal.qc.ca/api/infoneige/InfoneigeWebService`
- **Content**: Real-time snow removal progress by sector
- **Format**: SOAP/XML

### Québec 511 (provincial road network)
- **URL**: quebec511.info
- **WFS Service**: `ws.mapserver.transports.gouv.qc.ca/swtq` — road conditions, highway closures, construction
- **Formats**: CSV, GeoJSON, GPKG, WMS, WFS

### ARTM (regional transit authority)
- **Enquête Perspectives Mobilité 2023**: Major mobility survey data available to researchers via Portail données mobilité
- **Central platform**: Announced but not yet deployed; transit data available via individual operators (STM, RTL, STL, Exo)

### Sources with NO public API (potential future integration)

| Source | Status | Notes |
|---|---|---|
| **Communauto** (car-sharing) | No public API or GBFS feed | ~2,000+ vehicles; data only via app |
| **Aéroports de Montréal** (ADM) | No open data API | Flight info on website only; FlightAware (commercial) alternative |
| **Port de Montréal** | No open data API | Annual reports only; MarineTraffic AIS (commercial) for vessel tracking |

---

## How to get the definitive machine-readable list

The most efficient path to a complete, structured inventory of all 396 datasets with full metadata is to download the city's own **master CSV file**:

**CSV with all open datasets and attributes** (dates, formats, modification timestamps):
`https://donnees.montreal.ca/dataset/dc7aca8a-9c11-419b-8094-f0d6f359fdc0/resource/bcc0b608-2d54-4746-88b6-521023524f6e/download/do.csv`

**Full data inventory** (includes datasets not yet published, with status and limitations):
`https://donnees.montreal.ca/dataset/ecd2af68-731c-4896-be5f-55e58adaad0e/resource/634b2c58-a7a6-470e-8c97-a38d0d5e7fdd/download/inventaire-des-ensembles-de-donnees-de-la-ville-de-montreal.csv`

For programmatic access with full metadata (update_frequency, datastore_active, temporal coverage), use the CKAN API:
```
curl "https://donneesquebec.ca/recherche/api/3/action/package_search?q=organization:ville-de-montreal&rows=100&start=0"
```
Paginate with `start=100`, `start=200`, `start=300` to capture all ~382 Ville de Montréal datasets. The `datastore_active` boolean lives on each resource object within `resources[]`, and `update_frequency` is a top-level package field.

---

## What this inventory reveals

This exhaustive catalog documents **396 portal datasets plus 14+ external APIs**, covering everything from real-time air quality readings and GPS-traced bike trips to 1925 aerial photographs and bed bug extermination reports. The strongest data density sits in **infrastructure** (95 datasets with granular GIS layers for every sewer manhole and sidewalk segment), **government finance** (115 datasets tracking every contract above $2,000), and **environment** (87 datasets spanning tree canopy, heat islands, water quality, and GHG emissions). The portal's CSV and GeoJSON dominance means most datasets are immediately usable in Python, R, or any GIS tool without format conversion. The **CKAN API** provides structured access to all metadata, while the city's own master CSV files offer the simplest path to a complete, current inventory. Combined with external feeds from STM, BIXI, Hydro-Québec, and Environment Canada, Montréal offers one of the most data-rich municipal ecosystems for analysis, application development, and urban research.