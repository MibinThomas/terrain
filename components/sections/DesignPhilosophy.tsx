"use client";
import { motion } from "framer-motion";

export default function DesignPhilosophy() {
  const text = "INTELLIGENT DIGITAL EXPERIENCES.";
  const words = text.split(" ");

  return (
    <section className="py-48 bg-terrain-pureWhite text-terrain-deepBlack relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-2 bg-terrain-deepBlack" />
            <span className="font-heading uppercase tracking-widest text-sm font-bold">Philosophy</span>
          </div>

          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-16 uppercase">
            DESIGNING <br/>
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-4">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-terrain-deepBlack/10 pt-16">
            <p className="text-2xl md:text-3xl leading-snug font-light">
              We design digital experiences that feel <span className="font-medium font-heading">intuitive</span> from the first interaction.
            </p>
            <p className="text-lg md:text-xl text-terrain-deepBlack/70 leading-relaxed">
              Every screen is built on a foundation of user research and iterative testing, so the interface does not only look good; it guides people naturally towards their goal. Functional, scalable, and visually remarkable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
