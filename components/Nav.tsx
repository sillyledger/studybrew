"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// TODO: word counts are placeholders. No flashcards/decks table is queried
// anywhere in this codebase yet — wire these up to real deck counts once
// one exists instead of hardcoding.
const LANGUAGES = [
  {
    href: "/flashcards/english",
    label: "English",
    sub: "B1–B2 · 200 words",
    tab: "bg-teal",
  },
  {
    href: "/flashcards/chinese",
    label: "繁體中文",
    sub: "Traditional Chinese · 0 words",
    tab: "bg-blue",
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isFlashcards = pathname.startsWith("/flashcards");

  const linkClass = (active: boolean) =>
    `border-b-2 pb-1 transition-colors ${
      active
        ? "border-teal text-teal"
        : "border-transparent text-text-muted hover:text-text-primary"
    }`;

  return (
    <nav className="sticky top-0 z-20 bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-5 md:px-14">
        <Link href="/" className="flex items-center gap-3">
          <img src="/studybrew-logo.svg" alt="Study Brew logo" width={26} height={26} />
          <span className="text-xl font-bold">Study Brew</span>
        </Link>

        <div className="hidden items-center gap-6 font-mono text-[0.74rem] uppercase tracking-wide md:flex lg:gap-9">
          <Link href="/" className={linkClass(pathname === "/")}>
            Home
          </Link>

          <div ref={triggerRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`flex items-center gap-1.5 bg-transparent font-mono text-[0.74rem] font-normal uppercase leading-[1.5] tracking-wide ${linkClass(
                isFlashcards || open
              )}`}
            >
              Flashcards
              <span
                className={`h-[9px] w-[9px] border-b-[1.5px] border-r-[1.5px] border-current transition-transform duration-200 ease-out ${
                  open ? "-rotate-[135deg]" : "rotate-45"
                }`}
              />
            </button>

            <div
              className={`absolute left-1/2 top-[calc(100%+14px)] w-[300px] -translate-x-1/2 rounded-2xl border border-line bg-panel p-[0.6rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-opacity duration-150 ease-out ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {LANGUAGES.map((lang) => (
                <Link
                  key={lang.href}
                  href={lang.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-[0.85rem] rounded-[10px] p-[0.8rem] normal-case tracking-normal hover:bg-panel-2"
                >
                  <span className={`h-8 w-[6px] shrink-0 rounded-[3px] ${lang.tab}`} />
                  <div>
                    <h3 className="text-[0.98rem] font-bold text-text-primary">
                      {lang.label}
                    </h3>
                    <p className="mt-0.5 font-sans text-[0.78rem] text-text-muted">
                      {lang.sub}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/stories" className={linkClass(pathname.startsWith("/stories"))}>
            Stories
          </Link>
          <Link href="/app" className={linkClass(pathname === "/app")}>
            App
          </Link>
        </div>

        <div className="flex items-center gap-2 font-mono text-[0.74rem] text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          App in development
        </div>
      </div>

      {/* Mobile: no collapsed-menu system exists yet to host a dropdown
          trigger, so show the language options as plain stacked links
          instead of a toggle. */}
      <div className="flex flex-col gap-2 border-t border-line-soft px-6 py-3 md:hidden">
        <span className="font-mono text-[0.66rem] uppercase tracking-wide text-text-muted-2">
          Flashcards
        </span>
        <div className="flex flex-col gap-1.5">
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.href}
              href={lang.href}
              className="font-mono text-[0.78rem] text-text-muted"
            >
              {lang.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
