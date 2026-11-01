import React from "react";
import { Container } from "@/components/ui/Container";
import { Hairline } from "@/components/ui/Atmosphere";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-t border-[var(--line)] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="narrow" className="relative">
        <Reveal>
          <p className="eyebrow mb-10 text-center text-[var(--muted)]">Why we exist</p>
        </Reveal>

        <div className="space-y-8 text-center">
          <Reveal delay={80}>
            <p className="text-[0.95rem] uppercase leading-[1.85] tracking-[0.14em] text-[var(--ink)] sm:text-base sm:leading-[1.9]">
              Most software fails long before it is written. It fails in the brief nobody
              questioned, the user nobody spoke to, the decision deferred until the deadline
              made it for everyone.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="text-[0.95rem] uppercase leading-[1.85] tracking-[0.14em] text-[var(--muted)] sm:text-base sm:leading-[1.9]">
              We work the other way. We go down before we build out, into the business, the
              constraints, the thing that has to be true. Then we design and engineer until
              the product is obvious, fast and genuinely owned by the people who run it.
            </p>
          </Reveal>
        </div>

        <div className="my-14">
          <Hairline />
        </div>

        <Reveal delay={60}>
          <h2 className="text-center text-[clamp(1.75rem,5.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--ink)]">
            There is no floor.
            <br />
            <span className="lumen-text">Only how deep you are willing to go.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[0.95rem] leading-relaxed text-[var(--muted)]">
            That is the whole idea behind the name. Every product we take on, we take
            further than the brief asked for, and we are still there after launch, because
            the first release was never the finish line.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
