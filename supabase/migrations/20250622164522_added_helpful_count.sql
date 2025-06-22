alter table "public"."reviews" add column "helpful_count" integer not null default 0;

alter table "public"."reviews" alter column "date" set default now();


