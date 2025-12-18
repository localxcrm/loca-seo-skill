# Local Proof Checklist

**Required data collection before generating any pages.** Without this data, pages will be thin and should not be indexed.

---

## Business Trust Signals (REQUIRED)

These must be collected in the intake questionnaire. **Do not generate pages without these.**

### Hard Requirements (all must be filled)

| Field | Example | Used In |
|-------|---------|---------|
| `business.license` | "MA HIC #12345" | Answer blocks, footer, about |
| `business.insuranceAmount` | "$1,000,000" | Answer blocks, about |
| `business.foundingDate` | "2017" (not "5+ years") | Answer blocks, schema |
| `reviews.aggregate.totalReviews` | 127 | Answer blocks, schema |
| `reviews.aggregate.averageRating` | 4.8 | Answer blocks, schema |
| `about.owner.name` | "John Smith" | About page, entity signals |
| `about.owner.title` | "Owner & Founder" | About page |

### Soft Requirements (strongly recommended)

| Field | Example | Used In |
|-------|---------|---------|
| `business.insurance` | "Fully insured, bonded" | Trust signals |
| `about.certifications` | ["EPA Lead-Safe", "OSHA 10"] | About page |
| `about.awards` | ["Best of Houzz 2023"] | About page |

---

## Service-Level Data (per service)

Each service needs enough data to generate unique content.

### Required Fields

```javascript
services: [
  {
    name: "Interior Painting",
    slug: "interior-painting",
    description: "...", // 2-3 sentences, unique
    
    // PRICING (required for AI citation)
    priceRange: "$2-4 per sq ft",
    priceMin: 2,
    priceMax: 4,
    priceCurrency: "USD",
    
    // TIMING (required for AI citation)
    duration: "1-3 days",
    
    // EXPERTISE SIGNALS
    features: [
      "Full furniture protection",
      "2 coats minimum",
      "Premium Sherwin-Williams paints",
    ],
    
    // PROCESS (for expertise content)
    process: [
      { step: 1, name: "Prep", description: "Move furniture, tape edges, patch holes" },
      { step: 2, name: "Prime", description: "Apply primer to new drywall and stains" },
      { step: 3, name: "Paint", description: "Two coats with proper dry time" },
      { step: 4, name: "Inspect", description: "Touch-ups and final walkthrough" },
    ],
    
    // MATERIALS (expertise signal)
    materials: ["Sherwin-Williams Duration", "Benjamin Moore Regal"],
    
    // COMMON ISSUES (expertise content)
    commonIssues: [
      "DIY painters often skip primer, causing peeling within a year",
      "Cutting corners on prep leads to visible brush marks",
    ],
    
    // SERVICE-SPECIFIC FAQs
    faqs: [
      {
        question: "How much does interior painting cost?",
        answer: "Interior painting typically costs $2-4 per square foot...",
      },
    ],
    
    // INDEX CONTROL
    index: true,
  },
]
```

---

## Location-Level Data (per city)

**This is where most sites fail.** Without local data, location pages are thin doorway pages.

### Required Fields (must have to index)

```javascript
serviceAreas: [
  {
    city: "Maynard",
    slug: "maynard",
    state: "MA",
    county: "Middlesex County", // REQUIRED
    
    // LOCAL PROOF (need at least 2)
    neighborhoods: [
      "Downtown Maynard",
      "Glenwood",
      "Summer Hill",
    ],
    landmarks: [
      "Clock Tower Place",
      "Mill Pond",
      "Assabet River Rail Trail",
    ],
    
    // LOCAL DEEP PARAGRAPH (REQUIRED for indexing)
    localParagraph: `
      In Maynard, many homes built near the historic mill district feature
      original wood trim from the 1890s-1920s. The town's proximity to the
      Assabet River means higher humidity, which affects exterior paint longevity.
      We frequently serve neighborhoods along Summer Street and near Glenwood,
      where the mix of Victorian and mid-century homes requires specialized
      prep for lead-safe renovation.
    `,
    
    // REGIONAL CONTEXT
    regionalIssues: [
      "High humidity from Assabet River",
      "Historic homes with lead paint",
      "Harsh New England winters",
    ],
    
    // LOCAL REGULATIONS (if applicable)
    permits: "Building permits required for exterior work over $10,000",
    
    // ZIP CODES
    zipCodes: ["01754"],
    
    // INDEX CONTROL
    index: true, // Set false if no local proof data
  },
]
```

### Minimum Thresholds for Indexing

