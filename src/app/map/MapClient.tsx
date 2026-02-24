"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { GeoJSON } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronUp,
  Layers,
  MapPin,
  X,
  AlertCircle,
  Construction,
  Phone,
  FileCheck,
  Flame,
  CircleDot,
  Gauge,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { formatDate as formatDateUtil } from "@/lib/utils/formatting";
import type { Locale } from "@/lib/locale";

const MONTREAL_CENTER: [number, number] = [45.5017, -73.5673];
const RADII = [100, 250, 500, 1000] as const;

const LAYER_CONFIG: Record<
  string,
  {
    color: string;
    labelFr: string;
    labelEn: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  crime: {
    color: "#DC2626",
    labelFr: "Criminalité",
    labelEn: "Crime",
    href: "/securite",
    icon: AlertCircle,
  },
  travaux: {
    color: "#FF6B35",
    labelFr: "Travaux",
    labelEn: "Construction",
    href: "/travaux",
    icon: Construction,
  },
  "311": {
    color: "#2563EB",
    labelFr: "Demandes 311",
    labelEn: "311 Requests",
    href: "/311",
    icon: Phone,
  },
  permits: {
    color: "#16A34A",
    labelFr: "Permis",
    labelEn: "Permits",
    href: "/permis",
    icon: FileCheck,
  },
  fire: {
    color: "#EAB308",
    labelFr: "Pompiers",
    labelEn: "Fire",
    href: "/pompiers",
    icon: Flame,
  },
  potholes: {
    color: "#92400E",
    labelFr: "Nids-de-poule",
    labelEn: "Potholes",
    href: "/nids-de-poule",
    icon: CircleDot,
  },
  obstructions: {
    color: "#7C3AED",
    labelFr: "Entraves",
    labelEn: "Obstructions",
    href: "/entraves",
    icon: Gauge,
  },
};

