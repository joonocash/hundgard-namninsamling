"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function SignatureForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      postnummer: (form.elements.namedItem("postnummer") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(body.error ?? "Något gick fel. Försök igen.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Kunde inte skicka. Kontrollera din internetuppkoppling och försök igen.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-md text-center">
        <p className="text-lg font-semibold text-primary">Nästan klart!</p>
        <p className="mt-2 text-ink">
          Kolla din e-post och klicka på bekräftelselänken för att din underskrift ska räknas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-md space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">
          Namn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
          E-post
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="postnummer" className="block text-sm font-medium text-ink mb-1">
          Postnummer
        </label>
        <input
          id="postnummer"
          name="postnummer"
          type="text"
          inputMode="numeric"
          placeholder="412 34"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Honeypot — hidden from real visitors, catches bots that fill every field */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company">Företag</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && message && (
        <p className="text-sm text-red-600">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Skickar…" : "Skriv under"}
      </button>

      <p className="text-xs text-gray-500">
        Genom att skriva under godkänner du vår{" "}
        <a href="/integritetspolicy" className="underline">
          integritetspolicy
        </a>
        .
      </p>
    </form>
  );
}
