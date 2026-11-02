import React from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--line-soft)] bg-[var(--bg-2)] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="wide" className="relative">
        <Reveal className="max-w-3xl">
          <SectionHeading
          eyebrow="Capabilities"
          depth="What we do"
          title={
            <>
              Everything between the idea and the{" "}
              <span className="lumen-text">thing in production</span>.
            </>
          }
            description="One studio, one accountable team. Strategy, design, engineering and the long tail of care after launch, without handing you off between agencies."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              as="article"
              delay={(i % 3) * 90}
              key={service.number}
              className="group relative flex flex-col bg-[var(--bg-2)] p-7 transition-colors duration-500 hover:bg-[var(--surface)] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--ink)] to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--ink)]">
                  {service.number}
                </span>
                <span className="h-px flex-1 bg-[var(--line-soft)]" aria-hidden="true" />
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-[var(--ink)]">
                {service.title}
              </h3>
              <p className="mt-2 text-sm italic text-[var(--dim)]">{service.tagline}</p>

              <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                {service.description}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.85rem] text-[var(--body)]">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ink)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-[var(--line-soft)] pt-5 text-[0.8rem] leading-relaxed text-[var(--dim)]">
                {service.focus}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
