import { useState, useEffect } from 'react';
import Header from './components/Header';
import Integrantes from './components/Integrantes';
import PanelEstatus from './components/PanelEstatus';
import BarraBusqueda from './components/BarraBusqueda';
import ListaPokemon from './components/ListaPokemon';
import PanelFavoritos from './components/PanelFavoritos';
import PanelBloqueados from './components/PanelBloqueados';
import { useFetch } from './hooks/useFetch';
import './App.css';

function App() {
  const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=251');
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Inicialización perezosa de Favoritos leyendo desde localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('taller_pokedex_favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  // 2. Inicialización perezosa de Bloqueados leyendo desde localStorage
  const [blocked, setBlocked] = useState(() => {
    const savedBlocked = localStorage.getItem('taller_pokedex_blocked');
    return savedBlocked ? JSON.parse(savedBlocked) : [];
  });

  // 3. EFECTO: Guardar favoritos automáticamente en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('taller_pokedex_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 4. EFECTO: Guardar bloqueados automáticamente en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('taller_pokedex_blocked', JSON.stringify(blocked));
  }, [blocked]);

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

  const handleToggleFavorite = (pokemon) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === pokemon.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const handleToggleBlock = (pokemon) => {
    const isAlreadyBlocked = blocked.some((b) => b.id === pokemon.id);
    if (isAlreadyBlocked) {
      setBlocked(blocked.filter((b) => b.id !== pokemon.id));
    } else {
      setBlocked([...blocked, pokemon]);
      setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
    }
  };

  const filteredPokemons = pokemons
    .filter((pokemon) => !blocked.some((b) => b.id === pokemon.id))
    .filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPokemons = pokemons.length;
  const totalFavorites = favorites.length;
  const totalBlocked = blocked.length;

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
              onToggleBlock={handleToggleBlock}
            />
          )}
        </section>
        
        <section className="sidebar-section">
          <PanelFavoritos 
            favorites={favorites} 
            onRemoveFavorite={handleToggleFavorite}
          />
          <PanelBloqueados 
            blocked={blocked} 
            onRemoveBlock={handleToggleBlock}
          />
        </section>
      </main>
    </div>
  );
}

export default App;