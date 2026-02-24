"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PointMapItem {
  id: number;
  position: [number, number];
  label?: string;
  tooltip: React.ReactNode;
}

export interface PointMapProps {
  points: PointMapItem[];
  title: string;
  caveat?: string;
  locale?: "fr" | "en";
  className?: string;
}

const PointMapClient = dynamic(
  () => import("./PointMapClient").then((mod) => mod.PointMapClient),
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

export function PointMap({
  points,
  title,
  caveat,
  locale = "fr",
  className,
}: PointMapProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        {caveat && (
          <p className="text-sm text-muted-foreground">{caveat}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <PointMapClient points={points} locale={locale} />
        </div>
      </CardContent>
    </Card>
  );
}
