import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import FlashcardDeck from "@/components/FlashcardDeck";
import { getCategory } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DeckPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category || !category.cards || category.cards.length === 0) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1120px] px-6 pb-20 pt-10 md:px-14 md:pt-16">
        <Link
          href="/flashcards/english"
          className="font-mono text-[0.78rem] text-text-muted transition-colors hover:text-text-primary"
        >
          ← English flashcards
        </Link>
        <h1 className="mt-4 text-[clamp(1.8rem,3.2vw,2.4rem)] font-black leading-[1.05]">
          {category.name}
        </h1>

        <div className="mt-10">
          <FlashcardDeck cards={category.cards} tab={category.tab} />
        </div>
      </div>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line-soft px-6 py-10 md:px-14">
        <span className="text-base font-bold">Study Brew</span>
        <span className="font-mono text-[0.7rem] text-text-muted-2">
          Made by a learner, for learners.
        </span>
      </footer>
    </main>
  );
}
