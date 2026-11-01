export interface ProjectHighlight {
  label: string;
  value: string;
}

export type ProjectKind = "client" | "in-house";

export interface Project {
  id: string;
  /** Client commission, or something the studio builds and owns itself. */
  kind: ProjectKind;
  slug: string;
  title: string;
  client: string;
  category: string;
  sector: string;
  /** What the organisation is, in a few words. */
  business: string;
  year: string;
  platforms: string[];
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  technologies: string[];
  highlights: ProjectHighlight[];
  features: string[];
  liveUrl: string;
  /** Screenshot of the live product, captured from its homepage. */
  image: string;
  depth: string;
}

/**
 * Real client work. Everything listed under `highlights` and `features`
 * describes functionality that is live and visible on the shipped product.
 * There are no invented traffic, revenue or growth numbers.
 */
export const projects: Project[] = [
  {
    id: "unievent",
    kind: "client",
    slug: "unievent",
    title: "UniEvent",
    client: "UniEvent",
    category: "Event Discovery & Ticketing Platform",
    sector: "Events · Campus",
    business: "An early-stage Indian startup building a nationwide events marketplace.",
    year: "2026",
    platforms: ["Web Platform", "Android App", "Host Dashboard"],
    summary:
      "A campus-to-city event platform where students discover fests, concerts and workshops, and organisers sell tickets without touching a spreadsheet.",
    description:
      "UniEvent connects two audiences on one platform. Attendees browse events by city and category, pick solo or group tickets and pay in seconds. Organisers get a self-serve dashboard to publish an event, configure pricing and coupons, and check guests in at the gate. We built the web platform, the host dashboard and the companion Android app.",
    challenge:
      "College fest ticketing runs on forms, payment screenshots and manual guest lists. Organisers lose hours reconciling entries, and attendees arrive at the gate with nothing verifiable in hand.",
    solution:
      "We built a full two-sided product: a discovery surface with city and category filtering, a checkout supporting UPI, cards and net banking, cryptographically signed QR passes delivered over WhatsApp and email, and an organiser dashboard covering event creation, ticket tiers, coupons and attendee lists. The Android app puts the same discovery and ticket wallet in the attendee pocket.",
    deliverables: [
      "Product strategy & two-sided UX architecture",
      "Brand system and full UI design",
      "Attendee web platform with city-based discovery",
      "Organiser dashboard (events, tickets, coupons, profile)",
      "Android companion application",
      "Payment integration: UPI, cards, net banking",
      "Signed QR ticketing & gate check-in flow",
      "WhatsApp + email ticket delivery and reminders",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Android",
      "Payment Gateway",
      "WhatsApp Business API",
    ],
    highlights: [
      { label: "Event categories", value: "9" },
      { label: "Steps to book", value: "4" },
      { label: "Surfaces shipped", value: "3" },
    ],
    features: [
      "Location-aware discovery across cities, plus online events",
      "Solo and group tickets with early-bird and group coupons",
      "Tamper-proof signed QR passes, verified at the gate",
      "Automatic day-before WhatsApp reminders",
      "Self-serve event creation with a guided product tour",
    ],
    image: "/work/unievent.jpg",
    liveUrl: "https://unievent.in",
    depth: "120",
  },
  {
    id: "cellsinvitro",
    kind: "client",
    slug: "cellsinvitro",
    title: "CellsInVitro",
    client: "CellsInVitro",
    category: "Research Commerce + Lab Management Suite",
    sector: "Life Sciences · Biotech",
    business: "A life-sciences startup selling research kits and lab software to institutions.",
    year: "2026",
    platforms: ["Web Platform", "LMS Suite", "Admin Dashboard"],
    summary:
      "A cell-biology company's public storefront and the multi-module lab management suite its researchers run day to day.",
    description:
      "CellsInVitro needed one product that works for two very different visitors: a researcher evaluating assay kits, and a lab team that lives inside the software every day. We built the public research-kit catalogue alongside the Lab Management Suite (cryo inventory, stock, budgets and an electronic lab notebook) under a single authenticated account system.",
    challenge:
      "Lab operations were spread across spreadsheets and paper notebooks: cryovial positions, reagent stock levels, grant budgets and experiment logs all lived in separate, fragile places with no shared record.",
    solution:
      "We designed a modular suite around a single hub. CryoSearch maps cell banking down to 2D rack and box layouts with dewar tracking. Stock Management handles reagents, consumables and low-stock alerts. Budget Management covers budget heads, expense submissions and grant allocations. The Lab Logbook holds protocols and experiment logs. The public site carries the filterable research-kit catalogue and the learning and certification track.",
    deliverables: [
      "Information architecture for a dual public/authenticated product",
      "Full visual design system for scientific UI",
      "Research kit catalogue with category filtering",
      "CryoSearch: rack, box and dewar cell banking inventory",
      "Stock management with low-stock alerting",
      "Budget management: heads, expenses, grant allocation",
      "Electronic lab notebook & protocol library",
      "Role-based authentication and dashboard",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Role-based Auth",
      "LIMS Architecture",
    ],
    highlights: [
      { label: "LMS modules", value: "5" },
      { label: "Kit categories", value: "4" },
      { label: "Product halves", value: "2" },
    ],
    features: [
      "Filterable research kit catalogue across assay categories",
      "2D rack and box cryovial mapping with dewar tracking",
      "Reagent and consumable stock with low-stock alerts",
      "Grant and budget head allocation with expense submission",
      "Electronic lab notebook for protocols and experiment logs",
    ],
    image: "/work/cellsinvitro.jpg",
    liveUrl: "https://cellsinvitro.com",
    depth: "260",
  },
  {
    id: "aistem",
    kind: "client",
    slug: "aistem",
    title: "AISTEM International",
    client: "AISTEM International",
    category: "B2B Catalogue & Procurement Platform",
    sector: "Education · Scientific Equipment",
    business: "An established scientific equipment supplier based in Ambala, Haryana, selling to schools and research institutions.",
    year: "2026",
    platforms: ["Web Platform", "Admin CMS"],
    summary:
      "A procurement-first catalogue for a scientific equipment supplier selling into schools, research institutions and educational parks.",
    description:
      "AISTEM supplies lab and STEM equipment to institutions, a buying process that runs on BOQs, tenders and conversations, not shopping carts. We built a catalogue that leads to a qualified enquiry instead of a checkout, backed by an admin CMS so the team publishes products themselves.",
    challenge:
      "Institutional buyers do not add a thermal cycler to a cart. They arrive with a bill of quantities, need technical specifications, and want a human on the other end. The business had no digital surface to start that conversation.",
    solution:
      "We structured the site around procurement: three equipment categories (school lab, research-oriented, educational parks), a catalogue with dedicated specification pages, and enquiry flows that carry the product context straight into the request. A four-step procurement support path and a three-step planning flow make the buying process legible before anyone picks up the phone. An admin CMS lets the team maintain the catalogue without a developer.",
    deliverables: [
      "Positioning and procurement-led site architecture",
      "Brand and interface design system",
      "Product catalogue with category taxonomy",
      "Specification-led product detail pages",
      "Context-carrying enquiry & quotation request flows",
      "Admin CMS for product publishing",
      "Deployment and performance optimisation",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    highlights: [
      { label: "Equipment categories", value: "3" },
      { label: "Procurement steps", value: "4" },
      { label: "Checkout required", value: "0" },
    ],
    features: [
      "Category taxonomy for school, research and outdoor STEM equipment",
      "Product pages built around technical specifications",
      "Enquiry forms that carry the product context with them",
      "BOQ and tender-aware procurement support path",
      "Self-serve admin publishing for the catalogue",
    ],
    image: "/work/aistem.jpg",
    liveUrl: "https://aistem-website.vercel.app",
    depth: "410",
  },
  {
    id: "enum",
    kind: "in-house",
    slug: "enum",
    title: "Enum",
    client: "DiveintoInfinity",
    category: "Engineering Simulation & Training Platform",
    sector: "EdTech · Developer Tools",
    business: "Our own training platform, where engineers practise production work instead of puzzles.",
    year: "2026",
    platforms: ["Web Platform", "Live Sandbox", "Automated Judge"],
    summary:
      "Production-style simulations that put engineers in a live terminal with real logs and a broken service, then grade the fix automatically.",
    description:
      "Enum is the in-house product we are proudest of. Interview prep teaches people to solve puzzles; nobody is handed a sorted array on their first day at work. They are handed a degraded API, a saturated connection pool and a stack of logs. Enum simulates exactly that: pick a track, investigate inside a real sandbox, ship a fix, and have it verified by an automated judge.",
    challenge:
      "The gap between practising algorithms and doing the job is enormous. There was no good way to rehearse incident response, debugging across modules, or system design under realistic conditions without breaking something real.",
    solution:
      "We built an interactive sandbox with a live terminal, readable logs and editable code, wrapped in four tracks: Frontend, Backend, Linux and System Design. Each simulation mirrors a real scenario, from a broken responsive grid to a circular dependency crash. Submissions run against automated tests that award XP, and incidents, a DSA arena, collaboration and a leaderboard sit alongside.",
    deliverables: [
      "Product definition for simulation-based training",
      "Brand and interface design system",
      "Interactive sandbox with live terminal and logs",
      "Four simulation tracks with graded scenarios",
      "Automated test runner and XP scoring",
      "Incident simulations and system design canvas",
      "Collaboration and leaderboard surfaces",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Sandboxed Execution", "Automated Grading"],
    highlights: [
      { label: "Simulation tracks", value: "4" },
      { label: "Steps per run", value: "3" },
      { label: "Built for", value: "Ourselves" },
    ],
    features: [
      "Frontend, Backend, Linux and System Design tracks",
      "Live terminal, logs and editable code in a sandbox",
      "Automated tests that grade a submission and award XP",
      "Incident simulations with real failure signals",
      "DSA arena, collaboration and an XP leaderboard",
    ],
    liveUrl: "https://enum.live",
    image: "/work/enum.jpg",
    depth: "460",
  },
  {
    id: "carbone",
    kind: "in-house",
    slug: "carbone",
    title: "Carbone",
    client: "DiveintoInfinity",
    category: "Carbon Credit Marketplace & MRV Platform",
    sector: "Climate · AgriTech",
    business: "An in-house platform connecting Indian farmers and rural bodies to the carbon credit economy.",
    year: "2026",
    platforms: ["Web Platform", "Marketplace", "Partner Dashboard"],
    summary:
      "A carbon intelligence platform that onboards farmers, NGOs and Panchayats, verifies their land activity, and sells the resulting credits straight to businesses.",
    description:
      "Carbone is our own product. Carbon credit markets are opaque, and the people doing the actual sequestering rarely see the money. Carbone puts the whole chain on one platform: a farmer or Panchayat registers their land and activities, the project is documented and verified, credits are issued against it, and businesses buy those credits in a marketplace where revenue flows back to the community that earned it.",
    challenge:
      "Carbon credit schemes are built for corporate intermediaries. A smallholder farmer has no realistic route into them, and a company buying offsets has no way to see whose land the credit came from.",
    solution:
      "We built a four-stage pipeline as a single product. Registration is deliberately plain enough for a non-technical farmer or Panchayat clerk. Project setup captures land activity with supporting documentation. Verification and issuance record the project and mint credits against it. The marketplace then lets businesses buy directly, with revenue distribution back to the originating community.",
    deliverables: [
      "Product strategy for a three-sided marketplace",
      "Brand and interface design system",
      "Low-literacy onboarding for farmers and Panchayats",
      "Project setup and land activity documentation",
      "Verification and credit issuance records",
      "Business-facing credit marketplace",
      "Revenue distribution back to communities",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Blockchain Ledger", "MRV Workflow"],
    highlights: [
      { label: "Pipeline stages", value: "4" },
      { label: "Participant types", value: "3" },
      { label: "Built for", value: "Ourselves" },
    ],
    features: [
      "Plain-language registration for farmers, NGOs and Panchayats",
      "Land activity capture with supporting documentation",
      "Verification and credit issuance against each project",
      "Marketplace for businesses buying verified credits",
      "Revenue routed back to the originating community",
    ],
    liveUrl: "https://carbone360.vercel.app",
    image: "/work/carbone.jpg",
    depth: "520",
  },
  {
    id: "eventix",
    kind: "in-house",
    slug: "eventix",
    title: "Eventix 360",
    client: "DiveintoInfinity",
    category: "Campus Event & Community Platform",
    sector: "Events · Universities",
    business: "An in-house platform for university clubs, campus events and student communities.",
    year: "2026",
    platforms: ["Web Platform", "Host Tools", "Club Pages"],
    summary:
      "A campus events platform built around the clubs that actually run them, with appointments, calendars and reminders alongside the listings.",
    description:
      "Eventix 360 is our own take on campus events. University activity does not live in a flat list of dates, it lives in clubs. So clubs are a first-class object here: they hold their own page, publish their own events, and take appointments. Students browse, save what they care about, and get reminded before it happens.",
    challenge:
      "Campus event information is scattered across notice boards, group chats and a dozen club accounts. Students miss things they wanted to attend, and clubs have no durable home for what they run.",
    solution:
      "We made clubs the centre of the product rather than an afterthought. Each club gets a page and publishing tools. Events carry a smart calendar, bookmarking and notifications so nothing is missed. An appointments module covers the sessions and slots that are not open events, and a host flow lets any organiser put something on the calendar.",
    deliverables: [
      "Product definition for a club-first event platform",
      "Brand and interface design system",
      "Club pages with self-serve publishing",
      "Event discovery, search and browsing",
      "Smart calendar, bookmarks and notifications",
      "Appointments and slot booking",
      "Host onboarding flow",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Auth & Accounts", "Notifications"],
    highlights: [
      { label: "Core modules", value: "4" },
      { label: "Student tools", value: "4" },
      { label: "Built for", value: "Ourselves" },
    ],
    features: [
      "Clubs as first-class pages with their own publishing",
      "Event browsing and search across campus",
      "Smart calendar so dates are never missed",
      "Bookmarking and a saved events list",
      "Appointment and slot booking alongside open events",
    ],
    liveUrl: "https://eventix360.app",
    image: "/work/eventix.webp",
    depth: "640",
  },
  {
    id: "lawgic",
    kind: "in-house",
    slug: "lawgic",
    title: "Lawgic",
    client: "DiveintoInfinity",
    category: "AI Legal Research Assistant",
    sector: "Legal · AI",
    business: "An in-house AI research tool built for the Indian legal system.",
    year: "2026",
    platforms: ["Web Platform", "AI Assistant", "Document Analysis"],
    summary:
      "An AI assistant for Indian legal research: precedent search across Supreme Court and High Court judgments, an IPC section finder, and document analysis.",
    description:
      "Lawgic is our own product, and our clearest answer to what we mean by useful AI. Legal research in India means reading a great deal to find a little. Lawgic narrows that: context-aware search over Supreme Court and High Court case law, a scenario-driven finder for the right Indian Penal Code sections, and document upload that pulls out arguments and citations rather than producing a vague summary.",
    challenge:
      "General purpose AI tools are trained on little Indian case law and will invent citations, which is worse than useless to a practitioner. Legal research needs answers anchored to real, locatable judgments.",
    solution:
      "We built retrieval over an indexed body of Indian case law so answers cite real material, then shaped the interface around the three jobs practitioners actually do: find precedent, identify the applicable IPC section from a scenario, and extract arguments and citations out of a document. Legal news and insights sit alongside, so the tool stays part of a daily routine.",
    deliverables: [
      "Product definition for a legal research assistant",
      "Brand and interface design system",
      "Retrieval over indexed Indian case law",
      "Context-aware precedent search with citations",
      "Scenario-based IPC section finder",
      "Document upload, analysis and citation linking",
      "Legal news and insights surfaces",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "LLM Integration", "Retrieval & Citations"],
    highlights: [
      { label: "Service areas", value: "6" },
      { label: "Court levels", value: "2" },
      { label: "Built for", value: "Ourselves" },
    ],
    features: [
      "Context-aware search across Supreme Court and High Court cases",
      "Citation suggestions anchored to real judgments",
      "Scenario-based IPC section finder with explanations",
      "Document upload with argument and citation extraction",
      "Legal news and trend analysis in the same place",
    ],
    liveUrl: "https://lawgic-ai-three.vercel.app",
    image: "/work/lawgic.png",
    depth: "780",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Commissioned work. */
export const clientProjects = projects.filter((p) => p.kind === "client");

/** Products the studio builds and owns itself. */
export const inHouseProjects = projects.filter((p) => p.kind === "in-house");
