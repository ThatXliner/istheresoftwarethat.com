export {};
async function readStdin() {
  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}
const stdin = await readStdin();
const REMAP = {
  API_URL: "NEXT_PUBLIC_SUPABASE_URL",
  ANON_KEY: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  SERVICE_ROLE_KEY: "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY",
};
for (const keyValue of stdin.matchAll(/(\w+)="(.+)"/gm)) {
  const key = keyValue[1];
  const value = keyValue[2];
  if (Object.hasOwn(REMAP, key)) {
    console.log(`${REMAP[key]}=${value}`);
  } else {
    console.log(`${key}=${value}`);
  }
}
