import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
