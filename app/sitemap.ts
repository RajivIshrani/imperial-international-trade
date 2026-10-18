import type { MetadataRoute } from "next";

const baseUrl = "https://imperialinternationaltrade.com";

const publicRoutes = [
  "/",
  "/about",
  "/products",
  "/products/butyl-reclaimed-rubber",
  "/products/cotton-yarn",
  "/contact",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
  }));
}
