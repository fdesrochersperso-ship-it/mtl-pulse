"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Potholes311CorrelationRow {
  boroughCode: string;
  boroughName: string;
  repairsCount: number;
  complaints311: number;
  gap: number;
  backlogRatio: number | null;
}

export interface Potholes311CorrelationProps {
  data: Potholes311CorrelationRow[];
  locale?: "fr" | "en";
  className?: string;
}

export function Potholes311Correlation({
  data,
  locale = "fr",
  className,
}: Potholes311CorrelationProps) {
  const title =
    locale === "fr"
      ? "Nids-de-poule : plaintes 311 vs réparations"
      : "Potholes: 311 complaints vs repairs";
  const subtitle =
    locale === "fr"
      ? "Écart = arriéré de plaintes (plus de plaintes que de réparations)"
      : "Gap = complaint backlog (more complaints than repairs)";

  const chartData = data.map((d) => ({
    boroughCode: d.boroughCode,
    label: d.boroughName,
    repairs: d.repairsCount,
    complaints: d.complaints311,
    gap: d.gap,
  }));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[350px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fontSize: 11 }}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => [(value as number).toLocaleString("fr-CA"), ""]}
              />
              <Legend />
              <Bar
                dataKey="repairs"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
                name={locale === "fr" ? "Réparations" : "Repairs"}
              />
              <Bar
                dataKey="complaints"
                fill="hsl(var(--destructive))"
                radius={[0, 4, 4, 0]}
                name={locale === "fr" ? "Plaintes 311" : "311 Complaints"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
