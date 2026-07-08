export default function PokemonInfo({ pokemon }) {
  return (
    <article className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h3>{pokemon.name}</h3>
      <div className="card-actions">
        <button className="btn-favorite" disabled>⭐ Favorito</button>
        <button className="btn-block" disabled>🚫 Bloquear</button>
      </div>
    </article>
  );
}