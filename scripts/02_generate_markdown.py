#!/usr/bin/env python3
"""
MTL Pulse — Generate Markdown Reference Docs
=============================================
Pass 2: Reads the harvested JSON and generates human-readable Markdown
files per category, plus a master index.

Produces:
  docs/data-inventory/
    00-INDEX.md                    — Master index of all 396 datasets
    01-agriculture-alimentation.md — Category docs with field schemas
    02-economie-entreprises.md
    ...
    12-transport.md
    13-uncategorized.md

Usage:
    python 02_generate_markdown.py
"""

import json
import os
from pathlib import Path
from datetime import datetime

RAW_DIR = Path("docs/data-inventory/raw")
OUTPUT_DIR = Path("docs/data-inventory")
CATEGORIES_DIR = RAW_DIR / "by-category"

# Ordered list matching the portal layout
CATEGORY_ORDER = [
    ("agriculture-alimentation", "01", "Agriculture et alimentation", "Agriculture and Food"),
    ("economie-entreprises", "02", "Économie et entreprises", "Economy and Business"),
    ("education-recherche", "03", "Éducation et recherche", "Education and Research"),
    ("environnement-ressources-naturelles-energie", "04", "Environnement, ressources naturelles et énergie", "Environment, Natural Resources and Energy"),
    ("gouvernement-finances", "05", "Gouvernement et finances", "Government and Finance"),
    ("infrastructures", "06", "Infrastructures", "Infrastructure"),
    ("loi-justice-securite-publique", "07", "Loi, justice et sécurité publique", "Law, Justice and Public Safety"),
    ("politiques-sociales", "08", "Politiques sociales", "Social Policy"),
    ("sante", "09", "Santé", "Health"),
    ("societe-culture", "10", "Société et culture", "Society and Culture"),
    ("tourisme-sports-loisirs", "11", "Tourisme, sports et loisirs", "Tourism, Sports and Recreation"),
    ("transport", "12", "Transport", "Transport"),
]

# CKAN type to human-readable type
TYPE_MAP = {
    "text": "text",
    "int": "integer",
    "int4": "integer",
    "int8": "integer",
    "float": "decimal",
    "float4": "decimal",
    "float8": "decimal",
    "numeric": "decimal",
    "bool": "boolean",
    "date": "date",
    "timestamp": "datetime",
    "timestamptz": "datetime",
    "json": "json",
    "jsonb": "json",
    "geometry": "geometry",
}


def quality_indicator(stats, field_id):
    """Return a quality emoji based on null percentage."""
    if not stats or field_id not in stats:
        return "⚪"  # unknown
    pct = stats[field_id].get("populated_pct", 0)
    if pct >= 95:
        return "🟢"
    elif pct >= 70:
        return "🟡"
    elif pct >= 30:
        return "🟠"
    else:
        return "🔴"


def format_number(n):
    """Format large numbers with separators."""
    if n is None:
        return "?"
    if isinstance(n, str):
        try:
            n = int(n)
        except ValueError:
            return n
    return f"{n:,}"


def truncate(s, max_len=80):
    """Truncate a string for display."""
    if not s:
        return ""
    s = str(s).replace("\n", " ").replace("\r", " ").strip()
    if len(s) > max_len:
        return s[:max_len-3] + "..."
    return s


def sample_values(records, field_id, max_values=5):
    """Extract unique sample values for a field from sample records."""
    values = set()
    for r in records:
        v = r.get(field_id)
        if v is not None and str(v).strip():
            values.add(str(v).strip())
        if len(values) >= max_values:
            break
    return list(values)[:max_values]


