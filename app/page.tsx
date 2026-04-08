import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceForm from "@/components/ServiceForm";
import TrustStrip from "@/components/TrustStrip";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <SiteHeader
          phone="(770) 562-7698"
          phoneHref="tel:+17705627698"
        />
        <Hero phone="(770) 562-7698" phoneHref="tel:+17705627698">
          <ServiceForm variant="embedded" />
        </Hero>
        <TrustStrip />
      </main>
      <SiteFooter
        phone="(770) 562-7698"
        phoneHref="tel:+17705627698"
      />
    </>
  );
}
