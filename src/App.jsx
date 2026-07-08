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
  // Cambiamos el límite a 251 para traer la primera y segunda generación completa
  const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=251');
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data && data.results) {
      const formattedPokemons = data.results.map((poke) => {
        const urlParts = poke.url.split('/');
        const id = urlParts[urlParts.length - 2];
        
        return {
          id: parseInt(id),
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
      });
      setPokemons(formattedPokemons);
    }
  }, [data]);

  // El filtrado por estado derivado sigue funcionando instantáneamente con 251 elementos
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          
          <BarraBusqueda searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          {loading && <p className="status-msg">Cargando la Pokédex... ⏳</p>}
          {error && <p className="status-msg error-msg">❌ Error: {error}</p>}
          
          {!loading && !error && filteredPokemons.length === 0 && (
            <p className="status-msg">No se encontraron Pokémon que coincidan con "{searchTerm}"</p>
          )}
          
          {!loading && !error && filteredPokemons.length > 0 && (
            <ListaPokemon pokemons={filteredPokemons} />
          )}
        </section>
        
        <section className="sidebar-section">
          <PanelFavoritos />
        </section>
      </main>
    </div>
  );
}

export default App;