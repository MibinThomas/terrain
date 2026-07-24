import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-terrain-nearBlack pt-24 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img 
                src="/images/logo/Terrain Vertical White.png" 
                alt="Terrain Logo" 
                className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-terrain-midGrey max-w-sm text-sm leading-relaxed mb-8">
              We transform ideas, technology, and strategy into intelligent business solutions designed for sustainable growth and measurable impact.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-terrain-midGrey hover:text-terrain-pureWhite text-sm font-medium">LinkedIn</a>
              <a href="#" className="text-terrain-midGrey hover:text-terrain-pureWhite text-sm font-medium">Twitter</a>
              <a href="#" className="text-terrain-midGrey hover:text-terrain-pureWhite text-sm font-medium">Instagram</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-terrain-softWhite uppercase text-xs tracking-widest mb-6">Capabilities</h4>
            <ul className="space-y-3">
              {["UI/UX Design", "Web Development", "Product Design", "Brand Identity"].map((item) => (
                <li key={item}>
                  <Link href="#capabilities" className="text-terrain-midGrey hover:text-terrain-pureWhite text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-terrain-softWhite uppercase text-xs tracking-widest mb-6">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Process", "Work", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-terrain-midGrey hover:text-terrain-pureWhite text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-terrain-midGrey">
          <p>&copy; {new Date().getFullYear()} Terrain Business Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-terrain-pureWhite">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-terrain-pureWhite">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="white" strokeWidth="0.2" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="white" strokeWidth="0.2" />
          ))}
        </svg>
      </div>
    </footer>
  );
}
