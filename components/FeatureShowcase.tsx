"use client";

import { useState } from "react";
import Link from "next/link";
import Cup from "@/components/Cup";
import {
  BookIcon,
  BookmarkIcon,
  CupIcon,
  FolderIcon,
  ICON_TILE,
  ImportIcon,
  ListIcon,
  type TileColor,
} from "@/components/Icons";
import { APP_WELCOME_URL } from "@/lib/site";

type FeatureId = "import" | "word" | "notebooks" | "review" | "stories" | "words";

const FEATURES: {
  id: FeatureId;
  icon: (p: { className?: string }) => React.ReactNode;
  color: TileColor;
  title: string;
  body: string;
  label: string;
}[] = [
  {
    id: "import",
    icon: ImportIcon,
    color: "blue",
    title: "Import anything",
    body: "A link, a file, or pasted text becomes a clean note.",
    label: "IMPORT · NOTE CREATION",
  },
  {
    id: "word",
    icon: BookmarkIcon,
    color: "teal",
    title: "Tap a word, save it",
    body: "Meanings right under the word, written for learners.",
    label: "WORDS · DEFINITIONS",
  },
  {
    id: "notebooks",
    icon: FolderIcon,
    color: "yellow",
    title: "Notebooks & folders",
    body: "Keep notes by class, topic or goal. Find anything with ⌘K.",
    label: "NOTES · ORGANISATION",
  },
  {
    id: "review",
    icon: CupIcon,
    color: "teal",
    title: "A daily review",
    body: "Your saved words fill a cup. Take a sip, keep your streak.",
    label: "REVIEW · THE CUP",
  },
  {
    id: "stories",
    icon: BookIcon,
    color: "coral",
    title: "Stories & reads",
    body: "Graded texts, read or listen, then save words from them.",
    label: "STORIES · AUDIO",
  },
  {
    id: "words",
    icon: ListIcon,
    color: "blue",
    title: "Your words, your way",
    body: "One list. Move words into decks, export to CSV or Excel.",
    label: "WORDS · DECKS & EXPORT",
  },
];

// Small pieces shared by the preview mockups.
const MINI_BUTTON =
  "rounded-lg bg-teal px-3 py-1.5 text-[0.72rem] font-bold text-teal-ink transition-opacity hover:opacity-90";
const MINI_OUTLINE =
  "rounded-lg border border-line-strong px-3 py-1.5 text-[0.72rem] font-semibold text-text-primary transition-colors hover:bg-panel-hover";
const PILL =
  "shrink-0 rounded-md border border-line-strong px-1.5 py-0.5 text-[0.6rem] font-bold tracking-[0.08em]";
const FRAME = "overflow-hidden rounded-[14px] border border-line-strong bg-panel-2";
const BAR = "flex items-center justify-between gap-2 border-b border-line px-3 py-2 text-[0.68rem] text-text-muted-2";
const CAP = "mt-3.5 text-[0.73rem] leading-[1.5] text-text-muted-2";
const CAP_LINK = "border-b border-teal-dim pb-px font-medium text-teal";

function Caption({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <p className={CAP}>
      <b className="font-semibold text-text-primary">{lead}</b> {children}
    </p>
  );
}

function ImportPreview() {
  return (
    <>
      <div className={FRAME}>
        <div className={BAR}>
          <b className="font-semibold text-text-muted">Import into a note</b>
          <span className={PILL}>NEW</span>
        </div>
        <div className="flex flex-wrap gap-1.5 px-3 pt-3">
          <span className={MINI_BUTTON}>Paste a link</span>
          <span className={MINI_OUTLINE}>Upload a file</span>
          <span className={MINI_OUTLINE}>Paste text</span>
        </div>
        <div className="mx-3 mt-3 rounded-lg border border-line-strong px-3 py-2.5 text-[0.76rem] text-text-muted">
          news-site.com/why-we-sleep
        </div>
        <div className="mx-3 mb-3 mt-3 flex items-center justify-between gap-3">
          <small className="text-[0.67rem] text-text-muted-2">Web page · PDF · Word · text</small>
          <span className={MINI_BUTTON}>Import →</span>
        </div>
      </div>
      <Caption lead="ONE WAY IN.">
        Bring in a link, a class file or your own text. The note lands in a notebook, ready to mark up.{" "}
        <Link href="/#how" className={CAP_LINK}>
          See how it works →
        </Link>
      </Caption>
    </>
  );
}

