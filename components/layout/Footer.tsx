"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, MapPin, CheckCircle2 } from "lucide-react";
import { trackMeta } from "@/lib/meta/track";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      trackMeta("Subscribe", {
        userData: { email },
        customData: { content_name: "Footer Newsletter" },
      });
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-terrain-nearBlack pt-16 sm:pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Subtle white radial background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #8C4ECA 0%, #4D2681 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <img 
                src="/images/logo/Terrain Vertical White.png" 
                alt="Terrain Logo" 
                className="h-12 sm:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-terrain-midGrey text-xs sm:text-sm leading-relaxed max-w-md">
              Beyond Design. Into Experience. We engineer high-performance web products,
              UI/UX design systems, and custom software that drive measurable business impact.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-md">
              <label className="block text-[11px] uppercase tracking-wider text-terrain-midGrey font-semibold mb-2">
                Subscribe to Digital Insights
              </label>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-white bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} /> Thank you! You're subscribed to Terrain Insights.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="flex-grow bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-terrain-softWhite outline-none focus:border-terrain-accentLight focus:shadow-[0_0_0_3px_rgba(77,38,129,0.35)] transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_22px_rgba(77,38,129,0.7)]"
                  >
                    Subscribe <Send size={12} />
                  </button>
                </form>
              )}
            </div>

            {/* Regional Badge */}
            <div className="flex items-center gap-2 text-xs text-terrain-midGrey pt-2">
              <MapPin size={14} className="text-terrain-accentLight shrink-0" />
              <span>Headquartered in Dubai, UAE · Serving GCC & Global Enterprise</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-terrain-softWhite uppercase text-xs tracking-widest mb-5 font-semibold">
              Company
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Brand Creatives", href: "/creatives" },
                { label: "Work & Case Studies", href: "/work" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-terrain-midGrey hover:text-terrain-softWhite transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-terrain-softWhite uppercase text-xs tracking-widest mb-5 font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {[
                { label: "Web Engineering & Next.js", href: "/services" },
                { label: "UI/UX Product Architecture", href: "/services" },
                { label: "E-Commerce Platforms", href: "/services" },
                { label: "Brand Identity Systems", href: "/services" },
                { label: "AI & Custom Software", href: "/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-terrain-midGrey hover:text-terrain-softWhite transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-terrain-softWhite uppercase text-xs tracking-widest mb-5 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col space-y-3 text-xs sm:text-sm">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group text-terrain-midGrey hover:text-white transition-colors flex items-center gap-2"
              >
                <span>LinkedIn</span> <span className="text-terrain-midGrey group-hover:text-terrain-accentLight transition-colors">↗</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="group text-terrain-midGrey hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Twitter / X</span> <span className="text-terrain-midGrey group-hover:text-terrain-accentLight transition-colors">↗</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group text-terrain-midGrey hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Instagram</span> <span className="text-terrain-midGrey group-hover:text-terrain-accentLight transition-colors">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-[1px] w-24 mx-auto accent-rule mb-[-1px]" />
        <div className="relative flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[11px] sm:text-xs text-terrain-midGrey gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} Terrain Business Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-terrain-softWhite transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-terrain-softWhite transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
