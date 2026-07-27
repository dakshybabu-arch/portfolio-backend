import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-protfolio-daksh.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
