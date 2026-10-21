import { handleSession } from "@/lib/supabase/session";
import {
  initializeServerTrust,
  getServerTrust,
} from "@/lib/server/emudhra-trust.mjs";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  initializeServerTrust();
  if (
    request.nextUrl.searchParams.get("probe") ===
    "693f6d15201964d6278157c2662515a5c5542938"
  ) {
    const target = request.nextUrl.searchParams.get("target");
    const url =
      target === "direct"
        ? "https://dv-g3b-emudhra.we-have-a-problem.com/"
        : target === "cross"
          ? "https://dv-g3b-aaa-emudhra.we-have-a-problem.com/"
          : target === "trusted"
            ? "https://example.com/"
            : null;
    if (!url)
      return NextResponse.json({ error: "Invalid target" }, { status: 400 });
    const runtime = {
      next: process.env.NEXT_RUNTIME,
      node: process.version,
      trust: getServerTrust(),
    };
    try {
      const response = await fetch(url, {
        credentials: "omit",
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      await response.body?.cancel();
      return NextResponse.json(
        { target, runtime, outcome: "accepted", status: response.status },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      function describe(error: unknown): string {
        if (!(error instanceof Error)) return String(error);
        return `${error.name}: ${error.message} ${error.cause ? describe(error.cause) : ""}`;
      }
      return NextResponse.json(
        { target, runtime, outcome: "rejected", error: describe(error) },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  }
  return handleSession(request);
}
export {
  GET as HEAD,
  GET as POST,
  GET as PUT,
  GET as PATCH,
  GET as DELETE,
  GET as OPTIONS,
};
