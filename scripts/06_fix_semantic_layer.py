#!/usr/bin/env python3
"""
MTL Pulse - Semantic Layer Fixes
=================================
Pass 6: Apply 5 systematic fixes to all semantic layer JSON files,
then regenerate the Markdown files.

Fixes:
1. Unique, contextual field names (no generic single-word names)
2. Reclassify ID fields from "measure" to proper roles
3. Fix bad type detection (non-date fields misclassified as date)
4. Recalculate temporal_range from valid date fields only
5. Remove incorrect/unsupported warnings

Usage:
    python 06_fix_semantic_layer.py
"""

import json
import re
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

SEMANTIC_DIR = Path("docs/data-inventory/semantic-layer")

# ===== Fix 1: Generic names that need contextualizing =====
GENERIC_EN = {
    "type", "name", "date", "status", "description", "count", "street",
    "identifier", "borough", "sector", "address", "coordinates", "category",
    "length", "owner", "number", "code", "value", "request", "permit",
    "contract", "temperature", "source", "note", "link", "format",
    "comment", "unit", "division", "direction", "service", "level",
    "priority", "state", "nature", "class", "group", "index", "score",
    "rate", "percentage", "duration", "distance", "volume", "budget",
    "area", "surface area", "width", "height", "weight", "quantity",
    "year", "month", "day", "hour", "start", "end", "location",
    "latitude", "longitude",
}

# Words/fragments to build contextual names from raw_name
FRAGMENT_EN = {
    "street": "Street", "rue": "Street",
    "impact": "Impact", "width": "Width", "largeur": "Width",
    "blocked": "Blocked", "blockage": "Blockage", "bloque": "Blocked",
    "sidewalk": "Sidewalk", "trottoir": "Sidewalk",
    "bikepath": "Bike Path", "piste": "Path", "cyclable": "Cycling",
    "type": "Type", "code": "Code", "no": "No.", "numero": "No.",
    "demande": "Application", "permis": "Permit",
    "batiment": "Building", "building": "Building",
    "description": "Description", "desc": "Description",
    "categorie": "Category", "cat": "Category",
    "statut": "Status", "stat": "Status",
    "nom": "Name", "name": "Name",
    "prenom": "First Name", "first": "First",
    "date": "Date", "dt": "Date",
    "debut": "Start", "fin": "End", "start": "Start", "end": "End",
    "creation": "Creation", "modification": "Modification",
    "emission": "Issuance", "reception": "Receipt",
    "inspection": "Inspection", "intervention": "Intervention",
    "arrondissement": "Borough", "arr": "Borough",
    "quartier": "Neighbourhood", "secteur": "Sector",
    "adresse": "Address", "address": "Address",
    "civique": "Civic", "postal": "Postal",
    "latitude": "Latitude", "lat": "Lat",
    "longitude": "Longitude", "lon": "Lon", "lng": "Lng",
    "montant": "Amount", "prix": "Price", "cout": "Cost",
    "valeur": "Value", "total": "Total",
    "nombre": "Count", "nb": "Count", "count": "Count",
    "surface": "Surface", "superficie": "Area",
    "longueur": "Length", "hauteur": "Height",
    "temperature": "Temperature", "temp": "Temp",
    "vitesse": "Speed", "distance": "Distance",
    "duree": "Duration", "volume": "Volume",
    "budget": "Budget", "depense": "Expenditure",
    "score": "Score", "indice": "Index", "taux": "Rate",
    "priorite": "Priority", "niveau": "Level",
    "source": "Source", "reference": "Reference",
    "commentaire": "Comment", "note": "Note",
    "url": "URL", "lien": "Link",
    "proprietaire": "Owner", "responsable": "Manager",
    "organisme": "Organization", "fournisseur": "Supplier",
    "contrat": "Contract", "entente": "Agreement",
    "programme": "Program", "projet": "Project",
    "evenement": "Event", "activite": "Activity",
    "requete": "Request", "incident": "Incident",
    "infraction": "Violation", "crime": "Crime",
    "annee": "Year", "mois": "Month", "jour": "Day",
    "heure": "Hour", "minute": "Minute",
    "saison": "Season", "periode": "Period", "trimestre": "Quarter",
    "id": "ID", "identifiant": "Identifier",
    "classe": "Class", "genre": "Genre",
    "groupe": "Group", "sous": "Sub",
    "resultat": "Result", "etat": "State",
    "condition": "Condition", "qualite": "Quality",
    "objet": "Object", "element": "Element",
    "materiau": "Material", "essence": "Species",
    "diametre": "Diameter", "dhp": "DBH",
    "emplacement": "Location", "localisation": "Location",
    "coord": "Coordinate", "position": "Position",
    "direction": "Direction", "orientation": "Orientation",
    "cote": "Side", "sens": "Direction",
    "voie": "Lane", "chaussee": "Roadway",
    "panneau": "Sign", "signal": "Signal",
    "poteau": "Pole", "borne": "Bollard",
    "limite": "Limit", "zone": "Zone",
    "plan": "Plan", "schema": "Schema",
    "base": "Base", "standard": "Standard",
    "travaux": "Works", "chantier": "Construction",
    "entrave": "Obstruction", "fermeture": "Closure",
    "occupation": "Occupancy", "usage": "Usage",
    "propriete": "Property", "terrain": "Land",
    "lot": "Lot", "cadastre": "Cadastre",
    "evaluation": "Assessment", "fonciere": "Property",
    "taxe": "Tax", "impot": "Tax",
    "subvention": "Grant", "aide": "Aid",
    "election": "Election", "vote": "Vote",
    "conseil": "Council", "comite": "Committee",
    "reglement": "Bylaw", "ordonnance": "Ordinance",
    "municipal": "Municipal", "communal": "Municipal",
    "operateur": "Operator", "unite": "Unit",
    "division": "Division", "service": "Service",
    "format": "Format", "fichier": "File",
    "image": "Image", "photo": "Photo",
    "document": "Document", "piece": "Attachment",
    "wkt": "WKT", "geom": "Geometry",
    "mtm": "MTM", "wgs": "WGS84",
    "x": "X", "y": "Y",
    "min": "Min", "max": "Max", "avg": "Avg",
    "somme": "Sum", "moyenne": "Average",
    "median": "Median", "ecart": "Deviation",
    "pct": "Pct", "pourcentage": "Percentage",
    "ratio": "Ratio", "proportion": "Proportion",
    "oui": "Yes", "non": "No",
    "actif": "Active", "inactif": "Inactive",
    "ouvert": "Open", "ferme": "Closed",
    "public": "Public", "prive": "Private",
    "reponse": "Response", "question": "Question",
    "pdq": "Police District",
    "spvm": "SPVM",
    "sim": "SIM",
    "stm": "STM",
    "bixi": "BIXI",
}

