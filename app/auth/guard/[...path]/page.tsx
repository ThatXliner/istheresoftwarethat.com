import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export default async function Guard({
  searchParams,
  params,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ path: string[] }>;
}) {
  const client = await createClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (!user) {
    const query = new URLSearchParams();
    for (const [name, values] of Object.entries(await searchParams)) {
      if (Array.isArray(values))
        values.forEach((value) => query.append(name, value));
      else if (values !== undefined) query.append(name, values);
    }
    if (
      error &&
      error.name !== "AuthSessionMissingError" &&
      (!error.status || error.status >= 500 || error.status === 429)
    ) {
      const path = (await params).path.map(encodeURIComponent).join("/");
      const next = `/${path}${query.size ? `?${query}` : ""}`;
      redirect(`/auth/session?${new URLSearchParams({ next })}`);
    }
    redirect(`/login${query.size ? `?${query}` : ""}`);
  }
  notFound();
}
