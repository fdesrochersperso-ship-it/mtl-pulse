# Agriculture et alimentation
# Agriculture and Food

> Generated: 2026-03-10 08:09
> Datasets: 6

## Quality Overview

| Grade | Count | Description |
|-------|-------|-------------|
| **A** | 2 | Excellent |
| **B** | 2 | Good |
| **C** | 1 | Usable |
| **D** | 0 | Sparse |
| **F** | 1 | Unusable |
| | **6** | (5 usable in report builder) |

---

## Datasets

- **[A]** [Inspections des aliments et contrevenants](#vmtl-inspection-aliments-contrevenants) [RB]
- **[A]** [Établissements alimentaires](#vmtl-etablissements-alimentaires) [RB]
- **[B]** [Rapport sur les activités de l'inspection des aliments](#vmtl-inspection-aliments-bilan) [RB]
- **[B]** [Agriculture urbaine : sondage auprès de la population de l’île de Montréal](#vmtl-agriculture-urbaine-sondage) [RB]
- **[C]** [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique) [RB]
- **[F]** [Calendrier de la cuisine de rue (archives)](#vmtl-cuisine-de-rue)

---

## Inspections des aliments et contrevenants
### Inspections Des food Et Contrevenants

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-inspection-aliments-contrevenants` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'environnement - Division de l'inspection des aliments |
| **Update Frequency** | monthly |
| **Total Records** | 8,466 |
| **Temporal Range** | 19900601 to 20260226 |
| **Formats** | WEB, CSV |

> Cet ensemble présente la liste des établissements alimentaires situés sur le territoire de l’agglomération montréalaise et sous la responsabilité de la Division de l’inspection des aliments de la Ville de Montréal ayant fait l’objet d’une condamnation pour une infraction à la Loi sur les produits al

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `id_poursuite` | ID Poursuite | numeric | exclude | G | 0.0% |
| 2 | `business_id` | Business ID | numeric | filter | G | 0.0% |
| 3 | `date` | Date | date | date | G | 0.0% |
| 4 | `description` | Description | text | filter | G | 0.0% |
| 5 | `adresse` | Address | text | filter | G | 0.0% |
| 6 | `date_jugement` | Date Jugement | date | date | G | 0.0% |
| 7 | `etablissement` | Etablissement | text | filter | G | 0.0% |
| 8 | `montant` | Amount | numeric | measure | G | 0.0% |
| 9 | `proprietaire` | Owner | text | filter | G | 0.0% |
| 10 | `ville` | City | category | dimension | G | 0.0% |
| 11 | `statut` | Status | category | dimension | G | 0.0% |
| 12 | `date_statut` | Date Status | date | date | G | 0.0% |
| 13 | `categorie` | Category | text | dimension | G | 0.0% |

**Dimensions** (3): `ville`, `statut`, `categorie`

**Measures** (1): `montant`

**Date fields** (3): `date`, `date_jugement`, `date_statut`

**Join opportunities:** temporal join via date fields

---

## Établissements alimentaires
### Tablissements food

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-etablissements-alimentaires` |
| **Quality Grade** | **A** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'environnement - Division de l'inspection des aliments |
| **Update Frequency** | weekly |
| **Total Records** | 53,394 |
| **Temporal Range** | 19900326 to 20260302 |
| **Formats** | SHP, GEOJSON, WEB, CSV |

> Le présent ensemble localise les établissements sous la responsabilité de la Division de l’inspection des aliments de la Ville de Montréal.  Il est à noter que la Ville est mandataire du Ministère de l'Agriculture, des Pêcheries et de l'Alimentation du Québec (MAPAQ) en ce qui concerne l’inspection 

**Warnings:**
- Location rounded to nearest intersection
- Coordinates in MTM projection (not WGS84)

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `business_id` | Business ID | numeric | exclude | G | 0.0% |
| 2 | `name` | Name | identifier | exclude | G | 0.0% |
| 3 | `address` | Address | identifier | exclude | G | 0.0% |
| 4 | `city` | Y coordinate (MTM) | category | dimension | G | 0.0% |
| 5 | `state` | State | category | dimension | G | 0.0% |
| 6 | `type` | Type | text | filter | G | 0.0% |
| 7 | `statut` | Status | category | dimension | G | 0.0% |
| 8 | `date_statut` | Date Status | date | date | G | 0.0% |
| 9 | `latitude` | Latitude | geo_latitude | geo | G | 0.7% |
| 10 | `longitude` | Longitude | geo_longitude | geo | G | 0.7% |
| 11 | `x` | X coordinate (MTM) | geo_longitude | geo | G | 0.7% |
| 12 | `y` | Y coordinate (MTM) (y) | geo_latitude | geo | G | 0.7% |

**Dimensions** (3): `city`, `state`, `statut`

**Date fields** (1): `date_statut`

**Geo fields** (4): `latitude`, `longitude`, `x`, `y`

**Join opportunities:** spatial join via lat/long coordinates; temporal join via date fields

---

## Agriculture urbaine : sondage auprès de la population de l’île de Montréal
### Agriculture Urbaine survey Auprs De La population De Lle De Montral

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-agriculture-urbaine-sondage` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de la diversité et de l'inclusion sociale |
| **Update Frequency** | notPlanned |
| **Total Records** | 882 |
| **Formats** | DOCX, WEB, CSV |

> La Division du développement durable de la Ville de Montréal a confié à la firme Bureau d’intervieweurs professionnels (BIP Recherche) la réalisation d’un sondage auprès de la population de l’Île de Montréal portant sur l’agriculture urbaine. Dans ce contexte, l’agriculture urbaine est entendue comm

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `quest` | Quest | numeric | measure | G | 0.0% |
| 2 | `ville` | City | text | dimension | G | 0.0% |
| 3 | `codep` | Codep | identifier | exclude | G | 0.0% |
| 4 | `rta` | Rta | text | filter | G | 0.0% |
| 5 | `arron` | Borough | numeric | measure | G | 0.0% |
| 6 | `debut` | Start date | text | filter | G | 0.0% |
| 7 | `mess1` | Mess1 | numeric | dimension | G | 0.0% |
| 8 | `q1` | Q1 | numeric | dimension | G | 0.0% |
| 9 | `q2_m1` | Q2 M1 | numeric | dimension | P | 59.2% |
| 10 | `q2_m2` | Q2 M2 | numeric | exclude | E | 95.7% |
| 11 | `q2_m3` | Q2 M3 | numeric | exclude | E | 99.9% |
| 12 | `q3` | Q3 | numeric | dimension | P | 59.2% |
| 13 | `q4` | Q4 | numeric | dimension | P | 59.2% |
| 14 | `q5` | Q5 | numeric | dimension | P | 59.2% |
| 15 | `q6` | Q6 | numeric | dimension | P | 59.2% |
| 16 | `q7` | Q7 | numeric | dimension | P | 59.2% |
| 17 | `q8` | Q8 | numeric | dimension | P | 59.2% |
| 18 | `q9` | Q9 | numeric | dimension | P | 59.2% |
| 19 | `q10` | Q10 | numeric | dimension | P | 59.2% |
| 20 | `q11` | Q11 | numeric | dimension | P | 59.2% |
| 21 | `q12` | Q12 | numeric | dimension | P | 59.2% |
| 22 | `q13` | Q13 | numeric | dimension | P | 59.2% |
| 23 | `q14_m1` | Q14 M1 | numeric | measure | U | 40.8% |
| 24 | `q14_m2` | Q14 M2 | numeric | dimension | P | 83.4% |
| 25 | `q14_m3` | Q14 M3 | numeric | exclude | E | 97.7% |
| 26 | `q15` | Q15 | numeric | dimension | G | 0.0% |
| 27 | `q16` | Q16 | numeric | dimension | G | 0.0% |
| 28 | `q17` | Q17 | numeric | dimension | G | 0.0% |
| 29 | `q18` | Q18 | numeric | dimension | G | 0.0% |
| 30 | `q19` | Q19 | numeric | dimension | G | 0.0% |
| 31 | `q20` | Q20 | numeric | dimension | G | 0.0% |
| 32 | `q20a` | Q20A | numeric | dimension | U | 29.6% |
| 33 | `q21` | Q21 | numeric | dimension | G | 0.0% |
| 34 | `q22` | Q22 | numeric | dimension | G | 0.0% |
| 35 | `q23` | Q23 | numeric | dimension | G | 0.0% |
| 36 | `q24` | Q24 | numeric | dimension | G | 0.0% |
| 37 | `q25` | Q25 | numeric | dimension | G | 0.0% |
| 38 | `b1` | B1 | numeric | dimension | G | 0.0% |
| 39 | `b2` | B2 | numeric | dimension | G | 0.5% |
| 40 | `b3` | B3 | numeric | dimension | G | 0.5% |
| 41 | `b4` | B4 | numeric | dimension | G | 0.8% |
| 42 | `b5` | B5 | numeric | dimension | G | 0.3% |
| 43 | `b6` | B6 | numeric | dimension | G | 0.3% |
| 44 | `b7` | B7 | numeric | dimension | G | 0.8% |
| 45 | `b8` | B8 | numeric | dimension | G | 0.0% |
| 46 | `b9` | B9 | numeric | dimension | G | 0.0% |
| 47 | `b10` | B10 | numeric | dimension | G | 0.0% |
| 48 | `b11` | B11 | numeric | dimension | P | 59.2% |
| 49 | `pond` | Pond | numeric | dimension | G | 0.0% |

**Dimensions** (40): `ville`, `mess1`, `q1`, `q2_m1`, `q3`, `q4`, `q5`, `q6`, `q7`, `q8`, `q9`, `q10`, `q11`, `q12`, `q13`, `q14_m2`, `q15`, `q16`, `q17`, `q18`, `q19`, `q20`, `q20a`, `q21`, `q22`, `q23`, `q24`, `q25`, `b1`, `b2`, `b3`, `b4`, `b5`, `b6`, `b7`, `b8`, `b9`, `b10`, `b11`, `pond`

**Measures** (3): `quest`, `arron`, `q14_m1`

---

## Rapport sur les activités de l'inspection des aliments
### Rapport Sur Les Activits De L inspection Des food

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-inspection-aliments-bilan` |
| **Quality Grade** | **B** |
| **Report Builder** | Yes |
| **Publisher** | Service de l'environnement - Division de l'inspection des aliments |
| **Update Frequency** | monthly |
| **Total Records** | 610,414 |
| **Formats** | WEB, CSV |

> Le bilan de l'inspection des aliments de cet ensemble fait état du travail important réalisé par la Ville sur le territoire de l'agglomération de Montréal en vertu des pouvoirs qui lui sont délégués du Ministère de l'Agriculture, des Pêcheries et de l'Alimentation du Québec (MAPAQ).

L'équipe d'in

### Field Inventory

| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |
|---|----------|-----------------|------|------|---------|-------|
| 1 | `type_information` | Type Information | category | dimension | G | 0.0% |
| 2 | `description_information` | Description Information | category | dimension | G | 0.0% |
| 3 | `annee_information` | Year Information | text | filter | G | 0.0% |
| 4 | `mois_information` | Month Information | text | filter | G | 0.0% |
| 5 | `qtite_mnt_information` | Qtite Mnt Information | all_null | exclude | E | 100.0% |
| 6 | `unite_mesure_information` | Unit Mesure Information | all_null | exclude | E | 100.0% |

**Dimensions** (2): `type_information`, `description_information`

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

## Calendrier de la cuisine de rue (archives)
### Calendrier De La Cuisine De Rue Archives

| Property | Value |
|----------|-------|
| **Slug** | `vmtl-cuisine-de-rue` |
| **Quality Grade** | **F** |
| **Report Builder** | No |
| **Publisher** | Service de la concertation des arrondissements et de l'expérience citoyenne |
| **Update Frequency** | continuous |
| **Total Records** | 0 |
| **Formats** | XLSX, JSON |

> Le calendrier de cuisine de rue présente la rotation quotidienne des camions de cuisine de rue en fonction des sites.

**Warnings:**
- No DataStore resource (API not available)

---
