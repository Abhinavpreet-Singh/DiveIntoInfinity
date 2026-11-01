"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { ParticleField } from "@/components/ui/Atmosphere";

const PROJECT_TYPES = [
  "Web platform or application",
  "Mobile app (Android)",
  "Internal tool / dashboard",
  "Marketing or catalogue site",
  "AI & automation",
  "Not sure yet",
];

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000+",
  "Still deciding",
];

const INITIAL = {
  name: "",
  email: "",
  company: "",
  websiteType: PROJECT_TYPES[0],
  budget: BUDGETS[1],
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Tell us a little about the project — at least a sentence.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send that. Please try again.");
      }

      setStatus("success");
      setSuccessMessage(
        data.message ||
          "Got it. We read every enquiry ourselves and reply within two working days."
      );
      setFormData(INITIAL);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us directly instead."
      );
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-colors duration-200 focus:border-[var(--ink)] focus:bg-[var(--surface-2)]";
  const labelClass =
    "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]";

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--line-soft)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 110%, var(--bg-2) 0%, var(--bg-2) 45%, var(--bg) 100%)",
        }}
      />
      <ParticleField className="opacity-60" />

      <Container size="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left — the pitch */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ink)]" />
              <span className="eyebrow text-[var(--ink)]">Start here</span>
            </div>

            <h2 className="mt-5 text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-[var(--ink)] sm:text-[2.75rem]">
              Have something worth
              <br />
              <span className="lumen-text">building properly?</span>
            </h2>

            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[var(--muted)]">
              Tell us what you want to build and roughly when. We reply within two working
              days, and the first call is a conversation about the problem — not a sales
              pitch.
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="panel panel-hover group flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)]">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--dim)]">
                    Email
                  </span>
                  <span className="block truncate text-sm text-[var(--ink)]">
                    {siteConfig.email}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--dim)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              {siteConfig.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel-hover group flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)]">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--dim)]">
                      WhatsApp
                    </span>
                    <span className="block text-sm text-[var(--ink)]">
                      Message the studio directly
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--dim)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs text-[var(--dim)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ink)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
              </span>
              {siteConfig.availability.label} · {siteConfig.availability.period}
            </div>
          </div>

          {/* Right — the form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="panel rounded-3xl p-6 sm:p-8 lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={fieldClass}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={fieldClass}
                    autoComplete="email"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="company" className={labelClass}>
                    Company or organisation
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Optional"
                    className={fieldClass}
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="websiteType" className={labelClass}>
                    What are we building?
                  </label>
                  <select
                    id="websiteType"
                    name="websiteType"
                    value={formData.websiteType}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[var(--surface)]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Budget range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    {BUDGETS.map((budget) => (
                      <option key={budget} value={budget} className="bg-[var(--surface)]">
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    The project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What it is, who it is for, and when you need it live."
                    className={`${fieldClass} resize-y`}
                  />
                </div>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--ink)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {errorMessage}
                </p>
              )}

              {status === "success" && (
                <p
                  role="status"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {successMessage}
                </p>
              )}

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:shadow-[0_18px_40px_-22px_var(--ink)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send the brief
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-[var(--dim)]">
                  We reply within two working days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
