import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer} className="glass-panel">
      <div style={styles.container}>
        <div style={styles.mainGrid}>
          <div style={styles.brandCol}>
            <div style={styles.logoArea}>
              <span style={styles.logoText}>TERRAIN</span>
              <span style={styles.logoSubtitle}>BUSINESS SOLUTIONS</span>
            </div>
            <p style={styles.brandStatement}>
              Transforming ideas, technology, and strategy into intelligent business solutions for a modern corporate landscape.
            </p>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Ecosystem</h4>
            <ul style={styles.linksList}>
              <li><a href="#ideas" style={styles.link}>Ideas</a></li>
              <li><a href="#technology" style={styles.link}>Technology</a></li>
              <li><a href="#strategy" style={styles.link}>Strategy</a></li>
            </ul>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Company</h4>
            <ul style={styles.linksList}>
              <li><a href="#services" style={styles.link}>Services</a></li>
              <li><a href="#solutions" style={styles.link}>Solutions</a></li>
              <li><a href="#consultation" style={styles.link}>Consultation</a></li>
            </ul>
          </div>

          <div style={styles.contactCol}>
            <h4 style={styles.colTitle}>Connect</h4>
            <span style={styles.contactEmail}>info@terrainbusiness.com</span>
            <span style={styles.contactWeb}>www.terrainbusiness.com</span>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Terrain Business Solutions. All rights reserved.
          </p>
          
          <button onClick={scrollToTop} style={styles.scrollBtn} className="interactive-element">
            Back to top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#dbdcde',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    padding: '80px 8% 40px 8%',
    position: 'relative',
    zIndex: 2,
    borderRadius: '24px 24px 0 0',
    marginTop: '60px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '48px',
    marginBottom: '64px',
  },
  brandCol: {
    gridColumn: 'span 2',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoText: {
    fontFamily: 'var(--font-title)',
    fontSize: '22px',
    letterSpacing: '0.1em',
    color: 'var(--color-black)',
  },
  logoSubtitle: {
    fontSize: '9px',
    letterSpacing: '0.22em',
    color: 'var(--color-text-secondary)',
  },
  brandStatement: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.6',
    maxWidth: '380px',
    fontWeight: '400',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  colTitle: {
    fontSize: '12px',
    letterSpacing: '0.12em',
    color: 'var(--color-black)',
    textTransform: 'uppercase',
  },
  linksList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    fontSize: '13px',
    transition: 'color 0.2s ease',
    fontWeight: '500',
  },
  contactCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactEmail: {
    fontSize: '14px',
    color: 'var(--color-black)',
    fontWeight: '600',
  },
  contactWeb: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
  },
  divider: {
    height: '1px',
    background: 'rgba(0, 0, 0, 0.08)',
    marginBottom: '32px',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  copyright: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.45)',
    fontWeight: '400',
  },
  scrollBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-black)',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '600',
  },
};
