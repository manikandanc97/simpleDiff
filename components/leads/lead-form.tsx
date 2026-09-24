"use client";

import { useActionState, useState } from "react";
import { submitLead } from "@/lib/leads/actions";
import { type LeadInput, type LeadState } from "@/lib/leads/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";
import {
  AnimatedSend,
  AnimatedMessageSquare,
  AnimatedMail,
} from "@/components/ui/animated-icon";

interface LeadFormProps {
  prefill?: Partial<LeadInput>;
  onSuccess?: () => void;
}

const initialState: LeadState = {
  ok: false,
};

export function LeadForm({ prefill, onSuccess }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  // Mount timestamp for spam detection (> 2000ms)
  const [mountTime] = useState(() => Date.now());

  if (state.ok) {
    onSuccess?.();
    return (
      <div className="py-8 flex flex-col items-center text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        <h3 className="text-2xl font-bold tracking-tight">Thanks — we&apos;ve got it.</h3>
        <p className="text-muted-foreground max-w-sm">
          {SITE.responseTime
            ? `We'll review your project and get back to you ${SITE.responseTime}.`
            : "We'll review your project details and get back to you shortly."}
        </p>
      </div>
    );
  }

  const encodedSummary = encodeURIComponent(
    prefill?.description
      ? `Hi SimpleThink, I'm interested in discussing this project: ${prefill.description.slice(0, 100)}...`
      : "Hi SimpleThink, I'd like to discuss a project."
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden honeypot and anti-spam fields */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
        <input type="hidden" name="t" value={mountTime} />
        <input type="hidden" name="source" value={prefill?.source || "topbar"} />
        <input type="hidden" name="consent" value="true" />
        {prefill?.blueprintSummary && (
          <input type="hidden" name="blueprintSummary" value={prefill.blueprintSummary} />
        )}
        {prefill?.projectType && (
          <input type="hidden" name="projectType" value={prefill.projectType} />
        )}
        {prefill?.goal && <input type="hidden" name="goal" value={prefill.goal} />}
        {prefill?.stage && <input type="hidden" name="stage" value={prefill.stage} />}
      </div>

      {/* Global Error Summary */}
      {state.message && !state.ok && (
        <div
          role="alert"
          className="p-3 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20"
        >
          <p className="font-medium">{state.message}</p>
          {(SITE.email || SITE.whatsapp) && (
            <div className="mt-2 flex gap-3 text-xs font-semibold">
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className="underline hover:opacity-80">
                  Email us ({SITE.email})
                </a>
              )}
              {SITE.whatsapp && (
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodedSummary}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="lead-name" className="text-sm font-medium">
          Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="lead-name"
          name="name"
          required
          defaultValue={prefill?.name || ""}
          placeholder="Jane Doe"
          aria-required="true"
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "lead-name-error" : undefined}
        />
        {state.fieldErrors?.name && (
          <p id="lead-name-error" className="text-xs text-destructive">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="lead-email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="lead-email"
          name="email"
          type="email"
          required
          defaultValue={prefill?.email || ""}
          placeholder="jane@example.com"
          aria-required="true"
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "lead-email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <p id="lead-email-error" className="text-xs text-destructive">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      {/* Phone / WhatsApp & Company (2-col grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <div className="space-y-1.5">
          <label htmlFor="lead-phone" className="text-sm font-medium">
            WhatsApp / Phone (optional)
          </label>
          <Input
            id="lead-phone"
            name="phone"
            type="tel"
            defaultValue={prefill?.phone || ""}
            placeholder="+1 555 0199"
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            aria-describedby={state.fieldErrors?.phone ? "lead-phone-error" : undefined}
          />
          {state.fieldErrors?.phone && (
            <p id="lead-phone-error" className="text-xs text-destructive">
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="lead-company" className="text-sm font-medium">
            Company (optional)
          </label>
          <Input
            id="lead-company"
            name="company"
            defaultValue={prefill?.company || ""}
            placeholder="Acme Corp / Enterprise"
            aria-invalid={Boolean(state.fieldErrors?.company)}
            aria-describedby={state.fieldErrors?.company ? "lead-company-error" : undefined}
          />
          {state.fieldErrors?.company && (
            <p id="lead-company-error" className="text-xs text-destructive">
              {state.fieldErrors.company[0]}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="lead-description" className="text-sm font-medium">
          Project description <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="lead-description"
          name="description"
          required
          rows={4}
          defaultValue={prefill?.description || ""}
          placeholder="What are you looking to build or simplify?"
          aria-required="true"
          aria-invalid={Boolean(state.fieldErrors?.description)}
          aria-describedby={state.fieldErrors?.description ? "lead-description-error" : undefined}
          className="resize-none"
        />
        {state.fieldErrors?.description && (
          <p id="lead-description-error" className="text-xs text-destructive">
            {state.fieldErrors.description[0]}
          </p>
        )}
      </div>

      <div className="pt-2 text-left space-y-3">
        <Button
          type="submit"
          disabled={isPending}
          className="group/button w-full h-11 text-base font-medium rounded-full cursor-pointer shadow-md hover:shadow-primary/25 flex items-center justify-center gap-2"
        >
          {isPending ? (
            "Sending request..."
          ) : (
            <>
              <span>Send project request</span>
              <AnimatedSend size={16} />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          We&apos;ll only use these details to reply about your project.
        </p>
      </div>

      {/* Alternative direct contacts */}
      {(SITE.whatsapp || SITE.email) && (
        <div className="pt-3 border-t border-border flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>Prefer direct messaging?</span>
          {SITE.whatsapp && (
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodedSummary}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
            >
              <AnimatedMessageSquare size={13} className="text-primary" />
              <span>Chat on WhatsApp</span>
            </a>
          )}
          {SITE.email && (
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
            >
              <AnimatedMail size={13} className="text-primary" />
              <span>Email us</span>
            </a>
          )}
        </div>
      )}
    </form>
  );
}
