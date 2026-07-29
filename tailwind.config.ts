import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6",
        primary: "#2F5233",
        accent: "#D97706",
        ink: "#1F2937",
      },
    },
  },
  plugins: [],
};

export default config;
