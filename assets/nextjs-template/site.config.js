// site.config.js - Central configuration for the entire website
// See references/content-scoring.md for required fields
// See references/local-proof-checklist.md for local content requirements

module.exports = {
  // ═══════════════════════════════════════════════════════════════
  // BUSINESS INFORMATION
  // ═══════════════════════════════════════════════════════════════
  business: {
    name: "Your Business Name",
    legalName: "Your Business Name LLC",
    // schemaType: Schema.org type (e.g., "Plumber", "Painter", "Dentist")
    schemaType: "LocalBusiness",
    tagline: "Your Business Tagline",
    description: "Brief 2-3 sentence description for meta and schema.",
    phone: "(555) 123-4567",
    email: "info@yourbusiness.com",
    url: "https://yourbusiness.com",
    logo: "/images/logo.png",
    image: "/images/hero.jpg",
    priceRange: "$$",
    foundingDate: "2010", // Exact year (not "5+ years")
  },

  // ═══════════════════════════════════════════════════════════════
  // TRUST SIGNALS (Required for AI citation blocks)
  // ═══════════════════════════════════════════════════════════════
  trustSignals: {
    license: {
      number: "",           // e.g., "HIC #12345"
      type: "",             // e.g., "Home Improvement Contractor"
      state: "",            // e.g., "MA"
      display: "",          // e.g., "Licensed MA Contractor #12345"
    },
    insurance: {
      coverage: "",         // e.g., "$1,000,000"
      provider: "",         // Optional
      bonded: false,
    },
    certifications: [
      // e.g., "EPA Lead-Safe Certified", "OSHA 10"
    ],
    affiliations: [
      // e.g., "BBB Accredited", "Chamber of Commerce Member"
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ADDRESS
  // ═══════════════════════════════════════════════════════════════
  address: {
    street: "123 Main Street",
    suite: "",
    city: "Your City",
    state: "ST",
    zip: "12345",
    country: "US",
  },

  // ═══════════════════════════════════════════════════════════════
  // COORDINATES (for schema - leave 0 if unknown)
  // ═══════════════════════════════════════════════════════════════
  geo: {
    latitude: 0.0000,
    longitude: 0.0000,
  },

  // ═══════════════════════════════════════════════════════════════
  // BUSINESS HOURS
  // ═══════════════════════════════════════════════════════════════
  hours: {
    monday: "08:00-17:00",
    tuesday: "08:00-17:00",
    wednesday: "08:00-17:00",
    thursday: "08:00-17:00",
    friday: "08:00-17:00",
    saturday: "09:00-14:00",
    sunday: "Closed",
  },

  // ═══════════════════════════════════════════════════════════════
  // GBP CATEGORIES
  // ═══════════════════════════════════════════════════════════════
  gbpCategories: {
    primary: "Your Primary Category",
    secondary: ["Secondary 1", "Secondary 2"],
  },

  // ═══════════════════════════════════════════════════════════════
  // SERVICES (with expertise data for content quality)
  // Projects for each service are defined in the 'projects' section below
  // ═══════════════════════════════════════════════════════════════
  services: [
    {
      name: "Service Name",
      slug: "service-name",
      description: "Brief description for meta tags.",
      longDescription: "Longer description for page content.",
      
      // PRICING (Required for AI citation)
      priceRange: "$100-500",
      priceMin: 100,
      priceMax: 500,
      priceCurrency: "USD",
      
      // TIMING (Required for AI citation)
      duration: "1-2 days",
      
      // EXPERTISE SIGNALS
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
      ],
      
      // PROCESS (for expertise content)
      process: [
        { step: 1, name: "Step Name", description: "What happens in this step" },
        { step: 2, name: "Step Name", description: "What happens in this step" },
        { step: 3, name: "Step Name", description: "What happens in this step" },
        { step: 4, name: "Step Name", description: "What happens in this step" },
      ],
      
      // MATERIALS (expertise signal)
      materials: [
        "Brand/material you use",
        "Another brand/material",
      ],
      
      // COMMON ISSUES (expertise content)
      commonIssues: [
        "Common problem DIYers face",
        "What usually goes wrong",
      ],
      
      // SERVICE-SPECIFIC FAQs
      faqs: [
        {
          question: "How much does this service cost?",
          answer: "This service typically costs $100-500...",
        },
      ],
      
      // INDEX CONTROL
      index: true,
      
      // SHOW PROJECT GALLERY (pulls from projects section by slug)
      showProjects: true,
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SERVICE AREAS (with local proof data)
  // ═══════════════════════════════════════════════════════════════
  serviceAreas: [
    {
      city: "City Name",
      slug: "city-name",
      state: "ST",
      county: "County Name",    // REQUIRED for indexing
      zipCodes: ["12345"],
      
      // LOCAL PROOF (need 2+ to index)
      neighborhoods: [
        "Downtown",
        "North Side",
        "West End",
      ],
      landmarks: [
        "Central Park",
        "Main Street Historic District",
        "Local University",
      ],
      
      // LOCAL DEEP PARAGRAPH (REQUIRED for indexing)
      // Must be 50+ words with local specifics
      localParagraph: `
        In [City], many homes built in [era] have [common issue] due to [local factor].
        We frequently serve neighborhoods near [Landmark 1] and along [Street/Area],
        where [specific local challenge] makes [your expertise] especially important.
      `,
      
      // REGIONAL CONTEXT
      regionalIssues: [
        "Local climate/weather issue",
        "Common housing issue in area",
      ],
      
      // HOUSING TYPES (for content)
      housingTypes: ["Victorian", "Colonial", "Ranch"],
      
      // LOCAL REGULATIONS
      permits: "", // e.g., "Permits required for exterior work over $10,000"
      
      // INDEX CONTROL
      index: true, // Set false if no local proof data
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SOCIAL MEDIA
  // ═══════════════════════════════════════════════════════════════
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    tiktok: "",
    pinterest: "",
    twitter: "",
    nextdoor: "",
    houzz: "",
  },

  // ═══════════════════════════════════════════════════════════════
  // REVIEWS (with real data for schema)
  // ═══════════════════════════════════════════════════════════════
  reviews: {
    google: {
      url: "",
      placeId: "",
      reviewCount: 0,
      rating: 0,
    },
    yelp: {
      url: "",
      reviewCount: 0,
      rating: 0,
    },
    facebook: {
      url: "",
      reviewCount: 0,
      rating: 0,
    },
    // Aggregate for schema (must have 5+ reviews to display)
    aggregate: {
      totalReviews: 0,
      averageRating: 0,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // EMBED CONFIGURATIONS
  // ═══════════════════════════════════════════════════════════════
  embeds: {
    gmbMapUrl: "",
    googleMapsApiKey: "",
    // Third-party form embed (e.g., Jotform, Typeform, Google Forms)
    // Paste the full iframe src URL from your form provider
    formIframeUrl: "",
    // Third-party review widget embed (e.g., Birdeye, Grade.us, EmbedSocial)
    // Paste the full iframe src URL from your review widget provider
    reviewIframeUrl: "",
  },

  // ═══════════════════════════════════════════════════════════════
  // MAP SETTINGS
  // ═══════════════════════════════════════════════════════════════
  maps: {
    zoom: 13,
    showServiceArea: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BRANDING
  // ═══════════════════════════════════════════════════════════════
  branding: {
    colors: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#f59e0b",
      dark: "#1f2937",
      light: "#f3f4f6",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTENT & VOICE
  // ═══════════════════════════════════════════════════════════════
  content: {
    usps: [
      "Unique Selling Point 1",
      "Unique Selling Point 2",
      "Unique Selling Point 3",
    ],
    targetAudience: "Homeowners in the area",
    painPoints: [
      "Pain point 1",
      "Pain point 2",
    ],
    tone: "professional", // professional, friendly, expert, casual
  },

  // ═══════════════════════════════════════════════════════════════
  // ABOUT PAGE (entity signals)
  // ═══════════════════════════════════════════════════════════════
  about: {
    story: "Your company story and mission...",
    owner: {
      name: "Owner Name",          // REQUIRED for entity signals
      title: "Owner & Founder",
      bio: "Brief bio about the owner...",
      image: "/images/owner.jpg",
      credentials: [],             // e.g., "20 years experience", "Former contractor"
    },
    team: {
      size: "5-10",
      description: "Our team of professionals...",
    },
    certifications: [],            // Same as trustSignals.certifications
    awards: [],
    communityInvolvement: "",
    whyFounded: "",                // Why the company was started
  },

  // ═══════════════════════════════════════════════════════════════
  // DEFAULT FAQs
  // ═══════════════════════════════════════════════════════════════
  defaultFAQs: [
    {
      question: "What areas do you serve?",
      answer: "We serve [City] and surrounding areas including...",
    },
    {
      question: "Do you offer free estimates?",
      answer: "Yes, we provide free, written estimates for all services.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes, we are fully licensed (#[LICENSE]) and insured up to [AMOUNT].",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SEO DEFAULTS
  // ═══════════════════════════════════════════════════════════════
  seo: {
    titleTemplate: "%s | Your Business Name",
    defaultTitle: "Your Business Name - Your Tagline",
    defaultDescription: "Default meta description...",
    siteUrl: "https://yourbusiness.com",
    ogImage: "/images/og-default.jpg",
    twitterHandle: "@yourbusiness",
  },

  // ═══════════════════════════════════════════════════════════════
  // SITEMAP SETTINGS
  // ═══════════════════════════════════════════════════════════════
  sitemap: {
    priorities: {
      homepage: 1.0,
      services: 0.9,
      locations: 0.8,
      locationService: 0.7,
      about: 0.6,
      contact: 0.6,
    },
    changeFrequency: {
      homepage: "weekly",
      services: "monthly",
      locations: "monthly",
      locationService: "monthly",
      about: "yearly",
      contact: "yearly",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTENT QUALITY REQUIREMENTS
  // See references/content-scoring.md
  // ═══════════════════════════════════════════════════════════════
  contentRequirements: {
    // Minimum score to index (7-10 recommended)
    minimumIndexScore: 7,
    
    // Pages without local proof data are auto-noindexed
    requireLocalProof: true,
    
    // Combo pages need these minimums to index
    comboPageRequirements: {
      minNeighborhoods: 2,
      minLandmarks: 2,
      requireLocalParagraph: true,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // UI SETTINGS
  // ═══════════════════════════════════════════════════════════════
  ui: {
    socialIconsLocation: "both",
    showReviewWidgets: true,
    showBreadcrumbs: true,
    showRelatedServices: true,
    showNearbyLocations: true,
    ctaButtonText: "Get Free Estimate",
    ctaPhoneText: "Call Now",
  },

  // ═══════════════════════════════════════════════════════════════
  // PROJECT PHOTOS (Before/After Gallery)
  // ═══════════════════════════════════════════════════════════════
  // Add project photos per service for portfolio/gallery display
  // Images go in: /public/images/projects/[service-slug]/
  projects: {
    'exterior-painting': [
      {
        id: 'ext-1',
        title: 'Victorian Home Restoration',
        location: 'Maynard, MA',
        beforeImage: '/images/projects/exterior-painting/project-1-before.jpg',
        afterImage: '/images/projects/exterior-painting/project-1-after.jpg',
        description: 'Complete exterior repaint with cedar shingle repair',
      },
      {
        id: 'ext-2',
        title: 'Colonial Refresh',
        location: 'Acton, MA',
        beforeImage: '/images/projects/exterior-painting/project-2-before.jpg',
        afterImage: '/images/projects/exterior-painting/project-2-after.jpg',
        description: 'Updated color scheme with trim and shutters',
      },
    ],
    'interior-painting': [
      {
        id: 'int-1',
        title: 'Living Room Transformation',
        location: 'Concord, MA',
        beforeImage: '/images/projects/interior-painting/project-1-before.jpg',
        afterImage: '/images/projects/interior-painting/project-1-after.jpg',
        description: 'Modern color palette with accent wall',
      },
      {
        id: 'int-2',
        title: 'Kitchen Cabinet Refinish',
        location: 'Sudbury, MA',
        beforeImage: '/images/projects/interior-painting/project-2-before.jpg',
        afterImage: '/images/projects/interior-painting/project-2-after.jpg',
        description: 'White cabinet transformation with new hardware',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRUST BADGES ("Proud Member Of")
  // ═══════════════════════════════════════════════════════════════
  // Membership logos, certifications, and affiliations
  // Images go in: /public/images/badges/
  trustBadges: [
    {
      name: 'Chamber of Commerce',
      image: '/images/badges/chamber-of-commerce.png',
      url: 'https://chamberofcommerce.com',  // Optional link
      alt: 'Chamber of Commerce Member',
    },
    {
      name: 'Putnam Business Association',
      image: '/images/badges/putnam-business-association.png',
      url: '',
      alt: 'Putnam Business Association Member',
    },
    // Add more badges as needed:
    // {
    //   name: 'Better Business Bureau',
    //   image: '/images/badges/bbb.png',
    //   url: 'https://bbb.org/...',
    //   alt: 'BBB Accredited Business',
    // },
    // {
    //   name: 'EPA Lead-Safe Certified',
    //   image: '/images/badges/lead-safe.png',
    //   url: '',
    //   alt: 'EPA Lead-Safe Certified Firm',
    // },
  ],

  // ═══════════════════════════════════════════════════════════════
  // BRANDS WE USE ("Products We Use")
  // ═══════════════════════════════════════════════════════════════
  // Product and brand logos for credibility
  // Images go in: /public/images/brands/
  brands: [
    {
      name: 'Sherwin-Williams',
      image: '/images/brands/sherwin-williams.png',
      url: 'https://sherwin-williams.com',
      description: 'Premium paints for lasting durability',
    },
    {
      name: 'Benjamin Moore',
      image: '/images/brands/benjamin-moore.png',
      url: 'https://benjaminmoore.com',
      description: 'Industry-leading color selection',
    },
    // Add more brands as needed:
    // {
    //   name: 'PPG Paints',
    //   image: '/images/brands/ppg.png',
    //   url: 'https://ppgpaints.com',
    //   description: 'Professional-grade finishes',
    // },
  ],
};
