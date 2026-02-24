"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { DataTable } from "@/components/dashboard/DataTable";
import { BOROUGHS } from "@/lib/constants/boroughs";
import { getPermitTypeLabel } from "@/lib/constants/permit-types";
import type { PermitRow, PermitByTypeRow, PermitByBoroughRow } from "@/lib/db/queries/permits";

function formatCurrency(val: number, locale: "fr" | "en"): string {
  if (val >= 1e9) return `${(val / 1e9).toFixed(1)}G$`;
  if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M$`;
  if (val >= 1e3) return `${(val / 1e3).toFixed(1)}K$`;
  return `${val}$`;
}

export interface PermisDashboardClientProps {
  trendData: { period: string; value: number; previousYearValue?: number }[];
  byType: PermitByTypeRow[];
  boroughChartData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  demolitionRatioData: PermitByBoroughRow[];
  tableResult: {
    rows: PermitRow[];
    total: number;
    page: number;
    pageSize: number;
  };
  filterOptions: { permitTypes: string[]; boroughCodes: string[] };
  period: string;
  boroughCode: string | null;
  searchQuery: string;
  tableFilters: { boroughCode?: string; permitType?: string };
  locale: "fr" | "en";
  /** Boroughs with incomplete data (Lachine/SLE) — show ⚠️ in charts */
  gapBoroughs?: readonly string[];
}

export function PermisDashboardClient({
  trendData,
  byType,
  boroughChartData,
  demolitionRatioData,
  tableResult,
  filterOptions,
  period,
  boroughCode,
  searchQuery,
  tableFilters,
  locale,
  gapBoroughs = [],
}: PermisDashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") p.delete(k);
        else p.set(k, v);
      }
      router.push(`/permis?${p.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleExportCsv = useCallback(() => {
    const headers = ["No permis", "Type", "Arrondissement", "Émission", "Coût estimé"];
    const rows = tableResult.rows.map((r) => [
      r.permitNumber ?? "",
      getPermitTypeLabel(r.permitType ?? "", locale),
      BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ?? "",
      r.dateIssued ?? "",
      r.estimatedCost != null ? String(r.estimatedCost) : "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `permis-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [tableResult.rows, locale]);

  const byTypeChartData = byType.slice(0, 10).map((t) => ({
    boroughCode: getPermitTypeLabel(t.permitType, locale),
    label: getPermitTypeLabel(t.permitType, locale),
    value: t.count,
    isHighlighted: false,
  }));

  return (
    <div className="space-y-8">
      <TrendChart
        data={trendData}
        title={locale === "fr" ? "Activité des permis dans le temps" : "Permit activity over time"}
        granularity={period === "30d" ? "weekly" : "monthly"}
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "Permis émis" : "Permits issued"}
      />

      <BoroughComparison
        data={byTypeChartData}
        title={locale === "fr" ? "Permis par type" : "Permits by type"}
        valueLabel={locale === "fr" ? "Nombre" : "Count"}
        locale={locale}
      />

      <BoroughComparison
        data={boroughChartData}
        title={locale === "fr" ? "Valeur des permis par arrondissement" : "Permit value by borough"}
        valueLabel={locale === "fr" ? "Permis" : "Permits"}
        highlightedBoroughCode={boroughCode}
        locale={locale}
      />

      {demolitionRatioData.length > 0 && (
        <BoroughComparison
          data={demolitionRatioData.map((b) => ({
            boroughCode: b.boroughCode,
            label: `${BOROUGHS[b.boroughCode as keyof typeof BOROUGHS]?.name ?? b.boroughCode}${(gapBoroughs as readonly string[]).includes(b.boroughCode) ? " ⚠️" : ""}`,
            value: b.ratio ?? 0,
            isHighlighted: boroughCode === b.boroughCode,
          }))}
          title={locale === "fr" ? "Ratio démolition / construction par arrondissement" : "Demolition vs construction ratio by borough"}
          valueLabel={locale === "fr" ? "Ratio" : "Ratio"}
          highlightedBoroughCode={boroughCode}
          locale={locale}
        />
      )}

      <DataTable<PermitRow>
        columns={[
          {
            key: "boroughCode",
            label: locale === "fr" ? "Arrondissement" : "Borough",
            render: (r) => BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ?? r.boroughCode ?? "—",
          },
          {
            key: "permitType",
            label: locale === "fr" ? "Type" : "Type",
            render: (r) => getPermitTypeLabel(r.permitType ?? "", locale),
          },
          { key: "permitNumber", label: locale === "fr" ? "No permis" : "Permit #" },
          {
            key: "dateIssued",
            label: locale === "fr" ? "Émission" : "Issued",
            render: (r) => (r.dateIssued ? new Date(r.dateIssued).toLocaleDateString("fr-CA") : "—"),
          },
          {
            key: "estimatedCost",
            label: locale === "fr" ? "Coût estimé" : "Est. cost",
            render: (r) => (r.estimatedCost != null ? formatCurrency(r.estimatedCost, locale) : "—"),
          },
        ]}
        data={tableResult.rows}
        total={tableResult.total}
        page={tableResult.page}
        pageSize={tableResult.pageSize}
        onPageChange={(p) => updateParams({ page: String(p) })}
        searchPlaceholder={locale === "fr" ? "Rechercher par no permis, nature…" : "Search by permit #, nature…"}
        searchValue={searchQuery}
        onSearchChange={(v) => updateParams({ q: v || null })}
        filterOptions={{
          borough: [
            { value: "", label: locale === "fr" ? "Tous arrondissements" : "All boroughs" },
            ...filterOptions.boroughCodes.map((c) => ({
              value: c,
              label: BOROUGHS[c as keyof typeof BOROUGHS]?.name ?? c,
            })),
          ],
          category: filterOptions.permitTypes.map((t) => ({
            value: t,
            label: getPermitTypeLabel(t, locale),
          })),
        }}
        filterValues={{ borough: tableFilters.boroughCode, category: tableFilters.permitType }}
        onFilterChange={(k, v) => {
          if (k === "borough") updateParams({ borough: v || null });
          else if (k === "category") updateParams({ permitType: v || null });
        }}
        onExportCsv={handleExportCsv}
        locale={locale}
        emptyMessage={locale === "fr" ? "Aucun permis pour cette période" : "No permits for this period"}
      />
    </div>
  );
}
