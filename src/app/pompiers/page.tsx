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
  getFireStats,
  getFireInterventionsByType,
  getFireFalseAlarmRateByBorough,
  getFireFalseAlarmTimeSeries,
  getFireUnitsDistribution,
  getFireInterventionsTimeSeries,
  getFireInterventionsByBorough,
  getFireInterventionsForMap,
  getFireTypeLabel,
} from "@/lib/db/queries/fire";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { PompiersDashboardClient } from "./PompiersDashboardClient";

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

function getGranularity(period: string): "daily" | "weekly" | "monthly" {
  if (period === "30d") return "weekly";
  return "monthly";
}

export default async function PompiersPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    borough?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "30d") as string;
  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;

  const { start, end } = getDateRange(period);
  const granularity = getGranularity(period);

  const [
    stats,
    byType,
    falseAlarmByBorough,
    falseAlarmTimeSeries,
    unitsDistribution,
    timeSeriesData,
    boroughData,
    mapPoints,
    digest,
    lastPipeline,
  ] = await Promise.all([
    getFireStats(boroughCode),
    getFireInterventionsByType(start, end, boroughCode),
    getFireFalseAlarmRateByBorough(start, end),
    getFireFalseAlarmTimeSeries(boroughCode, start, end, "monthly"),
    getFireUnitsDistribution(start, end, boroughCode),
    getFireInterventionsTimeSeries(boroughCode, start, end, granularity),
    getFireInterventionsByBorough(start, end),
    getFireInterventionsForMap(
      { boroughCode: boroughCode ?? undefined, startDate: start, endDate: end },
      300
    ),
    getLatestDigest("daily", locale, null),
    getPipelineLastSuccess("fire_interventions"),
  ]);

  const trendData = timeSeriesData.map((d) => ({
    period: d.period,
    value: d.count,
    previousYearValue: d.previousYearCount,
  }));

  const typeChartData = byType.map((t) => ({
    boroughCode: t.incidentType,
    label: getFireTypeLabel(t.incidentType, locale),
    value: t.count,
    isHighlighted: false,
  }));

  const boroughChartData = boroughData.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.count,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const falseAlarmChartData = falseAlarmByBorough.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.falseAlarmRate,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const unitsChartData = unitsDistribution.map((u) => ({
    boroughCode: String(u.numUnits),
    label: `${u.numUnits} ${locale === "fr" ? "unités" : "units"}`,
    value: u.count,
    isHighlighted: false,
  }));

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p className="font-semibold">{getFireTypeLabel(p.incidentType ?? "", locale)}</p>
          <p>{p.incidentDate ? new Date(p.incidentDate).toLocaleDateString("fr-CA", { dateStyle: "medium" }) : ""}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
          {p.numUnits != null && <p>{locale === "fr" ? "Unités" : "Units"}: {p.numUnits}</p>}
          <p className="text-muted-foreground text-xs">
            {isFr ? "Emplacement obfusqué à l'intersection" : "Location obfuscated to intersection"}
          </p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Interventions des pompiers" : "Fire department interventions"}
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
              href={`/pompiers?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
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
            href={`/pompiers?period=${period}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Toute la ville" : "City-wide"}
          </a>
          {Object.entries(BOROUGHS).map(([code, { name }]) => (
            <a
              key={code}
              href={`/pompiers?period=${period}&borough=${code}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Aujourd'hui" : "Today"}
            value={stats.todayCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "7 derniers jours" : "Last 7 days"}
            value={stats.total7d.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Taux fausses alertes" : "False alarm rate"}
            value={stats.falseAlarmRate != null ? `${stats.falseAlarmRate}%` : "—"}
          />
          <MetricCard
            title={isFr ? "Type dominant" : "Top type"}
            value={stats.topType ? getFireTypeLabel(stats.topType, locale) : "—"}
          />
        </div>
      </div>

      {digest && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">
              {isFr ? "Aperçu IA — Résumé quotidien" : "AI insight — Daily digest"}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {digest.summary.slice(0, 500)}
              {digest.summary.length > 500 ? "…" : ""}
            </p>
          </CardContent>
        </Card>
      )}

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <PompiersDashboardClient
          trendData={trendData}
          typeChartData={typeChartData}
          boroughChartData={boroughChartData}
          falseAlarmChartData={falseAlarmChartData}
          falseAlarmTimeSeries={falseAlarmTimeSeries}
          unitsChartData={unitsChartData}
          locale={locale}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des interventions" : "Fire intervention map"}
          caveat={
            isFr
              ? "Emplacement obfusqué à l'intersection la plus proche."
              : "Location obfuscated to nearest intersection."
          }
          locale={locale}
        />
      )}
    </div>
  );
}
