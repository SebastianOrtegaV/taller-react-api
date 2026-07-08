import PokemonInfo from './PokemonInfo';

export default function ListaPokemon({ pokemons, favorites, onToggleFavorite, onToggleBlock }) {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonInfo 
          key={pokemon.id} 
          pokemon={pokemon} 
          isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
          onToggleFavorite={onToggleFavorite}
          onToggleBlock={onToggleBlock}
        />
      ))}
    </div>
  );
}