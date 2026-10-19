import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/site/Shell";
import { allowIndexing, siteUrl } from "@/lib/site-config";
import { display } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wayne’s Customs | Automotive & Towing",
    template: "%s | Wayne’s Customs",
  },
  description:
    "Custom automotive ideas, vehicle care, and towing information. Explore Wayne’s Customs Automotive and Towing and prepare your next project.",
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Wayne’s Customs",
    title: "Wayne’s Customs — Driven by detail.",
    description: "For the ride you love. And wherever it goes next.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#151515",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
