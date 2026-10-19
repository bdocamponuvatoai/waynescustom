import type { StaticImageData } from "next/image";
import hero from "@/public/assets/hero.webp";
import tow from "@/public/assets/tow.webp";
import wheel from "@/public/assets/wheel.webp";
import workshop from "@/public/assets/workshop.webp";

// Static imports give next/image intrinsic sizes and blur placeholders at build time.
export const images = { hero, tow, wheel, workshop } satisfies Record<string, StaticImageData>;

export type ImageKey = keyof typeof images;
