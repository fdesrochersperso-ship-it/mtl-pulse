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

export interface MapPoint {
  id: number;
  externalId: string;
  boroughCode: string | null;
  category: string | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
  street: string | null;
  organizationName: string | null;
  position: [number, number];
}

export interface TravauxMapClientProps {
  points: MapPoint[];
  locale: "fr" | "en";
}

function formatDate(s: string | null): string {
  if (!s) return "—";
  const d = new Date(s);
  return d.toLocaleDateString("fr-CA", { dateStyle: "medium" });
}

export function TravauxMapClient({ points, locale }: TravauxMapClientProps) {
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
              <div className="min-w-[200px] space-y-1 text-sm">
                <p className="font-semibold">{p.externalId}</p>
                {p.street && <p>{p.street}</p>}
                {p.organizationName && (
                  <p className="text-muted-foreground">{p.organizationName}</p>
                )}
                {p.category && (
                  <p>
                    {isFr ? "Catégorie" : "Category"}: {p.category}
                  </p>
                )}
                {p.status && (
                  <p>
                    {isFr ? "Statut" : "Status"}: {p.status}
                  </p>
                )}
                <p>
                  {isFr ? "Début" : "Start"}: {formatDate(p.startDate)}
                </p>
                <p>
                  {isFr ? "Fin" : "End"}: {formatDate(p.endDate)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
