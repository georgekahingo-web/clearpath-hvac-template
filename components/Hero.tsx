import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type HeroProps = {
  /** Display label for the phone CTA */
  phone?: string;
  /** `tel:` href (digits/plus only after tel:) */
  phoneHref?: string;
  /** Primary CTA target — e.g. `#quote` to scroll to the form */
  quoteHref?: string;
  /** Shown in trust row */
  yearsExperience?: number;
  /** Region or city named in the short “about” line (split layout) */
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
  { key: "availability", label: "24/7 emergency line" },
];

export default function Hero({
  phone = "(404) 555-1234",
  phoneHref = "tel:+14045551234",
  quoteHref = "#quote",
  yearsExperience = 15,
  localArea = "Atlanta",
  children,
}: HeroProps) {
  const items = trustItems(yearsExperience);
  const split = Boolean(children);

  return (
    <section
      className={
        split
          ? "relative isolate flex min-h-0 items-center overflow-hidden bg-slate-950 py-12 sm:py-14 lg:py-8"
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
      {/* Base readability: darken image edges and anchor copy side */}
      <div
        className={
          split
            ? "pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/[0.82] via-slate-950/58 to-slate-950/18 md:via-slate-950/52 lg:to-slate-950/14"
            : "pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/[0.97] via-slate-950/80 to-slate-950/45 md:via-slate-950/72"
        }
        aria-hidden
      />
      <div
        className={
          split
            ? "pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/38 via-transparent to-slate-950/[0.78]"
            : "pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/[0.92]"
        }
        aria-hidden
      />
      {/* Soft vignette — lighter when split so photo/subject stay visible */}
      <div
        className={
          split
            ? "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_125%_85%_at_55%_42%,transparent_35%,rgb(15_23_42/0.5)_100%)]"
            : "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_45%,transparent_0%,rgb(15_23_42/0.88)_100%)]"
        }
        aria-hidden
      />

      <div
        className={
          split
            ? "relative z-10 mx-auto w-full max-w-[min(100%,90rem)] px-5 py-2 sm:px-6 lg:flex lg:items-center lg:px-8 lg:py-4"
            : "relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:py-32"
        }
      >
        {split ? (
          <div className="flex w-full flex-col gap-6 lg:gap-0">
            {/* Top: headline + CTAs only; right column empty on lg so the photo reads */}
            <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-start lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
              <div className="flex min-w-0 flex-col gap-3 lg:max-w-lg lg:gap-2.5 xl:max-w-xl">
                <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:px-3.5 sm:py-1.5 sm:text-[11px] md:text-xs">
                  Same-day service · 24/7 emergencies
                </p>

                <h1
                  id="hero-heading"
                  className="text-balance text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.625rem] lg:leading-[1.08] xl:text-[2.875rem]"
                >
                  <span className="block">HVAC down? Same-day service.</span>
                  <span className="mt-2 block text-[1.05rem] font-medium leading-snug tracking-tight text-white/88 sm:text-xl sm:leading-snug lg:mt-2.5 lg:text-[1.35rem] lg:leading-snug">
                    Licensed, insured techs—clear pricing before work begins.
                  </span>
                </h1>

                <p className="max-w-md text-sm leading-snug text-white/78 lg:max-w-lg lg:text-[0.9375rem]">
                  Tell us what&apos;s wrong. We prioritize your call, plain-English
                  options, and upfront quotes.
                </p>

                <div className="flex flex-col gap-2 pt-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
                  <Link
                    href={quoteHref}
                    className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-xl bg-blue-600 px-8 text-center text-base font-semibold text-white shadow-[0_16px_48px_-10px_rgba(37,99,235,0.65)] ring-1 ring-white/15 transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-blue-500 hover:shadow-[0_22px_56px_-12px_rgba(37,99,235,0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99] motion-reduce:hover:scale-100 sm:flex-none sm:min-w-[14rem] lg:min-h-14"
                  >
                    Get my free estimate
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2.5 text-center text-sm font-medium text-white/78 transition-all duration-200 ease-out hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.07] hover:text-white/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 motion-reduce:hover:scale-100 sm:flex-none sm:min-h-[3.25rem] sm:justify-center sm:px-5 lg:px-6"
                  >
                    <span className="max-w-[14rem] text-[0.7rem] font-medium leading-snug text-white/85 sm:text-[0.75rem]">
                      Call Now — Speak to a Technician in Minutes
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-white/90">
                      {phone}
                    </span>
                  </a>
                </div>

                <p className="mt-2 text-[0.7rem] leading-snug tracking-wide text-white/65 sm:text-[0.75rem]">
                  No obligation • Free estimate • Same-day service
                </p>
                <p className="text-xs leading-snug text-white/55 sm:text-[0.8125rem]">
                  We can be at your home as soon as today
                </p>

                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.8125rem] leading-snug text-white/72 sm:mt-2.5">
                  <span className="sr-only">5 out of 5 stars.</span>
                  <span className="text-amber-300/90" aria-hidden>
                    ★★★★★
                  </span>
                  <span className="font-medium tracking-tight text-white/88">
                    Rated 5 stars by {localArea} homeowners
                  </span>
                </p>
              </div>

              <div
                className="hidden min-h-0 lg:block"
                aria-hidden="true"
              />
            </div>

            {/* Divider aligns with top of form; trust + form share one grid row on lg */}
            <div className="mt-1 grid grid-cols-1 gap-5 border-t border-white/10 pt-3 sm:gap-5 lg:mt-0 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-start lg:gap-x-8 lg:gap-y-0 lg:pt-3 xl:gap-x-10">
              <div className="flex min-w-0 flex-col gap-3">
                <ul className="flex min-w-0 flex-wrap gap-x-4 gap-y-1.5 text-[0.8125rem] text-white/80 md:gap-x-5 md:text-sm">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-center gap-1.5">
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300/95"
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
                <p className="max-w-md text-[0.8125rem] leading-snug text-white/58 sm:text-[0.8125rem]">
                  <span className="block text-white/72">
                    Trusted by homeowners across {localArea} for fast, reliable
                    HVAC service.
                  </span>
                  <span className="mt-1 block text-white/50">
                    {yearsExperience}+ years local · licensed, insured
                  </span>
                </p>
              </div>

              <div className="min-w-0 w-full max-w-md justify-self-center lg:max-w-none lg:w-full lg:justify-self-stretch lg:self-start">
                <div className="group/card h-full rounded-[1.125rem] bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-transparent p-px shadow-[0_28px_56px_-18px_rgba(0,0,0,0.62)] ring-1 ring-white/12 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_36px_64px_-16px_rgba(0,0,0,0.72)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_28px_56px_-18px_rgba(0,0,0,0.62)]">
                  <div className="h-full rounded-[1.0625rem]">{children}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex max-w-2xl flex-col gap-5 md:max-w-3xl md:gap-6">
            <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-[11px] md:text-xs">
              Same-day service · 24/7 emergencies
            </p>

            <h1
              id="hero-heading"
              className="text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl md:leading-[1.08] lg:text-[3.15rem] lg:leading-[1.06]"
            >
              <span className="block">HVAC down? Same-day service.</span>
              <span className="mt-3 block text-[1.2rem] font-medium leading-snug text-white/88 sm:text-2xl md:mt-4 md:text-[1.65rem] md:leading-snug lg:text-[1.75rem]">
                Licensed, insured techs—clear pricing before work begins.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-white/72 md:text-[1.0625rem] md:leading-relaxed">
              Tell us what&apos;s wrong. We&apos;ll prioritize your call, explain
              options in plain English, and quote upfront.
            </p>

            <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
              <Link
                href={quoteHref}
                className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-xl bg-blue-600 px-8 text-center text-base font-semibold text-white shadow-[0_16px_48px_-10px_rgba(37,99,235,0.65)] ring-1 ring-white/15 transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-blue-500 hover:shadow-[0_22px_56px_-12px_rgba(37,99,235,0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99] motion-reduce:hover:scale-100 sm:flex-none sm:min-w-[14rem] md:min-h-14"
              >
                Get my free estimate
              </Link>
              <a
                href={phoneHref}
                className="inline-flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2.5 text-center text-sm font-medium text-white/78 backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.07] hover:text-white/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 motion-reduce:hover:scale-100 sm:flex-none sm:px-6 md:min-h-[3.25rem]"
              >
                <span className="max-w-[16rem] text-[0.7rem] font-medium leading-snug text-white/85 sm:text-[0.75rem]">
                  Call Now — Speak to a Technician in Minutes
                </span>
                <span className="text-sm font-semibold tabular-nums text-white/90">
                  {phone}
                </span>
              </a>
            </div>

            <p className="mt-1 text-[0.7rem] leading-snug tracking-wide text-white/65 sm:text-[0.75rem]">
              No obligation • Free estimate • Same-day service
            </p>
            <p className="text-xs leading-snug text-white/55 sm:text-[0.8125rem]">
              We can be at your home as soon as today
            </p>

            <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.8125rem] leading-snug text-white/72 sm:mt-2.5">
              <span className="sr-only">5 out of 5 stars.</span>
              <span className="text-amber-300/90" aria-hidden>
                ★★★★★
              </span>
              <span className="font-medium tracking-tight text-white/88">
                Rated 5 stars by {localArea} homeowners
              </span>
            </p>

            <div className="border-t border-white/10 pt-6 md:pt-7">
              <ul className="flex max-w-2xl flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/75 md:gap-x-8 md:text-[0.9375rem]">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center gap-2">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300/95"
                      aria-hidden
                    >
                      <svg
                        className="h-3 w-3"
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
          </div>
        )}
      </div>
    </section>
  );
}
