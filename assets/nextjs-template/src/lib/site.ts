// src/lib/site.ts
// Normalized accessors for site configuration
// Use these helpers instead of accessing config directly to prevent bugs

import config from '../../site.config';

// ═══════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════

export interface ServiceArea {
  city: string;
  slug: string;
  state: string;
  county?: string;
  zipCodes?: string[];
  neighborhoods?: string[];
  landmarks?: string[];
  description?: string;
  population?: number;
  index?: boolean;
  // Local proof fields
  localParagraph?: string;
  regionalIssues?: string[];
  housingTypes?: string[];
  permits?: string;
}

export interface Service {
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  priceRange?: string;
  priceMin?: number;
  priceMax?: number;
  priceCurrency?: string;
  duration?: string;
  features?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  index?: boolean;
  showProjects?: boolean;
  // Expertise fields
  process?: Array<{ step: number; name: string; description: string }>;
  materials?: string[];
  commonIssues?: string[];
}

export interface Project {
  id: string;
  title: string;
  location?: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

// ═══════════════════════════════════════════════════════════════
// BUSINESS INFO HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get the Schema.org type for structured data
 * Use this ONLY in schema generators
 */
export function getSchemaType(): string {
  return config.business.schemaType || 'LocalBusiness';
}

/**
 * Get the display category for copy/content
 * Use this in page titles, descriptions, content
 */
export function getDisplayCategory(): string {
  return config.gbpCategories?.primary || 'Local Business';
}

/**
 * Get business name
 */
export function getBusinessName(): string {
  return config.business.name;
}

/**
 * Get full address as string
 */
export function getFullAddress(): string {
  const { street, suite, city, state, zip } = config.address;
  const streetLine = suite ? `${street}, ${suite}` : street;
  return `${streetLine}, ${city}, ${state} ${zip}`;
}

// ═══════════════════════════════════════════════════════════════
// SERVICE HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all services
 */
export function getAllServices(): Service[] {
  return config.services || [];
}

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find(s => s.slug === slug);
}

/**
 * Get all service slugs (for static params)
 */
export function getAllServiceSlugs(): string[] {
  return getAllServices().map(s => s.slug);
}

/**
 * Get indexable services only
 */
export function getIndexableServices(): Service[] {
  return getAllServices().filter(shouldIndexService);
}

/**
 * Determine if a service page should be indexed (SEO/AEO readiness)
 */
export function shouldIndexService(service: Service): boolean {
  if (service.index === false) return false;
  // Pricing + duration are required for strong AI citation blocks
  const hasPricing = Boolean(service.priceRange) || service.priceMin !== undefined;
  const hasDuration = Boolean(service.duration);
  return hasPricing && hasDuration;
}

// ═══════════════════════════════════════════════════════════════
// SERVICE AREA HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all service areas
 */
export function getAllServiceAreas(): ServiceArea[] {
  return config.serviceAreas || [];
}

/**
 * Get service area by slug
 */
export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return getAllServiceAreas().find(a => a.slug === slug);
}

/**
 * Get all area slugs (for static params)
 */
export function getAllAreaSlugs(): string[] {
  return getAllServiceAreas().map(a => a.slug);
}

/**
 * Get indexable areas only
 */
export function getIndexableAreas(): ServiceArea[] {
  return getAllServiceAreas().filter(a => a.index !== false && hasLocalProof(a));
}

/**
 * Get city names as simple array (for display)
 */
export function getCityNames(): string[] {
  return getAllServiceAreas().map(a => a.city);
}

// ═══════════════════════════════════════════════════════════════
// LOCATION + SERVICE COMBO HELPERS
// ═══════════════════════════════════════════════════════════════

interface LocationServiceCombo {
  area: ServiceArea;
  service: Service;
  shouldIndex: boolean;
}

/**
 * Get all location+service combinations
 */
export function getAllLocationServiceCombos(): LocationServiceCombo[] {
  const combos: LocationServiceCombo[] = [];
  
  getAllServiceAreas().forEach(area => {
    getAllServices().forEach(service => {
      combos.push({ 
        area, 
        service, 
        shouldIndex: shouldIndexCombo(area, service),
      });
    });
  });
  
  return combos;
}

/**
 * Get only indexable location+service combinations
 */
export function getIndexableLocationServiceCombos(): LocationServiceCombo[] {
  return getAllLocationServiceCombos().filter(c => c.shouldIndex);
}

// ═══════════════════════════════════════════════════════════════
// TRUST SIGNAL HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get license display string
 */
export function getLicenseDisplay(): string | null {
  return config.trustSignals?.license?.display || null;
}

/**
 * Get insurance coverage display
 */
export function getInsuranceCoverage(): string | null {
  return config.trustSignals?.insurance?.coverage || null;
}

/**
 * Get founding year
 */
export function getFoundingYear(): string | null {
  return config.business.foundingDate || null;
}

/**
 * Get years in business (calculated)
 */
