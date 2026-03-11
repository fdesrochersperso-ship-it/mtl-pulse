# Tourisme, sports et loisirs
# Tourism, Sports and Recreation

> Generated: 2026-03-10 08:09
> Datasets: 20

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 7 | Excellent |
| **B** | 5 | Good |
| **C** | 1 | Usable |
| **D** | 0 | Sparse |
| **F** | 7 | Unusable |
| | **20** | (13 usable in report builder) |

---

## Datasets

- **[A]** [Programmes et subventions destinés à la population et aux organismes](#vmtl-programmes-subventions-destines-population) [RB]
- **[A]** [Programmation de sports et loisirs disponible via Loisirs Montréal](#vmtl-programmation-sports-loisirs-montreal) [RB]
- **[A]** [Événements publics](#vmtl-evenements-publics) [RB]
- **[A]** [Installations récréatives, sportives et culturelles extérieures](#vmtl-installations-recreatives-sportives-et-culturelles) [RB]
- **[A]** [Cyclovias - Calendrier des activités](#vmtl-cyclovias) [RB]
- **[A]** [Organismes ayant reconnaissance PANAM](#vmtl-reconnaissance-panam) [RB]
- **[A]** [Piscines municipales](#vmtl-piscines-municipales) [RB]
- **[B]** [Patinoires – historique des conditions](#vmtl-patinoires-historique) [RB]
- **[B]** [Parcours riverain](#vmtl-parcours-riverain) [RB]
- **[B]** [Lieux d'intérêt](#vmtl-lieux-d-interet) [RB]
- **[B]** [Ruelles vertes](#vmtl-ruelles-vertes) [RB]
- **[B]** [Rues piétonnes et partagées](#vmtl-rues-pietonnes) [RB]
- **[C]** [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique) [RB]
- **[F]** [Conditions des glissades (sites hivernaux)](#vmtl-sites-hiver)
- **[F]** [Conditions des patinoires (sites hivernaux)](#vmtl-patinoires)
- **[F]** [Conditions de ski et sentiers ainsi que les grands parcs (sites hivernaux)](#vmtl-conditions-ski)
- **[F]** [Portrait des camps de jour municipaux 2013](#vmtl-portrait-camps-de-jour2013)
- **[F]** [Immeubles faisant l'objet d'un énoncé d'intérêt patrimonial](#vmtl-immeubles-faisant-l-objet-d-un-enonce-d-interet-patrimonial)
- **[F]** [Promenade Fleuve-Montagne](#vmtl-promenade-fleuve-montagne)
- **[F]** [Activités saisonnières dans les 19 grands parcs de Montréal](#vmtl-grands-parcs-activites)

---

## Cyclovias - Calendrier des activités
### Cyclovias Calendrier Des Activits

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-cyclovias` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | annual |
| **Total Records** | 118 |
| **Temporal Range** | 2021-06-20 to 2025-09-07 |
| **Formats** | CSV |

> Cyclovia est avant tout un événement rassembleur, gratuit et récurrent permettant aux usagers de se promener en vélo, en patins ou à pied. Il s'agit d'un ensemble d'activités durant lesquelles les rues sont fermées à la circulation automobile au profit des cyclistes. Cet ensemble de données contient

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `TITRE` | Title | category | dimension | G | 0.0% |
| 2 | `DATE` | Date | date | date | G | 0.0% |
| 3 | `ARRONDISSEMENT_ORGANISATION` | Borough Organisation | category | dimension | G | 0.0% |
| 4 | `PARCOURS_KM` | Parcours Km | numeric | dimension | G | 0.0% |
| 5 | `TYPE_CYCLOVIA` | Type Cyclovia | category | dimension | G | 0.0% |

**Dimensions** (4): `TITRE`, `ARRONDISSEMENT_ORGANISATION`, `PARCOURS_KM`, `TYPE_CYCLOVIA`

**Date fields** (1): `DATE`

**Join opportunities:** temporal join via date fields

---

## Installations récréatives, sportives et culturelles extérieures
### Facilities Rcratives sports Et Culturelles Extrieures

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-installations-recreatives-sportives-et-culturelles` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | irregular |
| **Total Records** | 51,050 |
| **Formats** | JSON, CSV, ZIP |

> La Ville de Montréal propose sur son territoire une multitude d'installations récréatives, sportives et culturelles. Elle répertorie plus de 3 396 installations extérieures, dont 77 piscines, 95 pataugeoires, 150 jeux d'eau et près de 3 000 plateaux et aires de jeux.
  
Le Plan directeur du sport 

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `{` | { | text | filter | G | 0.0% |

---

## Organismes ayant reconnaissance PANAM
### Organismes Ayant Reconnaissance Panam

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-reconnaissance-panam` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | annual |
| **Total Records** | 331 |
| **Formats** | CSV |

> Cet ensemble présente la liste des organismes reconnus dans le cadre du programme PANAM. Un organisme reconnu PANAM (pan-montréalais) est un organisme montréalais à but non lucratif en sport, loisir ou culture desservant des citoyens ayant une déficience, un handicap ou une limitation fonctionnelle 

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `annee` | Year | text | filter | G | 0.0% |
| 2 | `organisme` | Organization | text | filter | G | 0.0% |
| 3 | `site_internet` | Site Internet | text | filter | G | 0.0% |

---

## Piscines municipales
### Pools Municipales

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-piscines-municipales` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Ville de Montréal |
| **Update Frequency** | irregular |
| **Total Records** | 311 |
| **Formats** | JSON, SHP, CSV, KML |

> Liste des piscines municipales avec des données de géolocalisation et le type d'équipement (piscine, pataugeoire, jets d'eau).

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_UEV` | Identifier | numeric | filter | G | 0.0% |
| 2 | `TYPE` | Type | category | dimension | G | 0.0% |
| 3 | `NOM` | Name | text | filter | G | 0.0% |
| 4 | `ARRONDISSE` | Arrondisse | category | dimension | G | 0.0% |
| 5 | `ADRESSE` | Address | text | filter | G | 0.6% |
| 6 | `PROPRIETE` | Propriete | category | dimension | G | 8.4% |
| 7 | `GESTION` | Gestion | category | dimension | G | 8.4% |
| 8 | `POINT_X` | X coordinate (MTM) | numeric | measure | G | 0.0% |
| 9 | `POINT_Y` | Y coordinate (MTM) | numeric | measure | G | 0.0% |
| 10 | `EQUIPEME` | Equipeme | category | dimension | P | 89.4% |
| 11 | `LONG` | Longitude | geo_longitude | geo | G | 0.0% |
| 12 | `LAT` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (5): `TYPE`, `ARRONDISSE`, `PROPRIETE`, `GESTION`, `EQUIPEME`

**Measures** (2): `POINT_X`, `POINT_Y`

**Geo fields** (2): `LONG`, `LAT`

**Join opportunities:** spatial join via lat/long coordinates

---

## Programmation de sports et loisirs disponible via Loisirs Montréal
### Programmation De Sports Et Loisirs Disponible Via Loisirs Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-programmation-sports-loisirs-montreal` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | daily |
| **Total Records** | 119,114 |
| **Temporal Range** | 2017-09-01 to 2022-12-18 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | JSON, GEOJSON, CSV |

> Les données de Loisirs Montréal comportent l'ensemble des activités de sports et loisirs offertes sur le territoire de la ville de Montréal via Loisirs Montréal. Ces données comportent les noms, les dates et les heures des activités, les espaces réservables, les sites de programmations ainsi que les

**Warnings:**
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id_activite` | ID Activity | numeric | exclude | G | 0.0% |
| 2 | `municipalite` | Municipalite | category | dimension | G | 0.0% |
| 3 | `categorie` | Category | category | dimension | G | 0.0% |
| 4 | `sous_categorie` | Subcategory | category | dimension | G | 0.0% |
| 5 | `nom` | Name | text | dimension | G | 0.0% |
| 6 | `description` | Description | text | filter | G | 0.0% |
| 7 | `promoteur` | Promoteur | text | filter | G | 0.0% |
| 8 | `telephone_promoteur` | Telephone Promoteur | numeric | measure | U | 11.6% |
| 9 | `est_inscription_obligatoire` | Est Inscription Obligatoire | category | dimension | G | 0.0% |
| 10 | `est_annulee` | Est Annulee | category | dimension | G | 0.0% |
| 11 | `raison_annulation` | Raison Annulation | numeric | exclude | E | 98.2% |
| 12 | `nb_maximum_places` | Count Maximum Places | numeric | dimension | P | 54.5% |
| 13 | `age_minimum` | Age Minimum | numeric | dimension | G | 1.0% |
| 14 | `age_maximum` | X coordinate (MTM) | numeric | dimension | P | 82.1% |
| 15 | `est_credit_impot_offert` | Est Credit Impot Offert | category | dimension | G | 0.0% |
| 16 | `informations_additionnelles` | Informations Additionnelles | text | filter | P | 58.2% |
| 17 | `date_debut` | Start date | date | date | G | 0.0% |
| 18 | `date_fin` | Date End | date | date | G | 0.0% |
| 19 | `groupe` | Group | numeric | measure | G | 0.0% |
| 20 | `id_seance` | Identifier | numeric | exclude | G | 0.0% |
| 21 | `site_seance` | Site Seance | text | filter | G | 0.2% |
| 22 | `adresse_site_seance` | Address Site Seance | text | filter | G | 0.0% |
| 23 | `telephone_site_seance` | Telephone Site Seance | numeric | measure | G | 4.4% |
| 24 | `installation_principale_seance` | Installation Principale Seance | text | filter | G | 0.0% |
| 25 | `heure_debut_seance` | Hour Start Seance | text | filter | G | 0.0% |
| 26 | `heure_fin_seance` | Hour End Seance | text | filter | G | 0.0% |
| 27 | `jour_semaine_seance` | Day Semaine Seance | text | filter | G | 0.0% |
| 28 | `latitude` | Latitude | geo_latitude | geo | G | 0.0% |
| 29 | `longitude` | Longitude | geo_longitude | geo | G | 0.0% |
| 30 | `loc_x` | X coordinate (MTM) (loc_x) | numeric | measure | G | 0.0% |
| 31 | `loc_y` | Y coordinate (MTM) | numeric | measure | G | 0.0% |

**Dimensions** (10): `municipalite`, `categorie`, `sous_categorie`, `nom`, `est_inscription_obligatoire`, `est_annulee`, `nb_maximum_places`, `age_minimum`, `age_maximum`, `est_credit_impot_offert`

**Measures** (5): `telephone_promoteur`, `groupe`, `telephone_site_seance`, `loc_x`, `loc_y`

**Date fields** (2): `date_debut`, `date_fin`

**Geo fields** (2): `latitude`, `longitude`

**Join opportunities:** spatial join via lat/long coordinates; temporal join via date fields

---

## Programmes et subventions destinés à la population et aux organismes
### Programmes Et grants Destins La population Et Aux Organismes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-programmes-subventions-destines-population` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | daily |
| **Total Records** | 187 |
| **Temporal Range** | 2019-11-19 to 2026-02-20 |
| **Formats** | CSV |

> La Ville de Montréal offre une multitude de programmes destinés à la population montréalaise et aux organismes établis sur le territoire. Cet ensemble de données permet de consulter la liste des programmes telle que publiée sur [le site web de la Ville de Montréal](https://montreal.ca/recherche?dc_t

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `titre` | Title | identifier | exclude | G | 0.0% |
| 2 | `url_fiche` | URL | identifier | exclude | G | 0.0% |
| 3 | `service_publieur` | Service Publieur | category | dimension | G | 0.0% |
| 4 | `date_cree` | Date Cree | date | date | G | 0.0% |
| 5 | `type` | Type | category | dimension | G | 0.0% |
| 6 | `statut` | Status | category | dimension | P | 77.5% |

**Dimensions** (3): `service_publieur`, `type`, `statut`

**Date fields** (1): `date_cree`

**Join opportunities:** temporal join via date fields

---

## Événements publics
### Vnements public

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-evenements-publics` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | daily |
| **Total Records** | 5,219 |
| **Temporal Range** | 2024-05-02 to 2030-04-30 |
| **Formats** | GEOJSON, SHP, CSV |

> Le présent ensemble de données contient les événements publics de la Ville de Montréal tels que diffusés sur [le calendrier de la Ville](https://montreal.ca/calendrier). Les données permettent de connaître les caractéristiques principales de l'événement, notamment la date, le type d'événement (p. ex

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `titre` | Title | text | filter | G | 0.0% |
| 2 | `url_fiche` | URL | identifier | exclude | G | 0.0% |
| 3 | `description` | Description | text | filter | G | 0.0% |
| 4 | `date_debut` | Start date | date | date | G | 0.0% |
| 5 | `date_fin` | Date End | date | date | G | 0.0% |
| 6 | `type_evenement` | Event | text | dimension | G | 0.0% |
| 7 | `public_cible` | Public Cible | category | dimension | G | 0.0% |
| 8 | `emplacement` | Emplacement | category | dimension | G | 0.0% |
| 9 | `inscription` | Inscription | category | dimension | G | 0.0% |
| 10 | `cout` | Cost | category | dimension | G | 0.0% |
| 11 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 12 | `titre_adresse` | Titre Address | text | filter | G | 0.0% |
| 13 | `adresse_principale` | Address Principale | text | filter | G | 0.0% |
| 14 | `adresse_secondaire` | Address Secondaire | category | dimension | G | 5.1% |
| 15 | `code_postal` | Postal code | text | dimension | G | 0.0% |
| 16 | `lat` | Latitude | geo_latitude | geo | G | 2.9% |
| 17 | `long` | Longitude | geo_longitude | geo | G | 2.9% |
| 18 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 2.9% |
| 19 | `Y` | Y coordinate (MTM) | geo_latitude | geo | G | 2.9% |

**Dimensions** (8): `type_evenement`, `public_cible`, `emplacement`, `inscription`, `cout`, `arrondissement`, `adresse_secondaire`, `code_postal`

**Date fields** (2): `date_debut`, `date_fin`

**Geo fields** (4): `lat`, `long`, `X`, `Y`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates; temporal join via date fields

---

## Lieux d'intérêt
### Lieux D Intrt

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-lieux-d-interet` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | notPlanned |
| **Total Records** | 3,231 |
| **Formats** | SHP, GEOJSON, WEB, CSV |

> Cet ensemble de données présente les lieux d'intérêt de la Ville de Montréal selon la classification effectuée dans le cadre de l'initiative Montréal à pied (MàP) en 2020. Le projet Montréal à Pied vise à améliorer l'orientation et le cheminement piéton sur l'ensemble du territoire montréalais.

B

**Warnings:**
- Location rounded to nearest intersection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `Famille` | Famille | category | dimension | G | 0.0% |
| 3 | `Catégorie` | Catégorie | category | dimension | G | 0.0% |
| 4 | `Nom français` | Name Fran Ais | identifier | exclude | G | 0.0% |
| 5 | `Nom court` | Name Court | text | filter | P | 89.2% |
| 6 | `Type` | Type | text | filter | G | 0.0% |
| 7 | `Numéro` | Number | numeric | measure | U | 41.1% |
| 8 | `rue` | Street | text | filter | U | 36.5% |
| 9 | `Étage` | Étage | numeric | dimension | G | 0.0% |
| 10 | `Bureau` | Bureau | numeric | exclude | E | 98.3% |
| 11 | `Ville` | City | category | dimension | G | 0.0% |
| 12 | `Code postal` | Postal code | text | filter | U | 17.9% |
| 13 | `Arrondissement` | Borough | category | dimension | G | 0.0% |
| 14 | `Classification` | Classification | category | dimension | G | 0.0% |
| 15 | `Longitude` | Longitude | geo_longitude | geo | G | 0.0% |
| 16 | `Latitude` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (6): `Famille`, `Catégorie`, `Étage`, `Ville`, `Arrondissement`, `Classification`

**Measures** (1): `Numéro`

**Geo fields** (2): `Longitude`, `Latitude`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates

---

## Parcours riverain
### Parcours Riverain

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-parcours-riverain` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 1,177 |
| **Formats** | GEOJSON, WEB, CSV, KML |

> Le Parcours riverain est formé des chemins anciens longeant le Saint-Laurent, le lac Saint-Louis, le lac des Deux Montagnes, la rivière des Prairies, le canal de Lachine et le canal de l’Aqueduc. Long de 180 kilomètres, il est ponctué de plus de 1000 éléments patrimoniaux qui évoquent les grandes pa

**Warnings:**
- Archived data - no longer updated

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `iddepoint` | Identifier | numeric | measure | G | 0.0% |
| 2 | `territoire` | Territory | category | dimension | G | 0.0% |
| 3 | `typeattrait` | Typeattrait | category | dimension | G | 0.0% |
| 4 | `titre` | Title | text | filter | U | 23.7% |
| 5 | `theme` | Theme | category | dimension | G | 0.0% |
| 6 | `description` | Description | identifier | exclude | G | 1.9% |
| 7 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 8 | `accessibilityofelement` | Y coordinate (MTM) | category | dimension | G | 0.0% |
| 9 | `adresse_autresinformations` | Address Autresinformations | identifier | exclude | G | 1.9% |
| 10 | `annee` | Year | text | filter | U | 25.1% |
| 11 | `presencepanneauinterpretation` | Presencepanneauinterpretation | category | dimension | G | 0.0% |
| 12 | `lienimage` | Image | identifier | exclude | G | 5.4% |
| 13 | `liens` | Liens | text | filter | P | 61.2% |
| 14 | `adresse` | Address | text | filter | G | 0.0% |
| 15 | `urlimage` | Image (urlimage) | identifier | exclude | G | 5.7% |
| 16 | `latitude` | Latitude | geo_latitude | geo | G | 6.6% |
| 17 | `longitude` | Longitude | geo_longitude | geo | G | 6.6% |
| 18 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 6.6% |
| 19 | `Y` | Y coordinate (MTM) (Y) | geo_latitude | geo | G | 6.6% |
| 20 | `type_geometrie` | Geometry | category | dimension | G | 0.0% |

**Dimensions** (7): `territoire`, `typeattrait`, `theme`, `arrondissement`, `accessibilityofelement`, `presencepanneauinterpretation`, `type_geometrie`

**Measures** (1): `iddepoint`

**Geo fields** (4): `latitude`, `longitude`, `X`, `Y`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates

---

## Patinoires – historique des conditions
### Skating rinks historical Des Conditions

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-patinoires-historique` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Ville de Montréal |
| **Update Frequency** | daily |
| **Total Records** | 355,167 |
| **Temporal Range** | 2001-12-21 13:52:08 to 2018-01-27 19:00:00 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | XML, CSV |

> Historique des conditions des patinoires extérieures depuis 2002.

Progressivement depuis l’hiver 2001-2002, les données sur les conditions de patinoires ont été consignées par des contremaîtres en arrondissements. Jusqu’à l’hiver 2010-2011, seuls les arrondissements correspondants à la délimitati

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ARRONDISSEMENT` | Borough | category | dimension | G | 0.0% |
| 2 | `PATINOIRE` | Patinoire | category | dimension | G | 0.0% |
| 3 | `DATE_TRS` | Date Trs | date | date | G | 0.0% |
| 4 | `OUVERT` | Ouvert | numeric | dimension | U | 37.7% |
| 5 | `DEBLAYE` | Y coordinate (MTM) | numeric | dimension | G | 0.0% |
| 6 | `ARROSE` | Borough (ARROSE) | numeric | dimension | G | 0.0% |
| 7 | `RESURFACE` | Surface area | numeric | dimension | G | 0.0% |

**Dimensions** (6): `ARRONDISSEMENT`, `PATINOIRE`, `OUVERT`, `DEBLAYE`, `ARROSE`, `RESURFACE`

**Date fields** (1): `DATE_TRS`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Ruelles vertes
### Laneways green

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-ruelles-vertes` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Arrondissements |
| **Update Frequency** | annual |
| **Total Records** | 1,262 |
| **Temporal Range** | 1980-08-01 to 2023-07-01 |
| **Formats** | SHP, GEOJSON, CSV |

> La Ville de Montréal a recensé 350 ruelles vertes en 2019. Une ruelle verte est une ruelle qui a été réaménagée par les résidents, avec l'assistance d'un arrondissement ou d'un éco-quartier. Le réaménagement d'une ruelle peut apporter des changements à la circulation automobile : fermeture complète,

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_TRC` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `PROPRIETAIRE_REF` | Owner Ref | category | dimension | G | 0.0% |
| 3 | `CODE_ARR` | Code Borough | category | dimension | G | 0.0% |
| 4 | `FORME` | Forme | category | dimension | G | 0.1% |
| 5 | `RUELLE_ID` | Ruelle ID | text | filter | G | 0.0% |
| 6 | `DATE_AMENAGEMENT` | Date Amenagement | date | date | G | 1.1% |
| 7 | `DATE_BONIFICATION` | Date Bonification | date | date | P | 85.7% |
| 8 | `CIRCULATION` | Circulation | category | dimension | G | 0.1% |
| 9 | `TYPE_AMENAGEMENT` | Type Amenagement | category | dimension | U | 12.0% |
| 10 | `TYPE_RECOUVREMENT` | Type Recouvrement | category | dimension | G | 0.1% |
| 11 | `SUPERFICIE_RUELLE_M2` | Area Ruelle M2 | numeric | measure | G | 0.0% |
| 12 | `SUPERFICIE_VERDISSEMENT_M2` | Area Verdissement M2 | numeric | measure | P | 55.2% |
| 13 | `NUMERO_DE_RESOLUTION` | No. De Resolution | category | exclude | E | 99.8% |
| 14 | `DATE_MAJ` | Date Maj | date | date | G | 0.0% |

**Dimensions** (6): `PROPRIETAIRE_REF`, `CODE_ARR`, `FORME`, `CIRCULATION`, `TYPE_AMENAGEMENT`, `TYPE_RECOUVREMENT`

**Measures** (2): `SUPERFICIE_RUELLE_M2`, `SUPERFICIE_VERDISSEMENT_M2`

**Date fields** (3): `DATE_AMENAGEMENT`, `DATE_BONIFICATION`, `DATE_MAJ`

**Join opportunities:** temporal join via date fields

---

## Rues piétonnes et partagées
### Rues Pitonnes Et Partages

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-rues-pietonnes` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité / Arrondissements |
| **Update Frequency** | irregular |
| **Total Records** | 53 |
| **Formats** | GEOJSON, SHP, CSV, KML |

> Liste des rues piétonnes à Montréal, incluant leurs coordonnées géographiques et plusieurs éléments descriptifs des projets. On y retrouve entre autres les projets faisant partie du Programme de rues piétonnes et partagées de la Ville de Montréal.

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_PROJET` | Project | identifier | exclude | G | 0.0% |
| 2 | `TYPE_AXE` | Type Axe | category | dimension | G | 0.0% |
| 3 | `TOPONYME` | Y coordinate (MTM) | identifier | exclude | G | 0.0% |
| 4 | `NOM_PROJET` | Project (NOM_PROJET) | identifier | exclude | G | 0.0% |
| 5 | `DATE_OUVERTURE` | Date Ouverture | text | filter | P | 56.6% |
| 6 | `ANNEE_IMPLANTATION_1` | Year Implantation 1 | text | filter | U | 22.6% |
| 7 | `ANNEE_IMPLANTATION_2` | Year Implantation 2 | text | filter | P | 79.2% |
| 8 | `ARRONDISSEMENT` | Borough | category | dimension | G | 0.0% |
| 9 | `HIERARCHIE_ROUTIERE` | Hierarchie Routiere | category | dimension | G | 0.0% |
| 10 | `VOIE_CYCLABLE` | Y coordinate (MTM) (VOIE_CYCLABLE) | category | dimension | G | 0.0% |
| 11 | `VOIE_CYCLABLE_AXES_ADJACENTS` | X coordinate (MTM) | category | dimension | G | 0.0% |
| 12 | `PASSAGE_BUS` | Passage Bus | category | dimension | G | 0.0% |
| 13 | `PASSAGE_BUS_AXES_ADJACENTS` | X coordinate (MTM) (PASSAGE_BUS_AXES_ADJACENTS) | category | dimension | G | 0.0% |
| 14 | `TYPE_SITE_INTERVENTION` | Intervention | category | dimension | G | 0.0% |
| 15 | `TYPE_REPARTAGE` | Type Repartage | category | dimension | G | 3.8% |
| 16 | `MODE_IMPLANTATION` | Mode Implantation | category | dimension | G | 0.0% |
| 17 | `PROGRAMME` | Program | category | dimension | G | 0.0% |
| 18 | `LIMITES_1` | Limites 1 | identifier | exclude | G | 0.0% |
| 19 | `LIMITES_2` | Limites 2 | identifier | exclude | G | 0.0% |
| 20 | `LONGUEUR_TRONCON` | Length Troncon | numeric | measure | G | 0.0% |
| 21 | `PHOTO` | Photo | text | filter | U | 22.6% |
| 22 | `CREDIT_PHOTO` | Photo (CREDIT_PHOTO) | category | dimension | U | 22.6% |
| 23 | `OBJECTIF_THEMATIQUE` | Objectif Thematique | text | dimension | U | 24.5% |
| 24 | `ATTRAIT` | Attrait | text | filter | U | 22.6% |
| 25 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |
| 26 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |
| 27 | `X` | X coordinate (MTM) (X) | geo_longitude | geo | G | 0.0% |
| 28 | `Y` | Y coordinate (MTM) (Y) | geo_latitude | geo | G | 0.0% |

**Dimensions** (13): `TYPE_AXE`, `ARRONDISSEMENT`, `HIERARCHIE_ROUTIERE`, `VOIE_CYCLABLE`, `VOIE_CYCLABLE_AXES_ADJACENTS`, `PASSAGE_BUS`, `PASSAGE_BUS_AXES_ADJACENTS`, `TYPE_SITE_INTERVENTION`, `TYPE_REPARTAGE`, `MODE_IMPLANTATION`, `PROGRAMME`, `CREDIT_PHOTO`, `OBJECTIF_THEMATIQUE`

**Measures** (1): `LONGUEUR_TRONCON`

**Geo fields** (4): `LATITUDE`, `LONGITUDE`, `X`, `Y`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates; temporal join via date fields

---

## Lieux et bâtiments à vocation publique
### Lieux Et Btiments Vocation Publique

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-lieux-batiments-vocation-publique` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | daily |
| **Total Records** | 2,602 |
| **Temporal Range** | 2019-07-18 to 2026-02-02 |
| **Formats** | GEOJSON, SHP, CSV |

> Cet ensemble présente les lieux et bâtiments à vocation publique et leurs principaux attributs tels que leurs adresses et horaires ainsi que la disponibilité d'installations et de commodités, notamment en matière de services en accessibilité universelle.

**Warnings:**
- Location rounded to nearest intersection
- Data potentially incomplete
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `titre_lieu` | Title | identifier | exclude | G | 0.0% |
| 2 | `url_fiche` | URL | identifier | exclude | G | 0.0% |
| 3 | `description` | Description | text | filter | G | 5.9% |
| 4 | `date_cree` | Date Cree | date | date | G | 0.0% |
| 5 | `date_revision` | Date Revision | date | date | G | 0.0% |
| 6 | `arrondissements` | Arrondissements | text | dimension | G | 0.0% |
| 7 | `types` | Types | category | dimension | G | 1.1% |
| 8 | `installations` | Installations | text | filter | G | 0.0% |
| 9 | `activites` | Activites | text | filter | U | 41.0% |
| 10 | `commodites` | Commodites | text | filter | P | 58.1% |
| 11 | `accessibilite` | Accessibilite | text | filter | P | 69.5% |
| 12 | `categories` | Categories | category | dimension | G | 0.0% |
| 13 | `statut_ouverture` | Status Ouverture | category | dimension | P | 70.2% |
| 14 | `horaire_par_jour` | Horaire Par Day | text | filter | U | 26.3% |
| 15 | `commentaires_horaire` | Commentaires Horaire | text | filter | P | 79.1% |
| 16 | `reglementation` | Reglementation | text | filter | P | 89.0% |
| 17 | `paiement` | Paiement | category | exclude | E | 95.3% |
| 18 | `telephone` | Telephone | text | filter | P | 80.0% |
| 19 | `courriel` | Courriel | text | exclude | E | 92.0% |
| 20 | `titre_lieu_adresse_postale` | Titre Lieu Address Postale | identifier | exclude | G | 0.0% |
| 21 | `adresse_principale` | Address Principale | text | filter | G | 0.0% |
| 22 | `adresse_secondaire` | Address Secondaire | text | exclude | E | 97.3% |
| 23 | `code_postal` | Postal code | text | filter | U | 16.0% |
| 24 | `ville` | City | category | dimension | G | 0.0% |
| 25 | `long` | Longitude | geo_longitude | geo | G | 0.1% |
| 26 | `lat` | Latitude | geo_latitude | geo | G | 0.1% |
| 27 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 0.1% |
| 28 | `Y` | Y coordinate (MTM) | geo_latitude | geo | G | 0.1% |

**Dimensions** (5): `arrondissements`, `types`, `categories`, `statut_ouverture`, `ville`

**Date fields** (2): `date_cree`, `date_revision`

**Geo fields** (4): `long`, `lat`, `X`, `Y`

**Join opportunities:** spatial join via lat/long coordinates; temporal join via date fields

---

## Activités saisonnières dans les 19 grands parcs de Montréal
### Activits Saisonnires Dans Les 19 Grands parks De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-grands-parcs-activites` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | XML |

> Cet ensemble contient les activités saisonnières dans les 19 grands parcs de Montréal.

**Warnings:**
- No DataStore resource (API not available)

---

## Conditions de ski et sentiers ainsi que les grands parcs (sites hivernaux)
### Conditions De Ski Et Sentiers Ainsi Que Les Grands parks Sites Hivernaux

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-conditions-ski` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Sonia Beauchemin |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | HTML |

> Informations sur les conditions de ski sur le territoire montréalais y compris les grands parcs.  Ces informations sont tirées du [site web des conditions des sites hivernaux](https://montreal.ca/services/conditions-des-sites-hivernaux) pour les arrondissements de Montréal qui y participe.

Les co

---

## Conditions des glissades (sites hivernaux)
### Conditions Des Glissades Sites Hivernaux

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-sites-hiver` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | HTML |

> Informations sur les conditions des glissades sur le territoire montréalais. Ces informations sont tirées du [site web des conditions des sites hivernaux](https://montreal.ca/services/conditions-des-sites-hivernaux) pour les arrondissements de Montréal qui y participe. D'autres informations sur les 

---

## Conditions des patinoires (sites hivernaux)
### Conditions Des skating rinks Sites Hivernaux

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-patinoires` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | HTML |

> Informations sur les conditions des patinoires et arénas sur le territoire montréalais.  Ces informations sont tirées du [site web des conditions des sites hivernaux](https://montreal.ca/services/conditions-des-sites-hivernaux) auquel la majorité des arrondissements de Montréal participe. D'autres i

---

## Immeubles faisant l'objet d'un énoncé d'intérêt patrimonial
### Immeubles Faisant L Objet D Un Nonc D Intrt Patrimonial

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-immeubles-faisant-l-objet-d-un-enonce-d-interet-patrimonial` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | asNeeded |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Localisation approximative de lieux ayant fait l'objet d'un énoncé de l'intérêt patrimonial après 2012.

L'énoncé de l'intérêt patrimonial est un document réalisé par la Division du patrimoine de la Ville de Montréal qui expose les différentes valeurs (historique, symbolique, artistique, sociale, 

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---

## Portrait des camps de jour municipaux 2013
### Profile Des Camps De Jour municipal 2013

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-portrait-camps-de-jour2013` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | notPlanned |
| **Total Records** | 97 |
| **Formats** | CSV |

> Statistiques sur le fonctionnement, la fréquentation et le personnel des camps de jours, par arrondissement.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `1.1` | 1.1 | all_null | exclude | E | 100.0% |
| 2 | `Arrondissement` | Borough | text | filter | U | 14.4% |
| 3 | `Ahuntsic-Cartierville` | City | numeric | dimension | U | 43.3% |
| 4 | `Anjou` | Anjou | numeric | dimension | P | 56.7% |
| 5 | `Côte-des-Neiges-Notre-Dame-de-Grâce` | Te Des Neiges Notre Dame De Gr Ce | numeric | dimension | P | 59.8% |
| 6 | `Lachine` | Lachine | numeric | dimension | U | 40.2% |
| 7 | `Lasalle` | Lasalle | numeric | measure | U | 42.3% |
| 8 | `Plateau-Mont-Royal` | Plateau Mont Royal | numeric | dimension | U | 45.4% |
| 9 | `Sud-Ouest` | Sud Ouest | numeric | dimension | U | 45.4% |
| 10 | `L'Île-Bizard-Sainte-Geneviève` | L'Île Bizard Sainte Geneviève | numeric | dimension | P | 59.8% |
| 11 | `Mercier-Hochelaga-Maisonneuve` | Mercier Hochelaga Maisonneuve | numeric | measure | U | 49.5% |
| 12 | `Montréal-Nord` | Montr Al Nord | numeric | dimension | P | 64.9% |
| 13 | `Outremont` | Outremont | numeric | dimension | P | 63.9% |
| 14 | `Pierrefonds-Roxboro` | X coordinate (MTM) | numeric | dimension | P | 63.9% |
| 15 | `Rivière-des-Prairies-Pointe-aux-Trembles` | X coordinate (MTM) (Rivière-des-Prairies-Pointe-aux-Trembles) | numeric | dimension | P | 59.8% |
| 16 | `Rosemont-La-Petite-Patrie` | Rosemont La Petite Patrie | numeric | measure | P | 51.5% |
| 17 | `Saint-Laurent` | Saint Laurent | numeric | dimension | P | 53.6% |
| 18 | `Saint Léonard` | Saint Léonard | numeric | dimension | P | 55.7% |
| 19 | `Verdun` | Verdun | numeric | measure | U | 41.2% |
| 20 | `Ville-Marie` | City (Ville-Marie) | numeric | dimension | U | 44.3% |
| 21 | `Villeray-Saint-Michel-Parc-Extension` | City (Villeray-Saint-Michel-Parc-Extension) | numeric | measure | U | 44.3% |
| 22 | `Complexe Claude Robillard` | X coordinate (MTM) (Complexe Claude Robillard) | numeric | exclude | E | 99.0% |
| 23 | `Compilation` | Compilation | numeric | measure | U | 23.7% |

**Dimensions** (14): `Ahuntsic-Cartierville`, `Anjou`, `Côte-des-Neiges-Notre-Dame-de-Grâce`, `Lachine`, `Plateau-Mont-Royal`, `Sud-Ouest`, `L'Île-Bizard-Sainte-Geneviève`, `Montréal-Nord`, `Outremont`, `Pierrefonds-Roxboro`, `Rivière-des-Prairies-Pointe-aux-Trembles`, `Saint-Laurent`, `Saint Léonard`, `Ville-Marie`

**Measures** (6): `Lasalle`, `Mercier-Hochelaga-Maisonneuve`, `Rosemont-La-Petite-Patrie`, `Verdun`, `Villeray-Saint-Michel-Parc-Extension`, `Compilation`

**Join opportunities:** boroughs via arrondissement field

---

## Promenade Fleuve-Montagne
### Promenade river Montagne

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-promenade-fleuve-montagne` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | GEOJSON, SHP, CSV |

> La promenade Fleuve-Montagne est un parcours piétonnier de 3,8 km qui fait découvrir aux Montréalais et aux visiteurs des lieux emblématiques de Montréal. La promenade trace le lien piéton entre les deux icônes naturelles de Montréal, soit le fleuve Saint-Laurent au sud et le mont Royal au nord pour

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---
