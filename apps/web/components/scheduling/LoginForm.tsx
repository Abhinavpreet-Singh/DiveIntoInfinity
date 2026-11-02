"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getCurrentUser, requestMagicLink } from "@/lib/auth";
import { ApiError } from "@/lib/api";

const fieldClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-colors duration-200 focus:border-[var(--ink)] focus:bg-[var(--surface-2)]";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  // Already signed in? Skip the form.
  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (u?.role === "admin") router.replace("/admin");
    })();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      await requestMagicLink(email.trim());
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof ApiError ? err.message : "Couldn't send a link.");
    }
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container size="narrow" className="relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ink)]" />
            <span className="eyebrow text-[var(--ink)]">Admin sign-in</span>
          </div>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-[var(--ink)] sm:text-[2.75rem]">
            Log in
          </h1>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--muted)]">
            Enter the email registered as an admin. We&apos;ll send a secure
            one-time link to your inbox.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="panel rounded-3xl p-6 sm:p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center text-center py-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)]">
                  <CheckCircle2 className="h-6 w-6 text-[var(--ink)]" />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]">
                  Check your email
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
                  We sent a sign-in link to{" "}
                  <span className="text-[var(--ink)]">{email.trim()}</span>. It
                  expires in 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dim)]" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className={fieldClass + " pl-11"}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p role="alert" className="flex items-start gap-2.5 rounded-xl border border-[var(--ink)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:shadow-[0_18px_40px_-22px_var(--ink)] active:scale-[0.985] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending link
                    </>
                  ) : (
                    <>
                      Send sign-in link
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
