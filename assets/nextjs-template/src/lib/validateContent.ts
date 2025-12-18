// src/lib/validateContent.ts
// Automated content quality scoring based on references/content-scoring.md
// Use this to validate pages before publishing and auto-generate noindex tags

import {
  config,
  getAllServices,
  getAllServiceAreas,
  hasLocalProof,
  hasValidAggregateRating,
  getLicenseDisplay,
  getInsuranceCoverage,
  getFoundingYear,
  getOwnerName,
  type ServiceArea,
  type Service,
} from './site';

// ═══════════════════════════════════════════════════════════════
// SCORING THRESHOLDS
// ═══════════════════════════════════════════════════════════════

export const SCORE_THRESHOLDS = {
  /** 0-3: Don't generate the page at all */
  DO_NOT_GENERATE: 3,
  /** 4-6: Generate but noindex */
  NOINDEX: 6,
  /** 7-9: Index the page */
  INDEX: 7,
  /** 10+: Priority page, consider for internal linking */
  PRIORITY: 10,
};

export const PAGE_TYPE_MINIMUMS = {
  homepage: 10,
  service: 8,
  location: 7,
  combo: 7,
  about: 6,
  contact: 5,
};

// ═══════════════════════════════════════════════════════════════
// SCORING RESULT TYPES
// ═══════════════════════════════════════════════════════════════

export interface ScoreBreakdown {
  category: string;
  item: string;
  points: number;
  maxPoints: number;
  present: boolean;
}

export interface ContentScore {
  pageType: 'homepage' | 'service' | 'location' | 'combo' | 'about' | 'contact';
  pageName: string;
  totalScore: number;
  maxPossibleScore: number;
  breakdown: ScoreBreakdown[];
  shouldIndex: boolean;
  shouldGenerate: boolean;
  isPriority: boolean;
  warnings: string[];
  suggestions: string[];
}

// ═══════════════════════════════════════════════════════════════
// HARD TRUST SIGNALS (2 points each, max 10)
// ═══════════════════════════════════════════════════════════════

function scoreHardTrustSignals(): ScoreBreakdown[] {
  const breakdown: ScoreBreakdown[] = [];

  // License number
  const hasLicense = Boolean(getLicenseDisplay());
  breakdown.push({
    category: 'Hard Trust',
    item: 'License number displayed',
    points: hasLicense ? 2 : 0,
    maxPoints: 2,
    present: hasLicense,
  });

  // Insurance coverage
  const hasInsurance = Boolean(getInsuranceCoverage());
  breakdown.push({
    category: 'Hard Trust',
    item: 'Insurance coverage displayed',
    points: hasInsurance ? 2 : 0,
    maxPoints: 2,
    present: hasInsurance,
  });

  // Founding year
  const hasFounding = Boolean(getFoundingYear());
  breakdown.push({
    category: 'Hard Trust',
    item: 'Founding year displayed',
    points: hasFounding ? 2 : 0,
    maxPoints: 2,
    present: hasFounding,
  });

  // Review count with rating
  const hasReviews = hasValidAggregateRating();
  breakdown.push({
    category: 'Hard Trust',
    item: 'Review count with rating (5+ reviews)',
    points: hasReviews ? 2 : 0,
    maxPoints: 2,
    present: hasReviews,
  });

  // Owner name
  const hasOwner = Boolean(getOwnerName());
  breakdown.push({
    category: 'Hard Trust',
    item: 'Owner name displayed',
    points: hasOwner ? 2 : 0,
    maxPoints: 2,
    present: hasOwner,
  });

  return breakdown;
}

// ═══════════════════════════════════════════════════════════════
// LOCAL PROOF SIGNALS (1 point each, max 5)
// ═══════════════════════════════════════════════════════════════

