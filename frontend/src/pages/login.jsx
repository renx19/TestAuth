import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/handleError';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- initialize
  const [form, setForm] = useState({ email: '', password: '' });    
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login(form); // centralized API call
      setUser(data);
      navigate('/profile');
    } catch (err) {
      setError(getErrorMessage(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
