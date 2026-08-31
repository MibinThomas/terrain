"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Creatives", href: "/creatives" },
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-terrain-deepBlack/90 backdrop-blur-md border-b border-white/5 py-3 sm:py-4" : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center shrink-0" data-interactive="true">
          <img 
            src="/images/logo/Terrain Vertical White.png" 
            alt="Terrain Logo" 
            className="h-12 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              data-interactive="true"
              className="text-xs lg:text-sm font-medium text-terrain-midGrey hover:text-terrain-pureWhite transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            data-interactive="true"
            className="text-xs lg:text-sm font-semibold text-terrain-deepBlack bg-terrain-pureWhite px-4 lg:px-5 py-2.5 rounded-md hover:bg-terrain-softWhite hover:scale-[1.02] transition-all"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-terrain-softWhite p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={`block w-full h-[2px] bg-current transform transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-full h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-full h-[2px] bg-current transform transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-terrain-deepBlack/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-5 md:hidden max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-heading text-terrain-softWhite uppercase tracking-wider py-1 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center text-sm font-heading font-bold text-terrain-deepBlack bg-terrain-pureWhite px-6 py-3.5 rounded-lg mt-2 shadow-lg"
          >
            Start a Project
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
