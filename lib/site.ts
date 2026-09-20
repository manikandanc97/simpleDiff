export const SITE = {
  name: "SimpleDiff",
  tagline: "Keep It Simple. Make It Different.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplediff.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@simplediff.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "", // digits only, with country code — TODO(owner)
  location: "", // TODO(owner): e.g. "Based in Tamil Nadu, India · working worldwide"
  responseTime: "", // TODO(owner): e.g. "within one business day"
  availability: "Taking on new projects", // TODO(owner): confirm this is true
} as const;

