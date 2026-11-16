"use client";

import { useEffect, useRef, useState } from "react";

// "Listen to this story" on /stories/[slug]: ▶ Play here (our own player for
// the story's audio file), Spotify and Apple. The Spotify and Apple iframes
// are only rendered after their tab is clicked, so nothing from Spotify or
// Apple loads on a page view. The audio file isn't fetched either until play
// is pressed (preload="none"). The page leaves out the Spotify/Apple URLs in
// mainland China, so only Play here shows there.
//
// Story Valley passes no embeds, only `links`: plain outline pills that open
// the platform in a new tab (no iframes, nothing loads from them on the page).

type Tab = "here" | "spotify" | "apple";

// The players never open a new tab: the iframes are sandboxed without pop-ups.
const EMBED_SANDBOX = "allow-scripts allow-same-origin allow-presentation allow-forms";
const SPEEDS = [0.75, 1, 1.25] as const;

function time(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function ListenBox({
  title,
  audioUrl,
  spotifyEmbed,
  appleEmbed,
  links = [],
}: {
  title: string;
  audioUrl: string | null;
  spotifyEmbed: string | null;
  appleEmbed: string | null;
  /** Platforms as plain links that open in a new tab. */
  links?: { label: string; href: string }[];
}) {
  const tabs: { value: Tab; label: string }[] = [
    ...(audioUrl ? [{ value: "here" as const, label: "▶ Play here" }] : []),
    ...(spotifyEmbed ? [{ value: "spotify" as const, label: "Spotify" }] : []),
    ...(appleEmbed ? [{ value: "apple" as const, label: "Apple" }] : []),
  ];
  // Only Play here can be selected on load: an embed waits for its click.
  const [selected, setSelected] = useState<Tab | null>(audioUrl ? "here" : null);
  if (!tabs.length && !links.length) return null;

  return (
    <section aria-labelledby="listen" className="mt-8 rounded-[20px] bg-panel p-5 sm:p-6">
      <h2 id="listen" className="text-[1rem] font-bold tracking-[-0.02em]">
        Listen to this story
      </h2>
      <div role="group" aria-label="Where to listen" className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const on = selected === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(tab.value)}
              className={`inline-flex h-9 items-center rounded-full px-3.5 text-[0.8rem] sm:px-4 sm:text-[0.84rem] font-semibold transition-colors ${
                on ? "bg-accent text-teal-ink" : "border border-line-strong text-text-primary hover:bg-panel-hover"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1 rounded-full border border-line-strong px-3.5 text-[0.8rem] font-semibold text-text-primary transition-colors hover:bg-panel-hover sm:px-4 sm:text-[0.84rem]"
          >
            {link.label}
            <span aria-hidden="true" className="text-[0.75em] text-text-muted">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
      {selected === null && tabs.length > 0 && (
        <p className="mt-3.5 text-[0.85rem] text-text-muted">Choose where to listen.</p>
      )}
      {/* One player at a time: switching unmounts the other one. */}
      {selected !== null && (
        <div className="mt-4">
          {selected === "here" && audioUrl && <Player src={audioUrl} title={title} />}
          {selected === "spotify" && spotifyEmbed && (
            <iframe
              title={`${title} on Spotify`}
              src={spotifyEmbed}
              height={152}
              sandbox={EMBED_SANDBOX}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="block h-[152px] w-full max-w-full overflow-hidden rounded-[12px] border-0"
            />
          )}
          {selected === "apple" && appleEmbed && (
            <iframe
              title={`${title} on Apple Podcasts`}
              src={appleEmbed}
              height={175}
              sandbox={EMBED_SANDBOX}
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              className="block h-[175px] w-full max-w-full overflow-hidden rounded-[12px] border-0 bg-transparent"
            />
          )}
        </div>
      )}
    </section>
  );
}

const roundButton =
  "grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.72rem] sm:h-10 sm:w-10 font-semibold text-text-muted hover:bg-panel-hover hover:text-text-primary";

function Player({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.defaultPlaybackRate = speed;
    audio.playbackRate = speed;
  }, [speed]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setFailed(false);
      if (audio.readyState < 2) setLoading(true);
      audio.play().catch((error: unknown) => {
        setLoading(false);
        const name = error instanceof DOMException ? error.name : "";
        if (name !== "NotAllowedError" && name !== "AbortError") setFailed(true);
      });
    } else {
      audio.pause();
    }
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds));
  }

  const status = failed ? "This audio can't play right now." : loading ? "Loading audio…" : title;

  return (
    <div role="region" aria-label="Story player" className="rounded-[14px] border border-line bg-panel-2 px-3 py-2.5">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPlaying={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          e.currentTarget.playbackRate = speed;
        }}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onError={() => {
          setLoading(false);
          setFailed(true);
        }}
      />
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:flex-nowrap sm:gap-x-2.5">
        <button type="button" onClick={() => skip(-10)} aria-label="Back 10 seconds" className={roundButton}>
          −10
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          aria-busy={loading}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-teal-ink hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 4.8v14.4L19.5 12z" />}
          </svg>
        </button>
        <button type="button" onClick={() => skip(10)} aria-label="Forward 10 seconds" className={roundButton}>
          +10
        </button>

        <div className="order-last flex min-w-0 basis-full flex-col gap-0.5 sm:order-none sm:basis-auto sm:flex-1">
          <span className="truncate text-[0.8rem] font-semibold">{status}</span>
          <div className="flex items-center gap-2 text-[0.72rem] tabular-nums text-text-muted">
            <span>{time(current)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(e) => {
                if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
              }}
              aria-label="Progress"
              aria-valuetext={`${time(current)} of ${time(duration)}`}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-[var(--accent,#5DCAA5)]"
            />
            <span>{time(duration)}</span>
          </div>
        </div>

        <div role="group" aria-label="Speed" className="ml-auto inline-flex shrink-0 rounded-[10px] border border-line bg-panel p-[3px] sm:ml-0">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={speed === s}
              onClick={() => setSpeed(s)}
              className="h-7 rounded-[7px] px-1.5 text-[0.72rem] sm:px-2 sm:text-[0.74rem] tabular-nums text-text-muted hover:text-text-primary aria-pressed:bg-panel-hover aria-pressed:font-semibold aria-pressed:text-text-primary"
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
