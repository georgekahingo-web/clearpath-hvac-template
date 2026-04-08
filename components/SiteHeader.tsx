"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type SiteHeaderProps = {
  phone?: string;
  phoneHref?: string;
  scheduleHref?: string;
};

const defaultNav = [
  { label: "Heating", href: "#estimate-form" },
  { label: "Cooling", href: "#estimate-form" },
  { label: "Services", href: "#estimate-form" },
  { label: "About", href: "#about" },
] as const;

export default function SiteHeader({
  phone = "(770) 562-7698",
  phoneHref = "tel:+17705627698",
  scheduleHref = "#estimate-form",
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navRowClass = [
    "flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl transition-all duration-300",
    scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "",
  ].join(" ");

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-red-500 py-2 text-center text-sm text-white">
        <span className="text-yellow-400" aria-hidden>
          ★★★★★
        </span>{" "}
        5-Star HVAC Service
      </div>
      <div className={navRowClass}>
        <Link
          href="/"
          className="text-xl font-bold text-white transition-opacity duration-300 hover:opacity-90"
        >
          Clearpath HVAC
        </Link>
        <div className="flex max-w-[min(100%,42rem)] flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-5">
          <nav
            className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1"
            aria-label="Primary"
          >
            {defaultNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={scheduleHref}
            className="shrink-0 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
          >
            Get Your Free Estimate
          </Link>
          <a
            href={phoneHref}
            className="shrink-0 text-sm font-semibold text-white/70 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
          >
            {phone}
          </a>
        </div>
      </div>
    </header>
  );
}
