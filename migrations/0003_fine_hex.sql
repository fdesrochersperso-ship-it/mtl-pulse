CREATE TYPE "public"."digest_language" AS ENUM('fr', 'en');--> statement-breakpoint
CREATE TYPE "public"."digest_type" AS ENUM('daily', 'weekly', 'borough');--> statement-breakpoint
CREATE TABLE "digests" (
	"id" serial PRIMARY KEY NOT NULL,
	"digest_type" "digest_type" NOT NULL,
	"period_date" date NOT NULL,
	"borough_code" varchar(5),
	"language" "digest_language" NOT NULL,
	"title" varchar(300) NOT NULL,
	"summary" text NOT NULL,
	"highlights" jsonb NOT NULL,
	"stats" jsonb,
	"model_used" varchar(80),
	"prompt_tokens" integer,
	"completion_tokens" integer,
	"generated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_digests_unique" ON "digests" USING btree ("digest_type","period_date","borough_code","language");--> statement-breakpoint
CREATE INDEX "idx_digests_type_lang" ON "digests" USING btree ("digest_type","language");--> statement-breakpoint
CREATE INDEX "idx_digests_period" ON "digests" USING btree ("period_date");