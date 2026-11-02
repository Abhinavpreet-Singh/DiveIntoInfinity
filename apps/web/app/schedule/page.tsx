import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Schedule } from "@/components/scheduling/Schedule";

export const metadata: Metadata = {
  title: "Schedule a meeting · DiveintoInfinity",
  description:
    "Book a meeting with the DiveintoInfinity studio. Pick an open time and receive a Google Meet link for your slot by email.",
  openGraph: {
    title: "Schedule a meeting | DiveintoInfinity Studio",
    description: "Pick a time and get a Google Meet link for your exact slot.",
  },
};

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1 pt-20">
        <Schedule />
      </main>
      <Footer />
    </div>
  );
}
