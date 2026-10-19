import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import JsonLd from "@/components/site/JsonLd";
import { images } from "@/content/images";
import { getService, services } from "@/content/site";
import { siteUrl } from "@/lib/site-config";

// Only the slugs below exist; anything else is a static 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    // Setting openGraph here replaces the root's, so the shared image is restated.
    openGraph: {
      title: `${service.name} — Wayne’s Customs`,
      description: service.description,
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/#services` },
      { "@type": "ListItem", position: 3, name: service.name },
    ],
  };

  return (
    <main id="main">
      <section className="service-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/#services">Services</Link> /{" "}
          <span aria-current="page">{service.name}</span>
        </nav>
        <div className="service-title">
          <p className="eyebrow">{service.tag}</p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <Link className="button" href="/contact">
            Prepare your request <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Image
          src={images[service.image]}
          alt={service.alt}
          sizes="(max-width: 760px) 90vw, 50vw"
          placeholder="blur"
          preload
        />
      </section>

      <section className="section service-detail">
        <div>
          <p className="eyebrow">START WITH THE DETAILS.</p>
          <h2>
            GOOD PLANS
            <br />
            START <em>HERE.</em>
          </h2>
          <ul>
            {service.topics.map((topic) => (
              <li key={topic}>
                <Check size={18} aria-hidden="true" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="service-body">{service.body}</p>
          <details open>
            <summary>
              <h3>{service.question}</h3>
              <b aria-hidden="true">+</b>
            </summary>
            <p>{service.answer}</p>
          </details>
          <p className="availability">
            Scope, availability, and pricing are agreed directly with Wayne’s before any work
            begins.
          </p>
        </div>
      </section>

      <section className="section related">
        <p className="eyebrow">ANOTHER DIRECTION?</p>
        {services
          .filter((other) => other.slug !== service.slug)
          .map((other) => (
            <Link href={`/services/${other.slug}`} key={other.slug}>
              {other.name}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
      </section>
      <JsonLd data={breadcrumbSchema} />
    </main>
  );
}
