"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Select } from "@/components/ui/select";
import { BOROUGHS } from "@/lib/constants/boroughs";
import { translateBorough } from "@/lib/utils/translations";
import type { Locale } from "@/lib/locale";

export function BoroughSelector({ locale }: { locale: Locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("common");
  const currentBorough = searchParams.get("borough") ?? "";

  const options = [
    { value: "", label: t("allCity") },
    ...Object.entries(BOROUGHS).map(([code]) => ({
      value: code,
      label: translateBorough(code, locale),
    })),
  ];

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("borough", value);
    } else {
      params.delete("borough");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <Select
      value={currentBorough}
      onValueChange={handleChange}
      options={options}
      aria-label={t("allCity")}
      className="h-8 w-[180px] sm:w-[220px]"
    />
  );
}
