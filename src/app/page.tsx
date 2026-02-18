export const dynamic = 'force-dynamic';

import { MetricCard } from "@/components/charts/metric-card";
import {
  Shield,
  Construction,
  FileText,
  Phone,
  Flame,
  Circle,
  Snowflake,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  getLatestDateWithData,
  getDashboardMetrics,
} from "@/lib/queries/dashboard";

/** Map category keys to display info */
const CATEGORY_CONFIG: Record<
  string,
  { title: string; icon: React.ReactNode }
> = {
  crime: { title: "Incidents criminels", icon: <Shield className="h-5 w-5" /> },
  construction: {
    title: "Entraves routières actives",
    icon: <Construction className="h-5 w-5" />,
  },
  permits: { title: "Permis émis", icon: <FileText className="h-5 w-5" /> },
  requests_311: { title: "Requêtes 311", icon: <Phone className="h-5 w-5" /> },
  fire: {
    title: "Interventions incendie",
    icon: <Flame className="h-5 w-5" />,
  },
  potholes: {
    title: "Nids-de-poule réparés",
    icon: <Circle className="h-5 w-5" />,
  },
  snow_towings: {
    title: "Remorquages (neige)",
    icon: <Snowflake className="h-5 w-5" />,
  },
};

/** Fallback placeholder data when DB has no data or is not connected */
const PLACEHOLDER_METRICS = [
  { category: "crime", value: 89, previousValue: 76 },
  { category: "construction", value: 342, previousValue: 338 },
  { category: "permits", value: 23, previousValue: 19 },
  { category: "requests_311", value: 456, previousValue: 489 },
  { category: "fire", value: 31, previousValue: 28 },
  { category: "potholes", value: 127, previousValue: 98 },
  { category: "snow_towings", value: 45, previousValue: 62 },
];

export default async function DailyPage() {
  // Try to fetch real data from the database
  const latestDate = await getLatestDateWithData();
  const liveMetrics = latestDate ? await getDashboardMetrics(latestDate) : [];
  const isLive = liveMetrics.length > 0;

  // Use real data if available, otherwise fall back to placeholders
  const displayDate = latestDate ? new Date(latestDate + "T12:00:00") : new Date();
  const formattedDate = format(displayDate, "EEEE d MMMM yyyy", { locale: fr });

  // Build display metrics — merge live data with all categories
  const metrics = isLive
    ? Object.keys(CATEGORY_CONFIG).map((cat) => {
        const live = liveMetrics.find((m) => m.category === cat);
        return {
          category: cat,
          value: live?.value ?? 0,
          previousValue: live?.previousValue ?? null,
        };
      })
    : PLACEHOLDER_METRICS;

  return (
    <div>
      {/* Date & City Summary */}
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-muted">
          Tableau de bord civique
        </p>
        <h1 className="mt-1 text-3xl font-bold capitalize text-navy">
          {formattedDate}
        </h1>
      </div>

      {/* Demo data banner */}
      {!isLive && (
        <div className="mb-6 rounded-lg border border-orange/30 bg-orange/5 px-4 py-3">
          <p className="text-sm text-orange">
            Données de démonstration — Connectez la base de données et lancez le
            cron pour afficher les données réelles.
          </p>
        </div>
      )}

      {/* Live data indicator */}
      {isLive && (
        <div className="mb-6 rounded-lg border border-green/30 bg-green/5 px-4 py-3">
          <p className="text-sm text-green">
            Données en direct du {format(displayDate, "d MMMM yyyy", { locale: fr })} — Source: Ville de Montréal (données ouvertes)
          </p>
        </div>
      )}

      {/* AI Digest Placeholder */}
      <div className="mb-8 rounded-lg border-l-4 border-orange bg-card-bg p-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange">
          Résumé du jour
        </h2>
        <p className="text-sm leading-relaxed text-navy/80">
          {isLive
            ? `Montréal a enregistré ${liveMetrics.find((m) => m.category === "crime")?.value ?? 0} incidents criminels${liveMetrics.find((m) => m.category === "crime")?.previousValue ? ` (${liveMetrics.find((m) => m.category === "crime")!.value > liveMetrics.find((m) => m.category === "crime")!.previousValue! ? "en hausse" : "en baisse"} par rapport à la veille)` : ""}. Les résumés IA seront bientôt disponibles.`
            : "Montréal a enregistré 89 incidents criminels hier, en hausse de 17% par rapport à la veille. 23 nouveaux permis de construction ont été émis. Les résumés IA seront générés automatiquement une fois les données connectées."}
        </p>
        <p className="mt-2 text-xs text-muted">
          {isLive
            ? "Données provenant des sources ouvertes de la Ville de Montréal"
            : "Généré par IA — Les données proviennent des sources ouvertes de la Ville de Montréal"}
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const config = CATEGORY_CONFIG[metric.category];
          if (!config) return null;
          return (
            <MetricCard
              key={metric.category}
              title={config.title}
              value={metric.value}
              previousValue={metric.previousValue ?? undefined}
              icon={config.icon}
            />
          );
        })}
      </div>

      {/* Data Source Attribution */}
      <div className="mt-12 border-t border-gray-200 pt-6">
        <p className="text-xs text-muted">
          Données: Ville de Montréal (données ouvertes) — Mis à jour
          quotidiennement à 6h
        </p>
      </div>
    </div>
  );
}
