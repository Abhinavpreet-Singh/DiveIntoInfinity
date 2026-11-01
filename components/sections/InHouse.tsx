import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectTile } from "@/components/portfolio/ProjectTile";
import { inHouseProjects } from "@/data/projects";

export function InHouse() {
  return (
    <section
      id="in-house"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--line-soft)] bg-[var(--bg-2)] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="depth-vignette absolute inset-0" />

      <Container size="wide" className="relative">
        <Reveal className="max-w-3xl">
          <SectionHeading
            eyebrow="In-house"
            depth="What we build for ourselves"
            title={
              <>
                We are our own{" "}
                <span className="lumen-text">hardest client</span>.
              </>
            }
            description="Products the studio owns end to end. They are where we try things before a client pays for them, and the reason we can talk about marketplaces, AI retrieval and multi-sided platforms from experience rather than theory."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2">
          {inHouseProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 90} className="flex">
              <ProjectTile project={project} className="w-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
