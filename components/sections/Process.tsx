import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="default" className="relative">
        <Reveal>
          <SectionHeading
          eyebrow="The dive profile"
          depth="How we work"
          align="center"
          title={
            <>
              Four stages. No stage{" "}
              <span className="lumen-text">skipped to hit a date</span>.
            </>
          }
            description="You always know which stage we are in, what it produces and what it costs, agreed before it starts."
          />
        </Reveal>

        <ol className="relative mt-16 sm:mt-20">
          {/* The descent line */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--ink)]/60 via-[var(--ink)]/35 to-transparent sm:left-[27px]"
          />

          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              delay={i * 80}
              key={step.step}
              className="relative pl-14 pb-12 last:pb-0 sm:pl-20"
            >
              {/* Depth node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-2)] sm:h-14 sm:w-14"
              >
                <span className="font-mono text-[10px] tracking-widest text-[var(--ink)] sm:text-xs">
                  {step.step}
                </span>
              </span>

              <div className="panel panel-hover rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
                    {step.name}
                  </h3>
                  <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--dim)]">
                    {step.depth}
                  </span>
                </div>

                <p className="mt-2 text-sm italic text-[var(--ink)]/80">{step.tagline}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {step.description}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-[0.85rem] text-[var(--body)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--ink)]"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
