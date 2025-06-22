INSERT INTO public.software (id, name, description, category, added_date, compatibility, icon, links) VALUES
    (1, 'VS Code', 'can edit code with powerful extensions and Git integration', 'Development', '2025-01-01T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://code.visualstudio.com"}'),
    (2, 'GIMP', 'can edit images professionally', 'Design', '2025-01-01T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.gimp.org"}'),
    (3, 'Blender', 'can create 3D models, animations, and renders', 'Media', '2025-01-01T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.blender.org"}'),
    (4, 'LibreOffice', 'can replace Microsoft Office', 'Productivity', '2025-01-01T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.libreoffice.org"}'),
    (5, 'Obsidian', 'can help manage knowledge with linked notes', 'Productivity', '2025-01-02T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://obsidian.md"}'),
    (6, 'Figma', 'can design interfaces collaboratively', 'Design', '2025-01-01T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.figma.com"}'),
    (7, 'Discord', 'can help me chat and hang out with my communities', 'Communication', '2024-12-30T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://discord.com"}'),
    (8, 'OBS Studio', 'can record my screen and stream live', 'Media', '2024-12-28T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://obsproject.com"}');
   
INSERT INTO public.installation_instructions (software_id, windows, macos, linux) VALUES
    (1, 'Download from https://code.visualstudio.com and run the installer.', 'Install via Homebrew: brew install --cask visual-studio-code', 'Use Snap: sudo snap install code --classic'),
    (2, 'Download the installer from gimp.org.', 'Use Homebrew: brew install --cask gimp', 'Use apt: sudo apt install gimp'),
    (3, 'Download the Blender installer from blender.org.', 'Install via Homebrew: brew install --cask blender', 'Use Snap: sudo snap install blender --classic'),
    (4, 'Install from libreoffice.org or use Chocolatey.', 'Install via Homebrew: brew install --cask libreoffice', 'Use apt: sudo apt install libreoffice'),
    (5, 'Download from obsidian.md.', 'Install with Homebrew: brew install --cask obsidian', 'Download .AppImage from official site and chmod +x'),
    (6, 'Figma is web-based. Use the desktop app if desired.', 'Download desktop app from figma.com/downloads', 'Use as a web app'),
    (7, 'Download from discord.com or install via Chocolatey.', 'Use brew install --cask discord', 'Use apt: sudo apt install discord'),
    (8, 'Download from obsproject.com and run installer.', 'Use Homebrew: brew install --cask obs', 'Use apt: sudo apt install obs-studio');
-- INSERT INTO public.reviews (software_id, username, date, comment, is_upvote) VALUES
--     (1, 'alice', '2025-01-03T10:00:00Z', 'Best editor ever. Love the extensions!', true),
--     (1, 'bob', '2025-01-04T15:30:00Z', 'Crashes sometimes, but otherwise great.', false),
--     (2, 'carol', '2025-01-03T12:00:00Z', 'Free Photoshop? Yes please.', true),
--     (2, 'dave', '2025-01-05T09:00:00Z', 'UI is a bit clunky.', false),
--     (3, 'eve', '2025-01-06T13:45:00Z', 'Great for 3D modeling!', true),
--     (3, 'frank', '2025-01-07T08:20:00Z', 'Takes time to learn.', false),
--     (4, 'grace', '2025-01-02T11:30:00Z', 'Perfect for document editing.', true),
--     (4, 'heidi', '2025-01-03T14:00:00Z', 'A bit outdated compared to Microsoft Office.', false),
--     (5, 'ivan', '2025-01-04T17:15:00Z', 'My second brain!', true),
--     (5, 'judy', '2025-01-05T19:00:00Z', 'Sync is buggy sometimes.', false),
--     (6, 'kyle', '2025-01-06T08:00:00Z', 'Awesome for team design.', true),
--     (6, 'laura', '2025-01-07T10:45:00Z', 'Expensive paid tiers.', false),
--     (7, 'mallory', '2025-01-03T09:00:00Z', 'Perfect for hanging out with friends.', true),
--     (7, 'nick', '2025-01-04T13:30:00Z', 'Memory hog.', false),
--     (8, 'olivia', '2025-01-05T15:00:00Z', 'Flawless for streaming.', true),
--     (8, 'peter', '2025-01-06T18:20:00Z', 'Complicated to set up at first.', false);
INSERT INTO public.features (software_id, title, description) VALUES
    (1, 'Extension Marketplace', 'Customize your editor with thousands of extensions.'),
    (1, 'Git Integration', 'Built-in version control support.'),
    (2, 'Layer Support', 'Advanced image layer manipulation.'),
    (2, 'Custom Brushes', 'Use or create brushes for complex edits.'),
    (3, '3D Modeling', 'Create high-quality 3D assets.'),
    (3, 'Animation Tools', 'Keyframe-based animation system.'),
    (4, 'Writer', 'Robust word processor.'),
    (4, 'Calc', 'Spreadsheet program compatible with Excel.'),
    (5, 'Linking', 'Bidirectional linking between notes.'),
    (5, 'Markdown Support', 'Full markdown editing experience.'),
    (6, 'Live Collaboration', 'Work with teammates in real time.'),
    (6, 'Design Systems', 'Reusable components and styles.'),
    (7, 'Voice Channels', 'Low-latency voice communication.'),
    (7, 'Bot Support', 'Custom automation and integrations.'),
    (8, 'Scene Composition', 'Mix audio, video, and images in scenes.'),
    (8, 'Streaming Integration', 'Stream to Twitch and YouTube with ease.');
-- Drop the foreign key (only for dev)
ALTER TABLE users DROP CONSTRAINT users_id_fkey;
-- Create random users
WITH RECURSIVE user_data AS (
    SELECT 1 AS id, 'User1' AS username
    UNION ALL
    SELECT id + 1, 'User' || (id + 1)
    FROM user_data
    WHERE id < 300
)
INSERT INTO public.users (username)
SELECT username
FROM user_data;


WITH random_reviews AS (
    SELECT
        s.id AS software_id,
        u.username,
        NOW() - (interval '1 day' * (random() * 365)) AS date,
        -- Generate one random value to choose mode per row
        random() AS mode_selector,
        random() AS upvote_selector
    FROM
        public.software s,
        public.users u
    WHERE
        random() < 0.2 -- Limit number of reviews
)
INSERT INTO public.reviews (software_id, username, date, comment, helpful_count, stars, is_upvote)
SELECT
    software_id,
    username,
    date,
    CASE 
        WHEN mode_selector < 0.5 THEN
            (ARRAY['Great software!', 'Needs improvement.', 'Highly recommended!', 'Not user-friendly.', 'Excellent features!', 'Buggy at times.', 'Worth the price.', 'Free and amazing!'])[floor(random() * 8 + 1)]
        ELSE NULL
    END AS comment,
    CASE 
        WHEN mode_selector < 0.5 THEN floor(random() * 100)
        ELSE NULL
    END AS helpful_count,
    CASE 
        WHEN mode_selector < 0.5 THEN floor(random() * 5 + 1)
        ELSE NULL
    END AS stars,
    CASE 
        WHEN mode_selector >= 0.5 THEN upvote_selector < 0.7
        ELSE NULL
    END AS is_upvote
FROM random_reviews;