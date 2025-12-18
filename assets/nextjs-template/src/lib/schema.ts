// src/lib/schema.ts
// JSON-LD schema generators with proper gating and validation
// Uses site.ts helpers for normalized config access

import {
  config,
  getSchemaType,
  getDisplayCategory,
  hasValidGeo,
  hasValidAggregateRating,
  getSocialUrls,
  getAllServiceAreas,
} from './site';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Service {
  name: string;
  slug: string;
  description?: string;
  priceRange?: string;
  priceMin?: number;
  priceMax?: number;
  priceCurrency?: string;
}

// ═══════════════════════════════════════════════════════════════
// LOCAL BUSINESS SCHEMA
// Only emit valid, gated fields
// ═══════════════════════════════════════════════════════════════
export function generateLocalBusinessSchema(
  overrideConfig?: Partial<typeof config>,
  options?: { includeAggregateRating?: boolean }
) {
  const cfg = { ...config, ...overrideConfig };
  const schemaType = getSchemaType();
  
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${cfg.business.url}/#organization`,
    name: cfg.business.name,
    description: cfg.business.description,
    url: cfg.business.url,
    telephone: cfg.business.phone,
    email: cfg.business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: cfg.address.suite 
        ? `${cfg.address.street}, ${cfg.address.suite}`
        : cfg.address.street,
      addressLocality: cfg.address.city,
      addressRegion: cfg.address.state,
      postalCode: cfg.address.zip,
      addressCountry: cfg.address.country,
    },
  };

  // Optional fields - only add if present
  if (cfg.business.legalName) {
    schema.legalName = cfg.business.legalName;
  }

  if (cfg.business.priceRange) {
    schema.priceRange = cfg.business.priceRange;
  }

  if (cfg.business.foundingDate) {
    schema.foundingDate = cfg.business.foundingDate;
  }

  // Logo - only if exists
  if (cfg.business.logo) {
    schema.logo = {
      '@type': 'ImageObject',
      url: cfg.business.logo.startsWith('http') 
        ? cfg.business.logo 
        : `${cfg.business.url}${cfg.business.logo}`,
    };
  }

  // Image - only if exists
  if (cfg.business.image) {
    schema.image = cfg.business.image.startsWith('http')
      ? cfg.business.image
      : `${cfg.business.url}${cfg.business.image}`;
  }

  // Geo coordinates - only if valid (not placeholder zeros)
  if (hasValidGeo()) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: cfg.geo!.latitude,
      longitude: cfg.geo!.longitude,
    };
  }

  // Opening hours - only if configured
  if (cfg.hours) {
    const hoursSpec = generateOpeningHours(cfg.hours);
    if (hoursSpec.length > 0) {
      schema.openingHoursSpecification = hoursSpec;
    }
  }

  // Social profiles (sameAs) - only non-empty URLs
  const socialUrls = getSocialUrls();
  if (socialUrls.length > 0) {
    schema.sameAs = socialUrls;
  }

  // Aggregate rating - only if explicitly requested AND valid
  // Default: false to avoid duplicate schemas
  if (options?.includeAggregateRating && hasValidAggregateRating()) {
    const agg = cfg.reviews!.aggregate!;
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: agg.averageRating,
      reviewCount: agg.totalReviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Service areas - only if defined
  const serviceAreas = getAllServiceAreas();
  if (serviceAreas.length > 0) {
    schema.areaServed = serviceAreas.map(area => ({
      '@type': 'City',
      name: `${area.city}, ${area.state}`,
    }));
  }

  return schema;
}

// ═══════════════════════════════════════════════════════════════
// WEBSITE SCHEMA
// Removed SearchAction since no /search route exists
// ═══════════════════════════════════════════════════════════════
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${config.business.url}/#website`,
    url: config.business.url,
    name: config.business.name,
    description: config.business.description,
    publisher: {
      '@id': `${config.business.url}/#organization`,
    },
    // NOTE: SearchAction omitted - add only if you implement /search
    // potentialAction: { '@type': 'SearchAction', ... }
  };
}

// ═══════════════════════════════════════════════════════════════
// SERVICE SCHEMA
// ═══════════════════════════════════════════════════════════════
export function generateServiceSchema(service: Service) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${config.business.url}/services/${service.slug}`,
    name: service.name,
    provider: {
      '@type': getSchemaType(),
      name: config.business.name,
      '@id': `${config.business.url}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: `${config.address.city}, ${config.address.state}`,
    },
  };

  // Description - only if present
  if (service.description) {
    schema.description = service.description;
  }

  // Price specification - only if price data exists
  if (service.priceMin !== undefined || service.priceMax !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: service.priceCurrency || 'USD',
        ...(service.priceMin !== undefined && { minPrice: service.priceMin }),
        ...(service.priceMax !== undefined && { maxPrice: service.priceMax }),
      },
    };
  } else if (service.priceRange) {
    schema.offers = {
      '@type': 'Offer',
      price: service.priceRange,
      priceCurrency: service.priceCurrency || 'USD',
    };
  }

  return schema;
}

// ═══════════════════════════════════════════════════════════════
// FAQ SCHEMA
// Returns null if no FAQs - caller must handle
// ═══════════════════════════════════════════════════════════════
export function generateFAQSchema(faqs: FAQ[] | undefined | null) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ═══════════════════════════════════════════════════════════════
// BREADCRUMB SCHEMA
// ═══════════════════════════════════════════════════════════════
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!items || items.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ═══════════════════════════════════════════════════════════════
// ORGANIZATION SCHEMA (standalone, for About page)
// ═══════════════════════════════════════════════════════════════
export function generateOrganizationSchema() {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${config.business.url}/#organization`,
    name: config.business.name,
    url: config.business.url,
    description: config.business.description,
  };

  if (config.business.logo) {
    schema.logo = config.business.logo.startsWith('http')
      ? config.business.logo
      : `${config.business.url}${config.business.logo}`;
  }

  const socialUrls = getSocialUrls();
  if (socialUrls.length > 0) {
    schema.sameAs = socialUrls;
  }

  // Add aggregate rating ONLY on organization schema (homepage/about)
  if (hasValidAggregateRating()) {
    const agg = config.reviews!.aggregate!;
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: agg.averageRating,
      reviewCount: agg.totalReviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

// ═══════════════════════════════════════════════════════════════
// WEB PAGE SCHEMA
// ═══════════════════════════════════════════════════════════════
export function generateWebPageSchema(
  url: string,
  name: string,
  description: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    name,
    description,
    isPartOf: {
      '@id': `${config.business.url}/#website`,
    },
    about: {
      '@id': `${config.business.url}/#organization`,
    },
  };
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function generateOpeningHours(hours: Record<string, string>) {
  const dayMapping: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  const specs: any[] = [];

  Object.entries(hours).forEach(([day, time]) => {
    const dayName = dayMapping[day.toLowerCase()];
    if (dayName && time && time.toLowerCase() !== 'closed') {
      const [opens, closes] = time.split('-');
      if (opens && closes) {
        specs.push({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: dayName,
          opens: opens.trim(),
          closes: closes.trim(),
        });
      }
    }
  });

  return specs;
}
