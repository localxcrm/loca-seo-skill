/**
 * TypeScript type definitions for site.config.js
 *
 * These types provide full type safety and IntelliSense for the site configuration.
 * Import the config with: import siteConfig from '@/site.config' and cast it as SiteConfig.
 */

// ═══════════════════════════════════════════════════════════════
// BUSINESS INFORMATION
// ═══════════════════════════════════════════════════════════════

export interface Business {
  /** Display name of the business */
  name: string;
  /** Legal entity name for schema markup */
  legalName: string;
  /** Schema.org type (e.g., "Plumber", "Painter", "Dentist", "LocalBusiness") */
  schemaType: string;
  /** Short tagline or slogan */
  tagline: string;
  /** Brief 2-3 sentence description for meta tags and schema */
  description: string;
  /** Primary phone number with formatting */
  phone: string;
  /** Primary contact email */
  email: string;
  /** Website URL (with https://) */
  url: string;
  /** Path to logo image */
  logo: string;
  /** Path to hero/main image */
  image: string;
  /** Price range indicator: "$", "$$", "$$$", or "$$$$" */
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  /** Year the business was founded (exact year, not "5+ years") */
  foundingDate: string;
}

// ═══════════════════════════════════════════════════════════════
// TRUST SIGNALS
// ═══════════════════════════════════════════════════════════════

export interface License {
  /** License number (e.g., "HIC #12345") */
  number: string;
  /** License type (e.g., "Home Improvement Contractor") */
  type: string;
  /** State abbreviation (e.g., "MA") */
  state: string;
  /** Display string (e.g., "Licensed MA Contractor #12345") */
  display: string;
}

export interface Insurance {
  /** Coverage amount (e.g., "$1,000,000") */
  coverage: string;
  /** Insurance provider name (optional) */
  provider?: string;
  /** Whether business is bonded */
  bonded: boolean;
}

export interface TrustSignals {
  /** License information */
  license: License;
  /** Insurance information */
  insurance: Insurance;
  /** Professional certifications (e.g., "EPA Lead-Safe Certified") */
  certifications: string[];
  /** Professional affiliations (e.g., "BBB Accredited") */
  affiliations: string[];
}

// ═══════════════════════════════════════════════════════════════
// ADDRESS & LOCATION
// ═══════════════════════════════════════════════════════════════

export interface Address {
  /** Street address */
  street: string;
  /** Suite or unit number (optional) */
  suite?: string;
  /** City name */
  city: string;
  /** State abbreviation */
  state: string;
  /** ZIP code */
  zip: string;
  /** Country code (e.g., "US") */
  country: string;
}

export interface GeoCoordinates {
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
}

// ═══════════════════════════════════════════════════════════════
// BUSINESS HOURS
// ═══════════════════════════════════════════════════════════════

export interface BusinessHours {
  /** Monday hours (e.g., "08:00-17:00" or "Closed") */
  monday: string;
  /** Tuesday hours */
  tuesday: string;
  /** Wednesday hours */
  wednesday: string;
  /** Thursday hours */
  thursday: string;
  /** Friday hours */
  friday: string;
  /** Saturday hours */
  saturday: string;
  /** Sunday hours */
  sunday: string;
}

// ═══════════════════════════════════════════════════════════════
// GOOGLE BUSINESS PROFILE CATEGORIES
// ═══════════════════════════════════════════════════════════════

export interface GBPCategories {
  /** Primary GBP category */
  primary: string;
  /** Secondary GBP categories (3-4 recommended) */
  secondary: string[];
}

// ═══════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════

export interface ProcessStep {
  /** Step number */
  step: number;
  /** Step name/title */
  name: string;
  /** Description of what happens in this step */
  description: string;
}

export interface ServiceFAQ {
  /** FAQ question */
  question: string;
  /** FAQ answer */
  answer: string;
}

export interface Service {
  /** Service display name */
  name: string;
  /** URL slug (e.g., "exterior-painting") */
  slug: string;
  /** Brief description for meta tags */
  description: string;
  /** Longer description for page content */
  longDescription?: string;

  // PRICING
  /** Price range display (e.g., "$100-500") */
  priceRange: string;
  /** Minimum price for schema */
  priceMin?: number;
  /** Maximum price for schema */
  priceMax?: number;
  /** Currency code (default: "USD") */
  priceCurrency?: string;

