create extension vector
with
  schema extensions;
alter table "public"."software"
add column embedding vector(1536);

-- Match documents using cosine distance (<=>)
-- This function will be replaced be a reciprocal ranked function that combines
-- a hybrid of cosine distance and FTS
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns setof "public"."software"
language sql
as $$
  select *
  from "public"."software"
  -- Negative inner product since we're using OpenAI embeddings
  where "public"."software".embedding <#> query_embedding < 1 - match_threshold
  order by "public"."software".embedding <#> query_embedding asc
  limit least(match_count, 200);
$$;
create index on "public"."software" using hnsw (embedding vector_ip_ops);