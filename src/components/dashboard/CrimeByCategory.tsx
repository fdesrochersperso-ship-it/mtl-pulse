"use client";

import { useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
  "hsl(var(--muted-foreground))",
];

export interface CrimeByCategoryProps {
  data: { category: string; count: number }[];
  selectedCategory: string | null;
  onCategoryClick: (category: string | null) => void;
  locale?: "fr" | "en";
  className?: string;
}

export function CrimeByCategory({
  data,
  selectedCategory,
  onCategoryClick,
  locale = "fr",
  className,
}: CrimeByCategoryProps) {
  const chartData = data.map((d, i) => ({
    ...d,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    isSelected: selectedCategory == null || selectedCategory === d.category,
  }));

  const handleBarClick = useCallback(
    (category: string) => {
      const next = selectedCategory === category ? null : category;
      onCategoryClick(next);
    },
    [selectedCategory, onCategoryClick]
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {locale === "fr"
            ? "Crimes par catégorie"
            : "Crime by category"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {locale === "fr"
            ? "Cliquez sur une catégorie pour filtrer le tableau et la carte"
            : "Click a category to filter the table and map"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10 }}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
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
                formatter={(value, _name, props) => [
                  ((value as number) ?? 0).toLocaleString("fr-CA"),
                  (props as { payload: { category: string } }).payload?.category ?? "",
                ]}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
                fill="hsl(var(--primary))"
                onClick={(data: unknown) => {
                  const d = data as { payload?: { category?: string }; category?: string };
                  const cat = d?.payload?.category ?? d?.category;
                  if (cat) handleBarClick(cat);
                }}
                style={{ cursor: "pointer" }}
              >
                {chartData.map((entry, i) => (
                  <Cell
                    key={entry.category}
                    fill={
                      entry.isSelected
                        ? CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                        : "hsl(var(--muted))"
                    }
                    opacity={entry.isSelected ? 1 : 0.4}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {selectedCategory && (
          <button
            type="button"
            onClick={() => onCategoryClick(null)}
            className="mt-2 text-sm text-primary hover:underline"
          >
            {locale === "fr" ? "Réinitialiser le filtre" : "Clear filter"}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
