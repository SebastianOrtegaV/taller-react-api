export default function BarraBusqueda({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Buscar Pokémon por nombre..." 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}