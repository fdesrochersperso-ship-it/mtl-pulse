CREATE TYPE "public"."pipeline_run_status" AS ENUM('running', 'success', 'failed');--> statement-breakpoint
CREATE TYPE "public"."snapshot_status" AS ENUM('success', 'error');--> statement-breakpoint
CREATE TABLE "construction_permits" (
	"id" serial PRIMARY KEY NOT NULL,
	"permit_number" varchar(50),
	"date_issued" date NOT NULL,
	"borough_code" varchar(5),
	"permit_type" varchar(20),
	"building_type" varchar(200),
	"nature_travaux" text,
	"num_units" integer,
	"estimated_cost" numeric,
	"lat" numeric,
	"lng" numeric,
	"raw_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "construction_permits_permit_number_unique" UNIQUE("permit_number")
);
--> statement-breakpoint
CREATE TABLE "crime_incidents" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(200),
	"category" varchar(100) NOT NULL,
	"incident_date" date NOT NULL,
	"shift" varchar(20),
	"pdq" integer,
	"borough_code" varchar(5),
	"lat" numeric,
	"lng" numeric,
	"raw_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "crime_incidents_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "daily_digests" (
	"id" serial PRIMARY KEY NOT NULL,
	"digest_date" date NOT NULL,
	"summary_fr" text,
	"summary_en" text,
	"metrics_snapshot" jsonb,
	"generated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "daily_digests_digest_date_unique" UNIQUE("digest_date")
);
--> statement-breakpoint
CREATE TABLE "daily_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"borough_code" varchar(5) NOT NULL,
	"category" varchar(30) NOT NULL,
	"metric_key" varchar(50) NOT NULL,
	"metric_value" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dataset_records" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"dataset_slug" varchar(200) NOT NULL,
	"resource_id" varchar(100) NOT NULL,
	"external_id" varchar(500),
	"record_date" date,
	"borough_name" varchar(100),
	"latitude" numeric,
	"longitude" numeric,
	"data" jsonb NOT NULL,
	"fetched_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dataset_registry" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(500) NOT NULL,
	"description" text,
	"organization" varchar(200),
	"update_frequency" varchar(50),
	"last_modified" timestamp,
	"resource_count" integer,
	"primary_resource_id" varchar(100),
	"has_datastore" boolean DEFAULT false,
	"has_geospatial" boolean DEFAULT false,
	"has_temporal" boolean DEFAULT false,
	"estimated_rows" integer,
	"file_size_bytes" integer,
	"category" varchar(100),
	"priority_tier" integer,
	"pipeline_status" varchar(20) DEFAULT 'pending',
	"last_pipeline_run" timestamp,
	"notes" text,
	"raw_metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "dataset_registry_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "elected_officials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"function_type" varchar(50),
	"borough_code" varchar(5),
	"party" varchar(100),
	"mandate_start" date,
	"mandate_end" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fire_interventions" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(50),
	"incident_type" varchar(100),
	"incident_date" date NOT NULL,
	"station" varchar(20),
	"borough_code" varchar(5),
	"num_units" integer,
	"lat" numeric,
	"lng" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "fire_interventions_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "obstruction_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"snapshot_data" jsonb NOT NULL,
	"record_count" integer,
	"fetched_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pipeline_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"pipeline_name" varchar(100) NOT NULL,
	"status" "pipeline_run_status" NOT NULL,
	"records_fetched" integer,
	"records_inserted" integer,
	"records_updated" integer,
	"error_message" text,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"duration_ms" integer
);
--> statement-breakpoint
CREATE TABLE "pothole_repairs" (
	"id" serial PRIMARY KEY NOT NULL,
	"repair_date" date NOT NULL,
	"vehicle_id" varchar(30),
	"lat" numeric,
	"lng" numeric,
	"borough_code" varchar(5),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "requests_311" (
	"id" serial PRIMARY KEY NOT NULL,
	"request_id" varchar(100),
	"nature" varchar(100),
	"request_type" varchar(200),
	"borough_code" varchar(5),
	"status" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"closed_at" timestamp,
	"lat" numeric,
	"lng" numeric,
	"raw_data" jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "requests_311_request_id_unique" UNIQUE("request_id")
);
--> statement-breakpoint
CREATE TABLE "road_obstructions" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_id" varchar(100),
	"start_time" timestamp,
	"end_time" timestamp,
	"street" varchar(300),
	"direction" varchar(50),
	"borough_code" varchar(5),
	"obstruction_type" text,
	"subtype" text,
	"description" text,
	"status" varchar(30),
	"lat" numeric,
	"lng" numeric,
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "road_obstructions_source_id_unique" UNIQUE("source_id")
);
--> statement-breakpoint
CREATE TABLE "snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_key" varchar(50) NOT NULL,
	"fetched_at" timestamp DEFAULT now() NOT NULL,
	"data_hash" varchar(64),
	"record_count" integer,
	"status" "snapshot_status" NOT NULL,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "snow_towings" (
	"id" serial PRIMARY KEY NOT NULL,
	"towing_date" timestamp NOT NULL,
	"lat" numeric,
	"lng" numeric,
	"reason" varchar(100),
	"borough_code" varchar(5),
	"sector" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travaux" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(100) NOT NULL,
	"borough_code" varchar(5),
	"category" varchar(100),
	"status" varchar(100),
	"start_date" date,
	"end_date" date,
	"street" varchar(500),
	"organization_name" varchar(500),
	"first_seen_at" timestamp DEFAULT now() NOT NULL,
	"last_seen_at" timestamp DEFAULT now() NOT NULL,
	"raw_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "travaux_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE INDEX "idx_permits_date" ON "construction_permits" USING btree ("date_issued");--> statement-breakpoint
CREATE INDEX "idx_permits_borough" ON "construction_permits" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_crime_date" ON "crime_incidents" USING btree ("incident_date");--> statement-breakpoint
CREATE INDEX "idx_crime_borough" ON "crime_incidents" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_crime_category" ON "crime_incidents" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_daily_metrics_unique" ON "daily_metrics" USING btree ("date","borough_code","category","metric_key");--> statement-breakpoint
CREATE INDEX "idx_daily_metrics_date" ON "daily_metrics" USING btree ("date");--> statement-breakpoint
CREATE INDEX "idx_daily_metrics_borough" ON "daily_metrics" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_daily_metrics_category" ON "daily_metrics" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_dataset_records_unique" ON "dataset_records" USING btree ("dataset_slug","external_id");--> statement-breakpoint
CREATE INDEX "idx_dataset_records_slug" ON "dataset_records" USING btree ("dataset_slug");--> statement-breakpoint
CREATE INDEX "idx_dataset_records_date" ON "dataset_records" USING btree ("record_date");--> statement-breakpoint
CREATE INDEX "idx_dataset_registry_slug" ON "dataset_registry" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_dataset_registry_priority" ON "dataset_registry" USING btree ("priority_tier");--> statement-breakpoint
CREATE INDEX "idx_fire_date" ON "fire_interventions" USING btree ("incident_date");--> statement-breakpoint
CREATE INDEX "idx_fire_borough" ON "fire_interventions" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_obstruction_snapshots_fetched" ON "obstruction_snapshots" USING btree ("fetched_at");--> statement-breakpoint
CREATE INDEX "idx_pipeline_runs_name" ON "pipeline_runs" USING btree ("pipeline_name");--> statement-breakpoint
CREATE INDEX "idx_pipeline_runs_started" ON "pipeline_runs" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "idx_potholes_date" ON "pothole_repairs" USING btree ("repair_date");--> statement-breakpoint
CREATE INDEX "idx_potholes_borough" ON "pothole_repairs" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_311_created" ON "requests_311" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_311_borough" ON "requests_311" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_311_nature" ON "requests_311" USING btree ("nature");--> statement-breakpoint
CREATE INDEX "idx_obstructions_source" ON "road_obstructions" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "idx_obstructions_borough" ON "road_obstructions" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_obstructions_fetched" ON "road_obstructions" USING btree ("fetched_at");--> statement-breakpoint
CREATE INDEX "idx_snapshots_source_key" ON "snapshots" USING btree ("source_key");--> statement-breakpoint
CREATE INDEX "idx_snapshots_fetched_at" ON "snapshots" USING btree ("fetched_at");--> statement-breakpoint
CREATE INDEX "idx_towings_date" ON "snow_towings" USING btree ("towing_date");--> statement-breakpoint
CREATE INDEX "idx_towings_borough" ON "snow_towings" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_travaux_external" ON "travaux" USING btree ("external_id");--> statement-breakpoint
CREATE INDEX "idx_travaux_borough" ON "travaux" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_travaux_dates" ON "travaux" USING btree ("start_date","end_date");