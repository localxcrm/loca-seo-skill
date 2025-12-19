// src/app/locations/[city]/[service]/page.tsx - EJS Style Location+Service Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  config,
  getAreaBySlug,
  getServiceBySlug,
  getAllServiceAreas,
  getAllServices,
  getBusinessName,
  getProjectsForService,
  shouldIndexCombo,
} from '@/lib/site';
import {
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateServiceOfferSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import FAQ from '@/components/FAQ';
import AICitationBlock from '@/components/AICitationBlock';
import LocalDeepParagraph from '@/components/LocalDeepParagraph';
import ProjectGallery from '@/components/ProjectGallery';
import ContactForm from '@/components/ContactForm';
import Reviews from '@/components/Reviews';
import ManufacturerLogos from '@/components/ManufacturerLogos';
import TrustBadges from '@/components/TrustBadges';
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

  const shouldIndex = shouldIndexCombo(location, service);
  const ogImages = config.seo?.ogImage ? [{ url: config.seo.ogImage }] : [];

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
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map(i => i.url),
    },
    ...(shouldIndex ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function LocationServicePage({ params }: LocationServicePageProps) {
  const location = getAreaBySlug(params.city);
  const service = getServiceBySlug(params.service);

  if (!location || !service) notFound();

  const businessName = getBusinessName();
  const allServices = getAllServices();
  const allAreas = getAllServiceAreas();
  const projects = getProjectsForService(service.slug);

  // Get related services (same category) and other services
  const relatedServices = allServices.filter(s =>
    s.slug !== service.slug && s.category === service.category
  ).slice(0, 6);
  const otherServices = allServices.filter(s =>
    s.slug !== service.slug && s.category !== service.category
  ).slice(0, 8);

  // Get nearby cities (more than before)
  const nearbyCities = allAreas.filter(a => a.slug !== location.slug);

  // Generate schemas
  const comboUrl = `${config.business.url}/locations/${location.slug}/${service.slug}`;
  const serviceSchema = generateServiceSchema(service, {
    url: comboUrl,
    areaServed: `${location.city}, ${location.state}`,
  });
  const offerSchema = generateServiceOfferSchema(service, `${location.city}, ${location.state}`);
  const localBusinessSchema = generateLocalBusinessSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Locations', url: `${config.business.url}/locations` },
    { name: location.city, url: `${config.business.url}/locations/${location.slug}` },
    { name: service.name, url: comboUrl },
  ]);

  // Location + service specific FAQs
  const faqs = [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${location.city}?`,
      answer: service.priceRange
        ? `${service.name} in ${location.city} typically costs ${service.priceRange}. Pricing varies based on the scope of work, materials selected, and project complexity. Contact ${businessName} for a free, personalized estimate.`
        : `Pricing for ${service.name.toLowerCase()} in ${location.city} depends on the scope and complexity of the project. Contact us for a free estimate.`,
    },
    {
      question: `Do you offer free estimates for ${service.name.toLowerCase()} in ${location.city}?`,
      answer: `Yes! ${businessName} provides free, no-obligation estimates for ${service.name.toLowerCase()} in ${location.city} and surrounding areas. Call ${config.business.phone} or fill out our contact form to schedule yours.`,
    },
    {
      question: `What ${service.name.toLowerCase()} options are best for ${location.city} weather?`,
      answer: service.materials && service.materials.length > 0
        ? `For ${location.city}'s climate, we recommend ${service.materials.slice(0, 2).join(' and ')}. These materials are designed to withstand local weather conditions while maintaining their appearance for years.`
        : `We offer a variety of ${service.name.toLowerCase()} options suited for ${location.city}'s climate. Our team will recommend the best materials during your free consultation.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} take in ${location.city}?`,
      answer: service.duration
        ? `Most ${service.name.toLowerCase()} projects in ${location.city} take ${service.duration}. We'll provide a detailed timeline with your estimate.`
        : `Project duration depends on the scope of work. We'll discuss timeline during your free consultation.`,
    },
    {
      question: `What areas of ${location.city} do you serve?`,
      answer: location.neighborhoods && location.neighborhoods.length > 0
        ? `We provide ${service.name.toLowerCase()} throughout all of ${location.city} including ${location.neighborhoods.join(', ')}. No matter where you're located in ${location.city}, we've got you covered.`
        : `We serve all of ${location.city} and surrounding areas for ${service.name.toLowerCase()}. Our team is familiar with the local area and ready to help.`,
    },
    {
      question: `Are you licensed and insured for work in ${location.city}?`,
      answer: config.business.licenses && config.business.licenses.length > 0
        ? `Yes, ${businessName} is fully licensed (${config.business.licenses.map(l => `${l.type} #${l.number}`).join(', ')}) and insured for all work in ${location.city} and throughout ${location.state}.`
        : `Yes, ${businessName} is fully licensed and insured for all work in ${location.city}. We carry comprehensive liability insurance for your peace of mind.`,
    },
  ];
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={[serviceSchema, offerSchema, localBusinessSchema, breadcrumbSchema, faqSchema]} />

      {/* 1. HERO SECTION */}
      <section className="location-hero relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-28">
        {/* Background Image */}
        {(service.heroImage || service.image || config.business.heroImage) && (
          <div className="absolute inset-0 z-0">
            <Image
              src={service.heroImage || service.image || config.business.heroImage}
              alt=""
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: location.city, href: `/locations/${location.slug}` },
                { label: service.name },
              ]}
              className="justify-center text-white/80"
            />
          </div>

          <p className="text-primary font-semibold text-lg mb-4 uppercase tracking-wide">
            Premier {service.name} Services
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {service.name} in {location.city}, {location.state}
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {service.tagline || `Professional ${service.name.toLowerCase()} services for ${location.city} homeowners. Quality craftsmanship backed by ${config.business.yearsInBusiness || '10'}+ years of experience.`}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#quote-form"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              {config.ui?.ctaButtonText || 'Get a Free Quote'}
            </Link>
            <a
              href={`tel:${config.business.phone}`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              📞 Call {config.business.phone}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/80">
            {config.business.yearsInBusiness && (
              <span className="flex items-center gap-2">
                <span>✓</span> {config.business.yearsInBusiness}+ Years Experience
              </span>
            )}
            {config.reviews?.rating && (
              <span className="flex items-center gap-2">
                <span>⭐</span> {config.reviews.rating} Star Rating
              </span>
            )}
            {config.business.warranty && (
              <span className="flex items-center gap-2">
                <span>🛡️</span> {config.business.warranty}
              </span>
            )}
            {config.business.licenses && config.business.licenses.length > 0 && (
              <span className="flex items-center gap-2">
                <span>✓</span> Licensed & Insured
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW */}
      <section className="service-overview py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* AI Citation Block */}
          <AICitationBlock service={service} location={location} className="mb-10" />

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {service.longDescription || service.description ||
                `Looking for professional ${service.name.toLowerCase()} in ${location.city}? ${businessName} has been serving ${location.city} homeowners with quality workmanship and exceptional customer service.`
              }
            </p>
            <p className="text-gray-600">
              {businessName} is your trusted {service.name.toLowerCase()} contractor serving {location.city} and throughout {location.county ? `${location.county} County` : location.state}.
              With {config.business.yearsInBusiness || '10'}+ years of experience, we deliver exceptional results on every project.
              {config.business.warranty && ` All work is backed by our ${config.business.warranty}.`}
            </p>
          </div>
        </div>
      </section>

      {/* 3. RELATED SERVICES GRID */}
      {relatedServices.length > 0 && (
        <section className="related-services py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {service.category || service.name} Services in {location.city}
              </h2>
              <p className="text-gray-600">
                Explore our full range of {(service.category || service.name).toLowerCase()} services available in {location.city}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/locations/${location.slug}/${s.slug}`}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {s.icon && (
                    <span className="text-3xl mb-3 block">{s.icon}</span>
                  )}
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {s.description}
                  </p>
                  <span className="text-primary font-medium text-sm">
                    Learn More →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. OTHER SERVICES */}
      {otherServices.length > 0 && (
        <section className="other-services py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Other Services in {location.city}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/locations/${location.slug}/${s.slug}`}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-primary hover:text-white transition-colors group"
                >
                  {s.icon && <span className="text-xl">{s.icon}</span>}
                  <span className="font-medium text-sm">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. QUOTE FORM */}
      <section id="quote-form" className="quote-form py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Get Your Free {service.name} Estimate in {location.city}
            </h2>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we&apos;ll get back to you within 24 hours with a personalized quote.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ContactForm
              title=""
              subtitle=""
              showAddress={true}
              showAttribution={true}
              showFileUpload={true}
              service={service.name}
            />
          </div>
        </div>
      </section>

      {/* 6. FEATURES / WHAT'S INCLUDED */}
      {service.features && service.features.length > 0 && (
        <section className="features py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                What&apos;s Included in Our {service.name}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. MATERIALS / QUALITY */}
      {service.materials && service.materials.length > 0 && (
        <section className="materials py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Premium Materials for {location.city} Homes
                </h2>
                <p className="text-gray-600 mb-6">
                  We use only the highest quality materials from trusted manufacturers to ensure your {service.name.toLowerCase()} project stands the test of time and {location.city}&apos;s weather conditions.
                </p>
                <ul className="space-y-3">
                  {service.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="font-bold text-xl mb-4">Why Quality Matters</h3>
                <p className="text-gray-600 mb-4">
                  {location.city}&apos;s climate demands materials that can withstand the elements. Our premium products offer:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Superior durability and longevity</li>
                  <li>• Low maintenance requirements</li>
                  <li>• Manufacturer warranties</li>
                  <li>• Enhanced curb appeal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. TEAM CREDENTIALS */}
      <section className="credentials py-16 px-6 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why {location.city} Homeowners Choose {businessName}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Experience */}
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {config.business.yearsInBusiness || '10'}+
              </div>
              <div className="text-white/80">Years of Experience</div>
            </div>

            {/* Warranty */}
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {config.business.warranty?.match(/\d+/)?.[0] || '100'}%
              </div>
              <div className="text-white/80">
                {config.business.warranty?.includes('Year') ? 'Year Warranty' : 'Satisfaction Guarantee'}
              </div>
            </div>

            {/* Reviews */}
            {config.reviews?.rating && (
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {config.reviews.rating}★
                </div>
                <div className="text-white/80">
                  Based on {config.reviews.count}+ Reviews
                </div>
              </div>
            )}

            {/* Licensed */}
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">✓</div>
              <div className="text-white/80">
                {config.business.licenses && config.business.licenses.length > 0
                  ? config.business.licenses.map(l => `${l.type} #${l.number}`).join(', ')
                  : 'Licensed & Insured'
                }
              </div>
            </div>
          </div>

          {/* Certifications */}
          {config.manufacturers && config.manufacturers.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-white/80 mb-4">Certified installer for:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {config.manufacturers.slice(0, 5).map((m, i) => (
                  <span key={i} className="bg-white/10 px-4 py-2 rounded-full text-sm">
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="mt-8">
            <TrustBadges layout="horizontal" showLabels={true} className="text-white" />
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY CONTEXT */}
      <section className="community py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Serving the {location.city} Community
            </h2>
          </div>

          {/* Local Deep Paragraph */}
          <div className="bg-gray-50 p-8 rounded-2xl mb-8">
            <LocalDeepParagraph location={location} service={service} />
          </div>

          {/* Fun Fact (if landmarks available) */}
          {location.landmarks && location.landmarks.length > 0 && (
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
              <p className="font-semibold text-primary mb-2">📍 Local Insight</p>
              <p className="text-gray-700">
                From homes near {location.landmarks[0]} to properties around {location.landmarks.slice(1, 3).join(' and ')},
                {businessName} has been providing quality {service.name.toLowerCase()} services throughout {location.city}.
                Our familiarity with {location.city}&apos;s unique neighborhoods helps us deliver results that complement your home and community.
              </p>
            </div>
          )}

          {/* Neighborhoods */}
          {location.neighborhoods && location.neighborhoods.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-xl mb-4">{location.city} Neighborhoods We Serve</h3>
              <div className="flex flex-wrap gap-2">
                {location.neighborhoods.map((neighborhood, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. MANUFACTURER PARTNERS */}
      <ManufacturerLogos
        title={`Trusted Brands for ${location.city} Projects`}
        className="bg-gray-50"
      />

      {/* 11. PROJECT GALLERY */}
      {service.showProjects !== false && projects.length > 0 && (
        <section className="gallery py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {service.name} Projects Near {location.city}
              </h2>
              <p className="text-gray-600">
                See examples of our work in {location.city} and surrounding areas.
              </p>
            </div>
            <ProjectGallery serviceSlug={service.slug} title="" columns={3} />
          </div>
        </section>
      )}

      {/* 12. TESTIMONIALS */}
      <section className="testimonials py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What {location.city} Homeowners Say
            </h2>
            {config.reviews?.rating && config.reviews?.count && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-yellow-500">{'★'.repeat(Math.round(config.reviews.rating))}</span>
                <span className="font-semibold">{config.reviews.rating}</span>
                <span className="text-gray-500">based on {config.reviews.count} reviews</span>
              </div>
            )}
          </div>
          <Reviews showHeader={false} limit={6} />
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="faq py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FAQ
            faqs={faqs}
            title={`${service.name} in ${location.city} - FAQs`}
            includeSchema={false}
          />
        </div>
      </section>

      {/* 14. SERVICE AREA MAP */}
      <section className="map py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {service.name} Throughout {location.city}
              </h2>
              <p className="text-gray-600 mb-6">
                {businessName} provides {service.name.toLowerCase()} services throughout {location.city} and all of {location.county ? `${location.county} County` : location.state}.
                No matter where you&apos;re located, our team is ready to help with your project.
              </p>
              <CityMapEmbed
                city={location.city}
                state={location.state}
                height="300"
              />
            </div>

            {/* Nearby Cities Grid */}
            <div>
              <h3 className="font-bold text-xl mb-6">
                {service.name} in Nearby Cities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {nearbyCities.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/locations/${area.slug}/${service.slug}`}
                    className="p-3 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium shadow-sm text-center"
                  >
                    {area.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. BOTTOM CTA */}
      <section className="bottom-cta py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for {service.name} in {location.city}?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Contact {businessName} today for your free estimate. We&apos;re proud to serve {location.city} homeowners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#quote-form"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              {config.ui?.ctaButtonText || 'Get a Free Quote'}
            </Link>
            <a
              href={`tel:${config.business.phone}`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              📞 Call {config.business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
