"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Zap, Globe2 } from "lucide-react";

const STATS = [
  { val: "150+", label: "Digital Products Delivered", Icon: Zap },
  { val: "98%", label: "Client Satisfaction Rate", Icon: ShieldCheck },
  { val: "5+", label: "Years Regional Leadership", Icon: Award },
  { val: "GCC & UAE", label: "Enterprise Footprint", Icon: Globe2 },
];

const TECH_BADGES = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Three.js",
  "TailwindCSS",
  "Payload CMS",
  "Framer Motion",
  "AI & Python APIs",
];

export default function TrustBadges() {
  return (
    <section className="py-16 sm:py-20 bg-terrain-deepBlack border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {STATS.map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 text-center hover:border-white/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-heading font-extrabold text-xl sm:text-3xl text-terrain-softWhite mb-1">
                  {item.val}
                </h3>
                <p className="text-[11px] sm:text-xs text-terrain-midGrey uppercase tracking-wider">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Banner */}
        <div className="text-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-terrain-midGrey mb-4 sm:mb-6">
            Powered by Enterprise-Grade Technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="bg-white/[0.03] border border-white/10 text-terrain-softWhite text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
