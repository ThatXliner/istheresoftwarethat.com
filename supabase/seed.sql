-- Insert software data
INSERT INTO public.software (id, name, long_description, short_description, category, added_date, last_updated, compatibility, icon, links, tags, version, license, size, is_active) VALUES
    (1, 'VS Code', 'Visual Studio Code is a streamlined code editor with support for development operations like debugging, task running, and version control. It aims to provide just the tools a developer needs for a quick code-build-debug cycle and leaves more complex workflows to fuller featured IDEs, such as Visual Studio IDE.', 'Powerful, lightweight code editor with extensive extension support', 'Development', '2025-01-01T00:00:00Z', '2024-12-15T00:00:00Z', '{"windows": true, "macos": true, "linux": true, "web": true}', NULL, '{"website": "https://code.visualstudio.com", "github": "https://github.com/microsoft/vscode", "download": "https://code.visualstudio.com/download", "documentation": "https://code.visualstudio.com/docs"}', ARRAY['Editor', 'IDE', 'TypeScript', 'JavaScript', 'Git', 'Extensions'], '1.95.3', 'MIT', 89280512, true),
    
    (2, 'GIMP', 'GIMP is a cross-platform image editor available for GNU/Linux, macOS, and Windows. It is free software, you can change its source code and distribute your changes. Whether you are a graphic designer, photographer, illustrator, or scientist, GIMP provides you with sophisticated tools to get your job done.', 'Professional image editing software with advanced features', 'Design', '2025-01-01T00:00:00Z', '2024-11-20T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.gimp.org", "github": "https://gitlab.gnome.org/GNOME/gimp", "download": "https://www.gimp.org/downloads/", "documentation": "https://docs.gimp.org/"}', ARRAY['Image Editor', 'Graphics', 'Photo Editing', 'Design', 'Open Source'], '2.10.36', 'GPL v3', 209715200, true),
    
    (3, 'Blender', 'Blender is the free and open source 3D creation suite. It supports the entirety of the 3D pipeline—modeling, rigging, animation, simulation, rendering, compositing and motion tracking, video editing and 2D animation pipeline. Blender is a public project, made by hundreds of people from around the world; by studios and individual artists, professionals and hobbyists, scientists and students.', 'Professional 3D creation suite for modeling, animation, and rendering', 'Media', '2025-01-01T00:00:00Z', '2024-12-01T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.blender.org", "github": "https://github.com/blender/blender", "download": "https://www.blender.org/download/", "documentation": "https://docs.blender.org/"}', ARRAY['3D Modeling', 'Animation', 'Rendering', 'VFX', 'Game Development'], '4.0.2', 'GPL v3', 209715200, true),
    
    (4, 'LibreOffice', 'LibreOffice is a powerful and free office suite, used by millions of people around the world. Its clean interface and feature-rich tools help you unleash your creativity and enhance your productivity. LibreOffice includes several applications that make it the most versatile Free and Open Source office suite on the market.', 'Free and open source office suite alternative to Microsoft Office', 'Productivity', '2025-01-01T00:00:00Z', '2024-11-15T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://www.libreoffice.org", "github": "https://github.com/LibreOffice/core", "download": "https://www.libreoffice.org/download/", "documentation": "https://documentation.libreoffice.org/"}', ARRAY['Office Suite', 'Word Processor', 'Spreadsheet', 'Presentation', 'Database'], '7.6.4', 'Mozilla Public License v2.0', 367001600, true),
    
    (5, 'Obsidian', 'Obsidian is a powerful and extensible knowledge base that works on top of your local folder of plain text files. It lets you turn a collection of plain text files into a rich network of linked thought. Obsidian is designed to be your second brain - a place where you can store, link, and retrieve your thoughts and ideas.', 'Powerful knowledge management tool with linked notes and graph view', 'Productivity', '2025-01-02T00:00:00Z', '2024-12-10T00:00:00Z', '{"windows": true, "macos": true, "linux": true, "mobile": true}', NULL, '{"website": "https://obsidian.md", "download": "https://obsidian.md/download", "documentation": "https://help.obsidian.md/"}', ARRAY['Note Taking', 'Knowledge Management', 'Markdown', 'PKM', 'Zettelkasten'], '1.5.3', 'Proprietary (Free for personal use)', 419430400, true),
    
    (6, 'Figma', 'Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications for macOS and Windows. The feature set of Figma focuses on user interface and user experience design, with an emphasis on real-time collaboration, utilizing a variety of vector graphics editor and prototyping tools.', 'Collaborative interface design tool with real-time collaboration', 'Design', '2025-01-01T00:00:00Z', '2024-12-20T00:00:00Z', '{"windows": true, "macos": true, "linux": false, "web": true}', NULL, '{"website": "https://www.figma.com", "download": "https://www.figma.com/downloads/", "documentation": "https://help.figma.com/"}', ARRAY['UI Design', 'UX Design', 'Prototyping', 'Collaboration', 'Vector Graphics'], '116.16.8', 'Proprietary (Free tier available)', 125829120, true),
    
    (7, 'Discord', 'Discord is a VoIP and instant messaging social platform. Users have the ability to communicate with voice calls, video calls, text messaging, media and files in private chats or as part of communities called "servers". A server is a collection of persistent chat rooms and voice channels accessible via invite links.', 'Voice, video and text communication platform for communities', 'Communication', '2024-12-30T00:00:00Z', '2024-12-18T00:00:00Z', '{"windows": true, "macos": true, "linux": true, "mobile": true, "web": true}', NULL, '{"website": "https://discord.com", "download": "https://discord.com/download", "documentation": "https://support.discord.com/"}', ARRAY['Communication', 'Gaming', 'Voice Chat', 'Communities', 'Streaming'], '0.0.309', 'Proprietary (Free with premium features)', 188743680, true),
    
    (8, 'OBS Studio', 'OBS Studio is a free and open-source, cross-platform screencasting and streaming app. It is available for Windows, macOS and Linux distributions. OBS Project raises funds on Open Collective and Patreon. The software is also used for virtual webcam, recording, and live streaming.', 'Free and open source software for video recording and live streaming', 'Media', '2024-12-28T00:00:00Z', '2024-12-05T00:00:00Z', '{"windows": true, "macos": true, "linux": true}', NULL, '{"website": "https://obsproject.com", "github": "https://github.com/obsproject/obs-studio", "download": "https://obsproject.com/download", "documentation": "https://obsproject.com/wiki/"}', ARRAY['Streaming', 'Recording', 'Broadcasting', 'Video Production', 'Live Streaming'], '30.0.2', 'GPL v2', 157286400, true);

