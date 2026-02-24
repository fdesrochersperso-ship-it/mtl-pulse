CREATE TABLE "air_quality" (
	"id" serial PRIMARY KEY NOT NULL,
	"station_id" varchar(20) NOT NULL,
	"reading_date" date NOT NULL,
	"reading_hour" integer,
	"pollutant" varchar(20) NOT NULL,
	"value" numeric,
	"lat" numeric,
	"lng" numeric,
	"sector_name" varchar(100),
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(200),
	"contract_type" varchar(100),
	"title" text,
	"supplier_name" varchar(300),
	"amount" numeric,
	"award_date" date,
	"borough_code" varchar(5),
	"sector" varchar(200),
	"awarding_body" varchar(200),
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contracts_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "cycling_counts" (
	"id" serial PRIMARY KEY NOT NULL,
	"counter_id" varchar(50) NOT NULL,
	"period_date" date NOT NULL,
	"volume" integer NOT NULL,
	"lat" numeric,
	"lng" numeric,
	"borough_code" varchar(5),
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "road_conditions" (
	"id" serial PRIMARY KEY NOT NULL,
	"segment_id" varchar(50) NOT NULL,
	"street_name" varchar(300),
	"borough_code" varchar(5),
	"survey_date" date,
	"pci_score" numeric,
	"pci_state" varchar(50),
	"iri_score" numeric,
	"iri_state" varchar(50),
	"length_m" numeric,
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "water_breaks" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(50),
	"break_date" date NOT NULL,
	"borough_code" varchar(5),
	"street_name" varchar(500),
	"break_type" varchar(100),
	"pipe_material" varchar(100),
	"pipe_diameter" numeric,
	"lat" numeric,
	"lng" numeric,
	"raw_data" jsonb,
	"fetched_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "water_breaks_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_air_quality_unique" ON "air_quality" USING btree ("station_id","reading_date","reading_hour","pollutant");--> statement-breakpoint
CREATE INDEX "idx_air_quality_date" ON "air_quality" USING btree ("reading_date");--> statement-breakpoint
CREATE INDEX "idx_air_quality_station" ON "air_quality" USING btree ("station_id");--> statement-breakpoint
CREATE INDEX "idx_contracts_date" ON "contracts" USING btree ("award_date");--> statement-breakpoint
CREATE INDEX "idx_contracts_borough" ON "contracts" USING btree ("borough_code");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_cycling_counts_unique" ON "cycling_counts" USING btree ("counter_id","period_date");--> statement-breakpoint
CREATE INDEX "idx_cycling_counts_date" ON "cycling_counts" USING btree ("period_date");--> statement-breakpoint
CREATE INDEX "idx_cycling_counts_counter" ON "cycling_counts" USING btree ("counter_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_road_conditions_unique" ON "road_conditions" USING btree ("segment_id","survey_date");--> statement-breakpoint
CREATE INDEX "idx_road_conditions_borough" ON "road_conditions" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_road_conditions_survey" ON "road_conditions" USING btree ("survey_date");--> statement-breakpoint
CREATE INDEX "idx_water_breaks_date" ON "water_breaks" USING btree ("break_date");--> statement-breakpoint
CREATE INDEX "idx_water_breaks_borough" ON "water_breaks" USING btree ("borough_code");