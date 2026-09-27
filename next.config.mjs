const isDevelopment = process.env.NODE_ENV !== "production";

// A static CSP keeps the site compatible with the App Router's inline bootstrap
// scripts and Google reCAPTCHA while restricting every other resource to the
// site itself. Development additionally needs eval for source maps and Fast
// Refresh; that exception is never included in production responses.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.google.com https://www.gstatic.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.simpleicons.org",
  "font-src 'self' data:",
  `connect-src 'self'${isDevelopment ? " ws:" : ""} https://www.google.com https://www.gstatic.com`,
  "frame-src https://www.google.com https://recaptcha.google.com",
  "worker-src 'self' blob:",
  "object-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: securityHeaders,
        },
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
        ],
      },
      // output: 'standalone',
};

export default nextConfig;
