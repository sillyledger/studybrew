import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import "./globals.css";

// DM Sans (the app's typeface). Loaded as the variable font so the optical-
// size axis is available; the site only uses weights 400, 500, 600 and 700.
// --font-sans, --font-heading and --font-mono all point at it (globals.css).
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Study Brew",
  description: "English stories for B1-B2 learners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body
        className="flex min-h-screen flex-col overflow-x-clip"
      >
        <Analytics />
        {children}
        <Footer />
      </body>
    </html>
  );
}
