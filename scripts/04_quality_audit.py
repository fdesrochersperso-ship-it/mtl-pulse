#!/usr/bin/env python3
"""
MTL Pulse - Quality Audit of DataStore Resources
=================================================
Pass 4: For each datastore-active resource, fetches 1000 rows and computes
per-field quality stats: null rates, value distributions, numeric ranges,
date ranges, and geo-coordinate validation.

Usage:
    python 04_quality_audit.py
    python 04_quality_audit.py --resume
"""

import json
import math
import os
import re
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime, timezone
from pathlib import Path
from collections import Counter

# === Configuration ===
DATASETS_DIR = Path("docs/data-inventory/raw/datasets")
CHECKPOINT_FILE = DATASETS_DIR.parent / "_audit_checkpoint.json"
SUMMARY_FILE = DATASETS_DIR.parent / "_audit_summary.json"
DATASTORE_URL = "https://data.montreal.ca/api/3/action/datastore_search"
DELAY = 0.5
SAMPLE_LIMIT = 1000
SAVE_EVERY = 25

# Montreal bounding box
MTL_LAT_MIN, MTL_LAT_MAX = 45.4, 45.7
MTL_LNG_MIN, MTL_LNG_MAX = -73.9, -73.4

NULL_SENTINELS = {None, "", "N/A", "n/a", "NA", "na", "null", "NULL", "None", "none", " "}

DATE_PATTERNS = [
    (re.compile(r"^\d{4}-\d{2}-\d{2}T"), "YYYY-MM-DDThh:mm:ss"),
    (re.compile(r"^\d{4}-\d{2}-\d{2}$"), "YYYY-MM-DD"),
    (re.compile(r"^\d{2}/\d{2}/\d{4}$"), "DD/MM/YYYY"),
    (re.compile(r"^\d{4}/\d{2}/\d{2}$"), "YYYY/MM/DD"),
    (re.compile(r"^\d{2}-\d{2}-\d{4}$"), "DD-MM-YYYY"),
]

LAT_FIELD_NAMES = {"latitude", "lat", "y", "coord_y", "lat_wgs84"}
LNG_FIELD_NAMES = {"longitude", "lng", "lon", "long", "x", "coord_x", "lng_wgs84", "lon_wgs84"}
DATE_FIELD_HINTS = {"date", "time", "timestamp", "datetime", "dt", "jour", "annee",
                    "mois", "created", "modified", "updated", "debut", "fin"}


def api_get(url, params=None, retries=3):
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "MTLPulse-QualityAudit/1.0 (civic data project)"
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                time.sleep(DELAY)
                return data
        except urllib.error.HTTPError as e:
            if e.code in (404, 403):
                return None
            if e.code == 429:
                time.sleep(5 * (attempt + 1))
            else:
                time.sleep(2 * (attempt + 1))
        except (urllib.error.URLError, TimeoutError, OSError):
            time.sleep(3 * (attempt + 1))
    return None


def is_null(value):
    if value is None:
        return True
    s = str(value).strip()
    return s in NULL_SENTINELS


def try_float(value):
    try:
        v = float(value)
        if math.isnan(v) or math.isinf(v):
            return None
        return v
    except (ValueError, TypeError):
        return None


def detect_date_format(values):
    for v in values[:20]:
        s = str(v).strip()
        for pat, fmt in DATE_PATTERNS:
            if pat.match(s):
                return fmt
    return None


def is_date_field(field_id, field_type, sample_values):
    fid_lower = field_id.lower()
    if any(hint in fid_lower for hint in DATE_FIELD_HINTS):
        return True
    if field_type in ("timestamp", "timestamptz", "date"):
        return True
    fmt = detect_date_format(sample_values)
    return fmt is not None


def is_geo_lat(field_id):
    return field_id.lower() in LAT_FIELD_NAMES


def is_geo_lng(field_id):
    return field_id.lower() in LNG_FIELD_NAMES


