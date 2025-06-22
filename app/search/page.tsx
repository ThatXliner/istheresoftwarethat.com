import { softwareSchema } from "@/lib/components/common/data";
import Client from "./Client";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: software, error } = await supabase.from("software").select("*");
  if (error) {
    throw error;
  }
  console.log(software);

  // Awaiting here would implicitly suspend the component (so we don't need create our own <Suspense> wrapper)
  return <Client initialData={softwareSchema.array().parse(software)} />;
}
