import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import {
  getCrimeTimeSeries,
  getCrimeByCategory,
  getCrimeStats,
} from "@/lib/db/queries/crimes";
import { getRequests311ByType } from "@/lib/db/queries/requests311";
import { getFireInterventionsTimeSeries } from "@/lib/db/queries/fire";
import { getLastMetricsUpdate } from "@/lib/db/queries/metrics";
import {
  rollingAverage7d,
  aggregateByDayOfWeek,
  detectHolidayEffect,
  detectAnomalies,
  yearOverYearComparison,
} from "@/lib/analytics/temporal";
import type { TimeSeriesPoint } from "@/lib/analytics/temporal";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { DayOfWeekHeatmap } from "@/components/analysis/DayOfWeekHeatmap";
import { AnomalyBadge } from "@/components/analysis/AnomalyBadge";
import {
  ConstructionComplaintsCorrelation,
} from "@/components/analysis/ConstructionComplaintsCorrelation";
import {
  getConstructionComplaintsCorrelation,
  getCrimeFireSafetyIndex,
} from "@/lib/db/queries/analysis";
import { SafetyIndexHeatmap } from "@/components/analysis/SafetyIndexHeatmap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { subDays, subMonths } from "date-fns";

/** Dynamic: trends page uses real-time analytics and cross-source queries. */
export const dynamic = 'force-dynamic';

function getDateRange(days: number): { start: string; end: string } {
  const end = new Date();
  const start = subDays(end, days);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default async function TrendsPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";
  const last90 = getDateRange(90);
  const last30 = getDateRange(30);

  const [
    crimeTs,
    crimeStats,
    crimeCategory,
    construction311,
    safetyIndex,
    lastUpdate,
  ] = await Promise.all([
    getCrimeTimeSeries(
      null,
      last90.start,
      last90.end,
      "daily",
      { includeRolling7d: true, includePreviousYear: true }
    ),
    getCrimeStats(null),
    getCrimeByCategory(null, last30.start, last30.end),
    getConstructionComplaintsCorrelation(),
    getCrimeFireSafetyIndex(last90.start, last90.end),
    getLastMetricsUpdate(),
  ]);
  const crimePoints: TimeSeriesPoint[] = crimeTs.map((p) => ({
    period: p.period,
    value: p.count,
  }));

  const crimeWithRolling = rollingAverage7d(crimePoints);
  const crimeDayOfWeek = aggregateByDayOfWeek(crimePoints);
  const crimeHolidayEffect = detectHolidayEffect(crimePoints);
  const today = new Date().toISOString().slice(0, 10);
  const crimeYoY = yearOverYearComparison(crimePoints, today);

  const crimeChartData = crimeWithRolling.map((p) => ({
    period: p.period,
    value: p.rolling7d ?? p.value,
    rolling7d: p.rolling7d,
    previousYearValue: crimeTs.find((c) => c.period === p.period)
      ?.previousYearCount,
  }));

  const topCategory = crimeCategory[0]?.category ?? null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {isFr ? "Analyse temporelle et tendances" : "Temporal analysis & trends"}
        </h1>
        {lastUpdate && (
          <DataFreshness
            lastUpdated={lastUpdate}
            expectedScheduleHours={24}
            locale={locale}
          />
        )}
      </div>

      <p className="text-muted-foreground">
        {isFr
          ? "Moyenne mobile 7 jours, motifs jour de la semaine, effet des jours fériés, comparaison année par année et détection d'anomalies."
          : "7-day rolling average, day-of-week patterns, holiday effects, year-over-year comparison, and anomaly detection."}
      </p>

      {/* Anomaly badge */}
      {crimeStats.delta7dVsPrev7d != null &&
        Math.abs(crimeStats.delta7dVsPrev7d) >= 20 && (
          <AnomalyBadge
            metricLabel={isFr ? "Criminalité" : "Crime"}
            deltaPct={crimeStats.delta7dVsPrev7d}
            direction={crimeStats.delta7dVsPrev7d >= 0 ? "up" : "down"}
            detail={
              topCategory
                ? isFr
                  ? `principalement ${topCategory}`
                  : `mostly ${topCategory}`
                : undefined
            }
            locale={locale}
          />
        )}

      {/* Crime trend with rolling average */}
      <TrendChart
        data={crimeChartData.map((d) => ({
          period: d.period,
          value: d.value,
          previousYearValue: d.previousYearValue,
        }))}
        title={
          isFr ? "Criminalité — moyenne mobile 7 jours" : "Crime — 7-day rolling average"
        }
        granularity="daily"
        onGranularityChange={() => {}}
        valueLabel={isFr ? "Moyenne 7j" : "7-day avg"}
        previousYearLabel={isFr ? "Même période 2024" : "Same period 2024"}
        locale={locale}
      />

      {/* Day-of-week heatmap */}
      <DayOfWeekHeatmap
        data={crimeDayOfWeek}
        title={isFr ? "Criminalité par jour de la semaine" : "Crime by day of week"}
        valueLabel={isFr ? "Moyenne d'incidents par jour" : "Average incidents per day"}
        locale={locale}
      />

      {/* Holiday effect */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {isFr ? "Effet des jours fériés" : "Holiday effect"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFr
              ? "L'activité criminelle est-elle plus faible les jours fériés?"
              : "Is criminal activity lower on stat holidays?"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {isFr ? "Moyenne jours fériés" : "Holiday average"}
              </p>
              <p className="text-2xl font-bold">
                {crimeHolidayEffect.holidayAvg.toFixed(1)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {isFr ? "Moyenne autres jours" : "Non-holiday average"}
              </p>
              <p className="text-2xl font-bold">
                {crimeHolidayEffect.nonHolidayAvg.toFixed(1)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {isFr ? "Ratio" : "Ratio"}
              </p>
              <p className="text-2xl font-bold">
                {crimeHolidayEffect.ratio.toFixed(2)}×
              </p>
              <p className="text-xs text-muted-foreground">
                {crimeHolidayEffect.ratio < 1
                  ? isFr
                    ? "Moins d'activité les fériés"
                    : "Lower activity on holidays"
                  : isFr
                    ? "Similaire ou plus"
                    : "Similar or higher"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* YoY comparison */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {isFr ? "Comparaison année par année" : "Year-over-year comparison"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFr
              ? "Aujourd'hui vs même date l'an dernier"
              : "Today vs same date last year"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                {isFr ? "Cette période" : "This period"}
              </p>
              <p className="text-2xl font-bold">{crimeYoY.current}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {isFr ? "Année précédente" : "Previous year"}
              </p>
              <p className="text-2xl font-bold">{crimeYoY.previousYear}</p>
            </div>
            {crimeYoY.deltaPct != null && (
              <div>
                <p className="text-sm text-muted-foreground">Δ %</p>
                <p
                  className={`text-2xl font-bold ${
                    crimeYoY.deltaPct >= 0 ? "text-destructive" : "text-green-600"
                  }`}
                >
                  {crimeYoY.deltaPct >= 0 ? "+" : ""}
                  {crimeYoY.deltaPct}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cross-source analyses */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {isFr ? "Analyses croisées" : "Cross-source analyses"}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <ConstructionComplaintsCorrelation
            data={construction311}
            locale={locale}
          />
          <SafetyIndexHeatmap data={safetyIndex} locale={locale} />
        </div>
      </div>
    </div>
  );
}
