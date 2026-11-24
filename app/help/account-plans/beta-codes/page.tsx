import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "account-plans";
const ARTICLE = "beta-codes";

export const metadata: Metadata = {
  title: "Beta codes | Study Brew",
  description: "Turn on Plus with a beta code.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

// Each body starts with its own separator (a space, or ", " after "Open Settings").
const STEPS: { title: React.ReactNode; body: React.ReactNode }[] = [
  {
    title: (
      <Link href="/help/getting-started/trying-without-an-account" className={LINK}>
        Make a free account.
      </Link>
    ),
    body: " Codes don't work for guests.",
  },
  {
    title: "Open Settings",
    body: (
      <>
        , then <b className={B}>Plan</b>.
      </>
    ),
  },
  {
    title: "Enter your code",
    body: (
      <>
        {" "}
        and tap <b className={B}>Apply</b>.
      </>
    ),
  },
];

const TROUBLE: { title: string; body: string }[] = [
  { title: "Check the code.", body: "Capitals and spaces don't matter." },
  { title: "Used up:", body: "the code has no uses left." },
  { title: "Already on Plus:", body: "you don't need a code." },
];

export default function BetaCodesPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">Account &amp; plans</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Beta codes</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>During the beta, some people get a code that turns on Plus.</p>

      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={i} className="flex gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-[0.78rem] font-bold text-teal">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[0.92rem] leading-[1.75] text-white/80">
              <b className={B}>{step.title}</b>
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <h2 className={H2}>If it doesn&apos;t work</h2>
      <ul className="my-4 flex flex-col gap-2">
        {TROUBLE.map((item) => (
          <li key={item.title} className="flex gap-3 text-[0.92rem] leading-[1.75] text-white/80">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              <b className={B}>{item.title}</b> {item.body}
            </span>
          </li>
        ))}
      </ul>

      <HelpTip variant="note">Each account can use one code.</HelpTip>

      <p className={P}>
        Still stuck?{" "}
        <Link href="/contact" className={LINK}>
          Contact us
        </Link>
        .
      </p>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
