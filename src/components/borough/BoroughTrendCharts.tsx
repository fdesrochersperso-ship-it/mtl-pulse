"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TrendDataPoint {
  period: string;
  value: number;
}

export interface BoroughTrendChartProps {
  title: string;
  data: TrendDataPoint[];
  color?: string;
  className?: string;
  locale?: "fr" | "en";
}

export function BoroughTrendChart({
  title,
  data,
  color = "hsl(var(--primary))",
  className,
}: BoroughTrendChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    formatted: new Date(d.period).toLocaleDateString("fr-CA", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-1 pt-3">
        <h3 className="text-sm font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 2, right: 2, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="formatted"
                tick={{ fontSize: 9 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                hide
                domain={["dataMin - 1", "dataMax + 1"]}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number | undefined) =>
                  [value != null ? value.toLocaleString("fr-CA") : "", ""]}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.period
                    ? new Date(payload[0].payload.period).toLocaleDateString(
                        "fr-CA",
                        { dateStyle: "medium" }
                      )
                    : ""
                }
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
