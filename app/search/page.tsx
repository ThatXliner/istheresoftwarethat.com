import { softwareSchema } from "@/lib/components/common/data";
import Client from "./Client";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: software, error } = await supabase
    .from("software")
    .select(
      "name, description, id, added_date, category, compatibility, reviews (username, date, comment, helpful_count, is_upvote, stars)",
    );
  if (error) {
    throw error;
  }

  // Awaiting here would implicitly suspend the component (so we don't need create our own <Suspense> wrapper)
  return <Client initialData={softwareSchema.array().parse(software)} />;
}