  // TIMING
  /** Duration estimate (e.g., "1-2 days") */
  duration: string;

  // FEATURES
  /** List of service features/benefits */
  features: string[];

  // EXPERTISE SIGNALS
  /** Step-by-step process */
  process?: ProcessStep[];
  /** Materials/brands used */
  materials?: string[];
  /** Common issues/problems addressed */
  commonIssues?: string[];

  // FAQs
  /** Service-specific FAQs */
  faqs?: ServiceFAQ[];

  // INDEX CONTROL
  /** Whether to index this service page (default: true) */
  index?: boolean;

  // PROJECT GALLERY
  /** Whether to show project gallery (pulls from projects section) */
  showProjects?: boolean;
}

// ═══════════════════════════════════════════════════════════════
// SERVICE AREAS
// ═══════════════════════════════════════════════════════════════

export interface ServiceArea {
  /** City name */
  city: string;
  /** URL slug (e.g., "boston") */
  slug: string;
  /** State abbreviation */
  state: string;
  /** County name (REQUIRED for indexing) */
  county: string;
  /** ZIP codes served in this city */
  zipCodes: string[];

  // LOCAL PROOF (need 2+ neighborhoods OR 2+ landmarks to index)
  /** Neighborhood names */
  neighborhoods: string[];
  /** Local landmarks */
  landmarks: string[];

  // LOCAL CONTENT
  /**
   * Local deep paragraph (REQUIRED for indexing)
   * Must be 50+ words with location-specific details
   */
  localParagraph: string;

  // REGIONAL CONTEXT
  /** Regional issues specific to this area */
  regionalIssues?: string[];
  /** Common housing types in the area */
  housingTypes?: string[];
  /** Local permit/regulation information */
  permits?: string;

  // INDEX CONTROL
  /** Whether to index this location page (default: true) */
  index?: boolean;
}

// ═══════════════════════════════════════════════════════════════
// SOCIAL MEDIA
// ═══════════════════════════════════════════════════════════════

export interface SocialMedia {
  /** Facebook page URL */
  facebook?: string;
  /** Instagram profile URL */
  instagram?: string;
  /** YouTube channel URL */
  youtube?: string;
  /** LinkedIn page URL */
  linkedin?: string;
  /** TikTok profile URL */
  tiktok?: string;
  /** Pinterest profile URL */
  pinterest?: string;
  /** Twitter/X profile URL */
  twitter?: string;
  /** Nextdoor profile URL */
  nextdoor?: string;
  /** Houzz profile URL */
  houzz?: string;
}

// ═══════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════

export interface ReviewPlatform {
  /** Profile URL */
  url: string;
  /** Number of reviews */
  reviewCount: number;
  /** Average rating (1-5) */
  rating: number;
}

export interface GoogleReview extends ReviewPlatform {
  /** Google Place ID for schema */
  placeId?: string;
}

export interface AggregateReview {
  /** Total reviews across all platforms */
  totalReviews: number;
  /** Average rating across platforms (1-5) */
  averageRating: number;
}

export interface Reviews {
  /** Google reviews */
  google: GoogleReview;
  /** Yelp reviews */
  yelp: ReviewPlatform;
  /** Facebook reviews */
  facebook: ReviewPlatform;
  /** Aggregate for schema (must have 5+ reviews to display) */
  aggregate: AggregateReview;
}

// ═══════════════════════════════════════════════════════════════
// EMBEDS & MAPS
// ═══════════════════════════════════════════════════════════════

export interface Embeds {
  /** Google My Business map embed URL */
  gmbMapUrl?: string;
  /** Google Maps API key for dynamic maps */
  googleMapsApiKey?: string;
}

export interface MapSettings {
  /** Default zoom level (1-20) */
  zoom: number;
  /** Whether to show service area overlay */
  showServiceArea: boolean;
}

// ═══════════════════════════════════════════════════════════════
// BRANDING
// ═══════════════════════════════════════════════════════════════

export interface BrandColors {
  /** Primary brand color (hex) */
  primary: string;
  /** Secondary brand color (hex) */
  secondary: string;
  /** Accent color (hex) */
  accent: string;
  /** Dark color for text (hex) */
  dark: string;
  /** Light color for backgrounds (hex) */
  light: string;
}

export interface BrandFonts {
  /** Heading font family */
  heading: string;
  /** Body font family */
  body: string;
}

