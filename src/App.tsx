import TerrainCanvas from './components/TerrainCanvas';
import Header from './components/Header';
import HeroOverlay from './components/HeroOverlay';
// import Services from './components/Services';
// import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      {/* 3D R3F Canvas in fixed background */}
      <TerrainCanvas />

      {/* HTML overlay content stacked vertically */}
      <div className="ui-overlay">
        <Header />
        <HeroOverlay />
        {/* <Services /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
