import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  searchContracts,
  getContractSpendingTrends,
  getTopVendors,
  getSoleSourceStats,
  getContractFilterOptions,
} from "@/lib/db/queries/contracts";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { ContratsDashboardClient } from "./ContratsDashboardClient";

const PERIOD_OPTIONS = [
  { value: "1y", labelFr: "1 an", labelEn: "1 year" },
  { value: "3y", labelFr: "3 ans", labelEn: "3 years" },
  { value: "5y", labelFr: "5 ans", labelEn: "5 years" },
] as const;

const PERIOD_DAYS: Record<string, number> = {
  "1y": 365,
  "3y": 1095,
  "5y": 1825,
};

function getDateRange(period: string): { start: string; end: string } {
  const end = new Date();
  const days = PERIOD_DAYS[period] ?? 365;
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function formatCurrency(n: number, locale: string): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}G`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}k`;
  return n.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
}

export default async function ContratsPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    borough?: string;
    page?: string;
    search?: string;
    vendor?: string;
    sector?: string;
    awardingBody?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const period = (params.period ?? "3y") as string;
  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const { start, end } = getDateRange(period);

  const [
    contractResult,
    spendingTrends,
    topVendors,
    soleSourceStats,
    filterOptions,
    lastPipeline,
  ] = await Promise.all([
    searchContracts(
      {
        search: params.search || undefined,
        vendor: params.vendor || undefined,
        sector: params.sector || undefined,
        awardingBody: params.awardingBody || undefined,
        boroughCode: boroughCode ?? undefined,
        startDate: start,
        endDate: end,
      },
      { page, pageSize: 25 }
    ),
    getContractSpendingTrends(start, end, period === "1y" ? "monthly" : "yearly"),
    getTopVendors(start, end, 15),
    getSoleSourceStats(start, end),
    getContractFilterOptions(),
    getPipelineLastSuccess("contracts"),
  ]);

  const totalValue = spendingTrends.reduce((a, p) => a + p.totalValue, 0);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Contrats municipaux" : "Municipal contracts"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={168}
              locale={locale}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`/contrats?period=${opt.value}${boroughCode ? `&borough=${boroughCode}` : ""}`}
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Valeur totale" : "Total value"}
            value={formatCurrency(totalValue, locale)}
          />
          <MetricCard
            title={isFr ? "Contrats" : "Contracts"}
            value={contractResult.total.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "De gré à gré" : "Sole-source"}
            value={soleSourceStats.count.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Valeur gré à gré" : "Sole-source value"}
            value={formatCurrency(soleSourceStats.totalValue, locale)}
          />
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <ContratsDashboardClient
          contractResult={contractResult}
          spendingTrends={spendingTrends}
          topVendors={topVendors}
          filterOptions={filterOptions}
          period={period}
          boroughCode={boroughCode}
          locale={locale}
          formatCurrency={(n) => formatCurrency(n, locale)}
          searchValue={params.search ?? ""}
        />
      </Suspense>
    </div>
  );
}
