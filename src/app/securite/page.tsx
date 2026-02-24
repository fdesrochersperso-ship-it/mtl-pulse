import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CrimeMap } from "@/components/map/CrimeMap";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import { getLastMetricsUpdate } from "@/lib/db/queries/metrics";
import {
  getCrimeTimeSeries,
  getCrimeByCategory,
  getCrimeByShiftPerCategory,
  getCrimeByPDQ,
  getCrimeByBorough,
  getCrimeStats,
  searchCrimes,
  getCrimeFilterOptions,
  getCrimesForMap,
} from "@/lib/db/queries/crimes";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { SecuriteDashboardClient } from "./SecuriteDashboardClient";

const PERIOD_OPTIONS = [
  { value: "7d", labelFr: "7 jours", labelEn: "7 days" },
  { value: "30d", labelFr: "30 jours", labelEn: "30 days" },
  { value: "6m", labelFr: "6 mois", labelEn: "6 months" },
  { value: "1y", labelFr: "1 an", labelEn: "1 year" },
  { value: "5y", labelFr: "5 ans", labelEn: "5 years" },
] as const;

const PERIOD_DAYS: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "6m": 180,
  "1y": 365,
  "5y": 1825,
};

function getDateRange(period: string): { start: string; end: string } {
  const end = new Date();
  const days = PERIOD_DAYS[period] ?? 30;
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function getGranularity(period: string): "daily" | "weekly" | "monthly" {
  if (period === "7d" || period === "30d") return "daily";
  if (period === "6m") return "weekly";
  return "monthly";
}

export default async function SecuritePage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    borough?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "30d") as "7d" | "30d" | "6m" | "1y" | "5y";
  const boroughCode =
    params.borough && params.borough !== "" ? params.borough : null;
  const categoryFilter =
    params.category && params.category !== "" ? params.category : null;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const { start, end } = getDateRange(period);
  const granularity = getGranularity(period);

  const [
    stats,
    timeSeriesData,
    categoryData,
    shiftPerCategoryData,
    boroughData,
    boroughDataPerCapita,
    pdqData,
    tableResult,
    filterOptions,
    mapMarkers,
    weeklyDigest,
    lastUpdate,
  ] = await Promise.all([
    getCrimeStats(boroughCode),
    getCrimeTimeSeries(boroughCode, start, end, granularity, {
      includeRolling7d: granularity === "daily",
      includePreviousYear: true,
    }),
    getCrimeByCategory(boroughCode, start, end),
    getCrimeByShiftPerCategory(boroughCode, start, end),
    getCrimeByBorough(start, end, false),
    getCrimeByBorough(start, end, true),
    getCrimeByPDQ(start, end, locale),
    searchCrimes(
      {
        boroughCode: boroughCode ?? undefined,
        category: categoryFilter ?? undefined,
        startDate: start,
        endDate: end,
      },
      { page, pageSize: 25 }
    ),
    getCrimeFilterOptions(),
    getCrimesForMap(
      {
        boroughCode,
        category: categoryFilter,
        startDate: start,
        endDate: end,
      },
      500
    ),
    getLatestDigest("weekly", locale, null),
    getLastMetricsUpdate(),
  ]);

  const boroughWithLabels =
    boroughDataPerCapita.length > 0 ? boroughDataPerCapita : boroughData;

  const mostAffectedName = stats.mostAffectedBorough
    ? BOROUGHS[stats.mostAffectedBorough as keyof typeof BOROUGHS]?.name ??
      stats.mostAffectedBorough
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Sécurité et criminalité" : "Crime & safety"}
          </h1>
          {lastUpdate && (
            <DataFreshness
              lastUpdated={lastUpdate}
              expectedScheduleHours={24}
              locale={locale}
            />
          )}
        </div>

        {/* Period selector */}
        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => {
            const nextParams = new URLSearchParams();
            if (boroughCode) nextParams.set("borough", boroughCode);
            if (categoryFilter) nextParams.set("category", categoryFilter);
            nextParams.set("period", opt.value);
            nextParams.set("page", "1");
            return (
              <a
                key={opt.value}
                href={`/securite?${nextParams.toString()}`}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  period === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {isFr ? opt.labelFr : opt.labelEn}
              </a>
            );
          })}
        </div>

        {/* Borough selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isFr ? "Arrondissement:" : "Borough:"}
          </span>
          <a
            href={`/securite?period=${period}${categoryFilter ? `&category=${categoryFilter}` : ""}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Toute la ville" : "City-wide"}
          </a>
          {Object.entries(BOROUGHS).map(([code, { name }]) => (
            <a
              key={code}
              href={`/securite?period=${period}&borough=${code}${categoryFilter ? `&category=${categoryFilter}` : ""}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "7 derniers jours" : "Last 7 days"}
            value={stats.total7d.toLocaleString("fr-CA")}
            delta={
              stats.delta7dVsPrev7d != null
                ? {
                    value: stats.delta7dVsPrev7d,
                    type: "percent",
                    direction:
                      stats.delta7dVsPrev7d >= 0 ? "up" : "down",
                    improveOnUp: false,
                  }
                : undefined
            }
          />
          <MetricCard
            title={isFr ? "30 derniers jours" : "Last 30 days"}
            value={stats.total30d.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Plus touché" : "Most affected"}
            value={mostAffectedName ?? "—"}
          />
          <MetricCard
            title={isFr ? "Catégorie dominante" : "Top category"}
            value={stats.topCategory ?? "—"}
          />
        </div>
      </div>

      {/* Weekly crime digest */}
      {weeklyDigest && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">
              {isFr
                ? "Aperçu IA — Résumé hebdomadaire"
                : "AI insight — Weekly digest"}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {weeklyDigest.summary.slice(0, 500)}
              {weeklyDigest.summary.length > 500 ? "…" : ""}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Trend + Category + Shift + Borough + PDQ + Table (client) */}
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-lg bg-muted" />
        }
      >
        <SecuriteDashboardClient
          timeSeriesData={timeSeriesData}
          categoryData={categoryData}
          shiftPerCategoryData={shiftPerCategoryData}
          boroughData={boroughWithLabels}
          pdqData={pdqData}
          tableResult={tableResult}
          filterOptions={filterOptions}
          period={period}
          boroughCode={boroughCode}
          categoryFilter={categoryFilter}
          locale={locale}
        />
      </Suspense>

      {/* Crime map with disclosure */}
      <CrimeMap
        markers={mapMarkers.map((m) => ({
          id: m.id,
          externalId: m.externalId,
          category: m.category,
          incidentDate: m.incidentDate,
          shift: m.shift,
          lat: m.lat,
          lng: m.lng,
        }))}
        locale={locale}
      />
    </div>
  );
}
