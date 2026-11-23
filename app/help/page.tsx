import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  BookIcon,
  BookmarkIcon,
  CupIcon,
  FolderIcon,
  HeadphonesIcon,
  ImportIcon,
  ShieldIcon,
  SproutIcon,
} from "@/components/Icons";
import { helpArticleHref } from "@/lib/help";

const IMPORT_ARTICLE = helpArticleHref({ topic: "notes-notebooks", slug: "import-into-a-note" });
const GET_STARTED_ARTICLE = helpArticleHref({ topic: "getting-started", slug: "get-started-in-5-minutes" });
const REVIEW_ARTICLE = helpArticleHref({ topic: "words-review", slug: "how-reviewing-works" });
const TAP_WORD_ARTICLE = helpArticleHref({ topic: "words-review", slug: "tap-a-word-save-it" });

export const metadata: Metadata = {
  title: "Help | Study Brew",
  description:
    "Short guides for notes, words, reviews, stories and your account — with previews of where each thing happens in the app.",
};

const RAIL = [
  { label: "Start here", count: 3, color: "bg-teal", active: true },
  { label: "Notes & notebooks", count: 9, color: "bg-blue" },
  { label: "Words & review", count: 11, color: "bg-coral" },
  { label: "Stories & audio", count: 7, color: "bg-yellow" },
  { label: "Account & plans", count: 8, color: "bg-teal" },
  { label: "Privacy & data", count: 5, color: "bg-blue" },
];

const GUIDES: {
  number: string;
  icon: (p: { className?: string }) => React.ReactNode;
  color: string;
  title: string;
  body: string;
  href?: string;
}[] = [
  {
    number: "01",
    icon: BookIcon,
    color: "teal",
    title: "Get started in 5 minutes",
    body: "Read a short story, tap a word and save it — no account needed.",
    href: GET_STARTED_ARTICLE,
  },
  {
    number: "02",
    icon: ImportIcon,
    color: "blue",
    title: "Bring in your own text",
    body: "Import a web page, PDF, Word file or pasted text as a note.",
    href: IMPORT_ARTICLE,
  },
  {
    number: "03",
    icon: CupIcon,
    color: "yellow",
    title: "How reviewing works",
    body: "Why saved words return tomorrow, what the cup means, how streaks count.",
    href: REVIEW_ARTICLE,
  },
];

const TILE: Record<string, string> = {
  teal: "bg-teal/15 text-teal",
  blue: "bg-blue/15 text-blue",
  coral: "bg-coral/15 text-coral",
  yellow: "bg-yellow/15 text-yellow",
};

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

type DemoKind = "skeleton" | "import" | "definition" | "audio" | "plan" | "privacy";

const TOPICS: {
  title: string;
  body: string;
  icon: (p: { className?: string }) => React.ReactNode;
  color: keyof typeof TILE;
  count: number;
  demo: DemoKind;
  href?: string;
}[] = [
  {
    title: "Getting started",
    body: "First five minutes, guest mode, making an account.",
    icon: SproutIcon,
    color: "teal",
    count: 6,
    demo: "skeleton",
    href: GET_STARTED_ARTICLE,
  },
  {
    title: "Notes & notebooks",
    body: "Importing links and files, folders, search and trash.",
    icon: FolderIcon,
    color: "blue",
    count: 9,
    demo: "import",
    href: IMPORT_ARTICLE,
  },
  {
    title: "Words & review",
    body: "Definitions, statuses, decks, exports and the cup.",
    icon: BookmarkIcon,
    color: "coral",
    count: 11,
    demo: "definition",
    href: REVIEW_ARTICLE,
  },
  {
    title: "Stories & audio",
    body: "Listening with the transcript, levels, saved words.",
    icon: HeadphonesIcon,
    color: "yellow",
    count: 7,
    demo: "audio",
  },
  {
    title: "Account & plans",
    body: "Beta codes, Plus, details and deleting your data.",
    icon: UserIcon,
    color: "teal",
    count: 8,
    demo: "plan",
  },
  {
    title: "Privacy & data",
    body: "What Study Brew stores, and how to export or delete it.",
    icon: ShieldIcon,
    color: "blue",
    count: 5,
    demo: "privacy",
  },
];

