import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { CATEGORIES } from "./english/data";

export const metadata: Metadata = {
  title: "Free English Flashcards | Study Brew",
  description:
    "Free B1–B2 English flashcard decks: everyday words, verbs, idioms and grammar. No account needed.",
};

// Shelf colours per deck: the front square, and the two darker cards behind it.
// Full class strings so Tailwind keeps them. Decks not listed fall back to teal.
const PILE: Record<string, { front: string; back: string; back2: string }> = {
  "everyday-words": { front: "bg-yellow", back: "bg-yellow/55", back2: "bg-yellow/30" },
  verbs: { front: "bg-teal", back: "bg-teal/55", back2: "bg-teal/30" },
  idioms: { front: "bg-coral", back: "bg-coral/55", back2: "bg-coral/30" },
  grammar: { front: "bg-blue", back: "bg-blue/55", back2: "bg-blue/30" },
};

function Pile({ slug, muted }: { slug: string; muted: boolean }) {
  const c = PILE[slug] ?? PILE.verbs;
  return (
    <div aria-hidden="true" className={`relative h-[58px] w-[58px] shrink-0 ${muted ? "opacity-40" : ""}`}>
      <span className={`absolute inset-0 -rotate-[10deg] rounded-[13px] ${c.back2}`} />
      <span className={`absolute inset-0 rotate-6 rounded-[13px] ${c.back}`} />
      <span className={`absolute inset-0 rounded-[13px] ${c.front}`} />
    </div>
  );
}

export default function FlashcardsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Header */}
        <section className="grid items-center gap-10 pb-12 pt-10 md:grid-cols-[1.3fr_1fr] md:gap-12 md:pb-16 md:pt-16">
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
              <span className="h-px w-5 shrink-0 bg-teal-dim" />
              <span>Free practice · no account needed</span>
            </div>
            <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              Flashcards,
              <br />
              <span className="text-teal">on the house.</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-[1.05rem] leading-[1.65] text-text-muted">
              Short decks of everyday words, verbs, idioms and grammar for B1–B2 learners.
              Flip, check yourself, and see which words you already know.
            </p>
          </div>

          {/* Two tilted sample cards */}
          <div aria-hidden="true" className="relative mx-auto h-[250px] w-full max-w-[360px] md:h-[310px]">
            <div className="absolute left-0 top-2 flex h-[170px] w-[62%] -rotate-6 flex-col rounded-[18px] border border-line-strong bg-panel p-5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] md:h-[200px]">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-text-muted-2">
                Idiom
              </span>
              <span className="mt-2 text-[1.45rem] font-bold leading-tight tracking-[-0.02em]">
                break the ice
              </span>
            </div>
            <div className="absolute bottom-0 right-0 flex h-[170px] w-[64%] rotate-[5deg] flex-col justify-between rounded-[18px] bg-cream p-5 text-cream-ink shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)] md:h-[200px]">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cream-muted">
                Verb
              </span>
              <div>
                <div className="text-[1.3rem] font-bold leading-tight tracking-[-0.02em]">
                  procrastinate
                </div>
                <div className="mt-1.5 text-[0.82rem] leading-snug text-cream-muted">
                  to delay doing something you should do
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deck shelf */}
        <section aria-label="Decks" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const hasDeck = cat.available && (cat.cards?.length ?? 0) > 0;
            const inner = (
              <>
                <Pile slug={cat.slug} muted={!hasDeck} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-[1.2rem] font-bold leading-snug">{cat.name}</h2>
                  <p className="mt-1 text-[0.92rem] leading-[1.55] text-text-muted">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] font-medium">
                    <span className="text-text-muted-2">{cat.count} cards</span>
                    <span className="rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-[0.72rem] text-teal">
                      B1–B2
                    </span>
                    {hasDeck ? (
                      <span className="ml-auto text-teal">Study →</span>
                    ) : (
                      <span className="ml-auto rounded-full border border-line px-2.5 py-0.5 text-[0.72rem] text-text-muted-2">
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              </>
            );
            const base =
              "flex items-start gap-5 rounded-[18px] border border-line bg-panel-2 p-5 md:p-6";
            return hasDeck ? (
              <Link
                key={cat.slug}
                href={`/flashcards/english/${cat.slug}`}
                className={`${base} transition-colors hover:border-line-strong hover:bg-panel`}
              >
                {inner}
              </Link>
            ) : (
              <div key={cat.slug} className={base}>
                {inner}
              </div>
            );
          })}
        </section>

        {/* Own decks */}
        <section className="pb-20 pt-6 md:pb-24">
          <div className="flex flex-col gap-5 rounded-[18px] border border-dashed border-line-strong p-5 sm:flex-row sm:items-center md:p-6">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-yellow/15 text-[1.3rem]"
            >
              ☕
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[1.1rem] font-bold">Want your own decks?</h2>
              <p className="mt-1 text-[0.92rem] leading-[1.55] text-text-muted">
                In the Study Brew app, every word you save from your notes becomes a card, with
                a daily review.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] border border-line-strong px-4 py-2.5 text-[0.85rem] font-semibold transition-colors hover:bg-panel-hover sm:self-auto"
            >
              See the roadmap
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
