import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getRoadConditionByBorough,
  getWorstRoads,
} from "@/lib/db/queries/roadConditions";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { RoutesDashboardClient } from "./RoutesDashboardClient";

export default async function RoutesPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  const [byBorough, worstRoads, lastPipeline] = await Promise.all([
    getRoadConditionByBorough(),
    getWorstRoads(30),
    getPipelineLastSuccess("road_condition"),
  ]);

  const boroughChartData = byBorough.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.avgPci,
    isHighlighted: false,
  }));

  const worstBorough = byBorough.length > 0 ? byBorough[0] : null;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "État des chaussées" : "Road condition"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={720}
              locale={locale}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "PCI moyen (ville)" : "Avg PCI (city)"}
            value={
              byBorough.length > 0
                ? (
                    byBorough.reduce((a, b) => a + b.avgPci, 0) / byBorough.length
                  ).toFixed(1)
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus dégradé" : "Worst borough"}
            value={
              worstBorough
                ? BOROUGHS[worstBorough.boroughCode as keyof typeof BOROUGHS]?.name ?? worstBorough.boroughCode
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Segments évalués" : "Segments assessed"}
            value={byBorough.reduce((a, b) => a + b.segmentCount, 0).toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "PCI = Indice de condition" : "PCI = Condition index"}
            value="0–100"
          />
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <RoutesDashboardClient
          boroughChartData={boroughChartData}
          worstRoads={worstRoads}
          locale={locale}
        />
      </Suspense>

      {byBorough.length === 0 && worstRoads.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {locale === "fr"
              ? "Données de condition des chaussées à venir (condition-chaussees-reseau-routier). Corrélation condition vs contrats — pipeline contrats requis."
              : "Road condition data coming soon (condition-chaussees-reseau-routier). Condition vs contract spending correlation — contracts pipeline required."}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
