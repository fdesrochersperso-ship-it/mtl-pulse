import { getLocale } from "@/lib/locale";
import {
  getTravauxTimeSeries,
  getTravauxByBorough,
  searchTravaux,
  getTravauxFilterOptions,
  getTravauxStats,
  getStreetsMostAffected,
} from "@/lib/db/queries/travaux";
import { getTravauxMapPoints } from "@/lib/db/queries/map";
import { getConstructionComplaintsCorrelation } from "@/lib/db/queries/analysis";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { ConstructionComplaintsCorrelation } from "@/components/analysis/ConstructionComplaintsCorrelation";
import { TravauxDashboardClient, type PeriodKey } from "@/app/travaux/TravauxDashboardClient";

const PERIOD_DAYS: Record<PeriodKey, number> = {
  "7d": 7,
  "30d": 30,
  "6m": 180,
  "1y": 365,
  "5y": 1825,
};

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

export default async function TravauxPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    borough?: string;
    q?: string;
    page?: string;
    pageSize?: string;
    boroughCode?: string;
    category?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const period = (params.period as PeriodKey) ?? "30d";
  const boroughCode = params.borough ?? params.boroughCode ?? null;
  const searchQuery = params.q ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const pageSize = Math.min(100, Math.max(10, parseInt(params.pageSize ?? "25", 10)));
  const tableFilters = {
    borough: params.borough ?? params.boroughCode ?? undefined,
    category: params.category ?? undefined,
    status: params.status ?? undefined,
  };

  const { start, end } = getDateRange(period);
  const granularity = getGranularity(period);

  const [
    timeSeriesData,
    boroughData,
    tableResult,
    filterOptions,
    construction311,
    stats,
    streetsMostAffected,
    mapPoints,
    digest,
  ] = await Promise.all([
    getTravauxTimeSeries(boroughCode, start, end, granularity),
    getTravauxByBorough(false),
    searchTravaux(
      searchQuery,
      {
        boroughCode: tableFilters.borough ?? null,
        category: tableFilters.category ?? null,
        status: tableFilters.status ?? null,
      },
      { page, pageSize }
    ),
    getTravauxFilterOptions(),
    getConstructionComplaintsCorrelation(),
    getTravauxStats(boroughCode),
    getStreetsMostAffected(boroughCode, 20),
    getTravauxMapPoints({ limit: 300 }),
    getLatestDigest("daily", locale, null),
  ]);

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p className="font-semibold">{String(p.props?.street ?? "—")}</p>
          <p>{String(p.props?.category ?? "")}</p>
          {p.props?.startDate ? (
            <p className="text-xs text-muted-foreground">
              {String(p.props.startDate)} — {String(p.props.endDate ?? "…")}
            </p>
          ) : null}
        </div>
      ),
    }));

  return (
    <div className="space-y-6">
      <ConstructionComplaintsCorrelation data={construction311} locale={locale} />
      <TravauxDashboardClient
        stats={stats}
        streetsMostAffected={streetsMostAffected}
        digest={digest}
        mapPoints={pointMapItems}
        timeSeriesData={timeSeriesData}
        boroughData={boroughData}
        tableResult={tableResult}
        filterOptions={filterOptions}
        period={period}
        boroughCode={boroughCode}
        searchQuery={searchQuery}
        tableFilters={tableFilters}
        locale={locale}
      />
    </div>
  );
}
