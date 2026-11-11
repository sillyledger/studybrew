import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CharacterCard from "@/components/CharacterCard";
import StoryValleyCastCard from "@/components/StoryValleyCastCard";
import { characters } from "@/lib/characters";
import { shows, type Show } from "@/lib/shows";
import { storyValleyCast } from "@/lib/story-valley";

export const metadata: Metadata = {
  title: "Characters | Study Brew",
  description:
    "Meet the characters of the Study Brew audio stories: the people you'll follow through everyday, bedtime and Story Valley stories for English learners.",
};

const GRID_CLASS =
  "grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:gap-x-7";

function ShowHeading({ show, count }: { show: Show; count: number }) {
  return (
    <div className="mb-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3.5">
      <span className={`h-2 w-2 shrink-0 self-center rounded-full ${show.dot}`} />
      <h2 className="text-[1.15rem] font-bold leading-none">{show.name}</h2>
      <span className="text-[0.86rem] text-text-muted">{show.tagline}</span>
      <span className="ml-auto text-[0.72rem] font-medium text-text-muted">
        {count} {count === 1 ? "character" : "characters"}
      </span>
    </div>
  );
}

// Story Valley characters have no pages of their own, so their cards open the
// Story Valley episode list filtered to that character.
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
        <div className="mb-[1.1rem] mt-8 text-[0.8rem] font-medium text-teal">Characters</div>
        <h1 className="max-w-[18ch] text-[clamp(2.2rem,4vw,3.1rem)] font-bold leading-[1.02]">
          Meet the characters.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          The people you&apos;ll follow through every Study Brew story.
        </p>
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
