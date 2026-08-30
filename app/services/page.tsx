import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustBadges from "@/components/sections/TrustBadges";
import FaqSection from "@/components/sections/FaqSection";
import Link from "next/link";
import { Code2, Palette, ShoppingBag, Cpu, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Terrain's digital capabilities — Web Engineering, UI/UX Product Design, E-Commerce, Brand Identity Systems, and Custom AI/Software Solutions.",
};

const SERVICES = [
  {
    id: "web-engineering",
    icon: Code2,
    title: "Web Engineering & Next.js",
    short: "High-performance web applications engineered for speed, scale, and search dominance.",
    description:
      "We write clean, modular Next.js and React code structured for maximum Google Search indexing, sub-second TTFB, and zero layout shift.",
    deliverables: [
      "Next.js / React Architecture",
      "API Integrations & Server Actions",
      "Performance & Core Web Vitals Optimization",
      "SEO-Ready Headless Architecture",
    ],
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Product Architecture",
    short: "Bespoke design systems that engage users and elevate digital brand perception.",
    description:
      "From wireframing and user journey mapping to comprehensive design systems in Figma, we design interfaces that feel fluid, modern, and intuitive.",
    deliverables: [
      "User Journey & UX Wireframing",
      "Figma Component Systems",
      "Micro-Animations & Motion Prototyping",
      "Design System Documentation",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "E-Commerce Solutions",
    short: "Revenue-generating storefronts engineered to maximize visitor-to-buyer conversion.",
    description:
      "End-to-end e-commerce platforms featuring split payment gateways (Tabby/Stripe), multi-vendor cart architecture, and rapid checkout experiences.",
    deliverables: [
      "Headless Storefronts & Shopify",
      "Multi-Vendor Split Architecture",
      "Payment Gateway Integrations",
      "Custom Product Configurators",
    ],
  },
  {
    id: "ai-software",
    icon: Cpu,
    title: "AI & Bespoke Software",
    short: "Intelligent software systems that automate manual workflows and empower decisions.",
    description:
      "Custom software engineering tailored to your operational bottlenecks. We build custom APIs, LLM/AI integrations, and automated backends.",
    deliverables: [
      "LLM & AI API Integrations",
      "Bespoke Dashboard & SaaS Tools",
      "Automated Workflow Pipelines",
      "Secure Database Architecture",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terrain-midGrey border border-white/10 px-3.5 py-1.5 rounded-full mb-6">
            Capabilities & Services
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl max-w-4xl leading-tight text-terrain-softWhite mb-6">
            Digital Engineering Built for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              Measurable Growth.
            </span>
          </h1>
          <p className="text-terrain-midGrey text-lg max-w-2xl leading-relaxed">
            Every service we offer is designed to deliver immediate digital competitive advantage, flawless user experience, and enterprise scalability.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 space-y-8">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="bg-white/[0.02] border border-white/5 hover:border-purple-500/30 rounded-3xl p-8 md:p-12 transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Icon size={24} className="text-purple-400" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-terrain-softWhite">
                      {s.title}
                    </h2>
                    <p className="text-purple-300 text-sm font-semibold">{s.short}</p>
                    <p className="text-terrain-midGrey text-base leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-xs uppercase tracking-wider text-terrain-midGrey font-semibold mb-4">
                      Key Deliverables
                    </h3>
                    <ul className="space-y-2.5 text-sm text-terrain-softWhite">
                      {s.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-6 w-full bg-white/5 hover:bg-purple-600 hover:text-white text-terrain-softWhite text-xs font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
                    >
                      Inquire About This Service <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <TrustBadges />
      <FaqSection />
      <Footer />
    </main>
  );
}
