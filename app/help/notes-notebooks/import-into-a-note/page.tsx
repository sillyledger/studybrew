import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";
import ImportPreview from "./ImportPreview";

const TOPIC = "notes-notebooks";
const ARTICLE = "import-into-a-note";

export const metadata: Metadata = {
  title: "Import into a note | Study Brew",
  description: "Bring in a web page, a Word file, a PDF or your own text as a note in Study Brew.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const CODE = "rounded border border-line-strong bg-panel-2 px-1.5 py-px font-sans text-[0.82em] text-text-primary";

const STEPS = [
  {
    title: "Paste a link.",
    body: "Paste the address of an article or web page. Study Brew keeps the text and leaves out menus and ads.",
  },
  {
    title: "Upload a file.",
    body: (
      <>
        Choose a Word file (<code className={CODE}>.docx</code>), a text file (<code className={CODE}>.txt</code>) or a
        PDF.
      </>
    ),
  },
  {
    title: "Paste text.",
    body: "Paste or type anything: class notes, an email, a chapter.",
  },
];

const LIMITS = [
  { label: "Imports per month", free: "3", plus: "100" },
  { label: "PDF pages per import", free: "10", plus: "300" },
  { label: "Word or text file size", free: "4 MB", plus: "4 MB" },
  { label: "PDF file size", free: "50 MB", plus: "50 MB" },
];

const TH = "px-4 py-2.5 text-left text-[0.64rem] font-bold uppercase tracking-[0.12em] text-text-muted-2";

export default function ImportIntoANotePage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">Notes &amp; notebooks</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Import into a note</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">3 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>
        Bring in a web page, a class file or your own text. Study Brew turns it into a clean note in your notebook, ready
        to read and mark up. Every word in it can be tapped for its meaning.
      </p>

      <ImportPreview />

      <h2 className={H2}>Three ways in</h2>
      <ol className="my-5 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-[0.78rem] font-bold text-teal">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[0.92rem] leading-[1.75] text-white/80">
              <b className="font-bold text-text-primary">{step.title}</b> {step.body}
            </p>
          </li>
        ))}
      </ol>
      <p className={P}>
        Then press <b className="font-bold text-text-primary">Import</b>. The note opens straight away and is saved in the
        notebook you imported it into.
      </p>

      <HelpTip variant="tip">
        Trying Study Brew without an account? You can paste text right away. Importing links and files needs a free
        account.
      </HelpTip>

      <h2 className={H2}>PDFs</h2>
      <p className={P}>
        PDF import is in beta. Your PDF is read in your browser and never uploaded. Only its text is sent. You can pick a
        page range before you import.
      </p>

      <h2 className={H2}>Limits</h2>
      <div className="my-5 overflow-x-auto rounded-[12px] border border-line">
        <table className="w-full border-collapse text-[0.86rem]">
          <thead className="bg-panel-2">
            <tr>
              <th className={TH}>
                <span className="sr-only">Limit</span>
              </th>
              <th className={TH}>Free</th>
              <th className={TH}>Plus</th>
            </tr>
          </thead>
          <tbody>
            {LIMITS.map((row) => (
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

      <HelpTip variant="note">Limits only stop new imports. Reading, editing, review and export always work.</HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
