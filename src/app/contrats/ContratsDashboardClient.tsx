"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/DataTable";
import { BOROUGHS } from "@/lib/constants/boroughs";
import type { ContractRow, SpendingTrendPoint, TopVendorRow } from "@/lib/db/queries/contracts";

export interface ContratsDashboardClientProps {
  contractResult: {
    rows: ContractRow[];
    total: number;
    page: number;
    pageSize: number;
  };
  searchValue?: string;
  spendingTrends: SpendingTrendPoint[];
  topVendors: TopVendorRow[];
  filterOptions: {
    sectors: string[];
    awardingBodies: string[];
    boroughCodes: string[];
  };
  period: string;
  boroughCode: string | null;
  locale: "fr" | "en";
  formatCurrency: (n: number) => string;
}

export function ContratsDashboardClient({
  contractResult,
  spendingTrends,
  topVendors,
  filterOptions,
  boroughCode,
  locale,
  formatCurrency,
  searchValue = "",
}: ContratsDashboardClientProps) {
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
      router.push(`/contrats?${p.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const trendChartData = spendingTrends.map((p) => ({
    period: p.period.slice(0, 7),
    value: p.totalValue,
    formatted: formatCurrency(p.totalValue),
    count: p.count,
  }));

  const handleExportCsv = useCallback(() => {
    const headers = [
      locale === "fr" ? "Fournisseur" : "Vendor",
      locale === "fr" ? "Montant" : "Amount",
      locale === "fr" ? "Date" : "Date",
      locale === "fr" ? "Secteur" : "Sector",
      locale === "fr" ? "Source" : "Awarding body",
      locale === "fr" ? "Gré à gré" : "Sole-source",
    ];
    const rows = contractResult.rows.map((r) => [
      r.supplierName ?? "",
      r.amount ?? "",
      r.awardDate ?? "",
      r.sector ?? "",
      r.awardingBody ?? "",
      r.soleSource ? "Oui" : "Non",
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
    a.download = `contrats-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [contractResult.rows, locale]);

  return (
    <div className="space-y-8">
      {/* Spending trends */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {locale === "fr" ? "Évolution des dépenses" : "Spending trends"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {locale === "fr"
              ? "Par mois (1 an) ou par année — Conseil municipal, Conseil d'agglomération, Arrondissements."
              : "By month (1y) or year — City Council, Agglomeration Council, Boroughs."}
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendChartData}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => formatCurrency(Number(v ?? 0))} />
                <Tooltip
                  formatter={(value: unknown) => formatCurrency(Number(value ?? 0))}
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.period
                      ? new Date(payload[0].payload.period).toLocaleDateString(
                          locale === "fr" ? "fr-CA" : "en-CA",
                          { year: "numeric", month: "short" }
                        )
                      : ""
                  }
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" name={locale === "fr" ? "Valeur" : "Value"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top vendors */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {locale === "fr" ? "Principaux fournisseurs" : "Top vendors"}
          </h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">
                    {locale === "fr" ? "Fournisseur" : "Vendor"}
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    {locale === "fr" ? "Contrats" : "Contracts"}
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    {locale === "fr" ? "Montant total" : "Total amount"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topVendors.map((v, i) => (
                  <tr key={i} className="border-b transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3">
                      {v.supplierName.length > 40
                        ? v.supplierName.slice(0, 40) + "…"
                        : v.supplierName}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {v.count.toLocaleString("fr-CA")}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatCurrency(v.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contract explorer table */}
      <DataTable<ContractRow>
        columns={[
          {
            key: "supplierName",
            label: locale === "fr" ? "Fournisseur" : "Vendor",
            render: (r) => (
              <span>
                {r.supplierName ?? "—"}
                {r.soleSource && (
                  <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    {locale === "fr" ? "gré à gré" : "sole-source"}
                  </span>
                )}
              </span>
            ),
          },
          {
            key: "amount",
            label: locale === "fr" ? "Montant" : "Amount",
            render: (r) =>
              r.amount != null ? formatCurrency(r.amount) : "—",
          },
          {
            key: "awardDate",
            label: locale === "fr" ? "Date" : "Date",
            render: (r) =>
              r.awardDate
                ? new Date(r.awardDate).toLocaleDateString(
                    locale === "fr" ? "fr-CA" : "en-CA"
                  )
                : "—",
          },
          {
            key: "sector",
            label: locale === "fr" ? "Secteur" : "Sector",
          },
          {
            key: "awardingBody",
            label: locale === "fr" ? "Source" : "Awarding body",
          },
          {
            key: "boroughCode",
            label: locale === "fr" ? "Arrondissement" : "Borough",
            render: (r) =>
              r.boroughCode
                ? BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ?? r.boroughCode
                : "—",
          },
        ]}
        data={contractResult.rows}
        total={contractResult.total}
        page={contractResult.page}
        pageSize={contractResult.pageSize}
        onPageChange={(p) => updateParams({ page: String(p) })}
        searchPlaceholder={locale === "fr" ? "Fournisseur, secteur…" : "Vendor, sector…"}
        searchValue={searchValue}
        onSearchChange={(v) => updateParams({ search: v || null })}
        filterOptions={{
          borough: filterOptions.boroughCodes.map((c) => ({
            value: c,
            label: BOROUGHS[c as keyof typeof BOROUGHS]?.name ?? c,
          })),
          category: filterOptions.sectors.map((s) => ({ value: s, label: s })),
        }}
        filterValues={{
          borough: boroughCode ?? "",
        }}
        onFilterChange={(k, v) => updateParams({ [k]: v || null })}
        onExportCsv={handleExportCsv}
        locale={locale}
      />
    </div>
  );
}
