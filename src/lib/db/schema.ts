import {
  pgTable,
  serial,
  bigserial,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  date,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
  pgEnum,
} from 'drizzle-orm/pg-core';

// ─── Enums ──────────────────────────────────────────────────────────────────

export const snapshotStatusEnum = pgEnum('snapshot_status', ['success', 'error']);

export const pipelineRunStatusEnum = pgEnum('pipeline_run_status', [
  'running',
  'success',
  'failed',
]);

// ─── Pipeline Runs (execution log) ──────────────────────────────────────────

export const pipelineRuns = pgTable(
  'pipeline_runs',
  {
    id: serial('id').primaryKey(),
    pipelineName: varchar('pipeline_name', { length: 100 }).notNull(),
    status: pipelineRunStatusEnum('status').notNull(),
    recordsFetched: integer('records_fetched'),
    recordsInserted: integer('records_inserted'),
    recordsUpdated: integer('records_updated'),
    errorMessage: text('error_message'),
    startedAt: timestamp('started_at').defaultNow().notNull(),
    completedAt: timestamp('completed_at'),
    durationMs: integer('duration_ms'),
  },
  (table) => [
    index('idx_pipeline_runs_name').on(table.pipelineName),
    index('idx_pipeline_runs_started').on(table.startedAt),
  ],
);

// ─── Dataset Records (generic DataStore storage) ────────────────────────────

export const datasetRecords = pgTable(
  'dataset_records',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    datasetSlug: varchar('dataset_slug', { length: 200 }).notNull(),
    resourceId: varchar('resource_id', { length: 100 }).notNull(),
    externalId: varchar('external_id', { length: 500 }),
    recordDate: date('record_date'),
    boroughName: varchar('borough_name', { length: 100 }),
    latitude: numeric('latitude'),
    longitude: numeric('longitude'),
    data: jsonb('data').notNull(),
    fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_dataset_records_unique').on(table.datasetSlug, table.externalId),
    index('idx_dataset_records_slug').on(table.datasetSlug),
    index('idx_dataset_records_date').on(table.recordDate),
  ],
);

// ─── Snapshots (fetch log) ──────────────────────────────────────────────────

export const snapshots = pgTable('snapshots', {
  id: serial('id').primaryKey(),
  sourceKey: varchar('source_key', { length: 50 }).notNull(),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
  dataHash: varchar('data_hash', { length: 64 }),
  recordCount: integer('record_count'),
  status: snapshotStatusEnum('status').notNull(),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_snapshots_source_key').on(table.sourceKey),
  index('idx_snapshots_fetched_at').on(table.fetchedAt),
]);

// ─── Daily Metrics (pre-aggregated) ─────────────────────────────────────────

export const dailyMetrics = pgTable('daily_metrics', {
  id: serial('id').primaryKey(),
  date: date('date').notNull(),
  boroughCode: varchar('borough_code', { length: 5 }).notNull(),
  category: varchar('category', { length: 30 }).notNull(),
  metricKey: varchar('metric_key', { length: 50 }).notNull(),
  metricValue: numeric('metric_value').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('idx_daily_metrics_unique').on(
    table.date,
    table.boroughCode,
    table.category,
    table.metricKey,
  ),
  index('idx_daily_metrics_date').on(table.date),
  index('idx_daily_metrics_borough').on(table.boroughCode),
  index('idx_daily_metrics_category').on(table.category),
]);

// ─── Crime Incidents ────────────────────────────────────────────────────────

export const crimeIncidents = pgTable('crime_incidents', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 200 }).unique(),
  category: varchar('category', { length: 100 }).notNull(),
  incidentDate: date('incident_date').notNull(),
  shift: varchar('shift', { length: 20 }),
  pdq: integer('pdq'),
  boroughCode: varchar('borough_code', { length: 5 }),
  lat: numeric('lat'),
  lng: numeric('lng'),
  rawData: jsonb('raw_data'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_crime_date').on(table.incidentDate),
  index('idx_crime_borough').on(table.boroughCode),
  index('idx_crime_category').on(table.category),
]);

// ─── Travaux (Info-Travaux construction permits) ───────────────────────────

