"use client";

import { useEffect, useState } from "react";

const STAGES = ["reading", "captured", "saved"] as const;
type Stage = (typeof STAGES)[number];

const DURATIONS: Record<Stage, number> = {
  reading: 2200,
  captured: 1600,
  saved: 2800,
};

const STEPS: { key: Stage; label: string }[] = [
  { key: "reading", label: "Reading" },
  { key: "captured", label: "Captured" },
  { key: "saved", label: "Saved" },
];

export default function CaptureDemo() {
  const [stage, setStage] = useState<Stage>("reading");

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (STAGES.indexOf(stage) + 1) % STAGES.length;
      setStage(STAGES[nextIndex]);
    }, DURATIONS[stage]);
    return () => clearTimeout(timer);
  }, [stage]);

  const stageIndex = STAGES.indexOf(stage);
  const wordActive = stage !== "reading";
  const flashVisible = stage === "captured" || stage === "saved";
  const isSaved = stage === "saved";

  return (
    <div className="relative h-[480px] min-[360px]:h-[450px] md:h-[420px]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex flex-col rounded-2xl border border-line bg-panel p-7">
          <div className="mb-4 font-mono text-[0.66rem] uppercase tracking-wide text-text-muted-2">
            From &quot;Daniel&apos;s first day&quot;
          </div>
          <div className="text-[1.15rem] leading-[1.7] text-text-muted md:text-[1.28rem]">
            Daniel felt completely{" "}
            <span
              className={`rounded px-[3px] transition-[background-color,color] duration-300 ease-out motion-reduce:transition-none ${
                wordActive
                  ? "bg-teal-tint text-teal"
                  : "text-text-primary shadow-[inset_0_-2px_0_0_var(--color-teal)]"
              }`}
            >
              overwhelmed
            </span>{" "}
            walking into the office on his first morning.
          </div>

          <div
            className={`mt-auto flex items-center gap-2 pt-4 font-mono text-[0.7rem] text-text-muted-2 transition-opacity duration-300 motion-reduce:transition-none ${
              flashVisible ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="h-4 w-4 shrink-0 rounded-full border-[1.5px] border-teal-dim" />
            tap a word to save it
          </div>

          <div className="mt-5 flex gap-1.5">
            {STEPS.map((step, i) => {
              const isCurrent = i === stageIndex;
              const isPast = i < stageIndex;
              return (
                <span
                  key={step.key}
                  className={`flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wide transition-colors ${
                    isCurrent ? "text-teal" : "text-text-muted-2"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      isCurrent ? "bg-teal" : isPast ? "bg-teal-dim" : "bg-line"
                    }`}
                  />
                  {step.label}
                </span>
              );
            })}
          </div>
        </div>

        <div
          className={`absolute bottom-[56px] min-[360px]:bottom-[64px] right-4 h-[136px] w-[210px] md:-bottom-[18px] md:-right-[14px] md:h-[150px] md:w-[220px] rotate-3 [perspective:900px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.3,1)] motion-reduce:transition-none ${
            flashVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-[18px] scale-90 opacity-0"
          }`}
        >
          <div
            className={`relative h-full w-full rounded-[14px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.3,1)] motion-reduce:transition-none [transform-style:preserve-3d] ${
              isSaved ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 flex flex-col rounded-[14px] border border-line bg-panel-2 p-[1.1rem] [backface-visibility:hidden]">
              <div className="font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-2">
                New word
              </div>
              <div className="mt-2 text-[1.15rem] font-bold">overwhelmed</div>
            </div>
            <div className="absolute inset-0 flex flex-col rounded-[14px] overflow-hidden border border-teal-dim bg-panel-2 p-[1.1rem] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="pointer-events-none absolute inset-0 bg-teal-tint" />
              <div className="relative font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-2">
                Saved to your notes
              </div>
              <div className="relative mt-2 text-[0.82rem] leading-[1.5] text-text-muted">
                <b className="font-semibold text-teal">adj.</b> having too much to
                deal with at once — from Daniel&apos;s story.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
