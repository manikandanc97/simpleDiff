"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type LeadInput } from "@/lib/leads/schema";
import { LeadDialog } from "./lead-dialog";

interface LeadContextType {
  openLead: (prefill?: Partial<LeadInput>) => void;
  closeLead: () => void;
  isOpen: boolean;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<Partial<LeadInput> | undefined>(undefined);

  const openLead = (data?: Partial<LeadInput>) => {
    setPrefill(data);
    setOpen(true);
  };

  const closeLead = () => {
    setOpen(false);
  };

  return (
    <LeadContext.Provider value={{ openLead, closeLead, isOpen: open }}>
      {children}
      <LeadDialog open={open} onOpenChange={setOpen} prefill={prefill} />
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLead must be used within a LeadProvider");
  }
  return context;
}
