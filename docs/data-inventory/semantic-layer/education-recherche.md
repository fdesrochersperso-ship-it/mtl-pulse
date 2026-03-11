# Education et recherche
# Education and Research

> Generated: 2026-03-10 08:09
> Datasets: 2

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 1 | Excellent |
| **B** | 1 | Good |
| **C** | 0 | Usable |
| **D** | 0 | Sparse |
| **F** | 0 | Unusable |
| | **2** | (2 usable in report builder) |

---

## Datasets

- **[A]** [Patrimoine architectural de l'arrondissement Outremont - Fiches d'immeubles de l'inventaire Bisson](#vmtl-patrimoine-architectural-outremont-fiches-immeubles-inventaire-bisson) [RB]
- **[B]** [Les édifices patrimoniaux de Montréal](#vmtl-les-edifices-patrimoniaux-de-montreal) [RB]

---

## Patrimoine architectural de l'arrondissement Outremont - Fiches d'immeubles de l'inventaire Bisson
### Heritage Architectural De L Arrondissement Outremont Fiches D Immeubles De L Inventaire Bisson

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-patrimoine-architectural-outremont-fiches-immeubles-inventaire-bisson` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'urbanisme et de la mobilité - Direction du patrimoine |
| **Update Frequency** | notPlanned |
| **Total Records** | 671 |
| **Formats** | CSV |

> Ce jeu de données présente la localisation des immeubles repérés de Catégorie 1 et 2 ( bâtiments remarquables, bâtiments intéressants) dans l'inventaire du patrimoine d'Outremont réalisé par Pierre-Richard Bisson en 1992. Les fiches associées y sont accessibles au format PDF lorsqu'elles sont dispon

**Warnings:**
- Location rounded to nearest intersection
- Data potentially incomplete
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_FICHE` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `CAT_BISSON` | Cat Bisson | numeric | dimension | G | 0.0% |
| 3 | `TYPE_CAT_BISSON` | Type Category Bisson | category | dimension | G | 0.0% |
| 4 | `LIEN_FTP` | Link Ftp | identifier | exclude | G | 0.4% |
| 5 | `CIV_DE` | Civ De | numeric | measure | G | 0.0% |
| 6 | `CIV_A` | Civ A | numeric | measure | G | 0.0% |
| 7 | `TYPE_VOIE` | Type Lane | category | dimension | G | 0.0% |
| 8 | `LIEN_VOIE` | Link Lane | category | dimension | P | 83.0% |
| 9 | `NOM_VOIE` | Name Lane | text | filter | G | 0.0% |
| 10 | `ORIENT_VOIE` | Orient Voie | all_null | exclude | E | 100.0% |
| 11 | `ADRESSE` | Address | identifier | exclude | G | 0.0% |
| 12 | `NOTE` | Note | text | filter | P | 82.9% |
| 13 | `DEMOLI` | Demoli | category | dimension | G | 0.0% |
| 14 | `NOM_INDICATIF` | Name Indicatif | text | filter | P | 75.4% |
| 15 | `STATUT_INV_PRE_40_2025` | Status Inv Pre 40 2025 | category | dimension | G | 0.0% |
| 16 | `ID_IMM_INV` | Identifier (ID_IMM_INV) | identifier | exclude | G | 0.0% |
| 17 | `ID_UEV` | Identifier (ID_UEV) | numeric | exclude | G | 0.1% |
| 18 | `NUM_UEV` | Num Uev | numeric | exclude | G | 0.1% |
| 19 | `MATRICULE_83` | Matricule 83 | identifier | exclude | G | 0.1% |
| 20 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 0.0% |
| 21 | `Y` | Y coordinate (MTM) | geo_latitude | geo | G | 0.0% |
| 22 | `LNG` | Longitude | geo_longitude | geo | G | 0.0% |
| 23 | `LAT` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (6): `CAT_BISSON`, `TYPE_CAT_BISSON`, `TYPE_VOIE`, `LIEN_VOIE`, `DEMOLI`, `STATUT_INV_PRE_40_2025`

**Measures** (2): `CIV_DE`, `CIV_A`

**Geo fields** (4): `X`, `Y`, `LNG`, `LAT`

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
