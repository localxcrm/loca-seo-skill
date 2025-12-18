# Page Templates

## Homepage Template

```tsx
// src/app/page.tsx
import { Metadata } from 'next';
import config from '@/site.config';
import { generateLocalBusinessSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ServiceAreas from '@/components/ServiceAreas';
import WhyChooseUs from '@/components/WhyChooseUs';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: `${config.gbpCategories.primary} ${config.address.city} | ${config.business.name}`,
  description: `${config.business.name} provides professional ${config.gbpCategories.primary.toLowerCase()} services in ${config.address.city}, ${config.address.state}. Available 24/7 for emergencies. Call ${config.business.phone}.`,
  alternates: {
    canonical: config.business.url,
  },
};

export default function HomePage() {
  const schema = generateLocalBusinessSchema(config);

  return (
    <>
      <SchemaMarkup schema={schema} />
      
      {/* Hero with primary keyword */}
      <Hero
        headline={`Trusted ${config.gbpCategories.primary} in ${config.address.city}`}
        subheadline={`Professional ${config.gbpCategories.primary.toLowerCase()} services for residential and commercial properties`}
        cta={{ text: 'Get Free Estimate', href: '/contact' }}
        phone={config.business.phone}
      />

      {/* Direct Answer Block for AI Overview */}
      <section className="answer-block">
        <h2>Why Choose {config.business.name}?</h2>
        <p>
          <strong>{config.business.name}</strong> is a licensed and insured 
          {config.gbpCategories.primary.toLowerCase()} serving {config.address.city} and 
          surrounding areas since {config.business.foundingDate}. We offer 24/7 emergency 
          services, upfront pricing, and satisfaction guaranteed.
        </p>
        <ul>
          <li>Licensed & Insured</li>
          <li>24/7 Emergency Service</li>
          <li>Free Estimates</li>
          <li>Satisfaction Guaranteed</li>
        </ul>
      </section>

      {/* Services - H2 for each GBP secondary category */}
      <Services services={config.services} city={config.address.city} />

      {/* Service Areas */}
      <ServiceAreas areas={config.serviceArea} />

      {/* Trust Signals */}
      <WhyChooseUs />

      {/* Reviews */}
      <Reviews />

      {/* FAQ Section */}
      <FAQ faqs={homepageFAQs} />

      {/* Final CTA */}
      <CTA phone={config.business.phone} />
    </>
  );
}

const homepageFAQs = [
  {
    question: `How much does a ${config.gbpCategories.primary.toLowerCase()} cost in ${config.address.city}?`,
    answer: `${config.gbpCategories.primary} rates in ${config.address.city} typically range from $XX-$XXX for standard services. We offer free estimates and upfront pricing with no hidden fees.`,
  },
  // Add 4-6 more FAQs
];
```

---

## Service Page Template

