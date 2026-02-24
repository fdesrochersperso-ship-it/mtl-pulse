"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import type { WorstRoadRow } from "@/lib/db/queries/roadConditions";

export interface RoutesDashboardClientProps {
  boroughChartData: {
    boroughCode: string;
    label: string;
    value: number;
    isHighlighted: boolean;
  }[];
  worstRoads: WorstRoadRow[];
  locale: "fr" | "en";
}

export function RoutesDashboardClient({
  boroughChartData,
  worstRoads,
  locale,
}: RoutesDashboardClientProps) {
  return (
    <div className="space-y-8">
      {boroughChartData.length > 0 && (
        <BoroughComparison
          data={boroughChartData}
          title={
            locale === "fr"
              ? "PCI moyen par arrondissement (plus bas = pire)"
              : "Avg PCI by borough (lower = worse)"
          }
          valueLabel="PCI"
          locale={locale}
        />
      )}

      {worstRoads.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {locale === "fr" ? "Routes les plus dégradées" : "Worst roads"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {locale === "fr"
                ? "Classement par PCI — PCI bas = chaussée en mauvais état."
                : "Ranked by PCI — low PCI = poor pavement condition."}
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">
                      {locale === "fr" ? "Rue" : "Street"}
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      {locale === "fr" ? "Arrondissement" : "Borough"}
                    </th>
                    <th className="px-4 py-3 text-right font-medium">PCI</th>
                    <th className="px-4 py-3 text-right font-medium">IRI</th>
                  </tr>
                </thead>
                <tbody>
                  {worstRoads.slice(0, 25).map((r, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3">
                        {r.streetName ?? r.segmentId}
                      </td>
                      <td className="px-4 py-3">{r.boroughCode ?? "—"}</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {r.pciScore != null ? r.pciScore.toFixed(1) : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.iriScore != null ? r.iriScore.toFixed(1) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
