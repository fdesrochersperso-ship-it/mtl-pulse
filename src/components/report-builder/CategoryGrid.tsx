import Link from 'next/link';
import type { SemanticCategory } from '@/lib/report-builder/types';

const CATEGORY_ICONS: Record<string, string> = {
  'agriculture-alimentation': '🌱',
  'economie-entreprises': '💼',
  'education-recherche': '🎓',
  'environnement-ressources-naturelles-energie': '🌿',
  'gouvernement-finances': '🏛️',
  'infrastructures': '🏗️',
  'loi-justice-securite-publique': '⚖️',
  'politiques-sociales': '🤝',
  'sante': '🏥',
  'societe-culture': '🎭',
  'tourisme-sports-loisirs': '⚽',
  'transport': '🚇',
  'uncategorized': '📊',
};

interface CategoryGridProps {
  categories: SemanticCategory[];
  locale: string;
}

export function CategoryGrid({ categories, locale }: CategoryGridProps) {
  const isFr = locale === 'fr';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/explore/${cat.slug}`}
          className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-[var(--navy)]"
        >
          <div className="mb-3 text-3xl">
            {CATEGORY_ICONS[cat.slug] ?? '📋'}
          </div>
          <h3 className="text-lg font-semibold text-[var(--navy)] group-hover:underline">
            {isFr ? cat.name_fr : cat.name_en}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {cat.usable_count} {isFr ? 'jeux de données' : 'datasets'}
          </p>
        </Link>
      ))}
    </div>
  );
}
