import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDataset, getCategory } from '@/lib/report-builder/config';
import { getLocale } from '@/lib/locale';
import { ReportBuilderClient } from './ReportBuilderClient';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function ReportBuilderPage({ params }: PageProps) {
  const { category, slug } = await params;
  const dataset = getDataset(slug);
  const cat = getCategory(category);

  if (!dataset || !cat) {
    notFound();
  }

  const locale = await getLocale();
  const isFr = locale === 'fr';

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link href="/explore" className="hover:text-[var(--navy)] hover:underline">
          {isFr ? 'Explorer' : 'Explore'}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/explore/${category}`}
          className="hover:text-[var(--navy)] hover:underline"
        >
          {isFr ? cat.name_fr : cat.name_en}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">
          {isFr ? dataset.title_fr : dataset.title_en}
        </span>
      </nav>

      <ReportBuilderClient dataset={dataset} locale={locale} />
    </div>
  );
}
