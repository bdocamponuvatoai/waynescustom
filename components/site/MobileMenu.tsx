"use client";

import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import logo from "@/public/assets/logo.svg";

type MenuService = { slug: string; name: string; number: string };

const primaryLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#questions", label: "Good to know" },
  { href: "/contact", label: "Contact" },
];

// Matches the longest exit animation in globals.css (.menu-panel[data-closing]).
const EXIT_MS = 320;

/**
 * Full-screen navigation built on a modal <dialog>: the browser provides the
 * focus trap, Escape handling and inert background; this adds scroll lock and
 * enter/exit motion.
 */
export default function MobileMenu({ services }: { services: MenuService[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function lockScroll(locked: boolean) {
    document.documentElement.classList.toggle("menu-open", locked);
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    window.clearTimeout(closeTimer.current);
    dialog.removeAttribute("data-closing");
    dialog.showModal();
    // Start keyboard users on the close button rather than the logo.
    dialog.querySelector<HTMLButtonElement>(".menu-bar .menu-trigger")?.focus();
    lockScroll(true);
    setOpen(true);
  }

  function closeMenu({ animate }: { animate: boolean }) {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    // Unlock synchronously so in-page hash navigation can scroll straight away.
    lockScroll(false);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reducedMotion) {
      dialog.close();
      return;
    }
    dialog.setAttribute("data-closing", "");
    closeTimer.current = window.setTimeout(() => dialog.close(), EXIT_MS);
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    closeMenu({ animate: true });
  }

  function handleClose() {
    dialogRef.current?.removeAttribute("data-closing");
    lockScroll(false);
    setOpen(false);
  }

  // Close if the route changes underneath the menu (e.g. browser back).
  useEffect(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [pathname]);

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimer.current);
      lockScroll(false);
    };
  }, []);

  const closeOnNavigate = () => closeMenu({ animate: false });

  return (
    <>
      <button
        type="button"
        className="menu-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={openMenu}
      >
        <span className="menu-trigger-label">Menu</span>
        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className="menu-panel"
        aria-label="Site menu"
        onCancel={handleCancel}
        onClose={handleClose}
      >
        <div className="menu-bar">
          <Link
            href="/"
            className="menu-logo"
            onClick={closeOnNavigate}
            aria-label="Wayne’s Customs home"
          >
            <Image src={logo} alt="" unoptimized />
          </Link>
          <button
            type="button"
            className="menu-trigger is-open"
            onClick={() => closeMenu({ animate: true })}
            aria-label="Close menu"
          >
            <span className="menu-trigger-label">Close</span>
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav className="menu-body" aria-label="Mobile navigation">
          <ol className="menu-primary">
            {primaryLinks.map((link, i) => (
              <li key={link.href} style={{ "--i": i } as CSSProperties}>
                <Link
                  href={link.href}
                  onClick={closeOnNavigate}
                  aria-current={link.href === pathname ? "page" : undefined}
                >
                  <span className="menu-index">0{i + 1}</span>
                  <span className="menu-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="menu-services" style={{ "--i": primaryLinks.length } as CSSProperties}>
            <p className="menu-heading">What we do</p>
            <ul>
              {services.map((service) => {
                const href = `/services/${service.slug}`;
                return (
                  <li key={service.slug}>
                    <Link
                      href={href}
                      onClick={closeOnNavigate}
                      aria-current={href === pathname ? "page" : undefined}
                    >
                      <span>{service.number}</span>
                      {service.name}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="menu-footer" style={{ "--i": primaryLinks.length + 1 } as CSSProperties}>
          <Link className="button" href="/contact" onClick={closeOnNavigate}>
            Plan your next move <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <p>Custom automotive · Vehicle care · Towing</p>
        </div>
      </dialog>
    </>
  );
}
