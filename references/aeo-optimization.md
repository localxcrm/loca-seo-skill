# AI Overview Optimization (AEO)

Patterns and strategies for optimizing content to be featured in Google's AI Overviews and other AI answer engines.

## Core Principles

### What AI Overviews Favor
1. **Direct answers** — Immediate, concise response to the query
2. **Structured content** — Lists, tables, clear hierarchies
3. **Comprehensive coverage** — Answer the question completely
4. **Authoritative signals** — Trust indicators, credentials, experience
5. **Natural language** — Conversational, matches how people ask questions
6. **Fresh, accurate data** — Up-to-date information with specifics

### What AI Overviews Avoid
- Thin content without substance
- Excessive sales language
- Missing factual information
- Poor content structure
- Outdated information
- Generic, non-specific answers

---

## Answer Block Pattern

Place a direct answer block immediately after the H1 on every page.

### Structure
```html
<section class="answer-block">
  <p>
    <strong>[Direct answer to the implied question]</strong>
    [Supporting context with specific details, numbers, or facts.]
  </p>
  <ul>
    <li>[Key point 1]</li>
    <li>[Key point 2]</li>
    <li>[Key point 3]</li>
  </ul>
</section>
```

### Example: Service Page
```html
<h1>Emergency Plumber Austin TX</h1>

<section class="answer-block">
  <p>
    Need an <strong>emergency plumber in Austin?</strong> ABC Plumbing offers 
    24/7 emergency plumbing services with typical response times of 30-60 minutes. 
    Emergency service calls range from <strong>$150-$300</strong> for the first hour, 
    plus parts.
  </p>
  <ul>
    <li>Available 24/7, including holidays</li>
    <li>30-60 minute average response time</li>
    <li>Licensed, insured, background-checked technicians</li>
    <li>Upfront pricing before work begins</li>
  </ul>
</section>
```

### Example: Location Page
```html
<h1>Plumber Round Rock TX</h1>

<section class="answer-block">
  <p>
    <strong>ABC Plumbing serves Round Rock</strong> and the surrounding 
    Williamson County area with professional plumbing services. We've served 
    over 2,500 Round Rock homes since 2010, with a 4.9-star rating from 
    500+ local reviews.
  </p>
  <ul>
    <li>Serving all Round Rock neighborhoods</li>
    <li>Same-day service available</li>
    <li>Local technicians who know Round Rock</li>
  </ul>
</section>
```

---

## FAQ Optimization for AI

### Placement
- FAQ section near bottom of content
- Use `<details>/<summary>` or visible Q&A format
- Always include FAQPage schema

### Question Selection
Target questions people actually ask:
- "How much does [service] cost in [city]?"
- "How long does [service] take?"
- "Do I need a [professional] for [problem]?"
- "What are signs I need [service]?"
- "Is [service] covered by insurance?"

### Answer Format
```html
<details>
  <summary>How much does a plumber cost in Austin?</summary>
  <p>
    Austin plumbers typically charge <strong>$75-$150 per hour</strong> for 
    standard services. Emergency calls range from $150-$300 for the first hour. 
    Most common repairs cost $150-$500 total. We provide free estimates and 
    upfront pricing before any work begins.
  </p>
</details>
```

### Answer Guidelines
- Start with the direct answer (number, yes/no, specific fact)
- Include specific data (prices, times, measurements)
- Add context in 2-3 sentences
- End with differentiator or CTA when natural
- Keep under 100 words per answer

---

## Content Structure for AI

### Use Clear Hierarchies
```
H1: Main Topic (Primary Keyword + City)
│
├── Answer Block (direct answer)
│
├── H2: What is [Topic]?
│   └── Definition/explanation
│
├── H2: [Topic] Services We Offer
│   ├── H3: Service 1
│   ├── H3: Service 2
│   └── H3: Service 3
│
├── H2: [Topic] Cost in [City]
│   └── Pricing table or ranges
│
├── H2: When to Call for [Topic]
│   └── Bulleted list of situations
│
├── H2: Our [Topic] Process
│   └── Numbered steps
│
├── H2: [Topic] Service Areas
│   └── Location links
│
└── H2: Frequently Asked Questions
    └── FAQ items with schema
```

