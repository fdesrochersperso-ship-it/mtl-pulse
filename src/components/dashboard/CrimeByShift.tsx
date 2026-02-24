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

export interface CrimeByShiftDataPoint {
  category: string;
  jour: number;
  soir: number;
  nuit: number;
}

export interface CrimeByShiftProps {
  data: CrimeByShiftDataPoint[];
  locale?: "fr" | "en";
  className?: string;
}

const JOUR_COLOR = "hsl(45 93% 47%)"; // Day - amber
const SOIR_COLOR = "hsl(25 95% 53%)";  // Evening - orange
const NUIT_COLOR = "hsl(262 83% 58%)"; // Night - purple

export function CrimeByShift({
  data,
  locale = "fr",
  className,
}: CrimeByShiftProps) {
  const labels = {
    jour: locale === "fr" ? "Jour" : "Day",
    soir: locale === "fr" ? "Soir" : "Evening",
    nuit: locale === "fr" ? "Nuit" : "Night",
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {locale === "fr"
            ? "Crimes par quart (jour / soir / nuit)"
            : "Crime by shift (day / evening / night)"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {locale === "fr"
            ? "Répartition horaire pour mieux comprendre les moments à risque"
            : "Time breakdown to understand safer/riskier periods"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
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
                dataKey="category"
                tick={{ fontSize: 11 }}
                tickLine={false}
                width={95}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [
                  (value ?? 0).toLocaleString("fr-CA"),
                  name ? (labels[name as keyof typeof labels] ?? name) : "",
                ]}
              />
              <Legend
                formatter={(value) => labels[value as keyof typeof labels] ?? value}
              />
              <Bar dataKey="jour" stackId="a" fill={JOUR_COLOR} name="jour" />
              <Bar dataKey="soir" stackId="a" fill={SOIR_COLOR} name="soir" />
              <Bar dataKey="nuit" stackId="a" fill={NUIT_COLOR} name="nuit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
