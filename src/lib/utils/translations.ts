/**
 * Translations for dynamic content from the database (Montreal open data in French).
 * Use these when displaying borough names, crime categories, permit types, 311 request types.
 * If no mapping exists, the French value from the API is shown as-is.
 */

import type { Locale } from "@/i18n/request";

/** Borough code → { fr, en } name. FR names match BOROUGHS constant. */
export const BOROUGH_NAMES: Record<string, { fr: string; en: string }> = {
  AHU: { fr: "Ahuntsic-Cartierville", en: "Ahuntsic-Cartierville" },
  ANJ: { fr: "Anjou", en: "Anjou" },
  CDN: {
    fr: "Côte-des-Neiges–Notre-Dame-de-Grâce",
    en: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  },
  IBI: {
    fr: "L'Île-Bizard–Sainte-Geneviève",
    en: "L'Île-Bizard–Sainte-Geneviève",
  },
  LAC: { fr: "Lachine", en: "Lachine" },
  LSL: { fr: "LaSalle", en: "LaSalle" },
  PLA: { fr: "Le Plateau-Mont-Royal", en: "Le Plateau-Mont-Royal" },
  LSO: { fr: "Le Sud-Ouest", en: "Le Sud-Ouest" },
  MHM: {
    fr: "Mercier–Hochelaga-Maisonneuve",
    en: "Mercier–Hochelaga-Maisonneuve",
  },
  MTN: { fr: "Montréal-Nord", en: "Montréal-Nord" },
  OUT: { fr: "Outremont", en: "Outremont" },
  PFD: { fr: "Pierrefonds-Roxboro", en: "Pierrefonds-Roxboro" },
  RPP: {
    fr: "Rivière-des-Prairies–Pointe-aux-Trembles",
    en: "Rivière-des-Prairies–Pointe-aux-Trembles",
  },
  RDP: {
    fr: "Rosemont–La Petite-Patrie",
    en: "Rosemont–La Petite-Patrie",
  },
  SLR: { fr: "Saint-Laurent", en: "Saint-Laurent" },
  SLE: { fr: "Saint-Léonard", en: "Saint-Léonard" },
  VER: { fr: "Verdun", en: "Verdun" },
  VSP: {
    fr: "Villeray–Saint-Michel–Parc-Extension",
    en: "Villeray–Saint-Michel–Parc-Extension",
  },
  VMA: { fr: "Ville-Marie", en: "Ville-Marie" },
};

/** Crime category (CATEGORIE from SPVM) → EN. Fallback: return original. */
export const CRIME_CATEGORIES: Record<string, string> = {
  "Introduction": "Break and enter",
  "Vol de véhicule à moteur": "Motor vehicle theft",
  "Vol dans / sur véhicule à moteur": "Theft from motor vehicle",
  "Méfait": "Mischief",
  "Vol qualifié": "Robbery",
  "Infractions sexuelles": "Sexual offences",
  "Voies de fait": "Assault",
  "Possession de stupéfiants": "Drug possession",
  "Infractions liées aux drogues": "Drug-related offences",
  Inconnu: "Unknown",
};

/** Permit type codes → labels */
export const PERMIT_TYPES: Record<string, { fr: string; en: string }> = {
  CO: { fr: "Construction", en: "Construction" },
  TR: { fr: "Transformation", en: "Transformation" },
  DE: { fr: "Démolition", en: "Demolition" },
};

/** 311 nature values (Information, Requête, Plainte, Commentaire) */
export const REQUEST_311_NATURES: Record<string, { fr: string; en: string }> = {
  Information: { fr: "Information", en: "Information" },
  Requête: { fr: "Requête", en: "Request" },
  Plainte: { fr: "Plainte", en: "Complaint" },
  Commentaire: { fr: "Commentaire", en: "Comment" },
};

/** Common 311 request_type (ACTI_NOM) values — extend as needed */
export const REQUEST_311_TYPES: Record<string, string> = {
  "Déneigement - rue": "Snow removal - street",
  "Entrave à la circulation": "Traffic obstruction",
  "Nid de poule": "Pothole",
  "Travaux - bruit": "Construction - noise",
  "Chaussée défectueuse": "Defective pavement",
};

/**
 * Translate a borough name. Uses code → BOROUGH_NAMES, or pass-through if unknown.
 */
export function translateBorough(
  codeOrName: string,
  locale: Locale
): string {
  const code = codeOrName.toUpperCase();
  const mapped = BOROUGH_NAMES[code];
  if (mapped) return mapped[locale];
  return codeOrName;
}

/**
 * Translate crime category. Returns EN mapping or original.
 */
export function translateCrimeCategory(category: string, locale: Locale): string {
  if (locale === "fr") return category;
  return CRIME_CATEGORIES[category] ?? category;
}

/**
 * Translate permit type. Returns {fr,en}[locale] or original.
 */
export function translatePermitType(
  permitType: string,
  locale: Locale
): string {
  const mapped = PERMIT_TYPES[permitType];
  if (mapped) return mapped[locale];
  return permitType;
}

/**
 * Translate 311 nature.
 */
export function translate311Nature(nature: string, locale: Locale): string {
  const mapped = REQUEST_311_NATURES[nature];
  if (mapped) return mapped[locale];
  return nature;
}

/**
 * Translate 311 request type.
 */
export function translate311RequestType(
  requestType: string,
  locale: Locale
): string {
  if (locale === "fr") return requestType;
  return REQUEST_311_TYPES[requestType] ?? requestType;
}
