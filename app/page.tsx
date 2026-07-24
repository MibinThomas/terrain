import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Foundations from "@/components/sections/Foundations";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import DesignPhilosophy from "@/components/sections/DesignPhilosophy";
import BusinessImpact from "@/components/sections/BusinessImpact";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";
import ContinuityLine from "@/components/ui/ContinuityLine";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-terrain-pureWhite selection:text-terrain-deepBlack">
      <CustomCursor />
      <ContinuityLine />
      <Header />
      
      <Hero />
      <Manifesto />
      <Foundations />
      <Process />
      <Services />
      <Work />
      <DesignPhilosophy />
      <BusinessImpact />
      <About />
      <Contact />
      
      <Footer />
    </main>
  );
}
