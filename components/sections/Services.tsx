"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const servicesList = [
  "UI/UX Design",
  "Web Development",
  "Product Design",
  "Brand Identity",
  "Motion Graphics",
  "Creative Direction",
  "Design Research",
  "Interface Animation",
  "Prototyping"
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-32 bg-terrain-deepBlack relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Index Sidebar */}
          <div className="md:w-1/3">
            <h2 className="font-heading text-3xl md:text-5xl text-terrain-pureWhite mb-8 tracking-tight">CAPABILITIES</h2>
            <p className="text-terrain-midGrey text-lg leading-relaxed mb-12 max-w-sm">
              We design and build complete digital ecosystems. Every capability works together to turn complex challenges into clear solutions.
            </p>
          </div>

          {/* Interactive List */}
          <div className="md:w-2/3">
            <div className="border-t border-white/10">
              {servicesList.map((service, index) => (
                <div 
                  key={index}
                  className="group relative border-b border-white/10"
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <a href="#" data-interactive="true" className="block py-8 md:py-12 relative z-10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-3xl md:text-5xl text-terrain-softWhite group-hover:translate-x-4 transition-transform duration-500 ease-out">
                        {service}
                      </h3>
                      <div className="w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-full h-[2px] bg-terrain-pureWhite relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-terrain-pureWhite rotate-45 transform origin-center translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                  
                  {/* Hover background visual effect */}
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeService === index ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-white/[0.02] origin-bottom z-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background ambient interaction based on hover */}
      <motion.div
        animate={{ opacity: activeService !== null ? 0.5 : 0 }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-terrain-pureWhite/5 to-transparent pointer-events-none transition-opacity duration-1000"
      />
    </section>
  );
}
