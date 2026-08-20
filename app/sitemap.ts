import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase";
import { characters } from "@/lib/characters";
import { CATEGORIES } from "@/app/flashcards/english/data";

export const revalidate = 3600;

const BASE_URL = "https://studybrew.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/app`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/flashcards`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/flashcards/english`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/flashcards/traditional-chinese`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/stories`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/stories/daily-life`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/stories/bedtime`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/stories/fantasy`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/stories/characters`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/practice/tongue-twisters`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const deckRoutes: MetadataRoute.Sitemap = CATEGORIES.filter(
    (cat) => cat.available && (cat.cards?.length ?? 0) > 0
  ).map((cat) => ({
    url: `${BASE_URL}/flashcards/english/${cat.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const characterRoutes: MetadataRoute.Sitemap = characters.map((char) => ({
    url: `${BASE_URL}/stories/characters/${char.slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  let storyRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data: stories } = await supabase
      .from("posts")
      .select("slug, published_at")
      .eq("target_site", "studybrew.co")
      .eq("status", "published");

    storyRoutes = (stories ?? []).map((story) => ({
      url: `${BASE_URL}/stories/${story.slug}`,
      lastModified: story.published_at ? new Date(story.published_at) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // If Supabase is unreachable at build time, fall back to the static
    // routes above rather than failing the whole sitemap.
  }

  return [...staticRoutes, ...deckRoutes, ...characterRoutes, ...storyRoutes];
}
