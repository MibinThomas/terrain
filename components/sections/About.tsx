import AnimatedText from "@/components/ui/AnimatedText";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-terrain-nearBlack border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          <div className="lg:col-span-6">
            <div className="font-heading text-2xl sm:text-4xl lg:text-5xl leading-[1.1] mb-6 sm:mb-8 tracking-tight">
              <AnimatedText text="BUILDING EXPERIENCES" el="h2" className="text-terrain-pureWhite block" mode="word" />
              <AnimatedText text="BEYOND EXPECTATIONS." el="h2" className="text-terrain-midGrey block" mode="word" delay={0.15} />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8 sm:space-y-12">
            <div>
              <h3 className="font-heading text-lg sm:text-xl text-terrain-pureWhite mb-3 sm:mb-4">Strategic Approach</h3>
              <p className="text-terrain-softWhite/80 text-base sm:text-lg leading-relaxed">
                We believe that great design is inherently strategic. We partner with our clients to understand their core business objectives, delivering solutions that are not only beautiful but performant and scalable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="font-heading text-lg sm:text-xl text-terrain-pureWhite mb-3 sm:mb-4">End-to-End Delivery</h3>
                <p className="text-terrain-softWhite/80 text-sm sm:text-base leading-relaxed">
                  From initial discovery and brand positioning to product design and full-stack development, we handle the entire digital lifecycle in-house.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl text-terrain-pureWhite mb-3 sm:mb-4">Technology Capability</h3>
                <p className="text-terrain-softWhite/80 text-sm sm:text-base leading-relaxed">
                  Our engineering team builds on modern, headless architectures to ensure your platforms are fast, secure, and ready for future integrations.
                </p>
              </div>
            </div>

            {/* Technology Capability Badges */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs font-heading text-terrain-midGrey tracking-wider">
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white">
                Next.js 16 & React 19 Architecture
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white">
                Sub-Second Core Web Vitals
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
