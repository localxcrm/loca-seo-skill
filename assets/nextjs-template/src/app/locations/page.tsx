import { Metadata } from 'next';
import Link from 'next/link';
import config from '../../../site.config';
import { generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import AICitationBlock from '@/components/AICitationBlock';

export const metadata: Metadata = {
  title: `Service Areas | ${config.business.name}`,
  description: `${config.business.name} serves ${config.address.city} and surrounding areas with professional ${config.gbpCategories.primary.toLowerCase()} services. Find your location.`,
  alternates: {
    canonical: `${config.business.url}/locations`,
  },
  openGraph: {
    title: `Service Areas | ${config.business.name}`,
    description: `${config.business.name} serves ${config.address.city} and surrounding areas with professional ${config.gbpCategories.primary.toLowerCase()} services.`,
    url: `${config.business.url}/locations`,
    siteName: config.business.name,
    images: (config.seo?.ogImage || config.business.image) ? [{ url: config.seo?.ogImage || config.business.image }] : [],
    type: 'website',
  },
};

export default function LocationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Service Areas', url: `${config.business.url}/locations` },
  ]);

  // Group locations by county
  const locationsByCounty = config.serviceAreas
    .filter((area) => area.index !== false)
    .reduce((acc, area) => {
      const county = area.county || 'Other Areas';
      if (!acc[county]) {
        acc[county] = [];
      }
      acc[county].push(area);
      return acc;
    }, {} as Record<string, typeof config.serviceAreas>);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas' },
        ]}
      />

      <h1>{config.gbpCategories.primary} Service Areas</h1>

      {/* Answer Block */}
      <AICitationBlock
        customLead={`${config.business.name} serves ${config.address.city}, ${config.address.state} and nearby communities with professional ${config.gbpCategories.primary.toLowerCase()} services`}
        additionalPoints={[
          `Serving ${config.serviceAreas.filter((a) => a.index !== false).length}+ communities`,
        ]}
      />

      {/* Locations by County */}
      {Object.entries(locationsByCounty).map(([county, areas]) => (
        <section key={county} className="county-section">
          <h2>{county}</h2>
          <div className="locations-grid">
            {areas.map((area) => (
              <article key={area.slug} className="location-card">
                <h3>
                  <Link href={`/locations/${area.slug}`}>
                    {config.gbpCategories.primary} in {area.city}
                  </Link>
                </h3>
                {area.neighborhoods && area.neighborhoods.length > 0 && (
                  <p className="neighborhoods">
                    Serving: {area.neighborhoods.slice(0, 3).join(', ')}
                    {area.neighborhoods.length > 3 && ' and more'}
                  </p>
                )}
                {area.zipCodes && area.zipCodes.length > 0 && (
                  <p className="zip-codes">ZIP: {area.zipCodes.join(', ')}</p>
                )}
                <Link href={`/locations/${area.slug}`} className="btn btn-link">
                  View Services in {area.city} →
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* Services Available */}
      <section>
        <h2>Services Available in All Locations</h2>
        <ul className="services-list">
          {config.services
            .filter((service) => service.index !== false)
            .map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
                {service.priceRange && <span> — {service.priceRange}</span>}
              </li>
            ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Don&apos;t See Your City?</h2>
        <p>
          We may still serve your area. Contact us to check availability and schedule a free
          estimate.
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
