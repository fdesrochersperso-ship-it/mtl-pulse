"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
export interface BoroughComparisonDataPoint {
  boroughCode: string;
  label: string;
  value: number;
  perCapita?: number;
  isHighlighted?: boolean;
}

export interface BoroughComparisonProps {
  data: (BoroughComparisonDataPoint & { perCapita?: number })[];
  title?: string;
  valueLabel?: string;
  locale?: "fr" | "en";
  highlightedBoroughCode?: string | null;
  perCapita?: boolean;
  onPerCapitaToggle?: (enabled: boolean) => void;
  className?: string;
}

const PRIMARY = "hsl(var(--primary))";
const MUTED = "hsl(var(--muted-foreground) / 0.6)";

export function BoroughComparison({
  data,
  title,
  valueLabel,
  locale = "fr",
  highlightedBoroughCode,
  perCapita: perCapitaProp = false,
  onPerCapitaToggle,
  className,
}: BoroughComparisonProps) {
  const [perCapitaLocal, setPerCapitaLocal] = useState(false);
  const perCapita = onPerCapitaToggle ? perCapitaLocal : perCapitaProp;
  const hasCensusData = data.some((d) => d.perCapita != null);
  const chartData = data.map((d) => ({
    ...d,
    value: perCapita && d.perCapita != null ? d.perCapita * 10000 : d.value,
    isHighlighted:
      highlightedBoroughCode != null && d.boroughCode === highlightedBoroughCode,
  }));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {title && (
          <h3 className="text-lg font-semibold">{title}</h3>
        )}
        {onPerCapitaToggle && hasCensusData && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={perCapita}
              onChange={(e) => {
                const v = e.target.checked;
                setPerCapitaLocal(v);
                onPerCapitaToggle(v);
              }}
              className="rounded border-input"
            />
            <span>
              {locale === "fr" ? "Par habitant" : "Per capita"}
            </span>
          </label>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                type="number"
                tick={{ fontSize: 11 }}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fontSize: 11 }}
                tickLine={false}
                width={75}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number | undefined) => [
                  (value ?? 0).toLocaleString("fr-CA"),
                  valueLabel ??
                    (locale === "fr" ? "Chantiers actifs" : "Active sites"),
                ]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={entry.boroughCode}
                    fill={entry.isHighlighted ? PRIMARY : MUTED}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
