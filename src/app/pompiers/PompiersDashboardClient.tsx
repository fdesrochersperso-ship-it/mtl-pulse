"use client";

import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import type { FireTimeSeriesPoint } from "@/lib/db/queries/fire";

export interface PompiersDashboardClientProps {
  trendData: { period: string; value: number; previousYearValue?: number }[];
  typeChartData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  boroughChartData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  falseAlarmChartData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  falseAlarmTimeSeries: FireTimeSeriesPoint[];
  unitsChartData: { boroughCode: string; label: string; value: number }[];
  locale: "fr" | "en";
}

export function PompiersDashboardClient({
  trendData,
  typeChartData,
  boroughChartData,
  falseAlarmChartData,
  falseAlarmTimeSeries,
  unitsChartData,
  locale,
}: PompiersDashboardClientProps) {
  const falseAlarmTrendData = falseAlarmTimeSeries.map((d) => ({
    period: d.period,
    value: d.falseAlarmRate,
    previousYearValue: undefined,
  }));

  return (
    <div className="space-y-8">
      <TrendChart
        data={trendData}
        title={locale === "fr" ? "Interventions dans le temps" : "Interventions over time"}
        granularity="weekly"
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "Interventions" : "Interventions"}
      />

      <BoroughComparison
        data={typeChartData}
        title={locale === "fr" ? "Par DESCRIPTION_GROUPE" : "By DESCRIPTION_GROUPE"}
        valueLabel={locale === "fr" ? "Nombre" : "Count"}
        locale={locale}
      />

      <BoroughComparison
        data={boroughChartData}
        title={locale === "fr" ? "Par arrondissement" : "By borough"}
        valueLabel={locale === "fr" ? "Interventions" : "Interventions"}
        locale={locale}
      />

      <BoroughComparison
        data={falseAlarmChartData}
        title={locale === "fr" ? "Taux de fausses alertes par arrondissement" : "False alarm rate by borough"}
        valueLabel={locale === "fr" ? "%" : "%"}
        locale={locale}
      />

      <TrendChart
        data={falseAlarmTrendData}
        title={locale === "fr" ? "Taux de fausses alertes dans le temps" : "False alarm rate over time"}
        granularity="monthly"
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "% fausses alertes" : "% false alarms"}
      />

      {unitsChartData.length > 0 && (
        <BoroughComparison
          data={unitsChartData}
          title={locale === "fr" ? "Unités déployées par intervention" : "Units deployed per intervention"}
          valueLabel={locale === "fr" ? "Interventions" : "Interventions"}
          locale={locale}
        />
      )}
    </div>
  );
}
