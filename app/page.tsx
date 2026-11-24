import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Cup from "@/components/Cup";
import FeatureShowcase from "@/components/FeatureShowcase";
import {
  FileIcon,
  HeadphonesIcon,
  ICON_TILE,
  LinkIcon,
  PencilIcon,
  type TileColor,
} from "@/components/Icons";
import { APP_WELCOME_URL, SIGNUPS_OPEN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Study Brew | Note-Taking App for English Learners",
  description:
    "A note-taking app for English learners: import any text, save the words you don't know, and review them daily. With graded stories and reads.",
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

const SOURCES: {
  icon: (p: { className?: string }) => React.ReactNode;
  color: TileColor;
  title: string;
  sub: string;
}[] = [
  { icon: LinkIcon, color: "blue", title: "A web page", sub: "news-site.com/why-we-sleep" },
  { icon: FileIcon, color: "coral", title: "A file", sub: "class-notes-week-3.docx" },
  { icon: PencilIcon, color: "yellow", title: "Your own note", sub: "Write or paste any text" },
  {
    icon: HeadphonesIcon,
    color: "teal",
    title: "Stories & reads",
    sub: "Ready to read, at your level",
  },
];

const NOTE_WORDS = [
  { word: "theory", def: "an idea that explains something" },
  { word: "memory", def: "the ability to remember" },
  { word: "argue", def: "to disagree in words" },
];

const AVATARS = [
  { slug: "anna", name: "Anna" },
  { slug: "daniel", name: "Daniel" },
  { slug: "luna", name: "Luna" },
  { slug: "marco", name: "Marco" },
  { slug: "princess-maja", name: "Princess Maja" },
  { slug: "caspian", name: "Caspian" },
];

const BUTTON =
  "inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-[0.95rem] font-semibold transition-[opacity,background-color]";
const BUTTON_PRIMARY = `${BUTTON} bg-teal text-teal-ink hover:opacity-90`;
const BUTTON_OUTLINE = `${BUTTON} border border-line-strong text-text-primary hover:bg-panel-hover`;

/** Teal-underlined saved word inside the demo note. */
function Saved({ children }: { children: React.ReactNode }) {
  return (
    <span className="underline decoration-teal decoration-2 underline-offset-[5px]">
      {children}
    </span>
  );
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-muted-2">
      {children}
    </div>
  );
}

