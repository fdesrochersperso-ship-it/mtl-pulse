import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const defaultLocale = "fr" as const;
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

const COOKIE_NAME = "locale";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale: Locale =
    cookieLocale === "fr" || cookieLocale === "en" ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
