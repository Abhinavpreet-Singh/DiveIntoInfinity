import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { ParticleField } from "@/components/ui/Atmosphere";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Case study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case study`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1">
        {/* ---- Header ---- */}
        <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% -20%, var(--bg-2) 0%, var(--bg) 70%)",
            }}
          />
          <div aria-hidden="true" className="grid-field absolute inset-0 opacity-50" />
          <ParticleField className="opacity-50" />

          <Container size="wide" className="relative">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              <ArrowLeft className="h-4 w-4" />
              All work
            </Link>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className="rounded-full border border-[var(--line-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)]"
                  >
                    Client project
                  </span>
                  <span className="text-xs text-[var(--dim)]">{project.sector}</span>
                  <span className="text-xs text-[var(--dim)]">· {project.year}</span>
                </div>

                <h1 className="mt-6 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                  {project.title}
                </h1>
                <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">{project.category}</p>

                <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--body)]">
                  {project.summary}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button
                    href={project.liveUrl}
                    external
                    icon={<ExternalLink className="h-4 w-4" />}
                  >
                    Visit the live product
                  </Button>
                  <Button href="/#contact" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                    Build something like this
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ProjectVisual project={project} />
              </div>
            </div>

            {/* Highlights strip */}
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
              {project.highlights.map((h) => (
                <div key={h.label} className="bg-[var(--bg-2)] px-6 py-6">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--dim)]">
                    {h.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* ---- Body ---- */}
        <section className="relative overflow-hidden border-t border-[var(--line-soft)] bg-[var(--bg-2)] py-20 sm:py-28">
          <div aria-hidden="true" className="depth-vignette absolute inset-0" />

          <Container size="wide" className="relative">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              {/* Narrative */}
              <div className="space-y-12 lg:col-span-7">
                <Block title="Overview" body={project.description} />
                <Block title="The challenge" body={project.challenge} />
                <Block title="What we built" body={project.solution} />

                <div>
                  <SubHeading>In the product</SubHeading>
                  <ul className="mt-6 space-y-3">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--body)]"
                      >
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[var(--ink)]"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-5">
                <div className="panel sticky top-28 space-y-8 rounded-3xl p-7 sm:p-8">
                  <div>
                    <h2 className="eyebrow text-[var(--dim)]">Client</h2>
                    <p className="mt-3 text-lg font-medium tracking-tight text-[var(--ink)]">
                      {project.client}
                    </p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                    >
                      {project.liveUrl.replace(/^https?:\/\//, "")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="h-px bg-[var(--line-soft)]" />

                  <div>
                    <h2 className="eyebrow text-[var(--dim)]">What we delivered</h2>
                    <ul className="mt-4 space-y-2.5">
                      {project.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.85rem] text-[var(--body)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--ink)]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-[var(--line-soft)]" />

                  <div>
                    <h2 className="eyebrow text-[var(--dim)]">Stack</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        {/* ---- Next project ---- */}
        <section className="relative py-20 sm:py-24">
          <Container size="wide">
            <Link
              href={`/work/${next.slug}`}
              className="panel panel-hover group flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div>
                <span className="eyebrow text-[var(--dim)]">Next project</span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
                  {next.title}
                </h2>
                <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{next.category}</p>
              </div>
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 group-hover:border-[var(--ink)]/50 group-hover:text-[var(--ink)]"
                aria-hidden="true"
              >
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--line-strong)]"
      />
      <h2 className="eyebrow text-[var(--muted)]">{children}</h2>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <SubHeading>{title}</SubHeading>
      <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[var(--body)]">{body}</p>
    </div>
  );
}
