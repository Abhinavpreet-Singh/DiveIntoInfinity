import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Admin } from "@/components/scheduling/Admin";

export const metadata: Metadata = {
  title: "Admin · DiveintoInfinity",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1 pt-20">
        <Admin />
      </main>
      <Footer />
    </div>
  );
}
