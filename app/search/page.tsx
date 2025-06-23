import { catalogSummarySchema } from "@/lib/components/common/data";
import { getSoftwareList } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import Client from "./Client";

export default async function Page() {
  const client = await createClient();
  const { data: software, error } = await getSoftwareList(client);
  if (error) {
    throw error;
  }

  // Awaiting here would implicitly suspend the component (so we don't need create our own <Suspense> wrapper)
  return <Client initialData={catalogSummarySchema.parse(software)} />;
}
