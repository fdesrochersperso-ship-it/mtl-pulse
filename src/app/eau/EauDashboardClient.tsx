"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";

export interface EauDashboardClientProps {
  timeSeries: { period: string; count: number }[];
  boroughChartData: {
    boroughCode: string;
    label: string;
    value: number;
    isHighlighted: boolean;
  }[];
  locale: "fr" | "en";
}

export function EauDashboardClient({
  timeSeries,
  boroughChartData,
  locale,
}: EauDashboardClientProps) {
  const chartData = timeSeries.map((d) => ({
    ...d,
    year: d.period.slice(0, 4),
  }));

  return (
    <div className="space-y-8">
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {locale === "fr" ? "Bris par année" : "Breaks per year"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {locale === "fr"
                ? "Données depuis 1972 — indicateur du vieillissement des conduites."
                : "Data since 1972 — aging pipe indicator."}
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name={locale === "fr" ? "Bris" : "Breaks"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {boroughChartData.length > 0 && (
        <BoroughComparison
          data={boroughChartData}
          title={locale === "fr" ? "Bris par arrondissement" : "Breaks by borough"}
          valueLabel={locale === "fr" ? "Nombre de bris" : "Break count"}
          locale={locale}
        />
      )}
    </div>
  );
}
