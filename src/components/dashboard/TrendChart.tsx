"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TrendChartDataPoint {
  period: string;
  value: number;
  previousYearValue?: number;
}

export interface TrendChartProps {
  data: TrendChartDataPoint[];
  title?: string;
  valueKey?: string;
  previousYearKey?: string;
  granularity: "daily" | "weekly" | "monthly";
  onGranularityChange: (g: "daily" | "weekly" | "monthly") => void;
  locale?: "fr" | "en";
  valueLabel?: string;
  previousYearLabel?: string;
  className?: string;
}

function formatPeriod(period: string, granularity: string): string {
  const d = new Date(period);
  if (granularity === "daily") {
    return d.toLocaleDateString("fr-CA", {
      month: "short",
      day: "numeric",
    });
  }
  if (granularity === "weekly") {
    return d.toLocaleDateString("fr-CA", {
      month: "short",
      day: "numeric",
    });
  }
  return d.toLocaleDateString("fr-CA", {
    month: "short",
    year: "2-digit",
  });
}

export function TrendChart({
  data,
  title,
  valueKey = "value",
  previousYearKey = "previousYearValue",
  granularity,
  onGranularityChange,
  locale = "fr",
  valueLabel,
  previousYearLabel,
  className,
}: TrendChartProps) {
  const transformedData = data.map((d) => ({
    ...d,
    [valueKey]: d.value,
    [previousYearKey]: d.previousYearValue,
    formattedPeriod: formatPeriod(d.period, granularity),
  }));

  const labels = {
    daily: locale === "fr" ? "Journalier" : "Daily",
    weekly: locale === "fr" ? "Hebdomadaire" : "Weekly",
    monthly: locale === "fr" ? "Mensuel" : "Monthly",
  };

  const hasPreviousYear = data.some((d) => d.previousYearValue != null);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {title && (
          <h3 className="text-lg font-semibold">{title}</h3>
        )}
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onGranularityChange(g)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                granularity === g
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {labels[g]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={transformedData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="formattedPeriod"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.period
                    ? new Date(payload[0].payload.period).toLocaleDateString(
                        locale === "fr" ? "fr-CA" : "en-CA",
                        { dateStyle: "medium" }
                      )
                    : ""
                }
              />
              {hasPreviousYear && (
                <Legend
                  formatter={() => [
                    previousYearLabel ??
                      (locale === "fr"
                        ? "Même période année précédente"
                        : "Same period last year"),
                    "",
                  ]}
                />
              )}
              <Line
                type="monotone"
                dataKey={valueKey}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name={
                  valueLabel ??
                  (locale === "fr" ? "Chantiers actifs" : "Active sites")
                }
              />
              {hasPreviousYear && (
                <Line
                  type="monotone"
                  dataKey={previousYearKey}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  name={
                    previousYearLabel ??
                    (locale === "fr"
                      ? "Année précédente"
                      : "Previous year")
                  }
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
