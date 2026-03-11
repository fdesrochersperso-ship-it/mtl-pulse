#!/usr/bin/env python3
"""
MTL Pulse — Complete Open Data Harvest Script
==============================================
Pass 1: Fetches ALL metadata + field schemas from Montreal's CKAN API.

This script:
1. Paginates through all ~396 datasets via package_search
2. For each dataset, extracts full metadata (description, methodology, frequency, etc.)
3. For each datastore-active resource, fetches field schemas + 5 sample rows
4. Saves everything as structured JSON in /docs/data-inventory/raw/

Run time: ~15-30 minutes (respectful 0.5s delay between API calls)
Network: Requires internet access (run via Claude Code, not claude.ai)

Usage:
    python 01_harvest_all_datasets.py
    python 01_harvest_all_datasets.py --resume  # resume from last checkpoint
"""

import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

# === Configuration ===
CKAN_SEARCH_URL = "https://donneesquebec.ca/recherche/api/3/action/package_search"
CKAN_SHOW_URL = "https://donneesquebec.ca/recherche/api/3/action/package_show"
DATASTORE_SEARCH_URL = "https://data.montreal.ca/api/3/action/datastore_search"
DATASTORE_SQL_URL = "https://data.montreal.ca/api/3/action/datastore_search_sql"

OUTPUT_DIR = Path("docs/data-inventory/raw")
CHECKPOINT_FILE = OUTPUT_DIR / "_checkpoint.json"
SUMMARY_FILE = OUTPUT_DIR / "_harvest_summary.json"

# Montreal org IDs on Données Québec
MONTREAL_ORGS = [
    "ville-de-montreal",
    "societe-de-transport-de-montreal",
    "agence-de-mobilite-durable",
    "bixi-montreal",
    "regroupement-des-eco-quartiers",
    "communaute-metropolitaine-de-montreal",
]

DELAY_BETWEEN_CALLS = 0.5  # seconds — be respectful
SAMPLE_ROWS = 5            # rows to fetch per resource for examples
PAGE_SIZE = 100            # datasets per search page

# Portal categories (from the screenshot / portal)
CATEGORY_MAP = {
    "agriculture-et-alimentation": {
        "name_fr": "Agriculture et alimentation",
        "name_en": "Agriculture and Food",
        "icon": "farm"
    },
    "economie-et-entreprises": {
        "name_fr": "Économie et entreprises",
        "name_en": "Economy and Business",
        "icon": "briefcase"
    },
    "education-et-recherche": {
        "name_fr": "Éducation et recherche",
        "name_en": "Education and Research",
        "icon": "graduation"
    },
    "environnement-ressources-naturelles-et-energie": {
        "name_fr": "Environnement, ressources naturelles et énergie",
        "name_en": "Environment, Natural Resources and Energy",
        "icon": "leaf"
    },
    "gouvernement-et-finances": {
        "name_fr": "Gouvernement et finances",
        "name_en": "Government and Finance",
        "icon": "landmark"
    },
    "infrastructures": {
        "name_fr": "Infrastructures",
        "name_en": "Infrastructure",
        "icon": "building"
    },
    "loi-justice-et-securite-publique": {
        "name_fr": "Loi, justice et sécurité publique",
        "name_en": "Law, Justice and Public Safety",
        "icon": "shield"
    },
    "politiques-sociales": {
        "name_fr": "Politiques sociales",
        "name_en": "Social Policy",
        "icon": "users"
    },
    "sante": {
        "name_fr": "Santé",
        "name_en": "Health",
        "icon": "heart"
    },
    "societe-et-culture": {
        "name_fr": "Société et culture",
        "name_en": "Society and Culture",
        "icon": "palette"
    },
    "tourisme-sports-et-loisirs": {
        "name_fr": "Tourisme, sports et loisirs",
        "name_en": "Tourism, Sports and Recreation",
        "icon": "trophy"
    },
    "transport": {
        "name_fr": "Transport",
        "name_en": "Transport",
        "icon": "bus"
    },
}


