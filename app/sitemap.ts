import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...services.map((service) => ({ url: `${siteUrl}/services/${service.slug}`, priority: 0.8 })),
    { url: `${siteUrl}/contact`, priority: 0.6 },
  ];
}
