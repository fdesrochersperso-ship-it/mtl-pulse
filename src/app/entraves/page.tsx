import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { DataFreshness } from "@/components/dashboard/DataFreshness";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { DataTable } from "@/components/dashboard/DataTable";
import { PointMap } from "@/components/map/PointMap";
import { Card, CardContent } from "@/components/ui/card";
import { BOROUGHS } from "@/lib/constants/boroughs";
import {
  getObstructionsStats,
  getObstructionsSnapshot,
  getObstructionsByType,
  getObstructionsForMap,
} from "@/lib/db/queries/obstructions";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineLastSuccess } from "@/lib/db/queries/pipeline-status";
import { EntravesDashboardClient } from "./EntravesDashboardClient";

export default async function EntravesPage({
  searchParams,
}: {
  searchParams: Promise<{ borough?: string; type?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const isFr = locale === "fr";

  const boroughCode = params.borough && params.borough !== "" ? params.borough : null;
  const typeFilter = params.type && params.type !== "" ? params.type : null;

  const [stats, snapshot, byType, mapPoints, digest, lastPipeline] = await Promise.all([
    getObstructionsStats(boroughCode),
    getObstructionsSnapshot({
      boroughCode: boroughCode ?? undefined,
      obstructionType: typeFilter ?? undefined,
    }),
    getObstructionsByType(),
    getObstructionsForMap(
      { boroughCode: boroughCode ?? undefined, obstructionType: typeFilter ?? undefined },
      300
    ),
    getLatestDigest("daily", locale, null),
    getPipelineLastSuccess("entraves_circulation"),
  ]);

  const byTypeChartData = byType.map((t) => ({
    boroughCode: t.obstructionType ?? "",
    label: (t.obstructionType ?? "").length > 40 ? (t.obstructionType ?? "").slice(0, 40) + "…" : t.obstructionType ?? "",
    value: t.count,
    isHighlighted: false,
  }));

  const pointMapItems = mapPoints
    .filter((p) => p.lat != null && p.lng != null)
    .map((p) => ({
      id: p.id,
      position: [p.lat!, p.lng!] as [number, number],
      tooltip: (
        <div className="space-y-1">
          <p className="font-semibold">{p.obstructionType ?? "—"}</p>
          <p>{p.street ?? ""} {p.direction ? `(${p.direction})` : ""}</p>
          <p>{p.boroughCode ? BOROUGHS[p.boroughCode as keyof typeof BOROUGHS]?.name : ""}</p>
        </div>
      ),
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {isFr ? "Entraves à la circulation" : "Road obstructions"}
          </h1>
          {lastPipeline && (
            <DataFreshness
              lastUpdated={lastPipeline}
              expectedScheduleHours={2}
              locale={locale}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isFr ? "Arrondissement:" : "Borough:"}
          </span>
          <a
            href="/entraves"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !boroughCode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isFr ? "Toute la ville" : "City-wide"}
          </a>
          {Object.entries(BOROUGHS).map(([code, { name }]) => (
            <a
              key={code}
              href={`/entraves?borough=${code}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                boroughCode === code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            title={isFr ? "Entraves actives" : "Active obstructions"}
            value={stats.activeCount.toLocaleString("fr-CA")}
          />
          <MetricCard
            title={isFr ? "Rue la plus touchée" : "Most affected street"}
            value={stats.topStreet ?? "—"}
          />
          <MetricCard
            title={isFr ? "Arrondissement le plus touché" : "Most affected borough"}
            value={
              stats.topBorough
                ? BOROUGHS[stats.topBorough as keyof typeof BOROUGHS]?.name ?? stats.topBorough
                : "—"
            }
          />
          <MetricCard
            title={isFr ? "Type dominant" : "Top type"}
            value={stats.topType ?? "—"}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {isFr ? "Données en temps réel (CIFS)." : "Real-time data (CIFS)."}
        </p>
      </div>

      {digest && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">
              {isFr ? "Aperçu IA" : "AI insight"}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {digest.summary.slice(0, 400)}
              {digest.summary.length > 400 ? "…" : ""}
            </p>
          </CardContent>
        </Card>
      )}

      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
        <EntravesDashboardClient
          byTypeChartData={byTypeChartData}
          snapshot={snapshot}
          locale={locale}
        />
      </Suspense>

      {pointMapItems.length > 0 && (
        <PointMap
          points={pointMapItems}
          title={isFr ? "Carte des entraves" : "Obstructions map"}
          locale={locale}
        />
      )}
    </div>
  );
}
