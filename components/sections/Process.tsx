"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const processSteps = [
  {
    id: "01",
    title: "DISCOVER",
    desc: "Understand the organisation, users, challenges, market and business opportunities through research and focused exploration."
  },
  {
    id: "02",
    title: "DIRECTION",
    desc: "Translate research into a clear strategic direction, project framework, priorities and measurable objectives."
  },
  {
    id: "03",
    title: "DESIGN",
    desc: "Transform the strategy into intuitive interfaces, digital products, visual systems and meaningful brand experiences."
  },
  {
    id: "04",
    title: "DISTRIBUTE",
    desc: "Develop, launch, optimise and scale the final solution across the required platforms and customer touchpoints."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} id="process" className="relative h-[400vh] bg-terrain-nearBlack">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
               backgroundSize: '100px 100px' 
             }} 
        />

        {/* Desktop Horizontal Scroll */}
        <motion.div 
          style={{ x: xDesktop }}
          className="hidden md:flex h-full w-[400vw]"
        >
          {processSteps.map((step, index) => (
            <div key={step.id} className="w-[100vw] h-full flex flex-col justify-center px-12 lg:px-24 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
              
              <div className="relative z-10 grid grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-terrain-pureWhite text-8xl lg:text-[10rem] font-heading font-bold opacity-10 tracking-tighter mb-4">
                    {step.id}
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-terrain-pureWhite mb-8 tracking-tight">
                    {step.title}
                  </h3>
                </div>
                
                <div className="pl-12 border-l border-terrain-midGrey">
                  <p className="text-lg lg:text-xl text-terrain-softWhite/80 leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Progress Node */}
              <div className="absolute top-1/2 left-[10%] w-4 h-4 bg-terrain-pureWhite -translate-y-1/2 z-20 outline outline-8 outline-terrain-deepBlack rotate-45" />
            </div>
          ))}
        </motion.div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden w-full h-full overflow-y-auto px-6 py-24 flex flex-col gap-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-terrain-pureWhite" />
            <span className="font-heading uppercase tracking-widest text-sm font-medium">Process</span>
          </div>
          
          {processSteps.map((step) => (
            <div key={step.id} className="relative pl-8 border-l border-white/20">
              <div className="absolute top-0 left-0 w-2 h-2 bg-terrain-pureWhite -translate-x-[5px] rotate-45" />
              <div className="text-terrain-midGrey text-xl font-heading mb-2">{step.id}</div>
              <h3 className="text-2xl sm:text-3xl font-heading text-terrain-pureWhite mb-4">{step.title}</h3>
              <p className="text-base sm:text-lg text-terrain-softWhite/80 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
