import { z } from "zod";

const sessionEnvelope = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  expires_at: z.number().finite(),
});
const refreshWindowSeconds = 120;

export function isPublicPath(path: string) {
  return (
    path === "/" ||
    ["/login", "/auth", "/blog", "/software"].some((prefix) =>
      path.startsWith(prefix),
    ) ||
    [
      "/search",
      "/compare",
      "/submit",
      "/about",
      "/faq",
      "/terms",
      "/privacy",
      "/cookies",
      "/contact",
      "/licenses",
      "/api/embed",
    ].includes(path)
  );
}

export function sessionCookieName(supabaseUrl: string) {
  return `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
}

export function isSessionCookie(name: string, base: string) {
  return (
    name === base ||
    (name.startsWith(`${base}.`) && /^\d+$/.test(name.slice(base.length + 1)))
  );
}

export function readSessionHint(
  cookies: { name: string; value: string }[],
  base: string,
):
  | { kind: "absent" }
  | { kind: "malformed" }
  | { kind: "present"; expiresAt: number } {
  const values = new Map(cookies.map(({ name, value }) => [name, value]));
  let value = values.get(base);
  if (value === undefined) {
    const chunks: string[] = [];
    for (let index = 0; values.has(`${base}.${index}`); index++) {
      chunks.push(values.get(`${base}.${index}`) ?? "");
    }
    if (!chunks.length)
      return {
        kind: cookies.some(({ name }) => isSessionCookie(name, base))
          ? "malformed"
          : "absent",
      };
    value = chunks.join("");
  }
  try {
    if (value.startsWith("base64-")) {
      if (!/^[A-Za-z0-9_-]+$/.test(value.slice(7)))
        return { kind: "malformed" };
      const decoded = atob(
        value.slice(7).replace(/-/g, "+").replace(/_/g, "/"),
      );
      value = new TextDecoder("utf-8", { fatal: true }).decode(
        Uint8Array.from(decoded, (char) => char.charCodeAt(0)),
      );
    }
    const result = sessionEnvelope.safeParse(JSON.parse(value));
    return result.success
      ? { kind: "present", expiresAt: result.data.expires_at }
      : { kind: "malformed" };
  } catch {
    return { kind: "malformed" };
  }
}

export function needsSessionRefresh(
  cookies: { name: string; value: string }[],
  base: string,
) {
  const hint = readSessionHint(cookies, base);
  return (
    hint.kind === "malformed" ||
    (hint.kind === "present" &&
      hint.expiresAt <= Date.now() / 1000 + refreshWindowSeconds)
  );
}
