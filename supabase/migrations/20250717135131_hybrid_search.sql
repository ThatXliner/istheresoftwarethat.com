create extension vector
with
  schema extensions;
alter table "public"."software"
-- Halved size from OpenAI's original 1536 to reduce storage and improve performance
add column embedding halfvec(1536);
create index on "public"."software" using hnsw (embedding halfvec_ip_ops);



create or replace function hybrid_search(
  query_text text,
  query_embedding halfvec(1536),  
  match_count int,
  full_text_weight float = 1,
  semantic_weight float = 1,
  rrf_k int = 50
)
returns setof "public"."software"
language sql
as $$
with full_text as (
  select
    id,
    -- Note: ts_rank_cd is not indexable but will only rank matches of the where clause
    -- which shouldn't be too big
    row_number() over(order by ts_rank_cd(fts, websearch_to_tsquery(query_text)) desc) as rank_ix
  from
    "public"."software"
  where
    fts @@ websearch_to_tsquery(query_text)
  order by rank_ix
  limit least(match_count, 30) * 2
),
semantic as (
  select
    id,
    row_number() over (order by embedding <#> query_embedding) as rank_ix
  from
    "public"."software"
  order by rank_ix
  limit least(match_count, 30) * 2
)
select
  "public"."software".*
from
  full_text
  full outer join semantic
    on full_text.id = semantic.id
  join "public"."software"
    on coalesce(full_text.id, semantic.id) = "public"."software".id
order by
  coalesce(1.0 / (rrf_k + full_text.rank_ix), 0.0) * full_text_weight +
  coalesce(1.0 / (rrf_k + semantic.rank_ix), 0.0) * semantic_weight
  desc
limit
  least(match_count, 30)
$$;