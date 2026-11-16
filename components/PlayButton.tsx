"use client";

import { useEffect, useState } from "react";

// Pronunciation uses the browser's own voice (speechSynthesis), so it can
// sound a little different on each device.

/** null until mounted, then whether this browser can speak. */
export function useSpeechSupported() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);
  return supported;
}

/** Speak a word. Cancels anything already playing. */
export function speak(
  text: string,
  { onStart, onEnd }: { onStart?: () => void; onEnd?: () => void } = {}
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  onStart?.();
  window.speechSynthesis.speak(utterance);
}

export default function PlayButton({
  text,
  label,
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      type="button"
      onClick={() =>
        speak(text, { onStart: () => setPlaying(true), onEnd: () => setPlaying(false) })
      }
      aria-label={label ?? `Play pronunciation of ${text}`}
      data-playing={playing || undefined}
      className={
        className ??
        `flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
          playing
            ? "border-teal bg-teal text-teal-ink"
            : "border-line-strong text-text-muted hover:border-teal hover:text-teal"
        }`
      }
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-3.5 w-3.5 fill-current">
        <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
      </svg>
    </button>
  );
}
