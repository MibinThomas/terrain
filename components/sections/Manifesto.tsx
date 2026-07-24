"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-terrain-deepBlack overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-2 h-2 bg-terrain-pureWhite" />
            <span className="font-heading uppercase tracking-widest text-sm font-medium">Manifesto</span>
          </motion.div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter text-terrain-pureWhite">
            WE BUILD SYSTEMS,<br />
            <span className="text-terrain-midGrey">NOT JUST SCREENS.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48 relative">
          
          {/* Connecting Path Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-terrain-pureWhite"
              style={{ height: useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]) }}
            />
          </div>

          <motion.div style={{ y: y1 }} className="md:w-1/2 md:pr-16 self-start">
            <span className="text-terrain-midGrey text-sm font-heading tracking-widest block mb-4 border-b border-white/10 pb-4">01</span>
            <p className="text-2xl md:text-3xl leading-relaxed text-terrain-softWhite font-light">
              Terrain Business Solutions is a multidisciplinary creative technology studio dedicated to crafting exceptional digital products and brand experiences.
            </p>
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:w-1/2 md:pl-16 self-end">
            <span className="text-terrain-midGrey text-sm font-heading tracking-widest block mb-4 border-b border-white/10 pb-4 text-right">02</span>
            <p className="text-2xl md:text-3xl leading-relaxed text-terrain-softWhite font-light">
              We combine strategic thinking, user-centred design and modern technology to help organisations innovate with confidence.
            </p>
          </motion.div>

          <motion.div style={{ y: y3 }} className="md:w-1/2 md:pr-16 self-start">
            <span className="text-terrain-midGrey text-sm font-heading tracking-widest block mb-4 border-b border-white/10 pb-4">03</span>
            <p className="text-2xl md:text-3xl leading-relaxed text-terrain-softWhite font-light">
              Every project begins with understanding people, their needs, behaviours and goals. From research and strategy to design, development and launch, Terrain delivers solutions that are functional, scalable and visually remarkable.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