```tsx
// src/app/services/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import config from '@/site.config';
import { generateServiceSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQ from '@/components/FAQ';

interface ServicePageProps {
  params: { slug: string };
}

// Generate static params for all services
export async function generateStaticParams() {
  return config.services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = config.services.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.name} ${config.address.city} | ${config.business.name}`,
    description: `Professional ${service.name.toLowerCase()} services in ${config.address.city}, ${config.address.state}. Licensed experts, upfront pricing. Call ${config.business.phone} for a free estimate.`,
    alternates: {
      canonical: `${config.business.url}/services/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = config.services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const schema = generateServiceSchema(service, config);

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* H1 with keyword + city */}
      <h1>{service.name} in {config.address.city}</h1>

      {/* Direct Answer Block */}
      <section className="answer-block">
        <p>
          Need <strong>{service.name.toLowerCase()}</strong> in {config.address.city}? 
          {config.business.name} provides fast, reliable service with upfront pricing 
          and satisfaction guaranteed. Call <a href={`tel:${config.business.phone}`}>
          {config.business.phone}</a> for same-day service.
        </p>
      </section>

      {/* Service Content */}
      <section>
        <h2>Our {service.name} Services</h2>
        {/* Detailed service description */}
        
        <h2>When to Call for {service.name}</h2>
        {/* Common problems/situations */}
        
        <h2>{service.name} Process</h2>
        {/* Step-by-step process */}
        
        <h2>{service.name} Cost in {config.address.city}</h2>
        {/* Pricing information */}
      </section>

      {/* Service Area Links */}
      <section>
        <h2>{service.name} Service Areas</h2>
        <ul>
          {config.serviceArea.map((area) => (
            <li key={area}>
              <a href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`}>
                {service.name} in {area}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <FAQ faqs={serviceFAQs} />
    </>
  );
}
```

---

## Location Page Template

```tsx
// src/app/locations/[city]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import config from '@/site.config';
import { generateLocalBusinessSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQ from '@/components/FAQ';

interface LocationPageProps {
  params: { city: string };
}

export async function generateStaticParams() {
  return config.serviceArea.map((city) => ({
    city: city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const cityName = config.serviceArea.find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === params.city
  );
  if (!cityName) return {};

  return {
    title: `${config.gbpCategories.primary} ${cityName} ${config.address.state} | ${config.business.name}`,
    description: `${config.business.name} provides ${config.gbpCategories.primary.toLowerCase()} services in ${cityName}, ${config.address.state}. 24/7 emergency service. Call ${config.business.phone}.`,
    alternates: {
      canonical: `${config.business.url}/locations/${params.city}`,
    },
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const cityName = config.serviceArea.find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === params.city
  );
  if (!cityName) notFound();

  const locationConfig = {
    ...config,
    address: { ...config.address, city: cityName },
  };
  const schema = generateLocalBusinessSchema(locationConfig);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <h1>{config.gbpCategories.primary} in {cityName}, {config.address.state}</h1>

      {/* Direct Answer Block */}
      <section className="answer-block">
        <p>
          Looking for a reliable <strong>{config.gbpCategories.primary.toLowerCase()}</strong> in 
          {cityName}? {config.business.name} serves {cityName} and surrounding areas 
          with licensed, insured professionals available 24/7.
        </p>
      </section>

      {/* Local Content */}
      <section>
        <h2>Our {config.gbpCategories.primary} Services in {cityName}</h2>
        <ul>
          {config.services.map((service) => (
            <li key={service.slug}>
              <a href={`/services/${service.slug}`}>{service.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Why {cityName} Residents Choose Us</h2>
        {/* Local-specific content: neighborhoods, landmarks, local issues */}
      </section>

      {/* FAQ */}
      <FAQ faqs={locationFAQs} />
    </>
  );
}
```

---

## About Page Template

```tsx
// src/app/about/page.tsx
import { Metadata } from 'next';
import config from '@/site.config';
import { generateOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `About ${config.business.name} | ${config.gbpCategories.primary} ${config.address.city}`,
  description: `Learn about ${config.business.name}, your trusted ${config.gbpCategories.primary.toLowerCase()} in ${config.address.city} since ${config.business.foundingDate}. Licensed, insured, and committed to quality.`,
};

export default function AboutPage() {
  return (
    <>
      <h1>About {config.business.name}</h1>
      
      <section>
        <h2>Our Story</h2>
        {/* Company history, founding story */}
      </section>

      <section>
        <h2>Our Team</h2>
        {/* Team information, certifications */}
      </section>

      <section>
        <h2>Our Commitment</h2>
        {/* Values, guarantees, certifications */}
      </section>

      <section>
        <h2>Service Areas</h2>
        {/* List all service areas with links */}
      </section>
    </>
  );
}
```

---

## Contact Page Template

```tsx
// src/app/contact/page.tsx
import { Metadata } from 'next';
import config from '@/site.config';
import ContactForm from '@/components/ContactForm';
import Map from '@/components/Map';

export const metadata: Metadata = {
  title: `Contact ${config.business.name} | ${config.gbpCategories.primary} ${config.address.city}`,
  description: `Contact ${config.business.name} for ${config.gbpCategories.primary.toLowerCase()} services in ${config.address.city}. Call ${config.business.phone} or fill out our online form.`,
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact {config.business.name}</h1>

      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p><strong>Phone:</strong> <a href={`tel:${config.business.phone}`}>{config.business.phone}</a></p>
        <p><strong>Email:</strong> <a href={`mailto:${config.business.email}`}>{config.business.email}</a></p>
        <p><strong>Address:</strong> {config.address.street}, {config.address.city}, {config.address.state} {config.address.zip}</p>
        
        <h3>Business Hours</h3>
        <ul>
          {Object.entries(config.hours).map(([day, hours]) => (
            <li key={day}><strong>{day}:</strong> {hours}</li>
          ))}
        </ul>
      </section>

      <ContactForm />

      <Map 
        lat={config.geo.latitude} 
        lng={config.geo.longitude}
        address={`${config.address.street}, ${config.address.city}, ${config.address.state}`}
      />
    </>
  );
}
```

---

## Component Templates

### FAQ Component

```tsx
// src/components/FAQ.tsx
import { generateFAQSchema } from '@/lib/schema';
import SchemaMarkup from './SchemaMarkup';

interface FAQProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQ({ faqs }: FAQProps) {
  const schema = generateFAQSchema(faqs);

  return (
    <section id="faq">
      <SchemaMarkup schema={schema} />
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <details key={index}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </section>
  );
}
```

### Schema Markup Component

```tsx
// src/components/SchemaMarkup.tsx
interface SchemaMarkupProps {
  schema: object | object[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## Location + Service Combo Page Template

For pages like `/locations/acton/interior-painting`

```tsx
// src/app/locations/[city]/[service]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import config from '@/site.config';
import { generateServiceSchema, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQ from '@/components/FAQ';
import CityMapEmbed from '@/components/CityMapEmbed';

interface LocationServicePageProps {
  params: { city: string; service: string };
}

// Generate all city + service combinations
export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  
  for (const city of config.serviceArea) {
    for (const service of config.services) {
      params.push({
        city: city.toLowerCase().replace(/\s+/g, '-'),
        service: service.slug,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: LocationServicePageProps): Promise<Metadata> {
  const cityName = config.serviceArea.find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === params.city
  );
  const service = config.services.find((s) => s.slug === params.service);
  
  if (!cityName || !service) return {};

  const title = `${service.name} ${cityName} MA | ${config.business.name}`;
  const description = `Professional ${service.name.toLowerCase()} services in ${cityName}, MA. ${config.business.name} offers expert ${service.name.toLowerCase()} for homeowners. Call ${config.business.phone} for a free estimate.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${config.business.url}/locations/${params.city}/${params.service}`,
    },
  };
}

export default function LocationServicePage({ params }: LocationServicePageProps) {
  const cityName = config.serviceArea.find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === params.city
  );
  const service = config.services.find((s) => s.slug === params.service);
  
  if (!cityName || !service) notFound();

  // Generate schemas
  const serviceSchema = generateServiceSchema(service, { ...config, address: { ...config.address, city: cityName } });
  const localBusinessSchema = generateLocalBusinessSchema({ ...config, address: { ...config.address, city: cityName } });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Locations', url: `${config.business.url}/locations` },
    { name: cityName, url: `${config.business.url}/locations/${params.city}` },
    { name: service.name, url: `${config.business.url}/locations/${params.city}/${params.service}` },
  ]);

  // Generate FAQs specific to this service + location
  const faqs = [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${cityName}?`,
      answer: `${service.name} costs in ${cityName} vary based on the scope of work. ${config.business.name} offers free estimates with upfront, transparent pricing. Call ${config.business.phone} for a personalized quote.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} take in ${cityName}?`,
      answer: `Project timelines depend on the size and complexity of the job. Most residential ${service.name.toLowerCase()} projects in ${cityName} are completed within 1-5 days. We'll provide a detailed timeline with your estimate.`,
    },
    {
      question: `Do you offer free estimates for ${service.name.toLowerCase()} in ${cityName}?`,
      answer: `Yes! ${config.business.name} provides free, no-obligation estimates for all ${service.name.toLowerCase()} projects in ${cityName} and surrounding areas. Call ${config.business.phone} to schedule.`,
    },
    {
      question: `Why choose ${config.business.name} for ${service.name.toLowerCase()} in ${cityName}?`,
      answer: `${config.business.name} is a trusted local painting company serving ${cityName} homeowners. We offer professional workmanship, quality materials, and excellent customer service.`,
    },
  ];

  return (
    <>
      <SchemaMarkup schema={[serviceSchema, localBusinessSchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a> &gt; 
        <a href="/locations">Locations</a> &gt; 
        <a href={`/locations/${params.city}`}>{cityName}</a> &gt; 
        <span>{service.name}</span>
      </nav>

      {/* H1 with keyword + city */}
      <h1>{service.name} in {cityName}, MA</h1>

      {/* Direct Answer Block for AI Overview */}
      <section className="answer-block">
        <p>
          Looking for professional <strong>{service.name.toLowerCase()}</strong> in {cityName}? 
          {config.business.name} provides expert {service.name.toLowerCase()} services for 
          homeowners throughout {cityName} and the surrounding Middlesex County area. 
          Call <a href={`tel:${config.business.phone}`}>{config.business.phone}</a> for a free estimate.
        </p>
        <ul>
          <li>Free estimates with upfront pricing</li>
          <li>Licensed and insured professionals</li>
          <li>Quality materials and workmanship</li>
          <li>Serving {cityName} homeowners</li>
        </ul>
      </section>

      {/* Service Details */}
      <section>
        <h2>Our {service.name} Services in {cityName}</h2>
        <p>
          {config.business.name} offers comprehensive {service.name.toLowerCase()} services 
          tailored to {cityName} homes. Whether you need a single room refreshed or a 
          complete transformation, our experienced team delivers exceptional results.
        </p>
        {/* Add service-specific content here */}
      </section>

      {/* Why Choose Us for This Service in This City */}
      <section>
        <h2>Why {cityName} Homeowners Choose {config.business.name}</h2>
        <ul>
          <li>Local experts who know {cityName} homes</li>
          <li>Flexible scheduling including weekends</li>
          <li>Clean, professional work crews</li>
          <li>Satisfaction guaranteed on every project</li>
        </ul>
      </section>

      {/* City Map Embed */}
      <section>
        <h2>{service.name} Service Area in {cityName}</h2>
        <CityMapEmbed 
          city={cityName} 
          state="MA" 
          businessName={config.business.name}
        />
      </section>

      {/* Other Services in This City */}
      <section>
        <h2>Other Painting Services in {cityName}</h2>
        <ul>
          {config.services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <li key={s.slug}>
                <a href={`/locations/${params.city}/${s.slug}`}>
                  {s.name} in {cityName}
                </a>
              </li>
            ))}
        </ul>
      </section>

      {/* Other Locations for This Service */}
      <section>
        <h2>{service.name} in Nearby Cities</h2>
        <ul>
          {config.serviceArea
            .filter((c) => c !== cityName)
            .slice(0, 6)
            .map((c) => (
              <li key={c}>
                <a href={`/locations/${c.toLowerCase().replace(/\s+/g, '-')}/${service.slug}`}>
                  {service.name} in {c}
                </a>
              </li>
            ))}
        </ul>
      </section>

      {/* FAQ */}
      <FAQ faqs={faqs} title={`${service.name} in ${cityName} - FAQs`} />

      {/* CTA */}
      <section className="cta">
        <h2>Get a Free {service.name} Estimate in {cityName}</h2>
        <p>
          Ready to transform your {cityName} home? Contact {config.business.name} today 
          for a free, no-obligation estimate.
        </p>
        <a href="/contact" className="btn btn-primary">Get Free Estimate</a>
        <a href={`tel:${config.business.phone}`} className="btn btn-secondary">
          Call {config.business.phone}
        </a>
      </section>
    </>
  );
}
```

---

## Embed Components

### GMB Map Embed Component

```tsx
// src/components/GMBMapEmbed.tsx
interface GMBMapEmbedProps {
  placeId?: string;
  embedUrl?: string;
  width?: string;
  height?: string;
}

export default function GMBMapEmbed({ 
  placeId, 
  embedUrl,
  width = '100%', 
  height = '300' 
}: GMBMapEmbedProps) {
  // Use embedUrl if provided, otherwise construct from placeId
  const src = embedUrl || 
    `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:${placeId}`;

  return (
    <div className="gmb-map-embed">
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps - Business Location"
      />
    </div>
  );
}
```

### City Map Embed Component

```tsx
// src/components/CityMapEmbed.tsx
import config from '../../site.config';

interface CityMapEmbedProps {
  city: string;
  state: string;
  businessName?: string;
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
}

export default function CityMapEmbed({ 
  city, 
  state, 
  businessName = config.business.name,
  width = '100%', 
  height = '300',
  zoom = config.locationMaps?.zoom || 13,
  className = '',
}: CityMapEmbedProps) {
  // Build search query for the city
  const searchQuery = `${city}, ${state}`;
  const encodedQuery = encodeURIComponent(searchQuery);
  
  // Google Maps embed URL (no API key required for basic embed)
  const src = `https://www.google.com/maps?q=${encodedQuery}&z=${zoom}&output=embed`;

  return (
    <div className={`city-map-embed ${className}`}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${city}, ${state}`}
      />
      <p className="map-caption text-sm text-gray-600 mt-2">
        📍 Serving {city}, {state} and surrounding areas
      </p>
    </div>
  );
}
```

### Social Icons Component

```tsx
// src/components/SocialIcons.tsx
import config from '@/site.config';

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

const socialIcons: Record<string, string> = {
  facebook: '📘',
  instagram: '📷',
  youtube: '🎬',
  yelp: '⭐',
  houzz: '🏠',
  nextdoor: '🏘️',
  tiktok: '🎵',
  linkedin: '💼',
  pinterest: '📌',
  twitter: '🐦',
};

export default function SocialIcons({ size = 'md', showLabels = false }: SocialIconsProps) {
  const socialLinks = Object.entries(config.social).filter(([_, url]) => url);

  if (socialLinks.length === 0) return null;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="social-icons flex gap-4">
      {socialLinks.map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icon ${sizeClasses[size]} hover:opacity-80 transition-opacity`}
          aria-label={`Follow us on ${platform}`}
        >
          <span>{socialIcons[platform] || '🔗'}</span>
          {showLabels && <span className="ml-1 text-sm capitalize">{platform}</span>}
        </a>
      ))}
    </div>
  );
}
```

### Social Feed Embed Component

```tsx
// src/components/SocialFeed.tsx
interface SocialFeedProps {
  platform: 'facebook' | 'instagram';
  pageUrl: string;
  width?: number;
  height?: number;
}

