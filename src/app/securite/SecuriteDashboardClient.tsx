"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { CrimeByCategory } from "@/components/dashboard/CrimeByCategory";
import { CrimeByShift } from "@/components/dashboard/CrimeByShift";
import { DataTable } from "@/components/dashboard/DataTable";
import { BOROUGHS } from "@/lib/constants/boroughs";
import type {
  CrimeTimeSeriesPoint,
  CrimeByCategoryRow,
  CrimeByShiftPerCategoryRow,
  CrimeByBoroughRow,
  CrimeByPDQRow,
  CrimeTableRow,
  CrimeTableResult,
} from "@/lib/db/queries/crimes";

export type PeriodKey = "7d" | "30d" | "6m" | "1y" | "5y";

const PERIOD_DAYS: Record<PeriodKey, number> = {
  "7d": 7,
  "30d": 30,
  "6m": 180,
  "1y": 365,
  "5y": 1825,
};

function formatPeriod(period: string, granularity: string): string {
  const d = new Date(period);
  if (granularity === "daily") {
    return d.toLocaleDateString("fr-CA", { month: "short", day: "numeric" });
  }
  if (granularity === "weekly") {
    return d.toLocaleDateString("fr-CA", { month: "short", day: "numeric" });
  }
  return d.toLocaleDateString("fr-CA", { month: "short", year: "2-digit" });
}

function getDateRange(period: PeriodKey): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - PERIOD_DAYS[period]);
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

export interface SecuriteDashboardClientProps {
  timeSeriesData: CrimeTimeSeriesPoint[];
  categoryData: CrimeByCategoryRow[];
  shiftPerCategoryData: CrimeByShiftPerCategoryRow[];
  boroughData: CrimeByBoroughRow[];
  pdqData: CrimeByPDQRow[];
  tableResult: CrimeTableResult;
  filterOptions: { categories: string[]; boroughCodes: string[] };
  period: PeriodKey;
  boroughCode: string | null;
  categoryFilter: string | null;
  locale: "fr" | "en";
}