-- Insert tags
INSERT INTO public.tags (id, name) VALUES
    (1, 'Editor'), (2, 'IDE'), (3, 'TypeScript'), (4, 'JavaScript'), (5, 'Git'), (6, 'Extensions'),
    (7, 'Image Editor'), (8, 'Graphics'), (9, 'Photo Editing'), (10, 'Design'), (11, 'Open Source'),
    (12, '3D Modeling'), (13, 'Animation'), (14, 'Rendering'), (15, 'VFX'), (16, 'Game Development'),
    (17, 'Office Suite'), (18, 'Word Processor'), (19, 'Spreadsheet'), (20, 'Presentation'), (21, 'Database'),
    (22, 'Note Taking'), (23, 'Knowledge Management'), (24, 'Markdown'), (25, 'PKM'), (26, 'Zettelkasten'),
    (27, 'UI Design'), (28, 'UX Design'), (29, 'Prototyping'), (30, 'Collaboration'), (31, 'Vector Graphics'),
    (32, 'Communication'), (33, 'Gaming'), (34, 'Voice Chat'), (35, 'Communities'), (36, 'Streaming'),
    (37, 'Recording'), (38, 'Broadcasting'), (39, 'Video Production'), (40, 'Live Streaming');

-- Insert software_tags relationships
INSERT INTO public.software_tags (software_id, tag_id) VALUES
    -- VS Code tags
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
    -- GIMP tags
    (2, 7), (2, 8), (2, 9), (2, 10), (2, 11),
    -- Blender tags
    (3, 12), (3, 13), (3, 14), (3, 15), (3, 16),
    -- LibreOffice tags
    (4, 17), (4, 18), (4, 19), (4, 20), (4, 21),
    -- Obsidian tags
    (5, 22), (5, 23), (5, 24), (5, 25), (5, 26),
    -- Figma tags
    (6, 27), (6, 28), (6, 29), (6, 30), (6, 31),
    -- Discord tags
    (7, 32), (7, 33), (7, 34), (7, 35), (7, 36),
    -- OBS Studio tags
    (8, 36), (8, 37), (8, 38), (8, 39), (8, 40);