def generate_dataset_section(dataset):
    """Generate Markdown for a single dataset."""
    lines = []
    
    slug = dataset["slug"]
    title = dataset.get("title", slug)
    notes = dataset.get("notes", "").strip()
    freq = dataset.get("update_frequency", "Non spécifié")
    org = dataset.get("organization_title", "")
    license_title = dataset.get("license_title", "")
    tags = dataset.get("tags", [])
    
    # Dataset header
    lines.append(f"### {title}")
    lines.append("")
    lines.append(f"| Propriété | Valeur |")
    lines.append(f"|-----------|--------|")
    lines.append(f"| **Slug** | `{slug}` |")
    lines.append(f"| **Organisation** | {org} |")
    lines.append(f"| **URL portail** | `donnees.montreal.ca/dataset/{slug}` |")
    lines.append(f"| **Fréquence de mise à jour** | {freq or 'Non spécifié'} |")
    lines.append(f"| **Licence** | {license_title or 'CC-BY 4.0'} |")
    
    if tags:
        lines.append(f"| **Tags** | {', '.join(tags[:10])} |")
    
    temporal_from = dataset.get("temporal_coverage_from", "")
    temporal_to = dataset.get("temporal_coverage_to", "")
    if temporal_from or temporal_to:
        lines.append(f"| **Couverture temporelle** | {temporal_from} → {temporal_to or 'présent'} |")
    
    lines.append("")
    
    # Description / methodology
    if notes:
        # Truncate very long descriptions
        if len(notes) > 1000:
            display_notes = notes[:1000] + "\n\n_(description tronquée — voir le portail pour la version complète)_"
        else:
            display_notes = notes
        lines.append(f"**Description**: {display_notes}")
        lines.append("")
    
    # Methodology from extras
    methodology = dataset.get("methodology", "")
    if methodology:
        lines.append(f"**Méthodologie**: {truncate(methodology, 500)}")
        lines.append("")
    
    # Resources
    resources = dataset.get("resources", [])
    if resources:
        # Summary of formats
        formats = [r["format"] for r in resources if r.get("format")]
        lines.append(f"**Formats disponibles**: {', '.join(sorted(set(formats)))}")
        lines.append("")
        
        # Detailed resource table
        for r in resources:
            rid = r.get("id", "")
            rname = r.get("name", "Sans nom")
            rformat = r.get("format", "?")
            ds_active = r.get("datastore_active", False)
            schema = r.get("schema")
            stats = r.get("field_stats", {})
            
            if not ds_active and not schema:
                continue  # Skip non-datastore resources for field docs
            
            total = schema.get("total_records", 0) if schema else 0
            fields = schema.get("fields", []) if schema else []
            sample_records = schema.get("sample_records", []) if schema else []
            
            # Filter out internal CKAN fields
            user_fields = [f for f in fields if not f["id"].startswith("_")]
            
            if not user_fields:
                continue
            
            lines.append(f"#### Ressource: {rname} ({rformat})")
            lines.append("")
            lines.append(f"- **Resource ID**: `{rid}`")
            lines.append(f"- **DataStore actif**: {'✅ Oui' if ds_active else '❌ Non'}")
            lines.append(f"- **Nombre d'enregistrements**: {format_number(total)}")
            lines.append(f"- **Nombre de champs**: {len(user_fields)}")
            lines.append("")
            
            # Field schema table
            lines.append("| # | Champ brut | Type | Qualité | Exemples de valeurs |")
            lines.append("|---|-----------|------|---------|---------------------|")
            
            for k, field in enumerate(user_fields, 1):
                fid = field["id"]
                ftype = TYPE_MAP.get(field.get("type", ""), field.get("type", "?"))
                quality = quality_indicator(stats, fid)
                samples = sample_values(sample_records, fid, 3)
                samples_str = ", ".join([f"`{truncate(s, 40)}`" for s in samples]) if samples else "_vide_"
                
                lines.append(f"| {k} | `{fid}` | {ftype} | {quality} | {samples_str} |")
            
            lines.append("")
            
            # Null stats summary if available
            if stats:
                problematic = [(fid, s) for fid, s in stats.items() 
                              if s.get("null_pct", 0) > 50 and not fid.startswith("_")]
                if problematic:
                    lines.append("**⚠️ Champs avec >50% de valeurs nulles:**")
                    for fid, s in sorted(problematic, key=lambda x: x[1]["null_pct"], reverse=True):
                        lines.append(f"- `{fid}`: {s['null_pct']}% null")
                    lines.append("")
    
    lines.append("---")
    lines.append("")
    
    return "\n".join(lines)


