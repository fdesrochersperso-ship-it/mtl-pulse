import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import {
  getWinterOperationsSummary,
  getPotholes311Correlation,
} from "@/lib/db/queries/analysis";
import { getTowingsTimeSeries as getTowingsTs } from "@/lib/db/queries/towings";
import { getLastMetricsUpdate } from "@/lib/db/queries/metrics";
import { WinterOperationsDashboard } from "@/components/analysis/WinterOperationsDashboard";
import { Potholes311Correlation } from "@/components/analysis/Potholes311Correlation";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { subMonths } from "date-fns";

function getDateRange(months = 6): { start: string; end: string } {
  const end = new Date();
  const start = subMonths(end, months);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default async function WinterPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";
  const { start, end } = getDateRange(6);

  const [winterSummary, potholes311, towingsTs, lastUpdate] = await Promise.all([
    getWinterOperationsSummary(),
    getPotholes311Correlation(start, end),
    getTowingsTs(null, start, end, "monthly", true),
    getLastMetricsUpdate(),
  ]);

  const towingsChartData = towingsTs.map((p) => ({
    period: p.period,
    value: p.count,
    previousYearValue: p.previousYearCount,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {isFr ? "Opérations hivernales" : "Winter operations"}
        </h1>
        {lastUpdate && (
          <DataFreshness
            lastUpdated={lastUpdate}
            expectedScheduleHours={48}
            locale={locale}
          />
        )}
      </div>

      <p className="text-muted-foreground">
        {isFr
          ? "Tableau de bord composite : remorquages, plaintes 311 liées à la neige et nids-de-poule (dégel printanier). Actif de novembre à avril."
          : "Composite dashboard: towings, snow-related 311 complaints, and potholes (spring thaw). Active November–April."}
      </p>

      <WinterOperationsDashboard data={winterSummary} locale={locale} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Potholes311Correlation data={potholes311} locale={locale} />
        <div>
          <TrendChart
            data={towingsChartData}
            title={isFr ? "Remorquages par mois" : "Towings by month"}
            granularity="monthly"
            onGranularityChange={() => {}}
            valueLabel={isFr ? "Remorquages" : "Towings"}
            previousYearLabel={
              isFr ? "Même mois année précédente" : "Same month last year"
            }
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
