"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FaqJsonLd } from "@/components/seo/JsonLd";

const FAQS = [
  {
    question: "What digital services does Terrain Business Solutions provide?",
    answer:
      "Terrain provides end-to-end digital engineering and design services, including custom Web Application Development, UI/UX Product Design, Brand Identity Systems, E-Commerce platforms, and bespoke AI/Software automation.",
  },
  {
    question: "Where is Terrain located, and which regions do you serve?",
    answer:
      "Terrain is headquartered in Dubai, United Arab Emirates, serving enterprise clients, high-growth startups, and brands across the UAE, Saudi Arabia, Qatar, Kuwait, and global markets.",
  },
  {
    question: "How long does a typical digital project take from start to launch?",
    answer:
      "Project timelines vary by scope. Landing pages and brand identity projects typically take 2-4 weeks, while complex SaaS platforms or custom e-commerce applications average 6-12 weeks with iterative sprint milestones.",
  },
  {
    question: "Do you offer custom tech stacks like Next.js, React, and AI integrations?",
    answer:
      "Yes. We specialize in high-performance modern architectures using Next.js, React, TypeScript, TailwindCSS, and custom AI/LLM integrations tailored for maximum performance and scalable security.",
  },
  {
    question: "How do I start a new project or request a proposal?",
    answer:
      "You can reach out directly via our contact form or email us at hello@terrainbusiness.com. Our team responds within 24 hours to schedule an initial discovery consultation.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-terrain-nearBlack relative border-t border-white/5 overflow-hidden" id="faq">
      <FaqJsonLd faqs={FAQS} />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-terrain-midGrey border border-terrain-accent/60 px-3.5 py-1.5 rounded-full mb-4">
            <HelpCircle size={14} className="text-white" />
            Frequently Asked Questions
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-terrain-softWhite">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-terrain-midGrey text-xs sm:text-sm mt-3">
            Everything you need to know about partnering with Terrain Business Solutions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white/[0.04] border-terrain-accent shadow-[0_0_30px_rgba(77,38,129,0.35)]"
                    : "bg-white/[0.02] border-white/5 hover:border-terrain-accent/50"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:py-5 sm:px-6 text-left flex items-center justify-between gap-3 font-heading font-semibold text-terrain-softWhite text-sm sm:text-base md:text-lg focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-terrain-midGrey transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-terrain-accentLight" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6 text-terrain-midGrey text-xs sm:text-sm leading-relaxed border-t border-terrain-accent/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
