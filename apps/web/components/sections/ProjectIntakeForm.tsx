"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Code2,
  ShieldCheck,
  Clock,
  Send,
  AlertCircle,
  Loader2,
  Laptop,
  Smartphone,
  Cpu,
  LayoutGrid,
  ShoppingBag,
  Globe,
  Database,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/ui/Atmosphere";
import { cn } from "@/lib/utils";
import { submitToFormspree } from "@/lib/forms";
import {
  CURRENCY_OPTIONS,
  convertAmount,
  formatCurrency,
  formatBudgetForSubmission,
  type CurrencyCode,
} from "@/lib/currency";

// --- Form Options & Constants ---

export const PROJECT_STAGES = [
  {
    id: "concept",
    title: "Idea & Concept",
    desc: "Validating vision, scoping requirements, need full product design & architecture.",
    icon: Sparkles,
  },
  {
    id: "designs_ready",
    title: "Designs / Specs Ready",
    desc: "Figma files, wireframes, or PRD are ready. Seeking senior engineering execution.",
    icon: LayoutGrid,
  },
  {
    id: "mvp_rebuild",
    title: "Existing MVP Overhaul",
    desc: "Have a live v1 or prototype that needs refactoring, redesign, or scaling.",
    icon: Code2,
  },
  {
    id: "internal_tool",
    title: "Internal Tool / System",
    desc: "Modernizing company workflows, custom admin portals, or automation suites.",
    icon: Database,
  },
];

export const PLATFORM_OPTIONS = [
  { id: "web_platform", label: "Web Platform / SaaS", icon: Laptop },
  { id: "mobile_android", label: "Android Application", icon: Smartphone },
  { id: "mobile_ios", label: "iOS Application", icon: Smartphone },
  { id: "ai_workflows", label: "AI & Agentic Automation", icon: Cpu },
  { id: "admin_portal", label: "Admin Tooling & Portals", icon: Layers },
  { id: "marketing_site", label: "High-End Visual Website", icon: Globe },
  { id: "ecommerce", label: "E-Commerce / Marketplace", icon: ShoppingBag },
  { id: "custom_backend", label: "Custom API & Cloud Infra", icon: Database },
];

export const FEATURE_TAGS = [
  "User Authentication & RBAC",
  "Payment Processing (Stripe / Invoicing)",
  "Real-Time Chat & Collab",
  "LLM / AI Model Integration",
  "Vector Search & Retrieval",
  "Content Management (CMS)",
  "Analytics & Instrumentation",
  "Third-Party API Integrations",
  "Automated Email / Push Alerts",
  "Multi-tenant Architecture",
  "Data Export & Reporting",
  "Offline Support / PWA",
];

export const DESIGN_OPTIONS = [
  {
    id: "from_scratch",
    label: "Design from Scratch",
    desc: "Need full brand identity, design system, and UI/UX flows.",
  },
  {
    id: "have_brand",
    label: "Have Brand / Need UI",
    desc: "Logo and styling guide exist, need high-fidelity product screens.",
  },
  {
    id: "figma_ready",
    label: "Figma Ready to Code",
    desc: "All screen states, flows, and design tokens are finalized.",
  },
  {
    id: "engineering_focus",
    label: "Engineering Focused",
    desc: "Clean, functional design with standard design system is suitable.",
  },
];

export const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Urgent (< 1 month)", desc: "Accelerated sprint schedule" },
  { id: "1_2_months", label: "1 – 2 months", desc: "Targeted MVP or focused build" },
  { id: "2_3_months", label: "2 – 3 months", desc: "Comprehensive product launch" },
  { id: "3_6_months", label: "3 – 6 months", desc: "Large-scale multi-platform release" },
  { id: "flexible", label: "Flexible", desc: "Quality and precision over calendar deadline" },
];

export const BUDGET_OPTIONS = [
  { id: "tier_1", label: "Under $5,000", desc: "Rapid prototype, audit, or landing experience" },
  { id: "tier_2", label: "$5,000 – $10,000", desc: "Focused MVP or single platform core" },
  { id: "tier_3", label: "$10,000 – $25,000", desc: "Full-scale web platform or native mobile app" },
  { id: "tier_4", label: "$25,000 – $50,000", desc: "Multi-surface system, custom AI & deep architecture" },
  { id: "tier_5", label: "$50,000+", desc: "Enterprise production, extensive scope & SLAs" },
  { id: "tier_undecided", label: "Undecided / Flexible", desc: "Let's explore requirements and estimate together" },
];