export interface Branding {
  /** Brand colors */
  colors: BrandColors;
  /** Brand fonts */
  fonts: BrandFonts;
}

// ═══════════════════════════════════════════════════════════════
// CONTENT & VOICE
// ═══════════════════════════════════════════════════════════════

export type ContentTone = "professional" | "friendly" | "expert" | "casual";

export interface Content {
  /** Unique selling points (3-5 recommended) */
  usps: string[];
  /** Target audience description */
  targetAudience: string;
  /** Customer pain points addressed */
  painPoints: string[];
  /** Content tone/voice */
  tone: ContentTone;
}

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════

export interface Owner {
  /** Owner's full name (REQUIRED for entity signals) */
  name: string;
  /** Owner's title */
  title: string;
  /** Brief biography */
  bio: string;
  /** Path to owner's photo */
  image?: string;
  /** Owner's credentials/experience */
  credentials?: string[];
}

export interface Team {
  /** Team size (e.g., "5-10") */
  size: string;
  /** Team description */
  description: string;
}

export interface About {
  /** Company story/history */
  story: string;
  /** Owner information */
  owner: Owner;
  /** Team information */
  team?: Team;
  /** Certifications (can mirror trustSignals.certifications) */
  certifications?: string[];
  /** Awards and recognition */
  awards?: string[];
  /** Community involvement description */
  communityInvolvement?: string;
  /** Why the company was founded */
  whyFounded?: string;
}

// ═══════════════════════════════════════════════════════════════
// DEFAULT FAQs
// ═══════════════════════════════════════════════════════════════

