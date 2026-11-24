import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";
import { APP_WELCOME_URL } from "@/lib/site";

const TOPIC = "getting-started";
const ARTICLE = "using-on-your-phone";

export const metadata: Metadata = {
  title: "Using it on your phone | Study Brew",
  description: "Use Study Brew in your phone's browser.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const STEPS: { title: React.ReactNode; body: React.ReactNode }[] = [
  {
    title: (
      <>
        Open{" "}
        <a href={APP_WELCOME_URL} className={LINK}>
          app.studybrew.co
        </a>
      </>
    ),
    body: "in Safari, Chrome or any browser.",
  },
  { title: "Sign in", body: "with your email. Your notes and words are the same on every device." },
];

const GETTING_AROUND: React.ReactNode[] = [
  <>
    Tap the <b className={B}>menu</b> button at the top left to open Today, Stories, Reads, Review, Words and your
    notebooks.
  </>,
  <>
    Tap <b className={B}>Search</b> at the top to find a note.
  </>,
  "Story audio keeps playing at the bottom of the screen while you read and tap words.",
];

export default function UsingOnYourPhonePage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">Getting started</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Using it on your phone</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Study Brew works in the browser on your phone. There is nothing to install.</p>

      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={i} className="flex gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-[0.78rem] font-bold text-teal">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[0.92rem] leading-[1.75] text-white/80">
              <b className={B}>{step.title}</b> {step.body}
            </p>
          </li>
        ))}
      </ol>

      <h2 className={H2}>Getting around</h2>
      <ul className="my-4 flex flex-col gap-2">
        {GETTING_AROUND.map((item, i) => (
          <li key={i} className="flex gap-3 text-[0.92rem] leading-[1.75] text-white/80">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <HelpTip variant="tip">Add app.studybrew.co to your home screen to open it in one tap.</HelpTip>
      <HelpTip variant="note">
        Apps for iPhone, iPad and Mac are on the{" "}
        <Link href="/roadmap" className={LINK}>
          roadmap
        </Link>
        .
      </HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
