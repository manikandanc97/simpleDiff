"use server";

import { leadSchema, type LeadState } from "./schema";
import { createClient } from "@supabase/supabase-js";
import { SITE } from "@/lib/site";

export async function submitLead(
  _prevState: LeadState,
  formData: FormData
): Promise<LeadState> {
  const rawData: Record<string, unknown> = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    company: formData.get("company") || undefined,
    projectType: formData.get("projectType") || undefined,
    goal: formData.get("goal") || undefined,
    stage: formData.get("stage") || undefined,
    description: formData.get("description"),
    source: formData.get("source"),
    blueprintSummary: formData.get("blueprintSummary") || undefined,
    website: formData.get("website") || undefined,
    t: formData.get("t"),
    consent: formData.get("consent") === "true" || formData.get("consent") === "on",
  };

  const parsed = leadSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [field, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (errors) {
        fieldErrors[field] = errors;
      }
    }
    return {
      ok: false,
      message: "Please correct the highlighted errors.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Spam protection: honeypot or submitted under 2000ms
  const now = Date.now();
  if (data.website || now - data.t < 2000) {
    // Silently succeed
    return { ok: true };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[Dev Lead Capture Received]:", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        projectType: data.projectType,
        goal: data.goal,
        stage: data.stage,
        description: data.description,
        source: data.source,
        blueprintSummary: data.blueprintSummary,
      });
      return { ok: true };
    }

    const contactChannels: string[] = [];
    if (SITE.email) contactChannels.push(`email (${SITE.email})`);
    if (SITE.whatsapp) contactChannels.push("WhatsApp");

    const fallbackMessage = contactChannels.length > 0
      ? `Our submission service is temporarily unavailable. Please reach us directly via ${contactChannels.join(" or ")}.`
      : "Our submission service is temporarily unavailable. Please try again later.";

    return {
      ok: false,
      message: fallbackMessage,
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      project_type: data.projectType || null,
      goal: data.goal || null,
      stage: data.stage || null,
      description: data.description,
      source: data.source,
      blueprint_summary: data.blueprintSummary || null,
    });

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Supabase insert error:", error.message);
      }
      return {
        ok: false,
        message: "Failed to save your submission. Please reach out to us directly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "An unexpected error occurred. Please reach out to us directly.",
    };
  }
}
