"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BOROUGHS } from "@/lib/constants/boroughs";

export interface PermitsInConstructionZonesRow {
  permitId: number;
  permitNumber: string | null;
  boroughCode: string | null;
  dateIssued: string;
  obstructionCount: number;
}

export interface PermitsInConstructionZonesProps {
  data: PermitsInConstructionZonesRow[];
  locale?: "fr" | "en";
  className?: string;
}

export function PermitsInConstructionZones({
  data,
  locale = "fr",
  className,
}: PermitsInConstructionZonesProps) {
  const title =
    locale === "fr"
      ? "Permis dans des zones avec entraves"
      : "Permits in areas with obstructions";
  const subtitle =
    locale === "fr"
      ? "Question de coordination : la Ville planifie-t-elle à l'avance?"
      : "Coordination question: is the city planning ahead?";

  if (data.length === 0) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {locale === "fr"
              ? "Aucun permis trouvé dans des zones avec entraves actives."
              : "No permits found in areas with active obstructions."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium">
                  {locale === "fr" ? "Permis" : "Permit"}
                </th>
                <th className="py-2 text-left font-medium">
                  {locale === "fr" ? "Arrondissement" : "Borough"}
                </th>
                <th className="py-2 text-left font-medium">
                  {locale === "fr" ? "Date" : "Date"}
                </th>
                <th className="py-2 text-right font-medium">
                  {locale === "fr" ? "Entraves à 500 m" : "Obstructions within 500m"}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.permitId} className="border-b last:border-0">
                  <td className="py-2">{row.permitNumber ?? row.permitId}</td>
                  <td className="py-2">
                    {row.boroughCode
                      ? BOROUGHS[row.boroughCode as keyof typeof BOROUGHS]?.name ?? row.boroughCode
                      : "—"}
                  </td>
                  <td className="py-2">{row.dateIssued}</td>
                  <td className="py-2 text-right font-medium">{row.obstructionCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
