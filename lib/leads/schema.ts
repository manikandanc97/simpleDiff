import { z } from "zod";

export const PROJECT_TYPES = [
  "Website",
  "Mobile App",
  "Brand",
  "SaaS / Digital Product",
  "Something Else",
  "Not Sure Yet",
] as const;

export const LEAD_SOURCES = [
  "cta",
  "cta-schedule",
  "navbar",
  "footer",
  "what-we-build",
  "services-configurator",
  "how-we-work",
] as const;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be at most 30 characters")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(100, "Company name must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  projectType: z
    .enum(PROJECT_TYPES)
    .optional()
    .or(z.literal("")),
  goal: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),
  stage: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(10, "Please describe your project in at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),
  source: z.enum(LEAD_SOURCES),
  blueprintSummary: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .max(0, "Honeypot filled")
    .optional()
    .or(z.literal("")),
  t: z.coerce.number(),
  consent: z.literal(true, { message: "Consent is required" }),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
