export default function BarraBusqueda() {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Buscar Pokémon por nombre..." 
        disabled
      />
      <button disabled>Buscar</button>
    </div>
  );
}