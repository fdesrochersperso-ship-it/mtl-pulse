"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BoroughComparison } from "@/components/dashboard/BoroughComparison";
import { DataTable } from "@/components/dashboard/DataTable";
import { BOROUGHS } from "@/lib/constants/boroughs";

export type OfficialRow = {
  id: number;
  name: string;
  functionType: string | null;
  boroughCode: string | null;
  party: string | null;
  mandateStart: string | null;
  mandateEnd: string | null;
};

export type CouncilMeetingRow = {
  date: string;
  type: string;
  title: string;
  videoUrl: string | null;
  data: Record<string, unknown>;
};

export interface PolitiqueDashboardClientProps {
  officials: OfficialRow[];
  partyComposition: {
    boroughCode: string;
    label: string;
    value: number;
    isHighlighted: boolean;
  }[];
  councilMeetings: CouncilMeetingRow[];
  parties: string[];
  boroughCode: string | null;
  partyFilter: string | null;
  locale: "fr" | "en";
}

export function PolitiqueDashboardClient({
  officials,
  partyComposition,
  councilMeetings,
  parties,
  boroughCode,
  partyFilter,
  locale,
}: PolitiqueDashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") p.delete(k);
        else p.set(k, v);
      }
      router.push(`/politique?${p.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-8">
      {/* Party composition */}
      <BoroughComparison
        data={partyComposition}
        title={
          locale === "fr"
            ? "Composition du conseil par parti"
            : "Council composition by party"
        }
        valueLabel={locale === "fr" ? "Élus" : "Officials"}
        highlightedBoroughCode={partyFilter ?? undefined}
        locale={locale}
      />

      {/* Council meeting calendar */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {locale === "fr" ? "Calendrier des séances" : "Council meeting calendar"}
          </h3>
        </CardHeader>
        <CardContent>
          {councilMeetings.length > 0 ? (
            <div className="space-y-2">
              {councilMeetings.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b py-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{m.type || m.title || "—"}</p>
                    <p className="text-sm text-muted-foreground">
                      {m.date
                        ? new Date(m.date).toLocaleDateString(
                            locale === "fr" ? "fr-CA" : "en-CA",
                            { dateStyle: "medium" }
                          )
                        : "—"}
                    </p>
                  </div>
                  {m.videoUrl && (
                    <a
                      href={m.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {locale === "fr" ? "Vidéo" : "Video"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {locale === "fr"
                ? "Données de calendrier à venir (calendrier-seances)."
                : "Calendar data coming soon (calendrier-seances)."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Elected officials directory */}
      <DataTable<OfficialRow>
        columns={[
          {
            key: "name",
            label: locale === "fr" ? "Nom" : "Name",
          },
          {
            key: "functionType",
            label: locale === "fr" ? "Fonction" : "Role",
          },
          {
            key: "boroughCode",
            label: locale === "fr" ? "Arrondissement" : "Borough",
            render: (r) =>
              r.boroughCode
                ? BOROUGHS[r.boroughCode as keyof typeof BOROUGHS]?.name ?? r.boroughCode
                : "—",
          },
          {
            key: "party",
            label: locale === "fr" ? "Parti" : "Party",
          },
          {
            key: "mandateStart",
            label: locale === "fr" ? "Mandat début" : "Mandate start",
            render: (r) =>
              r.mandateStart
                ? new Date(r.mandateStart).toLocaleDateString(
                    locale === "fr" ? "fr-CA" : "en-CA"
                  )
                : "—",
          },
        ]}
        data={officials}
        total={officials.length}
        page={1}
        pageSize={25}
        onPageChange={() => {}}
        searchPlaceholder={
          locale === "fr" ? "Filtrer par nom, parti…" : "Filter by name, party…"
        }
        filterOptions={{
          borough: Object.entries(BOROUGHS).map(([code, { name }]) => ({
            value: code,
            label: name,
          })),
          category: parties.map((p) => ({ value: p, label: p })),
        }}
        filterValues={{
          borough: boroughCode ?? "",
          category: partyFilter ?? "",
        }}
        onFilterChange={(k, v) => {
          if (k === "borough") updateParams({ borough: v || null, party: null });
          if (k === "category") updateParams({ party: v || null, borough: null });
        }}
        locale={locale}
      />

      {/* Placeholder sections for: compensation, election results, research expenses */}
      <Card className="border-dashed">
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>
            {locale === "fr"
              ? "Rémunération des élus, résultats électoraux (2013–2025), remboursements frais de recherche — pipelines à venir (remuneration-elus, depenses-des-elus, resultats-sommaires, remboursement-frais-recherches)."
              : "Officials compensation, election results (2013–2025), research expense reimbursements — pipelines coming (remuneration-elus, depenses-des-elus, resultats-sommaires, remboursement-frais-recherches)."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
