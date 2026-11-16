"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { SIGNUP } from "@/lib/site";

// Tap-a-word for /stories/[slug]. The story text is rendered on the server as
// <span data-w="key"> words; TappableText listens for taps on its wrapper
// (one handler, no per-word JS), looks the word up on tap only, and keeps the
// results in memory. Saved words live in this page's state only (nothing is
// stored): saving opens the sign-up sheet.
//
// Story Valley uses TappableText with canSave={false} and no provider: the
// popover shows the word and its meaning with only a Close button.

const DEFINE_URL = "https://app.studybrew.co/api/public/define?word=";
const POPOVER_WIDTH = 300;

type Definition = { word: string; part_of_speech: string | null; phonetic: string | null; meaning: string };
type Lookup = { status: "loading" } | { status: "done"; def: Definition | null };
type SavedWord = { word: string; meaning: string };

// One lookup per word per page view (shared across taps).
const cache = new Map<string, Promise<Definition | null>>();
function define(key: string): Promise<Definition | null> {
  let hit = cache.get(key);
  if (!hit) {
    hit = fetch(DEFINE_URL + encodeURIComponent(key))
      .then((r) => (r.ok ? (r.json() as Promise<Definition>) : null))
      .then((d) => (d && d.meaning ? d : null))
      .catch(() => {
        cache.delete(key); // a network error can be retried
        return null;
      });
    cache.set(key, hit);
  }
  return hit;
}

/* ---------- Saved words (page state) ---------- */

const WordsContext = createContext<{
  saved: SavedWord[];
  save: (w: SavedWord) => void;
  sheet: SavedWord | null;
  closeSheet: () => void;
} | null>(null);

function useWords() {
  const ctx = useContext(WordsContext);
  if (!ctx) throw new Error("StoryWords components must be inside <StoryWordsProvider>");
  return ctx;
}

export function StoryWordsProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<SavedWord[]>([]);
  const [sheet, setSheet] = useState<SavedWord | null>(null);
  const save = useCallback((w: SavedWord) => {
    setSaved((list) => (list.some((s) => s.word === w.word) ? list : [...list, w]));
    setSheet(w);
  }, []);
  const closeSheet = useCallback(() => setSheet(null), []);
  return (
    <WordsContext.Provider value={{ saved, save, sheet, closeSheet }}>
      {children}
      {sheet && <SignUpSheet word={sheet} onClose={closeSheet} />}
    </WordsContext.Provider>
  );
}

/* ---------- The text ---------- */

type Open = { key: string; label: string; top: number; left: number; width: number };

const NO_SAVED: SavedWord[] = [];

