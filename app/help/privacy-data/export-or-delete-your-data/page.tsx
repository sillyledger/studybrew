import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "privacy-data";
const ARTICLE = "export-or-delete-your-data";

export const metadata: Metadata = {
  title: "Export or delete your data | Study Brew",
  description: "Download your words or delete your account.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Open Settings",
    body: (
      <>
        , then <b className={B}>Account</b>.
      </>
    ),
  },
  { title: "Tap Delete my account", body: " at the bottom." },
];

export default function ExportOrDeleteYourDataPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">Privacy &amp; data</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Export or delete your data</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <h2 className={H2}>Download your words</h2>
      <p className={P}>
        Go to <b className={B}>Words</b> and tap{" "}
        <Link href="/help/words-review/export-your-words" className={LINK}>
          Export
        </Link>
        .
      </p>

      <h2 className={H2}>Delete your account</h2>
      {/* Each body starts with its own separator (", " or a space). */}
      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3.5">
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
      <p className={P}>
        This deletes your account, notebooks, saved words, decks and review history. You can&apos;t undo it.
      </p>

      <HelpTip variant="tip">Export your words first if you want to keep them.</HelpTip>

      <h2 className={H2}>Anything else</h2>
      <p className={P}>
        <Link href="/contact" className={LINK}>
          Email us
        </Link>{" "}
        and we&apos;ll help you see, fix or delete your data.
      </p>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
