#!/usr/bin/env python3
"""
MTL Pulse - Semantic Layer Generator
=====================================
Pass 5: Reads all enriched dataset JSON files and generates a comprehensive
semantic layer document per category (JSON + Markdown), plus a master summary.

Usage:
    python 05_generate_semantic_layer.py
"""

import json
import os
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

# === Paths ===
DATASETS_DIR = Path("docs/data-inventory/raw/datasets")
CATEGORIES_DIR = Path("docs/data-inventory/raw/by-category")
OUTPUT_DIR = Path("docs/data-inventory/semantic-layer")

CATEGORIES = [
    ("agriculture-alimentation", "01", "Agriculture et alimentation", "Agriculture and Food"),
    ("economie-entreprises", "02", "Economie et entreprises", "Economy and Business"),
    ("education-recherche", "03", "Education et recherche", "Education and Research"),
    ("environnement-ressources-naturelles-energie", "04", "Environnement, ressources naturelles et energie", "Environment, Natural Resources and Energy"),
    ("gouvernement-finances", "05", "Gouvernement et finances", "Government and Finance"),
    ("infrastructures", "06", "Infrastructures", "Infrastructure"),
    ("loi-justice-securite-publique", "07", "Loi, justice et securite publique", "Law, Justice and Public Safety"),
    ("politiques-sociales", "08", "Politiques sociales", "Social Policy"),
    ("sante", "09", "Sante", "Health"),
    ("societe-culture", "10", "Societe et culture", "Society and Culture"),
    ("tourisme-sports-loisirs", "11", "Tourisme, sports et loisirs", "Tourism, Sports and Recreation"),
    ("transport", "12", "Transport", "Transport"),
    ("uncategorized", "13", "Non categorise", "Uncategorized"),
]

# ===========================================================================
# Translation dictionaries
# ===========================================================================

