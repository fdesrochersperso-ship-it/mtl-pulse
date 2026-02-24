"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BOROUGH_CENTROIDS } from "@/lib/constants/boroughs";
import { cn } from "@/lib/utils";

export interface CrimeMapMarker {
  id: number;
  externalId: string | null;
  category: string;
  incidentDate: string;
  shift: string | null;
  lat: number | null;
  lng: number | null;
}

export interface CrimeMapProps {
  markers: CrimeMapMarker[];
  locale?: "fr" | "en";
  className?: string;
}

const MONTREAL_CENTER: [number, number] = [45.5017, -73.5673];

function getMarkerPosition(m: CrimeMapMarker): [number, number] | null {
  if (m.lat != null && m.lng != null && Number.isFinite(m.lat) && Number.isFinite(m.lng)) {
    return [m.lat, m.lng];
  }
  return null;
}

const MapContent = dynamic(
  () => import("./CrimeMapClient").then((mod) => mod.CrimeMapClient),
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

export function CrimeMap({
  markers,
  locale = "fr",
  className,
}: CrimeMapProps) {
  const points = useMemo(() => {
    return markers
      .map((m) => {
        const position = getMarkerPosition(m);
        if (!position) return null;
        return { ...m, position };
      })
      .filter((p): p is NonNullable<typeof p> => p != null);
  }, [markers]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {locale === "fr" ? "Carte des incidents" : "Crime incident map"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {locale === "fr"
            ? "Les emplacements sont obfusqués à l’intersection la plus proche pour protéger la vie privée."
            : "Locations are obfuscated to the nearest intersection for privacy."}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContent points={points} locale={locale} />
        </div>
      </CardContent>
    </Card>
  );
}
