"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cup from "@/components/Cup";
import { RestartIcon, ShuffleIcon } from "@/components/Icons";
import type { FlashcardCard } from "@/app/flashcards/english/data";
import { APP_WELCOME_URL, SIGNUPS_OPEN } from "@/lib/site";

type Rating = "knew" | "learning";

type Props = {
  /** Deck name, e.g. "Idioms". */
  name: string;
  cards: FlashcardCard[];
};

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function kindLabel(pos: string) {
  if (pos === "verb") return "Verb";
  if (pos === "idiom") return "Idiom";
  if (pos === "grammar") return "Grammar";
  return "Word";
}

/** "idioms", "verbs", "everyday words", but "grammar cards". */
function deckNoun(name: string) {
  const lower = name.toLowerCase();
  return lower.endsWith("s") ? lower : `${lower} cards`;
}

const ICON_BUTTON =
  "flex h-10 w-10 items-center justify-center rounded-[10px] border border-line-strong text-text-muted transition-colors hover:bg-panel-hover hover:text-text-primary";

export default function FlashcardDeck({ name, cards }: Props) {
  // Progress lives in memory only: no account, no localStorage.
  // `round` is the set of cards being studied (in order); `queue` is the
  // order they're shown in, which grows when a card comes back at the end.
  const [round, setRound] = useState<number[]>(() => cards.map((_, i) => i));
  const [queue, setQueue] = useState<number[]>(() => cards.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [ratings, setRatings] = useState<Record<number, Rating>>({});
  const [requeued, setRequeued] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [roundId, setRoundId] = useState(0);

  function startRound(ids: number[]) {
    setRound(ids);
    setQueue(ids);
    setPos(0);
    setFlipped(false);
    setRevealed(false);
    setRatings({});
    setRequeued([]);
    setFinished(false);
    setRoundId((n) => n + 1);
  }

  // Server and client render the same order first, then shuffle once mounted.
  useEffect(() => {
    startRound(shuffle(cards.map((_, i) => i)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = cards[queue[pos]];
  const total = round.length;
  const knew = round.filter((i) => ratings[i] === "knew");
  const learning = round.filter((i) => ratings[i] === "learning");
  const toGo = finished ? 0 : queue.length - pos;

  function goTo(next: number, nextQueue = queue) {
    if (next < 0) return;
    if (next >= nextQueue.length) {
      setFinished(true);
      return;
    }
    setPos(next);
    setFlipped(false);
    setRevealed(false);
  }

  function flip() {
    if (finished) return;
    setFlipped((f) => !f);
    setRevealed(true);
  }

  function rate(rating: Rating) {
    if (finished || !revealed) return;
    const id = queue[pos];
    setRatings((r) => ({ ...r, [id]: rating }));
    let nextQueue = queue;
    // "Still learning" sends the card to the end of the round, once.
    if (rating === "learning" && !requeued.includes(id) && !queue.slice(pos + 1).includes(id)) {
      nextQueue = [...queue, id];
      setQueue(nextQueue);
      setRequeued((r) => [...r, id]);
    }
    goTo(pos + 1, nextQueue);
  }

  // Keyboard: Space flip · 1 still learning · 2 knew it · ← → move.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (finished || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        // Don't let Space also "click" a focused button or link.
        if (target?.closest("button, a")) target.blur();
        flip();
      } else if (e.key === "1") {
        rate("learning");
      } else if (e.key === "2") {
        rate("knew");
      } else if (e.key === "ArrowLeft") {
        goTo(pos - 1);
      } else if (e.key === "ArrowRight") {
        goTo(pos + 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div>
      {/* Header */}
      <Link
        href="/flashcards"
        className="text-[0.84rem] font-medium text-text-muted transition-colors hover:text-text-primary"
      >
        ← Flashcards
      </Link>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {name}
          </h1>
          <span className="rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-[0.74rem] font-medium text-teal">
            B1–B2
          </span>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => startRound(shuffle(round))}
            aria-label="Shuffle"
            title="Shuffle"
            className={ICON_BUTTON}
          >
            <ShuffleIcon />
          </button>
          <button
            type="button"
            onClick={() => startRound(round)}
            aria-label="Start over"
            title="Start over"
            className={ICON_BUTTON}
          >
            <RestartIcon />
          </button>
        </div>
      </div>

      {finished ? (
        <Finished
          name={name}
          knew={knew.length}
          total={total}
          learningWords={learning.map((i) => cards[i].word)}
          onStudyAgain={() => startRound(shuffle(learning))}
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          <div className="min-w-0">
            {/* Progress */}
            <div className="mb-3 flex items-center justify-between text-[0.82rem] font-medium text-text-muted">
              <span>
                Card <b className="text-text-primary">{pos + 1}</b> of {queue.length}
              </span>
              {requeued.includes(queue[pos]) && queue.indexOf(queue[pos]) < pos && (
                <span className="text-coral">Back for another go</span>
              )}
            </div>
            <div
              className="mb-5 flex h-1.5 w-full overflow-hidden rounded-full bg-line-strong"
              role="progressbar"
              aria-label="Round progress"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={knew.length + learning.length}
            >
              <span
                className="h-full bg-teal transition-[width] duration-300"
                style={{ width: `${(knew.length / total) * 100}%` }}
              />
              <span
                className="h-full bg-coral transition-[width] duration-300"
                style={{ width: `${(learning.length / total) * 100}%` }}
              />
            </div>

            {/* Card */}
            <div key={`${roundId}-${pos}`} className="[perspective:1600px]">
              <div
                role="button"
                tabIndex={0}
                aria-label={flipped ? `Back of card: ${current.word}` : `Flip card: ${current.word}`}
                aria-pressed={flipped}
                onClick={flip}
                onKeyDown={(e) => {
                  if (e.key === "Enter") flip();
                }}
                className={`relative grid min-h-[330px] cursor-pointer select-none rounded-[22px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal motion-reduce:transition-none ${
                  flipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front */}
                <div className="col-start-1 row-start-1 flex flex-col rounded-[22px] border border-line-strong bg-panel p-6 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] md:p-8">
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-text-muted-2">
                    {kindLabel(current.pos)}
                  </span>
                  <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                    <div className="text-[clamp(2rem,6vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
                      {current.word}
                    </div>
                    <div className="mt-3 text-[0.92rem] text-text-muted">{current.pos}</div>
                  </div>
                  <span className="text-center text-[0.78rem] text-text-muted-2">
                    Tap or press Space to flip
                  </span>
                </div>

                {/* Back */}
                <div className="col-start-1 row-start-1 flex flex-col rounded-[22px] bg-cream p-6 text-cream-ink [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-2.5">
                    <span className="text-[1.15rem] font-bold tracking-[-0.02em]">
                      {current.word}
                    </span>
                    <span className="text-[0.85rem] text-cream-muted">{current.pos}</span>
                  </div>
                  <p className="flex flex-1 items-center py-6 text-[clamp(1.3rem,3.2vw,1.75rem)] font-semibold leading-[1.3] tracking-[-0.015em]">
                    {current.definition}
                  </p>
                  <div className="border-l-2 border-teal pl-3">
                    <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream-muted">
                      Example
                    </div>
                    <p className="mt-1 text-[0.95rem] leading-[1.5]">{current.example}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => rate("learning")}
                disabled={!revealed}
                className="rounded-[14px] border border-coral/35 bg-coral-tint px-3 py-3.5 text-center transition-[background-color,opacity] hover:bg-coral/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-coral-tint"
              >
                <span className="block text-[0.95rem] font-semibold text-coral">Still learning</span>
                <span className="mt-0.5 block text-[0.72rem] text-text-muted">
                  Comes back at the end<span className="hidden md:inline"> · press 1</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => rate("knew")}
                disabled={!revealed}
                className="rounded-[14px] border border-teal/35 bg-teal-tint px-3 py-3.5 text-center transition-[background-color,opacity] hover:bg-teal/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-teal-tint"
              >
                <span className="block text-[0.95rem] font-semibold text-teal">I knew it</span>
                <span className="mt-0.5 block text-[0.72rem] text-text-muted">
                  Next card<span className="hidden md:inline"> · press 2</span>
                </span>
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-[0.8rem] font-medium">
              <button
                type="button"
                onClick={() => goTo(pos - 1)}
                disabled={pos === 0}
                className="px-1 py-1 text-text-muted transition-colors hover:text-text-primary disabled:opacity-0"
              >
                ← Back
              </button>
              {!revealed && <span className="text-text-muted-2">Flip the card to rate it</span>}
              <button
                type="button"
                onClick={() => goTo(pos + 1)}
                className="px-1 py-1 text-text-muted transition-colors hover:text-text-primary"
              >
                Skip →
              </button>
            </div>
          </div>

          {/* Side panel */}
          <aside className="flex flex-col gap-4 lg:pt-[2.1rem]">
            <div className="rounded-[18px] border border-line bg-panel-2 p-5">
              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-text-muted-2">
                This round
              </div>
              <ul className="mt-4 flex flex-col gap-3 text-[0.9rem]">
                {(
                  [
                    ["bg-teal", "Knew it", knew.length],
                    ["bg-coral", "Still learning", learning.length],
                    ["bg-line-strong", "To go", toGo],
                  ] as const
                ).map(([dot, label, n]) => (
                  <li key={label} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />
                    <span className="text-text-muted">{label}</span>
                    <b className="ml-auto font-semibold tabular-nums">{n}</b>
                  </li>
                ))}
              </ul>
              <div className="mt-5 hidden border-t border-line pt-4 text-[0.78rem] leading-[1.9] text-text-muted-2 md:block">
                <Kbd>Space</Kbd> flip · <Kbd>1</Kbd> still learning · <Kbd>2</Kbd> knew it ·{" "}
                <Kbd>←</Kbd> <Kbd>→</Kbd> move
              </div>
            </div>

            {SIGNUPS_OPEN && (
              <div className="rounded-[18px] border border-teal/40 bg-gradient-to-br from-teal/[0.08] to-blue/[0.08] p-5">
                <h2 className="text-[1.05rem] font-bold">Keep these words?</h2>
                <p className="mt-1.5 text-[0.86rem] leading-[1.55] text-text-muted">
                  Save your &ldquo;still learning&rdquo; cards to a daily review in the Study Brew
                  app.
                </p>
                <a
                  href={APP_WELCOME_URL}
                  className="mt-4 inline-flex items-center justify-center rounded-[9px] bg-teal px-4 py-2.5 text-[0.85rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
                >
                  Sign up free
                </a>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-[5px] border border-line-strong bg-panel px-1.5 py-0.5 font-sans text-[0.72rem] text-text-muted">
      {children}
    </kbd>
  );
}

function Finished({
  name,
  knew,
  total,
  learningWords,
  onStudyAgain,
}: {
  name: string;
  knew: number;
  total: number;
  learningWords: string[];
  onStudyAgain: () => void;
}) {
  const n = learningWords.length;
  let line: string;
  if (knew === total) line = "Every single one. Nice brew.";
  else if (n === 0) line = "Nice brew. Start over to see the cards you skipped.";
  else if (n === 1)
    line = "Nice brew. This one is still learning, so give it another go or save it for later.";
  else
    line = `Nice brew. These ${n} are still learning, so give them another go or save them for later.`;

  return (
    <section className="mt-8 grid items-center gap-8 rounded-[22px] border border-line-strong bg-panel p-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12 md:p-10">
      <Cup
        id="deck-cup"
        fraction={0.8}
        ariaLabel="A nearly full cup"
        className="mx-auto w-[150px] md:w-[200px]"
      />
      <div>
        <div className="mb-4 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
          <span className="h-px w-5 shrink-0 bg-teal-dim" />
          <span>Deck finished</span>
        </div>
        <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          You knew {knew} of {total} {deckNoun(name)}.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[1rem] leading-[1.6] text-text-muted">{line}</p>

        {n > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {learningWords.map((word) => (
              <li
                key={word}
                className="rounded-full border border-coral/35 bg-coral-tint px-3 py-1 text-[0.84rem] font-medium text-coral"
              >
                {word}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {n > 0 && (
            <button
              type="button"
              onClick={onStudyAgain}
              className="inline-flex items-center justify-center rounded-[10px] bg-teal px-5 py-3 text-[0.92rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
            >
              {n === 1 ? "Study this one again" : `Study these ${n} again`}
            </button>
          )}
          <Link
            href="/flashcards"
            className="inline-flex items-center justify-center rounded-[10px] border border-line-strong px-5 py-3 text-[0.92rem] font-semibold transition-colors hover:bg-panel-hover"
          >
            Pick another deck
          </Link>
        </div>
      </div>
    </section>
  );
}
