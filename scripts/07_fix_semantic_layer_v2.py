#!/usr/bin/env python3
"""
MTL Pulse - Semantic Layer Fixes v2
====================================
Pass 7: Apply 4 targeted fixes to all semantic layer JSON files,
then regenerate the Markdown files.

Fixes:
A. Force-correct bad date types (fields with non-date min_date/max_date,
   blockedtype/impactwidth fields, description_type/categorie_batiment)
B. Force-recalculate ALL temporal_range from validated date fields
C. Reclassify remaining ID fields (OBJECTID, INCIDENT_NBR, etc.) from measure to exclude
D. Better English names for permis-construction and actes-criminels fields

Usage:
    python 07_fix_semantic_layer_v2.py
"""

import json
import re
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

SEMANTIC_DIR = Path("docs/data-inventory/semantic-layer")

# === Fix A: ISO date validation ===
ISO_DATE_PAT = re.compile(r'^\d{4}[-/]\d{2}[-/]\d{2}')
YYYYMMDD_PAT = re.compile(r'^\d{8}$')
# Fields that are NEVER dates by raw_name pattern
NEVER_DATE_PATTERNS = re.compile(
    r'(blockedtype|impactwidth|impact_blocked)',
    re.IGNORECASE
)
NEVER_DATE_EXACT = {
    "description_type_batiment",
    "description_categorie_batiment",
}


def is_valid_iso_date(s):
    """Check if a string looks like a valid ISO date."""
    if not s:
        return False
    s = str(s).strip()
    if ISO_DATE_PAT.match(s):
        return True
    if YYYYMMDD_PAT.match(s):
        # Pure 8-digit number like 20231030 — valid compact date
        return True
    return False


def fix_a_bad_date_types(fields):
    """Fix A: Reclassify fields that are typed 'date' but aren't actually dates.

    Catches:
    1. Fields with blockedtype/impactwidth/impact_blocked in raw_name
    2. description_type_batiment and description_categorie_batiment
    3. Any date-typed field where min_date or max_date contains non-date strings
    4. Any date-typed field where top_values contain non-date strings
    """
    count = 0

    for f in fields:
        if f.get("type") != "date":
            continue

        raw = f.get("raw_name", "")
        should_fix = False

        # Rule 1: raw_name contains blockedtype, impactwidth, impact_blocked
        if NEVER_DATE_PATTERNS.search(raw):
            should_fix = True

        # Rule 2: exact raw_name matches
        if raw in NEVER_DATE_EXACT:
            should_fix = True

        # Rule 3: min_date or max_date contains non-date strings
        if not should_fix:
            min_d = str(f.get("min_date", ""))
            max_d = str(f.get("max_date", ""))
            if min_d and not is_valid_iso_date(min_d):
                should_fix = True
            if max_d and not is_valid_iso_date(max_d):
                should_fix = True

        # Rule 4: top_values contain non-date strings
        if not should_fix:
            top_vals = f.get("top_values", [])
            for tv in top_vals:
                val = str(tv.get("value", ""))
                if not val:
                    continue
                # If it matches a date pattern, it's fine
                if ISO_DATE_PAT.match(val) or YYYYMMDD_PAT.match(val) or re.match(r'^\d{4}$', val):
                    continue
                # Contains letters (not a date)
                if re.search(r'[A-Za-z\u00C0-\u024F]{3,}', val):
                    should_fix = True
                    break

        if not should_fix:
            continue

        # Reclassify to category or dimension
        unique = f.get("unique_values", 999)
        if unique is not None and unique < 30:
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


