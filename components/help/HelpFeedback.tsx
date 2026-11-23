"use client";

import { useState } from "react";

const BUTTON =
  "rounded-lg border border-line-strong px-3.5 py-1.5 text-[0.8rem] font-semibold text-text-primary transition-colors hover:bg-panel-hover";

export default function HelpFeedback() {
  const [answered, setAnswered] = useState(false);
  return (
    <div className="mt-8 flex min-h-[44px] flex-wrap items-center gap-3 border-t border-line pt-6 text-[0.86rem] text-text-muted">
      {answered ? (
        <p role="status">Thanks for the feedback.</p>
      ) : (
        <>
          <span>Was this article helpful?</span>
          <button type="button" className={BUTTON} onClick={() => setAnswered(true)}>
            Yes
          </button>
          <button type="button" className={BUTTON} onClick={() => setAnswered(true)}>
            No
          </button>
        </>
      )}
    </div>
  );
}