/** Dashed connector between flow columns (desktop only). */
function Connector({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 hidden w-10 border-t-2 border-dashed border-line-strong min-[900px]:block ${
        side === "left" ? "-left-10" : "-right-10"
      }`}
    />
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 pb-16 pt-12 text-center md:px-14 md:pb-24 md:pt-20">
        <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[rgba(242,196,107,0.45)] px-4 py-2 text-[15px] font-semibold leading-none text-[#F2C46B] md:mb-8 md:px-5 md:py-2.5 md:text-[16px]">
          <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#F2C46B]" />
          Now in Beta
        </span>
        <div className="mb-6 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
          <span className="h-px w-5 shrink-0 bg-teal-dim" />
          <span>Read anything. Keep the words.</span>
        </div>
        <h1 className="text-[clamp(3rem,9vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.035em] [text-wrap:balance]">
          A note-taking app <br className="hidden sm:inline" />
          for <span className="text-teal">English learners.</span>
        </h1>
        <p className="mt-7 max-w-[54ch] text-[1.06rem] leading-[1.65] text-text-muted">
          Bring in a web page, a Word file, your class notes or one of our stories. Tap the
          words you don&apos;t know, and Study Brew turns them into a quick daily review.
        </p>

        <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          {SIGNUPS_OPEN ? (
            <a href={APP_WELCOME_URL} className={BUTTON_PRIMARY}>
              Sign up free
            </a>
          ) : (
            <Link href="/roadmap" className={BUTTON_PRIMARY}>
              See the roadmap
            </Link>
          )}
          <a href="#how" className={BUTTON_OUTLINE}>
            See how it works
          </a>
        </div>
        {!SIGNUPS_OPEN && (
          <p className="mt-4 text-[0.84rem] text-text-muted-2">
            Opening soon. Follow along on the{" "}
            <Link href="/roadmap" className="underline underline-offset-2 hover:text-text-primary">
              roadmap
            </Link>
            .
          </p>
        )}

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-[0.82rem] font-medium text-text-muted">
          {(
            [
              ["bg-teal", "Free to start"],
              ["bg-blue", "Works in China"],
              ["bg-coral", "No ads, no AI"],
            ] as const
          ).map(([dot, label]) => (
            <li key={label} className="flex items-center gap-2">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* How it works: bring in → note → review */}
      <section
        id="how"
        aria-label="How Study Brew works"
        className="mx-auto w-full max-w-[1180px] scroll-mt-24 px-6 pb-16 md:px-14 md:pb-24"
      >
        <div className="grid grid-cols-1 items-center gap-10 min-[900px]:grid-cols-[240px_minmax(0,1fr)_200px]">
          {/* Bring in */}
          <div>
            <ColumnLabel>Bring in</ColumnLabel>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 min-[900px]:grid-cols-1">
              {SOURCES.map(({ icon: Icon, color, title, sub }) => (
                <li
                  key={title}
                  className="flex items-center gap-3 rounded-[14px] border border-line bg-panel-2 p-3"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${ICON_TILE[color]}`}
                  >
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.88rem] font-semibold">{title}</div>
                    <div className="truncate text-[0.76rem] text-text-muted-2">{sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* The note */}
          <div className="relative min-w-0">
            <Connector side="left" />
            <Connector side="right" />
            <div className="overflow-hidden rounded-[20px] border border-line-strong bg-panel text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
                <div className="min-w-0 truncate text-[0.78rem] text-text-muted-2">
                  My notebook <span className="px-1">/</span>
                  <span className="text-text-muted">Why we sleep</span>
                </div>
                <span className="shrink-0 rounded-md border border-line px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.08em] text-text-muted-2">
                  NEWS-SITE.COM
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_175px]">
                <div className="px-5 pb-10 pt-5 md:px-6">
                  <h3 className="text-[1.45rem] font-bold leading-tight">Why we sleep</h3>
                  <div className="mt-1.5 text-[0.74rem] text-text-muted-2">
                    Imported from a link · 640 words · Saved
                  </div>
                  <p className="mt-4 text-[0.95rem] leading-[1.85] text-text-muted">
                    Scientists still <Saved>argue</Saved> about why we sleep. One{" "}
                    <Saved>theory</Saved> says the brain uses the night to tidy up what it
                    learned during the day. Without enough rest, our <Saved>memory</Saved> gets
                    worse, and small tasks feel much{" "}
                    <span className="relative inline-block rounded bg-blue/20 px-1 text-text-primary">
                      harder
                      <span className="absolute left-1/2 top-[calc(100%+6px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-semibold leading-none text-ink shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]">
                        + Save word
                      </span>
                    </span>
                    .
                  </p>
                </div>
                <div className="border-t border-line bg-panel-2 p-4 sm:border-l sm:border-t-0">
                  <div className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-text-muted-2">
                    Words in this note · {NOTE_WORDS.length}
                  </div>
                  <ul className="flex flex-col gap-3">
                    {NOTE_WORDS.map(({ word, def }) => (
                      <li key={word}>
                        <div className="text-[0.88rem] font-semibold">{word}</div>
                        <div className="text-[0.74rem] leading-snug text-text-muted">{def}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Then review */}
          <div className="flex flex-col items-center text-center">
            <div className="self-stretch text-left min-[900px]:text-center">
              <ColumnLabel>Then review</ColumnLabel>
            </div>
            <Cup
              id="home-cup"
              fraction={0.5}
              ariaLabel="A cup half full of words to review"
              className="w-[150px]"
            />
            <div className="mt-3 text-[0.95rem] font-bold text-yellow">Espresso</div>
            <div className="mt-0.5 text-[0.9rem] font-semibold">12 words in your cup</div>
            <div className="mt-1 text-[0.8rem] text-text-muted">A quick sip and it&apos;s done.</div>
            <span className="mt-4 inline-flex cursor-default select-none items-center rounded-[9px] border border-line-strong px-4 py-2 text-[0.8rem] font-semibold">
              Take a sip
            </span>
          </div>
        </div>
      </section>

      {/* Product features: interactive showcase */}
      <FeatureShowcase />

      {/* Flashcards teaser */}
      <section className="mx-auto w-full max-w-[1120px] px-6 py-14 md:px-14 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[20ch] text-[clamp(1.8rem,3vw,2.4rem)] font-bold">
              Public decks, free to browse.
            </h2>
            <p className="mt-2 max-w-[40ch] leading-[1.6] text-text-muted">
              Verbs, everyday words, and grammar. No signup needed to start
              learning.
            </p>
          </div>
          <Link
            href="/flashcards"
            className="whitespace-nowrap border-b border-teal-dim pb-0.5 font-medium text-[0.78rem] text-teal"
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
              <div className="font-medium text-[0.72rem] text-text-muted-2">
                {card.kind}
              </div>
              <div className="text-[1.4rem] font-bold">{card.word}</div>
              <div className="font-medium text-[0.72rem] text-blue">{card.pos}</div>
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
              Short, calm audio stories, where a lot of your flashcards will
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
                className={`relative h-[52px] w-[52px] overflow-hidden rounded-full border-2 border-background bg-panel-2 transition-transform duration-200 hover:z-10 hover:-translate-y-1 motion-reduce:transition-none ${
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
            className="shrink-0 rounded-full border border-line px-[1.1rem] py-[0.6rem] font-medium text-[0.78rem] text-text-muted"
          >
            Listen to stories
          </Link>
        </div>
      </section>

    </main>
  );
}
