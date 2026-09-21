"use client";

import { useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !ref.current) return;

    if (shouldReduceMotion) {
      ref.current.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo deceleration for snappy, premium feel
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, prefix, suffix, duration, delay, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}0{suffix}
    </span>
  );
}
