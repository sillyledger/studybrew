"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  STORY_CATEGORIES,
  STORY_SHOWS,
  type LevelKey,
  type ShowKey,
  type StoryListItem,
} from "@/lib/stories-list";
import { APP_WELCOME_URL, SIGNUPS_OPEN } from "@/lib/site";

const PAGE_SIZE = 15;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type ShowCard = {
  key: ShowKey | "simply-why";
  name: string;
  color: string;
  level: string;
  description: string;
  cast: { slug: string; name: string }[];
  /** "Also on" listening links (Study Brew and Story Brew only). */
  links?: { href: string; label: string; ariaLabel: string }[];
  /** Muted line instead of links. */
  note?: string;
  comingSoon?: string;
};

type Filters = {
  show: ShowKey | null;
  level: LevelKey | null;
  category: string | null;
  character: string | null;
  q: string;
};

const EMPTY: Filters = { show: null, level: null, category: null, character: null, q: "" };

function readUrl(): Filters {
  const p = new URLSearchParams(window.location.search);
  const show = p.get("show");
  const level = p.get("level");
  return {
    show: show && show in STORY_SHOWS ? (show as ShowKey) : null,
    level: level === "a1-a2" || level === "b1-b2" ? level : null,
    category: STORY_CATEGORIES.some((c) => c.slug === p.get("category")) ? p.get("category") : null,
    character: p.get("character"),
    q: p.get("q") ?? "",
  };
}

function writeUrl(f: Filters) {
  const url = new URL(window.location.href);
  for (const key of ["show", "level", "category", "character", "q"] as const) {
    const value = f[key];
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  window.history.replaceState(null, "", url);
}

function matches(s: StoryListItem, f: Filters) {
  if (f.show && s.show !== f.show) return false;
  if (f.level && s.level !== f.level) return false;
  if (f.category && s.categorySlug !== f.category) return false;
  if (f.character && s.character?.key !== f.character) return false;
  const q = f.q.trim().toLowerCase();
  if (q) {
    const hay = `${s.title} ${s.character?.name ?? ""} ${s.teaser}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

const levelLabel = (l: LevelKey) => (l === "a1-a2" ? "A1–A2" : "B1–B2");

/* ---------- Small pieces ---------- */

/** Story Valley gets a plain <a> (full page load) so analytics never carries over. */
function StoryLink({
  story,
  className,
  children,
}: {
  story: StoryListItem;
  className?: string;
  children: React.ReactNode;
}) {
  return story.isStoryValley ? (
    <a href={story.href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={story.href} className={className}>
      {children}
    </Link>
  );
}

function Avatar({
  story,
  size,
  className = "",
}: {
  story: StoryListItem;
  size: number;
  className?: string;
}) {
  const c = story.character;
  if (c?.avatar) {
    return (
      <img
        src={c.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={`shrink-0 rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-ink ${className}`}
      style={{ width: size, height: size, background: story.color, fontSize: size * 0.42 }}
    >
      {(c?.name ?? story.title).charAt(0).toUpperCase()}
    </span>
  );
}

function Cover({ story, height, avatar }: { story: StoryListItem; height: string; avatar: number }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${height}`}
      style={{
        background: `radial-gradient(120% 90% at 50% 20%, ${story.color}55, ${story.color}14 60%, transparent), var(--color-panel-2)`,
      }}
    >
      <Avatar story={story} size={avatar} className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]" />
      <span className="absolute bottom-3 left-3 rounded-[7px] bg-cream px-2 py-0.5 text-[0.7rem] font-semibold text-cream-ink">
        {story.category}
      </span>
    </div>
  );
}

function LevelPill({ level }: { level: LevelKey }) {
  return (
    <span className="rounded-full border border-teal/30 bg-teal/10 px-2 py-0.5 text-[0.7rem] font-medium text-teal">
      {levelLabel(level)}
    </span>
  );
}

