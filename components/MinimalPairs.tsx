"use client";

import { useEffect, useRef, useState } from "react";
import PlayButton, { speak, useSpeechSupported } from "@/components/PlayButton";

export type Pair = {
  word1: string;
  respelling1: string;
  highlight1: string;
  word2: string;
  respelling2: string;
  highlight2: string;
  sound: string;
};

export type Group = {
  title: string;
  pairs: Pair[];
};

// Tab label, URL slug, dot colour and tip for each existing group (by title).
const GROUP_META: Record<string, { label: string; slug: string; dot: string; tip: string }> = {
  "Short/Long Vowels": {
    label: "Ship / sheep",
    slug: "vowels",
    dot: "bg-teal",
    tip: "Short I vs long EE: keep the short one quick and relaxed, and stretch the long one.",
  },
  "L vs R": {
    label: "L vs R",
    slug: "l-r",
    dot: "bg-blue",
    tip: "For L, touch the tongue tip behind your top teeth. For R, don't touch anything and curl the tongue back a little.",
  },
  "TH Sounds": {
    label: "TH sounds",
    slug: "th",
    dot: "bg-yellow",
    tip: "For TH, put the tip of your tongue between your teeth and blow gently. S and F never need your tongue out.",
  },
  "V vs W": {
    label: "V vs W",
    slug: "v-w",
    dot: "bg-coral",
    tip: "For V, your top teeth touch your bottom lip and buzz. For W, round your lips and don't use your teeth.",
  },
  "Final Consonant Voicing": {
    label: "Final sounds",
    slug: "final",
    dot: "bg-purple",
    tip: "The last sound changes the word. Make it clear: a short stop for P/T/K/S, a voiced buzz for B/D/G/Z.",
  },
};

function meta(group: Group) {
  return (
    GROUP_META[group.title] ?? {
      label: group.title,
      slug: group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      dot: "bg-teal",
      tip: "",
    }
  );
}

const ROUNDS = 10;

