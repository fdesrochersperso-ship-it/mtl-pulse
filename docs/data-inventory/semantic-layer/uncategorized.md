# Non categorise
# Uncategorized

> Generated: 2026-03-10 08:09
> Datasets: 20

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 4 | Excellent |
| **B** | 1 | Good |
| **C** | 2 | Usable |
| **D** | 0 | Sparse |
| **F** | 13 | Unusable |
| | **20** | (7 usable in report builder) |

---

## Datasets

- **[A]** [Statistiques d'utilisation du site web de la Ville de Montréal (montreal.ca)](#vmtl-statistiques-utilisation-site-web-ville-de-montreal) [RB]
- **[A]** [Limite des sociétés de développement commercial (SDC)](#vmtl-limite-des-societes-de-developpement-commercial-sdc) [RB]
- **[A]** [Mesure harmonisée des délais de délivrance de permis](#vmtl-mesure-harmonisee-delais-delivrance-permis) [RB]
- **[A]** [Projet: Station Nomade RSQA](#vmtl-projet-station-nomade-rsqa) [RB]
- **[B]** [Tableau de la rémunération des personnes élues de la Ville de Montréal](#vmtl-remuneration-elus) [RB]
- **[C]** [RSQA - Multi-Polluants (en continu)](#vmtl-rsqa-polluants-gazeux) [RB]
- **[C]** [Commande personnalisée du recensement 2021 du Service de l'habitation](#vmtl-commande-sh-recensement-2021) [RB]
- **[F]** [Développement projeté du réseau de voies réservées et des corridors de mobilité durable (Plan d'urbanisme et de mobilité 2050)](#vmtl-developpement-projete-du-reseau-de-voies-reservees-et-des-corridors-de-mobilite-durable)
- **[F]** [Bilan mensuel sur la criminalité](#vmtl-bilan-mensuel-criminalite)
- **[F]** [Niveaux d'intensification urbaine, seuils minimaux moyens de densité nette et affectation du sol (Plan d'urbanisme et de mobilité 2050)](#vmtl-niveaux-intensification-urbaine-densite-affectation-sol-pum-2050)
- **[F]** [Profils des ménages et des logements 2021](#vmtl-profils-menages-logements)
- **[F]** [Secteurs de référence pour les dispositions en stationnement (Plan d'urbanisme et de mobilité 2050)](#vmtl-secteurs-reference-dispositions-stationnement-plan-urbanisme-mobilite-2050)
- **[F]** [Vision 2050 du réseau de transport collectif structurant (Plan d'urbanisme et de mobilité 2050)](#vmtl-vision-2050-reseau-transport-collectif-structurant-plan-urbanisme-mobilite-2050)
- **[F]** [Secteurs d'opportunité (Plan d'urbanisme et de mobilité 2050)](#vmtl-secteurs-d-opportunite-plan-d-urbanisme-et-de-mobilite-2050)
- **[F]** [Patrimoine et paysages (Plan d'urbanisme et de mobilité 2050)](#vmtl-patrimoine-et-paysages-plan-d-urbanisme-et-de-mobilite-2050)
- **[F]** [Grands ensembles commerciaux péricentriques présentant un potentiel de redéveloppement (Plan d'urbanisme et de mobilité 2050)](#vmtl-grands-ensembles-commerciaux-pericentriques-redeveloppement-plan-urbanisme-mobilite-2050)
- **[F]** [Géobase double - côtés de rue du réseau routier (statique)](#vmtl-geobase-double-statique)
- **[F]** [Projet: Station Longue-Pointe (25)](#vmtl-projet-station-longue-pointe-25)
- **[F]** [Règle 3-30-30 pour le suivi de l'accès aux espaces verts](#vmtl-regle-3-30-30-pour-le-suivi-de-l-acces-aux-espaces-verts)
- **[F]** [Milieux humides à protéger ou à restaurer (sous contrôle intérimaire)](#vmtl-milieux-humides-sous-controle-interimaire)

---

## Limite des sociétés de développement commercial (SDC)
### Boundary Des Socits De Dveloppement Commercial Sdc

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-limite-des-societes-de-developpement-commercial-sdc` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service du développement économique |
| **Update Frequency** | asNeeded |
| **Total Records** | 27 |
| **Formats** | SHP, GPKG, GEOJSON, CSV |

> Polygones des limites des sociétés de développement commercial (SDC) présentent sur le territoire de la Ville de Montréal. 

Les [sociétés de développement commercial (SDC)](https://montreal.ca/sujets/societes-de-developpement-commercial) sont des organismes sans but lucratif qui contribuent au dé

**Warnings:**
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID` | Identifier | numeric | dimension | G | 0.0% |
| 2 | `NOM` | Name | identifier | exclude | G | 0.0% |
| 3 | `Arrondissement` | Borough | category | dimension | G | 0.0% |
| 4 | `Site Web` | Site Web | identifier | exclude | G | 0.0% |
| 5 | `Annee creation` | Year Creation | text | filter | G | 0.0% |

**Dimensions** (2): `ID`, `Arrondissement`

**Join opportunities:** boroughs via arrondissement field

---

## Mesure harmonisée des délais de délivrance de permis
### Mesure Harmonise Des Dlais De Dlivrance De permits

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-mesure-harmonisee-delais-delivrance-permis` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | quarterly |
| **Total Records** | 256 |
| **Temporal Range** | 2024-11-05 to 2025-12-22 |
| **Formats** | CSV |

> Données trimestrielles sur la mesure harmonisée des délais de délivrance de permis

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Arrondissement` | Borough | category | dimension | G | 0.0% |
| 2 | `Type de batiment` | Type De Building | text | filter | G | 0.0% |
| 3 | `+/-120 jours` | 120 Jours | text | filter | G | 0.0% |
| 4 | `Numero de demande` | No. De Application | numeric | filter | G | 0.0% |
| 5 | `Numero de permis` | No. De Permit | numeric | filter | G | 0.0% |
| 6 | `Type de demande` | Type De Application | text | dimension | G | 0.0% |
| 7 | `Date d'ouverture de la demande` | Date D Ouverture De La Application | date | date | G | 0.0% |
| 8 | `Indicateur PIIA` | Indicateur Piia | category | dimension | G | 0.0% |
| 9 | `Numero Dossier PIIA` | No. Dossier Piia | category | dimension | G | 0.0% |
| 10 | `Numero civique` | Civic number | numeric | filter | G | 0.0% |
| 11 | `Adresse` | Address | identifier | exclude | G | 0.0% |
| 12 | `Numero d'unite d'evaluation fonciere (UEF)` | No. D Unit D Assessment Property Ue | numeric | filter | G | 0.0% |
| 13 | `Date emission permis` | Date Issuance Permit | date | date | G | 0.0% |
| 14 | `Description du permis` | Description Du Permit | identifier | exclude | G | 0.0% |
| 15 | `Projet demol.` | Project | category | dimension | G | 0.0% |
| 16 | `Operation cadastrale` | Ratio | category | dimension | G | 0.0% |
| 17 | `Usage conditionnel` | Usage Conditionnel | category | dimension | G | 0.0% |
| 18 | `Derogation mineure` | Derogation Mineure | category | dimension | G | 0.0% |
| 19 | `PPCMOI` | Ppcmoi | category | dimension | G | 0.0% |
| 20 | `Zonage incitatif` | Zonage Incitatif | category | dimension | G | 0.0% |
| 21 | `Article 89` | Article 89 | category | dimension | G | 0.0% |
| 22 | `Article 93` | Article 93 | category | dimension | G | 0.0% |
| 23 | `Article 94` | Article 94 | category | dimension | G | 0.0% |
| 24 | `Date fin de requete` | Date End De Request | date | exclude | E | 98.4% |
| 25 | `Date debut de requete` | Date Start De Request | date | exclude | E | 98.0% |
| 26 | `Temps global` | Temps Global | numeric | measure | G | 0.0% |
| 27 | `Temps d'attente` | Temps D'Attente | numeric | measure | G | 0.0% |
| 28 | `Nombre unites de logements` | Count Unites De Logements | numeric | dimension | G | 0.0% |
| 29 | `Classes - nombre de logements` | Classes Count De Logements | category | dimension | G | 0.0% |
| 30 | `Delai de traitement (j ouvr)` | Delai De Traitement (J Ouvr) | numeric | measure | G | 0.0% |
| 31 | `Proportion Delai Ville` | City | text | filter | G | 0.0% |

**Dimensions** (15): `Arrondissement`, `Type de demande`, `Indicateur PIIA`, `Numero Dossier PIIA`, `Projet demol.`, `Operation cadastrale`, `Usage conditionnel`, `Derogation mineure`, `PPCMOI`, `Zonage incitatif`, `Article 89`, `Article 93`, `Article 94`, `Nombre unites de logements`, `Classes - nombre de logements`

**Measures** (3): `Temps global`, `Temps d'attente`, `Delai de traitement (j ouvr)`

**Date fields** (2): `Date d'ouverture de la demande`, `Date emission permis`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Projet: Station Nomade RSQA
### Projet station Nomade Rsqa

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-projet-station-nomade-rsqa` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'environnement |
| **Update Frequency** | asNeeded |
| **Total Records** | 10,944 |
| **Formats** | CSV, MP4 |

> Dans le cadre de projets spéciaux, le réseau de surveillance de la qualité de l'air (RSQA) mesure les concentrations de polluants à la station nomade. Son objectif est d’approfondir nos connaissances sur la qualité de l’air ambiant. Comme l’indique son nom, cette station changera de localisation à l

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `DATE_HEURE` | Date Hour | text | filter | G | 0.0% |
| 2 | `O3` | O3 | text | filter | G | 0.0% |
| 3 | `NO` | Number | numeric | filter | G | 0.0% |
| 4 | `NO2` | Number (NO2) | numeric | measure | G | 0.0% |
| 5 | `SO2` | So2 | category | dimension | G | 0.0% |
| 6 | `CO` | Co | text | filter | G | 0.0% |
| 7 | `PM2.5` | Pm2.5 | numeric | measure | G | 0.0% |
| 8 | `BC1_370nm` | Bc1 370Nm | numeric | measure | G | 0.0% |
| 9 | `BC6_880nm` | Bc6 880Nm | numeric | measure | G | 0.0% |
| 10 | `PUF` | Puf | numeric | measure | G | 0.0% |

**Dimensions** (1): `SO2`

**Measures** (5): `NO2`, `PM2.5`, `BC1_370nm`, `BC6_880nm`, `PUF`

**Join opportunities:** temporal join via date fields

---

## Statistiques d'utilisation du site web de la Ville de Montréal (montreal.ca)
### Statistics D Utilisation Du Site Web De La city De Montral Montrealca

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-statistiques-utilisation-site-web-ville-de-montreal` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | daily |
| **Total Records** | 2,167,971 |
| **Temporal Range** | 20250101 to 20250101 |
| **Formats** | CSV |

> Ensemble de données contenant la fréquentation du portail Montreal.ca à savoir le nombre de visiteurs et de pages vues par jour de l'année.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `date` | Date | date | date | G | 0.0% |
| 2 | `path` | Path | identifier | exclude | G | 0.0% |
| 3 | `title` | Title | identifier | exclude | G | 0.0% |
| 4 | `sessions` | Sessions | numeric | dimension | G | 0.0% |
| 5 | `pageviews` | Pageviews | numeric | dimension | G | 0.0% |
| 6 | `avgSessionDuration` | Ratio | numeric | measure | G | 0.0% |

**Dimensions** (2): `sessions`, `pageviews`

**Measures** (1): `avgSessionDuration`

**Date fields** (1): `date`

**Join opportunities:** temporal join via date fields

---

## Tableau de la rémunération des personnes élues de la Ville de Montréal
### Tableau De La Rmunration Des Personnes Lues De La city De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-remuneration-elus` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service du greffe |
| **Update Frequency** | irregular |
| **Total Records** | 143 |
| **Formats** | XLSX, CSV |

> Tableau joint au rapport financier de la Ville. Le tableau indique les rémunérations et allocations de dépenses versées au cours de l’exercice concerné.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Nom, Prenom` | Name First Name | identifier | exclude | G | 0.0% |
| 2 | `Fonctions` | Fonctions | category | dimension | G | 0.0% |
| 3 | `Recu de l'organisme principal - Recu de l'organisme principal -` | Organization | identifier | exclude | G | 0.0% |
| 4 | `Recu de l'organisme principal -  Allocation depenses` | Organization (Recu de l'organisme principal -  Allocation depenses) | category | dimension | G | 0.0% |
| 5 | `Recu d'organismes mandataires
ou supramunicipaux - Remuneration` | Organization (Recu d'organismes mandataires
ou supramunicipaux - Remuneration) | text | filter | P | 72.0% |
| 6 | `Recu d'organismes mandataires
ou supramunicipaux -Allocation de` | Organization (Recu d'organismes mandataires
ou supramunicipaux -Allocation de) | category | dimension | P | 72.0% |

**Dimensions** (3): `Fonctions`, `Recu de l'organisme principal -  Allocation depenses`, `Recu d'organismes mandataires
ou supramunicipaux -Allocation de`

---

## Commande personnalisée du recensement 2021 du Service de l'habitation
### Commande Personnalise Du census 2021 Du Service De L Habitation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-commande-sh-recensement-2021` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | notPlanned |
| **Total Records** | 91 |
| **Formats** | IVT, PNG, CSV |

> Cet ensemble de données présente les données du recensement de la population de 2021 partagées par Statistique Canada à la Ville de Montréal dans le cadre d'une commande de données réalisée par le Service de l’habitation. 

La Division stratégies et politiques du Service de l’habitation a égalemen

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Num Quartier` | Neighbourhood | numeric | measure | G | 0.0% |
| 2 | `Nom Quartier` | Neighbourhood (Nom Quartier) | identifier | exclude | G | 0.0% |
| 3 | `Num Arr` | Num Borough | numeric | dimension | U | 15.4% |
| 4 | `Nom Arr` | Name Borough | category | dimension | U | 15.4% |
| 5 | `nom_mun` | Name Mun | category | dimension | G | 0.0% |

**Dimensions** (3): `Num Arr`, `Nom Arr`, `nom_mun`

**Measures** (1): `Num Quartier`

---

## RSQA - Multi-Polluants (en continu)
### Rsqa Multi Polluants En Continu

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-rsqa-polluants-gazeux` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'environnement |
| **Update Frequency** | irregular |
| **Total Records** | 111,715 |
| **Formats** | CSV |

> Un [réseau de stations de mesure localisées sur l’Île de Montréal](http://donnees.montreal.ca/dataset/rsqa-liste-des-stations) permet la détermination en continu de la concentration atmosphérique de plusieurs polluants.  La transmission des données recueillies s’effectue par télémétrie. Les valeurs 

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `POSTE` | Poste | numeric | dimension | G | 0.0% |
| 2 | `TEMPS` | Temps | identifier | exclude | G | 0.0% |
| 3 | `CO` | Co | all_null | exclude | E | 100.0% |
| 4 | `H2S` | H2S | all_null | exclude | E | 100.0% |
| 5 | `NO` | Number | numeric | exclude | G | 0.1% |
| 6 | `NO2` | Number (NO2) | numeric | measure | G | 0.1% |
| 7 | `PM25` | Pm25 | all_null | exclude | E | 100.0% |
| 8 | `O3` | O3 | numeric | measure | G | 0.0% |
| 9 | `SO2` | So2 | numeric | measure | G | 0.0% |
| 10 | `BENZENE` | Benzene | all_null | exclude | E | 100.0% |
| 11 | `TOLUENE` | Toluene | all_null | exclude | E | 100.0% |
| 12 | `ETHYLBENZENE` | Y coordinate (MTM) | all_null | exclude | E | 100.0% |
| 13 | `MP-Xylene` | X coordinate (MTM) | all_null | exclude | E | 100.0% |
| 14 | `O-Xylene` | X coordinate (MTM) (O-Xylene) | all_null | exclude | E | 100.0% |

**Dimensions** (1): `POSTE`

**Measures** (3): `NO2`, `O3`, `SO2`

---

## Bilan mensuel sur la criminalité
### Report Mensuel Sur La Criminalit

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-bilan-mensuel-criminalite` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de police de la Ville de Montréal |
| **Update Frequency** | monthly |
| **Total Records** | 0 |
| **Formats** | PDF, CSV |

> Le bilan mensuel sur la criminalité produit par le Service de police de la Ville de Montréal (SPVM) offre un outil de visualisation des statistiques. Celles-ci sont présentées par mois, par année ainsi que par grand groupe et sous-groupe d’infractions criminelles. De plus, il est possible d’obtenir 

**Warnings:**
- Archived data - no longer updated

---

## Développement projeté du réseau de voies réservées et des corridors de mobilité durable (Plan d'urbanisme et de mobilité 2050)
### Dveloppement Projet Du Rseau De Voies Rserves Et Des Corridors De Mobilit Durable Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-developpement-projete-du-reseau-de-voies-reservees-et-des-corridors-de-mobilite-durable` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données présente le développement projeté du réseau de voies réservées et des corridors de mobilité durable pour 2050 et qui apparaît à la carte 2-5 du Plan d'urbanisme et de mobilité 2050 (PUM).

Le réseau de voies réservées au transport collectif constitue l’une des mesures préfé

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---

## Grands ensembles commerciaux péricentriques présentant un potentiel de redéveloppement (Plan d'urbanisme et de mobilité 2050)
### Grands Ensembles Commerciaux Pricentriques Prsentant Un Potentiel De Redveloppement Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-grands-ensembles-commerciaux-pericentriques-redeveloppement-plan-urbanisme-mobilite-2050` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité - Direction de l'urbanisme |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données présente les grands ensembles commerciaux péricentriques présentant un potentiel de redéveloppement qui apparaissent à la carte 2-16 du Plan d'urbanisme et de mobilité 2050 (PUM). Ils se divisent entre ceux situés dans un secteur d'opportunité planifié ou à planifier et ceux 

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---

## Géobase double - côtés de rue du réseau routier (statique)
### Gobase Double Cts De Rue Du Rseau Routier Statique

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-geobase-double-statique` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | annual |
| **Total Records** | 0 |
| **Formats** | ZIP, GEOJSON, CSV |

> La géobase double se présente comme une projection du réseau filamentaire de la géobase qui simule approximativement les limites des trottoirs et bordures.  Les [pôles de géobase](/ville-de-montreal/geobase-pole), une représentation ponctuelle des côtés gauche et droit des tronçons segmentés du rése

**Warnings:**
- No DataStore resource (API not available)

---

## Milieux humides à protéger ou à restaurer (sous contrôle intérimaire)
### Milieux Humides Protger Ou Restaurer Sous Contrle Intrimaire

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-milieux-humides-sous-controle-interimaire` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | PDF, SHP, GEOJSON |

> Ces données sont un extrait du plan régional des milieux humides et hydriques de l'agglomération de Montréal (en processus d'adoption). Elles illustrent les milieux humides et leurs aires de protection de 30 mètres qui sont visés par les mesures de contrôles intérimaires, soit les données cartograph

**Warnings:**
- No DataStore resource (API not available)

---

## Niveaux d'intensification urbaine, seuils minimaux moyens de densité nette et affectation du sol (Plan d'urbanisme et de mobilité 2050)
### Niveaux D Intensification Urbaine Seuils Minimaux Moyens De Densit Nette Et Affectation Du Sol Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-niveaux-intensification-urbaine-densite-affectation-sol-pum-2050` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité - Direction de l'urbanisme |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> ####  &nbsp;
Cet ensemble de données contient les informations apparaissant aux cartes 2-10 – Niveaux d'intensification urbaine, 2-11 – Seuils minimaux moyens de densité nette, 5-1 – Affectations du sol et 5-3 – Affectations du sol « Espace vert local » du Plan d'urbanisme et de mobilité 2050 (PUM)

**Warnings:**
- No DataStore resource (API not available)

---

## Patrimoine et paysages (Plan d'urbanisme et de mobilité 2050)
### Heritage Et Paysages Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-patrimoine-et-paysages-plan-d-urbanisme-et-de-mobilite-2050` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité - Direction de l'urbanisme |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données présente plusieurs données liées au patrimoine et aux paysages apparaissant aux cartes 2-22 à 2-26, aux cartes 6-1 à 6-24 de l'annexe I et II et à la carte 6-25 du chapitre 6 (DC) ainsi qu'aux listes présentent à l'annexe 3 du Plan d'urbanisme et de mobilité 2050 (PUM).

- 

---

## Profils des ménages et des logements 2021
### Profils Des Mnages Et Des housing 2021

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-profils-menages-logements` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | notPlanned |
| **Total Records** | 0 |
| **Formats** | HTML |

> Les profils des ménages et des logements ont été élaborés par le Service de l’habitation afin d’offrir une analyse approfondie des dimensions liées à l’habitation couvertes par le recensement de 2021.

Réalisés à l’échelle de l’agglomération, de la ville et des arrondissements de Montréal, ils pré

**Warnings:**
- No DataStore resource (API not available)

---

## Projet: Station Longue-Pointe (25)
### Projet station Longue Pointe 25

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-projet-station-longue-pointe-25` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'environnement |
| **Update Frequency** | asNeeded |
| **Total Records** | 0 |
| **Formats** | MP4 |

> La station Longue-Pointe (25) a été implantée dans le cadre du projet de l’implantation d’un système de gestion collaborative de corridors de mobilité intégrée Notre-Dame pour l’optimisation de l’accès au Port de Montréal. Son emplacement est au coin de l’avenue Haig et de la rue Notre-Dame Est dans

**Warnings:**
- No DataStore resource (API not available)

---

## Règle 3-30-30 pour le suivi de l'accès aux espaces verts
### Rgle 3 30 30 Pour Le Suivi De L Accs Aux Espaces Verts

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-regle-3-30-30-pour-le-suivi-de-l-acces-aux-espaces-verts` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Bureau de la transition écologique et de la résilience |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Polygone représentant la Règle 3-30-300, soit voir 3 arbres à proximité de son domicile, se déplacer dans des quartiers où 30 % de l’espace est couvert d’arbres et  vivre à moins de 300 mètres d’un espace vert. Cette approche fondée sur la nature visent à créer des villes plus vertes et résilientes.

---

## Secteurs d'opportunité (Plan d'urbanisme et de mobilité 2050)
### Secteurs D Opportunit Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-secteurs-d-opportunite-plan-d-urbanisme-et-de-mobilite-2050` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité - Direction de l'urbanisme |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données présente les secteurs d'opportunité qui apparaissent aux cartes 2-9, 4-1 à 4-19 et 4-21 à 4-102 du Plan d'urbanisme et de mobilité 2050 (PUM). Ils se divisent entre les programmes et plans particuliers d'ubanisme (PPU) en vigueur, pour les autres secteurs d'opportunité selon 

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---

## Secteurs de référence pour les dispositions en stationnement (Plan d'urbanisme et de mobilité 2050)
### Secteurs De Rfrence Pour Les Dispositions En parking Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-secteurs-reference-dispositions-stationnement-plan-urbanisme-mobilite-2050` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données présente les secteurs de référence pour les dispositions en stationnement qui apparaissent à la carte 6-34 du Plan d'urbanisme et de mobilité 2050 (PUM). Ils se divisent entre les secteurs A correspondant à une distance de marche de 750 mètres à partir d'un point d'accès du r

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---

## Vision 2050 du réseau de transport collectif structurant (Plan d'urbanisme et de mobilité 2050)
### Vision 2050 Du Rseau De transport Collectif Structurant Plan D Urbanisme Et De Mobilit 2050

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-vision-2050-reseau-transport-collectif-structurant-plan-urbanisme-mobilite-2050` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité - Direction de l'urbanisme |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Cet ensemble de données présente le réseau de transport collectif structurant qui devrait exister en 2050 et chacun de ses modes. Ainsi que les stations de train de banlieue et du REM supplémentaires qui devraient être construites avant 2040. Le tout tel qu'apparaissant à la carte 1-3 - Vision 2050 

**Warnings:**
- Coordinates in MTM projection (not WGS84)

---
