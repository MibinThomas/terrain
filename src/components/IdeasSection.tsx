import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { useStore } from '../store/useStore';
import InteractiveIdeas from './InteractiveIdeas';

interface IdeasSectionProps {
  scrollToSection: (secId: string) => void;
}

export default function IdeasSection({ scrollToSection }: IdeasSectionProps) {
  const activeSection = useStore((state) => state.activeSection);
  const isActive = activeSection === 'ideas';

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
    <section className="experience-panel interactive-section" id="ideas">
      <div className="panel-inner ideas-layout">
        
        {/* Left Column — Ideas Content */}
        <div className="panel-content ideas-content">
          <div className="panel-label hero-badge" style={{ marginBottom: '16px' }}>
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
            INTELLIGENT BUSINESS ARCHITECTURE · IDEAS
          </div>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            className="text-gradient panel-heading ideas-heading"
          >
            <span className="hero-title-line-1" style={{ display: 'block' }}>{renderWaveText("CAPTURING")}</span>
            <span className="hero-title-line-2" style={{ display: 'block', marginTop: '4px' }}>{renderWaveText("RAW IDEAS,")}</span>
            <span className="hero-title-line-3" style={{ display: 'block', marginTop: '4px' }}>{renderWaveText("SHAPING THE FUTURE")}</span>
          </motion.h1>

          <p className="panel-description ideas-description">
            We transform unstructured ideas, concepts, and ambitions into clear, scalable business opportunities through strategic thinking, innovation, and structured execution.
          </p>

          <div className="ideas-tags desktop-only-pills">
            <span className="ideas-tag">Strategic Blueprinting</span>
            <span className="ideas-tag">Innovation Workshops</span>
            <span className="ideas-tag">Opportunity Mapping</span>
          </div>

          <div className="mobile-tags mobile-only-tags">
            <span className="mobile-tag">Strategic Blueprinting</span>
            <span className="mobile-tag">Innovation Workshops</span>
          </div>

          <div className="hero-cta-wrapper interactive-element" style={{ marginTop: 'clamp(20px, 3vh, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollToSection('hero')}
                className="back-cta-btn"
                aria-label="Back to Hero"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>

              <button
                onClick={() => scrollToSection('technology')}
                className="panel-cta"
              >
                EXPLORE TECHNOLOGY
              </button>
            </div>

            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                opacity: 0.72,
                marginLeft: '4px',
                marginTop: '12px',
              }}
            >
              Move your cursor across the visual to interact with the 3D model.
            </div>
          </div>
        </div>

        {/* Right Column — Interactive 3D Visual */}
        <div className="panel-visual ideas-visual">
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
                  <InteractiveIdeas />
                </Suspense>
              </Center>

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
