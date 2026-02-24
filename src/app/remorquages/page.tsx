import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { PointMap } from "@/components/map/PointMap";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getTowingsStats,
  getTowingsByBorough,
  getTowingsByReason,
  getTowingsTimeSeries,
  getTowingsForMap,
} from "@/lib/db/queries/towings";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { RemorquagesDashboardClient } from "./RemorquagesDashboardClient";

const PERIOD_OPTIONS = [
  { value: "30d", labelFr: "30 jours", labelEn: "30 days" },
  { value: "6m", labelFr: "6 mois", labelEn: "6 months" },
  { value: "1y", labelFr: "1 an", labelEn: "1 year" },
] as const;

const PERIOD_DAYS: Record<string, number> = {
  "30d": 30,
  "6m": 180,
  "1y": 365,
};

function getDateRange(period: string): { start: string; end: string } {
  const end = new Date();
  const days = PERIOD_DAYS[period] ?? 180;
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default async function RemorquagesPage({
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
    stats,
    boroughData,
    byReason,
    timeSeriesData,
    mapPoints,
    digest,
    lastPipeline,
  ] = await Promise.all([
    getTowingsStats(boroughCode),
    getTowingsByBorough(start, end),
    getTowingsByReason(start, end, boroughCode),
    getTowingsTimeSeries(boroughCode, start, end, "weekly"),
    getTowingsForMap({ boroughCode: boroughCode ?? undefined, startDate: start, endDate: end }, 300),
    getLatestDigest("daily", locale, null),
    getPipelineLastSuccess("remorquages"),
  ]);

  const trendData = timeSeriesData.map((d) => ({
    period: d.period,
    value: d.count,
    previousYearValue: d.previousYearCount,
  }));

  const boroughChartData = boroughData.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.count,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const reasonChartData = byReason.map((r) => ({
    boroughCode: r.reason,
    label: r.reason.length > 35 ? r.reason.slice(0, 35) + "…" : r.reason,
    value: r.count,
    isHighlighted: false,
  }));

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p className="font-semibold">{p.reason ?? "—"}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
          <p className="text-muted-foreground text-xs">
            {new Date(p.towingDate).toLocaleDateString("fr-CA", { dateStyle: "medium" })}
          </p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Remorquages" : "Snow towings"}
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
              href={`/remorquages?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
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

        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <CardContent className="flex items-start gap-2 p-4">
            <span className="text-lg" aria-hidden>⚠️</span>
            <p className="text-sm">
              {isFr
                ? "Données avant nov. 2015 : pas de coordonnées GPS — exclues de la carte."
                : "Data before Nov 2015 has no GPS coordinates — excluded from map."}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Aujourd'hui" : "Today"}
            value={stats.todayCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Saison (nov–mar)" : "Season (Nov–Mar)"}
            value={stats.seasonCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus touché" : "Most affected borough"}
            value={
              stats.topBorough
                ? BOROUGHS[stats.topBorough as keyof typeof BOROUGHS]?.name ?? stats.topBorough
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Motif dominant" : "Top motive"}
            value={stats.topReason ?? "—"}
          />
        </div>
      </div>

      {digest && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">
              {isFr ? "Aperçu IA" : "AI insight"}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {digest.summary.slice(0, 400)}
              {digest.summary.length > 400 ? "…" : ""}
            </p>
          </CardContent>
        </Card>
      )}

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <RemorquagesDashboardClient
          trendData={trendData}
          boroughChartData={boroughChartData}
          reasonChartData={reasonChartData}
          locale={locale}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des remorquages" : "Towings map"}
          caveat={
            isFr
              ? "Données avec GPS uniquement (depuis nov. 2015)."
              : "Data with GPS only (since Nov 2015)."
          }
          locale={locale}
        />
      )}
    </div>
  );
}
