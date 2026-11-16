// Everything /stories needs to list stories, in one place.
//
// Stories come from the Supabase `posts` table (the same table and client as
// the category pages). Each post is turned into a small, serialisable
// StoryListItem: no story text is sent to the browser.
//
// To limit which stories /stories shows (for example a hand-picked list),
// change pickStories() below. Nothing else needs to change.

import { createClient } from "./supabase";
import { characters } from "./characters";
import { storyValleyCast } from "./story-valley";

export type ShowKey = "study-brew" | "story-brew" | "story-valley";
export type LevelKey = "a1-a2" | "b1-b2";

export const STORY_SHOWS: Record<ShowKey, { name: string; color: string; level: string }> = {
  "study-brew": { name: "Study Brew", color: "#5DCAA5", level: "B1–B2" },
  "story-brew": { name: "Story Brew", color: "#9A93E0", level: "B1–B2" },
  "story-valley": { name: "Story Valley for Kids", color: "#8FCB6E", level: "A1–A2" },
};

/** Categories that get a filter chip, in chip order. */
export const STORY_CATEGORIES = [
  { slug: "daily-life", label: "Daily life" },
  { slug: "travel", label: "Travel" },
  { slug: "career", label: "Career" },
  { slug: "bedtime", label: "Bedtime" },
] as const;

export interface StoryListItem {
  id: string;
  slug: string;
  title: string;
  /** /stories/[slug] or /stories/story-valley/[slug]. */
  href: string;
  /** Story Valley links must be plain <a> (full page load, no analytics carry-over). */
  isStoryValley: boolean;
  show: ShowKey;
  level: LevelKey;
  /** Short label on the cover, e.g. "Daily life". */
  category: string;
  categorySlug: string | null;
  /** Cover colour (category colour, or the show colour). */
  color: string;
  /** Keys of every character in the story ("Anna, Daniel" → anna, daniel).
      Used by the ?character= filter and the character pages. */
  characterKeys: string[];
  /** Name for each key, for filter labels. */
  characterNames: Record<string, string>;
  /** The first character: shown on cards (avatar and name). */
  character: {
    /** Key for the ?character= filter. */
    key: string;
    name: string;
    avatar: string | null;
    /** Character page, when one exists. */
    pageHref: string | null;
  } | null;
  teaser: string;
  minutes: number;
  listen: boolean;
  publishedAt: string | null;
}

/* ---------- The one switch ---------- */

/** Which stories /stories shows. Return a subset here to limit the page,
    e.g. `stories.filter((s) => PICKED_SLUGS.includes(s.slug))`. */
function pickStories(stories: StoryListItem[]): StoryListItem[] {
  return stories;
}

/* ---------- Mapping a post ---------- */

interface PostRow {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  seo_description: string | null;
  category: string | null;
  target_site: string;
  published_at: string | null;
  sub_category: string | null;
  spotify_url: string | null;
}

const CATEGORY_STYLE: Record<string, { label: string; color: string }> = {
  "daily-life": { label: "Daily life", color: "#5DCAA5" },
  travel: { label: "Travel", color: "#7CACDD" },
  career: { label: "Career", color: "#F2C46B" },
  bedtime: { label: "Bedtime", color: "#9A93E0" },
  fantasy: { label: "Fantasy", color: "#F0997B" },
};

