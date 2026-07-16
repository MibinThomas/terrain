import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (page: 'home' | 'ideas' | 'technology' | 'strategy') => {
    setIsOpen(false);
    const targetId = page === 'home' ? 'hero' : page;
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }, 300);
  };

  return (
    <>
      <header className="site-header interactive-element">
        <div 
          style={{ ...styles.logoContainer, cursor: 'pointer' }}
          onClick={() => {
            const el = document.getElementById('hero');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
          }}
        >
          <img 
            src="/brand/logo/logo-header.png" 
            alt="Terrain Business Solutions" 
            className="logo-img"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* Hamburger Toggle Button on the Right (hidden or covered when open) */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="menu-toggle-btn"
          aria-label="Open Navigation Menu"
        >
          <div className="custom-hamburger">
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
          </div>
        </button>
      </header>

      {/* Fullscreen Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fullscreen-drawer interactive-element"
          >
            {/* Closing Icon on the Left Top */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="drawer-close-btn"
              aria-label="Close Navigation Menu"
            >
              <div className="custom-close">
                <span className="close-line line-1"></span>
                <span className="close-line line-2"></span>
              </div>
            </button>

            {/* Centered Navigation Menu */}
            <nav style={styles.navVertical}>
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                onClick={() => handleLinkClick('ideas')} 
                className="fullscreen-nav-link"
              >
                Ideas
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.4 }}
                onClick={() => handleLinkClick('technology')} 
                className="fullscreen-nav-link"
              >
                Technology
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.19, duration: 0.4 }}
                onClick={() => handleLinkClick('strategy')} 
                className="fullscreen-nav-link"
              >
                Strategy
              </motion.button>
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 0.15, width: '100%' }}
                transition={{ delay: 0.28, duration: 0.4 }}
                style={styles.dropdownDivider}
              ></motion.div>
              
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                onClick={() => handleLinkClick('home')} 
                style={styles.ctaButtonVertical}
              >
                Explore Solutions
              </motion.button>
            </nav>

            {/* Logo in the Bottom Center of the Drawer */}
            <img 
              src="/brand/logo/logo-header.png" 
              alt="Terrain Business Solutions" 
              className="drawer-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 102,
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
    width: '100%',
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
