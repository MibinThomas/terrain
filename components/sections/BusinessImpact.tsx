"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const outcomes = [
  "Clearer digital direction",
  "Stronger brand consistency",
  "More intuitive customer journeys",
  "Scalable technology foundations",
  "Efficient digital operations",
  "Future-ready product ecosystems"
];

export default function BusinessImpact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeNodes, setActiveNodes] = useState(0);

  return (
    <section className="py-32 bg-terrain-deepBlack border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-terrain-pureWhite mb-6 tracking-tight">MEASURABLE IMPACT</h2>
          <p className="text-terrain-midGrey text-lg">We deliver qualitative outcomes that build an evolving, structured business landscape.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onAnimationComplete={() => setActiveNodes(prev => Math.max(prev, index + 1))}
              className="border border-white/10 bg-terrain-nearBlack p-8 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-3 h-3 transition-colors duration-500 ${activeNodes > index ? 'bg-terrain-pureWhite' : 'bg-terrain-midGrey/30'}`} />
                <div className="text-terrain-midGrey font-heading text-xs tracking-widest">OUTCOME {index + 1}</div>
              </div>
              <p className="text-terrain-softWhite text-xl font-light group-hover:text-terrain-pureWhite transition-colors">
                {outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Abstract Background Landscape */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <svg viewBox="0 0 1000 400" className="w-full h-full object-cover">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M0 ${300 - i * 40} Q250 ${200 + (i%2 === 0 ? 50 : -50)} 500 ${250 - i * 20} T1000 ${300 - i * 30}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={activeNodes > i ? "1.5" : "0.5"}
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={activeNodes > i ? { pathLength: 1, opacity: 1 } : { opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
