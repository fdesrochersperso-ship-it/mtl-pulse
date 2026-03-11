'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { SemanticDataset } from '@/lib/report-builder/types';

const GRADE_LABELS: Record<string, string> = {
  A: 'Excellent',
  B: 'Good',
  C: 'Usable',
};

interface ReportHeaderProps {
  dataset: SemanticDataset;
  locale: string;
}

export function ReportHeader({ dataset, locale }: ReportHeaderProps) {
  const [showMethodology, setShowMethodology] = useState(false);
  const isFr = locale === 'fr';
  const warnings = isFr ? dataset.warnings_fr : dataset.warnings_en;

  return (
    <div className="space-y-3">
      {/* Title row */}
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-[var(--navy)] sm:text-2xl">
            {isFr ? dataset.title_fr : dataset.title_en}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {(isFr ? dataset.description_fr : dataset.description_en).slice(0, 300)}
          </p>
        </div>
        <Badge
          variant={dataset.data_quality_score === 'C' ? 'warning' : 'success'}
          className="shrink-0 text-sm"
        >
          {dataset.data_quality_score} - {GRADE_LABELS[dataset.data_quality_score]}
        </Badge>
      </div>

      {/* Metadata strip */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
        <span>{dataset.total_records.toLocaleString(isFr ? 'fr-CA' : 'en-CA')} {isFr ? 'enregistrements' : 'records'}</span>
        <span>{dataset.update_frequency}</span>
        {dataset.temporal_range && (
          <span>
            {dataset.temporal_range.min.slice(0, 10)} → {dataset.temporal_range.max.slice(0, 10)}
            {dataset.temporal_range_note && (
              <span className="ml-1 italic">({dataset.temporal_range_note})</span>
            )}
          </span>
        )}
        <span>{dataset.publisher}</span>
        <a
          href={`https://donnees.montreal.ca/dataset/${dataset.slug.replace('vmtl-', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--navy)] hover:underline"
        >
          {isFr ? 'Source' : 'Source'} ↗
        </a>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <div className="font-medium mb-1">{isFr ? 'Avertissements' : 'Warnings'}</div>
          <ul className="list-disc pl-4 space-y-0.5">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Methodology toggle */}
      {dataset.methodology_fr && (
        <div>
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="text-xs text-[var(--navy)] hover:underline"
          >
            {showMethodology
              ? (isFr ? '▾ Masquer la méthodologie' : '▾ Hide methodology')
              : (isFr ? '▸ Voir la méthodologie' : '▸ View methodology')}
          </button>
          {showMethodology && (
            <div className="mt-2 max-h-60 overflow-y-auto rounded-md border bg-muted p-3 text-xs whitespace-pre-wrap">
              {dataset.methodology_fr}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
