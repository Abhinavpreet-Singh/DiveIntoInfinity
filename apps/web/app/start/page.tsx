import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectIntakeForm } from "@/components/sections/ProjectIntakeForm";

export const metadata: Metadata = {
  title: "Start a Project · Project Intake & Scope Brief",
  description:
    "Submit your product specifications, technical requirements, timelines, and budget for your custom web platform, mobile app, or software system.",
  openGraph: {
    title: "Start a Project | DiveintoInfinity Studio",
    description:
      "Submit your project scope and architecture requirements directly to the DiveintoInfinity engineering and design leads.",
  },
};

export default function StartProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1 pt-20">
        <ProjectIntakeForm />
      </main>
      <Footer />
    </div>
  );
}

