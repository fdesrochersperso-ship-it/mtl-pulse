"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SafetyIndexRow {
  boroughCode: string;
  boroughName: string;
  safetyScore: number;
  crimePerCapita: number;
  firePerCapita: number;
  crimeCount: number;
  fireCount: number;
}

export interface SafetyIndexHeatmapProps {
  data: SafetyIndexRow[];
  locale?: "fr" | "en";
  className?: string;
}

function scoreColor(score: number): string {
  if (score >= 80) return "bg-green-500/80";
  if (score >= 60) return "bg-green-400/60";
  if (score >= 40) return "bg-yellow-500/60";
  if (score >= 20) return "bg-orange-500/60";
  return "bg-red-500/60";
}

export function SafetyIndexHeatmap({
  data,
  locale = "fr",
  className,
}: SafetyIndexHeatmapProps) {
  const title =
    locale === "fr"
      ? "Indice de sécurité (criminalité + pompiers)"
      : "Safety index (crime + fire)";
  const subtitle =
    locale === "fr"
      ? "Score par arrondissement — normalisé per capita, pondéré par gravité"
      : "Score by borough — per capita normalized, severity weighted";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((row, idx) => (
            <div
              key={row.boroughCode}
              className={cn(
                "flex items-center justify-between rounded-lg border p-3 transition-colors",
                scoreColor(row.safetyScore)
              )}
            >
              <div>
                <p className="font-medium">{row.boroughName}</p>
                <p className="text-xs text-muted-foreground">
                  {locale === "fr" ? "Score" : "Score"}: {row.safetyScore}
                  {locale === "fr" ? " — " : " — "}
                  {row.crimeCount} {locale === "fr" ? "crimes" : "crimes"}, {row.fireCount}{" "}
                  {locale === "fr" ? "pompiers" : "fire"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{row.safetyScore}</p>
                <p className="text-xs opacity-80">
                  #{idx + 1} {locale === "fr" ? "sécuritaire" : "safest"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
