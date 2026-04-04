import Image from "next/image";
import Link from "next/link";

export type HeroProps = {
  /** Display label for the phone CTA */
  phone?: string;
  /** `tel:` href (digits/plus only after tel:) */
  phoneHref?: string;
  /** Primary CTA target — e.g. `#quote` to scroll to the form */
  quoteHref?: string;
  /** Shown in trust row */
  yearsExperience?: number;
};

const trustItems = (
  years: number
): { label: string; key: string }[] => [
  { key: "licensed", label: "Licensed & insured" },
  { key: "response", label: "Fast response" },
  { key: "experience", label: `${years}+ years experience` },
  { key: "availability", label: "24/7 emergency service" },
];

export default function Hero({
  phone = "(404) 555-1234",
  phoneHref = "tel:+14045551234",
  quoteHref = "#quote",
  yearsExperience = 15,
}: HeroProps) {
  const items = trustItems(yearsExperience);

  return (
    <section
      className="relative isolate flex min-h-[min(100svh,920px)] items-center overflow-hidden bg-slate-950"
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
      {/* Dark gradient for text contrast without hiding the photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/35 md:via-slate-950/65"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm md:text-sm">
          24/7 emergency HVAC • Same-day service available
        </p>

        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          When your comfort can&apos;t wait, we show up fast.
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
          Licensed technicians, honest pricing, and reliable repairs for your
          home—so you get heat and cooling you can count on, day or night.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={quoteHref}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-center text-base font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get Free Quote
          </Link>
          <a
            href={phoneHref}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-8 py-3 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Call Now · {phone}
          </a>
        </div>

        <ul className="mt-12 flex max-w-3xl flex-wrap gap-x-8 gap-y-3 text-sm text-white/85 md:text-base">
          {items.map((item) => (
            <li key={item.key} className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"
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
    </section>
  );
}
