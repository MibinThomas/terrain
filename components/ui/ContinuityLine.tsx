"use client";
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ContinuityLine() {
  const { scrollYProgress } = useScroll();
  
  // Spring config for smooth drawing
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotY = useTransform(scaleY, [0, 1], ["0vh", "100vh"]);

  return (
    <>
      {/* Background track line */}
      <div className="fixed top-0 left-4 md:left-12 bottom-0 w-[1px] bg-white/10 z-40 pointer-events-none hidden sm:block mix-blend-screen">
        {/* Animated fill line */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-terrain-pureWhite origin-top shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ scaleY, height: "100%" }}
        />
        
        {/* Leading dot/spark */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-terrain-pureWhite rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"
          style={{ top: dotY }}
        />
      </div>
    </>
  );
}
