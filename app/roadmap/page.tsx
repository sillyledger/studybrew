import type { Metadata } from "next";
import Nav from "@/components/Nav";
import {
  ROADMAP_UPDATED,
  STAGES,
  betaProgress,
  itemsForStage,
  type RoadmapItem,
  type Stage,
} from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Roadmap | Study Brew",
  description:
    "The public Study Brew roadmap: what's being built right now, what's coming next, what's already live in the app, and ideas for someday.",
};

/* ---------- Small building blocks ---------- */

function StageDot({ stage, className = "" }: { stage: Stage; className?: string }) {
  const styles: Record<Stage, string> = {
    served: "bg-teal",
    brewing:
      "bg-blue shadow-[0_0_0_4px_rgba(124,172,221,0.16),0_0_14px_rgba(124,172,221,0.55)]",
    next: "border-2 border-coral",
    someday: "border-[1.5px] border-dashed border-text-muted-2",
  };
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${styles[stage]} ${className}`}
    />
  );
}

const PILL_STYLES: Record<Stage, string> = {
  brewing: "border border-blue/30 bg-blue/10 text-blue",
  next: "border border-coral/30 bg-coral/10 text-coral",
  served: "border border-teal/30 bg-teal/10 text-teal",
  someday: "border border-dashed border-line-strong text-text-muted",
};

function countLabel(n: number) {
  return `${n} ${n === 1 ? "item" : "items"}`;
}

function ItemMeta({ item }: { item: RoadmapItem }) {
  if (!item.date && !item.buildLogUrl) return null;
  return (
    <div className="flex shrink-0 items-center gap-3 text-[0.8rem] font-medium md:flex-col md:items-end md:gap-1.5 md:text-right">
      {item.date && <span className="whitespace-nowrap text-text-muted-2">{item.date}</span>}
      {item.buildLogUrl && (
        <a
          href={item.buildLogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-text-muted transition-colors hover:text-text-primary"
        >
          Build log ↗
        </a>
      )}
    </div>
  );
}

/* ---------- Hero cup ---------- */

// Cup geometry (SVG user units).
const CUP_TOP = 66;
const CUP_BOTTOM = 232;
const CUP_BODY = `M44 ${CUP_TOP} H214 V174 Q214 ${CUP_BOTTOM} 156 ${CUP_BOTTOM} H102 Q44 ${CUP_BOTTOM} 44 174 Z`;

function BetaCup() {
  const { done, total, fraction } = betaProgress();
  const liquidTop = CUP_BOTTOM - fraction * (CUP_BOTTOM - CUP_TOP);
  // Keep the number inside the liquid when there's room, otherwise sit it
  // near the bottom of the cup. The part outside the liquid is drawn light,
  // the part inside dark, so it reads at any fill level.
  const numberY = Math.min((liquidTop + CUP_BOTTOM) / 2 + 4, CUP_BOTTOM - 30);
  const labelY = numberY + 17;

  const text = (fill: string) => (
    <g fill={fill} textAnchor="middle" fontFamily="var(--font-sans), system-ui, sans-serif">
      <text x="129" y={numberY} fontSize="46" fontWeight="700" letterSpacing="-0.03em">
        {done}/{total}
      </text>
      <text x="129" y={labelY} fontSize="12.5" fontWeight="500">
        Road to beta
      </text>
    </g>
  );

  return (
    <figure className="mx-auto flex w-full max-w-[340px] flex-col items-center">
      <svg
        viewBox="0 0 290 260"
        role="img"
        aria-label={`Road to beta: ${done} of ${total} milestones done`}
        className="w-full"
      >
        <defs>
          <clipPath id="roadmap-cup-body">
            <path d={CUP_BODY} />
          </clipPath>
          <clipPath id="roadmap-cup-liquid">
            <rect x="0" y={liquidTop} width="290" height={260 - liquidTop} />
          </clipPath>
          <linearGradient id="roadmap-cup-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6fd6b2" />
            <stop offset="1" stopColor="#4fb892" />
          </linearGradient>
        </defs>

        {/* Steam */}
        <g
          fill="none"
          stroke="var(--color-text-muted-2)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path className="roadmap-steam" d="M99 52 c-9 -9 9 -15 0 -24 c-9 -9 9 -14 0 -22" />
          <path
            className="roadmap-steam [animation-delay:0.6s]"
            d="M129 48 c-9 -9 9 -15 0 -24 c-9 -9 9 -14 0 -22"
          />
          <path
            className="roadmap-steam [animation-delay:1.2s]"
            d="M159 52 c-9 -9 9 -15 0 -24 c-9 -9 9 -14 0 -22"
          />
        </g>

        {/* Saucer */}
        <path
          d="M24 246 H250"
          stroke="var(--color-border-strong)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Handle */}
        <path
          d="M214 100 C 262 100, 262 170, 214 170"
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Cup body, liquid and label */}
        <path d={CUP_BODY} fill="var(--color-panel-2)" />
        <g clipPath="url(#roadmap-cup-body)">
          <rect
            x="0"
            y={liquidTop}
            width="290"
            height={260 - liquidTop}
            fill="url(#roadmap-cup-fill)"
          />
          {fraction > 0 && fraction < 1 && (
            <rect x="0" y={liquidTop} width="290" height="3" fill="#8ee3c4" opacity="0.7" />
          )}
          {text("var(--color-text-primary)")}
          <g clipPath="url(#roadmap-cup-liquid)">{text("#06291d")}</g>
        </g>
        <path
          d={CUP_BODY}
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
      <figcaption className="mt-3 text-[0.86rem] font-medium text-text-muted">
        {done} of {total} beta milestones done
      </figcaption>
    </figure>
  );
}

/* ---------- Stage lists ---------- */

function BrewingList({ items }: { items: RoadmapItem[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => (
        <li
          key={item.title}
          className="flex gap-4 rounded-2xl border border-line bg-panel p-5 md:p-6"
        >
          <StageDot stage="brewing" className="mt-[0.5rem]" />
          <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:gap-6">
            <div className="min-w-0 flex-1">
              <h3 className="text-[1.15rem] font-bold leading-snug">{item.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-[1.6] text-text-muted">
                {item.description}
              </p>
              {item.progress && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: item.progress.total }, (_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-7 rounded-full ${
                          i < item.progress!.done ? "bg-blue" : "bg-line-strong"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[0.78rem] font-medium text-text-muted-2">
                    {item.progress.done} of {item.progress.total} steps
                  </span>
                </div>
              )}
            </div>
            <ItemMeta item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function PlainList({ items, stage }: { items: RoadmapItem[]; stage: Stage }) {
  return (
    <ul className="flex flex-col divide-y divide-line">
      {items.map((item) => (
        <li key={item.title} className="flex gap-4 py-5 first:pt-1 last:pb-1">
          <StageDot stage={stage} className="mt-[0.5rem]" />
          <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:gap-6">
            <div className="min-w-0 flex-1">
              <h3 className="text-[1.1rem] font-bold leading-snug">{item.title}</h3>
              <p className="mt-1 text-[0.95rem] leading-[1.6] text-text-muted">
                {item.description}
              </p>
            </div>
            <ItemMeta item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SomedayList({ items }: { items: RoadmapItem[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item) => (
        <li
          key={item.title}
          className="flex-[1_1_220px] rounded-2xl border border-dashed border-line-strong p-5"
        >
          <h3 className="text-[1.05rem] font-bold leading-snug">{item.title}</h3>
          <p className="mt-1 text-[0.9rem] leading-[1.55] text-text-muted">{item.description}</p>
          <ItemMeta item={item} />
        </li>
      ))}
    </ul>
  );
}

/* ---------- Page ---------- */

export default function RoadmapPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Hero */}
        <section className="grid items-center gap-12 pb-16 pt-10 md:grid-cols-[1.35fr_1fr] md:pb-20 md:pt-16">
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
              <span className="h-px w-5 shrink-0 bg-teal-dim" />
              <span>Public roadmap, updated {ROADMAP_UPDATED}</span>
            </div>
            <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              Brewed in
              <br />
              the open.
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-[1.65] text-text-muted">
              A note-taking app for language learners. Every feature moves from the shelf
              to your cup. Here&apos;s where each one is right now.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.84rem] font-medium text-text-muted">
              {(
                [
                  ["served", "Served"],
                  ["brewing", "Brewing"],
                  ["next", "Next pour"],
                  ["someday", "Someday"],
                ] as const
              ).map(([stage, label]) => (
                <li key={stage} className="flex items-center gap-2">
                  <StageDot stage={stage} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <BetaCup />
        </section>

        {/* Stage sections */}
        {STAGES.map(({ stage, tag, heading, text }) => {
          const items = itemsForStage(stage);
          return (
            <section
              key={stage}
              aria-labelledby={`roadmap-${stage}`}
              className="grid gap-8 border-t border-line py-12 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14 md:py-16"
            >
              <div className="md:sticky md:top-24 md:self-start">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[0.78rem] font-medium ${PILL_STYLES[stage]}`}
                >
                  {tag}
                </span>
                <h2
                  id={`roadmap-${stage}`}
                  className="mt-4 text-[clamp(1.9rem,3vw,2.4rem)] font-bold leading-[1.05]"
                >
                  {heading}
                </h2>
                <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-[1.6] text-text-muted">
                  {text}
                </p>
                <p className="mt-4 text-[0.8rem] font-medium text-text-muted-2">
                  {countLabel(items.length)}
                </p>
              </div>

              <div className="min-w-0">
                {stage === "brewing" && <BrewingList items={items} />}
                {(stage === "next" || stage === "served") && (
                  <PlainList items={items} stage={stage} />
                )}
                {stage === "someday" && <SomedayList items={items} />}
              </div>
            </section>
          );
        })}

        {/* Follow the build */}
        <section className="pb-20 pt-4 md:pb-24">
          <div className="flex flex-col gap-6 rounded-[22px] border border-teal/40 bg-gradient-to-r from-teal/[0.08] to-blue/[0.08] p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div>
              <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold leading-[1.05]">
                Follow the build.
              </h2>
              <p className="mt-2.5 max-w-[48ch] text-[0.98rem] leading-[1.6] text-text-muted">
                Every step of Study Brew, written up as it happens in the build series.
              </p>
            </div>
            <a
              href="https://www.pieterborremans.com/series"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] bg-text-primary px-5 py-3 text-[0.9rem] font-semibold text-background transition-opacity hover:opacity-90 md:self-auto"
            >
              Read the series ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
