import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Confirm your spot | Study Brew",
  robots: { index: false },
};

const CONTENT = {
  success: {
    heading: "You're confirmed.",
    body: "You're on the tutor waitlist. We'll email you when the tutor workspace is ready.",
    link: "Back to homepage",
  },
  invalid: {
    heading: "This link is invalid or has expired.",
    body: "Confirm links expire after 48 hours.",
    link: "Try again",
  },
} as const;

export default async function WaitlistConfirm({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const content = status === "success" ? CONTENT.success : CONTENT.invalid;

  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[640px] px-6 py-24 text-center">
        <div className="inline-flex rounded-full bg-teal-tint px-3 py-1.5 font-medium text-[0.7rem] text-teal">
          Waitlist
        </div>
        <h1 className="mt-6 text-[clamp(2.2rem,4vw,3.1rem)] font-bold leading-[1.02]">
          {content.heading}
        </h1>
        <p className="mt-5 text-[1.06rem] leading-[1.65] text-text-muted">
          {content.body}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block font-medium text-[0.82rem] text-teal hover:underline"
        >
          {content.link}
        </Link>
      </div>
    </main>
  );
}
