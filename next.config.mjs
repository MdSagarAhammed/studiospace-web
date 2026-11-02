/** @type {import('next').NextConfig} */
const nextConfig = {
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
