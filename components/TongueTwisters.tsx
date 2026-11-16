"use client";

import { Fragment, useEffect, useRef, useState } from "react";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Twister = {
  title: string;
  difficulty: Difficulty;
  focus: string;
  lines: string[];
  note?: string;
};

type Speed = "Slow" | "Normal" | "Fast";
type Filter = "All" | Difficulty;

const READS = 3;

const SPEED_HINT: Record<Speed, string> = {
  Slow: "One word at a time.",
  Normal: "Like you're talking to a friend.",
  Fast: "As fast as you can, without tripping.",
};

const TIPS: Record<string, string> = {
  "S / SH":
    "For S, your tongue sits just behind your top teeth and your lips are relaxed. For SH, round your lips a little and pull your tongue back.",
  P: "Close your lips, then let a small puff of air out. Hold a hand in front of your mouth: you should feel it on every P.",
  "W / CH":
    "For W, round your lips like a small O. For CH, start with your tongue on the roof of your mouth, then release it with a short burst.",
  "F / W":
    "For F, your top teeth gently touch your bottom lip. For W, your teeth don't touch anything: just round your lips.",
  SL: "Say the S first, then let your tongue tip move up for the L. Keep the S short.",
  "R / L":
    "For L, your tongue tip touches just behind your top teeth. For R, your tongue doesn't touch anything: curl it back a little.",
};

// Number tiles rotate through these.
const TILES = [
  "bg-teal/15 text-teal",
  "bg-blue/15 text-blue",
  "bg-yellow/15 text-yellow",
  "bg-purple/15 text-purple",
  "bg-coral/15 text-coral",
];

const DIFFICULTY_PILL: Record<Difficulty, string> = {
  Easy: "border-teal/30 bg-teal/10 text-teal",
  Medium: "border-yellow/30 bg-yellow/10 text-yellow",
  Hard: "border-coral/30 bg-coral/10 text-coral",
};

// The same pills on the cream stage, in darker inks so they read on light.
const DIFFICULTY_PILL_CREAM: Record<Difficulty, string> = {
  Easy: "bg-[#0F6E56]/10 text-[#0F6E56]",
  Medium: "bg-[#a06a00]/10 text-[#8a5c00]",
  Hard: "bg-[#b5502d]/10 text-[#a8441f]",
};

export function twisterSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function focusSounds(focus: string) {
  return focus.split("/").map((s) => s.trim()).filter(Boolean);
}

