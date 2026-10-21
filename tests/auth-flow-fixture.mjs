import http from "node:http";
import { createHmac, randomUUID } from "node:crypto";

// Local-only fake identities. No fixture credential is usable with a real service.
export const FIXTURE_PORT = 54329;
export const FIXTURE_ANON_KEY = "fixture-anon-key-not-a-real-credential";
export const FIXTURE_USER = {
  id: "11111111-2222-4333-8444-555555555555",
  aud: "authenticated",
  role: "authenticated",
  email: "integration@example.invalid",
  email_confirmed_at: "2026-01-01T00:00:00.000Z",
  app_metadata: { provider: "email", providers: ["email"] },
  user_metadata: { name: "Local integration identity" },
  identities: [],
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

export async function startAuthFixture({ port = FIXTURE_PORT } = {}) {
  const events = [];
  const validAccessTokens = new Set();
  const temporaryAccessTokens = new Set();
  const transientRefreshTokens = new Set();
  const validRefreshTokens = new Set();
  const origin = `http://127.0.0.1:${port}`;

  function session({ expiresIn = 3600, refresh = "valid", padding = 0 } = {}) {
    const now = Math.floor(Date.now() / 1000);
    const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
    const unsigned = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({
      iss: `${origin}/auth/v1`, sub: FIXTURE_USER.id, aud: "authenticated",
      role: "authenticated", iat: now - 60, exp: now + expiresIn,
      email: FIXTURE_USER.email, nonce: randomUUID(),
    })}`;
    const access_token = `${unsigned}.${createHmac("sha256", "local-auth-fixture-only").update(unsigned).digest("base64url")}`;
    const refresh_token = `fixture-${refresh}-${randomUUID()}`;
    if (refresh === "valid") validRefreshTokens.add(refresh_token);
    if (refresh === "transient") transientRefreshTokens.add(refresh_token);
    if (refresh === "transient") temporaryAccessTokens.add(access_token);
    else if (refresh !== "revoked" && refresh !== "forged") validAccessTokens.add(access_token);
    return {
      access_token, refresh_token, expires_at: now + expiresIn,
      expires_in: expiresIn, token_type: "bearer",
      user: { ...FIXTURE_USER, user_metadata: { ...FIXTURE_USER.user_metadata, padding: "x".repeat(padding) } },
    };
  }

  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, origin);
    let input = {};
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    if (chunks.length) {
      try { input = JSON.parse(Buffer.concat(chunks).toString()); } catch {}
    }
    const event = { method: request.method, path: url.pathname, grant: url.searchParams.get("grant_type") };
    events.push(event);
    const send = (status, body) => {
      event.status = status;
      response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
      response.end(JSON.stringify(body));
    };
    const invalid = () => send(400, { code: "refresh_token_not_found", error_code: "refresh_token_not_found", msg: "Fixture session is invalid" });
    if (url.pathname === "/auth/v1/user") {
      const token = request.headers.authorization?.replace(/^Bearer /, "");
      if (temporaryAccessTokens.has(token)) return send(503, { message: "Fixture Auth temporarily unavailable" });
      if (!validAccessTokens.has(token)) return send(401, { code: "bad_jwt", error_code: "bad_jwt", msg: "Fixture token rejected" });
      return send(200, FIXTURE_USER);
    }
    if (url.pathname === "/auth/v1/token" && event.grant === "refresh_token") {
      if (transientRefreshTokens.has(input.refresh_token)) return send(503, { message: "Fixture Auth temporarily unavailable" });
      if (!validRefreshTokens.has(input.refresh_token)) return invalid();
      validRefreshTokens.delete(input.refresh_token);
      return send(200, session());
    }
    if (url.pathname === "/auth/v1/token" && event.grant === "password") {
      if (input.email !== FIXTURE_USER.email || input.password !== "fixture-password") return invalid();
      return send(200, session());
    }
    if (url.pathname === "/auth/v1/verify") {
      if (input.token_hash !== "fixture-otp" || input.type !== "email") return invalid();
      return send(200, session());
    }
    if (url.pathname.startsWith("/rest/v1/")) return send(200, []);
    send(404, { message: "Unexpected fixture endpoint" });
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
  return {
    origin, events, session,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}
