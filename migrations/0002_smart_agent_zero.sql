CREATE TABLE "computed_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"metric_name" varchar(80) NOT NULL,
	"borough_code" varchar(5),
	"period_type" varchar(20) DEFAULT 'current' NOT NULL,
	"period_date" date NOT NULL,
	"value" numeric NOT NULL,
	"previous_value" numeric,
	"metadata" jsonb,
	"computed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_computed_metrics_unique" ON "computed_metrics" USING btree ("metric_name","borough_code","period_type","period_date");--> statement-breakpoint
CREATE INDEX "idx_computed_metrics_name" ON "computed_metrics" USING btree ("metric_name");--> statement-breakpoint
CREATE INDEX "idx_computed_metrics_borough" ON "computed_metrics" USING btree ("borough_code");--> statement-breakpoint
CREATE INDEX "idx_computed_metrics_period" ON "computed_metrics" USING btree ("period_date");