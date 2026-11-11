import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { createClient } from "../../../../lib/supabase";

// Story Valley episode. No embeds, no iframes and no analytics
// (components/Analytics.tsx skips everything under /stories/story-valley).
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

const DEFAULT_DESCRIPTION = "A simple A1-A2 English story for kids, read aloud by a real person.";

const LISTEN_LINK_CLASS =
  "inline-block rounded-full border border-line px-3.5 py-2.5 font-medium text-[0.7rem] text-coral transition-colors hover:border-coral/60";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const supabase = createClient();
  const { data: episode } = await supabase
    .from("posts")
    .select("title, seo_title, seo_description")
    .eq("slug", slug)
    .eq("target_site", "storyvalley.co")
    .eq("status", "published")
    .single();

  if (!episode) {
    return { title: "Story Not Found | Study Brew" };
  }

  return {
    title: episode.seo_title || `${episode.title} | Study Brew`,
    description: episode.seo_description || DEFAULT_DESCRIPTION,
  };
}

export default async function StoryValleyEpisode({ params }: Props) {
  const { slug } = await params;

  const supabase = createClient();
  const { data: episode } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("target_site", "storyvalley.co")
    .eq("status", "published")
    .single();

  if (!episode) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <section className="mx-auto w-full max-w-2xl px-6 py-10 md:py-16">
        <div className="mb-6 md:mb-8">
          <a
            href="/stories/story-valley"
            className="font-medium text-[0.8rem] text-text-muted transition-colors hover:text-text-primary"
          >
            ← Story Valley
          </a>
        </div>

        <div className="mb-4 flex items-center gap-3">
          {episode.sub_category && (
            <span className="rounded-full border border-coral/30 px-2 py-0.5 text-xs text-coral">
              {episode.sub_category}
            </span>
          )}
          {episode.level && (
            <span className="rounded-full border border-line px-2 py-0.5 text-xs text-text-muted">
              {episode.level}
            </span>
          )}
        </div>

        <h1 className="mb-8 text-3xl font-bold leading-tight md:text-4xl">{episode.title}</h1>

        {episode.spotify_url && (
          <a href={episode.spotify_url} target="_blank" rel="noopener noreferrer" className={LISTEN_LINK_CLASS}>
            Listen on Spotify
          </a>
        )}

        <p className="mb-10 mt-5 text-[0.9rem] leading-[1.6] text-text-muted md:mb-12">
          Read aloud by a real person, not an AI voice. The narrator is a non-native English speaker.
        </p>

        {episode.content && (
          <div>
            <p className="mb-6 text-[0.82rem] font-medium text-white/40">Transcript</p>
            <div className="prose-story" dangerouslySetInnerHTML={{ __html: episode.content }} />
          </div>
        )}
      </section>

      <style>{`
        .prose-story p { color: rgba(255,255,255,0.86); line-height: 1.85; margin-bottom: 1.25em; font-size: 19px; }
        @media (min-width: 768px) { .prose-story p { font-size: 21px; } }
        .prose-story h1, .prose-story h2, .prose-story h3 { color: #ffffff; font-weight: 600; margin: 1.5em 0 0.5em; }
        .prose-story strong { color: #ffffff; }
        .prose-story em { font-style: italic; }
        .prose-story ul, .prose-story ol { color: rgba(255,255,255,0.86); padding-left: 22px; margin-bottom: 1.25em; font-size: 19px; }
        .prose-story li { margin-bottom: 4px; line-height: 1.85; }
        .prose-story blockquote { border-left: 3px solid rgba(240,153,123,0.4); padding-left: 16px; color: rgba(255,255,255,0.7); margin: 1.25em 0; font-size: 19px; }
      `}</style>
    </main>
  );
}