# Common field name fragments -> (French label, English label)
FIELD_TRANSLATIONS = {
    # Identifiers
    "id": ("Identifiant", "Identifier"),
    "code": ("Code", "Code"),
    "slug": ("Identifiant textuel", "Text identifier"),
    "nom": ("Nom", "Name"),
    "name": ("Nom", "Name"),
    "titre": ("Titre", "Title"),
    "title": ("Titre", "Title"),
    "numero": ("Numero", "Number"),
    "no": ("Numero", "Number"),
    "num": ("Numero", "Number"),
    # Dates
    "date": ("Date", "Date"),
    "annee": ("Annee", "Year"),
    "year": ("Annee", "Year"),
    "mois": ("Mois", "Month"),
    "month": ("Mois", "Month"),
    "jour": ("Jour", "Day"),
    "day": ("Jour", "Day"),
    "heure": ("Heure", "Hour"),
    "hour": ("Heure", "Hour"),
    "debut": ("Date de debut", "Start date"),
    "fin": ("Date de fin", "End date"),
    "start": ("Debut", "Start"),
    "end": ("Fin", "End"),
    "created": ("Date de creation", "Creation date"),
    "modified": ("Date de modification", "Modification date"),
    "updated": ("Date de mise a jour", "Update date"),
    "timestamp": ("Horodatage", "Timestamp"),
    "quart": ("Quart de travail", "Work shift"),
    "saison": ("Saison", "Season"),
    "periode": ("Periode", "Period"),
    # Geography
    "latitude": ("Latitude", "Latitude"),
    "lat": ("Latitude", "Latitude"),
    "longitude": ("Longitude", "Longitude"),
    "lng": ("Longitude", "Longitude"),
    "lon": ("Longitude", "Longitude"),
    "long": ("Longitude", "Longitude"),
    "x": ("Coordonnee X (MTM)", "X coordinate (MTM)"),
    "y": ("Coordonnee Y (MTM)", "Y coordinate (MTM)"),
    "arrondissement": ("Arrondissement", "Borough"),
    "arr": ("Arrondissement", "Borough"),
    "borough": ("Arrondissement", "Borough"),
    "quartier": ("Quartier", "Neighbourhood"),
    "ville": ("Ville", "City"),
    "adresse": ("Adresse", "Address"),
    "address": ("Adresse", "Address"),
    "rue": ("Rue", "Street"),
    "street": ("Rue", "Street"),
    "code_postal": ("Code postal", "Postal code"),
    "pdq": ("Poste de quartier (SPVM)", "Police district"),
    "secteur": ("Secteur", "Sector"),
    "territoire": ("Territoire", "Territory"),
    "localisation": ("Localisation", "Location"),
    "location": ("Localisation", "Location"),
    "province": ("Province", "Province"),
    "pays": ("Pays", "Country"),
    "intersection": ("Intersection", "Intersection"),
    "civique": ("Numero civique", "Civic number"),
    "coord": ("Coordonnees", "Coordinates"),
    "geometry": ("Geometrie", "Geometry"),
    "geom": ("Geometrie", "Geometry"),
    # Categories
    "categorie": ("Categorie", "Category"),
    "category": ("Categorie", "Category"),
    "type": ("Type", "Type"),
    "statut": ("Statut", "Status"),
    "status": ("Statut", "Status"),
    "etat": ("Etat", "State"),
    "nature": ("Nature", "Nature"),
    "classe": ("Classe", "Class"),
    "classification": ("Classification", "Classification"),
    "genre": ("Genre", "Genre"),
    "format": ("Format", "Format"),
    "priorite": ("Priorite", "Priority"),
    "niveau": ("Niveau", "Level"),
    "groupe": ("Groupe", "Group"),
    "sous_type": ("Sous-type", "Subtype"),
    "sous_categorie": ("Sous-categorie", "Subcategory"),
    # Measures
    "montant": ("Montant", "Amount"),
    "amount": ("Montant", "Amount"),
    "prix": ("Prix", "Price"),
    "cout": ("Cout", "Cost"),
    "valeur": ("Valeur", "Value"),
    "value": ("Valeur", "Value"),
    "total": ("Total", "Total"),
    "nombre": ("Nombre", "Count"),
    "count": ("Nombre", "Count"),
    "nb": ("Nombre", "Count"),
    "quantite": ("Quantite", "Quantity"),
    "qty": ("Quantite", "Quantity"),
    "superficie": ("Superficie", "Area"),
    "surface": ("Surface", "Surface area"),
    "longueur": ("Longueur", "Length"),
    "largeur": ("Largeur", "Width"),
    "hauteur": ("Hauteur", "Height"),
    "poids": ("Poids", "Weight"),
    "taux": ("Taux", "Rate"),
    "pourcentage": ("Pourcentage", "Percentage"),
    "pct": ("Pourcentage", "Percentage"),
    "duree": ("Duree", "Duration"),
    "distance": ("Distance", "Distance"),
    "volume": ("Volume", "Volume"),
    "budget": ("Budget", "Budget"),
    "depense": ("Depense", "Expenditure"),
    "revenu": ("Revenu", "Revenue"),
    "population": ("Population", "Population"),
    "score": ("Score", "Score"),
    "indice": ("Indice", "Index"),
    "index": ("Indice", "Index"),
    "ratio": ("Ratio", "Ratio"),
    "moyenne": ("Moyenne", "Average"),
    "median": ("Mediane", "Median"),
    "somme": ("Somme", "Sum"),
    "temperature": ("Temperature", "Temperature"),
    "vitesse": ("Vitesse", "Speed"),
    "capacite": ("Capacite", "Capacity"),
    "concentration": ("Concentration", "Concentration"),
    # Municipal
    "permis": ("Permis", "Permit"),
    "contrat": ("Contrat", "Contract"),
    "requete": ("Requete", "Request"),
    "demande": ("Demande", "Request"),
    "intervention": ("Intervention", "Intervention"),
    "inspection": ("Inspection", "Inspection"),
    "infraction": ("Infraction", "Violation"),
    "incident": ("Incident", "Incident"),
    "evenement": ("Evenement", "Event"),
    "projet": ("Projet", "Project"),
    "programme": ("Programme", "Program"),
    "service": ("Service", "Service"),
    "organisme": ("Organisme", "Organization"),
    "fournisseur": ("Fournisseur", "Supplier"),
    "description": ("Description", "Description"),
    "commentaire": ("Commentaire", "Comment"),
    "note": ("Note", "Note"),
    "remarque": ("Remarque", "Remark"),
    "url": ("URL", "URL"),
    "lien": ("Lien", "Link"),
    "source": ("Source", "Source"),
    "reference": ("Reference", "Reference"),
    "image": ("Image", "Image"),
    "photo": ("Photo", "Photo"),
    "document": ("Document", "Document"),
    "fichier": ("Fichier", "File"),
    "piece": ("Piece jointe", "Attachment"),
    "licence": ("Licence", "License"),
    "proprietaire": ("Proprietaire", "Owner"),
    "responsable": ("Responsable", "Manager"),
    "operateur": ("Operateur", "Operator"),
    "direction": ("Direction", "Direction/Department"),
    "unite": ("Unite", "Unit"),
    "division": ("Division", "Division"),
}

