export default function ServiceForm() {
    return (
      <section className="px-6 py-20 bg-gray-100">
        <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
  
          {/* HEADER */}
          <div className="bg-blue-600 text-white text-center py-5 text-xl font-semibold">
            Request Service Online
          </div>
  
          {/* FORM */}
          <form className="p-6 space-y-4">
  
            <div className="grid md:grid-cols-3 gap-4">
              <input className="input" placeholder="Name *" />
              <input className="input" placeholder="Phone *" />
              <input className="input" placeholder="Email *" />
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" placeholder="Street Address *" />
              <input className="input" placeholder="ZIP Code *" />
            </div>
  
            <div className="grid md:grid-cols-2 gap-4">
              <select className="input">
                <option>Select a Service</option>
                <option>AC Repair</option>
                <option>Heating Repair</option>
                <option>Installation</option>
              </select>
  
              <select className="input">
                <option>How did you hear about us?</option>
                <option>Google</option>
                <option>Referral</option>
              </select>
            </div>
  
            <textarea
              className="input h-28"
              placeholder="How can we help?"
            />
  
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500">
                Submit
              </button>
            </div>
  
          </form>
        </div>
      </section>
    );
  }