# === Fix B: Temporal range recalculation ===
def fix_b_temporal_range(ds):
    """Fix B: Recalculate temporal_range from validated date fields only.

    Only uses fields where type='date' AND min_date/max_date are valid ISO dates.
    """
    valid_mins = []
    valid_maxs = []

    for f in ds.get("fields", []):
        if f.get("type") != "date":
            continue
        min_d = str(f.get("min_date", ""))
        max_d = str(f.get("max_date", ""))
        if is_valid_iso_date(min_d):
            valid_mins.append(min_d)
        if is_valid_iso_date(max_d):
            valid_maxs.append(max_d)

    old_range = ds.get("temporal_range")
    old_note = ds.get("temporal_range_note")

    if not valid_mins and not valid_maxs:
        changed = old_range is not None
        ds["temporal_range"] = None
        ds.pop("temporal_range_note", None)
        return changed

    new_range = {}
    if valid_mins:
        new_range["min"] = min(valid_mins)
    if valid_maxs:
        new_range["max"] = max(valid_maxs)

    ds["temporal_range"] = new_range

    # Check if range looks truncated (sample-based)
    ds.pop("temporal_range_note", None)
    freq = ds.get("update_frequency", "")
    max_val = new_range.get("max", "")
    if freq in ("daily", "weekly", "monthly") and max_val:
        try:
            max_year = int(max_val[:4])
            if max_year < 2023:
                ds["temporal_range_note"] = (
                    "Based on 1000-row sample; actual range may be wider"
                )
        except (ValueError, IndexError):
            pass

    changed = (old_range != new_range)
    return changed


# === Fix C: Remaining ID fields as measures ===
OBJECTID_PAT = re.compile(r'objectid', re.IGNORECASE)
EXACT_ID_FIELDS = {
    "INCIDENT_NBR", "TransactionID", "buildingid", "MUNID",
    "IDE_STRCT", "POSITION_VIDEO",
}
TYPO_ID_PAT = re.compile(r'Idenfiant', re.IGNORECASE)  # Note: typo in source data


def fix_c_remaining_ids(fields):
    """Fix C: Change role to 'exclude' for GIS artifacts and known ID fields."""
    count = 0

    for f in fields:
        raw = f.get("raw_name", "")
        role = f.get("report_builder_role", "")

        should_fix = False

        # OBJECTID (GIS artifact)
        if raw == "OBJECTID" or OBJECTID_PAT.search(raw):
            should_fix = True

        # Exact matches
        if raw in EXACT_ID_FIELDS:
            should_fix = True

        # Typo pattern: "Idenfiant"
        if TYPO_ID_PAT.search(raw):
            should_fix = True

        if not should_fix:
            continue

        # Only fix if currently a measure (or if it's OBJECTID regardless)
        if role == "measure" or raw == "OBJECTID" or OBJECTID_PAT.search(raw):
            f["report_builder_role"] = "exclude"
            f["groupable"] = False
            f["aggregatable"] = False
            f["filterable"] = False
            f["chartable_as"] = []
            count += 1

    return count


# === Fix D: Better names for specific datasets ===
PERMIS_FIELD_OVERRIDES = {
    "no_demande": {
        "clean_name_en": "Application Number",
        "clean_name_fr": "Numero de demande",
    },
    "id_permis": {
        "clean_name_en": "Permit ID",
        "clean_name_fr": "Identifiant de permis",
    },
    "code_type_base_demande": {
        "clean_name_en": "Permit Type Code (CO/TR/DE/CA)",
        "clean_name_fr": "Code de type de permis",
    },
    "description_type_demande": {
        "clean_name_en": "Permit Type Description",
        "clean_name_fr": "Description du type de permis",
    },
    "description_type_batiment": {
        "clean_name_en": "Building Type",
        "clean_name_fr": "Type de batiment",
    },
    "description_categorie_batiment": {
        "clean_name_en": "Building Category",
        "clean_name_fr": "Categorie de batiment",
    },
    "nature_travaux": {
        "clean_name_en": "Nature of Work",
        "clean_name_fr": "Nature des travaux",
        "report_builder_role": "filter",
        "type": "text",
        "field_type_detected": "text",
        "groupable": False,
        "filterable": True,
        "chartable_as": ["table"],
    },
    "nb_logements": {
        "clean_name_en": "Number of Housing Units",
        "clean_name_fr": "Nombre de logements",
    },
    "loc_x": {
        "clean_name_en": "X Coordinate (MTM)",
        "clean_name_fr": "Coordonnee X (MTM)",
        "report_builder_role": "geo",
        "groupable": False,
        "aggregatable": False,
        "chartable_as": ["map"],
    },
    "loc_y": {
        "clean_name_en": "Y Coordinate (MTM)",
        "clean_name_fr": "Coordonnee Y (MTM)",
        "report_builder_role": "geo",
        "groupable": False,
        "aggregatable": False,
        "chartable_as": ["map"],
    },
}

