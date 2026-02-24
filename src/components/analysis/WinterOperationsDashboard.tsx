"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { cn } from "@/lib/utils";

export interface WinterOpsData {
  towingsCount: number;
  snow311Count: number;
  potholesYtd: number;
  seasonStart: string;
  seasonEnd: string;
  isActive: boolean;
}

export interface WinterOperationsDashboardProps {
  data: WinterOpsData;
  locale?: "fr" | "en";
  className?: string;
}

export function WinterOperationsDashboard({
  data,
  locale = "fr",
  className,
}: WinterOperationsDashboardProps) {
  const seasonLabel =
    locale === "fr"
      ? `Saison ${data.seasonStart.slice(0, 4)}–${data.seasonEnd.slice(0, 4)}`
      : `Season ${data.seasonStart.slice(0, 4)}–${data.seasonEnd.slice(0, 4)}`;
  const activeLabel = data.isActive
    ? locale === "fr"
      ? "Saison active"
      : "Active season"
    : locale === "fr"
      ? "Hors saison"
      : "Off season";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {locale === "fr" ? "Opérations hivernales" : "Winter operations"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {seasonLabel} — {activeLabel}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <MetricCard
            title={locale === "fr" ? "Remorquages" : "Towings"}
            value={data.towingsCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={locale === "fr" ? "Plaintes 311 (neige)" : "311 complaints (snow)"}
            value={data.snow311Count.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={locale === "fr" ? "Nids-de-poule réparés (YTD)" : "Potholes repaired (YTD)"}
            value={data.potholesYtd.toLocaleString("fr-CA")}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {locale === "fr"
            ? "Tableau de bord saisonnier actif de novembre à avril. Les nids-de-poule augmentent typiquement au dégel printanier."
            : "Seasonal dashboard active November–April. Potholes typically spike during spring thaw."}
        </p>
      </CardContent>
    </Card>
  );
}
