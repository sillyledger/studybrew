import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import FlashcardDeck from "@/components/FlashcardDeck";
import { getCategory } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Deck Not Found | Study Brew" };
  }

  return {
    title: `${category.name} Flashcards | Study Brew`,
    description: category.description,
  };
}

export default async function DeckPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category || !category.cards || category.cards.length === 0) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 pt-8 md:px-14 md:pb-24 md:pt-12">
        <FlashcardDeck name={category.name} cards={category.cards} />
      </div>
    </main>
  );
}
