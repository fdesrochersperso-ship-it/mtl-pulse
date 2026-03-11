# Economie et entreprises
# Economy and Business

> Generated: 2026-03-10 08:09
> Datasets: 9

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 2 | Excellent |
| **B** | 2 | Good |
| **C** | 3 | Usable |
| **D** | 0 | Sparse |
| **F** | 2 | Unusable |
| | **9** | (7 usable in report builder) |

---

## Datasets

- **[A]** [Liste des transactions immobilières](#vmtl-liste-des-transactions-immobilieres) [RB]
- **[A]** [Liste des baux actifs](#vmtl-liste-des-baux-sous-gestion) [RB]
- **[B]** [Locaux commerciaux et statuts d'occupation](#vmtl-locaux-commerciaux) [RB]
- **[B]** [Étude sur les barrières d'accès à l'entrepreneuriat chez les populations vulnérables](#vmtl-etude-barrieres-entrepreneuriat-populations-vulnerables) [RB]
- **[C]** [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique) [RB]
- **[C]** [Requêtes des entreprises dans le cadre de la COVID-19](#vmtl-requetes-entreprises-covid-19) [RB]
- **[C]** [Sondage Écho sur l'inclusion des personnes immigrantes](#vmtl-sondage-inclusion-personnes-immigrantes) [RB]
- **[F]** [J'informe les commerçants](#vmtl-informe-commercants)
- **[F]** [Indicateurs de l'état du centre-ville (archives)](#vmtl-indicateurs-de-l-etat-du-centre-ville)

---

## Liste des baux actifs
### List Des Baux Actifs

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-liste-des-baux-sous-gestion` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la stratégie immobilière |
| **Update Frequency** | annual |
| **Total Records** | 736 |
| **Temporal Range** | 1914-01-01 to 3000-09-14 |
| **Formats** | CSV |

> Cet ensemble de données présente les baux en vigueur (incluant la Ville locataire, la Ville locateur et les emphytéoses) comprenant les informations s’y rapportant : type de location, signataire (nom), adresse, arrondissement, date de début de bail et date de fin de bail.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Type de location` | Type De Location | category | dimension | G | 0.0% |
| 2 | `Signataire (Nom)` | Signataire Name | text | filter | G | 0.0% |
| 3 | `Adresse` | Address | text | filter | G | 0.0% |
| 4 | `Arrondissement` | Borough | text | filter | G | 0.0% |
| 5 | `Date de debut de bail` | Start date | date | date | G | 0.0% |
| 6 | `Date de fin de bail` | Date De End De Bail | date | date | G | 0.0% |

**Dimensions** (1): `Type de location`

**Date fields** (2): `Date de debut de bail`, `Date de fin de bail`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Liste des transactions immobilières
### List Des Transactions Immobilires

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-liste-des-transactions-immobilieres` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de la stratégie immobilière |
| **Update Frequency** | annual |
| **Total Records** | 71 |
| **Temporal Range** | 2024-01-19 to 2024-12-17 |
| **Formats** | CSV |

> Cet ensemble de données présente les transactions conclues au cours de la période du 1er janvier 2023 au 31 décembre 2024 (incluant les ventes, les acquisitions, les servitudes, droit de préemption, etc.) comprenant les informations s’y rapportant : catégorie, nom du contractant, description et mont

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Categorie` | Category | category | dimension | G | 0.0% |
| 2 | `cocontractant` | Cocontractant | identifier | exclude | G | 0.0% |
| 3 | `Description` | Description | identifier | exclude | G | 0.0% |
| 4 | `montant_transaction` | Amount | text | filter | G | 0.0% |
| 5 | `arrondissement` | Borough | category | dimension | G | 0.0% |
| 6 | `numero_decision-resolution` | No. Decision Resolution | identifier | exclude | G | 0.0% |
| 7 | `no_acte_notarie` | No. Acte Notarie | numeric | dimension | G | 0.0% |
| 8 | `date_signature` | Date Signature | date | date | G | 0.0% |

**Dimensions** (3): `Categorie`, `arrondissement`, `no_acte_notarie`

**Date fields** (1): `date_signature`

**Join opportunities:** boroughs via arrondissement field; temporal join via date fields

---

## Locaux commerciaux et statuts d'occupation
### Locaux Commerciaux Et Statuts D Occupation

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-locaux-commerciaux` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service du développement économique |
| **Update Frequency** | annual |
| **Total Records** | 29,203 |
| **Temporal Range** | 2022-07-04 to 2022-08-29 |
| **Formats** | PDF, GPKG, SHP, CSV, WEB, GEOJSON |

> L’enquête terrain des locaux commerciaux vise à élaborer un portrait du commerce de rue sur le territoire de l’agglomération de Montréal afin de répertorier les locaux destinés à la pratique d’une activité économique (excluant les activités industrielles et institutionnelles).

Ce jeu de données p

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID` | Identifier | identifier | exclude | G | 0.0% |
| 2 | `ORIGINE` | Origine | category | dimension | G | 0.0% |
| 3 | `T_COMMERCE` | T Commerce | category | dimension | G | 0.0% |
| 4 | `DATE_CREATION` | Date Creation | date | date | G | 0.0% |
| 5 | `CIVIQUE` | Civic number | numeric | measure | G | 0.0% |
| 6 | `TYPE_VOIE` | Type Lane | category | dimension | G | 0.0% |
| 7 | `LIEN_VOIE` | Link Lane | category | dimension | P | 72.8% |
| 8 | `NOM_VOIE` | Name Lane | text | dimension | G | 0.0% |
| 9 | `ORIENTATION` | Orientation | category | dimension | P | 77.6% |
| 10 | `ADRESSE` | Address | text | filter | G | 0.0% |
| 11 | `SUITE` | Suite | text | filter | U | 42.7% |
| 12 | `ETAGE` | Etage | category | dimension | G | 0.0% |
| 13 | `NOM_CENTRE` | Name Centre | category | dimension | U | 11.6% |
| 14 | `NOM_ETAB` | Name Etab | text | filter | G | 0.0% |
| 15 | `ID_USAGE1` | Identifier (ID_USAGE1) | category | dimension | G | 0.0% |
| 16 | `USAGE1` | Usage1 | category | dimension | G | 0.0% |
| 17 | `ID_USAGE2` | Identifier (ID_USAGE2) | numeric | dimension | G | 0.0% |
| 18 | `USAGE2` | Usage2 | text | filter | G | 0.0% |
| 19 | `ID_USAGE3` | Identifier (ID_USAGE3) | numeric | dimension | G | 0.0% |
| 20 | `USAGE3` | Usage3 | text | filter | G | 0.0% |
| 21 | `SCIAN` | Scian | numeric | measure | G | 5.5% |
| 22 | `ACCES_MOBILITE_REDUITE` | Acces Mobilite Reduite | category | dimension | G | 0.0% |
| 23 | `VACANT_A_LOUER` | Vacant A Louer | category | dimension | G | 0.0% |
| 24 | `ARRONDISSEMENT` | Borough | category | dimension | G | 0.0% |
| 25 | `QUARTIER` | Neighbourhood | category | dimension | G | 0.0% |
| 26 | `SDC_NOM` | Sdc Name | category | dimension | P | 88.4% |
| 27 | `SECTEUR_PME` | Sector Pme | category | dimension | G | 0.0% |
| 28 | `ENFANT` | Enfant | category | dimension | G | 0.0% |
| 29 | `MULTIUSAGE` | Multiusage | category | dimension | G | 0.0% |
| 30 | `MULTIOCCUPPANT` | Multioccuppant | category | dimension | G | 0.0% |
| 31 | `COORDX` | Coordinates | text | filter | G | 0.0% |
| 32 | `COORDY` | Coordinates (COORDY) | text | filter | G | 0.0% |
| 33 | `LAT` | Latitude | geo_latitude | geo | G | 0.0% |
| 34 | `LONG` | Longitude | geo_longitude | geo | G | 0.0% |

**Dimensions** (21): `ORIGINE`, `T_COMMERCE`, `TYPE_VOIE`, `LIEN_VOIE`, `NOM_VOIE`, `ORIENTATION`, `ETAGE`, `NOM_CENTRE`, `ID_USAGE1`, `USAGE1`, `ID_USAGE2`, `ID_USAGE3`, `ACCES_MOBILITE_REDUITE`, `VACANT_A_LOUER`, `ARRONDISSEMENT`, `QUARTIER`, `SDC_NOM`, `SECTEUR_PME`, `ENFANT`, `MULTIUSAGE`, `MULTIOCCUPPANT`

**Measures** (2): `CIVIQUE`, `SCIAN`

**Date fields** (1): `DATE_CREATION`

**Geo fields** (2): `LAT`, `LONG`

**Join opportunities:** boroughs via arrondissement field; spatial join via lat/long coordinates; temporal join via date fields

---

## Étude sur les barrières d'accès à l'entrepreneuriat chez les populations vulnérables
### Tude Sur Les Barrires D Accs L Entrepreneuriat Chez Les Populations Vulnrables

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-etude-barrieres-entrepreneuriat-populations-vulnerables` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service du développement économique |
| **Update Frequency** | notPlanned |
| **Total Records** | 1,443 |
| **Formats** | CSV |

> Résultats d'une étude menée en 2021 par la Ville de Montréal sur l'accès aux services entrepreneuriaux pour les populations vulnérables. Ce sondage visait à 1) identifier les principales barrières d’accès à l’entrepreneuriat sur l’île de Montréal, 2) dresser le portrait des entrepreneurs selon leur 

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `record` | Record | numeric | measure | G | 0.0% |
| 2 | `SEXE` | X coordinate (MTM) | numeric | dimension | G | 0.0% |
| 3 | `AGE` | Age | numeric | dimension | G | 0.0% |
| 4 | `LANGU` | Langu | numeric | dimension | G | 0.0% |
| 5 | `Q0QC` | Q0Qc | numeric | dimension | G | 0.0% |
| 6 | `Q0QCP` | Q0Qcp | numeric | measure | G | 0.0% |
| 7 | `Q1Ar1` | Q1Ar1 | numeric | dimension | G | 0.0% |
| 8 | `Q1Ar2` | Q1Ar2 | numeric | dimension | G | 0.0% |
| 9 | `Q1Ar3` | Q1Ar3 | numeric | dimension | G | 0.0% |
| 10 | `Q1Ar4` | Q1Ar4 | numeric | dimension | G | 0.0% |
| 11 | `Q1Ar5` | Q1Ar5 | numeric | dimension | G | 0.0% |
| 12 | `Q1Ar6` | Q1Ar6 | numeric | dimension | G | 0.0% |
| 13 | `Q1Ar7` | Q1Ar7 | numeric | dimension | G | 0.0% |
| 14 | `Q1Ar8` | Q1Ar8 | numeric | dimension | G | 0.0% |
| 15 | `Q1Ar9` | Q1Ar9 | numeric | dimension | G | 0.0% |
| 16 | `Q1Ar96` | Q1Ar96 | numeric | dimension | G | 0.0% |
| 17 | `Q1C` | Q1C | numeric | dimension | G | 0.0% |
| 18 | `Q1B` | Q1B | numeric | dimension | U | 34.7% |
| 19 | `Q2` | Q2 | numeric | dimension | G | 0.0% |
| 20 | `Q3` | Q3 | numeric | dimension | G | 0.0% |
| 21 | `Q4r1` | Q4R1 | numeric | dimension | G | 0.0% |
| 22 | `Q4r2` | Q4R2 | numeric | dimension | G | 0.0% |
| 23 | `Q5` | Q5 | numeric | dimension | G | 0.0% |
| 24 | `Q6` | Q6 | numeric | dimension | G | 0.0% |
| 25 | `Q7` | Q7 | numeric | dimension | G | 0.0% |
| 26 | `Q8r1` | Q8R1 | numeric | dimension | G | 0.0% |
| 27 | `Q8r2` | Q8R2 | numeric | dimension | G | 0.0% |
| 28 | `Q8r3` | Q8R3 | numeric | dimension | G | 0.0% |
| 29 | `Q8r4` | Q8R4 | numeric | dimension | G | 0.0% |
| 30 | `Q9r1` | Q9R1 | numeric | dimension | G | 0.0% |
| 31 | `Q9r2` | Q9R2 | numeric | dimension | G | 0.0% |
| 32 | `Q9r3` | Q9R3 | numeric | dimension | G | 0.0% |
| 33 | `Q9r4` | Q9R4 | numeric | dimension | G | 0.0% |
| 34 | `Q9r5` | Q9R5 | numeric | dimension | G | 0.0% |
| 35 | `Q9r6` | Q9R6 | numeric | dimension | G | 0.0% |
| 36 | `Q10` | Q10 | numeric | dimension | G | 0.0% |
| 37 | `N_BARRIERES` | N Barrieres | numeric | dimension | G | 0.0% |
| 38 | `pond` | Pond | numeric | measure | G | 0.0% |

**Dimensions** (35): `SEXE`, `AGE`, `LANGU`, `Q0QC`, `Q1Ar1`, `Q1Ar2`, `Q1Ar3`, `Q1Ar4`, `Q1Ar5`, `Q1Ar6`, `Q1Ar7`, `Q1Ar8`, `Q1Ar9`, `Q1Ar96`, `Q1C`, `Q1B`, `Q2`, `Q3`, `Q4r1`, `Q4r2`, `Q5`, `Q6`, `Q7`, `Q8r1`, `Q8r2`, `Q8r3`, `Q8r4`, `Q9r1`, `Q9r2`, `Q9r3`, `Q9r4`, `Q9r5`, `Q9r6`, `Q10`, `N_BARRIERES`

**Measures** (3): `record`, `Q0QCP`, `pond`

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

## Requêtes des entreprises dans le cadre de la COVID-19
### Requtes Des Entreprises Dans Le Cadre De La Covid 19

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-requetes-entreprises-covid-19` |
| **Quality Grade** | **C** |
| **Report Builder** | Yes |
| **Publisher** | Service du développement économique |
| **Update Frequency** | notPlanned |
| **Total Records** | 2,695 |
| **Temporal Range** | 2020-03-19T00:00:00 to 2020-03-27T00:00:00 |
| **Formats** | CSV |

> Pour soutenir les entreprises montréalaises durant cette situation exceptionnelle, le Service du développement économique de la Ville de Montréal a mis à la disposition des entreprises et des organisations montréalaises une ligne téléphonique dédiée, ainsi qu'un formulaire web afin de faciliter le c

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `ID` | Identifier | numeric | exclude | G | 0.0% |
| 2 | `Date` | Date | date | date | G | 0.0% |
| 3 | `Localisation à Montréal` | Location Montr Al | category | dimension | G | 0.0% |
| 4 | `Secteur d'activité de l'entreprise` | Sector D Activit De L Entreprise | category | dimension | G | 0.0% |
| 5 | `Nombre d'employés de l'entreprise au 1er mars 2020` | Count D Employ S De L Entreprise Au 1er Mars 2020 | category | dimension | G | 0.0% |
| 6 | `Sujet de la demande: Soutien financier` | Sujet De La Application Soutien Financier | text | filter | U | 14.7% |
| 7 | `Sujet de la demande: Maintien des opérations` | Sujet De La Application Maintien Des Op Rations | category | exclude | E | 93.5% |
| 8 | `Sujet de la demande: Fiscalité (taxes et impôts)` | Sujet De La Application Fiscalit Taxes Et Imp Ts | category | dimension | P | 77.9% |
| 9 | `Sujet de la demande: Ressources humaines` | Sujet De La Application Ressources Humaines | category | dimension | P | 85.4% |
| 10 | `Sujet de la demande: Réglementation` | Sujet De La Application Glementation | category | exclude | E | 91.9% |
| 11 | `Sujet de la demande: Marketing` | Sujet De La Application Marketing | category | exclude | E | 99.2% |
| 12 | `Sujet de la demande: Santé et sécurité` | Sujet De La Application Sant Et S Curit | category | exclude | E | 98.2% |
| 13 | `Source de la demande` | Source De La Application | category | dimension | G | 0.0% |
| 14 | `Arrondissement ou ville liée` | Borough Ou Ville Li E | text | dimension | G | 0.0% |

**Dimensions** (7): `Localisation à Montréal`, `Secteur d'activité de l'entreprise`, `Nombre d'employés de l'entreprise au 1er mars 2020`, `Sujet de la demande: Fiscalité (taxes et impôts)`, `Sujet de la demande: Ressources humaines`, `Source de la demande`, `Arrondissement ou ville liée`

**Date fields** (1): `Date`

**Join opportunities:** temporal join via date fields

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

## Indicateurs de l'état du centre-ville (archives)
### Indicators De L Tat Du Centre city Archives

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-indicateurs-de-l-etat-du-centre-ville` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service du développement économique |
| **Update Frequency** | notPlanned |
| **Total Records** | 32 |
| **Formats** | XLSX |

> L’état du centre-ville est un rapport trimestriel gratuit et accessible à tous qui donne le pouls de l’activité socioéconomique du centre-ville de Montréal. L’état du centre-ville vise à suivre l’évolution de la crise liée à la COVID-19 et à éclairer les efforts de relance.

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `Sources` | Sources | all_null | exclude | E | 100.0% |
| 2 | `Fréquence` | Fréquence | category | dimension | P | 87.5% |
| 3 | `Dernière période de référence` | Dernière Période De Référence | category | dimension | P | 75.0% |
| 4 | `Période de comparaison` | Période De Comparaison | numeric | measure | U | 34.4% |
| 5 | `Variation  (fleche / couleur/ %)` | Variation  (Fleche / Couleur/ %) | numeric | measure | U | 37.5% |

**Dimensions** (2): `Fréquence`, `Dernière période de référence`

**Measures** (2): `Période de comparaison`, `Variation  (fleche / couleur/ %)`

---

## J'informe les commerçants
### J Informe Les Commerants

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-informe-commercants` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service du développement économique |
| **Update Frequency** | notPlanned |
| **Total Records** | 0 |
| **Formats** | CSV |

> Pour soutenir les entreprises montréalaises durant cette situation exceptionnelle, le Service du développement économique de la Ville de Montréal a mis en place une initiative visant à informer de façon proactive les commerçants montréalais des programmes d'aides disponibles. Un court appel a permis

**Warnings:**
- No DataStore resource (API not available)

---
