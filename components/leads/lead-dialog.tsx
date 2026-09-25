"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type LeadInput } from "@/lib/leads/schema";
import { LeadForm } from "./lead-form";

interface LeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: Partial<LeadInput>;
}

export function LeadDialog({ open, onOpenChange, prefill }: LeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="text-left mb-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Start a project
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Tell us what you want to build. We&apos;ll help you strip away the noise and ship a focused product.
          </DialogDescription>
        </DialogHeader>

        <LeadForm prefill={prefill} onSuccess={() => {}} />
      </DialogContent>
    </Dialog>
  );
}
