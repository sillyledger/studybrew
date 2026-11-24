import type { Metadata } from "next";
import HelpArticleLayout from "@/components/help/HelpArticleLayout";
import HelpFeedback from "@/components/help/HelpFeedback";
import HelpPrevNext from "@/components/help/HelpPrevNext";
import HelpTip from "@/components/help/HelpTip";

const TOPIC = "getting-started";
const ARTICLE = "trying-without-an-account";

export const metadata: Metadata = {
  title: "Trying it without an account | Study Brew",
  description: "What you can do as a guest, and how to keep your words.",
  alternates: { canonical: `https://studybrew.co/help/${TOPIC}/${ARTICLE}` },
};

const P = "my-4 text-[0.92rem] leading-[1.75] text-white/80";
const H2 = "mb-3 mt-11 text-[1.3rem] font-bold tracking-[-0.03em]";
const B = "font-bold text-text-primary";

const GUEST = [
  "Read every story and read",
  "Tap words and save them",
  "Review your words every day",
  "Paste text into a note",
];

const ACCOUNT = ["Importing links and files", "Using a beta code", "Your words on another phone or computer"];

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Tap Make an account.",
    body: (
      <>
        You find it at the top of <b className={B}>Today</b>.
      </>
    ),
  },
  { title: "Type your email.", body: "All email works, including QQ, 163, Gmail and Outlook." },
  { title: "Tap the link", body: "in the email from Study Brew." },
];

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-4 flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[0.92rem] leading-[1.75] text-white/80">
          <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TryingWithoutAnAccountPage() {
  return (
    <HelpArticleLayout topic={TOPIC} article={ARTICLE}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal">Getting started</div>
      <h1 className="mt-3 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.04em]">Trying it without an account</h1>
      <p className="mt-3 text-[0.8rem] text-text-muted">1 min read · Last updated Nov 2026</p>
      <hr className="mb-6 mt-6 border-line" />

      <p className={P}>You can use Study Brew right away as a guest. No email, no password.</p>

      <h2 className={H2}>What you can do as a guest</h2>
      <Bullets items={GUEST} />

      <h2 className={H2}>What needs a free account</h2>
      <Bullets items={ACCOUNT} />

      <h2 className={H2}>Make your account</h2>
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
      <p className={P}>Everything you saved as a guest stays with you.</p>

      <HelpTip variant="note">
        As a guest, your words are on this device only. Guest accounts that are not used for a long time may be deleted.
      </HelpTip>

      <HelpPrevNext topic={TOPIC} article={ARTICLE} />
      <HelpFeedback />
    </HelpArticleLayout>
  );
}
