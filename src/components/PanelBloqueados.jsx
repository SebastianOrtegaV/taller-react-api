export default function PanelBloqueados({ blocked, onRemoveBlock }) {
  return (
    <aside className="blocked-panel">
      <h2>Bloqueados 🚫</h2>
      
      {blocked.length === 0 ? (
        <p className="empty-message">No hay Pokémon bloqueados.</p>
      ) : (
        <ul className="blocked-list">
          {blocked.map((poke) => (
            <li key={poke.id} className="blocked-item">
              <span className="blocked-name">{poke.name}</span>
              <button 
                className="btn-unblock" 
                onClick={() => onRemoveBlock(poke)}
              >
                🔓 Desbloquear
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}