function scoreLocalProofSignals(area?: ServiceArea): ScoreBreakdown[] {
  const breakdown: ScoreBreakdown[] = [];

  if (!area) {
    return breakdown;
  }

  // Neighborhoods (2+)
  const hasNeighborhoods = (area.neighborhoods?.length || 0) >= 2;
  breakdown.push({
    category: 'Local Proof',
    item: 'Neighborhoods mentioned (2+)',
    points: hasNeighborhoods ? 1 : 0,
    maxPoints: 1,
    present: hasNeighborhoods,
  });

  // Landmarks (2+)
  const hasLandmarks = (area.landmarks?.length || 0) >= 2;
  breakdown.push({
    category: 'Local Proof',
    item: 'Landmarks mentioned (2+)',
    points: hasLandmarks ? 1 : 0,
    maxPoints: 1,
    present: hasLandmarks,
  });

  // County name
  const hasCounty = Boolean(area.county);
  breakdown.push({
    category: 'Local Proof',
    item: 'County name mentioned',
    points: hasCounty ? 1 : 0,
    maxPoints: 1,
    present: hasCounty,
  });

  // Permit info
  const hasPermits = Boolean(area.permits);
  breakdown.push({
    category: 'Local Proof',
    item: 'Permit requirements mentioned',
    points: hasPermits ? 1 : 0,
    maxPoints: 1,
    present: hasPermits,
  });

  // Regional issues
  const hasRegionalIssues = (area.regionalIssues?.length || 0) >= 1;
  breakdown.push({
    category: 'Local Proof',
    item: 'Regional issues mentioned',
    points: hasRegionalIssues ? 1 : 0,
    maxPoints: 1,
    present: hasRegionalIssues,
  });

  return breakdown;
}

// ═══════════════════════════════════════════════════════════════
// EXPERTISE SIGNALS (1 point each, max 4)
// ═══════════════════════════════════════════════════════════════

function scoreExpertiseSignals(service?: Service): ScoreBreakdown[] {
  const breakdown: ScoreBreakdown[] = [];

  if (!service) {
    return breakdown;
  }

  // Step-by-step process (3+)
  const hasProcess = (service.process?.length || 0) >= 3;
  breakdown.push({
    category: 'Expertise',
    item: 'Step-by-step process (3+ steps)',
    points: hasProcess ? 1 : 0,
    maxPoints: 1,
    present: hasProcess,
  });

  // Common problems
  const hasCommonIssues = (service.commonIssues?.length || 0) >= 2;
  breakdown.push({
    category: 'Expertise',
    item: 'Common problems addressed (2+)',
    points: hasCommonIssues ? 1 : 0,
    maxPoints: 1,
    present: hasCommonIssues,
  });

  // Materials/brands used
  const hasMaterials = (service.materials?.length || 0) >= 2;
  breakdown.push({
    category: 'Expertise',
    item: 'Materials/brands mentioned (2+)',
    points: hasMaterials ? 1 : 0,
    maxPoints: 1,
    present: hasMaterials,
  });

  // Prep details (features)
  const hasFeatures = (service.features?.length || 0) >= 3;
  breakdown.push({
    category: 'Expertise',
    item: 'Service features listed (3+)',
    points: hasFeatures ? 1 : 0,
    maxPoints: 1,
    present: hasFeatures,
  });

  return breakdown;
}

// ═══════════════════════════════════════════════════════════════
// UNIQUE CONTENT SIGNALS (1 point each, max 3)
// ═══════════════════════════════════════════════════════════════

function scoreUniqueContent(
  area?: ServiceArea,
  service?: Service
): ScoreBreakdown[] {
  const breakdown: ScoreBreakdown[] = [];

  // Local deep paragraph (50+ words)
  if (area) {
    const localParagraph = area.localParagraph?.trim() || '';
    const wordCount = localParagraph.split(/\s+/).filter(Boolean).length;
    const hasLocalParagraph = wordCount >= 50;
    breakdown.push({
      category: 'Unique Content',
      item: 'Local deep paragraph (50+ words)',
      points: hasLocalParagraph ? 1 : 0,
      maxPoints: 1,
      present: hasLocalParagraph,
    });
  }

  // Location-specific FAQ
  if (service) {
    const hasFAQs = (service.faqs?.length || 0) >= 2;
    breakdown.push({
      category: 'Unique Content',
      item: 'Service-specific FAQs (2+)',
      points: hasFAQs ? 1 : 0,
      maxPoints: 1,
      present: hasFAQs,
    });
  }

  // Custom service description
  if (service) {
    const hasLongDesc = (service.longDescription?.length || 0) >= 100;
    breakdown.push({
      category: 'Unique Content',
      item: 'Custom service description (100+ chars)',
      points: hasLongDesc ? 1 : 0,
      maxPoints: 1,
      present: hasLongDesc,
    });
  }

  return breakdown;
}

// ═══════════════════════════════════════════════════════════════
// PRICING & TIMING SIGNALS (for AI citation)
// ═══════════════════════════════════════════════════════════════

