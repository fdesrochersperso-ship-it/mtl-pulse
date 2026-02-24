"use client";

import { useMemo, useEffect, useState } from "react";
import { BOROUGH_CENTROIDS } from "@/lib/constants/boroughs";
import { cn } from "@/lib/utils";

interface GeoFeature {
  type?: string;
  properties?: { code?: string };
  geometry?: { type?: string; coordinates?: unknown };
}

export interface BoroughMiniMapProps {
  highlightedCode: string | null;
  boroughsGeoJSON: { type?: string; features: GeoFeature[] } | null;
  className?: string;
}

/** Simple SVG map showing Montreal boroughs with one highlighted. */
export function BoroughMiniMap({
  highlightedCode,
  boroughsGeoJSON,
  className,
}: BoroughMiniMapProps) {
  const [bounds, setBounds] = useState<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null>(null);

  const centroid = highlightedCode
    ? BOROUGH_CENTROIDS[highlightedCode]
    : null;

  useEffect(() => {
    if (!boroughsGeoJSON?.features?.length) return;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const extractCoords = (coords: unknown) => {
      if (!Array.isArray(coords)) return;
      for (const ring of coords as unknown[]) {
        if (!Array.isArray(ring)) continue;
        for (const pt of ring as unknown[]) {
          if (Array.isArray(pt) && pt.length >= 2) {
            const lng = Number(pt[0]);
            const lat = Number(pt[1]);
            if (!Number.isNaN(lng) && !Number.isNaN(lat)) {
              minX = Math.min(minX, lng);
              maxX = Math.max(maxX, lng);
              minY = Math.min(minY, lat);
              maxY = Math.max(maxY, lat);
            }
          }
        }
      }
    };
    for (const f of boroughsGeoJSON.features) {
      const geom = f.geometry as { type?: string; coordinates?: unknown } | undefined;
      if (!geom?.coordinates) continue;
      if (geom.type === "Polygon") {
        extractCoords(geom.coordinates);
      } else if (geom.type === "MultiPolygon" && Array.isArray(geom.coordinates)) {
        for (const poly of geom.coordinates) extractCoords(poly);
      }
    }
    if (minX !== Infinity) {
      setBounds({ minX, maxX, minY, maxY });
    }
  }, [boroughsGeoJSON]);

  if (!boroughsGeoJSON?.features?.length) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border bg-muted/30 ${className ?? ""}`}
      >
        <span className="text-xs text-muted-foreground">
          Carte non disponible
        </span>
      </div>
    );
  }

  const b = bounds ?? {
    minX: -73.95,
    maxX: -73.45,
    minY: 45.42,
    maxY: 45.65,
  };
  const lngToX = (lng: number) => {
    const w = b.maxX - b.minX;
    return w > 0 ? ((lng - b.minX) / w) * 200 : 0;
  };
  const latToY = (lat: number) => {
    const h = b.maxY - b.minY;
    return h > 0 ? 200 - ((lat - b.minY) / h) * 200 : 0;
  };

  const paths: { d: string; code: string }[] = [];
  for (const f of boroughsGeoJSON.features) {
    const props = f.properties as { code?: string } | undefined;
    const code = props?.code ?? "";
    const geom = f.geometry as
      | { type?: string; coordinates?: number[][][] | number[][][][] }
      | undefined;
    if (!geom?.coordinates || !Array.isArray(geom.coordinates)) continue;
    let rings: number[][][] = [];
    if (geom.type === "Polygon") {
      rings = geom.coordinates as number[][][];
    } else if (geom.type === "MultiPolygon") {
      rings = (geom.coordinates as number[][][][]).flat();
    }
    for (const ring of rings) {
      const d =
        ring
          .map(([lng, lat], i) =>
            i === 0 ? `M ${lngToX(lng)} ${latToY(lat)}` : `L ${lngToX(lng)} ${latToY(lat)}`
          )
          .join(" ") + " Z";
      paths.push({ d, code });
      break;
    }
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border", className)}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {paths.map(({ d, code }) => {
          const isHighlighted = code === highlightedCode;
          return (
            <path
              key={code}
              d={d}
              fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--muted))"}
              stroke="hsl(var(--border))"
              strokeWidth={0.5}
              opacity={isHighlighted ? 0.9 : 0.4}
            />
          );
        })}
      </svg>
    </div>
  );
}
