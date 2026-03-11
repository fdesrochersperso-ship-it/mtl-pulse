import { getCategories } from '@/lib/report-builder/config';
import { CategoryGrid } from '@/components/report-builder/CategoryGrid';
import { getLocale } from '@/lib/locale';

export const metadata = {
  title: 'Explorer les données — MTL Pulse',
  description: 'Explorez 253 jeux de données ouverts de Montréal avec le constructeur de rapports.',
};

export default async function ExplorePage() {
  const categories = getCategories();
  const locale = await getLocale();

  const totalDatasets = categories.reduce((sum, c) => sum + c.usable_count, 0);
  const isFr = locale === 'fr';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--navy)]">
          {isFr ? 'Explorer les données ouvertes' : 'Explore Open Data'}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {isFr
            ? `${totalDatasets} jeux de données de Montréal prêts à explorer.`
            : `${totalDatasets} Montreal datasets ready to explore.`}
        </p>
      </div>

      <CategoryGrid categories={categories} locale={locale} />
    </div>
  );
}