export interface FAQ {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

// ═══════════════════════════════════════════════════════════════
// SEO SETTINGS
// ═══════════════════════════════════════════════════════════════

export interface SEOSettings {
  /** Title template (use %s for page title) */
  titleTemplate: string;
  /** Default page title */
  defaultTitle: string;
  /** Default meta description */
  defaultDescription: string;
  /** Site URL (with https://) */
  siteUrl: string;
  /** Default Open Graph image path */
  ogImage: string;
  /** Twitter handle (with @) */
  twitterHandle?: string;
}

// ═══════════════════════════════════════════════════════════════
// SITEMAP SETTINGS
// ═══════════════════════════════════════════════════════════════

export interface SitemapPriorities {
  /** Homepage priority (0.0-1.0) */
  homepage: number;
  /** Services pages priority */
  services: number;
  /** Location pages priority */
  locations: number;
  /** Location+Service combo pages priority */
  locationService: number;
  /** About page priority */
  about: number;
  /** Contact page priority */
  contact: number;
}

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapChangeFrequency {
  /** Homepage change frequency */
  homepage: ChangeFrequency;
  /** Services pages change frequency */
  services: ChangeFrequency;
  /** Location pages change frequency */
  locations: ChangeFrequency;
  /** Location+Service combo pages change frequency */
  locationService: ChangeFrequency;
  /** About page change frequency */
  about: ChangeFrequency;
  /** Contact page change frequency */
  contact: ChangeFrequency;
}

export interface SitemapSettings {
  /** Page priorities */
  priorities: SitemapPriorities;
  /** Change frequencies */
  changeFrequency: SitemapChangeFrequency;
}

// ═══════════════════════════════════════════════════════════════
// CONTENT QUALITY REQUIREMENTS
// ═══════════════════════════════════════════════════════════════

export interface ComboPageRequirements {
  /** Minimum neighborhoods required to index combo page */
  minNeighborhoods: number;
  /** Minimum landmarks required to index combo page */
  minLandmarks: number;
  /** Whether local paragraph is required */
  requireLocalParagraph: boolean;
}

export interface ContentRequirements {
  /** Minimum content score to index page (7-10 recommended) */
  minimumIndexScore: number;
  /** Whether local proof is required for indexing */
  requireLocalProof: boolean;
  /** Requirements for combo pages */
  comboPageRequirements: ComboPageRequirements;
}

// ═══════════════════════════════════════════════════════════════
// UI SETTINGS
// ═══════════════════════════════════════════════════════════════

export type SocialIconsLocation = "header" | "footer" | "both";

export interface UISettings {
  /** Where to display social icons */
  socialIconsLocation: SocialIconsLocation;
  /** Whether to show review widgets */
  showReviewWidgets: boolean;
  /** Whether to show breadcrumb navigation */
  showBreadcrumbs: boolean;
  /** Whether to show related services section */
  showRelatedServices: boolean;
  /** Whether to show nearby locations section */
  showNearbyLocations: boolean;
  /** CTA button text */
  ctaButtonText: string;
  /** CTA phone text */
  ctaPhoneText: string;
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS (Before/After Gallery)
// ═══════════════════════════════════════════════════════════════

export interface Project {
  /** Unique project ID */
  id: string;
  /** Project title */
  title: string;
  /** Project location (city, state) */
  location: string;
  /** Path to before image */
  beforeImage: string;
  /** Path to after image */
  afterImage: string;
  /** Project description */
  description: string;
}

/** Projects indexed by service slug */
export type Projects = Record<string, Project[]>;

// ═══════════════════════════════════════════════════════════════
// TRUST BADGES
// ═══════════════════════════════════════════════════════════════

export interface TrustBadge {
  /** Organization/certification name */
  name: string;
  /** Path to badge image */
  image: string;
  /** Link URL (optional) */
  url?: string;
  /** Alt text for accessibility */
  alt: string;
}

// ═══════════════════════════════════════════════════════════════
// BRANDS
// ═══════════════════════════════════════════════════════════════

export interface Brand {
  /** Brand name */
  name: string;
  /** Path to brand logo */
  image: string;
  /** Brand website URL */
  url?: string;
  /** Brief description of why you use this brand */
  description?: string;
}

// ═══════════════════════════════════════════════════════════════
// MAIN SITE CONFIG TYPE
// ═══════════════════════════════════════════════════════════════

export interface SiteConfig {
  /** Business information */
  business: Business;
  /** Trust signals (license, insurance, certifications) */
  trustSignals: TrustSignals;
  /** Business address */
  address: Address;
  /** Geographic coordinates */
  geo: GeoCoordinates;
  /** Business hours */
  hours: BusinessHours;
  /** Google Business Profile categories */
  gbpCategories: GBPCategories;
  /** Services offered */
  services: Service[];
  /** Service areas/locations */
  serviceAreas: ServiceArea[];
  /** Social media profiles */
  social: SocialMedia;
  /** Review profiles and aggregates */
  reviews: Reviews;
  /** Embed configurations */
  embeds: Embeds;
  /** Map settings */
  maps: MapSettings;
  /** Branding (colors, fonts) */
  branding: Branding;
  /** Content and voice settings */
  content: Content;
  /** About page content */
  about: About;
  /** Default FAQs */
  defaultFAQs: FAQ[];
  /** SEO settings */
  seo: SEOSettings;
  /** Sitemap settings */
  sitemap: SitemapSettings;
  /** Content quality requirements */
  contentRequirements: ContentRequirements;
  /** UI settings */
  ui: UISettings;
  /** Project galleries by service slug */
  projects: Projects;
  /** Trust badges (memberships, certifications) */
  trustBadges: TrustBadge[];
  /** Brands/products used */
  brands: Brand[];
}

// ═══════════════════════════════════════════════════════════════
// TYPE GUARDS & UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Check if a service has enough data for indexing
 */
export function isServiceIndexable(service: Service): boolean {
  return service.index !== false &&
         service.name.length > 0 &&
         service.slug.length > 0;
}

/**
 * Check if a service area has local proof (2+ neighborhoods OR 2+ landmarks)
 */
export function hasLocalProof(area: ServiceArea): boolean {
  return (area.neighborhoods?.length >= 2 || area.landmarks?.length >= 2) &&
         area.localParagraph?.length >= 50;
}

/**
 * Check if a service area is indexable
 */
export function isAreaIndexable(area: ServiceArea): boolean {
  return area.index !== false && hasLocalProof(area);
}

/**
 * Get all indexable services
 */
export function getIndexableServices(config: SiteConfig): Service[] {
  return config.services.filter(isServiceIndexable);
}

/**
 * Get all indexable service areas
 */
export function getIndexableAreas(config: SiteConfig): ServiceArea[] {
  return config.serviceAreas.filter(isAreaIndexable);
}

/**
 * Calculate total indexable pages
 */
export function calculateTotalPages(config: SiteConfig): number {
  const services = getIndexableServices(config).length;
  const areas = getIndexableAreas(config).length;

  return 1 + // Homepage
         services + // Service pages
         areas + // Location pages
         (services * areas) + // Combo pages
         1 + // About
         1; // Contact
}
