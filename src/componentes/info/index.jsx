import { useState, useEffect } from 'react'
import './style.css'

function Info() {
  const [listaPokemons, setListaPokemons] = useState([])
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(false)

  // Cargar una lista rápida de Pokémon para poder hacer clic
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then(res => res.json())
      .then(data => setListaPokemons(data.results))
      .catch(err => console.error("Error al cargar lista:", err))
  }, [])

 
  const cargarInfoPokemon = (nombre) => {
    setCargando(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .then(res => res.json())
      .then(data => {
        setPokemonSeleccionado(data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error al cargar detalle:", err)
        setCargando(false)
      })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Información de Pokémon</h2>
      <p>Haz clic en cualquier Pokémon para ver toda su información de la API:</p>

    
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {listaPokemons.map((p) => (
          <button
            key={p.name}
            onClick={() => cargarInfoPokemon(p.name)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <hr />

      
      {cargando && <p>Cargando información...</p>}

      {pokemonSeleccionado && !cargando && (
        <div style={{ marginTop: '20px' }}>
          <h1 style={{ textTransform: 'capitalize' }}>{pokemonSeleccionado.name} (#{pokemonSeleccionado.id})</h1>
          
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSeleccionado.id}.png`} 
            alt={pokemonSeleccionado.name} 
            width="180"
          />

          <h3>Datos Generales:</h3>
          <p><strong>Altura:</strong> {pokemonSeleccionado.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemonSeleccionado.weight / 10} kg</p>
          <p><strong>Tipos:</strong> {pokemonSeleccionado.types.map(t => t.type.name).join(', ')}</p>

          <h3>Estadísticas:</h3>
          <ul>
            <li><strong>HP:</strong> {pokemonSeleccionado.stats[0].base_stat}</li>
            <li><strong>Ataque:</strong> {pokemonSeleccionado.stats[1].base_stat}</li>
            <li><strong>Defensa:</strong> {pokemonSeleccionado.stats[2].base_stat}</li>
            <li><strong>Velocidad:</strong> {pokemonSeleccionado.stats[5].base_stat}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Info