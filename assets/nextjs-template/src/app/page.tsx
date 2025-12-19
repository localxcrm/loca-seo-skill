// src/app/page.tsx - Homepage (EJS Style)
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  config,
  getDisplayCategory,
  getBusinessName,
  getAllServices,
} from '@/lib/site';
import {
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateFAQSchema
} from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ServiceGrid } from '@/components/ServiceCard';
import ServiceAreaList from '@/components/ServiceAreaList';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import TrustBadges from '@/components/TrustBadges';
import ManufacturerLogos from '@/components/ManufacturerLogos';

export const metadata: Metadata = {
  title: config.seo?.defaultTitle || `${config.business.name} - ${config.business.tagline}`,
  description: config.seo?.defaultDescription || config.business.description,
  alternates: {
    canonical: config.business.url,
  },
  openGraph: {
    title: config.seo?.defaultTitle || config.business.name,
    description: config.business.description,
    url: config.business.url,
    siteName: config.business.name,
    images: (config.seo?.ogImage || config.business.image) ? [{ url: config.seo?.ogImage || config.business.image }] : [],
    type: 'website',
  },
};

export default function HomePage() {
  const businessName = getBusinessName();
  const displayCategory = getDisplayCategory();
  const services = getAllServices();

  // Generate schemas for homepage
  const localBusinessSchema = generateLocalBusinessSchema(undefined, {
    includeAggregateRating: true
  });
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQSchema(config.defaultFAQs);

  return (
    <>
      <SchemaMarkup schema={[localBusinessSchema, websiteSchema, faqSchema]} />

      {/* 1. HERO SECTION - Full Width */}
      <section className="hero relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-28 px-6">
        {/* Background Image Overlay */}
        {config.business.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={config.business.heroImage}
              alt=""
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Go-To {displayCategory} Serving {config.address.city} & {config.serviceAreas?.[0]?.region || config.address.state}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {config.business.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
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

      {/* 2. INTRO / COMPANY SECTION */}
      <section className="intro py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Premier {displayCategory} in {config.address.city}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {config.business.description}
              </p>
              <p className="text-gray-600 mb-6">
                {config.content?.companyStory ||
                  `${businessName} is a family-owned business with over ${config.business.yearsInBusiness || '10'} years of experience serving homeowners in ${config.address.city} and surrounding areas. We take pride in delivering quality workmanship and exceptional customer service on every project.`
                }
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {config.business.yearsInBusiness && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{config.business.yearsInBusiness}+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                )}
                {config.reviews?.count && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{config.reviews.count}+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                )}
                {config.serviceAreas && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{config.serviceAreas.length}+</div>
                    <div className="text-sm text-gray-600">Areas Served</div>
                  </div>
                )}
                {services.length > 0 && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{services.length}+</div>
                    <div className="text-sm text-gray-600">Services Offered</div>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              {config.business.image ? (
                <Image
                  src={config.business.image}
                  alt={`${businessName} team`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Company Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="services py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Explore Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {businessName} offers a complete range of professional services
              for homeowners in {config.address.city} and surrounding areas.
            </p>
          </div>

          <ServiceGrid
            services={services.map(s => ({
              name: s.name,
              slug: s.slug,
              description: s.description || '',
              priceRange: s.priceRange,
              duration: s.duration,
              icon: s.icon,
            }))}
            columns={3}
            showIcons={true}
          />

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
            >
              View All Services
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="why-us py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose {businessName}?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Experience */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👷</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Experienced Team</h3>
              <p className="text-gray-600 text-sm">
                {config.business.yearsInBusiness || '10'}+ years of professional experience in the industry
              </p>
            </div>

            {/* Personalized Service */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Personalized Service</h3>
              <p className="text-gray-600 text-sm">
                Attention to detail on every project, big or small
              </p>
            </div>

            {/* Quality */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Commitment</h3>
              <p className="text-gray-600 text-sm">
                {config.business.warranty || '100% satisfaction guarantee on all work'}
              </p>
            </div>

            {/* Financing */}
            {config.financing?.available && (
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💳</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Financing Available</h3>
                <p className="text-gray-600 text-sm">
                  Flexible payment options through {config.financing.provider || 'our financing partners'}
                </p>
              </div>
            )}

            {/* Local Business - show if no financing */}
            {!config.financing?.available && (
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏠</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Locally Owned</h3>
                <p className="text-gray-600 text-sm">
                  Family-owned business serving our community
                </p>
              </div>
            )}
          </div>

          {/* Trust Badges Row */}
          <div className="mt-12">
            <TrustBadges layout="horizontal" showLabels={true} />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS / REVIEWS */}
      <section className="reviews-section py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What Our Customers Say
            </h2>
            {config.reviews?.rating && config.reviews?.count && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-yellow-500">{'★'.repeat(Math.round(config.reviews.rating))}</span>
                <span className="font-semibold">{config.reviews.rating}</span>
                <span className="text-gray-500">based on {config.reviews.count} reviews</span>
              </div>
            )}
          </div>
          <Reviews showHeader={false} />
        </div>
      </section>

      {/* 6. MANUFACTURER PARTNERS */}
      <ManufacturerLogos
        title="We Work With The Best Manufacturers"
        className="bg-white"
      />

      {/* 7. SERVICE AREAS */}
      <section className="service-areas py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ServiceAreaList
            title={`Proudly Serving ${config.address.city} & Surrounding Areas`}
            columns={5}
          />
        </div>
      </section>

      {/* 8. FAQ */}
      {config.defaultFAQs && config.defaultFAQs.length > 0 && (
        <section className="faq py-16 md:py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FAQ
              faqs={config.defaultFAQs}
              title="Frequently Asked Questions"
              includeSchema={false}
            />
          </div>
        </section>
      )}

      {/* 9. CONTACT FORM CTA */}
      <section className="contact-cta py-16 md:py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 text-lg">
              Contact us today for a free, no-obligation estimate on your project.
            </p>
          </div>
          <ContactForm
            title=""
            subtitle=""
            showAddress={true}
            showAttribution={true}
            showFileUpload={true}
          />
        </div>
      </section>
    </>
  );
}
