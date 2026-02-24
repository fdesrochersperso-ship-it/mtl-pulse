import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PointMap } from "@/components/map/PointMap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getCurrentCityIqa,
  getCurrentIqaBySector,
  getBadAirDaysPerYear,
  getPollutantTrend,
  getAirQualityStations,
} from "@/lib/db/queries/airQuality";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { AirDashboardClient } from "./AirDashboardClient";

function iqaLabel(iqa: number, locale: string): string {
  if (iqa <= 25) return locale === "fr" ? "Bon" : "Good";
  if (iqa <= 50) return locale === "fr" ? "Acceptable" : "Acceptable";
  return locale === "fr" ? "Mauvais" : "Poor";
}

export default async function AirPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "1y") as string;
  const days = period === "30d" ? 30 : period === "6m" ? 180 : 365;
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);

  const [
    currentIqa,
    bySector,
    badAirDays,
    pollutantTrend,
    stations,
    lastPipeline,
  ] = await Promise.all([
    getCurrentCityIqa(),
    getCurrentIqaBySector(),
    getBadAirDaysPerYear(),
    getPollutantTrend(startDate, endDate, period === "30d" ? "daily" : "monthly"),
    getAirQualityStations(),
    getPipelineLastSuccess("air_quality"),
  ]);

  const mapPoints = stations
    .filter((s) => s.lat != null && s.lng != null)
    .map((s, i) => ({
      id: i,
      position: [s.lat!, s.lng!] as [number, number],
      tooltip: (
        <div>
          <p className="font-semibold">{s.sectorName ?? s.stationId}</p>
          <p>
            IQA: {s.latestIqa ?? "—"} ({iqaLabel(s.latestIqa ?? 0, locale)})
          </p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Qualité de l'air" : "Air quality"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={2}
              locale={locale}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "IQA actuel" : "Current IQA"}
            value={
              currentIqa
                ? `${currentIqa.iqa} (${iqaLabel(currentIqa.iqa, locale)})`
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Secteurs" : "Sectors"}
            value={bySector.length.toString()}
          />
          <MetricCard
            title={isFr ? "Jours mauvais air (année)" : "Bad air days (year)"}
            value={
              badAirDays.length > 0
                ? badAirDays[0]?.count.toString() ?? "—"
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Polluant" : "Pollutant"}
            value={currentIqa?.pollutant ?? "—"}
          />
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <AirDashboardClient
          bySector={bySector}
          badAirDays={badAirDays}
          pollutantTrend={pollutantTrend}
          locale={locale}
          iqaLabel={(v) => iqaLabel(v, locale)}
        />
      </Suspense>

      {mapPoints.length > 0 && (
        <PointMap
          points={mapPoints}
          title={isFr ? "Stations de mesure IQA" : "IQA monitoring stations"}
          caveat={
            isFr
              ? "IQA = Indice de la qualité de l'air (RSQA). EST année civile."
              : "IQA = Air quality index (RSQA). Uses EST year-round."
          }
          locale={locale}
        />
      )}
    </div>
  );
}
