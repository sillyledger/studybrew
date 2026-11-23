import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";
import ReviewPreview from "./ReviewPreview";

const TOPIC = "words-review";
const ARTICLE = "how-reviewing-works";

export const metadata: Metadata = {
  title: "How reviewing works | Study Brew",
  description: "How saved words come back in Study Brew: flip the card, rate it, and watch the cup empty.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const KEY = "rounded border border-line-strong bg-panel-2 px-1.5 py-px font-sans text-[0.82em] text-text-primary";

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Open Review.",
    body: (
      <>
        Tap <b className={B}>Review</b> in the menu, or start it from <b className={B}>Today</b>.
      </>
    ),
  },
  {
    title: "Flip the card.",
    body: "Look at the word and try to remember what it means. Then tap the card to flip it.",
  },
  {
    title: "Rate it.",
    body: (
      <>
        Tap <b className={B}>Again</b> if you forgot, <b className={B}>Good</b> if you knew it, or{" "}
        <b className={B}>Easy</b> if it was very easy.
      </>
    ),
  },
];

const RATINGS = [
  { label: "Again", color: "text-coral", when: "Later in the same review" },
  { label: "Good", color: "text-teal", when: "In 1 day, then 3 days, then a little longer each time" },
  { label: "Easy", color: "text-blue", when: "In 4 days, then much later" },
];

const CUPS = [
  { name: "Espresso", size: "Up to 50 words" },
  { name: "Americano", size: "Up to 100" },
  { name: "Large latte", size: "Up to 200" },
];

const TH = "px-4 py-2.5 text-left text-[0.64rem] font-bold uppercase tracking-[0.12em] text-text-muted-2";

export default function HowReviewingWorksPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral">Words &amp; review</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">How reviewing works</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Every word you save comes back in Review. A short review each day helps you keep it.</p>

      <ReviewPreview />

      <h2 className={H2}>A review, step by step</h2>
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

      <h2 className={H2}>When words come back</h2>
      <div className="my-5 overflow-x-auto rounded-[12px] border border-line">
        <table className="w-full border-collapse text-[0.86rem]">
          <thead className="bg-panel-2">
            <tr>
              <th className={TH}>You tap</th>
              <th className={TH}>The word comes back</th>
            </tr>
          </thead>
          <tbody>
            {RATINGS.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className={`px-4 py-3 text-left font-semibold ${row.color}`}>
                  {row.label}
                </th>
                <td className="px-4 py-3 text-white/80">{row.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={H2}>The cup</h2>
      <p className={P}>
        The cup shows how many words are waiting. <b className={B}>Good</b> and <b className={B}>Easy</b> take a sip.{" "}
        <b className={B}>Again</b> keeps the word in the cup until you get it.
      </p>
      <p className={P}>The more words are waiting, the bigger the cup:</p>
      <div className="my-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        {CUPS.map((c) => (
          <div key={c.name} className="rounded-[12px] border border-line bg-panel-2 px-3 py-3.5 text-center">
            <div className="text-[0.9rem] font-semibold text-text-primary">{c.name}</div>
            <div className="mt-1 text-[0.76rem] text-text-muted">{c.size}</div>
          </div>
        ))}
      </div>

      <h2 className={H2}>Your streak</h2>
      <p className={P}>
        Review at least one word each day to keep your streak going. You can see it in Review, next to{" "}
        <b className={B}>Learned this week</b> and <b className={B}>Reviewed today</b>.
      </p>

      <HelpTip variant="tip">
        On a computer, press <kbd className={KEY}>Space</kbd> to flip the card and <kbd className={KEY}>1</kbd>,{" "}
        <kbd className={KEY}>2</kbd> or <kbd className={KEY}>3</kbd> to rate it.
      </HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
