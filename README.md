# IsthereSoftwareThat.Com

## Inspiration

The inspiration behind *IsThereSoftwareThat.com* came from my frustrations with existing software catalogs like ProductHunt and SourceForge. While they aim to help users discover software, I’ve found that most listings are either obscure, low-quality, or not actually free. Ironically, some of the best tools I’ve used have come from Reddit threads or friend recommendations. These sources that have no monetary incentive and thus feel more authentic.

I wanted to build a platform that captures that same trust and quality, but with the discoverability of a search engine.

## What it does

*IsThereSoftwareThat.com* is a software discovery engine that uses AI semantic search to help users find the tools they need,faster and with higher relevance. Instead of relying on keywords or popularity contests, users describe what they’re looking for, and istheresoftwarethat.com finds the most relevant software.

The long-term vision includes a hybrid rating system that blends upvotes and star reviews to surface high-quality tools while minimizing spam and low-effort submissions. This system wasn't fully implemented due to time constraints, but it’s a core part of the roadmap.

## How we built it

I used [bolt.new](https://bolt.new) to generate the initial layout, page structure, and design for each part of the site. Then I connected the frontend to Supabase for data storage. For fetching and caching, I integrated the Next.js app with TanStack Query, though I ended up writing most of the state logic and database queries manually; Bolt's code generation was helpful for structure, but I don’t yet trust AI to handle production-grade data logic or state management.

The semantic search is powered by an embedding-based matching system, allowing for flexible, natural-language queries rather than rigid tags or categories.

## Challenges we ran into

One of the first roadblocks was that Bolt didn’t scaffold the project with Next.js, which I prefer for its routing, server components, and developer experience. Refactoring the project to Next.js took some initial time.

I also ran into a tricky caching issue in TanStack Query that was affecting search results in unexpected ways. It took several hours to realize it wasn’t my filtering logic but the caching layer that was causing the bugs.

## Accomplishments that we're proud of

Despite time limitations, I’m proud of the polish and usability of the final product. The core features — search, semantic relevance, and catalog browsing — are fully functional, and the interface is clean and intuitive. It feels like something you’d actually want to use, not just a weekend prototype.

## What we learned

This project completely changed my perception of AI-assisted development. I’ve used tools like Cursor before, but this hackathon made me realize how powerful modern agentic AI tools have become. Designing a UI with Bolt felt like sketching with code — fast, iterative, and surprisingly usable.

At the same time, it reminded me of the limits of current AI tools. While they’re great for scaffolding and ideation, critical logic should still be handwritten; I've found that the AI sometimes generates unnecessarily verbose or awkward code.

## What's next for IsThereSoftwareThat.com

With search being increasingly replaced by AI (not to mention increasingly being filled with ads and irrelevant content), specific, higher-quality aveneues are needed for users to effectively find relevant products. Google is overrun with SEO spam, ChatGPT's research is slow and potentially outdated, favoring old popular solutions than what's actually the most beneficial for the user.

While istheresoftware.com aims to catalog free and open source software for now, I plan to allow the incorporation of paid software under a hefty price and a strict curation policy (e.g. there must be an option for one-time purchase of the software so customers can actually own their products).

I envision istheresoftware.com to mark a revolution in how business market their products. Today we're changing how users discover software. Tomorrow, we're changing the world of marketing. What else can benefit from a more usable, precise, and efficient mechansim to connect potential customers to businesses, all the while benefiting both sides? The possiblities are endless.

Next steps include:
- Implementing the star–upvote hybrid rating system to balance quantitative and qualitative feedback.
- Automatic syncing of software information and versions (via scraping or APIs).
- Submission flows (allow anyone to submit software) with smart validation to reduce spam and automatic sync
- Support for direct downloads, version tracking, and potentially self-hosted mirrors.
- Paid software support