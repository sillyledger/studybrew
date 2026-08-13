import Link from "next/link";

export default function FlashcardsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-black">Flashcards</h1>
      <p className="max-w-md text-text-muted">Coming soon.</p>
      <Link
        href="/"
        className="border-b border-teal-dim pb-0.5 font-mono text-sm text-teal"
      >
        ← Back home
      </Link>
    </main>
  );
}
