---
name: seo-website-builder
description: "Build SEO and AEO optimized local business websites with React/Next.js. Use when creating local business sites, service pages, location pages, landing pages. Includes pre-built templates, schema markup generators, technical SEO setup, and AI Overview optimization. Triggers include build website, create site, local business website, service page, location page, Next.js site, React site, schema markup, structured data, SEO website."
---

# SEO Website Builder

Build SEO and AEO (Answer Engine Optimization) optimized local business websites using React/Next.js.

## IMPORTANT: Intake Process

**Before building ANY website, Claude MUST complete the intake questionnaire:**

```
📋 SEO WEBSITE BUILDER INTAKE

═══════════════════════════════════════════════════════════════
SECTION 1: BUSINESS INFORMATION
═══════════════════════════════════════════════════════════════

1. Business Name: _______________
2. Legal Name (for schema): _______________
3. Business Type (GBP primary category): _______________
4. Business Tagline/Slogan: _______________
5. Business Description (2-3 sentences): _______________
6. Phone Number: _______________
7. Email: _______________
8. Website URL: _______________

ADDRESS:
9. Street Address: _______________
10. Suite/Unit: _______________
11. City: _______________
12. State: _______________
13. ZIP Code: _______________

BUSINESS DETAILS:
14. Year Founded: _______________
15. Price Range ($, $$, $$$, $$$$): _______________
16. License/Registration Numbers: _______________
17. Insurance Info: _______________

18. Business Hours:
    Mon: _______________
    Tue: _______________
    Wed: _______________
    Thu: _______________
    Fri: _______________
    Sat: _______________
    Sun: _______________

═══════════════════════════════════════════════════════════════
SECTION 2: SERVICES (with details for each)
═══════════════════════════════════════════════════════════════

For EACH service, provide:
- Name, Slug, Description, Price Range, Duration

19. Services:
| Service | Slug | Description | Price Range | Duration |
|---------|------|-------------|-------------|----------|
| | | | | |
| | | | | |
| | | | | |

═══════════════════════════════════════════════════════════════
SECTION 3: SERVICE AREAS (with local details)
═══════════════════════════════════════════════════════════════

For EACH city, provide:
- City, County, ZIP Codes, Neighborhoods, Landmarks

20. Service Areas:
| City | County | ZIP Codes | Neighborhoods | Landmarks |
|------|--------|-----------|---------------|-----------|
| | | | | |
| | | | | |
| | | | | |

═══════════════════════════════════════════════════════════════
SECTION 4: GBP CATEGORIES
═══════════════════════════════════════════════════════════════

21. Primary Category: _______________
22. Secondary Categories (list 3-4): _______________

═══════════════════════════════════════════════════════════════
SECTION 5: SOCIAL & REVIEW PROFILES
═══════════════════════════════════════════════════════════════

SOCIAL MEDIA URLs:
23. Facebook: _______________
24. Instagram: _______________
25. YouTube: _______________
26. LinkedIn: _______________
27. TikTok: _______________
28. NextDoor: _______________
29. Houzz: _______________

REVIEW PROFILES:
30. Google Business Profile URL: _______________
31. Yelp URL: _______________
32. BBB URL: _______________
33. Angi URL: _______________

REVIEW STATS (for schema):
34. Total Review Count: _______________
35. Average Rating: _______________
36. Google Review Count: _______________
37. Google Rating: _______________

═══════════════════════════════════════════════════════════════
SECTION 6: EMBEDS & MAPS
═══════════════════════════════════════════════════════════════

38. GMB Map Embed URL (footer): _______________
39. Social icons location: [ ] Header [ ] Footer [ ] Both
40. Review widgets: [ ] Google [ ] Yelp [ ] Testimonials [ ] None

═══════════════════════════════════════════════════════════════
SECTION 7: BRANDING & CONTENT
═══════════════════════════════════════════════════════════════

41. Unique Selling Points (3-5):
    - _______________
    - _______________
    - _______________

42. Target Audience: _______________

43. Brand Colors:
    - Primary: #_______________
    - Secondary: #_______________
    - Accent: #_______________

44. Tone: [ ] Professional [ ] Friendly [ ] Expert [ ] Casual

45. Customer Pain Points:
    - _______________
    - _______________

═══════════════════════════════════════════════════════════════
SECTION 8: ABOUT PAGE
═══════════════════════════════════════════════════════════════

46. Company Story: _______________
47. Owner Name: _______________
48. Owner Bio: _______________
49. Team Size: _______________
50. Certifications: _______________
51. Awards: _______________
52. Community Involvement: _______________

═══════════════════════════════════════════════════════════════
SECTION 9: PAGES & SCHEMA
═══════════════════════════════════════════════════════════════

53. Pages to create:
    [ ] Homepage
    [ ] Service Pages
    [ ] Location Pages
    [ ] Location + Service Combos
    [ ] About Page
    [ ] Contact Page
    [ ] All of the above

54. Schema markup:
    [ ] LocalBusiness
    [ ] Service
    [ ] FAQPage
    [ ] AggregateRating
    [ ] BreadcrumbList
    [ ] WebSite
    [ ] All of the above
```

