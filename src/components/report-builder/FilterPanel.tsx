'use client';

import type { SemanticField, ReportFilter } from '@/lib/report-builder/types';

interface FilterPanelProps {
  filterFields: SemanticField[];
  dimensionFields: SemanticField[];
  activeFilters: ReportFilter[];
  dateField: string | null;
  dateRange: { from: string; to: string } | undefined;
  onUpdateFilters: (filters: ReportFilter[]) => void;
  onUpdateDateRange: (range: { from: string; to: string } | undefined) => void;
  locale: string;
}

export function FilterPanel({
  filterFields,
  dimensionFields,
  activeFilters,
  dateField,
  dateRange,
  onUpdateFilters,
  onUpdateDateRange,
  locale,
}: FilterPanelProps) {
  const isFr = locale === 'fr';

  // All filterable fields = filter role + selected dimensions with top_values
  const allFilterable = [
    ...dimensionFields.filter((f) => f.top_values && f.top_values.length > 0),
    ...filterFields.filter((f) => f.top_values && f.top_values.length > 0),
  ];

  function addFilter() {
    if (allFilterable.length === 0) return;
    const first = allFilterable[0]!;
    onUpdateFilters([
      ...activeFilters,
      { field: first.raw_name, operator: 'eq', value: '' },
    ]);
  }

  function updateFilter(index: number, updates: Partial<ReportFilter>) {
    const newFilters = activeFilters.map((f, i) =>
      i === index ? { ...f, ...updates } : f,
    );
    onUpdateFilters(newFilters);
  }

  function removeFilter(index: number) {
    onUpdateFilters(activeFilters.filter((_, i) => i !== index));
  }

  // Find the semantic field for a raw_name
  function findField(rawName: string): SemanticField | undefined {
    return allFilterable.find((f) => f.raw_name === rawName);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isFr ? 'Filtres' : 'Filters'}
        </span>
        <button
          onClick={addFilter}
          disabled={allFilterable.length === 0}
          className="rounded-md bg-secondary px-2 py-0.5 text-xs hover:bg-muted disabled:opacity-50"
        >
          + {isFr ? 'Ajouter' : 'Add'}
        </button>
      </div>

      {/* Date range filter */}
      {dateField && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">{isFr ? 'Période:' : 'Period:'}</span>
          <input
            type="date"
            value={dateRange?.from ?? ''}
            onChange={(e) =>
              onUpdateDateRange({ from: e.target.value, to: dateRange?.to ?? '' })
            }
            className="rounded-md border bg-background px-2 py-1 text-xs"
          />
          <span className="text-muted-foreground">→</span>
          <input
            type="date"
            value={dateRange?.to ?? ''}
            onChange={(e) =>
              onUpdateDateRange({ from: dateRange?.from ?? '', to: e.target.value })
            }
            className="rounded-md border bg-background px-2 py-1 text-xs"
          />
          {dateRange && (
            <button
              onClick={() => onUpdateDateRange(undefined)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Value filters */}
      {activeFilters.map((filter, i) => {
        const field = findField(filter.field);
        const topValues = field?.top_values ?? [];

        return (
          <div key={i} className="flex flex-wrap items-center gap-2 text-xs">
            {/* Field selector */}
            <select
              value={filter.field}
              onChange={(e) => updateFilter(i, { field: e.target.value, value: '' })}
              className="rounded-md border bg-background px-2 py-1"
            >
              {allFilterable.map((f) => (
                <option key={f.raw_name} value={f.raw_name}>
                  {isFr ? f.clean_name_fr : f.clean_name_en}
                </option>
              ))}
            </select>

            {/* Operator */}
            <select
              value={filter.operator}
              onChange={(e) => updateFilter(i, { operator: e.target.value as ReportFilter['operator'] })}
              className="rounded-md border bg-background px-2 py-1"
            >
              <option value="eq">=</option>
              <option value="neq">≠</option>
              <option value="contains">{isFr ? 'contient' : 'contains'}</option>
            </select>

            {/* Value — dropdown if top_values exist, text input otherwise */}
            {topValues.length > 0 ? (
              <select
                value={filter.value}
                onChange={(e) => updateFilter(i, { value: e.target.value })}
                className="max-w-[200px] rounded-md border bg-background px-2 py-1"
              >
                <option value="">{isFr ? '(choisir)' : '(select)'}</option>
                {topValues.map((tv) => (
                  <option key={tv.value} value={tv.value}>
                    {tv.value} ({tv.count})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={filter.value}
                onChange={(e) => updateFilter(i, { value: e.target.value })}
                placeholder={isFr ? 'Valeur...' : 'Value...'}
                className="rounded-md border bg-background px-2 py-1"
              />
            )}

            <button
              onClick={() => removeFilter(i)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
