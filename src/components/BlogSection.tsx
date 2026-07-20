import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowUpRight, X, User, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

interface BlogSectionProps {
  scrollToSection: (id: string) => void;
}

interface BlogPost {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
}

const articles: BlogPost[] = [
  {
    id: '1',
    category: 'Architecture',
    title: 'Designing Cloud Architectures for High Availability',
    date: 'Jul 15, 2026',
    readTime: '5 min read',
    author: 'Mibin Thomas',
    excerpt: 'Key patterns for building resilient, auto-scaling cloud environments capable of handling dynamic traffic surges.',
    content: [
      'In today’s digital ecosystem, system downtime translates directly to lost revenue and customer trust. Modern cloud architectures must be engineered with resilience as a primary requirement.',
      'By decoupling microservices, implementing multi-region redundancy, and establishing automated failovers, organizations can achieve 99.99% operational uptime.',
      'We examine how intelligent load balancing and proactive observability form the bedrock of continuous digital performance.'
    ]
  },
  {
    id: '2',
    category: 'AI Integration',
    title: 'Translating AI Innovation into Enterprise Value',
    date: 'Jul 10, 2026',
    readTime: '7 min read',
    author: 'Strategy Team',
    excerpt: 'Moving beyond proof-of-concept models to deploy scalable, secure machine learning workflows in production.',
    content: [
      'Artificial intelligence is shifting from experimental lab projects to business-critical production workloads. However, scaling AI requires more than training accurate models.',
      'Enterprise integration requires robust data governance, model monitoring pipelines, and clear latency SLAs that align directly with organizational goals.',
      'We share our framework for evaluating AI readiness and integrating predictive intelligent agents into existing enterprise software.'
    ]
  },
  {
    id: '3',
    category: 'Strategy',
    title: 'The Art of Change Architecture in Tech Transformation',
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    author: 'Leadership',
    excerpt: 'Why technology initiatives succeed or fail based on organizational alignment, change velocity, and team adoption.',
    content: [
      'Technology upgrades fail when human processes are left out of the architecture. Successful digital transformation requires building alignment across all operational tiers.',
      'Change architecture combines clear communication cadences, role-based enablement, and incremental deployment cycles to minimize disruption.',
      'Discover how structured feedback loops accelerate technology adoption across distributed enterprise teams.'
    ]
  }
];

export default function BlogSection({ scrollToSection }: BlogSectionProps) {
  const activeSection = useStore((state) => state.activeSection);
  const isActive = activeSection === 'blog';
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <>
      <section className="experience-panel interactive-section" id="blog">
        <div className="panel-inner blog-panel-inner">
          <div className="panel-content blog-panel-content">
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
              INTELLIGENT BUSINESS ARCHITECTURE • INSIGHTS
            </div>

            <h2 className="text-gradient panel-heading blog-heading">
              THOUGHT LEADERSHIP & STRATEGIC PERSPECTIVES
            </h2>

            <p className="panel-description blog-description">
              Explore technical analysis, strategic frameworks, and industry insights written by our business architects.
            </p>

            {/* Articles Grid */}
            <div className="blog-grid-container">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="blog-card-modern interactive-element"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="blog-card-header">
                    <span className="blog-category-tag">{article.category}</span>
                    <span className="blog-read-time">
                      <Clock size={12} style={{ marginRight: '4px' }} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="blog-card-title">{article.title}</h3>
                  <p className="blog-card-excerpt">{article.excerpt}</p>

                  <div className="blog-card-footer">
                    <span className="blog-card-author">{article.author} • {article.date}</span>
                    <span className="blog-read-link">
                      Read <ArrowUpRight size={14} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* CTA & Navigation */}
            <div className="hero-cta-wrapper interactive-element" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => scrollToSection('services')}
                  className="back-cta-btn"
                  aria-label="Back to Services"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="panel-cta"
                >
                  GET IN TOUCH / CONTACT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Detail Modal Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="blog-modal-backdrop interactive-element"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="blog-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="blog-modal-close"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close Article"
              >
                <X size={20} />
              </button>

              <div className="blog-modal-header">
                <span className="blog-category-tag">{selectedArticle.category}</span>
                <h2 className="blog-modal-title">{selectedArticle.title}</h2>
                
                <div className="blog-modal-meta">
                  <span><User size={14} style={{ marginRight: '4px' }} /> {selectedArticle.author}</span>
                  <span><Calendar size={14} style={{ marginRight: '4px' }} /> {selectedArticle.date}</span>
                  <span><Clock size={14} style={{ marginRight: '4px' }} /> {selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="blog-modal-body">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
