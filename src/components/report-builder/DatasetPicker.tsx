'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { SemanticDataset } from '@/lib/report-builder/types';

const GRADE_COLORS: Record<string, 'success' | 'warning' | 'secondary'> = {
  A: 'success',
  B: 'success',
  C: 'warning',
};

const FREQ_LABELS: Record<string, { fr: string; en: string }> = {
  daily: { fr: 'Quotidien', en: 'Daily' },
  weekly: { fr: 'Hebdomadaire', en: 'Weekly' },
  monthly: { fr: 'Mensuel', en: 'Monthly' },
  annual: { fr: 'Annuel', en: 'Annual' },
  quarterly: { fr: 'Trimestriel', en: 'Quarterly' },
  irregular: { fr: 'Irrégulier', en: 'Irregular' },
  asNeeded: { fr: 'Au besoin', en: 'As needed' },
};

type SortKey = 'quality' | 'records' | 'name';

interface DatasetPickerProps {
  datasets: SemanticDataset[];
  categorySlug: string;
  locale: string;
}

export function DatasetPicker({ datasets, categorySlug, locale }: DatasetPickerProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('quality');
  const isFr = locale === 'fr';

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = datasets;

    if (q) {
      list = list.filter(
        (ds) =>
          ds.title_fr.toLowerCase().includes(q) ||
          ds.title_en.toLowerCase().includes(q) ||
          ds.slug.includes(q),
      );
    }

    const gradeOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, F: 4 };
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'quality':
          return (gradeOrder[a.data_quality_score] ?? 5) - (gradeOrder[b.data_quality_score] ?? 5);
        case 'records':
          return b.total_records - a.total_records;
        case 'name':
          return (isFr ? a.title_fr : a.title_en).localeCompare(
            isFr ? b.title_fr : b.title_en,
            isFr ? 'fr' : 'en',
          );
        default:
          return 0;
      }
    });
  }, [datasets, search, sortBy, isFr]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isFr ? 'Rechercher un jeu de données...' : 'Search datasets...'}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
        />
        <div className="flex gap-1 text-xs">
          {(['quality', 'records', 'name'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                sortBy === key
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {key === 'quality'
                ? isFr ? 'Qualité' : 'Quality'
                : key === 'records'
                  ? isFr ? 'Données' : 'Records'
                  : isFr ? 'Nom' : 'Name'}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset list */}
      <div className="space-y-2">
        {filtered.map((ds) => {
          const freq = FREQ_LABELS[ds.update_frequency];
          return (
            <Link
              key={ds.slug}
              href={`/explore/${categorySlug}/${ds.slug}`}
              className="group flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-[var(--navy)]"
            >
              <Badge variant={GRADE_COLORS[ds.data_quality_score] ?? 'secondary'}>
                {ds.data_quality_score}
              </Badge>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-[var(--navy)] group-hover:underline truncate">
                  {isFr ? ds.title_fr : ds.title_en}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                  {(isFr ? ds.description_fr : ds.description_en).slice(0, 150)}
                </p>
              </div>
              <div className="hidden shrink-0 text-right text-xs text-muted-foreground sm:block">
                <div>{ds.total_records.toLocaleString(isFr ? 'fr-CA' : 'en-CA')} {isFr ? 'enregistrements' : 'records'}</div>
                <div>{freq ? (isFr ? freq.fr : freq.en) : ds.update_frequency}</div>
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            {isFr ? 'Aucun résultat.' : 'No results.'}
          </div>
        )}
      </div>
    </div>
  );
}
