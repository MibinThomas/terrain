import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../store/useStore';

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

  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setHovered = useStore((state) => state.setHovered);

  // Dynamic content configurations based on active page state
  const pageConfigs = {
    home: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE",
      line1: "BUILDING",
      line2: "SMARTER",
      line3: "BUSINESS LANDSCAPES",
      description: "We transform ideas, technology, and strategy into intelligent, tailor-made business solutions designed for sustainable growth, operational optimization, and measurable impact.",
      btnText: "Explore Solutions",
      btnAction: scrollToSolutions,
      subtext: "Deploying efficient, scalable, and future-ready business ecosystems."
    },
    ideas: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE • IDEAS",
      line1: "CAPTURING",
      line2: "RAW IDEAS",
      line3: "SHAPING THE FUTURE",
      description: "We capture your unstructured ideas, concepts, and visions, and funnel them through our strategic innovation engine. Move your cursor over the canvas to watch how we attract, organize, and mold floating thoughts into cohesive, high-performance corporate architectures.",
      btnText: "Explore Tech Phase",
      btnAction: () => setCurrentPage('technology'),
      subtext: "Hover the canvas to see how we attract, organize, and structure raw ideas."
    },
    technology: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE • TECHNOLOGY",
      line1: "ENGINEERED",
      line2: "FOR",
      line3: "SCALABILITY & EFFICIENCY",
      description: "We build digital foundations that empower modern workflows. By leveraging reliable cloud architectures and future-ready technology stacks, we streamline complex operations. Hover the canvas to see scattered data particles consolidate into a structured workstation.",
      btnText: "Explore Strategy Phase",
      btnAction: () => setCurrentPage('strategy'),
      subtext: "Deploying system integrations, scalable clouds, and custom AI solutions."
    },
    strategy: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE • STRATEGY",
      line1: "PRACTICAL",
      line2: "EXECUTION",
      line3: "FOR MEASURABLE IMPACT",
      description: "We combine industry insight with rigorous execution to deliver tailored business solutions. We align resources, processes, and tools to ensure seamless transformation and sustainable growth.",
      btnText: "Request Consultation",
      btnAction: () => {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      },
      subtext: "Optimizing operations, performance analytics, and transformation architecture."
    },
    services: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE • SERVICES",
      line1: "TAILORED",
      line2: "SOLUTIONS FOR",
      line3: "SUSTAINABLE GROWTH",
      description: "We bridge the gap between ambitious vision and tactical execution across three core organizational capabilities.",
      btnText: "Explore Blog & Insights",
      btnAction: () => setCurrentPage('blog'),
      subtext: "Ideas, Technology, and Strategy engineered for enterprise impact."
    },
    blog: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE • INSIGHTS",
      line1: "THOUGHT",
      line2: "LEADERSHIP &",
      line3: "STRATEGIC PERSPECTIVES",
      description: "Explore technical analysis, strategic frameworks, and industry insights written by our business architects.",
      btnText: "Get in Touch",
      btnAction: () => setCurrentPage('contact'),
      subtext: "In-depth perspectives on architecture, AI, and business transformation."
    },
    contact: {
      badge: "INTELLIGENT BUSINESS ARCHITECTURE • CONTACT",
      line1: "START A",
      line2: "CONVERSATION WITH",
      line3: "OUR ARCHITECTS",
      description: "Ready to engineer a scalable digital foundation or optimize enterprise operations? Send us a message to schedule a consultation.",
      btnText: "Return to Home",
      btnAction: () => setCurrentPage('home'),
      subtext: "Direct response from senior architects within 24 business hours."
    }
  };

  const config = pageConfigs[currentPage as keyof typeof pageConfigs] || pageConfigs.home;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08, // slower flowing wave stagger
        delayChildren: 0.2,
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
        duration: 1.1, // slower animation duration
        ease: [0.34, 1.56, 0.64, 1] as any, // Easing curve with subtle bounce
        repeat: Infinity,
        repeatType: "reverse" as any,
        repeatDelay: 2.2, // wait 2.2 seconds before reversing/repeating
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
      <motion.div
        key={currentPage}
        style={{ opacity, y, scale }}
        className="content-hero"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Subtle top indicator */}
        <div className="hero-badge">
          <span style={styles.badgeDot}></span>
          {config.badge}
        </div>

        {/* Hero Title with Wave Character Animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={styles.title}
          className="text-gradient hero-title"
        >
          <span className="hero-title-line-1">
            {renderWaveText(config.line1)}
          </span>{" "}
          <span className="hero-title-line-2">
            {renderWaveText(config.line2)}
          </span>
          <span className="hero-title-line-3">
            {renderWaveText(config.line3)}
          </span>
        </motion.h1>

        {/* Hero Description */}
        <p style={styles.description}>
          {config.description}
        </p>

        {/* Call to Action Button */}
        <div className="hero-cta-wrapper interactive-element">
          <button
            onClick={config.btnAction}
            style={styles.ctaButton}
          >
            {config.btnText}
          </button>

          <div style={styles.ctaSubtext}>
            {config.subtext}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="scroll-indicator-container"
      >
        <div style={styles.scrollIndicator}>
          <span style={styles.scrollText}>Interact with the 3D Terrain</span>
          <div style={styles.scrollMouse}>
            <div style={styles.scrollWheel}></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  badgeDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-black)',
    boxShadow: '0 0 3px var(--color-black)',
  },
  title: {
    fontSize: 'clamp(18px, 3vw, 32px)',
    lineHeight: '1.3',
    fontWeight: 'normal',
    letterSpacing: 'calc(0.02em + 1px)',
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
