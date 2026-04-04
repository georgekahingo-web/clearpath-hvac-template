import Hero from "@/components/Hero";
import ServiceForm from "@/components/ServiceForm";

export default function Home() {
  return (
    <main>
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        24/7 Emergency Service • Call Now: (404) 555-1234
      </div>
      <Hero />

      <ServiceForm />
    </main>
  );
}
