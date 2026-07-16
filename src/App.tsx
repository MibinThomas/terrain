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
  headingStyle?: React.CSSProperties;
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
  headingStyle,
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
    <section className="interactive-section" id={id}>
      <div className="section-layout">
        
        {/* Left Column — Content */}
        <div className="section-content">
          <div className="hero-badge">
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
            className="text-gradient hero-title"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: '1.1',
              fontWeight: 'normal',
              letterSpacing: '0.02em',
              color: 'var(--color-black)',
              ...headingStyle,
            }}
          >
            <span className="hero-title-line-1">{renderWaveText(line1)}</span>{' '}
            <span className="hero-title-line-2">{renderWaveText(line2)}</span>
            <span className="hero-title-line-3">{renderWaveText(line3)}</span>
          </motion.h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.7',
              maxWidth: '560px',
              fontWeight: '400',
            }}
          >
            {description}
          </p>

          {pills && pills.length > 0 && (
            <div className="services-pills">
              {pills.map((pill) => (
                <span key={pill} className="service-pill">
                  {pill}
                </span>
              ))}
            </div>
          )}

          <div className="hero-cta-wrapper interactive-element">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={btnAction}
                style={{
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-light)',
                  border: '1px solid var(--color-black)',
                  borderRadius: '30px',
                  padding: '16px 36px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                }}
              >
                {btnText}
              </button>

              {prevAction && (
                <button
                  onClick={prevAction}
                  className="back-cta-btn"
                >
                  <span className="back-arrow">←</span>
                  {prevText}
                </button>
              )}
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
          className="section-visual"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ width: '100%', height: '100%' }} className="interactive-element">
            <Canvas
              shadows
              camera={{ position: [0, 8, 12], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
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
      // Intercept vertical scroll and shift horizontally
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Monitor horizontal scroll position and update active states + progress
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const width = window.innerWidth;

      // 1. Detect Active Section using distance to viewport center
      const sections = ['hero', 'ideas', 'technology', 'strategy', 'footer'];
      let active = 'hero';
      let minDistance = Infinity;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.left + rect.width / 2;
          const viewportCenter = width / 2;
          const dist = Math.abs(elementCenter - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            active = id;
          }
        }
      });

      // Update store
      setActiveSection(active);
      const pageMapping: Record<string, 'home' | 'ideas' | 'technology' | 'strategy'> = {
        hero: 'home',
        ideas: 'ideas',
        technology: 'technology',
        strategy: 'strategy',
        footer: 'strategy',
      };
      setCurrentPage(pageMapping[active]);

      // 2. Calculate progress (0 to 1) for each section and update store
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Calculates entrance progress: 0 when right edge enters viewport, 1 when left edge aligns to 0
          const enterProgress = 1 - rect.left / width;
          const progress = Math.max(0, Math.min(1, enterProgress));

          // Set progress for components to read
          if (id === 'hero') {
            setScrollProgress('hero', progress);
          } else if (id === 'ideas') {
            setScrollProgress('ideas', progress);
          } else if (id === 'technology') {
            setScrollProgress('technology', progress);
          } else if (id === 'strategy' || id === 'footer') {
            // Keep strategy and footer progressing strategy 3D items
            setScrollProgress('strategy', progress);
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    // Initial run to configure progress on load
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveSection, setCurrentPage, setScrollProgress]);

  const scrollToSection = (secId: string) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <div className="app-container">
      {/* Header floats on top */}
      <Header />

      {/* Horizontal snapping scroll wrapper */}
      <div
        className="horizontal-scroll-container"
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
          description="We build digital foundations that empower modern workflows. By leveraging reliable cloud architectures and future-ready technology stacks, we streamline complex operations. Hover the canvas to see scattered data particles consolidate into a structured workstation."
          pills={['System Integration', 'Scalable Cloud Infrastructures', 'Custom AI & Data Solutions']}
          btnText="Explore Strategy Phase"
          btnAction={() => scrollToSection('strategy')}
          prevText="BACK TO IDEAS"
          prevAction={() => scrollToSection('ideas')}
          subtext="Deploying system integrations, scalable clouds, and custom AI solutions."
          visual={<InteractiveTech />}
          headingStyle={{ fontSize: 'clamp(28px, 4.5vw, 48px)' }}
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
          btnText="Connect With Us"
          btnAction={() => scrollToSection('footer')}
          prevText="BACK TO TECH"
          prevAction={() => scrollToSection('technology')}
          subtext="Optimizing operations, performance analytics, and transformation architecture."
          visual={<InteractiveStrategy />}
        />

        {/* FOOTER SECTION SLIDE */}
        <div className="footer-section" id="footer">
          <Footer scrollToSection={scrollToSection} />
        </div>
      </div>
    </div>
  );
}

export default App;
