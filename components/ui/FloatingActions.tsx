"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { trackMeta } from "@/lib/meta/track";

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
    "https://wa.me/971524145668?text=Hello%20Terrain%20Business%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20your%20digital%20services.";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating WhatsApp CTA */}
      <div className="relative group">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-3 w-[calc(100vw-2rem)] sm:w-64 max-w-xs p-3.5 bg-terrain-nearBlack/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-terrain-accentLight animate-pulse" />
                  Terrain Strategy Team
                </span>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="text-terrain-midGrey hover:text-white p-1"
                  aria-label="Close Tooltip"
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
          onClick={() =>
            trackMeta("Contact", {
              customData: { content_name: "WhatsApp Floating CTA" },
            })
          }
          className="group relative flex items-center gap-2.5 sm:gap-3 bg-terrain-nearBlack/90 backdrop-blur-xl border border-white/20 hover:border-terrain-accentLight text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(77,38,129,0.6)] transition-all duration-300 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing White Status Dot */}
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-white" />
          </span>

          {/* White WhatsApp SVG Logo */}
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white group-hover:scale-110 transition-transform fill-white shrink-0 sm:w-5 sm:h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 2a10 10 0 0 0-8.625 15.08L2 22l4.98-1.306A10 10 0 1 0 12 2z" />
          </svg>

          <span className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline-block text-white whitespace-nowrap">
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
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(77,38,129,0.8)] transition-all duration-300 active:scale-90"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={18} className="stroke-[2.5] sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