def api_get(url, params=None, retries=3):
    """Make a GET request with retry logic and respectful delays."""
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "MTLPulse-DataHarvest/1.0 (civic data project)"
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                time.sleep(DELAY_BETWEEN_CALLS)
                return data
        except urllib.error.HTTPError as e:
            print(f"  HTTP {e.code} on attempt {attempt+1}/{retries}: {url[:100]}")
            if e.code == 429:  # rate limited
                time.sleep(5 * (attempt + 1))
            elif e.code in (404, 403):
                return None
            else:
                time.sleep(2 * (attempt + 1))
        except (urllib.error.URLError, TimeoutError) as e:
            print(f"  Network error on attempt {attempt+1}/{retries}: {e}")
            time.sleep(3 * (attempt + 1))
    
    print(f"  FAILED after {retries} attempts: {url[:100]}")
    return None


def fetch_all_dataset_slugs():
    """Paginate through package_search to get all Montreal dataset slugs."""
    all_datasets = []
    
    for org in MONTREAL_ORGS:
        offset = 0
        org_count = 0
        
        while True:
            print(f"  Fetching {org} datasets (offset={offset})...")
            result = api_get(CKAN_SEARCH_URL, {
                "q": f"organization:{org}",
                "rows": PAGE_SIZE,
                "start": offset
            })
            
            if not result or not result.get("success"):
                print(f"  Failed to fetch {org} at offset {offset}")
                break
            
            datasets = result["result"]["results"]
            if not datasets:
                break
            
            for ds in datasets:
                all_datasets.append({
                    "slug": ds["name"],
                    "organization": org,
                    "title": ds.get("title", ""),
                })
            
            org_count += len(datasets)
            total = result["result"]["count"]
            offset += PAGE_SIZE
            
            if offset >= total:
                break
        
        print(f"  -> {org}: {org_count} datasets found (API reports {total} total)")
    
    return all_datasets


def fetch_dataset_metadata(slug):
    """Fetch full metadata for a single dataset via package_show."""
    result = api_get(CKAN_SHOW_URL, {"id": slug})
    
    if not result or not result.get("success"):
        return None
    
    pkg = result["result"]
    
    # Extract groups/categories
    groups = []
    for g in pkg.get("groups", []):
        gname = g.get("name", "")
        groups.append({
            "id": gname,
            "display_name": g.get("display_name", gname),
            "mapped": CATEGORY_MAP.get(gname, {})
        })
    
    # Extract resources with their metadata
    resources = []
    for r in pkg.get("resources", []):
        resources.append({
            "id": r.get("id"),
            "name": r.get("name", ""),
            "description": r.get("description", ""),
            "format": r.get("format", "").upper(),
            "url": r.get("url", ""),
            "datastore_active": r.get("datastore_active", False),
            "size": r.get("size"),
            "last_modified": r.get("last_modified"),
            "created": r.get("created"),
        })
    
    # Extract extras (key-value pairs with methodology, etc.)
    extras = {}
    for e in pkg.get("extras", []):
        extras[e.get("key", "")] = e.get("value", "")
    
    return {
        "slug": slug,
        "title": pkg.get("title", ""),
        "notes": pkg.get("notes", ""),  # This is the main description / methodology
        "organization": pkg.get("organization", {}).get("name", ""),
        "organization_title": pkg.get("organization", {}).get("title", ""),
        "groups": groups,
        "license_id": pkg.get("license_id", ""),
        "license_title": pkg.get("license_title", ""),
        "update_frequency": pkg.get("update_frequency", extras.get("update_frequency", "")),
        "temporal_coverage_from": extras.get("temporal_coverage_from", ""),
        "temporal_coverage_to": extras.get("temporal_coverage_to", ""),
        "spatial_coverage": extras.get("spatial_coverage", ""),
        "methodology": extras.get("methodology", ""),
        "metadata_created": pkg.get("metadata_created", ""),
        "metadata_modified": pkg.get("metadata_modified", ""),
        "num_resources": len(resources),
        "resources": resources,
        "extras": extras,
        "tags": [t.get("display_name", "") for t in pkg.get("tags", [])],
    }


