"use client";

import dynamic from 'next/dynamic';
import type { Locale } from '@/lib/locale';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center bg-muted/30">
      <span className="text-sm text-muted-foreground">
        Chargement de la carte…
      </span>
    </div>
  ),
});

export function MapPageClient({ locale }: { locale: Locale }) {
  return <MapClient locale={locale} />;
}
