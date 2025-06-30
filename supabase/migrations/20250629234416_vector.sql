create extension vector
with
  schema extensions;

alter table "public"."software" add column "embeddings" vector;
-- alter table "public"."software" add column "fts" tsvector generated always as (
--   to_tsvector('english', coalesce(name, '')||coalesce(other_details->>'short_description', ''))
-- ) stored;

alter table "public"."software" add column "fts" tsvector;

-- Necessary since we're using array_to_strings on the tags
-- (otherwise we could just add "generated" to the statement above)
CREATE OR REPLACE FUNCTION update_software_fts()
RETURNS trigger AS $$
BEGIN
  NEW.fts := to_tsvector('english',
    coalesce(NEW.name, '') || ' ' ||
    coalesce(array_to_string(NEW.tags, ' '), '') || ' ' ||
    coalesce(NEW.other_details->>'short_description', '')
  );
  RETURN NEW;
END
$$ LANGUAGE plpgsql IMMUTABLE; -- ← NOTE: this must NOT be IMMUTABLE, remove if error

CREATE TRIGGER trg_update_software_fts
BEFORE INSERT OR UPDATE ON public.software
FOR EACH ROW
EXECUTE FUNCTION update_software_fts();

CREATE INDEX software_fts_idx
ON "public"."software"
USING GIN ("fts");

DROP VIEW public.software_summary;
-- Create a new view named 'software_summary'
-- This view aggregates data from the 'public.software' and 'public.reviews' tables
-- to provide a concise summary for each software entry.
CREATE OR REPLACE VIEW public.software_summary AS
SELECT
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
    (
      SELECT
        array_agg(key)
      FROM
        jsonb_each_text(s.compatibility)
      WHERE
        value = 'true'
    ) AS compatibility,
    s.version AS version, -- The version of the software
    s.license AS license, -- The license of the software
    s.tags AS tags, -- The tags associated with the software
    s.fts AS fts, -- Keep fts
    -- Count the total number of upvotes for each software.
    -- We filter reviews where 'is_upvote' is true, and then use COUNT() to get the total.
    -- COALESCE is used to ensure that if a software has no upvotes, it displays 0 instead of NULL.
    COALESCE(SUM(CASE WHEN r.is_upvote = TRUE THEN 1 WHEN r.is_upvote = FALSE THEN -1 ELSE 0 END), 0) AS upvotes
    -- COALESCE(SUM(1), 0) AS reviews
FROM
    public.software AS s
LEFT JOIN
    public.reviews AS r ON s.id = r.software_id
GROUP BY
    s.id;
