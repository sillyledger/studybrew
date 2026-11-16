import Link from "next/link";
import { comingSoonPill, type Character } from "@/lib/characters";

const AVATAR_COLORS = ["bg-coral", "bg-teal", "bg-blue"];
const ROTATIONS = ["-rotate-[3deg]", "rotate-[2.5deg]", "rotate-[2deg]", "-rotate-[2deg]"];

// Polaroid card used on /stories and /stories/characters. `index` drives the
// rotation and the fallback avatar colour so neighbouring cards never look
// identical. `href` overrides where the card links (default: char.href, then
// the character's own page).
export default function CharacterCard({
  char,
  index,
  href,
}: {
  char: Character;
  index: number;
  href?: string;
}) {
  return (
    <Link
      href={href ?? char.href ?? `/stories/characters/${char.slug}`}
      className={`relative block rounded-[4px] bg-text-primary p-[10px] pb-[18px] shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0 ${ROTATIONS[index % ROTATIONS.length]}`}
    >
      <span className="absolute -top-2 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-[4deg] border border-coral/70 bg-coral/[0.55]" />
      {char.comingSoon && (
        <span className="absolute -top-2 right-1 rounded-full border border-line bg-panel px-2 py-[0.2rem] font-medium text-[0.64rem] text-text-muted-2">
          {comingSoonPill(char)}
        </span>
      )}
      <div className="mb-[0.6rem] flex aspect-square items-center justify-center rounded-[2px] bg-panel">
        {char.hasAvatar ? (
          <img
            src={`/characters/${char.slug}.svg`}
            alt={char.name}
            className="h-[88%] w-[88%]"
            loading="lazy"
          />
        ) : (
          <div
            className={`h-[52%] w-[52%] rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
          />
        )}
      </div>
      <h3 className="text-center text-base font-bold text-ink">{char.name}</h3>
      <div className="mt-[0.1rem] text-center font-medium text-[0.6rem] text-text-muted-2">
        {char.role}
      </div>
    </Link>
  );
}
