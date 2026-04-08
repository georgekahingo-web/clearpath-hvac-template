import Link from "next/link";

export type FloatingCTAProps = {
  phoneHref?: string;
  formHref?: string;
};

export default function FloatingCTA({
  phoneHref = "tel:17705627698",
  formHref = "#estimate-form",
}: FloatingCTAProps) {
  return (
    <>
      <div
        className="fixed bottom-0 left-0 z-50 flex w-full md:hidden"
        role="region"
        aria-label="Quick contact"
      >
        <a
          href={phoneHref}
          className="flex w-1/2 items-center justify-center bg-red-500 py-4 text-center font-semibold text-white transition-colors duration-200 hover:bg-red-600"
        >
          Call Now
        </a>
        <Link
          href={formHref}
          className="flex w-1/2 items-center justify-center bg-gradient-to-r from-blue-700 to-blue-600 py-4 text-center font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:from-blue-800 hover:to-blue-700"
        >
          Schedule
        </Link>
      </div>

      <div className="fixed bottom-6 right-6 z-50 hidden md:flex">
        <Link
          href={formHref}
          className="rounded-full bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-red-600"
        >
          Get Your Free Estimate
        </Link>
      </div>
    </>
  );
}
