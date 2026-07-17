import { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { useStore } from './store/useStore';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import IdeasSection from './components/IdeasSection';
import InteractiveTech from './components/InteractiveTech';
import InteractiveStrategy from './components/InteractiveStrategy';

interface SectionProps {
  id: string;
  badge: string;
  line1: string;
  line2: string;
  line3: string;
  description: string;
  btnText: string;
  btnAction: () => void;
  prevText?: string;
  prevAction?: () => void;
  subtext?: string;
  pills?: string[];
  isActive: boolean;
  visual: React.ReactNode;
}

function Section({
  id,
  badge,
  line1,
  line2,
  line3,
  description,
  btnText,
  btnAction,
  prevText,
  prevAction,
  subtext,
  pills,
  isActive,
  visual,
}: SectionProps) {
  const setHovered = useStore((state) => state.setHovered);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      scale: 0.85,
      rotate: 4,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo
      },
    },
  };

  const renderWaveText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span
        key={wordIndex}
        style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.24em' }}
      >
        {word.split('').map((char, charIndex) => (
          <motion.span
            key={charIndex}
            variants={letterVariants}
            style={{ display: 'inline-block', originY: 0.8 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    ));
  };

  return (
    <section className="experience-panel interactive-section" id={id}>
      <div className="panel-inner section-layout">
        
        {/* Left Column — Content */}
        <div className="panel-content section-content">
          <div className="panel-label hero-badge">
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-black)',
                boxShadow: '0 0 3px var(--color-black)',
                display: 'inline-block',
                marginRight: '6px',
              }}
            ></span>
            {badge}
          </div>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            className="text-gradient panel-heading hero-title"
          >
            <span className="hero-title-line-1">{renderWaveText(line1)}</span>
            <span className="hero-title-line-2">{renderWaveText(line2)}</span>
            <span className="hero-title-line-3">{renderWaveText(line3)}</span>
          </motion.h1>

          <p className="panel-description hero-description">
            {description}
          </p>

          {pills && pills.length > 0 && (
            <>
              <div className="services-pills desktop-only-pills">
                {pills.map((pill) => (
                  <span key={pill} className="service-pill">
                    {pill}
                  </span>
                ))}
              </div>
              <div className="mobile-tags mobile-only-tags">
                {pills.slice(0, 2).map((pill) => (
                  <span key={pill} className="mobile-tag">
                    {pill}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="hero-cta-wrapper interactive-element">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {prevAction && (
                <button
                  onClick={prevAction}
                  className="back-cta-btn"
                  aria-label={prevText || "Go back"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
              )}

              <button
                onClick={btnAction}
                className="panel-cta"
              >
                {btnText}
              </button>
            </div>

            {subtext && (
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginLeft: '4px',
                  marginTop: '8px',
                }}
              >
                {subtext}
              </div>
            )}
          </div>
        </div>

        {/* Right Column — 3D Visual */}
        <div 
          className="panel-visual section-visual"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ width: '100%', height: '100%' }} className="interactive-element">
            <Canvas
              shadows
              camera={{ position: [0, 8, 12], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
            >
              <Environment preset="city" />
              <ambientLight intensity={0.18} />
              <directionalLight
                castShadow
                position={[6, 12, 4]}
                intensity={0.65}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0008}
                shadow-radius={10}
              />
              <pointLight position={[-6, 4, -4]} intensity={0.1} color="#ffffff" />
              <pointLight position={[0, 5, 8]} intensity={0.1} color="#a7a9ac" />
              <Center>
                <Suspense fallback={null}>
                  {visual}
                </Suspense>
              </Center>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.06} />
              </mesh>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                dampingFactor={0.05}
                enableDamping
              />
            </Canvas>
          </div>
        </div>

      </div>
    </section>
  );
}

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const setHovered = useStore((state) => state.setHovered);
  const activeSection = useStore((state) => state.activeSection);
  const setActiveSection = useStore((state) => state.setActiveSection);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  // Convert vertical mouse-wheel events into horizontal scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept vertical mouse wheel scrolls (where deltaX is 0)
      if (Math.abs(e.deltaY) > 0 && Math.abs(e.deltaX) === 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Lock window/body scrolling so vertical scroll is absolutely prevented
  useEffect(() => {
    const preventWindowScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('scroll', preventWindowScroll);
    return () => {
      window.removeEventListener('scroll', preventWindowScroll);
    };
  }, []);

  // Monitor horizontal-only scroll position and update active states + progress.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = ['hero', 'ideas', 'technology', 'strategy', 'footer'];
    const pageMapping: Record<string, 'home' | 'ideas' | 'technology' | 'strategy'> = {
      hero: 'home',
      ideas: 'ideas',
      technology: 'technology',
      strategy: 'strategy',
      footer: 'strategy',
    };

    const handleScroll = () => {
      const width = container.clientWidth;
      if (width <= 0) return;

      const rawIndex = container.scrollLeft / width;
      const index = Math.round(rawIndex);
      const activeId = sections[index] || 'hero';

      setActiveSection(activeId);
      setCurrentPage(pageMapping[activeId]);

      // Calculate progress (0 to 1) for each section based on horizontal center
      sections.forEach((id, idx) => {
        const progress = Math.max(0, Math.min(1, 1 - Math.abs(rawIndex - idx)));
        setScrollProgress(id, progress);
      });
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial run

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setActiveSection, setCurrentPage, setScrollProgress]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const index = Math.round(container.scrollLeft / width);
      const total = 5; // hero, ideas, technology, strategy, footer

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (index < total - 1) {
          container.scrollTo({ left: (index + 1) * width, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (index > 0) {
          container.scrollTo({ left: (index - 1) * width, behavior: 'smooth' });
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        container.scrollTo({ left: (total - 1) * width, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (secId: string) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  const totalSections = 4;
  const sectionIds = ['hero', 'ideas', 'technology', 'strategy'];
  const currentIndex = activeSection === 'footer' ? 3 : sectionIds.indexOf(activeSection);
  const displayIndex = currentIndex !== -1 ? currentIndex : 0;


  return (
    <div className="app-container">
      {/* Header floats on top */}
      <Header />

      {/* Horizontal snapping scroll wrapper */}
      <div
        className="horizontal-experience"
        ref={scrollContainerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* HERO SECTION */}
        <HeroSection scrollToSection={scrollToSection} />

        {/* IDEAS SECTION */}
        <IdeasSection scrollToSection={scrollToSection} />

        {/* TECHNOLOGY SECTION */}
        <Section
          id="technology"
          isActive={activeSection === 'technology'}
          badge="INTELLIGENT BUSINESS ARCHITECTURE • TECHNOLOGY"
          line1="ENGINEERED"
          line2="FOR"
          line3="SCALABILITY & EFFICIENCY"
          description="We build digital foundations that empower modern workflows. By leveraging reliable cloud architectures and future-ready technology stacks, we streamline complex operations."
          pills={['System Integration', 'Scalable Cloud Infrastructures', 'Custom AI & Data Solutions']}
          btnText="Explore Strategy"
          btnAction={() => scrollToSection('strategy')}
          prevText="BACK TO IDEAS"
          prevAction={() => scrollToSection('ideas')}
          subtext="Deploying system integrations, scalable clouds, and custom AI solutions."
          visual={<InteractiveTech />}
        />

        {/* STRATEGY SECTION */}
        <Section
          id="strategy"
          isActive={activeSection === 'strategy'}
          badge="INTELLIGENT BUSINESS ARCHITECTURE • STRATEGY"
          line1="PRACTICAL"
          line2="EXECUTION"
          line3="FOR MEASURABLE IMPACT"
          description="We combine industry insight with rigorous execution to deliver tailored business solutions. We align resources, processes, and tools to ensure seamless transformation and sustainable growth."
          pills={['Operational Optimization', 'Change Architecture', 'Performance Analytics']}
          btnText="Start a Conversation"
          btnAction={() => scrollToSection('footer')}
          prevText="BACK TO TECH"
          prevAction={() => scrollToSection('technology')}
          subtext="Optimizing operations, performance analytics, and transformation architecture."
          visual={<InteractiveStrategy />}
        />

        {/* FOOTER SECTION SLIDE */}
        <div className="footer-section experience-panel" id="footer">
          <Footer scrollToSection={scrollToSection} />
        </div>
      </div>

      {/* Bottom Horizontal Navigation Overlay (Hidden or simplified on short screens) */}
      <div className="horizontal-navigation">
        <div className="nav-indicators">
          <span>0{displayIndex + 1} / 0{totalSections}</span>
          <div className="nav-dots">
            {sectionIds.map((id, idx) => (
              <button
                key={id}
                className={`nav-dot ${displayIndex === idx ? 'active' : ''}`}
                onClick={() => scrollToSection(id)}
                aria-label={`Go to section ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="nav-arrows">
          {displayIndex === 0 && (
            <span className="swipe-instruction">Swipe or Scroll</span>
          )}
          <button
            className="nav-arrow"
            onClick={() => {
              if (displayIndex > 0) {
                scrollToSection(sectionIds[displayIndex - 1]);
              }
            }}
            disabled={displayIndex === 0}
            aria-label="Previous Section"
          >
            ←
          </button>
          <button
            className="nav-arrow"
            onClick={() => {
              if (displayIndex < totalSections - 1) {
                scrollToSection(sectionIds[displayIndex + 1]);
              }
            }}
            disabled={displayIndex === totalSections - 1}
            aria-label="Next Section"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
