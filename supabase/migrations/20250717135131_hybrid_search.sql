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
),
software_with_platforms as (
  select s.*, 
    (SELECT array_agg(key) FROM jsonb_each_text(s.compatibility) WHERE value = 'true') as platform_array
  from public.software s
)
select
-- Copy+pasted from the software_summary view definition
    s.id AS id, -- Include software ID for unique identification, though not explicitly requested, it's good practice
    s.name AS name, -- The name of the software
    s.category AS category, -- The category of the software
    -- Extract the 'short_description' from the 'other_details' JSONB column.
    -- The '->>' operator extracts a JSON field as text.
    s.other_details->>'short_description' AS description,
    -- Extract the 'icon' from the 'other_details' JSONB column.
    s.other_details->>'icon' AS icon,
    s.added_date AS added_date, -- The date the software was added
    -- Subquery to extract keys from the compatibility JSONB where the value is true.
    -- It iterates over each key-value pair in the JSONB object,
    -- filters for pairs where the value is 'true', and aggregates the keys into an array.
    s.platform_array AS compatibility,
    s.version AS version, -- The version of the software
    s.license AS license, -- The license of the software
    s.tags AS tags, -- The tags associated with the software
    -- Count the total number of upvotes for each software.
    -- We filter reviews where 'is_upvote' is true, and then use COUNT() to get the total.
    -- COALESCE is used to ensure that if a software has no upvotes, it displays 0 instead of NULL.
    COALESCE(SUM(CASE WHEN r.is_upvote = TRUE THEN 1 WHEN r.is_upvote = FALSE THEN -1 ELSE 0 END), 0) AS upvotes
    -- COALESCE(SUM(1), 0) AS reviews
from
software_with_platforms AS s
LEFT JOIN public.reviews AS r ON s.id = r.software_id
LEFT JOIN full_text ON s.id = full_text.id
LEFT JOIN semantic ON s.id = semantic.id
WHERE
  coalesce(full_text.id, semantic.id) = s.id
  and (array_length(licenses, 1) is null or s.license = any(licenses))
  and (array_length(categories, 1) is null or s.category = any(categories))
  and (array_length(platforms, 1) is null or s.platform_array @> platforms)
GROUP BY
    s.id, s.name, s.category, s.other_details, s.added_date, s.platform_array, s.version, s.license, s.tags, full_text.rank_ix, semantic.rank_ix
ORDER BY
  coalesce(1.0 / (rrf_k + full_text.rank_ix), 0.0) * full_text_weight +
  coalesce(1.0 / (rrf_k + semantic.rank_ix), 0.0) * semantic_weight
  desc
LIMIT
  least(match_count, 30) OFFSET offset_amount;
$$;