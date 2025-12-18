// site.config.example.js - Example configuration with realistic data
// Copy this file to site.config.js and customize for your business
//
// This example shows a fictional painting company in Massachusetts.
// All data is realistic but fictional - do not use for actual business.

module.exports = {
  // ═══════════════════════════════════════════════════════════════
  // BUSINESS INFORMATION
  // ═══════════════════════════════════════════════════════════════
  business: {
    name: "Metrowest Pro Painters",
    legalName: "Metrowest Pro Painters LLC",
    schemaType: "Painter",
    tagline: "Quality Painting for Homes & Businesses Since 2008",
    description: "Professional painting contractor serving MetroWest Massachusetts. We specialize in interior and exterior painting for residential and commercial properties with a focus on quality craftsmanship and customer satisfaction.",
    phone: "(508) 555-0147",
    email: "info@metrowestpropainters.com",
    url: "https://metrowestpropainters.com",
    logo: "/images/logo.png",
    image: "/images/hero.jpg",
    priceRange: "$$",
    foundingDate: "2008",
  },

  // ═══════════════════════════════════════════════════════════════
  // TRUST SIGNALS
  // ═══════════════════════════════════════════════════════════════
  trustSignals: {
    license: {
      number: "HIC #187542",
      type: "Home Improvement Contractor",
      state: "MA",
      display: "Licensed MA Contractor HIC #187542",
    },
    insurance: {
      coverage: "$2,000,000",
      provider: "Liberty Mutual",
      bonded: true,
    },
    certifications: [
      "EPA Lead-Safe Certified (NAT-F208754-1)",
      "OSHA 10-Hour Safety Certified",
      "Benjamin Moore Certified Applicator",
    ],
    affiliations: [
      "Painting Contractors Association (PCA)",
      "MetroWest Chamber of Commerce",
      "Better Business Bureau A+ Rated",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ADDRESS
  // ═══════════════════════════════════════════════════════════════
  address: {
    street: "245 Main Street",
    suite: "Suite 102",
    city: "Framingham",
    state: "MA",
    zip: "01701",
    country: "US",
  },

  // ═══════════════════════════════════════════════════════════════
  // COORDINATES
  // ═══════════════════════════════════════════════════════════════
  geo: {
    latitude: 42.2793,
    longitude: -71.4162,
  },

  // ═══════════════════════════════════════════════════════════════
  // BUSINESS HOURS
  // ═══════════════════════════════════════════════════════════════
  hours: {
    monday: "07:00-18:00",
    tuesday: "07:00-18:00",
    wednesday: "07:00-18:00",
    thursday: "07:00-18:00",
    friday: "07:00-18:00",
    saturday: "08:00-14:00",
    sunday: "Closed",
  },

  // ═══════════════════════════════════════════════════════════════
  // GBP CATEGORIES
  // ═══════════════════════════════════════════════════════════════
  gbpCategories: {
    primary: "Painter",
    secondary: ["Painting contractor", "House painter", "Commercial painter"],
  },

  // ═══════════════════════════════════════════════════════════════
  // SERVICES
  // ═══════════════════════════════════════════════════════════════
  services: [
    {
      name: "Interior Painting",
      slug: "interior-painting",
      description: "Professional interior painting services for homes and businesses in MetroWest MA. Walls, ceilings, trim, and cabinets.",
      longDescription: "Transform your living spaces with our professional interior painting services. We handle everything from single rooms to whole-home repaints, including walls, ceilings, trim, doors, and cabinet refinishing. Our team uses premium Benjamin Moore and Sherwin-Williams paints for lasting results.",
      priceRange: "$2,500-8,000",
      priceMin: 2500,
      priceMax: 8000,
      priceCurrency: "USD",
      duration: "2-5 days",
      features: [
        "Premium paint brands (Benjamin Moore, Sherwin-Williams)",
        "Thorough surface preparation",
        "Clean, dust-free work environment",
        "Furniture protection included",
        "Touch-up kit provided",
      ],
      process: [
        { step: 1, name: "Color Consultation", description: "Free in-home consultation to discuss colors, finishes, and timeline" },
        { step: 2, name: "Surface Preparation", description: "Fill holes, sand rough areas, clean surfaces, apply primer where needed" },
        { step: 3, name: "Protection Setup", description: "Cover floors, furniture, and fixtures with drop cloths and plastic" },
        { step: 4, name: "Painting", description: "Apply two coats of premium paint with proper dry time between coats" },
        { step: 5, name: "Final Inspection", description: "Walk-through with homeowner, touch-ups, and cleanup" },
      ],
      materials: [
        "Benjamin Moore Regal Select",
        "Sherwin-Williams Duration",
        "Purdy brushes and rollers",
        "3M painter's tape",
      ],
      commonIssues: [
        "Peeling paint from moisture in bathrooms",
        "Nail pops and drywall cracks from settling",
        "Stains bleeding through from water damage",
        "Previous DIY paint jobs with poor coverage",
      ],
      faqs: [
        {
          question: "How much does interior painting cost in MetroWest MA?",
          answer: "Interior painting in MetroWest MA typically costs $2,500-8,000 for an average home, depending on room count, ceiling height, and surface condition. Single room projects start around $400-800.",
        },
        {
          question: "How long does interior painting take?",
          answer: "Most interior painting projects take 2-5 days. A single room typically takes 1 day, while a whole-home repaint may take a full week including prep and drying time.",
        },
        {
          question: "Do I need to move my furniture?",
          answer: "No, we handle furniture moving and protection. We cover everything with drop cloths and plastic sheeting. Large items are moved to the center of the room.",
        },
      ],
      index: true,
      showProjects: true,
    },
    {
      name: "Exterior Painting",
      slug: "exterior-painting",
      description: "Professional exterior house painting in MetroWest MA. Siding, trim, decks, and more with weather-resistant finishes.",
      longDescription: "Protect and beautify your home's exterior with our professional painting services. We specialize in New England weather-resistant coatings for wood siding, vinyl, aluminum, cedar shingles, trim, decks, and fences. Proper prep and premium paints ensure your paint job lasts 10+ years.",
      priceRange: "$4,000-15,000",
      priceMin: 4000,
      priceMax: 15000,
      priceCurrency: "USD",
      duration: "4-8 days",
      features: [
        "Weather-resistant exterior paints",
        "Power washing included",
        "Wood repair and replacement",
        "Caulking and sealing",
        "10-year workmanship warranty",
      ],
      process: [
        { step: 1, name: "Property Assessment", description: "Inspect siding, trim, and surfaces for damage, rot, or prep needs" },
        { step: 2, name: "Power Washing", description: "Clean all surfaces to remove dirt, mildew, and loose paint" },
        { step: 3, name: "Repairs & Prep", description: "Replace rotted wood, fill cracks, sand, and apply primer" },
        { step: 4, name: "Masking", description: "Protect windows, doors, landscaping, and non-painted surfaces" },
        { step: 5, name: "Painting", description: "Apply two coats of premium exterior paint with brushes and sprayers" },
        { step: 6, name: "Final Inspection", description: "Walk-around with homeowner, touch-ups, and debris cleanup" },
      ],
      materials: [
        "Benjamin Moore Aura Exterior",
        "Sherwin-Williams Duration Exterior",
        "Behr Marquee Exterior",
        "DAP caulk and wood filler",
      ],
      commonIssues: [
        "Peeling paint on north-facing walls from moisture",
        "Faded colors from sun exposure",
        "Rotted trim around windows and doors",
        "Mildew growth on shaded areas",
        "Previous paint failure from poor prep",
      ],
      faqs: [
        {
          question: "How much does exterior painting cost in Massachusetts?",
          answer: "Exterior painting in Massachusetts typically costs $4,000-15,000 for an average-sized home. Factors include home size, siding type, condition, and number of colors. Colonial homes average $6,000-10,000.",
        },
        {
          question: "What's the best time of year for exterior painting in MA?",
          answer: "The best time for exterior painting in Massachusetts is May through October when temperatures are consistently above 50°F. We avoid painting during high humidity or rain forecasts.",
        },
        {
          question: "How long does exterior paint last in New England?",
          answer: "With proper preparation and premium paint, exterior paint in New England lasts 8-12 years. We use weather-resistant coatings designed for harsh winters and humid summers.",
        },
      ],
      index: true,
      showProjects: true,
    },
    {
      name: "Cabinet Painting",
      slug: "cabinet-painting",
      description: "Kitchen and bathroom cabinet painting and refinishing in MetroWest MA. Transform your cabinets without replacement.",
      longDescription: "Give your kitchen or bathroom a fresh look without the cost of new cabinets. Our cabinet refinishing process includes thorough cleaning, sanding, priming, and multiple coats of durable cabinet-grade paint. We can match any color and offer both brush and spray finishes.",
      priceRange: "$3,000-8,000",
      priceMin: 3000,
      priceMax: 8000,
      priceCurrency: "USD",
      duration: "4-7 days",
      features: [
        "Factory-like spray finish available",
        "Durable cabinet-grade paints",
        "Hardware removal and reinstallation",
        "Minimal disruption to your kitchen",
        "Color matching available",
      ],
      process: [
        { step: 1, name: "Consultation", description: "Assess cabinet condition, discuss colors and finishes" },
        { step: 2, name: "Preparation", description: "Remove doors and hardware, clean, sand, fill imperfections" },
        { step: 3, name: "Priming", description: "Apply bonding primer for maximum adhesion" },
        { step: 4, name: "Painting", description: "Apply 2-3 coats of cabinet-grade paint with proper cure time" },
        { step: 5, name: "Reassembly", description: "Reinstall doors, hardware, and adjust alignment" },
      ],
      materials: [
        "Benjamin Moore Advance",
        "Sherwin-Williams Emerald Urethane",
        "Fine Paints of Europe Hollandlac",
        "Cabinet-grade primers",
      ],
      commonIssues: [
        "Grease buildup preventing paint adhesion",
        "Previous paint or stain bleeding through",
        "Wood grain showing through paint",
        "Chipping from improper prep or paint",
      ],
      faqs: [
        {
          question: "How much does cabinet painting cost?",
          answer: "Cabinet painting in MetroWest MA typically costs $3,000-8,000 for an average kitchen. Price depends on cabinet count, size, condition, and whether you choose brush or spray finish.",
        },
        {
          question: "Is painting cabinets worth it vs. replacing?",
          answer: "Cabinet painting costs 1/3 to 1/5 the price of new cabinets and takes days instead of weeks. It's ideal when your cabinet boxes are in good condition but the finish is dated.",
        },
      ],
      index: true,
      showProjects: true,
    },
    {
      name: "Deck Staining",
      slug: "deck-staining",
      description: "Professional deck staining and refinishing services in MetroWest MA. Protect your deck from New England weather.",
      longDescription: "Extend the life of your deck with professional staining and sealing. We offer transparent, semi-transparent, and solid stain options to protect your wood from UV damage, moisture, and wear. Our thorough prep process ensures maximum penetration and longevity.",
      priceRange: "$800-3,000",
      priceMin: 800,
      priceMax: 3000,
      priceCurrency: "USD",
      duration: "1-3 days",
      features: [
        "Power washing included",
        "Wood brightener treatment",
        "Multiple stain opacity options",
        "UV and moisture protection",
        "Annual maintenance programs",
      ],
      process: [
        { step: 1, name: "Inspection", description: "Check for loose boards, popped nails, and wood damage" },
        { step: 2, name: "Power Washing", description: "Clean deck surface and remove old stain residue" },
        { step: 3, name: "Wood Brightening", description: "Apply brightener to restore wood's natural color" },
        { step: 4, name: "Repairs", description: "Replace damaged boards, reset popped nails" },
        { step: 5, name: "Staining", description: "Apply stain using brush, roller, or sprayer" },
      ],
      materials: [
        "Cabot Australian Timber Oil",
        "Benjamin Moore Arborcoat",
        "TWP wood preservative",
        "Olympic Elite stain",
      ],
      commonIssues: [
        "Graying from UV exposure",
        "Mildew and algae growth",
        "Peeling from moisture trapped under old coatings",
        "Splintering from dried-out wood",
      ],
      faqs: [
        {
          question: "How often should I stain my deck in Massachusetts?",
          answer: "Decks in Massachusetts should be stained every 2-3 years due to harsh winters and humid summers. Annual inspection helps catch issues before they require major repairs.",
        },
        {
          question: "What type of deck stain is best for New England?",
          answer: "Semi-transparent oil-based stains typically perform best in New England, providing UV protection while allowing the wood to breathe. We recommend Cabot Australian Timber Oil for most applications.",
        },
      ],
      index: true,
      showProjects: true,
    },
    {
      name: "Commercial Painting",
      slug: "commercial-painting",
      description: "Commercial painting services for offices, retail, restaurants, and industrial facilities in MetroWest MA.",
      longDescription: "Professional commercial painting services for businesses throughout MetroWest Massachusetts. We work around your schedule to minimize disruption, offer flexible evening and weekend hours, and complete projects on time and on budget. From small offices to large industrial facilities.",
      priceRange: "$5,000-50,000",
      priceMin: 5000,
      priceMax: 50000,
      priceCurrency: "USD",
      duration: "1-4 weeks",
      features: [
        "After-hours and weekend availability",
        "Minimal business disruption",
        "OSHA-compliant safety practices",
        "Project management included",
        "Detailed proposals and timelines",
      ],
      process: [
        { step: 1, name: "Site Survey", description: "Assess facility, discuss requirements, timeline, and access" },
        { step: 2, name: "Detailed Proposal", description: "Provide comprehensive quote with scope, materials, and schedule" },
        { step: 3, name: "Scheduling", description: "Coordinate timing to minimize business disruption" },
        { step: 4, name: "Execution", description: "Complete work per plan with daily progress updates" },
        { step: 5, name: "Final Walk-through", description: "Inspect with facility manager, address any concerns" },
      ],
      materials: [
        "Sherwin-Williams ProMar 200",
        "Benjamin Moore Super Spec",
        "PPG Break-Through for high-traffic",
        "Epoxy coatings for industrial",
      ],
      commonIssues: [
        "Scuff marks in high-traffic areas",
        "Outdated colors affecting brand image",
        "Peeling in humid environments (kitchens, bathrooms)",
        "Coordination challenges with ongoing operations",
      ],
      faqs: [
        {
          question: "Do you work after business hours?",
          answer: "Yes, we offer evening and weekend painting for businesses that need to remain operational. Many retail and office projects are completed entirely outside business hours.",
        },
        {
          question: "How long does commercial painting take?",
          answer: "Project duration varies by size and complexity. Small offices take 2-3 days, medium retail spaces 1-2 weeks, and large industrial facilities 2-4 weeks or more.",
        },
      ],
      index: true,
      showProjects: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SERVICE AREAS
  // ═══════════════════════════════════════════════════════════════
  serviceAreas: [
    {
      city: "Framingham",
      slug: "framingham",
      state: "MA",
      county: "Middlesex County",
      zipCodes: ["01701", "01702", "01703", "01704", "01705"],
      neighborhoods: [
        "Nobscot",
        "Saxonville",
        "Downtown Framingham",
        "Framingham Centre",
        "Lokerville",
      ],
      landmarks: [
        "Shoppers World",
        "Framingham State University",
        "Danforth Museum",
        "Garden in the Woods",
        "Callahan State Park",
      ],
      localParagraph: `As Framingham's trusted painting contractor since 2008, we understand the unique challenges of painting homes in Massachusetts' largest town. From the historic Victorians in Framingham Centre to the mid-century ranches in Nobscot, we've painted hundreds of homes across all neighborhoods. Many Framingham homes built in the 1950s-70s have lead paint that requires EPA-certified removal, and our team holds full lead-safe certification. We're active members of the Framingham Business Association and proud to serve our hometown community.`,
      regionalIssues: [
        "Lead paint in pre-1978 homes",
        "Moisture issues from humid summers",
        "Salt damage near major roads",
      ],
      housingTypes: ["Colonial", "Victorian", "Ranch", "Cape Cod", "Split-level"],
      permits: "Building permits required for exterior work over $10,000",
      index: true,
    },
    {
      city: "Natick",
      slug: "natick",
      state: "MA",
      county: "Middlesex County",
      zipCodes: ["01760", "01761"],
      neighborhoods: [
        "Natick Center",
        "South Natick",
        "West Natick",
        "East Natick",
        "Wellesley line",
      ],
      landmarks: [
        "Natick Mall",
        "Lake Cochituate",
        "The Center for Arts in Natick",
        "Natick Common",
        "Broadmoor Wildlife Sanctuary",
      ],
      localParagraph: `Natick homeowners trust Metrowest Pro Painters for interior and exterior painting throughout this charming community. From the antique homes surrounding Natick Common to the newer developments near the Natick Mall, we adapt our approach to each home's unique needs. Properties near Lake Cochituate often face higher humidity levels requiring mildew-resistant exterior paints. We've completed dozens of projects in South Natick's historic district, where color selection must complement the area's Colonial character.`,
      regionalIssues: [
        "High humidity near Lake Cochituate",
        "Historic district color requirements",
        "Lead paint in older homes",
      ],
      housingTypes: ["Colonial", "Victorian", "Contemporary", "Garrison"],
      permits: "Historic district approval required in South Natick",
      index: true,
    },
    {
      city: "Wellesley",
      slug: "wellesley",
      state: "MA",
      county: "Norfolk County",
      zipCodes: ["02481", "02482"],
      neighborhoods: [
        "Wellesley Hills",
        "Wellesley Farms",
        "Wellesley Square",
        "Cliff Estates",
        "Sprague",
      ],
      landmarks: [
        "Wellesley College",
        "Elm Bank Reservation",
        "Wellesley Square",
        "Hunnewell Estates",
        "Babson College",
      ],
      localParagraph: `Wellesley's prestigious homes deserve exceptional painting craftsmanship, and our team delivers precisely that. We've painted numerous estates in Cliff Estates and along prestigious streets near Wellesley College, where attention to detail and premium finishes are expected. Many Wellesley homes feature intricate architectural details—crown moldings, wainscoting, and custom millwork—that require skilled brush work rather than spraying. We use only premium Benjamin Moore and Fine Paints of Europe products to meet the discerning standards of Wellesley homeowners.`,
      regionalIssues: [
        "High-end finish expectations",
        "Complex architectural details",
        "Strict homeowner association guidelines",
      ],
      housingTypes: ["Estate", "Colonial", "Tudor", "Georgian", "Contemporary"],
      permits: "Design review required in certain neighborhoods",
      index: true,
    },
    {
      city: "Sudbury",
      slug: "sudbury",
      state: "MA",
      county: "Middlesex County",
      zipCodes: ["01776"],
      neighborhoods: [
        "Sudbury Center",
        "North Sudbury",
        "South Sudbury",
        "Horse Pond",
        "Pantry Brook",
      ],
      landmarks: [
        "Wayside Inn",
        "Great Meadows National Wildlife Refuge",
        "Sudbury Town Center",
        "Grist Mill",
        "Nobscot Mountain",
      ],
      localParagraph: `Sudbury's rural character and historic properties present unique painting challenges we've mastered over 15+ years. Many homes near Sudbury Center date to the 1700s and 1800s, requiring careful attention to historic preservation standards. The town's wooded lots mean homes face significant shade and moisture, making mildew-resistant paints essential for longevity. We've painted several buildings at the historic Wayside Inn and understand the importance of maintaining Sudbury's Colonial heritage. Our team is familiar with local preferences for traditional color palettes that complement the area's character.`,
      regionalIssues: [
        "Historic preservation requirements",
        "Heavy shade causing moisture retention",
        "Well water staining on exteriors",
      ],
      housingTypes: ["Colonial", "Antique", "Contemporary", "Cape Cod"],
      permits: "Historic Commission review for homes over 75 years old",
      index: true,
    },
    {
      city: "Ashland",
      slug: "ashland",
      state: "MA",
      county: "Middlesex County",
      zipCodes: ["01721"],
      neighborhoods: [
        "Ashland Center",
        "Hopkinton line",
        "Framingham line",
        "Cherry Street area",
        "Pleasant Street area",
      ],
      landmarks: [
        "Ashland State Park",
        "Marathon start line marker",
        "Stone Park",
        "Ashland Reservoir",
        "Downtown Ashland",
      ],
      localParagraph: `Ashland's blend of historic center and growing residential areas keeps our painting crews busy year-round. As the "breakfast spot" of the Boston Marathon, Ashland takes pride in its appearance, and we help homeowners maintain beautiful properties. Homes near Ashland Reservoir face higher humidity requiring specialized exterior coatings. The downtown area features charming Victorian storefronts that need careful restoration painting. We've served Ashland homeowners since 2008 and understand the community's expectations for quality workmanship at fair prices.`,
      regionalIssues: [
        "Humidity near Ashland Reservoir",
        "Lead paint in historic downtown buildings",
        "Varied housing stock ages",
      ],
      housingTypes: ["Victorian", "Ranch", "Colonial", "Contemporary"],
      permits: "",
      index: true,
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SOCIAL MEDIA
  // ═══════════════════════════════════════════════════════════════
  social: {
    facebook: "https://facebook.com/metrowestpropainters",
    instagram: "https://instagram.com/metrowestpropainters",
    youtube: "https://youtube.com/@metrowestpropainters",
    linkedin: "https://linkedin.com/company/metrowest-pro-painters",
    tiktok: "",
    pinterest: "https://pinterest.com/metrowestpropainters",
    twitter: "",
    nextdoor: "https://nextdoor.com/pages/metrowest-pro-painters-framingham-ma",
    houzz: "https://houzz.com/pro/metrowestpropainters",
  },

  // ═══════════════════════════════════════════════════════════════
  // REVIEWS
  // ═══════════════════════════════════════════════════════════════
  reviews: {
    google: {
      url: "https://g.page/metrowest-pro-painters/review",
      placeId: "ChIJ_example_placeholder",
      reviewCount: 127,
      rating: 4.9,
    },
    yelp: {
      url: "https://yelp.com/biz/metrowest-pro-painters-framingham",
      reviewCount: 43,
      rating: 4.5,
    },
    facebook: {
      url: "https://facebook.com/metrowestpropainters/reviews",
      reviewCount: 38,
      rating: 4.8,
    },
    aggregate: {
      totalReviews: 208,
      averageRating: 4.8,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // EMBED CONFIGURATIONS
  // ═══════════════════════════════════════════════════════════════
  embeds: {
    gmbMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.1234567890!2d-71.4162!3d42.2793!...",
    googleMapsApiKey: "", // Add your API key for dynamic maps
  },

  // ═══════════════════════════════════════════════════════════════
  // GO HIGH LEVEL INTEGRATION
  // ═══════════════════════════════════════════════════════════════
  goHighLevel: {
    // Review Widget - paste full embed code from GHL
    reviewWidgetCode: `<div id="ghl-reviews" data-location="abc123"></div>
<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/reviews/abc123"></script>`,

    // Contact Form - paste full embed code from GHL
    contactFormCode: `<iframe src="https://api.leadconnectorhq.com/widget/form/abc123xyz" style="width:100%;height:500px;border:none;"></iframe>`,

    // Calendar/Booking Widget (optional)
    calendarCode: "",

    // GHL Location ID (for API integrations)
    locationId: "abc123xyz",
  },

  // ═══════════════════════════════════════════════════════════════
  // TRACKING & ANALYTICS
  // ═══════════════════════════════════════════════════════════════
  tracking: {
    // Facebook Pixel
    facebookPixelId: "123456789012345",
    facebookPixelCode: "", // Leave empty if using ID above

    // Google Analytics 4
    googleAnalyticsId: "G-XXXXXXXXXX",
    googleAnalyticsCode: "", // Leave empty if using ID above

    // Google Tag Manager
    googleTagManagerId: "GTM-XXXXXXX",
    googleTagManagerCode: "", // Leave empty if using ID above

    // Additional Pixels
    tiktokPixelCode: "",
    linkedinPixelCode: "",
    otherPixelCode: "",
  },

  // ═══════════════════════════════════════════════════════════════
  // MAP SETTINGS
  // ═══════════════════════════════════════════════════════════════
  maps: {
    zoom: 11,
    showServiceArea: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BRANDING
  // ═══════════════════════════════════════════════════════════════
  branding: {
    colors: {
      primary: "#1e40af",    // Deep blue
      secondary: "#3b82f6",  // Bright blue
      accent: "#f59e0b",     // Amber
      dark: "#1f2937",       // Slate gray
      light: "#f9fafb",      // Near white
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans",
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTENT & VOICE
  // ═══════════════════════════════════════════════════════════════
  content: {
    usps: [
      "EPA Lead-Safe Certified",
      "15+ years serving MetroWest",
      "208+ five-star reviews",
      "Written warranty on all work",
      "Licensed and insured",
    ],
    targetAudience: "Homeowners and property managers in MetroWest Massachusetts seeking professional, reliable painting services",
    painPoints: [
      "Finding trustworthy contractors who show up on time",
      "Getting quality work without hidden fees",
      "Dealing with lead paint in older homes",
      "Painters who leave a mess or damage property",
    ],
    tone: "professional",
  },

  // ═══════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ═══════════════════════════════════════════════════════════════
  about: {
    story: "Metrowest Pro Painters was founded in 2008 by Mike and Sarah Rodriguez, lifelong Framingham residents who saw a need for reliable, high-quality painting services in their community. What started as a two-person operation has grown into a team of 12 skilled painters serving all of MetroWest Massachusetts. Our mission remains the same: deliver exceptional craftsmanship, clear communication, and fair pricing on every project.",
    owner: {
      name: "Mike Rodriguez",
      title: "Owner & Lead Estimator",
      bio: "Mike has been painting professionally for over 20 years, starting as an apprentice at age 18. He holds EPA Lead-Safe certification and Benjamin Moore's Certified Applicator credential. When not estimating projects or working alongside his crew, Mike coaches youth baseball in Framingham.",
      image: "/images/mike-rodriguez.jpg",
      credentials: [
        "20+ years painting experience",
        "EPA Lead-Safe Certified",
        "Benjamin Moore Certified Applicator",
        "OSHA 10-Hour Safety Certified",
      ],
    },
    team: {
      size: "12",
      description: "Our team includes experienced painters, each with 5+ years of professional experience. All team members are background-checked, English-speaking, and trained in our quality standards and safety protocols.",
    },
    certifications: [
      "EPA Lead-Safe Certified Firm",
      "OSHA 10-Hour Safety Training",
      "Benjamin Moore Certified Applicator",
      "PCA (Painting Contractors Association) Member",
    ],
    awards: [
      "Best of Framingham 2023 - Painting Contractor",
      "Angi Super Service Award 2022, 2023",
      "BBB A+ Rating",
    ],
    communityInvolvement: "We're proud supporters of Framingham youth sports, the Framingham History Center, and the MetroWest YMCA. Each year, we donate a free exterior paint job to a deserving local family through our 'Fresh Start' program.",
    whyFounded: "We started this company because we believed homeowners deserved better than the typical contractor experience—unreturned calls, missed appointments, and poor communication. We set out to prove that a painting company could be professional, reliable, and deliver exceptional results.",
  },

  // ═══════════════════════════════════════════════════════════════
  // DEFAULT FAQs
  // ═══════════════════════════════════════════════════════════════
  defaultFAQs: [
    {
      question: "What areas do you serve?",
      answer: "We serve all of MetroWest Massachusetts including Framingham, Natick, Wellesley, Sudbury, Ashland, Wayland, Weston, Sherborn, Holliston, Hopkinton, Southborough, Northborough, and surrounding communities.",
    },
    {
      question: "Do you offer free estimates?",
      answer: "Yes, we provide free, detailed written estimates for all painting projects. We'll visit your property, discuss your needs, and provide a comprehensive quote within 24-48 hours.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes, we are fully licensed (MA HIC #187542) and carry $2 million in liability insurance. We're also EPA Lead-Safe Certified for work on homes built before 1978.",
    },
    {
      question: "What brands of paint do you use?",
      answer: "We primarily use Benjamin Moore and Sherwin-Williams premium paints. These brands offer superior coverage, durability, and color selection. We're happy to discuss specific product recommendations for your project.",
    },
    {
      question: "How do I prepare for a painting project?",
      answer: "For interior projects, we ask that you remove small items from walls and clear surfaces near work areas. We handle all furniture moving and protection. For exterior projects, simply ensure we have access to all sides of your home.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SEO DEFAULTS
  // ═══════════════════════════════════════════════════════════════
  seo: {
    titleTemplate: "%s | Metrowest Pro Painters",
    defaultTitle: "Metrowest Pro Painters - Professional Painting Contractor in MetroWest MA",
    defaultDescription: "Professional interior and exterior painting services in MetroWest Massachusetts. Licensed, insured, and EPA Lead-Safe certified. 208+ five-star reviews. Free estimates.",
    siteUrl: "https://metrowestpropainters.com",
    ogImage: "/images/og-default.jpg",
    twitterHandle: "@metrowestpaint",
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
  // ═══════════════════════════════════════════════════════════════
  contentRequirements: {
    minimumIndexScore: 7,
    requireLocalProof: true,
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
    socialIconsLocation: "footer",
    showReviewWidgets: true,
    showBreadcrumbs: true,
    showRelatedServices: true,
    showNearbyLocations: true,
    ctaButtonText: "Get Free Estimate",
    ctaPhoneText: "Call (508) 555-0147",
  },

  // ═══════════════════════════════════════════════════════════════
  // PROJECT PHOTOS
  // ═══════════════════════════════════════════════════════════════
  projects: {
    'exterior-painting': [
      {
        id: 'ext-1',
        title: 'Victorian Home Restoration',
        location: 'Framingham Centre, MA',
        beforeImage: '/images/projects/exterior-painting/victorian-before.jpg',
        afterImage: '/images/projects/exterior-painting/victorian-after.jpg',
        description: 'Complete exterior repaint of 1890s Victorian with cedar shingle repair and lead paint remediation',
      },
      {
        id: 'ext-2',
        title: 'Colonial Color Update',
        location: 'Natick, MA',
        beforeImage: '/images/projects/exterior-painting/colonial-before.jpg',
        afterImage: '/images/projects/exterior-painting/colonial-after.jpg',
        description: 'Modern color scheme update with new shutters and trim accent colors',
      },
      {
        id: 'ext-3',
        title: 'Cedar Shingle Refresh',
        location: 'Sudbury, MA',
        beforeImage: '/images/projects/exterior-painting/cedar-before.jpg',
        afterImage: '/images/projects/exterior-painting/cedar-after.jpg',
        description: 'Semi-transparent stain application on weathered cedar shingles',
      },
    ],
    'interior-painting': [
      {
        id: 'int-1',
        title: 'Open Concept Living Space',
        location: 'Wellesley, MA',
        beforeImage: '/images/projects/interior-painting/living-before.jpg',
        afterImage: '/images/projects/interior-painting/living-after.jpg',
        description: 'Complete living room and dining area repaint with accent wall',
      },
      {
        id: 'int-2',
        title: 'Kitchen Transformation',
        location: 'Ashland, MA',
        beforeImage: '/images/projects/interior-painting/kitchen-before.jpg',
        afterImage: '/images/projects/interior-painting/kitchen-after.jpg',
        description: 'Kitchen walls and ceiling with mildew-resistant paint',
      },
    ],
    'cabinet-painting': [
      {
        id: 'cab-1',
        title: 'White Cabinet Conversion',
        location: 'Natick, MA',
        beforeImage: '/images/projects/cabinet-painting/white-before.jpg',
        afterImage: '/images/projects/cabinet-painting/white-after.jpg',
        description: 'Oak cabinets transformed to bright white with new hardware',
      },
      {
        id: 'cab-2',
        title: 'Navy Blue Island',
        location: 'Wellesley, MA',
        beforeImage: '/images/projects/cabinet-painting/navy-before.jpg',
        afterImage: '/images/projects/cabinet-painting/navy-after.jpg',
        description: 'Kitchen island refinished in Benjamin Moore Hale Navy',
      },
    ],
    'deck-staining': [
      {
        id: 'deck-1',
        title: 'Ipe Deck Restoration',
        location: 'Framingham, MA',
        beforeImage: '/images/projects/deck-staining/ipe-before.jpg',
        afterImage: '/images/projects/deck-staining/ipe-after.jpg',
        description: 'Weathered ipe deck restored with penetrating oil finish',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRUST BADGES
  // ═══════════════════════════════════════════════════════════════
  trustBadges: [
    {
      name: 'EPA Lead-Safe Certified',
      image: '/images/badges/epa-lead-safe.png',
      url: 'https://www.epa.gov/lead/lead-safe-certified-firms',
      alt: 'EPA Lead-Safe Certified Firm',
    },
    {
      name: 'Better Business Bureau',
      image: '/images/badges/bbb-a-plus.png',
      url: 'https://www.bbb.org/',
      alt: 'BBB A+ Rated Business',
    },
    {
      name: 'MetroWest Chamber of Commerce',
      image: '/images/badges/metrowest-chamber.png',
      url: 'https://www.metrowest.org/',
      alt: 'MetroWest Chamber of Commerce Member',
    },
    {
      name: 'Painting Contractors Association',
      image: '/images/badges/pca.png',
      url: 'https://www.pcapainted.org/',
      alt: 'PCA Member',
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // BRANDS WE USE
  // ═══════════════════════════════════════════════════════════════
  brands: [
    {
      name: 'Benjamin Moore',
      image: '/images/brands/benjamin-moore.png',
      url: 'https://benjaminmoore.com',
      description: 'Premium paints with unmatched color accuracy',
    },
    {
      name: 'Sherwin-Williams',
      image: '/images/brands/sherwin-williams.png',
      url: 'https://sherwin-williams.com',
      description: 'Professional-grade paints for lasting results',
    },
    {
      name: 'Cabot',
      image: '/images/brands/cabot.png',
      url: 'https://cabotstain.com',
      description: 'Superior deck stains and wood finishes',
    },
    {
      name: 'Purdy',
      image: '/images/brands/purdy.png',
      url: 'https://purdy.com',
      description: 'Professional brushes and applicators',
    },
  ],
};
