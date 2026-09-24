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
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.simpleicons.org',
            port: '',
            pathname: '/**',
          },
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
