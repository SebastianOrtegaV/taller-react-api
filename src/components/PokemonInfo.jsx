export default function PokemonInfo({ pokemon, isFavorite, onToggleFavorite, onToggleBlock }) {
  return (
    <article className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h3>{pokemon.name}</h3>
      <div className="card-actions">
        <button 
          className={`btn-favorite ${isFavorite ? 'active' : ''}`} 
          onClick={() => onToggleFavorite(pokemon)}
        >
          {isFavorite ? '⭐ Quitar' : '☆ Favorito'}
        </button>
        <button className="btn-block" onClick={() => onToggleBlock(pokemon)}>
          🚫 Bloquear
        </button>
      </div>
    </article>
  );
}