function TopicDemo({ kind }: { kind: DemoKind }) {
  if (kind === "skeleton") {
    return (
      <>
        <span className="block h-[5px] w-[82%] rounded-full bg-line-strong" />
        <span className="mt-1.5 block h-[5px] w-[64%] rounded-full bg-line-strong" />
      </>
    );
  }
  if (kind === "import") {
    return (
      <div className="text-[0.68rem] text-text-primary">
        Import into a note
        <span className="mt-0.5 block text-[0.63rem] font-normal text-text-muted">
          Web page · PDF · Word · text
        </span>
      </div>
    );
  }
  if (kind === "definition") {
    return (
      <div className="text-[0.68rem] font-bold text-text-primary">
        theory <span className="font-medium text-blue">noun</span>
        <span className="mt-0.5 block text-[0.63rem] font-normal leading-[1.35] text-text-muted">
          an idea that explains something · saved word
        </span>
      </div>
    );
  }
  if (kind === "audio") {
    return (
      <>
        <div className="flex items-center gap-2">
          <img src="/characters/anna.svg" alt="" className="h-[34px] w-[34px] rounded-lg bg-panel-2" />
          <span aria-hidden="true" className="relative h-1 flex-1 rounded-full bg-line-strong">
            <span className="absolute inset-y-0 left-0 w-[45%] rounded-full bg-teal" />
          </span>
        </div>
        <div className="mt-1.5 text-[0.62rem] leading-[1.3] text-text-muted-2">
          ▶ Anna misses her train
          <br />
          2:14 / 5:03
        </div>
      </>
    );
  }
  if (kind === "plan") {
    return (
      <>
        <div className="flex items-center gap-2 text-[0.68rem] text-text-muted">
          Free
          <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6rem] font-bold text-teal">
            PLUS · BETA
          </span>
        </div>
        <span className="mt-3 block h-[5px] w-[64%] rounded-full bg-line-strong" />
      </>
    );
  }
  return (
    <div className="flex items-center gap-2 text-[0.68rem] leading-[1.35] text-text-muted">
      <LockIcon className="h-[18px] w-[18px] shrink-0 text-teal" />
      <span>
        <b className="font-bold text-text-primary">Your words stay yours</b> · export or delete any time
      </span>
    </div>
  );
}

const FAQ = [
  {
    q: "Do I need an account to try it?",
    a: "No. Read any public story and save a word as a guest. An account keeps your notes, words and streak when you come back.",
  },
  {
    q: "Does Study Brew use AI for definitions?",
    a: "No. Definitions come from free dictionaries imported into the app, plus meanings learners save over time. No AI writes your notes or speaks the stories.",
  },
  {
    q: "Where does story audio load from?",
    a: "From Study Brew itself. You don't need another account or app to listen — just press play next to the story.",
  },
  {
    q: "When do saved words come back?",
    a: "Words you save are due the next day, then on a spaced-repetition schedule. The cup on Today shows how many are waiting.",
  },
  {
    q: "Is there a phone app?",
    a: "The app works in the browser on your phone with a mobile menu. Native iPad, iPhone and Mac apps are on the roadmap.",
  },
];

const CHIPS: { label: string; href?: string }[] = [
  { label: "Import a note", href: IMPORT_ARTICLE },
  { label: "Definitions", href: TAP_WORD_ARTICLE },
  { label: "The cup", href: REVIEW_ARTICLE },
  { label: "Beta codes" },
];

const CHIP_CLASS = "rounded-full border border-line px-3 py-1.5 text-[0.75rem] text-text-muted";

