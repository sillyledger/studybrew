import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";
import TapWordPreview from "./TapWordPreview";

const TOPIC = "words-review";
const ARTICLE = "tap-a-word-save-it";

export const metadata: Metadata = {
  title: "Tap a word, save it | Study Brew",
  description: "Tap any word in Study Brew to see what it means, then save it so it comes back in Review.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const STEPS: { title: string; body: React.ReactNode }[] = [
  { title: "Tap a word.", body: "Its meaning opens in a small box." },
  { title: "Tap Save word.", body: "The word gets a teal underline everywhere it appears in the text." },
];

const MENU: { title: string; body?: string }[] = [
  { title: "Change meaning:", body: "pick another meaning from the dictionary" },
  { title: "Move to a deck" },
  { title: "Remove" },
];

export default function TapAWordSaveItPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral">Words &amp; review</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Tap a word, save it</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>
        Don&apos;t know a word? Tap it. You see what it means right away, and you can save it with one more tap.
      </p>

      <TapWordPreview />

      <h2 className={H2}>In stories and reads</h2>
      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-[0.78rem] font-bold text-teal">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[0.92rem] leading-[1.75] text-white/80">
              <b className={B}>{step.title}</b> {step.body}
            </p>
          </li>
        ))}
      </ol>

      <h2 className={H2}>In your own notes</h2>
      <p className={P}>
        Select a word or a phrase, then tap <b className={B}>+ Save word</b>. Its meaning shows right under it in your
        note. To hide the meanings, turn off <b className={B}>Definitions under words</b> at the top of the note.
      </p>

      <h2 className={H2}>After you save</h2>
      <p className={P}>
        Every saved word goes to <b className={B}>Words</b> and{" "}
        <Link href="/help/words-review/how-reviewing-works" className={LINK}>
          comes back in Review
        </Link>
        . In the word list next to your text, open a word&apos;s menu to:
      </p>
      <ul className="my-4 flex flex-col gap-2">
        {MENU.map((item) => (
          <li key={item.title} className="flex gap-3 text-[0.92rem] leading-[1.75] text-white/80">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              <b className={B}>{item.title}</b>
              {item.body && <> {item.body}</>}
            </span>
          </li>
        ))}
      </ul>

      <HelpTip variant="tip">
        A{" "}
        <span className="underline decoration-yellow decoration-dotted decoration-2 underline-offset-[4px]">
          dotted yellow line
        </span>{" "}
        marks a word to know for that text. Tap it to see what it means.
      </HelpTip>
      <HelpTip variant="note">Meanings come from free dictionaries, not AI.</HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
