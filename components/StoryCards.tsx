// Story cards and their small pieces, shared by /stories and the character pages.
import Link from "next/link";
import { STORY_SHOWS, type LevelKey, type StoryListItem } from "@/lib/stories-list";

export const levelLabel = (l: LevelKey) => (l === "a1-a2" ? "A1–A2" : "B1–B2");

/** Story Valley gets a plain <a> (full page load) so analytics never carries over. */
export function StoryLink({
  story,
  className,
  children,
}: {
  story: StoryListItem;
  className?: string;
  children: React.ReactNode;
}) {
  return story.isStoryValley ? (
    <a href={story.href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={story.href} className={className}>
      {children}
    </Link>
  );
}

export function Avatar({
  story,
  size,
  className = "",
}: {
  story: StoryListItem;
  size: number;
  className?: string;
}) {
  const c = story.character;
  if (c?.avatar) {
    return (
      <img
        src={c.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={`shrink-0 rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-ink ${className}`}
      style={{ width: size, height: size, background: story.color, fontSize: size * 0.42 }}
    >
      {(c?.name ?? story.title).charAt(0).toUpperCase()}
    </span>
  );
}

export function Cover({ story, height, avatar }: { story: StoryListItem; height: string; avatar: number }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${height}`}
      style={{
        background: `radial-gradient(120% 90% at 50% 20%, ${story.color}55, ${story.color}14 60%, transparent), var(--color-panel-2)`,
      }}
    >
      <Avatar story={story} size={avatar} className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]" />
      <span className="absolute bottom-3 left-3 rounded-[7px] bg-cream px-2 py-0.5 text-[0.7rem] font-semibold text-cream-ink">
        {story.category}
      </span>
    </div>
  );
}

export function LevelPill({ level }: { level: LevelKey }) {
  return (
    <span className="rounded-full border border-teal/30 bg-teal/10 px-2 py-0.5 text-[0.7rem] font-medium text-teal">
      {levelLabel(level)}
    </span>
  );
}

/** Story card used on /stories and the character pages. The "character"
    variant drops the character row and show name, and adds the teaser. */
export function StoryCard({
  story,
  variant = "browse",
}: {
  story: StoryListItem;
  variant?: "browse" | "character";
}) {
  const show = STORY_SHOWS[story.show];
  return (
    <li>
      <StoryLink
        story={story}
        className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-panel-2 transition-colors hover:border-line-strong hover:bg-panel"
      >
        <Cover story={story} height="h-[132px]" avatar={84} />
        <div className="flex flex-1 flex-col p-4">
          {variant === "browse" && (
            <>
              <div className="mb-2 flex min-w-0 items-center gap-2 text-[0.8rem] text-text-muted">
                <Avatar story={story} size={20} />
                <span className="truncate">{story.character?.name ?? "Story"}</span>
              </div>
              <div className="mb-1 text-[0.74rem] font-semibold" style={{ color: show.color }}>
                {show.name}
              </div>
            </>
          )}
          <h3 className="text-[1.02rem] font-bold leading-snug">{story.title}</h3>
          {variant === "character" && (
            <p className="mt-1.5 line-clamp-3 text-[0.84rem] leading-[1.55] text-text-muted">
              {story.teaser}
            </p>
          )}
          <div className="mt-auto flex items-center gap-2.5 pt-4 text-[0.76rem] text-text-muted-2">
            <LevelPill level={story.level} />
            <span>{story.minutes} min</span>
            {story.listen && <span className="ml-auto text-text-muted">🎧 Listen</span>}
          </div>
        </div>
      </StoryLink>
    </li>
  );
}
