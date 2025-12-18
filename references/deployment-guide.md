# Deployment Guide

Guide for deploying your SEO-optimized local business website to production.

---

## Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

### 1. Content Validation

Run the content validator to check page quality scores:

```typescript
import { scoreEntireSite, printScoreReport } from './src/lib/validateContent';

// Print full report
printScoreReport();

// Get data programmatically
const report = scoreEntireSite();
console.log(`Indexable pages: ${report.summary.indexablePages}`);
console.log(`Noindex pages: ${report.summary.noindexPages}`);
```

**Target:** 70%+ pages should be indexable (score >= 7)

### 2. Configuration Review

Verify these critical fields in `site.config.js`:

```javascript
// Required for AI citation
✓ business.foundingDate    // Exact year, e.g., "2017"
✓ trustSignals.license     // License number with state
✓ trustSignals.insurance   // Coverage amount
✓ reviews.aggregate        // At least 5 reviews
✓ about.owner.name         // Owner name for E-E-A-T

// Required for local SEO
✓ address                  // Complete physical address
✓ geo.latitude/longitude   // Real coordinates (not 0)
✓ serviceAreas             // With local proof data
```

### 3. Image Optimization

- [ ] All images are WebP or optimized JPEG/PNG
- [ ] Logo is SVG or optimized PNG
- [ ] OG image is 1200x630px
- [ ] Project gallery images have alt text
- [ ] Favicon is configured

### 4. Forms & Embeds

- [ ] Form iframe URL is set in `embeds.formIframeUrl`
- [ ] Review widget URL is set in `embeds.reviewIframeUrl`
- [ ] Google Maps API key (if using dynamic maps)

---

## Vercel Deployment (Recommended)

### Initial Setup

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (or path to nextjs-template if nested)

3. **Configure Build Settings**
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Environment Variables

Set these in Vercel dashboard (Settings → Environment Variables):

```bash
# If using Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Form webhook (if applicable)
FORM_WEBHOOK_URL=https://...
```

### Custom Domain

1. In Vercel: Settings → Domains → Add Domain
2. Add DNS records at your registrar:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`
3. Enable SSL (automatic)

### Deployment Settings

```json
// vercel.json (optional, in project root)
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## Netlify Deployment

### Initial Setup

1. **Push to GitHub** (same as Vercel)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository

3. **Configure Build Settings**
```
Build command: npm run build
Publish directory: .next
```

4. **Add Next.js Plugin**
```bash
npm install -D @netlify/plugin-nextjs
```

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

### Custom Domain

1. In Netlify: Domain settings → Add custom domain
2. Update DNS at your registrar
3. Enable SSL (automatic with Let's Encrypt)

---

## Self-Hosted Deployment

### Using Node.js

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
# or
node .next/standalone/server.js
```

3. **With PM2 (recommended)**
```bash
npm install -g pm2
pm2 start npm --name "my-site" -- start
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t my-local-seo-site .
docker run -p 3000:3000 my-local-seo-site
```

### Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/my-site
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Next.js Export (Static)

For static hosting (GitHub Pages, S3, etc.):

1. **Update next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Recommended for static hosts
};

module.exports = nextConfig;
```

2. **Build static files**
```bash
npm run build
```

3. **Deploy the `out` folder**
   - Upload to S3, GitHub Pages, or any static host
   - Configure custom domain and SSL

**Note:** Static export doesn't support:
- API routes
- Dynamic server-side features
- Middleware

---

## Post-Deployment Steps

### 1. Verify Site is Live

- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Forms submit successfully
- [ ] Phone links work
- [ ] SSL certificate is valid

### 2. Submit to Search Engines

**Google Search Console**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property with your domain
3. Verify ownership (DNS or meta tag)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools**
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Import from Google Search Console or verify manually
4. Submit sitemap

### 3. Google Business Profile

1. Claim/verify your Google Business Profile
2. Add your website URL
3. Ensure NAP (Name, Address, Phone) matches site exactly
4. Add photos and services

### 4. Analytics Setup

**Google Analytics 4**
```javascript
// In site.config.js or environment variable
seo: {
  gaId: 'G-XXXXXXXXXX',
}
```

**Verify tracking:**
- Real-time reports should show your visit
- Check that goals/conversions track form submissions

### 5. Test Core Web Vitals

Run these tests:

1. **PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)
   - Target: 90+ on mobile and desktop

2. **GTmetrix**: [gtmetrix.com](https://gtmetrix.com)
   - Check for large images, render-blocking resources

3. **Mobile-Friendly Test**: [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)

### 6. Schema Validation

Test your structured data:

1. **Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. **Schema Markup Validator**: [validator.schema.org](https://validator.schema.org)

Check for:
- [ ] LocalBusiness schema
- [ ] Service schema (per service page)
- [ ] FAQ schema
- [ ] BreadcrumbList schema

---

## Monitoring & Maintenance

### Weekly
- Check Google Search Console for errors
- Review form submissions
- Monitor Core Web Vitals

### Monthly
- Review analytics for traffic trends
- Update content if needed
- Check for broken links
- Review competitor rankings

### Quarterly
- Update reviews aggregate data
- Add new service areas if applicable
- Refresh project gallery
- Review and update FAQs

---

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### 404 on Dynamic Routes

Ensure `generateStaticParams` is properly configured for all dynamic routes.

### Images Not Loading

- Check image paths are relative to `/public`
- Verify image optimization settings in `next.config.js`

### Forms Not Submitting

- Check iframe URL is correct
- Verify CORS settings on form provider
- Test in incognito mode

### Schema Not Detected

- Run Rich Results Test
- Check for JSON-LD syntax errors
- Verify schema is in `<head>` or `<body>`
