# Technical SEO Checklist

## Pre-Launch Checklist

### Meta Tags

- [ ] Unique `<title>` per page (≤60 characters)
- [ ] Unique `<meta name="description">` per page (120-160 characters)
- [ ] `<meta name="robots" content="index, follow">` on indexable pages
- [ ] `<meta name="robots" content="noindex, nofollow">` on non-indexable pages
- [ ] `<link rel="canonical" href="...">` on all pages
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags

### Title Tag Formulas

**Homepage**: `[Primary Service] [City] | [Business Name]`
Example: `Plumber Austin | ABC Plumbing`

**Service Pages**: `[Service Name] [City] | [Business Name]`
Example: `Water Heater Repair Austin | ABC Plumbing`

**Location Pages**: `[Primary Service] [City] [State] | [Business Name]`
Example: `Plumber Round Rock TX | ABC Plumbing`

**About**: `About [Business Name] | [Primary Service] [City]`

**Contact**: `Contact [Business Name] | [Primary Service] [City]`

---

## robots.txt

```txt
# /public/robots.txt
User-agent: *
Allow: /

# Block admin/private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap location
Sitemap: https://example.com/sitemap.xml
```

---

## XML Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/services/emergency-plumbing</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

### Next.js Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import config from '@/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.business.url;

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.9 },
  ];

  // Service pages
  const servicePages = config.services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // Location pages
  const locationPages = config.serviceArea.map((city) => ({
    url: `${baseUrl}/locations/${city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...locationPages];
}
```

---

## Canonical Tags

```tsx
// In Next.js metadata
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://example.com/services/plumbing',
  },
};
```

### Canonical Rules
- Every page needs a canonical tag
- Self-referential canonicals on unique pages
- Point duplicates to the preferred version
- Use absolute URLs (include https://)
- Canonicals should match sitemap URLs

---

## Internal Linking Strategy

### Link Structure
```
Homepage
├── Services Index
│   ├── Service Page 1 ←→ Location Pages
│   ├── Service Page 2 ←→ Location Pages
│   └── Service Page 3 ←→ Location Pages
├── Locations Index
│   ├── Location Page 1 ←→ Service Pages
│   ├── Location Page 2 ←→ Service Pages
│   └── Location Page 3 ←→ Service Pages
├── About
└── Contact
```

### Internal Link Best Practices
- Every page reachable in ≤3 clicks from homepage
- Use descriptive anchor text (not "click here")
- Link related services and locations
- Footer links to all main pages
- Breadcrumbs on all pages except homepage

---

## URL Structure

### Rules
- Lowercase only
- Hyphens between words (not underscores)
- No trailing slashes (or consistent trailing slashes)
- Short and descriptive
- Include primary keyword

### Examples
```
✅ /services/water-heater-repair
✅ /locations/austin
✅ /about

❌ /Services/Water_Heater_Repair
❌ /locations/austin-tx-plumber-services
❌ /page?id=123
```

---

## Image Optimization

### Requirements
- [ ] Descriptive file names (`water-heater-installation-austin.jpg`)
- [ ] Alt text on all images
- [ ] Compressed images (<100KB for most)
- [ ] WebP format with fallbacks
- [ ] Responsive images with `srcset`
- [ ] Lazy loading on below-fold images

### Next.js Image Component
```tsx
import Image from 'next/image';

<Image
  src="/water-heater-repair.jpg"
  alt="Water heater repair service in Austin, TX"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

## Core Web Vitals

### Targets
- **LCP** (Largest Contentful Paint): <2.5s
- **INP** (Interaction to Next Paint): <200ms
- **CLS** (Cumulative Layout Shift): <0.1

### Optimization Checklist
- [ ] Optimize images (WebP, proper sizing)
- [ ] Minimize JavaScript bundles
- [ ] Use font-display: swap for web fonts
- [ ] Preload critical resources
- [ ] Set explicit dimensions on images/videos
- [ ] Avoid layout shifts from dynamic content

---

## Mobile Optimization

- [ ] Responsive design (no horizontal scrolling)
- [ ] Tap targets ≥48px
- [ ] Readable font sizes (≥16px base)
- [ ] No intrusive interstitials
- [ ] Fast mobile load time (<3s)
- [ ] Click-to-call phone numbers

---

## Heading Structure

```html
<!-- Each page should have ONE H1 -->
<h1>Plumber Austin TX</h1>

<!-- H2s for main sections -->
<h2>Our Plumbing Services</h2>
<h2>Why Choose ABC Plumbing</h2>
<h2>Service Areas</h2>
<h2>Frequently Asked Questions</h2>

<!-- H3s for subsections -->
<h3>Emergency Plumbing</h3>
<h3>Water Heater Repair</h3>
```

### Rules
- One H1 per page (contains primary keyword)
- Logical hierarchy (H1 → H2 → H3)
- No skipping levels (H1 → H3)
- Descriptive headings (not just "Services")

---

## HTTPS & Security

- [ ] SSL certificate installed
- [ ] All pages served over HTTPS
- [ ] HTTP redirects to HTTPS
- [ ] Mixed content warnings fixed
- [ ] HSTS header enabled

---

## next.config.js SEO Settings

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slash consistency
  trailingSlash: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      // Example: old URL to new URL
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Launch Checklist

### Pre-Launch
- [ ] All pages have unique titles and descriptions
- [ ] Canonical tags on all pages
- [ ] Schema markup added and validated
- [ ] robots.txt configured
- [ ] XML sitemap generated
- [ ] Internal links working
- [ ] Images optimized with alt text
- [ ] Mobile responsive tested
- [ ] Core Web Vitals passing
- [ ] HTTPS enabled
- [ ] 404 page created

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt in GSC
- [ ] Request indexing for key pages
- [ ] Set up GSC alerts
- [ ] Monitor Core Web Vitals
- [ ] Check for crawl errors weekly
