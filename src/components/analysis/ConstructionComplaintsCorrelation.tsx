"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ConstructionComplaintsCorrelationProps {
  data: {
    nearComplaints: number;
    farComplaints: number;
    nearSitesCount: number;
    pctMoreNear: number | null;
    message: string;
  };
  locale?: "fr" | "en";
  className?: string;
}

export function ConstructionComplaintsCorrelation({
  data,
  locale = "fr",
  className,
}: ConstructionComplaintsCorrelationProps) {
  const title = locale === "fr" ? "Chantiers et plaintes 311" : "Construction & 311 Complaints";
  const subtitle =
    locale === "fr"
      ? "Plaintes 311 liées aux travaux dans un rayon de 500 m des chantiers actifs"
      : "Construction-related 311 requests within 500m of active sites";

  const highlight =
    data.pctMoreNear != null && data.pctMoreNear > 0 ? (
      <p className="mt-3 rounded-lg bg-primary/10 p-4 text-lg font-semibold text-primary">
        {locale === "fr"
          ? `Les chantiers actifs génèrent environ ${data.pctMoreNear}% plus de plaintes dans les blocs environnants.`
          : `Active construction sites generate approximately ${data.pctMoreNear}% more complaints in surrounding blocks.`}
      </p>
    ) : (
      <p className="mt-3 text-muted-foreground">{data.message}</p>
    );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs font-medium text-muted-foreground">
              {locale === "fr" ? "Plaintes près des chantiers" : "Complaints near sites"}
            </p>
            <p className="mt-1 text-2xl font-bold">{data.nearComplaints.toLocaleString("fr-CA")}</p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs font-medium text-muted-foreground">
              {locale === "fr" ? "Plaintes ailleurs" : "Complaints elsewhere"}
            </p>
            <p className="mt-1 text-2xl font-bold">{data.farComplaints.toLocaleString("fr-CA")}</p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-3 sm:col-span-2 sm:col-start-2">
            <p className="text-xs font-medium text-muted-foreground">
              {locale === "fr" ? "Chantiers actifs" : "Active construction sites"}
            </p>
            <p className="mt-1 text-2xl font-bold">{data.nearSitesCount.toLocaleString("fr-CA")}</p>
          </div>
        </div>
        {highlight}
      </CardContent>
    </Card>
  );
}
