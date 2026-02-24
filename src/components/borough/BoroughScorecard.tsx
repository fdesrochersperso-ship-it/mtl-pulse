"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScorecardMetric {
  metricName: string;
  value: number;
  cityAvg: number;
  vsAvg: "better" | "worse" | "neutral";
  deltaPct: number | null;
  labelKey: { fr: string; en: string };
  format: (n: number) => string;
}

export function BoroughScorecard({
  metrics,
  locale,
}: {
  metrics: ScorecardMetric[];
  locale: "fr" | "en";
}) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {locale === "fr" ? "Tableau de bord" : "Scorecard"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {locale === "fr"
            ? "Comparaison avec la moyenne montréalaise"
            : "Compared to Montreal average"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.metricName}
              className="flex flex-col rounded-lg border p-4"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {m.labelKey[locale as "fr" | "en"]}
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">
                  {m.format(m.value)}
                </span>
                <VsAvgBadge vsAvg={m.vsAvg} deltaPct={m.deltaPct} locale={locale} />
              </div>
              <span className="mt-1 text-xs text-muted-foreground">
                {locale === "fr" ? "Moyenne ville" : "City avg"}: {m.format(m.cityAvg)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function VsAvgBadge({
  vsAvg,
  deltaPct,
  locale,
}: {
  vsAvg: "better" | "worse" | "neutral";
  deltaPct: number | null;
  locale: "fr" | "en";
}) {
  if (vsAvg === "neutral") return null;

  const isBetter = vsAvg === "better";
  const Icon = isBetter ? TrendingDown : TrendingUp;
  const pctText =
    deltaPct != null
      ? ` ${deltaPct > 0 ? "+" : ""}${deltaPct}%`
      : "";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
        isBetter
          ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
          : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400"
      )}
    >
      <Icon className="h-3 w-3" />
      {locale === "fr"
        ? isBetter
          ? `Mieux${pctText}`
          : `Pire${pctText}`
        : isBetter
          ? `Better${pctText}`
          : `Worse${pctText}`}
    </span>
  );
}