CRIME_FIELD_OVERRIDES = {
    "CATEGORIE": {
        "clean_name_en": "Crime Category",
        "clean_name_fr": "Categorie de crime",
    },
    "QUART": {
        "clean_name_en": "Time of Day (Shift)",
        "clean_name_fr": "Moment de la journee (quart)",
    },
    "PDQ": {
        "clean_name_en": "Police Station (PDQ)",
        "clean_name_fr": "Poste de quartier (PDQ)",
    },
}


def fix_d_better_names(datasets):
    """Fix D: Apply specific name overrides for permis-construction and actes-criminels."""
    count = 0

    for ds in datasets:
        slug = ds.get("slug", "")
        overrides = None

        if "permis-construction" in slug:
            overrides = PERMIS_FIELD_OVERRIDES
        elif "actes-criminels" in slug:
            overrides = CRIME_FIELD_OVERRIDES

        if not overrides:
            continue

        for f in ds.get("fields", []):
            raw = f.get("raw_name", "")
            if raw in overrides:
                for key, val in overrides[raw].items():
                    f[key] = val
                count += 1

    return count


# === Markdown regeneration (same as 06 but reused here) ===
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
    print("APPLYING 4 TARGETED FIXES TO SEMANTIC LAYER")
    print("=" * 60)

    total_stats = {
        "fix_a_dates_corrected": 0,
        "fix_b_temporal_fixed": 0,
        "fix_c_ids_excluded": 0,
        "fix_d_names_improved": 0,
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

            # Fix A: Bad date types (must run BEFORE Fix B)
            n = fix_a_bad_date_types(fields)
            cat_stats["fix_a_dates_corrected"] += n

            # Fix B: Temporal range recalculation (uses corrected date types)
            changed = fix_b_temporal_range(ds)
            if changed:
                cat_stats["fix_b_temporal_fixed"] += 1

            # Fix C: Remaining IDs as measures
            n = fix_c_remaining_ids(fields)
            cat_stats["fix_c_ids_excluded"] += n

        # Fix D: Better names (operates on full dataset list)
        n = fix_d_better_names(datasets)
        cat_stats["fix_d_names_improved"] += n

        # Save corrected JSON
        cat_data["fixed_v2_at"] = datetime.now().isoformat()
        with open(jf, "w", encoding="utf-8") as f:
            json.dump(cat_data, f, indent=2, ensure_ascii=False)

        # Regenerate Markdown
        md = generate_markdown_from_json(cat_data)
        md_path = jf.with_suffix(".md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(md)

        for k in total_stats:
            total_stats[k] += cat_stats[k]

        print(f"    Fix A (dates):    {cat_stats['fix_a_dates_corrected']} corrected")
        print(f"    Fix B (temporal): {cat_stats['fix_b_temporal_fixed']} recalculated")
        print(f"    Fix C (IDs):      {cat_stats['fix_c_ids_excluded']} excluded")
        print(f"    Fix D (names):    {cat_stats['fix_d_names_improved']} improved")

    print("\n" + "=" * 60)
    print("ALL TARGETED FIXES APPLIED")
    print("=" * 60)
    print(f"  Fix A - Date types corrected:    {total_stats['fix_a_dates_corrected']}")
    print(f"  Fix B - Temporal ranges fixed:   {total_stats['fix_b_temporal_fixed']}")
    print(f"  Fix C - IDs excluded:            {total_stats['fix_c_ids_excluded']}")
    print(f"  Fix D - Names improved:          {total_stats['fix_d_names_improved']}")
    print(f"\n  JSON + Markdown regenerated in: {SEMANTIC_DIR}/")


if __name__ == "__main__":
    main()
