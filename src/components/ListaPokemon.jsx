import PokemonInfo from './PokemonInfo';

export default function ListaPokemon({ pokemons }) {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonInfo key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}