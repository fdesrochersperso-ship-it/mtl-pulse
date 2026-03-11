# Politiques sociales
# Social Policy

> Generated: 2026-03-10 08:09
> Datasets: 16

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 9 | Excellent |
| **B** | 2 | Good |
| **C** | 2 | Usable |
| **D** | 0 | Sparse |
| **F** | 3 | Unusable |
| | **16** | (13 usable in report builder) |

---

## Datasets

- **[A]** [Programmes et subventions destinés à la population et aux organismes](#vmtl-programmes-subventions-destines-population) [RB]
- **[A]** [Règlements municipaux](#vmtl-reglements-municipaux) [RB]
- **[A]** [Inspections préventives en salubrité du Service de l'habitation](#vmtl-inspections-preventives-salubrite-service-habitation) [RB]
- **[A]** [Immeubles et terrains assujettis au droit de préemption](#vmtl-immeubles-terrains-assujettis-droit-preemption) [RB]
- **[A]** [Résultats du Budget participatif de Montréal](#vmtl-budget-participatif-montreal) [RB]
- **[A]** [Logements hors marché dans l'agglomération de Montréal](#vmtl-logements-sociaux) [RB]
- **[A]** [Organismes ayant reconnaissance PANAM](#vmtl-reconnaissance-panam) [RB]
- **[A]** [Quartiers sociologiques](#vmtl-quartiers-sociologiques) [RB]
- **[A]** [Subventions en habitation destinées aux citoyennes et citoyens](#vmtl-subvention-habitation) [RB]
- **[B]** [Ententes conclues dans le cadre du Règlement pour une métropole mixte](#vmtl-ententes-reglement-metropole-mixte) [RB]
- **[B]** [Indice d'équité des milieux de vie](#vmtl-indice-equite-milieux-vie) [RB]
- **[C]** [Quartiers de référence en habitation](#vmtl-quartiers) [RB]
- **[C]** [Sondage Écho sur l'inclusion des personnes immigrantes](#vmtl-sondage-inclusion-personnes-immigrantes) [RB]
- **[F]** [Cartes pour l'application du Règlement pour une métropole mixte](#vmtl-cartes-reglement-metropole-mixte)
- **[F]** [Zone de revitalisation urbaine intégrée (RUI)](#vmtl-rui)
- **[F]** [Bâtiments certifiés « qualité famille »](#vmtl-batiments-certifies-qualite-famille)

---

## Immeubles et terrains assujettis au droit de préemption
### Immeubles Et Terrains Assujettis Au Droit De Premption

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-immeubles-terrains-assujettis-droit-preemption` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la gestion et planification immobilière |
| **Update Frequency** | monthly |
| **Total Records** | 963 |
| **Formats** | ZIP, GEOJSON, CSV |

> Inventaire des immeubles et terrains assujettis au droit de préemption. Le droit de préemption permet à la Ville de Montréal d’acheter en priorité sur tout autre acheteur certains immeubles ou terrains afin d’y réaliser des projets au bénéfice de la communauté.

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `NUMERO_DE_LOT` | No. De Lot | numeric | exclude | G | 0.0% |
| 2 | `ETAT` | State | category | dimension | G | 0.0% |
| 3 | `SERVICE_RESPONSABLE` | Manager | category | dimension | G | 0.0% |
| 4 | `ARRONDISSEMENT` | Borough | text | dimension | G | 0.0% |
| 5 | `NUMERO_UEV` | No. Uev | category | dimension | G | 0.0% |
| 6 | `PUBLICATION_ASSUJ` | Publication Assuj | numeric | measure | G | 0.0% |
| 7 | `LOC_X` | X coordinate (MTM) | numeric | measure | G | 0.0% |
| 8 | `LOC_Y` | Y coordinate (MTM) | numeric | measure | G | 0.0% |
| 9 | `LONGITUDE` | Longitude | geo_longitude | geo | G | 0.0% |
| 10 | `LATITUDE` | Latitude | geo_latitude | geo | G | 0.0% |

**Dimensions** (4): `ETAT`, `SERVICE_RESPONSABLE`, `ARRONDISSEMENT`, `NUMERO_UEV`

**Measures** (3): `PUBLICATION_ASSUJ`, `LOC_X`, `LOC_Y`

**Geo fields** (2): `LONGITUDE`, `LATITUDE`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates

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

## Logements hors marché dans l'agglomération de Montréal
### Housing Hors March Dans L Agglomration De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-logements-sociaux` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | irregular |
| **Total Records** | 2,832 |
| **Formats** | GEOJSON, SHP, CSV |

> Liste des projets et/ou bâtiments associés aux logements hors marché. Inventaire construit à partir de différentes sources de données de qualité variable au début des années 2000 et entretenue, depuis, sur une base annuelle. Données utilisées pour mieux connaître la desserte en logements hors marché

**Warnings:**
- Data obfuscated for privacy protection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `OBJECTID` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `IdGeom` | Geometry | numeric | measure | G | 0.0% |
| 3 | `Projetnom` | Project | text | filter | G | 0.0% |
| 4 | `phase` | Phase | category | exclude | E | 98.4% |
| 5 | `nlog` | Nlog | numeric | measure | G | 0.0% |
| 6 | `nbchambre` | Nbchambre | numeric | dimension | G | 0.0% |
| 7 | `unites_typ` | Unites Typ | category | dimension | G | 0.0% |
| 8 | `type` | Type | category | dimension | G | 0.0% |
| 9 | `an_program` | An Program | numeric | measure | G | 0.0% |
| 10 | `nomrue` | Nomrue | text | filter | G | 1.3% |
| 11 | `arrond` | Borough | category | dimension | G | 0.6% |
| 12 | `villelie` | City | category | exclude | E | 99.4% |
| 13 | `qr2008` | Qr2008 | numeric | measure | G | 1.3% |
| 14 | `loghlm_fam` | Loghlm Fam | numeric | measure | G | 0.0% |
| 15 | `loghlm_pa` | Loghlm Pa | numeric | measure | G | 0.0% |
| 16 | `loghlm_aut` | Loghlm Aut | numeric | dimension | G | 0.0% |
| 17 | `xnad83_ts` | X coordinate (MTM) | numeric | measure | G | 0.0% |
| 18 | `ynad83_ts` | Y coordinate (MTM) | numeric | measure | G | 0.0% |
| 19 | `Long_x` | Longitude | numeric | measure | G | 0.0% |
| 20 | `Latitud_y` | Latitud Y | numeric | measure | G | 0.0% |

**Dimensions** (5): `nbchambre`, `unites_typ`, `type`, `arrond`, `loghlm_aut`

**Measures** (10): `IdGeom`, `nlog`, `an_program`, `qr2008`, `loghlm_fam`, `loghlm_pa`, `xnad83_ts`, `ynad83_ts`, `Long_x`, `Latitud_y`

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

## Quartiers sociologiques
### Quartiers Sociologiques

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-quartiers-sociologiques` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | irregular |
| **Total Records** | 32 |
| **Formats** | SHP, GEOJSON, CSV |

> Ce fichier contient le découpage des 32 quartiers sociologique à Montréal en 2014.

La notion de quartier sociologique ne renvoie pas à un découpage administratif formel. Elle illustre les territoires montréalais (quartier) identifiés et reconnus par les acteurs locaux sur la base de l’historique,

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id` | Identifier | numeric | dimension | G | 0.0% |
| 2 | `Q_sociologique` | Q Sociologique | identifier | exclude | G | 0.0% |
| 3 | `Arrondissement` | Borough | category | dimension | G | 0.0% |
| 4 | `Abreviation` | Abreviation | category | dimension | G | 0.0% |
| 5 | `nbr_RUI` | Nbr Rui | numeric | measure | G | 0.0% |
| 6 | `Table` | Table | identifier | exclude | G | 0.0% |

**Dimensions** (3): `id`, `Arrondissement`, `Abreviation`

**Measures** (1): `nbr_RUI`

**Join opportunities:** boroughs via arrondissement field

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

## Résultats du Budget participatif de Montréal
### Rsultats Du budget Participatif De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-budget-participatif-montreal` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | irregular |
| **Total Records** | 880 |
| **Formats** | CSV |

> Cet ensemble de données contient les informations recueillies dans le cadre des trois éditions du budget participatif de la Ville de Montréal. Les données présentent les résultats récoltés pour chaque édition à chaque phase de la démarche, de la collecte d'idées, jusqu'au vote citoyen. 

Pour la p

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Numero_idee` | No. Idee | numeric | exclude | G | 0.0% |
| 2 | `Nom _idee` | Name Idee | identifier | exclude | G | 0.3% |
| 3 | `Description_idee` | Description Idee | identifier | exclude | G | 0.0% |
| 4 | `Pourquoi_idee` | Pourquoi Idee | identifier | exclude | G | 0.0% |
| 5 | `Types_amenagements_proposes` | Types Amenagements Proposes | identifier | exclude | G | 0.0% |
| 6 | `Personnes_visees` | Personnes Visees | text | filter | G | 0.0% |
| 7 | `Arrondissements` | Arrondissements | text | filter | G | 0.0% |
| 8 | `Lieu_precis` | Lieu Precis | text | filter | G | 0.2% |
| 9 | `Sceau_jeunesse` | Sceau Jeunesse | category | dimension | G | 0.0% |
| 10 | `Theme_principal` | Theme Principal | category | dimension | G | 0.0% |
| 11 | `Categorie_principale` | Category Principale | category | dimension | G | 0.0% |
| 12 | `Idee_criteres_admissibilite` | Idee Criteres Admissibilite | category | dimension | G | 0.0% |
| 13 | `Raison_principale_non_recevabilite` | Raison Principale No Recevabilite | text | filter | G | 0.0% |
| 14 | `comite_idee_soumise` | Committee Idee Soumise | text | dimension | G | 0.0% |
| 15 | `Idee_priorisee` | Idee Priorisee | category | dimension | G | 0.0% |
| 16 | `Nom_projet_developpe` | Project | text | filter | G | 0.0% |

**Dimensions** (6): `Sceau_jeunesse`, `Theme_principal`, `Categorie_principale`, `Idee_criteres_admissibilite`, `comite_idee_soumise`, `Idee_priorisee`

---

## Subventions en habitation destinées aux citoyennes et citoyens
### Grants En Habitation Destines Aux Citoyennes Et Citoyens

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-subvention-habitation` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | annual |
| **Total Records** | 32,060 |
| **Temporal Range** | 2012-01-20 to 2023-11-03 |
| **Formats** | CSV |

> La Ville de Montréal administre des programmes de subventions en habitation destinés à aider les citoyennes et les citoyens. Ces programmes ont entre autres pour objectif de préserver la qualité du parc résidentiel montréalais, d’offrir des logements adaptés aux personnes en situation de handicap et

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID_SDSR` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `DATE` | Date | date | date | G | 0.0% |
| 3 | `MONTANT` | Amount | numeric | measure | G | 0.0% |
| 4 | `TRANSACTION` | Transaction | category | dimension | G | 0.0% |
| 5 | `ARRONDISSEMENT` | Borough | category | dimension | G | 0.0% |
| 6 | `CATEGORIE` | Category | category | dimension | G | 0.0% |

**Dimensions** (3): `TRANSACTION`, `ARRONDISSEMENT`, `CATEGORIE`

**Measures** (1): `MONTANT`

**Date fields** (1): `DATE`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Ententes conclues dans le cadre du Règlement pour une métropole mixte
### Ententes Conclues Dans Le Cadre Du Rglement Pour Une Mtropole Mixte

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-ententes-reglement-metropole-mixte` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | weekly |
| **Total Records** | 263 |
| **Temporal Range** | 2020-03-09 to 2026-02-25 |
| **Formats** | GEOJSON, SHP, CSV |

> Ensemble de données sur les ententes conclues en vertu du Règlement pour une métropole mixte visant à améliorer l'offre en matière de logement social, abordable et familial (20-041). Depuis le 1er avril 2021, pour tous les permis assujettis, la conclusion d’une entente conforme au Règlement est requ

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id_entente` | ID Agreement | numeric | filter | G | 0.0% |
| 2 | `date_signature_sys` | Date Signature Sys | date | date | G | 0.0% |
| 3 | `nom_entente` | Name Agreement | text | filter | U | 14.4% |
| 4 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 5 | `adr_emplacement` | Adr Emplacement | text | filter | P | 55.5% |
| 6 | `lot` | Lot | identifier | exclude | G | 0.0% |
| 7 | `superf_resid_ajout` | Superf Resid Ajout | numeric | measure | G | 0.0% |
| 8 | `nb_log_ajout` | Count Log Ajout | numeric | measure | G | 0.0% |
| 9 | `contrib_social_fin` | End date | text | filter | G | 0.0% |
| 10 | `mnt_contrib_social_fin` | End date (mnt_contrib_social_fin) | text | filter | G | 3.0% |
| 11 | `contrib_social_tss` | Contrib Social Tss | category | dimension | G | 0.0% |
| 12 | `superf_resid_social_tss` | Superf Resid Social Tss | numeric | exclude | E | 98.1% |
| 13 | `prix_achat_tss` | Price | numeric | exclude | E | 98.1% |
| 14 | `contrib_social_ths` | Contrib Social Ths | category | dimension | G | 0.0% |
| 15 | `superf_resid_social_prevu_ths` | Superf Resid Social Prevu Ths | numeric | exclude | E | 98.9% |
| 16 | `prix_achat_ths` | Price (prix_achat_ths) | numeric | exclude | E | 98.9% |
| 17 | `contrib_social_cem` | Contrib Social Cem | category | dimension | G | 0.0% |
| 18 | `contrib_abord_fin` | End date (contrib_abord_fin) | text | filter | G | 0.0% |
| 19 | `mnt_contrib_abord_fin` | End date (mnt_contrib_abord_fin) | text | filter | G | 0.4% |
| 20 | `real_log_abord_ss` | Real Log Abord Ss | category | dimension | G | 0.0% |
| 21 | `superf_tot_ss_entente` | Superf Tot Ss Entente | numeric | exclude | E | 99.6% |
| 22 | `real_log_abord_hs` | Real Log Abord Hs | category | dimension | G | 0.0% |
| 23 | `superf_tot_hs_entente` | Superf Tot Hs Entente | all_null | exclude | E | 100.0% |
| 24 | `nb_log_famil_scdp` | Count Log Famil Scdp | numeric | measure | G | 1.1% |

**Dimensions** (6): `arrondissement`, `contrib_social_tss`, `contrib_social_ths`, `contrib_social_cem`, `real_log_abord_ss`, `real_log_abord_hs`

**Measures** (3): `superf_resid_ajout`, `nb_log_ajout`, `nb_log_famil_scdp`

**Date fields** (1): `date_signature_sys`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Indice d'équité des milieux de vie
### Indice D Quit Des Milieux De Vie

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-indice-equite-milieux-vie` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | annual |
| **Total Records** | 2,822 |
| **Formats** | PDF, SHP, CSV, XLS, GEOJSON |

> L'indice d’équité des milieux de vie est un indice territorial qui vise à localiser les milieux de vie cumulant des vulnérabilités urbaines afin de susciter la priorisation et la convergence des investissements municipaux. Cet indice représente les milieux qui cumulent les vulnérabilités sociales, é

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `adidu` | Identifier | numeric | measure | G | 0.0% |
| 2 | `arr_ville` | City | category | dimension | G | 0.0% |
| 3 | `type` | Type | category | dimension | G | 0.0% |
| 4 | `pop2021` | Pop2021 | numeric | measure | G | 0.0% |
| 5 | `log_priv2021` | Log Priv2021 | numeric | measure | G | 0.0% |
| 6 | `mono_pr` | Mono Pr | numeric | measure | G | 0.0% |
| 7 | `imm_recent_pr` | Imm Recent Pr | numeric | measure | G | 0.0% |
| 8 | `autoch_minor_pr` | Autoch Minor Pr | numeric | measure | G | 0.0% |
| 9 | `sans_diplome_pr` | Sans Diplome Pr | numeric | measure | G | 0.0% |
| 10 | `pr_men_bil` | Pr Men Bil | numeric | measure | G | 0.0% |
| 11 | `pr_ind_mpc` | Pr Ind Mpc | numeric | measure | G | 0.0% |
| 12 | `pr_log_autor_axes_ps` | X coordinate (MTM) | numeric | measure | G | 0.0% |
| 13 | `pr_laeq60pl` | Pr Laeq60Pl | numeric | measure | G | 0.0% |
| 14 | `pr_nocanop` | Pr Nocanop | numeric | measure | G | 0.0% |
| 15 | `pr_indust300m` | Pr Indust300M | numeric | measure | G | 0.0% |
| 16 | `pr_logchaleur` | Pr Logchaleur | numeric | measure | G | 0.0% |
| 17 | `mefaits_pond` | Mefaits Pond | numeric | measure | G | 0.0% |
| 18 | `collisions_rt` | Collisions Rt | numeric | measure | G | 0.0% |
| 19 | `crimes_pond` | Crimes Pond | numeric | measure | G | 0.0% |
| 20 | `nb_commerces_alimentaires_moyenne_ponderee` | Average | numeric | measure | G | 0.0% |
| 21 | `nb_organismes_communautaires_moyenne_ponderee` | Organization | numeric | measure | G | 0.0% |
| 22 | `nb_pharmacies_moyenne_ponderee` | Average (nb_pharmacies_moyenne_ponderee) | numeric | measure | G | 0.0% |
| 23 | `nb_ecoles_primaires_moyenne_ponderee` | Average (nb_ecoles_primaires_moyenne_ponderee) | numeric | measure | G | 0.0% |
| 24 | `nb_pass_tc` | Count Pass Tc | numeric | measure | G | 0.0% |
| 25 | `nb_emplois_acces_tc_30min` | Count Emplois Acces Tc 30min | numeric | measure | G | 0.0% |
| 26 | `nb_biblio_lieux_cult_principaux_moy_pond` | Count Biblio Lieux Cult Principaux Moy Pond | numeric | measure | G | 0.0% |
| 27 | `nb_equipement_distinct_moy_pond` | Count Equipement Distinct Moy Pond | numeric | measure | G | 0.0% |
| 28 | `superficie_parc_accessible_moy_pond` | Area Parc Accessible Moy Pond | numeric | measure | G | 0.0% |
| 29 | `ACP_sociale` | Acp Sociale | numeric | measure | G | 0.0% |
| 30 | `ACP_econo` | Acp Econo | numeric | measure | G | 0.0% |
| 31 | `ACP_environn` | Acp Environn | numeric | measure | G | 0.0% |
| 32 | `ACP_securite` | Acp Securite | numeric | measure | G | 0.0% |
| 33 | `ACP_proximite` | X coordinate (MTM) (ACP_proximite) | numeric | measure | G | 0.0% |
| 34 | `ACP_CultSportLoisir` | Acp Cultsportloisir | numeric | measure | G | 0.0% |
| 35 | `ACP_sociale_2quintiles` | Acp Sociale 2Quintiles | numeric | dimension | G | 0.0% |
| 36 | `ACP_econo_2quintiles` | Acp Econo 2quintiles | numeric | dimension | G | 0.0% |
| 37 | `ACP_enviro_2quintiles` | Acp Enviro 2Quintiles | numeric | dimension | G | 0.0% |
| 38 | `ACP_securite_2quintiles` | Acp Securite 2Quintiles | numeric | dimension | G | 0.0% |
| 39 | `ACP_proximite_2quintiles` | X coordinate (MTM) (ACP_proximite_2quintiles) | numeric | dimension | G | 0.0% |
| 40 | `ACP_CultSportLoisir_2quintiles` | Acp Cultsportloisir 2Quintiles | numeric | dimension | G | 0.0% |
| 41 | `Indice_emv` | Index Emv | numeric | dimension | G | 0.0% |

**Dimensions** (9): `arr_ville`, `type`, `ACP_sociale_2quintiles`, `ACP_econo_2quintiles`, `ACP_enviro_2quintiles`, `ACP_securite_2quintiles`, `ACP_proximite_2quintiles`, `ACP_CultSportLoisir_2quintiles`, `Indice_emv`

**Measures** (32): `adidu`, `pop2021`, `log_priv2021`, `mono_pr`, `imm_recent_pr`, `autoch_minor_pr`, `sans_diplome_pr`, `pr_men_bil`, `pr_ind_mpc`, `pr_log_autor_axes_ps`, `pr_laeq60pl`, `pr_nocanop`, `pr_indust300m`, `pr_logchaleur`, `mefaits_pond`, `collisions_rt`, `crimes_pond`, `nb_commerces_alimentaires_moyenne_ponderee`, `nb_organismes_communautaires_moyenne_ponderee`, `nb_pharmacies_moyenne_ponderee`, `nb_ecoles_primaires_moyenne_ponderee`, `nb_pass_tc`, `nb_emplois_acces_tc_30min`, `nb_biblio_lieux_cult_principaux_moy_pond`, `nb_equipement_distinct_moy_pond`, `superficie_parc_accessible_moy_pond`, `ACP_sociale`, `ACP_econo`, `ACP_environn`, `ACP_securite`, `ACP_proximite`, `ACP_CultSportLoisir`

---

## Quartiers de référence en habitation
### Quartiers De Rfrence En Habitation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-quartiers` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | irregular |
| **Total Records** | 91 |
| **Formats** | SHP, GEOJSON, CSV |

> Couche géographique découpant le territoire montréalais en entités historiques et analytiques, répondant aux besoins d'analyse en habitation. De plus, ces quartiers sont des milieux de vie relativement homogènes socio-économiquement.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `no_qr` | Number | numeric | dimension | G | 0.0% |
| 2 | `nom_qr` | Name Qr | identifier | exclude | G | 0.0% |
| 3 | `no_arr` | No. Borough | numeric | dimension | U | 15.4% |
| 4 | `nom_arr` | Name Borough | category | dimension | U | 15.4% |
| 5 | `nom_mun` | Name Mun | category | dimension | G | 0.0% |

**Dimensions** (4): `no_qr`, `no_arr`, `nom_arr`, `nom_mun`

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

## Bâtiments certifiés « qualité famille »
### Btiments Certifis Qualit Famille

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-batiments-certifies-qualite-famille` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | PDF, KML |

> Le programme de certification « qualité famille » a été lancé publiquement en mai 2013. La Ville de Montréal compte plus de 230 bâtiments certifiés « qualité famille ». Ceux-ci sont munis d’un ou de plusieurs équipements qui facilitent la vie des familles tels que des tables à langer et des fauteuil

**Warnings:**
- No DataStore resource (API not available)

---

## Cartes pour l'application du Règlement pour une métropole mixte
### Maps Pour L Application Du Rglement Pour Une Mtropole Mixte

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-cartes-reglement-metropole-mixte` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de l'habitation |
| **Update Frequency** | irregular |
| **Total Records** | 0 |
| **Formats** | ZIP, SHP, GEOJSON |

> En vertu du Règlement pour une métropole mixte, toute personne qui réalise un projet résidentiel de plus de 450 m² (équivalant à environ 5 logements) doit conclure une entente avec la Ville afin de contribuer à l’offre de logements sociaux, abordables et familiaux.

Pour obtenir de plus amples inf

---

## Zone de revitalisation urbaine intégrée (RUI)
### Zone De Revitalisation Urbaine Intgre Rui

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-rui` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | notPlanned |
| **Total Records** | 0 |
| **Formats** | SHP, GEOJSON, GML |

> Ce fichier contient le découpage des douze RUI à Montréal en 2014.

« La RUI est une stratégie d'intervention qui se distingue des stratégies sectorielles de développement urbain, économique et social, par les objectifs qu’elle poursuit et l’approche concertée et participative qu’elle privilégie.

**Warnings:**
- No DataStore resource (API not available)

---
