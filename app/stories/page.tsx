"use client";
import React from "react";
import Link from "next/link";
import { characters } from "../../lib/characters";

const categories = [
  { name: "Bedtime Stories", slug: "bedtime", description: "Wind down with calm, slow English.", available: true, emoji: "🌙" },
  { name: "Daily Life", slug: "daily-life", description: "Everyday situations, natural English.", available: true, emoji: "☀️" },
  { name: "Travel", slug: "travel", description: "Stories from cities and quiet corners.", available: false, emoji: "✈️" },
  { name: "Career", slug: "career", description: "Work, ambition, and small victories.", available: false, emoji: "💼" },
  { name: "Culture", slug: "culture", description: "Habits, traditions, and human moments.", available: false, emoji: "🌍" },
  { name: "Fantasy", slug: "fantasy", description: "Magical worlds and unexpected adventures.", available: true, emoji: "✨" },
];

// Cycled across live categories only, in order — "Soon" categories always
// get the dashed/unfilled tab regardless of position, so this scales past
// six categories without hardcoding names.
const TAB_COLORS = ["bg-teal", "bg-blue", "bg-coral"];
const AVATAR_COLORS = ["bg-coral", "bg-teal", "bg-blue"];
const ROTATIONS = ["-rotate-[3deg]", "rotate-[2.5deg]", "rotate-[2deg]", "-rotate-[2deg]"];

export default function Stories() {
  let liveTabIndex = -1;

  return (
    <main className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-20 flex items-center justify-between bg-background/90 px-6 py-5 backdrop-blur-md md:px-14">
        <Link href="/" className="flex items-center gap-3">
          <img src="/studybrew-logo.svg" alt="Study Brew logo" width={26} height={26} />
          <span className="text-xl font-bold">Study Brew</span>
        </Link>
        <div className="hidden items-center gap-6 font-mono text-[0.74rem] uppercase tracking-wide md:flex lg:gap-9">
          <Link
            href="/"
            className="border-b-2 border-transparent pb-1 text-text-muted transition-colors hover:text-text-primary"
          >
            Home
          </Link>
          <Link
            href="/flashcards"
            className="border-b-2 border-transparent pb-1 text-text-muted transition-colors hover:text-text-primary"
          >
            Flashcards
          </Link>
          <Link href="/stories" className="border-b-2 border-teal pb-1 text-teal">
            Stories
          </Link>
          <Link
            href="/app"
            className="border-b-2 border-transparent pb-1 text-text-muted transition-colors hover:text-text-primary"
          >
            App
          </Link>
        </div>
        <a
          href="/#waitlist"
          className="rounded-full bg-teal px-[1.15rem] py-[0.6rem] font-mono text-[0.74rem] font-medium text-teal-ink"
        >
          Join waitlist
        </a>
      </nav>

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
          Audio stories
        </div>
        <h1 className="max-w-[16ch] text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          Find your story.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Short, calm audio stories with real characters and everyday
          situations — written and recorded by a non-native speaker.
        </p>
      </div>

      {/* Notebook spread */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-14">
        <div className="relative grid min-h-[560px] grid-cols-1 overflow-hidden rounded-[22px] bg-panel shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] md:grid-cols-2">
          {/* Spine */}
          <div className="absolute inset-y-[6%] left-1/2 hidden w-px bg-line md:block" />
          <div className="absolute inset-y-[6%] left-1/2 hidden w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/25 to-transparent md:block" />

          {/* Table of contents (categories) */}
          <div className="py-12 pl-12 pr-10 md:pl-[4.5rem]">
            <div className="mb-6 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-text-muted-2">
              Contents
            </div>
            <ul className="list-none">
              {categories.map((cat, i) => {
                if (cat.available) liveTabIndex++;
                const tabClass = cat.available
                  ? TAB_COLORS[liveTabIndex % TAB_COLORS.length]
                  : "border border-dashed border-r-0 border-line";
                const num = String(i + 1).padStart(2, "0");

                const inner = (
                  <>
                    <span
                      className={`absolute -left-[26px] top-1/2 h-8 w-[26px] -translate-y-1/2 rounded-l-[6px] ${tabClass}`}
                    />
                    <span
                      className={`w-[1.6rem] shrink-0 font-mono text-[0.8rem] text-text-muted-2 ${cat.available ? "" : "opacity-50"}`}
                    >
                      {num}
                    </span>
                    <div className={cat.available ? "" : "opacity-50"}>
                      <h3 className="text-[1.2rem] font-bold">{cat.name}</h3>
                      <p className="mt-[0.15rem] text-[0.85rem] text-text-muted">
                        {cat.description}
                      </p>
                    </div>
                    {!cat.available && (
                      <span className="ml-auto shrink-0 self-center rounded-full border border-line px-2 py-[0.2rem] font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-2">
                        Soon
                      </span>
                    )}
                  </>
                );

                return (
                  <li
                    key={cat.slug}
                    className="relative flex items-baseline gap-4 border-b border-dashed border-line-soft py-4 last:border-none"
                  >
                    {cat.available ? (
                      <Link href={`/stories/${cat.slug}`} className="flex w-full items-baseline gap-4">
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex w-full cursor-not-allowed items-baseline gap-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Cast of characters */}
          <div className="bg-panel-2 py-12 pl-10 pr-12">
            <div className="mb-7 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-text-muted-2">
              Cast of characters
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-6">
              {characters.map((char, i) => (
                <Link
                  key={char.slug}
                  href={`/stories/characters/${char.slug}`}
                  className={`relative block rounded-[4px] bg-text-primary p-[10px] pb-[18px] shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0 ${ROTATIONS[i % ROTATIONS.length]}`}
                >
                  <span className="absolute -top-2 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-[4deg] border border-coral/70 bg-coral/[0.55]" />
                  <div className="mb-[0.6rem] flex aspect-square items-center justify-center rounded-[2px] bg-panel">
                    <div
                      className={`h-[52%] w-[52%] rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                    />
                  </div>
                  <h3 className="text-center text-base font-extrabold text-ink">{char.name}</h3>
                  <div className="mt-[0.1rem] text-center font-mono text-[0.6rem] text-text-muted-2">
                    {char.role}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line-soft px-6 py-10 md:px-14">
        <span className="text-base font-bold">Study Brew</span>
        <span className="font-mono text-[0.7rem] text-text-muted-2">
          Made by a learner, for learners.
        </span>
      </footer>
    </main>
  );
}
