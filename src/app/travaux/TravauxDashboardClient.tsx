"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { DataTable } from "@/components/dashboard/DataTable";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PointMap } from "@/components/map/PointMap";
import { DigestCard } from "@/components/digest/DigestCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import type { TravauxRow, TravauxTimeSeriesPoint, TravauxByBoroughRow, TravauxStats } from "@/lib/db/queries/travaux";
import type { DigestRow } from "@/lib/db/queries/digests";
import type { DigestCardProps } from "@/components/digest/DigestCard";
import type { PointMapItem } from "@/components/map/PointMap";

export type PeriodKey = "7d" | "30d" | "6m" | "1y" | "5y";

const PERIOD_DAYS: Record<PeriodKey, number> = {
  "7d": 7,
  "30d": 30,
  "6m": 180,
  "1y": 365,
  "5y": 1825,
};

export interface TravauxDashboardClientProps {
  timeSeriesData: TravauxTimeSeriesPoint[];
  boroughData: TravauxByBoroughRow[];
  tableResult: {
    rows: TravauxRow[];
    total: number;
    page: number;
    pageSize: number;
  };
  filterOptions: {
    categories: string[];
    statuses: string[];
    boroughCodes: string[];
  };
  period: PeriodKey;
  boroughCode: string | null;
  searchQuery: string;
  tableFilters: { borough?: string; category?: string; status?: string };
  locale: "fr" | "en";
  stats?: TravauxStats | null;
  streetsMostAffected?: { street: string; count: number; totalDurationDays: number }[];
  digest?: DigestRow | null;
  mapPoints?: PointMapItem[];
}

