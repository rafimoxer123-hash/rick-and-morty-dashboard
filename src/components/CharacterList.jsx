import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CharacterList() {

  // STATE
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  // GET API
  useEffect(() => {
    fetchCharacters();
  }, []);

  // FETCH DATA
  const fetchCharacters = async () => {

    setLoading(true);

    try {

      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      );

      setCharacters(response.data.results);

    } catch (error) {

      setError('Gagal mengambil data API');

    } finally {

      setLoading(false);

    }
  };

  // SEARCH + FILTER
  const filteredCharacters = characters.filter((character) => {

    const matchSearch =
      character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchFilter =
      filter === 'all'
        ? true
        : character.status === filter;

    return matchSearch && matchFilter;
  });

  // LOADING
  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
  }

  // ERROR
  if (error) {
    return <h2 style={{ textAlign: 'center' }}>{error}</h2>;
  }

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        Rick and Morty Dashboard
      </h1>

      {/* SEARCH + FILTER */}
      <div style={styles.topBar}>

        <input
          type="text"
          placeholder="Cari character..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">Semua</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

      </div>

      {/* CARD */}
      <div style={styles.grid}>

        {filteredCharacters.map((character) => (

          <div
            key={character.id}
            style={styles.card}
          >

            <img
              src={character.image}
              alt={character.name}
              style={styles.image}
            />

            <h3>{character.name}</h3>

            <p>Status: {character.status}</p>

            <p>Species: {character.species}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial',
  },

  title: {
    textAlign: 'center',
    marginBottom: '30px',
  },

  topBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  input: {
    width: '250px',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },

  select: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },

  card: {
    background: '#f4f4f4',
    padding: '15px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },

  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
};