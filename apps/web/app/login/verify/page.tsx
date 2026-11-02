import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VerifyClient, VerifyFallback } from "@/components/scheduling/VerifyClient";

export const metadata: Metadata = {
  title: "Verifying… · DiveintoInfinity",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1 pt-20">
        <Suspense fallback={<VerifyFallback />}>
          <VerifyClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
