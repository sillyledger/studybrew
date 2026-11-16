"use client";

import { useEffect, useState } from "react";
import { StoryCard } from "@/components/StoryCards";
import type { StoryListItem } from "@/lib/stories-list";

type Sort = "newest" | "first";

/** "All stories with <name>": the grid plus a Newest / From the start switch (?sort=first). */
export default function CharacterStories({
  name,
  stories,
}: {
  name: string;
  /** Newest first. */
  stories: StoryListItem[];
}) {
  const [sort, setSort] = useState<Sort>("newest");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sort") === "first") setSort("first");
  }, []);

  function choose(next: Sort) {
    setSort(next);
    const url = new URL(window.location.href);
    if (next === "first") url.searchParams.set("sort", "first");
    else url.searchParams.delete("sort");
    window.history.replaceState(null, "", url);
  }

  const list = sort === "first" ? [...stories].reverse() : stories;

  return (
    <section aria-labelledby="all-stories" className="pt-14 md:pt-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="all-stories" className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">
          All stories with {name}
        </h2>
        <div
          role="radiogroup"
          aria-label="Sort stories"
          className="inline-flex rounded-[12px] border border-line bg-panel-2 p-1"
        >
          {(
            [
              ["newest", "Newest"],
              ["first", "From the start"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={sort === value}
              onClick={() => choose(value)}
              className={`rounded-[9px] px-3 py-1.5 text-[0.84rem] font-medium transition-colors ${
                sort === value
                  ? "bg-panel-hover text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => (
          <StoryCard key={s.id} story={s} variant="character" />
        ))}
      </ul>
    </section>
  );
}
