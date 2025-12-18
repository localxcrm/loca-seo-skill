// src/app/page.tsx - Homepage
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
import CTABanner from '@/components/CTABanner';
import AICitationBlock from '@/components/AICitationBlock';

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
  // Include aggregateRating in LocalBusiness (only on homepage/about)
  const localBusinessSchema = generateLocalBusinessSchema(undefined, { 
    includeAggregateRating: true 
  });
  const websiteSchema = generateWebsiteSchema();
  // FAQ schema only here, not in FAQ component (avoids duplication)
  const faqSchema = generateFAQSchema(config.defaultFAQs);

  return (
    <>
      <SchemaMarkup schema={[localBusinessSchema, websiteSchema, faqSchema]} />

      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {businessName}
              </h1>
              <p className="text-xl mb-4 text-white/90">
                {config.business.tagline}
              </p>
              <p className="text-lg mb-8 text-white/80">
                {config.business.description}
              </p>
              
              {/* USPs */}
              <ul className="space-y-2 mb-8">
                {config.content?.usps?.slice(0, 4).map((usp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>{usp}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {config.ui?.ctaButtonText || 'Get Free Estimate'}
                </Link>
                <a
                  href={`tel:${config.business.phone}`}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  📞 {config.business.phone}
                </a>
              </div>
            </div>

            {/* Hero Image - using next/image for better CWV */}
            <div className="hidden lg:block relative aspect-[4/3]">
              {config.business.image && (
                <Image
                  src={config.business.image}
                  alt={businessName}
                  fill
                  className="rounded-lg shadow-2xl object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Answer Block for AI Overview */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AICitationBlock
            customLead={`${businessName} is a trusted ${displayCategory.toLowerCase()} serving ${config.address.city}, ${config.address.state}`}
            additionalPoints={[
              services.length > 0
                ? `Services include ${services.slice(0, 3).map(s => s.name).join(', ')}`
                : 'Multiple services available',
            ]}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
            }))}
            columns={3}
          />

          <div className="text-center mt-10">
            <Link 
              href="/services" 
              className="text-primary font-semibold hover:underline"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose {businessName}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.content?.usps?.map((usp, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">
                  {['🏆', '✨', '💯', '🤝', '⏰'][i % 5]}
                </div>
                <h3 className="font-semibold text-lg">{usp}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="service-areas py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ServiceAreaList 
            title={`Proudly Serving ${config.address.city} & Surrounding Areas`}
            columns={5}
          />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reviews />
        </div>
      </section>

      {/* FAQ Section - schema handled at page level, not in component */}
      <section className="faq py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <FAQ 
            faqs={config.defaultFAQs || []} 
            title="Frequently Asked Questions"
            includeSchema={false}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <CTABanner 
            title="Ready to Get Started?"
            subtitle={`Contact ${businessName} today for a free, no-obligation estimate.`}
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </>
  );
}
