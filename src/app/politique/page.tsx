import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getOfficials,
  getPartyComposition,
  getCouncilMeetings,
  getParties,
} from "@/lib/db/queries/officials";
import { getBoroughMetrics } from "@/lib/db/queries/borough";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { PolitiqueDashboardClient } from "./PolitiqueDashboardClient";

export default async function PolitiquePage({
  searchParams,
}: {
  searchParams: Promise<{ borough?: string; party?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;
  const partyFilter = params.party && params.party !== "" ? params.party : null;

  const [
    officials,
    partyComposition,
    councilMeetings,
    parties,
    officialsPipeline,
  ] = await Promise.all([
    getOfficials({ boroughCode: boroughCode ?? undefined, party: partyFilter ?? undefined }),
    getPartyComposition(),
    getCouncilMeetings(10),
    getParties(),
    getPipelineLastSuccess("elected_officials"),
  ]);

  const boroughChartData = partyComposition.map((p) => ({
    boroughCode: p.party,
    label: p.party,
    value: p.count,
    isHighlighted: partyFilter === p.party,
  }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Responsabilité politique" : "Political accountability"}
          </h1>
          {officialsPipeline && (
            <DataFreshness
              lastUpdated={officialsPipeline}
              expectedScheduleHours={168}
              locale={locale}
            />
          )}
        </div>

        {/* Borough / party filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isFr ? "Filtrer:" : "Filter:"}
          </span>
          <a
            href="/politique"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode && !partyFilter
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Tous" : "All"}
          </a>
          {Object.entries(BOROUGHS).slice(0, 8).map(([code, { name }]) => (
            <a
              key={code}
              href={`/politique?borough=${code}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name.length > 15 ? name.slice(0, 15) + "…" : name}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Élus" : "Officials"}
            value={officials.length.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Partis" : "Parties"}
            value={partyComposition.length.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Prochaines séances" : "Upcoming sessions"}
            value={councilMeetings.length > 0 ? councilMeetings.length.toString() : "—"}
          />
          <MetricCard
            title={isFr ? "Filtre actif" : "Active filter"}
            value={boroughCode ? (BOROUGHS[boroughCode as keyof typeof BOROUGHS]?.name ?? boroughCode) : (partyFilter ?? "—")}
          />
        </div>
      </div>

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <PolitiqueDashboardClient
          officials={officials}
          partyComposition={boroughChartData}
          councilMeetings={councilMeetings}
          parties={parties}
          boroughCode={boroughCode}
          partyFilter={partyFilter}
          locale={locale}
        />
      </Suspense>

      {/* Borough scorecard accountability - 311 + crime + contracts per borough */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {isFr ? "Fiche arrondissement — responsabilité" : "Borough scorecard — accountability"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFr
              ? "Délai 311, tendance criminalité, investissement contrats par territoire des élus."
              : "311 response time, crime trend, contract investment per official territory."}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(BOROUGHS) as (keyof typeof BOROUGHS)[]).slice(0, 6).map(async (code) => {
              const metrics = await getBoroughMetrics(code);
              const scorecard = metrics.slice(0, 4);
              return (
                <Card key={code}>
                  <CardContent className="pt-4">
                    <h4 className="font-medium">
                      {BOROUGHS[code]?.name ?? code}
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {scorecard.map((m) => (
                        <li key={m.metricName}>
                          {m.labelKey[locale as "fr" | "en"]}: {m.format(m.value)}
                          {m.deltaPct != null && (
                            <span
                              className={
                                m.vsAvg === "better"
                                  ? "text-green-600"
                                  : m.vsAvg === "worse"
                                    ? "text-red-600"
                                    : ""
                              }
                            >
                              {" "}
                              ({m.deltaPct > 0 ? "+" : ""}
                              {m.deltaPct}%)
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
