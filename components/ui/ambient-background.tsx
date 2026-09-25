import { cn } from "@/lib/utils";

export function AmbientBackground({ className }: { className?: string }) {
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
      <div className="absolute top-0 left-[-10%] w-[80vw] h-[1200px] max-w-[1200px] bg-[#F3EBF9]/60 rounded-full blur-[150px] opacity-90" />
      <div className="absolute top-[5%] right-[-10%] w-[60vw] h-[1000px] max-w-[900px] bg-[#FAF0F6]/70 rounded-full blur-[150px] opacity-80" />
      
      {/* 2. What We Build -> Selected Work (15% to 40%) */}
      <div className="absolute top-[20%] left-[10%] w-[70vw] h-[1400px] max-w-[1000px] bg-[#EBEBFF]/50 rounded-full blur-[150px] opacity-70" />
      <div className="absolute top-[30%] right-[0%] w-[60vw] h-[1200px] max-w-[900px] bg-[#FCE4EC]/50 rounded-full blur-[150px] opacity-80" />

      {/* 3. How We Work -> Philosophy (40% to 65%) */}
      <div className="absolute top-[45%] left-[-5%] w-[80vw] h-[1300px] max-w-[1100px] bg-[#F3E8FF]/50 rounded-full blur-[150px] opacity-80" />
      <div className="absolute top-[55%] right-[10%] w-[60vw] h-[1200px] max-w-[900px] bg-[#FCE7F3]/40 rounded-full blur-[150px] opacity-70" />

      {/* 4. Tech Stack -> FAQ -> CTA (65% to 100%) */}
      <div className="absolute top-[70%] left-[10%] w-[70vw] h-[1400px] max-w-[1000px] bg-[#EBEBFF]/45 rounded-full blur-[150px] opacity-70" />
      <div className="absolute top-[85%] right-[-5%] w-[80vw] h-[1200px] max-w-[1100px] bg-[#FAF0F6]/60 rounded-full blur-[150px] opacity-80" />
      
      {/* Subtle global noise/dot pattern */}
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
