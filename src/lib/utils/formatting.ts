import { format, formatDistanceToNow } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import type { Locale } from "@/i18n/request";

const dateFnsLocales = { fr, en: enUS } as const;

/**
 * Format a date for display. Uses date-fns with locale.
 */
export function formatDate(
  date: Date | string | null | undefined,
  locale: Locale = "fr",
  formatStr: string = "PP"
): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return format(d, formatStr, { locale: dateFnsLocales[locale] });
}

/**
 * Format relative time (e.g. "il y a 2 jours" / "2 days ago").
 */
export function formatTimeAgo(
  date: Date | string,
  locale: Locale = "fr"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, {
    addSuffix: true,
    locale: dateFnsLocales[locale],
  });
}

/**
 * Format number with locale-specific rules.
 * French: space as thousands separator, comma as decimal.
 * English: comma as thousands, period as decimal.
 */
export function formatNumber(
  value: number,
  locale: Locale = "fr",
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA", options);
}
