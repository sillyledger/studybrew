import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { StoryCard } from "@/components/StoryCards";
import { BookIcon, HeartIcon, ShieldIcon, SproutIcon } from "@/components/Icons";
import { createClient } from "../../../lib/supabase";
import { PLATFORMS, shows } from "../../../lib/shows";
import { storyValleyCast } from "../../../lib/story-valley";
import { STORY_COLUMNS, toStoryItem, type PostRow } from "../../../lib/stories-list";

// Story Valley is for children and their parents, so this page has no
// analytics, no cookies and no third-party embeds or scripts:
// - components/Analytics.tsx skips this path and everything under it;
// - the nav and footer render plain <a> links here (components/SiteLink.tsx),
//   so nothing prefetches pages that run analytics;
// - "Also on" links are plain text links that open in a new tab.
// Episodes come from posts with target_site 'storyvalley.co', fetched on the
// server only. Dynamic because the character filter and paging come from
// searchParams.

export const metadata: Metadata = {
  title: "Story Valley | Study Brew",
  description:
    "Easy A1–A2 English stories with Sara, Lucy and Tom, read by a real person. Made to share with your child.",
};

const GREEN = "#8FCB6E";
const PAGE_SIZE = 12;

const CAST_LINE: Record<string, string> = {
  sara: "6 years old. Loves her garden.",
  lucy: "A small orange cat who explores.",
  tom: "7 years old. Likes to fix things.",
};

const AUDIENCES = [
  {
    icon: HeartIcon,
    title: "Parents learning English",
    text: "Listen with your child. You both hear the same easy words, and you save the ones you want to keep.",
  },
  {
    icon: SproutIcon,
    title: "Beginners (A1–A2)",
    text: "Slow, clear English in short sentences. A gentle start before Study Brew and Story Brew.",
  },
  {
    icon: BookIcon,
    title: "Teachers",
    text: "A 3–4 minute story to start a class, with the key words ready to go over together.",
  },
];

const STEPS = [
  {
    title: "Listen together",
    text: "Press play right on this page and listen with your child. No ads, no sign-up, and it works in China too.",
  },
  {
    title: "Read along",
    text: "Every story has its full text, so you can follow every word as you listen, and read it again later.",
  },
  {
    title: "Keep the words",
    text: "Every story has its full text and words to know. With a Study Brew account, the words you save come back in a daily review.",
  },
];

function episodeCount(n: number) {
  return `${n} ${n === 1 ? "episode" : "episodes"}`;
}

function filterHref(character: string | null, page = 1) {
  const params = new URLSearchParams();
  if (character) params.set("character", character);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/stories/story-valley${query ? `?${query}` : ""}#episodes`;
}

/** Spotify and YouTube for Story Valley: plain links, no embeds. */
function alsoOn() {
  const show = shows.find((s) => s.id === "kids");
  if (!show) return [];
  return PLATFORMS.filter((p) => p.key === "spotifyUrl" || p.key === "youtubeUrl").flatMap((p) => {
    const href = show[p.key];
    return href ? [{ href, label: p.label, ariaLabel: p.ariaLabel }] : [];
  });
}

/* ---------- Hero valley ---------- */

function ValleyScene() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1100 420"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="sv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10141f" />
          <stop offset="0.65" stopColor="#1a2030" />
          <stop offset="1" stopColor="#202838" />
        </linearGradient>
        <radialGradient id="sv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F2C46B" stopOpacity="0.45" />
          <stop offset="0.45" stopColor="#F2C46B" stopOpacity="0.12" />
          <stop offset="1" stopColor="#F2C46B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sv-hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f9a4a" />
          <stop offset="1" stopColor="#3e6b33" />
        </linearGradient>
        <linearGradient id="sv-hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GREEN} />
          <stop offset="1" stopColor="#5f9a4a" />
        </linearGradient>
        <linearGradient id="sv-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#161618" stopOpacity="0.96" />
          <stop offset="0.45" stopColor="#161618" stopOpacity="0.78" />
          <stop offset="0.75" stopColor="#161618" stopOpacity="0.15" />
          <stop offset="1" stopColor="#161618" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1100" height="420" fill="url(#sv-sky)" />
      {/* Sun with glow, top right */}
      <circle cx="905" cy="95" r="150" fill="url(#sv-glow)" />
      <circle cx="905" cy="95" r="38" fill="#F6D58E" opacity="0.92" />
      {/* Mountains: blue-purple behind, teal in front */}
      <path
        d="M0 270 L130 180 L240 235 L380 130 L520 230 L640 160 L780 240 L900 150 L1020 220 L1100 190 V420 H0 Z"
        fill="#4b4f86"
        opacity="0.75"
      />
      <path
        d="M0 300 L160 225 L290 280 L430 205 L590 285 L730 215 L880 290 L1010 235 L1100 265 V420 H0 Z"
        fill="#2e6b66"
        opacity="0.9"
      />
      {/* Two green hills */}
      <path d="M-40 420 C 160 300, 420 300, 640 420 Z" fill="url(#sv-hill-back)" />
      <path d="M360 420 C 600 290, 900 290, 1140 420 Z" fill="url(#sv-hill-front)" />
      {/* Dark gradient on the left for the text */}
      <rect width="1100" height="420" fill="url(#sv-fade)" />
    </svg>
  );
}

