import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PointMap } from "@/components/map/PointMap";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getWaterBreaksYtd,
  getWaterBreaksByBorough,
  getWaterBreaksTimeSeries,
  getWaterBreaksForMap,
} from "@/lib/db/queries/waterBreaks";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { EauDashboardClient } from "./EauDashboardClient";

const PERIOD_OPTIONS = [
  { value: "5y", labelFr: "5 ans", labelEn: "5 years" },
  { value: "10y", labelFr: "10 ans", labelEn: "10 years" },
] as const;

function getDateRange(period: string): { start: string; end: string } {
  const end = new Date();
  const years = period === "10y" ? 10 : 5;
  const start = new Date();
  start.setFullYear(start.getFullYear() - years);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default async function EauPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; borough?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "5y") as string;
  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;

  const { start, end } = getDateRange(period);

  const [
    ytdCount,
    byBorough,
    timeSeries,
    mapBreaks,
    lastPipeline,
  ] = await Promise.all([
    getWaterBreaksYtd(boroughCode),
    getWaterBreaksByBorough(start, end),
    getWaterBreaksTimeSeries(start, end, "yearly"),
    getWaterBreaksForMap(
      { startDate: start, endDate: end, boroughCode: boroughCode ?? undefined },
      500
    ),
    getPipelineLastSuccess("water_breaks"),
  ]);

  const boroughChartData = byBorough.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.count,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const mapPoints = mapBreaks
    .filter((b) => b.lat != null && b.lng != null)
    .map((b) => ({
      id: b.id,
      position: [b.lat!, b.lng!] as [number, number],
      tooltip: (
        <div>
          <p className="font-semibold">{b.streetName ?? "—"}</p>
          <p>
            {new Date(b.breakDate).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA")}
          </p>
          {b.breakType && <p className="text-muted-foreground text-xs">{b.breakType}</p>}
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Infrastructure de l'eau" : "Water infrastructure"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={168}
              locale={locale}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Bris YTD" : "Breaks YTD"}
            value={ytdCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Période" : "Period"}
            value={period === "10y" ? "10 ans" : "5 ans"}
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus touché" : "Most affected borough"}
            value={
              byBorough.length > 0
                ? BOROUGHS[byBorough[0]!.boroughCode as keyof typeof BOROUGHS]?.name ?? byBorough[0]!.boroughCode
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Données depuis" : "Data since"}
            value="1972"
          />
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <EauDashboardClient
          timeSeries={timeSeries}
          boroughChartData={boroughChartData}
          locale={locale}
        />
      </Suspense>

      {mapPoints.length > 0 && (
        <PointMap
          points={mapPoints}
          title={isFr ? "Bris de conduites" : "Water main breaks"}
          caveat={isFr ? "Données depuis 1972 (réparation-reseau-eau-potable)." : "Data since 1972 (réparation-reseau-eau-potable)."}
          locale={locale}
        />
      )}

      {byBorough.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {locale === "fr"
              ? "Données de bris d'eau à venir (reparation-reseau-eau-potable)."
              : "Water break data coming soon (reparation-reseau-eau-potable)."}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
