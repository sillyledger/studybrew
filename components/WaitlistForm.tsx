"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
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
        body: JSON.stringify({ email }),
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
      <p className="mt-8 font-mono text-[0.82rem] text-teal">
        Check your inbox to confirm your spot.
      </p>
    );
  }

  return (
    <div className="mt-8 w-full max-w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-full border border-line p-[5px]"
      >
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
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
          className="whitespace-nowrap rounded-full bg-teal px-5 py-2.5 font-mono text-[0.8rem] font-bold text-teal-ink hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Joining..." : "Join waitlist"}
        </button>
      </form>
      <p className="mt-3 font-mono text-[0.72rem] text-text-muted-2">
        No spam. One email, when notes are ready.
      </p>
      {status === "error" && (
        <p className="mt-2 font-mono text-[0.72rem] text-coral">{error}</p>
      )}
    </div>
  );
}