# Title-level translations
TITLE_WORD_MAP = {
    "actes": "acts", "criminels": "criminal", "criminel": "criminal",
    "requete": "request", "requetes": "requests", "demandes": "requests",
    "inspection": "inspection", "inspections": "inspections",
    "aliments": "food", "alimentaires": "food",
    "arbres": "trees", "arbre": "tree",
    "publics": "public", "publiques": "public", "public": "public",
    "ville": "city", "villes": "cities",
    "montreal": "Montreal",
    "donnees": "data", "ouvertes": "open",
    "compteurs": "counters", "cyclistes": "cyclists",
    "permis": "permits", "construction": "construction",
    "interventions": "interventions", "incendie": "fire",
    "securite": "safety", "police": "police",
    "transport": "transport", "circulation": "traffic",
    "eau": "water", "potable": "drinking",
    "qualite": "quality", "air": "air",
    "environnement": "environment",
    "budget": "budget", "contrats": "contracts", "contrat": "contract",
    "subventions": "grants", "subvention": "grant",
    "logement": "housing", "logements": "housing",
    "emploi": "employment", "emplois": "jobs",
    "stationnement": "parking",
    "neige": "snow", "deneigement": "snow removal",
    "signalisation": "signage", "routiere": "road",
    "travaux": "works", "chantier": "construction site",
    "patrimoine": "heritage", "culture": "culture", "culturels": "cultural",
    "elections": "elections", "elus": "elected officials",
    "reglements": "bylaws", "municipal": "municipal", "municipaux": "municipal",
    "parc": "park", "parcs": "parks",
    "piscines": "pools", "patinoires": "skating rinks",
    "bibliotheques": "libraries",
    "collectes": "collection", "matieres": "materials", "residuelles": "residual",
    "bornes": "stations", "recharge": "charging",
    "ruelles": "laneways", "vertes": "green",
    "evenements": "events",
    "installations": "facilities", "sportives": "sports",
    "geolocalisation": "geolocation",
    "indicateurs": "indicators", "performance": "performance",
    "sondage": "survey", "satisfaction": "satisfaction",
    "resultats": "results",
    "historique": "historical",
    "bilan": "report", "bilans": "reports",
    "liste": "list", "repertoire": "directory",
    "carte": "map", "cartes": "maps",
    "limite": "boundary", "limites": "boundaries",
    "schema": "schema",
    "reseau": "network", "reseaux": "networks",
    "pistes": "paths", "cyclables": "cycling",
    "trottoir": "sidewalk", "trottoirs": "sidewalks",
    "chaussee": "roadway", "chaussees": "roadways",
    "voirie": "road infrastructure",
    "pont": "bridge", "ponts": "bridges",
    "tunnel": "tunnel", "tunnels": "tunnels",
    "feux": "signals", "pietons": "pedestrians",
    "vitesse": "speed",
    "accident": "accident", "accidents": "accidents",
    "collision": "collision", "collisions": "collisions",
    "remorquage": "towing", "remorquages": "towings",
    "pothole": "pothole",
    "nid": "pothole", "poule": "",
    "refection": "resurfacing",
    "reparation": "repair", "reparations": "repairs",
    "conduite": "pipe", "conduites": "pipes",
    "egout": "sewer", "egouts": "sewers",
    "aqueduc": "aqueduct",
    "station": "station", "stations": "stations",
    "epuration": "treatment",
    "debordement": "overflow", "debordements": "overflows",
    "deversement": "discharge",
    "fleuve": "river",
    "lac": "lake", "lacs": "lakes",
    "ruisseau": "stream", "ruisseaux": "streams",
    "berge": "bank", "berges": "banks", "rive": "shore",
    "annuaire": "directory",
    "statistiques": "statistics",
    "frequentation": "attendance",
    "population": "population",
    "recensement": "census",
    "portrait": "profile",
    "immigration": "immigration",
    "pauvrete": "poverty",
    "enfants": "children",
    "jeunes": "youth",
    "aines": "seniors",
    "handicap": "disability",
    "communaute": "community",
    "diversite": "diversity",
    "inclusion": "inclusion",
    "equite": "equity",
}

FREQ_MAP = {
    "quotidien": "daily", "daily": "daily",
    "hebdomadaire": "weekly", "weekly": "weekly",
    "mensuel": "monthly", "monthly": "monthly",
    "trimestriel": "quarterly", "quarterly": "quarterly",
    "semestriel": "biannual",
    "annuel": "annual", "annual": "annual", "yearly": "annual",
    "au besoin": "as needed", "as needed": "as needed",
    "irregulier": "irregular", "irregular": "irregular",
    "temps reel": "real-time", "real-time": "real-time",
    "en continu": "continuous", "continuous": "continuous",
    "historique": "historical", "historical": "historical",
    "non specifie": "unspecified", "": "unspecified",
}


def translate_title(title_fr):
    """Best-effort translation of a French dataset title."""
    if not title_fr:
        return title_fr
    words = re.split(r"[\s\-']+", title_fr.lower())
    en_words = []
    for w in words:
        clean = re.sub(r"[^a-z0-9]", "", w)
        if clean in TITLE_WORD_MAP:
            mapped = TITLE_WORD_MAP[clean]
            if mapped:
                en_words.append(mapped)
        elif clean:
            en_words.append(clean.capitalize())
    result = " ".join(en_words)
    if not result:
        return title_fr
    return result[0].upper() + result[1:]


def translate_field_name(raw_name):
    """Translate a raw field name to (French label, English label)."""
    lower = raw_name.lower().replace("-", "_")

    # Direct match
    if lower in FIELD_TRANSLATIONS:
        return FIELD_TRANSLATIONS[lower]

    # Try matching longest suffix/prefix
    best_fr, best_en = raw_name, raw_name
    best_len = 0
    for key, (fr, en) in FIELD_TRANSLATIONS.items():
        if key in lower and len(key) > best_len:
            best_fr, best_en = fr, en
            best_len = len(key)

    if best_len > 0:
        return (best_fr, best_en)

    # Fallback: humanize the raw name
    humanized = raw_name.replace("_", " ").replace("-", " ").strip()
    return (humanized, humanized)


def translate_field_name_simple(raw_name):
    """Simplified field name translation."""
    lower = raw_name.lower().replace("-", "_").replace(" ", "_")

    # Direct match
    if lower in FIELD_TRANSLATIONS:
        return FIELD_TRANSLATIONS[lower]

    # Find best matching fragment
    best_fr, best_en = None, None
    best_len = 0
    for key, (fr, en) in FIELD_TRANSLATIONS.items():
        if key in lower and len(key) > best_len:
            best_fr, best_en = fr, en
            best_len = len(key)

    if best_fr:
        return (best_fr, best_en)

    # Fallback: humanize
    humanized = raw_name.replace("_", " ").replace("-", " ").strip().title()
    return (humanized, humanized)