function Respelling({
  text,
  highlight,
  accentClass,
}: {
  text: string;
  highlight: string;
  accentClass: string;
}) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className={`font-bold ${accentClass}`}>{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

function PairWord({
  word,
  respelling,
  highlight,
  accent,
  align,
  canPlay,
}: {
  word: string;
  respelling: string;
  highlight: string;
  accent: string;
  align: "left" | "right";
  canPlay: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2.5 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      {canPlay && <PlayButton text={word} label={`Play ${word}`} />}
      <div className="min-w-0">
        <div className="truncate text-[1.12rem] font-bold leading-tight">{word}</div>
        <div className="mt-0.5 text-[0.78rem] font-medium tracking-[0.02em] text-text-muted">
          <Respelling text={respelling} highlight={highlight} accentClass={accent} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Quiz ---------- */

type Question = { pair: number; which: 0 | 1 };

function randomQuestion(group: Group, prev: Question | null): Question {
  for (let tries = 0; tries < 10; tries++) {
    const q: Question = {
      pair: Math.floor(Math.random() * group.pairs.length),
      which: Math.random() < 0.5 ? 0 : 1,
    };
    if (!prev || q.pair !== prev.pair || q.which !== prev.which) return q;
  }
  return { pair: 0, which: 0 };
}

function wordOf(group: Group, q: Question) {
  const p = group.pairs[q.pair];
  return q.which === 0 ? p.word1 : p.word2;
}

function Quiz({ group }: { group: Group }) {
  const [q, setQ] = useState<Question | null>(null);
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<0 | 1 | null>(null);
  const [heard, setHeard] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A new group (this component is keyed by it) starts a fresh quiz.
  useEffect(() => {
    setQ(randomQuestion(group, null));
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [group]);

  function play(question = q) {
    if (!question) return;
    setHeard(true);
    speak(wordOf(group, question), {
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
    });
  }

  function pick(choice: 0 | 1) {
    if (!q || picked !== null || !heard) return;
    setPicked(choice);
    const nextResults = [...results, choice === q.which];
    setResults(nextResults);
    timer.current = setTimeout(() => {
      setPicked(null);
      if (nextResults.length >= ROUNDS) return;
      const next = randomQuestion(group, q);
      setQ(next);
      setRound(nextResults.length);
      play(next);
    }, 1000);
  }

  function restart() {
    const next = randomQuestion(group, q);
    setQ(next);
    setRound(0);
    setResults([]);
    setPicked(null);
    setHeard(false);
  }

  const finished = results.length >= ROUNDS && picked === null;
  const score = results.filter(Boolean).length;
  const pair = q ? group.pairs[q.pair] : null;

  return (
    <div className="rounded-[20px] border border-line-strong bg-panel p-6">
      <div className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-text-muted-2">
        Can you hear it?
      </div>

      {finished ? (
        <div className="py-6 text-center">
          <div className="text-[2rem] font-bold leading-tight tracking-[-0.03em]">
            You heard {score} of {ROUNDS}.
          </div>
          <p className="mt-2 text-[0.9rem] text-text-muted">
            {score === ROUNDS ? "Perfect ears." : "Have another go, or try a different sound."}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-6 rounded-[10px] bg-teal px-5 py-2.5 text-[0.9rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
          >
            Play again
          </button>
        </div>
      ) : (
        <>
          <h2 className="mt-3 text-[1.3rem] font-bold leading-tight">Which word did you hear?</h2>
          <p className="mt-1 text-[0.86rem] text-text-muted">Press play, then pick the word.</p>

          <div className="mt-6 flex flex-col items-center">
            <button
              type="button"
              onClick={() => play()}
              aria-label="Play the word"
              className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-teal text-teal-ink transition-transform hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100 ${
                playing ? "ring-[6px] ring-teal/25" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-current">
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => play()}
              className={`mt-2.5 text-[0.8rem] font-medium text-text-muted transition-colors hover:text-text-primary ${
                heard ? "" : "invisible"
              }`}
            >
              Play again
            </button>
          </div>

          {pair && q && (
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {([0, 1] as const).map((i) => {
                const word = i === 0 ? pair.word1 : pair.word2;
                const isRight = i === q.which;
                let state = "border-line-strong bg-panel-2 hover:border-text-muted-2";
                let mark = "";
                if (picked !== null) {
                  if (isRight) {
                    state = "border-teal bg-teal/10 text-teal";
                    mark = "✓";
                  } else if (i === picked) {
                    state = "border-coral bg-coral/10 text-coral";
                    mark = "✗";
                  } else {
                    state = "border-line bg-panel-2 opacity-50";
                  }
                }
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => pick(i)}
                    disabled={!heard || picked !== null}
                    className={`flex items-center justify-center gap-2 rounded-[12px] border px-3 py-3.5 text-[1.05rem] font-bold transition-colors disabled:cursor-default ${state} ${
                      !heard ? "opacity-50" : ""
                    }`}
                  >
                    {word}
                    {mark && <span aria-hidden="true">{mark}</span>}
                  </button>
                );
              })}
            </div>
          )}
          <p className="sr-only" aria-live="polite">
            {picked !== null && q
              ? picked === q.which
                ? "Right."
                : `Not quite. It was ${wordOf(group, q)}.`
              : ""}
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="text-[0.8rem] font-medium text-text-muted">
              Round {Math.min(round + 1, ROUNDS)} of {ROUNDS}
            </span>
            <div className="flex gap-1" aria-hidden="true">
              {Array.from({ length: ROUNDS }, (_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i < results.length
                      ? results[i]
                        ? "bg-teal"
                        : "bg-coral"
                      : i === round
                        ? "border border-text-muted"
                        : "bg-line-strong"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <p className="mt-5 border-t border-line pt-4 text-[0.74rem] leading-[1.5] text-text-muted-2">
        Uses your device&apos;s voice, so it may sound a little different on each phone.
      </p>
    </div>
  );
}

/* ---------- Page body ---------- */

export default function MinimalPairs({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0);
  const supported = useSpeechSupported();
  const canPlay = supported !== false;
  const group = groups[active];
  const m = meta(group);

  // Active group lives in the URL (?g=l-r).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("g");
    const i = groups.findIndex((g) => meta(g).slug === slug);
    if (i > 0) setActive(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(i: number) {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setActive(i);
    const url = new URL(window.location.href);
    url.searchParams.set("g", meta(groups[i]).slug);
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      {/* Header */}
      <section className="pb-8 pt-10 md:pb-10 md:pt-16">
        <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
          <span className="h-px w-5 shrink-0 bg-teal-dim" />
          <span>Practice · train your ear</span>
        </div>
        <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
          Hear the
          <br />
          <span className="text-teal">difference.</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-text-muted">
          Pairs of words that sound almost the same except for one sound. Listen to both, say
          both, then test your ear.
        </p>
      </section>

      {/* Group tabs */}
      <div
        role="tablist"
        aria-label="Sound groups"
        className="-mx-6 mb-8 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
      >
        {groups.map((g, i) => {
          const gm = meta(g);
          const on = i === active;
          return (
            <button
              key={g.title}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => choose(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.88rem] font-medium transition-colors ${
                on
                  ? "border-line-strong bg-panel text-text-primary"
                  : "border-line text-text-muted hover:border-line-strong hover:text-text-primary"
              }`}
            >
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${gm.dot}`} />
              {gm.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 pb-20 md:pb-24 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-8">
        {/* Pairs */}
        <div className="min-w-0" role="tabpanel" aria-label={m.label}>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.pairs.map((pair) => (
              <li
                key={`${pair.word1}-${pair.word2}`}
                className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-2xl border border-line bg-panel-2 p-4"
              >
                <PairWord
                  word={pair.word1}
                  respelling={pair.respelling1}
                  highlight={pair.highlight1}
                  accent="text-teal"
                  align="left"
                  canPlay={canPlay}
                />
                <span className="rounded-full border border-line px-2 py-0.5 text-[0.68rem] font-medium text-text-muted-2">
                  vs
                </span>
                <PairWord
                  word={pair.word2}
                  respelling={pair.respelling2}
                  highlight={pair.highlight2}
                  accent="text-yellow"
                  align="right"
                  canPlay={canPlay}
                />
              </li>
            ))}
          </ul>

          {m.tip && (
            <div className="mt-4 flex gap-3.5 rounded-[18px] border border-dashed border-line-strong p-5">
              <span aria-hidden="true" className="text-[1.2rem] leading-none">
                💡
              </span>
              <p className="text-[0.93rem] leading-[1.6] text-text-muted">{m.tip}</p>
            </div>
          )}
        </div>

        {/* Quiz */}
        <div className="lg:self-start">
          {supported === false ? (
            <div className="rounded-[20px] border border-line-strong bg-panel p-6">
              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-text-muted-2">
                Can you hear it?
              </div>
              <p className="mt-3 text-[0.92rem] leading-[1.6] text-text-muted">
                Your browser can&apos;t play words out loud, so the listening quiz is turned off.
                You can still read each pair out loud and feel the difference.
              </p>
            </div>
          ) : (
            <Quiz key={group.title} group={group} />
          )}
        </div>
      </div>
    </>
  );
}
