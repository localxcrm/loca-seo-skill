# Schema Markup Generators

All schema should be placed in `<script type="application/ld+json">` tags in the `<head>` or before `</body>`.

## Schema Generator Library

```typescript
// src/lib/schema.ts
import config from '@/site.config';

// LocalBusiness Schema
export function generateLocalBusinessSchema(siteConfig = config) {
  return {
    "@context": "https://schema.org",
    "@type": siteConfig.business.schemaType,
    "@id": `${siteConfig.business.url}/#localbusiness`,
    "name": siteConfig.business.name,
    "legalName": siteConfig.business.legalName,
    "description": siteConfig.business.description,
    "url": siteConfig.business.url,
    "telephone": siteConfig.business.phone,
    "email": siteConfig.business.email,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.business.url}${siteConfig.business.logo}`
    },
    "image": `${siteConfig.business.url}${siteConfig.business.image}`,
    "priceRange": siteConfig.business.priceRange,
    "foundingDate": siteConfig.business.foundingDate,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.zip,
      "addressCountry": siteConfig.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "openingHoursSpecification": generateOpeningHours(siteConfig.hours),
    "areaServed": siteConfig.serviceArea.map(area => ({
      "@type": "City",
      "name": area
    })),
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

// Opening Hours Helper
function generateOpeningHours(hours: Record<string, string>) {
  const dayMap: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };

  return Object.entries(hours)
    .filter(([_, value]) => value !== "Closed")
    .map(([day, time]) => {
      const [opens, closes] = time.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": dayMap[day],
        "opens": opens,
        "closes": closes
      };
    });
}

// FAQPage Schema
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Service Schema
export function generateServiceSchema(
  service: { name: string; slug: string; description?: string },
  siteConfig = config
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description || `Professional ${service.name} services in ${siteConfig.address.city}`,
    "provider": {
      "@type": siteConfig.business.schemaType,
      "name": siteConfig.business.name,
      "url": siteConfig.business.url
    },
    "areaServed": siteConfig.serviceArea.map(area => ({
      "@type": "City",
      "name": area
    })),
    "url": `${siteConfig.business.url}/services/${service.slug}`
  };
}

// Organization Schema
export function generateOrganizationSchema(siteConfig = config) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.business.name,
    "legalName": siteConfig.business.legalName,
    "url": siteConfig.business.url,
    "logo": `${siteConfig.business.url}${siteConfig.business.logo}`,
    "foundingDate": siteConfig.business.foundingDate,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.zip,
      "addressCountry": siteConfig.address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.business.phone,
      "contactType": "customer service"
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// HowTo Schema
export function generateHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string; image?: string }[],
  totalTime?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };
}

// Review/AggregateRating Schema
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  siteConfig = config
) {
  return {
    "@context": "https://schema.org",
    "@type": siteConfig.business.schemaType,
    "name": siteConfig.business.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    }
  };
}

// WebPage Schema
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  siteConfig = config
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.business.name,
      "url": siteConfig.business.url
    }
  };
}
```

---

## Schema Examples by Page Type

### Homepage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": "https://example.com/#localbusiness",
  "name": "ABC Plumbing",
  "legalName": "ABC Plumbing LLC",
  "description": "Professional plumbing services in Austin, TX",
  "url": "https://example.com",
  "telephone": "(512) 555-1234",
  "email": "info@abcplumbing.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://example.com/logo.png"
  },
  "image": "https://example.com/hero.jpg",
  "priceRange": "$$",
  "foundingDate": "2010",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "Austin" },
    { "@type": "City", "name": "Round Rock" }
  ],
  "sameAs": [
    "https://facebook.com/abcplumbing",
    "https://yelp.com/biz/abc-plumbing"
  ]
}
```

### Service Page Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Emergency Plumbing Repair",
  "description": "24/7 emergency plumbing services in Austin, TX",
  "provider": {
    "@type": "Plumber",
    "name": "ABC Plumbing",
    "url": "https://example.com"
  },
  "areaServed": [
    { "@type": "City", "name": "Austin" },
    { "@type": "City", "name": "Round Rock" }
  ],
  "url": "https://example.com/services/emergency-plumbing"
}
```

### FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a plumber cost in Austin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plumber rates in Austin typically range from $75-$150 per hour. Emergency services may cost $150-$300. We offer free estimates and upfront pricing."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer 24/7 emergency plumbing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, ABC Plumbing offers 24/7 emergency plumbing services throughout Austin and surrounding areas. Call (512) 555-1234 for immediate assistance."
      }
    }
  ]
}
```

### HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Unclog a Drain",
  "description": "Step-by-step guide to unclogging a household drain",
  "totalTime": "PT30M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Remove the drain cover",
      "text": "Use a screwdriver to remove the drain cover and check for visible blockages."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Use a plunger",
      "text": "Place a plunger over the drain and pump vigorously for 20-30 seconds."
    }
  ]
}
```

---

## Schema Validation

Test all schema at:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### Common Issues
- Missing required properties
- Invalid URLs (must be absolute)
- Incorrect date formats (use ISO 8601)
- Invalid price formats