/** Wraps every focus sound in the line (longest first, so SH wins over S). */
function Highlighted({ line, focus }: { line: string; focus: string }) {
  const sounds = focusSounds(focus).sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${sounds.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = line.split(re);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <b
            key={i}
            className="font-bold text-[#0F6E56] underline decoration-[#0F6E56]/30 decoration-2 underline-offset-[5px]"
          >
            {part}
          </b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  tone = "dark",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  tone?: "dark" | "cream";
}) {
  const wrap =
    tone === "dark"
      ? "border-line bg-panel-2"
      : "border-cream-ink/10 bg-cream-ink/[0.06]";
  const on = tone === "dark" ? "bg-panel-hover text-text-primary" : "bg-cream-ink text-cream";
  const off =
    tone === "dark"
      ? "text-text-muted hover:text-text-primary"
      : "text-cream-muted hover:text-cream-ink";
  return (
    <div role="radiogroup" aria-label={label} className={`inline-flex rounded-[12px] border p-1 ${wrap}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={`rounded-[9px] px-3 py-1.5 text-[0.84rem] font-medium transition-colors ${
            value === opt ? on : off
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function TongueTwisters({ twisters }: { twisters: Twister[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState(0);
  const [line, setLine] = useState(0);
  const [reads, setReads] = useState(0);
  const [speed, setSpeed] = useState<Speed>("Normal");
  const listRef = useRef<HTMLUListElement>(null);

  const visible = twisters
    .map((t, i) => ({ t, i }))
    .filter(({ t }) => filter === "All" || t.difficulty === filter);
  const twister = twisters[selected];

  // Selection lives in the URL (?t=she-sells-seashells).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("t");
    const i = twisters.findIndex((t) => twisterSlug(t.title) === slug);
    if (i > 0) setSelected(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On phones the list scrolls sideways: keep the selected twister in view
  // (horizontally only, so the page itself never jumps).
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("[aria-current='true']");
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    const left = item.offsetLeft - list.offsetLeft - 24;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [selected, filter]);

  function select(i: number) {
    setSelected(i);
    setLine(0);
    setReads(0);
    const url = new URL(window.location.href);
    url.searchParams.set("t", twisterSlug(twisters[i].title));
    window.history.replaceState(null, "", url);
  }

  function changeFilter(f: Filter) {
    setFilter(f);
    if (f !== "All" && twister.difficulty !== f) {
      const first = twisters.findIndex((t) => t.difficulty === f);
      if (first >= 0) select(first);
    }
  }

  function step(delta: number) {
    const pos = visible.findIndex(({ i }) => i === selected);
    const next = visible[(pos + delta + visible.length) % visible.length];
    if (next) select(next.i);
  }

  function nextLine() {
    if (line + 1 < twister.lines.length) {
      setLine(line + 1);
    } else {
      setLine(0);
      setReads((r) => Math.min(READS, r + 1));
    }
  }

  // Keyboard: Enter/Space next line, ↑/↓ previous/next twister.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const onControl = target?.closest("button, a");

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (onControl) target!.blur();
        nextLine();
      } else if (e.key === "Enter") {
        if (onControl) return; // let Enter press the focused button
        e.preventDefault();
        nextLine();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        step(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const done = reads >= READS;

  return (
    <>
      {/* Header */}
      <section className="flex flex-col gap-8 pb-10 pt-10 md:pb-14 md:pt-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
            <span className="h-px w-5 shrink-0 bg-teal-dim" />
            <span>Practice · say it out loud</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            Twist your
            <br />
            <span className="text-teal">tongue.</span>
          </h1>
          <p className="mt-6 max-w-[50ch] text-[1.05rem] leading-[1.65] text-text-muted">
            Classic English tongue twisters, the ones native speakers grew up tripping over.
            Start slow, read it three times, then speed up.
          </p>
        </div>
        <div className="shrink-0">
          <Segmented
            label="Filter by difficulty"
            options={["All", "Easy", "Medium", "Hard"] as const}
            value={filter}
            onChange={changeFilter}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 pb-20 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8 md:pb-24">
        {/* List */}
        <ul
          ref={listRef}
          aria-label="Tongue twisters"
          className="-mx-6 flex snap-x scroll-px-6 gap-2.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:self-start lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {visible.map(({ t, i }) => {
            const active = i === selected;
            return (
              <li key={t.title} className="w-[285px] shrink-0 snap-start lg:w-auto">
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-center gap-3 rounded-[14px] border p-3 text-left transition-colors ${
                    active
                      ? "border-teal bg-teal/[0.07]"
                      : "border-line bg-panel-2 hover:border-line-strong hover:bg-panel"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[0.84rem] font-bold ${
                      TILES[i % TILES.length]
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem] font-semibold leading-snug lg:truncate">{t.title}</span>
                    <span className="block text-[0.76rem] text-text-muted-2">Focus: {t.focus}</span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.7rem] font-medium ${DIFFICULTY_PILL[t.difficulty]}`}
                  >
                    {t.difficulty}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Stage */}
        <div className="min-w-0">
          <section
            aria-label={twister.title}
            className="rounded-[22px] bg-cream p-6 text-cream-ink md:p-9"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[clamp(1.5rem,3vw,1.9rem)] font-bold leading-tight tracking-[-0.025em]">
                  {twister.title}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[0.74rem] font-semibold ${DIFFICULTY_PILL_CREAM[twister.difficulty]}`}
                >
                  {twister.difficulty}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[0.74rem] font-medium text-cream-muted">Focus sounds</span>
                {focusSounds(twister.focus).map((s) => (
                  <span
                    key={s}
                    className="rounded-[8px] bg-[#0F6E56]/10 px-2 py-0.5 text-[0.82rem] font-bold text-[#0F6E56]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 md:mt-10">
              {twister.lines.map((text, li) => (
                <p
                  key={li}
                  onClick={() => setLine(li)}
                  aria-current={li === line ? "true" : undefined}
                  className={`cursor-pointer text-[clamp(1.2rem,3.4vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.01em] transition-colors duration-200 motion-reduce:transition-none ${
                    li === line ? "text-cream-ink" : "text-[#a69a84]"
                  }`}
                >
                  {li === line ? <Highlighted line={text} focus={twister.focus} /> : text}
                </p>
              ))}
            </div>
            {twister.note && (
              <p className="mt-4 text-[0.86rem] text-cream-muted">{twister.note}</p>
            )}

            {/* Controls */}
            <div className="mt-9 border-t border-cream-ink/10 pt-6">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
                <Segmented
                  tone="cream"
                  label="Speed"
                  options={["Slow", "Normal", "Fast"] as const}
                  value={speed}
                  onChange={setSpeed}
                />
                <button
                  type="button"
                  onClick={nextLine}
                  className="rounded-[10px] bg-cream-ink px-5 py-2.5 text-[0.9rem] font-semibold text-cream transition-opacity hover:opacity-90"
                >
                  Next line →
                </button>
                <div className="flex items-center gap-2.5">
                  <span className="text-[0.82rem] font-medium text-cream-muted">Read it 3 times</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: READS }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReads(reads === i + 1 ? i : i + 1)}
                        aria-label={`Read ${i + 1} of ${READS}`}
                        aria-pressed={i < reads}
                        className={`h-4 w-4 rounded-full border-2 transition-colors ${
                          i < reads
                            ? "border-[#0F6E56] bg-[#0F6E56]"
                            : "border-cream-ink/25 hover:border-cream-ink/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[0.86rem] text-cream-muted" aria-live="polite">
                {speed}: {SPEED_HINT[speed]}
              </p>
              {done && (
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[14px] bg-[#0F6E56]/10 px-4 py-3">
                  <span className="text-[0.92rem] font-semibold text-[#0F6E56]">
                    Nice! Try it faster.
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="ml-auto rounded-[9px] bg-[#0F6E56] px-4 py-2 text-[0.85rem] font-semibold text-cream transition-opacity hover:opacity-90"
                  >
                    Next twister →
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Tip */}
          <div className="mt-4 flex gap-3.5 rounded-[18px] border border-line bg-panel-2 p-5">
            <span aria-hidden="true" className="text-[1.2rem] leading-none">
              💡
            </span>
            <p className="text-[0.93rem] leading-[1.6] text-text-muted">
              <b className="font-semibold text-text-primary">Tip for {twister.focus}:</b>{" "}
              {TIPS[twister.focus]}
            </p>
          </div>

          <p className="mt-4 hidden text-[0.78rem] text-text-muted-2 md:block">
            Enter or Space: next line · ↑ ↓: previous or next twister
          </p>
        </div>
      </div>
    </>
  );
}
