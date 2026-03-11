# MTL Pulse — Data Harvest Kit
## Instructions pour Claude Code

### Ce que ça fait

Deux scripts Python qui inventorient **l'intégralité** du portail de données ouvertes de Montréal :

1. **`01_harvest_all_datasets.py`** — Appelle l'API CKAN pour extraire :
   - Les métadonnées de chaque dataset (titre, description, méthodologie, fréquence, tags)
   - Les schémas de champs (nom, type) pour chaque ressource DataStore
   - 5 rangées d'exemple par ressource
   - Les stats de qualité (% de nulls par colonne)
   - Sauvegarde tout en JSON structuré

2. **`02_generate_markdown.py`** — Transforme le JSON en docs Markdown lisibles :
   - Un fichier par catégorie (12 catégories + extras)
   - Un index maître (00-INDEX.md)
   - Tables de champs avec types, qualité, exemples

### Output attendu

```
docs/data-inventory/
├── 00-INDEX.md                              ← Index maître
├── 01-agriculture-alimentation.md           ← 1 fichier par catégorie
├── 02-economie-entreprises.md
├── ...
├── 12-transport.md
├── raw/
│   ├── _harvest_summary.json                ← Stats du harvest
│   ├── _all_datasets.json                   ← Liste de tous les slugs
│   ├── _checkpoint.json                     ← Pour resume si crash
│   ├── by-category/*.json                   ← JSON brut par catégorie
│   └── datasets/*.json                      ← JSON brut par dataset (396 fichiers)
```

### Comment exécuter

#### Prompt pour Claude Code :

```
Copie les fichiers du harvest kit dans le projet MTL Pulse et exécute-les. 
Voici les étapes :

1. Copie 01_harvest_all_datasets.py et 02_generate_markdown.py dans le 
   dossier scripts/ du projet

2. Exécute le harvest :
   cd /path/to/mtl-pulse
   python scripts/01_harvest_all_datasets.py

   Ça va prendre 15-30 minutes (396 datasets × ~3 API calls chacun avec 
   0.5s de délai). Le script a un système de checkpoint — si ça crash, 
   relance avec --resume.

3. Une fois le harvest terminé, génère les Markdown :
   python scripts/02_generate_markdown.py

4. Vérifie le résultat :
   - Ouvre docs/data-inventory/00-INDEX.md
   - Confirme que les 12 catégories sont présentes
   - Vérifie que les schémas de champs apparaissent dans quelques fichiers

5. Commit le tout :
   git add docs/data-inventory/
   git commit -m "feat: complete open data inventory (396 datasets, all field schemas)"
```

#### Si tu veux exécuter manuellement :

```bash
cd mtl-pulse
python scripts/01_harvest_all_datasets.py        # ~20 min
python scripts/02_generate_markdown.py            # ~10 sec
```

### Durée et coûts

- **Runtime** : ~20-30 minutes pour le harvest (limité par le délai respectueux de 0.5s entre appels API)
- **Appels API** : ~1,200 calls (396 datasets × ~3 calls par dataset)
- **Coût** : $0 (API CKAN publique, pas d'auth, pas de rate limit documenté)
- **Tokens Claude** : 0 pour le harvest (c'est du Python pur). Les tokens sont pour l'étape suivante (semantic layer).

### Ce qui vient après le harvest

1. **Semantic Layer** — Claude analyse les JSON et produit le dictionnaire bilingue des champs
2. **Quality Audit** — Script qui sample 1000 rows par dataset et calcule les distributions
3. **Report Builder Schema** — Les champs nettoyés deviennent les options dans l'UI

### Notes techniques

- Le script utilise uniquement `urllib` (pas de `requests`) → zéro dépendance à installer
- Gère les erreurs HTTP 429/404/timeout avec retry exponentiel
- Checkpoint toutes les 10 datasets → `--resume` pour reprendre après un crash
- Respecte le portail : User-Agent identifié, 0.5s entre chaque requête
- UTF-8 throughout (accents français)
