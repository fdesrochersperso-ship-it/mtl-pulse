'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import type { ChartType, ReportResult } from '@/lib/report-builder/types';

const CHART_COLORS = [
  '#1B365D', // navy
  '#FF6B35', // orange
  '#16A34A', // green
  '#7C3AED', // purple
  '#0891B2', // cyan
  '#D97706', // amber
  '#DC2626', // red
  '#059669', // emerald
  '#4F46E5', // indigo
  '#DB2777', // pink
];

interface VisualizationPanelProps {
  result: ReportResult | null;
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  dimensions: string[];
  measures: string[];
  dateField: string | null;
  aggregation: string;
  loading: boolean;
  locale: string;
  fieldLabels: Record<string, string>;
}

export function VisualizationPanel({
  result,
  chartType,
  onChartTypeChange,
  dimensions,
  measures,
  dateField,
  aggregation,
  loading,
  locale,
  fieldLabels,
}: VisualizationPanelProps) {
  const isFr = locale === 'fr';

  // Determine which chart types are appropriate
  const availableCharts = useMemo<ChartType[]>(() => {
    const types: ChartType[] = ['table'];
    if (dimensions.length > 0 && !dateField) {
      types.unshift('bar', 'pie');
    }
    if (dateField) {
      types.unshift('line', 'bar');
    }
    if (dimensions.length > 0 && dateField) {
      types.unshift('line');
    }
    // Deduplicate
    return [...new Set(types)];
  }, [dimensions, dateField]);

  // Determine the value key to chart
  const valueKey = useMemo(() => {
    if (measures.length > 0) {
      return `${measures[0]}_${aggregation}`;
    }
    return 'count';
  }, [measures, aggregation]);

  // Label key (first dimension or date field)
  const labelKey = dimensions[0] ?? dateField ?? '';

  // Chart data — truncate labels for display
  const chartData = useMemo(() => {
    if (!result) return [];
    return result.records.map((r) => {
      const label = r[labelKey];
      return {
        ...r,
        _label: label != null ? String(label).slice(0, 30) : '—',
        _value: Number(r[valueKey]) || 0,
      };
    });
  }, [result, labelKey, valueKey]);

  const valueLabel = fieldLabels[valueKey] ?? valueKey;

  return (
    <div className="space-y-3">
      {/* Chart type selector + stats */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {availableCharts.map((type) => (
            <button
              key={type}
              onClick={() => onChartTypeChange(type)}
              className={`rounded-md px-3 py-1 text-xs transition-colors ${
                chartType === type
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {type === 'bar'
                ? '▮ Bar'
                : type === 'line'
                  ? '📈 Line'
                  : type === 'pie'
                    ? '◔ Pie'
                    : '▤ Table'}
            </button>
          ))}
        </div>
        {result && (
          <div className="text-xs text-muted-foreground">
            {result.total} {isFr ? 'résultats' : 'results'} · {result.queryTimeMs}ms
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex h-64 items-center justify-center rounded-md border bg-muted">
          <div className="text-sm text-muted-foreground animate-pulse">
            {isFr ? 'Chargement des données...' : 'Loading data...'}
          </div>
        </div>
      )}

      {/* Chart rendering */}
      {!loading && result && chartType !== 'table' && chartData.length > 0 && (
        <div className="rounded-md border bg-card p-4">
          <ResponsiveContainer width="100%" height={350}>
            {chartType === 'bar' ? (
              <BarChart data={chartData} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="_label"
                  tick={{ fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  height={80}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: '1px solid var(--border)' }}
                  formatter={(value) => [
                    Number(value ?? 0).toLocaleString(isFr ? 'fr-CA' : 'en-CA'),
                    valueLabel,
                  ]}
                />
                <Bar dataKey="_value" fill="#1B365D" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="_label"
                  tick={{ fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  interval="preserveStartEnd"
                  height={80}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: '1px solid var(--border)' }}
                  formatter={(value) => [
                    Number(value ?? 0).toLocaleString(isFr ? 'fr-CA' : 'en-CA'),
                    valueLabel,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="_value"
                  stroke="#1B365D"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData.slice(0, 10)}
                  dataKey="_value"
                  nameKey="_label"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${String(name).slice(0, 20)} (${((percent ?? 0) * 100).toFixed(0)}%)`
                  }
                  labelLine={{ strokeWidth: 1 }}
                >
                  {chartData.slice(0, 10).map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    Number(value ?? 0).toLocaleString(isFr ? 'fr-CA' : 'en-CA'),
                    valueLabel,
                  ]}
                />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {/* Empty state */}
      {!loading && result && result.records.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-md border bg-muted">
          <p className="text-sm text-muted-foreground">
            {isFr ? 'Aucun résultat pour cette requête.' : 'No results for this query.'}
          </p>
        </div>
      )}
    </div>
  );
}
