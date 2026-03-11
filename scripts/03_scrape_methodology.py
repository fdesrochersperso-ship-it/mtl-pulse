#!/usr/bin/env python3
"""
MTL Pulse — Scrape Methodology & Metadata from Portal Pages
=============================================================
Pass 3: For each harvested dataset, fetches the portal web page and extracts:
  - Methodology section (warnings, privacy, update method, data dictionary)
  - Territories section
  - Additional info (publisher, temporal coverage, update frequency)
  - Keywords / tags

URL pattern: https://donnees.montreal.ca/dataset/{slug_without_vmtl_prefix}
Fallback:    https://donnees.montreal.ca/{organization}/{slug_without_vmtl_prefix}

Usage:
    python 03_scrape_methodology.py
    python 03_scrape_methodology.py --resume
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

# === Configuration ===
DATASETS_DIR = Path("docs/data-inventory/raw/datasets")
CHECKPOINT_FILE = DATASETS_DIR.parent / "_scrape_checkpoint.json"
SUMMARY_FILE = DATASETS_DIR.parent / "_scrape_summary.json"

BASE_URL = "https://donnees.montreal.ca/dataset"
DELAY_BETWEEN_REQUESTS = 1.0  # seconds
SAVE_EVERY = 50


class HTMLToText(HTMLParser):
    """Simple HTML to text converter that preserves structure."""

    def __init__(self):
        super().__init__()
        self.result = []
        self.current_tag = None
        self.skip_tags = {"script", "style", "nav", "footer", "header"}
        self.skip_depth = 0
        self.in_table = False
        self.table_rows = []
        self.current_row = []
        self.current_cell = []

    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags:
            self.skip_depth += 1
            return
        if self.skip_depth > 0:
            return

        self.current_tag = tag
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            level = int(tag[1])
            self.result.append("\n" + "#" * level + " ")
        elif tag == "p":
            self.result.append("\n\n")
        elif tag == "br":
            self.result.append("\n")
        elif tag == "li":
            self.result.append("\n- ")
        elif tag == "table":
            self.in_table = True
            self.table_rows = []
        elif tag == "tr":
            self.current_row = []
        elif tag in ("td", "th"):
            self.current_cell = []
        elif tag == "strong" or tag == "b":
            self.result.append("**")
        elif tag == "em" or tag == "i":
            self.result.append("_")
        elif tag == "a":
            pass  # handle in data

    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.skip_depth -= 1
            return
        if self.skip_depth > 0:
            return

        if tag in ("strong", "b"):
            self.result.append("**")
        elif tag in ("em", "i"):
            self.result.append("_")
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.result.append("\n")
        elif tag in ("td", "th"):
            self.current_row.append("".join(self.current_cell).strip())
            self.current_cell = []
        elif tag == "tr":
            self.table_rows.append(self.current_row)
        elif tag == "table":
            self.in_table = False
            if self.table_rows:
                self.result.append("\n")
                for i, row in enumerate(self.table_rows):
                    self.result.append("| " + " | ".join(row) + " |\n")
                    if i == 0:
                        self.result.append(
                            "| " + " | ".join(["---"] * len(row)) + " |\n"
                        )
                self.result.append("\n")
            self.table_rows = []

    def handle_data(self, data):
        if self.skip_depth > 0:
            return
        if self.in_table and self.current_cell is not None:
            self.current_cell.append(data)
        else:
            self.result.append(data)

    def get_text(self):
        return "".join(self.result).strip()


def html_to_text(html):
    """Convert HTML string to readable text/markdown."""
    parser = HTMLToText()
    parser.feed(html)
    return parser.get_text()


def fetch_page(url, retries=2):
    """Fetch a web page and return its HTML content."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "MTLPulse-MetadataScraper/1.0 (civic data project)",
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "fr-CA,fr;q=0.9,en;q=0.5",
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                # Check for redirects to error pages
                if resp.status == 200:
                    return resp.read().decode("utf-8", errors="replace")
                return None
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            if attempt < retries - 1:
                time.sleep(2)
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            if attempt < retries - 1:
                time.sleep(2)
    return None


