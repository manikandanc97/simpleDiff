export const SITE = {
  name: "SimplePrime",
  tagline: "Keep It Simple. Think Different.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://SimplePrime.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@SimplePrime.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 8675748207",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "", // digits only, with country code — TODO(owner)
  location: "", // TODO(owner): e.g. "Based in Tamil Nadu, India · working worldwide"
  responseTime: "", // TODO(owner): e.g. "within one business day"
  availability: "Taking on new projects", // TODO(owner): confirm this is true
} as const;

