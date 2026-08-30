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

  // Smooth scroll spring physics for buttery smooth motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // --- STAGE 1: IDEAS (0.0 to 0.35) ---
  const opacityIdeas = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const scaleIdeas = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0.9]);
  const yIdeas = useTransform(smoothProgress, [0, 0.25, 0.35], [0, 0, -50]);
  const blurIdeas = useTransform(smoothProgress, [0, 0.25, 0.35], ["blur(0px)", "blur(0px)", "blur(10px)"]);

  // --- STAGE 2: TECHNOLOGY (0.3 to 0.7) ---
  const opacityTech = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], [0, 1, 1, 0]);
  const scaleTech = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], [0.9, 1, 1, 0.9]);
  const yTech = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], [50, 0, 0, -50]);
  const blurTech = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // --- STAGE 3: STRATEGY (0.65 to 1.0) ---
  const opacityStrat = useTransform(smoothProgress, [0.65, 0.78, 1], [0, 1, 1]);
  const scaleStrat = useTransform(smoothProgress, [0.65, 0.78, 1], [0.9, 1, 1]);
  const yStrat = useTransform(smoothProgress, [0.65, 0.78, 1], [50, 0, 0]);
  const blurStrat = useTransform(smoothProgress, [0.65, 0.78, 1], ["blur(10px)", "blur(0px)", "blur(0px)"]);

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-terrain-deepBlack" id="foundations">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.15) 0%, rgba(8, 8, 8, 0) 70%)",
          }}
        />

        {/* Floating Stage Indicator Bar */}
        <div className="absolute top-24 sm:top-28 z-30 flex items-center justify-center">
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center gap-1 sm:gap-2">
            {[
              { label: "01 Ideas", icon: Sparkles },
              { label: "02 Tech", icon: Cpu },
              { label: "03 Strategy", icon: Compass },
            ].map((stg) => {
              const Icon = stg.icon;
              return (
                <div
                  key={stg.label}
                  className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-wider text-terrain-midGrey flex items-center gap-1.5 transition-colors"
                >
                  <Icon size={13} className="text-purple-400" />
                  <span>{stg.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================== */}
        {/* STAGE 1: IDEAS (Nebula Particles & Unstructured Form) */}
        {/* =================================================== */}
        <motion.div
          style={{ opacity: opacityIdeas, scale: scaleIdeas, y: yIdeas, filter: blurIdeas }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          {/* Animated floating particles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {[
              { top: "25%", left: "30%", size: 6, duration: 6, delay: 0 },
              { top: "65%", left: "20%", size: 4, duration: 8, delay: 1 },
              { top: "40%", left: "75%", size: 8, duration: 7, delay: 0.5 },
              { top: "80%", left: "60%", size: 5, duration: 9, delay: 1.5 },
              { top: "20%", left: "65%", size: 7, duration: 6.5, delay: 2 },
              { top: "70%", left: "35%", size: 6, duration: 7.5, delay: 0.8 },
            ].map((pt, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-400/60 shadow-[0_0_15px_rgba(157,0,255,0.8)]"
                style={{
                  top: pt.top,
                  left: pt.left,
                  width: pt.size,
                  height: pt.size,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, 15, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [1, 1.3, 1],
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
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-80 h-80 rounded-full bg-purple-600/20 blur-[90px] absolute"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center max-w-xl bg-white/[0.02] backdrop-blur-xl border border-purple-500/20 p-8 sm:p-12 rounded-3xl shadow-[0_0_50px_rgba(157,0,255,0.15)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles size={13} /> Discovery Phase
            </span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-6xl text-terrain-softWhite mb-4 tracking-tight">
              IDEAS
            </h2>
            <p className="text-terrain-midGrey text-base sm:text-lg leading-relaxed">
              Discovery and early-stage thinking. Unstructured vision seeking direction, pattern recognition, and form.
            </p>
          </div>
        </motion.div>

        {/* =================================================== */}
        {/* STAGE 2: TECHNOLOGY (Cybernetic Grid & Node Matrix) */}
        {/* =================================================== */}
        <motion.div
          style={{ opacity: opacityTech, scale: scaleTech, y: yTech, filter: blurTech }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          {/* Cybernetic grid network */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] border border-purple-500/20 grid grid-cols-4 grid-rows-4 relative rounded-2xl overflow-hidden bg-purple-950/10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-purple-500/10 relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: (i % 4) * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(157,0,255,1)]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center max-w-xl bg-terrain-deepBlack/90 backdrop-blur-xl border border-purple-500/30 p-8 sm:p-12 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.15)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full mb-6">
              <Cpu size={13} /> Engineering Matrix
            </span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-6xl text-terrain-softWhite mb-4 tracking-tight">
              TECHNOLOGY
            </h2>
            <p className="text-terrain-midGrey text-base sm:text-lg leading-relaxed">
              Structured digital grids. Connected nodes forming scalable systems, robust architecture, and high-speed execution.
            </p>
          </div>
        </motion.div>

        {/* =================================================== */}
        {/* STAGE 3: STRATEGY (Laser Convergence & Focal Core) */}
        {/* =================================================== */}
        <motion.div
          style={{ opacity: opacityStrat, scale: scaleStrat, y: yStrat, filter: blurStrat }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          {/* Laser trajectory SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="600" height="600" viewBox="0 0 600 600" className="w-full h-full max-w-[600px] opacity-40">
              <motion.path
                d="M 100 500 L 300 200 L 500 500"
                fill="none"
                stroke="#9D00FF"
                strokeWidth="2"
                strokeDasharray="6 6"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="300" cy="200" r="10" fill="#9D00FF" className="animate-ping" />
              <circle cx="300" cy="200" r="5" fill="#ffffff" />
            </svg>
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center max-w-xl bg-white/[0.03] backdrop-blur-xl border border-purple-500/40 p-8 sm:p-12 rounded-3xl shadow-[0_0_60px_rgba(157,0,255,0.25)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full mb-6">
              <Compass size={13} /> Clear Direction
            </span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-6xl text-terrain-softWhite mb-4 tracking-tight">
              STRATEGY
            </h2>
            <p className="text-terrain-midGrey text-base sm:text-lg leading-relaxed">
              Paths converge. One clear direction highlighted for sustainable business growth, market distinction, and lasting impact.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
