export type MobileStickyCtaProps = {
  /** `tel:` link target */
  phoneHref?: string;
  /** In-page anchor for the quote form (e.g. `#quote`) */
  quoteHref?: string;
};

/**
 * Fixed bottom action bar for small screens only. Keeps call + quote one tap away.
 */
export default function MobileStickyCta({
  phoneHref = "tel:+14045551234",
  quoteHref = "#quote",
}: MobileStickyCtaProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] md:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="border-t border-slate-200/90 bg-white/95 shadow-[0_-12px_40px_-8px_rgba(15,23,42,0.14)] backdrop-blur-md supports-[backdrop-filter]:bg-white/92">
        <div className="mx-auto flex max-w-lg gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={phoneHref}
            className="flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] motion-reduce:active:scale-100"
          >
            Call Now
          </a>
          <a
            href={quoteHref}
            className="flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 active:scale-[0.99] motion-reduce:active:scale-100"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
  );
}
