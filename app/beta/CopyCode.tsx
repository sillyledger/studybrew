"use client";

import { useEffect, useRef, useState } from "react";

/** Copies text to the clipboard. Falls back to execCommand for browsers
    without the Clipboard API (older in-app browsers, non-HTTPS previews). */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the fallback
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyCode({ code, className = "" }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function onClick() {
    if (!(await copyText(code))) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? "Code copied" : `Copy code ${code}`}
      className={`inline-flex min-w-[92px] items-center justify-center rounded-[10px] px-4 py-2.5 text-[0.88rem] font-semibold transition-colors ${
        copied
          ? "bg-teal-tint text-teal"
          : "border border-line-strong text-text-primary hover:bg-panel-hover"
      } ${className}`}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
