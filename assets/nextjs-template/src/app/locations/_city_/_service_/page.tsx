// src/app/locations/[city]/[service]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  config,
  getAreaBySlug,
  getServiceBySlug,
  getAllServiceAreas,
  getAllServices,
  getBusinessName,
  getDisplayCategory,
} from '@/lib/site';
import {
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import CityMapEmbed from '@/components/CityMapEmbed';

interface LocationServicePageProps {
  params: { city: string; service: string };
}

// Generate all city + service combinations for static generation
export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  
  getAllServiceAreas().forEach(area => {
    getAllServices().forEach(service => {
      params.push({
        city: area.slug,
        service: service.slug,
      });
    });
  });
  
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocationServicePageProps): Promise<Metadata> {
  const location = getAreaBySlug(params.city);
  const service = getServiceBySlug(params.service);
  
  if (!location || !service) return {};

  const businessName = getBusinessName();
  const title = `${service.name} ${location.city} ${location.state} | ${businessName}`;
  const description = `Professional ${service.name.toLowerCase()} services in ${location.city}, ${location.state}. ${businessName} offers expert ${service.name.toLowerCase()} for homeowners. Call ${config.business.phone} for a free estimate.`;

  // Determine if this page should be indexed
  // Index only if area has unique content (neighborhoods, landmarks, or description)
  const hasUniqueContent = (
    (location.neighborhoods && location.neighborhoods.length > 0) ||
    (location.landmarks && location.landmarks.length > 0) ||
    location.description
  );
  
  const shouldIndex = (
    location.index !== false &&
    service.index !== false &&
    hasUniqueContent
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${config.business.url}/locations/${params.city}/${params.service}`,
    },
    openGraph: {
      title,
      description,
      url: `${config.business.url}/locations/${params.city}/${params.service}`,
      siteName: businessName,
      type: 'website',
    },
    // Noindex weak pages without unique content
    ...(shouldIndex ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function LocationServicePage({ params }: LocationServicePageProps) {
  const location = getAreaBySlug(params.city);
  const service = getServiceBySlug(params.service);
  
  if (!location || !service) notFound();

  const businessName = getBusinessName();
  const displayCategory = getDisplayCategory();
  const allServices = getAllServices();
  const allAreas = getAllServiceAreas();
  
  // Get other services and nearby cities for internal linking
  const otherServices = allServices.filter(s => s.slug !== service.slug).slice(0, 4);
  const nearbyCities = allAreas.filter(a => a.slug !== location.slug).slice(0, 4);

  // Create location-specific config for schema
  const locationOverride = {
    address: {
      ...config.address,
      city: location.city,
      state: location.state,
    },
  };

  // Generate schemas
  const serviceSchema = generateServiceSchema(service);
  const localBusinessSchema = generateLocalBusinessSchema(locationOverride);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Locations', url: `${config.business.url}/locations` },
    { name: location.city, url: `${config.business.url}/locations/${location.slug}` },
    { name: service.name, url: `${config.business.url}/locations/${location.slug}/${service.slug}` },
  ]);

  // Location + service specific FAQs
  const faqs = [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${location.city}?`,
      answer: service.priceRange 
        ? `${service.name} in ${location.city} typically costs ${service.priceRange}. Pricing varies based on the scope of work. Contact us for a free, personalized estimate.`
        : `Pricing for ${service.name.toLowerCase()} in ${location.city} depends on the scope and complexity of the project. Contact us for a free estimate.`,
    },
    {
      question: `Do you offer free estimates for ${service.name.toLowerCase()} in ${location.city}?`,
      answer: `Yes! ${businessName} provides free, no-obligation estimates for ${service.name.toLowerCase()} in ${location.city} and surrounding areas. Call ${config.business.phone} to schedule.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} take in ${location.city}?`,
      answer: service.duration 
        ? `Most ${service.name.toLowerCase()} projects in ${location.city} take ${service.duration}. We'll provide a detailed timeline with your estimate.`
        : `Project duration depends on the scope of work. We'll discuss timeline during your free consultation.`,
    },
    {
      question: `What areas of ${location.city} do you serve for ${service.name.toLowerCase()}?`,
      answer: location.neighborhoods && location.neighborhoods.length > 0
        ? `We provide ${service.name.toLowerCase()} throughout ${location.city} including ${location.neighborhoods.join(', ')}.`
        : `We serve all of ${location.city} and surrounding areas for ${service.name.toLowerCase()}.`,
    },
  ];
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={[serviceSchema, localBusinessSchema, breadcrumbSchema, faqSchema]} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: location.city, href: `/locations/${location.slug}` },
            { label: service.name },
          ]}
        />

        {/* H1 with keyword + location */}
        <h1 className="text-4xl font-bold mb-6">
          {service.name} in {location.city}, {location.state}
        </h1>

        {/* Answer Block for AI Overview */}
        <section className="answer-block bg-gray-50 p-6 rounded-lg border-l-4 border-primary mb-10">
          <p className="text-lg mb-4">
            <strong>{businessName}</strong> provides professional <strong>{service.name.toLowerCase()}</strong> services 
            to homeowners in {location.city}, {location.state}
            {location.neighborhoods && location.neighborhoods.length > 0 && 
              ` including ${location.neighborhoods.slice(0, 3).join(', ')}`
            }.
            {service.priceRange && <> Pricing starts at <strong>{service.priceRange}</strong>.</>}
            {' '}Call <a href={`tel:${config.business.phone}`} className="text-primary font-semibold">{config.business.phone}</a> for a free estimate.
          </p>
          <ul className="space-y-1">
            <li>✓ Serving {location.city} and surrounding areas</li>
            <li>✓ Free estimates with transparent pricing</li>
            <li>✓ Licensed and insured professionals</li>
            {service.duration && <li>✓ Typical project time: {service.duration}</li>}
          </ul>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Description */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">
                About {service.name} in {location.city}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {service.longDescription || service.description || 
                  `Looking for professional ${service.name.toLowerCase()} in ${location.city}? ${businessName} has been serving ${location.city} homeowners with quality workmanship and exceptional customer service.`
                }
              </p>
              
              {/* Local content based on landmarks */}
              {location.landmarks && location.landmarks.length > 0 && (
                <p className="text-gray-700 leading-relaxed">
                  We provide {service.name.toLowerCase()} services throughout {location.city}, from homes near {location.landmarks[0]} to 
                  properties around {location.landmarks.slice(1, 3).join(' and ')}.
                </p>
              )}
            </section>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-primary">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* City Map */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{service.name} Service Area in {location.city}</h2>
              <CityMapEmbed
                city={location.city}
                state={location.state}
                height="300"
              />
            </section>

            {/* Neighborhoods if available */}
            {location.neighborhoods && location.neighborhoods.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  {location.city} Neighborhoods We Serve
                </h2>
                <div className="flex flex-wrap gap-2">
                  {location.neighborhoods.map((neighborhood, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 rounded-full">
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ - schema handled at page level */}
            <FAQ faqs={faqs} title={`${service.name} in ${location.city} - FAQs`} includeSchema={false} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Contact */}
            <div className="bg-primary text-white p-6 rounded-lg mb-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Get a Free Estimate</h3>
              <p className="mb-6 text-white/90">
                Ready for {service.name.toLowerCase()} in {location.city}? Contact us today!
              </p>
              <Link
                href="/contact"
                className="block w-full bg-white text-primary text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-4"
              >
                Request Estimate
              </Link>
              <a
                href={`tel:${config.business.phone}`}
                className="block w-full border-2 border-white text-white text-center py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                📞 {config.business.phone}
              </a>
            </div>

            {/* Pricing */}
            {service.priceRange && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-2">Pricing</h3>
                <p className="text-2xl font-bold text-primary">{service.priceRange}</p>
                <p className="text-sm text-gray-500 mt-1">*Varies by project scope</p>
              </div>
            )}

            {/* Other Services */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-4">Other Services in {location.city}</h3>
              <ul className="space-y-2">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/locations/${location.slug}/${s.slug}`}
                      className="text-primary hover:underline"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby Cities */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-4">{service.name} in Nearby Cities</h3>
              <ul className="space-y-2">
                {nearbyCities.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/locations/${area.slug}/${service.slug}`}
                      className="text-primary hover:underline"
                    >
                      {service.name} in {area.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <CTABanner
            title={`Ready for ${service.name} in ${location.city}?`}
            subtitle={`Get your free estimate from ${businessName} today.`}
          />
        </div>
      </div>
    </>
  );
}
