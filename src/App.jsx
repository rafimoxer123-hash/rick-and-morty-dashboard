import CharacterList from './components/CharacterList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>👽 Rick and Morty API</h1>
        <p>Data character dari Rick and Morty API</p>
      </header>

      <main>
        <CharacterList />
      </main>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
  },
};

export default App;