-- Insert software stats
INSERT INTO public.software_stats (software_id, downloads, github_stars, contributors, issues) VALUES
    (1, 50000000, 162000, 1900, 5200),
    (2, 30000000, 4200, 500, 2100),
    (3, 25000000, 12000, 800, 3500),
    (4, 200000000, 3800, 600, 1800),
    (5, 5000000, NULL, NULL, NULL),  -- Obsidian is proprietary
    (6, 15000000, NULL, NULL, NULL), -- Figma is proprietary
    (7, 150000000, NULL, NULL, NULL), -- Discord is proprietary
    (8, 8000000, 58000, 400, 2800);

-- Insert screenshots
INSERT INTO public.software_screenshots (software_id, url) VALUES
    (1, 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (1, 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (1, 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (2, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (2, 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (3, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (3, 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (4, 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (5, 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800'),
    (6, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (7, 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800'),
    (8, 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert features
INSERT INTO public.features (software_id, title, description, category) VALUES
    -- VS Code features
    (1, 'IntelliSense', 'Smart completions based on variable types, function definitions, and imported modules', 'Core'),
    (1, 'Debugging', 'Debug code right from the editor with breakpoints, call stacks, and an interactive console', 'Core'),
    (1, 'Built-in Git', 'Review diffs, stage files, and make commits right from the editor', 'Version Control'),
    (1, 'Extensions', 'Install extensions to add new languages, themes, debuggers, and connect to additional services', 'Extensibility'),
    (1, 'Integrated Terminal', 'Use your favorite shell whether it''s zsh, pwsh, or git bash, all inside the editor', 'Terminal'),
    (1, 'Multi-cursor Editing', 'Edit multiple lines at once with multiple cursors', 'Editing'),
    
    -- GIMP features
    (2, 'Advanced Photo Retouching', 'Restore old photographs or touch-up digital images with professional tools', 'Photo Editing'),
    (2, 'Layer System', 'Work with multiple layers for complex compositions and non-destructive editing', 'Core'),
    (2, 'Custom Brushes', 'Create and use custom brushes for unique artistic effects', 'Painting'),
    (2, 'Plugin Support', 'Extend functionality with third-party plugins and scripts', 'Extensibility'),
    
    -- Blender features
    (3, '3D Modeling', 'Create high-quality 3D assets with advanced modeling tools', 'Modeling'),
    (3, 'Animation Tools', 'Keyframe-based animation system with timeline and graph editors', 'Animation'),
    (3, 'Cycles Rendering', 'Physically-based path tracer for photorealistic rendering', 'Rendering'),
    (3, 'Sculpting', 'Digital sculpting tools for organic modeling', 'Modeling'),
    (3, 'Video Editing', 'Built-in video sequence editor for post-production', 'Video'),
    
    -- LibreOffice features
    (4, 'Writer', 'Robust word processor with advanced formatting and layout options', 'Word Processing'),
    (4, 'Calc', 'Spreadsheet program compatible with Excel files and formulas', 'Spreadsheet'),
    (4, 'Impress', 'Presentation software for creating engaging slideshows', 'Presentation'),
    (4, 'Base', 'Database management system for creating and managing databases', 'Database'),
    (4, 'Draw', 'Vector graphics editor for creating diagrams and illustrations', 'Graphics'),
    
    -- Obsidian features
    (5, 'Bidirectional Linking', 'Create connections between notes that update automatically', 'Core'),
    (5, 'Graph View', 'Visualize your knowledge network as an interactive graph', 'Visualization'),
    (5, 'Markdown Support', 'Full markdown editing with live preview and syntax highlighting', 'Editing'),
    (5, 'Plugin Ecosystem', 'Hundreds of community plugins to extend functionality', 'Extensibility'),
    (5, 'Canvas', 'Infinite canvas for visual note-taking and mind mapping', 'Visualization'),
    
    -- Figma features
    (6, 'Real-time Collaboration', 'Work with teammates simultaneously on the same design', 'Collaboration'),
    (6, 'Design Systems', 'Create and maintain consistent design systems with components', 'Design Systems'),
    (6, 'Prototyping', 'Create interactive prototypes with animations and transitions', 'Prototyping'),
    (6, 'Auto Layout', 'Responsive design with automatic spacing and sizing', 'Layout'),
    (6, 'Version History', 'Track changes and restore previous versions of your designs', 'Version Control'),
    
    -- Discord features
    (7, 'Voice Channels', 'High-quality voice communication with noise suppression', 'Communication'),
    (7, 'Screen Sharing', 'Share your screen or specific applications with others', 'Communication'),
    (7, 'Bot Integration', 'Custom automation and integrations with thousands of bots', 'Automation'),
    (7, 'Server Organization', 'Organize communities with channels, roles, and permissions', 'Organization'),
    (7, 'Nitro Features', 'Enhanced experience with higher quality streaming and file uploads', 'Premium'),
    
    -- OBS Studio features
    (8, 'Scene Composition', 'Mix multiple sources including video, audio, images, and text', 'Core'),
    (8, 'Real-time Filters', 'Apply filters and effects to sources in real-time', 'Effects'),
    (8, 'Streaming Integration', 'Stream directly to Twitch, YouTube, and other platforms', 'Streaming'),
    (8, 'Audio Mixer', 'Professional audio controls with per-source filters', 'Audio'),
    (8, 'Plugin System', 'Extend functionality with community-developed plugins', 'Extensibility');

-- Drop the foreign key (only for dev)
ALTER TABLE users DROP CONSTRAINT users_id_fkey;
-- -- Create random users
-- WITH RECURSIVE user_data AS (
--     SELECT 1 AS id, 'User1' AS username
--     UNION ALL
--     SELECT id + 1, 'User' || (id + 1)
--     FROM user_data
--     WHERE id < 300
-- )
-- INSERT INTO public.users (username)
-- SELECT username
-- FROM user_data;

-- Create sample users (if users table doesn't exist, this will be ignored)
INSERT INTO public.users (username) VALUES
    ('DevMaster2024'), ('CodeNinja'), ('WebDevPro'), ('DesignGuru'), ('BlenderArtist'),
    ('OfficeUser'), ('NoteGuru'), ('UIDesigner'), ('Gamer123'), ('Streamer2024'),
    ('PhotoEditor'), ('3DArtist'), ('ProductivityPro'), ('CreativeUser'), ('TechEnthusiast'),
    ('OpenSourceFan'), ('StudentDev'), ('FreelanceDesigner'), ('ContentCreator'), ('DigitalArtist')
ON CONFLICT (username) DO NOTHING;

-- Insert realistic reviews
-- Star + Comment reviews (is_upvote = NULL)
INSERT INTO public.reviews (software_id, username, date, comment, stars, helpful_count, is_upvote) VALUES
    -- VS Code reviews
    (1, 'DevMaster2024', '2024-12-10T10:00:00Z', 'Absolutely love VS Code! The extension ecosystem is incredible and it handles large codebases with ease. The integrated terminal and Git support make it my go-to editor.', 5, 24, NULL),
    (1, 'CodeNinja', '2024-12-08T15:30:00Z', 'Great editor but can be resource-heavy with too many extensions. The debugging features are top-notch though.', 4, 12, NULL),
    (1, 'WebDevPro', '2024-12-05T09:15:00Z', 'Perfect for web development. The live server extension and Emmet support make HTML/CSS development a breeze.', 5, 18, NULL),
    (1, 'StudentDev', '2024-12-03T14:20:00Z', 'Free and powerful. IntelliSense saves me so much time. Only wish it was a bit faster on older machines.', 4, 8, NULL),
    
    -- GIMP reviews
    (2, 'DesignGuru', '2024-12-12T11:00:00Z', 'Powerful alternative to Photoshop! Takes some time to learn the interface, but once you do, it''s incredibly capable.', 4, 15, NULL),
    (2, 'PhotoEditor', '2024-12-09T16:45:00Z', 'The layer system is robust and the price is unbeatable (free!). Some advanced features are harder to find than in commercial alternatives.', 4, 9, NULL),
    (2, 'CreativeUser', '2024-12-07T13:30:00Z', 'UI feels dated and can be confusing for beginners. But the functionality is there if you''re willing to learn.', 3, 6, NULL),
    
    -- Blender reviews
    (3, 'BlenderArtist', '2024-12-11T08:30:00Z', 'Mind-blowing what you can do with free software. The community and tutorials are amazing. Steep learning curve but worth it.', 5, 22, NULL),
    (3, '3DArtist', '2024-12-08T19:15:00Z', 'Professional-grade 3D suite that rivals expensive commercial software. Cycles renderer produces stunning results.', 5, 19, NULL),
    (3, 'TechEnthusiast', '2024-12-06T12:00:00Z', 'Incredibly powerful but overwhelming for beginners. The interface has improved a lot in recent versions though.', 4, 11, NULL),
    
    -- LibreOffice reviews
    (4, 'OfficeUser', '2024-12-10T14:30:00Z', 'Solid Microsoft Office alternative. Writer handles most documents well, though some advanced Excel features are missing in Calc.', 4, 13, NULL),
    (4, 'ProductivityPro', '2024-12-07T10:45:00Z', 'Great for basic office tasks and the price is right (free!). File compatibility with MS Office is mostly good but not perfect.', 4, 7, NULL),
    (4, 'StudentDev', '2024-12-05T16:20:00Z', 'Perfect for students and anyone who can''t afford Microsoft Office. Base database is surprisingly capable.', 4, 5, NULL),
    
    -- Obsidian reviews
    (5, 'NoteGuru', '2024-12-12T20:00:00Z', 'Revolutionary note-taking app. The graph view and linking system changed how I think about information. My second brain indeed!', 5, 28, NULL),
    (5, 'ProductivityPro', '2024-12-09T11:30:00Z', 'Powerful PKM tool but has a learning curve. The plugin ecosystem is fantastic. Local files give peace of mind.', 4, 16, NULL),
    (5, 'TechEnthusiast', '2024-12-06T15:45:00Z', 'Love the concept and execution. Sync between devices can be pricey though. Canvas feature is a game-changer.', 4, 12, NULL),
    
    -- Figma reviews
    (6, 'UIDesigner', '2024-12-11T09:00:00Z', 'Best collaborative design tool available. Real-time collaboration is seamless. Auto Layout saves hours of work.', 5, 31, NULL),
    (6, 'FreelanceDesigner', '2024-12-08T13:15:00Z', 'Excellent for UI/UX design. The component system and design tokens are well thought out. Can be slow with very large files.', 4, 18, NULL),
    (6, 'DesignGuru', '2024-12-05T17:30:00Z', 'Web-based approach is both a blessing and a curse. Great for collaboration, but dependent on internet connection.', 4, 14, NULL),
    
    -- Discord reviews
    (7, 'Gamer123', '2024-12-10T21:00:00Z', 'Essential for gaming communities. Voice quality is excellent and screen sharing works great. Nitro features are worth it.', 5, 42, NULL),
    (7, 'ContentCreator', '2024-12-08T18:45:00Z', 'Great for building communities around content. The bot ecosystem is incredible. Can be overwhelming with notifications.', 4, 25, NULL),
    (7, 'TechEnthusiast', '2024-12-06T14:20:00Z', 'Solid communication platform. Server organization tools are powerful. Privacy concerns with data collection though.', 3, 8, NULL),
    
    -- OBS Studio reviews
    (8, 'Streamer2024', '2024-12-12T16:30:00Z', 'Industry standard for streaming and recording. The scene system is incredibly flexible. Can be resource-intensive but worth it.', 5, 35, NULL),
    (8, 'ContentCreator', '2024-12-09T12:45:00Z', 'Powerful and free! The plugin ecosystem adds so much functionality. Learning curve is steep but tutorials help a lot.', 4, 23, NULL),
    (8, 'Gamer123', '2024-12-07T19:00:00Z', 'Perfect for recording gameplay. The filters and effects are professional-grade. Setup can be complex for beginners.', 4, 17, NULL);

-- Insert upvote/downvote only reviews (stars and comment = NULL)
INSERT INTO public.reviews (software_id, username, date, is_upvote, stars, comment, helpful_count) VALUES
    -- More upvotes
    (1, 'OpenSourceFan', '2024-12-11T08:00:00Z', true, NULL, NULL, NULL),
    (1, 'DigitalArtist', '2024-12-09T14:30:00Z', true, NULL, NULL, NULL),
    (1, 'CreativeUser', '2024-12-04T16:15:00Z', true, NULL, NULL, NULL),
    (2, 'TechEnthusiast', '2024-12-10T11:15:00Z', true, NULL, NULL, NULL),
    (2, 'FreelanceDesigner', '2024-12-08T09:30:00Z', false, NULL, NULL, NULL),
    (3, 'ContentCreator', '2024-12-07T13:20:00Z', true, NULL, NULL, NULL),
    (3, 'UIDesigner', '2024-12-05T17:45:00Z', true, NULL, NULL, NULL),
    (4, 'Gamer123', '2024-12-06T10:30:00Z', true, NULL, NULL, NULL),
    (4, 'Streamer2024', '2024-12-04T15:20:00Z', false, NULL, NULL, NULL),
    (5, 'DigitalArtist', '2024-12-05T17:45:00Z', true, NULL, NULL, NULL),
    (5, 'PhotoEditor', '2024-12-03T12:30:00Z', true, NULL, NULL, NULL),
    (6, 'OpenSourceFan', '2024-12-04T12:00:00Z', true, NULL, NULL, NULL),
    (6, 'BlenderArtist', '2024-12-02T18:45:00Z', true, NULL, NULL, NULL),
    (7, 'ProductivityPro', '2024-12-03T15:30:00Z', true, NULL, NULL, NULL),
    (7, 'NoteGuru', '2024-12-01T20:15:00Z', false, NULL, NULL, NULL),
    (8, 'UIDesigner', '2024-12-02T09:45:00Z', true, NULL, NULL, NULL),
    (8, '3DArtist', '2024-11-30T14:20:00Z', true, NULL, NULL, NULL);

-- -- Reset sequence counters
-- SELECT setval('public.software_id_seq', (SELECT MAX(id) FROM public.software));
-- SELECT setval('public.tags_id_seq', (SELECT MAX(id) FROM public.tags));
-- SELECT setval('public.features_id_seq', (SELECT MAX(id) FROM public.features));
-- SELECT setval('public.reviews_id_seq', (SELECT MAX(id) FROM public.reviews));
-- SELECT setval('public.software_screenshots_id_seq', (SELECT MAX(id) FROM public.software_screenshots));