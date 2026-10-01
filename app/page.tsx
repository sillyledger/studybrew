import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CaptureDemo from "@/components/CaptureDemo";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Study Brew | Note-Taking App for Language Learners",
  description:
    "A notebook for language learners: short B1–B2 audio stories, free flashcards, and pronunciation practice.",
};

const FLASHCARDS = [
  {
    kind: "Word",
    word: "procrastinate",
    pos: "verb",
    def: "to delay doing something you should be doing.",
    example: "I always procrastinate before exams.",
  },
  {
    kind: "Idiom",
    word: "break the ice",
    pos: "informal · social",
    def: "to ease tension when people first meet.",
    example: "He told a joke to break the ice.",
  },
  {
    kind: "Grammar",
    word: "used to + verb",
    pos: "past habit",
    def: "describes something that was true before, but isn't now.",
    example: "I used to live in Taipei.",
  },
];

const HOW_STEPS = [
  {
    tab: "01 — Capture",
    tabBg: "bg-teal",
    tabInk: "text-teal-ink",
    title: "Tap any word",
    body: "Reading a story or reviewing a deck, tap a word you don't know.",
  },
  {
    tab: "02 — Save",
    tabBg: "bg-blue",
    tabInk: "text-[#04203e]",
    title: "It becomes a note",
    body: "Definition and the exact sentence it came from — saved as a flashcard.",
  },
  {
    tab: "03 — Review",
    tabBg: "bg-coral",
    tabInk: "text-[#3a1608]",
    title: "Keep it in your head",
    body: "Spaced review brings it back right before you'd forget it.",
  },
] as const;

const TIMELINE = [
  { label: "Stories & flashcards", status: "Live now", state: "done" },
  { label: "Note capture, designed", status: "Complete", state: "done" },
  { label: "Building the notes core", status: "In progress", state: "active" },
  { label: "Private beta", status: "Up next", state: "upcoming" },
] as const;

