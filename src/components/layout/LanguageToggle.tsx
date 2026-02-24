"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { COOKIE_NAME } from "@/lib/locale";
import type { Locale } from "@/lib/locale";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLocaleCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = useTranslations("languageToggle");
  const nextLocale: Locale = locale === "fr" ? "en" : "fr";

  const handleClick = () => {
    setLocaleCookie(nextLocale);
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="h-8 px-2 font-medium"
      aria-label={nextLocale === "fr" ? t("switchToFrench") : t("switchToEnglish")}
    >
      {locale === "fr" ? "EN" : "FR"}
    </Button>
  );
}