export const CONTACT_METHODS = [
  "Work Email",
  "Google Meet / Cal.com call",
  "WhatsApp",
  "Phone Call",
];

export interface ProjectFormData {
  // Step 1: Project Overview
  projectName: string;
  projectStage: string;
  projectDescription: string;
  industry: string;
  targetAudience: string;

  // Step 2: Technical Scope
  platforms: string[];
  features: string[];
  techStackPreference: string;

  // Step 3: Design & References
  designStatus: string;
  referenceLinks: string;
  assetLinks: string;

  // Step 4: Timeline & Investment
  timeline: string;
  budget: string;
  currency: CurrencyCode;

  // Step 5: Contact Information
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  preferredContact: string;
  additionalNotes: string;
}

const INITIAL_FORM: ProjectFormData = {
  projectName: "",
  projectStage: PROJECT_STAGES[0].id,
  projectDescription: "",
  industry: "",
  targetAudience: "",
  platforms: [PLATFORM_OPTIONS[0].id],
  features: [FEATURE_TAGS[0], FEATURE_TAGS[1]],
  techStackPreference: "",
  designStatus: DESIGN_OPTIONS[0].id,
  referenceLinks: "",
  assetLinks: "",
  timeline: TIMELINE_OPTIONS[1].id,
  budget: "",
  currency: "USD",
  name: "",
  email: "",
  company: "",
  role: "",
  phone: "",
  preferredContact: CONTACT_METHODS[0],
  additionalNotes: "",
};

const STEPS = [
  { id: 1, title: "Vision & Scope", subtitle: "Project fundamentals" },
  { id: 2, title: "Technical Stack", subtitle: "Platforms & features" },
  { id: 3, title: "Design & Assets", subtitle: "Figma & references" },
  { id: 4, title: "Timeline & Budget", subtitle: "Schedule & investment" },
  { id: 5, title: "You & Contact", subtitle: "Coordination details" },
];

