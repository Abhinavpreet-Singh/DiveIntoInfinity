export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  sector: string;
  year: string;
  platforms: string[];
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  outcome?: string;
  deliverables: string[];
  technologies: string[];
  highlights: ProjectHighlight[];
  features: string[];
  liveUrl: string;
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
    slug: "unievent",
    title: "UniEvent",
    client: "UniEvent",
    category: "Event Discovery & Ticketing Platform",
    sector: "Events · Campus",
    year: "2025",
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
    liveUrl: "https://unievent.in",
    depth: "120",
  },
  {
    id: "cellsinvitro",
    slug: "cellsinvitro",
    title: "CellsInVitro",
    client: "CellsInVitro",
    category: "Research Commerce + Lab Management Suite",
    sector: "Life Sciences · Biotech",
    year: "2025",
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
    liveUrl: "https://cellsinvitro.com",
    depth: "260",
  },
  {
    id: "aistem",
    slug: "aistem",
    title: "AISTEM International",
    client: "AISTEM International",
    category: "B2B Catalogue & Procurement Platform",
    sector: "Education · Scientific Equipment",
    year: "2025",
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
    liveUrl: "https://aistem-website.vercel.app",
    depth: "410",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