def extract_section(text, start_heading, end_headings):
    """Extract text between a start heading and one of several end headings.

    Uses heading patterns like: ### Heading or ## Heading
    """
    # Try to find the start heading (various heading levels)
    start_pattern = re.compile(
        r"^#{2,4}\s+" + re.escape(start_heading) + r"\s*$",
        re.MULTILINE | re.IGNORECASE
    )
    match = start_pattern.search(text)
    if not match:
        # Try without exact heading level
        start_pattern2 = re.compile(
            re.escape(start_heading), re.IGNORECASE
        )
        match = start_pattern2.search(text)
        if not match:
            return ""

    start_pos = match.end()

    # Find the next heading at the same or higher level
    if end_headings:
        end_patterns = []
        for eh in end_headings:
            end_patterns.append(
                re.compile(
                    r"^#{2,4}\s+" + re.escape(eh) + r"\s*$",
                    re.MULTILINE | re.IGNORECASE
                )
            )

        earliest_end = len(text)
        for ep in end_patterns:
            m = ep.search(text, start_pos)
            if m and m.start() < earliest_end:
                earliest_end = m.start()

        return text[start_pos:earliest_end].strip()
    else:
        return text[start_pos:].strip()


def extract_between_markers(text, start_marker, end_markers):
    """More flexible extraction using simple string matching."""
    lower = text.lower()
    start_idx = lower.find(start_marker.lower())
    if start_idx == -1:
        return ""

    # Move past the marker line
    newline_after = text.find("\n", start_idx)
    if newline_after == -1:
        return ""
    start_pos = newline_after + 1

    # Find earliest end marker
    earliest_end = len(text)
    for em in end_markers:
        idx = lower.find(em.lower(), start_pos)
        if idx != -1 and idx < earliest_end:
            earliest_end = idx

    return text[start_pos:earliest_end].strip()


def parse_additional_info(section_text):
    """Parse the Informations additionnelles section into key-value pairs.

    The portal renders this as whitespace-heavy blocks:
        Key

        Value
    """
    info = {}

    # Clean up excessive whitespace but preserve structure
    # Collapse runs of whitespace-only lines into single newlines
    lines = section_text.split("\n")
    cleaned_lines = []
    prev_blank = False
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if not prev_blank:
                cleaned_lines.append("")
            prev_blank = True
        else:
            cleaned_lines.append(stripped)
            prev_blank = False
    cleaned = "\n".join(cleaned_lines).strip()

    # Known keys from the portal
    known_keys = [
        "Publieur", "Publisher",
        "Couverture temporelle", "Temporal coverage",
        "Date de la publication", "Date published",
        "Date de la dernière modification",
        "Fréquence de mise à jour", "Update frequency",
        "Licence", "License",
        "Source", "Auteur", "Author",
        "Contributeur", "Contributor",
        "Identifiant",
    ]

    # Strategy 1: Look for known keys followed by values
    for key in known_keys:
        pattern = re.compile(
            re.escape(key) + r"\s*\n+\s*(.+?)(?:\n|$)",
            re.IGNORECASE
        )
        match = pattern.search(cleaned)
        if match:
            value = match.group(1).strip()
            if value and value != key:
                info[key] = value

    # Strategy 2: Look for bold key: value patterns
    for match in re.finditer(r"\*\*(.+?)\*\*\s*:?\s*(.+?)(?:\n|$)", section_text):
        key = match.group(1).strip().rstrip(":")
        value = match.group(2).strip()
        if key not in info and value:
            info[key] = value

    # Strategy 3: Try table row patterns: | key | value |
    for match in re.finditer(r"\|\s*(.+?)\s*\|\s*(.+?)\s*\|", section_text):
        key = match.group(1).strip().strip("*")
        value = match.group(2).strip()
        if key and value and key != "---" and not key.startswith("-"):
            if key not in info:
                info[key] = value

    return info


