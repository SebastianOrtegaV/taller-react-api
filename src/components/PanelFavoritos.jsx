export default function PanelFavoritos({ favorites, onRemoveFavorite }) {
  return (
    <aside className="favorites-panel">
      <h2>Tus Favoritos ⭐</h2>
      
      {favorites.length === 0 ? (
        <p className="empty-message">No tienes Pokémon favoritos aún.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((fav) => (
            <li key={fav.id} className="favorite-item">
              <img src={fav.image} alt={fav.name} className="fav-thumb" />
              <span className="fav-name">{fav.name}</span>
              <button 
                className="btn-remove-fav" 
                onClick={() => onRemoveFavorite(fav)}
                title="Quitar de favoritos"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}