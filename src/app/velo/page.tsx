import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PointMap } from "@/components/map/PointMap";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getCyclingTimeSeries,
  getCyclingVolumeToday,
  getCyclingByBorough,
  getCyclingCountersForMap,
} from "@/lib/db/queries/cycling";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { VeloDashboardClient } from "./VeloDashboardClient";

const PERIOD_OPTIONS = [
  { value: "30d", labelFr: "30 jours", labelEn: "30 days" },
  { value: "6m", labelFr: "6 mois", labelEn: "6 months" },
  { value: "1y", labelFr: "1 an", labelEn: "1 year" },
] as const;

function getDateRange(period: string): { start: string; end: string } {
  const end = new Date();
  const days = period === "30d" ? 30 : period === "6m" ? 180 : 365;
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default async function VeloPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; borough?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "6m") as string;
  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;

  const { start, end } = getDateRange(period);

  const [
    volumeToday,
    timeSeries,
    byBorough,
    mapCounters,
    lastPipeline,
  ] = await Promise.all([
    getCyclingVolumeToday(boroughCode),
    getCyclingTimeSeries(start, end, period === "30d" ? "daily" : "weekly", boroughCode),
    getCyclingByBorough(start, end),
    getCyclingCountersForMap(start, end),
    getPipelineLastSuccess("cycling_counts"),
  ]);

  const boroughChartData = byBorough.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.volume,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const mapPoints = mapCounters
    .filter((c) => c.lat != null && c.lng != null)
    .map((c, i) => ({
      id: i,
      position: [c.lat!, c.lng!] as [number, number],
      tooltip: (
        <div>
          <p className="font-semibold">{c.counterId}</p>
          <p>
            {locale === "fr" ? "Passages" : "Passes"}: {c.volume.toLocaleString("fr-CA")}
          </p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Ville cyclable" : "Cycling city"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={24}
              locale={locale}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`/velo?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                period === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {isFr ? opt.labelFr : opt.labelEn}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Passages aujourd'hui" : "Passes today"}
            value={volumeToday.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Période" : "Period"}
            value={period === "30d" ? "30j" : period === "6m" ? "6m" : "1 an"}
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus actif" : "Most active borough"}
            value={
              byBorough.length > 0
                ? BOROUGHS[byBorough[0]!.boroughCode as keyof typeof BOROUGHS]?.name ?? byBorough[0]!.boroughCode
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Compteurs" : "Counters"}
            value={mapCounters.length.toString()}
          />
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <VeloDashboardClient
          timeSeries={timeSeries}
          boroughChartData={boroughChartData}
          locale={locale}
        />
      </Suspense>

      {mapPoints.length > 0 && (
        <PointMap
          points={mapPoints}
          title={isFr ? "Compteurs cyclistes" : "Cycling counters"}
          caveat={isFr ? "Données velos-comptage." : "Data from velos-comptage."}
          locale={locale}
        />
      )}

      {timeSeries.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {locale === "fr"
              ? "Données de comptage cyclistes à venir (velos-comptage). BIXI disponibilité — pipeline GBFS à venir."
              : "Cycling count data coming soon (velos-comptage). BIXI availability — GBFS pipeline coming."}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
