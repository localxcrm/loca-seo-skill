// src/lib/schema.ts
// JSON-LD schema generators with proper gating and validation
// Uses site.ts helpers for normalized config access

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  config,
  getSchemaType,
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
export function generateServiceSchema(
  service: Service,
  options?: {
    /** Absolute URL to the page representing this service */
    url?: string;
    /** Area served override (e.g., "Round Rock, TX") */
    areaServed?: string;
  }
) {
  const serviceUrl =
    options?.url || `${config.business.url}/services/${service.slug}`;
  const areaServed =
    options?.areaServed || `${config.address.city}, ${config.address.state}`;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceUrl,
    url: serviceUrl,
    name: service.name,
    provider: {
      '@type': getSchemaType(),
      name: config.business.name,
      '@id': `${config.business.url}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
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

// ═══════════════════════════════════════════════════════════════
// HOWTO SCHEMA (for service process steps)
// Great for AI extraction and featured snippets
// ═══════════════════════════════════════════════════════════════

interface HowToStep {
  step: number;
  name: string;
  description: string;
  image?: string;
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  options?: {
    totalTime?: string; // ISO 8601 duration (e.g., "PT2H" for 2 hours)
    estimatedCost?: { currency: string; value: string };
    tool?: string[];
    supply?: string[];
  }
) {
  if (!steps || steps.length === 0) {
    return null;
  }

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.description,
      ...(s.image && { image: s.image }),
    })),
  };

  if (options?.totalTime) {
    schema.totalTime = options.totalTime;
  }

  if (options?.estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: options.estimatedCost.currency,
      value: options.estimatedCost.value,
    };
  }

  if (options?.tool && options.tool.length > 0) {
    schema.tool = options.tool.map(t => ({
      '@type': 'HowToTool',
      name: t,
    }));
  }

  if (options?.supply && options.supply.length > 0) {
    schema.supply = options.supply.map(s => ({
      '@type': 'HowToSupply',
      name: s,
    }));
  }

  return schema;
}

// ═══════════════════════════════════════════════════════════════
// PERSON SCHEMA (for owner/team members)
// Builds entity credibility and E-E-A-T signals
// ═══════════════════════════════════════════════════════════════

interface PersonOptions {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  email?: string;
  telephone?: string;
  sameAs?: string[]; // Social profiles
  worksFor?: {
    name: string;
    url: string;
  };
  knowsAbout?: string[]; // Areas of expertise
  hasCredential?: Array<{
    name: string;
    credentialCategory?: string;
  }>;
}

export function generatePersonSchema(person: PersonOptions) {
  if (!person.name) {
    return null;
  }

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
  };

  if (person.jobTitle) {
    schema.jobTitle = person.jobTitle;
  }

  if (person.description) {
    schema.description = person.description;
  }

  if (person.image) {
    schema.image = person.image.startsWith('http')
      ? person.image
      : `${config.business.url}${person.image}`;
  }

  if (person.url) {
    schema.url = person.url;
  }

  if (person.email) {
    schema.email = person.email;
  }

  if (person.telephone) {
    schema.telephone = person.telephone;
  }

  if (person.sameAs && person.sameAs.length > 0) {
    schema.sameAs = person.sameAs.filter(Boolean);
  }

  if (person.worksFor) {
    schema.worksFor = {
      '@type': 'Organization',
      name: person.worksFor.name,
      url: person.worksFor.url,
    };
  }

  if (person.knowsAbout && person.knowsAbout.length > 0) {
    schema.knowsAbout = person.knowsAbout;
  }

  if (person.hasCredential && person.hasCredential.length > 0) {
    schema.hasCredential = person.hasCredential.map(cred => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.name,
      ...(cred.credentialCategory && { credentialCategory: cred.credentialCategory }),
    }));
  }

  return schema;
}

/**
 * Generate Person schema for the business owner from config
 */
export function generateOwnerSchema() {
  const owner = config.about?.owner;
  if (!owner?.name) {
    return null;
  }

  return generatePersonSchema({
    name: owner.name,
    jobTitle: owner.title,
    description: owner.bio,
    image: owner.image,
    worksFor: {
      name: config.business.name,
      url: config.business.url,
    },
    knowsAbout: owner.credentials,
    telephone: config.business.phone,
  });
}

// ═══════════════════════════════════════════════════════════════
// IMAGE OBJECT SCHEMA (for gallery/portfolio images)
// Helps with image SEO and Google Images
// ═══════════════════════════════════════════════════════════════

interface ImageObjectOptions {
  url: string;
  name?: string;
  description?: string;
  caption?: string;
  width?: number;
  height?: number;
  contentLocation?: string;
  datePublished?: string;
  author?: string;
  copyrightHolder?: string;
}

export function generateImageObjectSchema(image: ImageObjectOptions) {
  if (!image.url) {
    return null;
  }

  const imageUrl = image.url.startsWith('http')
    ? image.url
    : `${config.business.url}${image.url}`;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: imageUrl,
    contentUrl: imageUrl,
  };

  if (image.name) {
    schema.name = image.name;
  }

  if (image.description) {
    schema.description = image.description;
  }

  if (image.caption) {
    schema.caption = image.caption;
  }

  if (image.width) {
    schema.width = image.width;
  }

  if (image.height) {
    schema.height = image.height;
  }

  if (image.contentLocation) {
    schema.contentLocation = {
      '@type': 'Place',
      name: image.contentLocation,
    };
  }

  if (image.datePublished) {
    schema.datePublished = image.datePublished;
  }

  // Default author/copyright to business
  schema.author = {
    '@type': 'Organization',
    name: image.author || config.business.name,
  };

  schema.copyrightHolder = {
    '@type': 'Organization',
    name: image.copyrightHolder || config.business.name,
  };

  return schema;
}

/**
 * Generate ImageGallery schema for a collection of project images
 */
export function generateImageGallerySchema(
  name: string,
  images: ImageObjectOptions[]
) {
  if (!images || images.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    about: {
      '@type': 'Organization',
      name: config.business.name,
    },
    image: images.map(img => {
      const imageUrl = img.url.startsWith('http')
        ? img.url
        : `${config.business.url}${img.url}`;
      return {
        '@type': 'ImageObject',
        url: imageUrl,
        name: img.name,
        description: img.description,
        ...(img.contentLocation && {
          contentLocation: { '@type': 'Place', name: img.contentLocation },
        }),
      };
    }),
  };
}

// ═══════════════════════════════════════════════════════════════
// OFFER SCHEMA (for service pricing)
// Enhanced pricing display in search results
// ═══════════════════════════════════════════════════════════════

interface OfferOptions {
  name: string;
  description?: string;
  price?: number | string;
  priceCurrency?: string;
  priceMin?: number;
  priceMax?: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'LimitedAvailability';
  validFrom?: string;
  validThrough?: string;
  url?: string;
  areaServed?: string | string[];
  seller?: {
    name: string;
    url: string;
  };
}

export function generateOfferSchema(offer: OfferOptions) {
  if (!offer.name) {
    return null;
  }

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offer.name,
    priceCurrency: offer.priceCurrency || 'USD',
  };

  if (offer.description) {
    schema.description = offer.description;
  }

  // Handle different price formats
  if (offer.priceMin !== undefined && offer.priceMax !== undefined) {
    schema.priceSpecification = {
      '@type': 'PriceSpecification',
      priceCurrency: offer.priceCurrency || 'USD',
      minPrice: offer.priceMin,
      maxPrice: offer.priceMax,
    };
  } else if (offer.price !== undefined) {
    schema.price = offer.price;
  }

  if (offer.availability) {
    schema.availability = `https://schema.org/${offer.availability}`;
  }

  if (offer.validFrom) {
    schema.validFrom = offer.validFrom;
  }

  if (offer.validThrough) {
    schema.validThrough = offer.validThrough;
  }

  if (offer.url) {
    schema.url = offer.url;
  }

  if (offer.areaServed) {
    if (Array.isArray(offer.areaServed)) {
      schema.areaServed = offer.areaServed.map(area => ({
        '@type': 'City',
        name: area,
      }));
    } else {
      schema.areaServed = {
        '@type': 'City',
        name: offer.areaServed,
      };
    }
  }

  // Default seller to business
  schema.seller = {
    '@type': getSchemaType(),
    name: offer.seller?.name || config.business.name,
    url: offer.seller?.url || config.business.url,
  };

  return schema;
}

/**
 * Generate Offer schema from a service config
 */
export function generateServiceOfferSchema(service: Service, areaServed?: string) {
  const areas = areaServed
    ? [areaServed]
    : getAllServiceAreas().map(a => `${a.city}, ${a.state}`);

  return generateOfferSchema({
    name: service.name,
    description: service.description,
    priceMin: service.priceMin,
    priceMax: service.priceMax,
    priceCurrency: service.priceCurrency || 'USD',
    price: service.priceRange,
    availability: 'InStock',
    url: `${config.business.url}/services/${service.slug}`,
    areaServed: areas,
  });
}
