"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="narrow" className="relative">
        <SectionHeading
          eyebrow="Before you ask"
          depth="FAQ"
          align="center"
          title={
            <>
              The questions that come up{" "}
              <span className="lumen-text">on every first call</span>.
            </>
          }
        />

        <div className="mt-14 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "text-[1.0625rem] font-medium tracking-tight transition-colors duration-300 sm:text-lg",
                        isOpen
                          ? "text-[var(--ink)]"
                          : "text-[var(--ink)] group-hover:text-[var(--muted)]"
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                          : "border-[var(--line)] text-[var(--dim)] group-hover:border-[var(--line-strong)]"
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="pb-7 pr-12 text-[0.95rem] leading-relaxed text-[var(--muted)]"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
