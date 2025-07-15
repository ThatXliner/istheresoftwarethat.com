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

async function updateEmbeddings() {
  // Fetch all rows from software_summary view
  const { data: rows, error } = await supabase
    .from("software_summary")
    .select("id, name, category, description");

  if (error) {
    console.error("Error fetching rows:", error);
    return;
  }

  console.log(`Processing ${rows.length} rows...`);

  for (const row of rows) {
    // Combine relevant fields into a single text
    const combinedText =
      `# ${row.name}\n\nCategory: ${row.category}\n\nDescription: ${row.description}`.trim();

    try {
      // Generate embedding
      const embedding = await generateEmbedding(combinedText);

      // Update the software table with the new embedding
      const { error: updateError } = await supabase
        .from("software")
        .update({ embedding })
        .eq("id", row.id);

      if (updateError) {
        console.error(`Error updating row ${row.id}:`, updateError);
      } else {
        console.log(`Updated embedding for row ${row.id}`);
      }
    } catch (error) {
      console.error(`Error processing row ${row.id}:`, error);
    }
  }
}

// Run the script
updateEmbeddings()
  .then(() => console.log("Finished updating embeddings"))
  .catch((error) => console.error("Error:", error));
