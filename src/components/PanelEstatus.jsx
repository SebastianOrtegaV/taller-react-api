export default function PanelEstatus({ total, favorites, blocked }) {
  return (
    <div className="stats-panel">
      <div className="stat-box">Total: <span>{total}</span></div>
      <div className="stat-box">Favoritos: <span>{favorites}</span></div>
      <div className="stat-box">Bloqueados: <span>{blocked}</span></div>
    </div>
  );
}