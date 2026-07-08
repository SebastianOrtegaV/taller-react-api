import PokemonInfo from './PokemonInfo';

export default function ListaPokemon({ pokemons, favorites, onToggleFavorite }) {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonInfo 
          key={pokemon.id} 
          pokemon={pokemon} 
          // Evaluamos si este Pokémon específico está en el arreglo de favoritos
          isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}