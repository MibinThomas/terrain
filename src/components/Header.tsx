import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <header className="interactive-element glass-panel" style={styles.header}>
      <div style={styles.logoContainer}>
        <img 
          src="/brand/logo/logo-header.png" 
          alt="Terrain Business Solutions" 
          style={styles.logoImage}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      
      {/* Hamburger Toggle Button on the Right */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.menuToggle}
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? (
          <X size={22} color="var(--color-black)" />
        ) : (
          <Menu size={22} color="var(--color-black)" />
        )}
      </button>

      {/* Fullscreen Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={styles.dropdownFullscreen}
          >
            <nav style={styles.navVertical}>
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                onClick={() => handleLinkClick('ideas')} 
                className="fullscreen-nav-link"
              >
                Ideas
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                onClick={() => handleLinkClick('technology')} 
                className="fullscreen-nav-link"
              >
                Technology
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.5 }}
                onClick={() => handleLinkClick('strategy')} 
                className="fullscreen-nav-link"
              >
                Strategy
              </motion.button>
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 0.15, width: '100%' }}
                transition={{ delay: 0.35, duration: 0.4 }}
                style={styles.dropdownDivider}
              ></motion.div>
              
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.5 }}
                onClick={() => handleLinkClick('services')} 
                style={styles.ctaButtonVertical}
              >
                Explore Solutions
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: '24px',
    left: '0',
    right: '0',
    margin: '0 auto',
    width: 'calc(100% - 48px)',
    maxWidth: '1200px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    borderRadius: '16px',
    zIndex: 100,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 102, // Kept above dropdown drawer
  },
  logoImage: {
    height: '52px',
    width: 'auto',
    objectFit: 'contain',
  },
  menuToggle: {
    background: 'rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '50%',
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 102, // Kept above dropdown drawer
  },
  dropdownFullscreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(230, 231, 232, 0.94)', // Translucent light grey #e6e7e8
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  navVertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    alignItems: 'center',
    width: '80%',
    maxWidth: '500px',
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: 'var(--color-black)',
    margin: '12px 0',
  },
  ctaButtonVertical: {
    background: 'var(--color-black)',
    color: 'var(--color-light)',
    border: '1px solid var(--color-black)',
    borderRadius: '30px',
    padding: '16px 40px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
  },
};
