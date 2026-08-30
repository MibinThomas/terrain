import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustBadges from "@/components/sections/TrustBadges";
import Link from "next/link";
import { ArrowRight, Target, Sparkles, Shield, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Terrain Business Solutions — our vision, engineering methodology, and design-first philosophy driving enterprise digital transformation across Dubai and the GCC.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Design-First Engineering",
    desc: "We believe true technical innovation begins with intuitive human-centric design. Every architectural decision serves to elevate the user experience.",
    Icon: Sparkles,
  },
  {
    num: "02",
    title: "Performance Without Compromise",
    desc: "Speed is an feature. We engineer razor-sharp Next.js and React products designed for maximum throughput, zero layout shifts, and sub-second rendering.",
    Icon: Target,
  },
  {
    num: "03",
    title: "Enterprise Reliability & Security",
    desc: "From encrypted data flows to bulletproof API integrations, we construct digital foundations that scale effortlessly while protecting user integrity.",
    Icon: Shield,
  },
  {
    num: "04",
    title: "Regional Excellence & GCC Reach",
    desc: "Headquartered in Dubai, UAE, we understand regional dynamics and modern global expectations, delivering world-class digital agency standard.",
    Icon: Rocket,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terrain-midGrey border border-white/10 px-3.5 py-1.5 rounded-full mb-6">
            Who We Are
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl max-w-4xl leading-tight text-terrain-softWhite mb-6">
            Architecting the Future of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              Digital Experience.
            </span>
          </h1>
          <p className="text-terrain-midGrey text-lg max-w-2xl leading-relaxed">
            Terrain Business Solutions operates at the intersection of aesthetics, strategic engineering, and modern technology. We build software that transforms businesses.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-b border-white/5 bg-terrain-nearBlack">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
                Our Vision & Uncompromising Philosophy
              </h2>
              <p className="text-terrain-midGrey text-base leading-relaxed mb-6">
                Terrain was founded with a clear directive: to bridge the gap between creative visual artistry and complex backend software architecture.
              </p>
              <p className="text-terrain-midGrey text-base leading-relaxed mb-8">
                We obsess over the details — from sub-millisecond animation frame rates to clean API contracts — so that your customers experience seamless digital perfection.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(157,0,255,0.3)]"
              >
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "150+", label: "Projects Completed" },
                { val: "5+", label: "Years of Growth" },
                { val: "Dubai", label: "HQ Operations" },
                { val: "GCC", label: "Regional Reach" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center"
                >
                  <h3 className="font-heading font-extrabold text-3xl text-purple-400 mb-1">
                    {val}
                  </h3>
                  <p className="text-xs text-terrain-midGrey uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-terrain-midGrey mb-3 block">
              Core Principles
            </span>
            <h2 className="font-heading text-3xl font-bold">How We Think & Build</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p) => {
              const Icon = p.Icon;
              return (
                <div
                  key={p.num}
                  className="bg-white/[0.02] border border-white/5 hover:border-purple-500/30 rounded-2xl p-8 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-2xl text-purple-500/40">
                      {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Icon size={20} className="text-purple-400" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-terrain-softWhite">
                    {p.title}
                  </h3>
                  <p className="text-terrain-midGrey text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </main>
  );
}
