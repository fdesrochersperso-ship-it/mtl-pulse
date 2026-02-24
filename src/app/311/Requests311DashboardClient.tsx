"use client";

import { TrendChart } from "@/components/dashboard/TrendChart";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import type {
  Request311ByNatureRow,
  Request311ByTypeRow,
  Request311ByStatusRow,
} from "@/lib/db/queries/requests311";

export interface Requests311DashboardClientProps {
  byNature: Request311ByNatureRow[];
  byType: Request311ByTypeRow[];
  byStatus: Request311ByStatusRow[];
  backlogChartData: { period: string; value: number; previousYearValue?: number }[];
  responseTimeData: { boroughCode: string; label: string; value: number; isHighlighted?: boolean }[];
  locale: "fr" | "en";
}

export function Requests311DashboardClient({
  byNature,
  byType,
  byStatus,
  backlogChartData,
  responseTimeData,
  locale,
}: Requests311DashboardClientProps) {
  const natureChartData = byNature.map((n) => ({
    boroughCode: n.nature,
    label: n.nature,
    value: n.count,
    isHighlighted: false,
  }));

  const typeChartData = byType.map((t) => ({
    boroughCode: t.requestType,
    label: t.requestType.length > 30 ? t.requestType.slice(0, 30) + "…" : t.requestType,
    value: t.count,
    isHighlighted: false,
  }));

  const statusChartData = byStatus.map((s) => ({
    boroughCode: s.status,
    label: s.status,
    value: s.count,
    isHighlighted: false,
  }));

  return (
    <div className="space-y-8">
      <TrendChart
        data={backlogChartData}
        title={
          locale === "fr"
            ? "Nouvelles demandes par semaine (flux)"
            : "New requests per week (flow)"
        }
        granularity="weekly"
        onGranularityChange={() => {}}
        locale={locale}
        valueLabel={locale === "fr" ? "Créées" : "Created"}
      />

      <BoroughComparison
        data={natureChartData}
        title={locale === "fr" ? "Par nature" : "By nature"}
        valueLabel={locale === "fr" ? "Demandes" : "Requests"}
        locale={locale}
      />

      <BoroughComparison
        data={typeChartData}
        title={locale === "fr" ? "Types de service (ACTI_NOM)" : "Service types (ACTI_NOM)"}
        valueLabel={locale === "fr" ? "Demandes" : "Requests"}
        locale={locale}
      />

      <BoroughComparison
        data={statusChartData}
        title={
          locale === "fr"
            ? "Statut (Urgente → Transmise → Terminée)"
            : "Status (Urgent → Transmitted → Completed)"
        }
        valueLabel={locale === "fr" ? "Demandes" : "Requests"}
        locale={locale}
      />

      {responseTimeData.length > 0 && (
        <BoroughComparison
          data={responseTimeData}
          title={
            locale === "fr"
              ? "Délai moyen de résolution par arrondissement"
              : "Avg resolution time by borough"
          }
          valueLabel={locale === "fr" ? "Jours" : "Days"}
          locale={locale}
        />
      )}
    </div>
  );
}
