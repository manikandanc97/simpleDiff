import { cn } from "@/lib/utils";
import React from "react";

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
        "absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#fdfbfd]",
        className
      )}
    >
      {/* 1. Fluid Background Blobs (Soft Waves) */}
      {/* Top Section */}
      <div className="absolute top-[-5%] left-[-10%] w-[80vw] h-[600px] bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-[40%_60%_70%_30%] blur-[80px] opacity-80 rotate-12" />
      <div className="absolute top-[5%] right-[-15%] w-[70vw] h-[700px] bg-gradient-to-bl from-pink-200/50 to-purple-100/30 rounded-[60%_40%_30%_70%] blur-[90px] opacity-70 -rotate-12" />
      
      {/* Middle Section */}
      <div className="absolute top-[35%] left-[5%] w-[85vw] h-[800px] bg-gradient-to-tr from-blue-100/40 to-purple-200/40 rounded-[50%_50%_40%_60%] blur-[100px] opacity-60 rotate-45" />
      <div className="absolute top-[45%] right-[5%] w-[75vw] h-[700px] bg-gradient-to-tl from-pink-200/40 to-orange-50/30 rounded-[40%_60%_70%_30%] blur-[80px] opacity-70 -rotate-12" />

      {/* Bottom Section */}
      <div className="absolute top-[75%] left-[-10%] w-[90vw] h-[800px] bg-gradient-to-tr from-purple-200/50 to-blue-100/30 rounded-[60%_40%_30%_70%] blur-[100px] opacity-70 rotate-12" />
      <div className="absolute top-[85%] right-[-5%] w-[80vw] h-[600px] bg-gradient-to-bl from-pink-200/50 to-purple-100/40 rounded-[50%_50%_60%_40%] blur-[80px] opacity-80 -rotate-6" />

      {/* 2. Delicate Dashed and Solid Sweeping Lines */}
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

      {/* 3. Dot Grids */}
      {dotGrids.map((pos, i) => (
        <div 
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

      {/* 4. Large 3D Spheres (Pearls) */}
      {orbs.map((orb, i) => (
        <div
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

      {/* 5. Tiny Scattered Spheres */}
      {tinyOrbs.map((orb, i) => (
        <div
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
      
      {/* 6. Subtle Global Noise Texture for Softness */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