def parse_keywords(section_text):
    """Extract keywords from the Mots-cles section."""
    keywords = []
    # Could be comma-separated, or one per line, or badges
    # Try comma-separated first
    text = section_text.strip()
    if "," in text:
        keywords = [k.strip() for k in text.split(",") if k.strip()]
    elif "\n" in text:
        for line in text.split("\n"):
            line = line.strip().lstrip("- ").strip()
            if line and not line.startswith("#"):
                keywords.append(line)
    elif text:
        keywords = [text]

    return keywords


def scrape_dataset_page(slug, organization):
    """Scrape methodology and metadata from a dataset's portal page.

    Returns a dict with web_metadata, or None if page not found.
    """
    # Remove vmtl- prefix for the URL
    url_slug = slug
    if url_slug.startswith("vmtl-"):
        url_slug = url_slug[5:]

    # Try the direct URL first
    url = f"{BASE_URL}/{url_slug}"
    html = fetch_page(url)

    # If 404, try with organization prefix
    if html is None and organization:
        org = organization
        url = f"https://donnees.montreal.ca/{org}/{url_slug}"
        html = fetch_page(url)

    if html is None:
        return None

    # Convert HTML to text/markdown
    text = html_to_text(html)

    # Define section boundaries
    all_sections = [
        "Ressources", "Fichiers", "Exploration",
        "Dictionnaire de donn", "dictionnaire",
        "Territoires", "Territoire",
        "Mots-cl", "mots cl",
        "Informations additionnelles", "informations",
    ]

    # --- Extract Methodology ---
    # The methodology is typically between "Méthodologie" and "Territoires"
    # (includes sub-sections: Avertissement, Vie privée, Mise à jour, Couverture, Dictionnaire)
    methodology_text = extract_between_markers(
        text,
        "thodologie",  # handles both "Méthodologie" and "Methodologie"
        ["Territoires", "Territoire", "Mots-cl", "Informations additionnelles"]
    )

    # If we didn't find it as a heading, try broader extraction
    if not methodology_text:
        methodology_text = extract_between_markers(
            text,
            "Avertissement",
            ["Territoires", "Territoire", "Mots-cl", "Informations additionnelles"]
        )

    # --- Extract Territories ---
    territories_text = extract_between_markers(
        text,
        "Territoires",
        ["Mots-cl", "Informations additionnelles"]
    )
    if not territories_text:
        territories_text = extract_between_markers(
            text,
            "Territoire",
            ["Mots-cl", "Informations additionnelles"]
        )

    # --- Extract Keywords ---
    keywords_text = extract_between_markers(
        text,
        "Mots-cl",
        ["Informations additionnelles"]
    )
    keywords = parse_keywords(keywords_text)

    # --- Extract Additional Info ---
    additional_info_text = extract_between_markers(
        text,
        "Informations additionnelles",
        []  # last section - go to end
    )
    additional_info = parse_additional_info(additional_info_text)

    # --- Check for data dictionary within methodology ---
    has_data_dictionary = bool(
        re.search(r"dictionnaire\s+de\s+donn", methodology_text, re.IGNORECASE)
        or re.search(r"\|.*\|.*\|", methodology_text)  # table detected
        or "CATEGORIE" in methodology_text
        or "champ" in methodology_text.lower()
    )

    return {
        "methodology_text": methodology_text,
        "territories": territories_text,
        "additional_info": additional_info,
        "keywords": keywords,
        "has_data_dictionary": has_data_dictionary,
        "scrape_url": url,
        "scraped_at": datetime.now(timezone.utc).isoformat(),
    }


def load_checkpoint():
    """Load checkpoint of already-scraped datasets."""
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {"scraped_slugs": [], "started_at": datetime.now(timezone.utc).isoformat()}


def save_checkpoint(checkpoint):
    """Save checkpoint."""
    with open(CHECKPOINT_FILE, "w", encoding="utf-8") as f:
        json.dump(checkpoint, f, indent=2)


