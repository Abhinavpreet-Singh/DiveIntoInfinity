"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { submitToFormspree } from "@/lib/forms";
import { cn } from "@/lib/utils";
import {
  CURRENCY_OPTIONS,
  convertAmount,
  formatCurrency,
  type CurrencyCode,
} from "@/lib/currency";

const PROJECT_TYPES = [
  "Web platform or application",
  "Mobile app (Android)",
  "Internal tool / dashboard",
  "Marketing or catalogue site",
  "AI & automation",
  "Not sure yet",
];

interface ContactForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  websiteType: string;
  budget: string;
  currency: CurrencyCode;
  message: string;
}

const INITIAL: ContactForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  websiteType: PROJECT_TYPES[0],
  budget: "",
  currency: "USD",
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

  // Convert the typed budget amount when the user switches currencies so the
  // displayed price stays consistent.
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
      setErrorMessage("Tell us a little about the project, at least a sentence.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await submitToFormspree(
        {
          ...formData,
          budget: formatCurrency(formData.budget, formData.currency),
          source: "Contact Section Form (Homepage)",
        },
        `New enquiry from ${formData.name}`
      );

      if (!result.ok) {
        throw new Error(result.message || "Unable to send that. Please try again.");
      }

      setStatus("success");
      setSuccessMessage(
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
          {/* Left: the pitch */}
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
              days, and the first call is a conversation about the problem, not a sales
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

            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5">
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                Detailed Specifications
              </span>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                Have extensive project requirements, wireframes, or specific tech requirements?
              </p>
              <Link
                href="/start"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)] transition-opacity hover:opacity-75"
              >
                Open detailed project intake form
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: the form */}
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
                    placeholder="Ada Lovelace"
                    className={fieldClass}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address *
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

                <div>
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
                  <label htmlFor="phone" className={labelClass}>
                    Phone number <span className="opacity-60">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={fieldClass}
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <div className="mb-2 flex min-h-[2rem] items-center">
                    <label
                      htmlFor="websiteType"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]"
                    >
                      What are we building?
                    </label>
                  </div>
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

                {/* Budget — Currency toggle + amount input */}
                <div>
                  <div className="mb-2 flex min-h-[2rem] items-center justify-between gap-3">
                    <label
                      htmlFor="budget"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]"
                    >
                      Budget
                    </label>
                    <div
                      role="group"
                      aria-label="Select currency"
                      className="inline-flex shrink-0 rounded-full border border-[var(--line)] bg-[var(--bg)] p-0.5"
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
                      id="budget"
                      name="budget"
                      type="number"
                      min={0}
                      step="any"
                      inputMode="decimal"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder={formData.currency === "INR" ? "e.g. 4,15,000" : "e.g. 5,000"}
                      aria-label="Budget amount"
                      className={`${fieldClass} pl-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </div>
                  {formData.budget && !Number.isNaN(Number(formData.budget)) && (
                    <p className="mt-2 text-xs text-[var(--dim)]">
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
