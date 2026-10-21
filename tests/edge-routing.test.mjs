import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const { NextRequest } = require('next/server');
const root = resolve(import.meta.dirname, '..');
const loaded = new Map();
function load(file) {
  if (loaded.has(file)) return loaded.get(file);
  const exports = {};
  const source = readFileSync(resolve(root, file), 'utf8');
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, {
    exports, URL, URLSearchParams, Headers, TextDecoder, atob, Uint8Array,
    process: { env: { NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co' } },
    fetch() { throw new Error('Edge routing must never make HTTP requests'); },
    require(name) {
      if (name === '@/lib/supabase/session-routing') return load('lib/supabase/session-routing.ts');
      assert.ok(['next/server', 'zod'].includes(name), `Unexpected Edge dependency: ${name}`);
      return require(name);
    },
  }, { filename: file });
  loaded.set(file, exports);
  return exports;
}
const { middleware } = load('middleware.ts');
const { needsSessionRefresh } = load('lib/supabase/session-routing.ts');
const base = 'sb-project-auth-token';
function session(expiresAt) {
  return 'base64-' + Buffer.from(JSON.stringify({
    access_token: 'untrusted-access-hint', refresh_token: 'untrusted-refresh-hint', expires_at: expiresAt,
  })).toString('base64url');
}
function route(path, cookie, method = 'GET') {
  return middleware(new NextRequest(`https://site.example${path}`, {
    method, headers: cookie ? { cookie: `${base}=${cookie}` } : {},
  }));
}

test('Edge handles public, protected, renewal, callback and action routing without network access', () => {
  for (const path of ['/', '/login', '/about', '/search', '/api/embed']) {
    assert.equal(route(path).headers.get('x-middleware-next'), '1');
  }
  const protectedResponse = route('/private?keep=yes');
  assert.equal(protectedResponse.headers.get('x-middleware-rewrite'), 'https://site.example/auth/guard/private?keep=yes');
  const unsafe = route('/private?first=1&second=2', undefined, 'POST');
  assert.equal(unsafe.headers.get('x-middleware-rewrite'), 'https://site.example/auth/session');
  assert.equal(unsafe.headers.get('x-middleware-request-x-session-return-path'), '/private?first=1&second=2');
  const expired = session(Math.floor(Date.now() / 1000) - 5);
  assert.equal(new URL(route('/about?keep=yes', expired).headers.get('location')).searchParams.get('next'), '/about?keep=yes');
  assert.equal(route('/login', expired, 'POST').headers.get('x-middleware-next'), '1');
  assert.equal(route('/auth/confirm?token_hash=fake', expired).headers.get('x-middleware-next'), '1');
  assert.equal(route('/auth/session?next=%2F', expired).headers.get('x-middleware-next'), '1');
  assert.equal(route('/about', session(Math.floor(Date.now() / 1000) + 3600)).headers.get('x-middleware-next'), '1');
});

test('malformed, partial and expired chunks trigger renewal; untrusted future expiry never authorizes', () => {
  assert.equal(needsSessionRefresh([], base), false);
  for (const value of ['base64-@@@', 'base64-_w', '{}', session(1)]) {
    assert.equal(needsSessionRefresh([{ name: base, value }], base), true);
  }
  assert.equal(needsSessionRefresh([{ name: `${base}.1`, value: 'partial' }], base), true);
  const forged = session(Math.floor(Date.now() / 1000) + 3600);
  assert.equal(route('/private', forged).headers.get('x-middleware-rewrite'), 'https://site.example/auth/guard/private');
});
