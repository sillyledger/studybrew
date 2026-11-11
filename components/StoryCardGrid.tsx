import Link from "next/link";

export interface StoryCardData {
  id: string;
  title: string;
  slug: string;
  sub_category: string | null;
  level: string | null;
}

// Bento layout for the desktop grid. Cycles every 12 stories.
const GRID_PATTERN: { gridColumn: string; gridRow: string }[] = [
  { gridColumn: "span 2", gridRow: "span 2" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 2" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 2", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 2" },
  { gridColumn: "span 2", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
];

function Arrow({ size, className }: { size: number; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Story cards used on every /stories/{category} page: a single-column list on
// phones and a bento grid from tablet up. Rows have a minimum height but grow
// with their content, so long titles never push the level tag out of view;
// cards in the same row stretch to equal height and the tag sits at the bottom.
export default function StoryCardGrid({ stories }: { stories: StoryCardData[] }) {
  return (
    <>
      {/* Mobile: single column list */}
      <div className="flex flex-col gap-3 md:hidden">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 no-underline transition-all hover:bg-white/8"
          >
            <div className="min-w-0">
              {story.sub_category && (
                <span className="mb-2 inline-block rounded-full border border-[#E8A45A]/20 px-2 py-0.5 text-xs text-[#E8A45A]">
                  {story.sub_category}
                </span>
              )}
              <h2 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#E8A45A]">
                {story.title}
              </h2>
              {story.level && (
                <span className="mt-1 inline-block text-xs text-white/30">{story.level}</span>
              )}
            </div>
            <Arrow size={14} className="ml-4 shrink-0 text-white/20" />
          </Link>
        ))}
      </div>

      {/* Tablet and desktop: bento grid */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gridAutoRows: "minmax(140px, auto)",
          gap: "12px",
        }}
      >
        {stories.map((story, i) => {
          const { gridColumn, gridRow } = GRID_PATTERN[i % GRID_PATTERN.length];
          return (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              style={{ gridColumn, gridRow }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 no-underline transition-all hover:bg-white/8"
            >
              <div>
                {story.sub_category && (
                  <span className="mb-3 inline-block rounded-full border border-[#E8A45A]/20 px-2 py-0.5 text-xs text-[#E8A45A]">
                    {story.sub_category}
                  </span>
                )}
                <h2 className="mt-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-[#E8A45A]">
                  {story.title}
                </h2>
              </div>
              <div className="mt-auto flex items-center justify-between pt-6">
                {story.level ? (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/30">
                    {story.level}
                  </span>
                ) : (
                  <span />
                )}
                <Arrow
                  size={16}
                  className="shrink-0 text-white/20 transition-colors group-hover:text-white/50"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
