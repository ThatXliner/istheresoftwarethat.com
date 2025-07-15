import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";

import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
// OPENAI DOES NOT CACHE EMBEDDING GENERATION
async function generateEmbedding(text: string) {
  // 'embedding' is a single embedding object (number[])
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });
  return embedding;
  // const response = await openai.createEmbedding({
  //   model: "text-embedding-ada-002",
  //   input: text,
  // });
  // return response.data.data[0].embedding;
}
async function main() {
  const text = "I want an app that will let me code with other people";
  const embedding = await generateEmbedding(text);
  const { data: documents } = await supabase.rpc("match_documents", {
    query_embedding: embedding, // pass the query embedding
    match_threshold: 0.78, // choose an appropriate threshold for your data
    match_count: 3, // choose the number of matches
  });
  console.log(
    "Matched documents:",
    documents.map((doc) => doc.name),
  );
}
main().catch((error) => {
  console.error("Error:", error);
});
