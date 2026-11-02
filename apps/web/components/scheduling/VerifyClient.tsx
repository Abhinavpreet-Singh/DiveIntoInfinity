"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { verifyMagicToken } from "@/lib/auth";

export function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!token) {
        setError("No login token was provided.");
        return;
      }
      try {
        const user = await verifyMagicToken(token);
        if (!alive) return;
        router.replace(user.role === "admin" ? "/admin" : "/schedule");
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "This login link is invalid.");
      }
    })();
    return () => {
      alive = false;
    };
  }, [token, router]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container size="narrow" className="relative">
        <div className="panel rounded-3xl p-8 text-center sm:p-12">
          {error ? (
            <>
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)]">
                <AlertCircle className="h-6 w-6 text-[var(--ink)]" />
              </span>
              <h1 className="mt-6 text-xl font-semibold tracking-tight text-[var(--ink)]">
                Link not valid
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--muted)]">
                {error}
              </p>
              <a
                href="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--bg)]"
              >
                Back to login
              </a>
            </>
          ) : (
            <>
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--ink)]" />
              <h1 className="mt-6 text-xl font-semibold tracking-tight text-[var(--ink)]">
                Signing you in
              </h1>
              <p className="mt-2 text-sm text-[var(--muted)]">
                One moment while we verify your link…
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

export function VerifyFallback() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container size="narrow" className="relative">
        <div className="panel rounded-3xl p-8 text-center sm:p-12">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--ink)]" />
          <h1 className="mt-6 text-xl font-semibold tracking-tight text-[var(--ink)]">
            Signing you in
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">One moment…</p>
        </div>
      </Container>
    </section>
  );
}