FRAGMENT_FR = {
    "street": "Rue", "rue": "Rue",
    "impact": "Impact", "width": "Largeur", "largeur": "Largeur",
    "blocked": "Bloque", "bloque": "Bloque",
    "sidewalk": "Trottoir", "trottoir": "Trottoir",
    "bikepath": "Piste cyclable", "piste": "Piste", "cyclable": "Cyclable",
    "type": "Type", "code": "Code", "no": "No", "numero": "Numero",
    "demande": "Demande", "permis": "Permis",
    "batiment": "Batiment", "building": "Batiment",
    "description": "Description",
    "categorie": "Categorie",
    "statut": "Statut",
    "nom": "Nom", "name": "Nom",
    "date": "Date", "dt": "Date",
    "debut": "Debut", "fin": "Fin",
    "creation": "Creation", "modification": "Modification",
    "emission": "Emission", "reception": "Reception",
    "inspection": "Inspection", "intervention": "Intervention",
    "arrondissement": "Arrondissement",
    "quartier": "Quartier", "secteur": "Secteur",
    "adresse": "Adresse",
    "civique": "Civique", "postal": "Postal",
    "latitude": "Latitude", "longitude": "Longitude",
    "montant": "Montant", "prix": "Prix", "cout": "Cout",
    "valeur": "Valeur", "total": "Total",
    "nombre": "Nombre", "nb": "Nombre",
    "id": "ID", "identifiant": "Identifiant",
    "pdq": "Poste de quartier",
}


