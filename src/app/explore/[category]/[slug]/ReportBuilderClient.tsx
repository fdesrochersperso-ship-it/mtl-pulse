'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ReportHeader } from '@/components/report-builder/ReportHeader';
import { FieldSelector } from '@/components/report-builder/FieldSelector';
import { FilterPanel } from '@/components/report-builder/FilterPanel';
import { VisualizationPanel } from '@/components/report-builder/VisualizationPanel';
import { DataTable } from '@/components/report-builder/DataTable';
import type {
  SemanticDataset,
  AggregationType,
  ChartType,
  ReportFilter,
  ReportResult,
} from '@/lib/report-builder/types';

interface ReportBuilderClientProps {
  dataset: SemanticDataset;
  locale: string;
}

export function ReportBuilderClient({ dataset, locale }: ReportBuilderClientProps) {
  const isFr = locale === 'fr';

  // Field selections
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);
  const [selectedDateField, setSelectedDateField] = useState<string | null>(null);
  const [aggregation, setAggregation] = useState<AggregationType>('count');
  const [filters, setFilters] = useState<ReportFilter[]>([]);
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | undefined>();

  // Visualization
  const [chartType, setChartType] = useState<ChartType>('bar');

  // Results
  const [result, setResult] = useState<ReportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Categorize fields by role
  const dimensions = useMemo(
    () => dataset.fields.filter((f) => f.report_builder_role === 'dimension'),
    [dataset.fields],
  );
  const measures = useMemo(
    () => dataset.fields.filter((f) => f.report_builder_role === 'measure'),
    [dataset.fields],
  );
  const dateFields = useMemo(
    () => dataset.fields.filter((f) => f.report_builder_role === 'date'),
    [dataset.fields],
  );
  const filterFields = useMemo(
    () => dataset.fields.filter((f) => f.report_builder_role === 'filter'),
    [dataset.fields],
  );

  // Build field label map
  const fieldLabels = useMemo(() => {
    const labels: Record<string, string> = {};
    for (const f of dataset.fields) {
      labels[f.raw_name] = isFr ? f.clean_name_fr : f.clean_name_en;
      // Also map aggregated names
      for (const agg of ['count', 'sum', 'avg', 'min', 'max']) {
        labels[`${f.raw_name}_${agg}`] = `${isFr ? f.clean_name_fr : f.clean_name_en} (${agg.toUpperCase()})`;
      }
    }
    labels['count'] = isFr ? 'Nombre' : 'Count';
    return labels;
  }, [dataset.fields, isFr]);

  // Toggle dimension selection
  const toggleDimension = useCallback((rawName: string) => {
    setSelectedDimensions((prev) => {
      if (prev.includes(rawName)) return prev.filter((d) => d !== rawName);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, rawName];
    });
  }, []);

  // Toggle measure selection
  const toggleMeasure = useCallback((rawName: string) => {
    setSelectedMeasures((prev) => {
      if (prev.includes(rawName)) return prev.filter((m) => m !== rawName);
      return [...prev, rawName];
    });
  }, []);

  // Run report
  const runReport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const body = {
        datasetSlug: dataset.slug,
        dimensions: selectedDimensions,
        measures: selectedMeasures,
        aggregation,
        dateField: selectedDateField ?? undefined,
        dateRange: dateRange?.from && dateRange?.to ? dateRange : undefined,
        filters: filters.filter((f) => f.value), // Only include filters with values
        limit: 1000,
      };

      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const err = (await response.json()) as { error?: string };
        throw new Error(err.error ?? `HTTP ${response.status}`);
      }

      const data = (await response.json()) as ReportResult;
      setResult(data);

      // Auto-select chart type based on fields
      if (selectedDateField && selectedDimensions.length === 0) {
        setChartType('line');
      } else if (selectedDimensions.length > 0 && !selectedDateField) {
        setChartType('bar');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [dataset.slug, selectedDimensions, selectedMeasures, aggregation, selectedDateField, dateRange, filters]);

  // Auto-run on selection changes (debounced)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      runReport();
    }, 600);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [runReport]);

  return (
    <div className="space-y-6">
      {/* Header with dataset info */}
      <ReportHeader dataset={dataset} locale={locale} />

      {/* Main layout: sidebar + content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left panel: Field selector + Filters */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <FieldSelector
              dimensions={dimensions}
              measures={measures}
              dateFields={dateFields}
              filterFields={filterFields}
              selectedDimensions={selectedDimensions}
              selectedMeasures={selectedMeasures}
              selectedDateField={selectedDateField}
              aggregation={aggregation}
              onToggleDimension={toggleDimension}
              onToggleMeasure={toggleMeasure}
              onSelectDateField={setSelectedDateField}
              onChangeAggregation={setAggregation}
              locale={locale}
            />
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <FilterPanel
              filterFields={filterFields}
              dimensionFields={dimensions}
              activeFilters={filters}
              dateField={selectedDateField}
              dateRange={dateRange}
              onUpdateFilters={setFilters}
              onUpdateDateRange={setDateRange}
              locale={locale}
            />
          </div>
        </div>

        {/* Right panel: Visualization + Table */}
        <div className="space-y-4">
          {/* Error display */}
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
              {error}
            </div>
          )}

          {/* Chart */}
          <VisualizationPanel
            result={result}
            chartType={chartType}
            onChartTypeChange={setChartType}
            dimensions={selectedDimensions}
            measures={selectedMeasures}
            dateField={selectedDateField}
            aggregation={aggregation}
            loading={loading}
            locale={locale}
            fieldLabels={fieldLabels}
          />

          {/* Data table */}
          {result && result.records.length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isFr ? 'Données' : 'Data'}
              </h3>
              <DataTable
                records={result.records}
                fields={result.fields}
                locale={locale}
                fieldLabels={fieldLabels}
              />
            </div>
          )}

          {/* SQL debug (collapsed) */}
          {result && (
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground">
                {isFr ? 'Voir la requête SQL' : 'View SQL query'}
              </summary>
              <pre className="mt-1 overflow-x-auto rounded-md bg-muted p-3 font-mono">
                {result.sql}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
