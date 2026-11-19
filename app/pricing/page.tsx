import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import Nav from "@/components/Nav";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckIcon } from "@/components/Icons";
import { SIGNUPS_OPEN, APP_WELCOME_URL } from "@/lib/site";
import { pricingForCountry } from "@/lib/pricing";

// Prices depend on the visitor's country, so render per request (never cached
// across countries).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing | Study Brew",
  description:
    "Every story is free. Plus is one yearly payment for bringing your own material: course PDFs, class notes and unlimited words.",
};

type Feature = { text: string; note?: string };

const FREE_FEATURES: Feature[] = [
  { text: "Every story, read and practice game" },
  { text: "Save up to 100 words" },
  { text: "Daily review of your words" },
  { text: "1 notebook and 1 deck of your own" },
  { text: "3 imports a month", note: "PDFs up to 10 pages" },
  { text: "About 100 images in notes", note: "25 MB" },
  { text: "Export your words anytime" },
];

const PLUS_FEATURES: Feature[] = [
  { text: "Everything in Free" },
  { text: "Unlimited saved words" },
  { text: "Unlimited notebooks and decks" },
  { text: "100 imports a month" },
  { text: "Course PDFs up to 300 pages" },
  { text: "About 10,000 images in notes", note: "2 GB" },
];

const TUTOR_FEATURES: Feature[] = [
  { text: "A shared space for each student" },
  { text: "Mark words during the lesson, and they go straight into your student's review" },
  { text: "See what each student has learned and what they keep forgetting" },
  { text: "Lesson notes and materials in one place" },
];

type Cell = { text: string; note?: string };

const COMPARE: { label: Cell; free: Cell; plus: Cell }[] = [
  { label: { text: "Stories, reads and practice" }, free: { text: "All of them" }, plus: { text: "All of them" } },
  { label: { text: "Saved words" }, free: { text: "100" }, plus: { text: "Unlimited" } },
  { label: { text: "Daily review" }, free: { text: "Yes" }, plus: { text: "Yes" } },
  { label: { text: "Notebooks" }, free: { text: "1" }, plus: { text: "Unlimited" } },
  {
    label: { text: "Your own decks" },
    free: { text: "1", note: "Starter decks are always free" },
    plus: { text: "Unlimited" },
  },
  {
    label: { text: "Imports", note: "PDF, Word, text or a link" },
    free: { text: "3 a month" },
    plus: { text: "100 a month" },
  },
  { label: { text: "PDF size" }, free: { text: "Up to 10 pages" }, plus: { text: "Up to 300 pages" } },
  {
    label: { text: "Images in notes" },
    free: { text: "About 100", note: "25 MB" },
    plus: { text: "About 10,000", note: "2 GB" },
  },
  { label: { text: "Export your words" }, free: { text: "Yes" }, plus: { text: "Yes" } },
];

const FAQ = [
  {
    q: "What happens when I hit a limit?",
    a: "You can't add new things until you upgrade or make room. Everything you already have stays: you can still read, edit and review all of it.",
  },
  {
    q: "If I stop paying, do I lose my words?",
    a: "No. You go back to Free and keep every word, note and deck. You just can't add more above the free limits.",
  },
  {
    q: "How can I pay?",
    a: "One payment a year with card, Apple Pay, or Alipay in mainland China. Prices include tax. It doesn't renew by itself: we email you before your year ends.",
  },
  {
    q: "Why are all stories free?",
    a: "Because stories are how you learn, and that shouldn't sit behind a paywall. You pay for the tools, not the stories.",
  },
];

/* ---------- Small building blocks ---------- */

const BTN =
  "inline-flex items-center justify-center rounded-[9px] font-semibold transition-opacity hover:opacity-90";

function SignupButton({
  openLabel,
  className,
}: {
  openLabel: string;
  className: string;
}) {
  if (SIGNUPS_OPEN) {
    return (
      <a href={APP_WELCOME_URL} className={className}>
        {openLabel}
      </a>
    );
  }
  return (
    <Link href="/roadmap" className={className}>
      Sign-ups open soon
    </Link>
  );
}

