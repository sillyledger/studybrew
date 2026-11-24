import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "account-plans";
const ARTICLE = "free-and-plus";

export const metadata: Metadata = {
  title: "Free and Plus | Study Brew",
  description: "What each plan includes.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const PLANS = [
  { label: "Stories, reads and practice", free: "All", plus: "All" },
  { label: "Daily review", free: "Yes", plus: "Yes" },
  { label: "Saved words", free: "100", plus: "Unlimited" },
  { label: "Notebooks", free: "1", plus: "Unlimited" },
  { label: "Your own decks", free: "1", plus: "Unlimited" },
  { label: "Imports", free: "3 a month", plus: "100 a month" },
  { label: "PDF size", free: "Up to 10 pages", plus: "Up to 300 pages" },
  { label: "Images in notes", free: "About 100", plus: "About 10,000" },
  { label: "Export your words", free: "Yes", plus: "Yes" },
];

const TH = "px-4 py-2.5 text-left text-[0.64rem] font-bold uppercase tracking-[0.12em] text-text-muted-2";

export default function FreeAndPlusPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">Account &amp; plans</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Free and Plus</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Every story is free, for everyone. Plus is for when you bring your own material.</p>

      <div className="my-5 overflow-x-auto rounded-[12px] border border-line">
        <table className="w-full border-collapse text-[0.86rem]">
          <thead className="bg-panel-2">
            <tr>
              <th className={TH}>
                <span className="sr-only">Feature</span>
              </th>
              <th className={TH}>Free</th>
              <th className={TH}>Plus</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="px-4 py-3 text-left font-normal text-white/80">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-text-primary">{row.free}</td>
                <td className="px-4 py-3 font-semibold text-teal">{row.plus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={H2}>When you hit a limit</h2>
      <p className={P}>
        You can&apos;t add new things above the limit. Everything you already have stays: you can still read, edit,
        review and export it.
      </p>

      <h2 className={H2}>Paying for Plus</h2>
      <p className={P}>
        Plus is one payment a year. It doesn&apos;t renew by itself. See the prices on the{" "}
        <Link href="/pricing" className={LINK}>
          Pricing page
        </Link>
        .
      </p>

      <HelpTip variant="note">If you stop paying, you go back to Free and keep every word, note and deck.</HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
