// src/components/AICitationBlock.tsx
// Optimized answer block pattern for AI Overview extraction
// See references/content-scoring.md for requirements

import {
  config,
  getBusinessName,
  getLicenseDisplay,
  getInsuranceCoverage,
  getFoundingYear,
  hasValidAggregateRating,
  ServiceArea,
  Service,
} from '@/lib/site';

interface AICitationBlockProps {
  // Required: What is this page about?
  service?: Service;
  location?: ServiceArea;
  
  // Optional overrides
  customLead?: string;       // Override the lead sentence
  additionalPoints?: string[]; // Extra bullet points
  className?: string;
}

/**
 * AI-optimized answer block for search engine extraction.
 * 
 * Pattern:
 * - Direct answer in first sentence
 * - Specific numbers (price, time, reviews)
 * - Verifiable facts (license, years, location)
 * - Under 100 words for AI extraction
 */
export default function AICitationBlock({
  service,
  location,
  customLead,
  additionalPoints = [],
  className = '',
}: AICitationBlockProps) {
  const businessName = getBusinessName();
  const license = getLicenseDisplay();
  const insurance = getInsuranceCoverage();
  const foundingYear = getFoundingYear();
  const aggregate = config.reviews?.aggregate;
  
  // Build the lead sentence
  let leadSentence = customLead;
  
  if (!leadSentence) {
    if (service && location) {
      // Combo page
      leadSentence = `Yes — ${businessName} provides professional ${service.name.toLowerCase()} services in ${location.city}, ${location.state}`;
    } else if (service) {
      // Service page
      leadSentence = `${businessName} offers professional ${service.name.toLowerCase()} services in ${config.address.city} and surrounding areas`;
    } else if (location) {
      // Location page
      leadSentence = `${businessName} provides professional services to homeowners in ${location.city}, ${location.state}`;
    } else {
      // Homepage/generic
      leadSentence = `${businessName} is a trusted local service provider in ${config.address.city}, ${config.address.state}`;
    }
  }
  
  // Build pricing/timing details
  const details: string[] = [];
  
  if (service?.priceRange) {
    details.push(`Projects typically range from ${service.priceRange}`);
  }
  if (service?.duration) {
    details.push(`most jobs complete within ${service.duration}`);
  }
  
  // Build trust signal bullets
  const trustBullets: string[] = [];
  
  if (license) {
    trustBullets.push(license);
  }
  
  if (insurance) {
    trustBullets.push(`Fully insured up to ${insurance}`);
  }
  
  if (foundingYear) {
    trustBullets.push(`Serving ${location?.city || config.address.city} since ${foundingYear}`);
  }
  
  if (hasValidAggregateRating() && aggregate) {
    trustBullets.push(`${aggregate.averageRating} stars from ${aggregate.totalReviews} reviews`);
  }
  
  // Always include free estimates
  trustBullets.push('Free, written estimates before work begins');
  
  // Add location-specific details
  if (location?.neighborhoods && location.neighborhoods.length > 0) {
    trustBullets.push(`Serving ${location.neighborhoods.slice(0, 3).join(', ')} and more`);
  }
  
  // Add any additional points
  trustBullets.push(...additionalPoints);
  
  return (
    <section className={`answer-block bg-gray-50 p-6 rounded-lg border-l-4 border-primary ${className}`}>
      <p className="text-lg mb-4">
        <strong>{leadSentence}</strong>
        {details.length > 0 && (
          <span>
            {' '}with {details.join(' and ')}.
          </span>
        )}
        {' '}
        Call{' '}
        <a 
          href={`tel:${config.business.phone}`} 
          className="text-primary font-semibold"
        >
          {config.business.phone}
        </a>
        {' '}for a free estimate.
      </p>
      
      <ul className="space-y-1">
        {trustBullets.slice(0, 5).map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-primary flex-shrink-0">✓</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Minimal inline citation for use in paragraphs
 */
export function InlineCitation({ 
  service,
  location,
}: { 
  service?: Service; 
  location?: ServiceArea;
}) {
  const businessName = getBusinessName();
  
  return (
    <span>
      <strong>{businessName}</strong>
      {service && ` offers ${service.name.toLowerCase()}`}
      {location && ` in ${location.city}`}
      {service?.priceRange && ` (${service.priceRange})`}
      . Call <a href={`tel:${config.business.phone}`} className="text-primary font-semibold">{config.business.phone}</a>.
    </span>
  );
}