def audit_field(field_id, field_type, records):
    """Compute quality stats for a single field from sample records."""
    values = [r.get(field_id) for r in records]
    n = len(values)
    if n == 0:
        return {"null_count": 0, "null_pct": 0, "field_type_detected": "empty"}

    # Null analysis
    null_count = sum(1 for v in values if is_null(v))
    null_pct = round(null_count / n * 100, 1) if n > 0 else 0

    result = {
        "null_count": null_count,
        "null_pct": null_pct,
    }

    non_null = [v for v in values if not is_null(v)]
    non_null_str = [str(v).strip() for v in non_null]

    if not non_null:
        result["field_type_detected"] = "all_null"
        return result

    # Detect field type and compute type-specific stats
    fid_lower = field_id.lower()

    # Check geo coordinates first
    if is_geo_lat(field_id):
        nums = [try_float(v) for v in non_null]
        nums = [v for v in nums if v is not None]
        if nums:
            in_bbox = sum(1 for v in nums if MTL_LAT_MIN <= v <= MTL_LAT_MAX)
            result.update({
                "min": round(min(nums), 6),
                "max": round(max(nums), 6),
                "mean": round(sum(nums) / len(nums), 6),
                "pct_in_montreal_bbox": round(in_bbox / len(nums) * 100, 1),
                "field_type_detected": "geo_latitude",
            })
            return result

    if is_geo_lng(field_id):
        nums = [try_float(v) for v in non_null]
        nums = [v for v in nums if v is not None]
        if nums:
            in_bbox = sum(1 for v in nums if MTL_LNG_MIN <= v <= MTL_LNG_MAX)
            result.update({
                "min": round(min(nums), 6),
                "max": round(max(nums), 6),
                "mean": round(sum(nums) / len(nums), 6),
                "pct_in_montreal_bbox": round(in_bbox / len(nums) * 100, 1),
                "field_type_detected": "geo_longitude",
            })
            return result

    # Check date fields
    if is_date_field(field_id, field_type, non_null_str):
        fmt = detect_date_format(non_null_str)
        date_strs = sorted(non_null_str)
        result.update({
            "min_date": date_strs[0] if date_strs else None,
            "max_date": date_strs[-1] if date_strs else None,
            "date_format": fmt or "unknown",
            "field_type_detected": "date",
        })
        return result

    # Check numeric fields
    nums = [try_float(v) for v in non_null]
    nums_valid = [v for v in nums if v is not None]

    if len(nums_valid) > len(non_null) * 0.8:
        # Predominantly numeric
        sorted_nums = sorted(nums_valid)
        mid = len(sorted_nums) // 2
        median = sorted_nums[mid] if len(sorted_nums) % 2 == 1 else (
            (sorted_nums[mid - 1] + sorted_nums[mid]) / 2
        )
        unique_count = len(set(nums_valid))
        result.update({
            "min": round(min(sorted_nums), 4),
            "max": round(max(sorted_nums), 4),
            "mean": round(sum(sorted_nums) / len(sorted_nums), 4),
            "median": round(median, 4),
            "unique_count": unique_count,
            "field_type_detected": "numeric",
        })
        # If few unique values, add top values
        if unique_count <= 30:
            counter = Counter(str(v) for v in non_null)
            top = counter.most_common(10)
            result["top_values"] = [{"value": v, "count": c} for v, c in top]
        return result

    # Text / categorical field
    counter = Counter(non_null_str)
    unique_count = len(counter)
    top = counter.most_common(10)

    result.update({
        "unique_count": unique_count,
        "top_values": [{"value": v, "count": c} for v, c in top],
    })

    if unique_count <= 20 and n > 10:
        result["field_type_detected"] = "category"
    elif unique_count > n * 0.9:
        result["field_type_detected"] = "identifier"
    else:
        result["field_type_detected"] = "text"

    return result


def audit_resource(resource_id, fields):
    """Fetch sample data and audit all fields for a single resource."""
    result = api_get(DATASTORE_URL, {
        "resource_id": resource_id,
        "limit": SAMPLE_LIMIT,
    })

    if not result or not result.get("success"):
        return None

    ds = result["result"]
    records = ds.get("records", [])
    total_records = ds.get("total", 0)
    sample_size = len(records)

    if sample_size == 0:
        return {
            "sample_size": 0,
            "total_records": total_records,
            "audited_at": datetime.now(timezone.utc).isoformat(),
            "fields": {},
        }

    # Build field type map from schema
    field_types = {}
    for f in fields:
        fid = f.get("id", "")
        if not fid.startswith("_"):
            field_types[fid] = f.get("type", "text")

    # Audit each field
    field_audits = {}
    for fid, ftype in field_types.items():
        field_audits[fid] = audit_field(fid, ftype, records)

    return {
        "sample_size": sample_size,
        "total_records": total_records,
        "audited_at": datetime.now(timezone.utc).isoformat(),
        "fields": field_audits,
    }


def load_checkpoint():
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {"audited_slugs": [], "started_at": datetime.now(timezone.utc).isoformat()}


def save_checkpoint(checkpoint):
    with open(CHECKPOINT_FILE, "w", encoding="utf-8") as f:
        json.dump(checkpoint, f, indent=2)


