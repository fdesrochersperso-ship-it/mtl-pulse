"use client";

import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";

export interface RemorquagesDashboardClientProps {
  trendData: { period: string; value: number; previousYearValue?: number }[];
  boroughChartData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  reasonChartData: { boroughCode: string; label: string; value: number }[];
  locale: "fr" | "en";
}

export function RemorquagesDashboardClient({
  trendData,
  boroughChartData,
  reasonChartData,
  locale,
}: RemorquagesDashboardClientProps) {
  return (
    <div className="space-y-8">
      <TrendChart
        data={trendData}
        title={
          locale === "fr"
            ? "Remorquages dans le temps (saison nov–mars)"
            : "Towings over time (Nov–Mar season)"
        }
        granularity="weekly"
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "Remorquages" : "Towings"}
      />

      <BoroughComparison
        data={boroughChartData}
        title={locale === "fr" ? "Par arrondissement" : "By borough"}
        valueLabel={locale === "fr" ? "Remorquages" : "Towings"}
        locale={locale}
      />

      <BoroughComparison
        data={reasonChartData}
        title={locale === "fr" ? "Par motif" : "By motive"}
        valueLabel={locale === "fr" ? "Remorquages" : "Towings"}
        locale={locale}
      />
    </div>
  );
}
