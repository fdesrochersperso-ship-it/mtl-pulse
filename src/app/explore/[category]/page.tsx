import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategory, getDatasetsByCategory } from '@/lib/report-builder/config';
import { DatasetPicker } from '@/components/report-builder/DatasetPicker';
import { getLocale } from '@/lib/locale';

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategory(category);

  if (!cat) {
    notFound();
  }

  const datasets = getDatasetsByCategory(category);
  const locale = await getLocale();
  const isFr = locale === 'fr';

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link href="/explore" className="hover:text-[var(--navy)] hover:underline">
          {isFr ? 'Explorer' : 'Explore'}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">
          {isFr ? cat.name_fr : cat.name_en}
        </span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold text-[var(--navy)]">
          {isFr ? cat.name_fr : cat.name_en}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {datasets.length} {isFr ? 'jeux de données disponibles' : 'datasets available'}
        </p>
      </div>

      <DatasetPicker
        datasets={datasets}
        categorySlug={category}
        locale={locale}
      />
    </div>
  );
}