function createLayerIcon(color: string) {
  return L.divIcon({
    className: "layer-marker",
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

type GeoJSONFeature = {
  type: string;
  id?: string | number;
  geometry: { type: string; coordinates: number[] | number[][] | number[][][] };
  properties?: Record<string, unknown>;
};

type GeoJSONResponse = {
  type: string;
  features: GeoJSONFeature[];
};

// ─── Bbox hook for viewport-based fetching ───────────────────────────────────

function useMapBbox() {
  const [bbox, setBbox] = useState<{
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const updateBbox = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = map.getBounds();
    setBbox({
      minLat: bounds.getSouthWest().lat,
      maxLat: bounds.getNorthEast().lat,
      minLng: bounds.getSouthWest().lng,
      maxLng: bounds.getNorthEast().lng,
    });
  }, []);

  const setMapRef = useCallback((m: L.Map | null) => {
    mapRef.current = m;
    if (m) {
      m.on("moveend", updateBbox);
      updateBbox();
    }
  }, [updateBbox]);

  return { bbox, setMapRef, updateBbox };
}

// ─── Map ref setter component ───────────────────────────────────────────────

function MapRefSetter({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

// ─── Popup content renderer ─────────────────────────────────────────────────

function PopupContent({
  layer,
  props,
  locale,
}: {
  layer: string;
  props: Record<string, unknown>;
  locale: Locale;
}) {
  const cfg = LAYER_CONFIG[layer];
  const t = useTranslations("map");

  if (!cfg) return <p className="text-sm">—</p>;

  const content: React.ReactNode[] = [];
  if (layer === "crime") {
    content.push(
      <p key="cat" className="font-medium">{String(props.category ?? "—")}</p>,
      <p key="date">{formatDateUtil(props.incidentDate as string, locale)}</p>,
      props.shift ? (
        <p key="shift" className="text-muted-foreground">
          {t("shift")}: {String(props.shift)}
        </p>
      ) : null,
      <p key="caveat" className="mt-2 text-xs text-muted-foreground">
        {t("locationObfuscated")}
      </p>
    );
  } else if (layer === "travaux") {
    content.push(
      <p key="street" className="font-medium">{String(props.street ?? "—")}</p>,
      <p key="cat">{String(props.category ?? "—")}</p>,
      props.startDate ? (
        <p key="dates">
          {formatDateUtil(props.startDate as string, locale)} —{" "}
          {formatDateUtil(props.endDate as string, locale)}
        </p>
      ) : null
    );
  } else if (layer === "311") {
    content.push(
      <p key="nature" className="font-medium">{String(props.nature ?? "—")}</p>,
      props.requestType ? <p key="type">{String(props.requestType)}</p> : null,
      <p key="status">{String(props.status ?? "—")}</p>
    );
  } else if (layer === "permits") {
    content.push(
      <p key="num" className="font-medium">{String(props.permitNumber ?? "—")}</p>,
      <p key="type">{String(props.permitType ?? "—")}</p>,
      <p key="date">{formatDateUtil(props.dateIssued as string, locale)}</p>
    );
  } else if (layer === "fire") {
    content.push(
      <p key="type" className="font-medium">{String(props.incidentType ?? "—")}</p>,
      <p key="date">{formatDateUtil(props.incidentDate as string, locale)}</p>,
      props.numUnits != null ? (
        <p key="units">
          {String(props.numUnits)} {t("units")}
        </p>
      ) : null
    );
  } else if (layer === "potholes") {
    content.push(
      <p key="date" className="font-medium">
        {formatDateUtil(props.repairDate as string, locale)}
      </p>
    );
  } else if (layer === "obstructions") {
    content.push(
      <p key="street" className="font-medium">{String(props.street ?? "—")}</p>,
      props.obstructionType ? <p key="type">{String(props.obstructionType)}</p> : null
    );
  }

  return (
    <div className="min-w-[180px] space-y-1 text-sm">
      {content.filter(Boolean)}
      <Link
        href={cfg.href}
        className="mt-2 inline-block text-xs font-medium text-orange hover:underline"
      >
        {t("viewDashboard")} →
      </Link>
    </div>
  );
}

// ─── Main map client ────────────────────────────────────────────────────────

export default function MapClient({ locale }: { locale: Locale }) {
  const [layers, setLayers] = useState<Record<string, boolean>>({
    crime: true,
    travaux: true,
    "311": true,
    permits: true,
    fire: true,
    potholes: true,
    obstructions: true,
  });
  const [boroughsVisible, setBoroughsVisible] = useState(true);
  const [layerData, setLayerData] = useState<Record<string, GeoJSONFeature[]>>({});
  const [boroughsGeoJSON, setBoroughsGeoJSON] = useState<GeoJSONResponse | null>(null);
  const [nearby, setNearby] = useState<{
    lat: number;
    lng: number;
    radius: number;
    features: GeoJSONFeature[];
  } | null>(null);
  const [layerPanelOpen, setLayerPanelOpen] = useState(false);
  const [radiusIndex, setRadiusIndex] = useState(2); // 500m default
  const { bbox, setMapRef, updateBbox } = useMapBbox();
  const isFr = locale === "fr";

  // Fetch layer data when bbox or layers change
  useEffect(() => {
    if (!bbox) return;
    const params = new URLSearchParams({
      minLat: String(bbox.minLat),
      maxLat: String(bbox.maxLat),
      minLng: String(bbox.minLng),
      maxLng: String(bbox.maxLng),
      limit: "800",
    });
    const layersToFetch = Object.entries(layers).filter(([, v]) => v).map(([k]) => k);
    const fetchLayer = async (layer: string) => {
      try {
        const res = await fetch(`/api/map/${layer}?${params}`);
        if (!res.ok) return;
        const json = (await res.json()) as GeoJSONResponse;
        setLayerData((prev) => ({ ...prev, [layer]: json.features ?? [] }));
      } catch {
        // ignore
      }
    };
    layersToFetch.forEach(fetchLayer);
  }, [bbox, layers]);

  // Fetch borough boundaries once
  useEffect(() => {
    fetch("/api/map/boroughs")
      .then((r) => r.json())
      .then((json) => setBoroughsGeoJSON(json))
      .catch(() => {});
  }, []);

  const handleMapReady = useCallback(
    (map: L.Map) => {
      setMapRef(map);
    },
    [setMapRef]
  );

  const handleMapClick = useCallback(
    async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const radius = RADII[radiusIndex];
      try {
        const res = await fetch(
          `/api/map/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
        );
        if (!res.ok) return;
        const json = (await res.json()) as {
          features: GeoJSONFeature[];
          meta?: { center: number[]; radiusM: number };
        };
        setNearby({
          lat,
          lng,
          radius,
          features: json.features ?? [],
        });
      } catch {
        // ignore
      }
    },
    [radiusIndex]
  );

  const radiusM = RADII[radiusIndex];
  const radiusLabel = radiusM < 1000 ? `${radiusM}m` : `${radiusM / 1000}km`;

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={MONTREAL_CENTER}
        zoom={11}
        className="h-full w-full z-0"
        scrollWheelZoom
      >
        <MapRefSetter onMapReady={handleMapReady} />
        <ClickHandler onClick={handleMapClick} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Borough boundary overlay */}
        {boroughsVisible && boroughsGeoJSON?.features?.length && (
          <GeoJSON
            data={boroughsGeoJSON as GeoJsonObject}
            style={{
              color: "#1B365D",
              weight: 2,
              opacity: 0.6,
              fillColor: "transparent",
            }}
          />
        )}

        {/* Nearby search circle */}
        {nearby && (
          <Circle
            center={[nearby.lat, nearby.lng]}
            radius={nearby.radius}
            pathOptions={{
              color: "#FF6B35",
              fillColor: "#FF6B35",
              fillOpacity: 0.15,
              weight: 2,
            }}
          />
        )}

        {/* Layer markers */}
        {Object.entries(layerData).map(([layer, features]) => {
          if (!layers[layer] || !features?.length) return null;
          const cfg = LAYER_CONFIG[layer];
          const icon = cfg ? createLayerIcon(cfg.color) : createLayerIcon("#666");

          return (
            <MarkerClusterGroup key={layer} chunkedLoading>
              {features.map((f) => {
                const coords = f.geometry?.coordinates;
                if (!coords || !Array.isArray(coords) || coords.length < 2)
                  return null;
                const [lng, lat] = coords as [number, number];
                const props = (f.properties ?? {}) as Record<string, unknown>;

                return (
                  <Marker
                    key={`${layer}-${f.id ?? f.properties?.id ?? coords.join("-")}`}
                    position={[lat, lng]}
                    icon={icon}
                  >
                    <Popup>
                      <PopupContent
                        layer={layer}
                        props={props}
                        locale={locale}
                      />
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          );
        })}

        {/* Nearby search results */}
        {nearby?.features?.map((f, i) => {
          const coords = f.geometry?.coordinates;
          if (!coords || !Array.isArray(coords) || coords.length < 2) return null;
          const [lng, lat] = coords as [number, number];
          const layer = (f.properties?.layer as string) ?? "crime";
          const cfg = LAYER_CONFIG[layer];
          const icon = cfg ? createLayerIcon(cfg.color) : createLayerIcon("#666");

          return (
            <Marker
              key={`nearby-${i}`}
              position={[lat, lng]}
              icon={icon}
            >
              <Popup>
                <PopupContent
                  layer={layer}
                  props={(f.properties ?? {}) as Record<string, unknown>}
                  locale={locale}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Layer toggle panel — desktop: floating top-right */}
      <div className="absolute right-3 top-3 z-[1000] hidden sm:block">
        <div className="rounded-lg border bg-card/95 p-3 shadow-lg backdrop-blur">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {isFr ? "Calques" : "Layers"}
          </p>
          <div className="space-y-1.5">
            {Object.entries(LAYER_CONFIG).map(([key, cfg]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={!!layers[key]}
                  onChange={() =>
                    setLayers((p) => ({ ...p, [key]: !p[key] }))
                  }
                  className="rounded"
                />
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: cfg.color }}
                />
                <span>{isFr ? cfg.labelFr : cfg.labelEn}</span>
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={boroughsVisible}
                onChange={() => setBoroughsVisible((v) => !v)}
                className="rounded"
              />
              <span>{isFr ? "Limites arrondissements" : "Borough boundaries"}</span>
            </label>
          </div>

          <div className="mt-3 border-t pt-3">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              {isFr ? "Près de moi — rayon" : "Near me — radius"}
            </p>
            <div className="flex gap-1">
              {RADII.map((r, i) => (
                <button
                  key={r}
                  onClick={() => setRadiusIndex(i)}
                  className={`rounded px-2 py-1 text-xs ${
                    radiusIndex === i
                      ? "bg-orange text-white"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {r < 1000 ? `${r}m` : `${r / 1000}km`}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {isFr ? "Cliquez sur la carte" : "Click on map"}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: bottom sheet trigger */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000] sm:hidden">
        <Button
          variant="secondary"
          className="w-full gap-2 shadow-lg"
          onClick={() => setLayerPanelOpen((v) => !v)}
        >
          <Layers className="h-4 w-4" />
          {isFr ? "Calques et rayon" : "Layers & radius"}
          <ChevronUp
            className={`h-4 w-4 transition-transform ${layerPanelOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      {/* Mobile bottom sheet */}
      {layerPanelOpen && (
        <div className="absolute inset-x-0 bottom-0 z-[1001] sm:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setLayerPanelOpen(false)}
          />
          <div className="relative max-h-[60vh] overflow-y-auto rounded-t-xl border-t bg-card p-4 pb-8 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">
                {isFr ? "Calques" : "Layers"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLayerPanelOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {Object.entries(LAYER_CONFIG).map(([key, cfg]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-3"
                >
                  <input
                    type="checkbox"
                    checked={!!layers[key]}
                    onChange={() =>
                      setLayers((p) => ({ ...p, [key]: !p[key] }))
                    }
                    className="rounded"
                  />
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span>{isFr ? cfg.labelFr : cfg.labelEn}</span>
                </label>
              ))}
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3">
                <input
                  type="checkbox"
                  checked={boroughsVisible}
                  onChange={() => setBoroughsVisible((v) => !v)}
                  className="rounded"
                />
                <span>{isFr ? "Limites arrondissements" : "Borough boundaries"}</span>
              </label>
            </div>

            <div className="mt-4">
              <p className="mb-2 font-medium">
                {isFr ? "Près de moi — rayon" : "Near me — radius"}
              </p>
              <div className="flex gap-2">
                {RADII.map((r, i) => (
                  <button
                    key={r}
                    onClick={() => setRadiusIndex(i)}
                    className={`flex-1 rounded-lg py-2 text-sm ${
                      radiusIndex === i
                        ? "bg-orange text-white"
                        : "bg-muted"
                    }`}
                  >
                    {r < 1000 ? `${r}m` : `${r / 1000}km`}
                  </button>
                ))}
              </div>
              <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {isFr
                  ? `Appuyez sur la carte (rayon ${radiusLabel})`
                  : `Tap on map (${radiusLabel} radius)`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nearby results summary */}
      {nearby && nearby.features.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-[999] sm:left-auto sm:right-3 sm:top-48 sm:bottom-auto sm:max-w-[260px]">
          <div className="rounded-lg border bg-card/95 p-3 shadow-lg backdrop-blur">
            <p className="font-medium">
              {isFr ? "Près de ce point" : "Near this point"} ({radiusLabel})
            </p>
            <p className="text-sm text-muted-foreground">
              {nearby.features.length} {isFr ? "résultats" : "results"}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setNearby(null)}
            >
              <X className="mr-1 h-3 w-3" />
              {isFr ? "Fermer" : "Close"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ClickHandler({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({ click: onClick });
  return null;
}
