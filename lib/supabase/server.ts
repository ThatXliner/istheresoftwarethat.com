import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { initializeServerTrust } from "@/lib/server/emudhra-trust.mjs";
import type { Database } from "./types";

export async function createClient() {
  initializeServerTrust();
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // Session renewal is persisted by the Node /auth/session handler
            // before middleware allows an expiring browser session to render.
          }
        },
      },
    },
  );
}
