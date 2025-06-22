import { softwareSchema } from "@/lib/components/common/data";
import Client from "./Client";
import { createClient } from "@/lib/supabase/server";
import { getSoftwareList } from "@/lib/queries";

export default async function Page() {
  const client = await createClient();
  const { data: software, error } = await getSoftwareList(client);
  if (error) {
    throw error;
  }

  // Awaiting here would implicitly suspend the component (so we don't need create our own <Suspense> wrapper)
  return <Client initialData={softwareSchema.array().parse(software)} />;
}
