import { useState } from 'react'
import './style.css'

function Usuario() {
  const [usuario, setUsuario] = useState('Entrenador')
  const [pokemonAleatorio, setPokemonAleatorio] = useState(null)
  const [cargando, setCargando] = useState(false)

  const obtenerPokemonAleatorio = () => {
    setCargando(true)
    const id = Math.floor(Math.random() * 1025) + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemonAleatorio(data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error:", err)
        setCargando(false)
      })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Perfil de Usuario</h1>

      <div>
        <label>Nombre de usuario: </label>
        <input 
          type="text" 
          value={usuario} 
          onChange={(e) => setUsuario(e.target.value)} 
        />
      </div>

      <br />

      <button onClick={obtenerPokemonAleatorio}>
        Generar mi Pokémon Inicial
      </button>

      <hr />

      <h2>Hola, {usuario}</h2>

      {cargando && <p>Buscando en la PokéAPI...</p>}

      {pokemonAleatorio && !cargando && (
        <div>
          <h3>¡Tu Pokémon asignado es: {pokemonAleatorio.name}!</h3>
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonAleatorio.id}.png`} 
            alt={pokemonAleatorio.name} 
            width="150"
          />
          <p>ID: #{pokemonAleatorio.id}</p>
          <p>Tipo: {pokemonAleatorio.types[0].type.name}</p>
        </div>
      )}
    </div>
  )
}

export default Usuario