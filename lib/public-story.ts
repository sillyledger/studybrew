// One story from the app's public API, for /stories/[slug] (Study Brew and
// Story Brew only; Story Valley has its own page).
//
// GET https://app.studybrew.co/api/public/stories/[slug] → PublicStory, or 404
// when the story isn't published there. On a 404 (or any error) the page falls
// back to the `posts` table and the old layout, so nothing breaks.

import { characters } from "./characters";

const API = "https://app.studybrew.co/api/public";

export const ONE_OFF_SLUG = "one-off";
/** show.slug of Story Valley for Kids (its stories live under /stories/story-valley). */
export const STORY_VALLEY_SHOW = "story-valley";

export interface PublicStory {
  slug: string;
  title: string;
  show: { slug: string; name: string };
  category: string;
  characters: { slug: string; name: string }[];
  level: string;
  minutes: number;
  teaser: string;
  body: { type: "paragraph" | "heading"; text: string; speaker: string | null }[];
  key_words: { word: string; meaning: string }[];
  /** Null when the story has no quiz (the quiz card is hidden). */
  quiz: { question: string; options: string[]; correct_index: number } | null;
  audio_url: string | null;
  spotify_url: string | null;
  apple_url: string | null;
  /** The episode on 小宇宙; empty or missing → the show's link (lib/shows.ts). */
  xiaoyuzhou_url?: string | null;
}

/** The story by its app slug, or null when the API doesn't have it (404) or
    can't be reached. Anything other than 200/404 is logged (Vercel logs). */
export async function getPublicStory(slug: string): Promise<PublicStory | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const url = `${API}/stories/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      if (res.status !== 404) console.warn(`[public-story] ${url} → ${res.status}`);
      return null;
    }
    const data = (await res.json()) as PublicStory;
    if (!data?.title || !Array.isArray(data.body)) {
      console.warn(`[public-story] ${url} → 200 but no title/body`);
      return null;
    }
    return {
      ...data,
      characters: Array.isArray(data.characters) ? data.characters : [],
      key_words: Array.isArray(data.key_words) ? data.key_words : [],
    };
  } catch (error) {
    console.warn(`[public-story] ${url} failed:`, error);
    return null;
  }
}

/** App slugs to try for a site title when the site slug isn't in the app:
    "Daniel's Neighbour Is Too Loud" → daniels-neighbour-is-too-loud and
    daniel-s-neighbour-is-too-loud. */
export function titleSlugs(title: string): string[] {
  const t = title.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[‘’ʼ]/g, "'");
  const slug = (s: string) => s.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return Array.from(new Set([slug(t.replace(/'/g, "")), slug(t)])).filter(Boolean);
}

/** The app's story for a site page: by slug first; if the slugs differ, by
    the site post's title (siteTitle) turned into a slug. */
export async function findPublicStory(slug: string, siteTitle: () => Promise<string | null>): Promise<PublicStory | null> {
  const direct = await getPublicStory(slug);
  if (direct) return direct;
  const title = await siteTitle();
  if (!title) return null;
  for (const candidate of titleSlugs(title)) {
    if (candidate === slug) continue;
    const story = await getPublicStory(candidate);
    if (story) return story;
  }
  return null;
}

/** The story's character, or null for One-off stories. */
export function mainCharacter(story: PublicStory) {
  const c = story.characters[0];
  if (!c || c.slug === ONE_OFF_SLUG) return null;
  const known = characters.find((k) => k.slug === c.slug);
  return {
    slug: c.slug,
    name: c.name,
    avatar: known?.hasAvatar ? `/characters/${known.slug}.svg` : null,
    /** Character page, when the site has one. */
    href: known ? `/stories/characters/${known.slug}` : null,
  };
}

/** Category pages that exist on the site, by slug. */
const CATEGORY_PAGES = new Set(["bedtime", "daily-life", "fantasy", "travel", "career"]);

/** Back link target for a category name ("Daily Life" → /stories/daily-life). */
export function categoryHref(category: string | null | undefined): string {
  const c = (category ?? "").trim().toLowerCase();
  const slug = c.startsWith("bedtime") ? "bedtime" : c.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return CATEGORY_PAGES.has(slug) ? `/stories/${slug}` : "/stories";
}

/** open.spotify.com/episode/… → the Spotify embed. Null for anything else. */
export function spotifyEmbedUrl(link: string | null): string | null {
  if (!link) return null;
  try {
    const url = new URL(link);
    if (url.hostname !== "open.spotify.com") return null;
    const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(episode|track)\/([A-Za-z0-9]+)\/?$/);
    return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
  } catch {
    return null;
  }
}

/** podcasts.apple.com/…/id123?i=456 → the Apple embed. Null for anything else. */
export function appleEmbedUrl(link: string | null): string | null {
  if (!link) return null;
  try {
    const url = new URL(link);
    if (url.hostname !== "podcasts.apple.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const idIndex = parts.findIndex((p) => /^id\d+$/.test(p));
    if (idIndex === -1) return null;
    const showId = parts[idIndex].slice(2);
    const before = parts[idIndex - 1];
    const slug = before && before !== "podcast" ? before : null;
    const episode = url.searchParams.get("i");
    const path = `/us/podcast/${slug ? `${encodeURIComponent(decodeURIComponent(slug))}/` : ""}id${showId}`;
    return `https://embed.podcasts.apple.com${path}${episode && /^\d+$/.test(episode) ? `?i=${episode}` : ""}`;
  } catch {
    return null;
  }
}