| Field | Minimum Required |
|-------|------------------|
| `neighborhoods` | 2+ names |
| `landmarks` | 2+ references |
| `localParagraph` | 50+ words with local specifics |
| `county` | Must be filled |

**If a city doesn't meet minimums → `index: false`**

---

## Location+Service Combo Requirements

Combo pages (`/locations/maynard/interior-painting`) need **combined signals**.

### Auto-Generated Content Uses:

1. Service data (pricing, process, features)
2. Location data (neighborhoods, landmarks, local paragraph)
3. Combined FAQ (city + service specific)

### Combo Page Scoring

A combo page can only be indexed if:

```
(location.neighborhoods.length >= 2 || location.landmarks.length >= 2)
AND location.localParagraph exists
AND service.priceRange exists
AND service.duration exists
```

### Combo-Specific FAQ Pattern

```javascript
// Auto-generate these for each combo
{
  question: `How much does ${service.name.toLowerCase()} cost in ${location.city}?`,
  answer: `${service.name} in ${location.city} typically costs ${service.priceRange}. 
    ${location.regionalIssues[0] ? `Due to ${location.regionalIssues[0].toLowerCase()}, 
    some projects may require additional prep work.` : ''} 
    Contact us for a free, personalized estimate.`,
}
```

---

## Enhanced Questionnaire Fields

Add these sections to the intake questionnaire:

### Trust Signals Section
```
═══════════════════════════════════════════════════════════════
SECTION 10: TRUST SIGNALS (Required for AI Citation)
═══════════════════════════════════════════════════════════════

LICENSE INFORMATION:
55. State License Number: _______________
56. License Type: _______________
57. License State: _______________

INSURANCE:
58. Insurance Coverage Amount: _______________
59. Insurance Provider (optional): _______________
60. Bonded?: [ ] Yes [ ] No

CREDENTIALS:
61. Certifications (list all):
    - _______________
    - _______________
    
62. Professional Affiliations:
    - _______________
    - _______________
```

### Local Content Section (per city)
```
═══════════════════════════════════════════════════════════════
SECTION 11: LOCAL PROOF DATA (Per Service Area)
═══════════════════════════════════════════════════════════════

For EACH city, provide:

CITY: _______________

63. County: _______________

64. Neighborhoods (list 3-5):
    - _______________
    - _______________
    - _______________

65. Local Landmarks (list 3-5):
    - _______________
    - _______________
    - _______________

66. Local Deep Paragraph (50+ words about serving this area):
    Include: neighborhood names, local challenges, housing types
    _______________________________________________
    _______________________________________________
    _______________________________________________

67. Regional Issues (what affects your work here?):
    - _______________
    - _______________

68. Common Housing Types:
    [ ] Victorian [ ] Colonial [ ] Ranch [ ] Split-level
    [ ] Condo/Townhouse [ ] New Construction [ ] Other: _______

69. Local Regulations/Permits:
    _______________

70. Index this location?: [ ] Yes [ ] No (if no local data)
```

### Service Content Section (per service)
```
═══════════════════════════════════════════════════════════════
SECTION 12: SERVICE EXPERTISE DATA (Per Service)
═══════════════════════════════════════════════════════════════

SERVICE: _______________

71. Your Process (list steps):
    Step 1: _______________
    Step 2: _______________
    Step 3: _______________
    Step 4: _______________

72. Materials/Brands You Use:
    - _______________
    - _______________

73. Common DIY Mistakes You Fix:
    - _______________
    - _______________

74. What Makes Your Approach Different:
    _______________________________________________

75. Index this service?: [ ] Yes [ ] No
```

---

## Validation Before Generation

Before generating pages, validate:

### Homepage
```javascript
const canIndexHomepage = (
  config.business.license &&
  config.reviews.aggregate.totalReviews >= 5 &&
  config.business.foundingDate &&
  config.about.owner.name
);
```

### Service Page
```javascript
const canIndexService = (service) => (
  service.priceRange &&
  service.duration &&
  service.description &&
  service.features?.length >= 2 &&
  service.index !== false
);
```

### Location Page
```javascript
const canIndexLocation = (area) => (
  area.county &&
  (area.neighborhoods?.length >= 2 || area.landmarks?.length >= 2) &&
  area.localParagraph &&
  area.index !== false
);
```

### Combo Page
```javascript
const canIndexCombo = (area, service) => (
  canIndexLocation(area) &&
  canIndexService(service) &&
  area.localParagraph // Must have unique local content
);
```

---

## Content Generation Rules

