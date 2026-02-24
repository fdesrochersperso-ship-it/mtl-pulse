import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBoroughByCode,
  getBoroughMetrics,
  getBoroughRankings,
  getElectedOfficialsByBorough,
  BOROUGH_TREND_METRICS,
} from "@/lib/db/queries/borough";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getMetricHistory } from "@/lib/db/queries/metrics";
import { getLocale } from "@/lib/locale";
import { BoroughScorecard } from "@/components/borough/BoroughScorecard";
import { BoroughTrendChart } from "@/components/borough/BoroughTrendCharts";
import { DigestCard } from "@/components/digest/DigestCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSiteUrl } from "@/lib/config";

const TREND_LABELS: Record<string, { fr: string; en: string }> = {
  crime_count_7d: { fr: "Criminalité (7j)", en: "Crime (7d)" },
  active_travaux_count: { fr: "Chantiers actifs", en: "Active construction" },
  permits_count_week: { fr: "Permis / semaine", en: "Permits / week" },
  requests_311_open: { fr: "311 ouverts", en: "311 open" },
  fire_interventions_7d: { fr: "Pompiers (7j)", en: "Fire (7d)" },
  potholes_repaired_ytd: { fr: "Nids-de-poule YTD", en: "Potholes YTD" },
};

/** Static generation for borough pages with fallback for unknown codes. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const codes = [
    "AHU", "ANJ", "CDN", "IBI", "LAC", "LSL", "PLA", "LSO", "MHM", "MTN",
    "OUT", "PFD", "RPP", "RDP", "SLR", "SLE", "VER", "VSP", "VMA",
  ];
  return codes.map((code) => ({ code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const borough = await getBoroughByCode(code.toUpperCase());
  if (!borough) return { title: "Borough | MTL Pulse" };
  const title = `${borough.name} | MTL Pulse`;
  const description = `Tableau de bord et indicateurs pour l'arrondissement ${borough.name} à Montréal.`;
  const url = `${getSiteUrl()}/borough/${code.toUpperCase()}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "MTL Pulse",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BoroughProfilePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const boroughCode = code.toUpperCase();
  const locale = await getLocale();

  const [borough, metrics, rankings, officials, digest] = await Promise.all([
    getBoroughByCode(boroughCode),
    getBoroughMetrics(boroughCode),
    getBoroughRankings(boroughCode),
    getElectedOfficialsByBorough(boroughCode),
    getLatestDigest("borough", locale, boroughCode),
  ]);

  if (!borough) notFound();

  const trendHistories = await Promise.all(
    BOROUGH_TREND_METRICS.map((metricName) =>
      getMetricHistory(metricName, boroughCode, 30)
    )
  );

  const rankingPhrases = rankings
    .slice(0, 5)
    .map(
      (r) =>
        `${locale === "fr" ? "Rang" : "Rank"} #${r.rank}/${r.totalBoroughs} (${r.labelKey[locale as "fr" | "en"]})`
    )
    .join(", ");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/borough"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {locale === "fr" ? "Tous les arrondissements" : "All boroughs"}
        </Link>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {borough.name}
        </h1>
        <p className="text-muted-foreground">
          {borough.population > 0
            ? `${borough.population.toLocaleString("fr-CA")} ${locale === "fr" ? "habitants" : "residents"}`
            : ""}
        </p>
      </div>

      {/* 1. Borough scorecard */}
      <BoroughScorecard metrics={metrics} locale={locale} />

      {/* 2. Borough AI digest */}
      {digest && (
        <DigestCard
          title={digest.title}
          summary={digest.summary}
          highlights={
            Array.isArray(digest.highlights)
              ? (digest.highlights as DigestCardProps["highlights"])
              : []
          }
          modelUsed={digest.modelUsed}
          locale={locale}
          defaultCollapsed={false}
        />
      )}

      {/* 3. Borough elected officials */}
      {officials.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {locale === "fr" ? "Élus" : "Elected officials"}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {officials.map((o, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2"
                >
                  <span className="font-medium">{o.name}</span>
                  {o.functionType && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                      {o.functionType}
                    </span>
                  )}
                  {o.party && (
                    <span className="text-xs text-muted-foreground">
                      {o.party}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. Borough ranking position */}
      {rankingPhrases && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {locale === "fr" ? "Position comparative" : "Comparative ranking"}
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{rankingPhrases}</p>
          </CardContent>
        </Card>
      )}

      {/* 5. Borough trend charts - 2 per row on mobile */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            {locale === "fr" ? "Tendances" : "Trends"}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {BOROUGH_TREND_METRICS.map((metricName, i) => {
              const history = trendHistories[i] ?? [];
              const labels = TREND_LABELS[metricName] ?? {
                fr: metricName,
                en: metricName,
              };
              return (
                <BoroughTrendChart
                  key={metricName}
                  title={labels[locale as "fr" | "en"]}
                  data={history.map((h) => ({
                    period: h.periodDate,
                    value: h.value,
                  }))}
                  locale={locale}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import type { DigestCardProps } from "@/components/digest/DigestCard";