export const travaux = pgTable(
  'travaux',
  {
    id: serial('id').primaryKey(),
    externalId: varchar('external_id', { length: 100 }).unique().notNull(),
    boroughCode: varchar('borough_code', { length: 5 }),
    category: varchar('category', { length: 100 }),
    status: varchar('status', { length: 100 }),
    startDate: date('start_date'),
    endDate: date('end_date'),
    street: varchar('street', { length: 500 }),
    organizationName: varchar('organization_name', { length: 500 }),
    firstSeenAt: timestamp('first_seen_at').defaultNow().notNull(),
    lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
    rawData: jsonb('raw_data'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_travaux_external').on(table.externalId),
    index('idx_travaux_borough').on(table.boroughCode),
    index('idx_travaux_dates').on(table.startDate, table.endDate),
  ],
);

// ─── Construction Permits ───────────────────────────────────────────────────

export const constructionPermits = pgTable('construction_permits', {
  id: serial('id').primaryKey(),
  permitNumber: varchar('permit_number', { length: 50 }).unique(),
  dateIssued: date('date_issued').notNull(),
  boroughCode: varchar('borough_code', { length: 5 }),
  permitType: varchar('permit_type', { length: 20 }),
  buildingType: varchar('building_type', { length: 200 }),
  natureTravaux: text('nature_travaux'),
  numUnits: integer('num_units'),
  estimatedCost: numeric('estimated_cost'),
  lat: numeric('lat'),
  lng: numeric('lng'),
  rawData: jsonb('raw_data'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_permits_date').on(table.dateIssued),
  index('idx_permits_borough').on(table.boroughCode),
]);

// ─── Road Obstructions (Entraves circulation real-time CIFS) ─────────────────

export const roadObstructions = pgTable('road_obstructions', {
  id: serial('id').primaryKey(),
  sourceId: varchar('source_id', { length: 100 }).unique(),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  street: varchar('street', { length: 300 }),
  direction: varchar('direction', { length: 50 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  obstructionType: text('obstruction_type'),
  subtype: text('subtype'),
  description: text('description'),
  status: varchar('status', { length: 30 }),
  lat: numeric('lat'),
  lng: numeric('lng'),
  rawData: jsonb('raw_data'),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_obstructions_source').on(table.sourceId),
  index('idx_obstructions_borough').on(table.boroughCode),
  index('idx_obstructions_fetched').on(table.fetchedAt),
]);

// ─── Obstruction Snapshots (CIFS feed archival for historical analysis) ──────

export const obstructionSnapshots = pgTable('obstruction_snapshots', {
  id: serial('id').primaryKey(),
  snapshotData: jsonb('snapshot_data').notNull(),
  recordCount: integer('record_count'),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [index('idx_obstruction_snapshots_fetched').on(table.fetchedAt)]);

// ─── 311 Service Requests ───────────────────────────────────────────────────

export const requests311 = pgTable('requests_311', {
  id: serial('id').primaryKey(),
  requestId: varchar('request_id', { length: 100 }).unique(),
  nature: varchar('nature', { length: 100 }),
  requestType: varchar('request_type', { length: 200 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  status: varchar('status', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
  lat: numeric('lat'),
  lng: numeric('lng'),
  rawData: jsonb('raw_data'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_311_created').on(table.createdAt),
  index('idx_311_borough').on(table.boroughCode),
  index('idx_311_nature').on(table.nature),
]);

// ─── Fire Interventions ─────────────────────────────────────────────────────

export const fireInterventions = pgTable('fire_interventions', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 50 }).unique(),
  incidentType: varchar('incident_type', { length: 100 }),
  incidentDate: date('incident_date').notNull(),
  station: varchar('station', { length: 20 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  numUnits: integer('num_units'),
  lat: numeric('lat'),
  lng: numeric('lng'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_fire_date').on(table.incidentDate),
  index('idx_fire_borough').on(table.boroughCode),
]);

// ─── Pothole Repairs ────────────────────────────────────────────────────────

export const potholeRepairs = pgTable('pothole_repairs', {
  id: serial('id').primaryKey(),
  repairDate: date('repair_date').notNull(),
  vehicleId: varchar('vehicle_id', { length: 30 }),
  lat: numeric('lat'),
  lng: numeric('lng'),
  boroughCode: varchar('borough_code', { length: 5 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_potholes_date').on(table.repairDate),
  index('idx_potholes_borough').on(table.boroughCode),
]);

// ─── Snow Towings ───────────────────────────────────────────────────────────

export const snowTowings = pgTable('snow_towings', {
  id: serial('id').primaryKey(),
  towingDate: timestamp('towing_date').notNull(),
  lat: numeric('lat'),
  lng: numeric('lng'),
  reason: varchar('reason', { length: 100 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  sector: varchar('sector', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_towings_date').on(table.towingDate),
  index('idx_towings_borough').on(table.boroughCode),
]);

// ─── Daily Digests (AI-generated) ───────────────────────────────────────────

export const dailyDigests = pgTable('daily_digests', {
  id: serial('id').primaryKey(),
  digestDate: date('digest_date').unique().notNull(),
  summaryFr: text('summary_fr'),
  summaryEn: text('summary_en'),
  metricsSnapshot: jsonb('metrics_snapshot'),
  generatedAt: timestamp('generated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Dataset Registry (catalog from CKAN crawl) ───────────────────────────────

export const datasetRegistry = pgTable('dataset_registry', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  organization: varchar('organization', { length: 200 }),
  updateFrequency: varchar('update_frequency', { length: 50 }),
  lastModified: timestamp('last_modified'),
  resourceCount: integer('resource_count'),
  primaryResourceId: varchar('primary_resource_id', { length: 100 }),
  hasDatastore: boolean('has_datastore').default(false),
  hasGeospatial: boolean('has_geospatial').default(false),
  hasTemporal: boolean('has_temporal').default(false),
  estimatedRows: integer('estimated_rows'),
  fileSizeBytes: integer('file_size_bytes'),
  category: varchar('category', { length: 100 }),
  priorityTier: integer('priority_tier'),
  pipelineStatus: varchar('pipeline_status', { length: 20 }).default('pending'),
  lastPipelineRun: timestamp('last_pipeline_run'),
  notes: text('notes'),
  rawMetadata: jsonb('raw_metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_dataset_registry_slug').on(table.slug),
  index('idx_dataset_registry_priority').on(table.priorityTier),
]);

// ─── Bedbug Reports ────────────────────────────────────────────────────────

export const bedbugReports = pgTable('bedbug_reports', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 100 }).unique(),
  reportDate: date('report_date'),
  boroughCode: varchar('borough_code', { length: 5 }),
  numExterminations: integer('num_exterminations'),
  lat: numeric('lat'),
  lng: numeric('lng'),
  rawData: jsonb('raw_data'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_bedbugs_date').on(table.reportDate),
  index('idx_bedbugs_borough').on(table.boroughCode),
]);

// ─── Boroughs (reference + boundaries from limites-administratives) ──────────

export const boroughs = pgTable('boroughs', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 5 }).unique().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  population: integer('population'),
  geometry: jsonb('geometry'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [index('idx_boroughs_code').on(table.code)]);

// ─── Computed Metrics (metrics engine output for dashboard) ───────────────────

export const computedMetrics = pgTable(
  'computed_metrics',
  {
    id: serial('id').primaryKey(),
    metricName: varchar('metric_name', { length: 80 }).notNull(),
    boroughCode: varchar('borough_code', { length: 5 }),
    periodType: varchar('period_type', { length: 20 }).notNull().default('current'),
    periodDate: date('period_date').notNull(),
    value: numeric('value').notNull(),
    previousValue: numeric('previous_value'),
    metadata: jsonb('metadata'),
    computedAt: timestamp('computed_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_computed_metrics_unique').on(
      table.metricName,
      table.boroughCode,
      table.periodType,
      table.periodDate,
    ),
    index('idx_computed_metrics_name').on(table.metricName),
    index('idx_computed_metrics_borough').on(table.boroughCode),
    index('idx_computed_metrics_period').on(table.periodDate),
    index('idx_computed_metrics_dashboard').on(
      table.periodType,
      table.periodDate,
      table.boroughCode,
    ),
  ],
);

// ─── Digests (AI-generated, unified for daily/weekly/borough) ────────────────

export const digestTypeEnum = pgEnum('digest_type', ['daily', 'weekly', 'borough']);
export const digestLanguageEnum = pgEnum('digest_language', ['fr', 'en']);

export const digests = pgTable(
  'digests',
  {
    id: serial('id').primaryKey(),
    digestType: digestTypeEnum('digest_type').notNull(),
    periodDate: date('period_date').notNull(),
    boroughCode: varchar('borough_code', { length: 5 }),
    language: digestLanguageEnum('language').notNull(),
    title: varchar('title', { length: 300 }).notNull(),
    summary: text('summary').notNull(),
    highlights: jsonb('highlights').notNull(),
    stats: jsonb('stats'),
    modelUsed: varchar('model_used', { length: 80 }),
    promptTokens: integer('prompt_tokens'),
    completionTokens: integer('completion_tokens'),
    generatedAt: timestamp('generated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_digests_unique').on(
      table.digestType,
      table.periodDate,
      table.boroughCode,
      table.language,
    ),
    index('idx_digests_type_lang').on(table.digestType, table.language),
    index('idx_digests_period').on(table.periodDate),
  ],
);

// ─── Air Quality (RSQA IQA by station) ────────────────────────────────────────

export const airQuality = pgTable(
  'air_quality',
  {
    id: serial('id').primaryKey(),
    stationId: varchar('station_id', { length: 20 }).notNull(),
    readingDate: date('reading_date').notNull(),
    readingHour: integer('reading_hour'),
    pollutant: varchar('pollutant', { length: 20 }).notNull(),
    value: numeric('value'),
    lat: numeric('lat'),
    lng: numeric('lng'),
    sectorName: varchar('sector_name', { length: 100 }),
    rawData: jsonb('raw_data'),
    fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_air_quality_unique').on(
      table.stationId,
      table.readingDate,
      table.readingHour,
      table.pollutant,
    ),
    index('idx_air_quality_date').on(table.readingDate),
    index('idx_air_quality_station').on(table.stationId),
  ],
);

// ─── Cycling Counts (Compteurs cyclistes permanents) ──────────────────────────

export const cyclingCounts = pgTable('cycling_counts', {
  id: serial('id').primaryKey(),
  counterId: varchar('counter_id', { length: 50 }).notNull(),
  periodDate: date('period_date').notNull(),
  volume: integer('volume').notNull(),
  lat: numeric('lat'),
  lng: numeric('lng'),
  boroughCode: varchar('borough_code', { length: 5 }),
  rawData: jsonb('raw_data'),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('idx_cycling_counts_unique').on(table.counterId, table.periodDate),
  index('idx_cycling_counts_date').on(table.periodDate),
  index('idx_cycling_counts_counter').on(table.counterId),
]);

// ─── Water Breaks (Réparations réseau eau potable) ───────────────────────────

export const waterBreaks = pgTable('water_breaks', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 50 }).unique(),
  breakDate: date('break_date').notNull(),
  boroughCode: varchar('borough_code', { length: 5 }),
  streetName: varchar('street_name', { length: 500 }),
  breakType: varchar('break_type', { length: 100 }),
  pipeMaterial: varchar('pipe_material', { length: 100 }),
  pipeDiameter: numeric('pipe_diameter'),
  lat: numeric('lat'),
  lng: numeric('lng'),
  rawData: jsonb('raw_data'),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
}, (table) => [
  index('idx_water_breaks_date').on(table.breakDate),
  index('idx_water_breaks_borough').on(table.boroughCode),
]);

// ─── Road Conditions (Condition chaussées réseau routier) ──────────────────────

export const roadConditions = pgTable(
  'road_conditions',
  {
    id: serial('id').primaryKey(),
    segmentId: varchar('segment_id', { length: 50 }).notNull(),
    streetName: varchar('street_name', { length: 300 }),
    boroughCode: varchar('borough_code', { length: 5 }),
    surveyDate: date('survey_date'),
    pciScore: numeric('pci_score'),
    pciState: varchar('pci_state', { length: 50 }),
    iriScore: numeric('iri_score'),
    iriState: varchar('iri_state', { length: 50 }),
    lengthM: numeric('length_m'),
    rawData: jsonb('raw_data'),
    fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_road_conditions_unique').on(table.segmentId, table.surveyDate),
    index('idx_road_conditions_borough').on(table.boroughCode),
    index('idx_road_conditions_survey').on(table.surveyDate),
  ],
);

// ─── Contracts (Vue sur les contrats API / CKAN) ───────────────────────────────

export const contracts = pgTable('contracts', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 200 }).unique(),
  contractType: varchar('contract_type', { length: 100 }),
  title: text('title'),
  supplierName: varchar('supplier_name', { length: 300 }),
  amount: numeric('amount'),
  awardDate: date('award_date'),
  boroughCode: varchar('borough_code', { length: 5 }),
  sector: varchar('sector', { length: 200 }),
  awardingBody: varchar('awarding_body', { length: 200 }),
  rawData: jsonb('raw_data'),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
}, (table) => [
  index('idx_contracts_date').on(table.awardDate),
  index('idx_contracts_borough').on(table.boroughCode),
]);

// ─── Elected Officials ──────────────────────────────────────────────────────

export const electedOfficials = pgTable('elected_officials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  functionType: varchar('function_type', { length: 50 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  party: varchar('party', { length: 100 }),
  mandateStart: date('mandate_start'),
  mandateEnd: date('mandate_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
