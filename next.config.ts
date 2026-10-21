import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { SECURITY_BUILD_NODE_VERSION: process.version },
};

export default nextConfig;
