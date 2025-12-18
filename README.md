# SEO Website Builder - Claude Skill

Build SEO and AEO (Answer Engine Optimization) optimized local business websites using React/Next.js.

## Overview

This Claude skill helps you generate **162+ page websites** from a single configuration file, complete with:

- **Schema Markup**: LocalBusiness, Service, FAQPage, BreadcrumbList, WebSite, Organization
- **Technical SEO**: Meta tags, canonical URLs, Open Graph, dynamic sitemaps
- **AEO Optimization**: AI Overview-friendly answer blocks and structured content
- **Local Proof**: Neighborhood-specific content that passes quality gates

### Pages Generated

| Page Type | Example Count | Description |
|-----------|---------------|-------------|
| Homepage | 1 | Hero, services, areas, reviews, FAQs |
| Service Pages | 9 | Individual service with schema |
| Location Pages | 15 | City-specific with local proof |
| Combo Pages | 135 (9x15) | Service + Location combinations |
| About | 1 | Owner, team, certifications |
| Contact | 1 | Contact form with CTA |
| **Total** | **162** | All with unique content |

## Installation

### For Claude Code Users

1. Clone or download this repository
2. Run the setup script:
   ```bash
   # Mac/Linux
   chmod +x setup.sh && ./setup.sh

   # Windows
   setup.bat
   ```
3. The skill will be available when Claude detects relevant triggers

### Manual Setup

1. Copy the `assets/nextjs-template/` directory to your project
2. Configure `site.config.js` with your business data
3. Run `npm install && npm run dev`

## Quick Start

1. **Complete the intake questionnaire** in `SKILL.md` (54 required fields)
2. **Validate local proof** using `references/local-proof-checklist.md`
3. **Score your content** using `references/content-scoring.md` (7+ points to index)
4. **Configure** `site.config.js` with your business data
5. **Build** with `npm run build`

## Project Structure

```
loca-seo-skill/
├── SKILL.md                    # Main skill file with intake questionnaire
├── .claude-plugin/
│   └── marketplace.json        # Plugin metadata
├── assets/
│   └── nextjs-template/        # Complete Next.js template
│       ├── src/
│       │   ├── app/            # Page routes
│       │   ├── components/     # React components
│       │   └── lib/            # Utilities & schema generators
│       ├── site.config.js      # Business configuration
│       └── package.json
└── references/
    ├── templates.md            # Page templates & components
    ├── schema-markup.md        # JSON-LD schema generators
    ├── technical-seo.md        # SEO implementation guide
    ├── aeo-optimization.md     # AI Overview optimization
    ├── content-scoring.md      # Quality rubric (7+ to index)
    └── local-proof-checklist.md # Required local data
```

## Key Features

### Content Quality Gates

Pages must score **7+ points** to be indexed:

| Signal Type | Max Points | Examples |
|-------------|------------|----------|
| Trust Signals | 10 | License, insurance, years, reviews |
| Local Proof | 5 | Neighborhoods, landmarks, local paragraph |
| Expertise | 4 | Process steps, materials, common issues |
| Unique Content | 3 | Location-specific FAQs, descriptions |

### Schema Markup

All pages include appropriate schema:
- `LocalBusiness` with `AggregateRating` (homepage only)
- `Service` with pricing information
- `FAQPage` for FAQ sections
- `BreadcrumbList` for navigation
- `WebSite` with `SearchAction`

### AEO Optimization

Answer blocks optimized for AI Overviews:
- Direct answer in first sentence
- Specific numbers (prices, timeframes)
- Verifiable facts (license, years)
- Under 100 words for extraction

## Agents

This skill includes autonomous agents for automated website building.

### Option A: Single Agent (Simple)

Use `website-builder-solo` for end-to-end website generation in one workflow:

```
.claude/agents/website-builder-solo.md
```

Handles: Intake → Research → Scoring → Generation

### Option B: Multi-Agent System (Advanced)

Use specialized agents orchestrated by `website-builder`:

```
.claude/agents/
├── website-builder.md              # Orchestrator
└── specialists/
    ├── intake-collector.md         # Gathers business data
    ├── local-researcher.md         # Finds neighborhoods, landmarks
    ├── content-scorer.md           # Scores pages (7+ to index)
    ├── site-generator.md           # Builds the Next.js site
    ├── faq-generator.md            # Creates location-specific FAQs
    ├── competitor-analyzer.md      # Analyzes competitor SEO
    ├── site-migrator.md            # Migrates existing sites
    ├── batch-processor.md          # Processes multiple businesses
    └── config-validator.md         # Validates site.config.js
```

### Agent Workflow

```
User Request
     ↓
┌─────────────────────────────────┐
│     website-builder             │
│     (orchestrator)              │
└─────────────────────────────────┘
     ↓
┌──────────┬──────────┬──────────┐
│ intake   │ local    │ faq      │  ← Parallel
│ collector│ research │ generator│
└──────────┴──────────┴──────────┘
     ↓
┌─────────────────────────────────┐
│     content-scorer              │
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│     site-generator              │
└─────────────────────────────────┘
     ↓
Complete Website
```

## Documentation

| Document | Purpose |
|----------|---------|
| [SKILL.md](SKILL.md) | Main skill guide & intake form |
| [templates.md](references/templates.md) | Page templates & code examples |
| [schema-markup.md](references/schema-markup.md) | JSON-LD generators |
| [technical-seo.md](references/technical-seo.md) | Technical SEO checklist |
| [aeo-optimization.md](references/aeo-optimization.md) | AI Overview patterns |
| [content-scoring.md](references/content-scoring.md) | Quality scoring rubric |
| [local-proof-checklist.md](references/local-proof-checklist.md) | Local data requirements |

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **Runtime**: React 18+ with Server Components
- **Styling**: CSS Modules

## Configuration

All business data is centralized in `site.config.js`:

```javascript
module.exports = {
  business: { name, phone, email, foundingDate, ... },
  trustSignals: { license, insurance, certifications, ... },
  address: { street, city, state, zip, ... },
  services: [{ name, slug, description, priceRange, ... }],
  serviceAreas: [{ city, neighborhoods, landmarks, ... }],
  reviews: { google: { rating, reviewCount }, ... },
  // ... and more
}
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**rodrigocampos** - [github.com/localxcrm](https://github.com/localxcrm)
