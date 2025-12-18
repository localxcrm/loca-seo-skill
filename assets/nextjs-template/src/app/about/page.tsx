// src/app/about/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import config from '../../../site.config';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { ReviewBadge } from '@/components/Reviews';

export const metadata: Metadata = {
  title: `About ${config.business.name} | ${config.address.city} ${config.business.type}`,
  description: `Learn about ${config.business.name}, a trusted ${config.business.type.toLowerCase()} serving ${config.address.city}, ${config.address.state} since ${config.business.foundingDate}. Meet our team and learn our story.`,
  alternates: {
    canonical: `${config.business.url}/about`,
  },
};

export default function AboutPage() {
  const localBusinessSchema = generateLocalBusinessSchema(config);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'About', url: `${config.business.url}/about` },
  ]);

  const about = config.about || {};
  const yearsInBusiness = config.business.foundingDate 
    ? new Date().getFullYear() - parseInt(config.business.foundingDate) 
    : null;

  return (
    <>
      <SchemaMarkup schema={[localBusinessSchema, breadcrumbSchema]} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
        />

        <h1 className="text-4xl font-bold mb-6">About {config.business.name}</h1>

        {/* Intro Section */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {about.story || config.business.description}
            </p>
            
            {yearsInBusiness && (
              <p className="text-gray-700 leading-relaxed mb-6">
                For over <strong>{yearsInBusiness} years</strong>, we've been providing exceptional 
                {config.business.type.toLowerCase()} services to homeowners in {config.address.city} 
                and surrounding communities.
              </p>
            )}

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-4 mb-6">
              {config.reviews?.aggregate?.totalReviews > 0 && (
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <ReviewBadge />
                </div>
              )}
              {config.business.foundingDate && (
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <span>🏆</span>
                  <span>Est. {config.business.foundingDate}</span>
                </div>
              )}
              {config.business.license && (
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <span>📋</span>
                  <span>Licensed & Insured</span>
                </div>
              )}
            </div>
          </div>

          {/* Owner Photo/Info */}
          {about.owner && (
            <div className="bg-gray-50 p-8 rounded-lg">
              {about.owner.image && (
                <img
                  src={about.owner.image}
                  alt={about.owner.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-xl font-bold text-center mb-1">{about.owner.name}</h3>
              {about.owner.title && (
                <p className="text-gray-500 text-center mb-4">{about.owner.title}</p>
              )}
              {about.owner.bio && (
                <p className="text-gray-700 text-center">{about.owner.bio}</p>
              )}
            </div>
          )}
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose {config.business.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.content?.usps?.map((usp, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">
                  {['🏆', '✨', '💯', '🤝', '⏰', '💰'][i % 6]}
                </div>
                <h3 className="font-semibold">{usp}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Awards */}
        {((about.certifications && about.certifications.length > 0) || 
          (about.awards && about.awards.length > 0)) && (
          <section className="mb-16 grid md:grid-cols-2 gap-8">
            {about.certifications && about.certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Certifications & Training</h2>
                <ul className="space-y-2">
                  {about.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {about.awards && about.awards.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
                <ul className="space-y-2">
                  {about.awards.map((award, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-yellow-500">🏆</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Community Involvement */}
        {about.communityInvolvement && (
          <section className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Community Involvement</h2>
            <p className="text-gray-700">{about.communityInvolvement}</p>
          </section>
        )}

        {/* Service Areas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Areas We Serve</h2>
          <p className="text-gray-700 mb-6">
            {config.business.name} proudly serves homeowners throughout {config.address.city} 
            and the surrounding communities:
          </p>
          <div className="flex flex-wrap gap-2">
            {config.serviceAreas?.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                {area.city}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          title="Ready to Work With Us?"
          subtitle={`Contact ${config.business.name} today for your free estimate.`}
        />
      </div>
    </>
  );
}
