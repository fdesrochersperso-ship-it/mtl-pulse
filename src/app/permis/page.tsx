import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { DataTable } from "@/components/dashboard/DataTable";
import { PointMap } from "@/components/map/PointMap";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getPermitsStats,
  getPermitsByType,
  getPermitsTimeSeries,
  getPermitValueByBorough,
  getDemolitionVsConstructionByBorough,
  searchPermits,
  getPermitFilterOptions,
  getPermitsForMap,
  getPermitTypeLabel,
  getPermitGapBoroughs,
} from "@/lib/db/queries/permits";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { PermisDashboardClient } from "./PermisDashboardClient";

const PERIOD_OPTIONS = [
  { value: "30d", labelFr: "30 jours", labelEn: "30 days" },
  { value: "6m", labelFr: "6 mois", labelEn: "6 months" },
  { value: "1y", labelFr: "1 an", labelEn: "1 year" },
  { value: "5y", labelFr: "5 ans", labelEn: "5 years" },
] as const;

const PERIOD_DAYS: Record<string, number> = {
  "30d": 30,
  "6m": 180,
  "1y": 365,
  "5y": 1825,
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
  if (period === "6m") return "weekly";
  return "monthly";
}

function formatCurrency(val: number, locale: "fr" | "en"): string {
  if (val >= 1e9) return `${(val / 1e9).toFixed(1)}G$`;
  if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M$`;
  if (val >= 1e3) return `${(val / 1e3).toFixed(1)}K$`;
  return `${val}$`;
}

export default async function PermisPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    borough?: string;
    page?: string;
    pageSize?: string;
    q?: string;
    boroughCode?: string;
    permitType?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "1y") as keyof typeof PERIOD_DAYS;
  const boroughCode =
    params.borough && params.borough !== "" ? params.borough : params.boroughCode ?? null;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const pageSize = Math.min(100, Math.max(10, parseInt(params.pageSize ?? "25", 10)));
  const searchQuery = params.q ?? "";
  const tableFilters = {
    boroughCode: params.borough ?? params.boroughCode ?? undefined,
    permitType: params.permitType ?? undefined,
  };

  const { start, end } = getDateRange(period);
  const granularity = getGranularity(period);
  const gapBoroughs = getPermitGapBoroughs();

  const [
    stats,
    byType,
    timeSeriesData,
    boroughValueData,
    demolitionRatioData,
    tableResult,
    filterOptions,
    mapPoints,
    digest,
    lastPipeline,
  ] = await Promise.all([
    getPermitsStats(boroughCode),
    getPermitsByType(start, end, boroughCode),
    getPermitsTimeSeries(boroughCode, start, end, granularity),
    getPermitValueByBorough(start, end, boroughCode),
    getDemolitionVsConstructionByBorough(start, end),
    searchPermits(searchQuery, tableFilters, { page, pageSize }),
    getPermitFilterOptions(),
    getPermitsForMap(
      {
        boroughCode: boroughCode ?? undefined,
        year: new Date().getFullYear(),
      },
      300
    ),
    getLatestDigest("daily", locale, null),
    getPipelineLastSuccess("permis_construction"),
  ]);

  const boroughChartData = boroughValueData.map((b) => ({
    boroughCode: b.boroughCode,
    label: `${BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode}${(gapBoroughs as readonly string[]).includes(b.boroughCode) ? " ⚠️" : ""}`,
    value: b.count,
    perCapita: undefined,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const trendData = timeSeriesData.map((d) => ({
    period: d.period,
    value: d.count,
    previousYearValue: d.previousYearCount,
  }));

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      label: p.permitNumber ?? undefined,
      tooltip: (
        <div className="space-y-1">
          <p className="font-semibold">{p.permitType ?? "—"}</p>
          <p>{p.permitNumber ? `#${p.permitNumber}` : ""}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
          {p.dateIssued && (
            <p className="text-muted-foreground">
              {new Date(p.dateIssued).toLocaleDateString("fr-CA", { dateStyle: "medium" })}
            </p>
          )}
        </div>
      ),
    }));

  const gapLabels = gapBoroughs
    .map((c) => BOROUGHS[c as keyof typeof BOROUGHS]?.name ?? c)
    .join(", ");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Permis de construction" : "Building permits"}
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
              href={`/permis?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
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
            href={`/permis?period=${period}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Toute la ville" : "City-wide"}
          </a>
          {Object.entries(BOROUGHS).map(([code, { name }]) => (
            <a
              key={code}
              href={`/permis?period=${period}&borough=${code}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        {gapBoroughs.length > 0 && (
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
            <CardContent className="flex items-start gap-2 p-4">
              <span className="text-lg" aria-hidden>⚠️</span>
              <p className="text-sm">
                {isFr
                  ? `Données incomplètes pour ${gapLabels} (migration de système en cours).`
                  : `Incomplete data for ${gapLabels} (system migration ongoing).`}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Cette semaine" : "This week"}
            value={stats.thisWeekCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Valeur estimée" : "Estimated value"}
            value={
              stats.thisWeekValue != null
                ? formatCurrency(stats.thisWeekValue, locale)
                : "—"
            }
            tooltip={
              isFr
                ? "Estimations sans valeur légale — la méthodologie varie par arrondissement"
                : "Estimations without legal value — methodology varies by borough"
            }
          />
          <MetricCard
            title={isFr ? "Construction (CO+TR)" : "Construction (CO+TR)"}
            value={stats.constructionCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Démolition" : "Demolition"}
            value={stats.demolitionCount.toLocaleString("fr-CA")}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {isFr
            ? "Les coûts estimés sont « sans valeur légale » et la méthodologie varie par arrondissement."
            : "Estimated costs are 'without legal value' and methodology varies by borough."}
        </p>
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
        <PermisDashboardClient
          trendData={trendData}
          byType={byType}
          boroughChartData={boroughChartData}
          demolitionRatioData={demolitionRatioData}
          tableResult={tableResult}
          filterOptions={filterOptions}
          period={period}
          boroughCode={boroughCode}
          searchQuery={searchQuery}
          tableFilters={tableFilters}
          locale={locale}
          gapBoroughs={gapBoroughs}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des permis" : "Permit map"}
          caveat={
            isFr
              ? "73 % centroïde, 24 % segment de rue, 3 % non géolocalisé."
              : "73% centroid, 24% street segment, 3% not geolocated."
          }
          locale={locale}
        />
      )}

    </div>
  );
}