def humanize_raw_name(raw_name, frag_dict):
    """Convert a raw_name like 'streetimpactwidth' or 'code_type_base_demande'
    into a readable name using fragment matching."""
    # Split on underscores, hyphens, camelCase boundaries
    parts = re.split(r'[_\-\s]+', raw_name)
    # Also split camelCase
    expanded = []
    for p in parts:
        expanded.extend(re.findall(r'[A-Z]?[a-z0-9]+|[A-Z]+(?=[A-Z]|$)', p))
    if not expanded:
        expanded = [raw_name]

    result_parts = []
    for part in expanded:
        lower = part.lower()
        if lower in frag_dict:
            result_parts.append(frag_dict[lower])
        else:
            result_parts.append(part.capitalize())

    return " ".join(result_parts)


def fix1_contextual_names(fields, dataset_slug):
    """Fix 1: Make generic field names contextual."""
    count = 0

    for f in fields:
        old_en = f.get("clean_name_en", "")
        old_fr = f.get("clean_name_fr", "")
        raw = f.get("raw_name", "")

        # Check if current EN name is generic (single word or very short)
        if old_en.lower().strip() in GENERIC_EN:
            new_en = humanize_raw_name(raw, FRAGMENT_EN)
            new_fr = humanize_raw_name(raw, FRAGMENT_FR)

            # Don't replace if the humanized version is identical or worse
            if new_en.lower() != old_en.lower() and len(new_en) > len(old_en):
                f["clean_name_en"] = new_en
                f["clean_name_fr"] = new_fr
                count += 1

    # Deduplicate: ensure no two fields have identical clean_name_en
    name_counts = Counter(f["clean_name_en"] for f in fields)
    for name, cnt in name_counts.items():
        if cnt > 1:
            idx = 1
            for f in fields:
                if f["clean_name_en"] == name:
                    if idx > 1:
                        f["clean_name_en"] = f"{name} ({f['raw_name']})"
                        f["clean_name_fr"] = f"{f['clean_name_fr']} ({f['raw_name']})"
                        count += 1
                    idx += 1

    return count


# Patterns indicating an ID/code field
ID_PATTERNS = re.compile(
    r'(^id$|^id_|_id$|_id_|^no_|^no$|^num_|^numero|^code_|^code$|'
    r'identifiant|_pk$|_fk$|_key$|_ref$|_uuid$)',
    re.IGNORECASE
)


def fix2_reclassify_ids(fields):
    """Fix 2: Reclassify ID fields from measure to proper roles."""
    count = 0

    for f in fields:
        raw = f.get("raw_name", "")
        role = f.get("report_builder_role", "")

        if role != "measure":
            continue

        if not ID_PATTERNS.search(raw):
            # Special case: PDQ
            if raw.upper() == "PDQ":
                f["report_builder_role"] = "dimension"
                f["groupable"] = True
                f["aggregatable"] = False
                f["chartable_as"] = ["bar", "pie", "table"]
                count += 1
            continue

        unique = f.get("unique_values")
        if unique is not None and unique < 100:
            f["report_builder_role"] = "dimension"
            f["groupable"] = True
            f["aggregatable"] = False
            f["chartable_as"] = ["bar", "pie", "table"]
        elif unique is not None and unique > 500:
            f["report_builder_role"] = "exclude"
            f["groupable"] = False
            f["aggregatable"] = False
            f["filterable"] = False
            f["chartable_as"] = []
        else:
            f["report_builder_role"] = "filter"
            f["groupable"] = False
            f["aggregatable"] = False
            f["chartable_as"] = ["table"]
        count += 1

    return count


# Fragments that indicate a real date field
DATE_INDICATORS = re.compile(
    r'(date|time|debut|fin|emission|created|modified|jour|annee|year|'
    r'month|mois|timestamp|dt_|_dt$|heure|hour|saison|periode)',
    re.IGNORECASE
)

# Non-date value patterns
NON_DATE_VALUES = re.compile(
    r'^[A-Za-z\u00C0-\u024F]{3,}',  # Starts with 3+ letters (not a date)
)


