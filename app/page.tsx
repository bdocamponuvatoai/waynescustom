import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/site/Hero";
import JsonLd from "@/components/site/JsonLd";
import { images } from "@/content/images";
import { services, faqs, steps } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <div className="discipline-strip">
        <span>
          CUSTOM AUTOMOTIVE <i aria-hidden="true">✳</i>
        </span>
        <span>
          VEHICLE CARE <i aria-hidden="true">✳</i>
        </span>
        <span>
          TOWING <i aria-hidden="true">✳</i>
        </span>
        <span>ONE WAY FORWARD.</span>
      </div>

      <section className="services section" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / FIND YOUR DIRECTION</p>
            <h2>
              YOUR RIDE.
              <br />
              YOUR NEXT <em>MOVE.</em>
            </h2>
          </div>
          <p>
            A vision for your vehicle. A concern under the hood. A move from here to there. Start
            with what you need.
          </p>
        </div>
        <div className="service-cards">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug} className="service-card">
              <div className="card-photo">
                <Image
                  src={images[service.image]}
                  alt={service.alt}
                  sizes="(max-width: 760px) 90vw, 30vw"
                  placeholder="blur"
                />
                <span className="card-index">{service.number}</span>
                <span className="card-arrow" aria-hidden="true">
                  <ArrowUpRight size={24} />
                </span>
              </div>
              <div className="card-copy">
                <p>{service.name}</p>
                <h3>{service.title}</h3>
                <span>{service.intro}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="workshop section" id="approach">
        <div className="workshop-copy">
          <p className="eyebrow">02 / THE WAYNE’S MINDSET</p>
          <h2>
            LOOK CLOSER.
            <br />
            THAT’S WHERE
            <br />
            <em>IT STARTS.</em>
          </h2>
          <p>
            The stance. The finish. The way it feels behind the wheel. Every good vehicle
            conversation starts with paying attention.
          </p>
          <p>
            Bring your ideas, your questions, and the details that matter. Build the plan around the
            vehicle—and the person driving it.
          </p>
          <Link href="/contact" className="text-link">
            Put your ideas in motion <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <figure>
          <Image
            src={images.workshop}
            alt="Illustrative mechanic examining a classic car engine in a carefully organized workshop"
            sizes="(max-width: 760px) 90vw, 50vw"
            placeholder="blur"
          />
          <figcaption>
            <span>CRAFT IS IN THE DETAILS.</span>
            <span>WAYNE’S / AUTOMOTIVE</span>
          </figcaption>
          <div className="image-stamp" aria-hidden="true">
            W<span>CUSTOMS</span>
          </div>
        </figure>
      </section>

      <section className="towing-feature">
        <Image
          src={images.tow}
          alt="Illustrative flatbed towing truck carrying a graphite coupe"
          sizes="100vw"
          placeholder="blur"
        />
        <div className="towing-panel">
          <p className="eyebrow">03 / A CLEAR WAY FORWARD</p>
          <h2>
            THE JOURNEY
            <br />
            DOESN’T
            <br />
            <em>END HERE.</em>
          </h2>
          <p>
            When your vehicle needs a move, start with a plan. Know what details to prepare for a
            towing conversation.
          </p>
          <Link className="button" href="/services/towing">
            Explore towing <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="process section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / FROM IDEA TO NEXT STEP</p>
            <h2>
              LESS GUESSWORK.
              <br />
              MORE <em>DIRECTION.</em>
            </h2>
          </div>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-banner">
        <div>
          <p className="eyebrow">PERSONALITY, DOWN TO THE LAST DETAIL.</p>
          <h2>
            NOT JUST A CAR.
            <br />
            <em>YOUR CAR.</em>
          </h2>
          <Link className="text-link" href="/services/customs">
            Explore custom automotive <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Image
          src={images.wheel}
          alt="Illustrative machined wheel and custom graphite bodywork detail"
          sizes="(max-width: 760px) 100vw, 50vw"
          placeholder="blur"
        />
      </section>

      <section className="faq section" id="questions">
        <div>
          <p className="eyebrow">05 / GOOD TO KNOW</p>
          <h2>
            STRAIGHT
            <br />
            <em>ANSWERS.</em>
          </h2>
          <p>No guesswork about what comes next.</p>
        </div>
        <div>
          {faqs.map(([question, answer], i) => (
            <details key={question}>
              <summary>
                <span>0{i + 1}</span>
                <h3>{question}</h3>
                <b aria-hidden="true">+</b>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="image-note">
        Images are illustrative and do not show specific customer vehicles, facilities, or completed
        work.
      </p>
      <JsonLd data={faqSchema} />
    </main>
  );
}
