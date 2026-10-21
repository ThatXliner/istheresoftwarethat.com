import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { basename, dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { startAuthFixture, FIXTURE_ANON_KEY, FIXTURE_USER } from "./auth-flow-fixture.mjs";

// Run: node tests/auth-flow-test.mjs [--app PATH] [--port 54330] [--output PATH]
// --existing expects an already-running Next server built with the exact fake env below.
// The harness starts the real Next app and exercises its real Supabase SDK over local HTTP.
const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const sourceApp = resolve(option("--app", basename(here) === "tests" ? resolve(here, "..") : resolve(here, "source")));
const isolatedApp = args.includes("--existing") ? null : await mkdtemp(resolve(tmpdir(), "auth-flow-app-"));
const app = isolatedApp ?? sourceApp;
if (isolatedApp) {
  const excluded = new Set([".git", "node_modules", ".next", ".netlify", ".vercel"]);
  await cp(sourceApp, isolatedApp, {
    recursive: true,
    filter: (path) => !excluded.has(basename(path)) && !basename(path).startsWith(".env"),
  });
  await symlink(resolve(sourceApp, "node_modules"), resolve(isolatedApp, "node_modules"), "dir");
}
const port = Number(option("--port", "54330"));
// Next dev canonicalizes middleware request.url to localhost even when bound to IPv4.
const origin = `http://localhost:${port}`;
const requireApp = createRequire(resolve(app, "package.json"));
const { createChunks, stringToBase64URL, stringFromBase64URL } = requireApp("@supabase/ssr/dist/main/utils/index.js");
const output = args.includes("--output") ? resolve(option("--output")) : await mkdtemp(resolve(tmpdir(), "auth-flow-results-"));
await mkdir(output, { recursive: true });
const fixture = await startAuthFixture();
const results = [];
let next;
let appLog = "";
const cookieName = "sb-127-auth-token";

class CookieJar {
  constructor(cookies = []) { this.cookies = new Map(cookies.map(({ name, value }) => [name, value])); }
  header() { return [...this.cookies].map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join("; "); }
  apply(response) {
    for (const value of response.headers.getSetCookie()) {
      const [pair] = value.split(";");
      const index = pair.indexOf("=");
      const name = pair.slice(0, index);
      const content = decodeURIComponent(pair.slice(index + 1));
      if (/max-age=0(?:;|$)/i.test(value) || !content) this.cookies.delete(name);
      else this.cookies.set(name, content);
    }
  }
  session() {
    const encoded = this.cookies.get(cookieName) ?? [...this.cookies]
      .filter(([name]) => new RegExp(`^${cookieName}\\.\\d+$`).test(name))
      .sort(([a], [b]) => Number(a.split(".").at(-1)) - Number(b.split(".").at(-1)))
      .map(([, value]) => value).join("");
    return encoded ? JSON.parse(stringFromBase64URL(encoded.slice("base64-".length))) : null;
  }
}

const cookiesFor = (session) => new CookieJar(createChunks(cookieName, `base64-${stringToBase64URL(JSON.stringify(session))}`));
const call = async (path, jar = new CookieJar(), options = {}) => {
  const response = await fetch(new URL(path, origin), {
    ...options, redirect: "manual", signal: AbortSignal.timeout(60000),
    headers: { cookie: jar.header(), ...options.headers },
  });
  jar.apply(response);
  return response;
};
const localLocation = (response) => {
  const value = response.headers.get("location");
  assert.ok(value, "Expected a redirect Location");
  const url = new URL(value, origin);
  assert.equal(url.origin, origin, "Redirect must remain same-origin");
  return `${url.pathname}${url.search}`;
};
const expectSessionHop = async (path, jar, options) => {
  const response = await call(path, jar, options);
  assert.ok([302, 303, 307, 308].includes(response.status), `Expected session redirect, got ${response.status}`);
  const location = localLocation(response);
  assert.equal(new URL(location, origin).pathname, "/auth/session");
  return { response, location };
};
const run = async (name, operation) => {
  const start = Date.now();
  const eventStart = fixture.events.length;
  try {
    await operation();
    results.push({ name, pass: true, duration_ms: Date.now() - start, auth_requests: fixture.events.slice(eventStart) });
    process.stdout.write(`PASS ${name}\n`);
  } catch (error) {
    results.push({ name, pass: false, duration_ms: Date.now() - start, error: error.message, auth_requests: fixture.events.slice(eventStart) });
    process.stdout.write(`FAIL ${name}: ${error.message}\n`);
  }
};

try {
  if (!args.includes("--existing")) {
    next = spawn(process.execPath, [requireApp.resolve("next/dist/bin/next"), "dev", "--hostname", "127.0.0.1", "--port", String(port)], {
      cwd: app,
      env: {
        ...Object.fromEntries(["PATH", "HOME", "TMPDIR", "TEMP", "TMP", "LANG", "LC_ALL", "CI", "NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE", "SSL_CERT_DIR"]
          .filter((name) => process.env[name] !== undefined).map((name) => [name, process.env[name]])),
        NEXT_TELEMETRY_DISABLED: "1",
        NEXT_PUBLIC_SUPABASE_URL: fixture.origin,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: FIXTURE_ANON_KEY,
        SUPABASE_URL: fixture.origin, SUPABASE_ANON_KEY: FIXTURE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: "fixture-service-role-never-real",
        OPENAI_API_KEY: "fixture-openai-key-never-real",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    next.stdout.on("data", (chunk) => { appLog += chunk.toString(); });
    next.stderr.on("data", (chunk) => { appLog += chunk.toString(); });
    for (let attempt = 0; attempt < 120; attempt++) {
      if (next.exitCode !== null) throw new Error(`Next exited: ${next.exitCode}; see next.log`);
      if (/Ready in/.test(appLog)) break;
      if (attempt === 119) throw new Error("Next startup timed out");
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  await run("guest public page remains accessible", async () => {
    const response = await call("/");
    assert.equal(response.status, 200);
    assert.match(await response.text(), /Is There Software That/);
  });

  await run("guest protected path preserves query in login redirect", async () => {
    const response = await call("/__auth_fixture_private?one=a%20b&two=2");
    assert.equal(response.status, 307);
    const location = new URL(localLocation(response), origin);
    assert.equal(location.pathname, "/login");
    assert.deepEqual([...location.searchParams], [["one", "a b"], ["two", "2"]]);
  });

  await run("fresh verified identity passes protected path to real 404", async () => {
    const response = await call("/__auth_fixture_private?case=fresh", cookiesFor(fixture.session()));
    assert.equal(response.status, 404);
    assert.ok(fixture.events.some((event) => event.path === "/auth/v1/user" && event.status === 200));
  });

  await run("forged fresh session cannot authorize protected path", async () => {
    const jar = cookiesFor(fixture.session({ refresh: "forged" }));
    const response = await call("/__auth_fixture_private?case=forged", jar);
    assert.equal(response.status, 307);
    assert.equal(localLocation(response), "/login?case=forged");
  });

  for (const expiresIn of [-60, 120]) {
    await run(`${expiresIn < 0 ? "expired" : "near expiry"} public session refresh persists cookies and verified identity`, async () => {
      const before = fixture.session({ expiresIn });
      const jar = cookiesFor(before);
      const eventStart = fixture.events.length;
      const { location } = await expectSessionHop("/?return=fixture", jar);
      const refreshed = await call(location, jar);
      assert.ok([302, 303, 307, 308].includes(refreshed.status));
      assert.equal(localLocation(refreshed), "/?return=fixture");
      assert.ok(refreshed.headers.getSetCookie().length, "Refresh must persist Set-Cookie in writable route");
      assert.notEqual(jar.session().access_token, before.access_token);
      assert.ok(jar.session().expires_at > Date.now() / 1000 + 300);
      assert.equal(fixture.events.slice(eventStart).filter((event) => event.grant === "refresh_token").length, 1,
        "A refresh handshake must rotate the refresh token exactly once");
      const page = await call(localLocation(refreshed), jar);
      assert.equal(page.status, 200);
      assert.match(await page.text(), /isLoggedIn\\?":true/, "RootLayout must receive verified logged-in identity");
    });
  }

  await run("revoked refresh token clears session and cannot authorize", async () => {
    const jar = cookiesFor(fixture.session({ expiresIn: -60, refresh: "revoked" }));
    const { location } = await expectSessionHop("/", jar);
    const response = await call(location, jar);
    assert.ok([302, 303, 307, 308].includes(response.status));
    assert.equal(jar.session(), null, "Invalid refresh cookie must be removed");
    assert.equal((await call("/", jar)).status, 200, "Cleared public session must not loop");
    assert.equal(localLocation(await call("/__auth_fixture_private", jar)), "/login");
  });

  await run("malformed base64 cookie clears without public redirect loop", async () => {
    const jar = new CookieJar([{ name: cookieName, value: "base64-%%%malformed" }]);
    const { location } = await expectSessionHop("/", jar);
    const response = await call(location, jar);
    assert.ok([302, 303, 307, 308].includes(response.status));
    assert.equal(jar.cookies.has(cookieName), false);
    assert.equal((await call("/", jar)).status, 200);
  });

  await run("transient Auth failure returns 503 and retains session cookie", async () => {
    const jar = cookiesFor(fixture.session({ refresh: "transient" }));
    const original = jar.header();
    let response = await call("/__auth_fixture_private?case=temporary", jar);
    if ([302, 303, 307, 308].includes(response.status)) {
      const target = localLocation(response);
      assert.equal(new URL(target, origin).pathname, "/auth/session", "Auth outage must never become a guest login redirect");
      response = await call(target, jar);
    }
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("location"), null);
    assert.equal(jar.header(), original);
  });

  for (const target of ["https://example.invalid/steal", "//example.invalid/steal", "/auth/session?next=/auth/session"]) {
    await run(`session next rejects ${target}`, async () => {
      const response = await call(`/auth/session?next=${encodeURIComponent(target)}`, cookiesFor(fixture.session()));
      if ([400, 422].includes(response.status)) return;
      assert.ok([302, 303, 307, 308].includes(response.status));
      assert.equal(localLocation(response), "/", "Rejected destination may only fall back to public root");
    });
  }

  await run("HEAD refresh handshake persists replacement cookies", async () => {
    const jar = cookiesFor(fixture.session({ expiresIn: -60 }));
    const { location } = await expectSessionHop("/?head=1", jar, { method: "HEAD" });
    const response = await call(location, jar, { method: "HEAD" });
    assert.ok([302, 303, 307, 308].includes(response.status));
    assert.equal(localLocation(response), "/?head=1");
    assert.ok(response.headers.getSetCookie().length);
    assert.equal((await call("/?head=1", jar, { method: "HEAD" })).status, 200);
  });

  await run("RSC navigation refresh returns original URL and later RSC succeeds", async () => {
    const jar = cookiesFor(fixture.session({ expiresIn: -60 }));
    const { location } = await expectSessionHop("/?business=fixture&_rsc=fixture", jar, { headers: { rsc: "1" } });
    const response = await call(location, jar);
    assert.equal(new URL(localLocation(response), origin).searchParams.get("business"), "fixture");
    const page = await call("/?business=fixture&_rsc=fixture", jar, { headers: { rsc: "1" } });
    assert.equal(page.status, 200);
    assert.match(page.headers.get("content-type"), /text\/x-component/);
  });

  await run("refresh removes stale cookie chunks and repeated requests do not refresh", async () => {
    const jar = cookiesFor(fixture.session({ expiresIn: -60, padding: 11000 }));
    assert.ok(jar.cookies.size > 2, "Setup must exercise actual SDK chunking");
    const { location } = await expectSessionHop("/", jar);
    await call(location, jar);
    assert.equal(jar.cookies.size, 1, "Old chunk suffixes must be expired after shorter refreshed session");
    const start = fixture.events.length;
    assert.equal((await call("/", jar)).status, 200);
    assert.equal((await call("/", jar)).status, 200);
    assert.equal(fixture.events.slice(start).filter((event) => event.grant === "refresh_token").length, 0);
  });

  await run("login form POST reaches original Server Action and persists login", async () => {
    const jar = new CookieJar();
    const page = await call("/login", jar);
    assert.equal(page.status, 200);
    const html = await page.text();
    const form = html.match(/<form\b[^>]*>([\s\S]*?)<\/form>/)?.[1];
    assert.ok(form, "Login must render its real form");
    const decode = (value) => value.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const data = new FormData();
    for (const tag of form.matchAll(/<input\b[^>]*>/g)) {
      const name = tag[0].match(/\bname="([^"]*)"/)?.[1];
      const value = tag[0].match(/\bvalue="([^"]*)"/)?.[1] ?? "";
      if (name?.startsWith("$ACTION_")) data.append(decode(name), decode(value));
    }
    assert.ok([...data.keys()].some((key) => key.startsWith("$ACTION_")), "Test needs Next-generated action identifiers");
    data.set("email", FIXTURE_USER.email);
    data.set("password", "fixture-password");
    const start = fixture.events.length;
    const response = await call("/login", jar, { method: "POST", headers: { origin }, body: data });
    assert.equal(response.status, 303);
    assert.equal(localLocation(response), "/");
    assert.ok(fixture.events.slice(start).some((event) => event.grant === "password" && event.status === 200));
    assert.ok(jar.session()?.access_token);
  });

  await run("OTP callback reaches original verify route and keeps next parameter", async () => {
    const jar = new CookieJar();
    const response = await call("/auth/confirm?token_hash=fixture-otp&type=email&next=%2F%3Fotptest%3D1", jar);
    assert.ok([303, 307].includes(response.status));
    assert.equal(localLocation(response), "/?otptest=1");
    assert.ok(jar.session()?.access_token);
    assert.equal((await call("/", jar)).status, 200);
  });
} catch (error) {
  results.push({ name: "harness startup", pass: false, error: error.message });
  process.stderr.write(`${error.stack}\n`);
} finally {
  if (next && next.exitCode === null) {
    next.kill("SIGTERM");
    await Promise.race([new Promise((resolve) => next.once("exit", resolve)), new Promise((resolve) => setTimeout(resolve, 5000))]);
    if (next.exitCode === null) next.kill("SIGKILL");
  }
  await fixture.close();
  await writeFile(resolve(output, "next.log"), appLog);
  const report = {
    checked_at: new Date().toISOString(), source_app: sourceApp, app, origin, fixture_origin: fixture.origin,
    credentials: "Local fixture values only; no real Supabase project or credentials used.",
    sdk_version: requireApp("@supabase/ssr/package.json").version,
    pass: results.length > 0 && results.every((result) => result.pass), results,
  };
  await writeFile(resolve(output, "results.json"), `${JSON.stringify(report, null, 2)}\n`);
  if (isolatedApp) await rm(isolatedApp, { recursive: true, force: true });
  process.stdout.write(`${results.filter((result) => result.pass).length}/${results.length} passed; ${resolve(output, "results.json")}\n`);
  if (!report.pass) process.exitCode = 1;
}