function categorySlug(category: string | null): string | null {
  const c = (category ?? "").trim().toLowerCase();
  if (!c) return null;
  if (c.startsWith("bedtime")) return "bedtime"; // stored as "Bedtime Stories"
  return c.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** The show a post belongs to. */
function showOf(post: PostRow): ShowKey {
  if (post.target_site === "storyvalley.co") return "story-valley";
  return categorySlug(post.category) === "bedtime" ? "story-brew" : "study-brew";
}

const ENTITIES: Record<string, string> = {
  amp: "&", quot: '"', apos: "'", nbsp: " ", lt: "<", gt: ">",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", mdash: "—", ndash: "–", hellip: "…",
};

function plainText(html: string | null): string {
  return (html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

function shorten(text: string, max = 140): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : max).replace(/[\s,.;:]+$/, "")}…`;
}

/** One name from sub_category ("Luna the Cat" → Luna), matched case-insensitively. */
function matchName(part: string, show: ShowKey): { key: string; name: string } {
  const p = part.trim().toLowerCase();
  const matches = (name: string) => p === name.toLowerCase() || p.startsWith(`${name.toLowerCase()} `);
  const known =
    show === "story-valley"
      ? storyValleyCast.find((m) => matches(m.name))
      : characters.find((c) => matches(c.name));
  return known ? { key: known.slug, name: known.name } : { key: p, name: part.trim() };
}

/** Every character in the story: sub_category can list several ("Anna, Daniel"). */
function charactersOf(post: PostRow, show: ShowKey) {
  const parts = (post.sub_category ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const found = parts.map((part) => matchName(part, show));
  return {
    characterKeys: Array.from(new Set(found.map((c) => c.key))),
    characterNames: Object.fromEntries(found.map((c) => [c.key, c.name])),
  };
}

/** The first character, shown on cards. */
function characterOf(post: PostRow, show: ShowKey): StoryListItem["character"] {
  const raw = (post.sub_category ?? "").trim();
  if (!raw) return null;
  const first = raw.split(",")[0].trim().toLowerCase();
  const matches = (name: string) =>
    first === name.toLowerCase() || first.startsWith(`${name.toLowerCase()} `);

  if (show === "story-valley") {
    const member = storyValleyCast.find((m) => matches(m.name));
    return member
      ? { key: member.slug, name: raw, avatar: `/characters/${member.slug}.svg`, pageHref: null }
      : { key: first, name: raw, avatar: null, pageHref: null };
  }
  const char = characters.find((c) => matches(c.name));
  return char
    ? {
        key: char.slug,
        name: raw,
        avatar: char.hasAvatar ? `/characters/${char.slug}.svg` : null,
        pageHref: `/stories/characters/${char.slug}`,
      }
    : { key: first, name: raw, avatar: null, pageHref: null };
}

function toItem(post: PostRow): StoryListItem {
  const show = showOf(post);
  const isStoryValley = show === "story-valley";
  const slug = categorySlug(post.category);
  const style = slug ? CATEGORY_STYLE[slug] : undefined;
  const text = plainText(post.content);
  const words = text ? text.split(" ").length : 0;

  return {
    id: String(post.id),
    slug: post.slug,
    title: post.title,
    href: isStoryValley ? `/stories/story-valley/${post.slug}` : `/stories/${post.slug}`,
    isStoryValley,
    show,
    level: isStoryValley ? "a1-a2" : "b1-b2",
    category: isStoryValley ? "Story Valley" : (style?.label ?? post.category ?? "Story"),
    categorySlug: isStoryValley ? null : slug,
    color: isStoryValley ? STORY_SHOWS["story-valley"].color : (style?.color ?? STORY_SHOWS[show].color),
    ...charactersOf(post, show),
    character: characterOf(post, show),
    teaser: post.seo_description?.trim() || shorten(text),
    minutes: Math.max(2, Math.round(words / 130)),
    listen: Boolean(post.spotify_url),
    publishedAt: post.published_at,
  };
}

/** Published stories for /stories, newest first. */
export async function getStoryList(): Promise<StoryListItem[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("posts")
      .select(
        "id, title, slug, content, seo_description, category, target_site, published_at, sub_category, spotify_url"
      )
      .in("target_site", ["studybrew.co", "storyvalley.co"])
      .eq("status", "published")
      .order("published_at", { ascending: false });
    return pickStories(((data ?? []) as PostRow[]).map(toItem));
  } catch {
    return [];
  }
}