export function getYearsInBusiness(): number | null {
  if (!config.business.foundingDate) return null;
  const year = parseInt(config.business.foundingDate);
  if (isNaN(year)) return null;
  return new Date().getFullYear() - year;
}

/**
 * Get owner name
 */
export function getOwnerName(): string | null {
  return config.about?.owner?.name || null;
}

/**
 * Check if we have enough trust signals for AI citation
 */
export function hasTrustSignals(): boolean {
  let count = 0;
  if (getLicenseDisplay()) count++;
  if (getInsuranceCoverage()) count++;
  if (getFoundingYear()) count++;
  if (hasValidAggregateRating()) count++;
  if (getOwnerName()) count++;
  return count >= 3;
}

// ═══════════════════════════════════════════════════════════════
// LOCAL PROOF HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Check if a location has enough local proof to index
 */
export function hasLocalProof(area: ServiceArea): boolean {
  const hasNeighborhoods = (area.neighborhoods?.length || 0) >= 2;
  const hasLandmarks = (area.landmarks?.length || 0) >= 2;
  const hasCounty = Boolean(area.county);

  const localParagraph = area.localParagraph?.trim() || '';
  const localWordCount = localParagraph.split(/\s+/).filter(Boolean).length;
  const hasLocalParagraph = localWordCount >= 50;
  
  return hasCounty && (hasNeighborhoods || hasLandmarks) && hasLocalParagraph;
}

/**
 * Get local paragraph for a city
 */
export function getLocalParagraph(area: ServiceArea): string | null {
  return area.localParagraph?.trim() || null;
}

/**
 * Check if a combo page should be indexed
 */
export function shouldIndexCombo(area: ServiceArea, service: Service): boolean {
  // Must have local proof
  if (!hasLocalProof(area)) return false;
  
  // Must not be explicitly noindexed
  if (area.index === false) return false;
  if (service.index === false) return false;
  
  // Must have pricing and duration for AI citation
  const hasPricing = Boolean(service.priceRange) || service.priceMin !== undefined;
  const hasDuration = Boolean(service.duration);
  if (!hasPricing || !hasDuration) return false;
  
  return true;
}

// ═══════════════════════════════════════════════════════════════
// PROJECT / PORTFOLIO HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get project gallery items for a service slug.
 * Projects are defined in `site.config.js` under `projects[serviceSlug]`.
 */
export function getProjectsForService(serviceSlug: string): Project[] {
  const projects = (config.projects as Record<string, Project[]> | undefined)?.[serviceSlug];
  return Array.isArray(projects) ? projects : [];
}

// ═══════════════════════════════════════════════════════════════
// SCHEMA HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Check if geo coordinates are valid (not placeholder zeros)
 */
export function hasValidGeo(): boolean {
  const { latitude, longitude } = config.geo || {};
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude !== 0 &&
    longitude !== 0 &&
    isFinite(latitude) &&
    isFinite(longitude)
  );
}

/**
 * Check if aggregate rating is valid for schema
 * Requires minimum 5 reviews and valid rating
 */
export function hasValidAggregateRating(): boolean {
  const agg = config.reviews?.aggregate;
  if (!agg) return false;
  
  return (
    agg.totalReviews >= 5 &&
    agg.averageRating >= 1 &&
    agg.averageRating <= 5
  );
}

/**
 * Get social URLs for schema sameAs (filtered)
 */
export function getSocialUrls(): string[] {
  if (!config.social) return [];
  return Object.values(config.social).filter((url): url is string => Boolean(url));
}

// ═══════════════════════════════════════════════════════════════
// EMBED HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get GMB map embed URL
 */
export function getGMBEmbedUrl(): string | null {
  return config.embeds?.gmbMapUrl || null;
}

/**
 * Get Google Place ID for maps
 */
export function getGooglePlaceId(): string | null {
  return config.reviews?.google?.placeId || null;
}

/**
 * Get map zoom level with default
 */
export function getMapZoom(): number {
  return config.maps?.zoom || 13;
}

// ═══════════════════════════════════════════════════════════════
// SITEMAP HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Get sitemap priority for a page type
 */
export function getSitemapPriority(pageType: string): number {
  const priorities = (config.sitemap?.priorities || {}) as Record<string, number>;
  const defaults: Record<string, number> = {
    homepage: 1.0,
    services: 0.9,
    locations: 0.8,
    locationService: 0.7,
    about: 0.6,
    contact: 0.6,
  };
  return priorities[pageType] ?? defaults[pageType] ?? 0.5;
}

/**
 * Get sitemap change frequency for a page type
 */
export function getSitemapChangeFreq(pageType: string): string {
  const freqs = (config.sitemap?.changeFrequency || {}) as Record<string, string>;
  const defaults: Record<string, string> = {
    homepage: 'weekly',
    services: 'monthly',
    locations: 'monthly',
    locationService: 'monthly',
    about: 'yearly',
    contact: 'yearly',
  };
  return freqs[pageType] ?? defaults[pageType] ?? 'monthly';
}

// Export config for cases where direct access is needed
export { config };
