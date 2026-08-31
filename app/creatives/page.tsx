import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustBadges from "@/components/sections/TrustBadges";
import FaqSection from "@/components/sections/FaqSection";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  Film,
  CreditCard,
  FileText,
  ArrowRight,
  CheckCircle2,
  Layers,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creatives & Brand Media",
  description:
    "Explore Terrain's design showcase — Modern UI/UX Mockups, Motion Graphics, Executive Business Cards, Flyers, and Brand Posters.",
};

const CREATIVE_TOOLS = [
  { name: "Figma", category: "UI/UX & Systems", desc: "Design systems, auto-layout UI & component libraries" },
  { name: "After Effects", category: "Motion Graphics", desc: "60FPS keyframe animation & UI micro-interactions" },
  { name: "Photoshop", category: "Visual Mockups", desc: "High-resolution brand collateral & photo compositing" },
  { name: "Illustrator", category: "Vector Branding", desc: "Logos, custom iconography & CMYK print flyers" },
  { name: "Blender 3D", category: "3D Rendering", desc: "Photorealistic product mockups & spatial renders" },
  { name: "Cinema 4D", category: "Motion Design", desc: "Complex 3D motion graphics & geometric animation" },
  { name: "Lottie", category: "Web Animation", desc: "Lightweight fluid SVG animation keyframe code" },
  { name: "Spline 3D", category: "Interactive 3D", desc: "Real-time WebGL canvas & 3D browser experiences" },
];

const CREATIVE_CATEGORIES = [
  {
    id: "modern-ui",
    title: "Modern UI/UX Mockups",
    icon: Palette,
    tag: "Interface Design",
    desc: "SaaS dashboards, glassmorphic web apps, mobile interfaces, and comprehensive Figma design systems.",
    image: "/images/creatives/ui_mockup.jpg",
    specs: ["Figma Tokens", "Glassmorphism UI", "Dark & Light Mode", "Auto-Layout 5.0"],
  },
  {
    id: "business-cards",
    title: "Executive Business Cards",
    icon: CreditCard,
    tag: "Print & NFC",
    desc: "Luxury matte black business cards, gold foil stamping, embossed typography, and digital NFC integrations.",
    image: "/images/creatives/business_card.jpg",
    specs: ["400GSM Cotton Paper", "Metallic Gold Foil", "Debossed Logos", "NFC Chip Embedded"],
  },
  {
    id: "flyers-posters",
    title: "Flyers & Brand Posters",
    icon: FileText,
    tag: "Marketing Collateral",
    desc: "High-impact event flyers, corporate symposium posters, exhibition displays, and editorial media kits.",
    image: "/images/creatives/poster_flyer.jpg",
    specs: ["Vector Resolution", "CMYK Print Ready", "Large Format Displays", "Social Media Adaptations"],
  },
  {
    id: "motion-design",
    title: "3D Motion & Animation",
    icon: Film,
    tag: "Motion Graphics",
    desc: "Futuristic 3D keyframe motion graphics, micro-interactions, Lottie animations, and video UI walkthroughs.",
    image: "/images/creatives/motion_design.jpg",
    specs: ["60FPS Fluid Motion", "Lottie / After Effects", "3D Geometry Render", "Interactive Physics"],
  },
];

const CAPABILITIES = [
  {
    category: "Modern UI & App Mockups",
    items: [
      "Web App & SaaS Dashboard Interfaces",
      "Mobile iOS & Android App Mockups",
      "Figma Design Systems & Token Architecture",
      "Interactive Prototyping & Flow Mapping",
    ],
  },
  {
    category: "Executive Business Cards & Print",
    items: [
      "Luxury Matte Black & Foil Stamped Cards",
      "NFC Smart Business Card Digital Profile Integration",
      "Executive Stationery & Letterhead Packages",
      "Custom Packaging & Embossed Folder Systems",
    ],
  },
  {
    category: "Flyers, Posters & Media Kits",
    items: [
      "Corporate Event & Symposium Promotional Flyers",
      "Large Format Exhibition & Trade Show Posters",
      "Digital Advertising & Social Media Banners",
      "Press Kits & Editorial Brand Guidelines",
    ],
  },
  {
    category: "Motion & Interactive Media",
    items: [
      "3D Product Renderings & Motion Teasers",
      "Micro-Animation UI Component States",
      "Lottie Vector Web Animations",
      "Video Case Studies & Showreels",
    ],
  },
];

