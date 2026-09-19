import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-03-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}`, lastModified: LAST_MODIFIED },
    { url: `${SITE.url}/work`, lastModified: LAST_MODIFIED },
    { url: `${SITE.url}/services`, lastModified: LAST_MODIFIED },
    { url: `${SITE.url}/lab`, lastModified: LAST_MODIFIED },
    { url: `${SITE.url}/about`, lastModified: LAST_MODIFIED },
  ];
}
