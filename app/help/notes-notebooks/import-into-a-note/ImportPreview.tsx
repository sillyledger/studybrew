"use client";

import { useState } from "react";

// Same look as the import demo in components/FeatureShowcase.tsx.
const MINI_BUTTON = "rounded-lg bg-teal px-3 py-1.5 text-[0.72rem] font-bold text-teal-ink";
const MINI_OUTLINE =
  "rounded-lg border border-line-strong px-3 py-1.5 text-[0.72rem] font-semibold text-text-primary transition-colors hover:bg-panel-hover";
const PILL = "shrink-0 rounded-md border border-line-strong px-1.5 py-0.5 text-[0.6rem] font-bold tracking-[0.08em]";

const TABS = [
  { id: "link", label: "Paste a link", box: "news-site.com/why-we-sleep", hint: "Web page" },
  { id: "file", label: "Upload a file", box: "Drop a .docx, .txt or PDF here", hint: "PDF · Word · text" },
  { id: "text", label: "Paste text", box: "Paste or type your text…", hint: "Any length" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ImportPreview() {
  const [tab, setTab] = useState<TabId>("link");
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="my-8 rounded-[16px] border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.12em]">
        <span className="text-text-muted-2">Preview</span>
        <span className="text-teal">Where it happens</span>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-line-strong bg-panel-2">
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 text-[0.68rem] text-text-muted-2">
          <b className="font-semibold text-text-muted">Import into a note</b>
          <span className={PILL}>NEW</span>
        </div>

        <div role="tablist" aria-label="Import type" className="flex flex-wrap gap-1.5 px-3 pt-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === tab}
              onClick={() => setTab(t.id)}
              className={t.id === tab ? MINI_BUTTON : MINI_OUTLINE}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mx-3 mt-3 rounded-lg border border-line-strong px-3 py-2.5 text-[0.76rem] text-text-muted">
          {current.box}
        </div>

        <div className="mx-3 mb-3 mt-3 flex items-center justify-between gap-3">
          <small className="text-[0.67rem] text-text-muted-2">{current.hint}</small>
          <span aria-hidden="true" className={MINI_BUTTON}>
            Import →
          </span>
        </div>
      </div>
    </div>
  );
}
