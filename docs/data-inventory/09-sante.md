# 09. Santé
# Health

> **Nombre de datasets**: 6
> **Catégorie portail**: `sante`
> **Généré le**: 2026-03-09 15:37

---

## Table des matières

1. [Avis de détérioration](#vmtl-avis-deterioration)
2. [Contrevenants condamnés - salubrité, entretien et sécurité des logements](#vmtl-liste-central-condamnations-salubrite-logements)
3. [Déclarations des exterminations de punaises de lit par des gestionnaires de parasites](#vmtl-declarations-exterminations-punaises-de-lit)
4. [Indicateur de priorité d'inspection de 2018](#vmtl-indicateur-priorite-inspection)
5. [Inspections de salubrité du Service de l'habitation](#vmtl-inspections-salubrite)
6. [Inspections préventives en salubrité du Service de l'habitation](#vmtl-inspections-preventives-salubrite-service-habitation)

---

## Statistiques de la catégorie

| Métrique | Valeur |
|----------|--------|
| Datasets | 6 |
| Ressources totales | 15 |
| Ressources DataStore (requêtables via API) | 7 |
| Enregistrements totaux (DataStore) | 127,464 |

---

### Avis de détérioration

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-avis-deterioration` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-avis-deterioration` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Avis, Détérioration, Habitation, SH, SUM, Salubrité |

**Description**: L’avis de détérioration permet de rattacher des infractions au _Règlement 23-016 sur l'occupation et l'entretien des bâtiments_ à des bâtiments précis par le biais d'une inscription au registre foncier du Québec. Il sert à empêcher qu'un propriétaire n'évite des sanctions en vendant son immeuble à une société apparentée ou à un autre acheteur. Ce pouvoir est utilisé dans le cas de bâtiments sujets à une détérioration susceptible de porter atteinte à la santé ou à la sécurité des occupants, et dont le propriétaire n’effectue pas les travaux de réfection, de réparation ou d'entretien exigés dans les délais prescrits. Un avis de régularisation est émis lorsque toutes les infractions rattachées au bâtiment sont corrigées et a comme effet le retrait de l'avis de détérioration.

**Formats disponibles**: CSV

#### Ressource: Avis de détérioration (CSV)

- **Resource ID**: `a64d54b0-6c20-4d5d-a9b8-3593170e2a9e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 38
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `identifiant` | text | 🟢 | `AD_2511_2517_rue_de_Chateauguay_SO`, `AD_6914_rue_Hutchison_VSMPE`, `AD_4651_4657_rue_St_Andre_PMR` |
| 2 | `adresse` | text | 🟢 | `2511-2517, rue de Châteauguay`, `4651-4657, rue St-André`, `6914, rue Hutchison` |
| 3 | `numero_lot` | text | 🟢 | `1380977`, `2249754`, `1444888` |
| 4 | `arrondissement` | text | 🟢 | `Le Plateau–Mont-Royal`, `Le Sud-Ouest`, `Villeray–Saint-Michel–Parc-Extension` |
| 5 | `date_inscription` | text | 🟢 | `4/15/2019`, `12/7/2012`, `9/11/2014` |
| 6 | `nom_proprio` | text | 🟢 | `3971147 Canada inc.`, `Stevens Coulombe`, `Rikva Sebag` |
| 7 | `nombre_logement` | text | 🟢 | `7`, `3`, `8` |
| 8 | `lien_avis` | text | 🟢 | `https://depot.ville.montreal.qc.ca/av...`, `https://depot.ville.montreal.qc.ca/av...`, `https://depot.ville.montreal.qc.ca/av...` |

---

### Contrevenants condamnés - salubrité, entretien et sécurité des logements

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-liste-central-condamnations-salubrite-logements` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-liste-central-condamnations-salubrite-logements` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Amende, Condamnation, Habitation, Logement, SH, Salubrité |

**Description**: Cet ensemble de données présente la liste des contrevenants condamnés pour des infractions au Règlement sur la salubrité, l'entretien et la sécurité des logements (RVM 03-096), suite à des constats d’infraction émis par la Division de la salubrité du Service de l’habitation.

À noter que les condamnations émises par les arrondissements en vertu du même règlement ne font pas partie de cet ensemble.

Les [inspections en salubrité](/ville-de-montreal/inspections-salubrite) du Service de l'habitation sont également  disponibles en données ouvertes.

Pour tout autre détail sur la salubrité des logements, veuillez consulter la page [Salubrité, entretien et sécurité des logements](https://montreal.ca/sujets/salubrite-entretien-et-securite-des-logements) sur le site de la Ville de Montréal.

**Formats disponibles**: CSV

#### Ressource: Liste des contrevenants condamnés (CSV)

- **Resource ID**: `f270cb02-ca30-4b3b-96eb-f0dbdbc50ea7`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 321
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `lieu_infraction_no_civique` | text | 🟢 | `2094`, `3290` |
| 2 | `lieu_infraction_rue` | text | 🟢 | `Goyer`, `Place Beaudet` |
| 3 | `code_arrondissement` | text | 🟢 | `ST`, `CN` |
| 4 | `nom_contrevenant` | text | 🟢 | `Immeuble 3290 Goyer Inc.`, `Michael A. Pires` |
| 5 | `article` | text | 🟢 | `23 al. 1`, `23 al. 2`, `25 al. 2 par. 9` |
| 6 | `nature_infraction` | text | 🟢 | `En ayant des rongeurs (souris) dans u...`, `Étant propriétaire d'un bâtiment, en ...`, `En ayant une partie du bâtiment évacu...` |
| 7 | `date_infraction` | text | 🟢 | `Entre le 17-05-2017 et le 20-06-2017`, `Entre le 17-05-2017 et le 14-06-2017`, `2017-02-15` |
| 8 | `date_jugement` | text | 🟢 | `2018-04-05` |
| 9 | `amende_imposee` | text | 🟢 | `1 500,00 $`, `1 350,00 $` |

---

### Déclarations des exterminations de punaises de lit par des gestionnaires de parasites

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-declarations-exterminations-punaises-de-lit` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-declarations-exterminations-punaises-de-lit` |
| **Fréquence de mise à jour** | quarterly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Exterminateur, Extermination, Gestionnaire parasitaire, Punaise de lit, SH, Traitement antiparasitaire |

**Description**: Déclarations des gestionnaires de parasites. Les formulaires de déclaration ont été soumis depuis le 5 juillet 2011. Les données ont un faible degré de fiabilité car elles sont consignées manuellement par des tiers, soit les gestionnaires de parasites et *ne font l'objet d'aucune validation de la part de la Ville de Montréal*.

**Formats disponibles**: CSV, GEOJSON, WEB, ZIP

#### Ressource: Déclarations exterminations punaises de lit. (CSV)

- **Resource ID**: `ba28703e-ce85-4293-8a37-88932bf4ae93`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 52,193
- **Nombre de champs**: 13

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `NO_DECLARATION` | text | 🟢 | `4254`, `4281`, `18113` |
| 2 | `DATE_DECLARATION` | text | 🟢 | `2012-10-28T16:36:04`, `2015-07-28T08:54:49`, `2012-10-31T13:00:57` |
| 3 | `DATE_INSP_VISPRE` | text | 🟢 | `2012-09-21`, `2015-07-27`, `2012-10-26` |
| 4 | `NBR_EXTERMIN` | text | 🟡 | `1` |
| 5 | `DATE_DEBUTTRAIT` | text | 🟡 | `2012-09-21`, `2012-10-30`, `2015-07-27` |
| 6 | `DATE_FINTRAIT` | text | 🟡 | `2012-09-21`, `2012-10-30`, `2015-07-27` |
| 7 | `No_QR` | text | 🟢 | `24` |
| 8 | `NOM_QR` | text | 🟢 | `Beaurivage` |
| 9 | `NOM_ARROND` | text | 🟢 | `Mercier–Hochelaga-Maisonneuve` |
| 10 | `COORD_X` | text | 🟢 | `303753.6`, `303710.5`, `303898.4` |
| 11 | `COORD_Y` | text | 🟢 | `5050625.3`, `5050219.4`, `5049835.7` |
| 12 | `LONGITUDE` | text | 🟢 | `-73.513965`, `-73.513411`, `-73.511556` |
| 13 | `LATITUDE` | text | 🟢 | `45.595531`, `45.591879`, `45.588426` |

#### Ressource: Nombre de logements traités par quartier de référence (CSV)

- **Resource ID**: `81a05c27-2563-4cf5-9c40-ffcc053e05de`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,117
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `No_QR` | text | 🟢 | `01` |
| 2 | `NOM_QR` | text | 🟢 | `Cartierville` |
| 3 | `AnneeDeclaration` | text | 🟢 | `2011`, `2013`, `2012` |
| 4 | `NBR_LOGTRAITE` | text | 🟢 | `361`, `101`, `54` |
| 5 | `Pct_LogTraite_QR` | text | 🟢 | `0.00507137490608565`, `0.00948534936138242`, `0.033903080390683696` |
| 6 | `NOM_ARROND` | text | 🟢 | `Ahuntsic-Cartierville` |

---

### Indicateur de priorité d'inspection de 2018

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-indicateur-priorite-inspection` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-indicateur-priorite-inspection` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Habitation, Inspection, Logement, SH, Salubrité |

**Description**: Cet ensemble résulte d'analyses statistiques réalisées par le Service de l'habitation de la Ville de Montréal. L’indicateur de priorité d'inspection vise à identifier les adresses les plus susceptibles de présenter des enjeux de salubrité afin de les faire inspecter par son équipe d’inspecteurs.

**Formats disponibles**: CSV

#### Ressource: Indicateur de priorité d'inspection par localisation 2018 (CSV)

- **Resource ID**: `556db0d0-ba81-4937-9361-0288ef211e2a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 69,408
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `arrondissement` | text | 🟢 | `Ville-Marie` |
| 3 | `nblog_batiment` | text | 🟢 | `3 à 5 logements`, `6 à 11 logements`, `12 à 99 logements` |
| 4 | `requetes311_logement_2013_2017` | decimal | 🟢 | `0`, `2` |
| 5 | `priorite_inspection` | text | 🟢 | `Priorité faible`, `Inspection non prévue` |
| 6 | `longitude` | decimal | 🟢 | `-73.5537972595153`, `-73.5654688940742`, `-73.5636493396932` |
| 7 | `latitude` | decimal | 🟢 | `45.5047316183623`, `45.5017085313899`, `45.5042704193879` |
| 8 | `X` | decimal | 🟢 | `300595.857999934`, `299683.976505177`, `299826.204993124` |
| 9 | `Y` | decimal | 🟢 | `5040536.4557856`, `5040199.93578586`, `5040485.31678344` |

---

### Inspections de salubrité du Service de l'habitation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-inspections-salubrite` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-inspections-salubrite` |
| **Fréquence de mise à jour** | quarterly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Habitation, Inspection, Logement, SH, Salubrité |

**Description**: Cet ensemble de données contient des informations sur les inspections effectuées par la Division de la salubrité du Service de l’habitation (anciennement le Service de la mise en valeur du territoire).

La Ville de Montréal, par son [Règlement sur la salubrité, l’entretien et la sécurité des logements (R.V.M. 03-096)](https://montreal.ca/reglements-municipaux/recherche/60d7656afd6531443f578d96), veille à assurer la salubrité, le bon entretien et la sécurité des logements et des bâtiments résidentiels sur son territoire. 

Par salubrité, on entend l’ensemble des conditions rendant un logement propre à l’habitation.

Pour en savoir plus sur les efforts déployés par la Ville de Montréal en matière de salubrité des logements, consultez le [Plan d’action pour des conditions de logement décentes 2018-2021](https://montreal.ca/sujets/salubrite-entretien-et-securite-des-logements).

**Note:** Le présent ensemble concerne uniquement les inspections effectuées par la Division de la salub

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, GEOJSON, WEB, ZIP

#### Ressource: Inspections en salubrité (CSV)

- **Resource ID**: `ed5bae4e-9136-4218-a82c-1e3d18bd056e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,453
- **Nombre de champs**: 14

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `no_demande` | text | 🟢 | `3000911800`, `3000127288`, `3000127500` |
| 2 | `arrondissement` | text | 🟢 | `Rosemont - La Petite-Patrie` |
| 3 | `date_premiere_inspection` | text | 🟢 | `2008-11`, `2008-12`, `2014-12` |
| 4 | `statut_demande` | text | 🟢 | `Fermée` |
| 5 | `nb_unite_logement` | text | 🔴 | _vide_ |
| 6 | `nb_logements_non_conformes` | text | 🟢 | `45`, `1`, `16` |
| 7 | `nb_non_conformite` | text | 🟢 | `69`, `4`, `187` |
| 8 | `taux_correction` | text | 🔴 | _vide_ |
| 9 | `quartier_de_reference_num` | text | 🟢 | `18` |
| 10 | `quartier_de_reference_nom` | text | 🟢 | `Vieux-Rosemont` |
| 11 | `x` | text | 🟢 | `298925.4179999007`, `298515.5569998949`, `298543.853889894` |
| 12 | `y` | text | 🟢 | `5045014.468785744`, `5045078.667060749`, `5045293.593785738` |
| 13 | `longitude` | text | 🟢 | `-73.5804790394`, `-73.5752336843526`, `-73.5801174882868` |
| 14 | `latitude` | text | 🟢 | `45.545015934829195`, `45.547531177580794`, `45.5455938683896` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `taux_correction`: 85.6% null
- `nb_unite_logement`: 82.4% null

---

### Inspections préventives en salubrité du Service de l'habitation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-inspections-preventives-salubrite-service-habitation` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-inspections-preventives-salubrite-service-habitation` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Habitation, Inspection, Logement, SH, Salubrité |

**Description**: Les données représentent le résultat des inspections préventives effectuées par le Service de l'habitation. Les données incluent : l'état physique des parties inspectées du bâtiment sur une échelle de 1 (excellent) à 6 (très mauvais), le transfert ou non du bâtiment pour une inspection complète et la signification ou non d'un constat d'infraction sans préavis. La période du 1er janvier au 1er juin 2024 a servi de projet pilote au cours duquel plusieurs processus ont été testés et optimisés.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Inspections préventives de salubrité du Service de l'habitation (CSV)

- **Resource ID**: `760cda5d-5c58-4899-8bff-e8119edd6ab3`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,934
- **Nombre de champs**: 21

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `no_demande` | text | 🟢 | `3003445134`, `3003445037`, `3003445095` |
| 2 | `date_inspection` | text | 🟢 | `2024-08-23`, `2024-07-29` |
| 3 | `fondation` | text | 🟡 | `3`, `2` |
| 4 | `structure` | text | 🔴 | _vide_ |
| 5 | `enveloppe` | text | 🟢 | `3`, `2` |
| 6 | `ouvertures` | text | 🟢 | `3`, `2` |
| 7 | `saillies` | text | 🟢 | `4`, `3`, `2` |
| 8 | `interieur` | text | 🟡 | `2` |
| 9 | `moy_composants_inspectes` | text | 🟢 | `2.2`, `2.4`, `3` |
| 10 | `constat_signifie` | text | 🟢 | `non` |
| 11 | `indicateur_insp_integrale` | text | 🟢 | `oui`, `non` |
| 12 | `adresse` | text | 🟢 | `11940 av. Allard`, `11960 av. Allard`, `11935 av. Allard` |
| 13 | `arrondissement` | text | 🟢 | `Montréal-Nord` |
| 14 | `nombre_unite_logement` | text | 🟢 | `8` |
| 15 | `statut_dem` | text | 🟢 | `FR` |
| 16 | `code_type_demande` | text | 🟢 | `PX` |
| 17 | `no_ident_uev` | text | 🟢 | `02088800`, `02088810`, `02088802` |
| 18 | `longitude` | text | 🟢 | `-73.61525211595102`, `-73.61551817367464`, `-73.61476106277736` |
| 19 | `latitude` | text | 🟢 | `45.61866054128743`, `45.61840888856545`, `45.61867445903247` |
| 20 | `X` | text | 🟢 | `295791.20878227`, `295811.9173321826`, `295850.2549858009` |
| 21 | `Y` | text | 🟢 | `5053202.083865516`, `5053203.545781476`, `5053174.0871437015` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `structure`: 85.5% null

---
