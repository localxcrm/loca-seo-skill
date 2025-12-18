import { Metadata } from 'next';
import Link from 'next/link';
import config from '../../../site.config';
import { generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import AICitationBlock from '@/components/AICitationBlock';

export const metadata: Metadata = {
  title: `Our Services | ${config.business.name}`,
  description: `${config.business.name} offers professional ${config.gbpCategories.primary.toLowerCase()} services in ${config.address.city}, ${config.address.state}. View all our services and get a free estimate.`,
  alternates: {
    canonical: `${config.business.url}/services`,
  },
  openGraph: {
    title: `Our Services | ${config.business.name}`,
    description: `${config.business.name} offers professional ${config.gbpCategories.primary.toLowerCase()} services in ${config.address.city}, ${config.address.state}.`,
    url: `${config.business.url}/services`,
    siteName: config.business.name,
    images: (config.seo?.ogImage || config.business.image) ? [{ url: config.seo?.ogImage || config.business.image }] : [],
    type: 'website',
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Services', url: `${config.business.url}/services` },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />

      <h1>Our {config.gbpCategories.primary} Services</h1>

      {/* Answer Block */}
      <AICitationBlock
        customLead={`${config.business.name} provides professional ${config.gbpCategories.primary.toLowerCase()} services in ${config.address.city}, ${config.address.state}`}
        additionalPoints={[
          `${config.services.filter((s) => s.index !== false).length} services available`,
        ]}
      />

      {/* Services Grid */}
      <section className="services-grid">
        {config.services
          .filter((service) => service.index !== false)
          .map((service) => (
            <article key={service.slug} className="service-card">
              <h2>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </h2>
              <p>{service.description}</p>
              {service.priceRange && (
                <p className="price-range">
                  <strong>Starting at:</strong> {service.priceRange}
                </p>
              )}
              {service.features && service.features.length > 0 && (
                <ul className="features-list">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              <Link href={`/services/${service.slug}`} className="btn btn-secondary">
                Learn More
              </Link>
            </article>
          ))}
      </section>

      {/* Service Areas */}
      <section>
        <h2>Service Areas</h2>
        <p>
          We provide {config.gbpCategories.primary.toLowerCase()} services throughout{' '}
          {config.address.city} and the following areas:
        </p>
        <ul className="service-areas-list">
          {config.serviceAreas
            .filter((area) => area.index !== false)
            .map((area) => (
              <li key={area.slug}>
                <Link href={`/locations/${area.slug}`}>
                  {config.gbpCategories.primary} in {area.city}
                </Link>
              </li>
            ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>
          Contact {config.business.name} today for a free, no-obligation estimate on any of
          our services.
        </p>
        <Link href="/contact" className="btn btn-primary">
          {config.ui.ctaButtonText}
        </Link>
        <a href={`tel:${config.business.phone}`} className="btn btn-secondary">
          Call {config.business.phone}
        </a>
      </section>
    </>
  );
}
