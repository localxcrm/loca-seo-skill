// src/types/config.ts
// TypeScript type definitions for site.config.js
// Import these types for type-safe configuration access

// ═══════════════════════════════════════════════════════════════
// CORE BUSINESS TYPES
// ═══════════════════════════════════════════════════════════════

export interface BusinessConfig {
  name: string;
  legalName?: string;
  /** Schema.org type (e.g., "Plumber", "Painter", "Dentist", "HomeAndConstructionBusiness") */
  schemaType: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  url: string;
  logo: string;
  image?: string;
  /** Price range indicator: "$", "$$", "$$$", "$$$$" */
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  /** Founding year as string (e.g., "2010") */
  foundingDate: string;
}

export interface AddressConfig {
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface GeoConfig {
  latitude: number;
  longitude: number;
}

export interface HoursConfig {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

// ═══════════════════════════════════════════════════════════════
// TRUST SIGNALS
// ═══════════════════════════════════════════════════════════════

export interface LicenseConfig {
  number: string;
  type: string;
  state: string;
  /** Formatted display string (e.g., "Licensed MA Contractor #12345") */
  display: string;
}

export interface InsuranceConfig {
  coverage: string;
  provider?: string;
  bonded: boolean;
}

export interface TrustSignalsConfig {
  license?: LicenseConfig;
  insurance?: InsuranceConfig;
  certifications?: string[];
  affiliations?: string[];
}

// ═══════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════

export interface ProcessStep {
  step: number;
  name: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceConfig {
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;

  // Pricing (Required for AI citation)
  priceRange?: string;
  priceMin?: number;
  priceMax?: number;
  priceCurrency?: string;

  // Timing (Required for AI citation)
  duration?: string;

  // Expertise signals
  features?: string[];
  process?: ProcessStep[];
  materials?: string[];
  commonIssues?: string[];

  // Service-specific FAQs
  faqs?: ServiceFAQ[];

  // Index control
  index?: boolean;

  // Show project gallery
  showProjects?: boolean;
}

// ═══════════════════════════════════════════════════════════════
// SERVICE AREAS
// ═══════════════════════════════════════════════════════════════

export interface ServiceAreaConfig {
  city: string;
  slug: string;
  state: string;
  /** County name - REQUIRED for indexing */
  county?: string;
  zipCodes?: string[];

  // Local proof (need 2+ to index)
  neighborhoods?: string[];
  landmarks?: string[];

  /** Local deep paragraph - REQUIRED for indexing. Must be 50+ words with local specifics */
  localParagraph?: string;

  // Regional context
  regionalIssues?: string[];
  housingTypes?: string[];
  permits?: string;

