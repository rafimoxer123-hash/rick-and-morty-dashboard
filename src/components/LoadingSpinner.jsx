export default function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading Rick and Morty Characters...</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
  },

  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid #e0e0e0',
    borderTop: '6px solid #00ff99',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },

  text: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
};