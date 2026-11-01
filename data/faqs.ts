export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What exactly do you build?",
    answer:
      "Digital products. Web platforms with real back-ends — authentication, payments, dashboards, admin tooling — plus the Android apps and internal systems that sit alongside them. If it needs design and engineering to exist, it is in scope. Pure marketing brochures usually are not the best use of us.",
  },
  {
    question: "Do you work with early-stage founders or only established businesses?",
    answer:
      "Both. We have built a first public product for a new platform and replaced a decade of spreadsheets for an established research institution. What matters is that someone on your side owns the outcome and can make decisions.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A focused marketing or catalogue site is typically three to five weeks. A full product with authentication, dashboards and payments is usually eight to sixteen weeks depending on scope. We give you a staged timeline after discovery, not before.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Fixed price per phase, agreed after discovery. You know the cost of design before design starts and the cost of the build before the build starts. No hourly surprises, and no change requests for things that were always in scope.",
  },
  {
    question: "Who owns the code and the designs?",
    answer:
      "You do, completely, on final payment. Repositories, design files, infrastructure and accounts are transferred to your organisation. We do not hold your product hostage.",
  },
  {
    question: "Do you work with our existing codebase or team?",
    answer:
      "Yes. We join existing teams, take over half-finished builds and work inside your conventions. We will tell you honestly if a rewrite is cheaper than a rescue.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We hand over documentation and train your team, then continue in iteration cycles if you want us to. Most of our client relationships run well past the first release.",
  },
  {
    question: "How do we start?",
    answer:
      "Send us a note describing what you want to build and roughly when. We reply within two working days, and the first call is a conversation about the problem — not a sales pitch.",
  },
];
