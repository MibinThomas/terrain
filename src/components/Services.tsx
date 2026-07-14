import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Target, ArrowUpRight } from 'lucide-react';

const pillars = [
  {
    id: 'ideas',
    title: 'Ideas',
    icon: Lightbulb,
    summary: 'Transforming visions into actionable concepts.',
    description: 'We unlock new opportunities by applying strategic thinking and structured creativity. We analyze business terrain to discover growth avenues and formulate plans designed for long-term scalability.',
    list: ['Strategic Blueprinting', 'Innovation Workshops', 'Opportunity Mapping']
  },
  {
    id: 'technology',
    title: 'Technology',
    icon: Cpu,
    summary: 'Engineered for scalability and efficiency.',
    description: 'We build digital foundations that empower modern workflows. By leveraging modern software patterns, reliable architectures, and future-ready technology stacks, we streamline complex operations.',
    list: ['System Integration', 'Scalable Cloud Infrastructures', 'Custom AI & Data Solutions']
  },
  {
    id: 'strategy',
    title: 'Strategy',
    icon: Target,
    summary: 'Practical execution for measurable impact.',
    description: 'We combine industry insight with rigorous execution to deliver tailored business solutions. We align resources, processes, and tools to ensure seamless transformation and sustainable business growth.',
    list: ['Operational Optimization', 'Change Architecture', 'Performance Analytics']
  }
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div style={styles.headerArea}>
          <h2 style={styles.sectionTitle} className="text-gradient">How We Engineer Success</h2>
          <p style={styles.sectionSubtitle}>
            Terrain Business Solutions bridges the gap between vision and execution by integrating three key organizational pillars.
          </p>
        </div>

        <div className="services-grid">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="service-card interactive-element"
              >
                <div style={styles.cardHeader} className="cardHeader">
                  <div style={styles.iconContainer}>
                    <IconComponent size={24} color="var(--color-black)" />
                  </div>
                  <span style={styles.cardNumber}>0{index + 1}</span>
                </div>
                
                <h3 style={styles.cardTitle}>{pillar.title}</h3>
                <p style={styles.cardSummary}>{pillar.summary}</p>
                <p style={styles.cardDescription}>{pillar.description}</p>
                
                <div style={styles.divider}></div>
                
                <ul style={styles.list}>
                  {pillar.list.map((item) => (
                    <li key={item} style={styles.listItem}>
                      <span style={styles.listBullet}></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="#contact" style={styles.learnMore}>
                  Request Consultation <ArrowUpRight size={16} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  headerArea: {
    textAlign: 'center',
    marginBottom: '64px',
    padding: '0 20px',
  },
  sectionTitle: {
    fontSize: 'clamp(28px, 4vw, 44px)',
    lineHeight: '1.2',
    marginBottom: '16px',
    color: 'var(--color-black)',
  },
  sectionSubtitle: {
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    color: 'var(--color-text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
    fontWeight: '400',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    width: '100%',
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
  learnMore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-black)',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'color 0.2s ease',
  },
};
