import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "privacy-data";
const ARTICLE = "what-study-brew-stores";

export const metadata: Metadata = {
  title: "What Study Brew stores | Study Brew",
  description: "What we keep, and what we never do.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const KEEP = [
  "Your email, and your password in a safe, scrambled form",
  "Your name, if you add one",
  "What you make: saved words, notes, notebooks, decks, review history and settings",
  "What you import: pasted text, files and links",
];

const NEVER = ["We don't sell your data", "We don't show ads", "We don't use your data to train AI"];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-4 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.92rem] leading-[1.75] text-white/80">
          <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WhatStudyBrewStoresPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">Privacy &amp; data</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">What Study Brew stores</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Study Brew keeps only what it needs to run your account.</p>

      <h2 className={H2}>What we keep</h2>
      <Bullets items={KEEP} />

      <h2 className={H2}>What we don&apos;t do</h2>
      <Bullets items={NEVER} />
      <p className={P}>The app has no tracking or analytics. The website uses Google Analytics to count visits.</p>

      <HelpTip variant="tip">PDFs are read in your browser and never uploaded. Only their text is sent.</HelpTip>

      <p className={P}>
        All the details are in the{" "}
        <Link href="/privacy" className={LINK}>
          Privacy Policy
        </Link>
        .
      </p>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
