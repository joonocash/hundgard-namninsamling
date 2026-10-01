import type { Config } from "tailwindcss";

// Colors point at CSS variables defined in app/globals.css, so the same class
// (e.g. `bg-surface`) works in both light and dark mode.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--c-bg)",
        surface: "var(--c-surface)",
        line: "var(--c-line)",
        ink: "var(--c-ink)",
        body: "var(--c-body)",
        muted: "var(--c-muted)",
        tint: "var(--c-tint)",
        "tint-ink": "var(--c-tint-ink)",
        brand: "var(--c-brand)",
        "brand-hover": "var(--c-brand-hover)",
        "brand-ink": "var(--c-brand-ink)",
        coral: "var(--c-coral)",
        bar: "var(--c-bar)",
        track: "var(--c-track)",
        glass: "var(--c-glass)",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      keyframes: {
        "handle-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        "handle-pulse": "handle-pulse 1.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
