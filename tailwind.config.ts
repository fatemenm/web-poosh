import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        persian: ["var(--font-vazirmatn)"],
        english: ["var(--font-roboto)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        custom: "var(--color-selector-bg-color)",
      },
      cursor: {
        zoomIn: "url('/zoom-in.png'), auto",
      },
    },
  },
  plugins: [],
};
export default config;
