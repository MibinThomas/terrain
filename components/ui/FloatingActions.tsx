"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappUrl =
    "https://wa.me/97140000000?text=Hello%20Terrain%20Business%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20digital%20services.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating WhatsApp CTA */}
      <div className="relative group">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-3 w-64 p-3.5 bg-terrain-nearBlack/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Terrain Strategy Team
                </span>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="text-terrain-midGrey hover:text-white"
                >
                  <X size={12} />
                </button>
              </div>
              <p className="text-terrain-midGrey text-[11px] leading-relaxed">
                Connect directly on WhatsApp for instant project discovery & consultation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center gap-3 bg-terrain-nearBlack/90 backdrop-blur-xl border border-white/20 hover:border-white/50 text-white px-4 py-3 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(255,255,255,0.15)] transition-all duration-300 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing Status Dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>

          <MessageCircle size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />

          <span className="font-heading text-xs font-bold uppercase tracking-wider hidden sm:inline-block text-white">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300 active:scale-90"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={20} className="stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
