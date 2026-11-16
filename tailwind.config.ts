import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background-rgb) / <alpha-value>)",
        panel: "var(--color-panel)",
        "panel-2": "var(--color-panel-2)",
        "panel-hover": "var(--color-panel-hover)",
        line: "var(--color-border)",
        "line-strong": "var(--color-border-strong)",
        teal: "#5DCAA5",
        // Page accent: teal, or a show colour set with --accent on a parent
        // (Story Valley pages use #8FCB6E). Solid colour only, no /opacity.
        accent: "var(--accent, #5DCAA5)",
        "accent-tint": "color-mix(in srgb, var(--accent, #5DCAA5) 14%, transparent)",
        "teal-dim": "#2f6b53",
        "teal-tint": "rgba(93,202,165,0.14)",
        "teal-ink": "#06291d",
        blue: "#7CACDD",
        coral: "#F0997B",
        "coral-tint": "rgba(240,153,123,0.16)",
        yellow: "#F2C46B",
        purple: "#B9A3E8",
        cream: {
          DEFAULT: "#F2EBDD",
          ink: "#2a241c",
          muted: "#6b604f",
        },
        "line-soft": "var(--color-border-soft)",
        ink: "#1b1f24",
        text: {
          primary: "var(--color-text-primary)",
          muted: "var(--color-text-muted)",
          "muted-2": "var(--color-text-muted-2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
