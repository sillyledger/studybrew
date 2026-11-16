"use client";

import { useState } from "react";

// One question with a few answers: green when right, coral when wrong.

export default function StoryQuiz({
  question,
  options,
  correctIndex,
}: {
  question: string;
  options: string[];
  correctIndex: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const right = picked === correctIndex;

  return (
    <section aria-labelledby="story-quiz" className="mt-12 rounded-[20px] bg-panel p-5 sm:p-6">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-teal">Finished? One quick question</p>
      <h2 id="story-quiz" className="mt-2 text-[1.12rem] font-bold leading-[1.4] tracking-[-0.02em]">
        {question}
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {options.map((option, i) => {
          const isRight = answered && i === correctIndex;
          const isWrong = answered && i === picked && !right;
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`flex min-h-12 items-center gap-3 rounded-[12px] border px-4 py-2.5 text-left text-[0.92rem] transition-colors ${
                isRight
                  ? "border-teal bg-teal-tint text-text-primary"
                  : isWrong
                    ? "border-coral bg-coral-tint text-text-primary"
                    : answered
                      ? "border-line text-text-muted"
                      : "border-line-strong text-text-primary hover:bg-panel-hover"
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.72rem] font-bold ${
                  isRight ? "bg-teal text-teal-ink" : isWrong ? "bg-coral text-ink" : "bg-panel-hover text-text-muted"
                }`}
              >
                {isRight ? "✓" : isWrong ? "✕" : String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className={`mt-3.5 text-[0.88rem] empty:hidden font-semibold ${right ? "text-teal" : "text-coral"}`}>
        {answered && (right ? "That's right. Nice listening!" : "Not quite. The right answer is in green.")}
      </p>
    </section>
  );
}
