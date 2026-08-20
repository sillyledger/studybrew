import type { Metadata } from "next";
import { Reddit_Sans, Reddit_Sans_Condensed, Reddit_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const redditSansCondensed = Reddit_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
});

const redditMono = Reddit_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
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
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col ${redditSans.variable} ${redditSansCondensed.variable} ${redditMono.variable}`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
