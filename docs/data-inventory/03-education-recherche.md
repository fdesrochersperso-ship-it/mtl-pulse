# 03. Éducation et recherche
# Education and Research

> **Nombre de datasets**: 2
> **Catégorie portail**: `education-recherche`
> **Généré le**: 2026-03-09 15:37

---

## Table des matières

1. [Les édifices patrimoniaux de Montréal](#vmtl-les-edifices-patrimoniaux-de-montreal)
2. [Patrimoine architectural de l'arrondissement Outremont - Fiches d'immeubles de l'inventaire Bisson](#vmtl-patrimoine-architectural-outremont-fiches-immeubles-inventaire-bisson)

---

## Statistiques de la catégorie

| Métrique | Valeur |
|----------|--------|
| Datasets | 2 |
| Ressources totales | 4 |
| Ressources DataStore (requêtables via API) | 4 |
| Enregistrements totaux (DataStore) | 10,170 |

---

### Les édifices patrimoniaux de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-les-edifices-patrimoniaux-de-montreal` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-les-edifices-patrimoniaux-de-montreal` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Architecture, Patrimoine, SUM, Édifice historique |

**Description**: Liste des édifices qui figurent dans le Site Web du Vieux-Montréal et du Grand répertoire du patrimoine bâti de Montréal. Elle contient des informations générales sur ce qui constitue une « valeur patrimoniale » ainsi que sur la gestion du patrimoine bâti par une synthèse des connaissances actuelles sur ce patrimoine.

**Formats disponibles**: CSV

#### Ressource: Édifices patrimoniaux (CSV)

- **Resource ID**: `a89dd7ad-ebb1-4d1e-97d5-e14724e50447`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,336
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `IDENTIFIANT_BATIMENT` | text | 🟢 | `0039-27-6787-00`, `0039-27-4599-00`, `0039-27-5992-00` |
| 2 | `NOM_HISTORIQUE` | text | 🟢 | `Magasin-entrepôt Dominion Block II`, `Maisons-magasins Jacob-De Witt  I`, `Magasin-entrepôt Dominion Block I` |
| 3 | `TYPOLOGIE_SPECIFIQUE` | text | 🟡 | `magasin-entrepôt`, `maison-magasin` |
| 4 | `CIVIQUE_MIN` | text | 🟢 | `404`, `412`, `400` |
| 5 | `CIVIQUE` | text | 🟢 | `400`, `404`, `412-414` |
| 6 | `TYPE_DE_VOIE` | text | 🟢 | `rue` |
| 7 | `CIVIQUE_MAX` | text | 🟢 | `414`, `404`, `400` |
| 8 | `LIEN` | text | 🔴 | _vide_ |
| 9 | `VOIE` | text | 🟢 | `McGill` |
| 10 | `EST_OUEST` | text | 🟠 | _vide_ |
| 11 | `ARRONDISSEMENT` | text | 🟢 | `Ville-Marie (Montréal)` |
| 12 | `HISTORIQUE_SOMMAIRE` | text | 🟠 | `L'homme d'affaires et banquier Jacob ...`, `NULL` |
| 13 | `DEBUT_DES_TRAVAUX` | text | 🟢 | `1850`, `1846`, `1866` |
| 14 | `FIN_DES_TRAVAUX` | text | 🟡 | `1851`, `1867` |
| 15 | `CENTRO_X` | text | 🟢 | `-73.5575`, `-73.5579`, `-73.5577` |
| 16 | `CENTRO_Y` | text | 🟢 | `45.5007`, `45.5001`, `45.5` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `LIEN`: 81.8% null
- `EST_OUEST`: 58.8% null
- `HISTORIQUE_SOMMAIRE`: 57.8% null

#### Ressource: Liste iconographique (CSV)

- **Resource ID**: `66848b99-e8dd-45f1-ae0e-cb63a62f551a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 7,194
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `IDENTIFIANT_ICONOGRAPHIE` | text | 🟢 | `2209`, `2208`, `881` |
| 2 | `IDENTIFIANT_BATIMENT` | text | 🟢 | `0037-11-2379-01` |
| 3 | `URL` | text | 🟢 | `http://depot.ville.montreal.qc.ca/pat...`, `http://depot.ville.montreal.qc.ca/pat...`, `http://depot.ville.montreal.qc.ca/pat...` |
| 4 | `CREATEUR` | text | 🟡 | `Denis Tremblay`, `inconnu` |
| 5 | `COPYRIGHT` | text | 🟢 | `Musée des sciences et technologies, C...`, `Bibliothèque et Archives nationales d...`, `©Denis Tremblay, 2010.` |
| 6 | `ANNEE` | text | 🟢 | `1946`, `1910`, `2010` |
| 7 | `LEGENDE` | text | 🟡 | `Vue du quai King-Edward, vers 1910,  ...`, `Vue aérienne des quais Alexandra, à g...`, `Entrée principale de la succursale, à...` |

#### Ressource: Intérêt et protection patrimoniale (CSV)

- **Resource ID**: `ee71bb1e-bbe2-4b52-af11-2590b2f88ce8`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 969
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `IDENTIFIANT_BATIMENT` | text | 🟢 | `9942-45-9090-01`, `9943-53-3063-01`, `9842-63-8186-01` |
| 2 | `NIDENTIFIANT_BATIMENT` | text | 🟢 | `593`, `592`, `594` |
| 3 | `DATE_EVENEMENT` | text | 🟢 | `1989-02-02`, `2000-01-01` |
| 4 | `NOM_OBJET` | text | 🟠 | `Fusilliers Mont-Royal`, `École primaire Louis-Hippolyte-La Fon...`, `École Primaire Supérieure` |
| 5 | `PROTECTION_LEGALE` | text | 🟢 | `Monument historique cité`, `Immeuble de valeur patrimoniale excep...` |
| 6 | `LOI_REGLEMENT` | text | 🟢 | `Loi sur les biens culturels`, `Plan d'urbanisme` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `NOM_OBJET`: 60.1% null

---

### Patrimoine architectural de l'arrondissement Outremont - Fiches d'immeubles de l'inventaire Bisson

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-patrimoine-architectural-outremont-fiches-immeubles-inventaire-bisson` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-patrimoine-architectural-outremont-fiches-immeubles-inventaire-bisson` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Architecture, Archives, Outremont, Patrimoine, Pierre-Richard Bisson, SUM, Urbanimse |

**Description**: Ce jeu de données présente la localisation des immeubles repérés de Catégorie 1 et 2 ( bâtiments remarquables, bâtiments intéressants) dans l'inventaire du patrimoine d'Outremont réalisé par Pierre-Richard Bisson en 1992. Les fiches associées y sont accessibles au format PDF lorsqu'elles sont disponibles.
Les immeubles de catégorie 1 (bâtiments remarquables) sont associés à des fiches détaillées et les immeubles de Catégorie 2 (bâtiments intéressants) sont associés à des fiches courtes. Les fiches sont repérables dans l'outil cartographique en indiquant LAT comme données pour la latitude et LNG en données pour la longitude.

Les données de ces fiches correspondent à l'état des connaissances au moment de la réalisation de l'inventaire et n'ont pas été actualisées depuis. 

Cette ressource est le fruit d'une collaboration entre l'arrondissement d'Outremont, le service de la Planification stratégique et de la performance organisationnelle, et de la section des Inventaires de la divis

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV

#### Ressource: Liste des immeubles des catégories 1 et 2 de l'inventaire Bisson d'Outremont (CSV)

- **Resource ID**: `ee45226b-dcae-4f0e-bf89-3cec582ebd70`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 671
- **Nombre de champs**: 23

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_FICHE` | text | 🟢 | `1_002`, `1_001`, `1_012` |
| 2 | `CAT_BISSON` | text | 🟢 | `1` |
| 3 | `TYPE_CAT_BISSON` | text | 🟢 | `Bâtiment remarquable` |
| 4 | `LIEN_FTP` | text | 🟢 | `https://depot.ville.montreal.qc.ca/pa...`, `https://depot.ville.montreal.qc.ca/pa...`, `https://depot.ville.montreal.qc.ca/pa...` |
| 5 | `CIV_DE` | text | 🟢 | `1100`, `7`, `18` |
| 6 | `CIV_A` | text | 🟢 | `18`, `7`, `1144` |
| 7 | `TYPE_VOIE` | text | 🟢 | `avenue` |
| 8 | `LIEN_VOIE` | text | 🔴 | _vide_ |
| 9 | `NOM_VOIE` | text | 🟢 | `Ainslie`, `Bernard` |
| 10 | `ORIENT_VOIE` | text | 🔴 | _vide_ |
| 11 | `ADRESSE` | text | 🟢 | `1100-1144 avenue Bernard`, `18-18 avenue Ainslie`, `7-7 avenue Ainslie` |
| 12 | `NOTE` | text | 🔴 | _vide_ |
| 13 | `DEMOLI` | text | 🟢 | `Non` |
| 14 | `NOM_INDICATIF` | text | 🔴 | `maison J.-B.-Beaudry-Leman`, `maison Édouard-Ouellette`, `appartements Royal York` |
| 15 | `STATUT_INV_PRE_40_2025` | text | 🟢 | `Retenu Inventaire pre 1940` |
| 16 | `ID_IMM_INV` | text | 🟢 | `i663-OUT-3027755`, `i663-OUT-3031346`, `i663-OUT-3031356-001` |
| 17 | `ID_UEV` | text | 🟢 | `3034309`, `3030156`, `3034299` |
| 18 | `NUM_UEV` | text | 🟢 | `277750`, `277755`, `162702` |
| 19 | `MATRICULE_83` | text | 🟢 | `9541-95-1516-8-000-0000`, `9541-95-8444-6-000-0000`, `9642-43-2081-8-001-0020` |
| 20 | `X` | text | 🟢 | `296420.2807787741`, `295981.1421155482`, `295912.9784914519` |
| 21 | `Y` | text | 🟢 | `5041541.883752364`, `5042380.92644095`, `5041525.604780755` |
| 22 | `LNG` | text | 🟢 | `-73.6128723720578`, `-73.6072662`, `-73.6137445` |
| 23 | `LAT` | text | 🟢 | `45.51374085`, `45.5212963`, `45.5135935` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `ORIENT_VOIE`: 100.0% null
- `LIEN_VOIE`: 83.0% null
- `NOTE`: 82.9% null
- `NOM_INDICATIF`: 75.4% null

---
