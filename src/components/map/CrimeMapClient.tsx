"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface CrimeMapPoint {
  id: number;
  externalId: string | null;
  category: string;
  incidentDate: string;
  shift: string | null;
  position: [number, number];
}

export interface CrimeMapClientProps {
  points: CrimeMapPoint[];
  locale: "fr" | "en";
}

function formatDate(s: string): string {
  const d = new Date(s);
  return d.toLocaleDateString("fr-CA", { dateStyle: "medium" });
}

export function CrimeMapClient({ points, locale }: CrimeMapClientProps) {
  const isFr = locale === "fr";

  return (
    <MapContainer
      center={[45.5017, -73.5673]}
      zoom={11}
      className="h-full w-full z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {points.map((p) => (
          <Marker key={p.id} position={p.position} icon={defaultIcon}>
            <Popup>
              <div className="min-w-[180px] space-y-1 text-sm">
                <p className="font-semibold">{p.category}</p>
                <p>
                  {isFr ? "Date" : "Date"}: {formatDate(p.incidentDate)}
                </p>
                {p.shift && (
                  <p>
                    {isFr ? "Quart" : "Shift"}: {p.shift}
                  </p>
                )}
                <p className="text-muted-foreground text-xs mt-2">
                  {isFr
                    ? "Emplacement obfusqué (intersection)"
                    : "Location obfuscated (intersection)"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