def main():
    resume = "--resume" in sys.argv

    if not DATASETS_DIR.exists():
        print(f"ERROR: {DATASETS_DIR} not found")
        sys.exit(1)

    checkpoint = load_checkpoint() if resume else {
        "audited_slugs": [],
        "started_at": datetime.now(timezone.utc).isoformat(),
    }

    if resume:
        print(f"Resuming ({len(checkpoint['audited_slugs'])} already done)")

    # Collect datasets that have datastore-active resources
    dataset_files = sorted(DATASETS_DIR.glob("*.json"))
    eligible = []
    for fp in dataset_files:
        with open(fp, encoding="utf-8") as f:
            d = json.load(f)
        has_active = any(
            r.get("datastore_active") and r.get("schema") and r["schema"].get("fields")
            for r in d.get("resources", [])
        )
        if has_active:
            eligible.append(fp)

    total = len(eligible)
    print("=" * 60)
    print(f"QUALITY AUDIT: {total} datasets with datastore resources")
    print("=" * 60)

    # Global stats
    stats = {
        "datasets_audited": 0,
        "resources_audited": 0,
        "total_fields_analyzed": 0,
        "field_types": Counter(),
        "datasets_skipped": 0,
        "api_errors": 0,
        "high_null_fields": [],  # fields with >50% null
    }

    processed_count = 0

    for i, filepath in enumerate(eligible):
        slug = filepath.stem

        if slug in checkpoint["audited_slugs"]:
            stats["datasets_skipped"] += 1
            continue

        with open(filepath, encoding="utf-8") as f:
            dataset = json.load(f)

        display = slug[5:] if slug.startswith("vmtl-") else slug
        ds_resources_audited = 0

        for r in dataset.get("resources", []):
            if not (r.get("datastore_active") and r.get("schema") and r["schema"].get("fields")):
                continue

            resource_id = r["id"]
            rname = r.get("name", "?")[:40]
            rformat = r.get("format", "?")
            fields = r["schema"]["fields"]
            user_fields = [f for f in fields if not f["id"].startswith("_")]

            audit = audit_resource(resource_id, fields)

            if audit is None:
                stats["api_errors"] += 1
                print(f"  [{i+1}/{total}] {display} ({rformat}) -- API ERROR")
                r["quality_audit"] = None
                continue

            r["quality_audit"] = audit

            n_fields = len(audit["fields"])
            stats["resources_audited"] += 1
            stats["total_fields_analyzed"] += n_fields
            ds_resources_audited += 1

            for fid, fa in audit["fields"].items():
                ftype = fa.get("field_type_detected", "unknown")
                stats["field_types"][ftype] += 1
                if fa.get("null_pct", 0) > 50:
                    stats["high_null_fields"].append({
                        "dataset": slug,
                        "resource": rname,
                        "field": fid,
                        "null_pct": fa["null_pct"],
                    })

            print(
                f"  [{i+1}/{total}] {display} ({rformat}) - "
                f"{n_fields} fields, {audit['sample_size']} rows OK"
            )

        if ds_resources_audited > 0:
            stats["datasets_audited"] += 1

        # Save updated dataset JSON
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(dataset, f, indent=2, ensure_ascii=False)

        checkpoint["audited_slugs"].append(slug)
        processed_count += 1

        if processed_count % SAVE_EVERY == 0:
            save_checkpoint(checkpoint)
            print(f"\n  [Checkpoint saved: {len(checkpoint['audited_slugs'])} audited]\n")

    save_checkpoint(checkpoint)

    # Generate summary
    summary = {
        "completed_at": datetime.now(timezone.utc).isoformat(),
        "datasets_audited": stats["datasets_audited"],
        "datasets_skipped": stats["datasets_skipped"],
        "resources_audited": stats["resources_audited"],
        "total_fields_analyzed": stats["total_fields_analyzed"],
        "api_errors": stats["api_errors"],
        "field_type_breakdown": dict(stats["field_types"].most_common()),
        "high_null_field_count": len(stats["high_null_fields"]),
        "high_null_fields_sample": stats["high_null_fields"][:50],
    }

    with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 60)
    print("AUDIT COMPLETE")
    print("=" * 60)
    print(f"  Datasets audited:        {stats['datasets_audited']}")
    print(f"  Resources audited:       {stats['resources_audited']}")
    print(f"  Total fields analyzed:   {stats['total_fields_analyzed']}")
    print(f"  API errors:              {stats['api_errors']}")
    print(f"  Fields >50% null:        {len(stats['high_null_fields'])}")
    print(f"\n  Field type breakdown:")
    for ftype, count in stats["field_types"].most_common():
        print(f"    {ftype:20s}: {count}")
    print(f"\n  Summary saved to: {SUMMARY_FILE}")


if __name__ == "__main__":
    main()
