import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustBadges from "@/components/sections/TrustBadges";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Explore Terrain's portfolio of web engineering, brand design systems, e-commerce storefronts, and digital products delivered across the UAE and Middle East.",
};

const PROJECTS = [
  {
    id: "rafah-garden",
    title: "Rafah Garden Landscape Architecture",
    category: "Web Engineering",
    tags: ["Next.js", "TailwindCSS", "Motion Design"],
    result: "Deployed live at rafa-garden-frontend.vercel.app",
    image: "/images/projects/Rafah Garden.jpeg",
    link: "https://rafa-garden-frontend.vercel.app/",
    description: "Bespoke digital platform for a luxury landscape architecture firm featuring custom UI interactions, fluid motion design, and responsive product showcases.",
  },
  {
    id: "powermec",
    title: "Powermec Engineering Solutions",
    category: "Industrial Engineering",
    tags: ["Web Architecture", "Lead Gen", "Machinery Catalog"],
    result: "Deployed live at steelblue-mantis-888811.hostingersite.com",
    image: "/images/Powermec.jpeg",
    link: "https://steelblue-mantis-888811.hostingersite.com",
    description: "Enterprise digital platform for Powermec heavy machinery & power engineering solutions, designed for high-performance product browsing and industrial lead capture.",
  },
  {
    id: "uae-kungfu",
    title: "UAE Kung Fu & Tai Chi Association",
    category: "Government Portal",
    tags: ["Government CDA", "Cultural Portal", "SEO Architecture"],
    result: "Deployed live at uaekungfuassociation.ae",
    image: "/images/projects/UAE Kung Fu Association.png",
    link: "https://www.uaekungfuassociation.ae/",
    description: "Official web platform for the Emirates Association of Kung Fu, Tai Chi, and Qigong under the Community Development Authority UAE, promoting Chinese martial arts heritage.",
  },
  {
    id: "metamedicx",
    title: "MetaMedicx Healthcare Solutions",
    category: "MedTech Engineering",
    tags: ["Next.js", "Tele-Health", "Patient Booking"],
    result: "Deployed live at metamedicx.com",
    image: "/images/projects/MetaMedicx.png",
    link: "https://metamedicx.com/",
    description: "Next-generation medical technology platform for MetaMedicx, featuring patient appointment booking, tele-health integrations, and clinical services.",
  },
];

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-terrain-deepBlack text-terrain-softWhite">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terrain-midGrey border border-white/10 px-3.5 py-1.5 rounded-full mb-6">
            Portfolio Showcase
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl max-w-4xl leading-tight text-terrain-softWhite mb-6">
            Featured Projects & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Case Studies.
            </span>
          </h1>
          <p className="text-terrain-midGrey text-lg max-w-2xl leading-relaxed">
            A selection of digital products, e-commerce storefronts, and custom software systems designed to solve real business challenges.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="group bg-white/[0.02] border border-white/5 hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[2.2/1] overflow-hidden bg-terrain-nearBlack">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {p.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-white font-semibold block mb-2">
                      {p.category}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-terrain-softWhite mb-3 group-hover:text-white transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-terrain-midGrey text-sm leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-terrain-midGrey block">Outcome</span>
                      <span className="text-sm font-semibold text-terrain-softWhite">{p.result}</span>
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center text-terrain-softWhite transition-all duration-300 shrink-0"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </main>
  );
}
