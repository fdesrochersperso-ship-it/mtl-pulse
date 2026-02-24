import { MapPageClient } from './MapPageClient';
import { getLocale } from '@/lib/locale';

/** Dynamic: map loads client-side layers and viewport-dependent API calls. */
export const dynamic = 'force-dynamic';

export default async function MapPage() {
  const locale = await getLocale();

  return (
    <div className="relative h-[calc(100vh-4.5rem)] min-h-[400px] w-full overflow-hidden sm:rounded-lg">
      <MapPageClient locale={locale} />
    </div>
  );
}
