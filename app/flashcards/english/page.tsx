import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { CATEGORIES } from "./data";

export const metadata: Metadata = {
  title: "English Flashcards | Study Brew",
  description:
    "Vocabulary, idioms, and grammar decks built for B1–B2 English learners. Free to browse.",
};

export default function EnglishFlashcardsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1120px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <div className="inline-flex gap-1 rounded-full border border-line bg-panel p-1">
          <Link
            href="/flashcards/english"
            className="rounded-full bg-teal px-[0.9rem] py-[0.45rem] font-mono text-[0.72rem] font-semibold text-teal-ink"
          >
            English
          </Link>
          <Link
            href="/flashcards/chinese"
            className="rounded-full px-[0.9rem] py-[0.45rem] font-mono text-[0.72rem] text-text-muted"
          >
            繁體中文
          </Link>
        </div>
        <h1 className="mt-6 text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          English flashcards
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Built for B1–B2 learners. Free to browse — no account needed.
        </p>
      </div>

      {/* Category grid */}
      <div className="mx-auto w-full max-w-[1120px] px-6 pb-20 md:px-14">
        <div className="grid grid-cols-1 gap-[1.2rem] md:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const hasDeck = cat.available && (cat.cards?.length ?? 0) > 0;
            const cardClassName = `relative rounded-2xl bg-panel py-[1.8rem] pl-[2.4rem] pr-[1.7rem] ${
              cat.available ? "" : "opacity-50"
            } ${
              hasDeck
                ? "transition-[transform,border-color] duration-200 hover:-translate-y-1"
                : ""
            }`;
            const cardContent = (
              <>
                <span
                  className={`absolute -left-px top-[1.8rem] h-[34px] w-2 rounded-r-[6px] ${
                    cat.available
                      ? cat.tab
                      : "border-[1.5px] border-l-0 border-dashed border-line"
                  }`}
                />
                <h3 className="text-[1.15rem] font-bold">{cat.name}</h3>
                <p className="mt-1 text-[0.9rem] leading-[1.5] text-text-muted">
                  {cat.description}
                </p>
                <div className="mt-[1.6rem] flex items-center justify-between border-t border-dashed border-line-soft pt-4 font-mono text-[0.76rem] text-text-muted-2">
                  {cat.available ? (
                    <>
                      <span>
                        <b className="text-text-primary">{cat.count}</b> words
                      </span>
                      <span>→</span>
                    </>
                  ) : (
                    <span className="rounded-full border border-line px-[0.55rem] py-[0.22rem] text-[0.62rem] uppercase tracking-wide">
                      Soon
                    </span>
                  )}
                </div>
              </>
            );

            return hasDeck ? (
              <Link
                key={cat.name}
                href={`/flashcards/english/${cat.slug}`}
                className={cardClassName}
              >
                {cardContent}
              </Link>
            ) : (
              <div key={cat.name} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
