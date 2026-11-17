const CAST = [
  { slug: "anna", name: "Anna" },
  { slug: "luna", name: "Luna" },
  { slug: "sara", name: "Sara" },
  { slug: "lisa", name: "Lisa" },
  { slug: "caspian", name: "Caspian" },
  { slug: "tom", name: "Tom" },
];

/** Overlapping row of story-character avatars, used in page heroes. */
export default function CastAvatars() {
  return (
    <div className="flex justify-start md:justify-end">
      <div className="flex">
        {CAST.map((c, i) => (
          <img
            key={c.slug}
            src={`/characters/${c.slug}.svg`}
            alt={c.name}
            title={c.name}
            width={76}
            height={76}
            className={`h-[58px] w-[58px] rounded-full bg-panel-2 ring-4 ring-background sm:h-[76px] sm:w-[76px] ${
              i ? "-ml-3 sm:-ml-4" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
