import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ParticleField } from "@/components/ui/Atmosphere";
import { projects, clientProjects, inHouseProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client products designed and engineered by DiveintoInfinity: event ticketing, lab management software and B2B procurement platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% -20%, var(--bg-2) 0%, var(--bg-2) 45%, var(--bg) 100%)",
            }}
          />
          <div aria-hidden="true" className="grid-field absolute inset-0 opacity-50" />
          <ParticleField className="opacity-60" />

          <Container size="wide" className="relative">
            <SectionHeading
              eyebrow="The archive"
              depth={`${projects.length} projects`}
              title={
                <>
                  Everything we have{" "}
                  <span className="lumen-text">put into production</span>.
                </>
              }
              description="A small studio with a short list. Every project here is live, owned by its client and still running."
              className="max-w-3xl"
            />
          </Container>
        </section>

        {/* Projects */}
        <section className="relative pb-24 sm:pb-32">
          <Container size="wide">
            <h2 className="eyebrow mb-8 text-[var(--muted)]">Client work</h2>
            <div className="space-y-8 lg:space-y-10">
              {clientProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            <h2 className="eyebrow mb-8 mt-20 text-[var(--muted)]">In-house products</h2>
            <div className="space-y-8 lg:space-y-10">
              {inHouseProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={clientProjects.length + i}
                />
              ))}
            </div>

            <div className="panel mt-14 flex flex-col items-start gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
                  Your product could be the next one here.
                </h2>
                <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
                  Tell us what you want to build. We reply within an hour.
                </p>
              </div>
              <Button
                href="/#contact"
                size="lg"
                className="shrink-0"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Start a project
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
