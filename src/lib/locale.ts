/**
 * Locale utilities. Re-exports from next-intl for backward compatibility.
 */
import { getLocale as getLocaleNextIntl } from "next-intl/server";
import type { Locale } from "@/i18n/request";
export type { Locale } from "@/i18n/request";
export const COOKIE_NAME = "locale";
export const DEFAULT_LOCALE = "fr" as const;

/** Server-side: get locale (fr | en) from cookie via next-intl. */
export async function getLocale(): Promise<Locale> {
  const locale = await getLocaleNextIntl();
  return (locale === "fr" || locale === "en" ? locale : DEFAULT_LOCALE) as Locale;
}
