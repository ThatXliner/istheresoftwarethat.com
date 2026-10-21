import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { initializeServerTrust } from "@/lib/server/emudhra-trust.mjs";
import {
  decodeReturnPath,
  isPublicPath,
  isSessionCookie,
  needsSessionRefresh,
  readSessionHint,
  sessionCookieName,
} from "@/lib/supabase/session-routing";

export async function handleSession(request: NextRequest) {
  initializeServerTrust();
  const encoded = request.nextUrl.searchParams.get("_session_return");
  const next =
    encoded === null
      ? (request.nextUrl.searchParams.get("next") ?? "/")
      : decodeReturnPath(encoded);
  if (next === null)
    return new NextResponse("Invalid return path", {
      status: 400,
      headers: { "Cache-Control": "private, no-store" },
    });
  let target: URL;
  try {
    target = new URL(next, request.url);
  } catch {
    return new NextResponse("Invalid return path", {
      status: 400,
      headers: { "Cache-Control": "private, no-store" },
    });
  }
  if (
    !next.startsWith("/") ||
    target.origin !== request.nextUrl.origin ||
    target.pathname.startsWith("//") ||
    target.pathname.replace(/\/+$/, "") === "/auth/session"
  ) {
    return new NextResponse("Invalid return path", {
      status: 400,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  function localLocation(url: URL) {
    return `${url.pathname}${url.search}${url.hash}`;
  }
  const response = new NextResponse(null, {
    status: 307,
    headers: { Location: localLocation(target) },
  });
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie");
  const base = sessionCookieName(process.env.NEXT_PUBLIC_SUPABASE_URL!);
  if (readSessionHint(request.cookies.getAll(), base).kind === "malformed") {
    for (const { name } of request.cookies.getAll()) {
      if (isSessionCookie(name, base))
        response.cookies.set(name, "", { path: "/", maxAge: 0 });
    }
    if (!isPublicPath(target.pathname)) target.pathname = "/login";
    response.headers.set("Location", localLocation(target));
    return response;
  }
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(updates) {
          for (const { name, value, options } of updates) {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );
  function finish(status: number, location?: URL) {
    const result = new NextResponse(null, {
      status,
      headers: response.headers,
    });
    if (location) result.headers.set("Location", localLocation(location));
    else result.headers.delete("Location");
    return result;
  }
  function clearSession() {
    for (const { name } of request.cookies.getAll()) {
      if (isSessionCookie(name, base)) {
        request.cookies.delete(name);
        response.cookies.set(name, "", { path: "/", maxAge: 0 });
      }
    }
  }
  function transient(error: { name: string; status?: number }) {
    return (
      error.name === "AuthRetryableFetchError" ||
      !error.status ||
      error.status >= 500 ||
      error.status === 429
    );
  }

  let result = await client.auth.getUser();
  if (
    result.error &&
    transient(result.error) &&
    result.error.name !== "AuthSessionMissingError"
  )
    return finish(503);
  if (result.data.user && needsSessionRefresh(request.cookies.getAll(), base)) {
    const { error } = await client.auth.refreshSession();
    if (error) {
      if (transient(error) && error.name !== "AuthSessionMissingError")
        return finish(503);
      clearSession();
    }
    result = await client.auth.getUser();
    if (
      result.error &&
      transient(result.error) &&
      result.error.name !== "AuthSessionMissingError"
    )
      return finish(503);
  }
  const user = result.data.user;
  if (!user) clearSession();
  if (!isPublicPath(target.pathname)) {
    if (user)
      return finish(
        request.method === "GET" || request.method === "HEAD" ? 307 : 404,
        request.method === "GET" || request.method === "HEAD"
          ? target
          : undefined,
      );
    target.pathname = "/login";
    return finish(307, target);
  }
  if (user && needsSessionRefresh(request.cookies.getAll(), base))
    return finish(503);
  return finish(307, target);
}