function WordPreview() {
  return (
    <>
      <div className={FRAME}>
        <div className={BAR}>
          <span>
            My notebook <span className="px-1">/</span>
            <b className="font-semibold text-text-muted">Why we sleep</b>
          </span>
          <span className={PILL}>NEWS-SITE.COM</span>
        </div>
        <div className="px-3.5 pb-2.5 pt-3.5">
          <div className="text-[1rem] font-bold">Why we sleep</div>
          <div className="mt-0.5 text-[0.66rem] text-text-muted-2">
            Imported from a link · 640 words · Saved
          </div>
          <p className="mt-3 text-[0.78rem] leading-[1.9] text-text-muted">
            Scientists still <span className="underline decoration-teal decoration-2 underline-offset-[5px]">argue</span>{" "}
            about why we sleep. One{" "}
            <span className="rounded bg-teal/15 underline decoration-teal decoration-2 underline-offset-[5px]">
              theory
            </span>{" "}
            says the brain uses the night to tidy up what it learned during the day. Without enough rest, our{" "}
            <span className="underline decoration-teal decoration-2 underline-offset-[5px]">memory</span> gets worse, and
            small tasks feel much <span className="rounded bg-blue/20 px-1 text-text-primary">harder</span>.
          </p>
        </div>
        <div className="relative mx-3 mb-3 rounded-[10px] border border-line-strong bg-white p-3 text-ink shadow-[0_16px_30px_-12px_rgba(0,0,0,0.7)]">
          <span
            aria-hidden="true"
            className="absolute -top-1.5 left-7 h-2.5 w-2.5 rotate-45 border-l border-t border-line-strong bg-white"
          />
          <b className="text-[0.86rem]">theory</b>
          <span className="ml-1.5 text-[0.66rem] text-cream-muted">noun</span>
          <p className="mb-2 mt-1 text-[0.75rem] text-[#4a453e]">an idea that explains something</p>
          <span className={MINI_BUTTON}>+ Save word</span>
        </div>
      </div>
      <Caption lead="THE CORE LOOP.">
        Tap an unknown word → a simple definition appears → save it. Words in notes, reads and stories all go to the same
        place.{" "}
        <Link href="/stories" className={CAP_LINK}>
          Try a public story →
        </Link>
      </Caption>
    </>
  );
}

