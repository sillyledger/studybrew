import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { createClient } from "../../../lib/supabase";
import { shows, showLinks } from "../../../lib/shows";
import { storyValleyCast } from "../../../lib/story-valley";

// No embeds and no analytics (components/Analytics.tsx skips this path and
// everything under it). Episodes come from posts with target_site
// 'storyvalley.co', fetched on the server only. Dynamic because the
// character filter and paging come from searchParams.

export const metadata: Metadata = {
  title: "Story Valley | Study Brew",
  description:
    "Simple A1-A2 English stories to share with your child, read aloud by a real person.",
};

const LISTEN_LINK_CLASS =
  "whitespace-nowrap rounded-full border border-line px-3 py-1.5 font-medium text-[0.7rem] text-coral transition-colors hover:border-coral/60";

const PAGE_LINK_CLASS =
  "font-medium text-[0.74rem] text-coral transition-opacity hover:opacity-80";

const PAGE_SIZE = 12;

interface Episode {
  id: string;
  title: string;
  slug: string;
  sub_category: string | null;
  published_at: string | null;
}

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

export default async function StoryValley({
  searchParams,
}: {
  searchParams: Promise<{ character?: string; page?: string }>;
}) {
  const params = await searchParams;
  const show = shows.find((s) => s.id === "kids");
  const listenLinks = show ? showLinks(show) : [];

  const active =
    storyValleyCast.find(
      (m) => m.name.toLowerCase() === params.character?.trim().toLowerCase(),
    ) ?? null;

  const supabase = createClient();

  // Every published episode's character, counted here for the filter cards.
  const { data: allRows } = await supabase
    .from("posts")
    .select("sub_category")
    .eq("target_site", "storyvalley.co")
    .eq("status", "published");
  const rows = allRows ?? [];
  const total = rows.length;
  const countFor = (name: string) =>
    rows.filter((r) => r.sub_category?.toLowerCase() === name.toLowerCase()).length;

  const filteredTotal = active ? countFor(active.name) : total;
  const lastPage = Math.max(1, Math.ceil(filteredTotal / PAGE_SIZE));
  const requested = Number.parseInt(params.page ?? "", 10);
  const page = Math.min(Math.max(Number.isNaN(requested) ? 1 : requested, 1), lastPage);
  const from = (page - 1) * PAGE_SIZE;

  let query = supabase
    .from("posts")
    .select("id, title, slug, sub_category, published_at", { count: "exact" })
    .eq("target_site", "storyvalley.co")
    .eq("status", "published");
  if (active) query = query.ilike("sub_category", active.name);
  const { data, count } = await query
    .order("published_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  const episodes: Episode[] = data ?? [];
  const episodeTotal = count ?? filteredTotal;

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <a
          href="/stories"
          className="font-medium text-[0.8rem] text-text-muted transition-colors hover:text-text-primary"
        >
          ← Stories
        </a>
        <div className="mb-[1.1rem] mt-8 font-medium text-[0.8rem] text-coral">
          Story Valley
        </div>
        <h1 className="max-w-[18ch] text-[clamp(2.2rem,4vw,3.1rem)] font-bold leading-[1.02]">
          English stories to share with your child.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Short, slow A1-A2 stories for children learning English. Listen together
          and repeat the simple phrases. Read aloud by a real person, not an AI voice.
        </p>
        <p className="mt-3 max-w-[54ch] text-[0.9rem] leading-[1.6] text-text-muted-2">
          The narrator is a non-native English speaker, so the pace is clear and patient.
        </p>
        {listenLinks.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2.5">
            {listenLinks.map(({ href, label, ariaLabel }) => (
              <a
                key={label}
                href={href}
                aria-label={ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                className={LISTEN_LINK_CLASS}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Cast, doubling as the episode filter */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-14">
        <div className="mb-4 font-medium text-[0.74rem] text-text-muted-2">
          Meet the cast, or pick a character
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <Link
            href={filterHref(null)}
            className={`flex flex-col items-center gap-3.5 rounded-[14px] border p-4 text-center transition-colors sm:flex-row sm:text-left ${
              active ? "border-line bg-panel hover:border-coral/60" : "border-coral/60 bg-coral/[0.08]"
            }`}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-coral/50 font-medium text-[0.72rem] text-coral">
              All
            </span>
            <div className="min-w-0">
              <h3 className="font-heading text-xl font-bold leading-none">Everyone</h3>
              <div className="mt-1.5 font-medium text-[0.68rem] text-text-muted">
                All characters
              </div>
              <div className="mt-1.5 font-medium text-[0.66rem] text-coral">{episodeCount(total)}</div>
            </div>
          </Link>
          {storyValleyCast.map((member) => {
            const n = countFor(member.name);
            const isActive = active?.slug === member.slug;
            return (
              <Link
                key={member.slug}
                href={filterHref(member.name)}
                className={`flex flex-col items-center gap-3.5 rounded-[14px] border p-4 text-center transition-colors sm:flex-row sm:text-left ${
                  isActive ? "border-coral/60 bg-coral/[0.08]" : "border-line bg-panel hover:border-coral/60"
                }`}
              >
                <img
                  src={`/characters/${member.slug}.svg`}
                  alt=""
                  width={56}
                  height={56}
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-heading text-xl font-bold leading-none">{member.name}</h3>
                  <div className="mt-1.5 font-medium text-[0.68rem] text-text-muted">
                    {member.role}
                  </div>
                  {n > 0 ? (
                    <div className="mt-1.5 font-medium text-[0.66rem] text-coral">{episodeCount(n)}</div>
                  ) : (
                    <div className="mt-1.5 font-medium text-[0.66rem] text-text-muted-2">Coming soon</div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Episodes */}
      <section id="episodes" className="mx-auto w-full max-w-[1180px] scroll-mt-6 px-6 pb-16 md:px-14">
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
          <span className="h-2.5 w-2.5 shrink-0 self-center rounded-full bg-coral" />
          <h2 className="text-[1.6rem] font-bold leading-none">Episodes</h2>
          <span className="ml-auto font-medium text-[0.72rem] text-text-muted">
            {episodeCount(episodeTotal)}
          </span>
        </div>
        {episodes.length === 0 ? (
          <p className="text-[0.92rem] text-text-muted">
            {active ? `No episodes for ${active.name} yet.` : "No episodes yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/stories/story-valley/${ep.slug}`}
                className="group flex items-center justify-between rounded-[14px] border border-line bg-panel px-[22px] py-5 no-underline transition-colors hover:border-coral/60"
              >
                <div>
                  {ep.sub_category && (
                    <span className="mb-2 inline-block rounded-full border border-coral/30 px-2 py-0.5 text-xs text-coral">
                      {ep.sub_category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-coral">
                    {ep.title}
                  </h3>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-4 shrink-0 text-text-muted-2 transition-colors group-hover:text-coral">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        )}
        {lastPage > 1 && episodes.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="font-medium text-[0.72rem] text-text-muted">
              Showing {from + 1} to {from + episodes.length} of {episodeCount(episodeTotal)}
            </span>
            <div className="flex gap-5">
              {page > 1 && (
                <Link href={filterHref(active?.name ?? null, page - 1)} className={PAGE_LINK_CLASS}>
                  ← Previous
                </Link>
              )}
              {page < lastPage && (
                <Link href={filterHref(active?.name ?? null, page + 1)} className={PAGE_LINK_CLASS}>
                  Next →
                </Link>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Parents note */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-24 md:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-line bg-panel px-[22px] py-5">
          <div>
            <h2 className="text-[1.1rem] font-bold leading-none">A note for parents</h2>
            <p className="mt-2 text-[0.88rem] leading-[1.6] text-text-muted">
              Story Valley is a Study Brew show. This page does not use analytics or
              cookies, and there are no accounts here.
            </p>
          </div>
          <p className="text-[0.88rem] text-text-muted">
            Like the stories?{" "}
            <a
              href="https://ko-fi.com/studybrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral underline-offset-4 hover:underline"
            >
              You can buy me a coffee on Ko-fi.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
