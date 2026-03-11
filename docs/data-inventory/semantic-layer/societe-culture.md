# Societe et culture
# Society and Culture

> Generated: 2026-03-10 08:09
> Datasets: 29

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 4 | Excellent |
| **B** | 9 | Good |
| **C** | 5 | Usable |
| **D** | 1 | Sparse |
| **F** | 10 | Unusable |
| | **29** | (18 usable in report builder) |

---

## Datasets

- **[A]** [Programmes et subventions destinés à la population et aux organismes](#vmtl-programmes-subventions-destines-population) [RB]
- **[A]** [Événements publics](#vmtl-evenements-publics) [RB]
- **[A]** [Murales subventionnées](#vmtl-murales) [RB]
- **[A]** [Activités de la programmation du 375e (2017)](#vmtl-activites-programmation-375e) [RB]
- **[B]** [Répertoire historique des toponymes](#vmtl-toponymes) [RB]
- **[B]** [Parcours riverain](#vmtl-parcours-riverain) [RB]
- **[B]** [Récipiendaires du prix Paul-Buissonneau (archives)](#vmtl-recipiendaires-du-prix-paul-buissonneau) [RB]
- **[B]** [Les édifices patrimoniaux de Montréal](#vmtl-les-edifices-patrimoniaux-de-montreal) [RB]
- **[B]** [Coups de coeur et projets culturels de l'événement "Montréal engagée pour la culture"](#vmtl-coups-de-coeur-et-projets-culturels-de-l-evenement-montreal-engagee-pour-la-culture) [RB]
- **[B]** [Points de rencontre pour Livres dans la rue](#vmtl-points-rencontres-livres-dans-la-rue) [RB]
- **[B]** [Palmarès des documents les plus empruntés](#vmtl-palmares-des-documents-les-plus-empruntes) [RB]
- **[B]** [Rues piétonnes et partagées](#vmtl-rues-pietonnes) [RB]
- **[B]** [Programmation culturelle 2020-2021](#vmtl-programmation-culturelle-vas) [RB]
- **[C]** [Banque de nom Toponym'Elles](#vmtl-toponym-elles) [RB]
- **[C]** [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique) [RB]
- **[C]** [Permis et autorisations de tournage](#vmtl-permis-et-autorisations-de-tournage) [RB]
- **[C]** [Consultation des communautés LGBTQ2+ à Montréal](#vmtl-consultation-des-communautes-lgbtq-a-montreal) [RB]
- **[C]** [Sondage Écho sur l'inclusion des personnes immigrantes](#vmtl-sondage-inclusion-personnes-immigrantes) [RB]
- **[D]** [Programme d'aide-financière Inclusion et innovation](#vmtl-programme-inclusion-innovation2008-2014)
- **[F]** [Soutien aux artistes, organismes culturels et arrondissements](#vmtl-soutien-artistes-organismes-culturels)
- **[F]** [Sites et immeubles protégés en vertu de la Loi sur le patrimoine culturel](#vmtl-sites-immeubles-proteges-lpc)
- **[F]** [Diagnostic de la pratique artistique amateur à Montréal](#vmtl-diagnostic-de-la-pratique-artistique-amateur-a-montreal)
- **[F]** [Répertoire des organismes membres du réseau du loisir culturel de Montréal](#vmtl-membres-rlcm)
- **[F]** [Bibliothèques de Montréal - statistiques sur le prêt, les collections et la fréquentation](#vmtl-bibliotheques-montreal-statistiques)
- **[F]** [Immeubles faisant l'objet d'un énoncé d'intérêt patrimonial](#vmtl-immeubles-faisant-l-objet-d-un-enonce-d-interet-patrimonial)
- **[F]** [Catalogue des documents des bibliothèques](#vmtl-catalogue-bibliotheques)
- **[F]** [Commande personnalisée du recensement 2021](#vmtl-commande-personnalisee-recensement-2021)
- **[F]** [Lieux culturels municipaux de Montréal](#vmtl-lieux-culturels)
- **[F]** [Art public - Information sur les oeuvres de la collection municipale](#vmtl-art-public-information-sur-les-oeuvres-de-la-collection-municipale)

---

## Activités de la programmation du 375e (2017)
### Activits De La Programmation Du 375e 2017

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-activites-programmation-375e` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Société des célébrations du 375e anniversaire de Montréal |
| **Update Frequency** | notPlanned |
| **Total Records** | 793 |
| **Formats** | WEB, CSV |

> Ensemble de données présentant les activités de la programmation des festivités du 375e anniversaire de Montréal en 2017.

Ensemble produit et géré par la Société des célébrations du 375e anniversaire de Montréal, un organisme à but non lucratif qui a été mandaté pour l'organisation des festivités

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `Nom` | Name | identifier | exclude | G | 0.0% |
| 3 | `Description Long Français` | Description Long Fran Ais | text | filter | U | 18.5% |
| 4 | `* Arrondissement ou pôle` | Borough Ou P Le | text | filter | G | 7.6% |
| 5 | `* Gratuit / Payant` | Y coordinate (MTM) | category | dimension | G | 4.8% |
| 6 | `* Intérêts / Type d'événement` | Int R Ts Type D V Nement | text | filter | G | 4.3% |
| 7 | `* Intérieur / Extérieur` | X coordinate (MTM) | category | dimension | G | 5.4% |
| 8 | `Dates de présentation de l'événement/activité` | Dates De Pr Sentation De L V Nement Activit | text | filter | G | 1.6% |
| 9 | `Lieux` | X coordinate (MTM) (Lieux) | text | filter | G | 4.9% |

**Dimensions** (2): `* Gratuit / Payant`, `* Intérieur / Extérieur`

**Join opportunities:** temporal join via date fields

---

## Murales subventionnées
### Murales Subventionnes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-murales` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne / Service de la culture |
| **Update Frequency** | weekly |
| **Total Records** | 340 |
| **Formats** | SHP, GEOJSON, CSV |

> Depuis plusieurs années, la Ville de Montréal soutient la réalisation de murales extérieures visibles, créatives et liées à leur contexte. Par le biais de divers programmes, unifiés depuis 2016 au sein du Programme d'art mural, la Ville a soutenu la réalisation de centaines de murales. Cet ensemble 

**Warnings:**
- Location rounded to nearest intersection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id` | Identifier | numeric | filter | G | 0.0% |
| 2 | `artiste` | Artiste | text | filter | G | 0.0% |
| 3 | `organisme` | Organization | text | filter | G | 0.6% |
| 4 | `adresse` | Address | identifier | exclude | G | 0.0% |
| 5 | `annee` | Year | text | filter | G | 0.0% |
| 6 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 7 | `programme_entente` | Program | category | dimension | G | 0.3% |
| 8 | `latitude` | Latitude | geo_latitude | geo | G | 0.0% |
| 9 | `longitude` | Longitude | geo_longitude | geo | G | 0.0% |
| 10 | `image` | Image | identifier | exclude | G | 0.0% |

**Dimensions** (2): `arrondissement`, `programme_entente`

**Geo fields** (2): `latitude`, `longitude`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates

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

## Coups de coeur et projets culturels de l'événement "Montréal engagée pour la culture"
### Coups De Coeur Et Projets cultural De L Vnement Montral Engage Pour La culture

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-coups-de-coeur-et-projets-culturels-de-l-evenement-montreal-engagee-pour-la-culture` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de la culture |
| **Update Frequency** | irregular |
| **Total Records** | 251 |
| **Formats** | ODS, XLS, CSV, KML |

> Le fichier est composé de 252 entrées, dont les 60 projets culturels présentés le 23 septembre 2014, ainsi que les coups de cœur des participants à l'événement « Montréal engagée pour la culture ».

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Coups de cœur culturels` | Coups De Cœur Culturels | identifier | exclude | G | 0.0% |
| 2 | `Latitude` | Latitude | geo_latitude | geo | G | 0.0% |
| 3 | `Longitude` | Longitude | geo_longitude | geo | G | 0.0% |
| 4 | `Étiquette` | Étiquette | category | dimension | G | 0.0% |

**Dimensions** (1): `Étiquette`

**Geo fields** (2): `Latitude`, `Longitude`

**Join opportunities:** spatial join via lat/long coordinates

---

## Les édifices patrimoniaux de Montréal
### Les Difices Patrimoniaux De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-les-edifices-patrimoniaux-de-montreal` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 7,194 |
| **Temporal Range** | 0037-11-2379-01 to 0040-08-8023-02 |
| **Formats** | CSV |

> Liste des édifices qui figurent dans le Site Web du Vieux-Montréal et du Grand répertoire du patrimoine bâti de Montréal. Elle contient des informations générales sur ce qui constitue une « valeur patrimoniale » ainsi que sur la gestion du patrimoine bâti par une synthèse des connaissances actuelles

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `IDENTIFIANT_ICONOGRAPHIE` | Identifier Iconographie | numeric | dimension | G | 0.0% |
| 2 | `IDENTIFIANT_BATIMENT` | Identifier Building | date | date | G | 0.0% |
| 3 | `URL` | URL | text | filter | G | 0.0% |
| 4 | `CREATEUR` | Createur | category | dimension | U | 35.3% |
| 5 | `COPYRIGHT` | Y coordinate (MTM) | text | dimension | G | 0.3% |
| 6 | `ANNEE` | Year | text | filter | G | 0.0% |
| 7 | `LEGENDE` | Legende | text | dimension | U | 34.9% |

**Dimensions** (4): `IDENTIFIANT_ICONOGRAPHIE`, `CREATEUR`, `COPYRIGHT`, `LEGENDE`

**Date fields** (1): `IDENTIFIANT_BATIMENT`

---

## Palmarès des documents les plus empruntés
### Palmars Des Documents Les Plus Emprunts

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-palmares-des-documents-les-plus-empruntes` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Direction des bibliothèques |
| **Update Frequency** | irregular |
| **Total Records** | 960 |
| **Formats** | TSV |

> Toutes les deux semaines, les Bibliothèques de Montréal publient un palmarès des 20 documents les plus empruntés pour chacune des 45 bibliothèques.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Nom Bibliothèque` | Name Biblioth Que | text | filter | G | 2.1% |
| 2 | `Secteur` | Sector | text | filter | G | 0.0% |
| 3 | `Titre` | Title | text | filter | G | 0.0% |
| 4 | `Nombre de prêt` | Count De Pr T | numeric | measure | G | 0.0% |
| 5 | `Nombre de document` | Document | numeric | measure | G | 0.0% |
| 6 | `Lien URL` | Link URL | text | filter | G | 0.0% |

**Measures** (2): `Nombre de prêt`, `Nombre de document`

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

## Points de rencontre pour Livres dans la rue
### Points De Rencontre Pour Livres Dans La Rue

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-points-rencontres-livres-dans-la-rue` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Direction des bibliothèques |
| **Update Frequency** | irregular |
| **Total Records** | 41 |
| **Formats** | ODS, XLS, CSV |

> Livres dans la rue est un programme d’animation autour du livre destiné aux jeunes de 4 à 12 ans résidant sur le territoire de Montréal. Activité de lecture qui se veut à la fois ludique et stimulante, ce programme vise à rejoindre les enfants dans leur propre milieu de vie. Il se démarque du fait q

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Lieu` | Lieu | identifier | exclude | G | 0.0% |
| 2 | `Description :` | Description | text | filter | G | 0.0% |
| 3 | `Jour et heure :` | Day Et Hour | text | filter | G | 0.0% |
| 4 | `latitude` | Latitude | geo_latitude | geo | G | 0.0% |
| 5 | `longitude` | Longitude | geo_longitude | geo | G | 0.0% |

**Geo fields** (2): `latitude`, `longitude`

**Join opportunities:** spatial join via lat/long coordinates

---

## Programmation culturelle 2020-2021
### Programmation Culturelle 2020 2021

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-programmation-culturelle-vas` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de la culture |
| **Update Frequency** | asNeeded |
| **Total Records** | 174 |
| **Formats** | SHP, GEOJSON, CSV |

> La lutte contre la COVID-19 a transformé les déplacements dans le territoire urbain. La Ville de Montréal propose donc le circuit des Voies actives sécuritaires (VAS). Cette nouvelle manière d’adopter les déplacements est instaurée afin d’offrir aux Montréalaises et Montréalais la possibilité de cir

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_DOSSIER` | Identifier | text | filter | P | 56.3% |
| 2 | `ID_PROJET` | Project | numeric | filter | G | 0.0% |
| 3 | `POSITION_SEQ` | Position Seq | category | dimension | G | 0.0% |
| 4 | `ID_SERIE` | Identifier (ID_SERIE) | identifier | exclude | G | 0.0% |
| 5 | `ARTISTE/ORGANISME` | Organization | text | filter | G | 0.0% |
| 6 | `NOM_OEUVRE` | Name Oeuvre | text | filter | U | 17.8% |
| 7 | `IDENTIFICATION_OEUVRE_PONCTUELLE` | Identification Oeuvre Ponctuelle | text | filter | U | 49.4% |
| 8 | `DESCRIPTIF` | Descriptif | text | filter | G | 0.0% |
| 9 | `THÉMATIQUE_PROJET` | Project (THÉMATIQUE_PROJET) | category | dimension | G | 0.0% |
| 10 | `TYPE_OEUVRE` | Type Oeuvre | category | dimension | G | 0.0% |
| 11 | `STATUT` | Status | category | dimension | G | 0.0% |
| 12 | `ARRONDISSEMENT` | Borough | category | dimension | G | 0.0% |
| 13 | `QUARTIER/ADRESSE` | Neighbourhood | text | filter | G | 0.0% |
| 14 | `LIEN_OEUVRE_WEB` | Link Oeuvre Web | text | filter | G | 0.6% |
| 15 | `LIEN_FICHIER_AUDIO` | File | all_null | exclude | E | 100.0% |
| 16 | `LIEN_EVENEMENT` | Event | category | dimension | P | 64.4% |
| 17 | `COMMENTAIRES` | Commentaires | all_null | exclude | E | 100.0% |
| 18 | `SOURCE_VILLE` | Source Ville | category | dimension | G | 0.0% |
| 19 | `X_MTM` | X coordinate (MTM) | numeric | measure | G | 0.0% |
| 20 | `Y_MTM` | Y coordinate (MTM) | numeric | measure | G | 0.0% |
| 21 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |
| 22 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (7): `POSITION_SEQ`, `THÉMATIQUE_PROJET`, `TYPE_OEUVRE`, `STATUT`, `ARRONDISSEMENT`, `LIEN_EVENEMENT`, `SOURCE_VILLE`

**Measures** (2): `X_MTM`, `Y_MTM`

**Geo fields** (2): `LONGITUDE`, `LATITUDE`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates

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

## Récipiendaires du prix Paul-Buissonneau (archives)
### Rcipiendaires Du Prix Paul Buissonneau Archives

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-recipiendaires-du-prix-paul-buissonneau` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de la culture |
| **Update Frequency** | irregular |
| **Total Records** | 16 |
| **Formats** | CSV |

> Liste des récipiendaires du Prix Paul-Buissonneau depuis 2005. Le Prix Paul-Buissonneau vise à souligner la contribution remarquable d’un individu, d’une troupe amateur ou d’un organisme au développement du théâtre amateur montréalais.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Annees` | Annees | text | filter | G | 0.0% |
| 2 | `Laureats du prix Paul Buissonneau en theatre amateur` | Price | category | dimension | G | 0.0% |

**Dimensions** (1): `Laureats du prix Paul Buissonneau en theatre amateur`

---

## Répertoire historique des toponymes
### Rpertoire historical Des Toponymes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-toponymes` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | daily |
| **Total Records** | 6,207 |
| **Formats** | JSON, CSV |

> Liste des toponymes utilisés à la Ville qui inclut l'origine de plus de 6000 noms de rues et lieux publics répartis dans les 19 arrondissements de Montréal. Voir site web [montreal.ca](https://montreal.ca/toponymie/) pour outil de recherche.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id_rire` | Identifier | numeric | exclude | U | 10.2% |
| 2 | `types` | Types | category | dimension | G | 0.0% |
| 3 | `specific` | Specific | identifier | exclude | G | 0.0% |
| 4 | `generic` | Generic | text | dimension | G | 0.0% |
| 5 | `designation_date` | Designation Date | text | filter | U | 22.5% |
| 6 | `history` | Y coordinate (MTM) | text | filter | G | 0.0% |
| 7 | `history_source` | History Source | text | filter | G | 6.6% |
| 8 | `former_name` | Former Name | category | exclude | E | 98.2% |
| 9 | `borough_codes` | Borough Codes | text | filter | G | 0.0% |
| 10 | `borough_names` | Borough Names | text | filter | G | 0.0% |
| 11 | `title` | Title | identifier | exclude | G | 0.0% |
| 12 | `topic_codes` | Topic Codes | text | filter | P | 73.5% |
| 13 | `topic_names` | Topic Names | text | filter | P | 73.5% |

**Dimensions** (2): `types`, `generic`

**Join opportunities:** temporal join via date fields

---

## Banque de nom Toponym'Elles
### Banque De Nom Toponym Elles

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-toponym-elles` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | daily |
| **Total Records** | 370 |
| **Formats** | JSON, CSV |

> Banque de noms dédiée à la représentation féminine pour découvrir des centaines de femmes qui ont marqué notre histoire.
Lire la [démarche](https://montreal.ca/toponymie/toponym-elles) qui a mené à la banque de noms.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id_rire` | Identifier | all_null | exclude | E | 100.0% |
| 2 | `types` | Types | category | dimension | G | 0.0% |
| 3 | `specific` | Specific | all_null | exclude | E | 100.0% |
| 4 | `generic` | Generic | category | dimension | G | 0.0% |
| 5 | `designation_date` | Designation Date | all_null | exclude | E | 100.0% |
| 6 | `history` | Y coordinate (MTM) | identifier | exclude | G | 0.0% |
| 7 | `history_source` | History Source | category | dimension | G | 0.0% |
| 8 | `former_name` | Former Name | all_null | exclude | E | 100.0% |
| 9 | `borough_codes` | Borough Codes | all_null | exclude | E | 100.0% |
| 10 | `borough_names` | Borough Names | all_null | exclude | E | 100.0% |
| 11 | `title` | Title | identifier | exclude | G | 0.0% |
| 12 | `topic_codes` | Topic Codes | numeric | dimension | G | 0.0% |
| 13 | `topic_names` | Topic Names | category | dimension | G | 0.0% |

**Dimensions** (5): `types`, `generic`, `history_source`, `topic_codes`, `topic_names`

**Join opportunities:** temporal join via date fields

---

## Consultation des communautés LGBTQ2+ à Montréal
### Consultation Des Communauts Lgbtq2 Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-consultation-des-communautes-lgbtq-a-montreal` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | notPlanned |
| **Total Records** | 1,448 |
| **Formats** | PDF, CSV |

> Ensemble de données présentant les résultats de la démarche de consultation réalisée par la Ville de Montréal auprès des communautés LGBTQ2+, pour mieux connaître leurs besoins, défis et enjeux. 

Le sigle LGBTQ2+ fait référence à des diversités sexuelles et de genres dont les personnes lesbiennes

**Warnings:**
- Data obfuscated for privacy protection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `acces_services _ Ville_q1` | Acces Services Ville Q1 | category | dimension | G | 0.0% |
| 3 | `acces_services _ Ville_q2_1` | Acces Services Ville Q2 1 | category | dimension | P | 51.9% |
| 4 | `acces_services _ Ville_q2_2` | Acces Services Ville Q2 2 | category | dimension | P | 76.7% |
| 5 | `acces_services _ Ville_q2_3` | Acces Services Ville Q2 3 | category | dimension | P | 83.5% |
| 6 | `acces_services _ Ville_q2_4` | Acces Services Ville Q2 4 | category | dimension | P | 83.5% |
| 7 | `acces_services _ Ville_q2_5` | Acces Services Ville Q2 5 | category | dimension | P | 60.4% |
| 8 | `acces_services _ Ville_q2_6` | Acces Services Ville Q2 6 | category | dimension | U | 33.0% |
| 9 | `acces_services _ Ville_q2_7` | Acces Services Ville Q2 7 | category | dimension | P | 88.1% |
| 10 | `acces_services _ Ville_q2_8` | Acces Services Ville Q2 8 | category | dimension | P | 74.9% |
| 11 | `acces_services _ Ville_q3` | Acces Services Ville Q3 | category | dimension | G | 0.0% |
| 12 | `acces_services _ Ville_q4` | Acces Services Ville Q4 | category | dimension | G | 7.4% |
| 13 | `acces_services _ Ville_q5` | Acces Services Ville Q5 | category | dimension | G | 0.0% |
| 14 | `acces_services _ Ville_q6_1` | Acces Services Ville Q6 1 | category | exclude | E | 92.8% |
| 15 | `acces_services _ Ville_q6_2` | Acces Services Ville Q6 2 | category | exclude | E | 91.5% |
| 16 | `acces_services _ Ville_q6_3` | Acces Services Ville Q6 3 | category | exclude | E | 93.6% |
| 17 | `acces_services _ Ville_q6_4` | Acces Services Ville Q6 4 | category | dimension | P | 82.6% |
| 18 | `acces_services _ Ville_q6_5` | Acces Services Ville Q6 5 | category | dimension | P | 88.2% |
| 19 | `acces_services _ Ville_q6_6` | Acces Services Ville Q6 6 | category | exclude | E | 95.1% |
| 20 | `acces_services _ Ville_q6_7` | Acces Services Ville Q6 7 | category | exclude | E | 96.1% |
| 21 | `acces_services _ Ville_q7_1` | Acces Services Ville Q7 1 | category | dimension | G | 0.0% |
| 22 | `acces_services _ Ville_q7_2` | Acces Services Ville Q7 2 | category | dimension | G | 0.0% |
| 23 | `acces_services _ Ville_q7_3` | Acces Services Ville Q7 3 | category | dimension | G | 0.0% |
| 24 | `acces_services _ Ville_q7_4` | Acces Services Ville Q7 4 | category | dimension | G | 0.0% |
| 25 | `acces_services _ Ville_q7_5` | Acces Services Ville Q7 5 | category | dimension | G | 0.0% |
| 26 | `acces_services _ Ville_q8_1` | Acces Services Ville Q8 1 | category | dimension | G | 0.0% |
| 27 | `acces_services _ Ville_q8_2` | Acces Services Ville Q8 2 | category | dimension | G | 0.0% |
| 28 | `acces_services _ Ville_q8_3` | Acces Services Ville Q8 3 | category | dimension | G | 0.0% |
| 29 | `acces_services _ Ville_q8_4` | Acces Services Ville Q8 4 | category | dimension | G | 0.0% |
| 30 | `acces_services _ Ville_q8_5` | Acces Services Ville Q8 5 | category | dimension | G | 0.0% |
| 31 | `acces_services _ Ville_q9` | Acces Services Ville Q9 | category | dimension | G | 0.0% |
| 32 | `milieu_et_qualite_ de_vie_q10_1` | Milieu Et Qualite  De Vie Q10 1 | category | dimension | P | 77.5% |
| 33 | `milieu_et_qualite_de_vie_q10_2` | Milieu Et Qualite De Vie Q10 2 | category | dimension | P | 88.0% |
| 34 | `milieu_et_qualite_ de_vie_q10_3` | Milieu Et Qualite  De Vie Q10 3 | category | dimension | P | 87.6% |
| 35 | `milieu_et_qualite_de_vie_q10_4` | Milieu Et Qualite De Vie Q10 4 | category | dimension | P | 72.2% |
| 36 | `milieu_et_qualite_de_vie_q10_5` | Milieu Et Qualite De Vie Q10 5 | category | dimension | P | 84.3% |
| 37 | `milieu_et_qualite_de_vie_q10_6` | Milieu Et Qualite De Vie Q10 6 | category | exclude | E | 96.3% |
| 38 | `milieu_et_qualite_de_vie_q10_7` | Milieu Et Qualite De Vie Q10 7 | category | exclude | E | 93.3% |
| 39 | `milieu_et_qualite_de_vie_q10_8` | Milieu Et Qualite De Vie Q10 8 | category | dimension | P | 80.5% |
| 40 | `milieu_et_qualite_de_vie_q10_9` | Milieu Et Qualite De Vie Q10 9 | category | dimension | P | 52.5% |
| 41 | `milieu_et_qualite_de_vie_q11_1` | Milieu Et Qualite De Vie Q11 1 | category | dimension | G | 0.5% |
| 42 | `milieu_et_qualite_de_vie_q11_2` | Milieu Et Qualite De Vie Q11 2 | category | dimension | G | 2.1% |
| 43 | `milieu_et_qualite_de_vie_q11_3` | Milieu Et Qualite De Vie Q11 3 | category | dimension | G | 2.6% |
| 44 | `milieu_et_qualite_de_vie_q11_4` | Milieu Et Qualite De Vie Q11 4 | category | dimension | G | 2.8% |
| 45 | `milieu_et_qualite_de_vie_q11_5` | Milieu Et Qualite De Vie Q11 5 | category | dimension | G | 2.7% |
| 46 | `milieu_et_qualite_de_vie_q11_6` | Milieu Et Qualite De Vie Q11 6 | category | dimension | G | 3.1% |
| 47 | `milieu_et_qualite_de_vie_q11_7` | Milieu Et Qualite De Vie Q11 7 | category | dimension | G | 0.9% |
| 48 | `milieu_et_qualite_de_vie_q11_8` | Milieu Et Qualite De Vie Q11 8 | category | dimension | G | 1.7% |
| 49 | `milieu_et_qualite_de_vie_q12` | Milieu Et Qualite De Vie Q12 | category | dimension | G | 0.0% |
| 50 | `securite_dans_espace_public_q13` | Securite Dans Espace Public Q13 | category | dimension | G | 0.0% |
| 51 | `securite_dans_espace_public_q14_1` | Securite Dans Espace Public Q14 1 | category | dimension | U | 43.7% |
| 52 | `securite_dans_espace_public_q14_2` | Securite Dans Espace Public Q14 2 | category | dimension | P | 70.3% |
| 53 | `securite_dans_espace_public_q14_3` | Securite Dans Espace Public Q14 3 | category | dimension | P | 85.5% |
| 54 | `securite_dans_espace_public_q14_4` | Securite Dans Espace Public Q14 4 | category | exclude | E | 93.0% |
| 55 | `securite_dans_espace_public_q14_5` | Securite Dans Espace Public Q14 5 | category | exclude | E | 93.1% |
| 56 | `securite_dans_espace_public_q14_6` | Securite Dans Espace Public Q14 6 | category | dimension | P | 86.9% |
| 57 | `securite_dans_espace_public_q14_7` | Securite Dans Espace Public Q14 7 | category | exclude | E | 95.8% |
| 58 | `securite_dans_espace_public_q14_8` | Securite Dans Espace Public Q14 8 | category | dimension | P | 79.9% |
| 59 | `securite_dans_espace_public_q14_9` | Securite Dans Espace Public Q14 9 | category | dimension | U | 48.2% |
| 60 | `securite_dans_espace_public_q14_10` | Securite Dans Espace Public Q14 10 | category | exclude | E | 92.7% |
| 61 | `securite_dans_espace_public_q14_11` | Securite Dans Espace Public Q14 11 | category | dimension | P | 74.0% |
| 62 | `securite_dans_espace_public_q15_1` | Securite Dans Espace Public Q15 1 | category | dimension | P | 57.2% |
| 63 | `securite_dans_espace_public_q15_2` | Securite Dans Espace Public Q15 2 | category | exclude | E | 94.8% |
| 64 | `securite_dans_espace_public_q15_3` | Securite Dans Espace Public Q15 3 | category | exclude | E | 97.2% |
| 65 | `securite_dans_espace_public_q15_4` | Securite Dans Espace Public Q15 4 | category | exclude | E | 90.7% |
| 66 | `securite_dans_espace_public_q15_5` | Securite Dans Espace Public Q15 5 | category | dimension | P | 75.7% |
| 67 | `securite_dans_espace_public_q15_6` | Securite Dans Espace Public Q15 6 | category | dimension | P | 51.2% |
| 68 | `securite_dans_espace_public_q15_7` | Securite Dans Espace Public Q15 7 | category | dimension | P | 80.3% |
| 69 | `securite_dans_espace_public_q15_8` | Securite Dans Espace Public Q15 8 | category | dimension | P | 75.9% |
| 70 | `securite_dans_espace_public_q15_9` | Securite Dans Espace Public Q15 9 | category | dimension | P | 80.4% |
| 71 | `securite_dans_espace_public_q16` | Securite Dans Espace Public Q16 | category | dimension | U | 26.0% |
| 72 | `securite_dans_espace_public_q17_1` | Securite Dans Espace Public Q17 1 | category | dimension | P | 70.0% |
| 73 | `securite_dans_espace_public_q17_2` | Securite Dans Espace Public Q17 2 | category | dimension | P | 67.6% |
| 74 | `securite_dans_espace_public_q17_3` | Securite Dans Espace Public Q17 3 | category | exclude | E | 91.0% |
| 75 | `securite_dans_espace_public_q17_4` | Securite Dans Espace Public Q17 4 | category | dimension | P | 82.8% |
| 76 | `securite_dans_espace_public_q17_5` | Securite Dans Espace Public Q17 5 | category | exclude | E | 91.7% |
| 77 | `securite_dans_espace_public_q17_6` | Securite Dans Espace Public Q17 6 | category | exclude | E | 94.1% |
| 78 | `securite_dans_espace_public_q17_7` | Securite Dans Espace Public Q17 7 | category | dimension | P | 64.0% |
| 79 | `securite_dans_espace_public_q17_8` | Securite Dans Espace Public Q17 8 | category | dimension | P | 71.4% |
| 80 | `securite_dans_espace_public_q17_9` | Securite Dans Espace Public Q17 9 | category | exclude | E | 97.6% |
| 81 | `securite_dans_espace_public_q18` | Securite Dans Espace Public Q18 | category | exclude | E | 95.3% |
| 82 | `participation_citoyenne_q19` | Y coordinate (MTM) | category | dimension | G | 0.0% |
| 83 | `participation_citoyenne_q20` | Y coordinate (MTM) (participation_citoyenne_q20) | category | dimension | P | 77.2% |
| 84 | `participation_citoyenne_q21_1` | Y coordinate (MTM) (participation_citoyenne_q21_1) | category | dimension | P | 85.1% |
| 85 | `participation_citoyenne_q21_2` | Y coordinate (MTM) (participation_citoyenne_q21_2) | category | dimension | P | 73.1% |
| 86 | `participation_citoyenne_q21_3` | Y coordinate (MTM) (participation_citoyenne_q21_3) | category | dimension | P | 61.5% |
| 87 | `participation_citoyenne_q21_4` | Y coordinate (MTM) (participation_citoyenne_q21_4) | category | dimension | U | 42.6% |
| 88 | `participation_citoyenne_q21_5` | Y coordinate (MTM) (participation_citoyenne_q21_5) | category | dimension | P | 70.1% |
| 89 | `participation_citoyenne_q21_6` | Y coordinate (MTM) (participation_citoyenne_q21_6) | category | dimension | P | 87.9% |
| 90 | `participation_citoyenne_q21_7` | Y coordinate (MTM) (participation_citoyenne_q21_7) | category | dimension | P | 84.9% |
| 91 | `piste_action_q22_1` | Piste Action Q22 1 | numeric | dimension | G | 0.0% |
| 92 | `piste_action_q22_2` | Piste Action Q22 2 | numeric | dimension | G | 0.0% |
| 93 | `piste_action_q22_3` | Piste Action Q22 3 | numeric | dimension | G | 0.0% |
| 94 | `piste_action_q22_4` | Piste Action Q22 4 | numeric | dimension | G | 0.0% |
| 95 | `piste_action_q22_5` | Piste Action Q22 5 | numeric | dimension | G | 0.0% |
| 96 | `piste_action_q22_6` | Piste Action Q22 6 | numeric | dimension | G | 0.0% |
| 97 | `piste_action_q22_7` | Piste Action Q22 7 | numeric | dimension | G | 0.0% |
| 98 | `piste_action_q22_8` | Piste Action Q22 8 | numeric | dimension | G | 0.0% |
| 99 | `piste_action_q22_9` | Piste Action Q22 9 | numeric | dimension | G | 0.0% |
| 100 | `piste_action_q22_10` | Piste Action Q22 10 | numeric | dimension | G | 0.0% |
| 101 | `piste_action_q23_1` | Piste Action Q23 1 | category | dimension | U | 32.5% |
| 102 | `piste_action_q23_2` | Piste Action Q23 2 | category | dimension | U | 41.8% |
| 103 | `piste_action_q23_3` | Piste Action Q23 3 | category | dimension | U | 29.9% |
| 104 | `piste_action_q23_4` | Piste Action Q23 4 | category | dimension | U | 29.8% |
| 105 | `piste_action_q23_5` | Piste Action Q23 5 | category | dimension | U | 36.8% |
| 106 | `piste_action_q23_6` | Piste Action Q23 6 | category | dimension | U | 42.7% |
| 107 | `piste_action_q23_7` | Piste Action Q23 7 | category | dimension | U | 29.9% |
| 108 | `piste_action_q23_8` | Piste Action Q23 8 | category | dimension | U | 45.8% |
| 109 | `profil_q25` | Profil Q25 | category | dimension | G | 0.0% |
| 110 | `profil_q26` | Profil Q26 | category | dimension | G | 0.0% |
| 111 | `profil_q27` | Profil Q27 | category | dimension | G | 0.0% |
| 112 | `profil_q28` | Profil Q28 | category | dimension | G | 0.0% |
| 113 | `profil_q29` | Profil Q29 | category | dimension | G | 0.0% |
| 114 | `profil_q30` | Profil Q30 | category | dimension | G | 0.2% |
| 115 | `profil_q31` | Profil Q31 | category | dimension | G | 0.0% |
| 116 | `profil_q32` | Profil Q32 | category | dimension | G | 0.0% |
| 117 | `profil_q33` | Profil Q33 | category | dimension | G | 0.0% |
| 118 | `profil_q34` | Profil Q34 | category | dimension | G | 0.0% |
| 119 | `profil_q35` | Profil Q35 | category | dimension | G | 0.0% |
| 120 | `profil_q36` | Profil Q36 | text | filter | G | 0.0% |
| 121 | `profil_q37` | Profil Q37 | category | dimension | G | 1.4% |
| 122 | `interet_participer_groupe_discussion_q38` | Interet Participer Group Discussion Q38 | category | dimension | G | 0.0% |
| 123 | `interet_participer_groupe_discussion_q40` | Interet Participer Group Discussion Q40 | category | dimension | P | 62.7% |

**Dimensions** (102): `acces_services _ Ville_q1`, `acces_services _ Ville_q2_1`, `acces_services _ Ville_q2_2`, `acces_services _ Ville_q2_3`, `acces_services _ Ville_q2_4`, `acces_services _ Ville_q2_5`, `acces_services _ Ville_q2_6`, `acces_services _ Ville_q2_7`, `acces_services _ Ville_q2_8`, `acces_services _ Ville_q3`, `acces_services _ Ville_q4`, `acces_services _ Ville_q5`, `acces_services _ Ville_q6_4`, `acces_services _ Ville_q6_5`, `acces_services _ Ville_q7_1`, `acces_services _ Ville_q7_2`, `acces_services _ Ville_q7_3`, `acces_services _ Ville_q7_4`, `acces_services _ Ville_q7_5`, `acces_services _ Ville_q8_1`, `acces_services _ Ville_q8_2`, `acces_services _ Ville_q8_3`, `acces_services _ Ville_q8_4`, `acces_services _ Ville_q8_5`, `acces_services _ Ville_q9`, `milieu_et_qualite_ de_vie_q10_1`, `milieu_et_qualite_de_vie_q10_2`, `milieu_et_qualite_ de_vie_q10_3`, `milieu_et_qualite_de_vie_q10_4`, `milieu_et_qualite_de_vie_q10_5`, `milieu_et_qualite_de_vie_q10_8`, `milieu_et_qualite_de_vie_q10_9`, `milieu_et_qualite_de_vie_q11_1`, `milieu_et_qualite_de_vie_q11_2`, `milieu_et_qualite_de_vie_q11_3`, `milieu_et_qualite_de_vie_q11_4`, `milieu_et_qualite_de_vie_q11_5`, `milieu_et_qualite_de_vie_q11_6`, `milieu_et_qualite_de_vie_q11_7`, `milieu_et_qualite_de_vie_q11_8`, `milieu_et_qualite_de_vie_q12`, `securite_dans_espace_public_q13`, `securite_dans_espace_public_q14_1`, `securite_dans_espace_public_q14_2`, `securite_dans_espace_public_q14_3`, `securite_dans_espace_public_q14_6`, `securite_dans_espace_public_q14_8`, `securite_dans_espace_public_q14_9`, `securite_dans_espace_public_q14_11`, `securite_dans_espace_public_q15_1`, `securite_dans_espace_public_q15_5`, `securite_dans_espace_public_q15_6`, `securite_dans_espace_public_q15_7`, `securite_dans_espace_public_q15_8`, `securite_dans_espace_public_q15_9`, `securite_dans_espace_public_q16`, `securite_dans_espace_public_q17_1`, `securite_dans_espace_public_q17_2`, `securite_dans_espace_public_q17_4`, `securite_dans_espace_public_q17_7`, `securite_dans_espace_public_q17_8`, `participation_citoyenne_q19`, `participation_citoyenne_q20`, `participation_citoyenne_q21_1`, `participation_citoyenne_q21_2`, `participation_citoyenne_q21_3`, `participation_citoyenne_q21_4`, `participation_citoyenne_q21_5`, `participation_citoyenne_q21_6`, `participation_citoyenne_q21_7`, `piste_action_q22_1`, `piste_action_q22_2`, `piste_action_q22_3`, `piste_action_q22_4`, `piste_action_q22_5`, `piste_action_q22_6`, `piste_action_q22_7`, `piste_action_q22_8`, `piste_action_q22_9`, `piste_action_q22_10`, `piste_action_q23_1`, `piste_action_q23_2`, `piste_action_q23_3`, `piste_action_q23_4`, `piste_action_q23_5`, `piste_action_q23_6`, `piste_action_q23_7`, `piste_action_q23_8`, `profil_q25`, `profil_q26`, `profil_q27`, `profil_q28`, `profil_q29`, `profil_q30`, `profil_q31`, `profil_q32`, `profil_q33`, `profil_q34`, `profil_q35`, `profil_q37`, `interet_participer_groupe_discussion_q38`, `interet_participer_groupe_discussion_q40`

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

## Permis et autorisations de tournage
### Permits Et Autorisations De Tournage

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-permis-et-autorisations-de-tournage` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de la culture - Bureau du cinéma et de la télévision de Montréal |
| **Update Frequency** | monthly |
| **Total Records** | 104,969 |
| **Temporal Range** | 1997-01-01T00:00:00 to 2002-03-01T00:00:00 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | CSV |

> Ensemble de données basé sur les demandes de permis de tournages et les protocoles administrés par le Bureau du cinéma et de la télévision de Montréal.  Les fichiers contiennent la liste des productions, ainsi que les lieux de productions sur le domaine public pour certains arrondissements.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `NO_PERMISPUBLIC` | No. Permispublic | numeric | exclude | G | 5.5% |
| 2 | `NO_PERMISPARCEDIFICE` | No. Permisparcedifice | numeric | exclude | E | 94.5% |
| 3 | `NO_ID_PRO` | Identifier | numeric | dimension | G | 0.0% |
| 4 | `TITRE_PRODUCTION` | Title | text | filter | U | 37.2% |
| 5 | `ANNULATION` | Annulation | category | dimension | G | 0.0% |
| 6 | `TYPE_EMPLACEMENT` | Type Location | all_null | exclude | E | 100.0% |
| 7 | `EMPLACEMENT` | Emplacement | text | filter | G | 0.5% |
| 8 | `RUE_DE` | Street De | text | filter | G | 8.0% |
| 9 | `RUE_A` | Street A | text | filter | U | 11.3% |
| 10 | `NOM_PARC` | Name Parc | category | exclude | E | 94.5% |
| 11 | `RAISON_OCCUPATION` | Raison Occupation | text | filter | P | 67.2% |
| 12 | `DUREE_DE` | Duration De | date | date | G | 5.5% |
| 13 | `DUREE_A` | Duration A | date | date | G | 5.5% |
| 14 | `NOM_ARROND` | Name Arrond | category | dimension | G | 0.0% |
| 15 | `X` | X coordinate (MTM) | geo_longitude | geo | P | 60.9% |
| 16 | `Y` | Y coordinate (MTM) | geo_latitude | geo | P | 60.9% |
| 17 | `LATITUDE` | Latitude | geo_latitude | geo | P | 60.9% |
| 18 | `LONGITUDE` | Longitude | geo_longitude | geo | P | 60.9% |

**Dimensions** (3): `NO_ID_PRO`, `ANNULATION`, `NOM_ARROND`

**Date fields** (2): `DUREE_DE`, `DUREE_A`

**Geo fields** (4): `X`, `Y`, `LATITUDE`, `LONGITUDE`

**Join opportunities:** spatial join via lat/long coordinates

---

## Sondage Écho sur l'inclusion des personnes immigrantes
### Survey Cho Sur L inclusion Des Personnes Immigrantes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-sondage-inclusion-personnes-immigrantes` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | irregular |
| **Total Records** | 2,503 |
| **Temporal Range** | 2020-02-20T15:43:00 to 2020-03-23T10:27:00 |
| **Formats** | CSV |

> Résultats de la deuxième édition du rapport Écho - le Baromètre de la Ville de Montréal sur l’inclusion des personnes immigrantes.  

Cette recherche s’inscrit dans le cadre du Plan d’action solidarité, équité et inclusion 2021-2025 de la Ville de Montréal.  

Le sondage a pour objectif de :   

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `record` | Record | numeric | measure | G | 0.0% |
| 2 | `date` | Date | date | date | G | 0.0% |
| 3 | `sexe` | X coordinate (MTM) | numeric | dimension | G | 0.0% |
| 4 | `age` | Age | numeric | dimension | G | 0.0% |
| 5 | `ARRON` | Borough | numeric | dimension | G | 0.0% |
| 6 | `NAISS` | Naiss | numeric | dimension | G | 0.0% |
| 7 | `NAISSANCE2` | Naissance2 | text | filter | P | 75.2% |
| 8 | `NAIS2r9` | Nais2R9 | numeric | dimension | P | 73.4% |
| 9 | `LANGU` | Langu | numeric | dimension | G | 0.0% |
| 10 | `LANGUr96oe` | Langur96Oe | text | filter | P | 85.2% |
| 11 | `LGBTQ` | Lgbtq | numeric | dimension | G | 0.0% |
| 12 | `MINO` | Number | numeric | dimension | G | 0.0% |
| 13 | `MINO2` | Number (MINO2) | numeric | dimension | U | 17.1% |
| 14 | `SCOL` | Scol | numeric | dimension | G | 0.0% |
| 15 | `SCOL2` | Scol2 | numeric | dimension | P | 73.4% |
| 16 | `SCOL3` | Scol3 | numeric | dimension | P | 73.4% |
| 17 | `SCOL2r1oe` | Scol2R1Oe | category | dimension | P | 87.5% |
| 18 | `SCOL2r2oe` | Scol2R2Oe | text | filter | P | 85.9% |
| 19 | `Q1` | Q1 | numeric | dimension | G | 0.0% |
| 20 | `Q2r1` | Q2R1 | numeric | dimension | G | 0.0% |
| 21 | `Q2r2` | Q2R2 | numeric | dimension | G | 0.0% |
| 22 | `Q2r3` | Q2R3 | numeric | dimension | G | 0.0% |
| 23 | `Q2r4` | Q2R4 | numeric | dimension | G | 0.0% |
| 24 | `Q2r5` | Q2R5 | numeric | dimension | G | 0.0% |
| 25 | `Q2r6` | Q2R6 | numeric | dimension | G | 0.0% |
| 26 | `Q2r7` | Q2R7 | numeric | dimension | G | 0.0% |
| 27 | `Q2r8` | Q2R8 | numeric | dimension | G | 0.0% |
| 28 | `FOY1` | Y coordinate (MTM) | numeric | dimension | U | 31.3% |
| 29 | `FOY1_r1` | Y coordinate (MTM) (FOY1_r1) | numeric | dimension | G | 0.0% |
| 30 | `FOY1_r99` | Y coordinate (MTM) (FOY1_r99) | numeric | dimension | G | 0.0% |
| 31 | `APPAR1` | Appar1 | numeric | dimension | P | 80.7% |
| 32 | `APP1_r97` | App1 R97 | numeric | dimension | U | 34.0% |
| 33 | `APP1_r99` | App1 R99 | numeric | dimension | U | 34.0% |
| 34 | `ENFAN` | Enfan | numeric | dimension | U | 32.7% |
| 35 | `CHARGE` | Charge | numeric | dimension | P | 81.4% |
| 36 | `CHAR_r0` | Char R0 | numeric | dimension | P | 78.7% |
| 37 | `CHAR_r99` | Char R99 | numeric | dimension | P | 78.7% |
| 38 | `Q3r1` | Q3R1 | numeric | measure | P | 73.4% |
| 39 | `Q4` | Q4 | numeric | dimension | P | 73.4% |
| 40 | `Q5` | Q5 | numeric | dimension | P | 78.7% |
| 41 | `Q5O` | Q5O | numeric | measure | P | 84.6% |
| 42 | `Q6` | Q6 | numeric | dimension | P | 78.7% |
| 43 | `Q7` | Q7 | numeric | dimension | P | 88.3% |
| 44 | `Q7O` | Q7O | numeric | measure | P | 89.7% |
| 45 | `OCCUP` | Occup | numeric | dimension | G | 0.0% |
| 46 | `Q10` | Q10 | numeric | exclude | E | 93.5% |
| 47 | `Q11` | Q11 | numeric | exclude | E | 93.5% |
| 48 | `Q13` | Q13 | numeric | dimension | U | 38.5% |
| 49 | `Q14` | Q14 | numeric | dimension | U | 38.5% |
| 50 | `Q15r1` | Q15R1 | numeric | measure | U | 38.5% |
| 51 | `Q16` | Q16 | numeric | dimension | U | 47.0% |
| 52 | `Q17r1` | Q17R1 | numeric | dimension | U | 47.0% |
| 53 | `Q17r2` | Q17R2 | numeric | dimension | U | 47.0% |
| 54 | `Q17r3` | Q17R3 | numeric | dimension | U | 47.0% |
| 55 | `Q17r4` | Q17R4 | numeric | dimension | U | 47.0% |
| 56 | `Q17r5` | Q17R5 | numeric | dimension | U | 47.0% |
| 57 | `Q17r6` | Q17R6 | numeric | dimension | U | 47.0% |
| 58 | `Q17r97` | Q17R97 | numeric | dimension | U | 47.0% |
| 59 | `Q17r98` | Q17R98 | numeric | dimension | U | 47.0% |
| 60 | `Q17r99` | Q17R99 | numeric | dimension | U | 47.0% |
| 61 | `Q18Ar1` | Q18Ar1 | numeric | dimension | G | 0.0% |
| 62 | `Q18Ar2` | Q18Ar2 | numeric | dimension | G | 0.0% |
| 63 | `Q18Ar3` | Q18Ar3 | numeric | dimension | G | 0.0% |
| 64 | `Q18Ar4` | Q18Ar4 | numeric | dimension | G | 0.0% |
| 65 | `Q18Ar5` | Q18Ar5 | numeric | dimension | G | 0.0% |
| 66 | `Q18Ar6` | Q18Ar6 | numeric | dimension | G | 0.0% |
| 67 | `Q18Ar96` | Q18Ar96 | numeric | dimension | G | 0.0% |
| 68 | `Q18Ar97` | Q18Ar97 | numeric | dimension | G | 0.0% |
| 69 | `Q18Ar98` | Q18Ar98 | numeric | dimension | G | 0.0% |
| 70 | `Q18Ar99` | Q18Ar99 | numeric | dimension | G | 0.0% |
| 71 | `Q18B` | Q18B | numeric | dimension | P | 67.4% |
| 72 | `REVEN` | Reven | numeric | dimension | G | 0.0% |
| 73 | `REVEN2` | Reven2 | numeric | dimension | G | 0.0% |
| 74 | `Q19` | Q19 | numeric | measure | P | 76.3% |
| 75 | `Q19_r0` | Q19 R0 | numeric | dimension | P | 73.4% |
| 76 | `Q20r1` | Q20R1 | numeric | dimension | P | 76.3% |
| 77 | `Q20r2` | Q20R2 | numeric | dimension | P | 76.3% |
| 78 | `Q20r3` | Q20R3 | numeric | dimension | P | 76.3% |
| 79 | `Q20r4` | Q20R4 | numeric | dimension | P | 76.3% |
| 80 | `Q20r5` | Q20R5 | numeric | dimension | P | 76.3% |
| 81 | `Q20r6` | Q20R6 | numeric | dimension | P | 76.3% |
| 82 | `Q20r7` | Q20R7 | numeric | dimension | P | 76.3% |
| 83 | `Q20r8` | Q20R8 | numeric | dimension | P | 76.3% |
| 84 | `Q20r9` | Q20R9 | numeric | dimension | P | 76.3% |
| 85 | `Q20r96` | Q20R96 | numeric | dimension | P | 76.3% |
| 86 | `Q20r97` | Q20R97 | numeric | dimension | P | 76.3% |
| 87 | `Q20r98` | Q20R98 | numeric | dimension | P | 76.3% |
| 88 | `Q20r99` | Q20R99 | numeric | dimension | P | 76.3% |
| 89 | `Q21` | Q21 | numeric | dimension | P | 76.3% |
| 90 | `Q22r1` | Q22R1 | numeric | dimension | U | 38.5% |
| 91 | `Q22r2` | Q22R2 | numeric | dimension | U | 38.5% |
| 92 | `Q22r3` | Q22R3 | numeric | dimension | U | 38.5% |
| 93 | `Q22r4` | Q22R4 | numeric | dimension | U | 38.5% |
| 94 | `Q22r5` | Q22R5 | numeric | dimension | U | 38.5% |
| 95 | `Q22r6` | Q22R6 | numeric | dimension | U | 38.5% |
| 96 | `Q22r7` | Q22R7 | numeric | dimension | U | 38.5% |
| 97 | `Q22r8` | Q22R8 | numeric | dimension | U | 38.5% |
| 98 | `Q22r96` | Q22R96 | numeric | dimension | U | 38.5% |
| 99 | `Q22r97` | Q22R97 | numeric | dimension | U | 38.5% |
| 100 | `Q22r98` | Q22R98 | numeric | dimension | U | 38.5% |
| 101 | `Q22r99` | Q22R99 | numeric | dimension | U | 38.5% |
| 102 | `Q23r1` | Q23R1 | numeric | dimension | U | 44.5% |
| 103 | `Q23r2` | Q23R2 | numeric | dimension | U | 44.5% |
| 104 | `Q23r3` | Q23R3 | numeric | dimension | U | 44.5% |
| 105 | `Q23r4` | Q23R4 | numeric | dimension | U | 44.5% |
| 106 | `Q23r5` | Q23R5 | numeric | dimension | U | 44.5% |
| 107 | `Q23r6` | Q23R6 | numeric | dimension | U | 44.5% |
| 108 | `Q23r7` | Q23R7 | numeric | dimension | U | 44.5% |
| 109 | `Q23r8` | Q23R8 | numeric | dimension | U | 44.5% |
| 110 | `Q23r9` | Q23R9 | numeric | dimension | U | 44.5% |
| 111 | `Q23r96` | Q23R96 | numeric | dimension | U | 44.5% |
| 112 | `Q23r97` | Q23R97 | numeric | dimension | U | 44.5% |
| 113 | `Q23r98` | Q23R98 | numeric | dimension | U | 44.5% |
| 114 | `Q23r99` | Q23R99 | numeric | dimension | U | 44.5% |
| 115 | `Q24r1` | Q24R1 | numeric | exclude | E | 92.8% |
| 116 | `Q24r2` | Q24R2 | numeric | exclude | E | 92.8% |
| 117 | `Q24r3` | Q24R3 | numeric | exclude | E | 92.8% |
| 118 | `Q24r4` | Q24R4 | numeric | exclude | E | 92.8% |
| 119 | `Q24r5` | Q24R5 | numeric | exclude | E | 92.8% |
| 120 | `Q24r6` | Q24R6 | numeric | exclude | E | 92.8% |
| 121 | `Q24r7` | Q24R7 | numeric | exclude | E | 92.8% |
| 122 | `Q24r8` | Q24R8 | numeric | exclude | E | 92.8% |
| 123 | `Q24r96` | Q24R96 | numeric | exclude | E | 92.8% |
| 124 | `Q24r97` | Q24R97 | numeric | exclude | E | 92.8% |
| 125 | `Q24r98` | Q24R98 | numeric | exclude | E | 92.8% |
| 126 | `Q24r99` | Q24R99 | numeric | exclude | E | 92.8% |
| 127 | `Q25` | Q25 | numeric | dimension | U | 38.5% |
| 128 | `Q26` | Q26 | numeric | dimension | P | 78.0% |
| 129 | `Q27` | Q27 | numeric | dimension | U | 38.5% |
| 130 | `PROP` | Prop | numeric | dimension | G | 0.0% |
| 131 | `Q28` | Q28 | numeric | dimension | G | 0.0% |
| 132 | `Q29` | Q29 | numeric | dimension | U | 42.3% |
| 133 | `Q30` | Q30 | numeric | dimension | G | 0.0% |
| 134 | `Q31r1` | Q31R1 | numeric | measure | U | 19.5% |
| 135 | `Q31_r0` | Q31 R0 | numeric | dimension | G | 0.0% |
| 136 | `Q32` | Q32 | numeric | dimension | G | 0.0% |
| 137 | `Q33r1` | Q33R1 | numeric | dimension | G | 0.0% |
| 138 | `Q33r2` | Q33R2 | numeric | dimension | G | 0.0% |
| 139 | `Q33r3` | Q33R3 | numeric | dimension | G | 0.0% |
| 140 | `Q33r4` | Q33R4 | numeric | dimension | G | 0.0% |
| 141 | `Q33r5` | Q33R5 | numeric | dimension | G | 0.0% |
| 142 | `Q33r6` | Q33R6 | numeric | dimension | G | 0.0% |
| 143 | `Q33r97` | Q33R97 | numeric | dimension | G | 0.0% |
| 144 | `Q34r1` | Q34R1 | numeric | dimension | G | 5.0% |
| 145 | `Q34_r0` | Q34 R0 | numeric | dimension | G | 0.0% |
| 146 | `Q35r1` | Q35R1 | numeric | dimension | G | 0.0% |
| 147 | `Q35r2` | Q35R2 | numeric | dimension | G | 0.0% |
| 148 | `Q35r3` | Q35R3 | numeric | dimension | G | 0.0% |
| 149 | `Q35r4` | Q35R4 | numeric | dimension | G | 0.0% |
| 150 | `Q35r5` | Q35R5 | numeric | dimension | G | 0.0% |
| 151 | `Q35r6` | Q35R6 | numeric | dimension | G | 0.0% |
| 152 | `Q36r1` | Q36R1 | numeric | dimension | G | 0.0% |
| 153 | `Q36r2` | Q36R2 | numeric | dimension | G | 0.0% |
| 154 | `Q36r3` | Q36R3 | numeric | dimension | G | 0.0% |
| 155 | `Q36r4` | Q36R4 | numeric | dimension | G | 0.0% |
| 156 | `Q36r5` | Q36R5 | numeric | dimension | G | 0.0% |
| 157 | `Q36r6` | Q36R6 | numeric | dimension | G | 0.0% |
| 158 | `Q36r7` | Q36R7 | numeric | dimension | G | 0.0% |
| 159 | `Q36r8` | Q36R8 | numeric | dimension | G | 0.0% |
| 160 | `Q36r96` | Q36R96 | numeric | dimension | G | 0.0% |
| 161 | `Q36r97` | Q36R97 | numeric | dimension | G | 0.0% |
| 162 | `Q36r98` | Q36R98 | numeric | dimension | G | 0.0% |
| 163 | `Q36r99` | Q36R99 | numeric | dimension | G | 0.0% |
| 164 | `Q37` | Q37 | numeric | dimension | G | 0.0% |
| 165 | `Q38r1` | Q38R1 | numeric | dimension | P | 66.8% |
| 166 | `Q38r2` | Q38R2 | numeric | dimension | P | 66.8% |
| 167 | `Q38r3` | Q38R3 | numeric | dimension | P | 66.8% |
| 168 | `Q38r4` | Q38R4 | numeric | dimension | P | 66.8% |
| 169 | `Q38r5` | Q38R5 | numeric | dimension | P | 66.8% |
| 170 | `Q38r6` | Q38R6 | numeric | dimension | P | 66.8% |
| 171 | `Q38r7` | Q38R7 | numeric | dimension | P | 66.8% |
| 172 | `Q38r8` | Q38R8 | numeric | dimension | P | 66.8% |
| 173 | `Q38r9` | Q38R9 | numeric | dimension | P | 66.8% |
| 174 | `Q38r96` | Q38R96 | numeric | dimension | P | 66.8% |
| 175 | `Q38r98` | Q38R98 | numeric | dimension | P | 66.8% |
| 176 | `Q38r99` | Q38R99 | numeric | dimension | P | 66.8% |
| 177 | `Q39r1` | Q39R1 | numeric | measure | U | 12.6% |
| 178 | `Q39_r0` | Q39 R0 | numeric | dimension | G | 0.0% |
| 179 | `Q40r1` | Q40R1 | numeric | dimension | P | 58.6% |
| 180 | `Q40_r0` | Q40 R0 | numeric | dimension | P | 54.4% |
| 181 | `Q41` | Q41 | numeric | dimension | U | 12.6% |
| 182 | `Q42` | Q42 | numeric | dimension | G | 0.0% |
| 183 | `Q43` | Q43 | numeric | dimension | G | 0.0% |
| 184 | `Q44` | Q44 | numeric | dimension | G | 0.0% |
| 185 | `Q45` | Q45 | numeric | dimension | G | 0.0% |
| 186 | `Q46` | Q46 | numeric | dimension | G | 0.0% |
| 187 | `Q47` | Q47 | numeric | dimension | G | 0.0% |
| 188 | `Q47B` | Q47B | numeric | dimension | G | 0.0% |
| 189 | `Q48` | Q48 | numeric | dimension | G | 0.0% |
| 190 | `Q49r1` | Q49R1 | numeric | dimension | G | 0.0% |
| 191 | `Q49r2` | Q49R2 | numeric | dimension | G | 0.0% |
| 192 | `Q49r3` | Q49R3 | numeric | dimension | G | 0.0% |
| 193 | `Q49r4` | Q49R4 | numeric | dimension | G | 0.0% |
| 194 | `Q49r97` | Q49R97 | numeric | dimension | G | 0.0% |
| 195 | `Q49r98` | Q49R98 | numeric | dimension | G | 0.0% |
| 196 | `Q49r99` | Q49R99 | numeric | dimension | G | 0.0% |
| 197 | `Q50r1` | Q50R1 | numeric | dimension | G | 0.0% |
| 198 | `Q50r2` | Q50R2 | numeric | dimension | G | 0.0% |
| 199 | `Q50r3` | Q50R3 | numeric | dimension | G | 0.0% |
| 200 | `Q50r4` | Q50R4 | numeric | dimension | G | 0.0% |
| 201 | `Q50r96` | Q50R96 | numeric | dimension | G | 0.0% |
| 202 | `Q50r97` | Q50R97 | numeric | dimension | G | 0.0% |
| 203 | `Q50r98` | Q50R98 | numeric | dimension | G | 0.0% |
| 204 | `Q50r99` | Q50R99 | numeric | dimension | G | 0.0% |
| 205 | `Q51A` | Q51A | numeric | dimension | G | 0.0% |
| 206 | `Q51Br2` | Q51Br2 | numeric | dimension | G | 0.0% |
| 207 | `Q51Br3` | Q51Br3 | numeric | dimension | G | 0.0% |
| 208 | `Q51Br4` | Q51Br4 | numeric | dimension | G | 0.0% |
| 209 | `Q51Br5` | Q51Br5 | numeric | dimension | G | 0.0% |
| 210 | `Q51Br6` | Q51Br6 | numeric | dimension | G | 0.0% |
| 211 | `Q51Br96` | Q51Br96 | numeric | dimension | G | 0.0% |
| 212 | `Q51Br97` | Q51Br97 | numeric | dimension | G | 0.0% |
| 213 | `Q51Br98` | Q51Br98 | numeric | dimension | G | 0.0% |
| 214 | `Q51Br99` | Q51Br99 | numeric | dimension | G | 0.0% |
| 215 | `Q52r1` | Q52R1 | numeric | dimension | G | 0.0% |
| 216 | `Q52r2` | Q52R2 | numeric | dimension | G | 0.0% |
| 217 | `Q52r3` | Q52R3 | numeric | dimension | G | 0.0% |
| 218 | `Q52r4` | Q52R4 | numeric | dimension | G | 0.0% |
| 219 | `Q52r5` | Q52R5 | numeric | dimension | G | 0.0% |
| 220 | `Q52r6` | Q52R6 | numeric | dimension | G | 0.0% |
| 221 | `Q52r7` | Q52R7 | numeric | dimension | G | 0.0% |
| 222 | `Q52r8` | Q52R8 | numeric | dimension | G | 0.0% |
| 223 | `Q52r9` | Q52R9 | numeric | dimension | G | 0.0% |
| 224 | `Q52r96` | Q52R96 | numeric | dimension | U | 41.2% |
| 225 | `Q53r1` | Q53R1 | numeric | dimension | P | 64.8% |
| 226 | `Q53r2` | Q53R2 | numeric | dimension | P | 64.8% |
| 227 | `Q53r3` | Q53R3 | numeric | dimension | P | 64.8% |
| 228 | `Q53r4` | Q53R4 | numeric | dimension | P | 64.8% |
| 229 | `Q53r5` | Q53R5 | numeric | dimension | P | 64.8% |
| 230 | `Q53r6` | Q53R6 | numeric | dimension | P | 64.8% |
| 231 | `Q53r7` | Q53R7 | numeric | dimension | P | 64.8% |
| 232 | `Q53r8` | Q53R8 | numeric | dimension | P | 64.8% |
| 233 | `Q53r96` | Q53R96 | numeric | dimension | P | 64.8% |
| 234 | `Q53r98` | Q53R98 | numeric | dimension | P | 64.8% |
| 235 | `Q53r99` | Q53R99 | numeric | dimension | P | 64.8% |
| 236 | `Q54r1` | Q54R1 | numeric | dimension | U | 33.6% |
| 237 | `Q54r2` | Q54R2 | numeric | dimension | P | 78.4% |
| 238 | `Q54r3` | Q54R3 | numeric | dimension | U | 16.8% |
| 239 | `Q54r4` | Q54R4 | numeric | exclude | E | 96.6% |
| 240 | `Q54r5` | Q54R5 | numeric | dimension | P | 81.1% |
| 241 | `Q54r6` | Q54R6 | numeric | dimension | U | 15.5% |
| 242 | `Q54r96` | Q54R96 | numeric | exclude | E | 96.9% |
| 243 | `Q54_r98` | Q54 R98 | numeric | dimension | G | 0.0% |
| 244 | `Q54_r99` | Q54 R99 | numeric | dimension | G | 0.0% |
| 245 | `Q54Top1` | Q54Top1 | numeric | dimension | G | 0.8% |
| 246 | `Q55r1` | Q55R1 | numeric | dimension | G | 0.0% |
| 247 | `Q55r2` | Q55R2 | numeric | dimension | G | 0.0% |
| 248 | `Q55r3` | Q55R3 | numeric | dimension | G | 0.0% |
| 249 | `Q56` | Q56 | numeric | measure | U | 33.6% |
| 250 | `Q56_r0` | Q56 R0 | numeric | dimension | U | 28.4% |
| 251 | `Q57r1` | Q57R1 | numeric | dimension | P | 65.1% |
| 252 | `Q57r2` | Q57R2 | numeric | dimension | P | 65.1% |
| 253 | `Q57r3` | Q57R3 | numeric | dimension | P | 65.1% |
| 254 | `Q57r4` | Q57R4 | numeric | dimension | P | 65.1% |
| 255 | `Q57r5` | Q57R5 | numeric | dimension | P | 65.1% |
| 256 | `Q57r6` | Q57R6 | numeric | dimension | P | 65.1% |
| 257 | `Q57r7` | Q57R7 | numeric | dimension | P | 65.1% |
| 258 | `Q57r8` | Q57R8 | numeric | dimension | P | 65.1% |
| 259 | `Q57r9` | Q57R9 | numeric | dimension | P | 65.1% |
| 260 | `Q57r10` | Q57R10 | numeric | dimension | P | 65.1% |
| 261 | `Q57r96` | Q57R96 | numeric | dimension | P | 65.1% |
| 262 | `Q57r98` | Q57R98 | numeric | dimension | P | 65.1% |
| 263 | `Q57r99` | Q57R99 | numeric | dimension | P | 65.1% |
| 264 | `Q58r1` | Q58R1 | numeric | dimension | G | 0.0% |
| 265 | `Q58r2` | Q58R2 | numeric | dimension | G | 0.0% |
| 266 | `Q58r3` | Q58R3 | numeric | dimension | G | 0.0% |
| 267 | `Q58r4` | Q58R4 | numeric | dimension | G | 0.0% |
| 268 | `Q58r5` | Q58R5 | numeric | dimension | G | 0.0% |
| 269 | `Q58r6` | Q58R6 | numeric | dimension | G | 0.0% |
| 270 | `Q58r96` | Q58R96 | numeric | dimension | G | 0.0% |
| 271 | `Q58r98` | Q58R98 | numeric | dimension | G | 0.0% |
| 272 | `Q58r99` | Q58R99 | numeric | dimension | G | 0.0% |
| 273 | `Q58X` | X coordinate (MTM) (Q58X) | numeric | dimension | G | 0.0% |
| 274 | `Q59r1` | Q59R1 | numeric | dimension | P | 56.4% |
| 275 | `Q59r2` | Q59R2 | numeric | dimension | P | 56.4% |
| 276 | `Q59r3` | Q59R3 | numeric | dimension | P | 56.4% |
| 277 | `Q59r4` | Q59R4 | numeric | dimension | P | 56.4% |
| 278 | `Q59r5` | Q59R5 | numeric | dimension | P | 56.4% |
| 279 | `Q59r6` | Q59R6 | numeric | dimension | P | 56.4% |
| 280 | `Q59r7` | Q59R7 | numeric | dimension | P | 56.4% |
| 281 | `Q59r8` | Q59R8 | numeric | dimension | P | 56.4% |
| 282 | `Q59r9` | Q59R9 | numeric | dimension | P | 56.4% |
| 283 | `Q59r10` | Q59R10 | numeric | dimension | P | 56.4% |
| 284 | `Q59r11` | Q59R11 | numeric | dimension | P | 56.4% |
| 285 | `Q59r12` | Q59R12 | numeric | dimension | P | 56.4% |
| 286 | `Q60` | Q60 | numeric | dimension | G | 0.0% |
| 287 | `Q61r1` | Q61R1 | numeric | dimension | P | 72.0% |
| 288 | `Q61r2` | Q61R2 | numeric | dimension | P | 72.0% |
| 289 | `Q61r3` | Q61R3 | numeric | dimension | P | 72.0% |
| 290 | `Q61r4` | Q61R4 | numeric | dimension | P | 72.0% |
| 291 | `Q61r5` | Q61R5 | numeric | dimension | P | 72.0% |
| 292 | `Q61r6` | Q61R6 | numeric | dimension | P | 72.0% |
| 293 | `Q61r7` | Q61R7 | numeric | dimension | P | 72.0% |
| 294 | `Q61r8` | Q61R8 | numeric | dimension | P | 72.0% |
| 295 | `Q61r9` | Q61R9 | numeric | dimension | P | 72.0% |
| 296 | `Q61r10` | Q61R10 | numeric | dimension | P | 72.0% |
| 297 | `Q61r96` | Q61R96 | numeric | dimension | P | 72.0% |
| 298 | `Q61r98` | Q61R98 | numeric | dimension | P | 72.0% |
| 299 | `Q61r99` | Q61R99 | numeric | dimension | P | 72.0% |
| 300 | `Q62` | Q62 | numeric | dimension | G | 0.0% |
| 301 | `Q63` | Q63 | numeric | dimension | G | 0.0% |
| 302 | `Q64` | Q64 | numeric | dimension | U | 26.7% |
| 303 | `Q65r1` | Q65R1 | numeric | dimension | P | 78.3% |
| 304 | `Q65r2` | Q65R2 | numeric | dimension | P | 78.3% |
| 305 | `Q65r3` | Q65R3 | numeric | dimension | P | 78.3% |
| 306 | `Q65r4` | Q65R4 | numeric | dimension | P | 78.3% |
| 307 | `Q65r5` | Q65R5 | numeric | dimension | P | 78.3% |
| 308 | `Q65r6` | Q65R6 | numeric | dimension | P | 78.3% |
| 309 | `Q65r7` | Q65R7 | numeric | dimension | P | 78.3% |
| 310 | `Q65r8` | Q65R8 | numeric | dimension | P | 78.3% |
| 311 | `Q65r9` | Q65R9 | numeric | dimension | P | 78.3% |
| 312 | `Q65r10` | Q65R10 | numeric | dimension | P | 78.3% |
| 313 | `Q65r11` | Q65R11 | numeric | dimension | P | 78.3% |
| 314 | `Q65r98` | Q65R98 | numeric | dimension | P | 78.3% |
| 315 | `Q65r99` | Q65R99 | numeric | dimension | P | 78.3% |
| 316 | `Q66` | Q66 | numeric | dimension | G | 0.0% |
| 317 | `Q67` | Q67 | numeric | dimension | P | 58.6% |
| 318 | `Q68r1` | Q68R1 | numeric | dimension | P | 85.6% |
| 319 | `Q68r2` | Q68R2 | numeric | dimension | P | 85.6% |
| 320 | `Q68r3` | Q68R3 | numeric | dimension | P | 85.6% |
| 321 | `Q68r4` | Q68R4 | numeric | dimension | P | 85.6% |
| 322 | `Q68r5` | Q68R5 | numeric | dimension | P | 85.6% |
| 323 | `Q68r6` | Q68R6 | numeric | dimension | P | 85.6% |
| 324 | `Q68r7` | Q68R7 | numeric | dimension | P | 85.6% |
| 325 | `Q68r8` | Q68R8 | numeric | dimension | P | 85.6% |
| 326 | `Q68r9` | Q68R9 | numeric | dimension | P | 85.6% |
| 327 | `Q68r10` | Q68R10 | numeric | dimension | P | 85.6% |
| 328 | `Q68r11` | Q68R11 | numeric | dimension | P | 85.6% |
| 329 | `Q68r98` | Q68R98 | numeric | dimension | P | 85.6% |
| 330 | `Q68r99` | Q68R99 | numeric | dimension | P | 85.6% |
| 331 | `Q69` | Q69 | numeric | dimension | G | 0.0% |
| 332 | `Q70` | Q70 | numeric | dimension | U | 22.1% |
| 333 | `Q71r1` | Q71R1 | numeric | dimension | P | 83.5% |
| 334 | `Q71r2` | Q71R2 | numeric | dimension | P | 83.5% |
| 335 | `Q71r3` | Q71R3 | numeric | dimension | P | 83.5% |
| 336 | `Q71r4` | Q71R4 | numeric | dimension | P | 83.5% |
| 337 | `Q71r5` | Q71R5 | numeric | dimension | P | 83.5% |
| 338 | `Q71r6` | Q71R6 | numeric | dimension | P | 83.5% |
| 339 | `Q71r7` | Q71R7 | numeric | dimension | P | 83.5% |
| 340 | `Q71r8` | Q71R8 | numeric | dimension | P | 83.5% |
| 341 | `Q71r9` | Q71R9 | numeric | dimension | P | 83.5% |
| 342 | `Q71r10` | Q71R10 | numeric | dimension | P | 83.5% |
| 343 | `Q71r11` | Q71R11 | numeric | dimension | P | 83.5% |
| 344 | `Q71r98` | Q71R98 | numeric | dimension | P | 83.5% |
| 345 | `Q71r99` | Q71R99 | numeric | dimension | P | 83.5% |
| 346 | `Q72` | Q72 | numeric | dimension | G | 0.0% |
| 347 | `Q73` | Q73 | numeric | dimension | U | 39.9% |
| 348 | `Q74` | Q74 | numeric | dimension | G | 0.0% |
| 349 | `Q75` | Q75 | numeric | dimension | U | 42.8% |
| 350 | `Q76r1` | Q76R1 | numeric | dimension | G | 0.0% |
| 351 | `Q76r2` | Q76R2 | numeric | dimension | G | 0.0% |
| 352 | `Q76r3` | Q76R3 | numeric | dimension | G | 0.0% |
| 353 | `Q76r4` | Q76R4 | numeric | dimension | G | 0.0% |
| 354 | `Q76r5` | Q76R5 | numeric | dimension | G | 0.0% |
| 355 | `Q76r6` | Q76R6 | numeric | dimension | G | 0.0% |
| 356 | `Q76r7` | Q76R7 | numeric | dimension | G | 0.0% |
| 357 | `Q76r96` | Q76R96 | numeric | dimension | G | 0.0% |
| 358 | `Q76r98` | Q76R98 | numeric | dimension | G | 0.0% |
| 359 | `Q76r99` | Q76R99 | numeric | dimension | G | 0.0% |
| 360 | `Q77` | Q77 | numeric | dimension | G | 0.0% |
| 361 | `weight` | Weight | numeric | measure | G | 0.0% |

**Dimensions** (331): `sexe`, `age`, `ARRON`, `NAISS`, `NAIS2r9`, `LANGU`, `LGBTQ`, `MINO`, `MINO2`, `SCOL`, `SCOL2`, `SCOL3`, `SCOL2r1oe`, `Q1`, `Q2r1`, `Q2r2`, `Q2r3`, `Q2r4`, `Q2r5`, `Q2r6`, `Q2r7`, `Q2r8`, `FOY1`, `FOY1_r1`, `FOY1_r99`, `APPAR1`, `APP1_r97`, `APP1_r99`, `ENFAN`, `CHARGE`, `CHAR_r0`, `CHAR_r99`, `Q4`, `Q5`, `Q6`, `Q7`, `OCCUP`, `Q13`, `Q14`, `Q16`, `Q17r1`, `Q17r2`, `Q17r3`, `Q17r4`, `Q17r5`, `Q17r6`, `Q17r97`, `Q17r98`, `Q17r99`, `Q18Ar1`, `Q18Ar2`, `Q18Ar3`, `Q18Ar4`, `Q18Ar5`, `Q18Ar6`, `Q18Ar96`, `Q18Ar97`, `Q18Ar98`, `Q18Ar99`, `Q18B`, `REVEN`, `REVEN2`, `Q19_r0`, `Q20r1`, `Q20r2`, `Q20r3`, `Q20r4`, `Q20r5`, `Q20r6`, `Q20r7`, `Q20r8`, `Q20r9`, `Q20r96`, `Q20r97`, `Q20r98`, `Q20r99`, `Q21`, `Q22r1`, `Q22r2`, `Q22r3`, `Q22r4`, `Q22r5`, `Q22r6`, `Q22r7`, `Q22r8`, `Q22r96`, `Q22r97`, `Q22r98`, `Q22r99`, `Q23r1`, `Q23r2`, `Q23r3`, `Q23r4`, `Q23r5`, `Q23r6`, `Q23r7`, `Q23r8`, `Q23r9`, `Q23r96`, `Q23r97`, `Q23r98`, `Q23r99`, `Q25`, `Q26`, `Q27`, `PROP`, `Q28`, `Q29`, `Q30`, `Q31_r0`, `Q32`, `Q33r1`, `Q33r2`, `Q33r3`, `Q33r4`, `Q33r5`, `Q33r6`, `Q33r97`, `Q34r1`, `Q34_r0`, `Q35r1`, `Q35r2`, `Q35r3`, `Q35r4`, `Q35r5`, `Q35r6`, `Q36r1`, `Q36r2`, `Q36r3`, `Q36r4`, `Q36r5`, `Q36r6`, `Q36r7`, `Q36r8`, `Q36r96`, `Q36r97`, `Q36r98`, `Q36r99`, `Q37`, `Q38r1`, `Q38r2`, `Q38r3`, `Q38r4`, `Q38r5`, `Q38r6`, `Q38r7`, `Q38r8`, `Q38r9`, `Q38r96`, `Q38r98`, `Q38r99`, `Q39_r0`, `Q40r1`, `Q40_r0`, `Q41`, `Q42`, `Q43`, `Q44`, `Q45`, `Q46`, `Q47`, `Q47B`, `Q48`, `Q49r1`, `Q49r2`, `Q49r3`, `Q49r4`, `Q49r97`, `Q49r98`, `Q49r99`, `Q50r1`, `Q50r2`, `Q50r3`, `Q50r4`, `Q50r96`, `Q50r97`, `Q50r98`, `Q50r99`, `Q51A`, `Q51Br2`, `Q51Br3`, `Q51Br4`, `Q51Br5`, `Q51Br6`, `Q51Br96`, `Q51Br97`, `Q51Br98`, `Q51Br99`, `Q52r1`, `Q52r2`, `Q52r3`, `Q52r4`, `Q52r5`, `Q52r6`, `Q52r7`, `Q52r8`, `Q52r9`, `Q52r96`, `Q53r1`, `Q53r2`, `Q53r3`, `Q53r4`, `Q53r5`, `Q53r6`, `Q53r7`, `Q53r8`, `Q53r96`, `Q53r98`, `Q53r99`, `Q54r1`, `Q54r2`, `Q54r3`, `Q54r5`, `Q54r6`, `Q54_r98`, `Q54_r99`, `Q54Top1`, `Q55r1`, `Q55r2`, `Q55r3`, `Q56_r0`, `Q57r1`, `Q57r2`, `Q57r3`, `Q57r4`, `Q57r5`, `Q57r6`, `Q57r7`, `Q57r8`, `Q57r9`, `Q57r10`, `Q57r96`, `Q57r98`, `Q57r99`, `Q58r1`, `Q58r2`, `Q58r3`, `Q58r4`, `Q58r5`, `Q58r6`, `Q58r96`, `Q58r98`, `Q58r99`, `Q58X`, `Q59r1`, `Q59r2`, `Q59r3`, `Q59r4`, `Q59r5`, `Q59r6`, `Q59r7`, `Q59r8`, `Q59r9`, `Q59r10`, `Q59r11`, `Q59r12`, `Q60`, `Q61r1`, `Q61r2`, `Q61r3`, `Q61r4`, `Q61r5`, `Q61r6`, `Q61r7`, `Q61r8`, `Q61r9`, `Q61r10`, `Q61r96`, `Q61r98`, `Q61r99`, `Q62`, `Q63`, `Q64`, `Q65r1`, `Q65r2`, `Q65r3`, `Q65r4`, `Q65r5`, `Q65r6`, `Q65r7`, `Q65r8`, `Q65r9`, `Q65r10`, `Q65r11`, `Q65r98`, `Q65r99`, `Q66`, `Q67`, `Q68r1`, `Q68r2`, `Q68r3`, `Q68r4`, `Q68r5`, `Q68r6`, `Q68r7`, `Q68r8`, `Q68r9`, `Q68r10`, `Q68r11`, `Q68r98`, `Q68r99`, `Q69`, `Q70`, `Q71r1`, `Q71r2`, `Q71r3`, `Q71r4`, `Q71r5`, `Q71r6`, `Q71r7`, `Q71r8`, `Q71r9`, `Q71r10`, `Q71r11`, `Q71r98`, `Q71r99`, `Q72`, `Q73`, `Q74`, `Q75`, `Q76r1`, `Q76r2`, `Q76r3`, `Q76r4`, `Q76r5`, `Q76r6`, `Q76r7`, `Q76r96`, `Q76r98`, `Q76r99`, `Q77`

**Measures** (10): `record`, `Q3r1`, `Q5O`, `Q7O`, `Q15r1`, `Q19`, `Q31r1`, `Q39r1`, `Q56`, `weight`

**Date fields** (1): `date`

**Join opportunities:** temporal join via date fields

---

## Programme d'aide-financière Inclusion et innovation
### Programme D Aide Financire inclusion Et Innovation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-programme-inclusion-innovation2008-2014` |
| **Quality Grade** | **D** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | irregular |
| **Total Records** | 70 |
| **Formats** | CSV |

> Statistiques de participation du programme Inclusion et innovation et données financières. Le programme Inclusion et innovation soutient financièrement des projets novateurs en pratique artistique amateur pour favoriser l’inclusion culturelle des citoyens.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Arrondissement` | Borough | category | dimension | G | 4.3% |
| 2 | `Organisme` | Organization | identifier | exclude | G | 2.9% |
| 3 | `2008` | 2008 | numeric | exclude | E | 90.0% |
| 4 | `2009 1e appel` | 2009 1E Appel | numeric | dimension | P | 88.6% |
| 5 | `2009 2e appel` | 2009 2E Appel | numeric | exclude | E | 90.0% |
| 6 | `2010 1er appel` | 2010 1Er Appel | numeric | dimension | P | 87.1% |
| 7 | `2010 2e appel` | 2010 2E Appel | numeric | dimension | P | 84.3% |
| 8 | `2011 1er appel` | 2011 1Er Appel | numeric | dimension | P | 87.1% |
| 9 | `2011 2e appel` | 2011 2E Appel | numeric | dimension | P | 85.7% |
| 10 | `2012 1er appel` | 2012 1Er Appel | numeric | dimension | P | 87.1% |
| 11 | `2012 2e appel` | 2012 2E Appel | numeric | dimension | P | 87.1% |
| 12 | `2013 1er appel` | 2013 1Er Appel | numeric | dimension | P | 85.7% |
| 13 | `2013 2e appel` | 2013 2E Appel | numeric | dimension | P | 81.4% |
| 14 | `2014 1er appel` | 2014 1Er Appel | numeric | dimension | P | 87.1% |
| 15 | `2014 2e appel` | 2014 2E Appel | numeric | dimension | P | 85.7% |
| 16 | `TOTAL` | Total | numeric | measure | G | 1.4% |

**Dimensions** (12): `Arrondissement`, `2009 1e appel`, `2010 1er appel`, `2010 2e appel`, `2011 1er appel`, `2011 2e appel`, `2012 1er appel`, `2012 2e appel`, `2013 1er appel`, `2013 2e appel`, `2014 1er appel`, `2014 2e appel`

**Measures** (1): `TOTAL`

**Join opportunities:** boroughs via arrondissement field

---

## Art public - Information sur les oeuvres de la collection municipale
### Art public Information Sur Les Oeuvres De La Collection Municipale

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-art-public-information-sur-les-oeuvres-de-la-collection-municipale` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | JSON |

> Information sur les oeuvres de la collection municipale d'art public diffusées en ligne au [site Art public](https://artpublic.ville.montreal.qc.ca/) dont : le titre de l'oeuvre, le nom de l'artiste, la date de réalisation, la catégorie de l'objet, le mode d'acquisition, les matériaux, l'arrondissem

**Warnings:**
- No DataStore resource (API not available)

---

## Bibliothèques de Montréal - statistiques sur le prêt, les collections et la fréquentation
### Bibliothques De Montral statistics Sur Le Prt Les Collections Et La Frquentation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-bibliotheques-montreal-statistiques` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Direction des bibliothèques |
| **Update Frequency** | annual |
| **Total Records** | 97 |
| **Formats** | XLSX, XLS |

> Tableaux de données qui présentent les statistiques de prêt, de collections et de fréquentation des 45 bibliothèques de Montréal.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `BIBLIOTHÈQUE` | Bibliothèque | text | filter | U | 22.7% |
| 2 | `Nouveautés` | Nouveaut S | numeric | measure | U | 25.8% |
| 3 | `Livres` | Livres | numeric | measure | U | 25.8% |
| 4 | `Périodiques` | Périodiques | numeric | measure | U | 25.8% |
| 5 | `Audio` | Audio | numeric | measure | U | 25.8% |
| 6 | `Vidéo` | Identifier | numeric | measure | U | 25.8% |
| 7 | `Autres documents physiques` | Document | numeric | measure | U | 25.8% |
| 8 | `Documents numériques` | Document (Documents numériques) | numeric | measure | U | 33.0% |
| 9 | `TOTAL` | Total | numeric | measure | U | 25.8% |

**Measures** (8): `Nouveautés`, `Livres`, `Périodiques`, `Audio`, `Vidéo`, `Autres documents physiques`, `Documents numériques`, `TOTAL`

---

## Catalogue des documents des bibliothèques
### Catalogue Des Documents Des Bibliothques

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-catalogue-bibliotheques` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Direction des bibliothèques |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | CSV |

> Informations bibliographiques sur les 4 millions de documents que l’on retrouve dans les bibliothèques de Montréal, doublées des statistiques d’emprunt depuis leur inclusion dans le catalogue [« Nelligan Découverte »](https://nelligandecouverte.ville.montreal.qc.ca/).

**Warnings:**
- No DataStore resource (API not available)

---

## Commande personnalisée du recensement 2021
### Commande Personnalise Du census 2021

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-commande-personnalisee-recensement-2021` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | IVT |

> Cet ensemble de données présente les données du recensement de la population de 2021 partagées par Statistique Canada à la Ville de Montréal dans le cadre d'une commande de données réalisée par le Service de diversité et de l'inclusion sociale.  

La Division intelligence d'affaires sociales et op

**Warnings:**
- No DataStore resource (API not available)

---

## Diagnostic de la pratique artistique amateur à Montréal
### Diagnostic De La Pratique Artistique Amateur Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-diagnostic-de-la-pratique-artistique-amateur-a-montreal` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | notPlanned |
| **Total Records** | 26 |
| **Formats** | ZIP |

> Statistiques de l'offre d'activités en pratique artistique amateur par arrondissement, par organisme, par discipline, par groupe d'âge.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Discipline` | Discipline | category | dimension | U | 11.5% |
| 2 | `0-14 ans Nb d'activités` | 0 14 Ans Count D Activit S | category | dimension | U | 23.1% |
| 3 | `15-34 ans Nb d'activités` | 15 34 Ans Count D Activit S | category | dimension | U | 30.8% |
| 4 | `35-54 ans Nb d'activités` | 35 54 Ans Count D Activit S | category | dimension | U | 23.1% |
| 5 | `55 ans et + Nb d'activités` | 55 Ans Et Count D Activit S | category | dimension | U | 23.1% |
| 6 | `Multi-âge` | Multi Âge | category | dimension | U | 30.8% |
| 7 | `Parents enfants` | Parents Enfants | category | dimension | U | 46.2% |
| 8 | `Total` | Total | category | dimension | U | 19.2% |

**Dimensions** (8): `Discipline`, `0-14 ans Nb d'activités`, `15-34 ans Nb d'activités`, `35-54 ans Nb d'activités`, `55 ans et + Nb d'activités`, `Multi-âge`, `Parents enfants`, `Total`

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

## Lieux culturels municipaux de Montréal
### Lieux cultural municipal De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-lieux-culturels` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | XLS, CSV |

> Liste des bibliothèques, musées, salles de spectacles et d’expositions (maisons de la culture, centres culturels), et autres lieux municipaux.

**Warnings:**
- No DataStore resource (API not available)

---

## Répertoire des organismes membres du réseau du loisir culturel de Montréal
### Rpertoire Des Organismes Membres Du Rseau Du Loisir Culturel De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-membres-rlcm` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | notPlanned |
| **Total Records** | 130 |
| **Formats** | CSV |

> Liste des organismes membre du Réseau du loisir culturel de Montréal, avec leurs coordonnées et disciplines artistiques, en date du 25 juin 2014.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Organisme montréalais` | Organization | text | filter | U | 27.7% |
| 2 | `Site internet` | Site Internet | text | filter | U | 39.2% |
| 3 | `Adresse` | Address | text | filter | U | 29.2% |
| 4 | `Code postal` | Postal code | text | dimension | P | 66.9% |
| 5 | `Arts du cirque` | Arts Du Cirque | category | dimension | P | 70.8% |
| 6 | `Arts dramatiques` | Arts Dramatiques | category | dimension | P | 80.0% |
| 7 | `Arts médiatiques` | Arts Médiatiques | category | dimension | P | 81.5% |
| 8 | `Art visuels` | Art Visuels | category | dimension | P | 59.2% |
| 9 | `Création littéraire` | Création Littéraire | category | dimension | P | 84.6% |
| 10 | `Danse` | Danse | category | dimension | P | 75.4% |
| 11 | `Métiers d'art` | Métiers D'Art | category | dimension | P | 82.3% |
| 12 | `Musique` | Musique | category | dimension | P | 72.3% |

**Dimensions** (9): `Code postal`, `Arts du cirque`, `Arts dramatiques`, `Arts médiatiques`, `Art visuels`, `Création littéraire`, `Danse`, `Métiers d'art`, `Musique`

---

## Sites et immeubles protégés en vertu de la Loi sur le patrimoine culturel
### Sites Et Immeubles Protgs En Vertu De La Loi Sur Le heritage Culturel

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-sites-immeubles-proteges-lpc` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données contient des informations géographiques et descriptives sur les immeubles et les sites assujettis à la Loi sur le patrimoine culturel et situés sur le territoire de la Ville de Montréal. Les délimitations polygonales proposées complètent les informations ponctuelles déjà four

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---

## Soutien aux artistes, organismes culturels et arrondissements
### Soutien Aux Artistes Organismes cultural Et Arrondissements

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-soutien-artistes-organismes-culturels` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la culture |
| **Update Frequency** | annual |
| **Total Records** | 869 |
| **Formats** | XLS, CSV |

> Liste des projets recevant un octroi financier par l’entremise de programmes de soutien offerts par le Service de la culture. Prix et bourses décernés aux artistes et organismes.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Nom des programmes` | Program | text | exclude | E | 94.6% |
| 2 | `Entente` | Entente | category | dimension | P | 80.6% |
| 3 | `Montants octroyés en 2015` | Amount | text | filter | U | 29.9% |

**Dimensions** (1): `Entente`

---
