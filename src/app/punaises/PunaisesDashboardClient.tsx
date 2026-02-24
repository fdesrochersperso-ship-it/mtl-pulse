"use client";

import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";

export interface PunaisesDashboardClientProps {
  trendData: { period: string; value: number; previousYearValue?: number }[];
  boroughChartData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  locale: "fr" | "en";
}

export function PunaisesDashboardClient({
  trendData,
  boroughChartData,
  locale,
}: PunaisesDashboardClientProps) {
  return (
    <div className="space-y-8">
      <TrendChart
        data={trendData}
        title={
          locale === "fr"
            ? "Déclarations dans le temps"
            : "Reports over time"
        }
        granularity="monthly"
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "Déclarations" : "Reports"}
      />

      <BoroughComparison
        data={boroughChartData}
        title={locale === "fr" ? "Par arrondissement" : "By borough"}
        valueLabel={locale === "fr" ? "Déclarations" : "Reports"}
        locale={locale}
      />
    </div>
  );
}
