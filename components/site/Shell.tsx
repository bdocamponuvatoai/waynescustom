import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import logo from "@/public/assets/logo.svg";
import MobileMenu from "./MobileMenu";
import { services } from "@/content/site";
import { navLinks } from "./nav-links";

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Wayne’s Customs Automotive and Towing home">
      <Image src={logo} alt="Wayne’s Customs" unoptimized />
      <span>AUTOMOTIVE & TOWING</span>
    </Link>
  );
}

export function Header() {
  return (
    <header>
      <Logo />
      <nav className="site-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="button nav-cta" href="/contact">
        Plan your next move <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
      <MobileMenu services={services.map(({ slug, name, number }) => ({ slug, name, number }))} />
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-call">
        <p className="eyebrow">THE NEXT CHAPTER STARTS HERE.</p>
        <Link href="/contact">
          LET’S TALK
          <br />
          <span>ABOUT YOUR RIDE.</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-bottom">
        <Logo />
        <p>
          CUSTOM AUTOMOTIVE.
          <br />
          VEHICLE CARE. TOWING.
        </p>
        <div>
          <Link href="/#services">Explore services ↗</Link>
          <Link href="/contact">Prepare a request ↗</Link>
        </div>
        <a href="#main">Back to top ↑</a>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} Wayne’s Customs Automotive and Towing</span>
        <span>Custom automotive · Vehicle care · Towing</span>
      </div>
    </footer>
  );
}
