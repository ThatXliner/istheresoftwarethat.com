alter table "public"."software" drop column "created_at";

alter table "public"."software" add column "added_date" timestamp with time zone not null default now();

alter table "public"."software" add column "category" text;

alter table "public"."software" add column "compatibility" jsonb;

alter table "public"."software" add column "icon" text;
