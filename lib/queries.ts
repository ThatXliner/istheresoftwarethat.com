import type { SupabaseClient } from "@supabase/supabase-js";

export function getSoftwareList(client: SupabaseClient) {
  return client
    .from("software")
    .select(
      "name, description, icon, id, added_date, category, compatibility, reviews (username, date, comment, helpful_count, is_upvote, stars)",
    );
}
