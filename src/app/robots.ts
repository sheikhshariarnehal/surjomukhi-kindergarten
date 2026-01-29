import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for Surjomukhi Kindergarten
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.surjamukhikindergarten.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/test*',
          '/demo*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