/* ---------- Tap-a-word tokens (server-rendered spans) ---------- */

// Built with new RegExp: the tsconfig target (ES5) rejects the u flag in literals.
const WORD_SOURCE = "[\\p{L}\\p{N}]+(?:['’][\\p{L}]+)*";
const HAS_LETTER = new RegExp("\\p{L}", "u");

/** Every word match in text (an exec loop: no matchAll iteration on ES5). */
function words(text: string): { index: number; text: string }[] {
  const re = new RegExp(WORD_SOURCE, "gu");
  const out: { index: number; text: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push({ index: m.index, text: m[0] });
  return out;
}

/** The word to look up for a token: lower case, no possessive ("Lisa's" → "lisa"). */
export function lookupKey(token: string): string | null {
  const key = token.toLowerCase().replace(/’/g, "'").replace(/'s$/, "");
  return HAS_LETTER.test(key) && key.length <= 40 ? key : null;
}

export type Token = { text: string; key: string | null; keyWord?: boolean };

/** Splits text into words (with a lookup key) and the bits between them.
    Tokens that are part of a key word (or key phrase) get keyWord: true. */
export function tokenize(text: string, keyPhrases: string[][]): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  words(text).forEach((match) => {
    if (match.index > last) tokens.push({ text: text.slice(last, match.index), key: null });
    tokens.push({ text: match.text, key: lookupKey(match.text) });
    last = match.index + match.text.length;
  });
  if (last < text.length) tokens.push({ text: text.slice(last), key: null });

  // Mark key words: each phrase is a run of word tokens, any case.
  const wordTokens = tokens.map((t, i) => ({ i, t })).filter(({ t }) => t.key);
  for (const phrase of keyPhrases) {
    if (!phrase.length) continue;
    for (let w = 0; w + phrase.length <= wordTokens.length; w++) {
      const run = wordTokens.slice(w, w + phrase.length);
      if (run.every(({ t }, j) => t.text.toLowerCase().replace(/’/g, "'") === phrase[j] || t.key === phrase[j])) {
        run.forEach(({ i }) => (tokens[i].keyWord = true));
      }
    }
  }
  return tokens;
}

/** Key words as lower-case word lists ("look forward to" → ["look", "forward", "to"]). */
export function keyPhrases(keyWords: { word: string }[]): string[][] {
  return keyWords.map((k) =>
    words(k.word.toLowerCase().replace(/’/g, "'")).map((m) => m.text)
  );
}
