import { Suspense } from "react";
import DetailsComponent from "../DetailsComponent";
import { createClient } from "@/lib/supabase/server";
import { softwareSchema } from "@/lib/components/common/data";

export default async function SoftwareDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await createClient();
  const { data: software, error } = client
    .from("software")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">
              Loading software details...
            </p>
          </div>
        </div>
      }
    >
      <DetailsComponent software={softwareSchema.parse(software)} />
    </Suspense>
  );
}