def fix3_bad_date_types(fields):
    """Fix 3: Fix fields misclassified as date."""
    count = 0

    for f in fields:
        if f.get("type") != "date":
            continue

        raw = f.get("raw_name", "")

        # If the raw name clearly indicates date, keep it
        if DATE_INDICATORS.search(raw):
            continue

        # Check top_values for non-date strings
        top_vals = f.get("top_values", [])
        has_non_date = False
        if top_vals:
            for tv in top_vals:
                val = str(tv.get("value", ""))
                # Check if value looks like a date
                if re.match(r'^\d{4}[-/]\d{2}', val) or re.match(r'^\d{2}[-/]\d{2}[-/]\d{4}', val):
                    continue
                if re.match(r'^\d{4}$', val):  # Just a year
                    continue
                if NON_DATE_VALUES.match(val):
                    has_non_date = True
                    break

        if not has_non_date:
            continue

        # Reclassify
        unique = f.get("unique_values", 999)
        if unique < 30:
            f["type"] = "category"
            f["field_type_detected"] = "category"
            f["report_builder_role"] = "dimension"
            f["groupable"] = True
            f["aggregatable"] = False
            f["chartable_as"] = ["bar", "pie", "table"]
        else:
            f["type"] = "text"
            f["field_type_detected"] = "text"
            f["report_builder_role"] = "filter"
            f["groupable"] = False
            f["aggregatable"] = False
            f["chartable_as"] = ["table"]

        # Remove date-specific keys
        for key in ("min_date", "max_date", "date_format"):
            f.pop(key, None)

        count += 1

    return count


def fix4_temporal_range(ds):
    """Fix 4: Recalculate temporal_range from valid date fields only."""
    valid_dates = []

    for f in ds.get("fields", []):
        if f.get("type") != "date":
            continue
        if f.get("min_date") and f.get("max_date"):
            valid_dates.append((str(f["min_date"]), str(f["max_date"])))

    old_range = ds.get("temporal_range")

    if not valid_dates:
        if old_range is not None:
            ds["temporal_range"] = None
            return True
        return False

    all_mins = [d[0] for d in valid_dates]
    all_maxs = [d[1] for d in valid_dates]
    new_range = {"min": min(all_mins), "max": max(all_maxs)}

    changed = (old_range != new_range)
    ds["temporal_range"] = new_range

    # Check if range looks truncated
    freq = ds.get("update_frequency", "")
    if freq in ("daily", "weekly", "monthly") and new_range["max"]:
        try:
            max_year = int(new_range["max"][:4])
            if max_year < 2024:
                ds["temporal_range_note"] = (
                    "Based on 1000-row sample; actual data may extend further"
                )
        except (ValueError, IndexError):
            pass

    return changed


def fix5_remove_bad_warnings(ds):
    """Fix 5: Remove warnings not supported by methodology or field analysis."""
    count = 0
    meth = ds.get("methodology_fr", "").lower()

    has_geo = any(
        f.get("type") in ("geo_latitude", "geo_longitude")
        for f in ds.get("fields", [])
    )

    for lang in ("warnings_fr", "warnings_en"):
        warnings = ds.get(lang, [])
        if not warnings:
            continue

        filtered = []
        for w in warnings:
            wl = w.lower()

            # "Location rounded to nearest intersection" — only if has geo fields
            if ("intersection" in wl or "arrondi" in wl) and not has_geo:
                count += 1
                continue

            # "Data obfuscated for privacy" — only if methodology mentions it
            if ("obfusqu" in wl or "obfuscated" in wl or "privacy" in wl):
                if not ("obfusqu" in meth or "vie priv" in meth or "anonymi" in meth):
                    count += 1
                    continue

            # "Some data are estimates" — only if methodology mentions it
            if ("estimate" in wl or "estimation" in wl):
                if not ("estim" in meth or "approximat" in meth):
                    count += 1
                    continue

            filtered.append(w)

        ds[lang] = filtered

    return count


