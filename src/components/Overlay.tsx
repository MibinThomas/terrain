import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Lightbulb, Cpu, Target, ArrowUpRight, ArrowDown } from 'lucide-react';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Slide 1: Hero
  const opacityHero = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.18, 0.25], [0, 0, -60]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0.95]);

  // Slide 2: Ideas (positioned on the left)
  const opacityIdeas = useTransform(scrollYProgress, [0.2, 0.28, 0.48, 0.55], [0, 1, 1, 0]);
  const xIdeas = useTransform(scrollYProgress, [0.2, 0.28, 0.48, 0.55], [-50, 0, 0, -50]);

  // Slide 3: Technology (positioned on the right)
  const opacityTech = useTransform(scrollYProgress, [0.5, 0.58, 0.78, 0.85], [0, 1, 1, 0]);
  const xTech = useTransform(scrollYProgress, [0.5, 0.58, 0.78, 0.85], [50, 0, 0, 50]);

  // Slide 4: Strategy (positioned on the left or center)
  const opacityStrategy = useTransform(scrollYProgress, [0.8, 0.88, 0.98], [0, 1, 0]);
  const yStrategy = useTransform(scrollYProgress, [0.8, 0.88, 0.98], [40, 0, -40]);

  const scrollToNext = (progressTarget: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: maxScroll * progressTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div style={styles.overlayContainer}>
      {/* 1. HERO SLIDE */}
      <motion.div style={{ opacity: opacityHero, y: yHero, scale: scaleHero, ...styles.slide, ...styles.centerSlide }}>
        <div style={styles.contentHero}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            INTELLIGENT BUSINESS ARCHITECTURE
          </div>
          <h1 style={styles.title} className="text-gradient">
            Building Smarter<br />
            Business Landscapes.
          </h1>
          <p style={styles.description}>
            We transform ideas, technology, and strategy into intelligent, tailor-made business 
            solutions designed for sustainable growth, operational optimization, and measurable impact.
          </p>
          <div style={styles.ctaWrapper} className="interactive-element">
            <button onClick={() => scrollToNext(0.3)} style={styles.ctaButton}>
              Explore Ideas
            </button>
            <div style={styles.ctaSubtext}>
              Deploying efficient, scalable, and future-ready business ecosystems.
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. IDEAS SLIDE */}
      <motion.div style={{ opacity: opacityIdeas, x: xIdeas, ...styles.slide, ...styles.leftSlide }}>
        <div className="glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer}>
              <Lightbulb size={24} color="var(--color-black)" />
            </div>
            <span style={styles.cardNumber}>01</span>
          </div>
          <h2 style={styles.cardTitle}>Ideas</h2>
          <p style={styles.cardSummary}>Transforming visions into actionable concepts.</p>
          <p style={styles.cardDescription}>
            We unlock new opportunities by applying strategic thinking and structured creativity. We analyze business terrain to discover growth avenues and formulate plans designed for long-term scalability.
          </p>
          <div style={styles.divider}></div>
          <ul style={styles.list}>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Strategic Blueprinting</li>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Innovation Workshops</li>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Opportunity Mapping</li>
          </ul>
          <div className="interactive-element">
            <button onClick={() => scrollToNext(0.6)} style={styles.arrowLink}>
              Next: Technology <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3. TECHNOLOGY SLIDE */}
      <motion.div style={{ opacity: opacityTech, x: xTech, ...styles.slide, ...styles.rightSlide }}>
        <div className="glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer}>
              <Cpu size={24} color="var(--color-black)" />
            </div>
            <span style={styles.cardNumber}>02</span>
          </div>
          <h2 style={styles.cardTitle}>Technology</h2>
          <p style={styles.cardSummary}>Engineered for scalability and efficiency.</p>
          <p style={styles.cardDescription}>
            We build digital foundations that empower modern workflows. By leveraging modern software patterns, reliable architectures, and future-ready technology stacks, we streamline complex operations.
          </p>
          <div style={styles.divider}></div>
          <ul style={styles.list}>
            <li style={styles.listItem}><span style={styles.listBullet}></span>System Integration</li>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Scalable Cloud Infrastructures</li>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Custom AI & Data Solutions</li>
          </ul>
          <div className="interactive-element">
            <button onClick={() => scrollToNext(0.95)} style={styles.arrowLink}>
              Next: Strategy <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4. STRATEGY SLIDE */}
      <motion.div style={{ opacity: opacityStrategy, y: yStrategy, ...styles.slide, ...styles.leftSlide }}>
        <div className="glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer}>
              <Target size={24} color="var(--color-black)" />
            </div>
            <span style={styles.cardNumber}>03</span>
          </div>
          <h2 style={styles.cardTitle}>Strategy</h2>
          <p style={styles.cardSummary}>Practical execution for measurable impact.</p>
          <p style={styles.cardDescription}>
            We combine industry insight with rigorous execution to deliver tailored business solutions. We align resources, processes, and tools to ensure seamless transformation and sustainable business growth.
          </p>
          <div style={styles.divider}></div>
          <ul style={styles.list}>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Operational Optimization</li>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Change Architecture</li>
            <li style={styles.listItem}><span style={styles.listBullet}></span>Performance Analytics</li>
          </ul>
          <div className="interactive-element" style={styles.ctaWrapper}>
            <a href="#contact" style={styles.ctaButton}>
              Request Consultation <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  slide: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8%',
    boxSizing: 'border-box',
  },
  centerSlide: {
    justifyContent: 'flex-start',
  },
  leftSlide: {
    justifyContent: 'flex-start',
  },
  rightSlide: {
    justifyContent: 'flex-end',
  },
  contentHero: {
    maxWidth: '750px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
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
  ctaWrapper: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
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
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  ctaSubtext: {
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    marginLeft: '4px',
  },
  card: {
    padding: '40px',
    width: '100%',
    maxWidth: '460px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    background: 'var(--color-card-bg)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 0, 0, 0.06)',
  },
  cardNumber: {
    fontFamily: 'var(--font-title)',
    fontSize: '20px',
    color: 'rgba(0, 0, 0, 0.15)',
  },
  cardTitle: {
    fontSize: '26px',
    marginBottom: '8px',
    letterSpacing: '0.05em',
    color: 'var(--color-black)',
  },
  cardSummary: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-black)',
    marginBottom: '16px',
  },
  cardDescription: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.6',
    fontWeight: '400',
    marginBottom: '24px',
  },
  divider: {
    height: '1px',
    background: 'rgba(0, 0, 0, 0.08)',
    margin: 'auto 0 20px 0',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '28px',
  },
  listItem: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '500',
  },
  listBullet: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-secondary)',
    opacity: 0.5,
  },
  arrowLink: {
    background: 'none',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-black)',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
};
