"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";

export interface VeloDashboardClientProps {
  timeSeries: {
    period: string;
    volume: number;
    counterCount: number;
    previousYearVolume?: number;
  }[];
  boroughChartData: {
    boroughCode: string;
    label: string;
    value: number;
    isHighlighted: boolean;
  }[];
  locale: "fr" | "en";
}

export function VeloDashboardClient({
  timeSeries,
  boroughChartData,
  locale,
}: VeloDashboardClientProps) {
  const chartData = timeSeries.map((d) => ({
    ...d,
    formattedPeriod: new Date(d.period).toLocaleDateString(
      locale === "fr" ? "fr-CA" : "en-CA",
      { month: "short", day: "numeric", year: "2-digit" }
    ),
  }));

  return (
    <div className="space-y-8">
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {locale === "fr" ? "Volume cycliste (tous compteurs)" : "Cycling volume (all counters)"}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="formattedPeriod" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name={locale === "fr" ? "Passages" : "Passes"}
                  />
                  {chartData.some((d) => d.previousYearVolume != null) && (
                    <Line
                      type="monotone"
                      dataKey="previousYearVolume"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      dot={false}
                      name={locale === "fr" ? "Année précédente" : "Previous year"}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {boroughChartData.length > 0 && (
        <BoroughComparison
          data={boroughChartData}
          title={locale === "fr" ? "Volume par arrondissement" : "Volume by borough"}
          valueLabel={locale === "fr" ? "Passages" : "Passes"}
          locale={locale}
        />
      )}
    </div>
  );
}
