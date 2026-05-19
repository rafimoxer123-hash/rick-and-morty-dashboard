import { useState } from 'react';
import axios from 'axios';

export default function AddCharacterForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    status: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage(null);

    try {
      // POST request ke API
      await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          name: formData.name,
          species: formData.species,
          status: formData.status,
        }
      );

      setMessage({
        type: 'success',
        text: 'Character berhasil ditambahkan!',
      });

      setFormData({
        name: '',
        species: '',
        status: '',
      });

      // Refresh parent component
      if (onSuccess) onSuccess();

    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Gagal menambahkan character!',
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Tambah Character Baru</h2>

      {/* Message */}
      {message && (
        <div
          style={
            message.type === 'success'
              ? styles.success
              : styles.error
          }
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="name"
          placeholder="Nama Character"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="species"
          placeholder="Species"
          value={formData.species}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? 'Mengirim...' : 'Simpan Character'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f4f4f4',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '2rem',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
  },

  button: {
    padding: '12px',
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },

  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '1rem',
  },

  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
};