import Link from "next/link";

export type SiteFooterProps = {
  companyName?: string;
  tagline?: string;
  cityState?: string;
  address?: string;
  hours?: string;
  phone?: string;
  phoneHref?: string;
};

const footerNav = [
  { label: "Heating", href: "#estimate-form" },
  { label: "Cooling", href: "#estimate-form" },
  { label: "Services", href: "#estimate-form" },
  { label: "About", href: "#about" },
] as const;

export default function SiteFooter({
  companyName = "Clearpath HVAC",
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="about"
      className="border-t border-white/10 bg-gray-950 text-white/70"
    >
      <div className="mx-auto max-w-[min(100%,90rem)] px-5 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-white">{companyName}</p>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            aria-label="Footer"
          >
            {footerNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">
            © {year} {companyName}
          </p>
          <p className="text-xs">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
