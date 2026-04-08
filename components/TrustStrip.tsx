const PLACEHOLDER_LOGOS = ["Google", "Yelp", "BBB", "HomeAdvisor"] as const;

export default function TrustStrip() {
  return (
    <section
      className="border-y border-slate-200/80 bg-slate-50/80 py-10 sm:py-12"
      aria-labelledby="trust-strip-heading"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-8">
        <h2
          id="trust-strip-heading"
          className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
        >
          Trusted by 500+ Atlanta Homeowners
        </h2>

        <div className="mt-4 flex flex-col items-center gap-2 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3">
          <span className="text-yellow-400" aria-hidden>
            ★★★★★
          </span>
          <span className="sr-only">5 out of 5 stars.</span>
          <p className="text-sm font-medium text-slate-600 sm:text-base">
            5.0 Rating from 170+ Reviews
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:mt-10 md:gap-x-14"
          aria-label="Review platforms"
        >
          {PLACEHOLDER_LOGOS.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-wide text-slate-500 opacity-60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
