"use client";

import { useState } from "react";

const RATE = "flex-1 rounded-lg px-3 py-1.5 text-[0.74rem] font-bold transition-opacity hover:opacity-90";

export default function ReviewPreview() {
  const [flipped, setFlipped] = useState(false);
  const front = () => setFlipped(false);

  return (
    <div className="my-8 rounded-[16px] border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.12em]">
        <span className="text-text-muted-2">Preview</span>
        <span className="text-teal">Where it happens</span>
      </div>

      <div className="rounded-[14px] border border-line-strong bg-panel-2 p-3">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Flip card to the front" : "Flip card to see the meaning"}
          className="flex min-h-[132px] w-full flex-col items-center justify-center rounded-[12px] border border-line-strong bg-panel px-4 py-5 text-center transition-colors hover:bg-panel-hover"
        >
          {flipped ? (
            <>
              <span className="text-[0.78rem] text-text-muted">theory</span>
              <span className="mt-1 text-[0.74rem] font-semibold text-blue">noun</span>
              <span className="mt-1.5 text-[0.98rem] font-semibold text-text-primary">
                an idea that explains something
              </span>
            </>
          ) : (
            <>
              <span className="text-[1.6rem] font-bold tracking-[-0.03em] text-text-primary">theory</span>
              <span className="mt-1.5 text-[0.68rem] text-text-muted-2">Click to flip, or press space</span>
            </>
          )}
        </button>

        <div className="mt-3 flex gap-2">
          <button type="button" onClick={front} className={`${RATE} border-[1.5px] border-coral text-coral`}>
            Again
          </button>
          <button type="button" onClick={front} className={`${RATE} bg-teal text-teal-ink`}>
            Good
          </button>
          <button type="button" onClick={front} className={`${RATE} border-[1.5px] border-blue text-blue`}>
            Easy
          </button>
        </div>
      </div>
    </div>
  );
}
