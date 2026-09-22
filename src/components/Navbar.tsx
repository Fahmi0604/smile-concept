"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NavLinkItem = { label: string; href: string; icon?: boolean };

const NAV_LINKS: NavLinkItem[] = [
  { label: "Treatments", href: "/treatments" },
  { label: "Our Dentists", href: "/doctors" },
  { label: "Promo", href: "/promo", icon: true },
  { label: "Blog", href: "/blog" },
];

export default function Navbar({ settings }: { settings: Setting }) {
  const [open, setOpen] = useState(false);
  const bookHref = settings?.link_whatsapp || "https://wa.me/";

  return (
    <header
      className="fixed top-4 left-1/2 z-50 w-[min(calc(100%-24px),1280px)] -translate-x-1/2 md:top-6"
      data-menu-open={open}
      role="banner"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "flex items-center justify-between gap-4 md:gap-8",
          "rounded-full border border-white/60 bg-white/[0.78]",
          "py-[10px] pl-5 pr-3 md:py-3 md:pl-7 md:pr-4",
          "backdrop-blur-[14px] backdrop-saturate-[1.4]",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.6),0_12px_32px_-16px_rgba(21,56,79,0.25)]"
        )}
      >
        <Link href="/" aria-label="Smile Concept — home" className="inline-flex shrink-0 items-center">
          <Image
            src="/assets/smile-concept/Logo1.webp"
            alt="Smile Concept Dental Clinic"
            width={160}
            height={40}
            className="block h-8 w-auto md:h-10"
            priority
          />
        </Link>

        <ul className="hidden list-none items-center gap-7 p-0 m-0 min-[900px]:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink href={link.href} icon={link.icon}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary button-small hidden min-[560px]:inline-flex"
            data-cta="nav-whatsapp"
          >
            Book Now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-nav-mobile"
            className={cn(
              "inline-flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px]",
              "rounded-full border-0 bg-transparent text-ink transition-colors duration-150",
              "hover:bg-ink/5 min-[900px]:hidden"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-[2px] w-[22px] rounded-sm bg-current transition-transform duration-200",
                open && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "block h-[2px] w-[22px] rounded-sm bg-current transition-opacity duration-200",
                open && "opacity-0"
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "block h-[2px] w-[22px] rounded-sm bg-current transition-transform duration-200",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="site-nav-mobile"
          className={cn(
            "mt-3 rounded-3xl border border-white/60 bg-white/[0.92] p-4",
            "backdrop-blur-[14px] backdrop-saturate-[1.4]",
            "[box-shadow:0_18px_48px_-20px_rgba(21,56,79,0.3)]",
            "min-[900px]:hidden"
          )}
        >
          <ul className="m-0 mb-3 flex list-none flex-col gap-1 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-3.5 py-3 font-body text-[18px] leading-[1.4] tracking-[0.02em] text-ink",
                    "transition-colors duration-150 hover:bg-emphasize/60",
                    link.icon && "inline-flex items-center gap-1.5"
                  )}
                >
                  {link.icon && (
                    <Image
                      src="/assets/smile-concept/Discount.webp"
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden="true"
                      className="block h-5 w-5 shrink-0"
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary button-small w-full"
            data-cta="nav-mobile-whatsapp"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative px-0.5 py-1.5 font-body text-[18px] leading-[1.4] tracking-[0.02em] text-ink no-underline",
        "transition-colors duration-200 hover:text-[#0f2a3d]",
        "after:absolute after:bottom-0 after:left-[2px] after:right-[2px] after:h-[2px]",
        "after:origin-center after:scale-x-0 after:bg-ink after:transition-transform after:duration-200",
        "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        icon && "inline-flex items-center gap-1.5"
      )}
    >
      {icon && (
        <Image
          src="/assets/smile-concept/Discount.webp"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
          className="block h-5 w-5 shrink-0"
        />
      )}
      {children}
    </Link>
  );
}
