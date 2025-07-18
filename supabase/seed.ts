import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import { type Embedding, embed, embedMany } from "ai";
import dotenv from "dotenv";
import fs from "fs";
import { z } from "zod";
import type { Database } from "../lib/supabase/types";

// Load environment variables
dotenv.config();

// Validate environment variables
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
});

const env = envSchema.parse(process.env);

// Initialize Supabase client
const supabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

function zip<T extends unknown[][]>(
  ...arrays: T
): Array<{ [K in keyof T]: T[K][number] }> {
  const minLength = Math.min(...arrays.map((arr) => arr.length));
  return Array.from(
    { length: minLength },
    (_, i) => arrays.map((arr) => arr[i]) as { [K in keyof T]: T[K][number] },
  );
}
const smolSoftwareSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  long_description: z.string(),
  short_description: z.string(),
});

async function generateEmbeddings() {
  // Fetch all rows from software table
  const { data, error } = await supabase
    .from("software")
    .select(
      "id, name, category, other_details->long_description, other_details->short_description",
    )
    .is("embedding", null); // Only process rows without embeddings

  if (error) {
    throw error;
  }
  const softwareRows = smolSoftwareSchema.array().parse(data);
  console.log(
    `Generating embeddings for ${softwareRows.length} software rows...`,
  );

  return zip(
    softwareRows.map((row) => row.id),
    (
      await embedMany({
        model: openai.embedding("text-embedding-3-small"),
        values: softwareRows.map((row) => {
          return `# ${row.name}\n\n> ${row.short_description}\n\nCategory: ${row.category}\n\n${row.long_description}`;
        }),
      })
    ).embeddings,
  );
}
async function sanityCheck() {
  const QUERY = "I want to text my friends";
  const CACHE_FILE = ".test-cache.json";
  let embedding: Embedding;
  try {
    if (fs.existsSync(CACHE_FILE)) {
      console.log(`Loading embeddings from cache: ${CACHE_FILE}`);
      embedding = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    } else {
      embedding = (
        await embed({
          model: openai.embedding("text-embedding-3-small"),
          value: QUERY,
        })
      ).embedding;
      fs.writeFileSync(CACHE_FILE, JSON.stringify(embedding));
    }
  } catch (error) {
    throw error;
  }
  const { data, error } = await supabase.rpc("hybrid_search", {
    query_text: QUERY,
    query_embedding: embedding,
    // licenses: filters.licenses.length > 0 ? filters.licenses : undefined,
    // categories: filters.categories.length > 0 ? filters.categories : undefined,
    // platforms: filters.platforms.length > 0 ? filters.platforms : undefined,
    offset_amount: 0, // TODO: implement pagination
    match_count: 10,
  });
  if (error) {
    throw error;
  }
  console.log("Sanity check results:", data);
}
async function main() {
  const CACHE_FILE = ".embedding-cache.json";
  let embeddings: [number, Embedding][] = [];

  // Load cache from file if it exists
  try {
    if (fs.existsSync(CACHE_FILE)) {
      console.log(`Loading embeddings from cache: ${CACHE_FILE}`);
      embeddings = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    } else {
      embeddings = await generateEmbeddings();
      fs.writeFileSync(CACHE_FILE, JSON.stringify(embeddings));
    }
  } catch (error) {
    console.error("Error loading cache:", error);
  }
  console.log(`Updating ${embeddings.length} rows...`);
  await Promise.all(
    embeddings.map(([id, embedding]) =>
      supabase.from("software").update({ embedding }).eq("id", id),
    ),
  );
  console.log("Done!");
  await sanityCheck();
}
// Run the script
main().catch(console.error);
