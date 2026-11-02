export interface SocialLink {
  name: string;
  url: string;
  handle?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  wordmark: { first: string; second: string };
  tagline: string;
  supportingMessage: string;
  description: string;
  url: string;
  email: string;
  schedulingUrl: string;
  whatsapp?: string;
  /** Public booking link used by the "Schedule a meeting" calls to action. */
  scheduling: string;
  location: string;
  availability: {
    status: "available" | "limited" | "booked";
    label: string;
    period: string;
  };
  navigation: NavItem[];
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "DiveintoInfinity",
  wordmark: { first: "Dive into", second: "Infinity" },
  tagline: "We build the products our clients are judged by.",
  supportingMessage: "Go deep. Build infinite.",
  description:
    "DiveintoInfinity is a digital product studio. We design and engineer web platforms, mobile apps and internal software for founders, institutions and research teams, from first wireframe to production.",
  url: "https://diveintoinfinity.com",
  email: "hello@diveintoinfinity.com",
  schedulingUrl: "https://cal.com/abhinavpreet",
  whatsapp: "15550192834",
  scheduling: "https://cal.com/abhinavpreet",
  location: "India · Working worldwide",
  availability: {
    status: "available",
    label: "Taking on new builds",
    period: "Limited slots this quarter",
  },
  navigation: [
    { label: "Work", href: "/#work" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Process", href: "/#process" },
    { label: "Studio", href: "/#studio" },
    { label: "FAQ", href: "/#faq" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/diveintoinfinity", handle: "@diveintoinfinity" },
    { name: "LinkedIn", url: "https://linkedin.com/company/diveintoinfinity", handle: "diveintoinfinity" },
    { name: "Instagram", url: "https://instagram.com/diveintoinfinity", handle: "@diveintoinfinity" },
    { name: "X", url: "https://x.com/diveintoinfinity", handle: "@diveintoinfinity" },
  ],
};
