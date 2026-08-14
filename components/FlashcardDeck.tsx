"use client";

import { useEffect, useState } from "react";
import type { FlashcardCard } from "@/app/flashcards/english/data";

type Props = {
  cards: FlashcardCard[];
  tab: string;
};

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function FlashcardDeck({ cards, tab }: Props) {
  // Start in the given order so server and client render the same markup
  // on first paint, then shuffle client-side once mounted.
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setOrder(shuffle(cards.map((_, i) => i)));
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = cards.length;
  const card = cards[order[index]];

  function goTo(next: number) {
    setIndex(((next % total) + total) % total);
  }

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative rounded-2xl bg-panel py-[2.2rem] pl-[2.6rem] pr-[2rem]">
        <span
          className={`absolute -left-px top-[2.2rem] h-[34px] w-2 rounded-r-[6px] ${tab}`}
        />
        <div className="font-mono text-[0.72rem] uppercase tracking-wide text-text-muted-2">
          {card.pos}
        </div>
        <div className="mt-2 text-[2rem] font-black leading-[1.05]">
          {card.word}
        </div>
        <p className="mt-3 text-[1rem] leading-[1.6] text-text-muted">
          {card.definition}
        </p>
        <p className="mt-3 text-[0.92rem] italic text-text-muted-2">
          &quot;{card.example}&quot;
        </p>

        <div className="mt-8 flex gap-3">
          <a
            href="https://app.studybrew.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl border border-coral/35 bg-coral-tint py-3 font-mono text-[0.78rem] font-semibold text-coral transition-colors hover:bg-coral/20"
          >
            Save to Notebook
          </a>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="flex-1 rounded-xl bg-teal py-3 font-mono text-[0.78rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
          >
            Got it
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between font-mono text-[0.76rem] text-text-muted-2">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="text-text-muted transition-colors hover:text-text-primary"
        >
          ← Previous
        </button>
        <span>
          <b className="text-text-primary">{index + 1}</b> / {total}
        </span>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="text-text-muted transition-colors hover:text-text-primary"
        >
          Next →
        </button>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-panel-2">
        <div
          className={`h-full rounded-full transition-[width] duration-200 ${tab}`}
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
