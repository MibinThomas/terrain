import AnimatedText from "@/components/ui/AnimatedText";

export default function About() {
  return (
    <section id="about" className="py-32 bg-terrain-nearBlack border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-6">
            <div className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-8 tracking-tight">
              <AnimatedText text="BUILDING" el="h2" className="text-terrain-pureWhite block" mode="character" />
              <AnimatedText text="EXPERIENCES" el="h2" className="text-terrain-pureWhite block" mode="character" delay={0.1} />
              <AnimatedText text="BEYOND" el="h2" className="text-terrain-midGrey block" mode="character" delay={0.2} />
              <AnimatedText text="EXPECTATIONS." el="h2" className="text-terrain-midGrey block" mode="character" delay={0.3} />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-12">
            <div>
              <h3 className="font-heading text-xl text-terrain-pureWhite mb-4">Strategic Approach</h3>
              <p className="text-terrain-softWhite/80 text-lg leading-relaxed">
                We believe that great design is inherently strategic. We partner with our clients to understand their core business objectives, delivering solutions that are not only beautiful but performant and scalable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl text-terrain-pureWhite mb-4">End-to-End Delivery</h3>
                <p className="text-terrain-softWhite/80 text-base leading-relaxed">
                  From initial discovery and brand positioning to product design and full-stack development, we handle the entire digital lifecycle in-house.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl text-terrain-pureWhite mb-4">Technology Capability</h3>
                <p className="text-terrain-softWhite/80 text-base leading-relaxed">
                  Our engineering team builds on modern, headless architectures to ensure your platforms are fast, secure, and ready for future integrations.
                </p>
              </div>
            </div>

            {/* CMS Placeholder for optional content */}
            <div className="pt-12 border-t border-white/10 flex flex-wrap gap-8 opacity-50">
              <div className="text-sm font-heading text-terrain-midGrey tracking-widest">[TEAM PROFILES: CMS_READY]</div>
              <div className="text-sm font-heading text-terrain-midGrey tracking-widest">[CERTIFICATIONS: CMS_READY]</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
