"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STORY_VALLEY = "/stories/story-valley";

/** True on Story Valley pages, which must stay free of analytics. */
export function useOnStoryValley() {
  const pathname = usePathname();
  return pathname === STORY_VALLEY || (pathname?.startsWith(`${STORY_VALLEY}/`) ?? false);
}

/**
 * Site-wide link for the nav and footer. On Story Valley pages it renders a
 * plain <a>: no prefetching of pages that run analytics, and leaving Story
 * Valley is always a full page load. Everywhere else it is a normal next/link.
 */
export default function SiteLink({
  href,
  children,
  ...rest
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string }) {
  const plain = useOnStoryValley();
  if (plain) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
