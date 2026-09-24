/** @type {import('next-sitemap').IConfig} */
const ADMIN_ROUTES = ['/private', '/resumeimport'];

module.exports = {
    siteUrl: 'https://pavli-tawfik.com',
    generateRobotsTxt: true,
    changefreq: 'monthly',
    priority: 0.7,
    sitemapSize: 7000,
    // Keeps the admin routes out of the sitemap. `exclude` alone does not stop
    // crawlers, so they are also disallowed in robots.txt below.
    exclude: ADMIN_ROUTES,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ADMIN_ROUTES,
        },
      ],
    },
  };