def fetch_resource_schema(resource_id):
    """Fetch field schema + sample rows from DataStore for a single resource."""
    result = api_get(DATASTORE_SEARCH_URL, {
        "resource_id": resource_id,
        "limit": SAMPLE_ROWS,
    })
    
    if not result or not result.get("success"):
        return None
    
    ds_result = result["result"]
    
    # Extract field definitions
    fields = []
    for f in ds_result.get("fields", []):
        fields.append({
            "id": f.get("id", ""),
            "type": f.get("type", ""),
            "info": f.get("info", {}),
        })
    
    # Get total record count
    total = ds_result.get("total", 0)
    
    # Sample records
    records = ds_result.get("records", [])
    
    return {
        "resource_id": resource_id,
        "total_records": total,
        "fields": fields,
        "sample_records": records,
    }


def fetch_resource_stats(resource_id, fields):
    """For datastore-active resources, get basic stats via SQL queries.
    
    Fetches: count, distinct values for text fields, min/max for numeric/date fields.
    Only runs for the first 30 non-internal fields to stay efficient.
    """
    stats = {}
    
    # Filter out internal CKAN fields
    user_fields = [f for f in fields if not f["id"].startswith("_")][:30]
    
    # Build a single SQL query that gets NULL counts for all fields
    null_checks = ", ".join([
        f'COUNT(CASE WHEN "{f["id"]}" IS NULL THEN 1 END) AS null_{i}'
        for i, f in enumerate(user_fields)
    ])
    
    if not null_checks:
        return stats
    
    sql = f'SELECT COUNT(*) AS total, {null_checks} FROM "{resource_id}" LIMIT 1'
    result = api_get(DATASTORE_SQL_URL, {"sql": sql})
    
    if result and result.get("success"):
        records = result["result"].get("records", [])
        if records:
            row = records[0]
            total = int(row.get("total", 0))
            for i, f in enumerate(user_fields):
                null_count = int(row.get(f"null_{i}", 0))
                stats[f["id"]] = {
                    "null_count": null_count,
                    "null_pct": round(null_count / total * 100, 1) if total > 0 else 0,
                    "populated_pct": round((total - null_count) / total * 100, 1) if total > 0 else 0,
                }
    
    return stats


def load_checkpoint():
    """Load checkpoint of already-processed datasets."""
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {"processed_slugs": [], "started_at": datetime.now(timezone.utc).isoformat()}


def save_checkpoint(checkpoint):
    """Save checkpoint."""
    with open(CHECKPOINT_FILE, "w", encoding="utf-8") as f:
        json.dump(checkpoint, f, indent=2)


