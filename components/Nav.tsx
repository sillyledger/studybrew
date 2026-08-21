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
    available: true,
  },
  {
    href: "/flashcards/traditional-chinese",
    label: "繁體中文",
    sub: "Traditional Chinese · 0 words",
    tab: "bg-blue",
    available: true,
  },
];

const PRACTICE_ITEMS = [
  {
    href: "/practice/tongue-twisters",
    label: "Tongue Twisters",
    sub: "6 classic drills",
    tab: "bg-teal",
    available: true,
  },
  {
    href: "/practice/minimal-pairs",
    label: "Minimal Pairs",
    sub: "Sound-pair practice",
    tab: "bg-blue",
    available: true,
  },
];

type DropdownItem = {
  href?: string;
  label: string;
  sub: string;
  tab: string;
  available: boolean;
};

function DropdownPanel({
  items,
  open,
  onNavigate,
}: {
  items: DropdownItem[];
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`absolute left-1/2 top-[calc(100%+14px)] w-[300px] -translate-x-1/2 rounded-2xl border border-line bg-panel p-[0.6rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-opacity duration-150 ease-out ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {items.map((item) => {
        const inner = (
          <>
            <span className={`h-8 w-[6px] shrink-0 rounded-[3px] ${item.tab}`} />
            <div className={item.available ? "" : "opacity-50"}>
              <h3 className="text-[0.98rem] font-bold text-text-primary">{item.label}</h3>
              <p className="mt-0.5 font-sans text-[0.78rem] text-text-muted">{item.sub}</p>
            </div>
            {!item.available && (
              <span className="ml-auto shrink-0 self-center rounded-full border border-line px-[0.55rem] py-[0.22rem] font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-2">
                Soon
              </span>
            )}
          </>
        );

        return item.available && item.href ? (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-[0.85rem] rounded-[10px] p-[0.8rem] normal-case tracking-normal hover:bg-panel-2"
          >
            {inner}
          </Link>
        ) : (
          <div
            key={item.label}
            className="flex cursor-not-allowed items-center gap-[0.85rem] rounded-[10px] p-[0.8rem] normal-case tracking-normal"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

function NavDropdown({
  label,
  active,
  items,
}: {
  label: string;
  active: boolean;
  items: DropdownItem[];
}) {
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

  const linkClass = (isActive: boolean) =>
    `border-b-2 pb-1 transition-colors ${
      isActive
        ? "border-teal text-teal"
        : "border-transparent text-text-muted hover:text-text-primary"
    }`;

  return (
    <div ref={triggerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 bg-transparent font-mono text-[0.74rem] font-normal uppercase leading-[1.5] tracking-wide ${linkClass(
          active || open
        )}`}
      >
        {label}
        <span
          className={`h-[9px] w-[9px] border-b-[1.5px] border-r-[1.5px] border-current transition-transform duration-200 ease-out ${
            open ? "-rotate-[135deg]" : "rotate-45"
          }`}
        />
      </button>

      <DropdownPanel items={items} open={open} onNavigate={() => setOpen(false)} />
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();

  const isFlashcards = pathname.startsWith("/flashcards");
  const isPractice = pathname.startsWith("/practice");

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

        <div className="hidden items-center gap-5 font-mono text-[0.74rem] uppercase tracking-wide md:flex lg:gap-7">
          <Link href="/" className={linkClass(pathname === "/")}>
            Home
          </Link>

          <NavDropdown label="Flashcards" active={isFlashcards} items={LANGUAGES} />
          <NavDropdown label="Practice" active={isPractice} items={PRACTICE_ITEMS} />

          <Link href="/stories" className={linkClass(pathname.startsWith("/stories"))}>
            Stories
          </Link>
          <Link href="/app" className={linkClass(pathname === "/app")}>
            App
          </Link>
          <Link href="/about" className={linkClass(pathname === "/about")}>
            About
          </Link>
          <Link href="/contact" className={linkClass(pathname === "/contact")}>
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2 font-mono text-[0.74rem] text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          App in development
        </div>
      </div>

      {/* Mobile: no collapsed-menu system exists yet to host a dropdown
          trigger, so show the dropdown options as plain stacked links
          instead of a toggle. */}
      <div className="flex flex-col gap-4 border-t border-line-soft px-6 py-3 md:hidden">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.66rem] uppercase tracking-wide text-text-muted-2">
            Flashcards
          </span>
          <div className="flex flex-col gap-1.5">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang.label}
                href={lang.href}
                className="font-mono text-[0.78rem] text-text-muted"
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.66rem] uppercase tracking-wide text-text-muted-2">
            Practice
          </span>
          <div className="flex flex-col gap-1.5">
            {PRACTICE_ITEMS.map((item) =>
              item.available && item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-mono text-[0.78rem] text-text-muted"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  className="flex items-center gap-2 font-mono text-[0.78rem] text-text-muted-2"
                >
                  {item.label}
                  <span className="rounded-full border border-line px-[0.4rem] py-[0.1rem] text-[0.56rem] uppercase tracking-wide">
                    Soon
                  </span>
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
