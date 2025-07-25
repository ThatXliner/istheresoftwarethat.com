-- === 1. Update existing software table ===

ALTER TABLE public.software
  RENAME COLUMN description TO long_description;

ALTER TABLE public.software
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS last_updated timestamp with time zone,
  ADD COLUMN IF NOT EXISTS tags text[],
  ADD COLUMN IF NOT EXISTS version text,
  ADD COLUMN IF NOT EXISTS license text,
  ADD COLUMN IF NOT EXISTS size bigint,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- === 2. Update existing features table ===

ALTER TABLE public.features
  ADD COLUMN IF NOT EXISTS category text;

-- === 3. New table: software_screenshots ===

CREATE TABLE IF NOT EXISTS public.software_screenshots (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  software_id bigint NOT NULL,
  url text NOT NULL,
  CONSTRAINT fk_screenshots_software FOREIGN KEY (software_id)
    REFERENCES public.software (id) ON DELETE CASCADE
);

-- === 4. New table: software_stats (as specified) ===

CREATE TABLE IF NOT EXISTS public.software_stats (
  software_id bigint PRIMARY KEY,
  downloads integer NOT NULL,
  github_stars integer,
  contributors integer,
  issues integer,
  CONSTRAINT fk_stats_software FOREIGN KEY (software_id)
    REFERENCES public.software (id) ON DELETE CASCADE
);

-- === 5. Normalized tags ===

CREATE TABLE IF NOT EXISTS public.tags (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.software_tags (
  software_id bigint NOT NULL,
  tag_id bigint NOT NULL,
  PRIMARY KEY (software_id, tag_id),
  FOREIGN KEY (software_id) REFERENCES public.software (id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES public.tags (id) ON DELETE CASCADE
);