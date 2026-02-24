"use client";

import type React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { BoroughMiniMap } from "@/components/borough/BoroughMiniMap";
import type { BoroughSummary } from "@/lib/db/queries/borough";

export interface BoroughIndexClientProps {
  boroughs: BoroughSummary[];
  boroughsGeoJSON: React.ComponentProps<
    typeof BoroughMiniMap
  >["boroughsGeoJSON"];
  initialSort: "name" | "population" | "crime" | "construction";
}

const SORT_OPTIONS = [
  "sortName",
  "sortPopulation",
  "sortCrime",
  "sortConstruction",
] as const;

export function BoroughIndexClient({
  boroughs,
  boroughsGeoJSON,
  initialSort,
}: BoroughIndexClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("borough");

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "name") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/borough?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="borough-sort" className="text-sm font-medium">
          {t("sortBy")}
        </label>
        <select
          id="borough-sort"
          value={initialSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="name">{t("sortName")}</option>
          <option value="population">{t("sortPopulation")}</option>
          <option value="crime">{t("sortCrime")}</option>
          <option value="construction">{t("sortConstruction")}</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {boroughs.map((b) => (
          <Link key={b.code} href={`/borough/${b.code}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
              <div className="grid grid-cols-[1fr,100px] gap-2 p-4">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{b.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {b.population > 0
                      ? `${b.population.toLocaleString()} ${t("residents")}`
                      : ""}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span title={t("crime7d")}>
                      🔒 {b.crimeCount7d}
                    </span>
                    <span title={t("activeConstruction")}>
                      🚧 {b.activeTravaux}
                    </span>
                    <span title="Permis cette semaine">
                      🏗️ {b.permitsWeek}
                    </span>
                  </div>
                </div>
                <div className="h-20 w-24 shrink-0 self-center">
                  <BoroughMiniMap
                    highlightedCode={b.code}
                    boroughsGeoJSON={boroughsGeoJSON}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