### Never Invent:
- Statistics without source
- Review counts
- Exact prices (use ranges from config)
- Certifications you don't have
- Neighborhoods you don't serve

### Always Include:
- Specific numbers from config
- Real license numbers
- Actual service areas
- Verified review data

### Use Ranges When Uncertain:
- "typically" instead of "always"
- "$X-Y" instead of exact prices
- "most projects" instead of "all projects"

---

## Local Paragraph Examples

The `localParagraph` field is REQUIRED for indexing location pages. Here are examples for different business types to help you write effective local content.

### Painter Example
```
In Maynard, many homes built near the historic mill district feature original wood
trim from the 1890s-1920s. The town's proximity to the Assabet River means higher
humidity, which affects exterior paint longevity. We frequently serve neighborhoods
along Summer Street and near Glenwood, where the mix of Victorian and mid-century
homes requires specialized prep for lead-safe renovation. Local regulations require
EPA-certified contractors for pre-1978 homes.
```

### Plumber Example
```
Concord's historic homes in the Monument Square area often have original cast iron
plumbing from the early 1900s. Many properties near Walden Pond experience seasonal
water table changes that affect basement drainage. Our team regularly services homes
in Nine Acre Corner and along Lowell Road, where the combination of older pipes and
hard water creates unique challenges for water heaters and fixtures. We coordinate
with the Concord Water Department for main line connections.
```

### HVAC Example
```
Lexington homeowners in the Battle Green area frequently deal with heating
challenges in their Colonial-era homes, which weren't designed for modern HVAC
systems. The town's location along the Route 2 corridor means exposure to harsh
winter winds. We serve many properties in Follen Heights and East Lexington where
the 1950s-era split-levels require ductwork modifications. Our technicians are
familiar with Lexington's permitting requirements for system replacements.
```

### Electrician Example
```
Arlington's densely populated neighborhoods near Massachusetts Avenue feature a mix
of triple-deckers and single-family homes from the 1920s, many still running on
original 60-amp electrical panels. The town's older housing stock near Spy Pond
often requires service upgrades to handle modern appliances and EV chargers. We
frequently work in Arlington Heights and East Arlington, where the combination of
knob-and-tube wiring and finished basements requires careful inspection before
renovation work.
```

### Landscaper Example
```
Wellesley's estates along Cliff Road and near Morse's Pond feature mature
landscapes with specimen trees planted in the 1920s. The town's clay-heavy soil
and proximity to the Charles River create drainage challenges on many properties.
We maintain gardens in Wellesley Farms and Overbrook where the established
rhododendron and azalea plantings require specific pH management. Local bylaws
require permits for tree removal over 6 inches in diameter.
```

### Roofer Example
```
Newton's homes in Waban and Chestnut Hill often feature slate roofs original to
their 1900s construction. The city's hilly terrain means roofs face varying wind
exposure depending on orientation. We've repaired countless roofs along
Commonwealth Avenue where ice dams form due to the large overhangs common in
Victorian architecture. Newton requires building permits for roof replacements
and has specific requirements for historical districts.
```

### Dentist Example
```
Our Brookline practice serves families from Coolidge Corner to Washington Square,
with many patients coming from the nearby colleges and hospitals. The neighborhood's
diverse population includes many international residents who appreciate our
multilingual staff. We're conveniently located near the C Line, making us accessible
to patients throughout the Boston metro area. Our office has served the Brookline
community for over 15 years, with many second-generation patients.
```

### Cleaning Service Example
```
In Cambridge, we clean everything from Harvard Square brownstones to modern condos
in Kendall Square. Many homes near Brattle Street feature original hardwood floors
and built-in cabinetry that require specialized cleaning techniques. Our teams
understand the challenges of cleaning triple-deckers in Cambridgeport where narrow
staircases and radiator heating create unique dust patterns. We're familiar with
the move-in/move-out schedules of local universities.
```

### Writing Tips

1. **Name specific neighborhoods** (not just "the area")
2. **Reference local landmarks** (parks, schools, historic sites)
3. **Mention local challenges** (climate, housing types, regulations)
4. **Include technical details** relevant to your trade
5. **Show familiarity** with local regulations and requirements
6. **Keep it 50-100 words** for optimal content density

### What NOT to Write

**Bad Example (generic):**
```
We proudly serve the residents of Springfield and surrounding areas. Our team is
committed to providing excellent service to all our customers. Contact us today
for a free estimate.
```

**Why it's bad:** No neighborhoods, no landmarks, no local specifics. This could
be about any city and any business.
