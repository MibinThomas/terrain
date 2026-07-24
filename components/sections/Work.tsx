"use client";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Project Name",
    category: "Product Design",
    industry: "Fintech",
    year: "2024",
    summary: "A comprehensive digital transformation for a leading financial institution, focusing on intuitive user journeys and scalable architecture."
  },
  {
    id: "02",
    title: "Project Name",
    category: "Brand Identity",
    industry: "Technology",
    year: "2023",
    summary: "Reimagining the brand ecosystem for an emerging tech startup. Creating a cohesive visual language across all digital touchpoints."
  },
  {
    id: "03",
    title: "Project Name",
    category: "Web Development",
    industry: "Healthcare",
    year: "2023",
    summary: "Building a future-ready patient portal using modern web technologies to ensure accessibility, security, and performance."
  }
];

export default function Work() {
  return (
    <section id="work" className="py-32 bg-terrain-deepBlack border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 md:mb-24 gap-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-terrain-pureWhite tracking-tight">SELECTED WORK</h2>
          <a href="#" className="flex items-center gap-2 text-terrain-pureWhite font-semibold text-sm hover:opacity-70 transition-opacity">
            View All Projects
            <div className="w-4 h-4 border border-current flex items-center justify-center rotate-45">
              <div className="w-1 h-1 bg-current" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="w-full aspect-[4/5] bg-terrain-nearBlack relative overflow-hidden mb-6">
                <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500" />
                {/* Simulated image mask animation */}
                <div className="absolute inset-0 bg-terrain-midGrey/10 transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" />
                
                <div className="absolute top-4 left-4 font-heading text-xs text-terrain-pureWhite tracking-widest bg-terrain-deepBlack/50 backdrop-blur-sm px-3 py-1">
                  {project.id}
                </div>
              </div>

              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading text-xl md:text-2xl text-terrain-pureWhite group-hover:text-terrain-midGrey transition-colors">{project.title}</h3>
                <span className="text-terrain-midGrey text-xs md:text-sm font-heading">{project.year}</span>
              </div>
              
              <div className="flex gap-3 mb-4">
                <span className="text-xs text-terrain-deepBlack bg-terrain-midGrey px-2 py-1 font-medium">{project.category}</span>
                <span className="text-xs text-terrain-softWhite border border-terrain-midGrey px-2 py-1">{project.industry}</span>
              </div>

              <p className="text-terrain-midGrey text-sm leading-relaxed mb-6">
                {project.summary}
              </p>

              <div className="text-terrain-pureWhite text-sm font-semibold flex items-center gap-2">
                View Case Study
                <span className="transform group-hover:translate-x-1 transition-transform">-&gt;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
