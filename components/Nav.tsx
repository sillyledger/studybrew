"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_LOGIN_URL, APP_WELCOME_URL, SIGNUPS_OPEN } from "@/lib/site";

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

const BTN =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[9px] px-4 py-2 text-[0.82rem] font-semibold transition-[opacity,background-color]";
const BTN_OUTLINE = `${BTN} border border-line-strong text-text-primary hover:bg-panel-hover`;
const BTN_LIGHT = `${BTN} bg-text-primary text-background hover:opacity-90`;

/** Nav call-to-action: Log in + Start free once sign-ups open, otherwise Roadmap. */
function NavActions({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  if (SIGNUPS_OPEN) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a href={APP_LOGIN_URL} className={BTN_OUTLINE}>
          Log in
        </a>
        <a href={APP_WELCOME_URL} className={BTN_LIGHT}>
          Start free
        </a>
      </div>
    );
  }
  return (
    <div className={`flex items-center ${className}`}>
      <Link href="/roadmap" onClick={onNavigate} className={BTN_OUTLINE}>
        Roadmap
      </Link>
    </div>
  );
}

type DropdownItem = {
  href?: string;
  label: string;
  sub: string;
  tab: string;
  available: boolean;
};

function DropdownItemContent({ item }: { item: DropdownItem }) {
  return (
    <>
      <span className={`h-8 w-[6px] shrink-0 rounded-[3px] ${item.tab}`} />
      <div className={item.available ? "" : "opacity-50"}>
        <h3 className="text-[0.98rem] font-bold text-text-primary">{item.label}</h3>
        <p className="mt-0.5 font-sans text-[0.78rem] text-text-muted">{item.sub}</p>
      </div>
      {!item.available && (
        <span className="ml-auto shrink-0 self-center rounded-full border border-line px-[0.55rem] py-[0.22rem] font-medium text-[0.68rem] text-text-muted-2">
          Soon
        </span>
      )}
    </>
  );
}

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
        const inner = <DropdownItemContent item={item} />;

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
        className={`flex items-center gap-1.5 bg-transparent text-[0.84rem] font-medium leading-[1.5] ${linkClass(
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

function MobileMenuSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: DropdownItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-line-soft py-4">
      <span className="font-medium text-[0.74rem] text-text-muted-2">
        {label}
      </span>
      <div className="mt-2 flex flex-col">
        {items.map((item) =>
          item.available && item.href ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-[0.85rem] py-[0.6rem]"
            >
              <DropdownItemContent item={item} />
            </Link>
          ) : (
            <div key={item.label} className="flex items-center gap-[0.85rem] py-[0.6rem]">
              <DropdownItemContent item={item} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const linkClass = (active: boolean) =>
    `block border-b border-line-soft py-3 font-sans text-[1.35rem] font-bold ${
      active ? "text-teal" : "text-text-primary"
    }`;

  return (
    <div
      id="mobile-menu"
      className={`absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-h))] overflow-y-auto overscroll-contain border-t border-line-soft bg-background px-6 py-6 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none lg:hidden ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <Link href="/" onClick={onNavigate} className={linkClass(pathname === "/")}>
        Home
      </Link>
      <Link
        href="/stories"
        onClick={onNavigate}
        className={linkClass(pathname.startsWith("/stories"))}
      >
        Stories
      </Link>

      <MobileMenuSection label="Practice" items={PRACTICE_ITEMS} onNavigate={onNavigate} />

      <Link href="/pricing" onClick={onNavigate} className={linkClass(pathname === "/pricing")}>
        Pricing
      </Link>
      <Link href="/roadmap" onClick={onNavigate} className={linkClass(pathname === "/roadmap")}>
        Roadmap
      </Link>
      <Link href="/about" onClick={onNavigate} className={linkClass(pathname === "/about")}>
        About
      </Link>
      <Link href="/contact" onClick={onNavigate} className={linkClass(pathname === "/contact")}>
        Contact
      </Link>

      <NavActions
        onNavigate={onNavigate}
        className="mt-6 border-t border-line-soft pt-6 [&>a]:flex-1 [&>a]:py-3 [&>a]:text-[0.92rem]"
      />
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(68);
  const navRef = useRef<HTMLElement>(null);

  const isPractice = pathname.startsWith("/practice");

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    if (navRef.current) setNavHeight(navRef.current.offsetHeight);

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    const desktop = window.matchMedia("(min-width: 1024px)");
    function handleBreakpoint() {
      if (desktop.matches) setMenuOpen(false);
    }
    handleBreakpoint();

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      html.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [menuOpen]);

  const linkClass = (active: boolean) =>
    `border-b-2 pb-1 transition-colors ${
      active
        ? "border-teal text-teal"
        : "border-transparent text-text-muted hover:text-text-primary"
    }`;

  return (
    <nav
      ref={navRef}
      style={{ "--nav-h": `${navHeight}px` } as React.CSSProperties}
      className="sticky top-0 z-20 bg-background/90 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-14">
        <Link href="/" className="flex items-center gap-3">
          <img src="/studybrew-logo.svg" alt="Study Brew logo" width={26} height={26} />
          <span className="whitespace-nowrap text-xl font-bold">Study Brew</span>
        </Link>

        <div className="hidden items-center gap-5 font-medium text-[0.84rem] lg:flex lg:gap-7">
          <Link href="/" className={linkClass(pathname === "/")}>
            Home
          </Link>
          <Link href="/stories" className={linkClass(pathname.startsWith("/stories"))}>
            Stories
          </Link>

          <NavDropdown label="Practice" active={isPractice} items={PRACTICE_ITEMS} />

          <Link href="/pricing" className={linkClass(pathname === "/pricing")}>
            Pricing
          </Link>
          <Link href="/roadmap" className={linkClass(pathname === "/roadmap")}>
            Roadmap
          </Link>
          <Link href="/about" className={linkClass(pathname === "/about")}>
            About
          </Link>
        </div>

        <NavActions className="hidden lg:flex" />

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative -my-1.5 -mr-2 h-10 w-10 shrink-0 text-text-primary lg:hidden"
        >
          <span
            className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${
              menuOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${
              menuOpen ? "-translate-y-1/2 -rotate-45" : "translate-y-[4.5px]"
            }`}
          />
        </button>
      </div>

      <MobileMenu open={menuOpen} pathname={pathname} onNavigate={() => setMenuOpen(false)} />
    </nav>
  );
}
