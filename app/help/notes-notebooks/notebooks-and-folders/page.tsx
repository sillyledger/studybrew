import type { Metadata } from "next";
import Link from "next/link";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "notes-notebooks";
const ARTICLE = "notebooks-and-folders";

export const metadata: Metadata = {
  title: "Notebooks & folders | Study Brew",
  description: "Keep your notes in notebooks and coloured folders.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";
const LINK = "border-b border-teal-dim pb-px font-medium text-teal";

const STEPS: { title: string; body?: React.ReactNode }[] = [
  { title: "Tap New folder", body: "inside a notebook." },
  { title: "Name it and pick a colour." },
  {
    title: "Move notes in",
    body: (
      <>
        with <b className={B}>Move to</b> in a note&apos;s menu.
      </>
    ),
  },
];

export default function NotebooksAndFoldersPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">Notes &amp; notebooks</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Notebooks &amp; folders</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">2 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>Notebooks keep your notes in order. Make one for each class, topic or goal.</p>

      <h2 className={H2}>Make a notebook</h2>
      <p className={P}>
        Go to <b className={B}>Notebooks</b> and tap <b className={B}>New notebook</b>. Give it a name.
      </p>

      <h2 className={H2}>Add notes</h2>
      <p className={P}>
        Open a notebook and tap <b className={B}>New note</b>. You can also{" "}
        <Link href="/help/notes-notebooks/import-into-a-note" className={LINK}>
          import
        </Link>{" "}
        a web page, a file or text.
      </p>

      <h2 className={H2}>Folders</h2>
      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-[0.78rem] font-bold text-teal">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[0.92rem] leading-[1.75] text-white/80">
              <b className={B}>{step.title}</b>
              {step.body && <> {step.body}</>}
            </p>
          </li>
        ))}
      </ol>
      <p className={P}>
        Notes that are not in a folder are listed under <b className={B}>Notes not in a folder</b>.
      </p>

      <h2 className={H2}>Words in this notebook</h2>
      <p className={P}>
        Each notebook lists the words you saved in its notes, under <b className={B}>Words in this notebook</b>.
      </p>

      <HelpTip variant="note">
        Free includes 1 notebook with as many folders as you like.{" "}
        <Link href="/help/account-plans/free-and-plus" className={LINK}>
          Plus
        </Link>{" "}
        has unlimited notebooks.
      </HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
