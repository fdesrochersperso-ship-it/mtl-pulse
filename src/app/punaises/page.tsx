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
  getBedbugsStats,
  getBedbugsByBorough,
  getBedbugsTimeSeries,
  getBedbugsForMap,
} from "@/lib/db/queries/bedbugs";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { PunaisesDashboardClient } from "./PunaisesDashboardClient";

const PERIOD_OPTIONS = [
  { value: "1y", labelFr: "1 an", labelEn: "1 year" },
  { value: "5y", labelFr: "5 ans", labelEn: "5 years" },
] as const;

function getDateRange(period: string): { start: string; end: string } {
  const end = new Date();
  const years = period === "5y" ? 5 : 1;
  const start = new Date();
  start.setFullYear(start.getFullYear() - years);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default async function PunaisesPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; borough?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "1y") as string;
  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;

  const { start, end } = getDateRange(period);

  const [stats, boroughData, timeSeriesData, mapPoints, digest, lastPipeline] =
    await Promise.all([
      getBedbugsStats(boroughCode),
      getBedbugsByBorough(start, end),
      getBedbugsTimeSeries(boroughCode, start, end, "monthly"),
      getBedbugsForMap({ boroughCode: boroughCode ?? undefined, startDate: start, endDate: end }, 300),
      getLatestDigest("daily", locale, null),
      getPipelineLastSuccess("bedbug_reports"),
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

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p>{p.reportDate ? new Date(p.reportDate).toLocaleDateString("fr-CA", { dateStyle: "medium" }) : ""}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Punaises de lit" : "Bedbugs"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={24 * 31}
              locale={locale}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`/punaises?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isFr ? "Arrondissement:" : "Borough:"}
          </span>
          <a
            href={`/punaises?period=${period}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Toute la ville" : "City-wide"}
          </a>
          {Object.entries(BOROUGHS).map(([code, { name }]) => (
            <a
              key={code}
              href={`/punaises?period=${period}&borough=${code}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <MetricCard
            title={isFr ? "Total déclarations" : "Total reports"}
            value={stats.totalReports.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Cette année" : "YTD"}
            value={stats.ytdCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus touché" : "Most affected borough"}
            value={
              stats.topBorough
                ? BOROUGHS[stats.topBorough as keyof typeof BOROUGHS]?.name ?? stats.topBorough
                : "—"
            }
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {isFr ? "Données depuis 2011." : "Data since 2011."}
        </p>
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
        <PunaisesDashboardClient
          trendData={trendData}
          boroughChartData={boroughChartData}
          locale={locale}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des déclarations" : "Reports map"}
          locale={locale}
        />
      )}
    </div>
  );
}