def main():
    resume = "--resume" in sys.argv

    if not DATASETS_DIR.exists():
        print(f"ERROR: Dataset files not found at {DATASETS_DIR}")
        print("Run 01_harvest_all_datasets.py first.")
        sys.exit(1)

    # Load checkpoint
    if resume:
        checkpoint = load_checkpoint()
        print(f"Resuming from checkpoint ({len(checkpoint['scraped_slugs'])} already done)")
    else:
        checkpoint = {
            "scraped_slugs": [],
            "started_at": datetime.now(timezone.utc).isoformat(),
        }

    # Get all dataset files
    dataset_files = sorted(DATASETS_DIR.glob("*.json"))
    total = len(dataset_files)

    print("=" * 60)
    print(f"SCRAPING METHODOLOGY FROM PORTAL PAGES ({total} datasets)")
    print("=" * 60)

    # Stats
    stats = {
        "total": total,
        "scraped": 0,
        "skipped": 0,
        "not_found": 0,
        "has_methodology": 0,
        "has_data_dictionary": 0,
        "has_territories": 0,
        "has_additional_info": 0,
        "has_keywords": 0,
        "errors": [],
    }

    for i, filepath in enumerate(dataset_files):
        slug = filepath.stem  # e.g., "vmtl-actes-criminels"

        # Skip if already done
        if slug in checkpoint["scraped_slugs"]:
            stats["skipped"] += 1
            continue

        # Load dataset JSON
        with open(filepath, encoding="utf-8") as f:
            dataset = json.load(f)

        organization = dataset.get("organization", "ville-de-montreal")
        display_slug = slug[5:] if slug.startswith("vmtl-") else slug

        # Scrape the page
        web_metadata = scrape_dataset_page(slug, organization)

        if web_metadata is None:
            stats["not_found"] += 1
            print(f"  [{i+1}/{total}] {display_slug} -- 404 NOT FOUND")
            dataset["web_metadata"] = {
                "methodology_text": "",
                "territories": "",
                "additional_info": {},
                "keywords": [],
                "has_data_dictionary": False,
                "scrape_url": "",
                "scraped_at": datetime.now(timezone.utc).isoformat(),
                "status": "404",
            }
        else:
            stats["scraped"] += 1
            if web_metadata["methodology_text"]:
                stats["has_methodology"] += 1
            if web_metadata["has_data_dictionary"]:
                stats["has_data_dictionary"] += 1
            if web_metadata["territories"]:
                stats["has_territories"] += 1
            if web_metadata["additional_info"]:
                stats["has_additional_info"] += 1
            if web_metadata["keywords"]:
                stats["has_keywords"] += 1

            dataset["web_metadata"] = web_metadata

            meth_len = len(web_metadata["methodology_text"])
            dict_flag = " [+dict]" if web_metadata["has_data_dictionary"] else ""
            kw_count = len(web_metadata["keywords"])
            print(
                f"  [{i+1}/{total}] {display_slug} -- "
                f"OK (meth: {meth_len} chars{dict_flag}, "
                f"kw: {kw_count})"
            )

        # Save updated JSON
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(dataset, f, indent=2, ensure_ascii=False)

        # Update checkpoint
        checkpoint["scraped_slugs"].append(slug)

        # Save checkpoint periodically
        if len(checkpoint["scraped_slugs"]) % SAVE_EVERY == 0:
            save_checkpoint(checkpoint)
            print(f"\n  [Checkpoint saved: {len(checkpoint['scraped_slugs'])} scraped]\n")

        # Respectful delay
        time.sleep(DELAY_BETWEEN_REQUESTS)

    # Final save
    save_checkpoint(checkpoint)

    # Generate summary
    stats["completed_at"] = datetime.now(timezone.utc).isoformat()
    with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 60)
    print("SCRAPE COMPLETE")
    print("=" * 60)
    print(f"  Total datasets:          {stats['total']}")
    print(f"  Successfully scraped:    {stats['scraped']}")
    print(f"  Skipped (resume):        {stats['skipped']}")
    print(f"  404 not found:           {stats['not_found']}")
    print(f"  Has methodology:         {stats['has_methodology']}")
    print(f"  Has data dictionary:     {stats['has_data_dictionary']}")
    print(f"  Has territories:         {stats['has_territories']}")
    print(f"  Has additional info:     {stats['has_additional_info']}")
    print(f"  Has keywords:            {stats['has_keywords']}")


if __name__ == "__main__":
    main()
