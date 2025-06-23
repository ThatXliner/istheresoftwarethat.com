import type { SupabaseClient } from "@supabase/supabase-js";
import * as z from "zod/v4";
import {
  reviewSchema,
  type Software,
  softwareSchema,
  statsSchema,
} from "@/lib/components/common/data";
// Lowk this is some bad, AI-generated slop code but it works
/**
 * Fetches software data from Supabase by ID, including its associated reviews,
 * and validates the combined data against the softwareSchema.
 * @param softwareId The ID of the software to fetch.
 * @returns A Promise that resolves to a Software object if found and valid, otherwise null.
 */
export async function fetchSoftwareById(
  supabase: SupabaseClient,
  softwareId: number,
): Promise<Software | null> {
  try {
    // 1. Fetch main software data
    const { data: softwareData, error: softwareError } = await supabase
      .from("software")
      .select(
        "id, name, category, added_date, last_updated, compatibility, tags, version, license, size, other_details",
      )
      .eq("id", softwareId)
      .single();

    if (softwareError) {
      console.error("Supabase software fetch error:", softwareError.message);
      return null;
    }

    if (!softwareData) {
      console.warn(`No software found with ID: ${softwareId}`);
      return null;
    }

    // 2. Fetch associated reviews for the software
    const { data: reviewsData, error: reviewsError } = await supabase
      .from("reviews")
      .select("username, date, comment, is_upvote, helpful_count, stars")
      .eq("software_id", softwareId)
      .order("date", { ascending: false }); // Order reviews by date, newest first

    if (reviewsError) {
      console.error("Supabase reviews fetch error:", reviewsError.message);
      // Decide if you want to return null or proceed with software data but no reviews
      // For now, we'll return null if reviews fetch fails significantly.
      return null;
    }

    const { data: statsData, error: statsError } = await supabase
      .from("software_stats")
      .select("*")
      .eq("software_id", softwareId)
      .single();
    if (statsError) {
      console.error("Supabase software stats fetch error:", statsError.message);
      return null;
    }

    // 3. Combine fetched data into a single object conforming to softwareSchema's expected input
    // First, validate each review individually to ensure proper type inference for the discriminated union
    const parsedReviews = reviewsData
      ? reviewsData
          .map((review) => {
            // Preprocessing is handled by the reviewSchema's preprocess method,
            // which sets the 'type' field based on 'is_upvote'.
            try {
              return reviewSchema.parse(review);
            } catch (reviewParseError) {
              console.error(
                "Zod validation error for a review:",
                reviewParseError,
              );
              // If a single review fails, you might choose to skip it or re-throw
              return null;
            }
          })
          .filter(Boolean)
      : []; // Filter out any nulls if review parsing failed for some

    const parsedStats = statsSchema.parse(statsData);

    const combinedData = {
      ...softwareData,
      stats: parsedStats,
      reviews: parsedReviews, // Attach the fetched and parsed reviews
    };
    // 4. Validate and transform the combined data using the main software schema
    const parsedSoftware = softwareSchema.parse(combinedData);

    return parsedSoftware;
  } catch (parseError) {
    // Handle Zod parsing errors or other unexpected errors
    if (parseError instanceof z.ZodError) {
      console.error(
        "Zod validation error during combined software data parsing:",
        parseError.message,
      );
      // You might want to log more details or re-throw a custom error here
    } else {
      console.error("An unexpected error occurred:", parseError);
    }
    return null;
  }
}