function CastAvatars() {
  const bySlug = Object.fromEntries(storyValleyCast.map((m) => [m.slug, m]));
  const avatar = (slug: string, cls: string) =>
    bySlug[slug] ? (
      <img
        src={`/characters/${slug}.svg`}
        alt={bySlug[slug].name}
        title={bySlug[slug].name}
        className={`rounded-full bg-panel-2 ring-4 ring-[#161618]/70 drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)] ${cls}`}
      />
    ) : null;
  return (
    <div className="flex items-end justify-center">
      {avatar("sara", "relative z-[1] h-[72px] w-[72px] -rotate-6 md:h-[120px] md:w-[120px]")}
      {avatar(
        "lucy",
        "relative z-[2] -mx-3 h-[94px] w-[94px] -translate-y-3 md:-mx-5 md:h-[156px] md:w-[156px] md:-translate-y-6"
      )}
      {avatar("tom", "relative z-[1] h-[72px] w-[72px] rotate-6 md:h-[120px] md:w-[120px]")}
    </div>
  );
}

/* ---------- Page ---------- */

export default async function StoryValley({
  searchParams,
}: {
  searchParams: Promise<{ character?: string; page?: string }>;
}) {
  const params = await searchParams;
  const links = alsoOn();

  // ?character= is case-insensitive (existing links use ?character=Sara).
  const active =
    storyValleyCast.find((m) => m.name.toLowerCase() === params.character?.trim().toLowerCase()) ??
    null;

  const supabase = createClient();

  // Every published episode's character (and the newest one), for the filter cards.
  const { data: allRows } = await supabase
    .from("posts")
    .select("slug, sub_category, published_at")
    .eq("target_site", "storyvalley.co")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  const rows = allRows ?? [];
  const total = rows.length;
  const countFor = (name: string) =>
    rows.filter((r) => r.sub_category?.toLowerCase() === name.toLowerCase()).length;
  const newest = rows[0] ? `/stories/story-valley/${rows[0].slug}` : null;

  const filteredTotal = active ? countFor(active.name) : total;
  const lastPage = Math.max(1, Math.ceil(filteredTotal / PAGE_SIZE));
  const requested = Number.parseInt(params.page ?? "", 10);
  const page = Math.min(Math.max(Number.isNaN(requested) ? 1 : requested, 1), lastPage);
  const from = (page - 1) * PAGE_SIZE;

  let query = supabase
    .from("posts")
    .select(STORY_COLUMNS, { count: "exact" })
    .eq("target_site", "storyvalley.co")
    .eq("status", "published");
  if (active) query = query.ilike("sub_category", active.name);
  const { data, count } = await query
    .order("published_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  // Same story shape as /stories; the cover label is the character's name.
  const episodes = ((data ?? []) as PostRow[]).map((row) => {
    const item = toStoryItem(row);
    return { ...item, category: item.character?.name ?? "Story Valley" };
  });
  const episodeTotal = count ?? filteredTotal;

  const pageButton =
    "inline-flex items-center justify-center rounded-[9px] border border-line-strong px-4 py-2 text-[0.85rem] font-semibold transition-colors hover:bg-panel-hover";

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        <div className="pt-8 md:pt-12">
          <a
            href="/stories"
            className="text-[0.8rem] font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            ← All stories
          </a>
        </div>

        {/* Hero */}
        <section className="relative mt-6 min-h-[330px] overflow-hidden rounded-[20px] border border-line">
          <ValleyScene />
          <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1.25fr_1fr] md:items-center md:p-12">
            <div className="order-first md:order-last">
              <CastAvatars />
            </div>
            <div className="max-w-[36rem]">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: GREEN }}
                >
                  Story Valley for Kids
                </span>
                <span
                  className="rounded-full border px-2 py-0.5 text-[0.7rem] font-medium"
                  style={{ color: GREEN, borderColor: `${GREEN}66` }}
                >
                  A1–A2
                </span>
              </div>
              <h1 className="mt-4 text-[clamp(2rem,4.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Easy English stories to share with your child
              </h1>
              <p className="mt-4 max-w-[48ch] text-[1rem] leading-[1.65] text-text-muted">
                Short stories about Sara, Lucy and Tom, read slowly by a real person. Listen
                together, and learn the words yourself along the way.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {newest && (
                  <a
                    href={newest}
                    className="inline-flex items-center justify-center rounded-[10px] px-5 py-3 text-[0.92rem] font-semibold text-ink transition-opacity hover:opacity-90"
                    style={{ background: GREEN }}
                  >
                    ▶ Play the newest story
                  </a>
                )}
                <a
                  href="#how"
                  className="inline-flex items-center justify-center rounded-[10px] border border-line-strong bg-background/40 px-5 py-3 text-[0.92rem] font-semibold transition-colors hover:bg-panel-hover"
                >
                  How it works
                </a>
              </div>
              {links.length > 0 && (
                <p className="mt-4 text-[0.78rem] text-text-muted-2">
                  Also on{" "}
                  {links.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 && " · "}
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={l.ariaLabel}
                        className="underline-offset-2 transition-colors hover:text-text-primary hover:underline"
                      >
                        {l.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="pt-16 md:pt-20">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">Who it&apos;s for</h2>
          <p className="mt-2 text-[0.98rem] text-text-muted">
            Made for kids to enjoy, and for grown-ups who are learning English.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {AUDIENCES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-[18px] border border-line bg-panel-2 p-6">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-[11px]"
                  style={{ color: GREEN, background: `${GREEN}1f` }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[1.1rem] font-bold">{title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-[1.6] text-text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-24 pt-16 md:pt-20">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">How it works</h2>
          <ol className="mt-6 grid overflow-hidden rounded-[20px] border border-line md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className={`p-6 md:p-7 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[0.86rem] font-bold"
                    style={{ color: GREEN, background: `${GREEN}26` }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[1.05rem] font-bold">{step.title}</h3>
                </div>
                <p className="mt-3 text-[0.9rem] leading-[1.6] text-text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Meet the characters (also the episode filter; #episodes keeps old links working) */}
        <section id="episodes" className="scroll-mt-24 pt-16 md:pt-20">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">
            Meet the characters
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { key: null, name: "Everyone", line: "All characters", n: total, slug: null },
              ...storyValleyCast.map((m) => ({
                key: m.name,
                name: m.name,
                line: CAST_LINE[m.slug] ?? m.line,
                n: countFor(m.name),
                slug: m.slug,
              })),
            ].map((c) => {
              const on = c.slug ? active?.slug === c.slug : !active;
              return (
                <Link
                  key={c.name}
                  href={filterHref(c.key)}
                  scroll={false}
                  aria-current={on ? "true" : undefined}
                  className={`flex flex-col items-center gap-3 rounded-[16px] border p-4 text-center transition-colors md:flex-row md:text-left ${
                    on ? "" : "border-line bg-panel-2 hover:border-line-strong hover:bg-panel"
                  }`}
                  style={on ? { borderColor: GREEN, background: `${GREEN}14` } : undefined}
                >
                  {c.slug ? (
                    <img
                      src={`/characters/${c.slug}.svg`}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0 rounded-full"
                    />
                  ) : (
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-[0.74rem] font-semibold"
                      style={{ color: GREEN, borderColor: `${GREEN}80` }}
                    >
                      All
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="text-[1.05rem] font-bold leading-tight">{c.name}</div>
                    <div className="mt-1 text-[0.76rem] leading-snug text-text-muted">{c.line}</div>
                    <div className="mt-1.5 text-[0.72rem] font-medium" style={{ color: GREEN }}>
                      {c.n > 0 ? episodeCount(c.n) : "Coming soon"}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* All episodes */}
          <div className="mb-6 mt-14 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">
              {active ? `Episodes with ${active.name}` : "All episodes"}
            </h2>
            <span className="text-[0.84rem] font-medium text-text-muted">
              {episodeCount(episodeTotal)}
            </span>
          </div>
          {episodes.length === 0 ? (
            <p className="rounded-[18px] border border-dashed border-line-strong px-6 py-12 text-center text-text-muted">
              {active ? `No episodes with ${active.name} yet.` : "No episodes yet."}
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {episodes.map((ep) => (
                <StoryCard key={ep.id} story={ep} variant="full" />
              ))}
            </ul>
          )}
          {lastPage > 1 && episodes.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-[0.82rem] font-medium text-text-muted">
                Page {page} of {lastPage} · {from + 1}–{from + episodes.length} of{" "}
                {episodeCount(episodeTotal)}
              </span>
              <div className="flex gap-2.5">
                {page > 1 && (
                  <Link href={filterHref(active?.name ?? null, page - 1)} className={pageButton}>
                    ← Previous
                  </Link>
                )}
                {page < lastPage && (
                  <Link href={filterHref(active?.name ?? null, page + 1)} className={pageButton}>
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>

        {/* For grown-ups */}
        <section className="pb-20 pt-16 md:pb-24 md:pt-20">
          <div className="flex flex-col gap-4 rounded-[20px] bg-cream p-6 text-cream-ink sm:flex-row sm:items-start md:p-8">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-cream-ink/[0.08] text-[#3e6b33]">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.98rem] leading-[1.65]">
                <b className="font-bold">For grown-ups.</b> Story Valley is a Study Brew show for
                adults learning English with their kids. This page uses no analytics, no cookies and
                no ads, and children never need an account.
              </p>
              <p className="mt-2 text-[0.88rem] text-cream-muted">
                Like the stories?{" "}
                <a
                  href="https://ko-fi.com/studybrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cream-ink underline underline-offset-4"
                >
                  Buy us a coffee on Ko-fi.
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
