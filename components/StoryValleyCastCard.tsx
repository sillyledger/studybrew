import type { StoryValleyCharacter } from "@/lib/story-valley";

const ROTATIONS = ["-rotate-[3deg]", "rotate-[2.5deg]", "rotate-[2deg]", "-rotate-[2deg]"];

const POLAROID_CLASS =
  "relative block rounded-[4px] bg-text-primary p-[10px] pb-[18px] shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)]";
const HOVER_CLASS = "transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0";

// Polaroid for the Story Valley cast, matching components/CharacterCard.tsx.
// With `href` it is a plain <a>, not next/link, on purpose: a full page load
// means analytics from the previous page never carries over.
export default function StoryValleyCastCard({
  member,
  index,
  href,
}: {
  member: StoryValleyCharacter;
  index: number;
  href?: string;
}) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const inner = (
    <>
      <span className="absolute -top-2 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-[4deg] border border-coral/70 bg-coral/[0.55]" />
      <div className="mb-[0.6rem] flex aspect-square items-center justify-center rounded-[2px] bg-panel">
        <img
          src={`/characters/${member.slug}.svg`}
          alt={member.name}
          className="h-[88%] w-[88%]"
          loading="lazy"
        />
      </div>
      <h3 className="text-center text-base font-bold text-ink">{member.name}</h3>
      <div className="mt-[0.1rem] text-center font-medium text-[0.6rem] text-text-muted-2">
        {member.role}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${POLAROID_CLASS} ${HOVER_CLASS} ${rotation}`}>
        {inner}
      </a>
    );
  }

  return <div className={`${POLAROID_CLASS} ${rotation}`}>{inner}</div>;
}
