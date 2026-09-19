import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://simplediff.com"; // Placeholder

  return [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/lab`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];
}
