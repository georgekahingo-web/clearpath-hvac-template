import Hero from "@/components/Hero";
import MobileStickyCta from "@/components/MobileStickyCta";
import SiteFooter from "@/components/SiteFooter";
import ServiceForm from "@/components/ServiceForm";

export default function Home() {
  return (
    <>
      <div className="pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <main className="flex flex-1 flex-col">
          <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
            24/7 Emergency Service • Call Now: (404) 555-1234
          </div>
          <Hero>
            <ServiceForm variant="embedded" />
          </Hero>
        </main>
        <SiteFooter />
      </div>
      <MobileStickyCta />
    </>
  );
}
