import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { clientProjects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Selected work"
              depth="3 client projects"
              title={
                <>
                  Three products, live and{" "}
                  <span className="lumen-text">running someone&apos;s business</span>.
                </>
              }
              description="Not concepts or studies. Each of these is a shipped product with real users, real payments or real operational load behind it."
            />
          </Reveal>

          <Reveal delay={120}>
            <Button
              href="/work"
              variant="secondary"
              className="shrink-0"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              View the archive
            </Button>
          </Reveal>
        </div>

        {/* Stacking scroll: each card pins a little lower than the last,
            so the set collects into a deck as you descend. */}
        <div className="mt-14 sm:mt-16">
          {clientProjects.map((project, i) => (
            <div
              key={project.id}
              className="sticky pb-6 lg:pb-8"
              style={{ top: `calc(5.5rem + ${i * 1.75}rem)`, zIndex: 10 + i }}
            >
              <Reveal delay={i * 60}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