### Use Tables for Comparisons
```html
<h2>Plumbing Service Costs in Austin</h2>
<table>
  <thead>
    <tr>
      <th>Service</th>
      <th>Average Cost</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Drain Cleaning</td>
      <td>$150-$300</td>
      <td>1-2 hours</td>
    </tr>
    <tr>
      <td>Water Heater Repair</td>
      <td>$200-$500</td>
      <td>2-3 hours</td>
    </tr>
    <tr>
      <td>Pipe Repair</td>
      <td>$150-$400</td>
      <td>1-3 hours</td>
    </tr>
  </tbody>
</table>
```

### Use Lists for Multiple Items
```html
<h2>Signs You Need Emergency Plumbing</h2>
<ul>
  <li><strong>No water</strong> — Complete loss of water supply</li>
  <li><strong>Sewage backup</strong> — Drains backing up with waste</li>
  <li><strong>Major leak</strong> — Water actively flooding your home</li>
  <li><strong>Gas smell</strong> — Potential gas line issue (call gas company first)</li>
  <li><strong>Burst pipe</strong> — Visible pipe damage with water spraying</li>
</ul>
```

---

## Entity Optimization

### Include Authoritative Signals
```html
<section class="trust-signals">
  <h2>Why Choose ABC Plumbing</h2>
  <ul>
    <li><strong>Licensed:</strong> Texas State Plumbing License #12345</li>
    <li><strong>Insured:</strong> $2M liability coverage</li>
    <li><strong>BBB Accredited:</strong> A+ Rating since 2015</li>
    <li><strong>Experience:</strong> Serving Austin since 2010</li>
    <li><strong>Reviews:</strong> 4.9 stars from 500+ Google reviews</li>
  </ul>
</section>
```

### Connect to Known Entities
- Mention brand names of equipment installed
- Reference industry certifications
- Link to relevant organizations
- Include specific credentials

---

## Local Signals for AI

### Embed Geographic Context
```html
<p>
  We serve the greater Austin metropolitan area, including 
  <strong>Round Rock, Cedar Park, Georgetown, Pflugerville, 
  and Leander</strong>. Our central Austin location allows us 
  to reach most Travis and Williamson County addresses within 
  30-45 minutes.
</p>
```

### Include Local Specifics
- Neighborhood names
- Local landmarks ("near Domain", "off 183")
- Regional issues ("Central Texas hard water")
- Local regulations or permits
- Seasonal concerns specific to area

---

## Schema for AI Enhancement

### Combine Multiple Schema Types
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": "ABC Plumbing",
    "...": "LocalBusiness properties"
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ["...FAQ items"]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Emergency Plumbing",
    "...": "Service properties"
  }
]
```

---

## Content Quality Signals

### Include Specific Data
❌ "We offer competitive pricing"
✅ "Our drain cleaning starts at $150, with most jobs costing $150-$300"

❌ "Fast response times"
✅ "Average response time of 32 minutes for emergency calls"

❌ "Experienced technicians"
✅ "Our 12 technicians average 8+ years of experience"

### Show Expertise
- Explain why/how, not just what
- Include process details
- Address common misconceptions
- Provide actionable advice

### Maintain Freshness
- Update pricing annually
- Review content quarterly
- Add recent statistics
- Include current year where relevant

---

## Testing AI Visibility

### Manual Testing
1. Search target queries in Google
2. Check if AI Overview appears
3. Note which sources are cited
4. Analyze cited content structure

### Questions to Ask
- Does my content directly answer the query?
- Is my answer more comprehensive than competitors?
- Do I have specific data where others are vague?
- Is my content structure clearer?
- Do I have stronger trust signals?

### Iterate
1. Identify queries you want to win
2. Analyze current AI Overview content
3. Create better, more complete answers
4. Add structured data
5. Monitor and refine
