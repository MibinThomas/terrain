"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Foundations() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background visual transformations based on scroll
  const opacityIdeas = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const opacityTech = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const opacityStrat = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-terrain-deepBlack hidden md:block">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* IDEAS State */}
        <motion.div style={{ opacity: opacityIdeas }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Particles representation */}
             {Array.from({length: 30}).map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-1 bg-terrain-midGrey rounded-full"
                  initial={{ x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 }}
                  animate={{ 
                    x: Math.random() * 500 - 250, 
                    y: Math.random() * 500 - 250 
                  }}
                  transition={{ repeat: Infinity, duration: 5 + Math.random() * 5, repeatType: "reverse" }}
                />
             ))}
          </div>
          <div className="relative z-10 text-center">
            <h2 className="font-heading text-4xl md:text-6xl text-terrain-pureWhite mb-4 tracking-tight">IDEAS</h2>
            <p className="text-terrain-midGrey text-lg md:text-xl max-w-md mx-auto px-6">Discovery and early-stage thinking. Unstructured forms seeking direction.</p>
          </div>
        </motion.div>

        {/* TECHNOLOGY State */}
        <motion.div style={{ opacity: opacityTech }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="absolute inset-0 flex items-center justify-center">
             {/* Grid network representation */}
             <div className="w-[600px] h-[600px] border border-white/10 grid grid-cols-4 grid-rows-4 relative">
                {Array.from({length: 16}).map((_, i) => (
                  <div key={i} className="border border-white/5 relative">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.8, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                      className="absolute -top-1 -left-1 w-2 h-2 bg-terrain-softWhite" 
                    />
                  </div>
                ))}
             </div>
          </div>
          <div className="relative z-10 text-center bg-terrain-deepBlack/80 p-8">
            <h2 className="font-heading text-4xl md:text-6xl text-terrain-pureWhite mb-4 tracking-tight">TECHNOLOGY</h2>
            <p className="text-terrain-midGrey text-lg md:text-xl max-w-md mx-auto px-6">Structured digital grids. Connected nodes forming scalable systems.</p>
          </div>
        </motion.div>

        {/* STRATEGY State */}
        <motion.div style={{ opacity: opacityStrat }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="absolute inset-0 flex items-center justify-center">
             {/* Converging route representation */}
             <svg width="600" height="600" viewBox="0 0 600 600" className="opacity-50">
                <motion.path 
                  d="M100 500 L300 100 L500 500" 
                  fill="none" 
                  stroke="#F1F2F3" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
                <circle cx="300" cy="100" r="6" fill="#F1F2F3" />
             </svg>
             <div className="absolute top-[100px] left-[300px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-terrain-pureWhite flex items-center justify-center rotate-45">
               <div className="w-2 h-2 bg-terrain-pureWhite" />
             </div>
          </div>
          <div className="relative z-10 text-center mt-64">
            <h2 className="font-heading text-4xl md:text-6xl text-terrain-pureWhite mb-4 tracking-tight">STRATEGY</h2>
            <p className="text-terrain-midGrey text-lg md:text-xl max-w-md mx-auto px-6">Paths converge. One clear direction highlighted for sustainable growth.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
