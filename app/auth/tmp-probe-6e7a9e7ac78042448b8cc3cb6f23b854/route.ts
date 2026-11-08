import tls from "node:tls";
import { X509Certificate } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const affected = new Set([
  "7DD78D5F4F13459A83DFF9ABBBA62EDBAF6F2D102BF257FD712F4D9F2746ED8D",
  "F2EDAAFF3D9B701FB4D14C9F285F8C0BAD90FC3BCC1FA07D47F4718EDABA34A5",
  "D7A7A0FB5D7E2731D771E9484EBCDEF71D5F0C3E0A2948782BC83EE0EA699EF4",
  "86A1ECBA089C4A8D3BBE2734C612BA341D813E043CF9E8A862CD5C57A36BBE6B",
]);
const count = (pems: readonly string[]) =>
  pems.filter((p) => affected.has(new X509Certificate(p).fingerprint256.replaceAll(":", ""))).length;

export function GET() {
  const t = tls as typeof tls & { getCACertificates?: (k: string) => string[] };
  return Response.json({
    version: process.version,
    runtime: process.env.AWS_EXECUTION_ENV ?? null,
    bundled: tls.rootCertificates.length,
    bundledAffected: count(tls.rootCertificates),
    defaultAffected: t.getCACertificates ? count(t.getCACertificates("default")) : null,
    extraCerts: process.env.NODE_EXTRA_CA_CERTS ?? null,
    useSystemCa: process.env.NODE_USE_SYSTEM_CA ?? null,
    nodeOptions: process.env.NODE_OPTIONS ?? null,
  }, { headers: { "Cache-Control": "private, no-store" } });
}