export default function HelpPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pb-9 pt-14 md:px-14 md:pt-16">
        <div className="grid items-center gap-9 min-[820px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[820px]:gap-11">
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">Help center</div>
            <h1 className="mt-3.5 text-[clamp(2.1rem,4.8vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.04em]">
              What can we help <br className="hidden sm:inline" />
              you figure out?
            </h1>
            <p className="mt-3 max-w-[48ch] text-[0.95rem] leading-[1.6] text-text-muted">
              Pick a topic and see the answers in context — with little previews of where each thing happens in the app.
            </p>

            <div className="mt-6 flex max-w-[540px] items-center gap-3 rounded-[13px] border border-line-strong bg-panel-2 px-4 py-3.5 text-left text-[0.9rem] text-text-muted-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[18px] w-[18px] shrink-0"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
              <span>Search for an answer…</span>
              <kbd className="ml-auto rounded border border-line-strong px-1.5 py-0.5 font-sans text-[0.72rem]">⌘ K</kbd>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {CHIPS.map((chip) =>
                chip.href ? (
                  <Link key={chip.label} href={chip.href} className={CHIP_CLASS}>
                    {chip.label}
                  </Link>
                ) : (
                  <span key={chip.label} className={CHIP_CLASS}>
                    {chip.label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* "New here?" preview */}
          <div className="rounded-[18px] border border-line-strong bg-panel-2 p-[18px]">
            <div className="mb-3 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-text-muted-2">New here?</div>
            <div className="rounded-xl border border-line-strong bg-panel p-3.5">
              <div className="mb-2 text-[0.62rem] tracking-[0.06em] text-text-muted-2">MY NOTEBOOK / WHY WE SLEEP</div>
              <div className="text-[0.92rem] font-bold">Why we sleep</div>
              <p className="mt-1.5 text-[0.73rem] leading-[1.75] text-text-muted">
                Scientists still <span className="border-b-2 border-teal pb-px">argue</span> about why we sleep. One{" "}
                <span className="border-b-2 border-teal pb-px">theory</span> says the brain uses the night to tidy up.
              </p>
            </div>
            <span className="mt-3.5 inline-flex items-center gap-2 text-[0.8rem] font-semibold text-teal">
              Take the 2-minute tour →
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pb-20 md:px-14">
        <div className="grid gap-8 min-[820px]:grid-cols-[190px_minmax(0,1fr)] min-[820px]:gap-8">
          {/* Topic rail */}
          <aside className="self-start min-[820px]:sticky min-[820px]:top-24">
            <div className="mb-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-text-muted-2">Topics</div>
            <div className="flex flex-col gap-0.5">
              {RAIL.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[0.8rem] ${
                    item.active ? "bg-panel text-text-primary" : "text-text-muted"
                  }`}
                >
                  <span aria-hidden="true" className={`h-[7px] w-[7px] shrink-0 rounded-full ${item.color}`} />
                  <span className="truncate">{item.label}</span>
                  <span className="ml-auto text-[0.7rem] text-text-muted-2">{item.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[14px] border border-line-strong bg-panel-2 p-4">
              <div className="text-[0.9rem] font-bold">Still stuck?</div>
              <p className="mt-1.5 text-[0.76rem] leading-[1.55] text-text-muted">
                Real questions shape what gets fixed next.
              </p>
              <span className="mt-3 block w-full rounded-[9px] bg-teal px-3.5 py-2 text-center text-[0.78rem] font-semibold text-teal-ink">
                Contact us →
              </span>
            </div>
          </aside>

          <div>
            {/* Start here */}
            <h2 className="text-[1.35rem] font-bold tracking-[-0.03em]">Start with these</h2>
            <p className="mb-4 mt-1 text-[0.82rem] text-text-muted">The three things worth knowing in your first week.</p>
            <div className="overflow-hidden rounded-2xl border border-line bg-panel-2">
              {GUIDES.map((guide) => {
                const Icon = guide.icon;
                const rowClass = "flex items-center gap-3.5 border-b border-line px-4 py-4 last:border-b-0";
                const inner = (
                  <>
                    <span className="w-5 shrink-0 text-[0.72rem] font-bold text-text-muted-2">{guide.number}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] ${TILE[guide.color]}`}>
                      <Icon className="h-[19px] w-[19px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.92rem] font-bold tracking-[-0.02em]">{guide.title}</span>
                      <span className="mt-0.5 block text-[0.8rem] leading-[1.45] text-text-muted">{guide.body}</span>
                    </span>
                    <span className="shrink-0 text-teal" aria-hidden="true">
                      →
                    </span>
                  </>
                );
                return guide.href ? (
                  <Link key={guide.number} href={guide.href} className={rowClass}>
                    {inner}
                  </Link>
                ) : (
                  <div key={guide.number} className={rowClass}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Topic cards */}
            <div className="mt-10">
              <h2 className="text-[1.35rem] font-bold tracking-[-0.03em]">Pick a topic</h2>
              <p className="mb-4 mt-1 text-[0.82rem] text-text-muted">
                Each card shows where the answer lives in the app.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const cardClass = "rounded-[15px] border border-line bg-panel-2 p-4";
                  const inner = (
                    <>
                      <span className={`mb-3 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] ${TILE[topic.color]}`}>
                        <Icon className="h-[19px] w-[19px]" />
                      </span>
                      <h3 className="text-[0.94rem] font-bold tracking-[-0.02em]">{topic.title}</h3>
                      <p className="mb-0 mt-1 min-h-[3.4em] text-[0.78rem] leading-[1.45] text-text-muted">{topic.body}</p>
                      <div className="mt-3 h-[78px] overflow-hidden rounded-[9px] border border-line bg-panel p-2.5">
                        <TopicDemo kind={topic.demo} />
                      </div>
                      <span className="mt-3 inline-flex gap-1.5 text-[0.74rem] font-semibold text-teal">
                        {topic.count} answers →
                      </span>
                    </>
                  );
                  return topic.href ? (
                    <Link key={topic.title} href={topic.href} className={`block ${cardClass}`}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={topic.title} className={cardClass}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h2 className="mb-1 text-[1.35rem] font-bold tracking-[-0.03em]">Good to know</h2>
              <div className="border-t border-line">
                {FAQ.map((item, i) => (
                  <details key={item.q} className={`group border-b border-line`} open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[0.86rem] font-semibold [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="text-[1.1rem] leading-none text-teal group-open:hidden">+</span>
                      <span className="hidden text-[1.1rem] leading-none text-teal group-open:inline">−</span>
                    </summary>
                    <p className="mx-0.5 mb-3.5 text-[0.82rem] leading-[1.65] text-text-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
