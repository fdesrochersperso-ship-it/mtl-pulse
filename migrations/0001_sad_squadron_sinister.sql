CREATE TABLE "bedbug_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(100),
	"report_date" date,
	"borough_code" varchar(5),
	"num_exterminations" integer,
	"lat" numeric,
	"lng" numeric,
	"raw_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bedbug_reports_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "boroughs" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(5) NOT NULL,
	"name" varchar(200) NOT NULL,
	"population" integer,
	"geometry" jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "boroughs_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE INDEX "idx_bedbugs_date" ON "bedbug_reports" USING btree ("report_date");--> statement-breakpoint
CREATE INDEX "idx_bedbugs_borough" ON "bedbug_reports" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_boroughs_code" ON "boroughs" USING btree ("code");