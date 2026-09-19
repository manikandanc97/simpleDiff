"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useThemeColor } from "@/components/theme/color-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProjectIdea = {
  type: string;
  goal: string;
  stage: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const INITIAL_DATA: ProjectIdea = {
  type: "",
  goal: "",
  stage: "",
  description: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

const OPTIONS_TYPE = [
  "Website",
  "Mobile App",
  "Brand",
  "SaaS / Digital Product",
  "Something Else",
  "Not Sure Yet",
];

const OPTIONS_GOAL = [
  "Launch something new",
  "Get more customers",
  "Improve an existing product",
  "Automate something",
  "Build a digital presence",
  "Explore an idea",
];

const OPTIONS_STAGE = [
  "Just an idea",
  "Planning",
  "Design ready",
  "Ready to build",
  "Existing product",
];

export function BuildYourIdea() {
  const { theme } = useThemeColor();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectIdea>(INITIAL_DATA);
  const [error, setError] = useState("");
  const [isAdvancing, setIsAdvancing] = useState(false);

  const TOTAL_STEPS = 5;

  const handleNext = () => {
    // Validation
    if (step === 4 && !data.description.trim()) {
      setError("Please tell us a little about your idea.");
      return;
    }
    if (step === 5) {
      if (!data.name.trim() || !data.email.trim()) {
        setError("Name and Email are required.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        setError("Please enter a valid email address.");
        return;
      }
    }
    
    setError("");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleOptionSelect = (key: keyof ProjectIdea, value: string) => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    setData((prev) => ({ ...prev, [key]: value }));
    setError("");
    setTimeout(() => {
      setStep((s) => s + 1);
      setIsAdvancing(false);
    }, 300); // Slight delay for visual feedback
  };

  const resetFlow = () => {
    setData(INITIAL_DATA);
    setStep(1);
    setError("");
  };

  // Shared animation variants
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <section className="py-32 px-6 bg-background flex flex-col items-center border-t border-border">
      <div className="max-w-2xl w-full">
        {/* Header (Hidden on final step) */}
        {step <= TOTAL_STEPS && (
          <div className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Build Your Idea
            </h2>
            <p className="text-xl text-muted-foreground">
              You bring the idea. We&apos;ll simplify the rest.
            </p>
          </div>
        )}

        {/* Progress Indicator */}
        {step <= TOTAL_STEPS && (
          <div className="flex gap-2 mb-12">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-sm transition-colors duration-500"
                style={{
                  backgroundColor: i + 1 <= step ? theme.primary : "var(--border)",
                }}
              />
            ))}
          </div>
        )}

        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-semibold mb-2">What are you building?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {OPTIONS_TYPE.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect("type", opt)}
                      className={cn(
                        "p-4 text-left border rounded-md transition-all duration-300 outline-none focus-visible:ring-2",
                        data.type === opt ? "bg-muted/30" : "hover:bg-muted/10 border-border"
                      )}
                      style={data.type === opt ? { borderColor: theme.primary } : {}}
                    >
                      <span className="font-medium text-foreground">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-semibold mb-2">What&apos;s the goal?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {OPTIONS_GOAL.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect("goal", opt)}
                      className={cn(
                        "p-4 text-left border rounded-md transition-all duration-300 outline-none focus-visible:ring-2",
                        data.goal === opt ? "bg-muted/30" : "hover:bg-muted/10 border-border"
                      )}
                      style={data.goal === opt ? { borderColor: theme.primary } : {}}
                    >
                      <span className="font-medium text-foreground">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-semibold mb-2">How far along are you?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {OPTIONS_STAGE.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect("stage", opt)}
                      className={cn(
                        "p-4 text-left border rounded-md transition-all duration-300 outline-none focus-visible:ring-2",
                        data.stage === opt ? "bg-muted/30" : "hover:bg-muted/10 border-border"
                      )}
                      style={data.stage === opt ? { borderColor: theme.primary } : {}}
                    >
                      <span className="font-medium text-foreground">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-semibold mb-2">Tell us a little about it.</h3>
                <div className="flex flex-col gap-2">
                  <Textarea
                    placeholder="What are you trying to build?"
                    value={data.description}
                    onChange={(e) => {
                      setData({ ...data, description: e.target.value });
                      setError("");
                    }}
                    className="min-h-[150px] text-lg resize-none"
                    autoFocus
                  />
                  {error && <p className="text-sm text-destructive mt-1">{error}</p>}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-semibold mb-2">Where can we reach you?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Name *</label>
                    <Input
                      placeholder="Jane Doe"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      autoFocus
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Email *</label>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone (Optional)</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Company (Optional)</label>
                    <Input
                      placeholder="Acme Corp"
                      value={data.company}
                      onChange={(e) => setData({ ...data, company: e.target.value })}
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center text-center py-12"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-8 bg-muted/20"
                  style={{ color: theme.primary }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-4">
                  Your idea is taking shape.
                </h3>
                <div className="w-full max-w-md bg-muted/10 border border-border p-6 rounded-lg text-left mb-10 flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Building</p>
                    <p className="font-medium">{data.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Goal</p>
                    <p className="font-medium">{data.goal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Stage</p>
                    <p className="font-medium">{data.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Description</p>
                    <p className="font-medium text-sm line-clamp-2 text-muted-foreground">{data.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto px-8 h-12 text-lg shadow-lg shadow-primary/20 transition-all"
                    onClick={() => alert("Ready to connect to Supabase backend in Phase 6!")}
                  >
                    Let&apos;s Build It &rarr;
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full sm:w-auto px-8 h-12"
                    onClick={resetFlow}
                  >
                    Start Over
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {step > 1 && step <= TOTAL_STEPS && (
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
            <Button variant="ghost" onClick={handleBack} className="text-muted-foreground">
              &larr; Back
            </Button>
            
            {step >= 4 && (
              <Button onClick={handleNext}>
                {step === TOTAL_STEPS ? "Review Summary" : "Next"} &rarr;
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
