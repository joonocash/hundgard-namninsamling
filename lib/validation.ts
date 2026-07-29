import { z } from "zod";

export const signatureSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ange ditt fullständiga namn.")
    .max(100),
  email: z.string().trim().toLowerCase().email("Ange en giltig e-postadress."),
  postnummer: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, ""))
    .refine((v) => /^\d{5}$/.test(v), "Ange ett giltigt postnummer (5 siffror)."),
  // Honeypot: real users never fill this in. Bots that auto-fill every field do.
  // Deliberately unrestricted here — the route handler decides what to do with
  // a non-empty value; rejecting it here would leak the honeypot to bots via
  // the validation error message.
  company: z.string().optional().default(""),
});

export type SignatureInput = z.infer<typeof signatureSchema>;
