export type SiteFooterProps = {
  companyName?: string;
  tagline?: string;
  /** City and state on one line */
  cityState?: string;
  /** Street / suite (placeholder ok) */
  address?: string;
  hours?: string;
  phone?: string;
  phoneHref?: string;
};

export default function SiteFooter({
  companyName = "Clearpath Heating & Air",
  tagline = "Fast, reliable HVAC service you can trust",
  cityState = "Atlanta, GA",
  address = "123 Peachtree St NE, Suite 200",
  hours = "Mon–Sun: 7am–9pm",
  phone = "(404) 555-1234",
  phoneHref = "tel:+14045551234",
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="about"
      className="border-t border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-400"
    >
      <div className="mx-auto max-w-[min(100%,90rem)] px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-14">
          <div className="min-w-0 space-y-3">
            <p className="text-base font-semibold tracking-tight text-white">
              {companyName}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              {tagline}
            </p>
          </div>

          <div className="min-w-0 space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Location
            </p>
            <address className="not-italic text-sm leading-relaxed text-slate-400">
              <span className="block text-slate-300">{address}</span>
              <span className="mt-1 block">{cityState}</span>
            </address>
          </div>

          <div className="min-w-0 space-y-4 md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Hours
              </p>
              <p className="text-sm text-slate-300">{hours}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Phone
              </p>
              <a
                href={phoneHref}
                className="inline-block text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-white"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/[0.08] pt-8 text-center text-xs leading-relaxed text-slate-600 sm:text-left">
          © {year} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
