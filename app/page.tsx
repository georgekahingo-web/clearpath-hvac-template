"use client";

import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceForm from "@/components/ServiceForm";
import TrustStrip from "@/components/TrustStrip";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const business = searchParams.get("business") ?? "Clearpath HVAC";
  const phone = searchParams.get("phone") ?? "(770) 562-7698";
  const city = searchParams.get("city") ?? "Atlanta";

  return (
    <>
      <main className="flex flex-1 flex-col">
        <SiteHeader
          businessName={business}
          phone={phone}
          city={city}
          phoneHref="tel:+17705627698"
        />
        <Hero
          business={business}
          city={city}
          phone={phone}
          phoneHref="tel:+17705627698"
        >
          <ServiceForm variant="embedded" />
        </Hero>
        <TrustStrip />
      </main>
      <SiteFooter />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
