import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Ambil data dari API Rick and Morty
  const fetchCharacters = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      );

      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error API:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter pencarian
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1>Rick and Morty Characters</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari character..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      {/* List Character */}
      <div style={styles.grid}>
        {filteredCharacters.map((character) => (
          <div key={character.id} style={styles.card}>
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
  },

  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },

  card: {
    background: '#f4f4f4',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center',
  },

  image: {
    width: '100%',
    borderRadius: '10px',
  },
};