"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="mt-6 flex max-w-[420px] gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 rounded-[9px] border border-line bg-panel px-4 py-3.5 font-sans text-sm text-text-primary placeholder:text-text-muted-2"
      />
      <button
        type="button"
        // TODO: no waitlist backend yet — currently just holds the value in
        // local state. Wire this up to a real signup endpoint later.
        className="shrink-0 rounded-[9px] bg-teal px-5 py-3.5 font-mono text-[0.82rem] font-medium text-teal-ink"
      >
        Notify me
      </button>
    </div>
  );
}
