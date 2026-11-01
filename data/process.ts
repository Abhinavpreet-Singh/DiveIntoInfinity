export interface ProcessStep {
  step: string;
  name: string;
  depth: string;
  tagline: string;
  description: string;
  details: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    name: "Surface",
    depth: "0m",
    tagline: "We find out what you are actually building.",
    description:
      "Most projects fail here, quietly. We spend real time on the business model, the users, the constraints and the thing that has to be true for this to be worth building, before anyone opens a design file.",
    details: [
      "Discovery sessions with the people who own the outcome",
      "User, buyer and operator mapping",
      "Scope, risk and technical feasibility review",
      "A written definition of done, agreed before we start",
    ],
  },
  {
    step: "02",
    name: "Descend",
    depth: "120m",
    tagline: "Design until the product is obvious.",
    description:
      "Flows, architecture and interface design, built as a system rather than a stack of screens. You see and react to the real thing early, while changing it is still cheap.",
    details: [
      "Information architecture and user flows",
      "High-fidelity design of every core screen",
      "Reusable component and token system",
      "Prototype review cycles with your team",
    ],
  },
  {
    step: "03",
    name: "Pressure",
    depth: "400m",
    tagline: "Engineering that holds under load.",
    description:
      "Typed, tested, reviewed code on a modern stack. Auth, payments, dashboards and integrations built properly the first time, with performance treated as a feature.",
    details: [
      "Next.js and TypeScript production architecture",
      "Authentication, roles and data modelling",
      "Third-party and payment integrations",
      "Accessibility and Core Web Vitals budgets",
    ],
  },
  {
    step: "04",
    name: "Infinity",
    depth: "∞",
    tagline: "Launch, then keep going.",
    description:
      "We deploy, instrument and hand over, with documentation your team can read. Then we stay for the next iteration, because the first release is a starting position, not a finish line.",
    details: [
      "Deployment, monitoring and environment setup",
      "SEO foundations and structured data",
      "Handover documentation and team training",
      "Ongoing iteration and support cycles",
    ],
  },
];