function Chip({
  on,
  onClick,
  children,
  dot,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.84rem] font-medium transition-colors ${
        on
          ? "border-line-strong bg-panel text-text-primary"
          : "border-line text-text-muted hover:border-line-strong hover:text-text-primary"
      }`}
    >
      {dot && <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: dot }} />}
      {children}
    </button>
  );
}

/* ---------- Show cards ---------- */

function CastAvatars({ cast }: { cast: ShowCard["cast"] }) {
  return (
    <div className="flex">
      {cast.map((c, i) => (
        <img
          key={c.slug}
          src={`/characters/${c.slug}.svg`}
          alt={c.name}
          title={c.name}
          width={34}
          height={34}
          loading="lazy"
          className={`h-[34px] w-[34px] rounded-full bg-panel-2 ring-2 ring-panel-2 ${i ? "-ml-2" : ""}`}
        />
      ))}
    </div>
  );
}

function ShowCards({ cards, onSee }: { cards: ShowCard[]; onSee: (show: ShowKey) => void }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-[1250px]:grid-cols-4">
      {cards.map((card) => {
        const soon = Boolean(card.comingSoon);
        return (
          <li
            key={card.key}
            className={`group relative flex flex-col overflow-hidden rounded-[18px] border p-5 pt-6 transition-colors ${
              soon
                ? "border-dashed border-line-strong"
                : "border-line bg-panel-2 hover:border-line-strong hover:bg-panel"
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: card.color }}
            />
            <h3 className="text-[1.2rem] font-bold leading-tight">{card.name}</h3>
            <span
              className="mt-2 self-start rounded-full border px-2 py-0.5 text-[0.7rem] font-medium"
              style={{ color: card.color, borderColor: `${card.color}55`, background: `${card.color}1a` }}
            >
              {card.level}
            </span>
            <p className="mt-3 text-[0.9rem] leading-[1.55] text-text-muted">{card.description}</p>
            {card.cast.length > 0 && (
              <div className="mt-4">
                <CastAvatars cast={card.cast} />
              </div>
            )}
            <div className="mt-auto pt-5">
              {card.links && (
                <p className="text-[0.74rem] leading-[1.7] text-text-muted-2">
                  Also on{" "}
                  {card.links.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 && " · "}
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={l.ariaLabel}
                        className="relative z-10 underline-offset-2 hover:text-text-primary hover:underline"
                      >
                        {l.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
              {card.note && <p className="text-[0.74rem] text-text-muted-2">{card.note}</p>}
              <div className="mt-2 text-[0.88rem] font-semibold" style={{ color: soon ? undefined : card.color }}>
                {soon ? (
                  <span className="text-text-muted">{card.comingSoon}</span>
                ) : card.key === "story-valley" ? (
                  // Whole card clickable: the link's ::after covers the card.
                  <a href="/stories/story-valley" className="after:absolute after:inset-0 after:content-['']">
                    Visit Story Valley →
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSee(card.key as ShowKey)}
                    className="text-left after:absolute after:inset-0 after:content-['']"
                  >
                    See stories ↓
                  </button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Featured + grid ---------- */

function Featured({
  story,
  now,
  onCharacter,
}: {
  story: StoryListItem;
  now: number;
  onCharacter: (key: string) => void;
}) {
  const isNew = story.publishedAt && now - new Date(story.publishedAt).getTime() < WEEK_MS;
  const show = STORY_SHOWS[story.show];
  const firstName = story.character?.name.split(",")[0].trim();
  return (
    <article className="grid overflow-hidden rounded-[22px] border border-line bg-panel-2 md:grid-cols-2">
      <StoryLink story={story} className="block" >
        <Cover story={story} height="h-[230px] md:h-full md:min-h-[320px]" avatar={150} />
      </StoryLink>
      <div className="flex flex-col p-6 md:p-9">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-yellow">
          {isNew ? "New this week" : "Latest story"}
        </span>
        <h3 className="mt-3 text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          <StoryLink story={story} className="transition-colors hover:text-teal">
            {story.title}
          </StoryLink>
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.84rem] text-text-muted">
          {story.character && <span className="font-medium text-text-primary">{story.character.name}</span>}
          <LevelPill level={story.level} />
          <span className="font-medium" style={{ color: show.color }}>
            {show.name}
          </span>
          <span>{story.minutes} min</span>
        </div>
        <p className="mt-4 text-[0.98rem] leading-[1.65] text-text-muted">{story.teaser}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-auto md:pt-7 [&>*]:whitespace-nowrap">
          <StoryLink
            story={story}
            className="inline-flex items-center justify-center rounded-[10px] bg-teal px-5 py-3 text-[0.92rem] font-semibold text-teal-ink transition-opacity hover:opacity-90"
          >
            ▶ Listen &amp; read
          </StoryLink>
          {story.character &&
            (story.character.pageHref ? (
              <Link
                href={story.character.pageHref}
                className="inline-flex items-center justify-center rounded-[10px] border border-line-strong px-5 py-3 text-[0.92rem] font-semibold transition-colors hover:bg-panel-hover"
              >
                More with {firstName}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => onCharacter(story.character!.key)}
                className="inline-flex items-center justify-center rounded-[10px] border border-line-strong px-5 py-3 text-[0.92rem] font-semibold transition-colors hover:bg-panel-hover"
              >
                More with {firstName}
              </button>
            ))}
        </div>
      </div>
    </article>
  );
}

function StoryCard({ story }: { story: StoryListItem }) {
  const show = STORY_SHOWS[story.show];
  return (
    <li>
      <StoryLink
        story={story}
        className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-panel-2 transition-colors hover:border-line-strong hover:bg-panel"
      >
        <Cover story={story} height="h-[132px]" avatar={84} />
        <div className="flex flex-1 flex-col p-4">
          <div className="flex min-w-0 items-center gap-2 text-[0.8rem] text-text-muted">
            <Avatar story={story} size={20} />
            <span className="truncate">{story.character?.name ?? "Story"}</span>
          </div>
          <div className="mt-2 text-[0.74rem] font-semibold" style={{ color: show.color }}>
            {show.name}
          </div>
          <h3 className="mt-1 text-[1.02rem] font-bold leading-snug">{story.title}</h3>
          <div className="mt-auto flex items-center gap-2.5 pt-4 text-[0.76rem] text-text-muted-2">
            <LevelPill level={story.level} />
            <span>{story.minutes} min</span>
            {story.listen && <span className="ml-auto text-text-muted">🎧 Listen</span>}
          </div>
        </div>
      </StoryLink>
    </li>
  );
}

/* ---------- Main ---------- */

export default function StoriesBrowser({
  stories,
  showCards,
  now,
}: {
  stories: StoryListItem[];
  showCards: ShowCard[];
  now: number;
}) {
  const [f, setF] = useState<Filters>(EMPTY);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setF(readUrl());
  }, []);

  function update(next: Partial<Filters>, scroll = false) {
    const merged = { ...f, ...next };
    setF(merged);
    setVisible(PAGE_SIZE);
    writeUrl(merged);
    if (scroll) document.getElementById("stories")?.scrollIntoView({ block: "start" });
  }

  const filtered = useMemo(() => stories.filter((s) => matches(s, f)), [stories, f]);
  const [featured, ...rest] = filtered;
  const characterName = f.character
    ? stories.find((s) => s.character?.key === f.character)?.character?.name.split(",")[0] ?? f.character
    : null;

  return (
    <>
      {/* Four shows */}
      <section aria-labelledby="shows-heading" className="pb-14 md:pb-20">
        <h2 id="shows-heading" className="mb-6 text-[clamp(1.7rem,3vw,2.2rem)] font-bold leading-tight">
          Four shows
        </h2>
        <ShowCards cards={showCards} onSee={(show) => update({ ...EMPTY, show }, true)} />
      </section>

      {/* Filters */}
      <section id="stories" aria-label="Stories" className="scroll-mt-24 border-t border-line pt-10 md:pt-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative block lg:w-[320px]">
            <span className="sr-only">Search stories</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-text-muted-2 stroke-2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={f.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search a title, character or word"
              className="w-full rounded-[12px] border border-line bg-panel-2 py-2.5 pl-10 pr-3 text-[0.92rem] text-text-primary placeholder:text-text-muted-2 focus:border-line-strong focus:outline-none"
            />
          </label>
          <div role="radiogroup" aria-label="Level" className="inline-flex self-start rounded-[12px] border border-line bg-panel-2 p-1">
            {(
              [
                [null, "All levels"],
                ["a1-a2", "A1–A2"],
                ["b1-b2", "B1–B2"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={f.level === value}
                onClick={() => update({ level: value })}
                className={`rounded-[9px] px-3 py-1.5 text-[0.84rem] font-medium transition-colors ${
                  f.level === value ? "bg-panel-hover text-text-primary" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          <Chip on={!f.show} onClick={() => update({ show: null })}>
            All shows
          </Chip>
          {(Object.keys(STORY_SHOWS) as ShowKey[]).map((key) => (
            <Chip
              key={key}
              on={f.show === key}
              dot={STORY_SHOWS[key].color}
              onClick={() => update({ show: f.show === key ? null : key })}
            >
              {STORY_SHOWS[key].name}
            </Chip>
          ))}
          <span aria-hidden="true" className="mx-1 w-px shrink-0 self-stretch bg-line" />
          {STORY_CATEGORIES.map((c) => (
            <Chip
              key={c.slug}
              on={f.category === c.slug}
              onClick={() => update({ category: f.category === c.slug ? null : c.slug })}
            >
              {c.label}
            </Chip>
          ))}
          {characterName && (
            <Chip on onClick={() => update({ character: null })}>
              {characterName} <span aria-label="Remove filter">×</span>
            </Chip>
          )}
        </div>

        {/* Results */}
        <div className="mt-8">
          {!featured ? (
            <div className="rounded-[18px] border border-dashed border-line-strong px-6 py-14 text-center text-[0.98rem] text-text-muted">
              No stories match. Try another word or filter.
            </div>
          ) : (
            <>
              <Featured
                story={featured}
                now={now}
                onCharacter={(character) => update({ ...EMPTY, character }, true)}
              />
              {rest.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {rest.slice(0, visible).map((s) => (
                    <StoryCard key={s.id} story={s} />
                  ))}
                </ul>
              )}
              {rest.length > visible && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-[10px] border border-line-strong px-5 py-2.5 text-[0.9rem] font-semibold transition-colors hover:bg-panel-hover"
                  >
                    Show more ({rest.length - visible} left)
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* More in the app */}
        <div className="mt-6 flex flex-col gap-5 rounded-[18px] border border-dashed border-line-strong p-5 sm:flex-row sm:items-center md:p-6">
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.1rem] font-bold">More in the app</h3>
            <p className="mt-1 text-[0.92rem] leading-[1.55] text-text-muted">
              The full library, with every word you tap saved to your notes and a daily review.
            </p>
          </div>
          {SIGNUPS_OPEN ? (
            <a
              href={APP_WELCOME_URL}
              className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] border border-line-strong px-4 py-2.5 text-[0.85rem] font-semibold transition-colors hover:bg-panel-hover sm:self-auto"
            >
              Start learning, it&apos;s free
            </a>
          ) : (
            <Link
              href="/roadmap"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] border border-line-strong px-4 py-2.5 text-[0.85rem] font-semibold transition-colors hover:bg-panel-hover sm:self-auto"
            >
              See the roadmap
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
