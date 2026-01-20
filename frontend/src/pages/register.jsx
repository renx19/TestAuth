import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import '../styles/register.css';
import { getErrorMessage } from '../utils/handleError';
export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const data = await api.register(form); // use centralized API call
    setUser(data);                          // store user in context
    alert('Registration successful!');      // optional success feedback
  } catch (err) {
    console.error(err);
    setError(getErrorMessage(err));         // standardized error
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-wrapper">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="input-group">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
