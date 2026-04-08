"use client";

import { FormEvent, useState } from "react";
import type { ReactElement } from "react";

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

export type ServiceFormProps = {
  /** `embedded`: hero column — no section chrome; stacks fields in one column for narrow width */
  variant?: "default" | "embedded";
};

type Step = 1 | 2;

const initialFields = {
  name: "",
  phone: "",
  service: "",
  email: "",
  address: "",
  zip: "",
  message: "",
  referral: "",
};

export default function ServiceForm({
  variant = "default",
}: ServiceFormProps): ReactElement {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [fields, setFields] = useState(initialFields);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step !== 2) return;

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
        setFields(initialFields);
        setStep(1);
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

  function handleNext() {
    const name = fields.name.trim();
    const phone = fields.phone.trim();
    const service = fields.service.trim();
    if (!name || !phone || !service) {
      setErrorMessage("Please fill in your name, phone, and service.");
      return;
    }
    setErrorMessage(null);
    setStep(2);
  }

  function handleBack() {
    setErrorMessage(null);
    setStep(1);
  }

  const isEmbedded = variant === "embedded";
  const labelMb = isEmbedded ? "mb-1" : "mb-1.5";
  const row2 = "grid md:grid-cols-2 gap-4";
  const embedPair =
    "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5";
  const inputClass = isEmbedded
    ? "input !py-2 text-[13px] leading-tight"
    : "input";

  const shellClass = isEmbedded
    ? "w-full max-w-md lg:max-w-none lg:w-full"
    : "px-6 py-20 bg-gray-100";

  const cardClass = isEmbedded
    ? "mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-gray-200/40 bg-white/90 shadow-xl backdrop-blur-xl transition-shadow duration-300 ease-out group-hover/card:shadow-xl lg:mx-0 lg:max-w-none lg:w-full"
    : "mx-auto max-w-3xl bg-white rounded-xl shadow-md overflow-hidden";

  const formPadding = isEmbedded ? "p-5 sm:p-6 space-y-3.5" : "p-6 md:p-8 space-y-5";
  const successPadding = isEmbedded
    ? "p-5 sm:p-6 text-center space-y-3"
    : "p-8 md:p-10 text-center space-y-4";

  const primaryBtn = isEmbedded
    ? "w-full shrink-0 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:from-blue-800 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100 motion-reduce:hover:scale-100 motion-reduce:active:scale-100 sm:w-auto"
    : "w-full shrink-0 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:from-blue-800 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100 motion-reduce:hover:scale-100 motion-reduce:active:scale-100 sm:w-auto";

  const secondaryBtn = isEmbedded
    ? "w-full rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 ease-out hover:border-gray-400 hover:bg-slate-50 active:scale-[0.98] motion-reduce:hover:border-slate-300 motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
    : "w-full rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition-all duration-200 ease-out hover:border-gray-400 hover:bg-slate-50 active:scale-[0.98] motion-reduce:hover:border-slate-300 motion-reduce:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto";

  const stepBodyMinH = isEmbedded ? "min-h-[17.5rem]" : "min-h-[18.5rem]";
  const stepEnter =
    "motion-safe:animate-[service-form-step-in_0.25s_ease-out_both]";

  const card = (
    <div className={cardClass}>
      {isEmbedded ? (
        <div className="w-full border-b border-white/10 bg-blue-700 px-5 py-4 text-left text-white sm:px-6 sm:py-5">
          <h2 className="text-xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-sm sm:text-2xl">
            Get Your Free Same-Day Estimate
          </h2>
          <p className="mt-2 text-sm font-medium leading-snug text-white/80">
            We can be at your home as soon as today
          </p>
          <p className="mt-2 text-[0.7rem] leading-snug text-white/65 sm:text-xs">
            No obligation • Free estimate • Same-day service
          </p>
        </div>
      ) : (
        <div className="w-full border-b border-white/10 bg-blue-700 px-6 py-6 text-left text-white md:px-8 md:py-7">
          <h2 className="text-2xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-sm md:text-3xl md:leading-[1.1]">
            Get Your Free Same-Day Estimate
          </h2>
          <p className="mt-2.5 text-sm font-medium leading-snug text-white/80 md:text-base">
            We can be at your home as soon as today
          </p>
          <p className="mt-2.5 text-xs leading-snug text-white/65 md:text-[0.8125rem]">
            No obligation • Free estimate • Same-day service
          </p>
        </div>
      )}

      {status === "success" ? (
        <div className={successPadding} role="status" aria-live="polite">
          <div
            className={
              isEmbedded
                ? "inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700 text-lg"
                : "inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl"
            }
          >
            ✓
          </div>
          <h2
            className={
              isEmbedded
                ? "text-lg font-semibold text-gray-900"
                : "text-xl font-semibold text-gray-900"
            }
          >
            Thanks — we received your request
          </h2>
          <p
            className={
              isEmbedded
                ? "text-gray-600 max-w-md mx-auto text-sm leading-snug"
                : "text-gray-600 max-w-md mx-auto leading-relaxed"
            }
          >
            Our team will reach out shortly. If your need is urgent, call us so
            we can schedule you faster.
          </p>
          <button
            type="button"
            className="mt-2 text-blue-700 font-medium hover:text-blue-800 underline underline-offset-2"
            onClick={() => {
              setStatus("idle");
              setErrorMessage(null);
              setStep(1);
              setFields(initialFields);
            }}
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`relative ${formPadding}`}>
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
              className={
                isEmbedded
                  ? "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800"
                  : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              }
            >
              {errorMessage}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-600">
              Step {step} of 2
            </span>
            {step === 2 ? (
              <span className="truncate text-right">Almost done</span>
            ) : (
              <span className="truncate text-right">Quick start</span>
            )}
          </div>

          <div
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={2}
            aria-valuenow={step}
            aria-label={`Form step ${step} of 2`}
          >
            <div
              className={`h-full rounded-full bg-blue-700 transition-[width] duration-300 ease-out motion-reduce:transition-none ${
                step === 1 ? "w-1/2" : "w-full"
              }`}
            />
          </div>

          <div className={`relative ${stepBodyMinH}`}>
            {step === 1 ? (
              <div
                key="step-1"
                className={stepEnter}
                aria-hidden={false}
              >
                {isEmbedded ? (
                  <div className="space-y-2.5">
                    <div>
                      <label
                        htmlFor="sf-name"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sf-name"
                        className={inputClass}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                        value={fields.name}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sf-phone"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sf-phone"
                        className={inputClass}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="(555) 555-5555"
                        value={fields.phone}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sf-service"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="sf-service"
                        className={inputClass}
                        name="service"
                        required
                        value={fields.service}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, service: e.target.value }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="AC Repair">AC repair</option>
                        <option value="Heating Repair">Heating repair</option>
                        <option value="Installation">Installation</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="sf-name"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sf-name"
                        className={inputClass}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                        value={fields.name}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sf-phone"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sf-phone"
                        className={inputClass}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="(555) 555-5555"
                        value={fields.phone}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sf-service"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="sf-service"
                        className={inputClass}
                        name="service"
                        required
                        value={fields.service}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, service: e.target.value }))
                        }
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="AC Repair">AC repair</option>
                        <option value="Heating Repair">Heating repair</option>
                        <option value="Installation">Installation</option>
                      </select>
                    </div>
                  </div>
                )}

                <div
                  className={
                    isEmbedded
                      ? "mt-3 flex flex-col gap-2 pt-0.5"
                      : "mt-4 flex flex-col gap-3 pt-1"
                  }
                >
                  <button
                    type="button"
                    className={`${primaryBtn} w-full`}
                    onClick={handleNext}
                  >
                    Next → Get Free Estimate
                  </button>
                </div>
              </div>
            ) : (
              <div key="step-2" className={stepEnter} aria-hidden={false}>
              <input type="hidden" name="name" value={fields.name} />
              <input type="hidden" name="phone" value={fields.phone} />
              <input type="hidden" name="service" value={fields.service} />

              {isEmbedded ? (
                <>
                  <div className={embedPair}>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="sf-email"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sf-email"
                        className={inputClass}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={fields.email}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className={embedPair}>
                    <div>
                      <label
                        htmlFor="sf-address"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        Street
                      </label>
                      <input
                        id="sf-address"
                        className={inputClass}
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="123 Main St"
                        value={fields.address}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, address: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sf-zip"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        ZIP
                      </label>
                      <input
                        id="sf-zip"
                        className={inputClass}
                        name="zip"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="12345"
                        maxLength={10}
                        value={fields.zip}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, zip: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className={embedPair}>
                    <div>
                      <label
                        htmlFor="sf-referral"
                        className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                      >
                        Referral
                      </label>
                      <select
                        id="sf-referral"
                        className={inputClass}
                        name="referral"
                        value={fields.referral}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, referral: e.target.value }))
                        }
                      >
                        <option value="">Optional</option>
                        <option value="Google">Google</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2" />
                  </div>

                  <div>
                    <label
                      htmlFor="sf-message"
                      className={`block text-[13px] font-medium text-gray-700 ${labelMb}`}
                    >
                      Details
                    </label>
                    <textarea
                      id="sf-message"
                      className={`${inputClass} h-[4.25rem] min-h-[4.25rem] resize-y py-2`}
                      name="message"
                      placeholder="What's going on? (e.g. AC not cooling)"
                      rows={2}
                      value={fields.message}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, message: e.target.value }))
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={row2}>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="sf-email"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sf-email"
                        className="input"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={fields.email}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className={row2}>
                    <div>
                      <label
                        htmlFor="sf-address"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        Street address
                      </label>
                      <input
                        id="sf-address"
                        className="input"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="123 Main St"
                        value={fields.address}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, address: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sf-zip"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        ZIP code
                      </label>
                      <input
                        id="sf-zip"
                        className="input"
                        name="zip"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="12345"
                        maxLength={10}
                        value={fields.zip}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, zip: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className={row2}>
                    <div>
                      <label
                        htmlFor="sf-referral"
                        className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                      >
                        How did you hear about us?
                      </label>
                      <select
                        id="sf-referral"
                        className="input"
                        name="referral"
                        value={fields.referral}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, referral: e.target.value }))
                        }
                      >
                        <option value="">Optional</option>
                        <option value="Google">Google</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="hidden md:block" aria-hidden />
                  </div>

                  <div>
                    <label
                      htmlFor="sf-message"
                      className={`block text-sm font-medium text-gray-700 ${labelMb}`}
                    >
                      Message / details
                    </label>
                    <textarea
                      id="sf-message"
                      className="input h-24 resize-y min-h-[6rem]"
                      name="message"
                      placeholder="Briefly describe the issue or project (e.g. AC not cooling, new furnace estimate)."
                      rows={3}
                      value={fields.message}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, message: e.target.value }))
                      }
                    />
                  </div>
                </>
              )}

              <div
                className={
                  isEmbedded
                    ? "mt-3 flex flex-col gap-2 pt-0.5 sm:flex-row sm:items-stretch sm:justify-between sm:gap-3"
                    : "mt-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                }
              >
                <button
                  type="button"
                  className={secondaryBtn}
                  onClick={handleBack}
                >
                  Back
                </button>
                <div className="flex flex-1 flex-col gap-2 sm:items-end">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className={`${primaryBtn} w-full sm:min-w-[12rem]`}
                  >
                    {status === "submitting" ? "Sending…" : "Submit Request"}
                  </button>
                </div>
              </div>

              <div
                className={
                  isEmbedded
                    ? "mt-2 text-[0.6875rem] leading-snug text-gray-500"
                    : "mt-3 text-xs text-gray-500"
                }
              >
                By submitting, you agree to be contacted about your request.
              </div>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );

  if (isEmbedded) {
    return (
      <div
        id="estimate-form"
        className={`${shellClass} scroll-mt-28 md:scroll-mt-24`}
      >
        {card}
      </div>
    );
  }

  return (
    <section
      id="estimate-form"
      className={`${shellClass} scroll-mt-28 md:scroll-mt-24`}
    >
      {card}
    </section>
  );
}
