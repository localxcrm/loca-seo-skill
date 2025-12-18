# Content Scoring Rubric

**Every page must score ≥7 points before indexing.** Pages scoring below threshold should either be improved or set to `index: false`.

## Scoring Categories

### 🔴 Hard Trust Signals (2 points each, max 10)

These are **verifiable facts** that establish credibility. AI and Google weight these heavily.

| Signal | Example | Points |
|--------|---------|--------|
| License number displayed | "Licensed MA Contractor #12345" | 2 |
| Insurance mentioned with amount | "Fully insured up to $1M" | 2 |
| Exact years in business | "Serving since 2017" (not "over 5 years") | 2 |
| Real review counts from config | "4.8 stars from 127 reviews" | 2 |
| Owner name + role | "Founded by John Smith" | 2 |

**Minimum required: 3 signals (6 points)**

### 🟡 Local Proof Signals (1 point each, max 5)

These prove you actually serve the area. **AI Overviews love these.**

| Signal | Example | Points |
|--------|---------|--------|
| Neighborhood names | "Serving Downtown, North Side, West End" | 1 |
| Local landmarks | "Near Central Park, Main Street District" | 1 |
| County name | "Serving all of Middlesex County" | 1 |
| Local regulations/permits | "We handle all City of Boston permit requirements" | 1 |
| Regional issues | "Central Texas hard water causes..." | 1 |

**Minimum required: 2 signals (2 points)**

### 🟢 Expertise Signals (1 point each, max 4)

These demonstrate knowledge competitors don't show.

| Signal | Example | Points |
|--------|---------|--------|
| Step-by-step process | "Our 4-step process: Prep, Prime, Paint, Inspect" | 1 |
| Common problems addressed | "Why DIY exterior paint fails in New England winters" | 1 |
| Materials/brands mentioned | "We use Sherwin-Williams Duration for exteriors" | 1 |
| Prep steps others skip | "We always sand between coats for durability" | 1 |

**Minimum required: 1 signal (1 point)**

### 🔵 Unique Content (1 point each, max 3)

Content that cannot exist on any other site.

| Signal | Example | Points |
|--------|---------|--------|
| Local deep paragraph | Paragraph with 2+ local landmarks + neighborhood-specific insight | 1 |
| Location-specific FAQ | FAQ that names the city and addresses local conditions | 1 |
| Custom service description | Not template text - actually describes how you do the service | 1 |

**Minimum required: 1 signal (1 point)**

---

## Scoring Thresholds

| Score | Action |
|-------|--------|
| ≥10 | ✅ **Index + Priority** - Feature in sitemap, internal links |
| 7-9 | ✅ **Index** - Standard indexing |
| 4-6 | ⚠️ **Noindex but Generate** - Keep for UX/internal links |
| 0-3 | ❌ **Do Not Generate** - Page adds no value |

---

## Page Type Minimums

### Homepage (must score ≥10)
- [ ] 4+ hard trust signals
- [ ] 3+ local proof signals
- [ ] 2+ expertise signals
- [ ] Business story/origin

### Service Pages (must score ≥8)
- [ ] 3+ hard trust signals
- [ ] 1+ local proof signal
- [ ] 2+ expertise signals
- [ ] Service-specific process
- [ ] Real pricing range

### Location Pages (must score ≥7)
- [ ] 2+ hard trust signals
- [ ] 3+ local proof signals (neighborhoods, landmarks required)
- [ ] 1+ expertise signal
- [ ] Local deep paragraph (required)

### Location+Service Combos (must score ≥7 to index)
- [ ] 2+ hard trust signals
- [ ] 2+ local proof signals
- [ ] 1+ expertise signal
- [ ] Local deep paragraph (required)
- [ ] Location-specific FAQ

**If combo page cannot score ≥7, set `index: false`**

---

## AI-Citation Block Requirements

Every indexable page needs an answer block that can be quoted by AI.

### Required Elements:
1. **Direct answer** in first sentence
2. **Specific numbers** (price range, timeframe, review count)
3. **Verifiable facts** (license, years, location)
4. **Under 100 words** (AI extraction limit)

### Pattern:
```
<section class="answer-block">
  <p>
    <strong>Yes — [Business] provides [service] in [city]</strong>
    with [availability]. Projects typically range from 
    <strong>$X–$Y</strong> and complete within <strong>Z days</strong>.
  </p>
  <ul>
    <li>Licensed [state] contractor #[LICENSE]</li>
    <li>Serving [city] since [year]</li>
    <li>[rating] stars from [count] reviews</li>
    <li>[Key differentiator]</li>
  </ul>
</section>
```

---

## Local Deep Paragraph Requirements

Every location page and combo page needs **one paragraph that cannot exist elsewhere**.

### Must Include:
- 2+ neighborhood names OR
- 2+ local landmarks OR
- 1 regional issue + 1 local reference

### Pattern:
```
In [City], many homes built in [era] have [common issue] due to [local factor].
We frequently serve neighborhoods near [Landmark 1] and along [Street/Area],
where [specific local challenge] makes [your expertise] especially important.
```

### Example:
```
In Maynard, many homes built in the 1960s and 70s have original wood trim
that's weathered from New England's freeze-thaw cycles. We frequently
serve neighborhoods near Maynard's historic mill district and along
Summer Street, where the older housing stock benefits from our specialized
prep work for lead-safe renovation.
```

---

## Pre-Publish Checklist

Before setting any page to `index: true`:

### Content Quality
- [ ] Answer block follows AI-citation pattern
- [ ] Local deep paragraph is unique and specific
- [ ] FAQs start with direct answers
- [ ] No invented statistics
- [ ] All numbers from config or verifiable

### Technical
- [ ] Schema validates (test with Google Rich Results)
- [ ] Canonical URL set correctly
- [ ] Meta description under 160 chars
- [ ] Title under 60 chars
- [ ] H1 includes primary keyword + location

### Trust Signals
- [ ] License number displayed (if applicable)
- [ ] Review count from real data
- [ ] Years in business accurate
- [ ] NAP consistent with GBP

### Local Signals
- [ ] At least 2 neighborhood/landmark mentions
- [ ] County name mentioned
- [ ] No generic "and surrounding areas" without specifics

---

## Scoring Implementation

Add to `site.config.js`:

```javascript
// Content quality requirements
contentRequirements: {
  // Minimum score to index (7-10)
  minimumIndexScore: 7,
  
  // Required signals by page type
  homepage: {
    hardTrustSignals: 4,
    localProofSignals: 3,
    expertiseSignals: 2,
  },
  servicePage: {
    hardTrustSignals: 3,
    localProofSignals: 1,
    expertiseSignals: 2,
  },
  locationPage: {
    hardTrustSignals: 2,
    localProofSignals: 3,  // Must have neighborhoods OR landmarks
    expertiseSignals: 1,
    requireLocalParagraph: true,
  },
  comboPage: {
    hardTrustSignals: 2,
    localProofSignals: 2,
    expertiseSignals: 1,
    requireLocalParagraph: true,
    requireLocalFAQ: true,
  },
},
```

---

## Red Flags (Auto-Noindex)

Pages with any of these should be `noindex`:

- [ ] No neighborhoods AND no landmarks
- [ ] Generic answer block without specific numbers
- [ ] FAQ answers that don't name the city
- [ ] Service description identical to another city
- [ ] No local deep paragraph
- [ ] Review count = 0 displayed
- [ ] "Years of experience" without specific year
