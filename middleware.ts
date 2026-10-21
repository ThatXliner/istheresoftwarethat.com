import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/auth/edge-trust-diagnostic-3bc0919e7074026e89e04c45140de65fe0bd9c0e") {
    const target = request.nextUrl.searchParams.get("target");
    const url =
      target === "direct"
        ? "https://dv-g3b-emudhra.we-have-a-problem.com/"
        : target === "cross"
          ? "https://dv-g3b-aaa-emudhra.we-have-a-problem.com/"
          : target === "trusted"
            ? "https://example.com/"
            : null;
    if (!url) {
      return NextResponse.json({ error: "Invalid target" }, { status: 400 });
    }
    const runtime = {
      next: process.env.NEXT_RUNTIME,
      userAgent: navigator.userAgent,
      deno: Reflect.get(globalThis, "Deno")?.version ?? null,
    };
    const started = Date.now();
    try {
      const response = await fetch(url, {
        credentials: "omit",
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      await response.body?.cancel();
      return NextResponse.json(
        { target, runtime, outcome: "accepted", status: response.status, elapsedMs: Date.now() - started },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      return NextResponse.json(
        {
          target,
          runtime,
          outcome: "rejected",
          error: error instanceof Error ? { name: error.name, message: error.message, cause: String(error.cause ?? "") } : String(error),
          elapsedMs: Date.now() - started,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  }
  return await updateSession(request);
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
