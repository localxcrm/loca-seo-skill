// src/app/locations/[city]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  config,
  getAreaBySlug,
  getAllAreaSlugs,
  getAllServices,
  getAllServiceAreas,
  getBusinessName,
  getDisplayCategory,
  getSchemaType,
} from '@/lib/site';
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import { ServiceGrid } from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import CityMapEmbed from '@/components/CityMapEmbed';

interface LocationPageProps {
  params: { city: string };
}

// Generate all location pages statically
export async function generateStaticParams() {
  return getAllAreaSlugs().map((city) => ({ city }));
}

// Generate metadata
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getAreaBySlug(params.city);
  if (!location) return {};

  const businessName = getBusinessName();
  const displayCategory = getDisplayCategory();
  const title = `${displayCategory} in ${location.city} ${location.state} | ${businessName}`;
  const description = `Professional ${displayCategory.toLowerCase()} services in ${location.city}, ${location.state}. ${businessName} serves ${location.city} homeowners. Call ${config.business.phone} for a free estimate.`;

  // Noindex pages without unique content
  const hasUniqueContent = (
    (location.neighborhoods && location.neighborhoods.length > 0) ||
    (location.landmarks && location.landmarks.length > 0) ||
    location.description
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${config.business.url}/locations/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${config.business.url}/locations/${location.slug}`,
      siteName: businessName,
    },
    // Noindex weak pages
    ...(location.index === false || !hasUniqueContent ? { robots: { index: false } } : {}),
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getAreaBySlug(params.city);
  if (!location) notFound();

  const businessName = getBusinessName();
  const displayCategory = getDisplayCategory();
  const schemaType = getSchemaType();
  const services = getAllServices();
  const nearbyLocations = getAllServiceAreas().filter(a => a.slug !== location.slug).slice(0, 6);

  // Create location-specific config for schema
  const locationOverride = {
    address: {
      ...config.address,
      city: location.city,
      state: location.state,
    },
  };

  // Generate schemas
  const localBusinessSchema = generateLocalBusinessSchema(locationOverride);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Locations', url: `${config.business.url}/locations` },
    { name: location.city, url: `${config.business.url}/locations/${location.slug}` },
  ]);

  // Location-specific FAQs
  const faqs = [
    {
      question: `What services does ${businessName} offer in ${location.city}?`,
      answer: `We offer ${services.map(s => s.name.toLowerCase()).join(', ')} for homeowners in ${location.city}, ${location.state}.`,
    },
    {
      question: `How can I get a free estimate in ${location.city}?`,
      answer: `Call ${config.business.phone} or fill out our online form for a free, no-obligation estimate. We serve ${location.city} and all surrounding areas.`,
    },
    {
      question: `What areas of ${location.city} do you serve?`,
      answer: location.neighborhoods && location.neighborhoods.length > 0
        ? `We serve all of ${location.city} including ${location.neighborhoods.join(', ')}.`
        : `We serve all of ${location.city} and surrounding areas in ${location.county || location.state}.`,
    },
    {
      question: `Are you licensed to work in ${location.city}?`,
      answer: `Yes, ${businessName} is fully licensed and insured to provide services throughout ${location.city}, ${location.state}.`,
    },
  ];
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={[localBusinessSchema, breadcrumbSchema, faqSchema]} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: location.city },
          ]}
        />

        {/* H1 with location */}
        <h1 className="text-4xl font-bold mb-6">
          {displayCategory} in {location.city}, {location.state}
        </h1>

        {/* Answer Block for AI Overview */}
        <section className="answer-block bg-gray-50 p-6 rounded-lg border-l-4 border-primary mb-10">
          <p className="text-lg mb-4">
            <strong>{businessName}</strong> provides professional {displayCategory.toLowerCase()} services 
            to homeowners in {location.city}, {location.state}
            {location.neighborhoods && location.neighborhoods.length > 0 && 
              ` including ${location.neighborhoods.slice(0, 3).join(', ')}`
            }.
            Call <a href={`tel:${config.business.phone}`} className="text-primary font-semibold">{config.business.phone}</a> for a free estimate.
          </p>
          <ul className="space-y-1">
            <li>✓ Serving {location.city} and {location.county || 'surrounding areas'}</li>
            <li>✓ Free estimates with transparent pricing</li>
            <li>✓ Licensed and insured professionals</li>
            <li>✓ {services.length} services available</li>
          </ul>
        </section>

        {/* City Map */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Serving {location.city}, {location.state}</h2>
          <CityMapEmbed
            city={location.city}
            state={location.state}
            height="350"
          />
        </section>

        {/* Services in This Location */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Services in {location.city}</h2>
          <ServiceGrid
            services={services.map(s => ({
              name: s.name,
              slug: s.slug,
              description: s.description || '',
              priceRange: s.priceRange,
            }))}
            citySlug={location.slug}
            columns={3}
          />
        </section>

        {/* Local Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">About {location.city}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {location.description || 
              `${businessName} is proud to serve the ${location.city} community with professional 
              ${displayCategory.toLowerCase()} services. Our team understands the unique needs of 
              ${location.city} homeowners and delivers exceptional results on every project.`
            }
          </p>
          
          {location.landmarks && location.landmarks.length > 0 && (
            <p className="text-gray-700 leading-relaxed">
              We serve homes throughout {location.city}, from neighborhoods near {location.landmarks[0]} to 
              areas around {location.landmarks.slice(1).join(' and ')}. No matter where you're located in {location.city}, 
              we're here to help.
            </p>
          )}
        </section>

        {/* Neighborhoods */}
        {location.neighborhoods && location.neighborhoods.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Neighborhoods We Serve in {location.city}</h2>
            <div className="flex flex-wrap gap-2">
              {location.neighborhoods.map((neighborhood, i) => (
                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full">
                  {neighborhood}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Nearby Locations */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Also Serving Nearby Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nearbyLocations.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                {area.city}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ - schema handled at page level */}
        <FAQ faqs={faqs} title={`${displayCategory} in ${location.city} - FAQs`} includeSchema={false} />

        {/* CTA */}
        <div className="mt-12">
          <CTABanner
            title={`Need a ${displayCategory} in ${location.city}?`}
            subtitle={`Contact ${businessName} today for your free estimate.`}
          />
        </div>
      </div>
    </>
  );
}
