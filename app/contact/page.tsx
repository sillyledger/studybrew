import Link from "next/link";
import Nav from "@/components/Nav";

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-black">Contact</h1>
        <p className="max-w-md text-text-muted">
          A contact form is coming soon. In the meantime, reach out at hello@studybrew.co.
        </p>
        <Link
          href="/"
          className="border-b border-teal-dim pb-0.5 font-mono text-sm text-teal"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