export default function SocialFeed({ platform, pageUrl, width = 340, height = 500 }: SocialFeedProps) {
  if (platform === 'facebook') {
    return (
      <div className="social-feed facebook-feed">
        <iframe
          src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
          width={width}
          height={height}
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Page Feed"
        />
      </div>
    );
  }

  if (platform === 'instagram') {
    // Instagram embeds require their embed.js script
    return (
      <div className="social-feed instagram-feed">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={pageUrl}
          data-instgrm-version="14"
          style={{ width: '100%', maxWidth: width }}
        />
        <script async src="//www.instagram.com/embed.js" />
      </div>
    );
  }

  return null;
}
```

---

## Updated Footer with Embeds

```tsx
// src/components/Footer.tsx
import Link from 'next/link';
import config from '@/site.config';
import GMBMapEmbed from './GMBMapEmbed';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Business Info */}
        <div className="footer-section">
          <h3>{config.business.name}</h3>
          <p>{config.business.description}</p>
          <p>
            <a href={`tel:${config.business.phone}`}>{config.business.phone}</a>
          </p>
          <p>
            <a href={`mailto:${config.business.email}`}>{config.business.email}</a>
          </p>
          
          {/* Social Icons */}
          <div className="footer-social mt-4">
            <SocialIcons size="md" />
          </div>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            {config.services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div className="footer-section">
          <h3>Service Areas</h3>
          <ul>
            {config.serviceArea.map((area) => (
              <li key={area}>
                <Link href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`}>
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* GMB Map Embed */}
        <div className="footer-section footer-map">
          <h3>Find Us</h3>
          <GMBMapEmbed 
            embedUrl={config.embeds?.gmbMapUrl}
            height="200"
          />
          <p className="mt-2 text-sm">
            {config.address.street}, {config.address.city}, {config.address.state} {config.address.zip}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {currentYear} {config.business.name}. All rights reserved.
        </p>
        <div className="footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
```
