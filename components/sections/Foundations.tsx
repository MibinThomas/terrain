"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Cpu, Compass } from "lucide-react";

export default function Foundations() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring physics tuned for mobile and desktop stability
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // --- STAGE 1: IDEAS (0.0 to 0.28) ---
  const opacityIdeas = useTransform(smoothProgress, [0, 0.18, 0.28], [1, 1, 0]);
  const scaleIdeas = useTransform(smoothProgress, [0, 0.18, 0.28], [1, 1, 0.95]);
  const yIdeas = useTransform(smoothProgress, [0, 0.18, 0.28], [0, 0, -30]);

  // --- STAGE 2: TECHNOLOGY (0.24 to 0.68) ---
  const opacityTech = useTransform(smoothProgress, [0.24, 0.36, 0.56, 0.68], [0, 1, 1, 0]);
  const scaleTech = useTransform(smoothProgress, [0.24, 0.36, 0.56, 0.68], [0.95, 1, 1, 0.95]);
  const yTech = useTransform(smoothProgress, [0.24, 0.36, 0.56, 0.68], [30, 0, 0, -30]);

  // --- STAGE 3: STRATEGY (0.64 to 1.0) ---
  const opacityStrat = useTransform(smoothProgress, [0.64, 0.82, 1], [0, 1, 1]);
  const scaleStrat = useTransform(smoothProgress, [0.64, 0.82, 1], [0.95, 1, 1]);
  const yStrat = useTransform(smoothProgress, [0.64, 0.82, 1], [30, 0, 0]);

  return (
    <section ref={containerRef} className="relative h-[240vh] bg-terrain-deepBlack" id="foundations">
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.10) 0%, rgba(77, 38, 129, 0.22) 38%, rgba(8, 8, 8, 0) 70%)",
          }}
        />

        {/* Floating Stage Indicator Bar */}
        <div className="absolute top-16 sm:top-28 z-30 flex items-center justify-center px-4 w-full">
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto no-scrollbar shadow-lg">
            {[
              { label: "01 Ideas", icon: Sparkles },
              { label: "02 Tech", icon: Cpu },
              { label: "03 Strategy", icon: Compass },
            ].map((stg) => {
              const Icon = stg.icon;
              return (
                <div
                  key={stg.label}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-wider text-terrain-midGrey flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Icon size={13} className="text-white shrink-0" />
                  <span>{stg.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================== */}
        {/* STAGE 1: IDEAS */}
        {/* =================================================== */}
        <motion.div
          style={{ opacity: opacityIdeas, scale: scaleIdeas, y: yIdeas }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 transform-gpu"
        >
          {/* Ambient particles (Desktop optimized) */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none overflow-hidden">
            {[
              { top: "25%", left: "30%", size: 6, duration: 6, delay: 0 },
              { top: "65%", left: "20%", size: 4, duration: 8, delay: 1 },
              { top: "40%", left: "75%", size: 8, duration: 7, delay: 0.5 },
              { top: "80%", left: "60%", size: 5, duration: 9, delay: 1.5 },
            ].map((pt, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                style={{
                  top: pt.top,
                  left: pt.left,
                  width: pt.size,
                  height: pt.size,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: pt.duration,
                  repeat: Infinity,
                  delay: pt.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Glowing central orb */}
            <div className="w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-terrain-accent/30 blur-[80px] absolute pointer-events-none" />
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center max-w-3xl w-full mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/20 p-6 sm:px-16 sm:py-12 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.08)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 font-semibold">
              <Sparkles size={13} /> Discovery Phase
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-terrain-softWhite mb-3 sm:mb-4 tracking-tight">
              IDEAS
            </h2>
            <p className="text-terrain-midGrey text-xs sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Discovery and early-stage thinking. Unstructured vision seeking direction, pattern recognition, and form.
            </p>
          </div>
        </motion.div>

        {/* =================================================== */}
        {/* STAGE 2: TECHNOLOGY */}
        {/* =================================================== */}
        <motion.div
          style={{ opacity: opacityTech, scale: scaleTech, y: yTech }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 transform-gpu"
        >
          {/* Cybernetic grid network */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[260px] h-[260px] sm:w-[500px] sm:h-[500px] border border-white/15 grid grid-cols-4 grid-rows-4 relative rounded-2xl overflow-hidden bg-white/[0.01]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-white/10 relative flex items-center justify-center">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${i % 5 === 0 ? "bg-terrain-accentLight shadow-[0_0_12px_rgba(140,78,202,1)]" : "bg-white/60"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center max-w-3xl w-full mx-auto bg-terrain-deepBlack/95 backdrop-blur-xl border border-white/20 p-6 sm:px-16 sm:py-12 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.08)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 font-semibold">
              <Cpu size={13} /> Engineering Matrix
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-5xl lg:text-6xl text-terrain-softWhite mb-3 sm:mb-4 tracking-tight">
              TECHNOLOGY
            </h2>
            <p className="text-terrain-midGrey text-xs sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Structured digital grids. Connected nodes forming scalable systems, robust architecture, and high-speed execution.
            </p>
          </div>
        </motion.div>

        {/* =================================================== */}
        {/* STAGE 3: STRATEGY */}
        {/* =================================================== */}
        <motion.div
          style={{ opacity: opacityStrat, scale: scaleStrat, y: yStrat }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 transform-gpu"
        >
          {/* Laser trajectory SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="600" height="600" viewBox="0 0 600 600" className="w-full h-full max-w-[450px] sm:max-w-[600px] opacity-60">
              <path
                d="M 100 500 L 300 200 L 500 500"
                fill="none"
                stroke="#8C4ECA"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle cx="300" cy="200" r="8" fill="#4D2681" />
              <circle cx="300" cy="200" r="4" fill="#8C4ECA" />
            </svg>
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center max-w-3xl w-full mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/25 p-6 sm:px-16 sm:py-12 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.12)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 font-semibold">
              <Compass size={13} /> Clear Direction
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-terrain-softWhite mb-3 sm:mb-4 tracking-tight">
              STRATEGY
            </h2>
            <p className="text-terrain-midGrey text-xs sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Paths converge. One clear direction highlighted for sustainable business growth, market distinction, and lasting impact.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
