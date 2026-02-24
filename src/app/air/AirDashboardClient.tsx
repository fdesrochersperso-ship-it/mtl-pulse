"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AirQualityBySector } from "@/lib/db/queries/airQuality";
import type { PollutantTrendPoint } from "@/lib/db/queries/airQuality";

export interface AirDashboardClientProps {
  bySector: AirQualityBySector[];
  badAirDays: { year: string; count: number }[];
  pollutantTrend: PollutantTrendPoint[];
  locale: "fr" | "en";
  iqaLabel: (v: number) => string;
}

export function AirDashboardClient({
  bySector,
  badAirDays,
  pollutantTrend,
  locale,
  iqaLabel,
}: AirDashboardClientProps) {
  const sectorChartData = bySector.map((s) => ({
    sector: s.sectorName?.slice(0, 15) ?? s.stationId,
    iqa: s.iqa,
    label: iqaLabel(s.iqa),
  }));

  const badDaysChartData = badAirDays.slice(0, 10).map((d) => ({
    year: d.year,
    count: d.count,
  }));

  const pollutantByPeriod = new Map<string, { period: string; [k: string]: string | number }>();
  const allPollutants = [...new Set(pollutantTrend.map((p) => p.pollutant))].slice(0, 4);
  for (const p of pollutantTrend) {
    const key = p.period.slice(0, 7);
    if (!pollutantByPeriod.has(key)) {
      pollutantByPeriod.set(key, { period: key });
    }
    pollutantByPeriod.get(key)![p.pollutant] = p.avgValue;
  }
  const pollutantChartData = [...pollutantByPeriod.values()].sort((a, b) =>
    (a.period as string).localeCompare(b.period as string)
  );

  return (
    <div className="space-y-8">
      {sectorChartData.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {locale === "fr" ? "IQA par secteur" : "IQA by sector"}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorChartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="sector" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="iqa" fill="hsl(var(--primary))" name="IQA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {badDaysChartData.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {locale === "fr" ? "Jours de mauvaise qualité (IQA > 50)" : "Bad air days per year (IQA > 50)"}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={badDaysChartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--destructive))" name={locale === "fr" ? "Jours" : "Days"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {pollutantChartData.length > 0 && allPollutants.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {locale === "fr" ? "Tendance des polluants" : "Pollutant trend"}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollutantChartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  {allPollutants.map((key, i) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={["#3b82f6", "#f59e0b", "#10b981", "#ef4444"][i % 4]}
                      name={key}
                      stackId="a"
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {bySector.length === 0 && badAirDays.length === 0 && pollutantTrend.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {locale === "fr"
              ? "Données de qualité de l'air à venir (rsqa-indice-qualite-air)."
              : "Air quality data coming soon (rsqa-indice-qualite-air)."}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
