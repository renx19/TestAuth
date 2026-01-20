import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/profile.css';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/handleError';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

const logout = async () => {
  try {
    await api.logout(); // centralized API call
    setUser(null);      // clear user from context
  } catch (err) {
    console.error('Logout failed', getErrorMessage(err));
  }
};

  if (!user)
    return (
      <div className="profile-wrapper">
        <div className="profile-card">
          <p>You are not logged in.</p>
        </div>
      </div>
    );

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
