"use client";

import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnomalyBadgeProps {
  metricLabel: string;
  deltaPct: number;
  direction: "up" | "down";
  detail?: string;
  locale?: "fr" | "en";
  className?: string;
}

export function AnomalyBadge({
  metricLabel,
  deltaPct,
  direction,
  detail,
  locale = "fr",
  className,
}: AnomalyBadgeProps) {
  const pctStr = `${Math.abs(deltaPct).toFixed(1)}%`;
  const isImprovement =
    (metricLabel.toLowerCase().includes("crime") || metricLabel.toLowerCase().includes("criminalité")) &&
    direction === "down";

  const message =
    locale === "fr"
      ? `${metricLabel} ${direction === "up" ? "en hausse" : "en baisse"} de ${pctStr}${detail ? ` — ${detail}` : ""}`
      : `${metricLabel} ${direction === "up" ? "up" : "down"} ${pctStr}${detail ? ` — ${detail}` : ""}`;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
        direction === "up" && !isImprovement
          ? "border-destructive/50 bg-destructive/10 text-destructive"
          : direction === "down" && !isImprovement
            ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400"
            : isImprovement
              ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
              : "border-muted bg-muted/50",
        className
      )}
    >
      {direction === "up" ? (
        isImprovement ? (
          <TrendingDown className="h-4 w-4 shrink-0" />
        ) : (
          <AlertTriangle className="h-4 w-4 shrink-0" />
        )
      ) : (
        <TrendingUp className="h-4 w-4 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}
