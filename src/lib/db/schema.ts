import {
  pgTable,
  serial,
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
  externalId: varchar('external_id', { length: 50 }).unique(),
  category: varchar('category', { length: 100 }).notNull(),
  incidentDate: date('incident_date').notNull(),
  shift: varchar('shift', { length: 20 }),
  pdq: integer('pdq'),
  boroughCode: varchar('borough_code', { length: 5 }),
  lat: numeric('lat'),
  lng: numeric('lng'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_crime_date').on(table.incidentDate),
  index('idx_crime_borough').on(table.boroughCode),
  index('idx_crime_category').on(table.category),
]);

// ─── Construction Permits ───────────────────────────────────────────────────

export const constructionPermits = pgTable('construction_permits', {
  id: serial('id').primaryKey(),
  permitNumber: varchar('permit_number', { length: 50 }).unique(),
  dateIssued: date('date_issued').notNull(),
  boroughCode: varchar('borough_code', { length: 5 }),
  permitType: varchar('permit_type', { length: 20 }),
  buildingType: varchar('building_type', { length: 50 }),
  natureTravaux: text('nature_travaux'),
  numUnits: integer('num_units'),
  estimatedCost: numeric('estimated_cost'),
  lat: numeric('lat'),
  lng: numeric('lng'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_permits_date').on(table.dateIssued),
  index('idx_permits_borough').on(table.boroughCode),
]);

// ─── Road Obstructions (Info-Travaux) ───────────────────────────────────────

export const roadObstructions = pgTable('road_obstructions', {
  id: serial('id').primaryKey(),
  sourceId: varchar('source_id', { length: 50 }).unique(),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  street: varchar('street', { length: 200 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  obstructionType: varchar('obstruction_type', { length: 50 }),
  subtype: varchar('subtype', { length: 50 }),
  description: text('description'),
  status: varchar('status', { length: 30 }),
  lat: numeric('lat'),
  lng: numeric('lng'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_obstructions_active').on(table.isActive),
  index('idx_obstructions_borough').on(table.boroughCode),
]);

// ─── 311 Service Requests ───────────────────────────────────────────────────

export const requests311 = pgTable('requests_311', {
  id: serial('id').primaryKey(),
  requestId: varchar('request_id', { length: 50 }).unique(),
  nature: varchar('nature', { length: 100 }),
  requestType: varchar('request_type', { length: 100 }),
  boroughCode: varchar('borough_code', { length: 5 }),
  status: varchar('status', { length: 30 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
  lat: numeric('lat'),
  lng: numeric('lng'),
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
