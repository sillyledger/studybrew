"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  /** Which list to join. "tutor" goes to the tutor waitlist audience. */
  list?: "waitlist" | "tutor";
  /** "light" matches the site's light buttons; default is the teal pill. */
  tone?: "teal" | "light";
  submitLabel?: string;
  /** Small line under the form; null hides it. */
  note?: string | null;
  className?: string;
};

export default function WaitlistForm({
  list = "waitlist",
  tone = "teal",
  submitLabel = "Join waitlist",
  note = "No spam. One email, when notes are ready.",
  className = "mt-8 w-full max-w-[400px]",
}: Props = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list === "tutor" ? { email, list } : { email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join waitlist");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={`${className} font-medium text-[0.82rem] text-teal`}>
        Check your inbox to confirm your spot.
      </p>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`flex rounded-full border p-[5px] ${tone === "light" ? "border-line-strong" : "border-line"}`}
      >
        <label htmlFor={`${list}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${list}-email`}
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 border-none bg-transparent px-4 py-2.5 font-sans text-[0.88rem] text-text-primary outline-none placeholder:text-text-muted"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[0.8rem] font-bold hover:opacity-90 disabled:opacity-60 ${
            tone === "light" ? "bg-text-primary text-background" : "bg-teal text-teal-ink"
          }`}
        >
          {status === "loading" ? "Joining..." : submitLabel}
        </button>
      </form>
      {note && (
        <p className="mt-3 font-medium text-[0.72rem] text-text-muted-2">{note}</p>
      )}
      {status === "error" && (
        <p className="mt-2 font-medium text-[0.72rem] text-coral">{error}</p>
      )}
    </div>
  );
}