function FeatureList({
  features,
  tone = "teal",
  className = "mt-6 border-t border-line pt-6",
}: {
  features: Feature[];
  tone?: "teal" | "blue";
  className?: string;
}) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {features.map((f) => (
        <li key={f.text} className="flex gap-3 text-[0.93rem] leading-[1.45] text-text-primary">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
              tone === "blue" ? "bg-blue/15 text-blue" : "bg-teal/15 text-teal"
            }`}
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span>
            {f.text}
            {f.note && <span className="whitespace-nowrap text-text-muted-2"> {f.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlanName({ name, accent = false }: { name: string; accent?: boolean }) {
  return (
    <h2
      className={`text-[0.74rem] font-semibold uppercase tracking-[0.1em] ${
        accent ? "text-teal" : "text-text-muted-2"
      }`}
    >
      {name}
    </h2>
  );
}

function CellText({ cell }: { cell: Cell }) {
  return (
    <>
      {cell.text}
      {cell.note && (
        <span className="mt-0.5 block text-[0.76rem] font-normal text-text-muted-2">
          {cell.note}
        </span>
      )}
    </>
  );
}

/* ---------- Page ---------- */

export default async function PricingPage() {
  const price = pricingForCountry((await headers()).get("x-vercel-ip-country"));

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Hero */}
        <section className="pb-9 pt-10 md:pb-11 md:pt-16">
          <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
            <span className="h-px w-5 shrink-0 bg-teal-dim" />
            <span>Pricing</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            Fair prices,
            <br />
            <span className="text-teal">made for students.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-text-muted">
            Every story is free, for everyone. Plus is for when you bring your own material:
            course PDFs, class notes and more words than the free plan holds.
          </p>
        </section>

        {/* Beta */}
        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-yellow/35 bg-gradient-to-r from-yellow/[0.09] to-coral/[0.06] px-5 py-4">
          <p className="min-w-[240px] flex-1 text-[0.92rem] leading-[1.5] text-text-primary">
            Study Brew is in Beta. Sign up free and use it while we keep building.
          </p>
        </div>

        {/* Plans */}
        <section aria-label="Plans" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Free */}
          <div className="flex flex-col rounded-[18px] border border-line bg-panel-2 p-6 md:p-8">
            <PlanName name="Free" />
            <p className="mt-3 text-[0.95rem] leading-[1.5] text-text-muted">
              For learning with our stories.
            </p>
            <div className="mt-6 flex min-h-[4.2rem] items-baseline gap-2">
              <span className="text-[3.4rem] font-bold leading-none tracking-[-0.04em]">
                {price.symbol}
                {price.free}
              </span>
              <span className="whitespace-nowrap text-[0.86rem] text-text-muted">forever</span>
            </div>
            <p className="mt-1.5 min-h-[1.2rem] text-[0.78rem] text-text-muted-2" aria-hidden="true">
              &nbsp;
            </p>
            <SignupButton
              openLabel="Start free"
              className={`${BTN} mt-6 w-full border border-line-strong px-4 py-3 text-[0.9rem] text-text-primary hover:bg-panel-hover hover:opacity-100`}
            />
            <FeatureList features={FREE_FEATURES} />
          </div>

          {/* Plus */}
          <div className="flex flex-col rounded-[18px] border border-teal/55 bg-panel-2 bg-gradient-to-b from-teal/[0.07] to-transparent to-55% p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <PlanName name="Plus" accent />
              <span className="rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-[0.72rem] font-semibold text-teal">
                Most popular
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-[1.5] text-text-muted">
              For studying with your own material.
            </p>
            <div className="mt-6 flex min-h-[4.2rem] items-baseline gap-2">
              <span className="text-[3.4rem] font-bold leading-none tracking-[-0.04em]">
                {price.symbol}
                {price.plusYearly}
              </span>
              <span className="whitespace-nowrap text-[0.86rem] text-text-muted">a year</span>
            </div>
            <p className="mt-1.5 min-h-[1.2rem] text-[0.78rem] text-text-muted-2">
              One payment a year · about {price.symbol}
              {price.plusMonthly} a month
            </p>
            <span
              role="button"
              aria-disabled="true"
              className="mt-6 inline-flex w-full cursor-default select-none items-center justify-center rounded-[9px] border border-line bg-panel-hover px-4 py-3 text-[0.9rem] font-semibold text-text-muted-2"
            >
              Coming soon
            </span>
            <p className="mt-2.5 text-center text-[0.78rem] leading-[1.45] text-text-muted-2">
              Have a Beta code? Sign up free, then enter it in Settings → Plan.
            </p>
            <FeatureList features={PLUS_FEATURES} />
          </div>

          {/* Tutor */}
          <div className="flex flex-col rounded-[18px] border border-dashed border-line-strong bg-panel-2 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <PlanName name="Tutor" />
              <span className="rounded-full border border-blue/30 bg-blue/10 px-2.5 py-0.5 text-[0.72rem] font-semibold text-blue">
                Coming soon
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-[1.5] text-text-muted">
              For private tutors who teach 1:1.
            </p>
            <div className="mt-6 flex min-h-[4.2rem] items-baseline">
              <span className="text-[2rem] font-bold leading-none tracking-[-0.03em] text-text-muted">
                Join the waitlist
              </span>
            </div>
            <p className="mt-1.5 min-h-[1.2rem] text-[0.78rem] text-text-muted-2">
              Early tutors get a say in how it works.
            </p>
            <WaitlistForm
              list="tutor"
              tone="light"
              submitLabel="Join"
              note={null}
              className="mt-6 w-full"
            />
            <FeatureList features={TUTOR_FEATURES} tone="blue" className="mt-6" />
          </div>
        </section>

        <p className="mt-4 text-[0.8rem] text-text-muted-2">Prices in {price.code}.</p>

        {/* Comparison */}
        <section aria-labelledby="pricing-compare" className="pt-16 md:pt-20">
          <h2
            id="pricing-compare"
            className="text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.05]"
          >
            Free and Plus, side by side
          </h2>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[0.92rem]">
              <thead>
                <tr className="border-b border-line text-[0.74rem] font-semibold uppercase tracking-[0.08em]">
                  <th className="px-3 py-4" aria-label="Feature" />
                  <th className="px-3 py-4 font-semibold text-text-muted-2">Free</th>
                  <th className="px-3 py-4 font-semibold text-teal">Plus</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label.text} className="border-b border-line">
                    <th scope="row" className="px-3 py-4 font-normal text-text-muted">
                      <CellText cell={row.label} />
                    </th>
                    <td className="px-3 py-4 text-text-muted">
                      <CellText cell={row.free} />
                    </td>
                    <td className="px-3 py-4 font-medium text-text-primary">
                      <CellText cell={row.plus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Good to know */}
        <section aria-labelledby="pricing-faq" className="pt-16 md:pt-20">
          <h2 id="pricing-faq" className="text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.05]">
            Good to know
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-line bg-panel-2 p-6">
                <h3 className="text-[1.05rem] font-bold leading-snug">{q}</h3>
                <p className="mt-2 text-[0.92rem] leading-[1.6] text-text-muted">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="pb-20 pt-16 md:pb-24 md:pt-20">
          <div className="flex flex-col gap-6 rounded-[22px] border border-teal/40 bg-gradient-to-r from-teal/[0.08] to-blue/[0.08] p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div>
              <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold leading-[1.05]">
                Start with the stories.
              </h2>
              <p className="mt-2.5 max-w-[48ch] text-[0.98rem] leading-[1.6] text-text-muted">
                No card needed. Upgrade when you want to bring your own material.
              </p>
            </div>
            <SignupButton
              openLabel="Start free"
              className={`${BTN} shrink-0 self-start bg-text-primary px-5 py-3 text-[0.9rem] text-background md:self-auto`}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
