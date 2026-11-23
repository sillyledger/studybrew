import type { Metadata } from "next";
import { Fragment } from "react";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpArticleList from "@/components/help/HelpArticleList";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";
import { APP_WELCOME_URL } from "@/lib/site";

const TOPIC = "getting-started";
const ARTICLE = "get-started-in-5-minutes";

export const metadata: Metadata = {
  title: "Get started in 5 minutes | Study Brew",
  description:
    "Save your first English word in about a minute, with no account. Here is how Study Brew works on day one.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const FLOW = ["Read", "Tap a word", "Save it", "Review"];

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Press Start.",
    body: (
      <>
        Go to{" "}
        <a href={APP_WELCOME_URL} className={LINK}>
          app.studybrew.co
        </a>{" "}
        and press <b className={B}>Start</b>. No email or password yet.
      </>
    ),
  },
  {
    title: "Pick a topic.",
    body: (
      <>
        Choose what you want to read about, like Travel, Food or Health. You get a short, easy story. Not sure? Tap{" "}
        <b className={B}>Surprise me</b>.
      </>
    ),
  },
  {
    title: "Tap a word.",
    body: "Tap any word you don't know. Its meaning shows right under it.",
  },
  {
    title: "Save it.",
    body: (
      <>
        Tap <b className={B}>Save word</b>. Save as many as you like, then tap <b className={B}>Next</b>.
      </>
    ),
  },
  {
    title: "Meet your first word.",
    body: "You see your first word card, with its meaning and an example.",
  },
];

const SIPS = [
  { when: "Tomorrow", sip: "1st sip" },
  { when: "In 3 days", sip: "2nd sip" },
  { when: "In a week", sip: "3rd sip" },
];

function FlowPreview() {
  return (
    <div className="my-8 rounded-[16px] border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.12em]">
        <span className="text-text-muted-2">Preview</span>
        <span className="text-teal">Where it happens</span>
      </div>
      <div className="rounded-[14px] border border-line-strong bg-panel-2 px-3 py-4">
        <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5">
          {FLOW.map((label, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <li aria-hidden="true" className="text-[0.8rem] text-text-muted-2">
                  →
                </li>
              )}
              <li className="flex items-center gap-2 rounded-lg border border-line-strong bg-panel px-2.5 py-1.5 text-[0.74rem] font-semibold text-text-primary">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-teal-tint text-[0.62rem] font-bold text-teal">
                  {i + 1}
                </span>
                {label}
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">Getting started</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Get started in 5 minutes</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Save your first English word in about a minute. You don&apos;t need an account to start.</p>

      <FlowPreview />

      <h2 className={H2}>Your first five minutes</h2>
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

      <h2 className={H2}>When your words come back</h2>
      <p className={P}>Saved words come back so you don&apos;t forget them. Each review is a sip.</p>
      <div className="my-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        {SIPS.map((s) => (
          <div key={s.when} className="rounded-[12px] border border-line bg-panel-2 px-3 py-3.5 text-center">
            <div className="text-[0.76rem] text-text-muted">{s.when}</div>
            <div className="mt-1 text-[0.9rem] font-semibold text-teal">{s.sip}</div>
          </div>
        ))}
      </div>
      <p className={P}>
        The cup on <b className={B}>Today</b> shows how many words are waiting.
      </p>

      <h2 className={H2}>Keep your words</h2>
      <p className={P}>
        Tap <b className={B}>Keep my words</b> and type your email. Then tap the link in the email from Study Brew. Your
        words move to your account, so you can use them on any phone or computer.
      </p>

      <HelpTip variant="tip">All email works, including QQ, 163, Gmail and Outlook.</HelpTip>
      <HelpTip variant="note">Without an account, your words are on this device only.</HelpTip>

      <h2 className={H2}>What&apos;s next</h2>
      <HelpArticleList
        articles={[
          { topic: "notes-notebooks", slug: "import-into-a-note" },
          { topic: "words-review", slug: "how-reviewing-works" },
        ]}
      />

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