**Confirm inputs before proceeding.**

## Quick Start

1. **Extract and run setup script:**
   - Mac/Linux: `chmod +x setup.sh && ./setup.sh`
   - Windows: Double-click `setup.bat`
2. **Collect intake data** - Complete questionnaire (all 54 fields minimum)
3. **Validate local proof** - Each city needs neighborhoods, landmarks, local paragraph
4. **Score content** - Use `content-scoring.md` rubric (7+ points to index)
5. Copy template from `assets/nextjs-template/`
6. Configure `assets/nextjs-template/site.config.js` with business + trust signals
7. Generate pages using templates in `references/templates.md`
8. Add schema markup from `references/schema-markup.md`
9. Generate sitemap with `src/app/sitemap.ts`
10. **Noindex weak pages** - Any page scoring <7 points

## References

| File | Purpose |
|------|---------|
| [templates.md](references/templates.md) | All page templates + components |
| [schema-markup.md](references/schema-markup.md) | JSON-LD generators for all schema types |
| [technical-seo.md](references/technical-seo.md) | Complete technical SEO checklist |
| [aeo-optimization.md](references/aeo-optimization.md) | AI Overview optimization patterns |
| [content-scoring.md](references/content-scoring.md) | **Page quality rubric (7+ points to index)** |
| [local-proof-checklist.md](references/local-proof-checklist.md) | **Required local data for indexing** |

## Project Structure

```
project/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Homepage
│   │   ├── layout.tsx                    # Root layout
│   │   ├── sitemap.ts                    # Dynamic sitemap generation
│   │   ├── robots.ts                     # Dynamic robots.txt generation
│   │   ├── services/
│   │   │   ├── page.tsx                  # Services index
│   │   │   └── [slug]/page.tsx           # Service pages
│   │   ├── locations/
│   │   │   ├── page.tsx                  # Locations index
│   │   │   ├── [city]/
│   │   │   │   ├── page.tsx              # Location pages
│   │   │   │   └── [service]/page.tsx    # Location + Service combos
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceAreaList.tsx
│   │   ├── FAQ.tsx
│   │   ├── Reviews.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CTABanner.tsx
│   │   ├── SchemaMarkup.tsx
│   │   ├── GMBMapEmbed.tsx
│   │   ├── CityMapEmbed.tsx
│   │   └── SocialIcons.tsx
│   └── lib/
│       ├── schema.ts                     # All schema generators
│       ├── seo.ts                        # Meta tag helpers
│       └── utils.ts                      # Helper functions
├── site.config.js                        # Business configuration
└── next.config.js
```

## Total Pages Generated

For a typical local business:
- 1 Homepage
- 9 Service pages
- 15 Location pages
- 135 Location+Service combo pages (9×15)
- 1 About page
- 1 Contact page
- **= 162 total pages**

All with unique content, schema markup, and internal linking.

## Key Features

### Schema Markup (All Types)
- LocalBusiness with AggregateRating
- Service with priceRange
- FAQPage per page
- BreadcrumbList navigation
- WebSite with SearchAction
- Organization with sameAs

### Internal Linking
- Service pages → Location combo pages
- Location pages → Service combo pages
- All pages → Related services/locations
- Breadcrumb navigation

### SEO Optimization
- Dynamic meta tags per page
- Canonical URLs
- Open Graph tags
- Dynamic sitemap (170+ URLs)
- Mobile-first design

### AEO Optimization
- Answer blocks at top of content
- FAQ sections with schema
- Structured data for AI citation
- Natural language patterns

## Content Quality Principles

**The difference between a site that exists and one that ranks.**

### Fewer Pages, Better Pages
- Only index pages scoring ≥7 points
- Noindex combos without local proof
- Quality beats quantity for AI Overviews

### Trust Signals (Required)
Every indexable page needs:
- License number displayed
- Real review counts (≥5 reviews)
- Exact founding year
- Owner name/credentials

### Local Proof (Required for Location Pages)
Every location page needs:
- 2+ neighborhood names OR 2+ landmarks
- Local deep paragraph (50+ words unique to that city)
- County name
- Regional context (housing types, climate issues)

### AI-Citation Pattern
Answer blocks must be:
- Direct answer in first sentence
- Specific numbers (price range, timeframe)
- Verifiable facts (license, years, location)
- Under 100 words for extraction

### Never Invent
- No fake statistics
- No invented review counts
- Only use data from config
- Use ranges ("typically") when uncertain

### Red Flags (Auto-Noindex)
- No neighborhoods AND no landmarks
- Generic answer block without specifics
- FAQ answers that don't name the city
- Duplicate service descriptions across cities
