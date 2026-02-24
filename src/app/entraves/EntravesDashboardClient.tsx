"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { DataTable } from "@/components/dashboard/DataTable";
import { BOROUGHS } from "@/lib/constants/boroughs";
import type { ObstructionRow } from "@/lib/db/queries/obstructions";

export interface EntravesDashboardClientProps {
  byTypeChartData: { boroughCode: string; label: string; value: number }[];
  snapshot: ObstructionRow[];
  locale: "fr" | "en";
}

export function EntravesDashboardClient({
  byTypeChartData,
  snapshot,
  locale,
}: EntravesDashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") p.delete(k);
        else p.set(k, v);
      }
      router.push(`/entraves?${p.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleExportCsv = useCallback(() => {
    const headers = ["Rue", "Direction", "Type", "Sous-type", "Arrondissement", "Début", "Fin"];
    const rows = snapshot.map((r) => [
      r.street ?? "",
      r.direction ?? "",
      r.obstructionType ?? "",
      r.subtype ?? "",
      BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ?? r.boroughCode ?? "",
      r.startTime ? new Date(r.startTime).toISOString().slice(0, 16) : "",
      r.endTime ? new Date(r.endTime).toISOString().slice(0, 16) : "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `entraves-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [snapshot]);

  return (
    <div className="space-y-8">
      <BoroughComparison
        data={byTypeChartData}
        title={locale === "fr" ? "Par type/sous-type" : "By type/subtype"}
        valueLabel={locale === "fr" ? "Entraves" : "Obstructions"}
        locale={locale}
      />

      <DataTable<ObstructionRow>
        columns={[
          {
            key: "street",
            label: locale === "fr" ? "Rue" : "Street",
          },
          {
            key: "direction",
            label: locale === "fr" ? "Direction" : "Direction",
          },
          {
            key: "boroughCode",
            label: locale === "fr" ? "Arrondissement" : "Borough",
            render: (r) => BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ?? r.boroughCode ?? "—",
          },
          {
            key: "obstructionType",
            label: locale === "fr" ? "Type" : "Type",
          },
          {
            key: "subtype",
            label: locale === "fr" ? "Sous-type" : "Subtype",
          },
          {
            key: "startTime",
            label: locale === "fr" ? "Début" : "Start",
            render: (r) => (r.startTime ? new Date(r.startTime).toLocaleString("fr-CA") : "—"),
          },
          {
            key: "endTime",
            label: locale === "fr" ? "Fin" : "End",
            render: (r) => (r.endTime ? new Date(r.endTime).toLocaleString("fr-CA") : "—"),
          },
        ]}
        data={snapshot}
        total={snapshot.length}
        page={1}
        pageSize={25}
        onPageChange={() => {}}
        onExportCsv={handleExportCsv}
        locale={locale}
        emptyMessage={locale === "fr" ? "Aucune entrave active" : "No active obstructions"}
      />
    </div>
  );
}