function NotebooksPreview() {
  const rows = [
    { name: "Class notes · Week 3", count: "8 notes", color: "bg-blue" },
    { name: "IELTS preparation", count: "14 notes", color: "bg-yellow" },
    { name: "Short stories", count: "23 notes", color: "bg-coral" },
    { name: "My notebook", count: "5 notes", color: "bg-teal" },
  ];
  return (
    <>
      <div className={FRAME}>
        <div className={BAR}>
          <b className="font-semibold text-text-muted">My notebook</b>
          <span className={PILL}>⌘K</span>
        </div>
        <div className="mx-3 mt-3 flex items-center justify-between rounded-lg border border-line-strong px-3 py-2 text-[0.72rem] text-text-muted-2">
          <span>Search notes and words…</span>
          <kbd className="rounded border border-line-strong px-1.5 py-px font-sans text-[0.68rem] text-text-muted">⌘ K</kbd>
        </div>
        <ul className="mt-3">
          {rows.map((row) => (
            <li key={row.name} className="flex items-center gap-2.5 border-b border-line px-3 py-2.5 text-[0.78rem] last:border-b-0">
              <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${row.color}`} />
              <span className="truncate">{row.name}</span>
              <small className="ml-auto shrink-0 text-[0.68rem] text-text-muted-2">{row.count}</small>
            </li>
          ))}
        </ul>
      </div>
      <Caption lead="AT HOME IN A NOTEBOOK.">
        Learners who go DIY take notes, so notes and folders lead, not a curriculum. Every saved word remembers where it
        came from.{" "}
        <a href={APP_WELCOME_URL} className={CAP_LINK}>
          Open the app →
        </a>
      </Caption>
    </>
  );
}

function ReviewPreview() {
  return (
    <>
      <div className={`${FRAME} grid grid-cols-[150px_minmax(0,1fr)]`}>
        <div className="flex flex-col items-center justify-center border-r border-line px-2 py-4 text-center">
          <Cup
            id="features-cup"
            fraction={0.5}
            ariaLabel="A cup half full of words to review"
            className="w-[82px]"
          />
          <span className="mt-1 text-[0.7rem] font-bold text-yellow">Espresso</span>
          <span className="mt-0.5 text-[0.75rem] font-semibold">12 words in your cup</span>
          <span className={`${MINI_BUTTON} mt-2.5`}>Take a sip</span>
        </div>
        <div className="p-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <b className="text-[0.85rem]">Today&apos;s brew</b>
            <small className="text-[0.68rem] text-teal">1 of 2 done</small>
          </div>
          <p className="mb-2 mt-0.5 text-[0.68rem] text-text-muted">Do these and your streak keeps going.</p>
          <div className="flex items-center gap-2 border-t border-line py-2 text-[0.73rem]">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal text-[0.55rem] text-teal-ink">
              ✓
            </span>
            <span className="text-text-muted line-through decoration-text-muted-2">Review 12 words</span>
          </div>
          <div className="flex items-center gap-2 border-t border-line py-2 text-[0.73rem]">
            <span className="h-4 w-4 shrink-0 rounded-full border-2 border-line-strong" />
            <span>
              Save 5 new words <small className="text-text-muted-2">· 2 of 5 today</small>
            </span>
          </div>
          <div className="mt-1 border-t border-line pt-2 text-[0.7rem] font-semibold text-coral">● 7 day streak</div>
        </div>
      </div>
      <Caption lead="COME BACK TOMORROW.">
        Saved words return the next day, on a real spaced-repetition schedule. The cup and the streak make the habit
        visible.{" "}
        <Link href="/roadmap" className={CAP_LINK}>
          See the roadmap →
        </Link>
      </Caption>
    </>
  );
}

function StoriesPreview() {
  return (
    <>
      <div className={FRAME}>
        <div className={BAR}>
          <b className="font-semibold text-text-muted">Latest story</b>
          <span className={PILL}>A1–A2 · AUDIO</span>
        </div>
        <div className="flex gap-3 p-3.5">
          <img src="/characters/anna.svg" alt="" className="h-[72px] w-[72px] shrink-0 rounded-xl bg-panel object-cover" />
          <div className="min-w-0">
            <h3 className="text-[0.95rem] font-bold">Anna misses her train</h3>
            <p className="mt-1 text-[0.72rem] leading-[1.5] text-text-muted">
              Short, calm audio stories with recurring characters. Read along, tap a word, save it to your words.
            </p>
          </div>
        </div>
        <div className="mx-3.5 mb-3.5 flex items-center gap-2.5 rounded-[10px] border border-line-strong px-2.5 py-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal text-[0.6rem] text-teal-ink">
            ▶
          </span>
          <span aria-hidden="true" className="relative h-[3px] flex-1 rounded-full bg-line-strong">
            <span className="absolute inset-y-0 left-0 w-[42%] rounded-full bg-teal" />
          </span>
          <small className="text-[0.65rem] text-text-muted-2">2:14 / 5:03</small>
        </div>
      </div>
      <Caption lead="MADE BY A REAL VOICE.">
        Stories are recorded by Pieter, not generated. On the site you follow along; in the app the same story becomes
        words you keep.{" "}
        <Link href="/stories" className={CAP_LINK}>
          Listen to stories →
        </Link>
      </Caption>
    </>
  );
}

function WordsPreview() {
  const words = [
    { word: "procrastinate", def: "to delay doing something you should do", status: "New", cls: "text-blue" },
    { word: "break the ice", def: "to ease tension when people first meet", status: "Learning", cls: "" },
    { word: "used to + verb", def: "something that was true before, but isn't now", status: "Known", cls: "text-teal" },
  ];
  return (
    <>
      <div className={FRAME}>
        <div className={BAR}>
          <b className="font-semibold text-text-muted">All words</b>
          <span className="flex gap-1.5">
            <span className="rounded border border-line-strong px-1.5 py-0.5 text-[0.62rem]">Export CSV</span>
            <span className="rounded border border-line-strong px-1.5 py-0.5 text-[0.62rem]">Excel</span>
          </span>
        </div>
        <ul>
          {words.map((item) => (
            <li key={item.word} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-line px-3 py-2.5 last:border-b-0">
              <div className="min-w-0">
                <b className="text-[0.82rem]">{item.word}</b>
                <p className="mt-0.5 truncate text-[0.7rem] text-text-muted">{item.def}</p>
              </div>
              <span className={`rounded-full border border-line-strong px-2 py-0.5 text-[0.62rem] font-bold ${item.cls}`}>
                {item.status}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5 border-t border-line px-3 py-2.5 text-[0.78rem]">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-yellow" />
          <span className="truncate">Everyday words · 48</span>
          <small className="ml-auto shrink-0 text-[0.68rem] text-text-muted-2">Deck</small>
        </div>
      </div>
      <Caption lead="YOURS TO KEEP.">
        Every word in one list, sorted by status. Move them into decks, or take them with you as CSV or Excel.{" "}
        <Link href="/flashcards" className={CAP_LINK}>
          Browse public decks →
        </Link>
      </Caption>
    </>
  );
}

const PREVIEWS: Record<FeatureId, () => React.ReactNode> = {
  import: ImportPreview,
  word: WordPreview,
  notebooks: NotebooksPreview,
  review: ReviewPreview,
  stories: StoriesPreview,
  words: WordsPreview,
};

export default function FeatureShowcase() {
  const [active, setActive] = useState<FeatureId>("import");
  const activeIndex = FEATURES.findIndex((f) => f.id === active);
  const activeLabel = FEATURES[activeIndex].label;
  const Preview = PREVIEWS[active];

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + FEATURES.length) % FEATURES.length;
    setActive(FEATURES[next].id);
    document.getElementById(`feature-tab-${FEATURES[next].id}`)?.focus();
  }

  return (
    <section className="mx-auto w-full max-w-[1120px] px-6 py-14 md:px-14 md:py-20">
      <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <div className="mb-4 flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-teal">
            <span aria-hidden="true" className="h-px w-[18px] bg-teal-dim" />
            The app, in action
          </div>
          <h2 className="max-w-[18ch] text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            Everything you read, <span className="text-teal">in one notebook.</span>
          </h2>
        </div>
        <p className="max-w-[38ch] text-[0.94rem] leading-[1.6] text-text-muted md:text-right">
          Notes come first. Stories and reads are there when you don&apos;t have anything to read. Click a feature to see
          it happen.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-[20px] border border-line-strong bg-panel-2 min-[900px]:grid-cols-[minmax(270px,0.82fr)_minmax(0,1.18fr)]">
        <div
          role="tablist"
          aria-label="Product features"
          className="border-b border-line-strong p-3.5 min-[900px]:border-b-0 min-[900px]:border-r"
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const selected = feature.id === active;
            return (
              <button
                key={feature.id}
                id={`feature-tab-${feature.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`feature-panel-${feature.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(feature.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={`flex w-full gap-3 rounded-[12px] border p-3 text-left transition-colors ${
                  selected
                    ? "border-line-strong bg-panel"
                    : "border-transparent hover:bg-panel-hover"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${ICON_TILE[feature.color]}`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className={`block text-[0.92rem] font-bold leading-tight ${selected ? "text-teal" : ""}`}>
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-[0.75rem] leading-[1.45] text-text-muted">{feature.body}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="min-w-0 bg-panel p-4 pb-5 md:p-5">
          <div className="mb-3.5 flex items-center justify-between gap-3">
            <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-text-muted-2">Preview</span>
            <span className="text-[0.7rem] font-semibold text-teal">{activeLabel}</span>
          </div>
          <div
            key={active}
            id={`feature-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`feature-tab-${active}`}
            className="min-h-[352px]"
          >
            <Preview />
          </div>
        </div>
      </div>
    </section>
  );
}