function scorePricingSignals(service?: Service): ScoreBreakdown[] {
  const breakdown: ScoreBreakdown[] = [];

  if (!service) {
    return breakdown;
  }

  // Pricing info
  const hasPricing = Boolean(service.priceRange || service.priceMin);
  breakdown.push({
    category: 'AI Citation',
    item: 'Pricing information provided',
    points: hasPricing ? 1 : 0,
    maxPoints: 1,
    present: hasPricing,
  });

  // Duration/timing
  const hasDuration = Boolean(service.duration);
  breakdown.push({
    category: 'AI Citation',
    item: 'Service duration provided',
    points: hasDuration ? 1 : 0,
    maxPoints: 1,
    present: hasDuration,
  });

  return breakdown;
}

// ═══════════════════════════════════════════════════════════════
// MAIN SCORING FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Score the homepage
 */
export function scoreHomepage(): ContentScore {
  const breakdown: ScoreBreakdown[] = [
    ...scoreHardTrustSignals(),
  ];

  // Check for services and areas
  const hasServices = getAllServices().length >= 3;
  breakdown.push({
    category: 'Content',
    item: 'Services listed (3+)',
    points: hasServices ? 2 : 0,
    maxPoints: 2,
    present: hasServices,
  });

  const hasAreas = getAllServiceAreas().length >= 3;
  breakdown.push({
    category: 'Content',
    item: 'Service areas listed (3+)',
    points: hasAreas ? 2 : 0,
    maxPoints: 2,
    present: hasAreas,
  });

  // Default FAQs
  const hasFAQs = (config.defaultFAQs?.length || 0) >= 3;
  breakdown.push({
    category: 'Content',
    item: 'Default FAQs (3+)',
    points: hasFAQs ? 1 : 0,
    maxPoints: 1,
    present: hasFAQs,
  });

  const totalScore = breakdown.reduce((sum, b) => sum + b.points, 0);
  const maxPossibleScore = breakdown.reduce((sum, b) => sum + b.maxPoints, 0);
  const minimum = PAGE_TYPE_MINIMUMS.homepage;

  return {
    pageType: 'homepage',
    pageName: 'Homepage',
    totalScore,
    maxPossibleScore,
    breakdown,
    shouldIndex: totalScore >= minimum,
    shouldGenerate: totalScore > SCORE_THRESHOLDS.DO_NOT_GENERATE,
    isPriority: totalScore >= SCORE_THRESHOLDS.PRIORITY,
    warnings: generateWarnings(breakdown),
    suggestions: generateSuggestions(breakdown),
  };
}

/**
 * Score a service page
 */
export function scoreServicePage(service: Service): ContentScore {
  const breakdown: ScoreBreakdown[] = [
    ...scoreHardTrustSignals(),
    ...scoreExpertiseSignals(service),
    ...scoreUniqueContent(undefined, service),
    ...scorePricingSignals(service),
  ];

  const totalScore = breakdown.reduce((sum, b) => sum + b.points, 0);
  const maxPossibleScore = breakdown.reduce((sum, b) => sum + b.maxPoints, 0);
  const minimum = PAGE_TYPE_MINIMUMS.service;

  return {
    pageType: 'service',
    pageName: `Service: ${service.name}`,
    totalScore,
    maxPossibleScore,
    breakdown,
    shouldIndex: totalScore >= minimum && service.index !== false,
    shouldGenerate: totalScore > SCORE_THRESHOLDS.DO_NOT_GENERATE,
    isPriority: totalScore >= SCORE_THRESHOLDS.PRIORITY,
    warnings: generateWarnings(breakdown),
    suggestions: generateSuggestions(breakdown),
  };
}

/**
 * Score a location page
 */
export function scoreLocationPage(area: ServiceArea): ContentScore {
  const breakdown: ScoreBreakdown[] = [
    ...scoreHardTrustSignals(),
    ...scoreLocalProofSignals(area),
    ...scoreUniqueContent(area, undefined),
  ];

  const totalScore = breakdown.reduce((sum, b) => sum + b.points, 0);
  const maxPossibleScore = breakdown.reduce((sum, b) => sum + b.maxPoints, 0);
  const minimum = PAGE_TYPE_MINIMUMS.location;

  // Additional check: must have local proof
  const meetsLocalProof = hasLocalProof(area);

  return {
    pageType: 'location',
    pageName: `Location: ${area.city}, ${area.state}`,
    totalScore,
    maxPossibleScore,
    breakdown,
    shouldIndex: totalScore >= minimum && meetsLocalProof && area.index !== false,
    shouldGenerate: totalScore > SCORE_THRESHOLDS.DO_NOT_GENERATE,
    isPriority: totalScore >= SCORE_THRESHOLDS.PRIORITY,
    warnings: [
      ...generateWarnings(breakdown),
      ...(!meetsLocalProof ? ['Missing local proof (needs neighborhoods/landmarks + local paragraph)'] : []),
    ],
    suggestions: generateSuggestions(breakdown),
  };
}