export function TappableText({ children, canSave = true }: { children: React.ReactNode; canSave?: boolean }) {
  // Without a provider (Story Valley) there's no saving.
  const words = useContext(WordsContext);
  const saved = words?.saved ?? NO_SAVED;
  const save = canSave ? words?.save : undefined;
  const wrapRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Open | null>(null);
  const [lookups, setLookups] = useState<Record<string, Lookup>>({});

  const close = useCallback(() => setOpen(null), []);

  function openWord(el: HTMLElement) {
    const wrap = wrapRef.current;
    const key = el.dataset.w;
    if (!wrap || !key) return;
    const box = wrap.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const width = Math.min(POPOVER_WIDTH, box.width);
    const left = Math.max(0, Math.min(rect.left - box.left + rect.width / 2 - width / 2, box.width - width));
    setOpen({ key, label: el.textContent ?? key, top: rect.bottom - box.top + 8, left, width });
    if (!lookups[key] || (lookups[key].status === "done" && !(lookups[key] as { def: Definition | null }).def)) {
      setLookups((l) => ({ ...l, [key]: { status: "loading" } }));
      void define(key).then((def) => setLookups((l) => ({ ...l, [key]: { status: "done", def } })));
    }
  }

  // Close on Escape or a tap outside the popover and the words.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t)) return;
      if ((t as HTMLElement).closest?.("[data-w]")) return;
      close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  // Saved words get a teal underline wherever they appear.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const keys = new Set(saved.map((s) => s.word.toLowerCase()));
    wrap.querySelectorAll<HTMLElement>("[data-w]").forEach((el) => {
      el.classList.toggle("is-saved", keys.has(el.dataset.w ?? ""));
    });
  }, [saved]);

  // The open word is highlighted.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.querySelectorAll(".is-open").forEach((el) => el.classList.remove("is-open"));
    if (!open) return;
    wrap.querySelectorAll<HTMLElement>(`[data-w="${CSS.escape(open.key)}"]`).forEach((el) => el.classList.add("is-open"));
  }, [open]);

  const lookup = open ? lookups[open.key] : undefined;
  const def = lookup?.status === "done" ? lookup.def : null;
  const isSaved = !!open && saved.some((s) => s.word === open.key);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onClick={(e) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>("[data-w]");
        if (el) openWord(el);
      }}
      onKeyDown={(e) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>("[data-w]");
        if (el && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          openWord(el);
        }
      }}
    >
      {children}
      {open && (
        <div
          ref={popRef}
          role="dialog"
          aria-label={`Meaning of ${open.label}`}
          className="absolute z-30 rounded-[16px] border border-line-strong bg-panel p-4 shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
          style={{ top: open.top, left: open.left, width: open.width }}
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[1.15rem] font-bold tracking-[-0.02em] text-text-primary">{def?.word ?? open.key}</span>
            {save && def?.part_of_speech && <span className="text-[0.8rem] italic text-text-muted">{def.part_of_speech}</span>}
          </div>
          {save && def?.phonetic && <p className="mt-0.5 text-[0.82rem] text-text-muted-2">{def.phonetic}</p>}
          <p className="mt-2 text-[0.92rem] leading-[1.55] text-text-primary/90" aria-live="polite">
            {!lookup || lookup.status === "loading"
              ? <span className="text-text-muted">Loading…</span>
              : def
                ? def.meaning
                : <span className="text-text-muted">No meaning found for this word.</span>}
          </p>
          <div className="mt-3.5 flex gap-2">
            {save && def && (
              <button
                type="button"
                onClick={() => {
                  save({ word: open.key, meaning: def.meaning });
                  close();
                }}
                className="inline-flex h-9 items-center rounded-[10px] bg-accent px-3.5 text-[0.82rem] font-semibold text-teal-ink hover:opacity-90"
              >
                {isSaved ? "✓ Saved" : "+ Save word"}
              </button>
            )}
            <button
              type="button"
              onClick={close}
              className="inline-flex h-9 items-center rounded-[10px] border border-line-strong px-3.5 text-[0.82rem] font-semibold text-text-primary hover:bg-panel-hover"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Sidebar: your words ---------- */

export function SavedWords() {
  const { saved } = useWords();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[0.95rem] font-bold tracking-[-0.02em]">Your words from this story</h2>
        <span className="text-[0.8rem] tabular-nums text-text-muted">{saved.length}</span>
      </div>
      {saved.length === 0 ? (
        <p className="mt-3 rounded-[12px] border border-dashed border-line-strong p-3.5 text-[0.8rem] leading-[1.55] text-text-muted">
          Tap any word in the story, then save the ones you want to remember.
        </p>
      ) : (
        <>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {saved.map((w) => (
              <li
                key={w.word}
                title={w.meaning}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-panel-hover px-3 py-1 text-[0.82rem]"
              >
                <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-yellow" />
                {w.word}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[0.76rem] text-text-muted-2">
            Not kept yet. {SIGNUP.open ? "Sign up free to keep them." : "Sign-ups open soon."}
          </p>
        </>
      )}
      <a
        href={SIGNUP.href}
        className="mt-4 flex h-10 w-full items-center justify-center rounded-[11px] bg-teal text-[0.85rem] font-semibold text-teal-ink hover:opacity-90"
      >
        {SIGNUP.label}
      </a>
    </div>
  );
}

/* ---------- Sign-up sheet ---------- */

const TICKS = [
  "Save words from every story and read",
  "A daily review that takes 4 minutes",
  "Notes for anything you read in English",
];

function SignUpSheet({ word, onClose }: { word: SavedWord; onClose: () => void }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-word-title"
        className="relative w-full max-w-[440px] rounded-t-[24px] border border-line-strong bg-panel px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:rounded-[24px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full text-text-muted hover:bg-panel-hover hover:text-text-primary"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <h2 id="save-word-title" className="text-[1.3rem] font-bold tracking-[-0.03em]">Save this word</h2>
        <div className="mt-4 rounded-[14px] bg-cream px-4 py-3.5 text-cream-ink">
          <span className="block text-[1.02rem] font-bold">{word.word}</span>
          <span className="mt-0.5 block text-[0.88rem] leading-[1.5] text-[#4a4134]">{word.meaning}</span>
        </div>
        <p className="mt-4 text-[0.92rem] leading-[1.6] text-text-muted">
          {SIGNUP.open
            ? "Sign up free to keep the words you save. They come back in a short daily review, so you really remember them."
            : "Sign-ups open soon. See what we're building."}
        </p>
        <ul className="mt-4 flex flex-col gap-2.5">
          {TICKS.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[0.9rem] leading-[1.45]">
              <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-tint text-teal">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
        <a
          ref={buttonRef}
          href={SIGNUP.href}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-[12px] bg-teal text-[0.95rem] font-semibold text-teal-ink hover:opacity-90"
        >
          {SIGNUP.label}
        </a>
        {SIGNUP.loginHref && (
          <p className="mt-3.5 text-center text-[0.84rem] text-text-muted">
            Already have an account?{" "}
            <a href={SIGNUP.loginHref} className="font-semibold text-text-primary underline-offset-2 hover:underline">
              Log in
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
