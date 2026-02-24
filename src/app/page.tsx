import { getTranslations } from "next-intl/server";
import { getLocale } from "@/lib/locale";
import { getAllCurrentMetrics, getMetricHistory } from "@/lib/db/queries/metrics";
import { getLatestDigest } from "@/lib/db/queries/digests";
import { getPipelineStatuses, PIPELINE_LABELS } from "@/lib/db/queries/pipeline-status";
import { DigestCard } from "@/components/digest/DigestCard";
import { TopicCard } from "@/components/dashboard/TopicCard";
import { DataFreshnessPerSource } from "@/components/dashboard/DataFreshness";
import type { DigestCardProps } from "@/components/digest/DigestCard";
import type { TopicCardProps } from "@/components/dashboard/TopicCard";
import { getSiteUrl } from "@/lib/config";

const TOPIC_DEFINITIONS = [
  {
    id: "travaux",
    emoji: "🚧",
    href: "/travaux",
    primaryMetric: "active_travaux_count",
    deltaMetric: "new_travaux_today",
    deltaType: "absolute" as const,
    sparklineMetric: "active_travaux_count",
    primaryLabelKey: "active" as const,
    improveOnUp: true,
  },
  {
    id: "securite",
    emoji: "🔒",
    href: "/securite",
    primaryMetric: "crime_count_7d",
    deltaMetric: "crime_delta_vs_prev_7d",
    deltaType: "percent" as const,
    sparklineMetric: "crime_count_7d",
    primaryLabelKey: "last7Days" as const,
    improveOnUp: false,
  },
  {
    id: "permis",
    emoji: "🏗️",
    href: "/permis",
    primaryMetric: "permits_count_week",
    deltaMetric: "permits_count_week",
    deltaType: "percent" as const,
    sparklineMetric: "permits_count_week",
    primaryLabelKey: "thisWeek" as const,
    valueFormatter: (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toLocaleString("fr-CA"),
    improveOnUp: true,
  },
  {
    id: "311",
    emoji: "📞",
    href: "/311",
    primaryMetric: "requests_311_open",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "requests_311_open",
    primaryLabelKey: "open" as const,
    improveOnUp: false,
  },
  {
    id: "entraves",
    emoji: "🚗",
    href: "/entraves",
    primaryMetric: "active_obstructions",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "active_obstructions",
    primaryLabelKey: "activeObstructions" as const,
    improveOnUp: false,
  },
  {
    id: "pompiers",
    emoji: "🚒",
    href: "/pompiers",
    primaryMetric: "fire_interventions_7d",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "fire_interventions_7d",
    primaryLabelKey: "last7Days" as const,
    improveOnUp: false,
  },
  {
    id: "nids-de-poule",
    emoji: "🕳️",
    href: "/nids-de-poule",
    primaryMetric: "potholes_repaired_ytd",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "potholes_repaired_ytd",
    primaryLabelKey: "repairedYtd" as const,
    improveOnUp: true,
  },
  {
    id: "punaises",
    emoji: "🐛",
    href: "/punaises",
    primaryMetric: "bedbug_reports_ytd",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "bedbug_reports_ytd",
    primaryLabelKey: "exterminationsYtd" as const,
    improveOnUp: false,
  },
  {
    id: "air",
    emoji: "🌡️",
    href: "/air",
    primaryMetric: "air_quality_current",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "air_quality_current",
    primaryLabelKey: "currentIqa" as const,
    improveOnUp: false,
  },
  {
    id: "velo",
    emoji: "🚲",
    href: "/velo",
    primaryMetric: "cycling_volume_today",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "cycling_volume_today",
    primaryLabelKey: "passesToday" as const,
    improveOnUp: true,
  },
  {
    id: "eau",
    emoji: "💧",
    href: "/eau",
    primaryMetric: "water_breaks_ytd",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "water_breaks_ytd",
    primaryLabelKey: "breaksYtd" as const,
    improveOnUp: false,
  },
  {
    id: "contrats",
    emoji: "🏛️",
    href: "/contrats",
    primaryMetric: "contracts_value_ytd",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "contracts_value_ytd",
    primaryLabelKey: "valueYtd" as const,
    valueFormatter: (n: number) =>
      n >= 1e9 ? `$${(n / 1e9).toFixed(1)}G` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n.toLocaleString("fr-CA"),
    improveOnUp: true,
  },
  {
    id: "politique",
    emoji: "🗳️",
    href: "/politique",
    primaryMetric: "elected_officials_count",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "elected_officials_count",
    primaryLabelKey: "officials" as const,
    improveOnUp: false,
  },
  {
    id: "routes",
    emoji: "🛣️",
    href: "/routes",
    primaryMetric: "potholes_repaired_ytd",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "potholes_repaired_ytd",
    primaryLabelKey: "roadCondition" as const,
    improveOnUp: false,
  },
  {
    id: "pannes",
    emoji: "⚡",
    href: "/pannes",
    primaryMetric: "fire_interventions_7d",
    deltaMetric: null,
    deltaType: "percent" as const,
    sparklineMetric: "fire_interventions_7d",
    primaryLabelKey: "outages" as const,
    improveOnUp: false,
  },
] as const;

function findMetric(
  rows: { metricName: string; value: number; previousValue: number | null }[],
  name: string
) {
  return rows.find((r) => r.metricName === name);
}

/** ISR: revalidate homepage every 5 minutes for fresh metrics. */
export const revalidate = 300;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ borough?: string }>;
}) {
  const { borough } = await searchParams;
  const locale = await getLocale();
  const boroughCode = borough && borough !== "" ? borough : null;

  const [metrics, digest, pipelineStatuses] = await Promise.all([
    getAllCurrentMetrics(boroughCode),
    getLatestDigest("daily", locale, boroughCode),
    getPipelineStatuses(),
  ]);

  const freshnessStatuses = pipelineStatuses.map((ps) => ({
    pipelineName: ps.pipelineName,
    label: (PIPELINE_LABELS[ps.pipelineName] ?? { fr: ps.pipelineName, en: ps.pipelineName })[locale as "fr" | "en"],
    freshnessStatus: ps.freshnessStatus,
    lastSuccessAt: ps.lastSuccessAt,
    hoursSinceSuccess: ps.hoursSinceSuccess,
  }));

  const t = await getTranslations("topics");
  const tLabels = await getTranslations("topicLabels");
  const tTrending = await getTranslations();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MTL Pulse",
    alternateName: "Le pouls de Montréal",
    description:
      "Données en direct de Montréal: criminalité, travaux, permis, demandes 311 et plus.",
    url: getSiteUrl(),
    inLanguage: ["fr-CA", "en-CA"],
    applicationCategory: "GovernmentApplication",
    operatingSystem: "Any",
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Data freshness per source */}
      <div className="flex justify-end">
        <DataFreshnessPerSource
          statuses={freshnessStatuses}
          locale={locale}
        />
      </div>

      {/* AI Digest - collapsible on mobile */}
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
          defaultCollapsed={true}
        />
      )}

      {/* Topic cards grid */}
      <section>
        <h2 className="sr-only">{tTrending("trendingTopics")}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {TOPIC_DEFINITIONS.map(async (def) => {
            const primary = findMetric(metrics, def.primaryMetric);
            const deltaRow = def.deltaMetric
              ? findMetric(metrics, def.deltaMetric)
              : null;

            const value = primary?.value ?? 0;
            const previousValue = primary?.previousValue ?? null;

            let delta: TopicCardProps["delta"] = null;

            if (def.deltaType === "absolute" && deltaRow) {
              const absVal = deltaRow.value;
              delta = {
                absoluteValue: absVal,
                direction:
                  absVal > 0 ? "up" : absVal < 0 ? "down" : "neutral",
                improveOnUp: def.improveOnUp,
              };
            } else if (
              def.deltaMetric === "crime_delta_vs_prev_7d" &&
              deltaRow
            ) {
              delta = {
                percent: deltaRow.value,
                direction:
                  deltaRow.value > 0
                    ? "up"
                    : deltaRow.value < 0
                      ? "down"
                      : "neutral",
                improveOnUp: false,
              };
            } else if (
              deltaRow &&
              def.deltaMetric === def.primaryMetric &&
              previousValue != null
            ) {
              const pct =
                previousValue > 0
                  ? ((value - previousValue) / previousValue) * 100
                  : 0;
              delta = {
                percent: pct,
                direction:
                  pct > 0 ? "up" : pct < 0 ? "down" : "neutral",
                improveOnUp: def.improveOnUp,
              };
            }

            const sparklineRows = await getMetricHistory(
              def.sparklineMetric,
              boroughCode,
              30
            );
            const sparklineData = sparklineRows.map((r) => r.value);

            return (
              <TopicCard
                key={def.id}
                title={t(def.id)}
                emoji={def.emoji}
                primaryMetric={{
                  value,
                  label: tLabels(def.primaryLabelKey),
                  formatter:
                    "valueFormatter" in def ? def.valueFormatter : undefined,
                }}
                delta={delta}
                sparklineData={
                  sparklineData.length > 0 ? sparklineData : [value]
                }
                href={
                  boroughCode
                    ? `${def.href}?borough=${boroughCode}`
                    : def.href
                }
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
