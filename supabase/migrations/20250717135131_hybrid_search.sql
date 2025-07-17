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
  licenses text[] default '{}'::text[],
  categories text[] default '{}'::text[],
  platforms text[] default '{}'::text[],
  offset_amount int = 0,
  full_text_weight float = 1,
  semantic_weight float = 1,
  rrf_k int = 50
)
-- Such a waste bruh
returns setof "public"."software_summary"
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
    -- "public"."software_summary"
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
    -- "public"."software_summary"
  order by rank_ix
  limit least(match_count, 30) * 2
)
select software_summary.*
from software_summary
LEFT JOIN full_text ON software_summary.id = full_text.id
LEFT JOIN semantic ON software_summary.id = semantic.id
WHERE
  coalesce(full_text.id, semantic.id) = software_summary.id
  and (array_length(licenses, 1) is null or software_summary.license = any(licenses))
  and (array_length(categories, 1) is null or software_summary.category = any(categories))
  and (array_length(platforms, 1) is null or software_summary.compatibility @> platforms)
-- GROUP BY
--     software_summary.id
ORDER BY
  coalesce(1.0 / (rrf_k + full_text.rank_ix), 0.0) * full_text_weight +
  coalesce(1.0 / (rrf_k + semantic.rank_ix), 0.0) * semantic_weight
  desc
LIMIT
  least(match_count, 30) OFFSET offset_amount;
$$;

