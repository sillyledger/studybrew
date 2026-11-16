import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CharacterCard from "@/components/CharacterCard";
import StoryValleyCastCard from "@/components/StoryValleyCastCard";
import { characters } from "@/lib/characters";
import { shows, type Show } from "@/lib/shows";
import { storyValleyCast } from "@/lib/story-valley";
import { STORY_SHOWS } from "@/lib/stories-list";

export const metadata: Metadata = {
  title: "Characters | Study Brew",
  description:
    "Meet the characters of the Study Brew audio stories: the people you'll follow through everyday, bedtime and Story Valley stories for English learners.",
};

const GRID_CLASS =
  "grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:gap-x-7";

// Same show colours as /stories.
const SHOW_COLOR: Partial<Record<Show["id"], string>> = {
  study: STORY_SHOWS["study-brew"].color,
  story: STORY_SHOWS["story-brew"].color,
  kids: STORY_SHOWS["story-valley"].color,
};

const LEVEL_PILL: Partial<Record<Show["id"], { label: string; className: string }>> = {
  study: { label: "B1–B2", className: "border-teal/40 text-teal" },
  story: { label: "B1–B2", className: "border-teal/40 text-teal" },
  kids: { label: "A1–A2", className: "border-[#8FCB6E]/50 text-[#8FCB6E]" },
};

const HEADER_CAST = [
  { slug: "anna", name: "Anna" },
  { slug: "luna", name: "Luna" },
  { slug: "sara", name: "Sara" },
  { slug: "lisa", name: "Lisa" },
  { slug: "caspian", name: "Caspian" },
  { slug: "tom", name: "Tom" },
];

function ShowHeading({ show, count }: { show: Show; count: number }) {
  const pill = LEVEL_PILL[show.id];
  return (
    <div className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-line pb-3.5">
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ background: SHOW_COLOR[show.id] }}
      />
      <h2 className="text-[1.25rem] font-bold leading-none">{show.name}</h2>
      {pill && (
        <span
          className={`rounded-full border px-2 py-0.5 text-[0.7rem] font-medium leading-none ${pill.className}`}
        >
          {pill.label}
        </span>
      )}
      <span className="text-[0.86rem] text-text-muted">{show.tagline}</span>
      <span className="ml-auto text-[0.72rem] font-medium text-text-muted">
        {count} {count === 1 ? "character" : "characters"}
      </span>
    </div>
  );
}

// Story Valley characters have no pages of their own, so their cards open the
// Story Valley episode list filtered to that character. StoryValleyCastCard
// renders these as a plain <a> (full page load), so the analytics loaded on
// this page never carries into Story Valley.
function storyValleyHref(name: string) {
  return `/stories/story-valley?character=${encodeURIComponent(name)}#episodes`;
}

export default function CharactersPage() {
  const kidsShow = shows.find((s) => s.id === "kids");

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-4 pt-10 md:px-14 md:pt-16">
        <a
          href="/stories"
          className="text-[0.8rem] font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          ← Stories
        </a>
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
              <span className="h-px w-5 shrink-0 bg-teal-dim" />
              <span>Characters</span>
            </div>
            <h1 className="text-[clamp(2.6rem,5.4vw,4.3rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              Meet the
              <br />
              <span className="text-teal">characters.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-text-muted">
              The people you&apos;ll follow through every story, from Anna&apos;s travels and
              Luna&apos;s bedtime trips to Sara&apos;s garden.
            </p>
          </div>
          <div className="hidden justify-end md:flex">
            <div className="flex">
              {HEADER_CAST.map((c, i) => (
                <img
                  key={c.slug}
                  src={`/characters/${c.slug}.svg`}
                  alt={c.name}
                  title={c.name}
                  width={76}
                  height={76}
                  className={`h-[64px] w-[64px] rounded-full bg-panel-2 ring-4 ring-background lg:h-[76px] lg:w-[76px] ${
                    i ? "-ml-3 lg:-ml-4" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-10 md:px-14">
        <div className="flex flex-col gap-[4.5rem]">
          {shows.map((show) => {
            const cast = characters.filter((c) => c.show === show.id);
            if (cast.length === 0) return null;
            return (
              <div key={show.id}>
                <ShowHeading show={show} count={cast.length} />
                <div className={GRID_CLASS}>
                  {cast.map((char, i) => (
                    <CharacterCard
                      key={char.slug}
                      char={char}
                      index={i}
                      href={`/stories/characters/${char.slug}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {kidsShow && storyValleyCast.length > 0 && (
            <div>
              <ShowHeading show={kidsShow} count={storyValleyCast.length} />
              <div className={GRID_CLASS}>
                {storyValleyCast.map((member, i) => (
                  <StoryValleyCastCard
                    key={member.slug}
                    member={member}
                    index={i}
                    href={storyValleyHref(member.name)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
