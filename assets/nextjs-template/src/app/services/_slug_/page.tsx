// src/app/services/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
import CTABanner from '@/components/CTABanner';
import AICitationBlock from '@/components/AICitationBlock';
import ProjectGallery from '@/components/ProjectGallery';

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
  const otherServices = getAllServices().filter(s => s.slug !== service.slug).slice(0, 4);
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

  // Service-specific FAQs
  const faqs = service.faqs || [
    {
      question: `How much does ${service.name.toLowerCase()} cost?`,
      answer: service.priceRange 
        ? `${service.name} typically costs ${service.priceRange}. Contact us for a free, personalized estimate.`
        : `Pricing varies based on the scope of work. Contact us for a free estimate.`,
    },
    {
      question: `How long does ${service.name.toLowerCase()} take?`,
      answer: service.duration 
        ? `Most ${service.name.toLowerCase()} projects take ${service.duration}. We'll provide a timeline with your estimate.`
        : `Project duration depends on the scope. We'll discuss timeline during your consultation.`,
    },
    {
      question: `Do you offer free estimates for ${service.name.toLowerCase()}?`,
      answer: `Yes! ${businessName} provides free, no-obligation estimates. Call ${config.business.phone} to schedule.`,
    },
  ];
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={[serviceSchema, offerSchema, howToSchema, imageGallerySchema, breadcrumbSchema, faqSchema]} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.name },
          ]}
        />

        {/* H1 with keyword */}
        <h1 className="text-4xl font-bold mb-6">
          {service.name} in {config.address.city}, {config.address.state}
        </h1>

        {/* Answer Block for AI Overview */}
        <AICitationBlock service={service} className="mb-10" />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Description */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">About Our {service.name} Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {service.longDescription || service.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you need {service.name.toLowerCase()} for a single room or your entire property, 
                our experienced team delivers exceptional results. We use quality materials and proven 
                techniques to ensure lasting satisfaction.
              </p>
            </section>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
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

            {/* Our Process */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Our {service.name} Process</h2>
              <div className="space-y-4">
                {(service.process && service.process.length > 0
                  ? service.process.map((step) => ({
                      step: step.step,
                      title: step.name,
                      desc: step.description,
                    }))
                  : [
                      { step: 1, title: 'Free Consultation', desc: 'We discuss your needs and provide a detailed estimate.' },
                      { step: 2, title: 'Preparation', desc: 'We prepare the area and protect your belongings.' },
                      { step: 3, title: 'Expert Work', desc: 'Our professionals complete the work to your specifications.' },
                      { step: 4, title: 'Final Walkthrough', desc: 'We review the completed work with you to ensure satisfaction.' },
                    ]
                ).map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Materials / Brands */}
            {service.materials && service.materials.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Materials & Brands We Use</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-primary">✓</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Common Issues */}
            {service.commonIssues && service.commonIssues.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Common Issues We Fix</h2>
                <ul className="space-y-3">
                  {service.commonIssues.map((issue, i) => (
                    <li key={i} className="bg-gray-50 p-4 rounded-lg">
                      {issue}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Project Gallery */}
            {service.showProjects !== false && projects.length > 0 && (
              <section className="mb-10">
                <ProjectGallery serviceSlug={service.slug} title={`${service.name} Projects`} columns={2} />
              </section>
            )}

            {/* Service Areas for This Service */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{service.name} Service Areas</h2>
              <p className="text-gray-600 mb-4">
                We provide {service.name.toLowerCase()} services throughout {config.address.city} and neighboring communities:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/locations/${area.slug}/${service.slug}`}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center text-sm"
                  >
                    {service.name} in {area.city}
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ - schema handled at page level */}
            <FAQ faqs={faqs} title={`${service.name} FAQs`} includeSchema={false} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Contact */}
            <div className="bg-primary text-white p-6 rounded-lg mb-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Get a Free Estimate</h3>
              <p className="mb-6 text-white/90">
                Ready to get started with {service.name.toLowerCase()}? Contact us today!
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
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-4">Other Services</h3>
              <ul className="space-y-2">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-primary hover:underline"
                    >
                      {s.name}
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
            title={`Ready for Professional ${service.name}?`}
            subtitle={`Get your free estimate from ${businessName} today.`}
          />
        </div>
      </div>
    </>
  );
}
