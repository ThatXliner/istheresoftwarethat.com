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
