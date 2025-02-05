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
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        slideDown: "slideDown 500ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 500ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
