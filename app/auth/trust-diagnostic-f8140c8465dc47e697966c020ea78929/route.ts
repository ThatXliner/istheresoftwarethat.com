import https from "node:https";
import { serverTrust } from "@/lib/server/emudhra-trust.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const targets = {
  g3b: "https://dv-g3b-emudhra.we-have-a-problem.com/",
  aaa: "https://dv-g3b-aaa-emudhra.we-have-a-problem.com/",
  trusted: "https://example.com/",
};

function diagnostic(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const code = "code" in error ? String(error.code) : "";
  return `${code} ${error.message} ${"cause" in error ? diagnostic(error.cause) : ""}`;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const api = params.get("api");
  const target = params.get("target");
  if ((api !== "fetch" && api !== "https") ||
      (target !== "g3b" && target !== "aaa" && target !== "trusted")) {
    return Response.json({ error: "Select one API and allowlisted target" }, { status: 400 });
  }
  if (!serverTrust) return Response.json({ error: "Startup trust hook did not run" }, { status: 503 });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  const metadata = { api, target, runtime: process.version, buildRuntime: process.env.SECURITY_BUILD_NODE_VERSION, trust: serverTrust };
  try {
    const url = targets[target];
    let status: number;
    if (api === "fetch") {
      const response = await fetch(url, { signal: controller.signal, redirect: "manual", cache: "no-store" });
      status = response.status;
      await response.body?.cancel();
    } else {
      status = await new Promise<number>((resolve, reject) => {
        const outgoing = https.get(url, { signal: controller.signal, agent: false }, response => {
          response.resume();
          resolve(response.statusCode ?? 0);
        });
        outgoing.on("error", reject);
      });
    }
    return Response.json({ ...metadata, result: "accepted", status }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const detail = diagnostic(error);
    const result = /UNABLE_TO_GET_ISSUER_CERT|CERT_(UNTRUSTED|REVOKED)|SELF_SIGNED_CERT/.test(detail)
      ? "certificate_rejected" : "inconclusive";
    return Response.json({ ...metadata, result, diagnostic: detail }, { headers: { "Cache-Control": "no-store" } });
  } finally {
    clearTimeout(timeout);
  }
}
