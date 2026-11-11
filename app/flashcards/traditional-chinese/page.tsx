import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Traditional Chinese Flashcards | Study Brew",
  description: "Traditional Chinese vocabulary decks — coming soon.",
};

export default function TraditionalChinesePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold">繁體中文 Flashcards</h1>
        <p className="max-w-md text-text-muted">
          Traditional Chinese decks are coming soon.
        </p>
        <Link
          href="/flashcards"
          className="border-b border-teal-dim pb-0.5 font-medium text-sm text-teal"
        >
          ← Back to flashcards
        </Link>
      </div>
    </main>
  );
}
