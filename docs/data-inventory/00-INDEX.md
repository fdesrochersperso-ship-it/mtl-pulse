# MTL Pulse — Inventaire complet des données ouvertes de Montréal
# Complete Montreal Open Data Inventory

> **Généré le**: 2026-03-09 15:37
> **Source**: API CKAN de donneesquebec.ca

Ce dossier contient l'inventaire complet de tous les datasets du portail
de données ouvertes de Montréal, avec les schémas de champs, types de données,
statistiques de qualité, et exemples de valeurs pour chaque ressource DataStore.

---

## Catégories

| # | Catégorie | Datasets | Fichier |
|---|-----------|----------|---------|
| 01 | Agriculture et alimentation | 6 | [01-agriculture-alimentation.md](01-agriculture-alimentation.md) |
| 02 | Économie et entreprises | 9 | [02-economie-entreprises.md](02-economie-entreprises.md) |
| 03 | Éducation et recherche | 2 | [03-education-recherche.md](03-education-recherche.md) |
| 04 | Environnement, ressources naturelles et énergie | 87 | [04-environnement-ressources-naturelles-energie.md](04-environnement-ressources-naturelles-energie.md) |
| 05 | Gouvernement et finances | 115 | [05-gouvernement-finances.md](05-gouvernement-finances.md) |
| 06 | Infrastructures | 95 | [06-infrastructures.md](06-infrastructures.md) |
| 07 | Loi, justice et sécurité publique | 22 | [07-loi-justice-securite-publique.md](07-loi-justice-securite-publique.md) |
| 08 | Politiques sociales | 16 | [08-politiques-sociales.md](08-politiques-sociales.md) |
| 09 | Santé | 6 | [09-sante.md](09-sante.md) |
| 10 | Société et culture | 29 | [10-societe-culture.md](10-societe-culture.md) |
| 11 | Tourisme, sports et loisirs | 20 | [11-tourisme-sports-loisirs.md](11-tourisme-sports-loisirs.md) |
| 12 | Transport | 43 | [12-transport.md](12-transport.md) |
| 13 | uncategorized | 20 | [13-uncategorized.md](13-uncategorized.md) |
| | **TOTAL** | **470** | |

---

## Légende qualité des champs

| Indicateur | Signification |
|------------|---------------|
| 🟢 | >95% des valeurs présentes — fiable |
| 🟡 | 70-95% présentes — utilisable avec prudence |
| 🟠 | 30-70% présentes — données partielles |
| 🔴 | <30% présentes — très incomplet |
| ⚪ | Qualité inconnue (pas de stats disponibles) |

## Comment utiliser ces données

### Via l'API CKAN (recommandé)
```
# Chercher dans un dataset (remplacer RESOURCE_ID)
curl "https://data.montreal.ca/api/3/action/datastore_search?resource_id=RESOURCE_ID&limit=10"

# Requête SQL (filtrage par date, agrégation, etc.)
curl "https://data.montreal.ca/api/3/action/datastore_search_sql?sql=SELECT * FROM \"RESOURCE_ID\" WHERE \"DATE\" >= '2025-01-01' LIMIT 100"
```

### Structure des fichiers
```
docs/data-inventory/
├── 00-INDEX.md                              ← ce fichier
├── 01-agriculture-alimentation.md           ← doc Markdown par catégorie
├── 02-economie-entreprises.md
├── ...
├── raw/
│   ├── _harvest_summary.json                ← résumé du harvest
│   ├── _all_datasets.json                   ← liste de tous les slugs
│   ├── by-category/                         ← JSON brut par catégorie
│   │   ├── agriculture-et-alimentation.json
│   │   └── ...
│   └── datasets/                            ← JSON brut par dataset
│       ├── actes-criminels.json
│       └── ...
```