def generate_markdown_from_json(cat_data):
    """Regenerate Markdown from corrected JSON data."""
    cat_fr = cat_data["category_name_fr"]
    cat_en = cat_data["category_name_en"]
    datasets = cat_data["datasets"]

    lines = []
    lines.append(f"# {cat_fr}")
    lines.append(f"# {cat_en}")
    lines.append("")
    lines.append(f"> Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"> Datasets: {len(datasets)}")
    lines.append("")

    # Grade summary
    grades = Counter(d["data_quality_score"] for d in datasets)
    usable = sum(1 for d in datasets if d["usable_in_report_builder"])
    lines.append("## Quality Overview")
    lines.append("")
    lines.append("| Grade | Count | Description |")
    lines.append("|-------|-------|-------------|")
    for g in ("A", "B", "C", "D", "F"):
        desc = {"A": "Excellent", "B": "Good", "C": "Usable", "D": "Sparse", "F": "Unusable"}
        lines.append(f"| **{g}** | {grades.get(g, 0)} | {desc[g]} |")
    lines.append(f"| | **{len(datasets)}** | ({usable} usable in report builder) |")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Table of contents
    lines.append("## Datasets")
    lines.append("")
    for ds in sorted(datasets, key=lambda d: d["data_quality_score"]):
        grade = ds["data_quality_score"]
        rb = " [RB]" if ds["usable_in_report_builder"] else ""
        lines.append(f"- **[{grade}]** [{ds['title_fr']}](#{ds['slug']}){rb}")
    lines.append("")
    lines.append("---")
    lines.append("")

    for ds in sorted(datasets, key=lambda d: (d["data_quality_score"], d["title_fr"])):
        lines.append(f"## {ds['title_fr']}")
        lines.append(f"### {ds.get('title_en', '')}")
        lines.append("")

        lines.append("| Property | Value |")
        lines.append("|----------|-------|")
        lines.append(f"| **Slug** | `{ds['slug']}` |")
        lines.append(f"| **Quality Grade** | **{ds['data_quality_score']}** |")
        lines.append(f"| **Report Builder** | {'Yes' if ds['usable_in_report_builder'] else 'No'} |")
        lines.append(f"| **Publisher** | {ds.get('publisher', '')} |")
        lines.append(f"| **Update Frequency** | {ds.get('update_frequency', '')} |")
        lines.append(f"| **Total Records** | {ds.get('total_records', 0):,} |")
        tr = ds.get("temporal_range")
        if tr:
            note = ""
            if ds.get("temporal_range_note"):
                note = f" *({ds['temporal_range_note']})*"
            lines.append(f"| **Temporal Range** | {tr.get('min', '?')} to {tr.get('max', '?')}{note} |")
        lines.append(f"| **Formats** | {', '.join(ds.get('available_formats', []))} |")
        lines.append("")

        if ds.get("description_fr"):
            lines.append(f"> {ds['description_fr'][:300]}")
            lines.append("")

        if ds.get("warnings_en"):
            lines.append("**Warnings:**")
            for w in ds["warnings_en"]:
                lines.append(f"- {w}")
            lines.append("")

        fields = ds.get("fields", [])
        if fields:
            lines.append("### Field Inventory")
            lines.append("")
            lines.append("| # | Raw Name | Clean Name (EN) | Type | Role | Quality | Null% |")
            lines.append("|---|----------|-----------------|------|------|---------|-------|")
            for i, f in enumerate(fields, 1):
                q = {"good": "G", "usable": "U", "poor": "P", "empty": "E"}.get(f.get("quality", "?"), "?")
                lines.append(
                    f"| {i} | `{f['raw_name']}` | {f['clean_name_en']} | "
                    f"{f.get('type', '?')} | {f.get('report_builder_role', '?')} | "
                    f"{q} | {f.get('null_pct', '?')}% |"
                )
            lines.append("")

            dims = [f for f in fields if f.get("report_builder_role") == "dimension"]
            measures = [f for f in fields if f.get("report_builder_role") == "measure"]
            dates = [f for f in fields if f.get("report_builder_role") == "date"]
            geos = [f for f in fields if f.get("report_builder_role") == "geo"]

            if dims:
                lines.append(f"**Dimensions** ({len(dims)}): " + ", ".join(f"`{f['raw_name']}`" for f in dims))
                lines.append("")
            if measures:
                lines.append(f"**Measures** ({len(measures)}): " + ", ".join(f"`{f['raw_name']}`" for f in measures))
                lines.append("")
            if dates:
                lines.append(f"**Date fields** ({len(dates)}): " + ", ".join(f"`{f['raw_name']}`" for f in dates))
                lines.append("")
            if geos:
                lines.append(f"**Geo fields** ({len(geos)}): " + ", ".join(f"`{f['raw_name']}`" for f in geos))
                lines.append("")

        if ds.get("recommended_joins"):
            lines.append("**Join opportunities:** " + "; ".join(ds["recommended_joins"]))
            lines.append("")

        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def main():
    json_files = sorted(SEMANTIC_DIR.glob("*.json"))
    json_files = [f for f in json_files if not f.stem.startswith("_")]

    if not json_files:
        print("ERROR: No semantic layer JSON files found")
        sys.exit(1)

    print("=" * 60)
    print("APPLYING 5 FIXES TO SEMANTIC LAYER")
    print("=" * 60)

    total_stats = {
        "fix1_fields_renamed": 0,
        "fix2_roles_changed": 0,
        "fix3_types_corrected": 0,
        "fix4_temporal_fixed": 0,
        "fix5_warnings_removed": 0,
    }

    for jf in json_files:
        with open(jf, encoding="utf-8") as f:
            cat_data = json.load(f)

        cat_name = cat_data.get("category_name_fr", jf.stem)
        datasets = cat_data.get("datasets", [])
        print(f"\n  [{jf.stem}] {cat_name}: {len(datasets)} datasets")

        cat_stats = {k: 0 for k in total_stats}

        for ds in datasets:
            fields = ds.get("fields", [])

            # Fix 1: Contextual field names
            n = fix1_contextual_names(fields, ds.get("slug", ""))
            cat_stats["fix1_fields_renamed"] += n

            # Fix 2: Reclassify IDs
            n = fix2_reclassify_ids(fields)
            cat_stats["fix2_roles_changed"] += n

            # Fix 3: Bad date types
            n = fix3_bad_date_types(fields)
            cat_stats["fix3_types_corrected"] += n

            # Fix 4: Temporal range
            changed = fix4_temporal_range(ds)
            if changed:
                cat_stats["fix4_temporal_fixed"] += 1

            # Fix 5: Remove bad warnings
            n = fix5_remove_bad_warnings(ds)
            cat_stats["fix5_warnings_removed"] += n

        # Save corrected JSON
        cat_data["fixed_at"] = datetime.now().isoformat()
        with open(jf, "w", encoding="utf-8") as f:
            json.dump(cat_data, f, indent=2, ensure_ascii=False)

        # Regenerate Markdown
        md = generate_markdown_from_json(cat_data)
        md_path = jf.with_suffix(".md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(md)

        for k in total_stats:
            total_stats[k] += cat_stats[k]

        print(f"    Fix 1 (names):    {cat_stats['fix1_fields_renamed']} renamed")
        print(f"    Fix 2 (roles):    {cat_stats['fix2_roles_changed']} reclassified")
        print(f"    Fix 3 (types):    {cat_stats['fix3_types_corrected']} corrected")
        print(f"    Fix 4 (temporal): {cat_stats['fix4_temporal_fixed']} fixed")
        print(f"    Fix 5 (warnings): {cat_stats['fix5_warnings_removed']} removed")

    print("\n" + "=" * 60)
    print("ALL FIXES APPLIED")
    print("=" * 60)
    print(f"  Fix 1 - Fields renamed:        {total_stats['fix1_fields_renamed']}")
    print(f"  Fix 2 - Roles reclassified:    {total_stats['fix2_roles_changed']}")
    print(f"  Fix 3 - Types corrected:       {total_stats['fix3_types_corrected']}")
    print(f"  Fix 4 - Temporal ranges fixed:  {total_stats['fix4_temporal_fixed']}")
    print(f"  Fix 5 - Warnings removed:      {total_stats['fix5_warnings_removed']}")
    print(f"\n  JSON + Markdown regenerated in: {SEMANTIC_DIR}/")


if __name__ == "__main__":
    main()
