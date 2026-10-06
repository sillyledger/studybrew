import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { shows } from "../../../lib/shows";
import { storyValleyCast } from "../../../lib/story-valley";

// Fully static on purpose: no Supabase calls, no embeds, and no analytics
// (components/Analytics.tsx skips this path).
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Story Valley | Study Brew",
  description:
    "Simple A1-A2 English stories to share with your child, read aloud by a real person.",
};

const LISTEN_LINK_CLASS =
  "rounded-full border border-line px-3.5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-coral transition-colors hover:border-coral/60";

export default function StoryValley() {
  const show = shows.find((s) => s.id === "kids");

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <a
          href="/stories"
          className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-text-primary"
        >
          ← Stories
        </a>
        <div className="mb-[1.1rem] mt-8 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-coral">
          Story Valley
        </div>
        <h1 className="max-w-[18ch] text-[clamp(2.2rem,4vw,3.1rem)] font-black leading-[1.02]">
          English stories to share with your child.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          Short, slow A1-A2 stories for children learning English. Listen together
          and repeat the simple phrases. Read aloud by a real person, not an AI voice.
        </p>
        <p className="mt-3 max-w-[54ch] text-[0.9rem] leading-[1.6] text-text-muted-2">
          The narrator is a non-native English speaker, so the pace is clear and patient.
        </p>
        {show && (show.youtubeUrl || show.spotifyUrl) && (
          <div className="mt-7 flex flex-wrap gap-2.5">
            {show.youtubeUrl && (
              <a href={show.youtubeUrl} target="_blank" rel="noopener noreferrer" className={LISTEN_LINK_CLASS}>
                YouTube
              </a>
            )}
            {show.spotifyUrl && (
              <a href={show.spotifyUrl} target="_blank" rel="noopener noreferrer" className={LISTEN_LINK_CLASS}>
                Spotify
              </a>
            )}
          </div>
        )}
      </div>

      {/* Cast */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-14">
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
          <span className="h-2.5 w-2.5 shrink-0 self-center rounded-full bg-coral" />
          <h2 className="text-[1.6rem] font-black leading-none">Meet the cast</h2>
          <span className="ml-auto font-mono text-[0.72rem] text-text-muted">
            {storyValleyCast.length} characters
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {storyValleyCast.map((char) => (
            <div key={char.name} className="rounded-[14px] border border-line bg-panel p-7">
              <h3 className="text-[1.45rem] font-black leading-none">{char.name}</h3>
              <div className="mt-2.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-coral">
                {char.role}
              </div>
              <p className="mt-2.5 text-[0.92rem] leading-[1.55] text-text-muted">{char.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parents note */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-24 md:px-14">
        <div className="max-w-[640px] rounded-[14px] border border-line bg-panel-2 p-7">
          <h2 className="text-[1.3rem] font-black leading-none">A note for parents</h2>
          <p className="mt-3 text-[0.92rem] leading-[1.6] text-text-muted">
            Story Valley is a Study Brew show. This page does not use analytics or
            cookies, and there are no accounts here.
          </p>
        </div>
        <p className="mt-6 text-[0.92rem] text-text-muted">
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
      </section>
    </main>
  );
}
