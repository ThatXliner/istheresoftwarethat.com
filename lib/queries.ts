import type { SupabaseClient } from "@supabase/supabase-js";

export function getSoftwareList(client: SupabaseClient) {
  return client.from("software_summary").select("*");
}
