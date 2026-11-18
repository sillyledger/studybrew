import { PLATFORMS, type Show } from "@/lib/shows";

// The quiet "Also on" line near the bottom of a story page: YouTube, KKBOX and
// Castbox for the story's show (lib/shows.ts). Plain links that open in a new
// tab: no icons, embeds or anything else loaded from those sites. Pills with no
// link are left out; the page hides the line in mainland China.

const KEYS = ["youtubeUrl", "kkboxUrl", "castboxUrl"] as const;

export default function AlsoOn({ show }: { show: Show | undefined }) {
  const links = show
    ? KEYS.flatMap((key) => {
        const href = show[key];
        const p = PLATFORMS.find((x) => x.key === key)!;
        return href ? [{ href, label: p.label, ariaLabel: p.ariaLabel }] : [];
      })
    : [];
  if (!links.length) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[0.75rem] text-text-muted-2">Also on</span>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.ariaLabel} (opens in a new tab)`}
          className="inline-flex h-7 items-center rounded-full border border-line px-2.5 text-[0.75rem] font-medium text-text-muted transition-colors hover:border-line-strong hover:text-text-primary"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

/** The 小宇宙 link for one story: its own /episode/ link, else the show's,
    without the ?s= share parameter (it tags who shared the link). */
export function xiaoyuzhouLink(storyUrl: string | null | undefined, show: Show | undefined) {
  const href = withoutShareParam(storyUrl?.trim() || show?.xiaoyuzhouUrl);
  return href ? [{ label: "小宇宙", href }] : [];
}

function withoutShareParam(href: string | undefined): string | undefined {
  if (!href) return undefined;
  try {
    const url = new URL(href);
    url.searchParams.delete("s");
    return url.toString();
  } catch {
    return undefined; // not a valid URL: fall back to no link
  }
}
