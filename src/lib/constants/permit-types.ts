/** Client-safe permit type labels (no DB import). */

export const PERMIT_TYPE_LABELS: Record<string, { fr: string; en: string }> = {
  CO: { fr: "Construction", en: "Construction" },
  TR: { fr: "Transformation", en: "Transformation" },
  DE: { fr: "Démolition", en: "Demolition" },
  CA: { fr: "Certificat", en: "Certificate" },
};

export function getPermitTypeLabel(code: string, locale: "fr" | "en"): string {
  return PERMIT_TYPE_LABELS[code]?.[locale] ?? code;
}
