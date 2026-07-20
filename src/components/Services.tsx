import { motion } from 'framer-motion';
import { Lightbulb, Cpu, Target, ArrowUpRight } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ServicesProps {
  scrollToSection: (id: string) => void;
}

const pillars = [
  {
    id: 'ideas',
    title: 'Ideas & Architecture',
    icon: Lightbulb,
    summary: 'Transforming raw concepts into strategic blueprints.',
    description: 'We analyze terrain to formulate clear growth roadmaps designed for long-term scalability.',
    list: ['Strategic Blueprinting', 'Innovation Workshops', 'Opportunity Mapping']
  },
  {
    id: 'technology',
    title: 'Technology Systems',
    icon: Cpu,
    summary: 'Engineered for high performance and reliability.',
    description: 'We construct digital foundations that streamline complex enterprise operations.',
    list: ['System Integration', 'Scalable Cloud Infrastructures', 'Custom AI & Data Solutions']
  },
  {
    id: 'strategy',
    title: 'Execution & Growth',
    icon: Target,
    summary: 'Practical execution for measurable business impact.',
    description: 'We align resources, processes, and analytical tools to ensure seamless transformation.',
    list: ['Operational Optimization', 'Change Architecture', 'Performance Analytics']
  }
];

export default function Services({ scrollToSection }: ServicesProps) {
  const activeSection = useStore((state) => state.activeSection);
  const isActive = activeSection === 'services';

  return (
    <section className="experience-panel interactive-section" id="services">
      <div className="panel-inner services-panel-inner">
        {/* Left Column — Content & Pillars */}
        <div className="panel-content services-panel-content">
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
            INTELLIGENT BUSINESS ARCHITECTURE • SERVICES
          </div>

          <h2 className="text-gradient panel-heading services-heading">
            TAILORED SOLUTIONS FOR SUSTAINABLE GROWTH
          </h2>

          <p className="panel-description services-description">
            We bridge the gap between ambitious vision and tactical execution across three core organizational capabilities.
          </p>

          {/* Cards Grid */}
          <div className="services-grid-container">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="service-card-modern interactive-element"
                >
                  <div className="service-card-top">
                    <div className="service-icon-box">
                      <IconComponent size={20} color="var(--color-black)" />
                    </div>
                    <span className="service-num">0{index + 1}</span>
                  </div>

                  <h3 className="service-card-title">{pillar.title}</h3>
                  <p className="service-card-summary">{pillar.summary}</p>
                  
                  <ul className="service-card-list">
                    {pillar.list.map((item) => (
                      <li key={item}>
                        <span className="service-bullet"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="service-card-btn"
                  >
                    Request Consultation <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* CTA & Navigation Buttons */}
          <div className="hero-cta-wrapper interactive-element" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollToSection('strategy')}
                className="back-cta-btn"
                aria-label="Back to Strategy"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>

              <button
                onClick={() => scrollToSection('blog')}
                className="panel-cta"
              >
                EXPLORE INSIGHTS & BLOG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
