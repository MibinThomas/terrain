import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustBadges from "@/components/sections/TrustBadges";
import FaqSection from "@/components/sections/FaqSection";
import Link from "next/link";
import {
  Code2,
  Palette,
  ShoppingBag,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore Terrain's digital capabilities — Web Engineering, UI/UX Product Architecture, E-Commerce Platforms, and Bespoke AI Software Solutions.",
};

const SERVICES = [
  {
    id: "web-engineering",
    icon: Code2,
    badgeColor: "text-white bg-white/10 border-white/20",
    title: "Web Engineering & Next.js",
    short: "High-performance web applications engineered for speed, scale, and search dominance.",
    description:
      "We write clean, modular Next.js 16 and React code structured for maximum Google Search indexing, sub-second TTFB, and zero layout shift.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "TailwindCSS", "Node.js"],
    deliverables: [
      "Next.js / React Architecture & SSR",
      "API Integrations & Server Actions",
      "Core Web Vitals & Speed Optimization",
      "SEO-Ready Headless Architecture",
    ],
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    badgeColor: "text-white bg-white/10 border-white/20",
    title: "UI/UX Product Architecture",
    short: "Bespoke design systems that engage users and elevate digital brand perception.",
    description:
      "From wireframing and user journey mapping to comprehensive design systems in Figma, we design interfaces that feel fluid, modern, and intuitive.",
    techStack: ["Figma Systems", "Framer Motion", "Micro-Interactions", "Design Tokens"],
    deliverables: [
      "User Journey & UX Wireframing",
      "Figma Component & Token Systems",
      "Micro-Animations & Motion Prototyping",
      "Design System Documentation",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    badgeColor: "text-white bg-white/10 border-white/20",
    title: "E-Commerce Solutions",
    short: "Revenue-generating storefronts engineered to maximize visitor-to-buyer conversion.",
    description:
      "End-to-end e-commerce platforms featuring split payment gateways (Tabby/Stripe), multi-vendor cart architecture, and rapid checkout experiences.",
    techStack: ["Shopify Headless", "Payload CMS", "Stripe API", "Tabby BNPL"],
    deliverables: [
      "Headless Storefronts & Custom Themes",
      "Multi-Vendor Split Cart Architecture",
      "Regional Payment Gateway Integrations",
      "Custom Product Configurators",
    ],
  },
  {
    id: "ai-software",
    icon: Cpu,
    badgeColor: "text-white bg-white/10 border-white/20",
    title: "AI & Bespoke Software",
    short: "Intelligent software systems that automate manual workflows and empower decisions.",
    description:
      "Custom software engineering tailored to your operational bottlenecks. We build custom APIs, LLM/AI integrations, and automated backends.",
    techStack: ["Python / FastAPI", "OpenAI / LLMs", "PostgreSQL", "Docker / AWS"],
    deliverables: [
      "LLM & Custom AI API Integrations",
      "Bespoke Dashboard & SaaS Tools",
      "Automated Workflow Pipelines",
      "Secure Database & Cloud Architecture",
    ],
  },
];

const PROTOCOL_STEPS = [
  {
    num: "01",
    title: "Discovery & Blueprinting",
    desc: "We analyze business requirements, user journeys, and technical bottlenecks to create an architectural blueprint.",
  },
  {
    num: "02",
    title: "Design System & Motion",
    desc: "Crafting scalable Figma design tokens, fluid UI components, and micro-animations tailored to your brand identity.",
  },
  {
    num: "03",
    title: "Next.js & API Engineering",
    desc: "Writing clean, type-safe Next.js and TypeScript code with sub-second response times and bulletproof API integration.",
  },
  {
    num: "04",
    title: "Testing & Global Launch",
    desc: "Comprehensive cross-device QA, Core Web Vitals optimization, SEO verification, and automated cloud deployment.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-44 pb-24 border-b border-white/5 relative">
        {/* Ambient White Background Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFFFFF 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6 font-semibold">
            <Sparkles size={14} /> Capabilities & Digital Services
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl max-w-4xl leading-tight text-terrain-softWhite mb-6 tracking-tight">
            Digital Engineering Built for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Measurable Growth.
            </span>
          </h1>

          <p className="text-terrain-midGrey text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Every capability we deliver combines aesthetic design perfection, cutting-edge software architecture, and speed optimization.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl pt-6 border-t border-white/10">
            {[
              { val: "99.9%", label: "Uptime & Reliability" },
              { val: "< 0.5s", label: "Page Load Speed" },
              { val: "100%", label: "SEO Structured Data" },
              { val: "24/7", label: "Engineering Support" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white block">
                  {stat.val}
                </span>
                <span className="text-[10px] text-terrain-midGrey uppercase tracking-wider block mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-28 relative">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-white/30 rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                  {/* Service Core Info */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                        <Icon size={28} className="text-white" />
                      </div>
                      <span className={`text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${s.badgeColor}`}>
                        {s.id.replace("-", " ")}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-terrain-softWhite mb-3">
                        {s.title}
                      </h2>
                      <p className="text-terrain-lightGrey text-sm font-semibold mb-4">
                        {s.short}
                      </p>
                      <p className="text-terrain-midGrey text-base leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-terrain-midGrey font-semibold block mb-3">
                        Technologies & Tools
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {s.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/[0.04] border border-white/10 text-terrain-softWhite text-xs font-semibold px-3 py-1.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deliverables Box */}
                  <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-terrain-midGrey font-bold mb-5 flex items-center gap-2">
                        <Layers size={14} className="text-white" /> Core Deliverables
                      </h3>
                      <ul className="space-y-3.5 text-sm text-terrain-softWhite">
                        {s.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-white shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className="mt-8 w-full bg-white hover:bg-neutral-200 text-black text-xs font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      Request a Consultation <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Protocol Section */}
      <section className="py-24 bg-terrain-nearBlack border-t border-white/5 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 font-semibold">
              <Zap size={14} /> Execution Standard
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-terrain-softWhite mb-4">
              Our 4-Step Engineering Protocol
            </h2>
            <p className="text-terrain-midGrey text-sm sm:text-base">
              A systematic workflow designed to minimize project risk and guarantee sub-second digital performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROTOCOL_STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-white/[0.02] border border-white/5 hover:border-white/30 rounded-2xl p-6 transition-all duration-300"
              >
                <span className="font-heading font-extrabold text-3xl text-white/30 block mb-4">
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-lg text-terrain-softWhite mb-2">
                  {step.title}
                </h3>
                <p className="text-terrain-midGrey text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Impact Call To Action Banner */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl bg-neutral-900/80 border border-white/20 p-10 sm:p-16 text-center overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)]">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-xs uppercase tracking-widest text-terrain-midGrey font-semibold border border-white/20 px-3.5 py-1.5 rounded-full inline-block">
                Start Your Digital Transformation
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-terrain-softWhite leading-tight">
                Ready to Build Your Next Product?
              </h2>
              <p className="text-terrain-midGrey text-sm sm:text-base leading-relaxed">
                Connect with our strategy team in Dubai to discuss your digital engineering requirements.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-white hover:bg-neutral-200 text-black font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2"
                >
                  Schedule a Consultation <ArrowRight size={16} />
                </Link>
                <Link
                  href="/work"
                  className="bg-white/5 hover:bg-white/10 text-terrain-softWhite border border-white/10 font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300"
                >
                  Explore Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />
      <FaqSection />
      <Footer />
    </main>
  );
}
