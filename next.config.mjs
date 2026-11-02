/** @type {import('next').NextConfig} */
const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5010/api"
).replace(/\/+$/, "");

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${apiBaseUrl}/auth/:path*`,
      },
    ];
  },
  cacheComponents: true,
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