def normalize_frequency(freq_str):
    """Normalize update frequency to English."""
    if not freq_str:
        return "unspecified"
    lower = freq_str.lower().strip()
    for fr, en in FREQ_MAP.items():
        if fr and fr in lower:
            return en
    return freq_str


def compute_quality_grade(fields_audit, has_dictionary, freq):
    """Compute A-F quality grade for a dataset."""
    if not fields_audit:
        return "F"

    total_fields = len(fields_audit)
    if total_fields == 0:
        return "F"

    low_null = sum(1 for f in fields_audit.values() if f.get("null_pct", 100) < 10)
    low_null_pct = low_null / total_fields

    is_updated = freq in ("daily", "weekly", "monthly", "quarterly", "real-time", "continuous")

    if low_null_pct > 0.8 and has_dictionary and is_updated:
        return "A"
    elif low_null_pct > 0.8 and has_dictionary:
        return "A"
    elif low_null_pct > 0.6 and (has_dictionary or is_updated):
        return "B"
    elif low_null_pct > 0.6:
        return "B"
    elif low_null_pct > 0.3:
        return "C"
    elif low_null_pct > 0.1:
        return "D"
    else:
        return "F"


def field_quality(null_pct):
    if null_pct is None:
        return "unknown"
    if null_pct < 10:
        return "good"
    elif null_pct < 50:
        return "usable"
    elif null_pct < 90:
        return "poor"
    else:
        return "empty"


def field_role(raw_name, detected_type, null_pct, unique_count=None, total_sample=None):
    """Determine report builder role for a field."""
    lower = raw_name.lower()

    # Exclude internal/empty fields
    if lower.startswith("_") or null_pct >= 90:
        return "exclude"

    if detected_type in ("geo_latitude", "geo_longitude"):
        return "geo"
    if detected_type == "date":
        return "date"
    if detected_type == "category":
        return "dimension"
    if detected_type == "numeric":
        # If few unique values, it's more like a dimension
        if unique_count and total_sample and unique_count < 20 and total_sample > 50:
            return "dimension"
        return "measure"
    if detected_type == "identifier":
        return "exclude"
    if detected_type == "text":
        if unique_count and total_sample and unique_count < 30:
            return "dimension"
        return "filter"
    if detected_type == "all_null":
        return "exclude"
    return "filter"


def chartable_as(role, detected_type):
    """Determine what chart types a field supports."""
    if role == "dimension":
        return ["bar", "pie", "table"]
    elif role == "measure":
        return ["bar", "line", "histogram", "table"]
    elif role == "date":
        return ["line", "area", "table"]
    elif role == "geo":
        return ["map"]
    elif role == "filter":
        return ["table"]
    return []


def extract_warnings(methodology_text):
    """Extract key warnings from methodology text."""
    warnings_fr = []
    warnings_en = []

    if not methodology_text:
        return warnings_fr, warnings_en

    text_lower = methodology_text.lower()

    if "obfusqu" in text_lower or "vie priv" in text_lower or "privacy" in text_lower:
        warnings_fr.append("Donnees obfusquees pour proteger la vie privee")
        warnings_en.append("Data obfuscated for privacy protection")

    if "arrondi" in text_lower or "intersection" in text_lower and "priv" in text_lower:
        warnings_fr.append("Localisation arrondie a l'intersection la plus proche")
        warnings_en.append("Location rounded to nearest intersection")

    if "estimation" in text_lower or "estime" in text_lower:
        warnings_fr.append("Certaines donnees sont des estimations")
        warnings_en.append("Some data are estimates")

    if "archive" in text_lower or "historique" in text_lower and "ne sont plus" in text_lower:
        warnings_fr.append("Donnees archivees - ne sont plus mises a jour")
        warnings_en.append("Archived data - no longer updated")

    if "incomplet" in text_lower or "partiel" in text_lower:
        warnings_fr.append("Donnees potentiellement incompletes")
        warnings_en.append("Data potentially incomplete")

    if "ecart" in text_lower or "diverge" in text_lower:
        warnings_fr.append("Ecarts possibles avec les statistiques officielles")
        warnings_en.append("Possible discrepancies with official statistics")

    if "ne couvre pas" in text_lower or "exclut" in text_lower:
        warnings_fr.append("Certains territoires ou periodes sont exclus")
        warnings_en.append("Some territories or periods are excluded")

    if "mtm" in text_lower or "nad83" in text_lower:
        warnings_fr.append("Coordonnees en projection MTM (pas WGS84)")
        warnings_en.append("Coordinates in MTM projection (not WGS84)")

    return warnings_fr, warnings_en


def extract_temporal_range(resources):
    """Get overall temporal range from date fields across resources."""
    min_dates = []
    max_dates = []
    for r in resources:
        qa = r.get("quality_audit")
        if not qa:
            continue
        for fid, fa in qa.get("fields", {}).items():
            if fa.get("field_type_detected") == "date":
                if fa.get("min_date"):
                    min_dates.append(str(fa["min_date"]))
                if fa.get("max_date"):
                    max_dates.append(str(fa["max_date"]))

    if min_dates and max_dates:
        return {"min": min(min_dates), "max": max(max_dates)}

    return None


