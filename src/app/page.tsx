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

// Placeholder data — will be replaced with DB queries once connected
const PLACEHOLDER_METRICS = [
  {
    title: "Incidents criminels",
    value: 89,
    previousValue: 76,
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Entraves routières actives",
    value: 342,
    previousValue: 338,
    icon: <Construction className="h-5 w-5" />,
  },
  {
    title: "Permis émis",
    value: 23,
    previousValue: 19,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Requêtes 311",
    value: 456,
    previousValue: 489,
    icon: <Phone className="h-5 w-5" />,
  },
  {
    title: "Interventions incendie",
    value: 31,
    previousValue: 28,
    icon: <Flame className="h-5 w-5" />,
  },
  {
    title: "Nids-de-poule réparés",
    value: 127,
    previousValue: 98,
    icon: <Circle className="h-5 w-5" />,
  },
  {
    title: "Remorquages (neige)",
    value: 45,
    previousValue: 62,
    icon: <Snowflake className="h-5 w-5" />,
  },
];

export default function DailyPage() {
  const today = new Date();
  const formattedDate = format(today, "EEEE d MMMM yyyy", { locale: fr });

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

      {/* AI Digest Placeholder */}
      <div className="mb-8 rounded-lg border-l-4 border-orange bg-card-bg p-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange">
          Résumé du jour
        </h2>
        <p className="text-sm leading-relaxed text-navy/80">
          Montréal a enregistré 89 incidents criminels hier, en hausse de 17%
          par rapport à la veille. 23 nouveaux permis de construction ont été
          émis, principalement dans Ville-Marie et le Plateau. Les requêtes 311
          sont en baisse, tandis que les réparations de nids-de-poule
          s&apos;accélèrent avec 127 interventions.
        </p>
        <p className="mt-2 text-xs text-muted">
          Généré par IA — Les données proviennent des sources ouvertes de la
          Ville de Montréal
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_METRICS.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            previousValue={metric.previousValue}
            icon={metric.icon}
          />
        ))}
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
