import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "words-review";
const ARTICLE = "export-your-words";

export const metadata: Metadata = {
  title: "Export your words | Study Brew",
  description: "Download your words as CSV or Excel.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";

const STEPS: { title: string; body?: string }[] = [
  { title: "Go to Words." },
  { title: "Tap Export." },
  { title: "Choose a format:", body: "CSV file or Excel (.xlsx)." },
];

const COLUMNS = [
  "Word",
  "Part of speech",
  "Meaning",
  "Example",
  "Status",
  "Source",
  "From",
  "Deck",
  "Next review",
  "Saved on",
];

const CHIP_CLASS = "rounded-full border border-line px-3 py-1.5 text-[0.75rem] text-text-muted";

export default function ExportYourWordsPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral">Words &amp; review</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Export your words</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Your words are yours. Download them any time, on Free or Plus.</p>

      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-[0.78rem] font-bold text-teal">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[0.92rem] leading-[1.75] text-white/80">
              <b className={B}>{step.title}</b>
              {step.body && <> {step.body}</>}
            </p>
          </li>
        ))}
      </ol>
      <p className={P}>Select words first to export only those. Otherwise you get all your words.</p>

      <h2 className={H2}>What&apos;s in the file</h2>
      <p className={P}>One row per word, with these columns:</p>
      <ul className="my-4 flex flex-wrap gap-2">
        {COLUMNS.map((col) => (
          <li key={col} className={CHIP_CLASS}>
            {col}
          </li>
        ))}
      </ul>

      <HelpTip variant="tip">CSV works with Anki, Quizlet and most apps. Excel opens in Excel and Numbers.</HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
