"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function AmbientBackground({ className }: { className?: string }) {
  // 3D Spheres (Pearls) of varying sizes and colors
  const orbs = [
    { top: "-2%", left: "-5%", size: "w-40 h-40", color: "purple" },
    { top: "5%", right: "-2%", size: "w-32 h-32", color: "pink" },
    { top: "15%", right: "8%", size: "w-24 h-24", color: "white" },
    { top: "25%", left: "-6%", size: "w-48 h-48", color: "blue" },
    { top: "40%", left: "4%", size: "w-28 h-28", color: "pink" },
    { top: "35%", right: "-4%", size: "w-36 h-36", color: "purple" },
    { top: "50%", right: "2%", size: "w-20 h-20", color: "white" },
    { top: "60%", left: "-8%", size: "w-44 h-44", color: "purple" },
    { top: "75%", right: "-10%", size: "w-56 h-56", color: "pink" },
    { top: "85%", left: "-4%", size: "w-40 h-40", color: "blue" },
    { top: "95%", right: "5%", size: "w-32 h-32", color: "purple" },
  ];

  // Tiny scattered dots/spheres
  const tinyOrbs = [
    { top: "8%", left: "15%", color: "#fca5a5", size: "w-3 h-3" },
    { top: "12%", right: "25%", color: "#c084fc", size: "w-2 h-2" },
    { top: "22%", left: "22%", color: "#fca5a5", size: "w-4 h-4" },
    { top: "28%", right: "12%", color: "#fca5a5", size: "w-2 h-2" },
    { top: "45%", left: "30%", color: "#a78bfa", size: "w-3 h-3" },
    { top: "55%", right: "15%", color: "#fca5a5", size: "w-3 h-3" },
    { top: "65%", left: "18%", color: "#93c5fd", size: "w-2 h-2" },
    { top: "75%", right: "20%", color: "#fca5a5", size: "w-4 h-4" },
    { top: "88%", left: "25%", color: "#c084fc", size: "w-3 h-3" },
    { top: "92%", right: "18%", color: "#fca5a5", size: "w-4 h-4" },
  ];

  const dotGrids = [
    { top: "5%", right: "10%" },
    { top: "15%", left: "5%" },
    { top: "30%", right: "5%" },
    { top: "45%", left: "8%" },
    { top: "65%", right: "8%" },
    { top: "80%", left: "10%" },
    { top: "90%", right: "12%" },
  ];

  const getOrbGradient = (color: string) => {
    switch (color) {
      case "purple":
        return "radial-gradient(circle at 30% 30%, #ffffff 0%, #e9d5ff 25%, #c084fc 70%, #9333ea 100%)";
      case "pink":
        return "radial-gradient(circle at 30% 30%, #ffffff 0%, #fbcfe8 25%, #f472b6 70%, #db2777 100%)";
      case "blue":
        return "radial-gradient(circle at 30% 30%, #ffffff 0%, #dbeafe 25%, #93c5fd 70%, #3b82f6 100%)";
      case "white":
      default:
        return "radial-gradient(circle at 30% 30%, #ffffff 0%, #f3f4f6 30%, #d1d5db 80%, #9ca3af 100%)";
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    >
      {/* 
        This container spans the ENTIRE height of the page.
        We place extremely large, highly blurred gradient shapes 
        at various percentages of the page height to create a continuous atmosphere.
      */}
      
      {/* 1. Hero -> What We Build (0% to 20%) */}
      <motion.div 
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[-10%] w-[80vw] h-[1200px] max-w-[1200px] bg-[#F3EBF9]/60 rounded-full blur-[150px] opacity-90" 
      />
      <motion.div 
        animate={{ y: [20, -20, 20], x: [10, -10, 10], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[5%] right-[-10%] w-[60vw] h-[1000px] max-w-[900px] bg-[#FAF0F6]/70 rounded-full blur-[150px] opacity-80" 
      />
      
      {/* 2. What We Build -> Selected Work (15% to 40%) */}
      <motion.div 
        animate={{ y: [-25, 25, -25], x: [15, -15, 15], scale: [1, 1.02, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] left-[10%] w-[70vw] h-[1400px] max-w-[1000px] bg-[#EBEBFF]/50 rounded-full blur-[150px] opacity-70" 
      />
      <motion.div 
        animate={{ y: [25, -25, 25], x: [-15, 15, -15], scale: [1, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[30%] right-[0%] w-[60vw] h-[1200px] max-w-[900px] bg-[#FCE4EC]/50 rounded-full blur-[150px] opacity-80" 
      />

      {/* 3. How We Work -> Philosophy (40% to 65%) */}
      <motion.div 
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[45%] left-[-5%] w-[80vw] h-[1300px] max-w-[1100px] bg-[#F3E8FF]/50 rounded-full blur-[150px] opacity-80" 
      />
      <motion.div 
        animate={{ y: [30, -30, 30], x: [20, -20, 20], scale: [1, 1.06, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[55%] right-[10%] w-[60vw] h-[1200px] max-w-[900px] bg-[#FCE7F3]/40 rounded-full blur-[150px] opacity-70" 
      />

      {/* 4. Tech Stack -> FAQ -> CTA (65% to 100%) */}
      <motion.div 
        animate={{ y: [-15, 15, -15], x: [-20, 20, -20], scale: [1, 1.03, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-[70%] left-[10%] w-[70vw] h-[1400px] max-w-[1000px] bg-[#EBEBFF]/45 rounded-full blur-[150px] opacity-70" 
      />
      <motion.div 
        animate={{ y: [15, -15, 15], x: [10, -10, 10], scale: [1, 1.05, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
        className="absolute top-[85%] right-[-5%] w-[80vw] h-[1200px] max-w-[1100px] bg-[#FAF0F6]/60 rounded-full blur-[150px] opacity-80" 
      />

      {/* 5. Delicate Dashed and Solid Sweeping Lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Dashed wave 1 */}
        <path d="M-10,20 C 30,10 70,30 110,20" fill="none" stroke="#d8b4e2" strokeWidth="0.2" strokeDasharray="1 1" />
        {/* Solid thin wave 2 */}
        <path d="M-10,35 C 40,45 60,15 110,25" fill="none" stroke="#fbcfe8" strokeWidth="0.1" />
        {/* Dashed wave 3 */}
        <path d="M-10,60 C 25,50 75,70 110,60" fill="none" stroke="#c4b5fd" strokeWidth="0.2" strokeDasharray="1 1" />
        {/* Solid thin wave 4 */}
        <path d="M-10,85 C 30,95 80,75 110,85" fill="none" stroke="#fbcfe8" strokeWidth="0.1" />
      </svg>

      {/* 6. Dot Grids */}
      {dotGrids.map((pos, i) => (
        <motion.div 
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4 + i % 3, repeat: Infinity, ease: "easeInOut" }}
          key={`dot-${i}`}
          className="absolute w-32 h-32 opacity-20 mix-blend-multiply"
          style={{
            top: pos.top,
            ...(pos.left ? { left: pos.left } : { right: pos.right }),
            backgroundImage: "radial-gradient(circle at 2px 2px, #8b5cf6 1.5px, transparent 0)",
            backgroundSize: "12px 12px",
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 70%)',
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 70%)'
          }}
        />
      ))}

      {/* 7. Large 3D Spheres (Pearls) */}
      {orbs.map((orb, i) => (
        <motion.div
          animate={{ 
            y: [-15 + (i % 5), 15 - (i % 5), -15 + (i % 5)],
            x: [(i % 2 === 0 ? -10 : 10), (i % 2 === 0 ? 10 : -10), (i % 2 === 0 ? -10 : 10)],
          }}
          transition={{ duration: 10 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          key={`orb-${i}`}
          className={cn(
            "absolute rounded-full",
            orb.size
          )}
          style={{
            top: orb.top,
            ...(orb.left ? { left: orb.left } : { right: orb.right }),
            background: getOrbGradient(orb.color),
            boxShadow: "0 20px 40px rgba(0,0,0,0.08), inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.8)",
            opacity: 0.95,
          }}
        />
      ))}

      {/* 8. Tiny Scattered Spheres */}
      {tinyOrbs.map((orb, i) => (
        <motion.div
          animate={{ 
            y: [-10 + (i % 3), 10 - (i % 3), -10 + (i % 3)],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          key={`tiny-${i}`}
          className={cn(
            "absolute rounded-full",
            orb.size
          )}
          style={{
            top: orb.top,
            ...(orb.left ? { left: orb.left } : { right: orb.right }),
            backgroundColor: orb.color,
            boxShadow: `0 2px 4px ${orb.color}60`,
            opacity: 0.8,
          }}
        />
      ))}
      
      {/* 9. Subtle Global Noise Texture for Softness */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 10. Subtle global noise/dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />
    </div>
  );
}
