# Loi, justice et securite publique
# Law, Justice and Public Safety

> Generated: 2026-03-10 08:09
> Datasets: 22

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 10 | Excellent |
| **B** | 4 | Good |
| **C** | 1 | Usable |
| **D** | 0 | Sparse |
| **F** | 7 | Unusable |
| | **22** | (15 usable in report builder) |

---

## Datasets

- **[A]** [Communiqués de presse](#vmtl-communique-presse) [RB]
- **[A]** [Avis et alertes](#vmtl-avis-alertes) [RB]
- **[A]** [Vidéos des séances des instances décisionnelles](#vmtl-videodiffusion-seances-instances-politiques) [RB]
- **[A]** [Règlements municipaux](#vmtl-reglements-municipaux) [RB]
- **[A]** [Actes criminels](#vmtl-actes-criminels) [RB]
- **[A]** [Interventions des pompiers de Montréal](#vmtl-interventions-service-securite-incendie-montreal) [RB]
- **[A]** [Avis de détérioration](#vmtl-avis-deterioration) [RB]
- **[A]** [Postes de police de quartier sur l’île de Montréal](#vmtl-carte-postes-quartier) [RB]
- **[A]** [Personnes élues ayant suivi la formation obligatoire en éthique (archives)](#vmtl-formation-ethique-personnes-elues) [RB]
- **[A]** [Signalements de coyotes](#vmtl-signalements-de-coyotes) [RB]
- **[B]** [Casernes de pompiers sur l’île de Montréal](#vmtl-casernes-pompiers) [RB]
- **[B]** [Collisions routières](#vmtl-collisions-routieres) [RB]
- **[B]** [Limite des secteurs de poste de quartier de police](#vmtl-limites-pdq-spvm) [RB]
- **[B]** [Territoires administratifs des casernes](#vmtl-territoires-administratifs-des-casernes) [RB]
- **[C]** [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique) [RB]
- **[F]** [Plan d'urbanisme - Densité de construction](#vmtl-plan-urbanisme-densite)
- **[F]** [Schéma d'aménagement et de développement - Environnement et milieux naturels](#vmtl-schema-environnement-milieux-naturels)
- **[F]** [Schéma d'aménagement et de développement - Affectation du sol et densité d'occupation](#vmtl-schema-affectation-densite)
- **[F]** [Schéma d'aménagement et de développement - Patrimoine et paysage](#vmtl-schema-patrimoine-paysage)
- **[F]** [Schéma d'aménagement et de développement - Équipements collectifs](#vmtl-schema-equipements-collectifs)
- **[F]** [Schéma d'aménagement et de développement - Économie](#vmtl-schema-economie)
- **[F]** [Schéma d'aménagement et de développement - Transport](#vmtl-schema-transport)

---

## Actes criminels
### Acts criminal

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-actes-criminels` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de police de la Ville de Montréal |
| **Update Frequency** | daily |
| **Total Records** | 344,063 |
| **Temporal Range** | 2015-01-01 to 2018-12-31 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | ZIP, GEOJSON, CSV |

> Liste des actes criminels enregistrés par le Service de police de la Ville de Montréal (SPVM).

Un outil de visualisation des données permet également d'afficher sur les données sous forme de carte : [Vue sur la sécurité publique](https://ville.montreal.qc.ca/vuesurlasecuritepublique/)

**Warnings:**
- Data obfuscated for privacy protection
- Location rounded to nearest intersection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `CATEGORIE` | Crime Category | category | dimension | G | 0.0% |
| 2 | `DATE` | Date | date | date | G | 0.0% |
| 3 | `QUART` | Time of Day (Shift) | category | dimension | G | 0.0% |
| 4 | `PDQ` | Police Station (PDQ) | numeric | dimension | G | 0.0% |
| 5 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 6.5% |
| 6 | `Y` | Y coordinate (MTM) | geo_latitude | geo | G | 6.5% |
| 7 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 6.5% |
| 8 | `LATITUDE` | Latitude | geo_latitude | geo | G | 6.5% |

**Dimensions** (3): `CATEGORIE`, `QUART`, `PDQ`

**Date fields** (1): `DATE`

**Geo fields** (4): `X`, `Y`, `LONGITUDE`, `LATITUDE`

**Join opportunities:** boroughs via PDQ-to-borough mapping; spatial join via lat/long coordinates; temporal join via date fields

---

## Avis de détérioration
### Avis De Dtrioration

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-avis-deterioration` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation / Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 38 |
| **Formats** | CSV |

> L’avis de détérioration permet de rattacher des infractions au _Règlement 23-016 sur l'occupation et l'entretien des bâtiments_ à des bâtiments précis par le biais d'une inscription au registre foncier du Québec. Il sert à empêcher qu'un propriétaire n'évite des sanctions en vendant son immeuble à u

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `identifiant` | Identifier | identifier | exclude | G | 0.0% |
| 2 | `adresse` | Address | identifier | exclude | G | 0.0% |
| 3 | `numero_lot` | No. Lot | numeric | dimension | G | 0.0% |
| 4 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 5 | `date_inscription` | Date Inscription | text | filter | G | 0.0% |
| 6 | `nom_proprio` | Name Proprio | text | filter | G | 0.0% |
| 7 | `nombre_logement` | Count Logement | numeric | measure | G | 0.0% |
| 8 | `lien_avis` | Link Avis | identifier | exclude | G | 0.0% |

**Dimensions** (2): `numero_lot`, `arrondissement`

**Measures** (1): `nombre_logement`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Avis et alertes
### Avis Et Alertes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-avis-alertes` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | daily |
| **Total Records** | 217 |
| **Temporal Range** | 2026-01-30T13:31:43.794000 to 2026-07-06T23:35:14.143000 |
| **Formats** | GEOJSON, CSV |

> Cet ensemble de données présente les avis et alertes publiés sur [le site web de la Ville de Montréal](https://montreal.ca/avis-et-alertes).  Les avis et alertes communiquent les renseignements importants à la population en cas d'urgence et en situations pouvant avoir un impact sur la vie quotidienn

**Warnings:**
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `titre` | Title | identifier | exclude | G | 0.0% |
| 2 | `date_debut` | Start date | date | date | G | 0.0% |
| 3 | `date_fin` | Date End | date | date | G | 0.0% |
| 4 | `type` | Type | category | dimension | G | 0.0% |
| 5 | `service_publieur` | Service Publieur | category | dimension | G | 0.0% |
| 6 | `lien` | Link | identifier | exclude | G | 0.0% |

**Dimensions** (2): `type`, `service_publieur`

**Date fields** (2): `date_debut`, `date_fin`

**Join opportunities:** temporal join via date fields

---

## Communiqués de presse
### Communiqus De Presse

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-communique-presse` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Direction générale |
| **Update Frequency** | daily |
| **Total Records** | 1,328 |
| **Temporal Range** | 2023-03-13 to 2026-03-03 |
| **Formats** | CSV |

> Cet ensemble de données présente les communiqués de presse publiés par la Ville de Montréal.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `titre` | Title | identifier | exclude | G | 0.0% |
| 2 | `date_publication` | Date Publication | date | date | G | 0.0% |
| 3 | `url` | URL | identifier | exclude | G | 0.0% |
| 4 | `description` | Description | identifier | exclude | G | 0.0% |
| 5 | `service_arrondissement` | Service Borough | category | dimension | G | 0.0% |
| 6 | `source_unite_affaire` | Source Unit Affaire | text | dimension | U | 44.1% |

**Dimensions** (2): `service_arrondissement`, `source_unite_affaire`

**Date fields** (1): `date_publication`

**Join opportunities:** temporal join via date fields

---

## Interventions des pompiers de Montréal
### Interventions Des Pompiers De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-interventions-service-securite-incendie-montreal` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de sécurité incendie de Montréal |
| **Update Frequency** | daily |
| **Total Records** | 908,486 |
| **Temporal Range** | 2005-01-01T00:03:47 to 2005-01-08T22:01:03 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | SHP, GEOJSON, CSV |

> Ensemble de données listant les interventions réalisées par le Service de sécurité incendie de Montréal (SIM) avec notamment la location des interventions et les unités déployées depuis 2005. Ces données sont tirées du système de répartition assisté par Poste de travail (RAO), un sous-système centra

**Warnings:**
- Data obfuscated for privacy protection
- Location rounded to nearest intersection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `INCIDENT_NBR` | Incident | numeric | exclude | G | 0.0% |
| 2 | `CREATION_DATE_TIME` | Creation Date Time | date | date | G | 0.0% |
| 3 | `INCIDENT_TYPE_DESC` | Incident (INCIDENT_TYPE_DESC) | text | filter | G | 0.0% |
| 4 | `DESCRIPTION_GROUPE` | Description Group | category | dimension | G | 0.0% |
| 5 | `CASERNE` | Caserne | numeric | measure | G | 0.0% |
| 6 | `NOM_VILLE` | City | text | dimension | G | 0.0% |
| 7 | `NOM_ARROND` | Name Arrond | text | dimension | G | 0.0% |
| 8 | `DIVISION` | Division | numeric | dimension | G | 0.0% |
| 9 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |
| 10 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |
| 11 | `NOMBRE_UNITES` | Count Unites | numeric | dimension | G | 0.0% |

**Dimensions** (5): `DESCRIPTION_GROUPE`, `NOM_VILLE`, `NOM_ARROND`, `DIVISION`, `NOMBRE_UNITES`

**Measures** (1): `CASERNE`

**Date fields** (1): `CREATION_DATE_TIME`

**Geo fields** (2): `LATITUDE`, `LONGITUDE`

**Join opportunities:** spatial join via lat/long coordinates; temporal join via date fields

---

## Personnes élues ayant suivi la formation obligatoire en éthique (archives)
### Personnes Lues Ayant Suivi La Formation Obligatoire En Thique Archives

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-formation-ethique-personnes-elues` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service du greffe |
| **Update Frequency** | irregular |
| **Total Records** | 206 |
| **Temporal Range** | 2022-01-18T00:00:00 to 2022-07-13T00:00:00 |
| **Formats** | CSV |

> Les personnes élues de la Ville de Montréal doivent participer à une formation en éthique et déontologie dans les six mois du début de mandat. Ces données présentent la liste des personnes élues ayant participé à la formation.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Titre_formation` | Titre Formation | category | dimension | G | 0.0% |
| 2 | `Personnes_elues` | Personnes Elues | text | filter | G | 0.0% |
| 3 | `Date_participation` | Date Participation | date | date | G | 0.0% |

**Dimensions** (1): `Titre_formation`

**Date fields** (1): `Date_participation`

**Join opportunities:** temporal join via date fields

---

## Postes de police de quartier sur l’île de Montréal
### Postes De police De Quartier Sur Lle De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-carte-postes-quartier` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de police de la Ville de Montréal - Division des ressources informationnelles |
| **Update Frequency** | irregular |
| **Total Records** | 28 |
| **Formats** | GEOJSON, SHP, CSV |

> Cet ensemble de données comprend l'adresse et les coordonnées géospatiales des postes de quartiers du Service de police de la Ville de Montréal (SPVM).

Voir également l'ensemble [Limite des secteurs de poste de quartier de police](./limites-pdq-spvm).

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `OBJECTID` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `NO_CIV_LIE` | No. Civ Lie | numeric | dimension | G | 0.0% |
| 3 | `PREFIX_TEM` | X coordinate (MTM) | category | dimension | G | 0.0% |
| 4 | `NOM_TEMP` | Name Temp | identifier | exclude | G | 0.0% |
| 5 | `DIR_TEMP` | Dir Temp | category | dimension | P | 89.3% |
| 6 | `MUN_TEMP` | Mun Temp | category | dimension | G | 0.0% |
| 7 | `DESC_LIEU` | Desc Lieu | identifier | exclude | G | 0.0% |
| 8 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |
| 9 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |

**Dimensions** (4): `NO_CIV_LIE`, `PREFIX_TEM`, `DIR_TEMP`, `MUN_TEMP`

**Geo fields** (2): `LATITUDE`, `LONGITUDE`

**Join opportunities:** spatial join via lat/long coordinates

---

## Règlements municipaux
### Rglements municipal

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-reglements-municipaux` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service du greffe / Arrondissements |
| **Update Frequency** | daily |
| **Total Records** | 29,188 |
| **Temporal Range** | 2009-09-04 to 2099-12-31 |
| **Formats** | CSV |

> Cet ensemble présente les règlements municipaux répertoriés par le site web de la Ville de Montréal, y compris les ordonnances et certaines résolutions.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `title_fr` | Title | identifier | exclude | G | 0.0% |
| 2 | `title_en` | Title (title_en) | identifier | exclude | G | 0.0% |
| 3 | `id` | Identifier | identifier | exclude | G | 0.0% |
| 4 | `type` | Type | category | dimension | G | 0.0% |
| 5 | `adoptionDate` | Adoption Date | date | date | G | 0.5% |
| 6 | `comingIntoForceDate` | Coming Into Force Date | date | date | G | 0.0% |
| 7 | `geographicalApplication` | Geographicalapplication | category | dimension | G | 0.0% |
| 8 | `competentAuthority` | Y coordinate (MTM) | category | dimension | G | 0.0% |
| 9 | `modifiedBylaws` | Modification date | text | filter | U | 34.3% |

**Dimensions** (3): `type`, `geographicalApplication`, `competentAuthority`

**Date fields** (2): `adoptionDate`, `comingIntoForceDate`

**Join opportunities:** temporal join via date fields

---

## Signalements de coyotes
### Signalements De Coyotes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-signalements-de-coyotes` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service des grands parcs, du Mont-Royal et des sports |
| **Update Frequency** | daily |
| **Total Records** | 2,380 |
| **Temporal Range** | 2017-02-24 to 2018-12-14 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | GEOJSON, PDF, SHP, CSV |

> Le présent ensemble de données contient les observations de coyotes documentées par la Ville de Montréal depuis 2017. La plupart de ces informations proviennent des observations des citoyens qui ont été signalées à la Ville de Montréal. Elles sont récoltées dans le cadre de la mise en oeuvre du 
Pl

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Entry_Id` | Identifier | numeric | filter | G | 0.0% |
| 2 | `OBJ_ID` | Identifier (OBJ_ID) | numeric | exclude | G | 0.0% |
| 3 | `Dat_obs` | Dat Obs | date | date | G | 0.0% |
| 4 | `Hr_obs` | Hr Obs | text | filter | G | 9.3% |
| 5 | `Nb_coyotes` | Count Coyotes | numeric | dimension | G | 1.7% |
| 6 | `Alimentation` | Alimentation | category | exclude | E | 94.6% |
| 7 | `Statut_animal` | Status Animal | category | exclude | E | 99.6% |
| 8 | `Periode` | Period | category | dimension | G | 8.2% |
| 9 | `Comp_class` | Comp Class | category | dimension | G | 1.7% |
| 10 | `Com_code` | Com Code | numeric | dimension | G | 1.7% |
| 11 | `Cote` | Cote | numeric | measure | G | 1.7% |
| 12 | `Territoire` | Territory | text | dimension | G | 0.0% |
| 13 | `Statut_mention` | Status Mention | category | dimension | G | 0.0% |
| 14 | `Provenance` | Provenance | category | dimension | G | 0.0% |
| 15 | `Verif` | Verif | category | dimension | G | 0.0% |
| 16 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 0.0% |
| 17 | `Y` | Y coordinate (MTM) | geo_latitude | geo | G | 0.0% |
| 18 | `Lat` | Latitude | geo_latitude | geo | G | 0.0% |
| 19 | `Long` | Longitude | geo_longitude | geo | G | 0.0% |

**Dimensions** (8): `Nb_coyotes`, `Periode`, `Comp_class`, `Com_code`, `Territoire`, `Statut_mention`, `Provenance`, `Verif`

**Measures** (1): `Cote`

**Date fields** (1): `Dat_obs`

**Geo fields** (4): `X`, `Y`, `Lat`, `Long`

**Join opportunities:** spatial join via lat/long coordinates

---

## Vidéos des séances des instances décisionnelles
### Vidos Des Sances Des Instances Dcisionnelles

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-videodiffusion-seances-instances-politiques` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service du greffe |
| **Update Frequency** | weekly |
| **Total Records** | 1,306 |
| **Temporal Range** | 2014-12-16T00:00:00 to 2020-11-17T00:00:00 *(Based on 1000-row sample; actual range may be wider)* |
| **Formats** | CSV |

> Cet ensemble recense les vidéos des séances enregistrées des différentes instances politiques de la Ville de Montréal, soit les conseils d'agglomération, les conseils municipaux, les comités exécutifs et les commissions permanentes.

**Warnings:**
- Archived data - no longer updated

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_SEANCE` | Identifier | text | filter | G | 0.0% |
| 2 | `NOM_SEANCE` | Name Seance | category | dimension | G | 0.0% |
| 3 | `TYPE_ASSEMBLEE` | Type Assemblee | category | dimension | G | 0.0% |
| 4 | `DATE_VIDEO` | Date Video | date | date | G | 0.0% |
| 5 | `POSITION_VIDEO` | Position Video | numeric | exclude | G | 0.0% |
| 6 | `TITRE_VIDEO` | Title | text | filter | G | 0.0% |
| 7 | `DUREE` | Duration | identifier | exclude | G | 0.0% |
| 8 | `URL` | URL | identifier | exclude | G | 0.0% |

**Dimensions** (2): `NOM_SEANCE`, `TYPE_ASSEMBLEE`

**Date fields** (1): `DATE_VIDEO`

**Join opportunities:** temporal join via date fields

---

## Casernes de pompiers sur l’île de Montréal
### Casernes De Pompiers Sur Lle De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-casernes-pompiers` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de sécurité incendie de Montréal |
| **Update Frequency** | irregular |
| **Total Records** | 68 |
| **Temporal Range** | 1900-01-01T07:00:00 to 2019-05-06T07:00:00 |
| **Formats** | GEOJSON, SHP, CSV |

> Cet ensemble de données comprend les coordonnées des casernes de pompier du service incendie de la Ville de Montréal.  
L'ensemble de données [Territoires administratifs des casernes](/ville-de-montreal/territoires-administratifs-des-casernes) fournit le territoire couvert par les casernes.

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `CASERNE` | Caserne | numeric | measure | G | 0.0% |
| 2 | `NO_CIVIQUE` | Civic number | numeric | dimension | G | 0.0% |
| 3 | `RUE` | Street | identifier | exclude | G | 0.0% |
| 4 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |
| 5 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |
| 6 | `ARRONDISSEMENT` | Borough | category | dimension | U | 20.6% |
| 7 | `VILLE` | City | category | dimension | P | 79.4% |
| 8 | `DATE_DEBUT` | Start date | date | date | G | 0.0% |
| 9 | `DATE_FIN` | Date End | date | exclude | E | 98.5% |
| 10 | `MTM8_X` | X coordinate (MTM) | numeric | measure | G | 0.0% |
| 11 | `MTM8_Y` | Y coordinate (MTM) | numeric | measure | G | 0.0% |

**Dimensions** (3): `NO_CIVIQUE`, `ARRONDISSEMENT`, `VILLE`

**Measures** (3): `CASERNE`, `MTM8_X`, `MTM8_Y`

**Date fields** (1): `DATE_DEBUT`

**Geo fields** (2): `LATITUDE`, `LONGITUDE`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates; temporal join via date fields

---

## Collisions routières
### Collisions Routires

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-collisions-routieres` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 218,272 |
| **Temporal Range** | 2012-01-02T00:00:00 to 2012-12-31T00:00:00 |
| **Formats** | PDF, SHP, CSV, WEB, GEOJSON |

> Liste des collisions survenues à Montréal depuis 2012.

Cet ensemble fait état des collisions impliquant au moins un véhicule motorisé circulant sur le réseau et qui ont fait l'objet d'un rapport de police.  Il inclut les éléments descriptifs, contextuels et la localisation des événements, dont la

**Warnings:**
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `NO_SEQ_COLL` | No. Seq Coll | identifier | exclude | G | 0.0% |
| 2 | `JR_SEMN_ACCDN` | Jr Semn Accdn | category | dimension | G | 0.0% |
| 3 | `DT_ACCDN` | Dt Accdn | date | date | G | 0.0% |
| 4 | `CD_MUNCP` | Cd Muncp | numeric | dimension | G | 0.0% |
| 5 | `NO_CIVIQ_ACCDN` | No. Civiq Accdn | numeric | filter | P | 57.0% |
| 6 | `SFX_NO_CIVIQ_ACCDN` | Sfx No. Civiq Accdn | category | exclude | E | 99.8% |
| 7 | `BORNE_KM_ACCDN` | Borne Km Accdn | all_null | exclude | E | 100.0% |
| 8 | `RUE_ACCDN` | Street Accdn | text | filter | U | 10.3% |
| 9 | `TP_REPRR_ACCDN` | Tp Reprr Accdn | numeric | dimension | U | 34.2% |
| 10 | `ACCDN_PRES_DE` | Accdn Pres De | text | filter | U | 29.8% |
| 11 | `NB_METRE_DIST_ACCD` | Count Metre Dist Accd | numeric | measure | P | 67.0% |
| 12 | `CD_GENRE_ACCDN` | Genre | numeric | dimension | U | 10.9% |
| 13 | `CD_SIT_PRTCE_ACCDN` | Cd Sit Prtce Accdn | numeric | exclude | E | 96.7% |
| 14 | `CD_ETAT_SURFC` | Cd State Surfc | numeric | dimension | G | 8.9% |
| 15 | `CD_ECLRM` | Cd Eclrm | numeric | dimension | U | 10.1% |
| 16 | `CD_ENVRN_ACCDN` | Cd Envrn Accdn | numeric | dimension | G | 4.4% |
| 17 | `NO_ROUTE` | No. Route | numeric | exclude | E | 99.4% |
| 18 | `CD_CATEG_ROUTE` | Cd Categ Route | numeric | dimension | G | 4.3% |
| 19 | `CD_ETAT_CHASS` | Cd State Chass | numeric | dimension | P | 85.4% |
| 20 | `CD_ASPCT_ROUTE` | Cd Aspct Route | numeric | dimension | G | 8.5% |
| 21 | `CD_LOCLN_ACCDN` | Cd Locln Accdn | numeric | dimension | U | 12.1% |
| 22 | `CD_POSI_ACCDN` | Cd Posi Accdn | numeric | dimension | P | 87.0% |
| 23 | `CD_CONFG_ROUTE` | Cd Confg Route | numeric | dimension | U | 13.8% |
| 24 | `CD_ZON_TRAVX_ROUTR` | X coordinate (MTM) | numeric | exclude | E | 98.2% |
| 25 | `CD_PNT_CDRNL_ROUTE` | Cd Pnt Cdrnl Route | category | exclude | E | 99.9% |
| 26 | `CD_PNT_CDRNL_REPRR` | Cd Pnt Cdrnl Reprr | category | dimension | P | 62.9% |
| 27 | `CD_COND_METEO` | Cd Cond Meteo | numeric | dimension | G | 9.2% |
| 28 | `NB_VEH_IMPLIQUES_ACCDN` | Count Veh Impliques Accdn | numeric | dimension | G | 0.0% |
| 29 | `NB_MORTS` | Count Morts | numeric | dimension | G | 0.0% |
| 30 | `NB_BLESSES_GRAVES` | Count Blesses Graves | numeric | dimension | G | 0.0% |
| 31 | `NB_BLESSES_LEGERS` | Count Blesses Legers | numeric | dimension | G | 0.0% |
| 32 | `HEURE_ACCDN` | Hour Accdn | text | dimension | G | 0.0% |
| 33 | `AN` | An | numeric | dimension | G | 0.0% |
| 34 | `NB_VICTIMES_TOTAL` | Total | text | filter | G | 0.0% |
| 35 | `GRAVITE` | Gravite | category | dimension | G | 0.0% |
| 36 | `REG_ADM` | Reg Adm | category | dimension | G | 0.0% |
| 37 | `MRC` | Mrc | category | dimension | G | 0.0% |
| 38 | `nb_automobile_camion_leger` | Count Automobile Camion Leger | numeric | dimension | G | 0.0% |
| 39 | `nb_camionLourd_tractRoutier` | Count Camion Lourd Tract Routier | numeric | dimension | G | 0.0% |
| 40 | `nb_outil_equipement` | Count Outil Equipement | numeric | dimension | G | 0.0% |
| 41 | `nb_tous_autobus_minibus` | Count Tous Autobus Minibus | numeric | dimension | G | 0.0% |
| 42 | `nb_bicyclette` | Count Bicyclette | numeric | dimension | G | 0.0% |
| 43 | `nb_cyclomoteur` | Count Cyclomoteur | numeric | dimension | G | 0.0% |
| 44 | `nb_motocyclette` | Count Motocyclette | numeric | dimension | G | 0.0% |
| 45 | `nb_taxi` | Count Taxi | numeric | dimension | G | 0.0% |
| 46 | `nb_urgence` | Count Urgence | numeric | dimension | G | 0.0% |
| 47 | `nb_motoneige` | Count Motoneige | numeric | dimension | G | 0.0% |
| 48 | `nb_VHR` | Count Vhr | numeric | dimension | G | 0.0% |
| 49 | `nb_autres_types` | Count Autres Types | numeric | dimension | G | 0.0% |
| 50 | `nb_veh_non_precise` | Count Veh No Precise | numeric | dimension | G | 0.0% |
| 51 | `NB_DECES_PIETON` | Count Deces Pieton | numeric | dimension | G | 0.0% |
| 52 | `NB_BLESSES_PIETON` | Count Blesses Pieton | numeric | dimension | G | 0.0% |
| 53 | `NB_VICTIMES_PIETON` | Count Victimes Pieton | text | filter | G | 0.0% |
| 54 | `NB_DECES_MOTO` | Count Deces Moto | numeric | dimension | G | 0.0% |
| 55 | `NB_BLESSES_MOTO` | Count Blesses Moto | numeric | dimension | G | 0.0% |
| 56 | `NB_VICTIMES_MOTO` | Count Victimes Moto | text | filter | G | 0.0% |
| 57 | `NB_DECES_VELO` | Count Deces Velo | numeric | dimension | G | 0.0% |
| 58 | `NB_BLESSES_VELO` | Count Blesses Velo | numeric | dimension | G | 0.0% |
| 59 | `NB_VICTIMES_VELO` | Count Victimes Velo | text | filter | G | 0.0% |
| 60 | `VITESSE_AUTOR` | Speed | numeric | dimension | U | 43.9% |
| 61 | `LOC_X` | X coordinate (MTM) (LOC_X) | numeric | measure | G | 0.1% |
| 62 | `LOC_Y` | Y coordinate (MTM) | numeric | measure | G | 0.1% |
| 63 | `LOC_COTE_QD` | Loc Cote Qd | category | dimension | G | 0.0% |
| 64 | `LOC_COTE_PD` | Loc Cote Pd | numeric | dimension | G | 0.0% |
| 65 | `LOC_DETACHEE` | Loc Detachee | category | dimension | G | 0.0% |
| 66 | `LOC_IMPRECISION` | Loc Imprecision | category | dimension | G | 0.0% |
| 67 | `LOC_LONG` | Longitude | numeric | measure | G | 0.1% |
| 68 | `LOC_LAT` | Latitude | numeric | measure | G | 0.1% |

**Dimensions** (48): `JR_SEMN_ACCDN`, `CD_MUNCP`, `TP_REPRR_ACCDN`, `CD_GENRE_ACCDN`, `CD_ETAT_SURFC`, `CD_ECLRM`, `CD_ENVRN_ACCDN`, `CD_CATEG_ROUTE`, `CD_ETAT_CHASS`, `CD_ASPCT_ROUTE`, `CD_LOCLN_ACCDN`, `CD_POSI_ACCDN`, `CD_CONFG_ROUTE`, `CD_PNT_CDRNL_REPRR`, `CD_COND_METEO`, `NB_VEH_IMPLIQUES_ACCDN`, `NB_MORTS`, `NB_BLESSES_GRAVES`, `NB_BLESSES_LEGERS`, `HEURE_ACCDN`, `AN`, `GRAVITE`, `REG_ADM`, `MRC`, `nb_automobile_camion_leger`, `nb_camionLourd_tractRoutier`, `nb_outil_equipement`, `nb_tous_autobus_minibus`, `nb_bicyclette`, `nb_cyclomoteur`, `nb_motocyclette`, `nb_taxi`, `nb_urgence`, `nb_motoneige`, `nb_VHR`, `nb_autres_types`, `nb_veh_non_precise`, `NB_DECES_PIETON`, `NB_BLESSES_PIETON`, `NB_DECES_MOTO`, `NB_BLESSES_MOTO`, `NB_DECES_VELO`, `NB_BLESSES_VELO`, `VITESSE_AUTOR`, `LOC_COTE_QD`, `LOC_COTE_PD`, `LOC_DETACHEE`, `LOC_IMPRECISION`

**Measures** (5): `NB_METRE_DIST_ACCD`, `LOC_X`, `LOC_Y`, `LOC_LONG`, `LOC_LAT`

**Date fields** (1): `DT_ACCDN`

---

## Limite des secteurs de poste de quartier de police
### Boundary Des Secteurs De Poste De Quartier De police

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-limites-pdq-spvm` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de police de la Ville de Montréal |
| **Update Frequency** | irregular |
| **Total Records** | 37 |
| **Formats** | SHP, GEOJSON, WEB, CSV |

> Le territoire de l'île de Montréal est découpé en secteurs correspondant à des postes de quartier du Service de police de la Ville de Montréal. L'ensemble de données fournit, sous forme de polygones, les informations géographiques des limites des secteurs couverts par chaque poste de quartier.

L'

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `{` | { | category | dimension | G | 0.0% |

**Dimensions** (1): `{`

---

## Territoires administratifs des casernes
### Territoires Administratifs Des Casernes

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-territoires-administratifs-des-casernes` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de sécurité incendie de Montréal |
| **Update Frequency** | monthly |
| **Total Records** | 66 |
| **Formats** | GEOJSON, SHP, CSV |

> Ensemble décrivant les territoires administratifs des casernes sur l'ensemble de l'île de Montréal.

L'ensemble de données des [Casernes des pompiers sur l’île de Montréal ](casernes-pompiers) fournit la localisation des casernes.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `NOM_CAS_AD` | Name Cas Ad | identifier | exclude | G | 0.0% |
| 2 | `NO_CAS_ADM` | No. Cas Adm | numeric | dimension | G | 0.0% |
| 3 | `OBJECTID` | Identifier | numeric | exclude | G | 0.0% |
| 4 | `WKT` | Wkt | identifier | exclude | G | 0.0% |

**Dimensions** (1): `NO_CAS_ADM`

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

## Plan d'urbanisme - Densité de construction
### Plan D Urbanisme Densit De construction

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-plan-urbanisme-densite` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Note : Le Plan d'urbanisme (règlement 04-047) a été __abrogé le 16 juin 2025__, ces données sont maintenant caduques, veuillez vous référez aux ensembles de données du Plan d'urbanisme et de mobilité 2050 (règlement 24-017).

La [carte 3.1.2](https://mtl.ged.montreal.ca/constellio/?collection=mtlc

**Warnings:**
- No DataStore resource (API not available)

---

## Schéma d'aménagement et de développement - Affectation du sol et densité d'occupation
### Schma D Amnagement Et De Dveloppement Affectation Du Sol Et Densit D Occupation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-schema-affectation-densite` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> L’affectation du territoire et la densité d’occupation traduisent, sur le plan normatif, les grandes orientations de l’aménagement du territoire de l’agglomération de Montréal.  Les données disponibles dans le présent ensemble découlent principalement de la cartographie du Chapitre 3 du Schéma d’amé

---

## Schéma d'aménagement et de développement - Environnement et milieux naturels
### Schma D Amnagement Et De Dveloppement environment Et Milieux Naturels

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-schema-environnement-milieux-naturels` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | ZIP, SHP, GEOJSON |

> Le schéma d'aménagement et de développement met de l'avant un cadre de référence visant à mieux connaître, protéger et mettre en valeur le patrimoine. Les données disponibles dans le présent ensemble découlent principalement de la cartographie des sections 2.1, 2.3 et 3.1 du Schéma d’aménagement et 

---

## Schéma d'aménagement et de développement - Patrimoine et paysage
### Schma D Amnagement Et De Dveloppement heritage Et Paysage

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-schema-patrimoine-paysage` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Le schéma d'aménagement et de développement met de l'avant un cadre de référence visant à mieux connaître, protéger et mettre en valeur le patrimoine.  Les données disponibles dans le présent ensemble découlent principalement de la cartographie de la section 2.3 du Schéma d’aménagement et de dévelop

---

## Schéma d'aménagement et de développement - Transport
### Schma D Amnagement Et De Dveloppement transport

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-schema-transport` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Le présent ensemble de données rassemble une série de données axées sur la thématique du transport. On retrouve ces données dans différentes sections du Schéma d’aménagement et de développement. Le descriptif de chacun de ces jeux contient le numéro de carte auquel il réfère.

Ce Schéma d’aménagem

---

## Schéma d'aménagement et de développement - Économie
### Schma D Amnagement Et De Dveloppement Conomie

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-schema-economie` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> La consolidation et la valorisation des pôles commerciaux indiqués à la __carte 4 – Concentrations d'établissements commerciaux__, ainsi que l'activité commerciale des rues, des axes et des centres commerciaux doivent être privilégiés.

Par ailleurs, les pôles économiques représentés à la __carte 

---

## Schéma d'aménagement et de développement - Équipements collectifs
### Schma D Amnagement Et De Dveloppement Quipements Collectifs

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-schema-equipements-collectifs` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'urbanisme et de la mobilité |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON |

> Les __équipements collectifs__ rassemblent les immeubles abritant des activités qui répondent à différents besoins de la population en matière de santé, d’éducation, de culture, de sport et de tourisme.

La classification des équipements collectifs selon leur intérêt métropolitain ou d’agglomérati

---
