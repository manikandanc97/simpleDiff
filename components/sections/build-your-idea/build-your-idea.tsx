"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads/actions";
import { SITE } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";
import {
  AnimatedRotateCcw,
  AnimatedArrowLeft,
  AnimatedArrowRight,
  AnimatedSend,
} from "@/components/ui/animated-icon";

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

interface BuildYourIdeaProps {
  initialDescription?: string;
}

export function BuildYourIdea({ initialDescription = "" }: BuildYourIdeaProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectIdea>(() => ({
    ...INITIAL_DATA,
    description: initialDescription,
  }));
  const [prevInitialDesc, setPrevInitialDesc] = useState(initialDescription);
  const [error, setError] = useState("");
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mountTime] = useState(() => Date.now());

  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Sync initialDescription if user typed in quick mode (render-time pattern)
  if (initialDescription !== prevInitialDesc) {
    setPrevInitialDesc(initialDescription);
    if (initialDescription && !data.description) {
      setData((prev) => ({ ...prev, description: initialDescription }));
    }
  }

  // Move focus to step heading on step change
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const TOTAL_STEPS = 5;

  const handleBack = () => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    setIsAdvancing(false);
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleOptionSelect = (key: keyof ProjectIdea, value: string) => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    setData((prev) => ({ ...prev, [key]: value }));
    setError("");

    advanceTimeoutRef.current = setTimeout(() => {
      setStep((s) => s + 1);
      setIsAdvancing(false);
      advanceTimeoutRef.current = null;
    }, 300);
  };

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!data.description.trim() || data.description.trim().length < 10) {
      setError("Please describe your project in at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.company) formData.append("company", data.company);
    if (data.type) formData.append("projectType", data.type);
    if (data.goal) formData.append("goal", data.goal);
    if (data.stage) formData.append("stage", data.stage);
    formData.append("description", data.description);
    formData.append("source", "guided");
    formData.append("website", "");
    formData.append("t", String(mountTime));
    formData.append("consent", "true");

    try {
      const result = await submitLead({ ok: false }, formData);
      if (result.ok) {
        setStep(6);
      } else {
        setError(result.message || "Failed to submit. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 4) {
      if (!data.description.trim() || data.description.trim().length < 10) {
        setError("Please describe your project in at least 10 characters.");
        return;
      }
      setError("");
      setStep(5);
    } else if (step === 5) {
      handleSubmit();
    }
  };

  const resetFlow = () => {
    setData(INITIAL_DATA);
    setStep(1);
    setError("");
  };

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="py-6 px-4 w-full flex flex-col items-center">
      <div className="max-w-2xl w-full">
        {/* Header (Hidden on final step) */}
        {step <= TOTAL_STEPS && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Build Your <span className="text-primary">Idea</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              You bring the idea. We&apos;ll simplify the rest.
            </p>
          </div>
        )}

        {/* Progress Indicator */}
        {step <= TOTAL_STEPS && (
          <div className="mb-10">
            <div className="flex justify-between items-center text-xs font-mono text-muted-foreground mb-2">
              <span>Step {step} of {TOTAL_STEPS}</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
              aria-label={`Step ${step} of ${TOTAL_STEPS}`}
              className="flex gap-2"
            >
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-sm transition-colors duration-300",
                    i + 1 <= step ? "bg-primary" : "bg-border"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        <div className="min-h-[380px] relative">
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
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl font-bold mb-2 outline-none"
                >
                  What are you building?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {OPTIONS_TYPE.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={data.type === opt}
                      onClick={() => handleOptionSelect("type", opt)}
                      className={cn(
                        "p-4 text-left border rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                        data.type === opt
                          ? "bg-muted/30 border-primary"
                          : "hover:bg-muted/10 border-border"
                      )}
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
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl font-bold mb-2 outline-none"
                >
                  What&apos;s the goal?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {OPTIONS_GOAL.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={data.goal === opt}
                      onClick={() => handleOptionSelect("goal", opt)}
                      className={cn(
                        "p-4 text-left border rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                        data.goal === opt
                          ? "bg-muted/30 border-primary"
                          : "hover:bg-muted/10 border-border"
                      )}
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
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl font-bold mb-2 outline-none"
                >
                  How far along are you?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {OPTIONS_STAGE.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={data.stage === opt}
                      onClick={() => handleOptionSelect("stage", opt)}
                      className={cn(
                        "p-4 text-left border rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                        data.stage === opt
                          ? "bg-muted/30 border-primary"
                          : "hover:bg-muted/10 border-border"
                      )}
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
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl font-bold mb-2 outline-none"
                >
                  Tell us a little about it.
                </h3>
                <div className="flex flex-col gap-2">
                  <label htmlFor="guided-description" className="sr-only">
                    Project description
                  </label>
                  <Textarea
                    id="guided-description"
                    placeholder="What are you trying to build? (minimum 10 characters)"
                    value={data.description}
                    onChange={(e) => {
                      setData({ ...data, description: e.target.value });
                      setError("");
                    }}
                    className="min-h-[150px] text-lg resize-none"
                    autoFocus
                  />
                  {error && (
                    <p role="alert" className="text-sm text-destructive mt-1">
                      {error}
                    </p>
                  )}
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
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl font-bold mb-2 outline-none"
                >
                  Where can we reach you?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guided-name" className="text-sm font-medium">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="guided-name"
                      name="name"
                      required
                      aria-required="true"
                      placeholder="Jane Doe"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      autoFocus
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guided-email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="guided-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      placeholder="jane@example.com"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guided-phone" className="text-sm font-medium">
                      Phone (Optional)
                    </label>
                    <Input
                      id="guided-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guided-company" className="text-sm font-medium">
                      Company (Optional)
                    </label>
                    <Input
                      id="guided-company"
                      name="company"
                      placeholder="Acme Corp"
                      value={data.company}
                      onChange={(e) => setData({ ...data, company: e.target.value })}
                    />
                  </div>
                </div>
                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}
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
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
                <h3 className="text-3xl font-bold tracking-tight mb-2">
                  Thanks — we&apos;ve got <span className="text-primary">it.</span>
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  {SITE.responseTime
                    ? `Your project details have been submitted. We'll be in touch ${SITE.responseTime}.`
                    : "Your project details have been submitted. We'll be in touch shortly."}
                </p>

                <div className="w-full max-w-md bg-muted/10 border border-border p-6 rounded-lg text-left mb-8 flex flex-col gap-4">
                  {data.type && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Building</p>
                      <p className="font-medium text-foreground">{data.type}</p>
                    </div>
                  )}
                  {data.goal && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Goal</p>
                      <p className="font-medium text-foreground">{data.goal}</p>
                    </div>
                  )}
                  {data.stage && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Stage</p>
                      <p className="font-medium text-foreground">{data.stage}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Description</p>
                    <p className="font-medium text-sm text-muted-foreground line-clamp-3">{data.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Contact</p>
                    <p className="font-medium text-sm text-foreground">{data.name} ({data.email})</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="group/button px-8 cursor-pointer flex items-center gap-2"
                  onClick={resetFlow}
                >
                  <AnimatedRotateCcw size={15} />
                  <span>Start Over</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {step > 1 && step <= TOTAL_STEPS && (
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={isSubmitting}
              className="group/button text-muted-foreground cursor-pointer flex items-center gap-1.5"
            >
              <AnimatedArrowLeft size={14} />
              <span>Back</span>
            </Button>

            {step >= 4 && (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="group/button cursor-pointer flex items-center gap-2"
              >
                {step === TOTAL_STEPS ? (
                  isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <AnimatedSend size={14} />
                    </>
                  )
                ) : (
                  <>
                    <span>Next Step</span>
                    <AnimatedArrowRight size={14} />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
