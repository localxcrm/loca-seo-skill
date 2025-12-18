// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { config } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = config.business.url.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

