// src/app/services/[slug]/page.tsx - EJS Style Service Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  config,
  getServiceBySlug,
  getAllServiceSlugs,
  getAllServices,
  getAllServiceAreas,
  getBusinessName,
  getProjectsForService,
  shouldIndexService,
} from '@/lib/site';
import {
  generateServiceSchema,
  generateServiceOfferSchema,
  generateHowToSchema,
  generateImageGallerySchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import FAQ from '@/components/FAQ';
import AICitationBlock from '@/components/AICitationBlock';
import ProjectGallery from '@/components/ProjectGallery';
import ContactForm from '@/components/ContactForm';
import Reviews from '@/components/Reviews';
import ManufacturerLogos from '@/components/ManufacturerLogos';
import TrustBadges from '@/components/TrustBadges';

interface ServicePageProps {
  params: { slug: string };
}

// Generate all service pages statically
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const businessName = getBusinessName();
  const title = `${service.name} ${config.address.city} ${config.address.state} | ${businessName}`;
  const description = service.description ||
    `Professional ${service.name.toLowerCase()} services in ${config.address.city}, ${config.address.state}. Call ${config.business.phone} for a free estimate.`;
  const shouldIndex = shouldIndexService(service);
  const ogImages = config.seo?.ogImage ? [{ url: config.seo.ogImage }] : [];

  return {
    title,
    description,
    alternates: {
      canonical: `${config.business.url}/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${config.business.url}/services/${service.slug}`,
      siteName: businessName,
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

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const businessName = getBusinessName();
  const serviceAreas = getAllServiceAreas();
  const otherServices = getAllServices().filter(s => s.slug !== service.slug).slice(0, 6);
  const projects = getProjectsForService(service.slug);

  // Generate schemas
  const serviceSchema = generateServiceSchema(service);
  const offerSchema = generateServiceOfferSchema(service);
  const howToSchema = generateHowToSchema(
    `How We ${service.name}`,
    `Our step-by-step ${service.name.toLowerCase()} process in ${config.address.city}, ${config.address.state}.`,
    service.process || []
  );
  const imageGallerySchema = projects.length > 0
    ? generateImageGallerySchema(
        `${service.name} Projects`,
        projects.slice(0, 6).flatMap(p => ([
          {
            url: p.afterImage,
            name: `${p.title} - After`,
            description: p.description,
            caption: `After: ${p.title}`,
            contentLocation: p.location,
          },
          {
            url: p.beforeImage,
            name: `${p.title} - Before`,
            description: p.description,
            caption: `Before: ${p.title}`,
            contentLocation: p.location,
          },
        ]))
      )
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Services', url: `${config.business.url}/services` },
    { name: service.name, url: `${config.business.url}/services/${service.slug}` },
  ]);

  // Service-specific FAQs (use service FAQs or generate defaults)
  const faqs = service.faqs || [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${config.address.city}?`,
      answer: service.priceRange
        ? `${service.name} typically costs ${service.priceRange} in the ${config.address.city} area. Pricing depends on project scope, materials, and complexity. Contact us for a free, personalized estimate.`
        : `Pricing varies based on the scope of work, materials selected, and project complexity. Contact ${businessName} for a free estimate.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} take?`,
      answer: service.duration
        ? `Most ${service.name.toLowerCase()} projects take ${service.duration}. We'll provide a detailed timeline with your estimate.`
        : `Project duration depends on the scope and complexity. During your consultation, we'll discuss the expected timeline for your specific project.`,
    },
    {
      question: `Do you offer warranties on ${service.name.toLowerCase()}?`,
      answer: config.business.warranty
        ? `Yes! ${businessName} offers a ${config.business.warranty} on all our work. We stand behind the quality of our craftsmanship.`
        : `Yes, we stand behind our work with comprehensive warranties. Ask about our warranty coverage during your consultation.`,
    },
    {
      question: `Do you offer free estimates for ${service.name.toLowerCase()}?`,
      answer: `Absolutely! ${businessName} provides free, no-obligation estimates for all ${service.name.toLowerCase()} projects. Call ${config.business.phone} or fill out our contact form to schedule yours.`,
    },
    {
      question: `What areas do you serve for ${service.name.toLowerCase()}?`,
      answer: `We provide ${service.name.toLowerCase()} services throughout ${config.address.city}, ${config.address.state} and surrounding communities including ${serviceAreas.slice(0, 5).map(a => a.city).join(', ')}, and more.`,
    },
    {
      question: `Are you licensed and insured?`,
      answer: config.business.licenses && config.business.licenses.length > 0
        ? `Yes, ${businessName} is fully licensed (${config.business.licenses.map(l => `${l.type} #${l.number}`).join(', ')}) and insured. We carry comprehensive liability insurance for your peace of mind.`
        : `Yes, ${businessName} is fully licensed and insured. We carry comprehensive liability insurance to protect you and your property.`,
    },
  ];
  const faqSchema = generateFAQSchema(faqs);

  // Service benefits (use service-specific or defaults)
  const benefits = service.benefits || [
    {
      icon: '🏡',
      title: 'Enhanced Living',
      description: `Transform your home with professional ${service.name.toLowerCase()} that adds beauty and functionality.`,
    },
    {
      icon: '📈',
      title: 'Increased Value',
      description: 'Quality improvements that boost your property value and curb appeal.',
    },
    {
      icon: '🛡️',
      title: 'Built to Last',
      description: 'We use premium materials and proven techniques for long-lasting results.',
    },
    {
      icon: '👷',
      title: 'Licensed Experts',
      description: `${config.business.yearsInBusiness || '10'}+ years of experience and fully licensed professionals.`,
    },
  ];

  return (
    <>
      <SchemaMarkup schema={[serviceSchema, offerSchema, howToSchema, imageGallerySchema, breadcrumbSchema, faqSchema]} />

      {/* 1. HERO SECTION */}
      <section className="service-hero relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-28">
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
                { label: 'Services', href: '/services' },
                { label: service.name },
              ]}
              className="justify-center text-white/80"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {service.name} in {config.address.city}, {config.address.state}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {service.tagline || `Professional ${service.name.toLowerCase()} services from ${businessName}. Quality craftsmanship backed by ${config.business.yearsInBusiness || '10'}+ years of experience.`}
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
            {config.financing?.available && (
              <span className="flex items-center gap-2">
                <span>💳</span> Financing Available
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

      {/* 2. INTRO / SERVICE OVERVIEW */}
      <section className="service-intro py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* AI Citation Block */}
          <AICitationBlock service={service} className="mb-10" />

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {service.longDescription || service.description}
            </p>
            <p className="text-gray-600">
              {businessName} is your trusted {service.name.toLowerCase()} contractor in {config.address.city} and throughout {config.serviceAreas?.[0]?.region || config.address.state}.
              With {config.business.yearsInBusiness || '10'}+ years of experience, we deliver exceptional results on every project.
              {config.business.warranty && ` All work is backed by our ${config.business.warranty}.`}
            </p>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION (4 columns) */}
      <section className="service-benefits py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Our {service.name} Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUOTE FORM SECTION */}
      <section id="quote-form" className="quote-form py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Get Your Free {service.name} Estimate
            </h2>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we&apos;ll get back to you within 24 hours with a personalized quote.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
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

      {/* 5. FEATURES / WHAT'S INCLUDED */}
      {service.features && service.features.length > 0 && (
        <section className="service-features py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                What&apos;s Included
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our {service.name.toLowerCase()} service includes everything you need for a successful project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. OUR PROCESS */}
      <section className="service-process py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our {service.name} Process
            </h2>
            <p className="text-gray-600">
              We make {service.name.toLowerCase()} simple and stress-free with our proven process.
            </p>
          </div>

          <div className="space-y-6">
            {(service.process && service.process.length > 0
              ? service.process.map((step) => ({
                  step: step.step,
                  title: step.name,
                  desc: step.description,
                }))
              : [
                  { step: 1, title: 'Free Consultation', desc: 'We visit your property, discuss your goals, and provide a detailed estimate with no obligation.' },
                  { step: 2, title: 'Design & Planning', desc: 'We work with you to finalize materials, colors, and design details for your project.' },
                  { step: 3, title: 'Professional Installation', desc: 'Our experienced team completes the work efficiently while protecting your property.' },
                  { step: 4, title: 'Final Walkthrough', desc: 'We review the completed project together to ensure your complete satisfaction.' },
                ]
            ).map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1 bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="why-choose-us py-16 px-6 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose {businessName}?
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

            {/* Local */}
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">🏠</div>
              <div className="text-white/80">Locally Owned & Operated</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <TrustBadges layout="horizontal" showLabels={true} className="text-white" />
          </div>
        </div>
      </section>

      {/* 8. MANUFACTURER PARTNERS */}
      <ManufacturerLogos
        title={`Trusted ${service.name} Brands We Work With`}
        className="bg-gray-50"
      />

      {/* 9. PROJECT GALLERY */}
      {service.showProjects !== false && projects.length > 0 && (
        <section className="project-gallery py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Our {service.name} Projects
              </h2>
              <p className="text-gray-600">
                See examples of our {service.name.toLowerCase()} work in {config.address.city} and surrounding areas.
              </p>
            </div>
            <ProjectGallery serviceSlug={service.slug} title="" columns={3} />
          </div>
        </section>
      )}

      {/* 10. TESTIMONIALS */}
      <section className="testimonials py-16 px-6 bg-gray-50">
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
          <Reviews showHeader={false} limit={6} />
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="faq py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FAQ
            faqs={faqs}
            title={`${service.name} FAQs`}
            includeSchema={false}
          />
        </div>
      </section>

      {/* 12. SERVICE AREAS */}
      <section className="service-areas py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {service.name} Service Areas
            </h2>
            <p className="text-gray-600">
              We provide {service.name.toLowerCase()} services throughout {config.address.city} and neighboring communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}/${service.slug}`}
                className="p-4 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors text-center text-sm font-medium shadow-sm"
              >
                {area.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 13. OTHER SERVICES */}
      <section className="other-services py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Other Services We Offer
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-gray-50 p-6 rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
                {s.icon && (
                  <span className="text-3xl mb-3 block">{s.icon}</span>
                )}
                <h3 className="font-bold text-lg mb-2 group-hover:text-white">{s.name}</h3>
                <p className="text-gray-600 text-sm group-hover:text-white/80">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>

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

      {/* 14. BOTTOM CTA */}
      <section className="bottom-cta py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Contact {businessName} today for your free {service.name.toLowerCase()} estimate.
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
