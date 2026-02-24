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
  getPotholesStats,
  getPotholesByBorough,
  getPotholesTimeSeries,
  getPotholesForMap,
} from "@/lib/db/queries/potholes";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { NidsDePouleDashboardClient } from "./NidsDePouleDashboardClient";

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

export default async function NidsDePoulePage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "1y") as string;
  const { start, end } = getDateRange(period);

  const [stats, boroughData, timeSeriesData, mapPoints, digest, lastPipeline] =
    await Promise.all([
      getPotholesStats(),
      getPotholesByBorough(start, end),
      getPotholesTimeSeries(start, end, "monthly"),
      getPotholesForMap({ startDate: start, endDate: end }, 300),
      getLatestDigest("daily", locale, null),
      getPipelineLastSuccess("pothole_repairs"),
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
    isHighlighted: false,
  }));

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p>{p.repairDate ? new Date(p.repairDate).toLocaleDateString("fr-CA", { dateStyle: "medium" }) : ""}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Nids-de-poule" : "Potholes"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={24 * 7}
              locale={locale}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`/nids-de-poule?period=${opt.value}`}
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
                ? "Réseau SIRR uniquement (artères) — exclut les réparations manuelles par arrondissement."
                : "SIRR network only (arterial roads) — excludes borough manual repairs."}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Cette année" : "YTD"}
            value={stats.ytdCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Ce mois" : "This month"}
            value={stats.thisMonthCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Pic saisonnier" : "Seasonal peak"}
            value={stats.peakMonth ?? "—"}
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
        <NidsDePouleDashboardClient
          trendData={trendData}
          boroughChartData={boroughChartData}
          locale={locale}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des réparations" : "Repairs map"}
          caveat={
            isFr
              ? "Réseau artériel SIRR uniquement — exclut les réparations manuelles des arrondissements."
              : "SIRR arterial network only — excludes borough manual repairs."
          }
          locale={locale}
        />
      )}
    </div>
  );
}
