"use client";

export default function PlayButton({
  text,
  label,
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  function handlePlay() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={label ?? `Play pronunciation of ${text}`}
      className={
        className ??
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-[0.6rem] text-text-muted transition-colors hover:border-teal hover:text-teal"
      }
    >
      ▶
    </button>
  );
}
