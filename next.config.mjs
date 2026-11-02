/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  async rewrites() {
    const configuredOrigin = process.env.BACKEND_ORIGIN ||
      (process.env.NODE_ENV === "production" ? "" : "http://localhost:5010");
    if (!configuredOrigin) {
      throw new Error("BACKEND_ORIGIN is required for production builds");
    }

    let backendUrl;
    try {
      backendUrl = new URL(configuredOrigin);
    } catch {
      throw new Error("BACKEND_ORIGIN must be an absolute http(s) origin");
    }
    if (
      !["http:", "https:"].includes(backendUrl.protocol) ||
      (process.env.NODE_ENV === "production" && backendUrl.protocol !== "https:") ||
      backendUrl.pathname !== "/" ||
      backendUrl.search ||
      backendUrl.hash
    ) {
      throw new Error("BACKEND_ORIGIN must be an origin only, without a path");
    }

    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl.origin}/api/:path*`,
      },
    ];
  },
  images: {
    // Studios & profile photos are user-submitted URLs (imgbb, unsplash, etc.)
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