export function SecuriteDashboardClient({
  timeSeriesData,
  categoryData,
  shiftPerCategoryData,
  boroughData,
  pdqData,
  tableResult,
  filterOptions,
  period,
  boroughCode,
  categoryFilter,
  locale,
}: SecuriteDashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") p.delete(k);
        else p.set(k, v);
      }
      p.set("page", "1");
      router.push(`/securite?${p.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Crime trend: use rolling7d when available (daily), else count
  const trendData = timeSeriesData.map((d) => ({
    period: d.period,
    value: d.rolling7d ?? d.count,
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
    const headers = [
      locale === "fr" ? "ID" : "ID",
      locale === "fr" ? "Catégorie" : "Category",
      locale === "fr" ? "Date" : "Date",
      locale === "fr" ? "Quart" : "Shift",
      locale === "fr" ? "PDQ" : "PDQ",
      locale === "fr" ? "Arrondissement" : "Borough",
    ];
    const rows = tableResult.rows.map((r) => [
      r.externalId ?? r.id,
      r.category,
      r.incidentDate,
      r.shift ?? "",
      r.pdq ?? "",
      r.boroughCode ?? "",
    ]);
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `crimes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [tableResult.rows, locale]);

  const granularity = getGranularity(period);

  return (
    <div className="space-y-8">
      {/* Crime trend chart — 7-day rolling average + YoY */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-lg font-semibold">
            {locale === "fr"
              ? "Tendance des crimes (moyenne mobile 7 jours)"
              : "Crime trend (7-day rolling average)"}
          </h3>
          <div className="flex gap-2">
            {(["daily", "weekly", "monthly"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  const nextPeriod =
                    g === "daily" ? "30d" : g === "weekly" ? "6m" : "1y";
                  updateParams({ period: nextPeriod });
                }}
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                  granularity === g
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {g === "daily"
                  ? locale === "fr"
                    ? "Journalier"
                    : "Daily"
                  : g === "weekly"
                    ? locale === "fr"
                      ? "Hebdomadaire"
                      : "Weekly"
                    : locale === "fr"
                      ? "Mensuel"
                      : "Monthly"}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData.map((d) => ({
                  ...d,
                  formattedPeriod: formatPeriod(d.period, granularity),
                }))}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="formattedPeriod"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.period
                      ? new Date(payload[0].payload.period).toLocaleDateString(
                          locale === "fr" ? "fr-CA" : "en-CA",
                          { dateStyle: "medium" }
                        )
                      : ""
                  }
                />
                {trendData.some((d) => d.previousYearValue != null) && (
                  <Legend
                    formatter={() => [
                      locale === "fr"
                        ? "Même période année précédente"
                        : "Same period last year",
                      "",
                    ]}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name={
                    granularity === "daily"
                      ? locale === "fr"
                        ? "Moy. mobile 7j"
                        : "7d rolling avg"
                      : locale === "fr"
                        ? "Nombre de crimes"
                        : "Crime count"
                  }
                />
                {trendData.some((d) => d.previousYearValue != null) && (
                  <Line
                    type="monotone"
                    dataKey="previousYearValue"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    name={
                      locale === "fr" ? "Année précédente" : "Previous year"
                    }
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Crime by category — filterable */}
      <CrimeByCategory
        data={categoryData}
        selectedCategory={categoryFilter}
        onCategoryClick={(cat) => updateParams({ category: cat ?? "" })}
        locale={locale}
      />

      {/* Crime by shift — horizontal stacked bars */}
      <CrimeByShift data={shiftPerCategoryData} locale={locale} />

      {/* Borough comparison — per capita */}
      <BoroughComparison
        data={boroughChartData}
        title={
          locale === "fr"
            ? "Crimes par arrondissement (par habitant)"
            : "Crime by borough (per capita)"
        }
        valueLabel={
          locale === "fr" ? "Crimes / 10 000 hab." : "Crimes per 10k residents"
        }
        highlightedBoroughCode={boroughCode}
        perCapita={true}
        locale={locale}
      />

      {/* PDQ table — PDQ 50 labeled as Métro */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {locale === "fr"
              ? "Crimes par PDQ (poste de quartier)"
              : "Crime by PDQ (police district)"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {locale === "fr"
              ? "PDQ 50 = Réseau du métro. Exclu des comparaisons par arrondissement."
              : "PDQ 50 = Metro network. Excluded from borough comparisons."}
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">
                    {locale === "fr" ? "PDQ" : "PDQ"}
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    {locale === "fr" ? "Nombre" : "Count"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pdqData.slice(0, 15).map((r) => (
                  <tr
                    key={r.pdq}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      {r.label ?? `PDQ ${r.pdq}`}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {r.count.toLocaleString("fr-CA")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data table */}
      <DataTable<CrimeTableRow>
        columns={[
          {
            key: "boroughCode",
            label: locale === "fr" ? "Arrondissement" : "Borough",
            render: (r) =>
              BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ??
              r.boroughCode ??
              "—",
          },
          { key: "category", label: locale === "fr" ? "Catégorie" : "Category" },
          {
            key: "incidentDate",
            label: locale === "fr" ? "Date" : "Date",
            render: (r) =>
              r.incidentDate
                ? new Date(r.incidentDate).toLocaleDateString("fr-CA")
                : "—",
          },
          { key: "shift", label: locale === "fr" ? "Quart" : "Shift" },
          {
            key: "pdq",
            label: "PDQ",
            render: (r) =>
              r.pdq != null
                ? r.pdq === 50
                  ? (locale === "fr" ? `${r.pdq} (Réseau du métro)` : `${r.pdq} (Metro network)`)
                  : String(r.pdq)
                : "—",
          },
        ]}
        data={tableResult.rows}
        total={tableResult.total}
        page={tableResult.page}
        pageSize={tableResult.pageSize}
        onPageChange={(p) => updateParams({ page: String(p) })}
        searchPlaceholder={
          locale === "fr"
            ? "Filtrer par catégorie, arrondissement…"
            : "Filter by category, borough…"
        }
        filterOptions={{
          borough: [
            ...filterOptions.boroughCodes.map((c) => ({
              value: c,
              label: BOROUGHS[c as keyof typeof BOROUGHS]?.name ?? c,
            })),
          ],
          category: filterOptions.categories.map((c) => ({
            value: c,
            label: c,
          })),
        }}
        filterValues={{
          borough: boroughCode ?? "",
          category: categoryFilter ?? "",
        }}
        onFilterChange={(k, v) => {
          if (k === "borough") updateParams({ borough: v || null });
          if (k === "category") updateParams({ category: v || null });
        }}
        onExportCsv={handleExportCsv}
        locale={locale}
      />
    </div>
  );
}
