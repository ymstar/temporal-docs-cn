/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.temporalcn.site',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/_proxy/',
          '/_vercel/'
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.temporalcn.site/sitemap-0.xml'
    ],
  },
  exclude: [
    '/404',
    '/_next/**',
    '/api/**',
    '/_proxy/**',
    '/_vercel/**'
  ],
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
};
