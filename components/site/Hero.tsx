import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { images } from "@/content/images";
import ParallaxSection from "./ParallaxSection";

export default function Hero() {
  return (
    <ParallaxSection className="hero">
      <div className="hero-image">
        <Image
          src={images.hero}
          alt="Custom graphite muscle coupe in a dramatic dark studio, an illustrative 3D automotive rendering"
          sizes="100vw"
          placeholder="blur"
          preload
        />
      </div>
      <div className="hero-heading">
        <p className="eyebrow">
          <i aria-hidden="true" /> WAYNE’S CUSTOMS AUTOMOTIVE & TOWING
        </p>
        <h1>
          DRIVEN BY
          <br />
          <span>DETAIL.</span>
        </h1>
      </div>
      <div className="hero-bottom">
        <div>
          <p>
            For the ride you love.
            <br />
            And wherever it goes next.
          </p>
          <Link className="button" href="/#services">
            Find your direction <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <a className="hero-scroll" href="#services">
          <span>EXPLORE THE WAYNE’S WAY</span>
          <ArrowDown size={18} aria-hidden="true" />
        </a>
        <span className="hero-index">
          CUSTOM BUILT ATTITUDE.
          <br />
          ROAD READY THINKING.
        </span>
      </div>
      <span className="hero-side" aria-hidden="true">
        PRECISION / PURPOSE / PERSONALITY
      </span>
    </ParallaxSection>
  );
}
