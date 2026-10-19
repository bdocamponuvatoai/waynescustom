import type { Metadata } from "next";
import Image from "next/image";
import Planner from "@/components/site/Planner";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "Plan your next move",
  description:
    "Prepare a clear summary of your vehicle project or towing needs before you talk to Wayne’s Customs.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" className="section contact-page">
      <div className="contact-intro">
        <p className="eyebrow">MAKE THE FIRST CONVERSATION COUNT.</p>
        <h1>
          WHAT’S
          <br />
          YOUR NEXT
          <br />
          <em>MOVE?</em>
        </h1>
        <p>Get the details together. Save your notes. Be ready to talk about your vehicle.</p>
        <Image
          src={images.wheel}
          alt="Illustrative custom wheel and graphite bodywork"
          sizes="(max-width: 760px) 90vw, 45vw"
          placeholder="blur"
        />
        <div className="contact-status">
          <span>BEFORE YOU REACH OUT</span>
          <p>
            The planner organises your details into a summary you can copy or download. It does not
            book appointments or dispatch a tow truck.
          </p>
        </div>
      </div>
      <Planner />
    </main>
  );
}
