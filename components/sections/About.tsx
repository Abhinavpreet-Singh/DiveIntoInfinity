import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinitySymbol } from "@/components/ui/InfinitySymbol";
import { Reveal } from "@/components/ui/Reveal";

const principles = [
  {
    title: "One team, start to finish",
    body: "The people who scope your product are the people who design and build it. Nothing is handed to a junior after the pitch.",
  },
  {
    title: "Honest scope, fixed per phase",
    body: "You know the cost of design before design begins and the cost of the build before the build begins. No hourly drift.",
  },
  {
    title: "You own everything",
    body: "Code, designs, infrastructure and accounts transfer to you. We are not interested in holding your product hostage.",
  },
  {
    title: "Built to be handed over",
    body: "Typed, documented, conventional code. Your next developer should be able to read it without calling us — though you can.",
  },
];

export function About() {
  return (
    <section
      id="studio"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--line-soft)] bg-[var(--bg-2)] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The studio"
              depth="Who you work with"
              title={
                <>
                  A small studio that builds like it has{" "}
                  <span className="lumen-text">something to prove</span>.
                </>
              }
              description="DiveintoInfinity is a digital product studio. We take on a deliberately small number of builds at a time so that each one gets the senior attention it needs — from the first discovery call to the release after launch."
            />

            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
              Our work runs from a two-sided ticketing platform with a companion Android app,
              to a lab management suite that replaced a research institution&apos;s
              spreadsheets, to a procurement catalogue built for tenders rather than
              shopping carts. Different industries, same standard.
            </p>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <InfinitySymbol size={34} strokeWidth={1.4} className="w-8 shrink-0 text-[var(--ink)]" />
              <p className="text-sm leading-relaxed text-[var(--body)]">
                <span className="font-medium text-[var(--ink)]">Go deep. Build infinite.</span>{" "}
                We would rather do three things properly this quarter than ten things
                acceptably.
              </p>
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal
                as="li"
                delay={i * 80}
                key={principle.title}
                className="bg-[var(--bg-2)] p-7 transition-colors duration-500 hover:bg-[var(--surface)]"
              >
                <span className="font-mono text-[10px] tracking-[0.24em] text-[var(--ink)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-[var(--ink)]">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-[var(--muted)]">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
