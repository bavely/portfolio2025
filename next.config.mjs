/** @type {import('next').NextConfig} */
const nextConfig = {
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
      output: 'standalone',
};

export default nextConfig;
