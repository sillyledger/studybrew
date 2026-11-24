import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "notes-notebooks";
const ARTICLE = "search-and-trash";

export const metadata: Metadata = {
  title: "Search and trash | Study Brew",
  description: "Find any note fast, and get deleted ones back.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const KEY = "rounded border border-line-strong bg-panel-2 px-1.5 py-px font-sans text-[0.82em] text-text-primary";

const BUTTONS = [
  { label: "Restore", does: "Puts it back where it was" },
  { label: "Delete forever", does: "Removes it now" },
  { label: "Empty trash", does: "Removes everything in Trash" },
];

const TH = "px-4 py-2.5 text-left text-[0.64rem] font-bold uppercase tracking-[0.12em] text-text-muted-2";

export default function SearchAndTrashPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">Notes &amp; notebooks</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Search and trash</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <h2 className={H2}>Search</h2>
      <p className={P}>
        Press <kbd className={KEY}>⌘K</kbd> (<kbd className={KEY}>Ctrl+K</kbd> on Windows), or tap{" "}
        <b className={B}>Search</b> in the menu. Type to find notebooks and notes by title or text.
      </p>
      <p className={P}>
        Before you type, you see your 5 latest notes. Use the arrow keys and <b className={B}>Enter</b> to open one, and{" "}
        <b className={B}>Esc</b> to close.
      </p>

      <h2 className={H2}>Trash</h2>
      <p className={P}>
        Deleted notebooks and notes go to <b className={B}>Trash</b>, in the menu under My notes.
      </p>
      <div className="my-5 overflow-x-auto rounded-[12px] border border-line">
        <table className="w-full border-collapse text-[0.86rem]">
          <thead className="bg-panel-2">
            <tr>
              <th className={TH}>Button</th>
              <th className={TH}>What it does</th>
            </tr>
          </thead>
          <tbody>
            {BUTTONS.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="px-4 py-3 text-left font-semibold text-text-primary">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-white/80">{row.does}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HelpTip variant="note">Items in Trash are deleted for good after 30 days.</HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
