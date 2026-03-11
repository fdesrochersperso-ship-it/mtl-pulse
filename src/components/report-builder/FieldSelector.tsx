'use client';

import { Badge } from '@/components/ui/badge';
import type { SemanticField, AggregationType } from '@/lib/report-builder/types';

const QUALITY_DOT: Record<string, string> = {
  good: 'bg-emerald-500',
  usable: 'bg-amber-500',
  poor: 'bg-red-500',
  empty: 'bg-gray-400',
};

const TYPE_ICON: Record<string, string> = {
  category: 'Abc',
  text: 'Txt',
  numeric: '#',
  date: '📅',
  geo_latitude: '🌐',
  geo_longitude: '🌐',
  identifier: 'ID',
};

interface FieldSelectorProps {
  dimensions: SemanticField[];
  measures: SemanticField[];
  dateFields: SemanticField[];
  filterFields: SemanticField[];
  selectedDimensions: string[];
  selectedMeasures: string[];
  selectedDateField: string | null;
  aggregation: AggregationType;
  onToggleDimension: (rawName: string) => void;
  onToggleMeasure: (rawName: string) => void;
  onSelectDateField: (rawName: string | null) => void;
  onChangeAggregation: (agg: AggregationType) => void;
  locale: string;
}

function FieldChip({
  field,
  selected,
  onClick,
  locale,
}: {
  field: SemanticField;
  selected: boolean;
  onClick: () => void;
  locale: string;
}) {
  const isFr = locale === 'fr';
  const name = isFr ? field.clean_name_fr : field.clean_name_en;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-all ${
        selected
          ? 'border-[var(--navy)] bg-[var(--navy)] text-white shadow-sm'
          : 'border-border bg-card hover:border-[var(--navy)] hover:bg-muted'
      }`}
      title={`${field.raw_name} (${field.type}, ${Math.round(field.null_pct)}% null)`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${QUALITY_DOT[field.quality]}`} />
      <span className="font-mono text-[10px] opacity-60">
        {TYPE_ICON[field.type] ?? '?'}
      </span>
      <span className="max-w-[140px] truncate">{name}</span>
    </button>
  );
}

export function FieldSelector({
  dimensions,
  measures,
  dateFields,
  filterFields,
  selectedDimensions,
  selectedMeasures,
  selectedDateField,
  aggregation,
  onToggleDimension,
  onToggleMeasure,
  onSelectDateField,
  onChangeAggregation,
  locale,
}: FieldSelectorProps) {
  const isFr = locale === 'fr';

  const sections = [
    {
      label: isFr ? 'Dimensions (regroupement)' : 'Dimensions (group by)',
      fields: dimensions,
      selected: selectedDimensions,
      onToggle: onToggleDimension,
      maxHint: '3 max',
    },
    {
      label: isFr ? 'Mesures (agrégation)' : 'Measures (aggregation)',
      fields: measures,
      selected: selectedMeasures,
      onToggle: onToggleMeasure,
      maxHint: '',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Date field selector */}
      {dateFields.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isFr ? 'Axe temporel' : 'Date axis'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {dateFields.map((f) => (
              <FieldChip
                key={f.raw_name}
                field={f}
                selected={selectedDateField === f.raw_name}
                onClick={() =>
                  onSelectDateField(
                    selectedDateField === f.raw_name ? null : f.raw_name,
                  )
                }
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dimension and Measure sections */}
      {sections.map((section) => (
        <div key={section.label}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.label}
            </span>
            {section.maxHint && (
              <span className="text-[10px] text-muted-foreground">({section.maxHint})</span>
            )}
          </div>
          {section.fields.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {section.fields.map((f) => (
                <FieldChip
                  key={f.raw_name}
                  field={f}
                  selected={section.selected.includes(f.raw_name)}
                  onClick={() => section.onToggle(f.raw_name)}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              {isFr ? 'Aucun champ disponible' : 'No fields available'}
            </p>
          )}
        </div>
      ))}

      {/* Aggregation selector (only when measures selected) */}
      {selectedMeasures.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isFr ? 'Type d\'agrégation' : 'Aggregation type'}
          </div>
          <div className="flex gap-1">
            {(['sum', 'avg', 'count', 'min', 'max'] as const).map((agg) => (
              <button
                key={agg}
                onClick={() => onChangeAggregation(agg)}
                className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${
                  aggregation === agg
                    ? 'bg-[var(--navy)] text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {agg.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter fields (display only, for awareness) */}
      {filterFields.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isFr ? 'Filtres disponibles' : 'Available filters'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterFields.map((f) => (
              <Badge key={f.raw_name} variant="outline" className="text-xs font-normal">
                {isFr ? f.clean_name_fr : f.clean_name_en}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Selection summary */}
      <div className="rounded-md bg-muted p-2 text-xs text-muted-foreground">
        {selectedDimensions.length === 0 && !selectedDateField && selectedMeasures.length === 0
          ? (isFr
              ? 'Sélectionnez des champs ci-dessus pour construire votre rapport. Par défaut: COUNT(*) sur toutes les données.'
              : 'Select fields above to build your report. Default: COUNT(*) over all data.')
          : (isFr
              ? `Rapport: ${selectedDimensions.length > 0 ? `groupé par ${selectedDimensions.length} dimension(s)` : ''}${selectedDateField ? (selectedDimensions.length > 0 ? ' + ' : '') + 'axe temporel' : ''}${selectedMeasures.length > 0 ? ` → ${aggregation.toUpperCase()}(${selectedMeasures.length} mesure(s))` : ' → COUNT(*)'}`
              : `Report: ${selectedDimensions.length > 0 ? `grouped by ${selectedDimensions.length} dimension(s)` : ''}${selectedDateField ? (selectedDimensions.length > 0 ? ' + ' : '') + 'date axis' : ''}${selectedMeasures.length > 0 ? ` → ${aggregation.toUpperCase()}(${selectedMeasures.length} measure(s))` : ' → COUNT(*)'}`)}
      </div>
    </div>
  );
}
