"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Enquiry form states inside drawer
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "UI/UX Strategy",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Hide header on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  // Lock body scroll and listen for ESC key when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("terrain-menu-change", { detail: { open: true } }));
    } else {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("terrain-menu-change", { detail: { open: false } }));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.dispatchEvent(new CustomEvent("terrain-menu-change", { detail: { open: false } }));
    };
  }, [menuOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", service: "UI/UX Strategy", message: "" });
  };

  const navLinks = [
    { num: "01", name: "About", href: "/about" },
    { num: "02", name: "Services", href: "/services" },
    { num: "03", name: "Creatives", href: "/creatives" },
    { num: "04", name: "Work", href: "/work" },
    { num: "05", name: "Contact", href: "/contact" },
  ];

  const serviceOptions = [
    "UI/UX Strategy",
    "Web Engineering",
    "Custom Software",
    "Brand & Product",
  ];

  // Motion variants for drawer content
  const overlayVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 48px) 48px)",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 48px) 48px)",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const listContainerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30, filter: "blur(10px)" },
    open: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <>
      {/* Top Main Navbar */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden && !menuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled && !menuOpen
            ? "bg-terrain-deepBlack/85 backdrop-blur-xl border-b border-white/10 py-3 sm:py-4 shadow-xl"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center shrink-0"
            data-interactive="true"
          >
            <img
              src="/images/logo/Terrain Vertical White.png"
              alt="Terrain Business Solutions"
              className="h-10 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Action Bar - Properly Aligned on Right */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              data-interactive="true"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terrain-deepBlack bg-terrain-pureWhite px-4 sm:px-5 py-2.5 rounded-full hover:bg-terrain-softWhite hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(140,78,202,0.5)] transition-all duration-300"
            >
              Start a Project
              <span className="w-1.5 h-1.5 rounded-full bg-terrain-accent animate-pulse" />
            </Link>

            {/* Redesigned Modern Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-interactive="true"
              aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="group relative inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-terrain-accentLight/60 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none hover:shadow-[0_0_20px_rgba(140,78,202,0.35)] shrink-0"
            >
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-terrain-softWhite group-hover:text-terrain-pureWhite transition-colors">
                {menuOpen ? "Close" : "Menu"}
              </span>

              {/* Minimalist Dynamic 2-Line Indicator */}
              <div className="relative w-5 h-3.5 flex flex-col justify-between items-end">
                <span
                  className={`block h-[2px] bg-terrain-pureWhite rounded-full transition-all duration-300 origin-center ${
                    menuOpen
                      ? "w-5 translate-y-[6px] rotate-45 bg-terrain-accentLight"
                      : "w-5 group-hover:bg-terrain-accentLight"
                  }`}
                />
                <span
                  className={`block h-[2px] bg-terrain-pureWhite rounded-full transition-all duration-300 origin-center ${
                    menuOpen
                      ? "w-5 -translate-y-[6px] -rotate-45 bg-terrain-accentLight"
                      : "w-3 group-hover:w-5 group-hover:bg-terrain-accentLight"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-terrain-deepBlack/98 backdrop-blur-3xl text-terrain-softWhite flex flex-col justify-between overflow-y-auto selection:bg-terrain-accent selection:text-white"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terrain-accent/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-terrain-accentLight/15 rounded-full blur-[160px] pointer-events-none" />

            {/* Dedicated Top Header inside Drawer - Aligned matching top navbar */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-6 flex items-center justify-between border-b border-white/10 relative z-20 shrink-0">
              {/* Logo inside Drawer */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center shrink-0"
                data-interactive="true"
              >
                <img
                  src="/images/logo/Terrain Vertical White.png"
                  alt="Terrain Business Solutions"
                  className="h-10 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Drawer Close Button - Aligned with Hamburger Trigger Position */}
              <button
                onClick={() => setMenuOpen(false)}
                data-interactive="true"
                aria-label="Close Drawer"
                className="group relative inline-flex items-center gap-3 bg-terrain-pureWhite hover:bg-terrain-softWhite text-terrain-deepBlack px-4 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(140,78,202,0.6)] transition-all duration-300 focus:outline-none shrink-0"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  Close
                </span>
                <div className="relative w-5 h-3.5 flex flex-col justify-center items-center">
                  <span className="block w-5 h-[2px] bg-terrain-deepBlack rounded-full transition-transform duration-300 rotate-45" />
                  <span className="block w-5 h-[2px] bg-terrain-deepBlack rounded-full transition-transform duration-300 -rotate-45 -mt-[2px]" />
                </div>
              </button>
            </div>

            {/* Main Drawer Content */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 my-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Navigation Column */}
                <motion.div
                  variants={listContainerVariants}
                  initial="closed"
                  animate="open"
                  className="lg:col-span-6 flex flex-col gap-3 sm:gap-4"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-terrain-midGrey mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-terrain-accentLight" />
                    Navigation Directory
                  </span>

                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.name} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          data-interactive="true"
                          className="group relative inline-flex items-baseline gap-4 sm:gap-6 py-1.5 sm:py-2 transition-all duration-300"
                        >
                          {/* Number Prefix */}
                          <span
                            className={`font-mono text-base sm:text-xl lg:text-2xl font-light transition-all duration-300 ${
                              isActive
                                ? "text-terrain-accentLight"
                                : "text-terrain-midGrey group-hover:text-terrain-accentLight group-hover:translate-x-1"
                            }`}
                          >
                            {link.num}
                          </span>

                          {/* Link Title */}
                          <span
                            className={`font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight transition-all duration-300 ${
                              isActive
                                ? "text-terrain-pureWhite underline underline-offset-8 decoration-terrain-accentLight/80"
                                : "text-terrain-softWhite/80 group-hover:text-terrain-pureWhite group-hover:translate-x-2"
                            }`}
                          >
                            {link.name}
                          </span>

                          {/* Hover Arrow Indicator */}
                          <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-2 text-terrain-accentLight text-2xl sm:text-4xl transition-all duration-300">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Right Interactive Quick Enquiry Form Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  className="lg:col-span-6 bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl flex flex-col gap-6 shadow-2xl relative overflow-hidden"
                >
                  {/* Glass Accent Header Bar */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-terrain-accentLight/20 via-terrain-accentLight to-transparent" />

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-terrain-accentLight block">
                        Quick Contact
                      </span>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-terrain-pureWhite">
                        Send an Enquiry
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-terrain-midGrey bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      Response &lt; 24h
                    </span>
                  </div>

                  {/* Form / Success View */}
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-10 flex flex-col items-center justify-center text-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                          ✓
                        </div>
                        <h4 className="text-xl font-heading font-bold text-terrain-pureWhite">
                          Enquiry Received!
                        </h4>
                        <p className="text-xs sm:text-sm text-terrain-midGrey max-w-sm">
                          Thank you for reaching out. Our strategy team will review your inquiry and connect with you shortly.
                        </p>
                        <button
                          onClick={() => setMenuOpen(false)}
                          className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-terrain-pureWhite text-terrain-deepBlack rounded-xl hover:bg-terrain-softWhite transition-all"
                        >
                          Close Drawer
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit}
                        className="flex flex-col gap-4"
                      >
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono text-terrain-midGrey uppercase mb-1">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="John Doe"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 focus:border-terrain-accentLight focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-terrain-softWhite placeholder-white/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-terrain-midGrey uppercase mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="john@company.com"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 focus:border-terrain-accentLight focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-terrain-softWhite placeholder-white/20 transition-all"
                            />
                          </div>
                        </div>

                        {/* Service Selection */}
                        <div>
                          <label className="block text-[11px] font-mono text-terrain-midGrey uppercase mb-1.5">
                            Required Service
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {serviceOptions.map((srv) => {
                              const isSelected = formState.service === srv;
                              return (
                                <button
                                  type="button"
                                  key={srv}
                                  onClick={() => setFormState({ ...formState, service: srv })}
                                  className={`text-[11px] font-medium py-2 px-2.5 rounded-lg border transition-all text-center truncate ${
                                    isSelected
                                      ? "bg-terrain-accent/40 border-terrain-accentLight text-terrain-pureWhite shadow-[0_0_15px_rgba(140,78,202,0.4)]"
                                      : "bg-white/5 border-white/10 text-terrain-midGrey hover:text-terrain-softWhite hover:border-white/20"
                                  }`}
                                >
                                  {srv}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Project Details */}
                        <div>
                          <label className="block text-[11px] font-mono text-terrain-midGrey uppercase mb-1">
                            Project Summary / Message *
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Briefly describe your goals, timeline or business vision..."
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 focus:border-terrain-accentLight focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-terrain-softWhite placeholder-white/20 transition-all resize-none"
                          />
                        </div>

                        {/* Form Submit & Direct Close Row */}
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-terrain-pureWhite hover:bg-terrain-softWhite text-terrain-deepBlack font-semibold text-xs sm:text-sm uppercase tracking-wider py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(77,38,129,0.3)] hover:shadow-[0_0_30px_rgba(140,78,202,0.6)] disabled:opacity-60 flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-4 h-4 border-2 border-terrain-deepBlack/30 border-t-terrain-deepBlack rounded-full animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Submit Enquiry
                                <span className="text-base">→</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-terrain-midGrey hover:text-terrain-softWhite rounded-xl text-xs font-mono uppercase tracking-wider transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>
            </div>

            {/* Bottom Footer inside Drawer with Explicit Close Option */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-terrain-midGrey relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  OPEN FOR NEW VENTURES
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <a href="mailto:hello@terrainbusiness.com" className="hover:text-terrain-pureWhite transition-colors">
                  hello@terrainbusiness.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-mono text-[11px]">
                  © {new Date().getFullYear()} Terrain Business Solutions. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
