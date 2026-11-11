import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "The App | Study Brew",
  description:
    "The Study Brew notes app is in development — a place to save and review the words you're learning.",
};

export default function AppPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold">The App</h1>
        <p className="max-w-md text-text-muted">Coming soon.</p>
        <Link
          href="/"
          className="border-b border-teal-dim pb-0.5 font-medium text-sm text-teal"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
