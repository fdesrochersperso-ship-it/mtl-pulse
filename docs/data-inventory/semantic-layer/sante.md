# Sante
# Health

> Generated: 2026-03-10 08:09
> Datasets: 6

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 3 | Excellent |
| **B** | 3 | Good |
| **C** | 0 | Usable |
| **D** | 0 | Sparse |
| **F** | 0 | Unusable |
| | **6** | (6 usable in report builder) |

---

## Datasets

- **[A]** [Inspections préventives en salubrité du Service de l'habitation](#vmtl-inspections-preventives-salubrite-service-habitation) [RB]
- **[A]** [Contrevenants condamnés - salubrité, entretien et sécurité des logements](#vmtl-liste-central-condamnations-salubrite-logements) [RB]
- **[A]** [Avis de détérioration](#vmtl-avis-deterioration) [RB]
- **[B]** [Inspections de salubrité du Service de l'habitation](#vmtl-inspections-salubrite) [RB]
- **[B]** [Indicateur de priorité d'inspection de 2018](#vmtl-indicateur-priorite-inspection) [RB]
- **[B]** [Déclarations des exterminations de punaises de lit par des gestionnaires de parasites](#vmtl-declarations-exterminations-punaises-de-lit) [RB]

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

## Contrevenants condamnés - salubrité, entretien et sécurité des logements
### Contrevenants Condamns Salubrit Entretien Et Scurit Des housing

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-liste-central-condamnations-salubrite-logements` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | annual |
| **Total Records** | 321 |
| **Formats** | CSV |

> Cet ensemble de données présente la liste des contrevenants condamnés pour des infractions au Règlement sur la salubrité, l'entretien et la sécurité des logements (RVM 03-096), suite à des constats d’infraction émis par la Division de la salubrité du Service de l’habitation.

À noter que les conda

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `lieu_infraction_no_civique` | Violation | numeric | measure | G | 0.0% |
| 2 | `lieu_infraction_rue` | Violation (lieu_infraction_rue) | text | filter | G | 0.0% |
| 3 | `code_arrondissement` | Code Borough | category | dimension | G | 0.3% |
| 4 | `nom_contrevenant` | Name Contrevenant | text | filter | G | 0.0% |
| 5 | `article` | Article | text | filter | G | 0.0% |
| 6 | `nature_infraction` | Violation (nature_infraction) | text | filter | G | 0.0% |
| 7 | `date_infraction` | Violation (date_infraction) | text | filter | G | 0.0% |
| 8 | `date_jugement` | Date Jugement | text | filter | G | 0.0% |
| 9 | `amende_imposee` | Amende Imposee | text | dimension | G | 0.6% |

**Dimensions** (2): `code_arrondissement`, `amende_imposee`

**Measures** (1): `lieu_infraction_no_civique`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Inspections préventives en salubrité du Service de l'habitation
### Inspections Prventives En Salubrit Du Service De L Habitation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-inspections-preventives-salubrite-service-habitation` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | weekly |
| **Total Records** | 1,934 |
| **Temporal Range** | 2024-01-16 to 2025-09-25 |
| **Formats** | GEOJSON, SHP, CSV |

> Les données représentent le résultat des inspections préventives effectuées par le Service de l'habitation. Les données incluent : l'état physique des parties inspectées du bâtiment sur une échelle de 1 (excellent) à 6 (très mauvais), le transfert ou non du bâtiment pour une inspection complète et l

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `no_demande` | No. Application | numeric | exclude | G | 0.0% |
| 2 | `date_inspection` | Inspection | date | date | G | 0.2% |
| 3 | `fondation` | Fondation | numeric | dimension | G | 7.3% |
| 4 | `structure` | Structure | numeric | dimension | P | 81.0% |
| 5 | `enveloppe` | Enveloppe | numeric | dimension | G | 0.7% |
| 6 | `ouvertures` | Ouvertures | numeric | dimension | G | 0.4% |
| 7 | `saillies` | Saillies | numeric | dimension | G | 3.2% |
| 8 | `interieur` | Interieur | numeric | dimension | U | 13.4% |
| 9 | `moy_composants_inspectes` | Y coordinate (MTM) | numeric | measure | G | 0.0% |
| 10 | `constat_signifie` | Constat Signifie | category | dimension | G | 0.0% |
| 11 | `indicateur_insp_integrale` | Indicateur Insp Integrale | category | dimension | G | 0.0% |
| 12 | `adresse` | Address | identifier | exclude | G | 0.0% |
| 13 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 14 | `nombre_unite_logement` | Count Unit Logement | numeric | measure | G | 0.0% |
| 15 | `statut_dem` | Status Dem | category | dimension | G | 0.0% |
| 16 | `code_type_demande` | Code Type Application | category | dimension | G | 0.0% |
| 17 | `no_ident_uev` | No. Ident Uev | numeric | exclude | G | 0.2% |
| 18 | `longitude` | Longitude | geo_longitude | geo | G | 0.2% |
| 19 | `latitude` | Latitude | geo_latitude | geo | G | 0.2% |
| 20 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 0.2% |
| 21 | `Y` | Y coordinate (MTM) (Y) | geo_latitude | geo | G | 0.2% |

**Dimensions** (11): `fondation`, `structure`, `enveloppe`, `ouvertures`, `saillies`, `interieur`, `constat_signifie`, `indicateur_insp_integrale`, `arrondissement`, `statut_dem`, `code_type_demande`

**Measures** (2): `moy_composants_inspectes`, `nombre_unite_logement`

**Date fields** (1): `date_inspection`

**Geo fields** (4): `longitude`, `latitude`, `X`, `Y`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates; temporal join via date fields

---

## Déclarations des exterminations de punaises de lit par des gestionnaires de parasites
### Dclarations Des Exterminations De Punaises De Lit Par Des Gestionnaires De Parasites

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-declarations-exterminations-punaises-de-lit` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | quarterly |
| **Total Records** | 52,193 |
| **Temporal Range** | 2011-07-06 to 2025-07-31T15:59:22 |
| **Formats** | ZIP, GEOJSON, WEB, CSV |

> Déclarations des gestionnaires de parasites. Les formulaires de déclaration ont été soumis depuis le 5 juillet 2011. Les données ont un faible degré de fiabilité car elles sont consignées manuellement par des tiers, soit les gestionnaires de parasites et *ne font l'objet d'aucune validation de la pa

**Warnings:**
- Location rounded to nearest intersection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `NO_DECLARATION` | Ratio | numeric | exclude | G | 0.0% |
| 2 | `DATE_DECLARATION` | Ratio (DATE_DECLARATION) | date | date | G | 0.0% |
| 3 | `DATE_INSP_VISPRE` | Date Insp Vispre | date | date | G | 0.0% |
| 4 | `NBR_EXTERMIN` | Nbr Extermin | numeric | dimension | U | 21.3% |
| 5 | `DATE_DEBUTTRAIT` | Start date | date | date | U | 21.3% |
| 6 | `DATE_FINTRAIT` | Date Fintrait | date | date | U | 21.3% |
| 7 | `No_QR` | Number | numeric | dimension | G | 0.0% |
| 8 | `NOM_QR` | Name Qr | category | dimension | G | 0.0% |
| 9 | `NOM_ARROND` | Name Arrond | category | dimension | G | 0.0% |
| 10 | `COORD_X` | Coordinate X | geo_longitude | geo | G | 0.0% |
| 11 | `COORD_Y` | Coordinate Y | geo_latitude | geo | G | 0.0% |
| 12 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |
| 13 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (4): `NBR_EXTERMIN`, `No_QR`, `NOM_QR`, `NOM_ARROND`

**Date fields** (4): `DATE_DECLARATION`, `DATE_INSP_VISPRE`, `DATE_DEBUTTRAIT`, `DATE_FINTRAIT`

**Geo fields** (4): `COORD_X`, `COORD_Y`, `LONGITUDE`, `LATITUDE`

**Join opportunities:** spatial join via lat/long coordinates; temporal join via date fields

---

## Indicateur de priorité d'inspection de 2018
### Indicateur De Priorit D inspection De 2018

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-indicateur-priorite-inspection` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | notPlanned |
| **Total Records** | 69,408 |
| **Formats** | CSV |

> Cet ensemble résulte d'analyses statistiques réalisées par le Service de l'habitation de la Ville de Montréal. L’indicateur de priorité d'inspection vise à identifier les adresses les plus susceptibles de présenter des enjeux de salubrité afin de les faire inspecter par son équipe d’inspecteurs.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Id` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 3 | `nblog_batiment` | Nblog Building | text | filter | G | 0.0% |
| 4 | `requetes311_logement_2013_2017` | Requetes311 Logement 2013 2017 | numeric | dimension | G | 0.0% |
| 5 | `priorite_inspection` | Inspection | category | dimension | G | 0.0% |
| 6 | `longitude` | Longitude | geo_longitude | geo | G | 0.0% |
| 7 | `latitude` | Latitude | geo_latitude | geo | G | 0.0% |
| 8 | `X` | X coordinate (MTM) | geo_longitude | geo | G | 0.0% |
| 9 | `Y` | Y coordinate (MTM) | geo_latitude | geo | G | 0.0% |

**Dimensions** (3): `arrondissement`, `requetes311_logement_2013_2017`, `priorite_inspection`

**Geo fields** (4): `longitude`, `latitude`, `X`, `Y`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates

---

## Inspections de salubrité du Service de l'habitation
### Inspections De Salubrit Du Service De L Habitation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-inspections-salubrite` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | quarterly |
| **Total Records** | 2,453 |
| **Formats** | ZIP, GEOJSON, WEB, CSV |

> Cet ensemble de données contient des informations sur les inspections effectuées par la Division de la salubrité du Service de l’habitation (anciennement le Service de la mise en valeur du territoire).

La Ville de Montréal, par son [Règlement sur la salubrité, l’entretien et la sécurité des logem

**Warnings:**
- Location rounded to nearest intersection

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `no_demande` | No. Application | numeric | exclude | G | 0.0% |
| 2 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 3 | `date_premiere_inspection` | Inspection | text | filter | G | 0.0% |
| 4 | `statut_demande` | Status Application | category | dimension | G | 0.0% |
| 5 | `nb_unite_logement` | Count Unit Logement | numeric | measure | P | 87.5% |
| 6 | `nb_logements_non_conformes` | Count Logements No Conformes | numeric | measure | G | 0.0% |
| 7 | `nb_non_conformite` | Count No Conformite | numeric | measure | G | 0.0% |
| 8 | `taux_correction` | Rate Correction | numeric | measure | P | 89.9% |
| 9 | `quartier_de_reference_num` | Reference | numeric | dimension | G | 0.0% |
| 10 | `quartier_de_reference_nom` | Reference (quartier_de_reference_nom) | category | dimension | G | 0.0% |
| 11 | `x` | X coordinate (MTM) | geo_longitude | geo | G | 0.0% |
| 12 | `y` | Y coordinate (MTM) | geo_latitude | geo | G | 0.0% |
| 13 | `longitude` | Longitude | geo_longitude | geo | G | 0.0% |
| 14 | `latitude` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (4): `arrondissement`, `statut_demande`, `quartier_de_reference_num`, `quartier_de_reference_nom`

**Measures** (4): `nb_unite_logement`, `nb_logements_non_conformes`, `nb_non_conformite`, `taux_correction`

**Geo fields** (4): `x`, `y`, `longitude`, `latitude`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates; temporal join via date fields

---
