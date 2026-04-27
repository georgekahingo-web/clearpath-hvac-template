 "use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { ReactNode } from "react";

export type HeroProps = {
  business?: string;
  city?: string;
  /** Display label for the phone CTA */
  phone?: string;
  /** `tel:` href (digits/plus only after tel:) */
  phoneHref?: string;
  /** In-page anchor for the lead form (e.g. `#estimate-form`) — reserved for future CTAs */
  quoteHref?: string;
  /** Shown in trust row */
  yearsExperience?: number;
  /** Region or city — reserved for localized copy */
  localArea?: string;
  /** When set (e.g. lead form), renders a two-column hero: copy left, children right */
  children?: ReactNode;
};

const trustItems = (
  years: number
): { label: string; key: string }[] => [
  { key: "licensed", label: "Licensed & insured" },
  { key: "response", label: "Fast local response" },
  { key: "experience", label: `${years}+ years in the field` },
];

function HeroContent({
  business,
  city,
  phone = "(404) 555-1234",
  phoneHref = "tel:+14045551234",
  yearsExperience = 15,
  children,
}: HeroProps) {
  const searchParams = useSearchParams();
  const businessName = business ?? searchParams.get("business") ?? "Clearpath HVAC";
  const cityName = city ?? searchParams.get("city") ?? "Atlanta";
  const items = trustItems(yearsExperience);
  const split = Boolean(children);

  return (
    <section
      className={
        split
          ? "relative isolate flex min-h-0 items-center overflow-hidden bg-slate-950 pb-28 md:pb-16"
          : "relative isolate flex min-h-[min(100svh,900px)] items-center overflow-hidden bg-slate-950"
      }
      aria-labelledby="hero-heading"
    >
      <Image
        src="/images/hero.jpg"
        alt="Residential heating and cooling service"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/50 to-black/20"
        aria-hidden
      />

      <div
        className={
          split
            ? "relative z-10 mx-auto w-full max-w-[min(100%,90rem)] px-6 py-24 lg:px-8"
            : "relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:py-28"
        }
      >
        {split ? (
          <div className="grid w-full items-center gap-8 md:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-4">
              <h1 id="hero-heading" className="text-balance">
                <span className="mb-2 block text-lg text-white/80">
                  HVAC Emergency?
                </span>
                <span className="block text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-tight">
                  Same-Day Service.
                </span>
              </h1>
              <div
                className="mt-4 mb-6 h-[2px] w-16 bg-blue-500"
                aria-hidden
              />
              <p className="max-w-md text-lg leading-relaxed text-white/80">
                Licensed & insured techs serving {cityName}. Clear pricing before
                work begins at {businessName}.
              </p>
              <a
                href={phoneHref}
                className="inline-flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4 text-center font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:from-blue-800 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:scale-100 md:w-auto md:min-w-[12rem]"
              >
                <span>Call Now</span>
                <span className="text-sm font-medium tabular-nums text-white/80">
                  {phone}
                </span>
              </a>
              <ul className="mt-1 flex flex-col gap-3.5 text-base leading-snug text-white/70">
                {items.map((item) => (
                  <li key={item.key} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300/95"
                      aria-hidden
                    >
                      <svg
                        className="h-2.5 w-2.5"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 w-full max-w-md justify-self-center pb-4 md:max-w-none md:justify-self-stretch md:pb-0">
              <div className="group/card h-full rounded-[1.125rem] bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-transparent p-px shadow-[0_28px_56px_-18px_rgba(0,0,0,0.62)] ring-1 ring-white/12 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_36px_64px_-16px_rgba(0,0,0,0.72)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_28px_56px_-18px_rgba(0,0,0,0.62)]">
                <div className="h-full rounded-[1.0625rem]">{children}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex max-w-2xl flex-col gap-4 md:max-w-3xl">
            <h1 id="hero-heading" className="text-balance">
              <span className="mb-2 block text-lg text-white/80">
                HVAC Emergency?
              </span>
              <span className="block text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-tight">
                Same-Day Service.
              </span>
            </h1>
            <div
              className="mt-4 mb-6 h-[2px] w-16 bg-blue-500"
              aria-hidden
            />
            <p className="max-w-md text-lg leading-relaxed text-white/80">
              Licensed & insured techs serving {cityName}. Clear pricing before
              work begins at {businessName}.
            </p>
            <a
              href={phoneHref}
              className="inline-flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4 text-center font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:from-blue-800 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:scale-100 sm:w-auto sm:min-w-[14rem]"
            >
              <span>Call Now</span>
              <span className="text-sm font-medium tabular-nums text-white/80">
                {phone}
              </span>
            </a>
            <ul className="mt-2 flex flex-col gap-3.5 text-base leading-snug text-white/70">
              {items.map((item) => (
                <li key={item.key} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300/95"
                    aria-hidden
                  >
                    <svg
                      className="h-2.5 w-2.5"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Hero(props: HeroProps) {
  return (
    <Suspense fallback={null}>
      <HeroContent {...props} />
    </Suspense>
  );
}