export default function CreativesPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-44 pb-20 border-b border-white/5 relative">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFFFFF 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6 font-semibold">
            <Sparkles size={14} /> Brand Media & Design Showcase
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight text-terrain-softWhite mb-6 tracking-tight">
            Creatives, Mockups & <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Visual Brand Systems.
            </span>
          </h1>

          <p className="text-terrain-midGrey text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            From modern UI/UX mockups and 3D motion design to luxury business cards, promotional flyers, and corporate brand posters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white hover:bg-neutral-200 text-black font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center gap-2"
            >
              Order Custom Creatives <ArrowRight size={16} />
            </Link>
            <a
              href="#showcase"
              className="bg-white/5 hover:bg-white/10 text-terrain-softWhite border border-white/10 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300"
            >
              Explore Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Creative Tools & Software Ecosystem Section */}
      <section className="py-20 border-b border-white/5 bg-terrain-nearBlack relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-semibold mb-4">
              <Wrench size={13} /> Design Stack & Software
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-terrain-softWhite mb-3">
              Tools We Master for Brand Creatives
            </h2>
            <p className="text-terrain-midGrey text-sm">
              We leverage industry-standard design, motion, 3D, and prototyping software to deliver pixel-perfect assets.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CREATIVE_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="bg-white/[0.02] border border-white/5 hover:border-white/30 rounded-2xl p-5 transition-all duration-300 group hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-terrain-midGrey font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {tool.category}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-terrain-softWhite mb-1 group-hover:text-white">
                  {tool.name}
                </h3>
                <p className="text-terrain-midGrey text-xs leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creatives Gallery Grid */}
      <section id="showcase" className="py-28 relative">
        <div className="container mx-auto px-6 md:px-12 space-y-20">
          {CREATIVE_CATEGORIES.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="group bg-white/[0.02] border border-white/5 hover:border-white/30 rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  {/* Visual Preview Container */}
                  <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/40 transition-all duration-500 bg-terrain-nearBlack">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="text-xs uppercase tracking-widest font-bold text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-terrain-softWhite mb-3">
                        {item.title}
                      </h2>
                      <p className="text-terrain-midGrey text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[11px] uppercase tracking-wider text-terrain-midGrey font-semibold block mb-3">
                        Design & Print Specifications
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {item.specs.map((spec) => (
                          <div key={spec} className="flex items-center gap-2 text-xs text-terrain-softWhite">
                            <CheckCircle2 size={14} className="text-white shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-terrain-lightGrey transition-colors pt-2"
                    >
                      Request Mockup Pack <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comprehensive Capabilities Matrix */}
      <section className="py-24 bg-terrain-nearBlack border-t border-white/5 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full inline-block font-semibold mb-4">
              Complete Creative Suite
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-terrain-softWhite mb-4">
              Capabilities & Deliverables
            </h2>
            <p className="text-terrain-midGrey text-sm sm:text-base">
              Everything required to establish a high-status visual identity across digital interfaces and physical print assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.category}
                className="bg-white/[0.02] border border-white/5 hover:border-white/30 rounded-3xl p-8 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-xl text-terrain-softWhite mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  {cap.category}
                </h3>
                <ul className="space-y-3.5 text-sm text-terrain-midGrey">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-terrain-softWhite">
                      <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl bg-neutral-900/80 border border-white/20 p-10 sm:p-16 text-center overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)]">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-xs uppercase tracking-widest text-terrain-midGrey font-semibold border border-white/20 px-3.5 py-1.5 rounded-full inline-block">
                Elevate Your Brand Identity
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-terrain-softWhite leading-tight">
                Need Modern UI or Print Creatives?
              </h2>
              <p className="text-terrain-midGrey text-sm sm:text-base leading-relaxed">
                Work directly with our design team in Dubai to produce custom UI mockups, business cards, flyers, and motion assets.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-white hover:bg-neutral-200 text-black font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2"
                >
                  Start Your Design Project <ArrowRight size={16} />
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