def generate_category_doc(cat_id, cat_num, name_fr, name_en, datasets):
    """Generate a full Markdown document for one category."""
    lines = []
    
    lines.append(f"# {cat_num}. {name_fr}")
    lines.append(f"# {name_en}")
    lines.append("")
    lines.append(f"> **Nombre de datasets**: {len(datasets)}")
    lines.append(f"> **Catégorie portail**: `{cat_id}`")
    lines.append(f"> **Généré le**: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Table of contents
    lines.append("## Table des matières")
    lines.append("")
    for i, ds in enumerate(sorted(datasets, key=lambda d: d.get("title", "")), 1):
        title = ds.get("title", ds["slug"])
        lines.append(f"{i}. [{title}](#{ds['slug']})")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Stats summary
    total_resources = sum(len(ds.get("resources", [])) for ds in datasets)
    datastore_count = sum(
        1 for ds in datasets 
        for r in ds.get("resources", []) 
        if r.get("datastore_active")
    )
    total_records = sum(
        r.get("schema", {}).get("total_records", 0)
        for ds in datasets
        for r in ds.get("resources", [])
        if r.get("schema")
    )
    
    lines.append("## Statistiques de la catégorie")
    lines.append("")
    lines.append(f"| Métrique | Valeur |")
    lines.append(f"|----------|--------|")
    lines.append(f"| Datasets | {len(datasets)} |")
    lines.append(f"| Ressources totales | {total_resources} |")
    lines.append(f"| Ressources DataStore (requêtables via API) | {datastore_count} |")
    lines.append(f"| Enregistrements totaux (DataStore) | {format_number(total_records)} |")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    # Each dataset
    for ds in sorted(datasets, key=lambda d: d.get("title", "")):
        lines.append(generate_dataset_section(ds))
    
    return "\n".join(lines)


def generate_master_index(category_docs):
    """Generate the 00-INDEX.md master file."""
    lines = []
    
    lines.append("# MTL Pulse — Inventaire complet des données ouvertes de Montréal")
    lines.append("# Complete Montreal Open Data Inventory")
    lines.append("")
    lines.append(f"> **Généré le**: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"> **Source**: API CKAN de donneesquebec.ca")
    lines.append("")
    lines.append("Ce dossier contient l'inventaire complet de tous les datasets du portail")
    lines.append("de données ouvertes de Montréal, avec les schémas de champs, types de données,")
    lines.append("statistiques de qualité, et exemples de valeurs pour chaque ressource DataStore.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Catégories")
    lines.append("")
    lines.append("| # | Catégorie | Datasets | Fichier |")
    lines.append("|---|-----------|----------|---------|")
    
    total_ds = 0
    for cat_id, cat_num, name_fr, name_en, count, filename in category_docs:
        lines.append(f"| {cat_num} | {name_fr} | {count} | [{filename}]({filename}) |")
        total_ds += count
    
    lines.append(f"| | **TOTAL** | **{total_ds}** | |")
    lines.append("")
    
    lines.append("---")
    lines.append("")
    lines.append("## Légende qualité des champs")
    lines.append("")
    lines.append("| Indicateur | Signification |")
    lines.append("|------------|---------------|")
    lines.append("| 🟢 | >95% des valeurs présentes — fiable |")
    lines.append("| 🟡 | 70-95% présentes — utilisable avec prudence |")
    lines.append("| 🟠 | 30-70% présentes — données partielles |")
    lines.append("| 🔴 | <30% présentes — très incomplet |")
    lines.append("| ⚪ | Qualité inconnue (pas de stats disponibles) |")
    lines.append("")
    
    lines.append("## Comment utiliser ces données")
    lines.append("")
    lines.append("### Via l'API CKAN (recommandé)")
    lines.append("```")
    lines.append('# Chercher dans un dataset (remplacer RESOURCE_ID)')
    lines.append('curl "https://data.montreal.ca/api/3/action/datastore_search?resource_id=RESOURCE_ID&limit=10"')
    lines.append("")
    lines.append("# Requête SQL (filtrage par date, agrégation, etc.)")
    lines.append("curl \"https://data.montreal.ca/api/3/action/datastore_search_sql?sql=SELECT * FROM \\\"RESOURCE_ID\\\" WHERE \\\"DATE\\\" >= '2025-01-01' LIMIT 100\"")
    lines.append("```")
    lines.append("")
    lines.append("### Structure des fichiers")
    lines.append("```")
    lines.append("docs/data-inventory/")
    lines.append("├── 00-INDEX.md                              ← ce fichier")
    lines.append("├── 01-agriculture-alimentation.md           ← doc Markdown par catégorie")
    lines.append("├── 02-economie-entreprises.md")
    lines.append("├── ...")
    lines.append("├── raw/")
    lines.append("│   ├── _harvest_summary.json                ← résumé du harvest")
    lines.append("│   ├── _all_datasets.json                   ← liste de tous les slugs")
    lines.append("│   ├── by-category/                         ← JSON brut par catégorie")
    lines.append("│   │   ├── agriculture-et-alimentation.json")
    lines.append("│   │   └── ...")
    lines.append("│   └── datasets/                            ← JSON brut par dataset")
    lines.append("│       ├── actes-criminels.json")
    lines.append("│       └── ...")
    lines.append("```")
    lines.append("")
    
    return "\n".join(lines)


def main():
    if not CATEGORIES_DIR.exists():
        print(f"ERROR: Category files not found at {CATEGORIES_DIR}")
        print("Run 01_harvest_all_datasets.py first.")
        sys.exit(1)
    
    print("=" * 60)
    print("Generating Markdown reference docs from harvested data")
    print("=" * 60)
    
    category_docs = []
    
    # Process each category
    for cat_id, cat_num, name_fr, name_en in CATEGORY_ORDER:
        cat_file = CATEGORIES_DIR / f"{cat_id}.json"
        
        if not cat_file.exists():
            print(f"  ⚠ No data for category: {name_fr}")
            continue
        
        with open(cat_file, encoding="utf-8") as f:
            cat_data = json.load(f)
        
        datasets = cat_data.get("datasets", [])
        print(f"  [{cat_num}] {name_fr}: {len(datasets)} datasets")
        
        # Generate Markdown
        md_content = generate_category_doc(cat_id, cat_num, name_fr, name_en, datasets)
        
        filename = f"{cat_num}-{cat_id}.md"
        with open(OUTPUT_DIR / filename, "w", encoding="utf-8") as f:
            f.write(md_content)
        
        category_docs.append((cat_id, cat_num, name_fr, name_en, len(datasets), filename))
    
    # Check for uncategorized datasets
    all_cat_files = list(CATEGORIES_DIR.glob("*.json"))
    known_ids = {c[0] for c in CATEGORY_ORDER}
    for cf in all_cat_files:
        cat_id = cf.stem
        if cat_id not in known_ids and not cat_id.startswith("_"):
            with open(cf, encoding="utf-8") as f:
                cat_data = json.load(f)
            datasets = cat_data.get("datasets", [])
            if datasets:
                print(f"  [13] EXTRA: {cat_id}: {len(datasets)} datasets")
                md_content = generate_category_doc(cat_id, "13", cat_id, cat_id, datasets)
                filename = f"13-{cat_id}.md"
                with open(OUTPUT_DIR / filename, "w", encoding="utf-8") as f:
                    f.write(md_content)
                category_docs.append((cat_id, "13", cat_id, cat_id, len(datasets), filename))
    
    # Generate master index
    index_content = generate_master_index(category_docs)
    with open(OUTPUT_DIR / "00-INDEX.md", "w", encoding="utf-8") as f:
        f.write(index_content)
    
    print(f"\n✓ Generated {len(category_docs)} category docs + index")
    print(f"  Output: {OUTPUT_DIR}/")


if __name__ == "__main__":
    import sys
    main()
