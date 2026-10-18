import type { MetadataRoute } from "next";
const base = "https://imperialinternationaltrade.com";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/about", "/products", "/products/butyl-reclaimed-rubber", "/products/cotton-yarn", "/contact", "/privacy-policy"].map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "monthly", priority: route === "" ? 1 : route.startsWith("/products/") ? .8 : .7 })); }