def find_join_opportunities(fields_map):
    """Identify common fields across datasets for potential joins."""
    # Track field names that appear across multiple datasets
    field_datasets = defaultdict(list)
    for slug, fields in fields_map.items():
        for f in fields:
            lower = f.lower()
            if lower in ("arrondissement", "arr", "borough", "code_arrondissement",
                         "nom_arrondissement", "arrondissement_ville"):
                field_datasets["borough"].append(slug)
            elif lower in ("pdq", "poste_quartier"):
                field_datasets["police_district"].append(slug)
            elif lower in ("quartier", "quartier_sociologique"):
                field_datasets["neighbourhood"].append(slug)
            elif "date" in lower or lower in ("dt", "jour"):
                field_datasets["date"].append(slug)
            elif lower in ("latitude", "lat") or lower in ("longitude", "lon", "lng", "long"):
                field_datasets["coordinates"].append(slug)

    joins = []
    for join_key, datasets in field_datasets.items():
        unique_ds = list(set(datasets))
        if len(unique_ds) >= 2:
            joins.append({
                "join_key": join_key,
                "datasets_count": len(unique_ds),
                "sample_datasets": unique_ds[:5],
            })
    return sorted(joins, key=lambda j: j["datasets_count"], reverse=True)


def process_dataset(slug, dataset):
    """Process a single dataset into semantic layer format."""
    title_fr = dataset.get("title", slug)
    title_en = translate_title(title_fr)
    description_fr = dataset.get("notes", "").strip()
    description_en = translate_title(description_fr[:200]) if description_fr else ""
    publisher = ""
    web_meta = dataset.get("web_metadata", {})
    add_info = web_meta.get("additional_info", {})
    if isinstance(add_info, dict):
        publisher = add_info.get("Publieur", add_info.get("Publisher", ""))

    raw_freq = dataset.get("update_frequency", "")
    if not raw_freq and isinstance(add_info, dict):
        raw_freq = add_info.get("Frequence de mise a jour",
                    add_info.get("Fr\u00e9quence de mise \u00e0 jour", ""))
    freq = normalize_frequency(raw_freq)

    methodology_fr = web_meta.get("methodology_text", "")
    has_dict = web_meta.get("has_data_dictionary", False)
    warnings_fr, warnings_en = extract_warnings(methodology_fr)
    temporal_range = extract_temporal_range(dataset.get("resources", []))

    # Find the best resource for field analysis (largest datastore-active one)
    best_resource = None
    best_records = 0
    all_field_names = []

    for r in dataset.get("resources", []):
        qa = r.get("quality_audit")
        if qa and qa.get("fields"):
            if qa.get("total_records", 0) > best_records:
                best_records = qa["total_records"]
                best_resource = r

    # Check if any resources are datastore-active
    has_datastore = any(r.get("datastore_active") for r in dataset.get("resources", []))
    available_formats = list(set(
        r.get("format", "?").upper() for r in dataset.get("resources", []) if r.get("format")
    ))

    if not best_resource or not best_resource.get("quality_audit", {}).get("fields"):
        # No datastore resources - still document it
        return {
            "slug": slug,
            "title_fr": title_fr,
            "title_en": title_en,
            "description_fr": description_fr[:1000],
            "description_en": description_en[:500],
            "publisher": publisher,
            "update_frequency": freq,
            "total_records": 0,
            "temporal_range": temporal_range,
            "methodology_fr": methodology_fr[:3000],
            "data_quality_score": "F",
            "usable_in_report_builder": False,
            "available_formats": available_formats,
            "fields": [],
            "recommended_joins": [],
            "warnings_fr": warnings_fr or ["Pas de ressource DataStore (API non disponible)"],
            "warnings_en": warnings_en or ["No DataStore resource (API not available)"],
        }

    qa = best_resource["quality_audit"]
    fields_audit = qa.get("fields", {})
    total_records = qa.get("total_records", 0)
    sample_size = qa.get("sample_size", 0)

    # Process fields
    semantic_fields = []
    for fid, fa in fields_audit.items():
        fr_name, en_name = translate_field_name_simple(fid)
        detected_type = fa.get("field_type_detected", "text")
        null_pct = fa.get("null_pct", 0)
        unique = fa.get("unique_count")
        qual = field_quality(null_pct)
        role = field_role(fid, detected_type, null_pct, unique, sample_size)
        charts = chartable_as(role, detected_type)

        field_entry = {
            "raw_name": fid,
            "clean_name_fr": fr_name,
            "clean_name_en": en_name,
            "description_fr": f"Champ {fr_name.lower()}",
            "description_en": f"{en_name} field",
            "type": detected_type,
            "null_pct": null_pct,
            "quality": qual,
            "report_builder_role": role,
            "groupable": role in ("dimension", "category"),
            "filterable": role not in ("exclude",),
            "aggregatable": role == "measure",
            "chartable_as": charts,
        }

        if unique is not None:
            field_entry["unique_values"] = unique
        if fa.get("top_values"):
            field_entry["top_values"] = fa["top_values"][:10]
        if fa.get("min") is not None:
            field_entry["min"] = fa["min"]
            field_entry["max"] = fa.get("max")
        if fa.get("mean") is not None:
            field_entry["mean"] = fa["mean"]
        if fa.get("median") is not None:
            field_entry["median"] = fa["median"]
        if fa.get("min_date"):
            field_entry["min_date"] = fa["min_date"]
            field_entry["max_date"] = fa.get("max_date")
            field_entry["date_format"] = fa.get("date_format", "unknown")
        if fa.get("pct_in_montreal_bbox") is not None:
            field_entry["pct_in_montreal_bbox"] = fa["pct_in_montreal_bbox"]

        if qual == "poor":
            field_entry["warnings_fr"] = f"Champ partiellement rempli ({null_pct}% null)"
            field_entry["warnings_en"] = f"Partially populated field ({null_pct}% null)"
        elif qual == "empty":
            field_entry["warnings_fr"] = f"Champ presque vide ({null_pct}% null)"
            field_entry["warnings_en"] = f"Nearly empty field ({null_pct}% null)"
        else:
            field_entry["warnings_fr"] = ""
            field_entry["warnings_en"] = ""

        semantic_fields.append(field_entry)
        all_field_names.append(fid)

    grade = compute_quality_grade(fields_audit, has_dict, freq)

    # Detect join opportunities
    joins = []
    field_lower_set = set(f.lower() for f in all_field_names)
    if field_lower_set & {"arrondissement", "arr", "borough", "nom_arrondissement", "code_arrondissement", "arrondissement_ville"}:
        joins.append("boroughs via arrondissement field")
    if "pdq" in field_lower_set:
        joins.append("boroughs via PDQ-to-borough mapping")
    if field_lower_set & {"latitude", "lat"} and field_lower_set & {"longitude", "lon", "lng", "long"}:
        joins.append("spatial join via lat/long coordinates")
    if any("date" in f.lower() or f.lower() in ("dt", "jour") for f in all_field_names):
        joins.append("temporal join via date fields")

    return {
        "slug": slug,
        "title_fr": title_fr,
        "title_en": title_en,
        "description_fr": description_fr[:1000],
        "description_en": description_en[:500],
        "publisher": publisher,
        "update_frequency": freq,
        "total_records": total_records,
        "temporal_range": temporal_range,
        "methodology_fr": methodology_fr[:3000],
        "data_quality_score": grade,
        "usable_in_report_builder": grade in ("A", "B", "C") and has_datastore,
        "available_formats": available_formats,
        "fields": semantic_fields,
        "recommended_joins": joins,
        "warnings_fr": warnings_fr,
        "warnings_en": warnings_en,
    }


