// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { 
  config,
  getIndexableServices,
  getIndexableAreas,
  getIndexableLocationServiceCombos,
  getSitemapPriority,
  getSitemapChangeFreq,
} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.business.url;

  const sitemap: MetadataRoute.Sitemap = [];

  // Homepage - always included
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: getSitemapChangeFreq('homepage') as any,
    priority: getSitemapPriority('homepage'),
  });

  // Static pages
  const staticPages = [
    { path: '/about', type: 'about' },
    { path: '/contact', type: 'contact' },
    { path: '/services', type: 'services' },
    { path: '/locations', type: 'locations' },
  ];

  staticPages.forEach(page => {
    sitemap.push({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: getSitemapChangeFreq(page.type) as any,
      priority: getSitemapPriority(page.type),
    });
  });

  // Service pages - only indexable ones
  getIndexableServices().forEach(service => {
    sitemap.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: getSitemapChangeFreq('services') as any,
      priority: getSitemapPriority('services'),
    });
  });

  // Location pages - only indexable ones
  getIndexableAreas().forEach(area => {
    sitemap.push({
      url: `${baseUrl}/locations/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: getSitemapChangeFreq('locations') as any,
      priority: getSitemapPriority('locations'),
    });
  });

  // Location + Service combo pages - only indexable ones
  // (those with unique content: neighborhoods, landmarks, or description)
  getIndexableLocationServiceCombos().forEach(({ area, service }) => {
    sitemap.push({
      url: `${baseUrl}/locations/${area.slug}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: getSitemapChangeFreq('locationService') as any,
      priority: getSitemapPriority('locationService'),
    });
  });

  return sitemap;
}
