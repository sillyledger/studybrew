"use client";

import { useEffect, useRef, useState } from "react";

export default function TapWordPreview() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const wordRef = useRef<HTMLSpanElement>(null);

  // Close the popover on a click outside the word and its popover.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wordRef.current && !wordRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="my-8 rounded-[16px] border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.12em]">
        <span className="text-text-muted-2">Preview</span>
        <span className="text-teal">Where it happens</span>
      </div>

      <div className="rounded-[14px] border border-line-strong bg-panel-2 p-3">
        <div className="min-h-[190px] rounded-[12px] border border-line-strong bg-panel px-4 py-4">
          <p className="text-[0.88rem] leading-[1.9] text-white/80">
            One{" "}
            <span ref={wordRef} className="relative inline-block">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className={`cursor-pointer rounded px-0.5 text-text-primary transition-colors hover:bg-teal/15 ${
                  saved ? "border-b-2 border-teal pb-px" : ""
                }`}
              >
                theory
              </button>
              {open && (
                <span
                  role="dialog"
                  aria-label="theory"
                  className="absolute left-0 top-full z-10 mt-1.5 block w-[220px] rounded-[10px] border border-line-strong bg-panel-2 p-3 text-left leading-normal shadow-[0_12px_24px_-10px_rgba(0,0,0,0.7)]"
                >
                  <b className="text-[0.86rem] font-bold text-text-primary">theory</b>
                  <span className="ml-1.5 text-[0.7rem] font-semibold text-blue">noun</span>
                  <span className="mt-1 block text-[0.76rem] text-text-muted">an idea that explains something</span>
                  {saved ? (
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-bold text-teal">
                      <span aria-hidden="true">✓</span> Saved
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSaved(true)}
                      className="mt-2 rounded-lg bg-teal px-3 py-1.5 text-[0.72rem] font-bold text-teal-ink transition-opacity hover:opacity-90"
                    >
                      Save word
                    </button>
                  )}
                </span>
              )}
            </span>{" "}
            says the brain uses the night to tidy up.
          </p>
        </div>
      </div>
    </div>
  );
}
