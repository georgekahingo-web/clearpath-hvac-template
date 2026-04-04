import ServiceForm from "@/components/ServiceForm";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-gray-900 text-white px-6 py-32 text-center">
        <h1 className="text-5xl font-semibold">
          Fast & Reliable HVAC Services
        </h1>
      </section>

      {/* FORM */}
      <ServiceForm />
    </main>
  );
}
