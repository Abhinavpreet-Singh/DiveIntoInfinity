import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { InHouse } from "@/components/sections/InHouse";
import { Services } from "@/components/sections/Services";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <SelectedWork />
        <InHouse />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
