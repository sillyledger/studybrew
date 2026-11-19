import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import { APP_LOGIN_URL, APP_WELCOME_URL, BETA_CODE } from "@/lib/site";
import CopyCode from "./CopyCode";

// Self-hosted by next/font at build time: no request to Google at runtime,
// so the page works in mainland China. Only this page loads it.
const dmMono = DM_Mono({ subsets: ["latin"], weight: "500", display: "swap" });

const TITLE = "Study Brew Beta invite";
const DESCRIPTION =
  "You're invited to the Study Brew Beta. Sign up free and use your code to get Study Brew Plus free, for life.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://studybrew.co/beta",
    siteName: "Study Brew",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/* ---------- Small app-like illustrations (HTML, no images) ---------- */

const GOLD_BORDER = "border-[rgba(242,196,107,0.45)]";

/** A small app "screen": the frame every step illustration sits in. */
function Screen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[168px] select-none overflow-hidden rounded-[14px] border border-line-strong bg-background ${className}`}
    >
      {children}
    </div>
  );
}

function Bar({ w, className = "bg-panel-hover" }: { w: string; className?: string }) {
  return <span className={`block h-[6px] rounded-full ${className}`} style={{ width: w }} />;
}

function SignUpIllustration() {
  return (
    <Screen className="flex items-center justify-center p-4">
      <div className="w-full max-w-[200px] rounded-[12px] border border-line bg-panel-2 p-3.5">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-teal/80" />
          <span className="text-[0.66rem] font-bold leading-none text-text-primary">Study Brew</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex h-[22px] items-center rounded-[6px] border border-line-strong px-2">
            <span className="text-[0.56rem] leading-none text-text-muted-2">you@email.com</span>
          </div>
          <div className="flex h-[22px] items-center gap-[3px] rounded-[6px] border border-line-strong px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-[4px] w-[4px] rounded-full bg-text-muted-2" />
            ))}
          </div>
          <div className="mt-1 flex h-[24px] items-center justify-center rounded-[6px] bg-teal text-[0.6rem] font-semibold leading-none text-teal-ink">
            Sign up free
          </div>
        </div>
      </div>
    </Screen>
  );
}

function SettingsIllustration() {
  return (
    <Screen className="flex">
      {/* Sidebar */}
      <div className="flex w-[44%] flex-col gap-2 border-r border-line bg-panel-2 p-2.5">
        <div className="flex items-center gap-1.5 px-1 pb-1">
          <span className="h-3 w-3 rounded-[4px] bg-teal/80" />
          <Bar w="44px" className="bg-line-strong" />
        </div>
        <div className="flex flex-col gap-2 px-1">
          <Bar w="70%" />
          <Bar w="55%" />
          <Bar w="62%" />
        </div>
        {/* Account row, highlighted */}
        <div className="mt-auto flex items-center gap-1.5 rounded-[7px] bg-teal-tint p-1.5 ring-1 ring-teal/50">
          <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-teal text-[0.5rem] font-bold leading-none text-teal-ink">
            A
          </span>
          <span className="text-[0.56rem] font-semibold leading-none text-text-primary">Settings</span>
        </div>
      </div>
      {/* Settings panel with tabs */}
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <span className="text-[0.66rem] font-bold leading-none text-text-primary">Settings</span>
        <div className="flex gap-2.5 border-b border-line text-[0.56rem] leading-none">
          <span className="pb-1.5 text-text-muted-2">Account</span>
          <span className="-mb-px border-b-2 border-teal pb-1.5 font-semibold text-teal">Plan</span>
        </div>
        <div className="flex flex-col gap-2">
          <Bar w="80%" />
          <Bar w="60%" />
          <Bar w="70%" />
        </div>
      </div>
    </Screen>
  );
}

function RedeemIllustration({ code }: { code: string }) {
  return (
    <Screen className="flex flex-col justify-center gap-2.5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[0.66rem] font-bold leading-none text-text-primary">Plan</span>
        <span
          className={`rounded-full border ${GOLD_BORDER} px-[6px] py-[3px] text-[0.52rem] font-semibold uppercase leading-none tracking-[0.06em] text-yellow`}
        >
          Plus
        </span>
      </div>
      <span className="text-[0.6rem] leading-none text-text-muted">Have a code?</span>
      <div className="flex gap-1.5">
        <div className="flex h-[26px] min-w-0 flex-1 items-center rounded-[6px] border border-teal/60 bg-panel-2 px-2">
          <span className={`${dmMono.className} truncate text-[0.6rem] leading-none tracking-[0.04em] text-text-primary`}>
            {code}
          </span>
          <span className="ml-[2px] h-[11px] w-px shrink-0 bg-teal" />
        </div>
        <div className="flex h-[26px] shrink-0 items-center rounded-[6px] bg-teal px-2.5 text-[0.6rem] font-semibold leading-none text-teal-ink">
          Redeem
        </div>
      </div>
      <Bar w="58%" />
    </Screen>
  );
}

/* ---------- Page ---------- */

export default function BetaInvitePage() {
  const steps = [
    { title: "Sign up free", art: <SignUpIllustration /> },
    { title: "Open Settings → Plan", art: <SettingsIllustration /> },
    { title: "Paste the code", art: <RedeemIllustration code={BETA_CODE} /> },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto flex w-full max-w-[1040px] flex-col items-center px-4 pb-20 pt-10 text-center sm:px-6 md:px-14 md:pb-24 md:pt-16">
        {/* Intro */}
        <span
          className={`inline-flex items-center gap-2.5 rounded-full border ${GOLD_BORDER} px-4 py-2 text-[15px] font-semibold leading-none text-yellow`}
        >
          <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-yellow" />
          Beta invite
        </span>
        <h1 className="mt-7 max-w-[16ch] text-[clamp(2.4rem,7vw,4.4rem)] font-bold leading-[1] tracking-[-0.035em] [text-wrap:balance]">
          You&apos;re invited to the Study Brew Beta.
        </h1>
        <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-[1.6] text-text-muted [text-wrap:balance]">
          Get Study Brew Plus free, for life. Unlimited words, notebooks and decks.
        </p>

        {/* Code */}
        <div className="mt-9 flex w-full max-w-[460px] flex-col items-center gap-4 rounded-[18px] border border-teal/45 bg-gradient-to-b from-teal/[0.08] to-transparent p-5 sm:flex-row sm:justify-between sm:p-6 sm:text-left">
          <div className="min-w-0">
            <span className="block text-[0.74rem] font-medium text-text-muted-2">Your code</span>
            <span
              className={`${dmMono.className} mt-1.5 block break-all text-[clamp(1.5rem,6.5vw,2rem)] leading-none tracking-[0.06em] text-text-primary`}
            >
              {BETA_CODE}
            </span>
          </div>
          <CopyCode code={BETA_CODE} className="w-full shrink-0 sm:w-auto" />
        </div>

        {/* Steps */}
        <section aria-labelledby="beta-steps" className="mt-16 w-full md:mt-20">
          <h2 id="beta-steps" className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.1]">
            How to use your code
          </h2>
          <ol className="mt-7 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-4 rounded-[18px] border border-line bg-panel-2 p-4 md:p-5">
                {s.art}
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-tint text-[0.8rem] font-bold text-teal">
                    {i + 1}
                  </span>
                  <h3 className="text-[1rem] font-bold leading-snug">{s.title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Call to action */}
        <div className="mt-14 flex w-full flex-col items-center md:mt-16">
          <a
            href={APP_WELCOME_URL}
            className="inline-flex w-full max-w-[320px] items-center justify-center rounded-[12px] bg-teal px-8 py-4 text-[1.02rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
          >
            Sign up free
          </a>
          <p className="mt-4 text-[0.88rem] text-text-muted">
            Already have an account?{" "}
            <a href={APP_LOGIN_URL} className="font-semibold text-text-primary underline-offset-2 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
