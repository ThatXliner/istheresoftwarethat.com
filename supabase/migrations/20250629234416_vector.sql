create extension vector
with
  schema extensions;

alter table "public"."software" add column "embeddings" vector;
alter table "public"."software" add column "fts" tsvector generated always as (to_tsvector('english', coalesce(other_details->>'short_description', ''))) stored;
CREATE INDEX software_fts_idx
ON "public"."software"
USING GIN ("fts");