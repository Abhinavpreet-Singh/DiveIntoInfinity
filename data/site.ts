export interface SocialLink {
  name: string;
  url: string;
  handle?: string;
}

export interface PhoneContact {
  /** As shown on the page. */
  display: string;
  /** E.164, for tel: links. */
  dial: string;
  /** Digits only with country code, for wa.me links. */
  whatsapp: string;
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
  responseTime: string;
  phones: PhoneContact[];
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
  tagline: "Digital products for startups and growing businesses.",
  supportingMessage: "Go deep. Build infinite.",
  description:
    "DiveintoInfinity is a digital product studio. We design and engineer web platforms, mobile apps and internal software for founders, institutions and research teams, from first wireframe to production.",
  url: "https://diveintoinfinity.com",
  email: "sales@diveintoinfinity.in",
  schedulingUrl: "https://cal.com/abhinavpreet",
  responseTime: "within an hour",
  phones: [
    { display: "+91 62838 44497", dial: "+916283844497", whatsapp: "916283844497" },
    { display: "+91 98177 93452", dial: "+919817793452", whatsapp: "919817793452" },
  ],
  scheduling: "https://cal.com/abhinavpreet",
  location: "India · Working worldwide",
  availability: {
    status: "available",
    label: "Taking on new builds",
    period: "Limited slots this quarter",
  },
  navigation: [
    { label: "Work", href: "/#work" },
    { label: "In-house", href: "/#in-house" },
    { label: "Dive profile", href: "/#dive-profile" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/diveintoinfinity", handle: "@diveintoinfinity" },
    { name: "LinkedIn", url: "https://linkedin.com/company/diveintoinfinity", handle: "diveintoinfinity" },
    { name: "Instagram", url: "https://instagram.com/diveintoinfinity", handle: "@diveintoinfinity" },
    { name: "X", url: "https://x.com/diveintoinfinity", handle: "@diveintoinfinity" },
  ],
};
