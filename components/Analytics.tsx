"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_ID = "G-YJBP409ZS3";
const NO_ANALYTICS_PATH = "/stories/story-valley";

function isBlocked(pathname: string | null) {
  if (!pathname) return false;
  return pathname === NO_ANALYTICS_PATH || pathname.startsWith(`${NO_ANALYTICS_PATH}/`);
}

export default function Analytics() {
  const pathname = usePathname();
  const blocked = isBlocked(pathname);

  useEffect(() => {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = blocked;
  }, [blocked]);

  if (blocked) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YJBP409ZS3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJBP409ZS3', { allow_google_signals: false, allow_ad_personalization_signals: false });
          `}
      </Script>
    </>
  );
}
