
-- 1. Add the new 'other_details' jsonb column to the 'public.software' table.
--    It defaults to an empty JSON object to handle cases where no related data exists.
ALTER TABLE public.software
ADD COLUMN other_details jsonb NOT NULL DEFAULT '{}'::jsonb;

-- 2. Populate the 'other_details' column by aggregating data from 'software_screenshots',
--    'features', 'installation_instructions', and existing columns like 'links', 'icon',
--    'short_description', and 'long_description'.
WITH aggregated_data AS (
    SELECT
        s.id AS software_id,
        -- Aggregate screenshots into a JSON array, e.g., {"screenshots": ["url1", "url2"]}
        -- COALESCE ensures an empty array if no screenshots exist for a software_id.
        COALESCE(
            jsonb_build_object(
                'screenshots',
                (SELECT jsonb_agg(ss.url ORDER BY ss.id) FROM public.software_screenshots ss WHERE ss.software_id = s.id)
            ),
            '{}'::jsonb
        ) AS screenshots_json,
        -- Aggregate features into a JSON array of objects, e.g., {"features": [{"title": "t1", ...}]}
        -- COALESCE ensures an empty array if no features exist for a software_id.
        COALESCE(
            jsonb_build_object(
                'features',
                (SELECT jsonb_agg(jsonb_build_object('title', f.title, 'description', f.description, 'category', f.category) ORDER BY f.id) FROM public.features f WHERE f.software_id = s.id)
            ),
            '{}'::jsonb
        ) AS features_json,
        -- Directly embed installation instructions as a JSON object, e.g., {"installation_instructions": {"windows": "...", ...}}
        -- COALESCE ensures an empty object if no installation instructions exist for a software_id.
        COALESCE(
            jsonb_build_object(
                'installation_instructions',
                (SELECT jsonb_build_object('windows', ii.windows, 'macos', ii.macos, 'linux', ii.linux) FROM public.installation_instructions ii WHERE ii.software_id = s.id)
            ),
            '{}'::jsonb
        ) AS installation_json,
        -- Include existing software table columns into the JSONB object
        jsonb_build_object(
            'links', s.links,
            'icon', s.icon,
            'short_description', s.short_description,
            'long_description', s.long_description
        ) AS existing_columns_json
    FROM
        public.software s
)
UPDATE public.software AS s_main
SET
    -- Concatenate all the JSON objects for screenshots, features, installation instructions,
    -- and the previously existing columns.
    -- The '||' operator for jsonb merges the top-level keys.
    other_details = ad.screenshots_json || ad.features_json || ad.installation_json || ad.existing_columns_json
FROM
    aggregated_data AS ad
WHERE
    s_main.id = ad.software_id;

-- 3. Drop the original tables.
--    'IF EXISTS' prevents errors if the tables have already been dropped.
--    Foreign key constraints referencing these tables will be automatically dropped.
DROP TABLE IF EXISTS public.software_screenshots;
DROP TABLE IF EXISTS public.features;
DROP TABLE IF EXISTS public.installation_instructions;

-- 4. Drop the original columns from the 'public.software' table.
ALTER TABLE public.software
DROP COLUMN IF EXISTS links,
DROP COLUMN IF EXISTS icon,
DROP COLUMN IF EXISTS short_description,
DROP COLUMN IF EXISTS long_description;