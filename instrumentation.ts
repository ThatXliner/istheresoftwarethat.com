export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initializeServerTrust } = await import("./lib/server/emudhra-trust.mjs");
    initializeServerTrust();
  }
}
