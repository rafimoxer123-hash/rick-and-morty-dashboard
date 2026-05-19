export default function CharacterTable({ characters }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Image</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Status</th>
          <th style={styles.th}>Species</th>
          <th style={styles.th}>Gender</th>
        </tr>
      </thead>

      <tbody>
        {characters.map((character) => (
          <tr key={character.id}>
            <td style={styles.td}>{character.id}</td>

            <td style={styles.td}>
              <img
                src={character.image}
                alt={character.name}
                style={styles.image}
              />
            </td>

            <td style={styles.td}>{character.name}</td>
            <td style={styles.td}>{character.status}</td>
            <td style={styles.td}>{character.species}</td>
            <td style={styles.td}>{character.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },

  th: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },

  td: {
    border: '1px solid #ddd',
    padding: '10px',
  },

  image: {
    width: '70px',
    borderRadius: '8px',
  },
};