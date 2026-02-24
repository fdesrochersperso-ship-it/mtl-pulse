"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BOROUGH_CENTROIDS } from "@/lib/constants/boroughs";
import { cn } from "@/lib/utils";

export interface TravauxMapMarker {
  id: number;
  externalId: string;
  boroughCode: string | null;
  category: string | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
  street: string | null;
  organizationName: string | null;
  lat: number | null;
  lng: number | null;
}

export interface TravauxMapProps {
  markers: TravauxMapMarker[];
  locale?: "fr" | "en";
  className?: string;
}

const MONTREAL_CENTER: [number, number] = [45.5017, -73.5673];
const DEFAULT_ZOOM = 11;

function getMarkerPosition(m: TravauxMapMarker): [number, number] {
  if (m.lat != null && m.lng != null && Number.isFinite(m.lat) && Number.isFinite(m.lng)) {
    return [m.lat, m.lng];
  }
  if (m.boroughCode && BOROUGH_CENTROIDS[m.boroughCode]) {
    return BOROUGH_CENTROIDS[m.boroughCode];
  }
  return MONTREAL_CENTER; // fallback
}

const MapContent = dynamic(
  () => import("./TravauxMapClient").then((mod) => mod.TravauxMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center bg-muted/30">
        <span className="text-sm text-muted-foreground">
          Chargement de la carte…
        </span>
      </div>
    ),
  }
);

export function TravauxMap({
  markers,
  locale = "fr",
  className,
}: TravauxMapProps) {
  const points = useMemo(() => {
    return markers.map((m) => ({
      ...m,
      position: getMarkerPosition(m),
    }));
  }, [markers]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {locale === "fr" ? "Carte des chantiers actifs" : "Active construction map"}
        </h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContent points={points} locale={locale} />
        </div>
      </CardContent>
    </Card>
  );
}