def generate_markdown(category_name_fr, category_name_en, cat_num, datasets_semantic):
    """Generate Markdown reference doc for a category."""
    lines = []
    lines.append(f"# {cat_num}. {category_name_fr}")
    lines.append(f"# {category_name_en}")
    lines.append("")
    lines.append(f"> Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"> Datasets: {len(datasets_semantic)}")
    lines.append("")

    # Grade summary
    grades = Counter(d["data_quality_score"] for d in datasets_semantic)
    usable = sum(1 for d in datasets_semantic if d["usable_in_report_builder"])
    lines.append("## Quality Overview")
    lines.append("")
    lines.append("| Grade | Count | Description |")
    lines.append("|-------|-------|-------------|")
    for g in ("A", "B", "C", "D", "F"):
        desc = {"A": "Excellent", "B": "Good", "C": "Usable", "D": "Sparse", "F": "Unusable"}
        lines.append(f"| **{g}** | {grades.get(g, 0)} | {desc[g]} |")
    lines.append(f"| | **{len(datasets_semantic)}** | ({usable} usable in report builder) |")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Table of contents
    lines.append("## Datasets")
    lines.append("")
    for ds in sorted(datasets_semantic, key=lambda d: d["data_quality_score"]):
        grade = ds["data_quality_score"]
        rb = " [RB]" if ds["usable_in_report_builder"] else ""
        lines.append(f"- **[{grade}]** [{ds['title_fr']}](#{ds['slug']}){rb}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Each dataset
    for ds in sorted(datasets_semantic, key=lambda d: (d["data_quality_score"], d["title_fr"])):
        lines.append(f"## {ds['title_fr']}")
        lines.append(f"### {ds['title_en']}")
        lines.append("")

        lines.append(f"| Property | Value |")
        lines.append(f"|----------|-------|")
        lines.append(f"| **Slug** | `{ds['slug']}` |")
        lines.append(f"| **Quality Grade** | **{ds['data_quality_score']}** |")
        lines.append(f"| **Report Builder** | {'Yes' if ds['usable_in_report_builder'] else 'No'} |")
        lines.append(f"| **Publisher** | {ds['publisher']} |")
        lines.append(f"| **Update Frequency** | {ds['update_frequency']} |")
        lines.append(f"| **Total Records** | {ds['total_records']:,} |")
        if ds.get("temporal_range"):
            tr = ds["temporal_range"]
            lines.append(f"| **Temporal Range** | {tr.get('min', '?')} to {tr.get('max', '?')} |")
        lines.append(f"| **Formats** | {', '.join(ds.get('available_formats', []))} |")
        lines.append("")

        if ds.get("description_fr"):
            lines.append(f"> {ds['description_fr'][:300]}")
            lines.append("")

        # Warnings
        if ds.get("warnings_fr") or ds.get("warnings_en"):
            lines.append("**Warnings:**")
            for w in ds.get("warnings_en", []):
                lines.append(f"- {w}")
            lines.append("")

        # Fields table
        fields = ds.get("fields", [])
        if fields:
            lines.append("### Field Inventory")
            lines.append("")
            lines.append("| # | Raw Name | Type | Role | Quality | Null% | Description (EN) |")
            lines.append("|---|----------|------|------|---------|-------|------------------|")
            for i, f in enumerate(fields, 1):
                q_icon = {"good": "G", "usable": "U", "poor": "P", "empty": "E"}.get(
                    f["quality"], "?"
                )
                lines.append(
                    f"| {i} | `{f['raw_name']}` | {f['type']} | {f['report_builder_role']} "
                    f"| {q_icon} | {f['null_pct']}% | {f['clean_name_en']} |"
                )
            lines.append("")

            # Dimensions summary
            dims = [f for f in fields if f["report_builder_role"] == "dimension"]
            measures = [f for f in fields if f["report_builder_role"] == "measure"]
            dates = [f for f in fields if f["report_builder_role"] == "date"]
            geos = [f for f in fields if f["report_builder_role"] == "geo"]

            if dims:
                lines.append(f"**Dimensions** ({len(dims)}): "
                             + ", ".join(f"`{f['raw_name']}`" for f in dims))
                lines.append("")
            if measures:
                lines.append(f"**Measures** ({len(measures)}): "
                             + ", ".join(f"`{f['raw_name']}`" for f in measures))
                lines.append("")
            if dates:
                lines.append(f"**Date fields** ({len(dates)}): "
                             + ", ".join(f"`{f['raw_name']}`" for f in dates))
                lines.append("")
            if geos:
                lines.append(f"**Geo fields** ({len(geos)}): "
                             + ", ".join(f"`{f['raw_name']}`" for f in geos))
                lines.append("")

        if ds.get("recommended_joins"):
            lines.append("**Join opportunities:** " + "; ".join(ds["recommended_joins"]))
            lines.append("")

        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("GENERATING SEMANTIC LAYER")
    print("=" * 60)

    # Load all dataset JSON files into memory
    all_datasets = {}
    for fp in sorted(DATASETS_DIR.glob("*.json")):
        with open(fp, encoding="utf-8") as f:
            all_datasets[fp.stem] = json.load(f)
    print(f"  Loaded {len(all_datasets)} dataset files")

    # Global stats (deduplicated across categories)
    global_grades = Counter()
    global_roles = Counter()
    global_fields_total = 0
    all_semantic = {}
    all_field_names_per_ds = {}
    top_datasets = []
    seen_slugs = set()  # dedup across categories

    for cat_slug, cat_num, cat_fr, cat_en in CATEGORIES:
        cat_file = CATEGORIES_DIR / f"{cat_slug}.json"
        if not cat_file.exists():
            print(f"  [{cat_num}] {cat_fr}: SKIPPED (no category file)")
            continue

        with open(cat_file, encoding="utf-8") as f:
            cat_data = json.load(f)

        cat_datasets = cat_data.get("datasets", [])
        slugs_in_cat = [d["slug"] for d in cat_datasets]

        print(f"  [{cat_num}] {cat_fr}: {len(slugs_in_cat)} datasets...")

        # Process each dataset
        semantic_datasets = []
        for slug in slugs_in_cat:
            ds = all_datasets.get(slug)
            if not ds:
                continue
            entry = process_dataset(slug, ds)
            semantic_datasets.append(entry)

            # Only count global stats once per unique slug
            if slug not in seen_slugs:
                seen_slugs.add(slug)
                global_grades[entry["data_quality_score"]] += 1
                for f in entry.get("fields", []):
                    global_roles[f["report_builder_role"]] += 1
                    global_fields_total += 1

                all_field_names_per_ds[slug] = [f["raw_name"] for f in entry.get("fields", [])]

                if entry["usable_in_report_builder"] and entry["data_quality_score"] in ("A", "B"):
                    top_datasets.append({
                        "slug": slug,
                        "title": entry["title_fr"],
                        "grade": entry["data_quality_score"],
                        "records": entry["total_records"],
                        "fields": len(entry["fields"]),
                        "frequency": entry["update_frequency"],
                    })

        # Save JSON
        cat_json = {
            "category_slug": cat_slug,
            "category_name_fr": cat_fr,
            "category_name_en": cat_en,
            "generated_at": datetime.now().isoformat(),
            "dataset_count": len(semantic_datasets),
            "datasets": semantic_datasets,
        }
        with open(OUTPUT_DIR / f"{cat_slug}.json", "w", encoding="utf-8") as f:
            json.dump(cat_json, f, indent=2, ensure_ascii=False)

        # Save Markdown
        md = generate_markdown(cat_fr, cat_en, cat_num, semantic_datasets)
        with open(OUTPUT_DIR / f"{cat_slug}.md", "w", encoding="utf-8") as f:
            f.write(md)

        all_semantic[cat_slug] = semantic_datasets
        print(f"    -> {len(semantic_datasets)} datasets processed, "
              f"grades: {dict(Counter(d['data_quality_score'] for d in semantic_datasets))}")

    # === Generate master summary ===
    print("\n  Generating master summary...")

    # Sort top datasets by records
    top_datasets.sort(key=lambda d: d["records"], reverse=True)
    top20 = top_datasets[:20]

    # Find cross-dataset joins
    joins = find_join_opportunities(all_field_names_per_ds)

    summary_lines = []
    summary_lines.append("# MTL Pulse - Semantic Layer Summary")
    summary_lines.append(f"# Montreal Open Data - Report Builder Reference")
    summary_lines.append("")
    summary_lines.append(f"> Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    summary_lines.append(f"> Total datasets: {sum(global_grades.values())}")
    summary_lines.append(f"> Total fields analyzed: {global_fields_total}")
    summary_lines.append("")
    summary_lines.append("---")
    summary_lines.append("")

    # Quality grades
    summary_lines.append("## Data Quality Distribution")
    summary_lines.append("")
    summary_lines.append("| Grade | Count | Pct | Description |")
    summary_lines.append("|-------|-------|-----|-------------|")
    total_ds = sum(global_grades.values())
    for g, desc in [("A", "Excellent - rich, well-documented, regularly updated"),
                     ("B", "Good - mostly complete, decent documentation"),
                     ("C", "Usable - significant gaps but valuable fields"),
                     ("D", "Sparse - many nulls, limited usability"),
                     ("F", "Unusable - mostly empty or no API access")]:
        cnt = global_grades.get(g, 0)
        pct = round(cnt / total_ds * 100, 1) if total_ds else 0
        summary_lines.append(f"| **{g}** | {cnt} | {pct}% | {desc} |")
    summary_lines.append(f"| **Total** | **{total_ds}** | | |")
    summary_lines.append("")

    # Field roles
    summary_lines.append("## Field Roles Distribution")
    summary_lines.append("")
    summary_lines.append("| Role | Count | Pct | Usage |")
    summary_lines.append("|------|-------|-----|-------|")
    for role, usage in [("dimension", "Group-by in reports (borough, category, status)"),
                         ("measure", "Aggregatable numeric fields (count, sum, avg)"),
                         ("date", "Time-series axis fields"),
                         ("filter", "Text fields for filtering"),
                         ("geo", "Geographic coordinates for maps"),
                         ("exclude", "Empty, internal, or unusable fields")]:
        cnt = global_roles.get(role, 0)
        pct = round(cnt / global_fields_total * 100, 1) if global_fields_total else 0
        summary_lines.append(f"| **{role}** | {cnt} | {pct}% | {usage} |")
    summary_lines.append(f"| **Total** | **{global_fields_total}** | | |")
    summary_lines.append("")

    # Top 20 datasets
    summary_lines.append("## Top 20 Datasets for Report Builder Launch")
    summary_lines.append("")
    summary_lines.append("| # | Dataset | Grade | Records | Fields | Frequency |")
    summary_lines.append("|---|---------|-------|---------|--------|-----------|")
    for i, d in enumerate(top20, 1):
        summary_lines.append(
            f"| {i} | {d['title'][:50]} | {d['grade']} | {d['records']:,} | {d['fields']} | {d['frequency']} |"
        )
    summary_lines.append("")

    # Cross-dataset joins
    summary_lines.append("## Cross-Dataset Join Opportunities")
    summary_lines.append("")
    summary_lines.append("| Join Key | Datasets | Sample |")
    summary_lines.append("|----------|----------|--------|")
    for j in joins:
        sample = ", ".join(s[5:] if s.startswith("vmtl-") else s for s in j["sample_datasets"])
        summary_lines.append(f"| **{j['join_key']}** | {j['datasets_count']} | {sample} |")
    summary_lines.append("")

    # Category index
    summary_lines.append("## Category Files")
    summary_lines.append("")
    summary_lines.append("| # | Category | Datasets | JSON | Markdown |")
    summary_lines.append("|---|----------|----------|------|----------|")
    for cat_slug, cat_num, cat_fr, cat_en in CATEGORIES:
        count = len(all_semantic.get(cat_slug, []))
        if count > 0:
            summary_lines.append(
                f"| {cat_num} | {cat_fr} | {count} | "
                f"[{cat_slug}.json]({cat_slug}.json) | "
                f"[{cat_slug}.md]({cat_slug}.md) |"
            )
    summary_lines.append("")

    with open(OUTPUT_DIR / "_SUMMARY.md", "w", encoding="utf-8") as f:
        f.write("\n".join(summary_lines))

    # Also save summary as JSON
    summary_json = {
        "generated_at": datetime.now().isoformat(),
        "total_datasets": total_ds,
        "total_fields": global_fields_total,
        "quality_grades": dict(global_grades),
        "field_roles": dict(global_roles),
        "top_20_datasets": top20,
        "cross_dataset_joins": joins,
    }
    with open(OUTPUT_DIR / "_summary.json", "w", encoding="utf-8") as f:
        json.dump(summary_json, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 60)
    print("SEMANTIC LAYER GENERATION COMPLETE")
    print("=" * 60)
    print(f"  Total datasets:      {total_ds}")
    print(f"  Total fields:        {global_fields_total}")
    print(f"  Quality grades:      {dict(global_grades)}")
    print(f"  Field roles:         {dict(global_roles)}")
    print(f"  Top 20 for RB:       {len(top20)} datasets")
    print(f"  Join opportunities:  {len(joins)}")
    print(f"  Output:              {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
