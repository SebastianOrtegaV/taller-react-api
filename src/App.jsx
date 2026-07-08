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
  const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=251');
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Estado para almacenar los Pokémon favoritos
  const [favorites, setFavorites] = useState([]);

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

  // 2. Función tipo Toggle para agregar o quitar de favoritos
  const handleToggleFavorite = (pokemon) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === pokemon.id);
    
    if (isAlreadyFavorite) {
      // Si ya existe, lo filtramos para eliminarlo
      setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
    } else {
      // Si no existe, lo agregamos a la lista
      setFavorites([...favorites, pokemon]);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPokemons = pokemons.length;
  // Pasamos el tamaño real del arreglo de favoritos
  const totalFavorites = favorites.length;
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
            <ListaPokemon 
              pokemons={filteredPokemons} 
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </section>
        
        <section className="sidebar-section">
          <PanelFavoritos 
            favorites={favorites} 
            onRemoveFavorite={handleToggleFavorite}
          />
        </section>
      </main>
    </div>
  );
}

export default App;