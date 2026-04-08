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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navRowClass = [
    "flex w-full origin-top items-center justify-between border-b border-white/10 bg-black/30 bg-gradient-to-b from-black/40 to-black/10 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 ease-in-out",
    isScrolled ? "scale-[0.98] py-2" : "scale-100 py-4",
  ].join(" ");

  const navClusterClass = [
    "flex max-w-[min(100%,42rem)] flex-1 flex-wrap items-center justify-end gap-y-2 transition-all duration-300 ease-in-out",
    isScrolled ? "gap-x-3 sm:gap-x-4" : "gap-x-4 sm:gap-x-5",
  ].join(" ");

  const navLinksClass = [
    "flex flex-wrap items-center justify-end gap-y-1 transition-all duration-300 ease-in-out",
    isScrolled ? "gap-x-3" : "gap-x-4",
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
          className={`font-bold text-white drop-shadow-sm transition-all duration-300 ease-in-out hover:opacity-90 ${
            isScrolled ? "text-lg" : "text-xl"
          }`}
        >
          Clearpath HVAC
        </Link>
        <div className={navClusterClass}>
          <nav className={navLinksClass} aria-label="Primary">
            {defaultNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative inline-block text-sm font-medium text-white drop-shadow-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-400 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-white/95 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={scheduleHref}
            className="shrink-0 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white drop-shadow-sm transition-all duration-300 ease-in-out hover:bg-red-600"
          >
            Get Your Free Estimate
          </Link>
          <a
            href={phoneHref}
            className="shrink-0 text-sm font-semibold text-white drop-shadow-sm underline-offset-4 transition-colors duration-200 hover:text-white/95 hover:underline"
          >
            {phone}
          </a>
        </div>
      </div>
    </header>
  );
}