const AVATARS = [
  { slug: "anna", name: "Anna" },
  { slug: "daniel", name: "Daniel" },
  { slug: "luna", name: "Luna" },
  { slug: "marco", name: "Marco" },
  { slug: "princess-maja", name: "Princess Maja" },
  { slug: "caspian", name: "Caspian" },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-12 px-6 pb-14 pt-12 md:grid-cols-[1.05fr_0.95fr] md:px-14 md:pb-24 md:pt-20">
        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
            <span className="h-px w-5 shrink-0 bg-teal-dim" />
            <span>Learn the language. Keep the words.</span>
          </div>
          <h1 className="text-[clamp(2.6rem,4.6vw,4.1rem)] font-black leading-[0.98] tracking-[-0.01em]">
            A notebook for <span className="text-teal">language learners.</span>
          </h1>
          <p className="mt-5 max-w-[42ch] text-[1.06rem] leading-[1.65] text-text-muted">
            Study Brew is becoming a notebook for language learners. A simple
            place to save new words as you learn, and come back to them when
            you&apos;re ready to review.
          </p>
          <WaitlistForm />
        </div>

        <CaptureDemo />
      </section>

      {/* How it works */}
      <section id="how" className="bg-background px-6 py-14 md:px-14 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-[46ch]">
            <div className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
              How it works
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold">
              Read it. Save it. <span className="text-teal">Keep it.</span>
            </h2>
            <p className="mt-3 text-text-muted">
              This is the sequence we&apos;re building toward — each step
              depends on the one before it.
            </p>
          </div>

          <div className="relative mt-[3.2rem] grid grid-cols-1 gap-[1.6rem] md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-[38px] z-0 hidden border-t-2 border-dashed border-line-soft md:block" />

            {HOW_STEPS.map((step, i) => (
              <div
                key={step.tab}
                className="relative rounded-2xl border border-line bg-panel pt-[2.4rem] transition-transform duration-300 ease-out hover:-translate-y-[5px]"
              >
                <span
                  className={`absolute -top-[14px] left-[1.6rem] z-[1] rounded-full px-[0.7rem] py-[0.35rem] font-mono text-[0.68rem] font-semibold ${step.tabBg} ${step.tabInk}`}
                >
                  {step.tab}
                </span>

                {i === 0 && (
                  <div className="mx-[1.6rem] mb-[1.4rem] flex h-[120px] items-center justify-center overflow-hidden rounded-[10px] bg-panel-2">
                    <div className="p-[0.9rem] text-[0.82rem] leading-[1.6] text-text-muted">
                      Daniel felt completely{" "}
                      <span className="rounded bg-teal-tint px-[3px] text-teal">
                        overwhelmed
                      </span>{" "}
                      on his first morning.
                    </div>
                  </div>
                )}

                {i === 1 && (
                  <div className="mx-[1.6rem] mb-[1.4rem] flex h-[120px] flex-col items-start justify-center overflow-hidden rounded-[10px] border border-teal-dim bg-teal-tint p-[0.8rem]">
                    <div className="font-mono text-[0.58rem] uppercase tracking-wide text-text-muted-2">
                      New word
                    </div>
                    <div className="text-[1.15rem] font-bold">overwhelmed</div>
                    <div className="mt-[0.3rem] text-[0.74rem] text-text-muted">
                      <b className="text-teal">adj.</b> too much to deal with
                      at once.
                    </div>
                  </div>
                )}

                {i === 2 && (
                  <div className="mx-[1.6rem] mb-[1.4rem] flex h-[120px] items-center justify-center overflow-hidden rounded-[10px] bg-panel-2">
                    <div className="flex gap-[10px]">
                      <span className="h-[14px] w-[14px] rounded-full border-2 border-teal bg-teal" />
                      <span className="h-[14px] w-[14px] rounded-full border-2 border-teal bg-teal" />
                      <span className="h-[14px] w-[14px] rounded-full border-2 border-coral ring-[3px] ring-coral-tint" />
                      <span className="h-[14px] w-[14px] rounded-full border-2 border-line" />
                      <span className="h-[14px] w-[14px] rounded-full border-2 border-line" />
                    </div>
                  </div>
                )}

                <div className="px-[1.6rem] pb-[1.6rem]">
                  <h3 className="mb-[0.4rem] text-[1.15rem] font-bold">
                    {step.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.55] text-text-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flashcards teaser */}
      <section className="mx-auto w-full max-w-[1120px] px-6 py-14 md:px-14 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[20ch] text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold">
              Public decks, free to browse.
            </h2>
            <p className="mt-2 max-w-[40ch] leading-[1.6] text-text-muted">
              Verbs, everyday words, and grammar — no signup needed to start
              learning.
            </p>
          </div>
          <Link
            href="/flashcards"
            className="whitespace-nowrap border-b border-teal-dim pb-0.5 font-mono text-[0.78rem] text-teal"
          >
            Browse all flashcards →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FLASHCARDS.map((card) => (
            <div
              key={card.word}
              className="flex flex-col gap-2 rounded-2xl border border-line bg-panel p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-teal-dim"
            >
              <div className="font-mono text-[0.64rem] uppercase tracking-wide text-text-muted-2">
                {card.kind}
              </div>
              <div className="text-[1.4rem] font-bold">{card.word}</div>
              <div className="font-mono text-[0.72rem] text-blue">{card.pos}</div>
              <div className="mt-0.5 text-[0.86rem] leading-[1.55] text-text-muted">
                {card.def}
              </div>
              <div className="text-[0.82rem] italic text-text-muted-2">
                &quot;{card.example}&quot;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stories teaser */}
      <section className="bg-background px-6 py-14 md:px-14 md:py-24">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Stories are still here.
            </h2>
            <p className="mt-1.5 max-w-[38ch] text-[0.92rem] text-text-muted-2">
              Short, calm audio stories — where a lot of your flashcards will
              come from.
            </p>
          </div>
          <div className="flex">
            {AVATARS.map((avatar, i) => (
              <Link
                key={avatar.slug}
                href={`/stories/characters/${avatar.slug}`}
                title={avatar.name}
                aria-label={avatar.name}
                className={`relative h-[52px] w-[52px] overflow-hidden rounded-full border-2 border-background bg-[#0f1319] transition-transform duration-200 hover:z-10 hover:-translate-y-1 motion-reduce:transition-none ${
                  i === 0 ? "" : "-ml-3"
                }`}
              >
                <img
                  src={`/characters/${avatar.slug}.svg`}
                  alt=""
                  className="h-full w-full scale-[1.22]"
                />
              </Link>
            ))}
          </div>
          <Link
            href="/stories"
            className="shrink-0 rounded-full border border-line px-[1.1rem] py-[0.6rem] font-mono text-[0.78rem] text-text-muted"
          >
            Listen to stories
          </Link>
        </div>
      </section>

      {/* App status band */}
      <section
        id="waitlist"
        className="bg-background px-6 py-14 md:px-14 md:py-24"
      >
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold leading-[1.08]">
              The notes app is <span className="text-teal">in development.</span>
            </h2>
            <p className="mt-4 max-w-[38ch] leading-[1.65] text-text-muted">
              Stories and flashcards are ready today. The part that ties them
              together — your own running notebook of every word you&apos;ve
              learned — is what we&apos;re building next.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-panel p-7">
            {TIMELINE.map((item, i) => (
              <div
                key={item.label}
                className={`relative border-l pl-6 ${
                  i === TIMELINE.length - 1 ? "border-transparent" : "border-line pb-6"
                }`}
              >
                <div
                  className={`absolute -left-[5px] top-0.5 h-[9px] w-[9px] rounded-full border-2 border-panel ${
                    item.state === "done"
                      ? "bg-teal"
                      : item.state === "active"
                        ? "bg-coral ring-[3px] ring-coral-tint"
                        : "bg-text-muted-2"
                  }`}
                />
                <b className="mb-0.5 block text-[0.92rem] font-semibold">
                  {item.label}
                </b>
                <span
                  className={`font-mono text-[0.74rem] ${
                    item.state === "active" ? "text-coral" : "text-text-muted"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
