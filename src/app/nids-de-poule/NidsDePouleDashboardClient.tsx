"use client";

import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";

export interface NidsDePouleDashboardClientProps {
  trendData: { period: string; value: number; previousYearValue?: number }[];
  boroughChartData: { boroughCode: string; label: string; value: number }[];
  locale: "fr" | "en";
}

export function NidsDePouleDashboardClient({
  trendData,
  boroughChartData,
  locale,
}: NidsDePouleDashboardClientProps) {
  return (
    <div className="space-y-8">
      <TrendChart
        data={trendData}
        title={
          locale === "fr"
            ? "Réparations dans le temps (pic printanier)"
            : "Repairs over time (spring peak)"
        }
        granularity="monthly"
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "Réparations" : "Repairs"}
      />

      <BoroughComparison
        data={boroughChartData}
        title={locale === "fr" ? "Par arrondissement" : "By borough"}
        valueLabel={locale === "fr" ? "Réparations" : "Repairs"}
        locale={locale}
      />
    </div>
  );
}