/**
 * Score a location+service combo page
 */
export function scoreComboPage(
  area: ServiceArea,
  service: Service
): ContentScore {
  const breakdown: ScoreBreakdown[] = [
    ...scoreHardTrustSignals(),
    ...scoreLocalProofSignals(area),
    ...scoreExpertiseSignals(service),
    ...scoreUniqueContent(area, service),
    ...scorePricingSignals(service),
  ];

  const totalScore = breakdown.reduce((sum, b) => sum + b.points, 0);
  const maxPossibleScore = breakdown.reduce((sum, b) => sum + b.maxPoints, 0);
  const minimum = PAGE_TYPE_MINIMUMS.combo;

  // Combo pages have stricter requirements
  const meetsLocalProof = hasLocalProof(area);
  const hasPricing = Boolean(service.priceRange || service.priceMin);

  return {
    pageType: 'combo',
    pageName: `${service.name} in ${area.city}`,
    totalScore,
    maxPossibleScore,
    breakdown,
    shouldIndex:
      totalScore >= minimum &&
      meetsLocalProof &&
      hasPricing &&
      area.index !== false &&
      service.index !== false,
    shouldGenerate: totalScore > SCORE_THRESHOLDS.DO_NOT_GENERATE,
    isPriority: totalScore >= SCORE_THRESHOLDS.PRIORITY,
    warnings: [
      ...generateWarnings(breakdown),
      ...(!meetsLocalProof ? ['Missing local proof for combo page'] : []),
      ...(!hasPricing ? ['Missing pricing for AI citation'] : []),
    ],
    suggestions: generateSuggestions(breakdown),
  };
}

/**
 * Score the about page
 */
export function scoreAboutPage(): ContentScore {
  const breakdown: ScoreBreakdown[] = [...scoreHardTrustSignals()];

  // About-specific content
  const hasStory = (config.about?.story?.length || 0) >= 100;
  breakdown.push({
    category: 'Content',
    item: 'Company story (100+ chars)',
    points: hasStory ? 1 : 0,
    maxPoints: 1,
    present: hasStory,
  });

  const hasOwnerBio = (config.about?.owner?.bio?.length || 0) >= 50;
  breakdown.push({
    category: 'Content',
    item: 'Owner bio (50+ chars)',
    points: hasOwnerBio ? 1 : 0,
    maxPoints: 1,
    present: hasOwnerBio,
  });

  const hasCerts = (config.about?.certifications?.length || 0) >= 1;
  breakdown.push({
    category: 'Content',
    item: 'Certifications listed',
    points: hasCerts ? 1 : 0,
    maxPoints: 1,
    present: hasCerts,
  });

  const totalScore = breakdown.reduce((sum, b) => sum + b.points, 0);
  const maxPossibleScore = breakdown.reduce((sum, b) => sum + b.maxPoints, 0);

  return {
    pageType: 'about',
    pageName: 'About Page',
    totalScore,
    maxPossibleScore,
    breakdown,
    shouldIndex: totalScore >= PAGE_TYPE_MINIMUMS.about,
    shouldGenerate: true,
    isPriority: totalScore >= SCORE_THRESHOLDS.PRIORITY,
    warnings: generateWarnings(breakdown),
    suggestions: generateSuggestions(breakdown),
  };
}

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function generateWarnings(breakdown: ScoreBreakdown[]): string[] {
  const warnings: string[] = [];

  // Check for missing hard trust signals
  const hardTrust = breakdown.filter(b => b.category === 'Hard Trust');
  const hardTrustScore = hardTrust.reduce((sum, b) => sum + b.points, 0);
  if (hardTrustScore < 6) {
    warnings.push('Low trust signals - add license, insurance, or reviews');
  }

  return warnings;
}

function generateSuggestions(
  breakdown: ScoreBreakdown[]
): string[] {
  const suggestions: string[] = [];

  breakdown.forEach(b => {
    if (!b.present) {
      suggestions.push(`Add: ${b.item}`);
    }
  });

  return suggestions.slice(0, 5); // Limit to top 5 suggestions
}

