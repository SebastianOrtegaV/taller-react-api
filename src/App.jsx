import { useState, useEffect } from 'react';
import Header from './components/Header';
import Integrantes from './components/Integrantes';
import PanelEstatus from './components/PanelEstatus';
import BarraBusqueda from './components/BarraBusqueda';
import ListaPokemon from './components/ListaPokemon';
import PanelFavoritos from './components/PanelFavoritos';
import { useFetch } from './hooks/useFetch';
import './App.css';

function App() {
  // Uso de nuestro custom hook para traer los 151 primeros Pokémon
  const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const [pokemons, setPokemons] = useState([]);

  // Este useEffect formatea los datos una vez que la API responde
  useEffect(() => {
    if (data && data.results) {
      const formattedPokemons = data.results.map((poke) => {
        // Extraemos el ID directamente de la URL (ej: "https://pokeapi.co/api/v2/pokemon/1/")
        const urlParts = poke.url.split('/');
        const id = urlParts[urlParts.length - 2];
        
        return {
          id: parseInt(id),
          name: poke.name,
          // Generamos la URL de la imagen oficial usando el ID
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
      });
      setPokemons(formattedPokemons);
    }
  }, [data]);

  const totalPokemons = pokemons.length;
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
          
          {/* Manejo de estados: Cargando, Error y Éxito */}
          {loading && <p className="status-msg">Cargando la Pokédex... ⏳</p>}
          {error && <p className="status-msg error-msg">❌ Error: {error}</p>}
          {!loading && !error && <ListaPokemon pokemons={pokemons} />}
        </section>
        
        <section className="sidebar-section">
          <PanelFavoritos />
        </section>
      </main>
    </div>
  );
}

export default App;