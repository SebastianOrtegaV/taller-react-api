import Header from './components/Header';
import Integrantes from './components/Integrantes';
import PanelEstatus from './components/PanelEstatus';
import BarraBusqueda from './components/BarraBusqueda';
import ListaPokemon from './components/ListaPokemon';
import PanelFavoritos from './components/PanelFavoritos';
import { mockPokemons } from './data/mockData';
import './App.css';

function App() {
  // Datos temporales simulados para visualización inicial
  const totalPokemons = mockPokemons.length;
  const totalFavorites = 0;
  const totalBlocked = 0;

  return (
    <div className="app-container">
      <Header />
      <Integrantes />
      
      <main className="main-layout">
        <section className="content-section">
          <PanelEstatus 
            total={totalPokemons} 
            favorites={totalFavorites} 
            blocked={totalBlocked} 
          />
          <BarraBusqueda />
          <ListaPokemon pokemons={mockPokemons} />
        </section>
        
        <section className="sidebar-section">
          <PanelFavoritos />
        </section>
      </main>
    </div>
  );
}

export default App;