// ═══════════════════════════════════════════════════════════════
// BATCH SCORING
// ═══════════════════════════════════════════════════════════════

export interface SiteScoreReport {
  homepage: ContentScore;
  services: ContentScore[];
  locations: ContentScore[];
  combos: ContentScore[];
  about: ContentScore;
  summary: {
    totalPages: number;
    indexablePages: number;
    noindexPages: number;
    priorityPages: number;
    averageScore: number;
  };
}

/**
 * Score all pages in the site
 */
export function scoreEntireSite(): SiteScoreReport {
  const homepage = scoreHomepage();
  const services = getAllServices().map(s => scoreServicePage(s));
  const locations = getAllServiceAreas().map(a => scoreLocationPage(a));
  const combos: ContentScore[] = [];

  // Score all combo pages
  getAllServiceAreas().forEach(area => {
    getAllServices().forEach(service => {
      combos.push(scoreComboPage(area, service));
    });
  });

  const about = scoreAboutPage();

  const allScores = [homepage, ...services, ...locations, ...combos, about];
  const totalPages = allScores.length;
  const indexablePages = allScores.filter(s => s.shouldIndex).length;
  const noindexPages = allScores.filter(s => !s.shouldIndex && s.shouldGenerate).length;
  const priorityPages = allScores.filter(s => s.isPriority).length;
  const averageScore =
    allScores.reduce((sum, s) => sum + s.totalScore, 0) / totalPages;

  return {
    homepage,
    services,
    locations,
    combos,
    about,
    summary: {
      totalPages,
      indexablePages,
      noindexPages,
      priorityPages,
      averageScore: Math.round(averageScore * 10) / 10,
    },
  };
}

/**
 * Get pages that should be noindexed
 */
export function getNoindexPages(): string[] {
  const report = scoreEntireSite();
  const noindex: string[] = [];

  if (!report.homepage.shouldIndex) {
    noindex.push('/');
  }

  report.services.forEach(s => {
    if (!s.shouldIndex) {
      const service = getAllServices().find(svc => s.pageName.includes(svc.name));
      if (service) noindex.push(`/services/${service.slug}`);
    }
  });

  report.locations.forEach(l => {
    if (!l.shouldIndex) {
      const area = getAllServiceAreas().find(a => l.pageName.includes(a.city));
      if (area) noindex.push(`/locations/${area.slug}`);
    }
  });

  report.combos.forEach(c => {
    if (!c.shouldIndex) {
      // Parse combo page name to get slugs
      const match = c.pageName.match(/(.+) in (.+)/);
      if (match) {
        const service = getAllServices().find(s => s.name === match[1]);
        const area = getAllServiceAreas().find(a => a.city === match[2]);
        if (service && area) {
          noindex.push(`/locations/${area.slug}/${service.slug}`);
        }
      }
    }
  });

  return noindex;
}

/**
 * Print a formatted score report to console
 */
export function printScoreReport(): void {
  const report = scoreEntireSite();

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                    CONTENT SCORE REPORT');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`Homepage: ${report.homepage.totalScore}/${report.homepage.maxPossibleScore} ${report.homepage.shouldIndex ? '✓' : '✗'}`);

  console.log('\nServices:');
  report.services.forEach(s => {
    console.log(`  ${s.pageName}: ${s.totalScore}/${s.maxPossibleScore} ${s.shouldIndex ? '✓' : '✗'}`);
  });

  console.log('\nLocations:');
  report.locations.forEach(l => {
    console.log(`  ${l.pageName}: ${l.totalScore}/${l.maxPossibleScore} ${l.shouldIndex ? '✓' : '✗'}`);
  });

  console.log('\nCombos (sample):');
  report.combos.slice(0, 5).forEach(c => {
    console.log(`  ${c.pageName}: ${c.totalScore}/${c.maxPossibleScore} ${c.shouldIndex ? '✓' : '✗'}`);
  });

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Total Pages: ${report.summary.totalPages}`);
  console.log(`Indexable: ${report.summary.indexablePages} (${Math.round(report.summary.indexablePages / report.summary.totalPages * 100)}%)`);
  console.log(`Noindex: ${report.summary.noindexPages}`);
  console.log(`Priority: ${report.summary.priorityPages}`);
  console.log(`Average Score: ${report.summary.averageScore}`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}