function getDateRange(period: PeriodKey): { start: string; end: string } {
  const end = new Date();
  const days = PERIOD_DAYS[period];
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function getGranularity(period: PeriodKey): "daily" | "weekly" | "monthly" {
  if (period === "7d" || period === "30d") return "daily";
  if (period === "6m") return "weekly";
  return "monthly";
}

export function TravauxDashboardClient({
  timeSeriesData,
  boroughData,
  tableResult,
  filterOptions,
  period,
  boroughCode,
  searchQuery,
  tableFilters,
  locale,
  stats,
  streetsMostAffected = [],
  digest,
  mapPoints = [],
}: TravauxDashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") p.delete(k);
        else p.set(k, v);
      }
      router.push(`/travaux?${p.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const trendData = timeSeriesData.map((d) => ({
    period: d.period,
    value: d.count,
    previousYearValue: d.previousYearCount,
  }));

  const boroughChartData = boroughData.map((b) => ({
    boroughCode: b.boroughCode,
    label: BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode,
    value: b.count,
    perCapita: b.perCapita,
    isHighlighted: boroughCode === b.boroughCode,
  }));

  const handleExportCsv = useCallback(() => {
    const headers = ["ID", "Arrondissement", "Catégorie", "Organisation", "Début", "Fin", "Statut", "Rue"];
    const rows = tableResult.rows.map((r) => [
      r.externalId,
      r.boroughCode ?? "",
      r.category ?? "",
      r.organizationName ?? "",
      r.startDate ?? "",
      r.endDate ?? "",
      r.status ?? "",
      r.street ?? "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `travaux-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [tableResult.rows]);

  const isFr = locale === "fr";

  return (
    <div className="space-y-8">
      {/* Key stats row */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Chantiers actifs" : "Active sites"}
            value={stats.activeCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Nouveaux aujourd'hui" : "New today"}
            value={stats.newToday.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Clôture cette semaine" : "Closing this week"}
            value={stats.closingThisWeek.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus touché" : "Most affected borough"}
            value={
              stats.mostAffectedBorough
                ? BOROUGHS[stats.mostAffectedBorough as keyof typeof BOROUGHS]?.name ?? stats.mostAffectedBorough
                : "—"
            }
          />
        </div>
      )}

      {/* AI insight card */}
      {digest && (
        <DigestCard
          title={isFr ? "Aperçu IA — Résumé quotidien" : "AI insight — Daily digest"}
          summary={digest.summary}
          highlights={
            Array.isArray(digest.highlights)
              ? (digest.highlights as DigestCardProps["highlights"])
              : []
          }
          modelUsed={digest.modelUsed}
          locale={locale}
          defaultCollapsed={true}
        />
      )}

      <TrendChart
        data={trendData}
        title={locale === "fr" ? "Chantiers actifs dans le temps" : "Active construction over time"}
        granularity={getGranularity(period)}
        onGranularityChange={(g) => {
          const nextPeriod = g === "daily" ? "30d" : g === "weekly" ? "6m" : "1y";
          updateParams({ period: nextPeriod });
        }}
        locale={locale}
      />

      <BoroughComparison
        data={boroughChartData}
        title={locale === "fr" ? "Répartition par arrondissement" : "Breakdown by borough"}
        highlightedBoroughCode={boroughCode}
        onPerCapitaToggle={() => {}}
        locale={locale}
      />

      {/* Duration analysis */}
      {stats && (stats.avgDurationDays != null || stats.medianDurationDays != null || stats.longRunnersCount > 0) && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {isFr ? "Durée des chantiers" : "Construction duration"}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.avgDurationDays != null && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isFr ? "Durée moyenne (jours)" : "Avg duration (days)"}
                  </p>
                  <p className="text-xl font-semibold">{Math.round(stats.avgDurationDays)}</p>
                </div>
              )}
              {stats.medianDurationDays != null && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isFr ? "Médiane (jours)" : "Median (days)"}
                  </p>
                  <p className="text-xl font-semibold">{Math.round(stats.medianDurationDays)}</p>
                </div>
              )}
              {stats.longRunnersCount > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isFr ? "Chantiers > 30 jours" : "Sites > 30 days"}
                  </p>
                  <p className="text-xl font-semibold text-amber-600 dark:text-amber-500">
                    {stats.longRunnersCount}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Streets most affected */}
      {streetsMostAffected.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {isFr ? "Rues les plus touchées" : "Streets most affected"}
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {streetsMostAffected.slice(0, 10).map((s, i) => (
                <li
                  key={s.street + i}
                  className="flex justify-between text-sm"
                >
                  <span>{s.street}</span>
                  <span className="text-muted-foreground">
                    {s.count} {isFr ? "chantiers" : "sites"} · {s.totalDurationDays}j
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Embedded map */}
      {mapPoints.length > 0 && (
        <PointMap
          points={mapPoints}
          title={isFr ? "Chantiers actifs sur la carte" : "Active construction sites"}
          locale={locale}
        />
      )}

      <DataTable<TravauxRow>
        columns={[
          { key: "boroughCode", label: locale === "fr" ? "Arrondissement" : "Borough" },
          { key: "category", label: locale === "fr" ? "Catégorie" : "Category" },
          { key: "organizationName", label: locale === "fr" ? "Organisation" : "Organization" },
          {
            key: "startDate",
            label: locale === "fr" ? "Début" : "Start",
            render: (r) => r.startDate ? new Date(r.startDate).toLocaleDateString("fr-CA") : "—",
          },
          {
            key: "endDate",
            label: locale === "fr" ? "Fin" : "End",
            render: (r) => r.endDate ? new Date(r.endDate).toLocaleDateString("fr-CA") : "—",
          },
          { key: "status", label: locale === "fr" ? "Statut" : "Status" },
        ]}
        data={tableResult.rows}
        total={tableResult.total}
        page={tableResult.page}
        pageSize={tableResult.pageSize}
        onPageChange={(p) => updateParams({ page: String(p) })}
        searchPlaceholder={locale === "fr" ? "Rechercher par ID, rue, organisation…" : "Search by ID, street, organization…"}
        searchValue={searchQuery}
        onSearchChange={(v) => updateParams({ q: v || null })}
        filterOptions={{
          borough: [
            ...filterOptions.boroughCodes.map((c) => ({
              value: c,
              label: BOROUGHS[c as keyof typeof BOROUGHS]?.name ?? c,
            })),
          ],
          category: filterOptions.categories.map((c) => ({ value: c, label: c })),
          status: filterOptions.statuses.map((s) => ({ value: s, label: s })),
        }}
        filterValues={tableFilters}
        onFilterChange={(k, v) => updateParams({ [k]: v || null })}
        onExportCsv={handleExportCsv}
        locale={locale}
      />
    </div>
  );
}
