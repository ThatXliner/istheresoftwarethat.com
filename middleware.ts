import { NextResponse, type NextRequest } from "next/server";
import {
  encodeReturnPath,
  isPublicPath,
  needsSessionRefresh,
  sessionCookieName,
} from "@/lib/supabase/session-routing";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const target = `${path}${request.nextUrl.search}`;
  const session = new URL("/auth/session", request.url);
  session.searchParams.set("next", target);
  const navigation = request.method === "GET" || request.method === "HEAD";

  if (
    navigation &&
    path !== "/auth/session" &&
    path !== "/auth/confirm" &&
    needsSessionRefresh(
      request.cookies.getAll(),
      sessionCookieName(process.env.NEXT_PUBLIC_SUPABASE_URL!),
    )
  ) {
    const response = NextResponse.redirect(session);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Vary", "Cookie");
    return response;
  }

  if (!isPublicPath(path)) {
    if (!navigation) {
      const guard = new URL("/auth/session", request.url);
      guard.searchParams.set("_session_return", encodeReturnPath(target));
      return NextResponse.rewrite(guard);
    }
    const guard = request.nextUrl.clone();
    guard.pathname = `/auth/guard${path}`;
    return NextResponse.rewrite(guard);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
