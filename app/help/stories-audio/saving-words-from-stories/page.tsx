import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "stories-audio";
const ARTICLE = "saving-words-from-stories";

export const metadata: Metadata = {
  title: "Saving words from stories | Study Brew",
  description: "Save words while you read and listen.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";

const STEPS: { title: string; body: React.ReactNode }[] = [
  { title: "Tap a word.", body: "Its meaning opens in a small box." },
  {
    title: "Tap Save word.",
    body: (
      <>
        It gets a teal underline and goes to <b className={B}>Words</b>, with the story it came from.
      </>
    ),
  },
];

export default function SavingWordsFromStoriesPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-yellow">Stories &amp; audio</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Saving words from stories</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Save words from a story the same way as in reads.</p>

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

      <h2 className={H2}>Words to know</h2>
      <p className={P}>
        Many stories start with 3 words to know. They have a{" "}
        <span className="underline decoration-yellow decoration-dotted decoration-2 underline-offset-[4px]">
          dotted yellow line
        </span>{" "}
        in the text until you save them.
      </p>

      <h2 className={H2}>Quiz</h2>
      <p className={P}>Some stories end with one short question, to check what you understood.</p>

      <HelpTip variant="tip">
        Keep the audio playing while you tap words. The player stays at the bottom of the screen.
      </HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
