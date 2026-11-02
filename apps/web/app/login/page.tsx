import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/scheduling/LoginForm";

export const metadata: Metadata = {
  title: "Log in · DiveintoInfinity",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1 pt-20">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
