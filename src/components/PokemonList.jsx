import { useEffect, useState } from "react"
import axios from "axios"

export default function PokemonList() {

  // STATE
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [newPokemon, setNewPokemon] = useState("")

  // GET API
  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {

    try {

      setLoading(true)

      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      )

      setPokemon(response.data.results)

    } catch (err) {

      setError("Gagal mengambil data Pokemon")

    } finally {

      setLoading(false)

    }
  }

  // POST API
  const addPokemon = async () => {

    if (newPokemon === "") {
      alert("Input tidak boleh kosong")
      return
    }

    try {

      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: newPokemon
        }
      )

      alert("Data berhasil dikirim!")

      setNewPokemon("")

    } catch (error) {

      alert("Gagal mengirim data")

    }
  }

  // SEARCH + FILTER
  const filteredPokemon = pokemon.filter((item) => {

    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      filter === "all"
        ? true
        : item.name.startsWith(filter)

    return matchSearch && matchFilter
  })

  // LOADING
  if (loading) {
    return <h1>Loading...</h1>
  }

  // ERROR
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div>

      <h1>Pokemon Dashboard</h1>

      {/* FORM */}
      <div className="form-container">

        <input
          type="text"
          placeholder="Tambah Pokemon..."
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
          className="search-input"
        />

        <button
          onClick={addPokemon}
          className="add-button"
        >
          Tambah
        </button>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Semua</option>
          <option value="b">Huruf B</option>
          <option value="c">Huruf C</option>
          <option value="p">Huruf P</option>
          <option value="s">Huruf S</option>
        </select>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* CARD */}
      <div className="pokemon-container">

        {filteredPokemon.map((item, index) => (

          <div className="pokemon-card" key={index}>

            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={item.name}
            />

            <h2>{item.name}</h2>

          </div>

        ))}

      </div>

    </div>
  )
}