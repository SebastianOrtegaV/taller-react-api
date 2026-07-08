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
  const [favorites, setFavorites] = useState([]);
  
  // 1. Estado para almacenar los Pokémon bloqueados
  const [blocked, setBlocked] = useState([]);

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

  // 2. Función tipo Toggle para agregar o quitar de bloqueados
  const handleToggleBlock = (pokemon) => {
    const isAlreadyBlocked = blocked.some((b) => b.id === pokemon.id);
    
    if (isAlreadyBlocked) {
      setBlocked(blocked.filter((b) => b.id !== pokemon.id));
    } else {
      setBlocked([...blocked, pokemon]);
      // Regla de negocio: Si se bloquea, se saca automáticamente de favoritos
      setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
    }
  };

  // 3. ESTADO DERIVADO OPTIMIZADO: Excluimos bloqueados y luego filtramos por búsqueda
  const filteredPokemons = pokemons
    .filter((pokemon) => !blocked.some((b) => b.id === pokemon.id))
    .filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPokemons = pokemons.length;
  const totalFavorites = favorites.length;
  // Pasamos la cantidad real de bloqueados
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
          {/* Insertamos nuestro nuevo panel en la barra lateral */}
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