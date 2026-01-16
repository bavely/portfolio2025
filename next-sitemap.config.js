/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://pavli-tawfik.com',
    generateRobotsTxt: true,
    changefreq: 'monthly',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/private'], // Add any routes you want to exclude
  };