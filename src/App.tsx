import TerrainCanvas from './components/TerrainCanvas';
import Header from './components/Header';
import HeroOverlay from './components/HeroOverlay';
// import Services from './components/Services';
// import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      {/* Header floats on top on desktop, stacks on mobile */}
      <Header />

      {/* Main Layout containing Canvas and Hero Overlay */}
      <div className="main-layout">
        {/* 3D R3F Canvas */}
        <TerrainCanvas />

        {/* Hero Overlay section */}
        <HeroOverlay />
      </div>
    </div>
  );
}

export default App;
