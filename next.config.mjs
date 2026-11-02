/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  async rewrites() {
    const backendOrigin = (
      process.env.BACKEND_ORIGIN || "http://localhost:5010"
    ).replace(/\/+$/, "");

    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendOrigin}/api/:path*`,
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