export function ProjectIntakeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sensibly default to INR for visitors in India while keeping USD for international visitors.
  React.useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") {
        setFormData((prev) =>
          prev.currency === "USD" && !prev.budget ? { ...prev, currency: "INR" } : prev
        );
      }
    } catch {
      // Ignore if Intl timezone detection is unavailable
    }
  }, []);

  const updateField = <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === "error") setErrorMessage("");
  };

  const togglePlatform = (id: string) => {
    setFormData((prev) => {
      const exists = prev.platforms.includes(id);
      const platforms = exists
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id];
      return { ...prev, platforms };
    });
  };

  const toggleFeature = (tag: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(tag);
      const features = exists
        ? prev.features.filter((f) => f !== tag)
        : [...prev.features, tag];
      return { ...prev, features };
    });
  };

  // Convert the typed budget amount when the user switches currencies so the
  // displayed price stays consistent ("show the price accordingly").
  const handleCurrencyChange = (code: CurrencyCode) => {
    setFormData((prev) => {
      if (prev.currency === code) return prev;
      const numeric = Number(prev.budget);
      const converted =
        prev.budget && !Number.isNaN(numeric)
          ? String(Math.round(convertAmount(numeric, prev.currency, code)))
          : "";
      return { ...prev, currency: code, budget: converted };
    });
  };

  // Step Validation
  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.projectName.trim()) {
        setErrorMessage("Please give your project a name or working title.");
        return false;
      }
      if (formData.projectDescription.trim().length < 15) {
        setErrorMessage(
          "Please tell us a little more about what you want to build (at least 15 characters)."
        );
        return false;
      }
    }

    if (currentStep === 2) {
      if (formData.platforms.length === 0) {
        setErrorMessage("Please select at least one platform or surface.");
        return false;
      }
    }

    if (currentStep === 5) {
      if (formData.name.trim().length < 2) {
        setErrorMessage("Please provide your full name.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setErrorMessage("Please enter a valid work email address.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const budgetFormatted = formatBudgetForSubmission(formData.budget, formData.currency);
      const platformsList = formData.platforms
        .map((p) => PLATFORM_OPTIONS.find((opt) => opt.id === p)?.label || p)
        .join(", ");
      const stageTitle =
        PROJECT_STAGES.find((s) => s.id === formData.projectStage)?.title ||
        formData.projectStage;
      const timelineTitle =
        TIMELINE_OPTIONS.find((t) => t.id === formData.timeline)?.label ||
        formData.timeline;
      const designTitle =
        DESIGN_OPTIONS.find((d) => d.id === formData.designStatus)?.label ||
        formData.designStatus;

      // Construct a structured overview inside message so that standard Formspree email
      // templates reliably include all critical brief details, including budget.
      const messageBody = [
        `PROJECT OVERVIEW`,
        `Project Name: ${formData.projectName}`,
        `Stage: ${stageTitle}`,
        formData.industry ? `Industry: ${formData.industry}` : "",
        formData.targetAudience ? `Target Audience: ${formData.targetAudience}` : "",
        ``,
        `SCOPE & TIMELINE`,
        `Surfaces: ${platformsList || "Not specified"}`,
        formData.features.length ? `Features: ${formData.features.join(", ")}` : "",
        `Design Status: ${designTitle}`,
        formData.techStackPreference ? `Tech Preferences: ${formData.techStackPreference}` : "",
        `Timeline: ${timelineTitle}`,
        `Estimated Budget: ${budgetFormatted}`,
        ``,
        `DESCRIPTION`,
        formData.projectDescription,
        formData.referenceLinks ? `\nReferences / Links:\n${formData.referenceLinks}` : "",
        formData.assetLinks ? `\nAsset Links (Figma/Drive):\n${formData.assetLinks}` : "",
        formData.additionalNotes ? `\nAdditional Notes:\n${formData.additionalNotes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      // Map form data to API payload.
      // Notice: `budgetCurrency` is used instead of root `currency` to avoid triggering
      // Formspree's Stripe/payment plugin validation (which defaults to USD and fails on non-USD codes).
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        role: formData.role || undefined,
        phone: formData.phone || undefined,
        preferredContact: formData.preferredContact,
        websiteType: platformsList,
        budget: budgetFormatted,
        budgetCurrency: formData.currency,
        projectName: formData.projectName,
        projectStage: stageTitle,
        targetAudience: formData.targetAudience,
        industry: formData.industry,
        platforms: formData.platforms.map(
          (p) => PLATFORM_OPTIONS.find((opt) => opt.id === p)?.label || p
        ),
        features: formData.features,
        designStatus: designTitle,
        techStack: formData.techStackPreference,
        referenceLinks: formData.referenceLinks,
        assetLinks: formData.assetLinks,
        timeline: timelineTitle,
        message: messageBody,
        additionalNotes: formData.additionalNotes,
        source: "Detailed Project Intake Page (/start)",
      };

      const result = await submitToFormspree(
        payload,
        `New Project Brief: "${formData.projectName}" by ${formData.name}`
      );

      if (!result.ok) {
        throw new Error(result.message || "Unable to submit project brief. Please try again.");
      }

      setStatus("success");
      window.scrollTo({ top: 80, behavior: "smooth" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  // --- Success State View ---
  if (status === "success") {
    return (
      <section className="relative min-h-[85vh] py-20">
        <Container size="narrow" className="relative">
          <div className="panel overflow-hidden rounded-3xl p-8 sm:p-14 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-2)] border border-[var(--line-strong)] text-[var(--ink)]">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>

            <span className="mono text-xs uppercase tracking-[0.25em] text-[var(--dim)]">
              Brief Received · Transmission Confirmed
            </span>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
              Thank you, {formData.name.split(" ")[0]}.
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">
              We have received your detailed brief for{" "}
              <strong className="font-semibold text-[var(--ink)]">
                &ldquo;{formData.projectName}&rdquo;
              </strong>
              . Our design and engineering partners will review your architecture, platforms,
              and timeline.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-6 text-left">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dim)]">
                Next Steps
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--body)]">
                <li className="flex items-start gap-2.5">
                  <span className="mono text-xs text-[var(--ink)] font-semibold">01</span>
                  <span>We assess the technical feasibility and sprint milestones within 48h.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mono text-xs text-[var(--ink)] font-semibold">02</span>
                  <span>
                    We reply to <strong className="text-[var(--ink)]">{formData.email}</strong> with an initial scoping review.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mono text-xs text-[var(--ink)] font-semibold">03</span>
                  <span>We schedule an interactive architecture &amp; design discovery session.</span>
                </li>
              </ul>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                href={siteConfig.schedulingUrl}
                external
                size="lg"
                icon={<Calendar className="h-4 w-4" />}
                iconPosition="left"
              >
                Schedule call now
              </Button>
              <Button href="/" variant="secondary" size="lg">
                Return to home
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative isolate py-12 sm:py-20">
      <ParticleField className="-z-10" />

      <Container size="wide">
        {/* Back Link & Header */}
        <div className="mb-10 max-w-4xl">
          <Link
            href="/"
            className="group mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Studio
          </Link>

          <div className="flex items-center gap-3">
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ink)]"
              aria-hidden="true"
            />
            <span className="eyebrow text-[var(--ink)]">Project Intake Architecture</span>
            <span className="mono text-[10px] tracking-[0.2em] text-[var(--dim)]">
              DEPTH: -250 m
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl md:text-[3.25rem] leading-[1.08]">
            Tell us what you want to build.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg leading-relaxed">
            Fill in the specifics for your digital product. Whether it’s an ambitious zero-to-one
            concept, mobile app, internal tool, or AI platform, our leads review every specification
            personally.
          </p>

          {/* Studio guarantees strip */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--dim)]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[var(--ink)]" />
              <span>NDA signed on request</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[var(--ink)]" />
              <span>48h brief assessment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-[var(--ink)]" />
              <span>Direct engineer &amp; design lead review</span>
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-12 border-b border-[var(--line)] pb-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {STEPS.map((s) => {
              const isCurrent = step === s.id;
              const isPast = step > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (s.id < step) {
                      setErrorMessage("");
                      setStep(s.id);
                    } else if (validateStep(step)) {
                      setStep(s.id);
                    }
                  }}
                  className={cn(
                    "flex flex-col text-left transition-all p-3 rounded-xl border",
                    isCurrent
                      ? "border-[var(--ink)] bg-[var(--surface-2)] shadow-sm"
                      : isPast
                      ? "border-[var(--line-strong)] bg-transparent hover:border-[var(--ink)]/50"
                      : "border-transparent opacity-50 cursor-not-allowed"
                  )}
                  disabled={s.id > step}
                >
                  <div className="flex items-center justify-between">
                    <span className="mono text-[10px] tracking-[0.2em] text-[var(--dim)]">
                      0{s.id}
                    </span>
                    {isPast && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--bg)] text-[9px]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>
                  <span className="mt-1 text-sm font-semibold text-[var(--ink)]">
                    {s.title}
                  </span>
                  <span className="text-[11px] text-[var(--muted)] hidden sm:block">
                    {s.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Form Body */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: Vision & Scope */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                      1. Project Fundamentals &amp; Vision
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Give us an understanding of the product, problem space, and stage.
                    </p>
                  </div>

                  {/* Project Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Project or Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => updateField("projectName", e.target.value)}
                      placeholder="e.g. Apex Analytics, Orbit Mobile, Internal Logistics Hub"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                    />
                  </div>

                  {/* Project Stage */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Current Development Stage
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PROJECT_STAGES.map((stg) => {
                        const Icon = stg.icon;
                        const selected = formData.projectStage === stg.id;
                        return (
                          <button
                            key={stg.id}
                            type="button"
                            onClick={() => updateField("projectStage", stg.id)}
                            className={cn(
                              "group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                              selected
                                ? "border-[var(--ink)] bg-[var(--surface-2)] ring-1 ring-[var(--ink)]"
                                : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                                selected
                                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                                  : "border-[var(--line)] bg-[var(--bg-2)] text-[var(--dim)] group-hover:text-[var(--ink)]"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-[var(--ink)]">
                                {stg.title}
                              </div>
                              <div className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                                {stg.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      What are you making? What problem does it solve?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.projectDescription}
                      onChange={(e) => updateField("projectDescription", e.target.value)}
                      placeholder="Describe the product core functionality, target users, and key workflows. E.g. A web platform where researchers upload complex datasets, query them with AI models, and generate interactive visual reports..."
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                    />
                  </div>

                  {/* Industry & Target Audience */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Industry / Sector
                      </label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => updateField("industry", e.target.value)}
                        placeholder="e.g. FinTech, B2B SaaS, HealthTech, Creative Studio"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Target Audience / End Users
                      </label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => updateField("targetAudience", e.target.value)}
                        placeholder="e.g. Enterprise managers, Indie founders, Gen-Z consumers"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Technical Scope & Platforms */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                      2. Platforms &amp; Functional Scope
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Select which surfaces you want built and the capabilities required.
                    </p>
                  </div>

                  {/* Platform Multi-Select */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Platforms / Surfaces Required <span className="text-red-500">*</span>
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PLATFORM_OPTIONS.map((plat) => {
                        const Icon = plat.icon;
                        const isSelected = formData.platforms.includes(plat.id);
                        return (
                          <button
                            key={plat.id}
                            type="button"
                            onClick={() => togglePlatform(plat.id)}
                            className={cn(
                              "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                              isSelected
                                ? "border-[var(--ink)] bg-[var(--surface-2)] ring-1 ring-[var(--ink)]"
                                : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors",
                                isSelected
                                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                                  : "border-[var(--line)] bg-[var(--bg-2)] text-[var(--dim)]"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-semibold text-[var(--ink)] flex-1">
                              {plat.label}
                            </span>
                            {isSelected && (
                              <Check className="h-4 w-4 text-[var(--ink)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Features Multi-Select */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Key Capabilities &amp; Integrations
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {FEATURE_TAGS.map((tag) => {
                        const isSelected = formData.features.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleFeature(tag)}
                            className={cn(
                              "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all",
                              isSelected
                                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] shadow-sm"
                                : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech stack preference */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Technical Stack Preferences or Constraints (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.techStackPreference}
                      onChange={(e) => updateField("techStackPreference", e.target.value)}
                      placeholder="e.g. Next.js, Kotlin/Android, Node.js, PostgreSQL, Supabase, Tailwind, Python AI service"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                    />
                    <p className="text-[11px] text-[var(--dim)]">
                      We specialize in Next.js, React, TypeScript, Android (Kotlin), Node/Python backends, and cloud microservices.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: Design & Assets */}
              {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                      3. Design, Assets &amp; Inspirations
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Help us understand your visual expectations and any existing design collateral.
                    </p>
                  </div>

                  {/* Design Status */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Design &amp; Branding Status
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {DESIGN_OPTIONS.map((opt) => {
                        const selected = formData.designStatus === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => updateField("designStatus", opt.id)}
                            className={cn(
                              "rounded-2xl border p-4 text-left transition-all",
                              selected
                                ? "border-[var(--ink)] bg-[var(--surface-2)] ring-1 ring-[var(--ink)]"
                                : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-[var(--ink)]">
                                {opt.label}
                              </span>
                              {selected && <Check className="h-4 w-4 text-[var(--ink)]" />}
                            </div>
                            <p className="mt-1.5 text-xs text-[var(--muted)]">{opt.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links to Existing Assets (Figma, Deck, PRD) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Links to Existing Specs, Figma, or Pitch Deck (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.assetLinks}
                      onChange={(e) => updateField("assetLinks", e.target.value)}
                      placeholder="https://www.figma.com/file/... or Google Drive link"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                    />
                    <p className="text-[11px] text-[var(--dim)]">
                      Make sure links have view permissions enabled or share passwords securely.
                    </p>
                  </div>

                  {/* Reference products / Inspiration */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Reference Products, Competitors, or Visual Inspirations
                    </label>
                    <textarea
                      rows={4}
                      value={formData.referenceLinks}
                      onChange={(e) => updateField("referenceLinks", e.target.value)}
                      placeholder="Include URLs or names of apps/sites you admire and what you like about them (e.g. 'linear.app for speed, stripe.com for polish')."
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Timeline & Investment */}
              {step === 4 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                      4. Timeline &amp; Budget Expectations
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Setting realistic delivery horizons and scope alignment upfront.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Target Launch Horizon
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {TIMELINE_OPTIONS.map((t) => {
                        const selected = formData.timeline === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => updateField("timeline", t.id)}
                            className={cn(
                              "rounded-2xl border p-4 text-left transition-all",
                              selected
                                ? "border-[var(--ink)] bg-[var(--surface-2)] ring-1 ring-[var(--ink)]"
                                : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-[var(--ink)]">
                                {t.label}
                              </span>
                              {selected && <Check className="h-4 w-4 text-[var(--ink)]" />}
                            </div>
                            <p className="mt-1 text-xs text-[var(--muted)]">{t.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget — Currency toggle + amount input */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Anticipated Investment Budget
                      </label>
                      {/* Currency toggle */}
                      <div
                        role="group"
                        aria-label="Select currency"
                        className="inline-flex shrink-0 rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5"
                      >
                        {CURRENCY_OPTIONS.map((c) => {
                          const active = formData.currency === c.code;
                          return (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => handleCurrencyChange(c.code)}
                              aria-pressed={active}
                              className={cn(
                                "rounded-full px-3 py-1 text-xs font-semibold transition-all",
                                active
                                  ? "bg-[var(--ink)] text-[var(--bg)] shadow-sm"
                                  : "text-[var(--muted)] hover:text-[var(--ink)]"
                              )}
                            >
                              {c.symbol} {c.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--dim)]">
                        {CURRENCY_OPTIONS.find((c) => c.code === formData.currency)?.symbol}
                      </span>
                      <input
                        type="number"
                        min={0}
                        step="any"
                        inputMode="decimal"
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        placeholder={formData.currency === "INR" ? "e.g. 4,15,000" : "e.g. 5,000"}
                        aria-label="Budget amount"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] py-3.5 pl-9 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    {/* Live equivalent in the other currency */}
                    {formData.budget && !Number.isNaN(Number(formData.budget)) && (
                      <p className="text-xs text-[var(--muted)]">
                        ≈{" "}
                        {formatCurrency(
                          String(
                            convertAmount(
                              Number(formData.budget),
                              formData.currency,
                              formData.currency === "USD" ? "INR" : "USD"
                            )
                          ),
                          formData.currency === "USD" ? "INR" : "USD"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5: Contact & Submit */}
              {step === 5 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                      5. Your Details &amp; Coordination
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Where should our partners send the technical assessment and schedule the intro?
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="ada@company.com"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Company / Organization (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="Acme Corp, Stealth, or Independent"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Your Role / Title (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => updateField("role", e.target.value)}
                        placeholder="Founder, Head of Product, CTO"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => updateField("preferredContact", e.target.value)}
                        className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                      >
                        {CONTACT_METHODS.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      Any other context, questions, or constraints?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={(e) => updateField("additionalNotes", e.target.value)}
                      placeholder="e.g. We need to launch before our Series A demo day on Dec 1st. We have an existing backend in Supabase..."
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] transition-colors focus:border-[var(--ink)] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="mt-10 flex items-center justify-between border-t border-[var(--line)] pt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    size="md"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Continue to {STEPS[step]?.title}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    icon={
                      status === "submitting" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )
                    }
                  >
                    {status === "submitting" ? "Transmitting brief..." : "Submit Project Brief"}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Live Scope Overview & Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <h3 className="mono text-xs uppercase tracking-[0.18em] text-[var(--dim)]">
                    Project Manifest
                  </h3>
                  <span className="mono text-[10px] text-[var(--muted)]">
                    Step {step} of {STEPS.length}
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-xs">
                  <div>
                    <span className="text-[var(--dim)]">Project Title:</span>
                    <p className="mt-0.5 font-medium text-[var(--ink)] truncate">
                      {formData.projectName || "Untitled project"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--dim)]">Stage:</span>
                    <p className="mt-0.5 font-medium text-[var(--ink)]">
                      {PROJECT_STAGES.find((s) => s.id === formData.projectStage)?.title}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--dim)]">Surfaces ({formData.platforms.length}):</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {formData.platforms.map((pid) => (
                        <span
                          key={pid}
                          className="rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-2 py-0.5 text-[10px] text-[var(--ink)]"
                        >
                          {PLATFORM_OPTIONS.find((p) => p.id === pid)?.label || pid}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[var(--dim)]">Target Horizon:</span>
                    <p className="mt-0.5 font-medium text-[var(--ink)]">
                      {TIMELINE_OPTIONS.find((t) => t.id === formData.timeline)?.label}
                    </p>
                  </div>

                  <div>
                    <span className="text-[var(--dim)]">Estimated Budget:</span>
                    <p className="mt-0.5 font-semibold text-[var(--ink)]">
                      {formatCurrency(formData.budget, formData.currency)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--line)] pt-4">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Your brief is kept strictly confidential.</span>
                  </div>
                </div>
              </div>

              {/* Direct Schedule Option */}
              <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                  Prefer a direct discovery call?
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                  If you’d rather talk through requirements live with our studio team, book directly onto our calendar.
                </p>
                <a
                  href={siteConfig.schedulingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)] transition-colors hover:opacity-75"
                >
                  Schedule 20-min session
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
