/** Semantic layer types — derived from docs/data-inventory/semantic-layer/ JSON schema */

export type FieldType =
  | 'category'
  | 'text'
  | 'numeric'
  | 'date'
  | 'geo_latitude'
  | 'geo_longitude'
  | 'identifier';

export type FieldRole = 'dimension' | 'measure' | 'date' | 'filter' | 'geo' | 'exclude';

export type QualityGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type FieldQuality = 'good' | 'usable' | 'poor' | 'empty';

export interface TopValue {
  value: string;
  count: number;
}

export interface SemanticField {
  raw_name: string;
  clean_name_fr: string;
  clean_name_en: string;
  description_fr?: string;
  description_en?: string;
  type: FieldType;
  report_builder_role: FieldRole;
  null_pct: number;
  quality: FieldQuality;
  top_values?: TopValue[];
  unique_values?: number;
  chartable_as?: string[];
  groupable?: boolean;
  filterable?: boolean;
  aggregatable?: boolean;
  warnings_fr?: string;
  warnings_en?: string;
}

export interface TemporalRange {
  min: string;
  max: string;
}

export interface SemanticDataset {
  slug: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  publisher: string;
  category: string;
  data_quality_score: QualityGrade;
  total_records: number;
  update_frequency: string;
  temporal_range: TemporalRange | null;
  temporal_range_note?: string;
  usable_in_report_builder: boolean;
  fields: SemanticField[];
  warnings_fr: string[];
  warnings_en: string[];
  methodology_fr: string;
  available_formats: string[];
  recommended_joins?: string[];
  resource_id: string;
}

export interface SemanticCategory {
  slug: string;
  name_fr: string;
  name_en: string;
  dataset_count: number;
  usable_count: number;
}

export type AggregationType = 'count' | 'sum' | 'avg' | 'min' | 'max';

export interface ReportFilter {
  field: string;
  operator: 'eq' | 'neq' | 'contains' | 'gte' | 'lte';
  value: string;
}

export interface ReportConfig {
  datasetSlug: string;
  resourceId: string;
  dimensions: string[];
  measures: string[];
  aggregation: AggregationType;
  dateField?: string;
  dateRange?: { from: string; to: string };
  filters: ReportFilter[];
  limit: number;
  orderBy?: string;
  orderDir?: 'ASC' | 'DESC';
}

export type ChartType = 'bar' | 'line' | 'pie' | 'table';

export interface ReportResult {
  records: Record<string, unknown>[];
  fields: Array<{ id: string; type: string }>;
  total: number;
  sql: string;
  queryTimeMs: number;
}
