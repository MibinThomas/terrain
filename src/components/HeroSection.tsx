import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import InteractiveTerrain from './InteractiveTerrain';

interface HeroSectionProps {
  scrollToSection: (secId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const activeSection = useStore((state) => state.activeSection);
  const setHovered = useStore((state) => state.setHovered);
  const isActive = activeSection === 'hero';

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
        ease: [0.16, 1, 0.3, 1] as any,
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
    <section className="hero-section" id="hero">
      <div className="hero-grid-container">
        
        {/* Left Column - Hero Content */}
        <div className="hero-left-column">
          {/* Eyebrow badge */}
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
            INTELLIGENT BUSINESS ARCHITECTURE
          </div>

          {/* Heading */}
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
            }}
          >
            <span className="hero-title-line-1">{renderWaveText("BUILDING")}</span>{' '}
            <span className="hero-title-line-2">{renderWaveText("SMARTER")}</span>
            <span className="hero-title-line-3">{renderWaveText("BUSINESS LANDSCAPES")}</span>
          </motion.h1>

          {/* Supporting paragraph */}
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.7',
              maxWidth: '560px',
              fontWeight: '400',
            }}
          >
            We transform ideas, technology, and strategy into intelligent, tailor-made business solutions designed for sustainable growth, operational optimization, and measurable impact.
          </p>

          {/* Primary CTA and Subtext */}
          <div className="hero-cta-wrapper interactive-element">
            <button
              onClick={() => scrollToSection('ideas')}
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
              Explore Solutions
            </button>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginLeft: '4px',
                marginTop: '8px',
              }}
            >
              Deploying efficient, scalable, and future-ready business ecosystems.
            </div>
          </div>
        </div>

        {/* Right Column - Interactive 3D Object */}
        <div 
          className="hero-right-column"
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
                  <InteractiveTerrain />
                </Suspense>
              </Center>
              
              {/* Shadow Catcher Ground Plane */}
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
