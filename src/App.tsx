import { useScroll } from 'framer-motion';
import TerrainCanvas from './components/TerrainCanvas';
import Header from './components/Header';
import Overlay from './components/Overlay';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="app-container">
      {/* 3D R3F Canvas in fixed background */}
      <TerrainCanvas />

      {/* Parallax scrollable container (400vh scroll height) */}
      <div className="parallax-scroll-container" style={styles.scrollContainer}>
        
        {/* Fixed UI panel (100vh viewport overlay) */}
        <div className="parallax-fixed-ui" style={styles.fixedUi}>
          <Header />
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
        
        {/* Scrollable Spacers */}
        <div style={styles.spacer300}></div>
        
        {/* Footer slides up into view at the very end */}
        <div style={styles.footerContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

const styles = {
  scrollContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '400vh', // 4 dynamic phases
  },
  fixedUi: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 2,
    pointerEvents: 'none' as const,
  },
  spacer300: {
    height: '300vh',
    pointerEvents: 'none' as const,
  },
  footerContainer: {
    height: '100vh',
    position: 'relative' as const,
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end',
  },
};

export default App;
