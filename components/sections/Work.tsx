"use client";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Rafah Garden",
    category: "Web Engineering",
    industry: "Landscape Architecture",
    year: "2024",
    summary: "Bespoke digital platform for a luxury landscape architecture firm featuring custom UI interactions, fluid motion design, and responsive product showcases.",
    image: "/images/projects/Rafah Garden.jpeg",
    link: "https://rafa-garden-frontend.vercel.app/",
  },
  {
    id: "02",
    title: "Powermec Engineering",
    category: "Industrial Engineering",
    industry: "Power & Machinery",
    year: "2024",
    summary: "Enterprise digital platform for Powermec heavy machinery & power engineering solutions, designed for high-performance product browsing and industrial lead capture.",
    image: "/images/Powermec.jpeg",
    link: "https://steelblue-mantis-888811.hostingersite.com",
  },
  {
    id: "03",
    title: "UAE Kung Fu Association",
    category: "Government Portal",
    industry: "Sports & Culture",
    year: "2024",
    summary: "Official web platform for the Emirates Association of Kung Fu, Tai Chi, and Qigong under the Community Development Authority UAE, promoting martial arts heritage.",
    image: "/images/projects/UAE Kung Fu Association.png",
    link: "https://www.uaekungfuassociation.ae/",
  },
  {
    id: "04",
    title: "MetaMedicx Healthcare",
    category: "MedTech Engineering",
    industry: "Healthcare Systems",
    year: "2024",
    summary: "Next-generation medical technology platform for MetaMedicx, featuring patient appointment booking, tele-health integrations, and clinical services.",
    image: "/images/projects/MetaMedicx.png",
    link: "https://metamedicx.com/",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-16 sm:py-24 lg:py-32 bg-terrain-deepBlack border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 sm:mb-16 md:mb-24 gap-4 sm:gap-6">
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-terrain-pureWhite tracking-tight">
            SELECTED WORK
          </h2>
          <a
            href="/work"
            className="flex items-center gap-2 text-terrain-pureWhite font-semibold text-xs sm:text-sm hover:opacity-70 transition-opacity"
          >
            View All Projects
            <div className="w-4 h-4 border border-current flex items-center justify-center rotate-45">
              <div className="w-1 h-1 bg-current" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                {/* Image Container */}
                <div className="w-full aspect-[16/9] bg-terrain-nearBlack relative overflow-hidden mb-6 rounded-2xl border border-white/10 group-hover:border-white/40 transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  <div className="absolute top-4 left-4 font-heading text-xs text-terrain-pureWhite tracking-widest bg-terrain-deepBlack/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {project.id}
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-terrain-pureWhite group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-terrain-midGrey text-xs sm:text-sm font-heading shrink-0">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[11px] text-white bg-terrain-accent/30 border border-terrain-accent/60 px-2.5 py-1 rounded-full font-medium">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-terrain-midGrey border border-white/10 px-2.5 py-1 rounded-full">
                    {project.industry}
                  </span>
                </div>

                <p className="text-terrain-midGrey text-xs sm:text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>

                <div className="text-white text-xs sm:text-sm font-semibold flex items-center gap-2 group-hover:text-terrain-lightGrey">
                  Visit Live Project ↗
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
