export interface Service {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  focus: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Product Design & UI/UX",
    tagline: "Before a line of code, the decisions.",
    description:
      "We turn a rough ambition into a product someone can actually use: user flows, information architecture, interface design and a component system your team can build on for years.",
    deliverables: [
      "Discovery & product definition",
      "User flows and information architecture",
      "High-fidelity interface design",
      "Design system & component library",
      "Interactive prototypes for validation",
    ],
    focus: "Clarity first. Everything else is decoration.",
  },
  {
    number: "02",
    title: "Web Platforms & Applications",
    tagline: "Production software, not a brochure.",
    description:
      "Full-stack web products built on Next.js and TypeScript: authentication, dashboards, payments, multi-role access and the admin surfaces your team runs the business from.",
    deliverables: [
      "Next.js App Router architecture",
      "Authentication & role-based access",
      "Payment and subscription integration",
      "Admin dashboards and internal tooling",
      "Core Web Vitals performance budget",
    ],
    focus: "Built to be maintained, not just demoed.",
  },
  {
    number: "03",
    title: "Mobile Applications",
    tagline: "The same product, in a pocket.",
    description:
      "Android and cross-platform apps that share a backend and a design language with the web product, so your users get one coherent experience instead of two half-built ones.",
    deliverables: [
      "Android application development",
      "Shared API and data layer",
      "Offline-aware and push-ready flows",
      "Store listing and release pipeline",
      "Parity with the web product",
    ],
    focus: "One product. Every surface your users reach for.",
  },
  {
    number: "04",
    title: "Internal Tools & Platform Engineering",
    tagline: "The software nobody sees, that runs everything.",
    description:
      "Inventory systems, lab management suites, CMS back-ends, operations dashboards. The unglamorous software that replaces a decade of spreadsheets.",
    deliverables: [
      "Custom CMS and content pipelines",
      "Inventory, stock and record systems",
      "Reporting and operations dashboards",
      "Data modelling & migration",
      "Role, permission and audit design",
    ],
    focus: "Replace the spreadsheet. Keep the institutional memory.",
  },
  {
    number: "05",
    title: "AI & Automation",
    tagline: "Useful intelligence, not a chatbot bolted on.",
    description:
      "We integrate language models and automation where they measurably remove work: search over your own documents, assisted data entry, generated drafts, and the messaging pipelines around them.",
    deliverables: [
      "LLM integration and prompt architecture",
      "Retrieval over your own content",
      "Workflow and messaging automation",
      "Evaluation and guardrails",
      "Cost and latency budgeting",
    ],
    focus: "If it does not remove work, it does not ship.",
  },
  {
    number: "06",
    title: "Launch, Scale & Care",
    tagline: "The part most studios skip.",
    description:
      "Deployment, monitoring, SEO foundations and an ongoing relationship after go-live, because the first version is never the last one.",
    deliverables: [
      "Deployment and environment setup",
      "SEO, metadata and structured data",
      "Analytics and monitoring",
      "Iteration cycles post-launch",
      "Handover documentation and training",
    ],
    focus: "Launch day is the beginning of the project.",
  },
];
