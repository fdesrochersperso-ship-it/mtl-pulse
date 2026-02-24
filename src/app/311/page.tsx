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
  getRequests311Stats,
  getRequests311ByNature,
  getRequests311ByType,
  getRequests311ByStatus,
  getRequests311BacklogTimeSeries,
  getRequests311ResponseTimeByBorough,
  getRequests311ForMap,
} from "@/lib/db/queries/requests311";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { Requests311DashboardClient } from "./Requests311DashboardClient";

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

export default async function Page311({
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

  const [
    stats,
    byNature,
    byType,
    byStatus,
    backlogTimeSeries,
    responseTimeByBorough,
    mapPoints,
    digest,
    lastPipeline,
  ] = await Promise.all([
    getRequests311Stats(boroughCode),
    getRequests311ByNature(start, end, boroughCode),
    getRequests311ByType(start, end, boroughCode, 12),
    getRequests311ByStatus(boroughCode),
    getRequests311BacklogTimeSeries(boroughCode, start, end, "weekly"),
    getRequests311ResponseTimeByBorough(start, end),
    getRequests311ForMap({ boroughCode: boroughCode ?? undefined, startDate: start, endDate: end }, 300),
    getLatestDigest("daily", locale, null),
    getPipelineLastSuccess("requetes_311"),
  ]);

  const responseTimeData = responseTimeByBorough.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.avgResolutionDays ?? 0,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const backlogChartData = backlogTimeSeries.map((d) => ({
    period: d.period,
    value: d.createdCount,
    previousYearValue: undefined,
  }));

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p className="font-semibold">{p.requestType ?? p.nature ?? "—"}</p>
          <p>{p.requestId ? `#${p.requestId}` : ""}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
          <p>{p.status ?? ""}</p>
          <p className="text-muted-foreground text-xs">
            {new Date(p.createdAt).toLocaleDateString("fr-CA", { dateStyle: "medium" })}
          </p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Demandes 311" : "311 Requests"}
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
              href={`/311?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
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
            href={`/311?period=${period}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Toute la ville" : "City-wide"}
          </a>
          {Object.entries(BOROUGHS).map(([code, { name }]) => (
            <a
              key={code}
              href={`/311?period=${period}&borough=${code}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <CardContent className="flex items-start gap-2 p-4">
            <span className="text-lg" aria-hidden>⚠️</span>
            <p className="text-sm">
              {isFr
                ? "Les processus varient par arrondissement — la comparaison inter-arrondissements est peu fiable."
                : "Processes vary by borough — cross-borough comparison is unreliable."}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Demandes ouvertes" : "Open requests"}
            value={stats.openCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Délai moyen (jours)" : "Avg resolution (days)"}
            value={stats.avgResolutionDays != null ? String(stats.avgResolutionDays) : "—"}
          />
          <MetricCard
            title={isFr ? "Type dominant" : "Top type"}
            value={stats.topType ?? "—"}
          />
          <MetricCard
            title={isFr ? "Nature dominante" : "Top nature"}
            value={stats.topNature ?? "—"}
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
        <Requests311DashboardClient
          byNature={byNature}
          byType={byType}
          byStatus={byStatus}
          backlogChartData={backlogChartData}
          responseTimeData={responseTimeData}
          locale={locale}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des demandes 311" : "311 request map"}
          caveat={
            isFr
              ? "Les demandes « Information » ne sont pas géoréférencées et sont exclues de la carte."
              : "Information requests are not georeferenced and excluded from the map."
          }
          locale={locale}
        />
      )}
    </div>
  );
}
