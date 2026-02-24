"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DayOfWeekPoint {
  dayOfWeek: number;
  dayLabel: string;
  value: number;
}

export interface DayOfWeekHeatmapProps {
  data: DayOfWeekPoint[];
  title?: string;
  valueLabel?: string;
  locale?: "fr" | "en";
  className?: string;
}

export function DayOfWeekHeatmap({
  data,
  title,
  valueLabel,
  locale = "fr",
  className,
}: DayOfWeekHeatmapProps) {
  const maxVal = useMemo(
    () => Math.max(...data.map((d) => d.value), 1),
    [data]
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {title ?? (locale === "fr" ? "Activité par jour de la semaine" : "Activity by day of week")}
        </h3>
        {valueLabel && (
          <p className="text-sm text-muted-foreground">{valueLabel}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {data.map((d) => {
            const intensity = maxVal > 0 ? d.value / maxVal : 0;
            return (
              <div
                key={d.dayOfWeek}
                className="flex flex-col items-center rounded-lg border p-2"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {d.dayLabel}
                </p>
                <div
                  className={cn(
                    "mt-2 h-12 w-full rounded-md transition-colors",
                    intensity >= 0.8
                      ? "bg-primary"
                      : intensity >= 0.6
                        ? "bg-primary/70"
                        : intensity >= 0.4
                          ? "bg-primary/50"
                          : intensity >= 0.2
                            ? "bg-primary/30"
                            : "bg-muted"
                  )}
                  title={`${d.dayLabel}: ${d.value.toLocaleString("fr-CA")}`}
                />
                <p className="mt-1 text-sm font-semibold">
                  {d.value.toLocaleString("fr-CA")}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
