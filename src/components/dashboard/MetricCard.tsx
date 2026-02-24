"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: {
    value: number;
    type: "percent" | "absolute";
    direction: "up" | "down" | "neutral";
    improveOnUp?: boolean;
  };
  /** Native HTML title (browser tooltip on hover) */
  tooltip?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  delta,
  tooltip,
  className,
}: MetricCardProps) {
  const deltaColor =
    delta && delta.direction !== "neutral"
      ? delta.improveOnUp
        ? delta.direction === "up"
          ? "text-green-600 dark:text-green-500"
          : "text-red-600 dark:text-red-500"
        : delta.direction === "up"
          ? "text-red-600 dark:text-red-500"
          : "text-green-600 dark:text-green-500"
      : "text-muted-foreground";

  return (
    <Card
      className={cn(
        "flex flex-col justify-between transition-colors hover:bg-muted/50",
        className
      )}
      title={tooltip}
    >
      <CardContent className="p-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {delta && delta.direction !== "neutral" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-sm font-medium",
                deltaColor
              )}
            >
              {delta.direction === "up" && <ArrowUp className="h-3.5 w-3.5" />}
              {delta.direction === "down" && (
                <ArrowDown className="h-3.5 w-3.5" />
              )}
              {delta.type === "percent"
                ? `${Math.abs(delta.value).toFixed(0)}%`
                : Math.abs(delta.value).toLocaleString("fr-CA")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
