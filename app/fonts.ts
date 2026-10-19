import localFont from "next/font/local";

export const display = localFont({
  src: "./fonts/waynes-display.otf",
  weight: "850",
  display: "swap",
  variable: "--font-display",
  fallback: ["Impact", "Arial Narrow", "Arial", "sans-serif"],
});
