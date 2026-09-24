/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // A browser with a legacy registration must always be able to fetch
          // the retirement worker instead of reusing a cached copy.
          source: "/sw.js",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, max-age=0",
            },
            {
              key: "Service-Worker-Allowed",
              value: "/",
            },
          ],
        },
      ];
    },
    images: {
        domains: ["cdn.simpleicons.org", "images.unsplash.com"], // Allow external images from simpleicons
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
            search: '',
          },
        ],
      },
      // output: 'standalone',
};

export default nextConfig;