def main():
    resume = "--resume" in sys.argv
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Load or create checkpoint
    if resume:
        checkpoint = load_checkpoint()
        print(f"Resuming from checkpoint ({len(checkpoint['processed_slugs'])} already done)")
    else:
        checkpoint = {"processed_slugs": [], "started_at": datetime.now(timezone.utc).isoformat()}
    
    # === Step 1: Get all dataset slugs ===
    print("=" * 60)
    print("STEP 1: Fetching all dataset slugs from CKAN API")
    print("=" * 60)
    
    all_datasets = fetch_all_dataset_slugs()
    print(f"\nTotal datasets found: {len(all_datasets)}")
    
    # Save the master list
    with open(OUTPUT_DIR / "_all_datasets.json", "w", encoding="utf-8") as f:
        json.dump(all_datasets, f, indent=2, ensure_ascii=False)
    
    # === Step 2: Fetch full metadata + schemas for each dataset ===
    print("\n" + "=" * 60)
    print("STEP 2: Fetching metadata + schemas for each dataset")
    print("=" * 60)
    
    results_by_category = {}
    errors = []
    skipped = 0
    processed = 0
    
    for i, ds in enumerate(all_datasets):
        slug = ds["slug"]
        
        if slug in checkpoint["processed_slugs"]:
            skipped += 1
            continue
        
        print(f"\n[{i+1}/{len(all_datasets)}] {slug}")
        
        # Fetch dataset metadata
        metadata = fetch_dataset_metadata(slug)
        if not metadata:
            errors.append({"slug": slug, "error": "Failed to fetch metadata"})
            print(f"  [FAIL] Failed to fetch metadata")
            continue
        
        print(f"  [OK] Metadata: {metadata['title'][:60]}")
        print(f"    Resources: {metadata['num_resources']}, Groups: {[g['display_name'] for g in metadata['groups']]}")
        
        # For each datastore-active resource, fetch schema + samples
        for j, resource in enumerate(metadata["resources"]):
            if resource["datastore_active"]:
                print(f"    Fetching schema for resource: {resource['name'][:50]} ({resource['format']})...")
                schema = fetch_resource_schema(resource["id"])
                
                if schema:
                    resource["schema"] = schema
                    print(f"      [OK] {len(schema['fields'])} fields, {schema['total_records']} total records")
                    
                    # Fetch null stats (only if dataset has reasonable size)
                    if schema["total_records"] > 0 and schema["total_records"] < 10_000_000:
                        print(f"      Fetching null stats...")
                        stats = fetch_resource_stats(resource["id"], schema["fields"])
                        if stats:
                            resource["field_stats"] = stats
                            print(f"      [OK] Stats for {len(stats)} fields")
                else:
                    print(f"      [FAIL] Failed to fetch schema")
                    resource["schema"] = None
            else:
                resource["schema"] = None
        
        # Categorize by group
        categories = [g["id"] for g in metadata.get("groups", [])]
        if not categories:
            categories = ["uncategorized"]
        
        for cat in categories:
            if cat not in results_by_category:
                results_by_category[cat] = []
            results_by_category[cat].append(metadata)
        
        # Save individual dataset file
        dataset_dir = OUTPUT_DIR / "datasets"
        dataset_dir.mkdir(exist_ok=True)
        with open(dataset_dir / f"{slug}.json", "w", encoding="utf-8") as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        # Update checkpoint
        checkpoint["processed_slugs"].append(slug)
        processed += 1
        
        # Save checkpoint every 10 datasets
        if processed % 10 == 0:
            save_checkpoint(checkpoint)
            print(f"\n  [Checkpoint saved: {len(checkpoint['processed_slugs'])} processed]")
    
    # === Step 3: Save category files ===
    print("\n" + "=" * 60)
    print("STEP 3: Saving category files")
    print("=" * 60)
    
    categories_dir = OUTPUT_DIR / "by-category"
    categories_dir.mkdir(exist_ok=True)
    
    for cat_id, datasets in results_by_category.items():
        cat_info = CATEGORY_MAP.get(cat_id, {"name_fr": cat_id, "name_en": cat_id})
        
        cat_output = {
            "category_id": cat_id,
            "category_name_fr": cat_info.get("name_fr", cat_id),
            "category_name_en": cat_info.get("name_en", cat_id),
            "dataset_count": len(datasets),
            "datasets": datasets
        }
        
        with open(categories_dir / f"{cat_id}.json", "w", encoding="utf-8") as f:
            json.dump(cat_output, f, indent=2, ensure_ascii=False)
        
        print(f"  {cat_info.get('name_fr', cat_id)}: {len(datasets)} datasets")
    
    # === Step 4: Save summary ===
    summary = {
        "harvest_date": datetime.now(timezone.utc).isoformat(),
        "total_datasets": len(all_datasets),
        "datasets_processed": len(checkpoint["processed_slugs"]),
        "datasets_skipped": skipped,
        "errors": len(errors),
        "categories": {
            cat_id: {
                "name_fr": CATEGORY_MAP.get(cat_id, {}).get("name_fr", cat_id),
                "name_en": CATEGORY_MAP.get(cat_id, {}).get("name_en", cat_id),
                "count": len(datasets)
            }
            for cat_id, datasets in results_by_category.items()
        },
        "error_details": errors,
    }
    
    with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    
    # Final checkpoint
    save_checkpoint(checkpoint)
    
    print("\n" + "=" * 60)
    print("HARVEST COMPLETE")
    print("=" * 60)
    print(f"  Total datasets found:     {len(all_datasets)}")
    print(f"  Successfully processed:   {len(checkpoint['processed_slugs'])}")
    print(f"  Errors:                   {len(errors)}")
    print(f"  Categories:               {len(results_by_category)}")
    print(f"  Output directory:         {OUTPUT_DIR}")
    print(f"  Summary:                  {SUMMARY_FILE}")


if __name__ == "__main__":
    main()
