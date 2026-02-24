import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getAllBoroughsSummary } from "@/lib/db/queries/borough";
import { getBoroughBoundaries } from "@/lib/db/queries/map";
import { BoroughIndexClient } from "./BoroughIndexClient";

export const metadata = {
  title: "Arrondissements | MTL Pulse",
  description:
    "Comparatif des 19 arrondissements de Montréal — criminalité, travaux, permis et plus.",
};

export default async function BoroughIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const t = await getTranslations("borough");
  const sortBy =
    sort === "population" || sort === "crime" || sort === "construction"
      ? sort
      : "name";

  const [boroughs, boundaries] = await Promise.all([
    getAllBoroughsSummary(sortBy),
    getBoroughBoundaries(),
  ]);

  const geoJSON = {
    type: "FeatureCollection" as const,
    features: boundaries
      .filter((b) => b.geometry != null)
      .map((b) => {
        const geom = b.geometry as { type?: string; coordinates?: unknown };
        return {
          type: "Feature" as const,
          properties: { code: b.code, name: b.name },
          geometry: geom,
        };
      }),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Suspense fallback={<BoroughIndexSkeleton />}>
        <BoroughIndexClient
          boroughs={boroughs}
          boroughsGeoJSON={geoJSON}
          initialSort={sortBy}
        />
      </Suspense>
    </div>
  );
}

function BoroughIndexSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-28 animate-pulse rounded-lg border bg-muted/30"
        />
      ))}
    </div>
  );
}
