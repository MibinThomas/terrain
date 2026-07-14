import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroOverlay() {
  const scrollToSolutions = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Natural scroll-linked fade out for the hero overlay text
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const y = useTransform(scrollY, [0, 450], [0, -60]);
  const scale = useTransform(scrollY, [0, 450], [1, 0.95]);

  const line1Text = "Building Smarter";
  const line2Text = "Business Landscapes.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035, // smooth, fast flowing wave stagger
        delayChildren: 0.15,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 22,
      scale: 0.8,
      rotate: 8,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1] as any, // Easing curve with subtle bounce
      }
    }
  };

  const renderWaveText = (text: string) => {
    return text.split(" ").map((word, wordIndex) => (
      <span 
        key={wordIndex} 
        style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.24em' }}
      >
        {word.split("").map((char, charIndex) => (
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
      <motion.div style={{ opacity, y, scale }} className="content-hero">
        {/* Subtle top indicator */}
        <div style={styles.badge}>
          <span style={styles.badgeDot}></span>
          INTELLIGENT BUSINESS ARCHITECTURE
        </div>

        {/* Hero Title with Wave Character Animation */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={styles.title} 
          className="text-gradient hero-title"
        >
          <span style={{ display: 'block' }}>
            {renderWaveText(line1Text)}
          </span>
          <span style={{ display: 'block' }}>
            {renderWaveText(line2Text)}
          </span>
        </motion.h1>

        {/* Hero Description */}
        <p style={styles.description}>
          We transform ideas, technology, and strategy into intelligent, tailor-made business 
          solutions designed for sustainable growth, operational optimization, and measurable impact.
        </p>

        {/* Call to Action Button */}
        <div className="hero-cta-wrapper interactive-element">
          <button 
            onClick={scrollToSolutions} 
            style={styles.ctaButton}
          >
            Explore Solutions
          </button>
          
          <div style={styles.ctaSubtext}>
            Deploying efficient, scalable, and future-ready business ecosystems.
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="scroll-indicator-container"
      >
        <div style={styles.scrollIndicator}>
          <span style={styles.scrollText}>Interact with the 3D Terrain or Scroll</span>
          <div style={styles.scrollMouse}>
            <div style={styles.scrollWheel}></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  badge: {
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.15em',
    color: 'var(--color-text-secondary)',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(4px)',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-black)',
    boxShadow: '0 0 4px var(--color-black)',
  },
  title: {
    fontSize: 'clamp(36px, 6vw, 64px)',
    lineHeight: '1.1',
    fontWeight: 'normal',
    letterSpacing: '0.02em',
    color: 'var(--color-black)',
  },
  description: {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.7',
    maxWidth: '650px',
    fontWeight: '400',
  },

  ctaButton: {
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
  },
  ctaSubtext: {
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    marginLeft: '4px',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    pointerEvents: 'none',
  },
  scrollText: {
    fontSize: '11px',
    letterSpacing: '0.1em',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
  },
  scrollMouse: {
    width: '20px',
    height: '32px',
    borderRadius: '10px',
    border: '1.5px solid var(--color-text-secondary)',
    position: 'relative',
    opacity: 0.8,
    margin: '0 auto',
  },
  scrollWheel: {
    width: '3px',
    height: '6px',
    borderRadius: '1.5px',
    backgroundColor: 'var(--color-black)',
    position: 'absolute',
    top: '6px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};
