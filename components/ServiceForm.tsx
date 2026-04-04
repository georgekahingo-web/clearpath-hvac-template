"use client";

import { FormEvent, useState } from "react";

/** Swap this ID per client deployment, or set NEXT_PUBLIC_FORMSPREE_FORM_ID. */
const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "mnjogkoq";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

type FormStatus = "idle" | "submitting" | "success" | "error";

function parseFormspreeError(data: Record<string, unknown>): string {
  if (typeof data.error === "string" && data.error) return data.error;
  const errors = data.errors;
  if (errors && typeof errors === "object" && errors !== null) {
    const parts = Object.values(errors as Record<string, unknown>).flatMap(
      (v) => (Array.isArray(v) ? v : [v])
    );
    const strings = parts.filter((p): p is string => typeof p === "string");
    if (strings.length) return strings.join(" ");
  }
  return "Something went wrong. Please try again or call us.";
}

export default function ServiceForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    const form = e.currentTarget;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      let data: Record<string, unknown> = {};
      try {
        data = (await response.json()) as Record<string, unknown>;
      } catch {
        /* non-JSON body */
      }

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setErrorMessage(parseFormspreeError(data));
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not reach the server. Check your connection and try again."
      );
    }
  }

  return (
    <section id="quote" className="px-6 py-20 bg-gray-100 scroll-mt-4">
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-5 px-4 text-xl font-semibold">
          Get a Fast Quote or Request Service
        </div>

        {status === "success" ? (
          <div
            className="p-8 md:p-10 text-center space-y-4"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Thanks — we received your request
            </h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Our team will reach out shortly. If your need is urgent, call us
              so we can schedule you faster.
            </p>
            <button
              type="button"
              className="mt-2 text-blue-600 font-medium hover:text-blue-700 underline underline-offset-2"
              onClick={() => {
                setStatus("idle");
                setErrorMessage(null);
              }}
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <input
              type="hidden"
              name="_subject"
              value="New HVAC Lead - Clearpath"
            />
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {errorMessage ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {errorMessage}
              </div>
            ) : null}

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="sf-name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="sf-name"
                  className="input"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="sf-phone"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  id="sf-phone"
                  className="input"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label
                  htmlFor="sf-email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="sf-email"
                  className="input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="sf-address"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Street address <span className="text-red-600">*</span>
                </label>
                <input
                  id="sf-address"
                  className="input"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  required
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label
                  htmlFor="sf-zip"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  ZIP code <span className="text-red-600">*</span>
                </label>
                <input
                  id="sf-zip"
                  className="input"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  placeholder="12345"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="sf-service"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Service needed <span className="text-red-600">*</span>
                </label>
                <select
                  id="sf-service"
                  className="input"
                  name="service"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="AC Repair">AC repair</option>
                  <option value="Heating Repair">Heating repair</option>
                  <option value="Installation">Installation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sf-referral"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  How did you hear about us?
                </label>
                <select
                  id="sf-referral"
                  className="input"
                  name="referral"
                  defaultValue=""
                >
                  <option value="">Optional</option>
                  <option value="Google">Google</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="sf-message"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                How can we help? <span className="text-red-600">*</span>
              </label>
              <textarea
                id="sf-message"
                className="input h-28 resize-y min-h-[7rem]"
                name="message"
                required
                placeholder="Briefly describe the issue or project (e.g. AC not cooling, new furnace estimate)."
                rows={4}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
              <p className="text-xs text-gray-500 order-2 sm:order-1">
                By submitting, you agree to be contacted about your request.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
                className="order-1 sm:order-2 w-full sm:w-auto shrink-0 bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 disabled:pointer-events-none transition-colors"
              >
                {status === "submitting" ? "Sending…" : "Get my free quote"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
