"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname(); const [open, setOpen] = useState(false);
  const links = [["Home", "/"], ["About Us", "/about"], ["Products", "/products"], ["Contact Us", "/contact"]];
  return <header className="site-header"><div className="container nav-wrap"><Link className="brand" href="/" aria-label="Imperial International Trade home"><Image className="brand-logo" src="/logo.jpeg" alt="" width={46} height={46} priority/><span className="brand-name">IMPERIAL INTERNATIONAL TRADE<small>PRIVATE LIMITED</small></span></Link><button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={pathname === href ? "active" : ""} onClick={() => setOpen(false)}>{label}{href === "/contact" && <span className="nav-arrow"><ArrowUpRight size={14}/></span>}</Link>)}</nav></div></header>;
}
export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-top"><div><Link className="brand footer-brand" href="/" aria-label="Imperial International Trade home"><Image className="brand-logo" src="/logo.jpeg" alt="" width={46} height={46}/><span className="brand-name">IMPERIAL INTERNATIONAL TRADE<small>PRIVATE LIMITED</small></span></Link><p>Connecting Indian products with global markets.</p></div><div className="footer-links"><strong>Explore</strong><Link href="/about">About Us</Link><Link href="/products">Products</Link><Link href="/contact">Contact Us</Link><Link href="/privacy-policy">Privacy Policy</Link></div><div className="footer-contact"><strong>Get in touch</strong><a href="mailto:connect@imperialinternationaltrade.com">connect@imperialinternationaltrade.com</a><a href="tel:+917861937335">+91 78619 37335</a><span>India · International trade</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Imperial International Trade Private Limited</span><span>India · International Trade</span></div></footer>;
}