  // Index control
  index?: boolean;
}

// ═══════════════════════════════════════════════════════════════
// GBP CATEGORIES
// ═══════════════════════════════════════════════════════════════

export interface GBPCategoriesConfig {
  primary: string;
  secondary?: string[];
}

// ═══════════════════════════════════════════════════════════════
// SOCIAL MEDIA
// ═══════════════════════════════════════════════════════════════

export interface SocialConfig {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  pinterest?: string;
  twitter?: string;
  nextdoor?: string;
  houzz?: string;
}

// ═══════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════

export interface ReviewPlatformConfig {
  url?: string;
  placeId?: string;
  reviewCount: number;
  rating: number;
}

export interface AggregateReviewConfig {
  totalReviews: number;
  averageRating: number;
}

export interface ReviewsConfig {
  google?: ReviewPlatformConfig;
  yelp?: ReviewPlatformConfig;
  facebook?: ReviewPlatformConfig;
  /** Aggregate for schema (must have 5+ reviews to display) */
  aggregate?: AggregateReviewConfig;
}

// ═══════════════════════════════════════════════════════════════
// EMBEDS & WIDGETS
// ═══════════════════════════════════════════════════════════════

export interface EmbedsConfig {
  gmbMapUrl?: string;
  googleMapsApiKey?: string;
  /** Third-party form iframe URL or embed code */
  formIframeUrl?: string;
  /** Review widget iframe URL or embed code */
  reviewIframeUrl?: string;
}

export interface MapsConfig {
  zoom?: number;
  showServiceArea?: boolean;
}

// ═══════════════════════════════════════════════════════════════
// BRANDING
// ═══════════════════════════════════════════════════════════════

export interface ColorsConfig {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  light: string;
}

export interface FontsConfig {
  heading: string;
  body: string;
}

export interface BrandingConfig {
  colors: ColorsConfig;
  fonts: FontsConfig;
}

// ═══════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════

export interface ContentConfig {
  usps?: string[];
  targetAudience?: string;
  painPoints?: string[];
  /** Tone: professional, friendly, expert, casual */
  tone?: 'professional' | 'friendly' | 'expert' | 'casual';
}

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════

export interface OwnerConfig {
  name: string;
  title?: string;
  bio?: string;
  image?: string;
  credentials?: string[];
}

export interface TeamConfig {
  size?: string;
  description?: string;
}

export interface AboutConfig {
  story?: string;
  owner?: OwnerConfig;
  team?: TeamConfig;
  certifications?: string[];
  awards?: string[];
  communityInvolvement?: string;
  whyFounded?: string;
}

// ═══════════════════════════════════════════════════════════════
// SEO
// ═══════════════════════════════════════════════════════════════

export interface SEOConfig {
  titleTemplate?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  siteUrl?: string;
  ogImage?: string;
  twitterHandle?: string;
}

// ═══════════════════════════════════════════════════════════════
// SITEMAP
// ═══════════════════════════════════════════════════════════════

export interface SitemapPrioritiesConfig {
  homepage?: number;
  services?: number;
  locations?: number;
  locationService?: number;
  about?: number;
  contact?: number;
}

export interface SitemapChangeFreqConfig {
  homepage?: string;
  services?: string;
  locations?: string;
  locationService?: string;
  about?: string;
  contact?: string;
}

export interface SitemapConfig {
  priorities?: SitemapPrioritiesConfig;
  changeFrequency?: SitemapChangeFreqConfig;
}

// ═══════════════════════════════════════════════════════════════
// CONTENT QUALITY
// ═══════════════════════════════════════════════════════════════

export interface ComboPageRequirements {
  minNeighborhoods?: number;
  minLandmarks?: number;
  requireLocalParagraph?: boolean;
}

export interface ContentRequirementsConfig {
  minimumIndexScore?: number;
  requireLocalProof?: boolean;
  comboPageRequirements?: ComboPageRequirements;
}

// ═══════════════════════════════════════════════════════════════
// UI SETTINGS
// ═══════════════════════════════════════════════════════════════

export interface UIConfig {
  socialIconsLocation?: 'header' | 'footer' | 'both';
  showReviewWidgets?: boolean;
  showBreadcrumbs?: boolean;
  showRelatedServices?: boolean;
  showNearbyLocations?: boolean;
  ctaButtonText?: string;
  ctaPhoneText?: string;
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS (Before/After Gallery)
// ═══════════════════════════════════════════════════════════════

export interface ProjectConfig {
  id: string;
  title: string;
  location?: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

export type ProjectsConfig = Record<string, ProjectConfig[]>;

// ═══════════════════════════════════════════════════════════════
// TRUST BADGES & BRANDS
// ═══════════════════════════════════════════════════════════════

export interface TrustBadgeConfig {
  name: string;
  image: string;
  url?: string;
  alt: string;
}

export interface BrandConfig {
  name: string;
  image: string;
  url?: string;
  description?: string;
}

// ═══════════════════════════════════════════════════════════════
// MAIN CONFIG TYPE
// ═══════════════════════════════════════════════════════════════

export interface SiteConfig {
  business: BusinessConfig;
  trustSignals?: TrustSignalsConfig;
  address: AddressConfig;
  geo?: GeoConfig;
  hours?: HoursConfig;
  gbpCategories?: GBPCategoriesConfig;
  services: ServiceConfig[];
  serviceAreas: ServiceAreaConfig[];
  social?: SocialConfig;
  reviews?: ReviewsConfig;
  embeds?: EmbedsConfig;
  maps?: MapsConfig;
  branding?: BrandingConfig;
  content?: ContentConfig;
  about?: AboutConfig;
  defaultFAQs?: ServiceFAQ[];
  seo?: SEOConfig;
  sitemap?: SitemapConfig;
  contentRequirements?: ContentRequirementsConfig;
  ui?: UIConfig;
  projects?: ProjectsConfig;
  trustBadges?: TrustBadgeConfig[];
  brands?: BrandConfig[];
}

// ═══════════════════════════════════════════════════════════════
// VALIDATION HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Validates that required fields are present in config
 */
export function validateConfig(config: unknown): config is SiteConfig {
  if (!config || typeof config !== 'object') return false;

  const cfg = config as Record<string, unknown>;

  // Required top-level sections
  if (!cfg.business || typeof cfg.business !== 'object') return false;
  if (!cfg.address || typeof cfg.address !== 'object') return false;
  if (!Array.isArray(cfg.services)) return false;
  if (!Array.isArray(cfg.serviceAreas)) return false;

  // Required business fields
  const biz = cfg.business as Record<string, unknown>;
  if (!biz.name || !biz.phone || !biz.url) return false;

  return true;
}

/**
 * Type guard for service config
 */
export function isValidService(service: unknown): service is ServiceConfig {
  if (!service || typeof service !== 'object') return false;
  const s = service as Record<string, unknown>;
  return typeof s.name === 'string' && typeof s.slug === 'string';
}

/**
 * Type guard for service area config
 */
export function isValidServiceArea(area: unknown): area is ServiceAreaConfig {
  if (!area || typeof area !== 'object') return false;
  const a = area as Record<string, unknown>;
  return typeof a.city === 'string' && typeof a.slug === 'string' && typeof a.state === 'string';
}
