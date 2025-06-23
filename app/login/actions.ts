"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(redirectTo: string | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const client = await createClient();

  const { error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const redirectURL = new URL((await headers()).get("origin")!);
    redirectURL.searchParams.append("error", error.message);
    if (redirectTo) {
      redirectURL.searchParams.append("redirectTo", redirectTo);
    }

    return redirect(redirectURL.href);
  }
  return redirect(redirectTo ?? "/");
}
export async function signUp(formData: FormData, trial = 3): Promise<never> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  const client = await createClient();

  const { error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });
  if (error) {
    console.log(error, JSON.stringify(error));
    // Random glitch
    if (error.name === "AuthRetryableFetchError") {
      if (trial === 0) {
        console.log("OUT OF RETRIES");
        return redirect(
          `/?error=${encodeURIComponent(
            "AuthRetryableFetchError: Please try again later",
          )}`,
        );
      }
      return await signUp(formData, trial - 1);
    }
    return redirect(`/?error=${error.message}`);
  }
  return redirect("/?message=Check email to continue sign in process");
}
