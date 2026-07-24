"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const TerrainVisual = dynamic(() => import("@/components/three/TerrainVisual"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-terrain-deepBlack">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <TerrainVisual />
        {/* Vignette/Gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-terrain-deepBlack via-terrain-deepBlack/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-terrain-deepBlack/80 via-transparent to-terrain-deepBlack/80 pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 pt-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[1px] w-8 bg-terrain-midGrey" />
            <span className="font-heading uppercase tracking-[0.2em] text-xs text-terrain-midGrey font-medium">Terrain Business Solutions</span>
            <div className="h-[1px] w-8 bg-terrain-midGrey" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-terrain-pureWhite mb-8"
          >
            BUILDING SMARTER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-terrain-pureWhite to-terrain-midGrey">
              BUSINESS LANDSCAPES.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-terrain-softWhite/80 max-w-2xl mb-6 leading-relaxed"
          >
            We transform ideas, technology, and strategy into intelligent business solutions designed for sustainable growth and measurable impact.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-terrain-midGrey max-w-xl mb-12 leading-relaxed"
          >
            We combine industry insight with practical execution to build efficient, scalable, and future-ready business ecosystems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <a
              href="#contact"
              data-interactive="true"
              className="px-8 py-4 bg-terrain-pureWhite text-terrain-deepBlack font-semibold text-sm hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-center"
            >
              Start a Project
            </a>
            <a
              href="#capabilities"
              data-interactive="true"
              className="px-8 py-4 border border-terrain-midGrey text-terrain-pureWhite font-semibold text-sm hover:border-terrain-pureWhite hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Explore Our Capabilities
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <div className="text-[10px] uppercase tracking-widest text-terrain-midGrey font-heading">Scroll</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-terrain-midGrey to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-terrain-pureWhite"
          />
        </div>
      </motion.div>
    </section>
  );
}
